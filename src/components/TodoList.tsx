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
        console.log("Big Data", data);
      } catch (error) {
        if (error instanceof Error) {
          setError("An unknow error has occured");
        }
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
      setError("please add a todo");
      setTimeout(() => setError(""), 3000);
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
      <input
        value={newTodo}
        type="text"
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button onClick={handleAddTodo}>Add Todo +</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading ? (
        <div>isLoading....</div>
      ) : (
        <div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {editingId === todo.id ? (
                  <div>
                    <input
                      value={editingText}
                      type="text"
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <button onClick={handleSaveTodo}>Save</button>
                  </div>
                ) : (
                  <div>
                    {" "}
                    {todo.title}
                    <button
                      onClick={() => {
                        handleDeleteTodo(todo.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        handleEditTodo(todo.id, todo.title);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TodoList;
