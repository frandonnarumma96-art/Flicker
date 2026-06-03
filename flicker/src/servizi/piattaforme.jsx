import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useOnboarding } from "../context/stepContexst"; 

export function StepPiattaforme() {
    const navigate = useNavigate();
    
   
    const { onboardingData, setOnboardingData } = useOnboarding();

    const piattaformeDisponibili = [
        { id: 'netflix', nome: 'Netflix', color: 'text-red-600', borderColor: 'hover:border-red-600/50' },
        { id: 'prime', nome: 'Prime Video', color: 'text-blue-400', borderColor: 'hover:border-blue-400/50' },
        { id: 'disney', nome: 'Disney+', color: 'text-indigo-400', borderColor: 'hover:border-indigo-400/50' },
        { id: 'apple', nome: 'Apple TV+', color: 'text-white', borderColor: 'hover:border-white/50' },
        { id: 'paramount', nome: 'Paramount+', color: 'text-blue-600', borderColor: 'hover:border-blue-600/50' },
        { id: 'now', nome: 'NOW TV', color: 'text-green-400', borderColor: 'hover:border-green-400/50' }
    ];

  
    const [piattaformeSelezionate, setPiattaformeSelezionate] = useState(() => {
        return onboardingData?.platforms || [];
    });

 
    function handleTogglePiattaforma(nomePiattaforma) {
        setPiattaformeSelezionate((prevSelezionate) => {
            if (prevSelezionate.includes(nomePiattaforma)) {
                return prevSelezionate.filter(p => p !== nomePiattaforma); // Rimuove
            } else {
                return [...prevSelezionate, nomePiattaforma]; 
            }
        });
    }

    function handleAvanti() {
      
        setOnboardingData(prev => ({ ...prev, platforms: piattaformeSelezionate }));
        
        navigate("/onboarding/step3");
    }

    function handleSalta() {
        
        navigate("/onboarding/step3");
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#06000c] text-white p-6 font-sans select-none">
            
            
            <div className="w-full max-w-sm mt-8 mb-6">
                <div className="flex gap-2 mb-3">
                    <div className="flex-1 h-1 bg-cyan-500/40 rounded-full"></div>
                 
                    <div className="flex-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
                    <div className="flex-1 h-1 bg-gray-900 rounded-full"></div>
                    <div className="flex-1 h-1 bg-gray-900 rounded-full"></div>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                    <span className="text-gray-500">STEP 2 / 4 • SERVIZI</span>
                    <button 
                        type="button" 
                        onClick={handleSalta} 
                        className="text-purple-400/80 hover:text-cyan-400 transition-colors tracking-widest font-black"
                    >
                        SALTA ✕
                    </button>
                </div>
            </div>

            <div className="w-full max-w-sm text-left mb-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-wide leading-tight">
                    Seleziona i tuoi <br />
                    <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                        servizi streaming
                    </span>
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                    Mostreremo a te e ai tuoi amici i film disponibili sulle tue piattaforme.
                </p>
            </div>

            <div className="w-full max-w-sm flex-1 flex flex-col justify-between pb-6">
                <div className="grid grid-cols-2 gap-4">
                    {piattaformeDisponibili.map((piat) => {
                        const isSelected = piattaformeSelezionate.includes(piat.nome);
                        
                        return (
                            <button
                                key={piat.id}
                                type="button"
                                onClick={() => handleTogglePiattaforma(piat.nome)}
                                className={`flex flex-col items-center justify-center p-5 rounded-2xl bg-[#0b0411]/60 border transition-all h-28 ${
                                    isSelected 
                                    ? 'border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.2)] scale-[1.02]' 
                                    : `border-gray-800 ${piat.borderColor}`
                                }`}
                            >
                                <span className={`text-lg font-black tracking-wider ${piat.color}`}>
                                    {piat.nome.toUpperCase()}
                                </span>
                                
                                <div className={`w-2 h-2 rounded-full mt-4 transition-all ${
                                    isSelected ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]' : 'bg-gray-800'
                                }`} />
                            </button>
                        );
                    })}
                </div>

       
                <button 
                    type="button"
                    onClick={handleAvanti}
                    disabled={piattaformeSelezionate.length === 0}
                    className="w-full py-4 mt-8 bg-[#0b0411]/60 border border-gray-800 hover:border-cyan-500/50 disabled:opacity-30 disabled:hover:border-gray-800 text-gray-400 hover:text-cyan-400 font-bold rounded-xl text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
                >
                    AVANTI 
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6H13M13 6L8 1M13 6L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

        </div>
    );
}