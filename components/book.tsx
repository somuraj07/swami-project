"use client";

import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/webpack";

type Props = {
  pdfUrl?: string;
  initialPage?: number;
  pageWidth?: number;
};

export default function BookReader({
  pdfUrl = "/book.pdf",
  initialPage = 0,
  pageWidth = 1200,
}: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(initialPage);
  const [flipping, setFlipping] = useState(false);
  const flipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadPDF() {
      setLoading(true);
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const imgs: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) break;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1 });
          const scale = pageWidth / viewport.width;
          const vp = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(vp.width);
          canvas.height = Math.round(vp.height);
          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, viewport: vp, canvas }).promise;
          imgs.push(canvas.toDataURL("image/jpeg", 0.95));
        }
        if (!cancelled) {
          setImages(imgs);
          setCurrentIndex(Math.min(initialPage, imgs.length - 1));
        }
      } catch (err) {
        console.error("PDF load error", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadPDF();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl, pageWidth, initialPage]);

  const flipNext = async () => {
    if (flipping || currentIndex + 1 >= images.length) return;
    setFlipping(true);
    if (flipRef.current) {
      flipRef.current.classList.add("flip-next");
      await new Promise((r) => setTimeout(r, 700));
      flipRef.current.classList.remove("flip-next");
    }
    setCurrentIndex((i) => Math.min(i + 1, images.length - 1));
    setFlipping(false);
  };

  const flipPrev = async () => {
    if (flipping || currentIndex === 0) return;
    setFlipping(true);
    if (flipRef.current) {
      flipRef.current.classList.add("flip-prev");
      await new Promise((r) => setTimeout(r, 700));
      flipRef.current.classList.remove("flip-prev");
    }
    setCurrentIndex((i) => Math.max(i - 1, 0));
    setFlipping(false);
  };

  const currentImg = images[currentIndex] ?? null;

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-start py-12 bg-gradient-to-b from-[#fdf8f0] to-[#fff9f0] relative">
      <style jsx>{`
        .book-container {
          position: relative;
          width: 95%;
          max-width: 1400px;
          min-height: 650px;
          background: linear-gradient(to bottom, #fff8e0, #f7f0d5);
          border-radius: 16px;
          box-shadow: 0 45px 90px rgba(0,0,0,0.22), inset 0 0 25px rgba(0,0,0,0.05);
          overflow: hidden;
          perspective: 1600px;
          border-left: 14px solid #c08b4f;
        }

        .page {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
          position: relative;
          background: #fffdf2;
          border-radius: 12px;
          box-shadow: inset 0 0 12px rgba(0,0,0,0.06);
          padding: 24px;
          overflow: hidden;
        }

        .page img {
          max-width: 95%;
          max-height: 95%;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 36px rgba(0,0,0,0.18);
          border: 2px solid #f2e6d2;
          background: #fffdf2;
        }

        .flip-overlay {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          pointer-events: none;
        }

        .flip-next { animation: flipNext 0.7s forwards; }
        .flip-prev { animation: flipPrev 0.7s forwards; }

        @keyframes flipNext { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(-180deg); } }
        @keyframes flipPrev { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(180deg); } }

        .side-nav {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 20;
          transition: background 0.2s;
        }
        .side-nav:hover { background: rgba(0,0,0,0.08); }

        .left-nav { left: 0; border-radius: 0 8px 8px 0; }
        .right-nav { right: 0; border-radius: 8px 0 0 8px; }

        .nav-arrow {
          font-size: 32px;
          color: #8b5e3c;
          font-weight: bold;
          user-select: none;
        }

        .page-number {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 700;
          color: #8b5e3c;
        }
      `}</style>

      <div className="book-container">
        {loading ? (
          <div className="flex items-center justify-center h-full text-[#8b5e3c] font-semibold text-lg">
            Loading PDF…
          </div>
        ) : (
          <>
            <div className="page" ref={flipRef}>
              {currentImg ? <img src={currentImg} alt={`Page ${currentIndex + 1}`} /> : <div>No page</div>}
            </div>

            {/* Side navigation arrows */}
            <div className="side-nav left-nav" onClick={flipPrev}>
              <span className="nav-arrow">←</span>
            </div>
            <div className="side-nav right-nav" onClick={flipNext}>
              <span className="nav-arrow">→</span>
            </div>

            <div className="page-number">{currentIndex + 1} / {images.length}</div>
          </>
        )}
      </div>
    </div>
  );
}
