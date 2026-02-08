'use client';

import { useState, useEffect } from 'react';

export default function useInput() {
    const [input, setInput] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        shift: false,
        jump: false,
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    setInput((prev) => ({ ...prev, forward: true }));
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    setInput((prev) => ({ ...prev, backward: true }));
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    setInput((prev) => ({ ...prev, left: true }));
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    setInput((prev) => ({ ...prev, right: true }));
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    setInput((prev) => ({ ...prev, shift: true }));
                    break;
                case 'Space':
                    setInput((prev) => ({ ...prev, jump: true }));
                    break;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    setInput((prev) => ({ ...prev, forward: false }));
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    setInput((prev) => ({ ...prev, backward: false }));
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    setInput((prev) => ({ ...prev, left: false }));
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    setInput((prev) => ({ ...prev, right: false }));
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    setInput((prev) => ({ ...prev, shift: false }));
                    break;
                case 'Space':
                    setInput((prev) => ({ ...prev, jump: false }));
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return input;
}
