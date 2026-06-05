import Card from "../components/InterfacciaUtente/card";
import { getImageUrl } from "../api/tmdb";

export function Carosello({ titolo, items, getTitle, getYear }) {
    return (
        <div className="mb-6">
            <h2 className="text-cyan-400 uppercase font-bold tracking-wider mb-3">
                {titolo}
            </h2>

            <div className="flex gap-3 overflow-x-auto">
                {items.map((v) => (
                    <Card
                        key={v.id}
                        title={getTitle(v)}
                        image={getImageUrl(v.poster_path)}
                        vote={v.vote_average}
                        year={getYear(v)}
                    />
                ))}
            </div>
        </div>
    );
}