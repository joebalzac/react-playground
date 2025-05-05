import axios from "axios";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingText, setEditingText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      const data: Todo[] = res.data;
      setTodos(data);
    } catch (err) {
      if (err) {
        setError("An unknown error has occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (title: string, id: number) => {
    setEditingText(title);
    setEditingId(id);
  };

  const handleSavetodo = () => {
    if (editingId !== null && editingText.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, title: editingText } : todo
        )
      );
      setEditingId(null);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add Todo +</button>
          {todos.map((todo) => (
            <div>
              {editingId === todo.id ? (
                <div>
                  <input
                    value={editingText}
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button onClick={handleSavetodo}>Save</button>
                </div>
              ) : (
                <div>
                  {todo.title}
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditTodo(todo.title, todo.id)}>
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
          {error && <p className="text-red-400">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default TodoList;
