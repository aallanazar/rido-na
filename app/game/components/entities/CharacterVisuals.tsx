'use client';

import { useMemo } from 'react';
import { Color } from 'three';

export type TeamColor = 'red' | 'black' | 'white-blue';

interface CharacterVisualsProps {
    teamColor: TeamColor;
}

export default function CharacterVisuals({ teamColor }: CharacterVisualsProps) {

    const colors = useMemo(() => {
        switch (teamColor) {
            case 'red': return { main: '#b91c1c', accent: '#7f1d1d' }; // Red-700, Red-900
            case 'black': return { main: '#171717', accent: '#404040' }; // Neutral-900, Neutral-700
            case 'white-blue': return { main: '#eff6ff', accent: '#2563eb' }; // Blue-50, Blue-600
        }
    }, [teamColor]);

    return (
        <group>
            {/* Body / Armor */}
            <mesh position={[0, 1, 0]} castShadow>
                <boxGeometry args={[0.8, 1.2, 0.5]} />
                <meshStandardMaterial color={colors.main} />
            </mesh>

            {/* Head / Helmet */}
            <mesh position={[0, 1.9, 0]} castShadow>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color={colors.accent} />
            </mesh>

            {/* Arms */}
            <mesh position={[-0.5, 1.2, 0]}>
                <boxGeometry args={[0.2, 0.8, 0.2]} />
                <meshStandardMaterial color={colors.main} />
            </mesh>
            <mesh position={[0.5, 1.2, 0]}>
                <boxGeometry args={[0.2, 0.8, 0.2]} />
                <meshStandardMaterial color={colors.main} />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.2, 0.3, 0]}>
                <boxGeometry args={[0.25, 0.9, 0.25]} />
                <meshStandardMaterial color={colors.accent} />
            </mesh>
            <mesh position={[0.2, 0.3, 0]}>
                <boxGeometry args={[0.25, 0.9, 0.25]} />
                <meshStandardMaterial color={colors.accent} />
            </mesh>
        </group>
    );
}
