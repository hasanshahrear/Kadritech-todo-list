export type TTask = {
  id: number;
  title: string;
  description: string;
  status: "New" | "Ongoing" | "Done";
  movedToOngoingAt?: Date;
  completedAt?: Date;
  dueTime?: Date | null;
  timeUp?: boolean;
};

export type TColumnProps = {
  title: "New" | "Ongoing" | "Done";
  tasks: TTask[];
  moveTask: (id: number, newStatus: TTask["status"]) => void;
  addTask?: (title: string, description: string) => void;
};

export type TTodoItemProps = {
  task: TTask;
  moveTask: (
    id: number,
    newStatus: TTask["status"],
    dueTime?: Date | null
  ) => void;
};
