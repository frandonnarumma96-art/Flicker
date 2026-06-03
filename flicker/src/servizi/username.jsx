import { useState, useEffect } from "react"; // 🌟 Assicurati di importare useEffect
import { useNavigate } from "react-router-dom"; 
import { useOnboarding } from "../context/stepContexst"; 

export function StepProfilo() {
    const navigate = useNavigate();
    const { onboardingData, setOnboardingData } = useOnboarding();

    
    const [usernameLocale, setUsernameLocale] = useState(onboardingData?.username || "");
    const [avatarSelezionato, setAvatarSelezionato] = useState(onboardingData?.avatar || "🍿");

    const avatarDisponibili = ["🍿", "🎬", "🎥", "🎭", "👾", "🚀"];

    
    useEffect(() => {
        const nomeRegistrato = localStorage.getItem("tempRegisterNome") || "";
        const cognomeRegistrato = localStorage.getItem("tempRegisterCognome") || "";
        
     
        if (nomeRegistrato || cognomeRegistrato) {
            const nomeCompleto = `${nomeRegistrato} ${cognomeRegistrato}`.trim();
            setUsernameLocale(nomeCompleto);
            
            
            setOnboardingData(prev => ({
                ...prev,
                username: nomeCompleto
            }));
        }
    }, []); 

    function handleAvanti() {
        setOnboardingData(prev => ({ 
            ...prev, 
            username: usernameLocale, 
            avatar: avatarSelezionato 
        }));
   
        localStorage.removeItem("tempRegisterNome");
        localStorage.removeItem("tempRegisterCognome");

        navigate("/onboarding/step2");
    }

    function handleSalta() {
        navigate("/onboarding/step2");
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#06000c] text-white p-6 font-sans select-none">
            
            {/* Barra di Avanzamento */}
            <div className="w-full max-w-sm mt-8 mb-6">
                <div className="flex gap-2 mb-3">
                    <div className="flex-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
                    <div className="flex-1 h-1 bg-gray-900 rounded-full"></div>
                    <div className="flex-1 h-1 bg-gray-900 rounded-full"></div>
                    <div className="flex-1 h-1 bg-gray-900 rounded-full"></div>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                    <span className="text-gray-500">STEP 1 / 4 • PROFILO</span>
                    <button 
                        type="button" 
                        onClick={handleSalta} 
                        className="text-purple-400/80 hover:text-cyan-400 transition-colors tracking-widest font-black"
                    >
                        SALTA ✕
                    </button>
                </div>
            </div>

            {/* Intestazione */}
            <div className="w-full max-w-sm text-left mb-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-wide leading-tight">
                    Personalizza il <br />
                    <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                        tuo profilo
                    </span>
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                    Abbiamo inserito il tuo nome reale. Modificalo pure se preferisci usare un nickname!
                </p>
            </div>

            {/* Form Box */}
            <div className="w-full max-w-sm flex-1 flex flex-col justify-between pb-6">
                <div className="space-y-6">
                    
                    {/* Selezione Avatar */}
                    <div className="space-y-3 flex flex-col items-center">
                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase self-start">
                            FOTO PROFILO / AVATAR
                        </label>
                        <div className="w-24 h-24 rounded-full bg-[#0b0411]/60 border border-gray-800 flex items-center justify-center text-4xl shadow-[0_0_15px_rgba(11,4,17,0.8)]">
                            {avatarSelezionato || "👤"} 
                        </div>
                        <div className="flex gap-3 mt-2">
                            {avatarDisponibili.map((emoji) => ( 
                                <button 
                                    key={emoji}
                                    type="button"
                                    onClick={() => setAvatarSelezionato(emoji)}
                                    className={`w-10 h-10 rounded-xl bg-[#0b0411]/40 border ${avatarSelezionato === emoji ? 'border-cyan-500 text-base scale-110' : 'border-gray-800'} flex items-center justify-center transition-all`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input Username */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">USERNAME</label>
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-sm font-bold text-gray-600">@</span>
                            <input 
                                type="text" 
                                value={usernameLocale} 
                                onChange={(e) => setUsernameLocale(e.target.value)} 
                                placeholder="tuo_username"
                                className="w-full pl-9 pr-4 py-3.5 bg-[#0b0411]/60 border border-gray-800 rounded-xl text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                            />
                        </div>
                    </div>

                </div>

                {/* Pulsante Avanti */}
                <button 
                    type="button"
                    onClick={handleAvanti} 
                    disabled={!usernameLocale.trim()} 
                    className="w-full py-4 bg-[#0b0411]/60 border border-gray-800 hover:border-cyan-500/50 disabled:opacity-30 disabled:hover:border-gray-800 text-gray-400 hover:text-cyan-400 font-bold rounded-xl text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
                >
                    AVANTI 
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/xl">
                        <path d="M1 6H13M13 6L8 1M13 6L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

        </div>
    );
}