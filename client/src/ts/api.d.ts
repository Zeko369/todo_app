export interface Todo {
  id: number;
  title: string;
  description: string | null;
  checked: boolean;
  checkedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tasks: [];
}
