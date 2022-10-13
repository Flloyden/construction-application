import React from "react";
import "../styles/Modal.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({
  setIsOpen,
  deleteClient,
  currentClientName,
  currentClientId,
}) => {
  return (
    <>
      <div className={"darkBG"} onClick={() => setIsOpen(false)} />
      <div className={"centered"}>
        <div className={"modal"}>
          <div className={"modalHeader"}>
            <h5 className={"heading"}>Varning</h5>
          </div>
          <button className={"closeBtn"} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={"modalContent"}>
            Är du säker du vill ta bort <b>{currentClientName}</b> från
            kundregistret?
          </div>
          <div className={"modalActions"}>
            <div className={"actionsContainer"}>
              <button
                className={"deleteBtn"}
                onClick={() => deleteClient(currentClientId)}
              >
                Ta bort
              </button>
              <button className={"cancelBtn"} onClick={() => setIsOpen(false)}>
                Avbryt
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
