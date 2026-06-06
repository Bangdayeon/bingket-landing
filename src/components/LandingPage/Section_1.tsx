import Image from "next/image"
import HeroButtons from "./HeroButtons"

export default function Section_1() {
  return(
    <section className="flex md:flex-row flex-col gap-10  h-screen justify-center items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-12 md:leading-14 text-center">
          <span className="bg-linear-to-tr from-[#28C8DE] to-[#6ADE50] bg-clip-text text-transparent">빙</span>고로 이루는<br />버<span className="bg-linear-to-tr from-[#28C8DE] to-[#6ADE50] bg-clip-text text-transparent">킷</span> 리스트,{" "}
          <span className="ml-1.5 bg-linear-to-tr from-[#28C8DE] to-[#6ADE50] bg-clip-text text-transparent">빙킷</span>
        </h1>
        <p className="text-sm md:text-base text-gray-500 text-center -mt-1">
          투두리스트 · 버킷리스트 · 자기계발 목표를 빙고로 채워가는 앱
        </p>
        <HeroButtons />
      </div>
      <div className="w-60 md:w-80 lg:w-100 aspect-10/17 relative">
        <Image
          src="/images/simulator_1.png"
          alt="빙킷 앱 화면 - 메인 화면"
          fill
          className="object-contain float"
          unoptimized
        />
      </div>
    </section>
  )
}