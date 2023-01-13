import React, { useEffect, useState } from "react";
import ApiConnector from "../../services/ApiConnector";
import { RiCloseLine } from "react-icons/ri";

export default function OldNotes(props) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Gets all the clients on page load once per load
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiConnector.getNotesForSum(props.currentSumId);
        setNotes(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [props.currentSumId]);

  if (notes.length < 1) {
    return <div></div>;
  } else {
    return (
      <>
        <div className="w-screen h-screen bg-gray-500 bg-opacity-70 fixed top-0 left-0 z-10" />
        <div className="bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20">
          {!loading && (
            <div className="bg-white rounded w-fit shadow-lg">
              <div className="flex border-b-2 px-6 py-3 items-center justify-center">
                <div className="w-10/12">
                  <h1 className="font-bold">Arkiv</h1>
                </div>
                <div className="w-2/12 text-right flex justify-end">
                  <button
                    className="text-3xl opacity-70 hover:opacity-100 duration-300"
                    onClick={() => props.setOldNotesToggle(false)}
                  >
                    <RiCloseLine />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <table className="w-full text-sm text-left border bg-white opacity-100 dark:bg-gray-800 text-gray-00 shadow-xl rounded">
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
                      <th scope="col" className="max-w-fit pr-6 text-center">
                        Kommentar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="rounded hover:bg-gray-900">
                    {notes.map((item, i) => {
                      return (
                        <tr
                          className="bg-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 border-b-2 border-gray-300"
                          key={i}
                        >
                          <th
                            scope="row"
                            className="py-4 px-6 font-medium whitespace-nowrap cursor-pointer"
                          >
                            {item.datePosted}
                          </th>
                          <td className="py-4 px-6">{item.workName}</td>
                          <td className="py-4 px-6">{item.timeSpend}</td>
                          <td className="py-4 px-6">{item.kmDriven}</td>
                          <td className="py-4 px-6">{item.timeEmployee}</td>
                          <td className="py-4 px-6">{item.note}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
