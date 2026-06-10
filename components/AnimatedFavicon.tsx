"use client";

import { useEffect } from "react";

const FAVICON_SIZE = 32;
const CYCLE_MS = 2400;
const UPDATE_INTERVAL_MS = 60;
const FAVICON_SRC = "/Fav-2.png";
const COLUMN_COUNT = 3;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawAnimatedBars(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  size: number,
  time: number,
) {
  ctx.clearRect(0, 0, size, size);

  const containScale = Math.min(size / img.width, size / img.height);
  const drawWidth = img.width * containScale;
  const drawHeight = img.height * containScale;
  const offsetX = (size - drawWidth) / 2;
  const offsetY = (size - drawHeight) / 2;

  const colSrcWidth = img.width / COLUMN_COUNT;
  const colDestWidth = drawWidth / COLUMN_COUNT;
  const phaseStep = (Math.PI * 2) / COLUMN_COUNT;

  for (let i = 0; i < COLUMN_COUNT; i += 1) {
    const scaleY = 0.84 + Math.sin(time + i * phaseStep) * 0.16;
    const sx = i * colSrcWidth;
    const dx = offsetX + i * colDestWidth;
    const pivotX = dx + colDestWidth / 2;
    const pivotY = offsetY + drawHeight;

    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.scale(1, scaleY);
    ctx.translate(-pivotX, -pivotY);
    ctx.drawImage(
      img,
      sx,
      0,
      colSrcWidth,
      img.height,
      dx,
      offsetY,
      colDestWidth,
      drawHeight,
    );
    ctx.restore();
  }
}

export default function AnimatedFavicon() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let rafId = 0;
    let lastUpdate = 0;
    const startTime = performance.now();

    const canvas = document.createElement("canvas");
    canvas.width = FAVICON_SIZE;
    canvas.height = FAVICON_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getIconLink = () => {
      let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      return link;
    };

    loadImage(FAVICON_SRC)
      .then((image) => {
        if (cancelled) return;

        const renderFrame = (now: number) => {
          const elapsed = (now - startTime) % CYCLE_MS;
          const time = (elapsed / CYCLE_MS) * Math.PI * 2;

          drawAnimatedBars(ctx, image, FAVICON_SIZE, time);
          getIconLink().href = canvas.toDataURL("image/png");
        };

        const tick = (now: number) => {
          if (cancelled) return;
          if (now - lastUpdate >= UPDATE_INTERVAL_MS) {
            lastUpdate = now;
            renderFrame(now);
          }
          rafId = requestAnimationFrame(tick);
        };

        renderFrame(performance.now());
        rafId = requestAnimationFrame(tick);
      })
      .catch(() => {
        // Keep the static favicon from metadata if the asset fails to load.
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
