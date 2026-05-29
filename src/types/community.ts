export type PostCategory = 'bingo_board' | 'bingo_achieve' | 'free';

export type StoredBlock =
  | { type: 'text'; value: string }
  | { type: 'image'; index: number }
  | { type: 'bingo' };

export interface CommunityPost {
  id: string;
  title: string;
  userId: string;
  author: string;
  isAnonymous: boolean;
  avatarUrl?: string | null;
  timeAgo: string;
  createdAt: string; // ISO 8601 — JSON-LD, sitemap, <time> 요소에 사용
  body: string;
  likeCount: number;
  commentCount: number;
  category: PostCategory;
  bingo?: {
    id?: string;
    title?: string;
    cells: string[];
    grid: string;
    theme: string;
  };
  imageUrls?: string[];
}

export interface CommentReply {
  id: string;
  userId: string;
  author: string;
  isAnonymous: boolean;
  avatarUrl?: string | null;
  body: string;
  createdAt: string;
  likeCount: number;
}

export interface Comment extends CommentReply {
  isDeleted?: boolean;
  replies?: CommentReply[];
}
