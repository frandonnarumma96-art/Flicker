import { Routes, Route } from "react-router-dom"; 
import { OnboardingProvider } from "./context/stepContexst";
import Button from './components/InterfacciaUtente/button'
import { useState } from 'react';
import { StepGeneri } from './servizi/generi'
import { StepFilmCuore } from './servizi/GiaVisti'
import { Login } from './servizi/Login'
import { StepPiattaforme } from './servizi/piattaforme'
import { Registrazione } from './servizi/registrazione'
import { StepProfilo } from './servizi/username'
import { Home } from "./components/layout/Home";
import { Match } from "./components/layout/Match";
import { Lista } from "./servizi/Lista";
import { FilmSerie } from "./servizi/FilmSerie";
import { Navbar } from "./components/InterfacciaUtente/Navbar"; 
import { Header } from "./servizi/header";
import { AccountTab } from "./servizi/accountTab";

function App() {
  const [userProfile, setUserProfile] = useState({});
  
  return (
    <OnboardingProvider>
      {/* 🌟 AGGIUNTO 'flex flex-col': organizza Header, Contenuto e Navbar in colonna matematica */}
      <div className="min-h-screen bg-[#06000c] flex flex-col">

        {/* L'header sta in cima. Se c'è occupa spazio, se restituisce null scompare e lascia spazio */}
        <Header />
        
        {/* 🌟 AGGIUNTO IL TAG <main>: 'flex-1' si prende tutto lo spazio centrale disponibile, */}
        {/* 'pb-24' crea la trincea di sicurezza per non far coprire i contenuti dalla Navbar in basso */}
        <main className="flex-1 w-full pb-24">
          <Routes>
            <Route path="/" element={<Registrazione />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/onboarding/step1" element={<StepProfilo />} />
            <Route path="/onboarding/step2" element={<StepPiattaforme />} />
            <Route path="/onboarding/step3" element={<StepGeneri />} />
            <Route path="/onboarding/step4" element={<StepFilmCuore />} />
            
            <Route path="/match" element={<Match />} />
            <Route path="/home" element={<Home />} />

            <Route path="/film" element={<FilmSerie tipo="film" />} />
            <Route path="/serie-tv" element={<FilmSerie tipo="serie" />} />
            <Route path="/la-mia-lista" element={<Lista />} />
            <Route path="/account" element={<AccountTab />} />
          </Routes>
        </main>

        {/* La Navbar rimane fissa sul fondo dello schermo */}
        <Navbar />
        
      </div>
    </OnboardingProvider>
  );
}

export default App;