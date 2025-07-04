import Task from "./task";
export default function Column({ name, tasks, count }) {
  return (
    <div className="py-2 px-4 border-r-2 border-gray-300 min-w-[350px] flex flex-col gap-5">
      <div className="flex flex-row text-[13px] font-medium gap-3">
        <p>{name}</p>
        <p>|</p>
        <p className="text-gray-400">{count}</p>
      </div>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <Task key={task._id} task={task} name={name} />
        ))}

        <div className="flex flex-row justify-center items-center h-[63px] rounded-[10px] cursor-pointer hover:bg-gray-200 transition-colors duration-500">
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
    </div>
  );
}
