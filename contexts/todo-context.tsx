import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { Todo } from "@/types/todo";

type AddTodoInput = {
  title: string;
  description?: string;
};

type TodoContextValue = {
  todos: Todo[];
  addTodo: (input: AddTodoInput) => void;
};

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Buy groceries",
    description: "Milk, eggs, bread, and fruit",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Read a chapter",
    description: "Finish chapter 4 of the book",
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: "3",
    title: "Workout",
    description: "20 minutes of cardio",
    createdAt: new Date(Date.now() - 85300000 * 2),
  },
  {
    id: "4",
    title: "Call Sam",
    description: "Discuss the project details",
    createdAt: new Date(Date.now() - 82300000 * 3),
  },
];

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (input: AddTodoInput) => {
    const newTodo: Todo = {
      id: String(Date.now()),
      title: input.title.trim(),
      description: input.description?.trim() || "",
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const value = useMemo(() => ({ todos, addTodo }), [todos]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used within a TodoProvider");
  return ctx;
}
