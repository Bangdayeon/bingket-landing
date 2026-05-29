import type { PostCategory } from '@/types/community';

const CATEGORY_CONFIG: Record<PostCategory, { label: string; className: string }> = {
  bingo_board: { label: '빙고판', className: 'bg-[#E0F7FA] text-[#006064]' },
  bingo_achieve: { label: '빙고 달성', className: 'bg-[#E8F5E9] text-[#1B5E20]' },
  free: { label: '자유게시판', className: 'bg-gray-100 text-gray-600' },
};

export function CategoryBadge({ category }: { category: PostCategory }) {
  const { label, className } = CATEGORY_CONFIG[category];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
