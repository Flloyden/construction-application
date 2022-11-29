import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { RiPencilFill } from "react-icons/ri";

export default function Notes(currentCustomer) {
  console.log(currentCustomer.currentCustomer.customerNotes);
  console.log(currentCustomer.currentCustomer.customerNotes.map((item) => {return (item.noteStatus)}));
  console.log(currentCustomer.currentCustomer.workList);


  const checkId = (e) => {
    console.log(e)
    const result = currentCustomer.currentCustomer.workList.filter(item => item.id === e);
    const newTitle = result.map((item) => {return (item.name)})
    return newTitle
  }
  const filtered = currentCustomer.currentCustomer.customerNotes.filter(obj => {return obj.noteStatus === 0})

  if (currentCustomer.currentCustomer.workList < 1) {
    return <div></div>;
  } else {

    const output = currentCustomer.currentCustomer.customerNotes.reduce((prev, { workNumber, kmDriven }) => {
      prev[workNumber] = prev[workNumber] ? prev[workNumber] + parseInt(kmDriven) : parseInt(kmDriven);
      return prev;
    }, {});
    

    console.log(output);
    console.log(filtered)
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
                <th scope="col" className="py-3 px-6">
                  Kommentar
                </th>
                <th scope="col" className="max-w-fit text-center">
                  Åtgärd
                </th>
              </tr>
            </thead>
            <tbody>
              { currentCustomer.currentCustomer.workList.map((item) => {
                  const workName = item.name
                  const status = item.status
                    return(
                      item.customerNotes.map((item, i) => {
                        return (
                          <tr className="border-b bg-red-800 border-gray-700 cursor-pointer hover:bg-opacity-90 duration-200" key={i}>
                            <th
                              scope="row"
                              className="py-4 px-6 font-medium whitespace-nowrap text-white cursor-pointer"
                            >{item.datePosted}</th>
                            <td className="py-4 px-6">{workName}</td>
                            <td className="py-4 px-6">{item.timeSpend}</td>
                            <td className="py-4 px-6">{item.kmDriven}</td>
                            <td className="py-4 px-6">{item.timeEmployee}</td>
                            <td className="py-4 px-6">{item.note}</td>
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
                        );
                }))})}
            </tbody>
          </table>
        </div>
      </div>
    );
  } 
}
  /*
  else {
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
                <th scope="col" className="py-3 px-6">
                  Kommentar
                </th>
                <th scope="col" className="max-w-fit text-center">
                  Åtgärd
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCustomer.currentCustomer.customerNotes.map((item, i) => {
                return (
                  <tr className="border-b bg-gray-800 border-gray-700 cursor-pointer hover:bg-opacity-90 duration-200" key={i}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium whitespace-nowrap text-white cursor-pointer"
                    >{item.datePosted}</th>
                    <td className="py-4 px-6">{item.workName}</td>
                    <td className="py-4 px-6">{item.timeSpend}</td>
                    <td className="py-4 px-6">{item.kmDriven}</td>
                    <td className="py-4 px-6">{item.timeEmployee}</td>
                    <td className="py-4 px-6">{item.note}</td>
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
  }
  */
/*

  if (currentCustomer.currentCustomer.customerNotes.length < 1) {
    return <div></div>;
  } if (filtered) {
    const output = currentCustomer.currentCustomer.customerNotes.reduce((prev, { workNumber, kmDriven }) => {
      prev[workNumber] = prev[workNumber] ? prev[workNumber] + parseInt(kmDriven) : parseInt(kmDriven);
      return prev;
    }, {});
    
    console.log(output);
    console.log(filtered)
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
                <th scope="col" className="py-3 px-6">
                  Kommentar
                </th>
                <th scope="col" className="max-w-fit text-center">
                  Åtgärd
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => {
                return (
                  <tr className="border-b bg-red-800 border-gray-700 cursor-pointer hover:bg-opacity-90 duration-200" key={i}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium whitespace-nowrap text-white cursor-pointer"
                    >{item.datePosted}</th>
                    <td className="py-4 px-6">{item.workName}</td>
                    <td className="py-4 px-6">{item.timeSpend}</td>
                    <td className="py-4 px-6">{item.kmDriven}</td>
                    <td className="py-4 px-6">{item.timeEmployee}</td>
                    <td className="py-4 px-6">{item.note}</td>
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
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
                <th scope="col" className="py-3 px-6">
                  Kommentar
                </th>
                <th scope="col" className="max-w-fit text-center">
                  Åtgärd
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCustomer.currentCustomer.customerNotes.map((item, i) => {
                return (
                  <tr className="border-b bg-gray-800 border-gray-700 cursor-pointer hover:bg-opacity-90 duration-200" key={i}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium whitespace-nowrap text-white cursor-pointer"
                    >{item.datePosted}</th>
                    <td className="py-4 px-6">{item.workName}</td>
                    <td className="py-4 px-6">{item.timeSpend}</td>
                    <td className="py-4 px-6">{item.kmDriven}</td>
                    <td className="py-4 px-6">{item.timeEmployee}</td>
                    <td className="py-4 px-6">{item.note}</td>
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
  }
  
*/

/*
if (currentCustomer.currentCustomer.workList < 1) {
  return <div></div>;
} else{
  return(
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
              <th scope="col" className="py-3 px-6">
                Kommentar
              </th>
              <th scope="col" className="max-w-fit text-center">
                Åtgärd
              </th>
            </tr>
          </thead>
          <tbody>
            { currentCustomer.currentCustomer.workList.map((item, i) => {
              const workName = item.name
              item.customerNotes.map((item) =>{
              console.log(item)
              console.log(workName)
              return (
                
                <tr className="border-b bg-gray-800 border-gray-700 cursor-pointer hover:bg-opacity-90 duration-200" key={i}>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium whitespace-nowrap text-white cursor-pointer"
                  >{item.datePosted}</th>
                  <td className="py-4 px-6">{workName}</td>
                  <td className="py-4 px-6">{item.timeSpend}</td>
                  <td className="py-4 px-6">{item.kmDriven}</td>
                  <td className="py-4 px-6">{item.timeEmployee}</td>
                  <td className="py-4 px-6">{item.note}</td>
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
              );
            })})}
          </tbody>
        </table>
      </div>
    </div>
)}
*/
