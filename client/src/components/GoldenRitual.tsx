import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import waxSeal from '@assets/images/wax-seal.png';
import secretSound from '@assets/audio/secret.mp3';

type RitualState = 'idle' | 'pressing' | 'charging' | 'completing' | 'page-turn' | 'done';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: 'spark' | 'orbital' | 'explosion';
  angle?: number;
  radius?: number;
  speed?: number;
}

interface GoldenRitualProps {
  onComplete: () => void;
}

export function GoldenRitual({ onComplete }: GoldenRitualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [ritualState, setRitualState] = useState<RitualState>('idle');
  const [pressProgress, setPressProgress] = useState(0);
  const holdTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  const HOLD_DURATION = 2500; // 2.5 seconds
  const SEAL_CENTER_X = typeof window !== 'undefined' ? window.innerWidth / 2 : 400;
  const SEAL_CENTER_Y = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;

  // Create golden sparks (12 particles in circle)
  const createSparks = () => {
    const radius = 160;
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      particlesRef.current.push({
        x: SEAL_CENTER_X + Math.cos(angle) * radius,
        y: SEAL_CENTER_Y + Math.sin(angle) * radius,
        vx: 0,
        vy: Math.sin(i) * 0.5,
        life: 100,
        maxLife: 100,
        size: 6,
        type: 'spark'
      });
    }
  };

  // Create orbital particles (8 particles)
  const createOrbitals = () => {
    const orbits = [80, 120, 200];
    for (let i = 0; i < 8; i++) {
      const orbitIndex = i % orbits.length;
      const radius = orbits[orbitIndex];
      const angle = (i / 8) * Math.PI * 2;
      particlesRef.current.push({
        x: SEAL_CENTER_X,
        y: SEAL_CENTER_Y,
        vx: 0,
        vy: 0,
        life: 100,
        maxLife: 100,
        size: 4,
        type: 'orbital',
        angle,
        radius,
        speed: 0.02 + (i % 3) * 0.01
      });
    }
  };

  // Create explosion particles (40 particles)
  const createExplosion = () => {
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 4;
      particlesRef.current.push({
        x: SEAL_CENTER_X,
        y: SEAL_CENTER_Y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 60,
        maxLife: 60,
        size: 3 + Math.random() * 4,
        type: 'explosion'
      });
    }
  };

  // Update and draw particles
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update particle
        if (particle.type === 'orbital' && particle.angle !== undefined && particle.radius !== undefined && particle.speed !== undefined) {
          // Orbital motion
          particle.angle += particle.speed;
          particle.x = SEAL_CENTER_X + Math.cos(particle.angle) * particle.radius;
          particle.y = SEAL_CENTER_Y + Math.sin(particle.angle) * particle.radius;
        } else if (particle.type === 'spark') {
          // Gentle float
          particle.y += particle.vy;
        } else if (particle.type === 'explosion') {
          // Explosive motion
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.1; // Gravity
          particle.life--;
        }

        // Draw particle
        const opacity = particle.life / particle.maxLife;
        ctx.fillStyle = `rgba(212, 193, 55, ${opacity})`; // Gold color
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(212, 193, 55, 0.5)';

        return particle.life > 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [SEAL_CENTER_X, SEAL_CENTER_Y]);

  // Handle press start
  const handlePressStart = () => {
    if (ritualState !== 'idle') return;

    setRitualState('pressing');
    startTimeRef.current = Date.now();

    // Play audio
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }

    // Create initial sparks
    createSparks();

    // Start hold timer
    holdTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setPressProgress(progress);

      // Create orbitals at 30% progress
      if (progress >= 30 && particlesRef.current.filter(p => p.type === 'orbital').length === 0) {
        createOrbitals();
      }

      // Complete at 100%
      if (progress >= 100) {
        if (holdTimerRef.current) {
          clearInterval(holdTimerRef.current);
        }
        setRitualState('completing');
        createExplosion();

        // Page turn after explosion
        setTimeout(() => {
          setRitualState('page-turn');
        }, 500);

        // Complete ritual
        setTimeout(() => {
          setRitualState('done');
          onComplete();
        }, 2500);
      }
    }, 16); // ~60fps
  };

  // Handle press end
  const handlePressEnd = () => {
    if (ritualState === 'pressing') {
      if (holdTimerRef.current) {
        clearInterval(holdTimerRef.current);
      }
      setRitualState('idle');
      setPressProgress(0);
      particlesRef.current = [];
    }
  };

  return (
    <div className="fixed inset-0 bg-[#2D1F1A] overflow-hidden">
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Audio */}
      <audio ref={audioRef} src={secretSound} preload="auto" />

      {/* Book cover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={ritualState === 'page-turn' ? { rotateY: -180, opacity: 0 } : { rotateY: 0, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
      >
        {/* Dark leather texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3D2817] to-[#1a0f0a]">
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        {/* Book edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-20 text-center px-6">
          <motion.h1
            className="text-4xl md:text-6xl font-display text-gold mb-12 uppercase tracking-wider"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            The Actor's Toolkit
          </motion.h1>

          {/* Wax Seal */}
          <motion.div
            className="relative inline-block cursor-pointer"
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Progress ring */}
            {ritualState === 'pressing' && (
              <svg className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)]" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgba(212, 193, 55, 0.2)"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="#D4C137"
                  strokeWidth="3"
                  strokeDasharray="1068"
                  strokeDashoffset={1068 - (1068 * pressProgress) / 100}
                  strokeLinecap="round"
                />
              </svg>
            )}

            {/* Seal image */}
            <img
              src={waxSeal}
              alt="Wax Seal"
              className="w-64 md:w-80 h-64 md:h-80 relative z-30"
            />

            {/* Glow effect */}
            {ritualState === 'pressing' && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gold/20 blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl font-serif text-gold/80 mt-12 italic max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Hold the seal to unlock your tools
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
