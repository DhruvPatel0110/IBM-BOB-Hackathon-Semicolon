import { useAuth } from './contexts/AuthContext';
import LoginPage from './components/Auth/LoginPage';
import DashboardLayout from './components/Dashboard/DashboardLayout';

function App() {
  const { isAuthenticated } = useAuth();

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show dashboard if authenticated
  return <DashboardLayout />;
}

export default App;

// Made with Bob
