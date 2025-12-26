import Sidebar from './components/Sidebar';
import TodoPage from './pages/TodoPage';

function App() {
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
