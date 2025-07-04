export default function Column({ key, status }) {
  return (
    <div
      key={key}
      className="py-2 px-4 border-r-2 border-gray-300 min-w-[350px] flex flex-row"
    >
      <div className="flex flex-row text-[13px] font-medium gap-3">
        <p>{status.name}</p>
        <p>|</p>
        <p className="text-gray-400">4</p>
      </div>
    </div>
  );
}
