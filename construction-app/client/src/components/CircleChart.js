import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import ApiConnector from "../services/ApiConnector";

export const options = {
  chartArea: {
    height: "80%",
    width: "100%",
    top: 1,
    left: 0,
    right: 0,
    bottom: 1,
  },
  height: "100%",
  width: "100%",
  backgroundColor: "transparent",
  legend: "none",
  pieHole: 0.8,
  is3D: false,
  pieSliceText: "none",
  colors: ["#fb923c", "#a855f7", "#3b82f6", "#22c55e"],
  enableInteractivity: false,
};

export default function CircleChart() {
  const [loading, setLoading] = useState(true);
  const [workList, setWorkList] = useState([]);
  const [semesterList, setSemesterList] = useState();

  function checkLength(e) {
    if (workList.length > 0) {
      if (e === "upcoming") {
        const check = workList.filter((item) => item.workStatus === "NOTSTARTED")
        if (check.length > 0) {
          const upcoming = check.length
          return upcoming;
        } else {
          return 0;
        }
      } else if (e === "ongoing") {
        const checkOngoing = workList.filter((item) => item.workStatus === "STARTED")
        if (checkOngoing.length > 0) {
          const ongoing = checkOngoing.length
          return ongoing;
        } else {
          return 0;
        }
      } else if (e === "completed") {
        const checkCompleted = workList.filter((item) => item.workStatus === "COMPLETED")
        if (checkCompleted.length > 0) {
          const completed = checkCompleted.length
          return completed;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  const data = [
    ["Task", "Hours per Day"],
    ["Kommande", checkLength("upcoming")],
    ["Pågående", checkLength("ongoing")],
    ["Slutförda", checkLength("completed")],
    ["Semester", semesterList],
  ];

  useEffect(() => {
    // Gets all the warrenties on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getWork();
        setWorkList(response.data);
        const responseSemester = await ApiConnector.getSemester();
        setSemesterList(responseSemester.data.length);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {!loading && (
        <div className="flex mt-2">
          <div className="w-1/3">
            <div className="flex gap-4">
              <div className="w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-400 rounded mt-2" />
              <div className="">
                <h1 className="text-2xl font-bold">
                  {checkLength("upcoming")}
                </h1>
                <p className="font-normal">Kommande</p>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="w-5 h-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded mt-2" />
              <div className="">
                <h1 className="text-2xl font-bold">{checkLength("ongoing")}</h1>
                <p className="font-normal">Pågående</p>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded mt-2" />
              <div className="">
                <h1 className="text-2xl font-bold">
                  {checkLength("completed")}
                </h1>
                <p className="font-normal">Slutförda</p>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="w-5 h-5 bg-gradient-to-r from-emerald-300 to-green-500 rounded mt-2" />
              <div className="">
                <h1 className="text-2xl font-bold">{semesterList}</h1>
                <p className="font-normal">Semesterdagar</p>
              </div>
            </div>
          </div>
          <div className="w-full flex align-top items-center justify-center">
            <Chart chartType="PieChart" data={data} options={options} />
            <div className="absolute text-center">
              <h1 className="text-4xl">{workList.length + semesterList}</h1>
              <h1>Totalt</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
