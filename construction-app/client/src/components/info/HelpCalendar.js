import React from "react";

export default function HelpCalendar() {
  return (
    <div className="pt-4 mt-4 border-t-2">
      <div className="flex gap-10">
        <div className="w-fit">
          <div className="">
            <h1 className="font-bold">Kalender</h1>
            <p className="font-normal">
              Till höger ser man vår kalender. Här kan man se alla jobb, semestrar, helger samt röda dagar. 
            </p>
            <p className="mt-4">Klicka på jobb</p>
            <p className="font-normal">
              Genom att trycka på kalenderns olika dagar så kan man göra vissa funktioner.
              Trycker du på de blåa dagarna vilekt motsvarar jobb, så får du en "pop-up" som visas på bild 3 där du kan välja om du vill hoppa till jobbets motsvarande kund.
            </p>
            <p className="mt-4">Klicka på semester</p>
            <p className="font-normal">
              Genom att trycka på de gröna dagarna vilket motsvarar inlagd semester, så får du en "pop-up" som gick dig möjligheten att ändra semestern. Det visas ett exempel på bild 2.
              </p>
            
              <p className="mt-4">Klicka på blanka eller röda dagar</p>
              <p className="font-normal">
              Genom att trycka på de röda eller "blanka" dagarna bemöts du av en "pop-up" som kommer berätta att det inte finns något att göra den dagen. På de blanka är det för att det inte finns
              ett aktivt jobb den dagen och de röda dagarna motsvarar "röda" dagar.
              </p>

              <p className="mt-4">Klicka på pilarna uppe i hörnen</p>
              <p className="font-normal">
              Genom att trycka på pilarna uppe i hörnen, så hoppar kalendern fram eller back 6 månader åt gången beroende på vilken pil som trycks på. 
              </p>
          </div>
        </div>
        <div className="">
          <img src="kalender.png" alt="Översikt bild" className="border-black border rounded" />
          <div className="flex">
          <img src="redigera_semester.png" alt="Översikt bild" className="border-black border rounded mt-2" />
          <img src="hoppatillkund.png" alt="Översikt bild" className="border-black border rounded mt-2 ml-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
