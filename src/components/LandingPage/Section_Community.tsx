'use client'

import { useRouter } from "next/navigation"
import FadeInUp from "../commons/FadeInUp"
import Button from "../commons/Button"

const themes = [
  {
    emoji: "✨",
    title: "꿈이 있는 사람들의 빙고판이 궁금하다면",
    desc: '누군가의 버킷리스트를 구경하다 "나도 이거 해보고 싶었는데"가 나오는 순간이 있어요. 열정적인 사람들의 빙고판을 보고, 비슷한 목표를 향해가는 사람들과 함께 꿈을 키워보세요.',
  },
  {
    emoji: "🌱",
    title: "아무것도 하기 싫고 의욕도 없을 때",
    desc: "오늘 뭘 해야 할지도 모르겠고, 뭔가를 해야 한다는 압박도 싫을 때. 그냥 사람들이 어떤 빙고를 만드는지 훑어보세요. 마음에 드는 게 있다면, 빙고 하나 만들어서 딱 한 칸만.",
  },
]

export default function Section_Community() {
  const router = useRouter()

  return (
    <section className="w-full bg-white py-24 flex flex-col items-center px-6">
      <FadeInUp>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">"오늘 뭐하지" 싶을 때, 여기서 시작해요</h2>
        <p className="text-gray-500 text-center mb-14 md:text-lg">비슷한 목표를 향해가는 사람들이 모여 있어요</p>
      </FadeInUp>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mb-10">
        {themes.map((theme) => (
          <FadeInUp key={theme.title}>
            <div className="flex-1 flex flex-col gap-3 bg-linear-to-br from-[#E8FAFE] to-[#F2FDE8] rounded-2xl p-7">
              <span className="text-4xl">{theme.emoji}</span>
              <h3 className="text-lg font-bold">{theme.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{theme.desc}</p>
            </div>
          </FadeInUp>
        ))}
      </div>
      <FadeInUp>
        <Button variant="dark" onClick={() => router.push('/lounge')}>
          커뮤니티 둘러보기
        </Button>
      </FadeInUp>
    </section>
  )
}
