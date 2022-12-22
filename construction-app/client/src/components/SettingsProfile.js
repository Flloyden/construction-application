import React from "react";

export default function SettingsProfile() {
  return (
    <div className="pt-4 mt-4 border-t-2">
      <div className="flex gap-10">
        <div className="w-fit">
          <div className="">
            <h1 className="font-bold">Profil</h1>
            <div className="w-max">
              <form className="bg-white rounded dark:bg-gray-800">
                <div className="mt-5 flex align-middle items-center justify-between w-full">
                  <div className="rounded-full p-10 bg-blue-600 flex align-middle justify-center items-center">
                  <h1 className="text-4xl font-normal tracking-wider">TE</h1>
                </div>
                </div>
                <div className="flex mt-2" onClick={() => {}}>
                    <p className="px-6 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded h-fit font-normal cursor-pointer whitespace-nowrap">
                      Ändra bild
                    </p>
                  </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white placeholder-black">
                    Användarnamn:{" "}
                    <span className="text-red-700 font-black">*</span>{" "}
                  </label>
                  <input
                    className="rounded block w-full p-1 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    type="password"
                    name="name"
                    required
                  ></input>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white placeholder-black">
                    Email: <span className="text-red-700 font-black">*</span>{" "}
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
                  className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-full mt-4 duration-300"
                >
                  Spara ändringar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
