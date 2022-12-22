import { useRef, useState } from "react";
import ApiConnector from "../services/ApiConnector";
import { RiCloseLine } from "react-icons/ri";

const AddWork = (props) => {
  const [work, setWork] = useState({
    id: "",
    name: "",
    numberOfDays: "",
    materialNote: "",
    offer: "",
    startDate: "",
    workStatus: "NOTSTARTED",
    calendar: [],
  });
  const dayCountRef = useRef();

  const handleChange = (e) => {
    let value = e.target.value;
    setWork({
      ...work,
      [e.target.name]: value,
    });
  };

  const convertToBase64 = (file) => {
    /**Converts file int base64 */
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFile = async (e) => {
    /**Gets the file from input and makes it into base64 and saves it */
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setWork({
      ...work,
      offer: base64,
    });
    return base64;
  };

  const handleSubmit = (e) => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    // Adds work to user with api call
    ApiConnector.saveWork(props.currentCustomerId, work)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="w-screen h-screen bg-gray-500 bg-opacity-70 fixed top-0 left-0 z-10" />
      <div className="bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20">
        <form onSubmit={handleSubmit} className="bg-white rounded">
          <div className="flex border-b-2 px-6 py-3 items-center justify-center">
            <div className="w-10/12">
              <h1 className="font-bold">Nytt jobb</h1>
            </div>
            <div className="w-2/12 text-right flex justify-end">
              <button
                className="text-3xl opacity-70 hover:opacity-100 duration-300"
                onClick={() => props.setIsWorkOpen(false)}
              >
                <RiCloseLine />
              </button>
            </div>
          </div>
          <div className="w-fit shadow-lg rounded-md p-6">
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Namn på jobb: <span className="text-red-700 font-black">*</span>
              </label>
              <input
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                name="name"
                value={work.name}
                required
                onChange={handleChange}
              ></input>
            </div>

            <div className="mt-4"></div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Offert:{" "}
            </label>
            <input
              className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              type="file"
              name="offer"
              accept="application/pdf"
              onChange={(item) => {
                handleFile(item);
              }}
            ></input>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Antal dagar: <span className="text-red-700 font-black">*</span>
              </label>
              <input
                ref={dayCountRef}
                className="rounded block w-1/4 p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="number"
                min={0}
                name="numberOfDays"
                value={work.numberOfDays}
                required
                onChange={handleChange}
              ></input>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Material:{" "}
              </label>
              <textarea
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="textarea"
                name="materialNote"
                value={work.materialNote}
                required
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
              <button
                className="bg-gray-600 hover:bg-gray-500 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
                onClick={() => props.setIsWorkOpen(false)}
              >
                Avbryt
              </button>
              <button
                type="submit"
                className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-2/4 duration-300"
              >
                Spara
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddWork;
