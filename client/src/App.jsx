import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { fetchTodosAsync } from './store/slices/todoSlice';
import { fetchListsAsync } from './store/slices/listSlice';
import { fetchTagsAsync } from './store/slices/tagSlice';
import Sidebar from './components/Sidebar';
import TodoPage from './pages/TodoPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTodosAsync());
    dispatch(fetchListsAsync());
    dispatch(fetchTagsAsync());
  }, [dispatch]);

  return (
    <div className="app-layout">
      <Sidebar />
      
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/settings" element={<SettingsPage onClose={() => navigate('/')} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
