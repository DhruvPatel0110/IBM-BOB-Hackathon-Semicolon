import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, LogIn, CheckSquare } from 'lucide-react';
import ExportButton from '../Export/ExportButton';
import UserMenu from '../Auth/UserMenu';
import LoginModal from '../Auth/LoginModal';
import TranscriptHistory from '../History/TranscriptHistory';
import Button from '../UI/Button';
import { useAuth } from '../../contexts/AuthContext';

const DashboardHeader = ({ transcript, summary, actionItems, onLoadTranscript }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-surface/95 border-b border-white/10 sticky top-0 z-40 backdrop-blur-md overflow-visible"
      >
        <div className="max-w-[1920px] mx-auto px-8 py-5 overflow-visible">
          <div className="flex items-center justify-between overflow-visible relative">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-xl"
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  AI Transcription Dashboard
                </h1>
                <p className="text-sm text-text-muted">
                  Powered by IBM Watson & Advanced AI
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {actionItems && actionItems.length > 0 && (
                <Button
                  onClick={() => navigate('/actions')}
                  variant="secondary"
                  size="sm"
                  icon={CheckSquare}
                >
                  Actions ({actionItems.length})
                </Button>
              )}
              
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
