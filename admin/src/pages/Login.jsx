import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { isAuthenticated } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm onSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Login;