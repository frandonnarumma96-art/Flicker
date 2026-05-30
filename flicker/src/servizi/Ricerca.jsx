export function Ricerca({ onSearch }) {
    return (
        <div className="w-full mb-6">
            <input
                type="text"
                placeholder="Cerca..."
                onChange={(e) => onSearch(e.target.value)}
                className="
                    w-full
                    p-3
                    rounded-xl
                    bg-[#1a1a1a]
                    text-white
                    placeholder-gray-400
                    outline-none
                    border border-transparent
                    focus:border-cyan-400
                    focus:ring-2
                    focus:ring-cyan-500/40
                    transition
                "
            />
        </div>
    );
}