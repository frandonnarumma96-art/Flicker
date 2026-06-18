import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const rotteNascoste = ["/", "/login", "/onboarding/step1", "/onboarding/step2", "/onboarding/step3", "/onboarding/step4"];

    if (rotteNascoste.includes(location.pathname)) {
        return null; 
    }

    return (
        
        <header className="w-full bg-[#0d0d1f] border-b border-[#2a2a4a] py-4 px-4 flex justify-center items-center z-50 shadow-md">
            <h1 
                onClick={() => navigate("/home")} 
                className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 cursor-pointer active:scale-95 transition-transform uppercase select-none"
                style={{ textShadow: "0 0 15px rgba(6, 182, 212, 0.4)" }}
            >
                Flicker
            </h1>
        </header>
    );
}