'use client';

import Button from "../commons/Button"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Section_1() {
  const router = useRouter();
  
  return(
    <section className="flex md:flex-row flex-col gap-10  h-screen justify-center items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-12 md:leading-14 flex flex-col items-center">
          <p><span className="bg-linear-to-tr from-[#28C8DE] to-[#6ADE50] bg-clip-text text-transparent">빙</span>고로 이루는</p>
          <p>버<span className="bg-linear-to-tr from-[#28C8DE] to-[#6ADE50] bg-clip-text text-transparent">킷</span> 리스트,
            <span className="ml-1.5 bg-linear-to-tr from-[#28C8DE] to-[#6ADE50] bg-clip-text text-transparent">
              빙킷
            </span>
          </p>
        </h1>
        <Button onClick={() => window.open('https://apps.apple.com/kr/app/%EB%B9%99%ED%82%B7-bingket/id6761634987', '_blank')}>iOS 앱 다운로드</Button>
        <Button variant="secondary" onClick={() => router.push('/bingo')}>체험해보기</Button>
      </div>
      <div className="w-60 md:w-80 lg:w-100 aspect-10/17 relative">
        <Image
          src="/images/simulator_1.png"
          alt=""
          fill
          className="object-contain float"
          unoptimized
        />
      </div>
    </section>
  )
}