export type Todo = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  checked: boolean;
  checkedAt?: Date | null;
};

export type NewTodoDTO = {
  title: string;
  description: string;
};

export type UpdateTodoDTO = Partial<NewTodoDTO>;
