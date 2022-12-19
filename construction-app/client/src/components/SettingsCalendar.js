import React from "react";
export default function SettingsCalendar() {
  return (
    <div className="w-48 mt-10">
      <h1 className="text-2xl">Kalender</h1>
      <div className="flex w-full justify-between pt-4">
        <h1>Färg på jobb</h1>
        <div className="w-5 h-5 bg-blue-700 rounded"></div>
      </div>

      <div className="flex mt-2 w-full justify-between">
      <h1>Färg på Semester</h1>
        <div className="w-5 h-5 bg-green-700 rounded"></div>
      </div>

      <div className="flex mt-2 w-full justify-between">
      <h1>Färg på helgdagar</h1>
        <div className="w-5 h-5 bg-red-700 rounded"></div>
      </div>
    </div>
  );
}
