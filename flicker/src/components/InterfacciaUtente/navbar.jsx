import { Clapperboard, Tv, Heart, BookMarked, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; 

export function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); 

    
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 w-full bg-[#0d0d1f] border-t border-[#2a2a4a] py-2 z-50">
            <ul className="flex justify-around items-center list-none m-0 p-0">
                
                {/* 1. PULSANTE FILM  */}
                <li 
                    onClick={() => navigate("/film")} 
                    className="flex flex-col items-center cursor-pointer gap-1 group"
                >
                    <Clapperboard size={24} color={isActive("/film") ? "#00ffff" : "gray"} />
                    <span className={`text-xs font-medium ${isActive("/film") ? "text-[#00ffff]" : "text-gray-500"} group-hover:text-cyan-400 transition-colors`}>
                        FILM
                    </span>
                </li>

                {/* 2. PULSANTE SERIE TV */}
                <li 
                    onClick={() => navigate("/serie-tv")} 
                    className="flex flex-col items-center cursor-pointer gap-1 group"
                >
                    <Tv size={24} color={isActive("/serie-tv") ? "#00ffff" : "gray"} />
                    <span className={`text-xs font-medium ${isActive("/serie-tv") ? "text-[#00ffff]" : "text-gray-500"} group-hover:text-cyan-400 transition-colors`}>
                        SERIE TV
                    </span>
                </li>

                {/* 3. PULSANTE MATCH  */}
                <li 
                    onClick={() => navigate("/match")} 
                    className="flex flex-col items-center cursor-pointer gap-1 group"
                >
                    <div className={`bg-[#3a0060] rounded-xl p-2 transition-all active:scale-95 group-hover:scale-110 ${isActive("/match") ? "shadow-[0_0_15px_rgba(204,68,255,0.5)]" : ""}`}>
                        <Heart 
                            size={24} 
                            color="#cc44ff" 
                            fill={isActive("/match") ? "#cc44ff" : "none"} 
                            className="group-hover:animate-pulse transition-transform" 
                        />
                    </div>
                    <span className={`text-xs font-bold ${isActive("/match") ? "text-[#cc44ff]" : "text-purple-400/70"} group-hover:text-[#cc44ff] transition-colors`}>
                        MATCH
                    </span>
                </li>

                {/* 4. PULSANTE LISTA */}
                <li 
                    onClick={() => navigate("/la-mia-lista")} 
                    className="flex flex-col items-center cursor-pointer gap-1 group"
                >
                    <BookMarked size={24} color={isActive("/la-mia-lista") ? "#00ffff" : "gray"} />
                    <span className={`text-xs font-medium ${isActive("/la-mia-lista") ? "text-[#00ffff]" : "text-gray-500"} group-hover:text-cyan-400 transition-colors`}>
                        LISTA
                    </span>
                </li>

                {/* 5. PULSANTE ACCOUNT */}
                <li 
                    onClick={() => navigate("/account")} 
                    className="flex flex-col items-center cursor-pointer gap-1 group"
                >
                    <User size={24} color={isActive("/account") ? "#00ffff" : "gray"} />
                    <span className={`text-xs font-medium ${isActive("/account") ? "text-[#00ffff]" : "text-gray-500"} group-hover:text-cyan-400 transition-colors`}>
                        ACCOUNT
                    </span>
                </li>

            </ul>
        </nav>
    );
}