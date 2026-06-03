import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./context/stepContexst";
import Button from './components/InterfacciaUtente/button'
import { StepGeneri } from './servizi/generi'
import { StepFilmCuore } from './servizi/GiaVisti'
import { Login } from './servizi/Login'
import { StepPiattaforme } from './servizi/piattaforme'
import { Registrazione } from './servizi/registrazione'
import { StepProfilo } from './servizi/username'
import { Home } from "./components/layout/Home";
import { Match } from "./components/layout/Match";



function App() {
  return (
  <OnboardingProvider>
            <div className="min-h-screen bg-[#06000c]">
                <Routes>
                  
                    <Route path="/" element={<Registrazione />} />
                    <Route path="/login" element={<Login />} />
                    
                   
                    <Route path="/onboarding/step1" element={<StepProfilo />} />
                    <Route path="/onboarding/step2" element={<StepPiattaforme />} />
                    <Route path="/onboarding/step3" element={<StepGeneri />} />
                    <Route path="/onboarding/step4" element={<StepFilmCuore />} />
                    
                   <Route path="/match" element={<Match />} />

                   <Route path="/home" element={<Home />} />
                </Routes>
            </div>
        </OnboardingProvider>
    );
}

export default App