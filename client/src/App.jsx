import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTodosAsync } from './store/slices/todoSlice';
import Sidebar from './components/Sidebar';
import TodoPage from './pages/TodoPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  return (
    <div className="app-layout">
      <Sidebar />
      
      <main className="app-main-content">
        <TodoPage />
      </main>
    </div>
  );
}

export default App;
