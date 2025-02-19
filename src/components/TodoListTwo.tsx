import axios from "axios";
import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
}

const TodoListTwo = () => {
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
      setError("An unexpected error has occurred");
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
        title: newTodo.trim(),
        id: Date.now(),
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    } else {
      setError("Please add a todo");
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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">Modern Todo List</h1>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="flex gap-2 mb-4">
            <input
              value={newTodo}
              type="text"
              placeholder="Enter a new todo"
              onChange={(e) => setNewTodo(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={handleAddTodo}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold"
            >
              Add
            </button>
          </div>

          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
              >
                {editingId === todo.id ? (
                  <div className="flex w-full gap-2">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="w-full px-2 py-1 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={handleSaveTodo}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-lg font-semibold"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{todo.title}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTodo(todo.id, todo.title)}
                        className="px-3 py-1 bg-cyan-300 hover:bg-cyan-700 rounded-lg font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="px-3 py-1 bg-purple-700 hover:bg-purple-900 rounded-lg font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TodoListTwo;
