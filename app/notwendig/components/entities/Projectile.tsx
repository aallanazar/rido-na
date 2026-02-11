'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3, Mesh } from 'three';

interface ProjectileProps {
    position: Vector3;
    velocity: Vector3;
    onHit: () => void;
}

const GRAVITY = -9.8;

export default function Projectile({ position, velocity, onHit }: ProjectileProps) {
    const meshRef = useRef<Mesh>(null);
    const velocityRef = useRef(velocity.clone());
    const [active, setActive] = useState(true);

    useFrame((state, delta) => {
        if (!active || !meshRef.current) return;

        // Apply gravity
        velocityRef.current.y += GRAVITY * delta;

        // Move projectile
        meshRef.current.position.add(velocityRef.current.clone().multiplyScalar(delta));

        // Rotate to face direction of travel
        meshRef.current.lookAt(meshRef.current.position.clone().add(velocityRef.current));

        // Simple ground collision
        if (meshRef.current.position.y <= 0) {
            setActive(false);
            onHit();
        }
    });

    if (!active) return null;

    return (
        <mesh ref={meshRef} position={position} castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 1]} />
            <meshStandardMaterial color="#3d2817" />
        </mesh>
    );
}
