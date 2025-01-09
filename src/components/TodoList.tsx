import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [error, setError] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
    } else {
      if (error) {
        setError("Please Add a Todo");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const handleDeleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEditTodo = (index: number) => {
    setEditingIndex(index);
    setEditingText(todos[index]);
  };

  const handleSaveTodo = () => {
    if (editingIndex !== null && editingText.trim()) {
      setTodos(
        todos.map((todo, i) => (i === editingIndex ? editingText : todo))
      );
      setEditingIndex(null);
    }
  };

  return (
    <div>
      <div>
        <input
          value={newTodo}
          placeholder="Add a new todo"
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo();
            }
          }}
        />
        <button onClick={handleAddTodo}>Add Todo+</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={handleSaveTodo}>Save</button>
              </div>
            ) : (
              <div>
                {todo}
                <button onClick={() => handleEditTodo(index)}>Edit</button>
                <button onClick={() => handleDeleteTodo(index)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
