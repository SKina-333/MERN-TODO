import { useToggle } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import Column from "./Column";
import useTasksContext from "./contexts/task/useTasksContext";

export default function MainComponent() {
  const { tasksByStatus, createStatus, deleteStatus } = useTasksContext();

  const [selectedColumn, setSelectedColumn] = useState(0);
  const [statusOptions, toggleStatus] = useToggle(false);
  const [selectedID, setSelectedID] = useState();

  const [statusName, setStatusName] = useState("");
  const [newColumn, toggleColumn] = useToggle(false);

  const handleBlur = async () => {
    if (statusName.trim() !== "") {
      await createStatus({ name: statusName });
      setStatusName("");
    }
    toggleColumn(false);
  };

  useEffect(() => {
    if (tasksByStatus) {
      setSelectedID(Object.keys(tasksByStatus)[0]);
    }
  }, [tasksByStatus]);

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden flex flex-col gap-5 h-96 grow ">
        {tasksByStatus && Object.entries(tasksByStatus).length != 0 && (
          <div className="relative">
            <div className="flex flex-row justify-between items-center">
              <div className="p-2 border border-gray-300 shadow-sm rounded-[10px]">
                <div
                  onClick={() => {
                    toggleStatus();
                  }}
                  className="flex flex-row gap-3"
                >
                  <p>
                    {
                      !newColumn ?
                      Object.entries(tasksByStatus)[selectedColumn][1]
                        .statusName : "Create Column"
                    }
                  </p>
                  <p>|</p>
                  <p className="text-gray-400">
                    {!newColumn ? Object.entries(tasksByStatus)[selectedColumn][1].count : "0"}
                  </p>
                </div>
              </div>
              <div
                onClick={async (e) => {
                  e.stopPropagation();
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete this column?"
                  );
                  if (confirmDelete) {
                    await deleteStatus(selectedID);
                    setSelectedColumn(0);
                  }
                }}
                className="p-2 border border-gray-200 rounded-[5px] shadow-sm"
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
            </div>

            {statusOptions && (
              <div className="absolute top-[110%] rounded-[10px] shadow-md bg-white p-5 w-[160px] flex flex-col">
                {Object.entries(tasksByStatus).map(
                  ([statusId, { statusName }], i) => (
                    <div
                      className=" p-1"
                      key={statusId}
                      onClick={() => {
                        setSelectedColumn(i);
                        setSelectedID(statusId);
                        toggleStatus(false);
                        toggleColumn(false)
                      }}
                    >
                      {statusName}
                    </div>
                  )
                )}
                <div
                  onClick={() => {
                    toggleStatus(false);
                    toggleColumn();
                  }}
                  className="p-1 mt-3"
                >
                  Create Column
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grow flex flex-col h-min max-h-full overflow-y-scroll ">
          {newColumn ? (
            <Column create={true} selectColumn={setSelectedColumn} selectID={selectedID}/>
          ) : selectedID && tasksByStatus[selectedID] ? (
            <Column
              create={false}
              key={selectedID}
              id={selectedID}
              name={tasksByStatus[selectedID].statusName}
              tasks={tasksByStatus[selectedID].statusTasks}
              count={tasksByStatus[selectedID].count}
            />
          ) : (
            <Column create={true} />
          )}
        </div>
      </div>
      {/* Desktop View */}
      <div className=" p-8 hidden lg:flex flex-row grow w-auto max-w-full overflow-x-auto">
        {tasksByStatus && Object.entries(tasksByStatus).length != 0 ? 
          Object.entries(tasksByStatus).map(
            ([statusId, { statusName, statusTasks, count }]) => (
              <Column
                key={statusId}
                id={statusId}
                name={statusName}
                tasks={statusTasks}
                count={count}
              />
            )
          ) : ''}
        {!newColumn ? (
          <div
            onClick={() => {
              toggleColumn();
            }}
            className="flex flex-row cursor-pointer rounded-xl items-center px-5 hover:bg-gray-100 transition-colors duration-500 ml-2"
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
          <div className="py-2 px-4 border-r-2 border-gray-300 min-w-[350px] flex flex-col gap-5">
            <div className="flex flex-row gap-3 self-start  cursor-pointer items-center">
              <div className="flex flex-row gap-3 text-[13px] font-medium shadow-xs shadow-gray-300 p-2 rounded-[8px] hover:shadow-gray-500 transition-all duration-300">
                <input
                  type="text"
                  onBlur={handleBlur}
                  placeholder="Type new column name..."
                  onChange={(e) => {
                    setStatusName(e.target.value);
                  }}
                  value={statusName}
                  className="cursor-pointer w-[180px]"
                />
                <p>|</p>
                <p className="text-gray-400">0</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
