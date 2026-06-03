import { useState, useEffect } from "react";
import Card from "../components/InterfacciaUtente/card";
import { Navbar } from "../components/InterfacciaUtente/Navbar";

export function Lista() {
    
    const [daVedere, setDaVedere] = useState([]);
    const [giaVisti, setGiaVisti] = useState([]);
   
    const [tabAttivo, setTabAttivo] = useState("daVedere");

    const caricaListe = () => {
        const salvatiDaVedere = JSON.parse(localStorage.getItem("daVedere")) || [];
        const salvatiGiaVisti = JSON.parse(localStorage.getItem("giaVisti")) || [];
        setDaVedere(salvatiDaVedere);
        setGiaVisti(salvatiGiaVisti);
    };

    useEffect(() => {
        caricaListe();
    }, []);

    
    const rimuoviDaLista = (title, tipoLista) => {
        const listaAttuale = JSON.parse(localStorage.getItem(tipoLista)) || [];
        const listaAggiornata = listaAttuale.filter((item) => item.title !== title);
        localStorage.setItem(tipoLista, JSON.stringify(listaAggiornata));
        caricaListe(); 
    };

   
    const datiVisualizzati = tabAttivo === "daVedere" ? daVedere : giaVisti;

  
    const filmInLista = datiVisualizzati.filter(item => item.year && !item.first_air_date); 
 

    return (
        <div className="bg-[#06000c] min-h-screen p-4 pb-24 text-gray-200">
            <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-6 text-center">
                La Mia <span className="text-cyan-400">Lista</span>
            </h1>

            {/* Switcher dei Tab Principali (Da Vedere / Già Visti) */}
            <div className="grid grid-cols-2 gap-2 bg-[#0b0411] border border-gray-800 p-1 rounded-xl mb-8 max-w-sm mx-auto">
                <button
                    onClick={() => setTabAttivo("daVedere")}
                    className={`py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                        tabAttivo === "daVedere"
                            ? "bg-cyan-500 text-[#06000c] shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                            : "text-gray-400 hover:text-white"
                    }`}
                >
                    🍿 Da Vedere ({daVedere.length})
                </button>
                <button
                    onClick={() => setTabAttivo("giaVisti")}
                    className={`py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                        tabAttivo === "giaVisti"
                            ? "bg-cyan-500 text-[#06000c] shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                            : "text-gray-400 hover:text-white"
                    }`}
                >
                    ✅ Già Visti ({giaVisti.length})
                </button>
            </div>

            {/* CONTENUTO DELLA LISTA */}
            {datiVisualizzati.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm font-medium">
                    Nessun titolo salvato in questa sezione.
                </div>
            ) : (
                <div className="space-y-10">
                    
                    {/* 🎬 SEZIONE FILM */}
                    <div>
                        <h2 className="text-xs font-black text-cyan-400 uppercase tracking-widest border-b border-gray-800 pb-2 mb-4">
                            🎬 Film da Vedere / Visti
                        </h2>
                        {datiVisualizzati.filter(item => item.type === "film").length === 0 ? (
                            <p className="text-xs text-gray-600 italic pl-2">Nessun film in questa lista.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 justify-items-center sm:grid-cols-3 md:grid-cols-4">
                                {datiVisualizzati.filter(item => item.type === "film").map((item, index) => (
                                    <div key={index} className="relative">
                                        <Card
                                            title={item.title}
                                            image={item.image}
                                            vote={item.vote}
                                            year={item.year}
                                            overview={item.overview}
                                            type={item.type}
                                        />
                                        <button
                                            onClick={() => rimuoviDaLista(item.title, tabAttivo)}
                                            className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-500 text-white w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shadow-md border border-gray-950 transition-colors z-10"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 📺 SEZIONE SERIE TV */}
                    <div>
                        <h2 className="text-xs font-black text-purple-400 uppercase tracking-widest border-b border-gray-800 pb-2 mb-4">
                            📺 Serie TV da Vedere / Viste
                        </h2>
                        {datiVisualizzati.filter(item => item.type === "serie").length === 0 ? (
                            <p className="text-xs text-gray-600 italic pl-2">Nessuna serie TV in questa lista.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 justify-items-center sm:grid-cols-3 md:grid-cols-4">
                                {datiVisualizzati.filter(item => item.type === "serie").map((item, index) => (
                                    <div key={index} className="relative">
                                        <Card
                                            title={item.title}
                                            image={item.image}
                                            vote={item.vote}
                                            year={item.year}
                                            overview={item.overview}
                                            type={item.type}
                                        />
                                        <button
                                            onClick={() => rimuoviDaLista(item.title, tabAttivo)}
                                            className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-500 text-white w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shadow-md border border-gray-950 transition-colors z-10"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            )}

            {/* Barra di navigazione fissa in basso */}
            <Navbar />
        </div>
    );
}