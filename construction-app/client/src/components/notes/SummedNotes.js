import React, { useEffect, useState } from "react";
import ApiConnector from "../../services/ApiConnector";
import OldNotes from "./OldNotes";

export default function SummedNotes(props) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [oldNotesToggle, setOldNotesToggle] = useState(false);
  const [currentWorkId, setCurrentWorkId] = useState("");

  useEffect(() => {
    // Gets all the clients on page load once per load
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiConnector.getSummedNotes(
          props.currentCustomer
        );
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
      <div className="mt-6">
        <h1 className="mt-4">Summerade</h1>
        {!loading && (
          <table className="w-full text-sm text-left bg-white dark:bg-gray-800 text-gray-00 shadow-md rounded mt-2">
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
                  Akriv
                </th>
              </tr>
            </thead>
            <tbody className="rounded hover:bg-gray-900">
              {notes.slice(0).reverse().map((item, i) => {
                return (
                  <tr
                    className="bg-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 border-b-2 border-gray-300"
                    key={i}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium whitespace-nowrap"
                    >
                      {item.datePostedSum}
                    </th>
                    <td className="py-4 px-6">{item.workName}</td>
                    <td className="py-4 px-6">{item.timeSpendSum}</td>
                    <td className="py-4 px-6">{item.kmDrivenSum}</td>
                    <td className="py-4 px-6">{item.timeEmployeeSum}</td>
                    <td className="flex justify-around align-middle py-2 items-end">
                      <div
                        className="flex justify-end"
                        onClick={() => {
                          setOldNotesToggle(true);
                          setCurrentWorkId(item.workNumber);
                        }}
                      >
                        <p className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded h-fit font-normal cursor-pointer">Öppna</p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {oldNotesToggle && <OldNotes currentWorkId={currentWorkId} setOldNotesToggle={setOldNotesToggle} />}
      </div>
    );
  }
}
