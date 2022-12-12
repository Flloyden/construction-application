import React, { useEffect, useState } from "react";
import ApiConnector from "../services/ApiConnector";
import OldNotes from "./OldNotes";

export default function SummedNotes(props) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Gets all the clients on page load once per load
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiConnector.getSummedNotes(props.currentCustomer);
        console.log(response.data)
        setNotes(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [props.currentCustomer]);

  if (notes.length < 1) {
    return <div></div>;
  } else {
    return (
      <div>
        {!loading && (
        <table className="w-full text-sm text-left bg-white dark:bg-gray-800 text-gray-00 shadow-md rounded mt-4">
          <thead className="text-xs uppercase  text-gray-500  rounded border-b-2 border-gray-300">
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
          <tbody className="rounded hover:bg-gray-900">
            {notes.map((item, i) => {
              return (
                <tr
                  className="bg-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 border-b-2 border-gray-300 cursor-pointer hover:bg-opacity-90 duration-200"
                  key={i}
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium whitespace-nowrap cursor-pointer"
                  >
                    {item.datePostedSum}
                  </th>
                  <td className="py-4 px-6">{item.workName}</td>
                  <td className="py-4 px-6">{item.timeSpendSum}</td>
                  <td className="py-4 px-6">{item.kmDrivenSum}</td>
                  <td className="py-4 px-6">{item.timeEmployeeSum}</td>
                  <td className="flex justify-around py-2 items-end">
                    <div className="flex justify-end">
                    <p className="px-1 py-1 h-fit">Visa anteckningar</p>
                    <OldNotes currentWorkId={item.workNumber} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        )}
      </div>
    );
  }
}
