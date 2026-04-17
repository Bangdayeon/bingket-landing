import Card from "./Card"
import Image from "next/image"

export default function Section_2(){
  return(
    <section className="bg-white flex flex-col gap-40 w-screen items-center pt-20">
      <div className="flex flex-col items-center gap-8 w-full">
        <p className="text-xl md:text-3xl font-bold leading-12 md:leading-14">
          할 일은 많은데 하기 싫어 미룬 적이 있나요?
        </p>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4 pr-4">
                <Card title='공부' color='bg-sky-200' img='/images/landing/todo_study.png'/>
                <Card title='자기계발' color='bg-purple-200' img='/images/landing/todo_growth.png'/>
                <Card title='운동' color='bg-orange-200' img='/images/landing/todo_weight.png'/>
                <Card title='미팅' color='bg-green-200' img='/images/landing/todo_meeting.png'/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 w-full">
        <p className="text-xl md:text-3xl font-bold leading-12 md:leading-14">
          올해, 혹은 언젠가 이루고 싶은 목표가 있나요?
        </p>
        <div className="marquee-wrap">
          <div className="marquee-track marquee-track--slow">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4 pr-4">
                <Card title='요리하기' color='bg-emerald-200' img='/images/landing/bucket_cook.png'/>
                <Card title='사랑하기' color='bg-pink-200' img='/images/landing/bucket_love.png'/>
                <Card title='피라미드 보기' color='bg-yellow-200' img='/images/landing/bucket_pyramid.png'/>
                <Card title='고래 보기' color='bg-blue-200' img='/images/landing/bucket_whale.png'/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mb-10">
        <h2 className="text-xl md:text-3xl font-bold leading-12 md:leading-14">빙킷이 더 즐겁게 이루도록 도와줄게요!</h2>
        <p className="text-lg md:text-2xl font-semibold text-gray-700">어떻게 도와드릴지 더 자세히 알려줄게요</p>
        <Image src='/images/mascot_3d.png' alt='' width={500} height={500} />
      </div>
    </section>
  )
}