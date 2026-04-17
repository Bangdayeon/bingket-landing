import Button from "../commons/Button"

export default function Footer() {
  return(
    <footer className="bg-[#BCF0FA] absolute bottom-0 w-screen flex flex-col md:flex-row items-start md:items-center justify-between px-12 py-8 gap-4">
      <div className="flex flex-col gap-1 justify-center md:text-lg font-semibold">
        <span>빙고로 만드는 투두 리스트 어떤가요?</span>
        <span>어플에서 더 많은 테마와 기능을 즐길 수 있어요!</span>
      </div>
      <a href="https://apps.apple.com/kr/app/%EB%B9%99%ED%82%B7-bingket/id6761634987" target="_blank" rel="noopener noreferrer">
        <Button>iOS 앱 다운로드</Button>
      </a>
    </footer>
  )
}