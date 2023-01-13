import React, { useEffect, useState } from "react";
import ApiConnector from "../../services/ApiConnector";

export default function SettingsProfile() {
  const [loading, setLoading] = useState(true);
  const [newUserInfo, setNewUserInfo] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Gets all the warrenties on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getUser(1);
        setNewUserInfo(response.data);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    setNewUserInfo({
      ...newUserInfo,
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
    setNewUserInfo({
      ...newUserInfo,
      profileImage: base64,
    });
    return base64;
  };

  const handleSubmit = (e) => {
    /**Saves the "kund" and navigates back to the register */
    e.preventDefault();
    // Makes the change with the help of api call
    ApiConnector.updateUser(newUserInfo)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        errorMsg(error.response.data)
      });
  };

  function errorMsg(message) {
    setErrorMessage(message)
    setShowErrorMessage(true)
    setTimeout(() => {
      setShowErrorMessage(false)
    }, 3000)
  }

  return (
    <div className="pt-4 mt-4 border-t-2">
      {!loading && (
        <div className="flex gap-10">
          <div className="w-fit">
            <div className="">
              <h1 className="font-bold">Profil</h1>
              <div className="w-max">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded dark:bg-gray-800"
                >
                  <div className="mt-5 flex align-middle items-center justify-between max-w-fit max-h-fit">
                    <div className="w-24 h-24">
                      <div className="rounded-full h-full flex align-middle justify-center items-center">
                        <img
                          src={newUserInfo.profileImage}
                          alt="profile pic"
                          className="object-cover h-full rounded-full border-4 border-blue-600 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-2">
                    <label
                      htmlFor="filePicker"
                      className="px-6 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded h-fit font-normal cursor-pointer whitespace-nowrap"
                    >
                      Ändra bild
                    </label>
                    <input
                      id="filePicker"
                      className="hidden"
                      type="file"
                      name="offer"
                      input="Ändra bild"
                      accept="image/jpg, image/png, image/jpeg"
                      onChange={(item) => {
                        handleFile(item);
                      }}
                    ></input>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white placeholder-black">
                      Användarnamn:{" "}
                      <span className="text-red-700 font-black">*</span>{" "}
                    </label>
                    <input
                      className="rounded block w-full p-1 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      name="name"
                      value={newUserInfo.name}
                      onChange={handleChange}
                      required
                    ></input>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white placeholder-black">
                      Email: <span className="text-red-700 font-black">*</span>{" "}
                    </label>
                    <input
                      className="rounded block w-full p-1 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      name="email"
                      value={newUserInfo.email}
                      onChange={handleChange}
                      required
                    ></input>
                  </div>
                  <div className="mt-4">
                    <label className="text-xs block font-medium text-gray-700 dark:text-white placeholder-black">
                      (Bekräfta ändringar med lösenord): <span className="text-red-700 font-black">*</span>{" "}
                    </label>
                    <input
                      className="rounded block w-full p-1 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      type="password"
                      name="password"
                      minLength={1}
                      required
                      value={newUserInfo.password}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 rounded text-white hover:bg-blue-500 py-2 px-4 w-full mt-4 duration-300"
                  >
                    Spara ändringar
                  </button>
                </form>
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
          </div>
        </div>
      )}
    </div>
  );
}
