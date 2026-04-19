'use client'
import { useRouter } from "next/navigation"
import Button from "../commons/Button"
import Image from "next/image"

export default function Section_4(){
  const router = useRouter();

  return(
    <section className="bg-linear-to-tr from-[#28C8DE] to-[#6ADE50] w-screen flex items-center justify-center py-30">
      <div className="flex flex-col md:flex-row gap-7 items-center justify-center">
        <div className="relative w-60 md:w-80 aspect-100/111">
          <Image src="/images/mascot_3d_2.png" alt='' fill className='object-contain' />
        </div>
        <div>
          <h4 className="gap-2 flex flex-col items-center">
            <span className="text-white text-2xl md:text-3xl font-bold md:leading-14 flex flex-col md:flex-row">같이 즐거운 도전을 시작해볼래요?</span>
            {/* nn명의 사람들이 함께 하고 있어요 */}
          </h4>
          <div className="flex gap-4 mt-5">
            <Button variant="secondary" onClick={() => router.push('/bingo')}>체험해보기</Button>
            <Button onClick={() => window.open('https://apps.apple.com/kr/app/%EB%B9%99%ED%82%B7-bingket/id6761634987', '_blank')}>
              <div className="flex items-center justify-center gap-2">
                <Image src="/images/apple_logo.png" alt="" width={18} height={18} className="pb-1"/>
                앱스토어 다운로드
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}