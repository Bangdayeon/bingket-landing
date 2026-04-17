'use client';

import { BINGO_NUM, BINGO_THEME } from "@/src/types/bingo";
import { useState } from "react";
import Image from "next/image";
import Button from "../commons/Button";

const GRID_LAYOUT = {
  '2x2': {
    cols: 2,
    rows: 2,
    cellWidth: 147,
    cellHeight: 129,
    left: 12,
    top: 12,
  },
  '3x3': {
    cols: 3,
    rows: 3,
    cellWidth: 97.5,
    cellHeight: 84,
    left: 12,
    top: 12,
  },
} as const;

interface Props {
  bingoNum: BINGO_NUM | null;
  theme: BINGO_THEME | null;

  onSubmit: (data: {
    title: string;
    tasks: string[];
    bingoNum: BINGO_NUM;
    theme: BINGO_THEME;
  }) => void;
}

export default function WriteBingo({
  bingoNum,
  theme,
  onSubmit,
}: Props) {

  const [title, setTitle] = useState("");
  const total = bingoNum === '2x2' ? 4 : 9;
  const [tasks, setTasks] = useState<string[]>(() => Array(total).fill(""));

  const layout = bingoNum ? GRID_LAYOUT[bingoNum] : null;

  const updateTask = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const imageSrc = `/bingo-themes/${theme}_${bingoNum}.png`;

  const handleSubmit = () => {
    if (!bingoNum || !theme) return;

    onSubmit({
      title,
      tasks,
      bingoNum,
      theme,
    });
  };

  const isInvalid =
    !bingoNum ||
    !theme ||
    !title.trim() ||
    tasks.length === 0 ||
    tasks.some(t => !t.trim());

  return (
    <div className="flex flex-col items-center gap-6">

      {/* canvas wrapper (비율 고정) */}
      <div className="relative w-full max-w-[320px] aspect-259/345">

        {/* background image */}
        <Image src={imageSrc} alt="" fill className="object-cover" unoptimized />

        {/* title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하기"
          className="absolute top-[3.5%] left-[4%] w-[75%] text-xs px-2 py-1 bg-white/30 rounded focus:bg-white/50 outline-none"
        />

        {/* grid */}
        <div
          className="absolute top-13 left-3 grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${layout?.cols}, ${layout?.cellWidth}px)`,
            gridTemplateRows: `repeat(${layout?.rows}, ${layout?.cellHeight}px)`,
          }}
        >
          {tasks.map((task, index) => (
            <textarea
              key={index}
              value={task}
              onChange={(e) => updateTask(index, e.target.value)}
              placeholder="할 일 입력하기"
              rows={3}
              className="
                w-full h-full
                bg-white/30
                outline-none
                resize-none
                text-center
                text-sm
                wrap-break-word
                rounded-4xl
                pt-8
                custom-scrollbar
              "
            />
          ))}
        </div>

      </div>

      {/* submit */}
      <Button onClick={handleSubmit} disabled={isInvalid}>빙고 생성</Button>

    </div>
  );
}