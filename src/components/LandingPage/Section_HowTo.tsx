import FadeInUp from "../commons/FadeInUp"

const steps = [
  {
    number: "01",
    title: "앱 무료 다운로드",
    desc: "App Store·Google Play에서 '빙킷' 검색 후 무료 설치. 구글·카카오·애플·이메일로 30초면 가입 완료.",
  },
  {
    number: "02",
    title: "나만의 빙고판 만들기",
    desc: "테마·기간·크기(3×3~4×4) 설정 후 각 칸에 목표 입력. 투두리스트용, 버킷리스트용, 여러 개 동시 관리 가능.",
  },
  {
    number: "03",
    title: "채우고, 이기고, 자랑하기",
    desc: "완료한 칸을 터치해 기록하세요. 친구에게 대결을 신청하거나 커뮤니티에 공유하며 더 즐겁게 목표를 이루세요.",
  },
]

export default function Section_HowTo() {
  return (
    <section className="w-full bg-white py-24 flex flex-col items-center px-6">
      <FadeInUp>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">3단계로 시작하는 빙킷</h2>
        <p className="text-gray-500 text-center mb-14 md:text-lg">지금 당장 시작해도 5분이면 충분해요</p>
      </FadeInUp>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        {steps.map((step) => (
          <FadeInUp key={step.number}>
            <div className="flex-1 flex flex-col gap-3 bg-linear-to-br from-[#E8FAFE] to-[#F2FDE8] rounded-2xl p-7">
              <span className="text-4xl font-black bg-linear-to-tr from-[#28C8DE] to-[#6ADE50] bg-clip-text text-transparent">{step.number}</span>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </FadeInUp>
        ))}
      </div>
    </section>
  )
}
