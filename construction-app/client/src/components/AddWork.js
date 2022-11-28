import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const [customer] = useState({
    id: currentCustomerId,
    name: currentCustomerName,
    address: currentCustomerAddress,
    phoneNumber: currentCustomerPhone,
    propertyDesignation: currentCustomerProperty,
    socialSecurityNumber: currentCustomerSSN,
    workList: currentCustomerWorkList,
    customerNotes: currentCustomerNotes,
  });

  const nameRef = useRef();
  const materialNoteRef = useRef();
  const dayCountRef = useRef();
  const offer = useRef();
  const [newList, setNewList] = useState();
  const [image, setImage] = useState("");
  let [startDate, setStartDate] = useState(new Date());
  let endDate = new Date();

  const isWeekday = (date) => {
    const day = date.getDay;
    return day !== 0 && day !== 6;
  };

  const handleChange = (e) => {
    /**Gets the current input every keystroke */
    setNewList({
      id: "",
      name: nameRef.current.value,
      numberOfDays: dayCountRef.current.value,
      materialNote: materialNoteRef.current.value,
      offer: image,
      startDate: startDate,
      workStatus: "NOTSTARTED",
      calendar: [],
    });
    console.log(newList)
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

  const saveWork = (e) => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    // Pushes the new list into current lists
    customer.workList.push(newList);
    // Adds work to user with api call
    ApiConnector.saveWork(customer)
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
      <div
        className="w-screen h-screen bg-slate-700 bg-opacity-70 fixed top-0 left-0"
        onClick={() => setIsWorkOpen(false)}
      />
      <div className="bg-white fixed inset-0 flex items-center justify-center w-2/4 h-max m-auto rounded-lg p-4">
        <div className="w-full">
          <h1 className="text-4xl">Lägg till nytt jobb</h1>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Namn på jobb: </label>
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
            ref={offer}
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="file"
            name="offer"
            accept="image/png, image/jpg, image/jpeg, application/pdf"
            onChange={(e) => handleFile(e)}
          ></input>

          <div className="mt-4">
            <div className="flex gap-2">
              <label onClick={handleChange}>
              <p className="block mb-2 text-sm font-medium text-gray-700">Startdatum:</p>
                <DatePicker
                  className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    handleChange(date);
                  }}
                  filterDate={isWeekday}
                  placeholderText="Select a weekday"
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
              </label>
              
              <label onClick={handleChange}>
              <label className="block mb-2 text-sm font-medium text-gray-700">Antal dagar:</label>
              <input
                ref={dayCountRef}
                className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="materialNote"
                required
                onChange={(e) => handleChange(e)}
              ></input>
              </label>
            </div>
          </div>
          
          <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Material: </label>
          <input
            ref={materialNoteRef}
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="materialNote"
            required
            onChange={(e) => handleChange(e)}
          ></input>
          </div>
          <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
          <button className="bg-red-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4" onClick={() => setIsWorkOpen(false)}>
                Avbryt
              </button>
              <button
                className="bg-green-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
                onClick={saveWork}
              >
                Spara
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWork;
