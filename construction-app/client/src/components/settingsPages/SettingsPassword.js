import React, { useEffect, useState } from "react";
import ApiConnector from "../../services/ApiConnector";

export default function SettingsPassword() {
  const [loading, setLoading] = useState(true);
  const [currentEmail, setCurrentEmail] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState({
    email: currentEmail,
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  useEffect(() => {
    // Gets all the warrenties on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getUser(1);
        setCurrentEmail(response.data.email);
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
    setUpdatedPassword({
      ...updatedPassword,
      email: currentEmail,
      [e.target.name]: value,
    });
    console.log(updatedPassword);
  };

  const handleSubmit = (e) => {
    /**Saves the "kund" and navigates back to the register */
    e.preventDefault();
    ApiConnector.changePassword(updatedPassword)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="pt-4 mt-4 border-t-2">
      {!loading && (
        <div className="flex gap-10">
          <div className="w-fit">
            <div className="w-max">
              <h1 className="font-bold">Ändra lösenord</h1>
              <form
                className="bg-white rounded dark:bg-gray-800"
                onSubmit={handleSubmit}
              >
                <div className="mt-0">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Gammalt lösenord:{" "}
                    <span className="text-red-700 font-black">*</span>{" "}
                  </label>
                  <input
                    className="rounded block w-full p-1 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    type="password"
                    name="oldPassword"
                    required
                    value={updatedPassword.oldPassword}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Nytt lösenord:{" "}
                    <span className="text-red-700 font-black">*</span>{" "}
                  </label>
                  <input
                    className="rounded block w-full p-1 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    type="password"
                    name="newPassword"
                    required
                    minLength={8}
                    value={updatedPassword.newPassword}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Bekräfta nytt lösenord:{" "}
                    <span className="text-red-700 font-black">*</span>{" "}
                  </label>
                  <input
                    className="rounded block w-full p-1 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    type="password"
                    name="newPasswordConfirmation"
                    minLength={8}
                    required
                    value={updatedPassword.newPasswordConfirmation}
                    onChange={handleChange}
                  ></input>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-full mt-4 duration-300"
                >
                  Bekräfta nytt lösenord
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
