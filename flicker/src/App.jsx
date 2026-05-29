import Button from './components/InterfacciaUtente/button'
import {useState} from 'react';
import { StepGeneri } from './servizi/generi'
import { StepFilmCuore } from './servizi/GiaVisti'
import { Login } from './servizi/Login'
import { StepPiattaforme } from './servizi/piattaforme'
import { Registrazione } from './servizi/registrazione'
import { StepProfilo } from './servizi/username'

function App() {
  const [userProfile, setUserProfile] = useState({})
  return (
  <>
    
    <Registrazione/>
    <Login/>
    <StepProfilo 
    userProfile={userProfile} 
    setUserProfile={setUserProfile}
/>
    <StepPiattaforme/>
    <StepGeneri/>
    <StepFilmCuore/>
    
  </>
  )
}

export default App