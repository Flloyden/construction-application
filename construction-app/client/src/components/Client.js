import React, { useEffect, useState } from "react";
import { AiOutlineNumber } from "react-icons/ai";
import { BsFillHouseFill, BsPersonFill, BsTelephoneFill } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import "../styles/Client.css";
import AddWork from "./AddWork";
import ChangeInfo from "./ChangeInfo";
import Work from "./Work";

export default function Client() {
  const navigate = useNavigate();
  const location = useLocation();
  const [kund, setKund] = useState(null);
  const [loading, setLoading] = useState(true);
  var url = location.pathname;
  var res = url.split("/");
  var pos = res.indexOf("kunder");
  var result = res[pos + 1];
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isChangeOpen, setIsChangeOpen] = useState(false);

  useEffect(() => {
    // Gets all the clients on page load
    const fetData = async () => {
      setLoading(true);
      try {
        const response = await ApiConnector.getKund(result);
        if (response.data === null) {
          navigate("/error");
        } else {
          setKund(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetData();
  }, [result, navigate]);

  return (
    <div className="container">
      <div className="content">
        <h1>Kundinformation</h1>
        <button
          onClick={() => {
            setIsChangeOpen(true);
          }}
        >
          ändra
        </button>
        {!loading && (
          <div className="testingu">
            <div className="one">
              <div className="testing">
                <BsPersonFill className="icon1" />
                <p className="infoText">Kund</p>
                <span className="text">{kund.name}</span>
              </div>
              <div className="testing">
                <AiOutlineNumber className="icon1" />
                <p className="infoText">Personnummer</p>
                <span className="text">{kund.socialSecurityNumber}</span>
              </div>
              <div className="testing">
                <MdLocationOn className="icon1" />
                <p className="infoText">Adress</p>
                <span className="text">{kund.address}</span>
              </div>
              <div className="testing">
                <MdEmail className="icon1" />
                <p className="infoText">E-post</p>
                <span className="text">{kund.name}</span>
              </div>
              <div className="testing">
                <BsTelephoneFill className="icon1" />
                <p className="infoText">Telefonnummer</p>
                <span className="text">{kund.phoneNumber}</span>
              </div>
              <div className="testing">
                <BsFillHouseFill className="icon1" />
                <p className="infoText">Fastighetsbeteckning</p>
                <span className="text">{kund.propertyDesignation}</span>
              </div>
            </div>
            <div className="two">
              <h2>Anteckningar</h2>
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
            <div className="three">
              <div className="title">
                <h2>Jobb</h2>
                <GrAddCircle
                  className="addWorkIcon"
                  onClick={() => {
                    setIsWorkOpen(true);
                  }}
                />
              </div>
              <div className="work">
                {kund.workList.map((workName) => (
                  <div className="workTitle" key={workName.id}>
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
          currentClientId={kund.id}
          currentClientName={kund.name}
          currentClientAddress={kund.address}
          currentClientPhone={kund.phoneNumber}
          currentClientProperty={kund.propertyDesignation}
          currentClientSSN={kund.socialSecurityNumber}
        />
      )}
      {isWorkOpen && (
        <AddWork
          setIsWorkOpen={setIsWorkOpen}
          currentClientId={kund.id}
          currentClientName={kund.name}
          currentClientAddress={kund.address}
          currentClientPhone={kund.phoneNumber}
          currentClientProperty={kund.propertyDesignation}
          currentClientSSN={kund.socialSecurityNumber}
          currentClientWorkList={kund.workList}
        />
      )}
    </div>
  );
}
