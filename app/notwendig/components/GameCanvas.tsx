'use client';

import { Canvas } from '@react-three/fiber';
import { Sky, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Terrain from './world/Terrain';
import Boundaries from './world/Boundaries';
import Player from './entities/Player';
import Bot from './entities/Bot';
import { Vector3 } from 'three';

export default function GameCanvas() {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 5, 10], fov: 60 }}
            className="w-full h-full"
        >
            <Suspense fallback={null}>
                {/* Environment & Lighting */}
                <Sky sunPosition={[100, 20, 100]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} castShadow />

                {/* World */}
                <Terrain />
                <Boundaries />

                {/* Player Entity */}
                <Player />

                {/* Bots */}
                <Bot position={new Vector3(10, 0, 20)} team="black" />
                <Bot position={new Vector3(-15, 0, 30)} team="white-blue" />

            </Suspense>
        </Canvas>
    );
}
