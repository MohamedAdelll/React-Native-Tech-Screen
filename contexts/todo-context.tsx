import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import type {
  NewTodoDTO,
  Todo,
  UpdateTodoDTO,
} from "@/types/todo";

type TodoContextValue = {
  todos: Todo[];
  sortedTodos: Todo[];
  addTodo: (input: NewTodoDTO) => void;
  toggleCheck: (id: string) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, updates: UpdateTodoDTO) => void;
};

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

const initialTodos: Todo[] = [];

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (input: NewTodoDTO) => {
    const newTodo: Todo = {
      // Using timestamp as a simple unique ID for demo purposes
      id: String(Date.now()),
      title: input.title.trim(),
      description: input.description?.trim() || "",
      createdAt: new Date(),
      checked: false,
      checkedAt: null,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleCheck = (id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              checked: !t.checked,
              checkedAt: !t.checked ? new Date() : null,
            }
          : t
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (
    id: string,
    updates: { title?: string; description?: string }
  ) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              title:
                updates.title !== undefined ? updates.title.trim() : t.title,
              description:
                updates.description !== undefined
                  ? updates.description.trim()
                  : t.description,
            }
          : t
      )
    );
  };

  const sortedTodos = useMemo(() => {
    const unchecked = todos
      .filter((t) => !t.checked)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const checked = todos
      .filter((t) => t.checked)
      .sort(
        (a, b) => (b.checkedAt?.getTime() ?? 0) - (a.checkedAt?.getTime() ?? 0)
      );
    return [...unchecked, ...checked];
  }, [todos]);

  const value = useMemo(
    () => ({ todos, sortedTodos, addTodo, toggleCheck, removeTodo, editTodo }),
    [todos, sortedTodos]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used within a TodoProvider");
  return ctx;
}
