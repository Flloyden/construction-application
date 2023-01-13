import React from "react";

export default function HelpSettings() {
  return (
    <div className="pt-4 mt-4 border-t-2">
      <div className="flex gap-10">
        <div className="w-1/3 border-r-2 pr-10">
          <h1 className="font-bold">Inställningar</h1>
          <p className="font-normal">
            I inställningar finns det olika justeringar som kan göras, som
            påverkar användningen av kontot och användarupplevelsen av
            programmet.
          </p>
          <p className="mt-4">Ändra profil information</p>
          <p className="font-normal">
            Genom att använda "Profil" fliken, kan man ändra profilinformation
            såsom byta profilbild, ändra användarnamn och emailadress.
          </p>
          <p className="mt-4">Ändra lösenord</p>
          <p className="font-normal">
            Genom att trycka på "Lösenord" fliken kan man ändra lösenordet.
          </p>

          <p className="mt-4">Ändra visuellt läge</p>
          <p className="font-normal">
            Genom att trycka på "Utseende" fliken kan man ändra utseendet på
            programmet. Man kan växla mellan ljust och mörkt läge.
          </p>

          <p className="mt-4">Ändra kalenderfärger</p>
          <p className="font-normal">
            Genom att trycka på "Kalender" fliken kommer man in i
            kalenderinställningarna. Här kan man manuellt välja färger för olika
            händelser i kalendern såsom jobb, semester och helgdagar.
          </p>
        </div>
        <div className="flex w-1/2 flex-wrap gap-2">
          <img
            src="changeProfile.png"
            alt="Översikt bild"
            className="border-black border rounded h-fit"
          />
          <img
            src="changePassword.png"
            alt="Översikt bild"
            className="border-black border rounded h-fit"
          />
          <img
            src="colorOnCalendar.png"
            alt="Översikt bild"
            className="border-black border rounded h-fit"
          />
          <img
            src="changeVisualMode.png"
            alt="Översikt bild"
            className="border-black border rounded h-fit"
          />
        </div>
      </div>
    </div>
  );
}
