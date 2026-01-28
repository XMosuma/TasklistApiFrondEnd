export type TaskStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
};
