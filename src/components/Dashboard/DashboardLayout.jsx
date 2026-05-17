import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import AudioUpload from '../Upload/AudioUpload';
import TranscriptViewer from '../Transcript/TranscriptViewer';
import SummaryCards from '../Summary/SummaryCards';
import ActionItemsPanel from '../ActionItems/ActionItemsPanel';
import ChatInterface from '../Chatbot/ChatInterface';
import { transcribeAudio, formatDuration, countWords } from '../../services/groqService';
import { generateSummaryAndActions } from '../../services/geminiService';
import { saveTranscript } from '../../services/firestoreService';
import { useAuth } from '../../contexts/AuthContext';
import { isFirebaseConfigured } from '../../config/firebase';

const DashboardLayout = () => {
  const { user } = useAuth();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [transcript, setTranscript] = useState(null);
  const [transcriptId, setTranscriptId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [actionItems, setActionItems] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleFileUpload = async (file) => {
    setUploadedFile(file);
    setIsLoading(true);
    setError(null);
    
    try {
      // Step 1: Transcribe audio using Groq Whisper (ABUSE IT! 😈)
      console.log('🎤 Starting transcription with Groq Whisper...');
      const transcriptionResult = await transcribeAudio(file);
      
      // Create transcript object
      const transcriptData = {
        id: Date.now(),
        filename: file.name,
        duration: formatDuration(transcriptionResult.duration),
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'completed',
        text: transcriptionResult.text,
        wordCount: countWords(transcriptionResult.text),
        language: transcriptionResult.language,
      };
      
      setTranscript(transcriptData);
      console.log('✅ Transcription complete!');
      
      // Step 2: Generate summary using Gemini (with caching to save credits)
      console.log('🤖 Generating summary with Gemini...');
      const summaryResult = await generateSummaryAndActions(transcriptionResult.text);
      
      // Set summary data
      const summaryData = {
        keyPoints: summaryResult.keyPoints,
        sentiment: summaryResult.sentiment,
        topics: summaryResult.topics,
      };
      setSummary(summaryData);
      
      // Set action items
      setActionItems(summaryResult.actionItems);
      
      console.log('✅ Summary and action items generated!');
      
      // Step 3: Save to Firestore if user is authenticated and Firebase is configured
      if (user && isFirebaseConfigured) {
        console.log('💾 Saving transcript to Firestore...');
        const result = await saveTranscript(user.uid, {
          ...transcriptData,
          transcript: transcriptionResult.text,
          summary: summaryData,
          actionItems: summaryResult.actionItems,
        });
        
        if (result.success) {
          console.log('✅ Transcript saved to Firestore!');
          setTranscriptId(result.id);
        } else {
          console.error('❌ Failed to save to Firestore:', result.error);
        }
      } else if (user && !isFirebaseConfigured) {
        console.warn('⚠️ Firebase not configured. Transcript not saved to cloud.');
      }
      
      setIsLoading(false);
      
    } catch (err) {
      console.error('❌ Error processing audio:', err);
      setError(err.message || 'Failed to process audio file');
      setIsLoading(false);
      
      // Show error to user
      alert(`Error: ${err.message}\n\nPlease check:\n1. Your API keys are correct\n2. Audio file is valid\n3. You have internet connection`);
    }
  };

  const handleLoadTranscript = (savedTranscript) => {
    // Load a saved transcript from history
    setTranscript({
      id: savedTranscript.id,
      filename: savedTranscript.filename,
      duration: savedTranscript.duration,
      uploadDate: savedTranscript.uploadDate,
      status: savedTranscript.status,
      text: savedTranscript.text,
      wordCount: savedTranscript.wordCount,
      language: savedTranscript.language,
    });
    
    setTranscriptId(savedTranscript.id);
    
    if (savedTranscript.summary) {
      setSummary(savedTranscript.summary);
    }
    
    if (savedTranscript.actionItems) {
      setActionItems(savedTranscript.actionItems);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      <DashboardHeader
        transcript={transcript}
        summary={summary}
        actionItems={actionItems}
        onLoadTranscript={handleLoadTranscript}
      />

      <main className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Main Grid Layout - 4 equal columns */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Left Column - Upload & Action Items (30% width = 3/10) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Upload Section - 50% height */}
            <div className="h-[calc(50vh-80px)] min-h-[350px]">
              <AudioUpload onFileUpload={handleFileUpload} />
            </div>

            {/* Action Items Panel - 50% height */}
            <div className="h-[calc(50vh-80px)] min-h-[350px]">
              <ActionItemsPanel
                actionItems={actionItems}
                isLoading={isLoading}
              />
            </div>
          </motion.div>

          {/* Center Column - Transcript (30% width = 3/10, 100% height) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="h-[calc(100vh-140px)] min-h-[750px]">
              <TranscriptViewer
                transcript={transcript}
                isLoading={isLoading}
              />
            </div>
          </motion.div>

          {/* Right Column - Summary or Chatbot (40% width = 4/10, 100% height) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4"
          >
            {/* Toggle Button */}
            {transcript && transcriptId && (
              <div className="mb-4 flex gap-2">
                <button
                  onClick={() => setShowChatbot(false)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    !showChatbot
                      ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30'
                      : 'bg-gray-800/30 text-gray-400 hover:bg-gray-800/50'
                  }`}
                >
                  Summary
                </button>
                <button
                  onClick={() => setShowChatbot(true)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    showChatbot
                      ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30'
                      : 'bg-gray-800/30 text-gray-400 hover:bg-gray-800/50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Q&A Chat
                </button>
              </div>
            )}

            <div className="h-[calc(100vh-200px)] min-h-[750px] overflow-y-auto scrollbar-thin">
              {showChatbot && transcript && transcriptId ? (
                <ChatInterface
                  transcript={transcript.text}
                  transcriptId={transcriptId}
                />
              ) : (
                <SummaryCards
                  summary={summary}
                  isLoading={isLoading}
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* Mobile Layout Adjustments */}
        <style jsx>{`
          @media (max-width: 1024px) {
            .grid {
              grid-template-columns: 1fr;
            }
            .lg\\:col-span-3,
            .lg\\:col-span-5,
            .lg\\:col-span-4 {
              grid-column: span 1;
            }
          }
        `}</style>
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default DashboardLayout;

// Made with Bob
