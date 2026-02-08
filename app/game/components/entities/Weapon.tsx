'use client';

import { useRef } from 'react';

export type WeaponType = 'bow' | 'sword' | 'knife';

interface WeaponProps {
    type: WeaponType;
}

export default function Weapon({ type }: WeaponProps) {

    // Placeholder geometries for weapons
    // In a real implementation, we would load glTF models here

    if (type === 'bow') {
        return (
            <group position={[-0.6, 1.2, 0.3]} rotation={[0, 0, -Math.PI / 4]}>
                {/* Bow Curve */}
                <mesh>
                    <torusGeometry args={[0.6, 0.05, 8, 20, Math.PI]} />
                    <meshStandardMaterial color="#5c4033" />
                </mesh>
                {/* String */}
                <mesh position={[0, 0.5, 0]}>
                    <cylinderGeometry args={[0.01, 0.01, 1.2]} />
                    <meshStandardMaterial color="#eeeeee" />
                </mesh>
            </group>
        );
    }

    if (type === 'sword') {
        return (
            <group position={[0.6, 1.0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                {/* Hilt */}
                <mesh position={[0, -0.4, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.3]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
                {/* Blade */}
                <mesh position={[0, 0.3, 0]}>
                    <boxGeometry args={[0.1, 1.2, 0.02]} />
                    <meshStandardMaterial color="#ccc" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>
        );
    }

    if (type === 'knife') {
        return (
            <group position={[0.6, 1.0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                {/* Handle */}
                <mesh position={[0, -0.2, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.15]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
                {/* Blade */}
                <mesh position={[0, 0.1, 0]}>
                    <boxGeometry args={[0.08, 0.4, 0.01]} />
                    <meshStandardMaterial color="#aaa" metalness={0.5} />
                </mesh>
            </group>
        );
    }

    return null;
}
