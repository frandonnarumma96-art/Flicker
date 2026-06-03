import { Clapperboard, Tv, Heart, BookMarked, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; 

export function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); 

    
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 w-full bg-[#0d0d1f] border-t border-[#2a2a4a] py-2 z-50">
            <ul className="flex justify-around items-center list-none m-0 p-0">
                
                {/* 1. PULSANTE FILM (HOME) */}
                <li 
                    onClick={() => navigate("/film")} 
                    className="flex flex-col items-center cursor-pointer gap-1 group"
                >
                    <Clapperboard size={24} color={isActive("/home") ? "#00ffff" : "gray"} />
                    <span className={`text-xs ${isActive("/home") ? "text-[#00ffff]" : "text-gray-500"}`}>
                        FILM
                    </span>
                </li>

                {/* 2. PULSANTE SERIE TV */}
                <li 
                    onClick={() => navigate("/serie-tv")} 
                    className="flex flex-col items-center cursor-pointer gap-1 group"
                >
                    <Tv size={24} color={isActive("/serie-tv") ? "#00ffff" : "gray"} />
                    <span className={`text-xs ${isActive("/serie-tv") ? "text-[#00ffff]" : "text-gray-500"}`}>
                        SERIE TV
                    </span>
                </li>

                {/* 3. PULSANTE MATCH (IL CUORE) */}
                <li 
                    onClick={() => navigate("/match")} 
                    className="flex flex-col items-center cursor-pointer gap-1"
                >
                    <div className="bg-[#3a0060] rounded-xl p-2 transition-transform active:scale-95">
                        <Heart size={24} color="#cc44ff" />
                    </div>
                    <span className="text-[#cc44ff] text-xs">MATCH</span>
                </li>

                {/* 4. PULSANTE LISTA */}
                <li 
                    onClick={() => navigate("/la-mia-lista")} 
                    className="flex flex-col items-center cursor-pointer gap-1 group"
                >
                    <BookMarked size={24} color={isActive("/la-mia-lista") ? "#00ffff" : "gray"} />
                    <span className={`text-xs ${isActive("/la-mia-lista") ? "text-[#00ffff]" : "text-gray-500"}`}>
                        LISTA
                    </span>
                </li>

                {/* 5. PULSANTE ACCOUNT */}
                <li 
                    onClick={() => navigate("/account")} 
                    className="flex flex-col items-center cursor-pointer gap-1 group"
                >
                    <User size={24} color={isActive("/account") ? "#00ffff" : "gray"} />
                    <span className={`text-xs ${isActive("/account") ? "text-[#00ffff]" : "text-gray-500"}`}>
                        ACCOUNT
                    </span>
                </li>

            </ul>
        </nav>
    );
}