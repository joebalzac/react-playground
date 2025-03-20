import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const AdvancedTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingText, setEditingText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [hoverTodoId, setHoverTodoId] = useState<number | null>(null);
  const fetchTodos = async () => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  console.log("Big data dog", todos);

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
    if (editingId !== null && editingText.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, title: editingText } : todo
        )
      );
    }
    setEditingId(null);
  };

  const handleToggleTodo = (e: React.MouseEvent<HTMLLIElement>, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo +</button>
      <div>
        <ul>
          {todos.map((todo) => (
            <>
              <li
                className={`relative border-2 border-gray-600 cursor-pointer my-2 ${
                  todo.completed === true
                    ? "bg-white line-through"
                    : "bg-yellow-200"
                } `}
                onMouseOver={() => setHoverTodoId(todo.id)}
                onMouseOut={() => setHoverTodoId(null)}
                onClick={(e) => handleToggleTodo(e, todo.id)}
              >
                {editingId === todo.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <button onClick={handleSaveTodo}>Save Todo</button>
                  </div>
                ) : (
                  <div>
                    <h3>{todo.title}</h3>
                    <button onClick={() => handleEditTodo(todo.id, todo.title)}>
                      Edit
                    </button>
                  </div>
                )}
                {hoverTodoId === todo.id && (
                  <button
                    className="absolute right-0 bottom-0 bg-transparent border-2 border-red-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTodo(todo.id);
                    }}
                  >
                    X
                  </button>
                )}
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdvancedTodoList;
