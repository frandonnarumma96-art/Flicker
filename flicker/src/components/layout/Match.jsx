import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Plus, Users, Zap, X, Check } from "lucide-react";
import { getPopularMovies, getImageUrl } from "../../api/tmdb";
import { Navbar } from "../InterfacciaUtente/Navbar";

export function Match() {
    const [sessionCode, setSessionCode] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    const [inputCode, setInputCode] = useState("");
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [matchedMovie, setMatchedMovie] = useState(null);
    const [loading, setLoading] = useState(false);

  
    useEffect(() => {
        async function loadSessionMovies() {
            if (isJoined) {
                setLoading(true);
                try {
                    const popular = await getPopularMovies();
                    if (popular && popular.length > 0) {
                        setMovies(popular);
                    } else {
                        console.error("Nessun film restituito dall'API");
                    }
                } catch (error) {
                    console.error("Errore nel caricamento dei film:", error);
                } finally {
                    setLoading(false);
                }
            }
        }
        loadSessionMovies();
    }, [isJoined]);

    const handleCreateSession = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        setSessionCode(code);
        setIsJoined(true);
    };

    const handleJoinSession = () => {
        if (inputCode.trim().length === 6) {
            setSessionCode(inputCode.trim());
            setIsJoined(true);
        } else {
            alert("Inserisci un codice valido di 6 caratteri!");
        }
    };

    const handleVote = (direction) => {
        if (movies.length === 0) return;

        if (direction === "like") {
            
            if (currentIndex === 2) {
                setMatchedMovie(movies[currentIndex]);
                return;
            }
        }
        
        if (currentIndex < movies.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            alert("Hai finito i film! 🍿");
        }
    };


    if (matchedMovie) {
        return (
            <div className="min-h-screen bg-[#06000c] flex flex-col items-center justify-center p-6 text-center text-white">
                <Heart size={80} className="text-[#cc44ff] animate-bounce mb-4" fill="#cc44ff" />
                <h1 className="text-4xl font-black text-cyan-400 mb-2">IT'S A MATCH!</h1>
                <p className="text-gray-400 mb-8">Tutti i tuoi amici vogliono guardare:</p>
                
                <div className="w-64 h-[380px] rounded-3xl overflow-hidden border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)] mx-auto">
                    <img src={getImageUrl(matchedMovie.poster_path)} className="w-full h-full object-cover" alt="Match Poster" />
                </div>
                <h2 className="text-2xl font-bold mt-4">{matchedMovie.title}</h2>
                
                <button onClick={() => window.location.reload()} className="mt-10 px-8 py-3 bg-[#cc44ff] rounded-full font-bold text-sm text-white">
                    NUOVA PARTITA
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#06000c] text-white pb-24 font-sans flex flex-col">
            {/* Header */}
            <header className="p-6 flex justify-between items-center h-16 shrink-0">
                <h1 className="text-xl font-black tracking-widest text-cyan-400">MATCH</h1>
                <div className="bg-gray-900/50 p-2 rounded-lg border border-gray-800">
                    <Users size={20} className="text-gray-400" />
                </div>
            </header>

            {/* Contenuto Principale */}
            <main className="flex-1 flex flex-col items-center justify-center px-6">
                {!isJoined ? (
                   
                    <div className="w-full max-w-sm space-y-8">
                        <div className="text-center space-y-2">
                            <div className="w-20 h-20 bg-purple-600/10 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart size={40} className="text-[#cc44ff]" fill="#cc44ff" />
                            </div>
                            <h2 className="text-2xl font-bold">Guarda Insieme</h2>
                            <p className="text-gray-500 text-sm">Fai swipe con i tuoi amici e scoprite cosa vedere stasera.</p>
                        </div>

                        <div className="space-y-4">
                            <button 
                                onClick={handleCreateSession}
                                className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-purple-900/40 to-purple-800/20 border border-purple-500/40 rounded-3xl active:scale-95 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-500 rounded-2xl">
                                        <Plus size={24} className="text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm uppercase tracking-widest">Nuova Sessione</p>
                                        <p className="text-[10px] text-purple-300">Crea e condividi il codice</p>
                                    </div>
                                </div>
                            </button>

                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="INSERISCI CODICE" 
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                                    maxLength={6}
                                    className="w-full p-5 bg-gray-900/40 border border-gray-800 rounded-3xl text-center font-black tracking-[0.5em] focus:outline-none focus:border-cyan-500/50"
                                />
                                <button 
                                    onClick={handleJoinSession}
                                    className="absolute right-3 top-3 bottom-3 px-4 bg-cyan-500 rounded-2xl text-black font-black text-xs hover:bg-cyan-400 transition-colors"
                                >
                                    JOIN
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    
                    <div className="flex flex-col items-center justify-start w-full max-w-xs h-[480px]">
                        {/* Codice Stanza */}
                        <div className="text-center h-12 flex flex-col justify-center mb-2">
                            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase m-0">Codice Stanza</p>
                            <p className="text-cyan-400 font-black tracking-[0.3em] text-lg m-0">{sessionCode}</p>
                        </div>

                        {loading ? (
                            <div className="flex-1 flex items-center justify-center text-cyan-400 font-bold text-sm tracking-wider animate-pulse">
                                CARICAMENTO FILM...
                            </div>
                        ) : movies.length > 0 && movies[currentIndex] ? (
                            <div className="w-full flex-1 flex flex-col justify-between">
                                {/* Card Film */}
                                <div className="relative w-full h-[360px] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl bg-gray-900">
                                    <img 
                                        src={getImageUrl(movies[currentIndex]?.poster_path)} 
                                        className="w-full h-full object-cover" 
                                        alt="Poster"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                    <div className="absolute bottom-4 left-5 right-5">
                                        <h3 className="text-lg font-black truncate m-0 text-white">{movies[currentIndex]?.title}</h3>
                                        <p className="text-cyan-400 font-bold text-xs m-0 mt-0.5">{movies[currentIndex]?.release_date?.split("-")[0]}</p>
                                    </div>
                                </div>

                                {/* Pulsanti */}
                                <div className="w-full h-16 flex justify-center items-center gap-8 mt-2">
                                    <button 
                                        onClick={() => handleVote("dislike")}
                                        className="w-14 h-14 rounded-full bg-gray-900 border border-red-500/50 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)] active:scale-90 transition-all cursor-pointer"
                                    >
                                        <X size={28} />
                                    </button>
                                    <button 
                                        onClick={() => handleVote("like")}
                                        className="w-14 h-14 rounded-full bg-gray-900 border border-emerald-500/50 flex items-center justify-center text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] active:scale-90 transition-all cursor-pointer"
                                    >
                                        <Check size={28} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-red-400 text-sm">
                                Errore nel caricamento del catalogo.
                            </div>
                        )}
                    </div>
                )}
            </main>

            <Navbar />
        </div>
    );
}