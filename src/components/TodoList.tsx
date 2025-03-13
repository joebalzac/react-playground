import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAddTodo = () => {
    const newTodoItem: Todo = {
      id: Date.now(),
      title: newTodo.trim(),
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
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
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <button onClick={handleAddTodo}>Add +</button>
      <ul>
        d
        <div>
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
                  <div>
                    <h2>{todo.title}</h2>
                    <button onClick={() => handleEditTodo(todo.id, todo.title)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default TodoList;
