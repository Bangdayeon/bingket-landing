'use client';

import SelectBingoNum from "@/src/components/BingoPage/SelectBingoNum";
import SelectTheme from "@/src/components/BingoPage/SelectTheme";
import WriteBingo from "@/src/components/BingoPage/WriteBingo";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import CompleteBingo from "@/src/components/BingoPage/CompleteBingo";
import { BINGO_NUM, BINGO_THEME, BingoData } from "@/src/types/bingo";

type STEP = 'selectNum' | 'selectTheme' | 'write';

const STEP_UI = {
  selectNum: {
    title: "빙고 칸 개수를 선택해주세요",
    subtitle: "* 빙고 완성 후 수정이 불가능해요",
  },
  selectTheme: {
    title: "테마를 선택해주세요",
    subtitle: "* 빙고 완성 후에도 얼마든지 수정할 수 있어요",
  },
  write: {
    title: "제목과 내용을 입력해주세요",
    subtitle: "* 빙고 완성 후에도 얼마든지 수정할 수 있어요",
  },
} as const;

export default function Bingo() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const step = (searchParams.get('step') as STEP) ?? 'selectNum';
  const bingoNum = searchParams.get('num') as BINGO_NUM | null;
  const theme = searchParams.get('theme') as BINGO_THEME | null;

  const ui = STEP_UI[step];

  const [savedBingo, setSavedBingo] = useState<BingoData | null>(() => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem("bingo");
    return data ? JSON.parse(data) : null;
  });

  const handleReset = () => {
    localStorage.removeItem("bingo");
    setSavedBingo(null);
    router.push("/bingo?step=selectNum");
  };

  const handleUpdate = (data: BingoData) => {
    setSavedBingo(data);
    localStorage.setItem("bingo", JSON.stringify(data));
  };

  const handleBack = () => {
    router.back();
  };

  // 빙고 완성 후 URL 정리 (쿼리파라미터 제거)
  useEffect(() => {
    if (savedBingo) router.replace("/bingo");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================
  // 1. 완성된 빙고 화면
  // =========================
  if (savedBingo) {
    return <CompleteBingo savedBingo={savedBingo} handleReset={handleReset} onUpdate={handleUpdate}/>;
  }

  // =========================
  // 2. 생성 flow
  // =========================
  return (
    <div className="flex flex-col items-center flex-1 w-full">

      <h1 className="mt-10 text-3xl font-bold text-[#0C3803]">
        오늘의 빙고
      </h1>

      <p className="mt-4 mb-10 text-gray-600">
        오늘 할 일을 담은 빙고를 만들어보세요.
      </p>

      <div className="relative flex flex-col items-center w-full max-w-xl bg-white/80 rounded-4xl py-10">

        {/* back */}
        {step !== 'selectNum' && (
          <button
            className="absolute top-5 left-5"
            onClick={handleBack}
          >
            <Image src="/images/arrow_back.png" alt="" width={24} height={24} />
          </button>
        )}

        {/* header */}
        <div className="flex flex-col items-center mb-8">
          <span className="text-lg md:text-2xl font-semibold text-center">
            {ui.title}
          </span>

          <span className="text-sm text-gray-500 text-center">
            {ui.subtitle}
          </span>
        </div>

        {/* body */}
        <div className="w-full max-w-lg">

          {step === 'selectNum' && (
            <SelectBingoNum
              onSelect={(num) => {
                router.push(`/bingo?step=selectTheme&num=${num}`);
              }}
            />
          )}

          {step === 'selectTheme' && (
            <SelectTheme
              bingoNum={bingoNum!}
              onSelect={(t) => {
                router.push(`/bingo?step=write&num=${bingoNum}&theme=${t}`);
              }}
            />
          )}

          {step === 'write' && (
            <WriteBingo
              key={`${bingoNum}-${theme}`} // 빙고 번호나 테마가 바뀔 때마다 컴포넌트 초기화
              bingoNum={bingoNum}
              theme={theme}
              onSubmit={(data) => {
                localStorage.setItem("bingo", JSON.stringify(data));
                setSavedBingo(data);
              }}
            />
          )}

        </div>
      </div>
    </div>
  );
}