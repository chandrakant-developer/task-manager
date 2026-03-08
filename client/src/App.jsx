import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { fetchTodosAsync } from './store/slices/todoSlice';
import { fetchListsAsync } from './store/slices/listSlice';
import { fetchTagsAsync } from './store/slices/tagSlice';
import { Sidebar } from './components';
import { TodoPage, SettingsPage } from './pages';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTodosAsync());
    dispatch(fetchListsAsync());
    dispatch(fetchTagsAsync());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-[linear-gradient(135deg,#eef2ff_0%,#f0f9ff_50%,#f8fafc_100%)] bg-fixed">
      <Sidebar />
      
      <main className="flex flex-1 relative h-screen overflow-hidden ml-[calc(320px+1rem)] min-w-0 max-w-full max-md:ml-0">
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/settings" element={<SettingsPage onClose={() => navigate('/')} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
