import { useToggle } from "@uidotdev/usehooks";
import Task from "./task";
import useTasksContext from "./contexts/task/useTasksContext";
import { useState } from "react";
export default function Column({ name, tasks, count, id, create, selectedColumn, selectedId }) {
  const { createTask, updateStatus, deleteStatus, createStatus } = useTasksContext();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(name);
  const [newTask, toggleTask] = useToggle(false);
  const [column, setColumn] = useState("")
  const [del, toggleDelete] = useToggle(false);

  const handleBlur = async () => {
    console.log(title);
    console.log(id);
    if (title.trim() !== "" && id) {
      await createTask({ title, statusId: id });
      setTitle("");
    }
    toggleTask(false);
  };

  return (
    <>
      {!create ? (
        <div className="py-2 lg:px-4 grow flex flex-col gap-5 min-w-[350px] overflow-y-auto lg:border-r-2 border-gray-300">
          <div
            onClick={() => {
              toggleDelete();
            }}
            className="lg:flex hidden flex-row gap-3 self-start cursor-pointer items-center"
          >
            <div className="p-2 rounded-[8px] flex flex-row gap-3 text-[13px] font-medium shadow-xs shadow-gray-300 hover:shadow-gray-500 transition-all duration-300">
              <input
                type="text"
                onBlur={async () => {
                  if (name !== status) {
                    await updateStatus({ id, name: status });
                  }
                }}
                style={{ width: `${name.length + 1}ch` }}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                className="cursor-pointer"
              />
              <p>|</p>
              <p className="text-gray-400">{count}</p>
            </div>
            {del && (
              <div
                onClick={async (e) => {
                  e.stopPropagation();
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete this column?"
                  );
                  if (confirmDelete) {
                    await deleteStatus(id);
                  }
                }}
                className=" p-1 rounded-[5px] border border-gray-100 shadow-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <Task key={task._id} task={task} name={name} />
            ))}
            {!newTask ? (
              <div
                onClick={() => {
                  toggleTask();
                }}
                className="flex flex-row justify-center items-center px-[20px] pt-[15px] pb-[20px] h-[63px] rounded-[10px] cursor-pointer hover:bg-gray-200 transition-colors duration-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            ) : (
              <input
                value={title}
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Add new task..."
                onBlur={handleBlur}
                className="flex flex-row justify-center items-center px-[20px] pt-[15px] pb-[20px] h-[63px] rounded-[10px] cursor-pointer border-2 border-b-4 border-gray-400"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="lg:hidden  py-2 grow flex flex-col gap-5 min-w-[350px] overflow-y-auto">
          <input
            type="text"
            placeholder="Create Column..."
            onBlur={async () => {
              if (column.trim() !== "") {
                await createStatus({ name: column })
                setColumn("")
              }
            }}
            value={column}
            onChange={(e)=>{setColumn(e.target.value)}}
            className="border p-2 border-gray-200 rounded-[5px]"
          />
        </div>
      )}
    </>
  );
}
