'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  FIGMA_W,
  FIGMA_H,
  GRID_CONFIGS,
  getThemeImageUrl,
  getThemeForegroundColor,
} from '@/lib/theme';

interface BingoGridProps {
  cells: string[];
  grid: string;
  title?: string;
  theme?: string;
  compact?: boolean;
}

// 메인 앱 BingoPreview의 TITLE_STYLE 값과 동일 (sm: 카드, md: 상세)
const TITLE_STYLE = {
  sm: { top: 30, left: 30, right: 30, fontSize: 20 },
  md: { top: 48, left: 48, right: 48, fontSize: 18 },
} as const;

export function BingoGrid({ cells, grid, title, theme, compact = false }: BingoGridProps) {
  const [cols, rows] = grid.split('x').map(Number);

  const [image, setImage] = useState<string | null>(null);
  const [fgColor, setFgColor] = useState<string>('#181C1C');

  useEffect(() => {
    if (!theme) return;
    let active = true;
    (async () => {
      const [bg, color] = await Promise.all([
        getThemeImageUrl(theme, grid as '3x3' | '4x3' | '4x4'),
        getThemeForegroundColor(theme),
      ]);
      if (!active) return;
      setImage(bg);
      setFgColor(color);
    })();
    return () => {
      active = false;
    };
  }, [theme, grid]);

  // 테마 배경 이미지 로드 성공 → 이미지 위에 제목/셀 오버레이
  if (image) {
    const cfg = GRID_CONFIGS[grid];
    const ts = TITLE_STYLE[compact ? 'sm' : 'md'];

    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${FIGMA_W} / ${FIGMA_H}` }}>
        <Image src={image} alt={title ?? '빙고판'} fill sizes="(max-width: 512px) calc(100vw - 40px), 472px" className="object-cover" />

        {title && (
          <p
            className="absolute font-semibold line-clamp-2 leading-tight px-1 pt-1"
            style={{
              top: `${(ts.top / FIGMA_H) * 100}%`,
              left: `${(ts.left / FIGMA_W) * 100}%`,
              right: `${(ts.right / FIGMA_W) * 100}%`,
              color: fgColor,
              fontSize: ts.fontSize,
            }}
          >
            {title}
          </p>
        )}

        {cfg &&
          Array.from({ length: cols * rows }).map((_, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            return (
              <div
                key={i}
                className="absolute flex items-center justify-center p-1"
                style={{
                  left: `${((cfg.left + col * (cfg.cellW + cfg.gapX)) / FIGMA_W) * 100}%`,
                  top: `${((cfg.top + row * (cfg.cellH + cfg.gapY)) / FIGMA_H) * 100}%`,
                  width: `${(cfg.cellW / FIGMA_W) * 100}%`,
                  height: `${(cfg.cellH / FIGMA_H) * 100}%`,
                }}
              >
                <span className={`text-center leading-tight text-[#181C1C] line-clamp-2 ${compact ? 'text-[11px]' : 'text-xs'}`}>
                  {cells[i] ?? ''}
                </span>
              </div>
            );
          })}
      </div>
    );
  }

  // fallback: 테마 이미지가 없거나 로드 실패 → 기존 흰색 CSS 그리드
  const gridColsClass: Record<number, string> = { 3: 'grid-cols-3', 4: 'grid-cols-4' };

  return (
    <div className={`w-full rounded-xl overflow-hidden border border-[#D2D6D6] bg-[#F7FFFE] ${compact ? 'p-2' : 'p-3'}`}>
      {title && (
        <p className={`font-semibold text-center text-[#181C1C] mb-2 truncate ${compact ? 'text-[20px] px-2 pt-1.5 pb-0.5' : 'text-sm'}`}>
          {title}
        </p>
      )}
      <div className={`grid ${gridColsClass[cols] ?? 'grid-cols-3'} gap-1`}>
        {cells.map((cell, i) => (
          <div
            key={i}
            className={`aspect-square rounded-md border border-[#D2D6D6] bg-white flex items-center justify-center ${compact ? 'p-1' : 'p-1.5'}`}
          >
            <span className={`text-center leading-tight text-[#181C1C] line-clamp-2 ${compact ? 'text-[11px]' : 'text-[10px]'}`}>
              {cell}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
