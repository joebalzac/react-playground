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

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => res.json())
      .then((data) => setTodos(data));
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

  const handleDeleteTodo = (id: number) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const handleEditText = (title: string, id: number) => {
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
      <input
        type="text"
        style={{ border: "1px solid black" }}
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
                <button onClick={() => handleEditText(todo.title, todo.id)}>
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
