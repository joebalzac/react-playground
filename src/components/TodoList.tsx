import axios from "axios";
import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
}
const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      const data: Todo[] = res.data;
      setTodos(data);
    } catch (err) {
      if (err) setError("an unknown error has ocurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
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
    setEditingTitle(title);
    setEditingId(id);
  };

  const handleSaveTodo = () => {
    if (editingId !== null && editingTitle.trim())
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, title: editingTitle } : todo
        )
      );
  };

  return <div>TodoList</div>;
};

export default TodoList;
