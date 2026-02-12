'use client';

interface HUDProps {
    health: number;
    maxHealth: number;
    arrows: number;
    maxArrows: number;
    weapon: string; // 'bow', 'sword', 'knife'
}

export default function HUD({ health, maxHealth, arrows, maxArrows, weapon }: HUDProps) {

    // Safe calculation for HP percentage
    const hpPercent = Math.max(0, Math.min(100, (health / maxHealth) * 100));

    return (
        <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between font-serif">

            {/* --- TOP LEFT: HEALTH --- */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-black/60 to-transparent backdrop-blur-sm px-4 py-2 rounded-lg border border-[var(--color-error)]/30">
                {/* Diamond Icon Container */}
                <div className="relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-error)]/20 border-2 border-[var(--color-error)] rotate-45 shadow-lg">
                    <div className="w-10 h-10 bg-black/60 rotate-0 flex items-center justify-center -rotate-45 border border-[var(--color-error)]/50">
                        <span className="text-white font-bold text-lg drop-shadow-lg">{health}</span>
                    </div>
                </div>

                {/* HP Bar */}
                <div className="flex flex-col gap-2">
                    <div className="text-white/90 text-xs tracking-widest uppercase font-bold drop-shadow-md">Player HP</div>
                    <div className="w-72 h-5 bg-black/80 border-2 border-[var(--color-error)]/60 rounded overflow-hidden shadow-lg">
                        <div
                            className="h-full bg-gradient-to-r from-[var(--color-error)] via-[var(--color-warning)] to-[var(--color-success)] transition-all duration-300 shadow-inner"
                            style={{ width: `${hpPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* --- BOTTOM RIGHT: WEAPON & AMMO --- */}
            <div className="absolute bottom-10 right-10 flex flex-col items-end gap-3">

                {/* Active Weapon Display (Parchment Style with theme) */}
                <div className="relative bg-gradient-to-br from-[var(--color-primary)]/30 to-[var(--color-primary)]/10 backdrop-blur-sm px-8 py-5 rounded-lg border-3 border-[var(--color-primary)] shadow-2xl text-white min-w-[200px] bg-black/40">
                    {/* Texture overlay */}
                    <div className="absolute inset-0 rounded-lg opacity-5 pointer-events-none" style={{
                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook.png")'
                    }} />

                    <div className="relative z-10">
                        <div className="text-xs font-black tracking-widest uppercase opacity-70 mb-2 text-[var(--color-primary-light)]">⚔️ Equipped</div>
                        <div className="text-4xl font-black uppercase tracking-tighter flex items-center justify-between gap-4">
                            <span className="text-[var(--color-primary-light)]">{weapon}</span>
                            {weapon === 'bow' && (
                                <span className="text-2xl text-[var(--color-warning)]">{arrows}/{maxArrows}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Select Hints */}
                <div className="flex gap-3 text-white/80 text-sm font-bold tracking-wide drop-shadow-md bg-gradient-to-r from-black/60 to-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                    <span className={`transition-colors duration-200 ${weapon === 'bow' ? 'text-[var(--color-warning)] font-bold' : 'opacity-60'}`}>[1] BOW</span>
                    <span className="opacity-40">|</span>
                    <span className={`transition-colors duration-200 ${weapon === 'sword' ? 'text-[var(--color-primary-light)] font-bold' : 'opacity-60'}`}>[2] SWORD</span>
                    <span className="opacity-40">|</span>
                    <span className={`transition-colors duration-200 ${weapon === 'knife' ? 'text-[var(--color-error)] font-bold' : 'opacity-60'}`}>[3] KNIFE</span>
                </div>

            </div>

            {/* --- CROSSHAIR --- */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* Dynamic crosshair with theme color */}
                <div className="w-1 h-1 bg-[var(--color-primary-light)] rounded-full shadow-[0_0_8px_var(--color-primary)]" />
                {weapon === 'bow' && (
                    <>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-[var(--color-primary)]/50 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-[var(--color-primary)]/20 rounded-full" />
                    </>
                )}
            </div>

        </div>
    );
}
