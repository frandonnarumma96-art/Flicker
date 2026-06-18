import { useState, useEffect } from "react";
import Card from "../components/InterfacciaUtente/card";
import { Carosello } from "./Carosello";
import {
    getPopularTV,
    getImageUrl,
    getTVGenres,
    searchTV,
    getPopularMovies,
    getGenres,
    searchMovies
} from "../api/tmdb";
import { Ricerca } from "../servizi/Ricerca";

export function FilmSerie({ tipo }) {

    const [video, setVideo] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const isFilm = tipo === "film";

    useEffect(() => {
        setVideo([]);
        setGenres([]);
        setIsSearching(false);

        async function caricaDati() {
            const risultati = isFilm ? await getPopularMovies() : await getPopularTV();
            setVideo(risultati);

            const generi = isFilm ? await getGenres() : await getTVGenres();
            setGenres(generi);
        }
        caricaDati();
    }, [tipo]);

    const getTitle = (item) => isFilm ? item.title || item.original_title : item.name || item.original_name;
    const getYear = (item) => isFilm ? item.release_date?.slice(0, 4) : item.first_air_date?.slice(0, 4);

    async function handleSearch(value) {
        if (!value) {
            const risultati = isFilm ? await getPopularMovies() : await getPopularTV();
            setVideo(risultati);
            setIsSearching(false);
        } else {
            const risultati = isFilm ? await searchMovies(value) : await searchTV(value);
            setVideo(risultati);
            setIsSearching(true);
        }
    }

    return (
        <div className="bg-[#06000c] min-h-screen p-4 pb-24">
            <Ricerca onSearch={handleSearch} />

            {isSearching ? (
           
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-6 justify-items-center">
                    {video.map((v) => (
                        <Card
                            key={v.id}
                            title={getTitle(v)}
                            image={getImageUrl(v.poster_path)}
                            vote={v.vote_average}
                            year={getYear(v)}
                            type={tipo}
                            overview={v.overview} 
                        />
                    ))}
                </div>
            ) : (
                genres.map((genere) => {
                   
                    const videoDelGenere = video.filter((v) =>
                        v.genre_ids?.includes(genere.id)
                    );

                    if (videoDelGenere.length === 0) return null;

                    return (
                        <Carosello
                            key={genere.id}
                            titolo={genere.name}
                            items={videoDelGenere} 
                            getTitle={getTitle}
                            getYear={getYear}
                            type={tipo}
                        />
                    );
                })
            )}
        </div>
    );
}