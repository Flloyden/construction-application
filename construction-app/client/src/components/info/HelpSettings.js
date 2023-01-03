import React from "react";

export default function HelpSettings() {
  return (
    <div className="pt-4 mt-4 border-t-2">
      <div className="flex gap-20">
        <div className="w-fit max-w-lg">
          <div className="">
            <h1 className="font-bold">Inställningar</h1>
            <p className="font-normal">
              I våra inställningar finns några ändringar man kan göra som påverkar kontot som använder sig av kontot, samt användarupplevelsen av programmet.
            </p>
            <p className="mt-4">Ändra profil information</p>
            <p className="font-normal">
              Genom att använda sig av "Profil" tabben så har du möjligheten att ändra profilinformation som t.ex ändra bild, ändra användarnamn och ändra din email.
            </p>
            <p className="mt-4">Ändra lösenord</p>
            <p className="font-normal">Genom att trycka på "Lösenord" tabben så har du möjligheten att ändra på ditt lösenord.</p>
           
              <p className="mt-4">Ändra visuellt läge</p>
              <p className="font-normal">
              Genom att trycka på "Utseende" tabben så har du möjligheten att ändra på hur ditt program ser ut. I nuläget har du möjligheten att ändra mellan
              ljust läge och mörkt läge.
              </p>

              <p className="mt-4">Ändra kalenderfärger</p>
              <p className="font-normal">
              Genom att trycka på "Kalender" tabben så kommer du in i kalenders inställningar. Här kan du manuellt välja vilka färger som ska motsvara de olika sakerna i kalendern som jobb, semester och helgdagar.
              </p>
          </div>
        </div>
          <div className="">
              <div className="flex">
              <img src="changeProfile.png" alt="Översikt bild" className="border-black border rounded ml-5" />
              <img src="changePassword.png" alt="Översikt bild" className="border-black border rounded mt-2 ml-5" />
              </div>
              <div className="flex">
                <img src="changeVisualMode.png" alt="Översikt bild" className="border-black border rounded mt-2 ml-5" />
                <img src="colorOnCalendar.png" alt="Översikt bild" className="border-black border rounded mt-2 ml-5" />
              </div>
          </div>
      </div>
    </div>
  );
}
