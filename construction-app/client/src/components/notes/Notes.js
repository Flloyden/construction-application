import React from "react";
import RegularNotes from "./RegularNotes";
import SummedNotes from "./SummedNotes";

export default function Notes(props) {
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  const copy = [...props.currentCustomer.customerNotes];
  const resultReg = copy.filter((item) => item.noteStatus === "NOTSUMMARIZED");

    return (
      <div>
        <RegularNotes notes={resultReg} />
        <SummedNotes currentCustomer={props.currentCustomer.id} />
      </div>
    )
}
