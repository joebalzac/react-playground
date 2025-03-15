import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingText, setEditinText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedTodoIds, setSelectedTodoIds] = useState<number[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  console.log(todos);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setSelectedTodoIds(
      e.target.checked
        ? [...selectedTodoIds, id]
        : selectedTodoIds.filter((todoId) => todoId !== id)
    );
  };

  const handleEditTodo = (id: number, title: string) => {
    setEditinText(title);
    setEditingId(id);
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

  const handleCompleteTodo = () => {
    setTodos(
      todos.map((todo) =>
        selectedTodoIds.includes(todo.id) ? { ...todo, completed: true } : todo
      )
    );
    setSelectedTodoIds([]);
  };

  const handleDeleteAll = () => {
    setTodos(todos.filter((todo) => !selectedTodoIds.includes(todo.id)));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo +</button>

      <button onClick={handleCompleteTodo}>Mark as Complete</button>
      <button onClick={handleDeleteAll}>Delete Checked</button>
      <ul>
        {todos.map((todo) => (
          <>
            <li
              style={{ backgroundColor: todo.completed ? "#fff" : "#faf344" }}
              key={todo.id}
            >
              {editingId === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditinText(e.target.value)}
                  />
                  <button onClick={handleSaveTodo}>Save</button>
                </div>
              ) : (
                <div>
                  <input
                    type="checkbox"
                    checked={selectedTodoIds.includes(todo.id)}
                    onChange={(e) => handleInputChange(e, todo.id)}
                  />
                  <h2>{todo.title}</h2>
                  <button onClick={() => handleEditTodo(todo.id, todo.title)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
