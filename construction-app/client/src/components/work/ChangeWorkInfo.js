import { useRef, useState } from "react";
import ApiConnector from "../../services/ApiConnector";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RiCloseLine } from "react-icons/ri";

const ChangeWorkInfo = (props) => {
  const [work] = useState({
    id: props.currentWorkId,
    name: props.currentWorkName,
    startDate: props.currentStartDate,
    earliestStartDate: props.currentEarliestStartDate,
    numberOfDays: props.currentWorkDays,
    lockedInCalendar: props.currentLockedInCalendar,
    materialNote: props.currentWorkMaterial,
    offer: props.currentOffer,
    workStatus: props.currentWorkStatus,
  });

  const [newList, setNewList] = useState({
    id: work.id,
    name: work.name,
    startDate: work.startDate,
    earliestStartDate: work.earliestStartDate,
    numberOfDays: work.numberOfDays,
    lockedInCalendar: work.lockedInCalendar,
    materialNote: work.materialNote,
    offer: work.offer,
    workStatus: work.workStatus,
    //calendar: [],
  });

  const currentEndDateMoment = moment(props.currentStartDate, "YYYY-MM-DD")
    .add(props.currentWorkDays, "days")
    .format("YYYY-MM-DD");

  let [startDate, setStartDate] = useState(new Date(props.currentStartDate));
  let [earliestStartDate, setEarliestStartDate] = useState(new Date(props.currentEarliestStartDate));
  const [enableEarliestStartDate, setEnableEarliestStartDate] = useState(props.currentEarliestStartDate != null);
  let [endDate] = useState(new Date(currentEndDateMoment));
  const dayCountRef = useRef();
  const [toggleLock, setToggleLock] = useState(newList.lockedInCalendar);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmit = async (e) => {
    /**Saves the "kund" and navigates back to the register */
    e.preventDefault();
    // Makes the change with the help of api call
    const response = await ApiConnector.changeWork(props.currentCustomerId, newList)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        errorMsg(error.response.data)
      });
  };

  function disableDate() {
    if (props.currentWorkStatus === "STARTED") {
      return "hidden";
    } else {
      return;
    }
  }

  function disableEarliestStartDate() {
    if (props.currentWorkStatus === "STARTED" || !enableEarliestStartDate) {
      return "opacity-50 text-white cursor-not-allowed";
    } else {
      return "opacity-100 text-black";
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

  function getEarliestStartDateIfStarted() {
    const thisDate = props.currentEarliestStartDate;
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

  function clickLock() {
    if (toggleLock) {
      return <span className="lock w-full h-full"></span>;
    } else {
      return <span className="lock unlocked w-full h-full"></span>;
    }
  }

  function errorMsg(message) {
    setErrorMessage(message)
    setShowErrorMessage(true)
    setTimeout(() => {
      setShowErrorMessage(false)
    }, 3000)
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
              accept="application/pdf"
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
                      calendarStartDay={1}
                      onChange={(date) => {
                        setStartDate(date);
                        setNewList({
                          ...newList,
                          startDate: new Date(date),
                        });

                        if (date.getTime() < earliestStartDate.getTime()) {
                          setNewList({
                            ...newList,
                            startDate: new Date(date),
                            earliestStartDate: new Date(date),
                          });

                          setEarliestStartDate(date);
                        }
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
                    type="number"
                    min={0}
                    name="numberOfDays"
                    value={newList.numberOfDays}
                    required
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="mt-4 w-full">
                <div className="flex gap-2">
                  <div className="mt-0">
                    <p className="block mb-2 text-sm font-medium text-gray-700">
                      Tidigaste startdatum:{" "}
                      <input
                        type="checkbox"
                        id="lockOnCalendar"
                        name="lock"
                        defaultChecked={enableEarliestStartDate}
                        onChange={() => {
                          if (enableEarliestStartDate) {
                            setEnableEarliestStartDate(false);
                            setEarliestStartDate("");
                            setNewList({
                              ...newList,
                              earliestStartDate: "",
                            });
                          } else {
                            setEnableEarliestStartDate(true);
                            setEarliestStartDate(startDate);
                            setNewList({
                              ...newList,
                              earliestStartDate: startDate,
                            });
                          }

                          console.log(newList);
                        }}
                      />
                    </p>
                    {getEarliestStartDateIfStarted()}
                    <div className={disableEarliestStartDate()}>
                      <DatePicker
                        className="rounded block w-full p-2.5 border-gray-500 border focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        selected={earliestStartDate}
                        calendarStartDay={1}
                        disabled={!enableEarliestStartDate}
                        onChange={(date) => {
                          setEarliestStartDate(date);
                          setNewList({
                            ...newList,
                            earliestStartDate: new Date(date),
                          });

                          if (date.getTime() > startDate.getTime()) {
                            setNewList({
                              ...newList,
                              startDate: new Date(date),
                              earliestStartDate: new Date(date),
                            });

                            setStartDate(date);
                          }
                        }}
                        selectsStart
                        startDate={earliestStartDate}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-11 w-full">
                <div className="mt-0 w-full">
                  <div className="flex justify-end gap-8 items-center align-middle">
                    <p className="text-sm font-medium text-gray-700">
                      Lås på kalendern:{" "}
                    </p>
                    <div
                      type="checkbox"
                      id="lockOnCalendar"
                      className="container right-0 w-11 h-11"
                      name="lock"
                      defaultChecked={newList.lockedInCalendar}
                      onClick={() => {
                        setToggleLock(!toggleLock)
                        setNewList({
                          ...newList,
                          lockedInCalendar: !newList.lockedInCalendar,
                        });
                      }}
                    >
                      {clickLock()}
                    </div>
                  </div>
                </div>
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

            <div
              className={
                showErrorMessage
                  ? "bg-red-500 px-4 mt-4 rounded text-white py-1 duration-200 visible"
                  : "invisible duration-200"
              }
            >
              <p className={showErrorMessage ? "visible" : "invisible"}>
                {errorMessage}
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangeWorkInfo;
