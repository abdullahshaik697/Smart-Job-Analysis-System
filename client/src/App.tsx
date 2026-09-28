import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayouts';
import Jobs from './pages/Jobs';
import Tracker from './pages/Tracker';
            import HowItWorks from './pages/HowItWorks'; // <-- Import add karein
import Analytics from './pages/Analytics';
import ResumePage from './pages/ResumePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Routes wrapped in Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/analytics" element={<Analytics />} />

<Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
  );
}

export default App;