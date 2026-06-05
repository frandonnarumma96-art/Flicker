import { Clapperboard, Tv, Heart, BookMarked, User } from "lucide-react";

export function Navbar({ onCambia }) {
    return (
        <nav className="fixed bottom-0 w-full bg-[#0d0d1f] border-t border-[#2a2a4a] py-2">
            <ul className="flex justify-around items-center list-none m-0 p-0">
                
                <li onClick={() => onCambia("film")} className="flex flex-col items-center cursor-pointer gap-1">
                    <Clapperboard size={24} color="#00ffff" />
                    <span className="text-[#00ffff] text-xs">FILM</span>
                </li>

                <li onClick={() => onCambia("serie")} className="flex flex-col items-center cursor-pointer gap-1">
                    <Tv size={24} color="gray" />
                    <span className="text-gray-500 text-xs">SERIE TV</span>
                </li>

                <li className="flex flex-col items-center cursor-pointer gap-1">
                    <div className="bg-[#3a0060] rounded-xl p-2">
                        <Heart size={24} color="#cc44ff" />
                    </div>
                    <span className="text-[#cc44ff] text-xs">MATCH</span>
                </li>

                <li className="flex flex-col items-center cursor-pointer gap-1">
                    <BookMarked size={24} color="gray" />
                    <span className="text-gray-500 text-xs">LISTA</span>
                </li>

                <li className="flex flex-col items-center cursor-pointer gap-1">
                    <User size={24} color="gray" />
                    <span className="text-gray-500 text-xs">ACCOUNT</span>
                </li>

            </ul>
        </nav>
    )
}