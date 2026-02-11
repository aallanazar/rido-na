'use client';

interface MainMenuProps {
    onStart: () => void;
}

export default function MainMenu({ onStart }: MainMenuProps) {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/80 text-white">
            <h1 className="text-6xl font-black mb-8 tracking-tighter text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                SCHLACHTFELD KOREA
            </h1>
            <p className="text-xl mb-12 text-gray-300">13. Jahrhundert - Duo Battle Royale</p>

            <button
                onClick={onStart}
                className="px-12 py-4 bg-red-700 hover:bg-red-600 text-white text-2xl font-bold rounded-sm border-2 border-red-900 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
            >
                SCHLACHT STARTEN
            </button>

            <div className="mt-8 text-sm text-gray-500">
                <p>Ein Spieler + Bot oder Duo-Team</p>
            </div>
        </div>
    );
}
