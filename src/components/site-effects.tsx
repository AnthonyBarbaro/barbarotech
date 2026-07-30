"use client";

import { useEffect, useRef } from "react";

type SignalParticle = {
  progress: number;
  lane: number;
  speed: number;
  radius: number;
  alpha: number;
  phase: number;
};

export function SiteEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const lowPowerDevice = (navigator.hardwareConcurrency ?? 8) <= 4;

    let particles: SignalParticle[] = [];
    let frameId = 0;
    let lastTime = performance.now();
    let cursorX = window.innerWidth * 0.72;
    let cursorY = window.innerHeight * 0.25;
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    const getPoint = (particle: SignalParticle, time: number) => {
      const progress = particle.progress;
      const wave =
        Math.sin(progress * Math.PI * 3.2 + particle.phase + time * 0.00016) *
        canvasHeight *
        0.035;
      const laneCurve = Math.sin(progress * Math.PI) * particle.lane * canvasHeight;

      return {
        x: progress * canvasWidth,
        y: canvasHeight * 0.82 - progress * canvasHeight * 0.62 + laneCurve + wave,
      };
    };

    const drawField = (time: number, advance: boolean) => {
      const elapsed = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      context.save();
      context.lineWidth = 0.7;
      for (let laneIndex = -3; laneIndex <= 3; laneIndex += 1) {
        context.beginPath();
        for (let step = 0; step <= 80; step += 1) {
          const progress = step / 80;
          const lane = laneIndex * 0.028;
          const x = progress * canvasWidth;
          const y =
            canvasHeight * 0.82 -
            progress * canvasHeight * 0.62 +
            Math.sin(progress * Math.PI) * lane * canvasHeight +
            Math.sin(progress * Math.PI * 3.2 + laneIndex) * canvasHeight * 0.012;

          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        const laneOpacity = 0.052 + (3 - Math.abs(laneIndex)) * 0.012;
        context.strokeStyle = `rgba(34, 211, 238, ${laneOpacity})`;
        context.stroke();
      }
      context.restore();

      for (const particle of particles) {
        if (advance) {
          particle.progress += particle.speed * elapsed;
          if (particle.progress > 1.04) particle.progress = -0.04;
        }

        const point = getPoint(particle, time);
        const cursorDistance = Math.hypot(point.x - cursorX, point.y - cursorY);
        const cursorLift =
          finePointer.matches && !reducedMotion.matches
            ? Math.max(0, 1 - cursorDistance / 180)
            : 0;
        const twinkle = 0.76 + Math.sin(time * 0.0013 + particle.phase) * 0.24;
        const alpha = Math.min(particle.alpha * twinkle + cursorLift * 0.34, 0.94);
        const radius = particle.radius + cursorLift * 1.5;

        if (alpha > 0.2) {
          context.beginPath();
          context.arc(point.x, point.y, radius * 3.5, 0, Math.PI * 2);
          context.fillStyle = `rgba(14, 165, 233, ${alpha * 0.08})`;
          context.fill();
        }

        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fillStyle =
          particle.phase % 2 > 1
            ? `rgba(165, 243, 252, ${alpha})`
            : `rgba(34, 211, 238, ${alpha})`;
        context.fill();
      }
    };

    const animate = (time: number) => {
      drawField(time, true);
      frameId = window.requestAnimationFrame(animate);
    };

    const rebuildField = () => {
      if (frameId) window.cancelAnimationFrame(frameId);

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = Math.round(canvasWidth * pixelRatio);
      canvas.height = Math.round(canvasHeight * pixelRatio);
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const baseCount = canvasWidth < 768 ? 74 : 310;
      const particleCount = lowPowerDevice ? Math.round(baseCount * 0.62) : baseCount;
      particles = Array.from({ length: particleCount }, () => ({
        progress: Math.random(),
        lane: (Math.random() - 0.5) * 0.34,
        speed: 0.012 + Math.random() * 0.028,
        radius: 0.45 + Math.random() * 1.45,
        alpha: 0.26 + Math.random() * 0.64,
        phase: Math.random() * Math.PI * 4,
      }));

      lastTime = performance.now();
      if (reducedMotion.matches) {
        drawField(lastTime, false);
      } else {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const updateScrollProgress = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
      const progress = maxScroll === 0 ? 0 : Math.min(window.scrollY / maxScroll, 1);
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      cursorX = event.clientX;
      cursorY = event.clientY;
      root.style.setProperty("--cursor-x", `${cursorX}px`);
      root.style.setProperty("--cursor-y", `${cursorY}px`);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (frameId) window.cancelAnimationFrame(frameId);
        frameId = 0;
        return;
      }
      rebuildField();
    };

    updateScrollProgress();
    rebuildField();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", rebuildField);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", rebuildField);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", rebuildField);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", rebuildField);
    };
  }, []);

  return (
    <>
      <div className="site-effects" aria-hidden="true">
        <canvas ref={canvasRef} className="signal-field-canvas" />
        <div className="site-aura" />
        <div className="site-vignette" />
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </>
  );
}
