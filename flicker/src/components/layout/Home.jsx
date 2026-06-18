import { useState, useEffect } from "react";
import { getPopularMovies, getPopularTV, getImageUrl } from "../../api/tmdb";
import { useNavigate } from "react-router-dom"; 

export function Home() {
    const navigate = useNavigate(); 
    const [nuoviFilm, setNuoviFilm] = useState([]);
    const [nuoveSerie, setNuoveSerie] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function caricaDatiHome() {
            try {
                setLoading(true);
                const [movies, tvShows] = await Promise.all([
                    getPopularMovies(),
                    getPopularTV()
                ]);
                
                setNuoviFilm(movies || []);
                setNuoveSerie(tvShows || []);
            } catch (error) {
                console.error("Errore nel caricamento della Home:", error);
            } finally {
                setLoading(false);
            }
        }

        caricaDatiHome();
    }, []);

    return (
      
        <div className="text-white font-sans select-none">
            
          
            {loading ? (
                <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
                    <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Caricamento Feed...</p>
                </div>
            ) : (
                <div className="space-y-8 mt-4">
                    
                    {/* SEZIONE FILM */}
                    <section className="space-y-3">
                        <h2 className="text-sm font-black tracking-widest uppercase text-gray-400 px-6">
                            I Nuovi Film più Popolari
                        </h2>
                       
                        <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-none snap-x">
                            {nuoviFilm.map((film) => (
                                <div key={film.id} className="min-w-[130px] w-[130px] snap-start group cursor-pointer">
                                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-gray-900 group-hover:border-cyan-500/50 transition-all duration-300 bg-[#0b0411]">
                                        {film.poster_path ? (
                                            <img 
                                                src={getImageUrl(film.poster_path)} 
                                                alt={film.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">🎬</div>
                                        )}
                                    </div>
                                    <h3 className="text-[11px] font-bold tracking-wide mt-2 text-gray-300 truncate group-hover:text-cyan-400 transition-colors">
                                        {film.title}
                                    </h3>
                                    <p className="text-[9px] text-gray-600 font-medium">
                                        {film.release_date ? film.release_date.split("-")[0] : "N/D"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SEZIONE SERIE TV */}
                    <section className="space-y-3">
                        <h2 className="text-sm font-black tracking-widest uppercase text-gray-400 px-6">
                            Le Serie TV del Momento
                        </h2>
                        <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-none snap-x">
                            {nuoveSerie.map((serie) => (
                                <div key={serie.id} className="min-w-[130px] w-[130px] snap-start group cursor-pointer">
                                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-gray-900 group-hover:border-purple-500/50 transition-all duration-300 bg-[#0b0411]">
                                        {serie.poster_path ? (
                                            <img 
                                                src={getImageUrl(serie.poster_path)} 
                                                alt={serie.name} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">📺</div>
                                        )}
                                    </div>
                                    <h3 className="text-[11px] font-bold tracking-wide mt-2 text-gray-300 truncate group-hover:text-purple-400 transition-colors">
                                        {serie.name}
                                    </h3>
                                    <p className="text-[9px] text-gray-600 font-medium">
                                        {serie.first_air_date ? serie.first_air_date.split("-")[0] : "N/D"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            )}

        </div>
    );
}