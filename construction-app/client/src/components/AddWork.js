import { useRef, useState } from "react";
import ApiConnector from "../services/ApiConnector";

const AddWork = ({
  setIsWorkOpen,
  currentCustomerName,
  currentCustomerId,
  currentCustomerAddress,
  currentCustomerPhone,
  currentCustomerProperty,
  currentCustomerSSN,
  currentCustomerWorkList,
  currentCustomerNotes,
}) => {
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
    console.log(e)
    let value = e.target.value;
    console.log(value);
    setWork({
      ...work,
      [e.target.name]: value,
    });
    console.log(work);
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
    ApiConnector.saveWork(currentCustomerId, work)
      .then((response) => {
        console.log(response);
        //window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className="w-screen h-screen bg-slate-700 bg-opacity-70 fixed top-0 left-0"
        onClick={() => setIsWorkOpen(false)}
      />
      <div className="bg-white fixed inset-0 flex items-center justify-center w-2/4 h-max m-auto rounded-lg p-4">
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl">Lägg till nytt jobb</h1>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Namn på jobb:{" "}
              </label>
              <input
                className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
              className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              type="file"
              name="offer"
              accept="image/png, image/jpg, image/jpeg, application/pdf"
              //value={image}
              required
              onChange={(item) => {handleFile(item)}}
            ></input>

            <div className="mt-4">
              <div className="flex gap-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Antal dagar:
                </label>
                <input
                  ref={dayCountRef}
                  className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  name="numberOfDays"
                  value={work.numberOfDays}
                  required
                  onChange={handleChange}
                ></input>
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Material:{" "}
              </label>
              <input
                className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="materialNote"
                value={work.materialNote}
                required
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
              <button
                className="bg-red-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
                onClick={() => setIsWorkOpen(false)}
              >
                Avbryt
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
              >
                Spara
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddWork;
