import Image from "next/image"
import CTAButtons from "./CTAButtons"

export default function Section_4(){
  return(
    <section className="bg-linear-to-tr from-[#28C8DE] to-[#6ADE50] w-screen flex items-center justify-center py-30">
      <div className="flex flex-col md:flex-row gap-7 items-center justify-center">
        <div className="relative w-60 md:w-80 aspect-100/111">
          <Image src="/images/mascot_3d_2.png" alt='빙킷 마스코트 캐릭터' fill className='object-contain' />
        </div>
        <div>
          <h4 className="gap-2 flex flex-col items-center">
            <span className="text-white text-2xl md:text-3xl font-bold md:leading-14 flex flex-col md:flex-row">같이 즐거운 도전을 시작해볼래요?</span>
          </h4>
          <CTAButtons />
        </div>
      </div>
    </section>
  )
}