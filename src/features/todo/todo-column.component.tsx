import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
  Textarea,
} from "@headlessui/react";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { TodoItem } from "./todo-item.component";
import { TColumnProps } from "./type";

export function TodoCol({ title, tasks, moveTask, addTask }: TColumnProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });

  const handleAddTask = () => {
    if (newTask.title && newTask.description && addTask) {
      addTask(newTask.title, newTask.description);
      setNewTask({ title: "", description: "" });
    }
    close();
  };

  return (
    <div className="bg-slate-200 text-black w-full rounded-lg p-5 shadow-lg h-fit min-h-40">
      <h2>{title}</h2>
      <br />
      {tasks?.map((x) => (
        <TodoItem
          moveTask={moveTask}
          task={x}
          key={x?.id}
        />
      ))}

      {addTask ? (
        <button
          onClick={open}
          className="mt-4 bg-stone-950 text-white rounded-md px-4 py-2 flex gap-2 items-center"
        >
          <BiPlus size={20} /> Add a Todo
        </button>
      ) : null}

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/95">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-slate-200 text-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium "
              >
                Add New Todo
              </DialogTitle>
              <div className="new-task-form">
                <Input
                  type="text"
                  placeholder="Title"
                  value={newTask.title}
                  className="mt-3 block w-full rounded-lg border-none bg-white py-1.5 px-3 text-sm/6"
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={newTask.description}
                  rows={3}
                  className="mt-3 block w-full resize-none rounded-lg bg-white py-1.5 px-3 text-sm/6 "
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-black py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleAddTask}
                >
                  Save
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
