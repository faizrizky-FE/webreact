import { useEffect, useRef } from "react";
import "./efek-Cursor.css";

function SolarCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouse = { x: width / 2, y: height / 2 };
    let trail = [];
    let animation;
    let hasPointer = false;
    let lastFrame = performance.now();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      hasPointer = true;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (!hasPointer) {
        animation = requestAnimationFrame(draw);
        return;
      }

      const now = performance.now();
      const elapsed = Math.min(now - lastFrame, 50);
      lastFrame = now;
      trail.forEach((point) => {
        point.age += elapsed;
      });

      const last = trail[0];

      if (!last) {
        trail.unshift({ x: mouse.x, y: mouse.y, age: 0 });
      } else {
        const dx = mouse.x - last.x;
        const dy = mouse.y - last.y;
        const distance = Math.hypot(dx, dy);
        const steps = Math.min(Math.ceil(distance / 3), 100);

        for (let i = 1; i <= steps; i++) {
          const progress = i / steps;
          trail.unshift({
            x: last.x + dx * progress,
            y: last.y + dy * progress,
            age: 0,
          });
        }
      }

      trail = trail.filter((point) => point.age < 1200).slice(0, 180);

      for (let i = 0; i < trail.length - 1; i++) {
        const current = trail[i];
        const next = trail[i + 1];

        const progress = i / trail.length;
        const opacity =
          0.58 * (1 - progress) ** 1.4 * (1 - current.age / 850);

        ctx.beginPath();
        ctx.moveTo(current.x, current.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = `rgba(151, 202, 255, ${opacity})`;
        ctx.lineWidth = 12 * (1 - progress) + 0.5;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      const cursorGradient = ctx.createRadialGradient(
        mouse.x - 2,
        mouse.y - 2,
        1,
        mouse.x,
        mouse.y,
        15
      );

      cursorGradient.addColorStop(0, "#ffffff");
      cursorGradient.addColorStop(0.35, "#d2ecff");
      cursorGradient.addColorStop(1, "#9acfff");

      ctx.save();
      ctx.shadowBlur = 14;
      ctx.shadowColor = "rgba(117, 190, 255, 0.6)";
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = cursorGradient;
      ctx.fill();
      ctx.restore();

      animation = requestAnimationFrame(draw);
    };

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);

    animation = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={canvasRef} className="solar-cursor" />;
}

export default SolarCursor;
