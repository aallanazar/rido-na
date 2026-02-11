'use client';

import { useTexture } from '@react-three/drei';
import { RepeatWrapping } from 'three';

// 7km x 7km map
const TERRAIN_SIZE = 7000;

export default function Terrain() {
    // In a real implementation, we would use a heightmap here.
    // For now, a large plane with a green color to represent the open battlefield.

    return (
        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            {/* Main Ground */}
            <mesh receiveShadow>
                <planeGeometry args={[TERRAIN_SIZE, TERRAIN_SIZE, 128, 128]} />
                <meshStandardMaterial
                    color="#5d7a45"
                    roughness={1}
                />
            </mesh>

            {/* Grid helper for scale reference (optional, good for dev) */}
            <gridHelper args={[TERRAIN_SIZE, 70]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]} />
        </group>
    );
}
