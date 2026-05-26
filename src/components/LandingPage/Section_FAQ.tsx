export default function Section_FAQ() {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">자주 묻는 질문</h2>
      <dl className="flex flex-col gap-8">
        <div>
          <dt className="text-lg font-semibold mb-2">빙킷은 어떤 앱인가요?</dt>
          <dd className="text-gray-700">빙킷은 할 일과 버킷리스트를 빙고판 형태로 관리하는 iOS 앱입니다. 목표를 빙고 칸에 입력하고 하나씩 채워가며 달성하는 재미를 느낄 수 있어요.</dd>
        </div>
        <div>
          <dt className="text-lg font-semibold mb-2">무료로 사용할 수 있나요?</dt>
          <dd className="text-gray-700">네, 빙킷은 무료로 다운로드하고 사용할 수 있습니다.</dd>
        </div>
        <div>
          <dt className="text-lg font-semibold mb-2">친구와 함께 사용할 수 있나요?</dt>
          <dd className="text-gray-700">빙고판을 친구와 공유하고 함께 도전하거나 점수를 경쟁할 수 있습니다.</dd>
        </div>
        <div>
          <dt className="text-lg font-semibold mb-2">어떤 기기에서 사용할 수 있나요?</dt>
          <dd className="text-gray-700">현재 iOS(iPhone, iPad)에서 앱스토어를 통해 다운로드할 수 있습니다.</dd>
        </div>
      </dl>
    </section>
  )
}
