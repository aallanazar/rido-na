'use client';

import { useThree } from '@react-three/fiber';

const MAP_SIZE = 7000;
const HALF_SIZE = MAP_SIZE / 2;

export default function Boundaries() {
    return (
        <group>
            {/* Back Boundary: Majestic Snow-capped Mountains (North) */}
            <mesh position={[0, 400, -HALF_SIZE]} rotation={[0, 0, 0]}>
                <boxGeometry args={[MAP_SIZE, 800, 200]} />
                <meshStandardMaterial color="#E0E0E0" /> {/* Snow/Mountain White-Grey */}
            </mesh>

            {/* Left Boundary: River & Dense Forest (West) */}
            <group position={[-HALF_SIZE + 200, 0, 0]}>
                {/* River */}
                <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[400, MAP_SIZE]} />
                    <meshStandardMaterial color="#3080ff" transparent opacity={0.8} />
                </mesh>

                {/* Forest Area (Visual cue next to river) */}
                <mesh position={[250, 50, 0]}>
                    <boxGeometry args={[100, 100, MAP_SIZE]} />
                    <meshStandardMaterial color="#1a4d1a" />
                </mesh>

                {/* Bridge (Crossing the river) */}
                <mesh position={[0, 2, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[400, 5, 40]} />
                    <meshStandardMaterial color="#5c4033" />
                </mesh>
            </group>

            {/* Right Boundary: Fortress Walls (East) */}
            <group position={[HALF_SIZE, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                {/* Fortress Wall */}
                <mesh position={[0, 15, 0]}>
                    <boxGeometry args={[MAP_SIZE, 30, 20]} />
                    <meshStandardMaterial color="#808080" />
                </mesh>

                {/* Gate (Center of the wall) */}
                <mesh position={[0, 10, 2]}>
                    <boxGeometry args={[120, 25, 22]} />
                    <meshStandardMaterial color="#3d2817" />
                </mesh>
            </group>

            {/* Front Boundary: Enclosing Wall (South) */}
            <mesh position={[0, 10, HALF_SIZE]} rotation={[0, 0, 0]}>
                <boxGeometry args={[MAP_SIZE, 20, 10]} />
                <meshStandardMaterial color="#505050" />
            </mesh>

        </group>
    );
}
