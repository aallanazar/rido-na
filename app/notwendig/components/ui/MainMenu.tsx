'use client';

interface MainMenuProps {
    onStart: () => void;
}

export default function MainMenu({ onStart }: MainMenuProps) {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gradient-to-br from-black/85 to-[var(--color-primary)]/20 text-white">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(193, 122, 74, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(90, 124, 158, 0.3) 0%, transparent 50%)'
            }} />
            
            <div className="relative z-10 flex flex-col items-center gap-8">
                <h1 className="text-7xl font-black mb-2 tracking-tighter bg-gradient-to-r from-[var(--color-primary-light)] via-[var(--color-warning)] to-[var(--color-primary)] bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                    SCHLACHTFELD KOREA
                </h1>
                <p className="text-xl text-white/80 font-medium tracking-wide">13. Jahrhundert • Duo Battle Royale</p>

                <button
                    onClick={onStart}
                    className="px-16 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-light)] hover:to-[var(--color-primary)] text-white text-2xl font-bold rounded-lg border-2 border-[var(--color-primary-light)]/50 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(193,122,74,0.5)] hover:border-[var(--color-primary-light)] group"
                >
                    <span className="flex items-center gap-2">
                        ⚔️ SCHLACHT STARTEN
                    </span>
                </button>

                <div className="mt-8 text-sm text-white/60 space-y-2 text-center">
                    <p className="font-medium">🎮 Ein Spieler + Bot oder Duo-Team</p>
                    <p className="text-xs opacity-70">Bereit zum Kampf?</p>
                </div>
            </div>
        </div>
    );
}
