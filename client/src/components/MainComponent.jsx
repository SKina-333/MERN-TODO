import Column from "./Column";
import useTasksContext from "./contexts/task/useTasksContext";

export default function MainComponent() {
  const { tasksByStatus } = useTasksContext();
  return (
    <div className=" flex flex-row grow w-auto max-w-full overflow-x-auto p-8">
      {tasksByStatus &&
        Object.entries(tasksByStatus).map(
          ([statusId, { statusName, statusTasks, count }]) => (
            <Column
              key={statusId}
              name={statusName}
              tasks={statusTasks}
              count={count}
            />
          )
        )}
      <div className="flex flex-row cursor-pointer rounded-xl items-center px-5 hover:bg-gray-100 transition-colors duration-500 ml-2">
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
    </div>
  );
}
