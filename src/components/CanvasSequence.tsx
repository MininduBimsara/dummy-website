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
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const drawImageCover = useCallback(
    (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
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

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw background color to blend seamlessly if it's not a perfect fit or if transparent
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [],
  );

  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${paddedIndex}.png`;
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        setImagesLoaded(loadedCount);
        // initial draw when the first frame loads
        if (i === 1 && canvasRef.current) {
          drawImageCover(img, canvasRef.current);
        }
      };
      loadedImages.push(img);
    }
    if (isMounted) {
      setImages(loadedImages);
    }

    return () => {
      isMounted = false;
      for (const img of loadedImages) {
        img.onload = null;
      }
    };
  }, [drawImageCover, frameCount]);

  const resizeCanvas = useCallback(() => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      // Use offsetWidth and offsetHeight for High DPI devices if needed
      canvasRef.current.width = canvasRef.current.parentElement.clientWidth;
      canvasRef.current.height = canvasRef.current.parentElement.clientHeight;

      const frameIndex = Math.max(
        0,
        Math.min(frameCount - 1, Math.floor(progress.get() * frameCount)),
      );
      if (images[frameIndex] && images[frameIndex].complete) {
        drawImageCover(images[frameIndex], canvasRef.current);
      }
    }
  }, [drawImageCover, frameCount, images, progress]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useMotionValueEvent(progress, "change", (latest) => {
    if (images.length === 0 || !canvasRef.current) return;

    const frameIndex = Math.max(
      0,
      Math.min(frameCount - 1, Math.floor(latest * (frameCount - 1))),
    );

    const img = images[frameIndex];
    if (img && img.complete) {
      requestAnimationFrame(() => {
        if (canvasRef.current) {
          drawImageCover(img, canvasRef.current);
        }
      });
    }
  });

  return (
    <div className="relative w-full h-full bg-[#000000]">
      {imagesLoaded < frameCount && (
        <div className="absolute inset-0 flex items-center justify-center text-white/40 z-10 pointer-events-none transition-opacity duration-500 font-mono text-sm tracking-widest backdrop-blur-sm">
          SYSTEM INITIALIZING... {Math.round((imagesLoaded / frameCount) * 100)}
          %
        </div>
      )}
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
