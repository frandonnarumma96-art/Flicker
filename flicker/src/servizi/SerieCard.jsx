import { useState, useEffect } from "react";
import Card from "../components/InterfacciaUtente/card";
import {
    getPopularTV,
    getImageUrl,
    getTVGenres,
    searchTV
} from "../api/tmdb";
import { Ricerca } from "../servizi/Ricerca";

export function SerieCard() {
    const [serie, setSerie] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        async function caricaDati() {
            const serieRisultati = await getPopularTV();
            setSerie(serieRisultati);

            const generiRisultati = await getTVGenres();
            setGenres(generiRisultati);
        }
        caricaDati();
    }, []);

    async function handleSearchTV(value) {
        if (!value) {
            const seriePopolari = await getPopularTV();
            setSerie(seriePopolari);
            setIsSearching(false);
            return;
        }

        const risultati = await searchTV(value);
        setSerie(risultati);
        setIsSearching(true);
    }

    return (
        <div className="bg-[#06000c] min-h-screen p-4">

            {/* 🔎 SEARCH */}
            <Ricerca onSearch={handleSearchTV} />

            {/* 🎬 CONTENUTO */}
            {isSearching ? (
                <div className="flex gap-3 overflow-x-auto mt-4">
                    {serie.map((s) => (
                        <Card
                            key={s.id}
                            title={s.name}
                            image={getImageUrl(s.poster_path)}
                            vote={s.vote_average}
                            year={s.first_air_date?.slice(0, 4)}
                        />
                    ))}
                </div>
            ) : (
                genres.map((genere) => {
                    const serieDelGenere = serie.filter((s) =>
                        s.genre_ids?.includes(genere.id)
                    );

                    if (serieDelGenere.length === 0) return null;

                    return (
                        <div key={genere.id} className="mb-6">
                            <h2 className="text-cyan-400 uppercase font-bold tracking-wider mb-3">
                                {genere.name}
                            </h2>

                            <div className="flex gap-3 overflow-x-auto">
                                {serieDelGenere.map((s) => (
                                    <Card
                                        key={s.id}
                                        title={s.name}
                                        image={getImageUrl(s.poster_path)}
                                        vote={s.vote_average}
                                        year={s.first_air_date?.slice(0, 4)}
                                    />
                                ))}
                                
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}