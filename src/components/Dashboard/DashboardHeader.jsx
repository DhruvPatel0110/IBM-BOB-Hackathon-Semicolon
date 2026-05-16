import { motion } from 'framer-motion';
import { Sparkles, Github } from 'lucide-react';
import ExportButton from '../Export/ExportButton';

const DashboardHeader = ({ transcript, summary, actionItems }) => {
  return (
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
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-secondary hover:text-accent-cyan transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;

// Made with Bob
