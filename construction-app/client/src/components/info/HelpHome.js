import React from "react";

export default function HelpHome() {
  return (
    <div className="pt-4 mt-4 border-t-2">
      <div className="flex gap-10">
        <div className="w-fit border-r-2 pr-10">
          <div className="">
            <h1 className="font-bold">Översikt</h1>
            <p>Lägg in semester</p>
            <p className="font-normal">
              Genom att trycka på knappen "Lägg in semester" öppnas en ruta där
              önskad semester med namn, startdatum och antal dager ska anges.
            </p>
            <p className="mt-4">Skapa ny kund</p>
            <p className="font-normal">
              Genom att trycka på knappen "Skapa ny kund" öppnas en ruta där
              information om kunden ska anges.
            </p>
            <p className="mt-4">Skapa ny garanti</p>
            <p className="font-normal">
              Genom att trycka på knappen "Skapa ny garanti" öppnas en ruta där
              namn, registreringsnummer, kvitto och utgångsdatum kan anges.
            </p>
          </div>
          <div className="mt-6 border-t-2">
            <h1 className="font-bold mt-6">Jobböversikt</h1>
            <p className="font-normal">
              Under jobböversikt kan man se om det finns ett pågående samt
              kommande jobb med tillhörande information.
            </p>
            <p className="mt-4">Arbetsdagar</p>
            <p className="font-normal">
              Tabellen under arbetsdagar visar antal arbetsdagar under varje
              månad. Genom att föra muspekaren över en stapel visas antal dagar.
            </p>
          </div>
          <div className="mt-6 border-t-2">
            <h1 className="font-bold mt-6">Garantier</h1>
            <p className="font-normal">
              Under garantier kan man se antal garantier som inte gått ut än,
              hur många som utgått och totalen. Här kan man också se vilken
              garanti som är närmst utgående.
            </p>
          </div>
        </div>
        <div className="">
          <img src="1.png" alt="Översikt bild" className="border-black border rounded" />
          <div className="flex mt-6 gap-6">
            <div className="mt-6">
              <h1 className="font-bold mt-6 ml-6">Jobb & Semester</h1>
              <p className="font-normal ml-6">
                Här kan man se antal kommande, pågående och slutförda jobb samt
                antal semesterdagar som man har lagt in.
              </p>
            </div>
            <div className="mt-6 border-l-2">
              <h1 className="font-bold mt-6 ml-6">Kalender</h1>
              <p className="font-normal ml-6">
                Kalendern visar nuvarande vecka med tillhörande information om
                jobb, semester, helger och helgdagar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
