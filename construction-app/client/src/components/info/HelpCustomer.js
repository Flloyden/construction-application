import React from "react";

export default function HelpCustomer() {
  return (
    <div className="pt-4 mt-4 border-t-2">
      <div className="flex gap-10">
        <div className="w-fit border-r-2 pr-10">
          <div className="">
            <h1 className="font-bold">Kunder</h1>
            <p>Kundregister</p>
            <p className="font-normal">
              Till höger ser man kundregistret. Här har man möjlighet att söka
              efter en kund baserat på namnet, skapa en ny kund och radera
              befintliga kunder.
            </p>
            <p className="mt-4">Skapa ny kund</p>
            <p className="font-normal">
              Genom att trycka på knappen "Ny kund" öppnas en ruta där man kan
              ange information om kunden.
            </p>
            <p className="mt-4">Radera en kund</p>
            <p className="font-normal">
              Man kan radera en befintlig kund genom att trycka på den röda
              soptunnan-ikonen bredvid kundens namn. (Observera att raderade
              kunder inte kan återställas.)
            </p>
          </div>
          <div className="mt-6 border-t-2">
            <h1 className="font-bold mt-6">Kundinformation</h1>
            <p className="font-normal">
              Under kundinformationen kan man se information om kunden, dess
              jobb och anteckningar relaterade till jobben. Här har man
              möjlighet att ändra kundinformation, lägga till ett nytt jobb,
              ändra ett befintlig jobb och lägga till anteckningar om befintliga
              jobb.
            </p>
            <p className="mt-4">Ändra kundinformation</p>
            <p className="font-normal">
              Genom att trycka på den blå knappen "Ändra" under
              kundinformationen, öppnas en ruta där man kan ange ny information
              om kunden.
            </p>

            <p className="mt-4">Lägga till jobb och ändra jobb</p>
            <p className="font-normal">
              Man kan lägga till ett nytt jobb genom att trycka på den stora
              plus-ikonen under kundinformationen, och man kan ändra ett
              befintlig jobb genom att trycka på den blåa penn-ikonen.
            </p>
          </div>
        </div>
        <div className="">
          <img
            src="kundregister.png"
            alt="Översikt bild"
            className="border-black border rounded"
          />
          <img
            src="kundInfo.png"
            alt="Översikt bild"
            className="border-black border rounded mt-2"
          />
          <div className="flex mt-0 gap-6">
            <div className="mt-6">
              <h1 className="font-bold mt-4 ml-6">
                Anteckningar och summeringar
              </h1>
              <p className="font-normal ml-6">
                Genom att välja ett jobb i drop-down-menyn vid "Ny anteckning"
                kan man välja vilket jobb som anteckningen ska tillhöra. I
                anteckningarna fyller man i arbetad tid, antal km vid körning
                och anställd tid (vilket motsvarar hur mycket en anställd har
                jobbat på valt jobb). Genom att välja ett jobb och en månad och
                sedan trycka på "Spara", genereras en sammanfattning för jobbet
                för den valda månaden. (Observera att man bara kan lägga till
                anteckningar för pågående jobb.)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
