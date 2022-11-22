import React from "react";

export default function AddCustomerNote() {
  return (
    <div className="w-full bg-gray-700 rounded-md p-4">
      <h1 className="text-2xl w-full text-white">Lägg till ny anteckning</h1>
      <div className="w-full flex gap-2">
        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">Datum: </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="name"
            required
          ></input>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">Jobb: </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="address"
          ></input>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">Tid: </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="phoneNumber"
          ></input>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">
            Körning:{" "}
          </label>
          <input
            className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="propertyDesignation"
          ></input>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">
            Anställd tid:{" "}
          </label>
          <input
            className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="socialSecurityNumber"
          ></input>
        </div>

        <div className="flex w-min gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto">
          <button className="bg-green-500 hover:opacity-50 font-bold py-2 px-4 rounded duration-300 text-center w-full text-white">
            Spara
          </button>
        </div>
      </div>
    </div>
  );
}
