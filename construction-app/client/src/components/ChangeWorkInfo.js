import { useRef, useState } from "react";
import ApiConnector from "../services/ApiConnector";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RiCloseLine } from "react-icons/ri";

const ChangeWorkInfo = (props) => {
  const [work] = useState({
    id: props.currentWorkId,
    name: props.currentWorkName,
    offer: props.currentOffer,
    startDate: props.currentStartDate,
    workStatus: props.currentWorkStatus,
    materialNote: props.currentWorkMaterial,
    numberOfDays: props.currentWorkDays,
  });
  const currentEndDateMoment = moment(props.currentStartDate, "YYYY-MM-DD")
    .add("days", props.currentWorkDays)
    .format("YYYY-MM-DD");
  let [startDate, setStartDate] = useState(new Date(props.currentStartDate));
  let [endDate] = useState(new Date(currentEndDateMoment));
  const [selected, setSelected] = useState(props.currentWorkStatus);
  const dayCountRef = useRef();
  const [newList, setNewList] = useState({
    id: work.id,
    name: work.name,
    numberOfDays: work.numberOfDays,
    materialNote: work.materialNote,
    offer: work.offer,
    startDate: work.startDate,
    workStatus: work.workStatus,
    calendar: [],
  });

  const handleChange = (e) => {
    let value = e.target.value;
    setNewList({
      ...newList,
      [e.target.name]: value,
    });
    console.log(newList);
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
    setNewList({
      ...newList,
      offer: base64,
    });
    return base64;
  };

  const handleSubmit = (e) => {
    /**Saves the "kund" and navigates back to the register */
    e.preventDefault();
    // Makes the change with the help of api call
    ApiConnector.changeWork(props.currentCustomerId, newList)
      .then((response) => {
        console.log(response);
        //window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function changeWorkStatus(e) {
    console.log(e.target.value);
    setSelected(e.target.value);
    setNewList({
      ...newList,
      workStatus: e.target.value,
    });
  }

  function disableDate() {
    if (props.currentWorkStatus === "STARTED") {
      return "hidden";
    } else {
      return;
    }
  }

  function getDate() {
    const thisDate = props.currentStartDate;
    if (props.currentWorkStatus === "STARTED") {
      return (
        <input
          className="rounded block w-full border border-white p-2.5 bg-white placeholder-black border-whiteborder text-black focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
          disabled
          placeholder={thisDate}
        ></input>
      );
    } else {
      return;
    }
  }

  function checkWorkStatus() {
    if (props.currentWorkStatus === "STARTED") {
      return "hidden";
    } else {
      return "w-full";
    }
  }

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
                onClick={() => props.setIsChangeOpen(false)}
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
                value={newList.name}
                required
                onChange={handleChange}
              ></input>
            </div>

            <div className="mt-4"></div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Offert: (Befintlig ersätts om ny laddas upp){" "}
            </label>
            <input
              className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              type="file"
              name="offer"
              accept="image/png, image/jpg, image/jpeg, application/pdf"
              onChange={(item) => {
                handleFile(item);
              }}
            ></input>

            <div className="mt-4">
              <div className="flex gap-2">
                <div className="mt-0">
                  <p className="block mb-2 text-sm font-medium text-gray-700">
                    Startdatum:{" "}
                    <span className="text-red-700 font-black">*</span>
                  </p>
                  {getDate()}
                  <div className={disableDate()}>
                    <DatePicker
                      className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      selected={startDate}
                      onChange={(date) => {
                        setNewList({
                          ...newList,
                          startDate: new Date(date),
                        });
                        setStartDate(date);
                      }}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                    />
                  </div>
                </div>
                <div className="mt-0">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Antal dagar:{" "}
                    <span className="text-red-700 font-black">*</span>
                  </label>
                  <input
                    ref={dayCountRef}
                    className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    type="text"
                    name="numberOfDays"
                    value={newList.numberOfDays}
                    required
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
            </div>
            <p className="mt-4 block text-sm font-medium text-gray-700">
              Jobbstatus:
            </p>
            <div className="flex gap-4">
              <div className={checkWorkStatus()}>
                <input
                  type="radio"
                  id="NOTSTARTED"
                  name="choose"
                  value="NOTSTARTED"
                  checked={selected === "NOTSTARTED"}
                  onChange={changeWorkStatus}
                  className="peer hidden"
                />
                <label
                  htmlFor="NOTSTARTED"
                  className="block hover:bg-gray-500 bg-gray-400 cursor-pointer select-none rounded p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold text-white duration-200"
                >
                  Ej påbörjat
                </label>
              </div>

              <div className="w-full">
                <input
                  type="radio"
                  id="STARTED"
                  name="choose"
                  value="STARTED"
                  onChange={changeWorkStatus}
                  checked={selected === "STARTED"}
                  className="peer hidden"
                />
                <label
                  htmlFor="STARTED"
                  className="block hover:bg-gray-500 bg-gray-400 cursor-pointer select-none rounded p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold text-white duration-200"
                >
                  Pågående
                </label>
              </div>

              <div className="w-full">
                <input
                  type="radio"
                  id="COMPLETED"
                  name="choose"
                  value="COMPLETED"
                  onChange={changeWorkStatus}
                  checked={selected === "COMPLETED"}
                  className="peer hidden"
                />
                <label
                  htmlFor="COMPLETED"
                  className="block hover:bg-gray-500 bg-gray-400 cursor-pointer select-none rounded p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold text-white duration-200"
                >
                  Slutfört
                </label>
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Material:{" "}
              </label>
              <textarea
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="textarea"
                name="materialNote"
                value={newList.materialNote}
                required
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
              <button
                className="bg-gray-500 hover:bg-gray-600 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
                onClick={() => props.setIsChangeOpen(false)}
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

export default ChangeWorkInfo;
