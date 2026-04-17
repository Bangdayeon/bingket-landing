'use client'

import Image from "next/image"
import { useState } from "react"

interface Props {
  title: string;
  color: string;
  img: string;
}

export default function Card({ title, color, img }: Props) {
  const [animation] = useState(() => {
    const delay = `${(Math.random() * 4).toFixed(2)}s`
    return `pudding 5s ease-in-out ${delay} infinite`
  })

  return (
    <div
      className={`${color} rounded-xl w-40 h-40 items-center justify-center flex flex-col gap-4`}
      style={{ animation }}
    >
      <Image src={img} alt='' width={48} height={48}/>
      <span className="text-2xl font-semibold">{title}</span>
    </div>
  )
}
