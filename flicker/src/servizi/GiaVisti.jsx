import { useState, useEffect } from "react"
import { searchMovies, getImageUrl } from "../api/tmdb" 

export function StepFilmCuore({ onboardingData, setOnboardingData, onComplete, onSkip }) {
    const [query, setQuery] = useState("")
    const [risultatiAPI, setRisultatiAPI] = useState([])
    const [loading, setLoading] = useState(false)

    const filmPreferiti = onboardingData?.filmPreferiti || []

    useEffect(() => {
        if (query.trim().length < 3) {
            setRisultatiAPI([])
            return
        }

        const cercaFilm = async () => {
            setLoading(true)
            try {
                const results = await searchMovies(query)
                if (results) {
                    setRisultatiAPI(results.slice(0, 5))
                }
            } catch (err) {
                console.error("Errore nella ricerca dei film:", err)
            } finally {
                setLoading(false)
            }
        }

        const timer = setTimeout(() => {
            cercaFilm()
        }, 500)

        return () => clearTimeout(timer)
    }, [query])

    function handleSelezionaFilm(film) {
        const giaPresente = filmPreferiti.some(f => f.id === film.id)
        
        if (giaPresente) {
            const nuoviFilm = filmPreferiti.filter(f => f.id !== film.id)
            setOnboardingData(prev => ({ ...prev, filmPreferiti: nuoviFilm }))
        } else {
            if (filmPreferiti.length >= 3) {
                return 
            }
            
            const nuoviFilm = [...filmPreferiti, {
                id: film.id,
                titolo: film.title,
                poster: film.poster_path ? getImageUrl(film.poster_path) : null
            }]
            setOnboardingData(prev => ({ ...prev, filmPreferiti: nuoviFilm }))
            setQuery("") 
            setRisultatiAPI([])
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#06000c] text-white p-6 font-sans select-none">
            
            {/* Contenitore barre di progresso & Tasto Salta */}
            <div className="w-full max-w-sm mt-8 mb-6">
                <div className="flex gap-2 mb-3">
                    <div className="flex-1 h-1 bg-cyan-500/40 rounded-full"></div>
                    <div className="flex-1 h-1 bg-cyan-500/40 rounded-full"></div>
                    <div className="flex-1 h-1 bg-cyan-500/40 rounded-full"></div>
                    <div className="flex-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                    <span className="text-gray-500">STEP 4 / 4 • PREFERITI</span>
                    <button type="button" onClick={onSkip} className="text-purple-400/80 hover:text-cyan-400 transition-colors tracking-widest font-black">
                        SALTA ✕
                    </button>
                </div>
            </div>

            {/* Titolo Principale Glow */}
            <div className="w-full max-w-sm text-left mb-6 space-y-2">
                <h1 className="text-3xl font-bold tracking-wide leading-tight">
                    I tuoi tre <br />
                    <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                        film del cuore
                    </span>
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                    Aiuta a farci capire cosa ti piace!
                </p>
            </div>

            {/* Area Form */}
            <div className="w-full max-w-sm flex-1 flex flex-col justify-between pb-6 space-y-6">
                <div className="space-y-4 relative">
                    
                    {/* Input Ricerca */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">CERCA UN TITOLO</label>
                        <input 
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Es. Interstellar, Pulp Fiction..."
                            className="w-full px-4 py-3.5 bg-[#0b0411]/60 border border-gray-800 rounded-xl text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                        />
                    </div>

                    {/* Risultati della ricerca */}
                    {risultatiAPI.length > 0 && (
                        <div className="absolute z-10 w-full bg-[#0b0411] border border-gray-800 rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                            {risultatiAPI.map((film) => (
                                <button
                                    key={film.id}
                                    type="button"
                                    onClick={() => handleSelezionaFilm(film)}
                                    className="w-full flex items-center gap-3 p-3 hover:bg-[#12071a] text-left border-b border-gray-900/40 text-xs font-bold transition-colors"
                                >
                                    {film.poster_path ? (
                                        <img src={getImageUrl(film.poster_path)} alt="" className="w-8 h-11 object-cover rounded bg-gray-900" />
                                    ) : (
                                        <div className="w-8 h-11 bg-gray-900 rounded flex items-center justify-center text-[10px]">🎬</div>
                                    )}
                                    <div>
                                        <p className="text-gray-200 font-bold">{film.title}</p>
                                        <p className="text-gray-500 text-[10px] mt-0.5">{film.release_date ? film.release_date.split("-")[0] : "N/D"}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {loading && <p className="text-[10px] text-cyan-400 tracking-widest animate-pulse font-bold">RICERCA IN CORSO...</p>}

                    {/* Griglia Film Selezionati */}
                    <div className="pt-4">
                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase block mb-3">FILM SELEZIONATI ({filmPreferiti.length}/3)</label>
                        <div className="flex gap-4 min-h-[140px]">
                            {[0, 1, 2].map((index) => {
                                const film = filmPreferiti[index]
                                return (
                                    <div key={index} className="flex-1 bg-[#0b0411]/40 border border-gray-900 border-dashed rounded-xl flex flex-col items-center justify-center relative overflow-hidden group h-[140px]">
                                        {film ? (
                                            <>
                                                {film.poster ? (
                                                    <img src={film.poster} alt={film.titolo} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-[10px] text-center px-2 font-bold text-gray-400">{film.titolo}</span>
                                                )}
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleSelezionaFilm(film)}
                                                    className="absolute inset-0 bg-red-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-black text-xs"
                                                >
                                                    RIMUOVI
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-gray-700 text-xl font-bold">+</span>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>

                <button 
                    type="button"
                    onClick={onComplete}
                    className="w-full py-4 bg-cyan-500 text-[#06000c] font-black rounded-xl text-xs tracking-widest uppercase flex items-center justify-center transition-all hover:bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                >
                     ENTRA IN FLICKER 
                </button>
            </div>

        </div>
    )
}