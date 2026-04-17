'use client';
import { BINGO_NUM, BINGO_THEME } from "@/src/types/bingo";
import Image from "next/image";

const ThemeButton = ({
  theme,
  bingoNum,
  onSelect,
}: {
  theme: BINGO_THEME;
  bingoNum: BINGO_NUM;
  onSelect: (theme: BINGO_THEME) => void;
}) => {
  const imageMap = {
    default: "/bingo-themes/default",
    rabbit: "/bingo-themes/rabbit",
    pig: "/bingo-themes/pig",
  };

  const imgSrc = `${imageMap[theme]}_${bingoNum}.png`;

  return (
    <button
      className='flex flex-col gap-2 rounded-lg cursor-pointer hover:scale-105 transition-transform'
      onClick={() => onSelect(theme)}
    >
      <span className="font-medium">
        {theme === 'default' ? '기본' : theme === 'rabbit' ? '토끼' : '돼지'}
      </span>

      <Image src={imgSrc} alt={theme} width={160} height={200} className="object-contain" unoptimized />
    </button>
  );
};

interface Props {
  bingoNum: BINGO_NUM;
  onSelect: (theme: BINGO_THEME) => void;
}

export default function SelectTheme({ bingoNum, onSelect }: Props) {
  return (
    <div className="flex gap-3">
      <ThemeButton
        theme="default"
        bingoNum={bingoNum}
        onSelect={onSelect}
      />

      <ThemeButton
        theme="rabbit"
        bingoNum={bingoNum}
        onSelect={onSelect}
      />

      <ThemeButton
        theme="pig"
        bingoNum={bingoNum}
        onSelect={onSelect}
      />
    </div>
  );
}