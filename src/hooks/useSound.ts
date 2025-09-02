// Sound Hook
"use client";

import { useEffect, useRef } from "react";

export function useSound(src: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio(`/sounds/${src}.mp3`);
        audio.preload = "auto";
        audio.load();
        audioRef.current = audio;
    }, [src]);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {
                // Avoids warning
            });
        }
    };

    return play;
}