import { create } from 'zustand';

export type WeaponType = 'bow' | 'sword' | 'knife';

interface GameState {
    health: number;
    maxHealth: number;
    ammo: number;
    maxAmmo: number;
    currentWeapon: WeaponType;

    setWeapon: (weapon: WeaponType) => void;
    decreaseAmmo: () => void;
    takeDamage: (amount: number) => void;
    reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    health: 100,
    maxHealth: 100,
    ammo: 7,
    maxAmmo: 7,
    currentWeapon: 'bow',

    setWeapon: (weapon) => set({ currentWeapon: weapon }),

    decreaseAmmo: () => set((state) => ({
        ammo: Math.max(0, state.ammo - 1)
    })),

    takeDamage: (amount) => set((state) => ({
        health: Math.max(0, state.health - amount)
    })),

    reset: () => set({
        health: 100,
        ammo: 7,
        currentWeapon: 'bow'
    }),
}));
