'use client'

import { useState } from "react"

const faqs = [
  {
    q: "빙킷(Bingket)은 어떤 앱인가요?",
    a: "빙킷은 할 일과 버킷리스트를 빙고판 형태로 관리하는 무료 라이프스타일 앱입니다. 목표를 빙고 칸에 입력하고 하나씩 달성하면서 빙고를 완성해가는 방식으로, 친구와의 1대1 대결과 커뮤니티 기능이 목표 달성 동기를 더욱 높여줘요.",
  },
  {
    q: "빙킷은 무료인가요?",
    a: "네, 빙킷은 iOS 앱스토어와 구글 플레이스토어에서 완전 무료로 다운로드하고 사용할 수 있어요. 빙고판 생성, 친구 대결, 커뮤니티 활동, 뱃지 시스템 모두 무료입니다.",
  },
  {
    q: "어떤 기기에서 사용할 수 있나요?",
    a: "iPhone·iPad(iOS)와 Android 기기 모두 지원합니다. Apple App Store와 Google Play Store에서 각각 무료로 다운로드할 수 있어요.",
  },
  {
    q: "빙고 대결 기능이 무엇인가요?",
    a: "친구와 1대1로 같은 기간 동안 빙고 달성률을 겨루는 기능이에요. 내기를 걸고 대결을 신청하면 상대가 수락했을 때 시작되며, 더 많은 빙고를 달성한 사람이 이기는 건강한 경쟁으로 목표를 끝까지 이어갈 이유가 생겨요.",
  },
  {
    q: "친구와 함께 사용하려면 어떻게 하나요?",
    a: "앱에서 아이디 또는 이름으로 친구를 검색하고 친구 요청을 보내면 됩니다. 상대가 수락하면 친구가 되어 빙고 대결을 신청할 수 있고, 커뮤니티에서도 서로의 목표 달성 과정을 공유하고 응원할 수 있어요.",
  },
  {
    q: "커뮤니티에서 어떤 활동을 할 수 있나요?",
    a: "나의 빙고판과 목표 달성 과정을 글·이미지로 공유할 수 있어요. 익명 또는 아이디 공개 중 선택할 수 있고, 댓글·대댓글로 소통하면서 다른 사람의 빙고 아이디어에서 영감을 얻을 수도 있습니다.",
  },
  {
    q: "뱃지는 어떻게 받을 수 있나요?",
    a: "빙고 달성 횟수, 커뮤니티 좋아요·댓글 횟수, 대결 참여 횟수 등 특정 활동 기준을 달성할 때마다 뱃지가 자동으로 지급돼요. 차곡차곡 모인 뱃지가 내가 얼마나 꾸준했는지 보여주는 성장 기록이 됩니다.",
  },
  {
    q: "빙고판을 몇 개나 만들 수 있나요?",
    a: "여러 개를 동시에 만들고 관리할 수 있어요. 3×3, 4×3, 4×4 크기 중 선택하고 테마와 목표 기간을 각각 설정할 수 있어서 투두리스트용, 버킷리스트용, 단기·장기 목표용으로 나눠서 활용하기 좋아요.",
  },
  {
    q: "일반 투두 앱이나 습관 관리 앱과 어떻게 다른가요?",
    a: "단순한 체크리스트가 아닌 빙고 달성의 성취감, 친구와의 1대1 대결, 커뮤니티 공유, 뱃지 수집 등 목표를 포기하지 않도록 설계된 동기부여 요소들이 있어요. 재미없어서 못 지켰던 습관을 다시 시작하게 만들어줄 거예요.",
  },
  {
    q: "어떤 방법으로 로그인할 수 있나요?",
    a: "구글, 카카오, 애플, 이메일 총 4가지 방법으로 로그인할 수 있어요. 로그인 없이도 미완성 빙고를 기기에 저장해 기본 기능을 사용해볼 수 있습니다.",
  },
]

export default function Section_FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">자주 묻는 질문</h2>
      <dl className="flex flex-col divide-y divide-gray-100">
        {faqs.map(({ q, a }, i) => (
          <div key={q}>
            <dt>
              <button
                className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-base md:text-lg font-semibold">{q}</span>
                <svg
                  width="20" height="20" viewBox="0 0 20 20" fill="none"
                  className={`shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                >
                  <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </dt>
            <dd
              className={`overflow-hidden transition-all duration-200 ease-in-out ${openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'}`}
            >
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
