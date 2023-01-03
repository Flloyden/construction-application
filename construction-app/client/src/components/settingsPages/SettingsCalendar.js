import React, { useState } from "react";
import { SketchPicker } from "react-color";

export default function SettingsCalendar() {
  const [colorWork, setColorWork] = useState("#1d4ed8");
  const [showColorWork, setShowColorWork] = useState(false);

  const [colorSemester, setColorSemester] = useState("#15803d");
  const [showColorSemester, setShowColorSemester] = useState(false);

  const [colorWeekend, setColorWeekend] = useState("#b91c1c");
  const [showColorWeekend, setShowColorWeekend] = useState(false);

  return (
    <div className="pt-4 mt-4 border-t-2">
      <h1 className="text-2xl">Kalender</h1>
      <div className="flex justify-between pt-4 w-48">
        <h1>Färg på jobb</h1>
        <button
          className="w-6 h-6 rounded border"
          style={{ backgroundColor: colorWork }}
          onClick={() => setShowColorWork((showColor) => !showColor)}
        ></button>
        {showColorWork && (
          <div className="absolute ml-60">
            <SketchPicker
              color={colorWork}
              onChange={(updatedColor) => setColorWork(updatedColor.hex)}
            />
            <button className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-full duration-300" onClick={() => setShowColorWork((showColorWork) => !showColorWork)}>Ok</button>
          </div>
        )}
      </div>

      <div className="flex mt-2 w-48 justify-between">
        <h1>Färg på Semester</h1>
        <button
          className="w-6 h-6 rounded border"
          style={{ backgroundColor: colorSemester }}
          onClick={() => setShowColorSemester((showColorSemester) => !showColorSemester)}
        ></button>
        {showColorSemester && (
          <div className="absolute ml-60">
            <SketchPicker
              color={colorSemester}
              onChange={(updatedColor) => setColorSemester(updatedColor.hex)}
            />
            <button className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-full duration-300" onClick={() => setShowColorSemester((showColorSemester) => !showColorSemester)}>Ok</button>
          </div>
        )}
      </div>

      <div className="flex mt-2 w-48 justify-between">
        <h1>Färg på helgdagar</h1>
        <button
          className="w-6 h-6 rounded border"
          style={{ backgroundColor: colorWeekend }}
          onClick={() => setShowColorWeekend((showColorWeekend) => !showColorWeekend)}
        ></button>
        {showColorWeekend && (
          <div className="absolute ml-60">
            <SketchPicker
              color={colorWeekend}
              onChange={(updatedColor) => setColorWeekend(updatedColor.hex)}
            />
            <button className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-full duration-300" onClick={() => setShowColorWeekend((showColorWeekend) => !showColorWeekend)}>Ok</button>
          </div>
        )}
      </div>
    </div>
  );
}
