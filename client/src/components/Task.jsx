import { useToggle } from "@uidotdev/usehooks";
import { useState } from "react";
import useTasksContext from "./contexts/task/useTasksContext";
import { cn } from "../utils";

const Priority = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export default function Task({ task, name }) {
  const { updateTask, getTaskById, status,deleteTask } = useTasksContext();

  const [modal, toggleModal] = useToggle(false);
  const [optionStatus, toggleStatus] = useToggle(false);
  const [optionPriority, togglePriority] = useToggle(false);
  const [del, toggleDelete] = useToggle(false);
  const [input, setInput] = useState({});
  const [field, setField] = useState();

  const handleInputChange = (field, value) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputBlur = async () => {
    const latestTask = await getTaskById(task._id);
    if (input[field] !== latestTask[field]) {
      await updateTask(task._id, { [field]: input[field] });
    }
  };
  return (
    <>
      <div
        onClick={() => {
          toggleModal();
        }}
        className={cn(
          "break-words border-2 border-b-4 text-[15px] px-[20px] pt-[15px] pb-[20px] rounded-[10px] cursor-pointer",
          task.priority === "low" ? "border-green-400" : "",
          task.priority === "medium" ? "border-yellow-400" : "",
          task.priority === "high" ? "border-red-500" : ""
        )}
      >
        {task.title}
      </div>
      {modal && (
        <div
          onClick={() => {
            toggleModal();
          }}
          className="absolute top-0 left-0 w-screen h-screen bg-[#0000004D] flex flex-col justify-center items-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={cn(
              "bg-white w-[800px] h-[630px] rounded-[10px] p-10 flex flex-col gap-10 border-2 border-b-4",
              task.priority === "low" ? "border-green-400" : "",
              task.priority === "medium" ? "border-yellow-400" : "",
              task.priority === "high" ? "border-red-500" : ""
            )}
          >
            <div className="flex flex-row justify-between items-center">
              <p className="font-semibold text-[25px]">Task details</p>
              <div className="flex flex-row gap-3 items-center">
                <div
                  onClick={() => {
                    toggleDelete();
                  }}
                  className="cursor-pointer relative"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {del && (
                    <div
                      onClick={async (e) => {
                        e.stopPropagation();
                        const confirmDelete = window.confirm(
                          "Are you sure you want to delete this task?"
                        );
                        if (confirmDelete) {
                          await deleteTask(task._id);
                        }
                      }}
                      className="absolute top-full right-0 py-2 px-4 w-[100px] text-red-500 rounded-[5px] shadow-sm border border-gray-200 "
                    >
                      Delete
                    </div>
                  )}
                </div>
                <div
                  onClick={() => {
                    toggleModal();
                    toggleDelete(false)
                  }}
                  className="hover:bg-gray-100 cursor-pointer transition-colors  rounded-full p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-9"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className=" flex flex-col grow gap-5">
              <div className="grid grid-cols-6 gap-y-1 cursor-default">
                <div className="text-gray-700 col-span-2 py-[10px]  border-2 border-transparent">
                  Title
                </div>

                <input
                  onChange={(e) => {
                    handleInputChange("title", e.target.value);
                    setField("title");
                  }}
                  onBlur={handleInputBlur}
                  className="col-span-4 py-[10px] rounded-[4px] px-[6px] border-[1.5px] border-transparent hover:border-gray-200 cursor-pointer"
                  value={input.title ?? task.title}
                />

                <div className="text-gray-700 col-span-2 py-[10px]  border-2 border-transparent">
                  Status
                </div>
                <div
                  onClick={() => {
                    toggleStatus();
                  }}
                  className="relative col-span-4 py-[10px] rounded-[4px] px-[6px] border-[1.5px] border-transparent hover:border-gray-200 cursor-pointer"
                >
                  {name}
                  {optionStatus && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="absolute z-10 left-0 top-[110%] rounded-[5px] shadow-[0_0_5px_rgba(0,0,0,0.20)] border border-gray-200 bg-white w-full p-[20px] cursor-default "
                    >
                      {status &&
                        status.map((stat) => (
                          <div
                            key={stat._id}
                            onClick={async (e) => {
                              e.stopPropagation();

                              await updateTask(task._id, {
                                statusId: stat._id,
                              });
                              toggleStatus();
                            }}
                            className="px-5 py-3 border border-transparent hover:border-gray-100 hover:bg-gray-100 rounded-[5px] text-sm cursor-pointer"
                          >
                            {stat.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div className="text-gray-700 col-span-2 py-[10px]  border-2 border-transparent">
                  Priority
                </div>
                <div
                  onClick={() => {
                    togglePriority();
                  }}
                  className="relative col-span-4 py-[10px] rounded-[4px] px-[6px] border-[1.5px] border-transparent hover:border-gray-200 cursor-pointer"
                >
                  {task.priority}
                  {optionPriority && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="absolute left-0 top-[110%] rounded-[5px] shadow-[0_0_5px_rgba(0,0,0,0.20)] border border-gray-200 bg-white w-full p-[20px] cursor-default "
                    >
                      {Priority.map((prio) => (
                        <div
                          key={prio.value}
                          onClick={async (e) => {
                            e.stopPropagation();

                            await updateTask(task._id, {
                              priority: prio.value,
                            });
                            togglePriority();
                          }}
                          className="px-5 py-3 border border-transparent hover:border-gray-100 hover:bg-gray-100 rounded-[5px] text-sm cursor-pointer"
                        >
                          {prio.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-gray-700 col-span-2 py-[10px] border-2 border-transparent">
                  Created at
                </div>

                <div className=" col-span-4 py-[10px] px-[6px] ">
                  {new Date(task.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </div>
                <div className="text-gray-700 col-span-2 py-[10px] border-2 border-transparent">
                  Updated at
                </div>
                <div className=" col-span-4 py-[10px] px-[6px]">
                  {new Date(task.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </div>
              </div>

              <textarea
                value={input.description ?? task.description}
                onChange={(e) => {
                  handleInputChange("description", e.target.value);
                  setField("description");
                }}
                onBlur={handleInputBlur}
                className="grow border border-gray-200 rounded-[3px] p-5 whitespace-pre-line cursor-pointer resize-none overflow-hidden h-auto"
                rows={3}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
