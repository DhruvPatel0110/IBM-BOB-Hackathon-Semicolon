import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LogIn } from 'lucide-react';
import ExportButton from '../Export/ExportButton';
import UserMenu from '../Auth/UserMenu';
import LoginModal from '../Auth/LoginModal';
import TranscriptHistory from '../History/TranscriptHistory';
import Button from '../UI/Button';
import { useAuth } from '../../contexts/AuthContext';

const DashboardHeader = ({ transcript, summary, actionItems, onLoadTranscript }) => {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-surface border-b border-accent-cyan/20 sticky top-0 z-30 backdrop-blur-sm bg-primary-surface/80"
      >
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-white rounded-lg"
              >
                <Sparkles className="w-6 h-6 text-primary-bg" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  AI Transcription Dashboard
                </h1>
                <p className="text-sm text-text-secondary">
                  Powered by IBM Watson & Advanced AI
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ExportButton
                transcript={transcript}
                summary={summary}
                actionItems={actionItems}
              />
              
              {isAuthenticated ? (
                <UserMenu onHistoryClick={() => setShowHistory(true)} />
              ) : (
                <Button
                  onClick={() => setShowLoginModal(true)}
                  variant="primary"
                  size="sm"
                  icon={LogIn}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* Transcript History Modal */}
      <TranscriptHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onSelectTranscript={onLoadTranscript}
      />
    </>
  );
};

export default DashboardHeader;

// Made with Bob
