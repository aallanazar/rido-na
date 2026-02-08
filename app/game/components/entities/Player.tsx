'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Vector3, Group } from 'three';
import useInput from '../../hooks/useInput';
import CharacterVisuals, { TeamColor } from './CharacterVisuals';
import Weapon from './Weapon';
import Projectile from './Projectile';
import { useGameStore } from '../../store';

const WALK_SPEED = 10;
const RUN_SPEED = 18;
const PLAYER_TEAM: TeamColor = 'red';

export default function Player() {
    const { camera } = useThree();
    const playerRef = useRef<Group>(null);
    const { forward, backward, left, right, shift, jump } = useInput();

    // Store
    const { currentWeapon, setWeapon, ammo, decreaseAmmo } = useGameStore();

    // Projectiles State
    const [projectiles, setProjectiles] = useState<{ id: number, position: Vector3, velocity: Vector3 }[]>([]);
    const projectileIdCounter = useRef(0);

    // Smooth rotation
    const targetRotation = useRef(0);

    // Weapon switching
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '1') setWeapon('bow');
            if (e.key === '2') setWeapon('sword');
            if (e.key === '3') setWeapon('knife');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setWeapon]);

    // Shooting Input
    useEffect(() => {
        const handleMouseDown = () => {
            if (currentWeapon === 'bow' && ammo > 0) {
                shootArrow();
            }
        };
        window.addEventListener('mousedown', handleMouseDown);
        return () => window.removeEventListener('mousedown', handleMouseDown);
    }, [currentWeapon, ammo]);

    const shootArrow = () => {
        if (!playerRef.current) return;

        decreaseAmmo();

        const playerPos = playerRef.current.position.clone();
        const direction = new Vector3(0, 0, -1);
        direction.applyAxisAngle(new Vector3(0, 1, 0), playerRef.current.rotation.y);

        const velocity = direction.multiplyScalar(40); // 40m/s arrow speed
        velocity.y = 5; // Slight arc up

        const spawnPos = playerPos.add(new Vector3(0, 1.5, 0)); // Spawn from chest/eye height

        setProjectiles(prev => [...prev, {
            id: projectileIdCounter.current++,
            position: spawnPos,
            velocity: velocity
        }]);
    };

    const handleProjectileHit = (id: number) => {
        // Remove projectile after hit (simulate sticking or disappearing for now)
        setTimeout(() => {
            setProjectiles(prev => prev.filter(p => p.id !== id));
        }, 5000); // Keep for 5s then cleanup 
    };

    useFrame((state, delta) => {
        if (!playerRef.current) return;

        const speed = shift ? RUN_SPEED : WALK_SPEED;
        const direction = new Vector3();

        if (forward) direction.z -= 1;
        if (backward) direction.z += 1;
        if (left) direction.x -= 1;
        if (right) direction.x += 1;

        if (direction.length() > 0) {
            direction.normalize().multiplyScalar(speed * delta);
            targetRotation.current = Math.atan2(direction.x, direction.z);
        }

        playerRef.current.position.add(direction);
        playerRef.current.rotation.y = targetRotation.current;

        // Camera Follow
        const playerPos = playerRef.current.position;
        const cameraOffset = new Vector3(0, 8, 15);
        const targetCameraPos = playerPos.clone().add(cameraOffset);

        camera.position.lerp(targetCameraPos, 0.1);
        camera.lookAt(playerPos.clone().add(new Vector3(0, 1, 0)));
    });

    return (
        <>
            <group ref={playerRef} position={[0, 0, 0]}>
                <CharacterVisuals teamColor={PLAYER_TEAM} />
                <Weapon type={currentWeapon} />
            </group>

            {/* Render Active Projectiles */}
            {projectiles.map(p => (
                <Projectile
                    key={p.id}
                    position={p.position}
                    velocity={p.velocity}
                    onHit={() => handleProjectileHit(p.id)}
                />
            ))}
        </>
    );
}
