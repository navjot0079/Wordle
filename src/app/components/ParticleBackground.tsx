'use client';

import { useEffect, useState } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    delay: number;
    duration: number;
}

export default function ParticleBackground() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const colors = [
            'rgba(99, 102, 241, 0.3)',
            'rgba(139, 92, 246, 0.3)',
            'rgba(236, 72, 153, 0.2)',
            'rgba(34, 197, 94, 0.2)',
            'rgba(250, 204, 21, 0.2)',
        ];

        const newParticles: Particle[] = [];
        for (let i = 0; i < 20; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 60 + 20,
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 5,
                duration: Math.random() * 10 + 8,
            });
        }
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full particle blur-xl"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        background: particle.color,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}
