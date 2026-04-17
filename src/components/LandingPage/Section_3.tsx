import FadeInUp from "../commons/FadeInUp"
import Image from "next/image"

export default function Section_3(){
  return(
    <section className="flex flex-col w-screen items-center py-30 gap-40">
      <div className="flex flex-col items-center w-full">
        <FadeInUp>
        <h3 className="gap-2 flex flex-col items-center">
          <p className="text-2xl md:text-3xl font-bold md:leading-14 flex flex-col md:flex-row">
            <span>1. 다양한 테마의 빙고판 위에</span>
            <span className="ml-5 md:ml-2">이룰 목표를 작성해요</span>
          </p>
          <p className="md:text-2xl font-semibold text-gray-700">제목, 목표기간, 칸 개수, 수정할 횟수를 정할 수 있어요</p>
        </h3>
        </FadeInUp>
        <div className="mt-10 w-full overflow-x-auto custom-scrollbar">
          <div className="flex gap-2 md:gap-6 px-6 w-max md:mx-auto">
            <Image src='/images/landing/example_2.jpg' alt='' width={200} height={500} className="object-contain rounded-2xl shrink-0" unoptimized />
            <Image src='/images/landing/example_1.jpg' alt='' width={200} height={500} className="object-contain rounded-2xl shrink-0" unoptimized />
            <Image src='/images/landing/example_7.jpg' alt='' width={200} height={500} className="object-contain rounded-2xl shrink-0" unoptimized />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <FadeInUp>
        <h3 className="gap-2 flex flex-col items-center">
          <p className="text-2xl md:text-3xl font-bold md:leading-14 flex flex-col md:flex-row">
            <span>2. 친구와 빙고를 공유하고</span>
            <span className="ml-6 md:ml-2">함께 도전해요</span>
          </p>
          <p className="md:text-2xl font-semibold text-gray-700">누가 더 높은 점수를 얻을 지 경쟁하며 목표를 이뤄요</p>
        </h3>
        </FadeInUp>
        <div className="mt-10 w-full overflow-x-auto custom-scrollbar">
          <div className="flex gap-2 md:gap-6 px-6 w-max md:mx-auto">
            <Image src='/images/landing/example_3.jpg' alt='' width={200} height={500} className="object-contain rounded-2xl shrink-0" unoptimized />
            <Image src='/images/landing/example_4.jpg' alt='' width={200} height={500} className="object-contain rounded-2xl shrink-0" unoptimized />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        <FadeInUp>
        <h3 className="gap-2 flex flex-col items-center">
          <p className="text-2xl md:text-3xl font-bold md:leading-14 flex flex-col md:flex-row">
            <span>3. 커뮤니티에서 일상을 공유하고</span>
            <span className="ml-6 md:ml-2">빙고 아이디어를 얻어요</span>
          </p>
          <p className="md:text-2xl font-semibold text-gray-700">다같이 목표를 이뤄가는 과정을 공유해요</p>
        </h3>
        </FadeInUp>
        <div className="mt-10 w-full overflow-x-auto custom-scrollbar">
          <div className="flex gap-2 md:gap-6 px-6 w-max md:mx-auto">
            <Image src='/images/landing/example_6.jpg' alt='' width={200} height={500} className="object-contain rounded-2xl shrink-0" unoptimized />
            <Image src='/images/landing/example_5.jpg' alt='' width={200} height={500} className="object-contain rounded-2xl shrink-0" unoptimized />
          </div>
        </div>
      </div>
    </section>
  )
}
