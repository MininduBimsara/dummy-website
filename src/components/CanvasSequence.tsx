"use client";

import { useMotionValueEvent, MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface CanvasSequenceProps {
  progress: MotionValue<number>;
  frameCount: number;
}

export default function CanvasSequence({
  progress,
  frameCount,
}: Readonly<CanvasSequenceProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Array<HTMLImageElement | undefined>>([]);
  const loadedCountRef = useRef(0);
  const loadTextRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const drawImageCover = useCallback(
    (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [],
  );

  const loadFrame = useCallback(
    (index: number, highPriority = false) => {
      if (index < 0 || index >= frameCount) {
        return;
      }

      if (imagesRef.current[index]) {
        return;
      }

      const img = new globalThis.Image();
      img.decoding = "async";
      if (highPriority) {
        img.fetchPriority = "high";
      }

      const paddedIndex = (index + 1).toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${paddedIndex}.png`;

      img.onload = () => {
        imagesRef.current[index] = img;
        loadedCountRef.current += 1;

        if (loadedCountRef.current === frameCount) {
          setImagesLoaded(loadedCountRef.current);
        } else if (loadedCountRef.current % 4 === 0) {
          if (loadTextRef.current) {
            loadTextRef.current.innerText = `SYSTEM INITIALIZING... ${Math.round((loadedCountRef.current / frameCount) * 100)}%`;
          }
        }

        if (index === 0 && canvasRef.current) {
          drawImageCover(img, canvasRef.current);
        }
      };
    },
    [drawImageCover, frameCount],
  );

  const drawFrame = useCallback(
    (frameIndex: number) => {
      if (!canvasRef.current) {
        return;
      }

      const img = imagesRef.current[frameIndex];
      if (!img?.complete) {
        return;
      }

      drawImageCover(img, canvasRef.current);
    },
    [drawImageCover],
  );

  const warmFramesAround = useCallback(
    (frameIndex: number) => {
      const preloadRadius = 8;
      for (
        let i = frameIndex - preloadRadius;
        i <= frameIndex + preloadRadius;
        i++
      ) {
        if (i === frameIndex) {
          loadFrame(i, true);
        } else {
          loadFrame(i);
        }
      }
    },
    [loadFrame],
  );

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    imagesRef.current = new Array(frameCount);
    loadedCountRef.current = 0;

    // Ensure first frame appears ASAP, then stream the rest in small batches.
    loadFrame(0, true);

    let nextIndex = 1;
    const queueBackgroundBatch = () => {
      if (cancelled) {
        return;
      }

      let loadedInBatch = 0;
      while (nextIndex < frameCount && loadedInBatch < 4) {
        loadFrame(nextIndex);
        nextIndex += 1;
        loadedInBatch += 1;
      }

      if (nextIndex < frameCount) {
        timer = globalThis.setTimeout(queueBackgroundBatch, 80);
      }
    };

    timer = globalThis.setTimeout(queueBackgroundBatch, 200);

    return () => {
      cancelled = true;
      if (timer) {
        clearTimeout(timer);
      }
      for (const img of imagesRef.current) {
        if (img) {
          img.onload = null;
        }
      }
      imagesRef.current = [];
    };
  }, [frameCount, loadFrame]);

  const resizeCanvas = useCallback(() => {
    if (canvasRef.current?.parentElement) {
      // Use offsetWidth and offsetHeight for High DPI devices if needed
      canvasRef.current.width = canvasRef.current.parentElement.clientWidth;
      canvasRef.current.height = canvasRef.current.parentElement.clientHeight;

      const frameIndex = Math.max(
        0,
        Math.min(frameCount - 1, Math.floor(progress.get() * frameCount)),
      );
      drawFrame(frameIndex);
    }
  }, [drawFrame, frameCount, progress]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const rafRef = useRef<number | null>(null);

  useMotionValueEvent(progress, "change", (latest) => {
    if (!canvasRef.current) return;

    const frameIndex = Math.max(
      0,
      Math.min(frameCount - 1, Math.floor(latest * (frameCount - 1))),
    );

    warmFramesAround(frameIndex);

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      drawFrame(frameIndex);
      rafRef.current = null;
    });
  });

  return (
    <div className="relative w-full h-full bg-[#000000]">
      {imagesLoaded < frameCount && (
        <div
          ref={loadTextRef}
          className="absolute inset-0 flex items-center justify-center text-white/40 z-10 pointer-events-none transition-opacity duration-500 font-mono text-sm tracking-widest backdrop-blur-sm"
        >
          SYSTEM INITIALIZING... {Math.round((imagesLoaded / frameCount) * 100)}
          %
        </div>
      )}
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
