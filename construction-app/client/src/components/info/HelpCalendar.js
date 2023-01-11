import React from "react";

export default function HelpCalendar() {
  return (
    <div className="pt-4 mt-4 border-t-2">
      <div className="flex gap-10">
        <div className="w-1/2 border-r-2">
          <div className="pr-4">
            <h1 className="font-bold">Kalender</h1>
            <p className="font-normal">
              På kalendern till höger kan man se alla jobb, semestrar, helger
              samt röda dagar. Genom att trycka på olika dagar i kalendern kan
              man utföra olika funktioner.
            </p>
            <p className="mt-4">Jobb</p>
            <p className="font-normal">
              Trycker man på de blå dagarna, som motsvarar jobb, så öppnas en
              "pop-up" som ger möjligheten att gå till det jobbets motsvarande
              kund.
            </p>
            <p className="mt-4">Semester</p>
            <p className="font-normal">
              Trycker man på de gröna dagarna, som motsvarar inlagd semester, så
              öppnas en "pop-up" som ger möjligheten att ändra semestern.
            </p>

            <p className="mt-4">Röda & tomma dagar</p>
            <p className="font-normal">
              Trycker man på de röda eller dagarna utan innehåll, så öppnas en
              "pop-up" som informerar om att det inte finns något att göra på
              den dagen. Dagar utan innehåll motsvarar ingen aktivitet, medan
              röda dagar motsvarar "röda" dagar.
            </p>

            <p className="mt-4">Vy</p>
            <p className="font-normal">
              Genom att trycka på pilarna uppe i hörnen, så kan man hoppa fram
              eller back 6 månader åt gången beroende på vilken pil som trycks
              på.
            </p>
          </div>
        </div>
        <div className="flex">
          <img
            src="kalender.png"
            alt="Översikt bild"
            className="border-black border rounded"
          />
        </div>
      </div>
    </div>
  );
}
