import { useEffect, useRef } from 'react';
import { useSortContext } from '../contexts/SortContext';

export const TWEEN_MS = 600;
const easeInOutQuad = t =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const SortCanvas = () => {
  const canvasRef = useRef(null);
  const { steps, currentStep, numbers, isPlaying } = useSortContext();

  const prevStepRef = useRef(-1);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (steps.length === 0) {
      drawInitial(ctx, canvas, numbers);
      return;
    }

    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    if (!isPlaying || currentStep >= steps.length) {
      drawStep(ctx, canvas, steps[currentStep] ?? steps.at(-1), numbers, true);
      prevStepRef.current = currentStep;
      return;
    }

    const from =
      prevStepRef.current === -1
        ? numbers
        : steps[prevStepRef.current]?.array ?? numbers;
    const to = steps[currentStep];
    const start = performance.now();

    const animate = now => {
      const p = easeInOutQuad(Math.min(1, (now - start) / TWEEN_MS));
      drawTween(ctx, canvas, from, to, numbers, p);
      if (p < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        prevStepRef.current = currentStep;
      }
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [steps, currentStep, numbers, isPlaying]);

  const setCanvas = (ctx, canvas) => {
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    if (
      canvas.width !== r.width * dpr ||
      canvas.height !== r.height * dpr
    ) {
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
    }
    if (ctx.resetTransform) ctx.resetTransform();
    else ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    return r;
  };

  const clear = (ctx, r) => ctx.clearRect(0, 0, r.width, r.height);

  const drawInitial = (ctx, c, arr) => {
    const r = setCanvas(ctx, c);
    clear(ctx, r);
    renderBars(ctx, r, arr, arr, arr, { description: 'Ready to start sorting…' });
  };

  const drawStep = (ctx, c, step, base, final = false) => {
    const r = setCanvas(ctx, c);
    clear(ctx, r);
    renderBars(ctx, r, step.array, step.array, base, step, final);
  };

  const drawTween = (ctx, c, from, toStep, base, prog) => {
    const r = setCanvas(ctx, c);
    clear(ctx, r);
    const w = (r.width - 40) / toStep.array.length;
    const targets = new Map();
    toStep.array.forEach((v, i) => {
      (targets.get(v) || targets.set(v, []).get(v)).push(20 + i * w);
    });
    const layout = from.map((v, i) => {
      const x0 = 20 + i * w;
      const xs = targets.get(v);
      const x1 = xs?.length ? xs.shift() : x0;
      return { value: v, x: x0 + (x1 - x0) * prog };
    });
    renderBars(ctx, r, layout, toStep.array, base, toStep, false, true);
  };

  const renderBars = (ctx, r, layout, logical, base, meta, final = false, customX = false) => {
    const max = Math.max(...base);
    const w = (r.width - 40) / logical.length;
    const hMax = r.height - 100;

    layout.forEach((item, idx) => {
      const v = customX ? item.value : item;
      const x = customX ? item.x : 20 + idx * w;
      const bh = (v / max) * hMax;
      const y = r.height - 40 - bh;

      const { fill, border, glow, blur } = pick(meta, idx, final);
      if (blur) {
        ctx.shadowColor = glow;
        ctx.shadowBlur = blur;
      }

      const g = ctx.createLinearGradient(x, y, x, y + bh);
      g.addColorStop(0, fill);
      g.addColorStop(0.7, fill);
      g.addColorStop(1, border);
      ctx.fillStyle = g;
      ctx.fillRect(x + 2, y, w - 4, bh);
      ctx.shadowBlur = 0;
      ctx.lineWidth = blur ? 3 : 2;
      ctx.strokeStyle = border;
      ctx.strokeRect(x + 2, y, w - 4, bh);

      const fs = Math.min(16, w / 2, bh / 2.5);
      ctx.font = `bold ${fs}px system-ui,-apple-system,sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.shadowColor = 'rgba(0,0,0,.8)';
      ctx.shadowBlur = blur ? 4 : 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      if (bh > 30 && fs > 10) {
        ctx.fillText(`${v}`, x + w / 2, y + bh / 2);
      } else {
        ctx.fillStyle = '#1f2937';
        ctx.shadowBlur = 0;
        ctx.textBaseline = 'top';
        ctx.font = `bold ${Math.min(12, w / 2)}px system-ui,-apple-system,sans-serif`;
        ctx.fillText(`${v}`, x + w / 2, r.height - 32);
      }

      ctx.shadowBlur = 0;
    });

    // ✅ Simple font, math-related emoji, and spacing from bars
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.shadowColor = 'rgba(255,255,255,.8)';
    ctx.shadowBlur = 1;
    let d = meta.description || '';
    if (final) d = `∑ ${d} — Sorting Complete!`;
    ctx.fillText(d, 20, 40); // Top margin so it doesn’t touch bars
    ctx.shadowBlur = 0;
  };

  const pick = (step, i, final) => {
    let fill = '#6366f1',
      border = '#4f46e5',
      glow = 'rgba(99,102,241,.3)',
      blur = 0;
    if (step.comparing?.includes(i)) {
      fill = '#fbbf24';
      border = '#d97706';
      glow = 'rgba(251,191,36,.8)';
      blur = 20;
    } else if (step.swapping?.includes(i)) {
      fill = '#f87171';
      border = '#dc2626';
      glow = 'rgba(248,113,113,.9)';
      blur = 25;
    } else if (step.sorted?.includes(i) || final) {
      fill = '#34d399';
      border = '#059669';
      glow = 'rgba(52,211,153,.7)';
      blur = 15;
    } else if (step.pivot === i) {
      fill = '#a78bfa';
      border = '#7c3aed';
      glow = 'rgba(167,139,250,.8)';
      blur = 18;
    }
    if (step.swapping?.includes(i)) {
      blur = Math.sin(Date.now() * 0.01) * 5 + blur;
    }
    return { fill, border, glow, blur };
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl shadow-2xl border border-indigo-100 dark:border-gray-700 p-6">
      <canvas ref={canvasRef} className="w-full h-[28rem] lg:h-[32rem] rounded-xl" />
    </div>
  );
};

export default SortCanvas;
