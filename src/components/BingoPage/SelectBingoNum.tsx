'use client';
import { BINGO_NUM } from "@/src/types/bingo";

interface Props {
  onSelect: (num: BINGO_NUM) => void;
}

export default function SelectBingoNum({ onSelect }: Props) {
  return (
    <div className="flex flex-col gap-6 items-center">

      {/* 선택 버튼 */}
      <div className="flex gap-5">

        {/* 2x2 */}
        <button
          className="w-45 h-55 bg-[#BCF0FA] flex flex-col gap-3 rounded-lg p-3 cursor-pointer hover:bg-[#86E4F5] transition-colors"
          onClick={() => onSelect('2x2')}
        >
          <span className="text-md font-medium">2x2 빙고</span>

          <div className="grid grid-cols-2 gap-1.5 flex-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-white rounded-sm" />
            ))}
          </div>
        </button>

        {/* 3x3 */}
        <button
          className="w-45 h-55 bg-[#BCF0FA] flex flex-col gap-3 rounded-lg p-3 cursor-pointer hover:bg-[#86E4F5] transition-colors"
          onClick={() => onSelect('3x3')}
        >
          <span className="text-md font-medium">3x3 빙고</span>

          <div className="grid grid-cols-3 gap-1.5 flex-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-white rounded-sm" />
            ))}
          </div>
        </button>

      </div>
    </div>
  );
}