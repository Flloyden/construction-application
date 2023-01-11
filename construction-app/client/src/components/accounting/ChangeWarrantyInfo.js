import { useRef, useState } from "react";
import ApiConnector from "../../services/ApiConnector";
import { RiCloseLine } from "react-icons/ri";
import DatePicker from "react-datepicker";

const ChangeWarrantyInfo = ({
  setIsChangeWarrantyOpen,
  currentWarrantyId,
  currentWarrantyName,
  currentWarrantyReg,
  currentWarrantyDate,
  currentWarrantyReceipt,
  currentDnumber,
}) => {
  const [warranty, setWarranty] = useState({
    id: currentWarrantyId,
    name: currentWarrantyName,
    receipt: currentWarrantyReceipt,
    registration_number: currentWarrantyReg,
    d_number: currentDnumber,
    warranty_date: new Date(currentWarrantyDate),
  });
  const receipt = useRef();

  const handleChange = (e) => {
    let value = e.target.value;
    setWarranty({
      ...warranty,
      [e.target.name]: value,
    });
  };

  const convertToBase64 = (file) => {
    /**Converts a file into base64 */
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
    setWarranty({
      ...warranty,
      receipt: base64,
    });
    return base64;
  };

  const handleSubmit = (e) => {
    /**Saves the warranty and navigates back to the register */
    e.preventDefault();
    // Makes the api call to save changes
    ApiConnector.saveWarranty(warranty)
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
              <h1 className="font-bold">Ändra information</h1>
            </div>
            <div className="w-2/12 text-right flex justify-end">
              <button
                className="text-3xl opacity-70 hover:opacity-100 duration-300"
                onClick={() => setIsChangeWarrantyOpen(false)}
              >
                <RiCloseLine />
              </button>
            </div>
          </div>
          <div className="w-fit shadow-lg rounded-md p-6">
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Namn på garanti:{" "}
                <span className="text-red-700 font-black">*</span>
              </label>
              <input
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                name="name"
                required
                value={warranty.name}
                onChange={handleChange}
              ></input>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Kvitto: (Befintlig ersätts om ny laddas upp){" "}
              </label>
              <input
                ref={receipt}
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="file"
                name="offer"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(item) => {
                  handleFile(item);
                }}
              ></input>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Registreringsnummer:{" "}
                <span className="text-red-700 font-black">*</span>
              </label>
              <input
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                name="registration_number"
                value={warranty.registration_number}
                onChange={handleChange}
              ></input>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Diarienummer: <span className="text-red-700 font-black">*</span>
              </label>
              <input
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                name="d_number"
                value={warranty.d_number}
                onChange={handleChange}
              ></input>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Utgångsdatum: <span className="text-red-700 font-black">*</span>{" "}
              </label>
              <DatePicker
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                selected={warranty.warranty_date}
                value={warranty.warranty_date}
                calendarStartDay={1}
                onChange={(date) =>
                  setWarranty({
                    ...warranty,
                    warranty_date: new Date(date),
                  })
                }
                selectsStart
                startDate={warranty.warranty_date}
              />
            </div>

            <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
              <button
                className="bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded duration-300 text-center w-2/4"
                onClick={() => setIsChangeWarrantyOpen(false)}
              >
                Avbryt
              </button>
              <button
                type="submit"
                className="bg-blue-500 rounded text-white hover:bg-blue-600 py-2 px-4 w-2/4 duration-300"
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

export default ChangeWarrantyInfo;
