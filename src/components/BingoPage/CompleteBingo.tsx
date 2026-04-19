'use client';

import { BingoData, BINGO_THEME } from "@/src/types/bingo";
import { useState } from "react";
import Image from "next/image";
import Button from "../commons/Button";
import Footer from "./Footer";

interface Props {
  savedBingo: BingoData | null;
  handleReset: () => void;
  onUpdate: (data: BingoData) => void;
}

const themeList: BINGO_THEME[] = ['default', 'rabbit', 'pig'];

export default function CompleteBingo({
  savedBingo,
  handleReset,
  onUpdate,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<BingoData | null>(savedBingo);
  const [showResetModal, setShowResetModal] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() =>
    Array(savedBingo?.tasks.length ?? 0).fill(false)
  );

  function toggleCheck(index: number) {
    setChecked(prev => prev.map((v, i) => i === index ? !v : v));
  }

  if (!savedBingo || !draft) {
    return (
      <div className="flex flex-col gap-6 items-center">
        <h1 className="mt-10 text-2xl font-bold text-[#0C3803]">
          저장된 빙고가 없어요
        </h1>

        <Button onClick={handleReset}>빙고 만들러 가기</Button>
      </div>
    );
  }

  const gridSize = draft.bingoNum === '2x2' ? 2 : 3;
  const imageSrc = `/bingo-themes/${draft.theme}_${draft.bingoNum}.png`;

  const updateTask = (index: number, value: string) => {
    const newTasks = [...draft.tasks];
    newTasks[index] = value;

    setDraft({
      ...draft,
      tasks: newTasks,
    });
  };

  const handleSave = () => {
    if (!draft) return;

    localStorage.setItem("bingo", JSON.stringify(draft));
    onUpdate(draft);
    setIsEditing(false);
  };

  return (
    <div className="relative flex flex-col items-center gap-6 w-full pb-80">

      {/* header */}
      <div className="flex flex-col items-center gap-1 mt-5">
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-3">
            <h1 className="text-2xl font-bold text-[#0C3803]">
              오늘의 빙고
            </h1>
            {!isEditing ? (
              <Button size="sm" variant="secondary" onClick={() => setIsEditing(true)}>편집</Button>
            ) : (
              <Button size="sm" onClick={handleSave}>저장</Button>
            )}
          </div>
          <div className="flex flex-col items-center justify-center text-gray-600 text-sm">
            <p>오늘 하루 이룰 일을 작성해봐요</p>
            <p>작성한 내용은 내 컴퓨터에만 저장돼요</p>
            <p>빙고 내용을 지우고 싶다면 &apos;새로 만들기&apos; 버튼을 눌러주세요</p>
          </div>

        </div>

        {/* THEME SELECT (edit only) */}
        {isEditing && (
          <div className="flex gap-2">
            {themeList.map((theme) => (
              <button
                key={theme}
                onClick={() =>
                  setDraft({ ...draft, theme })
                }
                className={`px-2 py-1 text-xs rounded cursor-pointer hover:bg-green-500 transition-all ${
                  draft.theme === theme
                    ? "bg-green-600 text-white"
                    : "bg-white/50"
                }`}
              >
                {(theme==='default' && '기본') ||
                (theme==='rabbit' && '토끼') ||
                (theme==='pig' && '돼지')}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* canvas */}
      <div className="relative w-full max-w-120 aspect-259/345">

        <Image src={imageSrc} alt="" fill className="object-cover" unoptimized />

        {/* TITLE */}
        {isEditing ? (
          <input
            value={draft.title}
            onChange={(e) =>
              setDraft({ ...draft, title: e.target.value })
            }
            className="absolute top-[3%] left-[4%] w-[60%] text-2xl font-semibold bg-white/40"
          />
        ) : (
          <div className="absolute top-[3%] left-[4%] text-2xl font-semibold">
            {draft.title}
          </div>
        )}

        {/* GRID */}
        <div
          className="absolute"
          style={{
            top: "13%",
            left: "3.7%",
            right: "3.7%",
            bottom: "26%",
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            gap: "2%",
          }}
        >
          {draft.tasks.map((t, i) =>
            isEditing ? (
              <textarea
                key={i}
                value={t}
                onChange={(e) => updateTask(i, e.target.value)}
                placeholder="할 일 입력하기"
                rows={3}
                className="
                  w-full h-full
                  bg-white/30
                  outline-none
                  resize-none
                  text-center
                  text-md
                  wrap-break-word
                  rounded-4xl
                  pt-8
                  custom-scrollbar
                "
              />
            ) : (
              <div
                key={i}
                className="relative flex items-center justify-center text-md text-center wrap-break-word cursor-pointer select-none"
                onClick={() => toggleCheck(i)}
              >
                {t}
                {checked[i] && (
                  <Image src={`/bingo-themes/${draft.theme}_check.png`} alt="check" fill className="object-contain pointer-events-none" unoptimized />
                )}
              </div>
            )
          )}
        </div>

      </div>

      {/* reset */}
      <Button onClick={() => setShowResetModal(true)}>새로 만들기</Button>

      <Footer/>

      {/* reset confirm modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowResetModal(false)}/>
          <div className="relative bg-white rounded-2xl px-8 py-7 flex flex-col items-center gap-5 max-w-xs w-full mx-4 shadow-xl">
            <p className="text-center text-gray-800 font-medium leading-relaxed whitespace-pre-line">
              {"새로 만들면 현재 빙고는 사라집니다.\n정말로 새로운 빙고를 만들까요?"}
            </p>
            <div className="flex gap-3 w-full">
              <Button variant="secondary" className="w-34" onClick={() => setShowResetModal(false)}>그냥 두기</Button>
              <Button className="w-34" onClick={() => { setShowResetModal(false); handleReset(); }}>새로 만들기</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}