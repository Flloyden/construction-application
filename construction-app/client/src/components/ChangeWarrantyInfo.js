import { useRef, useState } from "react";
import ApiConnector from "../services/ApiConnector";

const ChangeWarrantyInfo = ({
  setIsChangeWarrantyOpen,
  currentWarrantyId,
  currentWarrantyName,
  currentWarrantyReg,
  currentWarrantyDate,
  currentWarrantyReceipt,
}) => {
  const [warranty, setWarranty] = useState({
    id: currentWarrantyId,
    name: currentWarrantyName,
    registration_number: currentWarrantyReg,
    warranty_date: currentWarrantyDate,
    receipt: currentWarrantyReceipt,
  });
  const [image, setImage] = useState("");
  const receipt = useRef();

  const handleChange = (e) => {
    /**Gets the current input every keystroke
     * and sets the value to warranty
     */
    const value = e.target.value;
    setWarranty({
      ...warranty,
      [e.target.name]: value,
      [e.target.receipt]: image,
      [e.target.registration_number]: value,
      [e.target.warranty_date]: value,
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
    setImage(base64);
  };

  const saveChanges = (e) => {
    /**Saves the warranty and navigates back to the register */
    e.preventDefault();
    // Check if all input fields are ok
    if (
      warranty.name.length > 1 &&
      warranty.address.length > 1 &&
      warranty.phoneNumber.length > 1 &&
      warranty.propertyDesignation.length > 0 &&
      warranty.socialSecurityNumber.length > 1
    ) {
      // Makes the api call to save changes
      ApiConnector.saveWarranty(warranty)
        .then((response) => {
          console.log(response);
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Fyll i alla fält");
    }
  };

  return (
    <>
      <div
        className="w-screen h-screen bg-slate-700 bg-opacity-70 fixed top-0 left-0"
        onClick={() => setIsChangeWarrantyOpen(false)}
      />
      <div className="bg-white fixed inset-0 flex items-center justify-center w-2/4 h-max m-auto rounded-lg p-4">
        <div className="w-full">
          <h1 className="text-4xl">Ändra garanti-information</h1>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 text-gray-700">
              Namn:{" "}
            </label>
            <input
              className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="name"
              required
              value={warranty.name}
              placeholder={currentWarrantyName}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 text-gray-700">
              Kvitto:{" "}
            </label>
            <input
              ref={receipt}
              className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              type="file"
              name="offer"
              accept="image/png, image/jpg, image/jpeg"
              value={warranty.address}
              placeholder={currentWarrantyReceipt}
              onChange={(e) => handleFile(e)}
            ></input>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 text-gray-700">
              Registreringsnummer:{" "}
            </label>
            <input
              className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="registration_number"
              value={warranty.registration_number}
              placeholder={currentWarrantyReg}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 text-gray-700">
              Utgångsdatum garanti:{" "}
            </label>
            <input
              className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="warranty_date"
              value={warranty.warranty_date}
              placeholder={currentWarrantyDate}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
            <button
              className="bg-red-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
              onClick={() => setIsChangeWarrantyOpen(false)}
            >
              Avbryt
            </button>
            <button
              className="bg-green-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
              onClick={saveChanges}
            >
              Spara
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeWarrantyInfo;
