'use client';

import Button from "../commons/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { trackAppDownload } from "@/lib/analytics";

export default function HeroButtons() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <Button variant="dark" onClick={() => { trackAppDownload('appstore'); window.open('https://apps.apple.com/kr/app/%EB%B9%99%ED%82%B7-bingket/id6761634987', '_blank') }}>
        <div className="flex items-center justify-center gap-2">
          <Image src="/images/apple_logo.png" alt="" width={18} height={18} className="pb-1 invert"/>
          앱스토어 다운로드
        </div>
      </Button>
      <Button variant="dark" onClick={() => { trackAppDownload('google_play'); window.open('https://play.google.com/store/apps/details?id=com.day.bingket.app', '_blank') }}>
        <div className="flex items-center justify-center gap-2">
          <Image src="/images/google_logo.svg" alt="" width={18} height={18}/>
          플레이스토어 다운로드
        </div>
      </Button>
      <Button variant="secondary" onClick={() => router.push('/bingo')}>체험해보기</Button>
    </div>
  );
}
