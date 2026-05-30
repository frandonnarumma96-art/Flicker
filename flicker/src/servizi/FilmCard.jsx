import { useState, useEffect } from "react";
import Card from "../components/InterfacciaUtente/card";
import {
    getPopularMovies,
    getGenres,
    getImageUrl,
    searchMovies
} from "../api/tmdb";
import { Ricerca } from "../servizi/Ricerca"

export function FilmCard() {
    const [film, setFilm] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        async function caricaDati() {
            const filmRisultati = await getPopularMovies();
            setFilm(filmRisultati);

            const generiRisultati = await getGenres();
            setGenres(generiRisultati);
        }
        caricaDati();
    }, []);

    async function handleSearch(value) {
        if (!value) {
            const filmPopolari = await getPopularMovies();
            setFilm(filmPopolari);
            setIsSearching(false);
            return;
        }

        const risultati = await searchMovies(value);
        setFilm(risultati);
        setIsSearching(true);
    }

    return (
        <div className="bg-[#06000c] min-h-screen p-4">
            <Ricerca onSearch={handleSearch} />
            {isSearching ? (
                <div className="flex gap-3 overflow-x-auto mt-4">
                    {film.map((f) => (
                        <Card
                            key={f.id}
                            title={f.title || f.original_title}
                            image={getImageUrl(f.poster_path)}
                            vote={f.vote_average}
                            year={f.release_date?.slice(0, 4)}
                        />
                    ))}
                </div>
            ) : (
                genres.map((genere) => {
                    const filmDelGenere = film.filter((f) =>
                        f.genre_ids?.includes(genere.id)
                    );

                    return (
                        <div key={genere.id} className="mb-6">
                            <h2 className="text-cyan-400 uppercase font-bold tracking-wider mb-3">
                                {genere.name}
                            </h2>

                            <div className="flex gap-3 overflow-x-auto">
                                {filmDelGenere.map((f) => (
                                    <Card
                                        key={f.id}
                                        title={f.title || f.original_title}
                                        image={getImageUrl(f.poster_path)}
                                        vote={f.vote_average}
                                        year={f.release_date?.slice(0, 4)}
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