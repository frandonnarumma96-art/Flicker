import { useState } from "react"

export function StepGeneri({ onboardingData, setOnboardingData, onNext, onSkip }) {

    const generiDisponibili = [
        "Azione", "Fantascienza", "Horror", "Thriller", "Commedia", 
        "Drammatico", "Romantico", "Animazione", "Documentario", 
        "Fantasy", "Avventura", "Mistero", "Anime"
    ]

    const generiSelezionati = onboardingData?.generi || []

    function handleToggleGenere(genere) {
        let nuoviGeneri;
        if (generiSelezionati.includes(genere)) {
           
            nuoviGeneri = generiSelezionati.filter(g => g !== genere)
        } else {
            nuoviGeneri = [...generiSelezionati, genere]
        }
        
        
        setOnboardingData(prev => ({ ...prev, generi: nuoviGeneri }))
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#06000c] text-white p-6 font-sans select-none">
            
          
            <div className="w-full max-w-sm mt-8 mb-6">
                <div className="flex gap-2 mb-3">
                    
                    <div className="flex-1 h-1 bg-cyan-500/40 rounded-full"></div>
                    <div className="flex-1 h-1 bg-cyan-500/40 rounded-full"></div>
                    
                    <div className="flex-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
                    
                    <div className="flex-1 h-1 bg-gray-900 rounded-full"></div>
                </div>
                
            
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                    <span className="text-gray-500">STEP 3 / 4 • PREFERENZE</span>
                    <button 
                        type="button" 
                        onClick={onSkip} 
                        className="text-purple-400/80 hover:text-cyan-400 transition-colors tracking-widest font-black"
                    >
                        SALTA ✕
                    </button>
                </div>
            </div>

          
            <div className="w-full max-w-sm text-left mb-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-wide leading-tight">
                    Quali sono i tuoi <br />
                    <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                        generi preferiti?
                    </span>
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                    Personalizzeremo i tuoi feed con le storie che ami di più.
                </p>
            </div>

            <div className="w-full max-w-sm flex-1 flex flex-col justify-between pb-6">
                
               
                <div className="flex flex-wrap gap-3 py-2">
                    {generiDisponibili.map((genere) => {
                        const isSelected = generiSelezionati.includes(genere)
                        
                        return (
                            <button
                                key={genere}
                                type="button"
                                onClick={() => handleToggleGenere(genere)}
                                className={`px-5 py-3 rounded-xl border text-xs font-bold tracking-wide transition-all ${
                                    isSelected 
                                    ? 'bg-cyan-500 text-[#06000c] border-cyan-500 font-black shadow-[0_0_12px_rgba(34,211,238,0.4)] scale-[1.03]' 
                                    : 'bg-[#0b0411]/60 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                                }`}
                            >
                                {genere}
                            </button>
                        )
                    })}
                </div>

                {/* Bottone Avanti */}
                <button 
                    type="button"
                    onClick={onNext}
                    disabled={generiSelezionati.length === 0}
                    className="w-full py-4 mt-8 bg-[#0b0411]/60 border border-gray-800 hover:border-cyan-500/50 disabled:opacity-30 disabled:hover:border-gray-800 text-gray-400 hover:text-cyan-400 font-bold rounded-xl text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
                >
                    AVANTI 
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6H13M13 6L8 1M13 6L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

        </div>
    )
}