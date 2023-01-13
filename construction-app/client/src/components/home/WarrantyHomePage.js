import React, { useEffect, useState } from "react";
import ApiConnector from "../../services/ApiConnector";
import {
  BsFillFlagFill,
  BsFillArrowRightCircleFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

export default function WarrantyHomePage() {
  const [loading, setLoading] = useState(true);
  const [oldWarranties, setOldWarranties] = useState([]);
  const [activeWarranties, setActiveWarranties] = useState([]);

  useEffect(() => {
    // Gets all the warrenties on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const respOld = await ApiConnector.getOldWarranty();
        const respActive = await ApiConnector.getActiveWarranty();
        setOldWarranties(respOld.data)
        setActiveWarranties(respActive.data)
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
        <div className="flex justify-between pt-4 gap-4 text-white">
        <div className="w-1/3 h-28 bg-gradient-to-r from-amber-400 to-orange-400 rounded overflow-x-hidden">
          <div className="">
            <h1 className="text-start pl-4 pt-4">Aktiva</h1>
            <div className="flex justify-between">
              <p className="text-4xl pl-4 pt-4">{activeWarranties}</p>
              <div className="mt-4 w-10 h-10 rounded-full">
                <BsFillCheckCircleFill className="ml-1 text-5xl opacity-70" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3 h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded overflow-x-hidden">
          <div className="">
            <h1 className="text-start pl-4 pt-4">Utgånget</h1>
            <div className="flex justify-between">
              <p className="text-4xl pl-4 pt-4">{oldWarranties}</p>
              <div className="mt-4 w-10 h-10 rounded-full">
                <BsFillArrowRightCircleFill className="ml-1 text-5xl opacity-70" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3 h-28 bg-gradient-to-r from-cyan-500 to-blue-500 rounded overflow-x-hidden">
          <div className="">
            <h1 className="text-start pl-4 pt-4">Totalt</h1>
            <div className="flex justify-between">
              <p className="text-4xl pl-4 pt-4">{oldWarranties + activeWarranties}</p>
              <div className="mt-4 w-10 h-10 rounded-full">
                <BsFillFlagFill className="ml-1 text-5xl opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
