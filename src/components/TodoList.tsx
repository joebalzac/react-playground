import axios from "axios";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      const data: Todo[] = response.data;
      setTodos(data);
    } catch (error) {
      setError("An unknown error has occurred");
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
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: number, title: string) => {
    setEditingId(id);
    setEditingText(title);
  };

  const handleSaveTodo = () => {
    setTodos(
      todos.map((todo) =>
        editingId === todo.id ? { ...todo, title: editingText } : todo
      )
    );
    setEditingId(null);
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
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {editingId === todo.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <button onClick={handleSaveTodo}>Save</button>
                  </div>
                ) : (
                  <div>
                    {todo.title}
                    <button onClick={() => handleDeleteTodo(todo.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleEditTodo(todo.id, todo.title)}>
                      Edit
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default TodoList;
