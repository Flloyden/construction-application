import React, { useEffect, useState } from "react";
import { AiOutlineNumber } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { MdOutlineDateRange, MdOutlineReceiptLong } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import ChangeWarrantyInfo from "./ChangeWarrantyInfo";

export default function Warranty() {
  const navigate = useNavigate();
  const location = useLocation();
  const [warranty, setWarranty] = useState(null);
  const [loading, setLoading] = useState(true);
  var url = location.pathname;
  var res = url.split("/");
  var pos = res.indexOf("garantier");
  var result = res[pos + 1];
  const [isChangeWarrantyOpen, setIsChangeWarrantyOpen] = useState(false);

  useEffect(() => {
    // Gets all the clients on page load
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiConnector.getWarranty(result);
        if (response.data === null) {
          navigate("/error");
        } else {
          setWarranty(response.data);
          console.log(response.data)
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [result, navigate]);

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-screen">
      <div className="rounded-lg w-full h-full p-4">
        <h1 className="text-4xl">Garanti-information</h1>
        {!loading && (
          <div className="flex flex-wrap">
            <div className="w-3/6 pr-10 pb-10">
              <div className="flex px-4 py-4 justify-between border-b-2">
                <div className="flex">
                  <BiRename className="text-3xl mr-4 mt-0.5" />
                  <p className="text-2xl font-bold">Garanti</p>
                </div>
                <span className="text-1xl ml-auto my-auto">
                  {warranty.name}
                </span>
              </div>
              <div className="flex px-4 py-4 justify-between border-b-2">
                <div className="flex">
                  <AiOutlineNumber className="text-3xl mr-4 mt-0.5" />
                  <p className="text-2xl font-bold">Registreringsnummer</p>
                </div>
                <span className="text-1xl ml-auto my-auto">
                  {warranty.registration_number}
                </span>
              </div>
              <div className="flex px-4 py-4 justify-between border-b-2">
                <div className="flex">
                  <MdOutlineDateRange className="text-3xl mr-4 mt-0.5" />
                  <p className="text-2xl font-bold">Utgångsdatum</p>
                </div>
                <span className="text-1xl ml-auto my-auto">
                  {warranty.warranty_date}
                </span>
              </div>
              <div className="flex px-4 py-4 justify-between border-b-2">
                <div className="flex">
                  <MdOutlineReceiptLong className="text-3xl mr-4 mt-0.5" />
                  <p className="text-2xl font-bold">Kvitto</p>
                </div>
                <span className="text-1xl ml-auto my-auto">
                  {warranty.receipt}
                </span>
              </div>
              <div className="flex w-full gap-2 mt-2">
                <button
                  className="bg-red-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-2/4"
                  onClick={() => {
                    setIsChangeWarrantyOpen(true);
                  }}
                >
                  Ta bort
                </button>
                <button
                  className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-2/4"
                  onClick={() => {
                    setIsChangeWarrantyOpen(true);
                  }}
                >
                  Ändra
                </button>
              </div>
            </div>
            <div className="w-3/6">
              <h2 className="text-3xl">Anteckningar</h2>
              <div className="notes">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus vulputate condimentum tellus, in euismod lectus
                  blandit et. Etiam aliquam congue erat, et vulputate nisl
                  ornare vitae. Sed ut mi sem. Nam fermentum arcu vel sapien
                  vehicula efficitur. In vel dictum turpis. Quisque mollis, nunc
                  eget feugiat ornare, odio turpis sodales sapien, at maximus
                  purus quam tempus sapien. In consectetur tempus pellentesque.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {isChangeWarrantyOpen && (
        <ChangeWarrantyInfo
          setIsChangeWarrantyOpen={setIsChangeWarrantyOpen}
          currentWarrantyId={warranty.id}
          currentWarrantyName={warranty.name}
          currentWarrantyReg={warranty.registration_number}
          currentWarrantyDate={warranty.warranty_date}
          currentWarrantyReceipt={warranty.receipt}
        />
      )}
    </div>
  );
}
