import { useState } from "react";

export default function Card({ title, image, vote, year, overview, type }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const gestisciSalvataggio = (lista) => {
        try {
            const listaEsistente = JSON.parse(localStorage.getItem(lista)) || [];
            
            let tipoContenuto = type;
            if (!tipoContenuto) {
                tipoContenuto = title ? "film" : "serie";
            }

            const nuovoContenuto = {
                title,
                image,
                vote,
                year,
                overview,
                type: tipoContenuto
            };

            const giaPresente = listaEsistente.some((item) => item.title === title);

            if (!giaPresente) {
                listaEsistente.push(nuovoContenuto);
                localStorage.setItem(lista, JSON.stringify(listaEsistente));
                alert(`"${title}" aggiunto a ${lista === "daVedere" ? "Da Vedere" : "Già Visti"}!`);
            } else {
                alert(`"${title}" è già presente in questa lista.`);
            }
        } catch (error) {
            console.error("Errore durante il salvataggio:", error);
        }
    };

   return (
    <>
        {/* CARD ESTERNA */}
        <div 
            className="w-full cursor-pointer transform hover:scale-105 transition-transform"
            onClick={() => setIsModalOpen(true)}
        >
            <img
                src={image}
                alt={title}
                className="w-full rounded-lg object-cover aspect-[2/3] shadow-md border border-gray-800"
            />
            <div className="text-xs font-semibold text-white mt-2 line-clamp-2">
                {title}
            </div>
        </div>

        {/* CONTENITORE MODALE */}
        {isModalOpen && (
            /* 🌟 MODIFICA 1: Cambiato z-50 in z-[60] così la modale passa SOPRA alla Navbar */
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                
                {/* 🌟 MODIFICA 2: Aggiunto pb-20 (padding-bottom) per dare spazio ai bottoni su mobile ed evitare che tocchino il bordo */}
                <div className="bg-[#12091c] border border-gray-800 p-6 pb-20 sm:pb-6 rounded-2xl max-w-md w-full relative text-white max-h-[85vh] overflow-y-auto flex flex-col justify-between shadow-2xl">
                    
                    {/* Pulsante di Chiusura */}
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold bg-[#06000c]/50 p-2 rounded-full z-10 w-8 h-8 flex items-center justify-center transition-colors"
                    >
                        ✕
                    </button>

                    {/* Dettagli del contenuto */}
                    <div>
                        <img 
                            src={image} 
                            alt={title} 
                            className="w-full h-48 object-cover rounded-xl mb-4 shadow-inner" 
                        />
                        <h2 className="text-lg font-black text-cyan-400 mb-1 pr-6">{title}</h2>
                        <p className="text-xs text-gray-400 mb-3">{year} • Voto: {vote?.toFixed(1)}</p>
                        
                        <p className="text-xs text-gray-300 leading-relaxed mb-6 max-h-24 overflow-y-auto pr-1 scrollbar-thin">
                            {overview || "Nessuna trama disponibile."}
                        </p>
                    </div>

                    {/* I PULSANTI DI SALVATAGGIO */}
                    <div className="grid grid-cols-2 gap-3 mt-auto pt-2 border-t border-gray-800/60">
                        <button
                            onClick={() => gestisciSalvataggio("daVedere")}
                            className="bg-cyan-500 hover:bg-cyan-400 text-[#06000c] text-xs font-bold py-3 px-4 rounded-xl transition-all active:scale-95 uppercase tracking-wider text-center"
                        >
                            🍿 Da Vedere
                        </button>
                        <button
                            onClick={() => gestisciSalvataggio("giaVisti")}
                            className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all active:scale-95 uppercase tracking-wider text-center"
                        >
                            ✅ Già Visto
                        </button>
                    </div>

                </div>
            </div>
        )}
    </>
);
}