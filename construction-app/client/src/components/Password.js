import React from "react";

export default function Password() {

  return (
    <div className="w-max mt-4">
      <h1>Ändra lösenord</h1>
      <form className="bg-white rounded dark:bg-gray-800">
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Gammalt lösenord: <span className="text-red-700 font-black">*</span>{" "}
          </label>
          <input
            className="rounded block w-full p-1 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            type="password"
            name="name"
            required
          ></input>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Nytt lösenord: <span className="text-red-700 font-black">*</span>{" "}
          </label>
          <input
            className="rounded block w-full p-1 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            type="password"
            name="name"
            required
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
            name="name"
            required
          ></input>
        </div>
        <button
          type="submit"
          className="bg-blue-500 rounded text-white hover:bg-blue-600 font-bold py-2 px-4 w-full mt-4 duration-300"
        >
          Bekräfta nytt lösenord
        </button>
      </form>
    </div>
  );
}
