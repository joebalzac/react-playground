import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch {
        setError("An error has occurred");
        setTimeout(() => setError(""), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now(),
        title: newTodo.trim(),
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    } else {
      setError("Please enter a todo");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: number) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditingId(id);
      setEditingText(todoToEdit.title);
    }
  };

  const handleSaveTodo = () => {
    if (editingId !== null && editingText.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, title: editingText } : todo
        )
      );
      setEditingId(null);
      setEditingText("");
    } else {
      setError("Please enter a valid todo title");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div>
      <div>
        <input
          value={newTodo}
          type="text"
          placeholder="Add a new todo"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add +</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editingId === todo.id ? (
                <div>
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button onClick={handleSaveTodo}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  {todo.title}
                  <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                  <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
