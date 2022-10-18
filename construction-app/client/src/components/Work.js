import React, { useRef, useState } from "react";
import "../styles/Work.css";

const Work = (props) => {
  const [open, setOPen] = useState(false);
  const toggle = () => {
    setOPen(!open);
  };
  const contentRef = useRef();
  if (contentRef.current) console.log(contentRef.current.scrollHeight);

  return (
    <div>
      <h1 onClick={toggle}>{props.label}</h1>
      {open && (
        <div className="toggle">
          <div className={open ? "content-show" : "content-parent"}>
            <div className="contentent">
              <div className="labels">
                <label>Material: </label>
                {props.workName.materialNote}
              </div>
              <div className="labels">
                <label>Jobbstatus: </label>
                {props.workName.workStatus}
              </div>
              <div className="labels">
                <label>Startdatum: </label>
                {props.workName.startDate}
              </div>
              <div className="labels">
                <label>Antal dagar: </label>
                {props.workName.numberOfDays}
              </div>
              <img
                src={props.workName.offer}
                alt="offer"
                style={{ width: "50%" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Work;
