import React from "react";
import DarkMode from "./DarkMode.js";

export default function SettingsVisual() {
  return (
    <div className="pt-4 mt-4 border-t-2">
      <div className="flex gap-10">
        <div className="w-fit">
          <div className="">
            <h1 className="font-bold">Visuellt</h1>
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
}
