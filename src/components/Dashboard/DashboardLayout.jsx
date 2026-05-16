import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from './DashboardHeader';
import AudioUpload from '../Upload/AudioUpload';
import TranscriptViewer from '../Transcript/TranscriptViewer';
import SummaryCards from '../Summary/SummaryCards';
import ActionItemsPanel from '../ActionItems/ActionItemsPanel';
import { transcribeAudio, formatDuration, countWords } from '../../services/groqService';
import { generateSummaryAndActions } from '../../services/geminiService';

const DashboardLayout = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [transcript, setTranscript] = useState(null);
  const [summary, setSummary] = useState(null);
  const [actionItems, setActionItems] = useState(null);

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
      setSummary({
        keyPoints: summaryResult.keyPoints,
        sentiment: summaryResult.sentiment,
        topics: summaryResult.topics,
      });
      
      // Set action items
      setActionItems(summaryResult.actionItems);
      
      console.log('✅ Summary and action items generated!');
      setIsLoading(false);
      
    } catch (err) {
      console.error('❌ Error processing audio:', err);
      setError(err.message || 'Failed to process audio file');
      setIsLoading(false);
      
      // Show error to user
      alert(`Error: ${err.message}\n\nPlease check:\n1. Your API keys are correct\n2. Audio file is valid\n3. You have internet connection`);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      <DashboardHeader
        transcript={transcript}
        summary={summary}
        actionItems={actionItems}
      />

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Upload & Action Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Upload Section */}
            <div className="h-[400px]">
              <AudioUpload onFileUpload={handleFileUpload} />
            </div>

            {/* Action Items Panel */}
            <div className="h-[calc(100vh-500px)] min-h-[400px]">
              <ActionItemsPanel
                actionItems={actionItems}
                isLoading={isLoading}
              />
            </div>
          </motion.div>

          {/* Center Column - Transcript */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="h-[calc(100vh-140px)] min-h-[600px]">
              <TranscriptViewer
                transcript={transcript}
                isLoading={isLoading}
              />
            </div>
          </motion.div>

          {/* Right Column - Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="h-[calc(100vh-140px)] min-h-[600px] overflow-y-auto scrollbar-thin">
              <SummaryCards
                summary={summary}
                isLoading={isLoading}
              />
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
