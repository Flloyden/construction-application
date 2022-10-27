import React, { useState } from "react";
import { useEffect } from "react";
import ApiConnector from "../services/ApiConnector";
import Dates from "./Dates";

export default function Calendar() {
  const [loading, setLoading] = useState(true);
  const [calendarInfo, setCalendarInfo] = useState(null);
  const [updated, setUpdated] = useState(null);

  useEffect(() => {
    // Gets all the warrenties on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getCalendar();
        setCalendarInfo(response.data);
        const cats = response.data.reduce(
          (catsSoFar, { workId, customerName, date }) => {
            const dateString = new Date(date);
            const month = dateString.toLocaleString("default", {
              month: "long",
            });
            if (!catsSoFar[month]) catsSoFar[month] = [];
            catsSoFar[month].push({ customerName, date });
            return catsSoFar;
          },
          []
        );
        setUpdated(cats);
        console.log(Object.keys(cats));

        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-screen">
      <div className="overflow-x-auto relative">
        <div className="flex justify-between gap-4 items-center">
          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white">
              Idag
            </button>
            <button className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white">
              Föregående
            </button>
            <button className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white">
              Nästa
            </button>
          </div>
          <p className="text-2xl">2022</p>
          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white">
              Dag
            </button>
            <button className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white">
              Vecka
            </button>
            <button className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white">
              Månad
            </button>
            <button className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white">
              År
            </button>
          </div>
        </div>
        {!loading && (
          <div className="flex text-center justify-between">
            <ul className="mt-4">
              <Dates month={updated.maj[0].date} />
              {[...updated.maj].reverse().map((work, i) => (
                <table key={i} className="text-sm text-left">
                  <thead className="text-xs bg-gray-50 inline-block text-center border border-black">
                    <tr className="">
                      <td className="w-full border-r border-black px-1">
                        <Dates month={work.date} />
                        {work.date.slice(-2)}
                      </td>
                      <td className="px-1">{work.customerName}</td>
                    </tr>
                  </thead>
                </table>
              ))}
            </ul>
            <ul className="mt-4">
              <Dates month={updated.juni[0].date} />
              {[...updated.juni].reverse().map((work, i) => (
                <table key={i} className="text-sm text-left">
                  <thead className="text-xs bg-gray-50 inline-block text-center border border-black">
                    <tr className="">
                      <td className="w-full border-r border-black px-1">
                        <Dates month={work.date} />
                        {work.date.slice(-2)}
                      </td>
                      <td className="px-1">{work.customerName}</td>
                    </tr>
                  </thead>
                </table>
              ))}
            </ul>
            <ul className="mt-4">
              <Dates month={updated.maj[0].date} />
              {[...updated.maj].reverse().map((work, i) => (
                <table key={i} className="text-sm text-left">
                  <thead className="text-xs bg-gray-50 inline-block text-center border border-black">
                    <tr className="">
                      <td className="w-full border-r border-black px-1">
                        <Dates month={work.date} />
                        {work.date.slice(-2)}
                      </td>
                      <td className="px-1">{work.customerName}</td>
                    </tr>
                  </thead>
                </table>
              ))}
            </ul>
            <ul className="mt-4">
              <Dates month={updated.juni[0].date} />
              {[...updated.juni].reverse().map((work, i) => (
                <table key={i} className="text-sm text-left">
                  <thead className="text-xs bg-gray-50 inline-block text-center border border-black">
                    <tr className="">
                      <td className="w-full border-r border-black px-1">
                        <Dates month={work.date} />
                        {work.date.slice(-2)}
                      </td>
                      <td className="px-1">{work.customerName}</td>
                    </tr>
                  </thead>
                </table>
              ))}
            </ul>
            <ul className="mt-4">
              <Dates month={updated.maj[0].date} />
              {[...updated.maj].reverse().map((work, i) => (
                <table key={i} className="text-sm text-left">
                  <thead className="text-xs bg-gray-50 inline-block text-center border border-black">
                    <tr className="">
                      <td className="w-full border-r border-black px-1">
                        <Dates month={work.date} />
                        {work.date.slice(-2)}
                      </td>
                      <td className="px-1">{work.customerName}</td>
                    </tr>
                  </thead>
                </table>
              ))}
            </ul>
            <ul className="mt-4">
              <Dates month={updated.juni[0].date} />
              {[...updated.juni].reverse().map((work, i) => (
                <table key={i} className="text-sm text-left">
                  <thead className="text-xs bg-gray-50 inline-block text-center border border-black">
                    <tr className="">
                      <td className="w-full border-r border-black px-1">
                        <Dates month={work.date} />
                        {work.date.slice(-2)}
                      </td>
                      <td className="px-1">{work.customerName}</td>
                    </tr>
                  </thead>
                </table>
              ))}
            </ul>
            <ul className="mt-4">
              <Dates month={updated.maj[0].date} />
              {[...updated.maj].reverse().map((work, i) => (
                <table key={i} className="text-sm text-left">
                  <thead className="text-xs bg-gray-50 inline-block text-center border border-black">
                    <tr className="">
                      <td className="w-full border-r border-black px-1">
                        <Dates month={work.date} />
                        {work.date.slice(-2)}
                      </td>
                      <td className="px-1">{work.customerName}</td>
                    </tr>
                  </thead>
                </table>
              ))}
            </ul>
            <ul className="mt-4">
              <Dates month={updated.juni[0].date} />
              {[...updated.juni].reverse().map((work, i) => (
                <table key={i} className="text-sm text-left">
                  <thead className="text-xs bg-gray-50 inline-block text-center border border-black">
                    <tr className="">
                      <td className="w-full border-r border-black px-1">
                        <Dates month={work.date} />
                        {work.date.slice(-2)}
                      </td>
                      <td className="px-1">{work.customerName}</td>
                    </tr>
                  </thead>
                </table>
              ))}
            </ul>
            <ul className="mt-4">
              <Dates month={updated.maj[0].date} />
              {[...updated.maj].reverse().map((work, i) => (
                <table key={i} className="text-sm text-left">
                  <thead className="text-xs bg-gray-50 inline-block text-center border border-black">
                    <tr className="">
                      <td className="w-full border-r border-black px-1">
                        <Dates month={work.date} />
                        {work.date.slice(-2)}
                      </td>
                      <td className="px-1">{work.customerName}</td>
                    </tr>
                  </thead>
                </table>
              ))}
            </ul>
            <ul className="mt-4">
              <Dates month={updated.juni[0].date} />
              {[...updated.juni].reverse().map((work, i) => (
                <table key={i} className="text-sm text-left">
                  <thead className="text-xs bg-gray-50 inline-block text-center border border-black">
                    <tr className="">
                      <td className="w-full border-r border-black px-1">
                        <Dates month={work.date} />
                        {work.date.slice(-2)}
                      </td>
                      <td className="px-1">{work.customerName}</td>
                    </tr>
                  </thead>
                </table>
              ))}
            </ul>
            <ul className="mt-4">
              <Dates month={updated.maj[0].date} />
              {[...updated.maj].reverse().map((work, i) => (
                <table key={i} className="text-sm text-left">
                  <thead className="text-xs bg-gray-50 inline-block text-center border border-black">
                    <tr className="">
                      <td className="w-full border-r border-black px-1">
                        <Dates month={work.date} />
                        {work.date.slice(-2)}
                      </td>
                      <td className="px-1">{work.customerName}</td>
                    </tr>
                  </thead>
                </table>
              ))}
            </ul>
            <ul className="mt-4">
              <Dates month={updated.juni[0].date} />
              {[...updated.juni].reverse().map((work, i) => (
                <table key={i} className="text-sm text-left">
                  <thead className="text-xs bg-gray-50 inline-block text-center border border-black">
                    <tr className="">
                      <td className="w-full border-r border-black px-1">
                        <Dates month={work.date} />
                        {work.date.slice(-2)}
                      </td>
                      <td className="px-1">{work.customerName}</td>
                    </tr>
                  </thead>
                </table>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
