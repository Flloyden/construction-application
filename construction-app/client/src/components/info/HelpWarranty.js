import React from "react";

export default function HelpWarranty() {
  return (
    <div className="pt-4 mt-4 border-t-2">
      <div className="flex gap-6">
        <div className="">
          <h1 className="font-bold">Garantier</h1>
          <p>Garantiregister</p>
          <p className="font-normal">
            Här har man möjlighet att söka efter utgående garantier baserat på
            namn, skapa en ny garanti och radera befintliga garantier.
          </p>
        </div>
        <div className="mt-6 border-l-2">
          <h1 className="ml-6">Automatisk radering</h1>
          <p className="font-normal ml-6">
            BiTs kontrollerar dagligen om några av garantierna har gått ut. Om
            garantierna har passerat sitt utgångsdatum, raderas garantin från
            listan. I översikten av programmet kan man se nästa utgående garanti
            för att inte bli överraskad.
          </p>
        </div>
        <div className="mt-6 border-l-2">
          <h1 className="ml-6">Ny garanti</h1>
          <p className="font-normal ml-6">
            Man kan lägga till en ny garanti genom att trycka på den blå knappen
            uppe till höger.
          </p>
        </div>
        <div className="mt-6 border-l-2">
          <h1 className="ml-6">Visa kvitto</h1>
          <p className="font-normal ml-6">
            Genom att klicka på knappen "Visa kvitto" kan man se kvittot som
            sparats när man skapade garantin. Garantier utan knappen "Visa
            kvitto" saknar en bild som sparats när garantin skapades.
          </p>
        </div>
        <div className="mt-6 border-l-2">
          <h1 className="ml-6">Redigera & radera garanti</h1>
          <p className="font-normal ml-6">
            Man kan ändra eller radera befintliga garantier genom att klicka på
            de tre punkterna i kolumnen för åtgärder till höger. (Observera att
            raderade garantier inte kan återställas.)
          </p>
        </div>
      </div>
      <img
        src="garantier.png"
        alt="Översikt bild"
        className="border-black border rounded mt-6"
      />
    </div>
  );
}
