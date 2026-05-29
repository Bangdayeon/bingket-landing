import Image from 'next/image';

interface AvatarProps {
  avatarUrl?: string | null;
  author: string;
  size?: number;
  seed?: string;
}

export function Avatar({ avatarUrl, author, size = 32, seed }: AvatarProps) {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={author}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  // 익명 or no avatar — generate color from seed/author
  const hash = (seed ?? author).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const colors = ['#54DBED', '#6ADE50', '#F07840', '#B39DDB', '#F48FB1', '#80DEEA'];
  const bg = colors[hash % colors.length];
  const initials = author.slice(0, 1).toUpperCase() || '?';

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 text-white font-semibold"
      style={{ width: size, height: size, backgroundColor: bg, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}
