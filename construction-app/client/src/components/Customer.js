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
import AddCustomerNote from "./AddCustomerNote";
import Notes from "./Notes";
import SumCustomerNote from "./SumCustomerNote";

export default function Customer() {
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
  const [oldNotesToggle, setOldNotesToggle] = useState(false);

  useEffect(() => {
    document.title = "Kund - " + currentCustomerId
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

  const showOldNotes = (e) => {
    /**Handles the logout function when the login button is pressed */
    e.preventDefault();
    setOldNotesToggle(!oldNotesToggle);
  };

  function checkWorkList(e) {
    if (e.length > 0) {
      if (e.map((item) => {return (item.workStatus)}).includes("STARTED") || e.map((item) => {return (item.workStatus)}).includes("COMPLETED")) {
        return "hidden"
      } else {
        return "bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-full"
      }
    } else {
      return "bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-full"
    }
  }

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-min bg-blue-50 dark:bg-white">
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
                <span className="text-1xl my-auto">{customer.address}, {customer.city}, {customer.zip}</span>
              </div>
              <div className="flex py-2 justify-start items-center w-full">
                <div className="flex">
                  <MdEmail className="text-4xl mr-4 mt-0.5 pl-2" />
                </div>
                <span className="text-1xl my-auto">{customer.mail}</span>
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
              <div className="flex gap-2 justify-end items-center pb-8 mt-4 w-full">
                <button
                  className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-full duration-300"
                  onClick={() => {
                    setIsChangeOpen(true);
                  }}
                >
                  Ändra
                </button>
                <button
                  className={checkWorkList(customer.workList)}
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
                  <div className="flex w-full h-min py-4 items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow-md lg:max-w-md hover:scale-105 duration-300">
                    <GrAddCircle
                      className="text-9xl ml-2 cursor-pointer hover:rotate-90 hover:opacity-100 duration-500 opacity-20 dark:invert"
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
                        className="w-full h-fit bg-white dark:bg-gray-700 border-gray-200 rounded shadow-md lg:max-w-md duration-300"
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
            <div className={customer.workList.length > 0 ? "flex-1 h-max" : "hidden"}>
              <div className="flex flex-wrap">
                <div className="w-8/12">
                  <AddCustomerNote
                    currentCustomerId={customer.id}
                    currentCustomerName={customer.name}
                    currentCustomerAddress={customer.address}
                    currentCustomerPhone={customer.phoneNumber}
                    currentCustomerProperty={customer.propertyDesignation}
                    currentCustomerSSN={customer.socialSecurityNumber}
                    currentCustomerWorkList={customer.workList}
                    currentCustomerNotes={customer.customerNotes}
                  />
                </div>
                <div className="w-4/12 h-full pl-1 pb-1">
                  <SumCustomerNote
                    currentCustomerId={customer.id}
                    currentCustomerName={customer.name}
                    currentCustomerAddress={customer.address}
                    currentCustomerPhone={customer.phoneNumber}
                    currentCustomerProperty={customer.propertyDesignation}
                    currentCustomerSSN={customer.socialSecurityNumber}
                    currentCustomerWorkList={customer.workList}
                    currentCustomerNotes={customer.customerNotes}
                  />
                </div>
                <div className="w-full">
                  <Notes
                    currentCustomer={customer}
                    showOldNotes={showOldNotes}
                    oldNotesToggle={oldNotesToggle}
                  />
                </div>
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
          currentCustomerNotes={customer.customerNotes}
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
          currentCustomerNotes={customer.customerNotes}
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
