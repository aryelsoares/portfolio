// Sound Hook
"use client";

export function useSound(src: string) {
    const play = () => {
        const audio = new Audio(`/sounds/${src}.mp3`);
        audio.currentTime = 0;
        audio.play().catch(() => {
            // Avoids warning
        });
    };

    return play;
}