import { useEffect, useState } from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import DateTimePicker from "react-datetime-picker";
import { MdOutlineTimer } from "react-icons/md";
import { TTask, TTodoItemProps } from "./type";

export function TodoItem({ task, moveTask }: TTodoItemProps) {
  const [dueTimes, setDueTimes] = useState<{ [key: number]: Date | null }>({
    [task?.id]: new Date(),
  });
  const handleMove = (
    e: React.MouseEvent,
    data: { newStatus: TTask["status"] }
  ) => {
    moveTask(task.id, data.newStatus);
  };

  const handleDueTimeChange = (newDueTime: Date | null) => {
    setDueTimes((prevDueTimes) => ({
      ...prevDueTimes,
      [task.id]: newDueTime,
    }));
  };

  useEffect(() => {
    if (task.status === "Ongoing") {
      task.dueTime = dueTimes[task.id];
    }
  }, [dueTimes, task]);

  return (
    <div className="bg-white rounded-md p-5 my-4">
      <ContextMenuTrigger id={`context-menu-${task.id}`}>
        <div className="flex">
          <h3 className="font-medium text-lg w-full">{task?.title}</h3>
          <span
            className={`bg-blue-600 ${
              task?.status === "New"
                ? "bg-blue-600"
                : task?.status === "Ongoing"
                ? "bg-orange-600"
                : "bg-green-600"
            } text-white px-2 rounded-lg leading-7 text-xs`}
          >
            {task?.status}
          </span>
        </div>
        <p className="text-sm mt-4">{task?.description}</p>
      </ContextMenuTrigger>

      {task.status === "Ongoing" && (
        <div className="flex flex-col  justify-between gap-4 mt-5">
          <DateTimePicker
            value={dueTimes[task.id]}
            onChange={handleDueTimeChange}
          />

          <p>
            {task?.dueTime && new Date() > new Date(task?.dueTime) ? (
              <MdOutlineTimer
                size={30}
                className="text-red-500"
              />
            ) : (
              ""
            )}
          </p>
        </div>
      )}
      <ContextMenu
        className="bg-violet-500 shadow-lg p-1 rounded-md text-white"
        id={`context-menu-${task.id}`}
      >
        {task.status !== "New" && (
          <MenuItem
            className="text-xs py-2 px-4 cursor-pointer hover:text-white rounded-md hover:bg-violet-800 my-1"
            onClick={handleMove}
            data={{ newStatus: "New" }}
          >
            Move to New
          </MenuItem>
        )}
        {task.status !== "Ongoing" && (
          <MenuItem
            className="text-xs py-2 px-4 cursor-pointer hover:text-white rounded-md hover:bg-violet-800 my-1"
            onClick={handleMove}
            data={{ newStatus: "Ongoing" }}
          >
            Move to Ongoing
          </MenuItem>
        )}
        {task.status !== "Done" && (
          <MenuItem
            className="text-xs py-2 px-4 cursor-pointer hover:text-white rounded-md hover:bg-violet-800 my-1"
            onClick={handleMove}
            data={{ newStatus: "Done" }}
          >
            Move to Done
          </MenuItem>
        )}
      </ContextMenu>
    </div>
  );
}
