import React from "react";

export default function HelpWarranty() {
  return (
    <div className="pt-4 mt-4 border-t-2">
      <div className="flex gap-10">
        <div className="w-fit">
          <div className="">
            <h1 className="font-bold">Garantier</h1>
            <p>Garantiregister</p>
            <p className="font-normal">
              Till höger ser man vårt garantiregister. I detta register har du möjlighet att söka efter utgående garantier beroende på namn, skapa en ny garanti och radera existerande garanti.
            </p>
            <p className="mt-4">Automatisk radering</p>
            <p className="font-normal">
              Vårt program BiTs kollar dagligen ifall några av dina garantier har gått ut. Ifall deras datum är förbipasserat, då raderas garantin från listan.
              På översikten av programmet kan du se nästa utgående garanti så man inte blir överraskad.
            </p>

            <p className="mt-4">Lägg till en ny garanti</p>
            <p className="font-normal">
                Du har möjligheten att lägga till en ny garanti genom att klicka på den blåa knappen uppe till höger.
               
              </p>

            <p className="mt-4">Redigera och radera en garanti</p>
            <p className="font-normal">
                Du har möjligheten att båda ändra och ta bort existerande garantier genom att klicka på de tre prickarna ute till höger, vid åtgärd kolumnen. 
                När du klickar på dessa tre prickarna möts du med två alternativ, ändra eller ta bort.
              </p>
              <p className="font-bold">
              (OBS. Lägg märke till att en raderad garanti inte ligger kvar och måste återskaps med "Ny garanti" knappen)
              </p>      

            <p className="mt-4">Visa kvitto</p>
            <p className="font-normal">
               Genom att klicka på knappen "Visa kvitto" så visas det kvittot som sparades när du skapade garantin.
               De garantier som inte har en "Visa kvitto" knapp så har det inte lagts till en bild av garantin när du skapade den.
              </p> 
          </div>
        </div>
        <div className="">
          <img src="garantier.png" alt="Översikt bild" className="border-black border rounded" />
        </div>
      </div>
    </div>
  );
}
