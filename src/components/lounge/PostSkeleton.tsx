export function PostSkeleton({ hasMedia = false }: { hasMedia?: boolean }) {
  return (
    <div className="px-5 pt-4 pb-4 border-b border-gray-100 animate-pulse">
      {/* 작성자 */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
        <div className="h-3 w-20 bg-gray-200 rounded-full" />
        <div className="h-3 w-1 bg-gray-200 rounded-full" />
        <div className="h-3 w-12 bg-gray-200 rounded-full" />
        <div className="ml-auto h-5 w-14 bg-gray-200 rounded-full" />
      </div>
      {/* 제목 */}
      <div className="mt-3 h-4 w-4/5 bg-gray-200 rounded-md" />
      {/* 본문 */}
      <div className="mt-2 h-3 w-3/5 bg-gray-200 rounded-md" />
      {/* 미디어 */}
      {hasMedia && <div className="mt-3 w-full aspect-video bg-gray-200 rounded-lg" />}
      {/* 카운터 */}
      <div className="flex gap-4 mt-3">
        <div className="h-4 w-10 bg-gray-200 rounded-md" />
        <div className="h-4 w-10 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}

export function PostSkeletonList({ count = 6 }: { count?: number }) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} hasMedia={i % 3 === 0} />
      ))}
    </div>
  );
}
