import { useState } from "react";

import { Registrazione } from "./servizi/registrazione";
import { Login } from "./servizi/Login";
import { StepProfilo } from "./servizi/username";
import { StepPiattaforme } from "./servizi/piattaforme";
import { StepGeneri } from "./servizi/generi";
import { StepFilmCuore } from "./servizi/GiaVisti";
import { FilmSerie } from "./servizi/FilmSerie";
import { Navbar } from "./components/InterfacciaUtente/navbar";

function App() {
  const [userProfile, setUserProfile] = useState({});
  const [tipo, setTipo] = useState("film");

  return (
    <>
      {/* <Registrazione /> */}

      <Login />

      <StepProfilo
        userProfile={userProfile}
        setUserProfile={setUserProfile}
      />

      <StepPiattaforme />

      <StepGeneri />

      <StepFilmCuore />

      <FilmSerie tipo={tipo} />

      <Navbar onCambia={setTipo} />
    </>
  );
}

export default App;