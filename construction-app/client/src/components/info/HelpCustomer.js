import React from "react";

export default function HelpCustomer() {
  return (
    <div className="pt-4 mt-4 border-t-2">
      <div className="flex gap-10">
        <div className="w-fit">
          <div className="">
            <h1 className="font-bold">Kunder</h1>
            <p>Kundregister</p>
            <p className="font-normal">
              Till höger ser man vårt kundregister. I denna har du möjlighet att söka efter kund beroende på namn, skapa en ny kund och radera existerande kunder.
            </p>
            <p className="mt-4">Skapa ny kund</p>
            <p className="font-normal">
              Genom att trycka på knappen "Ny kund" öppnas en ruta där information om kunden ska anges.
            </p>
            <p className="mt-4">Radera en kund</p>
            <p className="font-normal">
              Du kan radera en existerande kund genom att trycka på knappen som liknar en soptunna på kunden du vill ta bort från kundregistert. 
              </p>
              <p className="font-bold">
              (OBS. Lägg märke till att raderad kund ej ligger kvar och måste återskapas med "Skapa ny kund")
              </p>
          </div>
          <div className="mt-6 border-t-2">
            <h1 className="font-bold mt-6">Kund information</h1>
            <p className="font-normal">
              Under kund information kan man se information om kunden, dess jobb och anteckningar som är kopplade till jobben.
              Här har man möjlighet att ändra kundinformation, lägga till ett nytt jobb, ändra ett existerande jobb och lägga till anteckningar om existerande jobb.
            </p>
            <p className="mt-4">Ändra kund information</p>
            <p className="font-normal">
              Genom att trycka på den blåa "Ändra" knappen under kund informationen, öppnas en ruta där ny information om kunden kan anges.
            </p>

            <p className="mt-4">Lägga till jobb och ändra jobb information</p>
            <p className="font-normal">
              Genom att trycka på det stora plus tecknet under kund informationen, öppnas en ruta där information om ett nytt jobb kan anges.
              Efter att ett jobb har skapats så kan man klicka på knappen nere vid jobbet som motsvarar en penna, där en ruta öppnar och man kan ange ny information om jobbet.
            </p>
          </div>
          <div className="mt-6 border-t-2">
            <h1 className="font-bold mt-6">Anteckningar och summeringar</h1>
            <p className="font-normal">
              Genom att välja ett jobb i drop-down menyn vid "Ny anteckning" så väljer man vilket jobb som anteckningen kommer att tillhöra.
              I anteckningar fyller du i arbetad tid, antal km vid körning och anställd tid (vilket motsvarar hur mycket en anställd har jobbat på vald jobb.) 
              Genom att välja jobb och månad ute i höger sida och sedan trycker på "Spara", så genereras en summering för jobbet med motsvarande månad.
              </p>
              <p className="font-bold">
              (OBS. Går endast att lägga till anteckningar på pågående jobb.)
              </p>
          </div>
        </div>
        <div className="">
          <img src="kundregister.png" alt="Översikt bild" className="border-black border rounded" />
          <img src="kundregisterSearch.png" alt="Översikt bild" className="border-black border rounded mt-2" />
          <img src="kundInfo.png" alt="Översikt bild" className="border-black border rounded mt-2" />
        </div>
      </div>
    </div>
  );
}
