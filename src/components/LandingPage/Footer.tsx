export default function Footer() {
  return(
    <footer className="bg-[#BCF0FA] flex flex-col w-screen px-12 justify-between py-8 gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 justify-center text-lg md:text-2xl font-bold">
          <span>빙고로 만드는 버킷리스트,</span>
          <span>빙킷</span>
        </div>
        <div className="flex flex-col gap-1">
          <a href="https://aback-shirt-867.notion.site/32eadd99c0428075a260efb408236042" target="_blank" rel="noopener noreferrer" className="w-fit">소개 페이지</a>
          <a href="https://www.instagram.com/bingket_app?igsh=a3E5cmdzMHhrNGx6&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-fit">인스타그램</a>
        </div>
      </div>
      <div className="bg-gray-400 h-px w-full"></div>
      <div className="flex flex-col gap-1 text-gray-700">
        <div className="flex gap-2">
          <span>제휴/문의: </span>
          <a href="mailto:dybang00@gmail.com">dybang00@gmail.com</a>
        </div>
        <a href="https://aback-shirt-867.notion.site/32eadd99c0428005b2e0e2437d6cd91a" target="_blank" rel="noopener noreferrer" className="w-fit">이용 약관</a>
        <a href="https://aback-shirt-867.notion.site/32eadd99c04280558920e3c684d4bd9a" target="_blank" rel="noopener noreferrer" className="w-fit">개인정보처리방침</a>
      </div>
    </footer>
  )
}