'use client';

import { useMemo } from 'react';

export type TeamColor = 'red' | 'black' | 'white-blue';

interface CharacterVisualsProps {
    teamColor: TeamColor;
}

export default function CharacterVisuals({ teamColor }: CharacterVisualsProps) {

    const colors = useMemo(() => {
        switch (teamColor) {
            case 'red': return {
                robe: '#7f1d1d', // Dark Red
                sash: '#b91c1c', // Bright Red
                hat: '#171717'   // Black Hat
            };
            case 'black': return {
                robe: '#171717', // Black
                sash: '#404040', // Dark Grey
                hat: '#171717'
            };
            case 'white-blue': return {
                robe: '#eff6ff', // White
                sash: '#2563eb', // Blue
                hat: '#171717'
            };
        }
    }, [teamColor]);

    return (
        <group>
            {/* --- HEAD --- */}
            <group position={[0, 1.7, 0]}>
                {/* Face / Mask Area */}
                <mesh position={[0, 0, 0]} castShadow>
                    <boxGeometry args={[0.25, 0.3, 0.25]} />
                    <meshStandardMaterial color="#d4c5a9" /> {/* Skin tone base */}
                </mesh>
                <mesh position={[0, -0.05, 0.13]}>
                    <boxGeometry args={[0.26, 0.15, 0.05]} />
                    <meshStandardMaterial color="#171717" /> {/* Black Mask */}
                </mesh>

                {/* "Gat" Hat (Korean Traditional Hat) */}
                <group position={[0, 0.2, 0]}>
                    {/* Brim */}
                    <mesh position={[0, 0, 0]}>
                        <cylinderGeometry args={[0.6, 0.6, 0.02, 32]} />
                        <meshStandardMaterial color={colors.hat} transparent opacity={0.9} />
                    </mesh>
                    {/* Top Part */}
                    <mesh position={[0, 0.15, 0]}>
                        <cylinderGeometry args={[0.15, 0.18, 0.3, 16]} />
                        <meshStandardMaterial color={colors.hat} />
                    </mesh>
                </group>
            </group>

            {/* --- BODY (Robes) --- */}
            <group position={[0, 0.9, 0]}>
                {/* Upper Body */}
                <mesh position={[0, 0.2, 0]} castShadow>
                    <boxGeometry args={[0.5, 0.6, 0.3]} />
                    <meshStandardMaterial color={colors.robe} />
                </mesh>

                {/* Sash / Belt */}
                <mesh position={[0, -0.15, 0]} castShadow>
                    <boxGeometry args={[0.52, 0.15, 0.32]} />
                    <meshStandardMaterial color={colors.sash} />
                </mesh>

                {/* Lower Robe (Skirt-like) */}
                <mesh position={[0, -0.6, 0]} castShadow>
                    {/* Using cone/cylinder for flowing robe look */}
                    <cylinderGeometry args={[0.3, 0.5, 0.8, 8]} />
                    <meshStandardMaterial color={colors.robe} />
                </mesh>
            </group>

            {/* --- ARMS --- */}
            <mesh position={[-0.35, 1.1, 0]} rotation={[0, 0, 0.2]}>
                <boxGeometry args={[0.15, 0.7, 0.15]} />
                <meshStandardMaterial color={colors.robe} />
            </mesh>
            <mesh position={[0.35, 1.1, 0]} rotation={[0, 0, -0.2]}>
                <boxGeometry args={[0.15, 0.7, 0.15]} />
                <meshStandardMaterial color={colors.robe} />
            </mesh>

        </group>
    );
}
