// User Menu Component - Local Storage Auth
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, History, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { signOutLocal } from '../../services/localAuthService';

const UserMenu = ({ onHistoryClick }) => {
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOutLocal();
    setUser(null);
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 hover:bg-primary-hover rounded-lg transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-accent-cyan/20 border-2 border-accent-cyan/30 flex items-center justify-center">
          <User className="w-5 h-5 text-accent-cyan" />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-text-primary">
            {user.displayName || 'User'}
          </p>
          <p className="text-xs text-text-secondary">
            {user.email}
          </p>
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-64 bg-primary-surface border border-accent-cyan/20 rounded-lg shadow-xl z-50 overflow-hidden"
            >
              {/* User Info */}
              <div className="p-4 border-b border-accent-cyan/20">
                <p className="font-semibold text-text-primary">
                  {user.displayName || 'User'}
                </p>
                <p className="text-sm text-text-secondary">{user.email}</p>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={() => {
                    onHistoryClick?.();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary-hover transition-colors text-left"
                >
                  <History className="w-5 h-5 text-accent-cyan" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Transcript History
                    </p>
                    <p className="text-xs text-text-secondary">
                      View past transcripts
                    </p>
                  </div>
                </button>

                <button
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary-hover transition-colors text-left"
                >
                  <Settings className="w-5 h-5 text-accent-purple" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Settings
                    </p>
                    <p className="text-xs text-text-secondary">
                      Preferences & account
                    </p>
                  </div>
                </button>

                <div className="my-2 h-px bg-accent-cyan/20" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-status-error/10 transition-colors text-left"
                >
                  <LogOut className="w-5 h-5 text-status-error" />
                  <p className="text-sm font-medium text-status-error">
                    Sign Out
                  </p>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;

// Made with Bob