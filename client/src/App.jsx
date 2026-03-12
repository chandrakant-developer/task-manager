import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components';
import { TaskPage, SettingsPage, RegisterPage, LoginPage, HomePage } from './pages';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthRoute = location.pathname === '/register' || location.pathname === '/login';
  const isLandingRoute = location.pathname === '/';

  if (isAuthRoute) {
    return (
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }

  if (isLandingRoute) {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-[linear-gradient(135deg,#eef2ff_0%,#f0f9ff_50%,#f8fafc_100%)] bg-fixed">
      <Sidebar />

      <main className="flex flex-1 relative h-screen overflow-hidden ml-[calc(320px+1rem)] min-w-0 max-w-full max-md:ml-0">
        <Routes>
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/settings" element={ <SettingsPage onClose={() => navigate('/tasks')} /> } />
        </Routes>
      </main>
    </div>
  );
}

export default App;