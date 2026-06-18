import Card from "../components/InterfacciaUtente/card";
import { getImageUrl } from "../api/tmdb";

export function Carosello({ titolo, items, getTitle, getYear, type }) {
    return (
        <div className="mb-8">
     
            <h2 className="text-xl font-bold text-white mb-4 px-2 uppercase tracking-wider">
                {titolo}
            </h2>

          
            <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide snap-x snap-mandatory">
                {items.map((item) => (
                    
                    <div 
                        key={item.id} 
                        className="w-[45%] sm:w-[30%] md:w-[23%] lg:w-[18%] flex-shrink-0 snap-start"
                    >
                        <Card
                            title={getTitle(item)}
                            image={getImageUrl(item.poster_path)}
                            vote={item.vote_average}
                            year={getYear(item)}
                            type={type}
                            overview={item.overview}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}