import React, { useRef, useState } from "react";
import ApiConnector from "../services/ApiConnector";
import DatePicker from "react-datepicker";
import { RiCloseLine } from "react-icons/ri";

const AddWaranty = (props) => {
  // Declare variables
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
    d_number: "",
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
    console.log(warranty);
  };

  const handleSubmit = (e) => {
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
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Fyll i alla fält");
    }
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
    <>
      <div className="w-screen h-screen bg-gray-500 bg-opacity-70 fixed top-0 left-0 z-10" />
      <div className="bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20">
        <form onSubmit={handleSubmit} className="bg-white rounded">
        <div className="flex border-b-2 px-6 py-3 items-center justify-center">
            <div className="w-10/12">
              <h1 className="font-bold">Ny garanti</h1>
            </div>
            <div className="w-2/12 text-right flex justify-end">
              <button
                className="text-3xl opacity-70 hover:opacity-100 duration-300"
                onClick={() => props.setIsModalOpen(false)}
              >
                <RiCloseLine />
              </button>
            </div>
          </div>
          <div className="w-fit shadow-lg rounded-md p-6">
            <div className="mt-0">
            <label className="block text-sm font-medium text-gray-700">
                  Namn:{" "}
                  <span className="text-red-700 font-black">*</span>{" "}
                </label>
              <input
                ref={nameRef}
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                name="name"
                required
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="mt-4"></div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Kvitto:{" "}
            </label>
            <input
              ref={receipt}
              className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              type="file"
              name="receipt"
              accept="image/png, image/jpg, image/jpeg, application/pdf"
              onChange={(e) => handleFile(e)}
            ></input>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Registreringsnummer:{" "}
                <span className="text-red-700 font-black">*</span>{" "}
              </label>
              <input
                ref={regRef}
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                name="registration_number"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
              Diarienummer:{" "}
              <span className="text-red-700 font-black">*</span>{" "}
              </label>
              <input
                ref={regRef}
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                name="registration_number"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="mt-4">
              <label onClick={handleChange}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Utgångsdatum:{" "}
                  <span className="text-red-700 font-black">*</span>{" "}
                </label>
                <DatePicker
                  className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
                className="bg-gray-500 hover:bg-gray-600 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
                onClick={() => props.setIsModalOpen(false)}
              >
                Avbryt
              </button>
              <button
                type="submit"
                className="bg-blue-500 rounded text-white hover:bg-blue-600 font-bold py-2 px-4 w-2/4 duration-300"
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

export default AddWaranty;
