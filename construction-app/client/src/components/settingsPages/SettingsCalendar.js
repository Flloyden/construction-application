import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import ApiConnector from "../../services/ApiConnector";

export default function SettingsCalendar() {
  const [loading, setLoading] = useState(true);
  const [showColorWork, setShowColorWork] = useState(false);
  const [showColorSemester, setShowColorSemester] = useState(false);
  const [showColorWeekend, setShowColorWeekend] = useState(false);

  const [colors, setColors] = useState({
    workColor: "",
    vacationColor: "",
    weekendsColor: "",
  });

  useEffect(() => {
    // Gets all the colors on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getColors();
        setColors(response.data);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    /**Saves the "kund" and navigates back to the register */
    e.preventDefault();
    ApiConnector.updateColors(colors)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!loading && (
        <div className="pt-4 mt-4 border-t-2">
          <h1 className="text-2xl">Kalender</h1>
          <div className="w-max">
          <form
            className="bg-white rounded dark:bg-gray-800"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between pt-4 w-48">
              <h1>Färg på jobb</h1>
              <div
                className="w-6 h-6 rounded border hover:cursor-pointer"
                style={{ backgroundColor: colors.workColor }}
                onClick={() => setShowColorWork((showColor) => !showColor)}
              ></div>
              {showColorWork && (
                <div className="absolute ml-60">
                  <SketchPicker
                    name="workColor"
                    color={colors.workColor}
                    onChange={(updatedColor) => setColors({
                      ...colors,
                      workColor: updatedColor.hex,
                    })}
                  />
                  <div
                    className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-full duration-300 text-center hover:cursor-pointer"
                    onClick={() =>
                      setShowColorWork((showColorWork) => !showColorWork)
                    }
                  >
                    Ok
                  </div>
                </div>
              )}
            </div>

            <div className="flex mt-2 w-48 justify-between">
              <h1>Färg på Semester</h1>
              <div
                className="w-6 h-6 rounded border hover:cursor-pointer"
                style={{ backgroundColor: colors.vacationColor }}
                onClick={() =>
                  setShowColorSemester(
                    (showColorSemester) => !showColorSemester
                  )
                }
              ></div>
              {showColorSemester && (
                <div className="absolute ml-60">
                  <SketchPicker
                    name="vacationColor"
                    color={colors.vacationColor}
                    onChange={(updatedColor) => setColors({
                      ...colors,
                      vacationColor: updatedColor.hex,
                    })}
                  />
                  <div
                    className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-full duration-300 hover:cursor-pointer text-center"
                    onClick={() =>
                      setShowColorSemester(
                        (showColorSemester) => !showColorSemester
                      )
                    }
                  >
                    Ok
                  </div>
                </div>
              )}
            </div>

            <div className="flex mt-2 w-48 justify-between">
              <h1>Färg på helgdagar</h1>
              <div
                className="w-6 h-6 rounded border hover:cursor-pointer"
                style={{ backgroundColor: colors.weekendsColor }}
                onClick={() =>
                  setShowColorWeekend((showColorWeekend) => !showColorWeekend)
                }
              ></div>
              {showColorWeekend && (
                <div className="absolute ml-60">
                  <SketchPicker
                    name="weekendsColor"
                    color={colors.weekendsColor}
                    onChange={(updatedColor) => setColors({
                      ...colors,
                      weekendsColor: updatedColor.hex,
                    })}
                  />
                  <div
                    className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-full duration-300 hover:cursor-pointer text-center"
                    onClick={() =>
                      setShowColorWeekend(
                        (showColorWeekend) => !showColorWeekend
                      )
                    }
                  >
                    Ok
                  </div>
                </div>
              )}
            </div>
            <button
                  type="submit"
                  className="bg-blue-600 rounded text-white hover:bg-blue-500 py-2 px-4 w-full mt-4 duration-300"
                >
                  Bekräfta ändringar
                </button>
          </form>
          </div>
        </div>
      )}
    </>
  );
}
