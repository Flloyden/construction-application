import React, { useEffect, useState } from "react";
import { AiOutlineNumber } from "react-icons/ai";
import { BsFillHouseFill, BsPersonFill, BsTelephoneFill } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import AddWork from "./AddWork";
import ChangeCustomerInfo from "./ChangeCustomerInfo";
import Modal from "./Modal";
import Work from "./Work";
import { RiCloseLine } from "react-icons/ri";
import { RiPencilFill } from "react-icons/ri";

export default function Customer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  var url = location.pathname;
  var res = url.split("/");
  var pos = res.indexOf("kunder");
  var currentCustomerId = res[pos + 1];
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentCustomerName, setCurrentCustomerName] = useState("");

  useEffect(() => {
    // Gets all the customers on page load once per load
    const fetchData = async () => {
      setLoading(true);
      try {
        // Treis to get all customers from database with api call
        const response = await ApiConnector.getCustomer(currentCustomerId);
        // Navigates to error page if not successful
        if (response.data === null) {
          navigate("/error");
          // If success it sets customers to the response data
        } else {
          setCustomer(response.data);
          console.log(response.data);
        }
        // Logs any errors
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [currentCustomerId, navigate]);

  const deleteThis = async () => {
    // Deletes a client with given id and updates the id
    setLoading(true);
    try {
      await ApiConnector.deleteCustomer(currentCustomerId);
      navigate("/kunder");
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
    setLoading(false);
  };

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-screen">
      <div className="rounded-lg w-full h-full">
        <h1 className="text-4xl">Kundinformation</h1>
        {!loading && (
          <div className="flex flex-wrap w-full gap-6">
            <div className="text-left flex flex-wrap w-1/4 justify-between items-center pr-6 border-r-2">
              <div className="flex py-2 justify-start items-center w-full">
                <div className="flex">
                  <BsPersonFill className="text-4xl mr-4 mt-0.5 pl-2" />
                </div>
                <span className="text-1xl my-auto">{customer.name}</span>
              </div>
              <div className="flex py-2 justify-start items-center w-full">
                <div className="flex">
                  <AiOutlineNumber className="text-4xl mr-4 mt-0.5 pl-2" />
                </div>
                <span className="text-1xl my-auto">
                  {customer.socialSecurityNumber}
                </span>
              </div>
              <div className="flex py-2 justify-start items-center w-full">
                <div className="flex">
                  <MdLocationOn className="text-4xl mr-4 mt-0.5 pl-2" />
                </div>
                <span className="text-1xl my-auto">{customer.address}</span>
              </div>
              <div className="flex py-2 justify-start items-center w-full">
                <div className="flex">
                  <MdEmail className="text-4xl mr-4 mt-0.5 pl-2" />
                </div>
                <span className="text-1xl my-auto">{customer.name}</span>
              </div>
              <div className="flex py-2 justify-start items-center w-full">
                <div className="flex">
                  <BsTelephoneFill className="text-4xl mr-4 mt-0.5 pl-2" />
                </div>
                <span className="text-1xl my-auto">{customer.phoneNumber}</span>
              </div>
              <div className="flex py-2 justify-start items-center w-full">
                <div className="flex">
                  <BsFillHouseFill className="text-4xl mr-4 mt-0.5 pl-2" />
                </div>
                <span className="text-1xl my-auto">
                  {customer.propertyDesignation}
                </span>
              </div>
              <div className="flex gap-2 justify-end items-center pb-8 w-full">
                <button
                  className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-2/4"
                  onClick={() => {
                    setIsChangeOpen(true);
                  }}
                >
                  Ändra
                </button>
                <button
                  className="bg-red-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-2/4"
                  data-modal-toggle="defaultModal"
                  onClick={() => {
                    setIsOpen(true);
                    setCurrentCustomerName(customer.name);
                  }}
                >
                  Ta bort
                </button>
              </div>
              <div className="w-full py-4 border-t-2">
                <div className="flex">
                  <h2 className="text-3xl pb-2">Jobb</h2>
                </div>
                <div className="flex flex-wrap gap-4 items-center pb-10 h-fit mx-auto justify-start">
                  <div className="flex w-full h-min py-4 items-center justify-center bg-white border border-gray-200 rounded-lg shadow-md lg:max-w-md hover:scale-105 duration-300">
                    <GrAddCircle
                      className="text-9xl ml-2 cursor-pointer hover:rotate-90 hover:opacity-100 duration-500 opacity-20"
                      onClick={() => {
                        setIsWorkOpen(true);
                      }}
                    />
                  </div>
                  {customer.workList
                    .slice(0)
                    .reverse()
                    .map((workName) => (
                      <div
                        className="w-full h-fit bg-white border border-gray-200 rounded-lg shadow-md lg:max-w-md duration-300"
                        key={workName.id}
                      >
                        <Work
                          label={workName.name}
                          workName={workName}
                          currentCustomerId={currentCustomerId}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="w-full bg-gray-700 rounded-md p-4">
                <h1 className="text-2xl w-full text-white">
                  Lägg till ny anteckning
                </h1>
                <div className="w-full flex gap-2">
                  <div className="mt-4 w-1/4">
                    <label className="mb-2 text-sm font-medium text-white">
                      Datum:{" "}
                    </label>
                    <input
                      className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                      type="text"
                      name="name"
                      required
                    ></input>
                  </div>

                  <div className="mt-4 w-1/4">
                    <label className="mb-2 text-sm font-medium text-white">
                      Jobb:{" "}
                    </label>
                    <input
                      className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                      type="text"
                      name="address"
                    ></input>
                  </div>

                  <div className="mt-4 w-1/4">
                    <label className="mb-2 text-sm font-medium text-white">
                      Tid:{" "}
                    </label>
                    <input
                      className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                      type="text"
                      name="phoneNumber"
                    ></input>
                  </div>

                  <div className="mt-4 w-1/4">
                    <label className="mb-2 text-sm font-medium text-white">
                      Körning:{" "}
                    </label>
                    <input
                      className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                      type="text"
                      name="propertyDesignation"
                    ></input>
                  </div>

                  <div className="mt-4 w-1/4">
                    <label className="mb-2 text-sm font-medium text-white">
                      Anställd tid:{" "}
                    </label>
                    <input
                      className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                      type="text"
                      name="socialSecurityNumber"
                    ></input>
                  </div>

                  <div className="flex w-min gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto">
                    <button className="bg-green-500 hover:opacity-50 font-bold py-2 px-4 rounded duration-300 text-center w-full text-white">
                      Spara
                    </button>
                  </div>
                </div>
              </div>
              <h2 className="text-3xl pt-10 pb-2">Anteckningar</h2>
              <div className="bg-gray-700 py-2 rounded-md">
                <table className="w-full text-sm text-left text-gray-400">
                  <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        Datum
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Jobb
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Tid
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Körning
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Antälld tid
                      </th>
                      <th scope="col" className="max-w-fit text-center">
                        Åtgärd
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-gray-800 border-gray-700 cursor-pointer hover:bg-opacity-90 duration-200">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium whitespace-nowrap text-white cursor-pointer"
                      ></th>
                      <td className="py-4 px-6 text-white"></td>
                      <td className="py-4 px-6"></td>
                      <td className="py-4 px-6"></td>
                      <td className="py-4 px-6"></td>
                      <td className="flex justify-around py-2 items-end">
                        <div className="flex justify-end">
                          <button className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 mr-2 text-blue-600 h-fit hover:bg-slate-200">
                            <RiPencilFill />
                          </button>
                          <button className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 text-red-600 h-fit hover:bg-slate-200">
                            <RiCloseLine />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      {isChangeOpen && (
        <ChangeCustomerInfo
          setIsChangeOpen={setIsChangeOpen}
          currentCustomerId={customer.id}
          currentCustomerName={customer.name}
          currentCustomerAddress={customer.address}
          currentCustomerPhone={customer.phoneNumber}
          currentCustomerProperty={customer.propertyDesignation}
          currentCustomerSSN={customer.socialSecurityNumber}
          currentCustomerWorkList={customer.workList}
        />
      )}
      {isWorkOpen && (
        <AddWork
          setIsWorkOpen={setIsWorkOpen}
          currentCustomerId={customer.id}
          currentCustomerName={customer.name}
          currentCustomerAddress={customer.address}
          currentCustomerPhone={customer.phoneNumber}
          currentCustomerProperty={customer.propertyDesignation}
          currentCustomerSSN={customer.socialSecurityNumber}
          currentCustomerWorkList={customer.workList}
        />
      )}
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          deleteThis={deleteThis}
          currentName={currentCustomerName}
          currentId={currentCustomerId}
        />
      )}
    </div>
  );
}
