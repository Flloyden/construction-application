import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Kommande", 16],
  ["Pågående", 1],
  ["Slutförda", 38],
  ["Semester", 13],
];

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
  colors: ['#fb923c', '#a855f7', '#3b82f6', '#22c55e'],
  enableInteractivity: false
};

export default function CircleChart() {
  return <Chart chartType="PieChart" data={data} options={options} />;
}
