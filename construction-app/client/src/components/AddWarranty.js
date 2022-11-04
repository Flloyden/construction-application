import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import DatePicker from "react-datepicker";

const AddWaranty = () => {
  // Declare variables
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const receipt = useRef();
  let [endDate, setEndDate] = useState(new Date());
  const nameRef = useRef();
  const regRef = useRef();
  const [warranty, setWarranty] = useState({
    id: "",
    name: "",
    receipt: "",
    registration_number: "",
    warranty_date: "",
  });

  const handleChange = (e) => {
    setWarranty({
      id: "",
      name: nameRef.current.value,
      receipt: image,
      registration_number: regRef.current.value,
      warranty_date: endDate,
    });
    console.log(warranty)
  };

  const saveWarranty = (e) => {
    /**Saves the warranty and navigates back to the register */
    e.preventDefault();
    // Check if all input fields are ok
    if (
      warranty.name.length > 1 &&
      warranty.registration_number.length > 1 &&
      endDate > 0
    ) {
      ApiConnector.saveWarranty(warranty)
        .then((response) => {
          console.log(response);
          navigate("/garantier");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Fyll i alla fält");
    }
  };

  const clearInputs = () => {
    /**Empties the input fields */
    setWarranty({
      id: "",
      name: "",
      receipt: "",
      registration_number: "",
      warranty_date: "",
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
    setImage(base64);
  };

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-screen">
      <h1 className="text-4xl">Skapa en ny garanti</h1>
      <div className="w-full">
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Namn:{" "}
          </label>
          <input
            ref={nameRef}
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="name"
            required
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="mt-4"></div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Offert: </label>
          <input
            ref={receipt}
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="file"
            name="receipt"
            accept="image/png, image/jpg, image/jpeg, application/pdf"
            onChange={(e) => handleFile(e)}
          ></input>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Registreringsnummer:{" "}
          </label>
          <input
            ref={regRef}
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="registration_number"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="mt-4">
          <label onClick={handleChange}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Utgångsdatum:{" "}
            </label>
            <DatePicker
              className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                handleChange(date);
              }}
              selectsStart
              startDate={endDate}
            />
          </label>
        </div>

        <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
          <button
            className="bg-red-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
            onClick={() => navigate("/garantier")}
          >
            Avbryt
          </button>
          <button
            className="bg-green-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
            onClick={saveWarranty}
          >
            Spara
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWaranty;
