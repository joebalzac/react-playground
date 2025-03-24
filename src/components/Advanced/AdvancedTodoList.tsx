import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      const data: Todo[] = await res.data;
      setTodos(
        sortTodos(
          data.sort((a: Todo, b: Todo) => a.title.localeCompare(b.title))
        )
      );
    } catch (error) {
      setError("An unknown error has occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (todos.length > 0) {
    localStorage.setItem("advancedTodos", JSON.stringify(todos));
  }

  useEffect(() => {
    const stored = localStorage.getItem("advancedTodos");
    const todosFromStorage: Todo[] = stored ? JSON.parse(stored) : [];
    if (todosFromStorage.length) {
      setTodos(sortTodos(todosFromStorage));
    } else {
      fetchTodos();
    }
  }, []);

  const sortTodos = (todoList: Todo[]) => {
    return [...todoList].sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );
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
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: number, title: string) => {
    setEditingId(id);
    setEditingText(title);
  };

  const handleSaveTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, title: editingText } : todo
      )
    );
    setEditingId(null);
  };

  const handleToggleTodo = (
    e: React.MouseEvent<HTMLHeadingElement>,
    id: number
  ) => {
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
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={handleAddTodo}>Add +</button>
            <div>
              {todos.map((todo) => {
                return (
                  <li
                    className={`${
                      todo.completed === true
                        ? "line-through bg-white"
                        : "bg-amber-200"
                    } relative list-none my-4 rounded-sm shadow`}
                    onMouseEnter={() => setIsHovered(todo.id)}
                  >
                    {editingId === todo.id ? (
                      <div className="border">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <button onClick={handleSaveTodo}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <h3
                          className="cursor-pointer hover:font-bold"
                          onClick={(e) => handleToggleTodo(e, todo.id)}
                        >
                          {todo.title}
                        </h3>
                        <button
                          onClick={() => handleEditTodo(todo.id, todo.title)}
                        >
                          Edit
                        </button>
                        {isHovered === todo.id && (
                          <div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTodo(todo.id);
                              }}
                              style={{
                                position: "absolute",
                                right: "2px",
                                bottom: "2px",
                              }}
                            >
                              X
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </div>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default AdvancedTodoList;
