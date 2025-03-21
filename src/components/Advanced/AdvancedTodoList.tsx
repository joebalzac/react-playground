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
  const [isHovered, setIsHovered] = useState(false);

  const fetchTodos = async () => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => res.json())
      .then((data) =>
        setTodos(
          sortTodos(
            data.sort((a: Todo, b: Todo) => a.title.localeCompare(b.title))
          )
        )
      );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const sortTodos = (todoList: Todo[]) => {
    return [...todoList].sort((a, b) => {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    });
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false,
      };
      setTodos(sortTodos([...todos, newTodoItem]));
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(sortTodos(todos.filter((todo) => todo.id !== id)));
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
      sortTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
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
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`group relative border-2 border-gray-600 cursor-pointer my-2 p-2 ${
              todo.completed ? "bg-white line-through" : "bg-yellow-200"
            }`}
            onClick={(e) => handleToggleTodo(e, todo.id)}
            onMouseOver={() => setIsHovered(true)}
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

            {isHovered && (
              <button
                className="absolute right-2 bottom-2 bg-transparent border-2 border-red-100 hidden group-hover:block"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTodo(todo.id);
                }}
              >
                X
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedTodoList;
