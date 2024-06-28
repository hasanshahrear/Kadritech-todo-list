import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TodoCol } from "./todo-column.component";
import { TTask } from "./type";

export function Todo() {
  const [tasks, setTasks] = useState<TTask[]>([]);

  const addTask = (title: string, description: string) => {
    const newTask: TTask = {
      id: Date.now(),
      title,
      description,
      status: "New",
    };
    setTasks([newTask, ...tasks]);
  };

  const moveTask = (id: number, newStatus: TTask["status"], dueTime?: Date) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, status: newStatus };
          if (newStatus === "Ongoing") {
            updatedTask.movedToOngoingAt = new Date();
            updatedTask.dueTime = dueTime;
          }
          if (newStatus === "Done") {
            updatedTask.completedAt = new Date();
          }
          return updatedTask;
        }
        return task;
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTasks = tasks.map((task) => {
        if (
          task?.status === "Ongoing" &&
          task?.dueTime &&
          new Date() > new Date(task.dueTime)
        ) {
          toast.error(`Task "${task.title}" is overdue!`);
          return { ...task };
        }
        return task;
      });

      setTasks(updatedTasks);
    }, 60000);

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4">
        <TodoCol
          title="New"
          moveTask={moveTask}
          addTask={addTask}
          tasks={tasks.filter((task) => task.status === "New")}
        />
        <TodoCol
          title="Ongoing"
          moveTask={moveTask}
          tasks={tasks
            .filter((task) => task.status === "Ongoing")
            .sort(
              (a, b) =>
                a.movedToOngoingAt!.getTime() - b.movedToOngoingAt!.getTime()
            )}
        />
        <TodoCol
          title="Done"
          moveTask={moveTask}
          tasks={tasks
            .filter((task) => task.status === "Done")
            .sort(
              (a, b) => a.completedAt!.getTime() - b.completedAt!.getTime()
            )}
        />
      </div>
    </div>
  );
}
