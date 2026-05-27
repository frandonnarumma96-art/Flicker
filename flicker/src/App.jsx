import Button from './components/InterfacciaUtente/button'
import { StepGeneri } from './servizi/generi'
import { StepFilmCuore } from './servizi/GiaVisti'
import { Login } from './servizi/Login'
import { StepPiattaforme } from './servizi/piattaforme'
import { Registrazione } from './servizi/registrazione'
import { StepProfilo } from './servizi/username'





function App() {
  return (
  <>
    
  <Registrazione/>
  <Login/>
  <StepProfilo/>
  <StepPiattaforme/>
  <StepGeneri/>
  <StepFilmCuore/>
    
  </>
  )
}

export default App