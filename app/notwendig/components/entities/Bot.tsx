'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3, Group } from 'three';
import CharacterVisuals, { TeamColor } from './CharacterVisuals';
import Weapon from './Weapon';

interface BotProps {
    position: Vector3;
    team: TeamColor;
    targetPosition?: Vector3; // In real game, passed from server or determined by AI
}

const BOT_SPEED = 4;
const MIN_DISTANCE = 5;

export default function Bot({ position, team, targetPosition }: BotProps) {
    const botRef = useRef<Group>(null);
    const [currentWeapon, setCurrentWeapon] = useState<'bow' | 'sword'>('bow');

    useFrame((state, delta) => {
        if (!botRef.current) return;

        // Simple AI: Move towards target (0,0,0 if no target provided, usually the player)
        // In a real implementation, we would query the player's position from a store or context
        const target = targetPosition || new Vector3(0, 0, 0);
        const botPos = botRef.current.position;

        const distance = botPos.distanceTo(target);

        if (distance > MIN_DISTANCE) {
            // Move towards target
            const direction = new Vector3().subVectors(target, botPos).normalize();
            direction.y = 0; // Keep on ground

            botRef.current.position.add(direction.multiplyScalar(BOT_SPEED * delta));

            // Face target
            botRef.current.lookAt(target.x, botPos.y, target.z);
        } else {
            // In range - maintain facing but stop moving
            botRef.current.lookAt(target.x, botPos.y, target.z);

            // Switch to sword if very close
            if (distance < 2 && currentWeapon !== 'sword') {
                setCurrentWeapon('sword');
            }
        }
    });

    return (
        <group ref={botRef} position={position}>
            <CharacterVisuals teamColor={team} />
            <Weapon type={currentWeapon} />

            {/* Simple health bar visuals above head */}
            <mesh position={[0, 2.5, 0]}>
                <planeGeometry args={[1, 0.1]} />
                <meshBasicMaterial color="red" />
            </mesh>
        </group>
    );
}
