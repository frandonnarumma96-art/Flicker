import { useState } from "react";


export default function Card({ title, image, vote, year, overview, duration, type }) {
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
                duration,
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
            {/* Il codice del rendering della tua Card della vetrina principale... */}
            <div 
                className="cursor-pointer transform hover:scale-105 transition-transform"
                onClick={() => setIsModalOpen(true)}
            >
                <img src={image} alt={title} className="rounded-lg w-full h-auto object-cover" />
                <h3 className="text-xs font-bold mt-2 truncate max-w-[150px]">{title}</h3>
            </div>

            {/* 🌟 LA MODALE CHE SI APRE AL CLICK */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#12091c] border border-gray-800 p-6 rounded-2xl max-w-md w-full relative text-white">
                        
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold"
                        >
                            ✕
                        </button>

                        <img src={image} alt={title} className="w-full h-48 object-cover rounded-xl mb-4" />
                        <h2 className="text-lg font-black text-cyan-400 mb-1">{title}</h2>
                        <p className="text-xs text-gray-400 mb-3">{year} • Voto: {vote}</p>
                        <p className="text-xs text-gray-300 leading-relaxed mb-6 max-h-32 overflow-y-auto">{overview || "Nessuna trama disponibile."}</p>

                        {/* I PULSANTI DI SALVATAGGIO */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => gestisciSalvataggio("daVedere")}
                                className="bg-cyan-500 hover:bg-cyan-400 text-[#06000c] text-xs font-bold py-2.5 px-4 rounded-xl transition-colors uppercase tracking-wider"
                            >
                                🍿 Da Vedere
                            </button>
                            <button
                                onClick={() => gestisciSalvataggio("giaVisti")}
                                className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors uppercase tracking-wider"
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