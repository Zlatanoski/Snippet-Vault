import { Routes, Route } from 'react-router';
import Dashboard from './Dashboard';
import LandingPage from './components/LandingPage';
import LoginPage from '@/Login.tsx';
import SignUp from '@/SignUp.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
