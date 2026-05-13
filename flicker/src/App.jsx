import './App.css'
import { getPopularMovies } from './api/tmdb'

function App() {
  

  return (
    <>
     <button onClick={getPopularMovies}>Cliccami</button>
    </>
  )
}

export default App
