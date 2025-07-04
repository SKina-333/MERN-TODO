export default function Navbar() {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <p className=" text-[30px] font-semibold">TODO APP</p>
      <div className="relative w-[50px] h-[25px] bg-gray-300 rounded-full cursor-pointer">
        <div className="absolute w-[20px] h-[20px] rounded-full bg-gray-500 left-[2.5px] top-[2.5px]"></div>
      </div>
    </div>
  );
}
