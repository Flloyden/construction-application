import React, { useEffect, useState } from "react";
import { AiOutlineNumber } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { MdOutlineDateRange, MdOutlineReceiptLong } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import ChangeWarrantyInfo from "./ChangeWarrantyInfo";
import WarrantyModal from "./WarrantyModal";

export default function Warranty() {
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  const navigate = useNavigate();
  const location = useLocation();
  const [warranty, setWarranty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  var url = location.pathname;
  var res = url.split("/");
  var pos = res.indexOf("garantier");
  var currentId = res[pos + 1];
  const [isChangeWarrantyOpen, setIsChangeWarrantyOpen] = useState(false);
  const toggleReceipt = () => {
    setShowReceipt(!showReceipt);
  };

  useEffect(() => {
    // Gets all the clients on page load
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiConnector.getWarranty(currentId);
        if (response.data === null) {
          navigate("/error");
        } else {
          setWarranty(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [currentId, navigate]);

  const deleteThis = async () => {
    // Deletes a client with given id and updates the id
    setLoading(true);
    try {
      await ApiConnector.deleteWarranty(currentId);
      navigate("/garantier");
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
    setLoading(false);
  };

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-min bg-blue-50">
      <div className="rounded-lg w-full h-full">
        <h1 className="text-4xl">Garantiinformation</h1>
        {!loading && (
          <div className="flex flex-wrap w-full gap-6">
            <div className="text-left flex flex-wrap w-min justify-between items-center pr-6">
              <div className="flex py-2 justify-start items-center w-full">
                <div className="flex">
                  <BiRename className="text-4xl mr-4 mt-0.5 pl-2" />
                </div>
                <span className="text-1xl my-auto">{warranty.name}</span>
              </div>

              <div className="flex py-2 justify-start items-center w-full">
                <div className="flex">
                  <AiOutlineNumber className="text-4xl mr-4 mt-0.5 pl-2" />
                </div>
                <span className="text-1xl my-auto">
                  {warranty.registration_number}
                </span>
              </div>
              <div className="flex py-2 justify-start items-center w-full">
                <div className="flex">
                  <MdOutlineDateRange className="text-4xl mr-4 mt-0.5 pl-2" />
                </div>
                <span className="text-1xl my-auto">
                  {warranty.warranty_date}
                </span>
              </div>
              <div className="flex py-2 justify-start items-center w-full border-b-2 pb-6">
                <div className="flex">
                  <MdOutlineReceiptLong className="text-4xl mr-4 mt-0.5 pl-2" />
                </div>
                <span className="text-1xl my-auto">
                  <div className="flex">
                    <button
                      onClick={toggleReceipt}
                      className="bg-blue-600 rounded text-white hover:bg-blue-500 py-2 px-4 duration-300 text-center text-1xl w-48 h-10"
                    >
                      {showReceipt ? "Stäng" : "Visa kvitto"}
                    </button>
                    <div
                      className={
                        showReceipt
                          ? "bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20"
                          : "content-parent"
                      }
                      onClick={() => setShowReceipt(false)}
                    >
                      {showReceipt && (
                        <img
                          className="w-full mx-auto"
                          src={warranty.receipt}
                          alt="receipt"
                          style={{ width: "50%" }}
                        />
                      )}
                    </div>
                  </div>
                </span>
              </div>
              <div className="flex w-full gap-2 mt-6">
                <button
                  className="bg-blue-600 hover:bg-blue-500 font-bold py-2 px-4 rounded duration-300 text-center text-white w-1/2"
                  onClick={() => {
                    setIsChangeWarrantyOpen(true);
                  }}
                >
                  Ändra
                </button>
                <button
                  className="bg-red-600 hover:bg-red-500 font-bold py-2 px-4 rounded duration-300 text-center text-white w-1/2"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Ta bort
                </button>
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
      {isOpen && (
        <WarrantyModal
          setIsOpen={setIsOpen}
          deleteThis={deleteThis}
          currentWarrantyName={warranty.name}
          currenId={currentId}
        />
      )}
    </div>
  );
}
