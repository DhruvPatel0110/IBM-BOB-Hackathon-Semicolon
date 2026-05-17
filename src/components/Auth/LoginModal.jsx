// Login/Signup Modal Component - Local Storage Auth
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User } from 'lucide-react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { signInLocal, signUpLocal } from '../../services/localAuthService';
import { useAuth } from '../../contexts/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { setUser } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let result;
    if (isSignUp) {
      result = await signUpLocal(email, password, displayName);
    } else {
      result = await signInLocal(email, password);
    }

    if (result.success) {
      setUser(result.user);
      onClose();
      // Reset form
      setEmail('');
      setPassword('');
      setDisplayName('');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md mx-auto p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gradient">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-status-error/10 border border-status-error/30 rounded-lg text-status-error text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email/Password Form */}
        <form onSubmit={handleAuth} className="space-y-5">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Display Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="John Doe"
                  required={isSignUp}
                  className="w-full pl-10 pr-4 py-3 bg-primary-hover border border-accent-cyan/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-primary-hover border border-accent-cyan/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-3 bg-primary-hover border border-accent-cyan/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan transition-colors"
              />
            </div>
            {isSignUp && (
              <p className="mt-2 text-xs text-text-muted">
                Must be at least 6 characters
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            className="w-full mt-6"
          >
            {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        {/* Toggle Sign Up/Sign In */}
        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-sm text-text-secondary hover:text-accent-cyan transition-colors"
          >
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <span className="font-semibold text-accent-cyan">Sign In</span>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <span className="font-semibold text-accent-cyan">Sign Up</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;

// Made with Bob