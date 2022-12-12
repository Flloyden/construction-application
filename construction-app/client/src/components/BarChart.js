import React from "react";

export default function BarChart() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h2 className="text-xl font-bold">Månadsjobb</h2>
      <span className="text-sm font-semibold text-gray-500">2022</span>
      <div className="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            37
          </span>
          <div className="relative flex justify-center w-full h-16 bg-gradient-to-b from-cyan-500 to-blue-500 "></div>
          <span className="absolute bottom-0 text-xs font-bold">Jan</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            45
          </span>
          <div className="relative flex justify-center w-full h-20 bg-gradient-to-b from-cyan-500 to-blue-500 "></div>
          <span className="absolute bottom-0 text-xs font-bold">Feb</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            47
          </span>
          <div className="relative flex justify-center w-full h-20 bg-gradient-to-b from-cyan-500 to-blue-500 "></div>
          <span className="absolute bottom-0 text-xs font-bold">Mar</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            50
          </span>
          <div className="relative flex justify-center w-full h-24 bg-gradient-to-b from-cyan-500 to-blue-500 "></div>
          <span className="absolute bottom-0 text-xs font-bold">Apr</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            47
          </span>
          <div className="relative flex justify-center w-full h-20 bg-gradient-to-b from-cyan-500 to-blue-500 "></div>
          <span className="absolute bottom-0 text-xs font-bold">Maj</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            55
          </span>
          <div className="relative flex justify-center w-full h-24 bg-gradient-to-b from-cyan-500 to-blue-500 "></div>
          <span className="absolute bottom-0 text-xs font-bold">Jun</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            60
          </span>
          <div className="relative flex justify-center w-full h-20 bg-gradient-to-b from-cyan-500 to-blue-500 "></div>
          <span className="absolute bottom-0 text-xs font-bold">Jul</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            57
          </span>
          <div className="relative flex justify-center w-full h-24 bg-gradient-to-b from-cyan-500 to-blue-500 "></div>
          <span className="absolute bottom-0 text-xs font-bold">Aug</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            67
          </span>
          <div className="relative flex justify-center w-full h-32 bg-gradient-to-b from-cyan-500 to-blue-500 "></div>
          <span className="absolute bottom-0 text-xs font-bold">Sep</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            65
          </span>
          <div className="relative flex justify-center w-full bg-gradient-to-b from-cyan-500 to-blue-500  h-28"></div>
          <span className="absolute bottom-0 text-xs font-bold">Oct</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            70
          </span>
          <div className="relative flex justify-center w-full h-40 bg-gradient-to-b from-cyan-500 to-blue-500 "></div>
          <span className="absolute bottom-0 text-xs font-bold">Nov</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            75
          </span>
          <div className="relative flex justify-center w-full h-40 bg-gradient-to-b from-cyan-500 to-blue-500 "></div>
          <span className="absolute bottom-0 text-xs font-bold">Dec</span>
        </div>
      </div>
    </div>
  );
}
