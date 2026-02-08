'use client';

interface HUDProps {
    health: number;
    maxHealth: number;
    arrows: number;
    maxArrows: number;
    weapon: string;
}

export default function HUD({ health, maxHealth, arrows, maxArrows, weapon }: HUDProps) {
    return (
        <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between">
            {/* Top Left: Health & Status */}
            <div className="flex flex-col gap-2">
                <div className="w-64 h-6 bg-gray-900 border-2 border-gray-600 rounded-sm overflow-hidden">
                    <div
                        className="h-full bg-red-600 transition-all duration-300"
                        style={{ width: `${(health / maxHealth) * 100}%` }}
                    />
                </div>
                <span className="text-white font-bold text-lg drop-shadow-md">HP: {health}</span>
            </div>

            {/* Bottom Right: Weapon & Ammo */}
            <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2">
                <div className="text-white text-4xl font-black uppercase drop-shadow-lg">
                    {weapon}
                </div>
                {weapon === 'bow' && (
                    <div className="flex items-center gap-2">
                        <span className="text-3xl">🏹</span>
                        <span className={`text-4xl font-bold ${arrows === 0 ? 'text-red-500' : 'text-white'}`}>
                            {arrows}/{maxArrows}
                        </span>
                    </div>
                )}
                <div className="text-gray-400 text-sm mt-2">
                    [1] Bow  [2] Sword  [3] Knife
                </div>
            </div>

            {/* Crosshair */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-white rounded-full opacity-80 shadow-[0_0_4px_rgba(0,0,0,0.5)]" />
            </div>
        </div>
    );
}
