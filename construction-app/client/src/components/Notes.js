import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { RiPencilFill } from "react-icons/ri";

export default function Notes() {
  if (1 === 2) {
    return <div></div>;
  } else {
    return (
      <div>
        <h2 className="text-3xl pt-10 pb-2">Anteckningar</h2>
        <div className="bg-gray-700 py-2 rounded-md">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Datum
                </th>
                <th scope="col" className="py-3 px-6">
                  Jobb
                </th>
                <th scope="col" className="py-3 px-6">
                  Tid
                </th>
                <th scope="col" className="py-3 px-6">
                  Körning
                </th>
                <th scope="col" className="py-3 px-6">
                  Antälld tid
                </th>
                <th scope="col" className="max-w-fit text-center">
                  Åtgärd
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-gray-800 border-gray-700 cursor-pointer hover:bg-opacity-90 duration-200">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium whitespace-nowrap text-white cursor-pointer"
                ></th>
                <td className="py-4 px-6 text-white"></td>
                <td className="py-4 px-6"></td>
                <td className="py-4 px-6"></td>
                <td className="py-4 px-6"></td>
                <td className="flex justify-around py-2 items-end">
                  <div className="flex justify-end">
                    <button className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 mr-2 text-blue-600 h-fit hover:bg-slate-200">
                      <RiPencilFill />
                    </button>
                    <button className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 text-red-600 h-fit hover:bg-slate-200">
                      <RiCloseLine />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
