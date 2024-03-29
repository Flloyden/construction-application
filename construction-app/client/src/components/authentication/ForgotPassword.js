import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import ApiConnector from "../../services/ApiConnector";

export default function ForgotPassword(props) {
  //declaring variables
  const [email, setEmail] = useState({
    email: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    /**Sends request to server to reset password */
    e.preventDefault();
    ApiConnector.recoverPassword(email)
      .then((response) => {
        setShowSuccess((showSuccess) => !showSuccess);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
        setShowError((showError) => !showError);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      });
  };

  return (
    <>
      <div className="w-screen h-screen bg-gray-500 bg-opacity-70 fixed top-0 left-0 z-10" />
      <div className="bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20">
        <form
          onSubmit={handleSubmit}
          className={"bg-white fixed inset-0 items-center justify-center w-fit max-w-sm h-max my-auto rounded mx-auto"}
        >
          <div className="flex border-b-2 px-6 py-2 items-center justify-between align-middle">
            <div className="w-min whitespace-nowrap">
              <h1 className="text-2xl">Glömt lösenord</h1>
            </div>
            <div className="w-min text-right flex justify-end">
              <button
                className="text-3xl opacity-70 hover:opacity-100 duration-300"
                onClick={() => props.setIsChangePasswordOpen(false)}
              >
                <RiCloseLine />
              </button>
            </div>
          </div>
          <div className="w-full shadow-lg rounded-md p-4">
            <div className="w-full gap-2 text-white">
              <label className="block text-sm font-medium text-gray-700">
                Email:
                <input
                  type={email}
                  value={email.email}
                  required
                  className="rounded block w-full mt-2 p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  onChange={(e) => {
                    setEmail({
                      ...email,
                      email: e.target.value,
                    });
                  }}
                />
              </label>
            </div>

            <div className="relative mt-2">
              <div
                className={
                  showSuccess
                    ? "bg-green-500 px-4 rounded text-white py-1 duration-200 visible mb-0 text-center mt-0 absolute top-0 w-full"
                    : "hidden duration-200 px-4 mb-0 text-center mt-2 py-1 absolute"
                }
              >
                <div className={showSuccess ? "visible h-12" : "h-12 hidden"}>
                  <p>Ett meddelande har skickats till:</p>
                  <p>{email.email}</p>
                </div>
              </div>
              <div
                className={
                  showError
                    ? "bg-red-500 rounded text-white py-1 duration-200 visible mb-0 text-center mt-0 absolute top-0 w-full"
                    : "hidden duration-200 mb-0 text-center mt-2 py-1 absolute"
                }
              >
                <div
                  className={
                    showError
                      ? "visible h-12 flex items-center justify-center align-middle"
                      : "h-12 hidden"
                  }
                >
                  <p>Ange en korrekt email.</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="pb-2 mt-16">
                <p>Genom att återställa lösenordet skickas ett meddelande till den angivna mailadressen.</p>
              </div>
            </div>
            <div className="flex w-full gap-2 mt-14 justify-end inset-x-0 bottom-4 mx-auto text-white">
              <button
                className="bg-blue-600 rounded text-white hover:bg-blue-500 font-semibold py-2 px-4 w-full duration-300"
                type="submit"
              >
                Återställ lösenord
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
