import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TodoPage from './pages/TodoPage';
import { initialTodos } from './constants/initialData';

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div className="app-layout">
      <Sidebar todos={todos} />
      
      <main className="app-main-content">
        <TodoPage todos={todos} setTodos={setTodos} />
      </main>
    </div>
  );
}

export default App;
