interface BingoGridProps {
  cells: string[];
  grid: string;
  title?: string;
  compact?: boolean;
}

export function BingoGrid({ cells, grid, title, compact = false }: BingoGridProps) {
  const [cols] = grid.split('x').map(Number);
  const gridColsClass: Record<number, string> = { 3: 'grid-cols-3', 4: 'grid-cols-4' };

  return (
    <div className={`w-full rounded-xl overflow-hidden border border-[#D2D6D6] bg-[#F7FFFE] ${compact ? 'p-2' : 'p-3'}`}>
      {title && (
        <p className={`font-semibold text-center text-[#181C1C] mb-2 truncate ${compact ? 'text-xs' : 'text-sm'}`}>
          {title}
        </p>
      )}
      <div className={`grid ${gridColsClass[cols] ?? 'grid-cols-3'} gap-1`}>
        {cells.map((cell, i) => (
          <div
            key={i}
            className={`aspect-square rounded-md border border-[#D2D6D6] bg-white flex items-center justify-center ${compact ? 'p-1' : 'p-1.5'}`}
          >
            <span className={`text-center leading-tight text-[#181C1C] line-clamp-2 ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
              {cell}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
