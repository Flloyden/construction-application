import React, { useEffect, useState } from "react";
import { AiOutlineNumber } from "react-icons/ai";
import { BsFillHouseFill, BsPersonFill, BsTelephoneFill } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import AddWork from "./AddWork";
import ChangeInfo from "./ChangeCustomerInfo";
import Work from "./Work";

export default function Customer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  var url = location.pathname;
  var res = url.split("/");
  var pos = res.indexOf("kunder");
  var result = res[pos + 1];
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isChangeOpen, setIsChangeOpen] = useState(false);

  useEffect(() => {
    // Gets all the customers on page load once per load
    const fetchData = async () => {
      setLoading(true);
      try {
        // Treis to get all customers from database with api call
        const response = await ApiConnector.getCustomer(result);
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
  }, [result, navigate]);

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-screen">
      <div className="rounded-lg w-full h-full p-4">
        <h1 className="text-4xl">Kundinformation</h1>
        {!loading && (
          <div className="flex flex-wrap">
            <div className="w-3/6 pr-10 pb-10">
              <div className="flex px-4 py-4 justify-between border-b-2">
                <div className="flex">
                <BsPersonFill className="text-3xl mr-4 mt-0.5"/>
                <p className="text-2xl font-bold">Kund</p>
                </div>
                <span className="text-1xl ml-auto my-auto">{customer.name}</span>
              </div>
              <div className="flex px-4 py-4 justify-between border-b-2">
                <div className="flex">
                <AiOutlineNumber className="text-3xl mr-4 mt-0.5"/>
                <p className="text-2xl font-bold">Personnummer</p>
                </div>
                <span className="text-1xl ml-auto my-auto">{customer.socialSecurityNumber}</span>
              </div>
              <div className="flex px-4 py-4 justify-between border-b-2">
                <div className="flex">
                <MdLocationOn className="text-3xl mr-4 mt-0.5"/>
                <p className="text-2xl font-bold">Adress</p>
                </div>
                <span className="text-1xl ml-auto my-auto">{customer.address}</span>
              </div>
              <div className="flex px-4 py-4 justify-between border-b-2">
                <div className="flex">
                <MdEmail className="text-3xl mr-4 mt-0.5"/>
                <p className="text-2xl font-bold">E-post</p>
                </div>
                <span className="text-1xl ml-auto my-auto">{customer.name}</span>
              </div>
              <div className="flex px-4 py-4 justify-between border-b-2">
                <div className="flex">
                <BsTelephoneFill className="text-3xl mr-4 mt-0.5"/>
                <p className="text-2xl font-bold">Telefonnummer</p>
                </div>
                <span className="text-1xl ml-auto my-auto">{customer.phoneNumber}</span>
              </div>
              <div className="flex px-4 py-4 justify-between">
                <div className="flex">
                <BsFillHouseFill className="text-3xl mr-4 mt-0.5"/>
                <p className="text-2xl font-bold">Fastighetsbeteckning</p>
                </div>
                <span className="text-1xl ml-auto my-auto">{customer.propertyDesignation}</span>
              </div>
              <div className="flex w-full gap-2 mt-2">
                <button
                className="bg-red-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-2/4"
                onClick={() => {
                  setIsChangeOpen(true);
                }}
              >
                Ta bort
              </button>
              <button
                className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-2/4"
                onClick={() => {
                  setIsChangeOpen(true);
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
            <div className="w-full py-4">
              <div className="flex">
                <h2 className="text-3xl">Jobb</h2>
                <GrAddCircle
                  className="text-4xl ml-2 cursor-pointer hover:rotate-90 duration-200"
                  onClick={() => {
                    setIsWorkOpen(true);
                  }}
                />
              </div>
              <div className="">
                {customer.workList.map((workName) => (
                  <div className="text-2xl border-2 my-4 border-gray-800 rounded-lg" key={workName.id}>
                    <Work label={workName.name} workName={workName} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {isChangeOpen && (
        <ChangeInfo
          setIsChangeOpen={setIsChangeOpen}
          currentCustomerId={customer.id}
          currentCustomerName={customer.name}
          currentCustomerAddress={customer.address}
          currentCustomerPhone={customer.phoneNumber}
          currentCustomerProperty={customer.propertyDesignation}
          currentCustomerSSN={customer.socialSecurityNumber}
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
    </div>
  );
}
