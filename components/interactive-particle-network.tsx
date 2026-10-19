'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  driftX: number;
  driftY: number;
  coreRadius: number;
  glowScale: number;
  depth: number;
  phase: number;
  colorPhase: number;
  colorSpeed: number;
  breatheSpeed: number;
  brightness: number;
  family: 'green' | 'purple' | 'mixed';
  color: Rgb;
};

type Rgb = { r: number; g: number; b: number };

const FALLBACK_LIME: Rgb = { r: 183, g: 255, b: 74 };
const FALLBACK_VIOLET: Rgb = { r: 154, g: 107, b: 255 };
const NEON_GREEN: Rgb = { r: 173, g: 255, b: 47 };
const ELECTRIC_LIME: Rgb = { r: 124, g: 255, b: 0 };
const ELECTRIC_PURPLE: Rgb = { r: 168, g: 85, b: 247 };
const SOFT_VIOLET: Rgb = { r: 183, g: 148, b: 246 };

function parseHexColor(value: string, fallback: Rgb): Rgb {
  const hex = value.trim().replace('#', '');
  if (!/^[\da-f]{6}$/i.test(hex)) return fallback;
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  };
}

function rgba(color: Rgb, alpha: number) {
  return `rgba(${color.r},${color.g},${color.b},${alpha})`;
}

function interpolateColor(target: Rgb, from: Rgb, to: Rgb, amount: number) {
  target.r = Math.round(from.r + (to.r - from.r) * amount);
  target.g = Math.round(from.g + (to.g - from.g) * amount);
  target.b = Math.round(from.b + (to.b - from.b) * amount);
}

function particleCount(width: number) {
  if (width < 560) return 20;
  if (width < 900) return 36;
  return 60;
}

function createParticles(width: number, height: number, count: number): Particle[] {
  let seed = 0x2f6e2b1;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  return Array.from({ length: count }, (_, index) => {
    const depth = 0.58 + random() * 0.42;
    const speed = (7 + random() * 10) * depth;
    const angle = random() * Math.PI * 2;
    const sizeSlot = (index * 11) % 20;
    const familySlot = (index * 7) % 20;
    const sizeTier = sizeSlot < 6 ? 0 : sizeSlot < 15 ? 1 : 2;
    const coreRadius = sizeTier === 0
      ? 1.35 + random() * 0.5
      : sizeTier === 1
        ? 2.05 + random() * 0.75
        : 3.25 + random() * 1.15;
    const family = familySlot < 14 ? 'green' : familySlot < 19 ? 'purple' : 'mixed';
    return {
      x: width * (0.04 + random() * 0.92),
      y: height * (0.04 + random() * 0.92),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      driftX: Math.cos(angle) * speed,
      driftY: Math.sin(angle) * speed,
      coreRadius,
      glowScale: sizeTier === 0 ? 4.7 : sizeTier === 1 ? 5.35 : 6.1,
      depth,
      phase: random() * Math.PI * 2,
      colorPhase: random() * Math.PI * 2,
      colorSpeed: 0.00018 + random() * 0.00016,
      breatheSpeed: 0.00062 + random() * 0.00054,
      brightness: 0.82 + random() * 0.24,
      family,
      color: { ...NEON_GREEN },
    };
  });
}

export function InteractiveParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>('.hero');
    const context = canvas?.getContext('2d');
    if (!canvas || !hero || !context) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const styles = getComputedStyle(hero);
    const lime = parseHexColor(styles.getPropertyValue('--acid'), FALLBACK_LIME);
    const violet = parseHexColor(styles.getPropertyValue('--violet'), FALLBACK_VIOLET);
    const glowSpriteCache = new Map<string, HTMLCanvasElement>();
    const pointer = {
      active: false,
      strength: 0,
      targetX: 0,
      targetY: 0,
      x: 0,
      y: 0,
    };

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrame = 0;
    let lastFrame = 0;
    let inView = true;
    let reducedMotion = motionQuery.matches;
    let destroyed = false;

    const updateParticleColor = (particle: Particle, time: number) => {
      const cycle = reducedMotion ? 0.35 : 0.5 + Math.sin(time * particle.colorSpeed + particle.colorPhase) * 0.5;
      if (particle.family === 'green') {
        interpolateColor(particle.color, NEON_GREEN, ELECTRIC_LIME, cycle);
      } else if (particle.family === 'purple') {
        interpolateColor(particle.color, ELECTRIC_PURPLE, SOFT_VIOLET, cycle);
      } else {
        const greenMix = 0.5 + Math.sin(time * particle.colorSpeed * 0.83 + particle.phase) * 0.5;
        const purpleMix = 0.5 + Math.cos(time * particle.colorSpeed * 0.71 + particle.colorPhase) * 0.5;
        const green = {
          r: NEON_GREEN.r + (ELECTRIC_LIME.r - NEON_GREEN.r) * greenMix,
          g: NEON_GREEN.g + (ELECTRIC_LIME.g - NEON_GREEN.g) * greenMix,
          b: NEON_GREEN.b + (ELECTRIC_LIME.b - NEON_GREEN.b) * greenMix,
        };
        const purple = {
          r: ELECTRIC_PURPLE.r + (SOFT_VIOLET.r - ELECTRIC_PURPLE.r) * purpleMix,
          g: ELECTRIC_PURPLE.g + (SOFT_VIOLET.g - ELECTRIC_PURPLE.g) * purpleMix,
          b: ELECTRIC_PURPLE.b + (SOFT_VIOLET.b - ELECTRIC_PURPLE.b) * purpleMix,
        };
        const crossfade = 0.5 + Math.sin(time * particle.colorSpeed * 0.52 + particle.colorPhase) * 0.5;
        interpolateColor(particle.color, green, purple, crossfade);
      }
    };

    const getGlowSprite = (color: Rgb) => {
      const quantized = {
        r: Math.round(color.r / 12) * 12,
        g: Math.round(color.g / 12) * 12,
        b: Math.round(color.b / 12) * 12,
      };
      const key = `${quantized.r},${quantized.g},${quantized.b}`;
      const cached = glowSpriteCache.get(key);
      if (cached) return cached;

      const sprite = document.createElement('canvas');
      const spriteContext = sprite.getContext('2d');
      sprite.width = 128;
      sprite.height = 128;
      if (spriteContext) {
        const glow = spriteContext.createRadialGradient(64, 64, 0, 64, 64, 64);
        glow.addColorStop(0, rgba(quantized, 0.8));
        glow.addColorStop(0.16, rgba(quantized, 0.43));
        glow.addColorStop(0.43, rgba(quantized, 0.14));
        glow.addColorStop(1, rgba(quantized, 0));
        spriteContext.fillStyle = glow;
        spriteContext.fillRect(0, 0, 128, 128);
      }
      glowSpriteCache.set(key, sprite);
      return sprite;
    };

    const draw = (time: number, delta: number, animate: boolean) => {
      context.clearRect(0, 0, width, height);
      if (!width || !height) return;

      const connectionDistance = Math.max(108, Math.min(158, width * 0.18));
      const interactionRadius = Math.max(128, Math.min(178, width * 0.2));
      const cellSize = connectionDistance;
      const connectionCounts = new Uint8Array(particles.length);
      const grid = new Map<string, number[]>();

      for (const particle of particles) updateParticleColor(particle, time);

      if (animate) {
        const follow = 1 - Math.exp(-delta * 12);
        pointer.x += (pointer.targetX - pointer.x) * follow;
        pointer.y += (pointer.targetY - pointer.y) * follow;
        pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * (1 - Math.exp(-delta * 7));

        for (const particle of particles) {
          const ambientX = Math.sin(time * 0.00017 + particle.phase) * 2.2;
          const ambientY = Math.cos(time * 0.00013 + particle.phase * 1.37) * 2;
          particle.vx += (particle.driftX + ambientX - particle.vx) * delta * 0.38;
          particle.vy += (particle.driftY + ambientY - particle.vy) * delta * 0.38;

          if (pointer.strength > 0.01) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0.1 && distance < interactionRadius) {
              const proximity = 1 - distance / interactionRadius;
              const force = proximity * proximity * 43 * pointer.strength;
              particle.vx += (dx / distance) * force * delta;
              particle.vy += (dy / distance) * force * delta;
            }
          }

          const maxSpeed = 28;
          const speed = Math.hypot(particle.vx, particle.vy);
          if (speed > maxSpeed) {
            particle.vx = (particle.vx / speed) * maxSpeed;
            particle.vy = (particle.vy / speed) * maxSpeed;
          }
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;

          const edge = 10;
          if (particle.x < edge || particle.x > width - edge) {
            particle.x = Math.max(edge, Math.min(width - edge, particle.x));
            particle.vx *= -0.88;
            particle.driftX *= -1;
          }
          if (particle.y < edge || particle.y > height - edge) {
            particle.y = Math.max(edge, Math.min(height - edge, particle.y));
            particle.vy *= -0.88;
            particle.driftY *= -1;
          }
        }
      }

      particles.forEach((particle, index) => {
        const key = `${Math.floor(particle.x / cellSize)},${Math.floor(particle.y / cellSize)}`;
        const bucket = grid.get(key);
        if (bucket) bucket.push(index);
        else grid.set(key, [index]);
      });

      context.lineWidth = 0.82;
      particles.forEach((particle, index) => {
        const cellX = Math.floor(particle.x / cellSize);
        const cellY = Math.floor(particle.y / cellSize);
        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
            const nearby = grid.get(`${cellX + offsetX},${cellY + offsetY}`);
            if (!nearby) continue;
            for (const otherIndex of nearby) {
              if (otherIndex <= index || connectionCounts[index] >= 4 || connectionCounts[otherIndex] >= 4) continue;
              const other = particles[otherIndex];
              const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
              if (distance >= connectionDistance) continue;
              const proximity = 1 - distance / connectionDistance;
              const alpha = (proximity * 0.32 + proximity * proximity * 0.35) * Math.min(particle.depth, other.depth);
              context.strokeStyle = rgba(particle.family === 'purple' || other.family === 'purple' ? violet : lime, alpha);
              context.beginPath();
              context.moveTo(particle.x, particle.y);
              context.lineTo(other.x, other.y);
              context.stroke();
              connectionCounts[index] += 1;
              connectionCounts[otherIndex] += 1;
            }
          }
        }
      });

      if (pointer.strength > 0.01) {
        const cursorConnections = particles
          .map((particle) => ({ particle, distance: Math.hypot(particle.x - pointer.x, particle.y - pointer.y) }))
          .filter(({ distance }) => distance < interactionRadius)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 7);

        context.lineWidth = 0.8;
        for (const { particle, distance } of cursorConnections) {
          const proximity = 1 - distance / interactionRadius;
          context.strokeStyle = rgba(particle.family === 'purple' ? violet : lime, (proximity * 0.34 + proximity * proximity * 0.25) * pointer.strength);
          context.beginPath();
          context.moveTo(pointer.x, pointer.y);
          context.lineTo(particle.x, particle.y);
          context.stroke();
        }
      }

      context.globalCompositeOperation = 'lighter';
      for (const particle of particles) {
        const breathWave = reducedMotion ? 0 : Math.sin(time * particle.breatheSpeed + particle.phase);
        const radiusPulse = 1 + breathWave * 0.055;
        const brightnessPulse = particle.brightness * (0.88 + breathWave * 0.12);
        const coreRadius = particle.coreRadius * particle.depth * radiusPulse;
        const glowRadius = coreRadius * particle.glowScale;
        const glowSprite = getGlowSprite(particle.color);
        context.globalAlpha = Math.min(1, brightnessPulse * 0.92);
        context.drawImage(glowSprite, particle.x - glowRadius, particle.y - glowRadius, glowRadius * 2, glowRadius * 2);
        context.globalAlpha = Math.min(1, brightnessPulse);
        context.fillStyle = rgba(particle.color, 0.98);
        context.beginPath();
        context.arc(particle.x, particle.y, Math.max(1, coreRadius), 0, Math.PI * 2);
        context.fill();
        context.fillStyle = 'rgba(247,255,240,.68)';
        context.beginPath();
        context.arc(particle.x, particle.y, Math.max(0.52, coreRadius * 0.36), 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      context.globalCompositeOperation = 'source-over';
    };

    const frame = (time: number) => {
      if (destroyed || reducedMotion || !inView || document.hidden) {
        animationFrame = 0;
        return;
      }
      const delta = lastFrame ? Math.min((time - lastFrame) / 1000, 0.034) : 1 / 60;
      lastFrame = time;
      draw(time, delta, true);
      animationFrame = requestAnimationFrame(frame);
    };

    const start = () => {
      if (destroyed || reducedMotion || !inView || document.hidden || animationFrame) return;
      lastFrame = 0;
      animationFrame = requestAnimationFrame(frame);
    };

    const stop = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, bounds.width);
      const nextHeight = Math.max(1, bounds.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const count = particleCount(nextWidth);
      const sizeChanged = Math.abs(nextWidth - width) > 1 || Math.abs(nextHeight - height) > 1;
      if (!sizeChanged && particles.length === count) return;

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height, count);
      pointer.targetX = pointer.x = width * 0.52;
      pointer.targetY = pointer.y = height * 0.5;
      draw(performance.now(), 0, false);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointerQuery.matches || event.pointerType === 'touch') return;
      const bounds = canvas.getBoundingClientRect();
      pointer.targetX = event.clientX - bounds.left;
      pointer.targetY = event.clientY - bounds.top;
      pointer.active = pointer.targetX > -40 && pointer.targetX < width + 40 && pointer.targetY > -40 && pointer.targetY < height + 40;
    };
    const handlePointerLeave = () => { pointer.active = false; };
    const handleVisibility = () => document.hidden ? stop() : start();
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        stop();
        pointer.active = false;
        pointer.strength = 0;
        draw(performance.now(), 0, false);
      } else start();
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    }, { threshold: 0.01 });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(hero);
    hero.addEventListener('pointermove', handlePointerMove, { passive: true });
    hero.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibility);
    motionQuery.addEventListener('change', handleMotionPreference);
    resize();
    if (reducedMotion) draw(performance.now(), 0, false);
    else start();

    return () => {
      destroyed = true;
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      motionQuery.removeEventListener('change', handleMotionPreference);
      glowSpriteCache.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-canvas" aria-hidden="true" />;
}
