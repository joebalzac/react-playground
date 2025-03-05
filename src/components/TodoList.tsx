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
      if (error) {
        setError("An unknown error has occureed");
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

  const handleEditTodo = (id: number, title: string) => {
    setEditingId(id);
    setEditingText(title);
  };

  const handleSaveTodo = () => {
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
      <div>
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          <div>
            <input type="text" value={newTodo} onChange={handleAddTodo} />
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
                      <button onClick={() => handleEditTodo}>Edit</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && <p>Please add an error to this</p>}
    </div>
  );
};

export default TodoList;
