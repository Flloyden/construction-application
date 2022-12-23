import React from "react";
import CookiePolicy from "./CookiePolicy";

export default function About() {
  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-full bg-blue-50 dark:bg-white dark:text-white">
      <div className="rounded-lg w-full h-full">
        <div className="w-full h-fit bg-white dark:bg-gray-800 p-6 rounded shadow border">
          <h1 className="font-bold">BiTs</h1>
          <p className="font-normal text-justify w-1/2">
            Välkommen till BiTs! BiTs är en applikation som gör det möjligt för
            företag att hålla koll på sina kunder, garantier samt att se en
            kalender för olika händelser. Vårt mål med denna applikation är att
            ge företag ett verktyg för att förenkla och förbättra sin
            verksamhet, samt att visa våra färdigheter inom React och Java.
            Vi hoppas att företaget blir nöjda med vårt arbete.
          </p>
          <p className="font-normal text-justify w-1/2 mt-4">
            BiTs skapades år 2022 av ett par studenter på MAU som består av
            passionerade individer med olika kompetenser och bakgrunder.
            Tillsammans arbetar vi för att skapa en enkel, användarvänlig och
            funktionell lösning för ett privat företag.
          </p>
          <CookiePolicy />
        </div>
      </div>
    </div>
  );
}
