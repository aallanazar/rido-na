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
            <div className="flex items-center gap-3">
                {/* Diamond Icon Container */}
                <div className="relative w-12 h-12 flex items-center justify-center bg-zinc-900 border-2 border-zinc-500 rotate-45 shadow-lg">
                    <div className="w-8 h-8 bg-black/80 rotate-0 flex items-center justify-center -rotate-45">
                        <span className="text-white font-bold text-xs">{health}</span>
                    </div>
                </div>

                {/* HP Bar */}
                <div className="flex flex-col gap-1">
                    <div className="text-white/80 text-xs tracking-widest uppercase font-bold drop-shadow-md">Player HP</div>
                    <div className="w-64 h-4 bg-zinc-900/80 border border-zinc-600 skew-x-[-15deg] overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-red-900 via-red-600 to-red-500 transition-all duration-300"
                            style={{ width: `${hpPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* --- BOTTOM RIGHT: WEAPON & AMMO --- */}
            <div className="absolute bottom-10 right-10 flex flex-col items-end gap-3">

                {/* Active Weapon Display (Parchment Style) */}
                <div className="relative bg-[#d4c5a9] px-6 py-4 rounded-sm border-4 border-[#3e2723] shadow-xl text-[#3e2723] min-w-[180px]">
                    {/* Rough paper texture effect via CSS would go here, simplified for now */}

                    <div className="text-xs font-black tracking-widest uppercase opacity-60 mb-1">Equipped</div>
                    <div className="text-3xl font-black uppercase tracking-tighter flex items-center justify-between gap-4">
                        <span>{weapon}</span>
                        {weapon === 'bow' && (
                            <span className="text-2xl">{arrows}/{maxArrows}</span>
                        )}
                    </div>
                </div>

                {/* Quick Select Hints */}
                <div className="flex gap-2 text-white/70 text-sm font-bold tracking-wide drop-shadow-md bg-black/40 px-3 py-1 rounded">
                    <span className={weapon === 'bow' ? 'text-yellow-400' : ''}>[1] BOW</span>
                    <span>|</span>
                    <span className={weapon === 'sword' ? 'text-yellow-400' : ''}>[2] SWORD</span>
                    <span>|</span>
                    <span className={weapon === 'knife' ? 'text-yellow-400' : ''}>[3] KNIFE</span>
                </div>

            </div>

            {/* --- CROSSHAIR --- */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* Simple dynamic crosshair */}
                <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_4px_white]" />
                {weapon === 'bow' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/30 rounded-full" />
                )}
            </div>

        </div>
    );
}
