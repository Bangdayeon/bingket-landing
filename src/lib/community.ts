import { supabase } from './supabase';
import type { CommunityPost, PostCategory, Comment, CommentReply, StoredBlock } from '@/types/community';

export const PAGE_SIZE = 15;

const POST_SELECT = `
  id, title, content, category, like_count, comment_count, created_at, user_id, image_urls, is_anonymous, bingo_snapshot,
  users ( display_name, avatar_url ),
  bingo_boards ( id, title, grid, theme, bingo_cells ( position, content ) )
`;

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return '방금 전';
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}일 전`;
  return `${Math.floor(d / 30)}달 전`;
}

function formatCommentDate(dateStr: string): string {
  const d = new Date(dateStr);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yy}/${mm}/${dd}  ${hh}:${min}`;
}

type RawBoard = {
  id: string;
  title: string;
  grid: string;
  theme: string;
  bingo_cells: Array<{ position: number; content: string }>;
} | null;

type RawUser = { display_name: string; avatar_url: string | null } | null;
type RawSnapshot = { title?: string; cells: string[]; grid: string; theme: string } | null;

function mapPost(p: {
  id: string;
  title: string;
  content: string;
  category: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  user_id: string;
  image_urls: unknown;
  is_anonymous: boolean;
  bingo_boards: unknown;
  bingo_snapshot: unknown;
  users: unknown;
}): CommunityPost {
  const board = p.bingo_boards as RawBoard;
  const snapshot = p.bingo_snapshot as RawSnapshot;
  const user = p.users as RawUser;
  const isAnonymous = p.is_anonymous;

  return {
    id: p.id,
    title: p.title,
    userId: p.user_id,
    author: isAnonymous ? '익명' : (user?.display_name ?? '(알 수 없음)'),
    isAnonymous,
    avatarUrl: isAnonymous ? null : (user?.avatar_url ?? null),
    timeAgo: timeAgo(p.created_at),
    createdAt: p.created_at,
    body: p.content,
    likeCount: p.like_count,
    commentCount: p.comment_count,
    category: p.category as PostCategory,
    imageUrls: (p.image_urls as string[] | null) ?? [],
    bingo: board
      ? {
          id: board.id,
          title: board.title,
          cells: [...board.bingo_cells].sort((a, b) => a.position - b.position).map((c) => c.content),
          grid: board.grid,
          theme: board.theme,
        }
      : snapshot
        ? { title: snapshot.title, cells: snapshot.cells, grid: snapshot.grid, theme: snapshot.theme }
        : undefined,
  };
}

export async function fetchPosts(page: number, category: PostCategory | null): Promise<CommunityPost[]> {
  let query = supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })
    .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

  if (category) query = query.eq('category', category);

  const { data } = await query;
  return (data ?? []).map((p) => mapPost(p as Parameters<typeof mapPost>[0]));
}

export async function fetchPost(id: string): Promise<CommunityPost | null> {
  const { data } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('id', id)
    .eq('is_deleted', false)
    .single();

  if (!data) return null;
  return mapPost(data as Parameters<typeof mapPost>[0]);
}

export function parseBlocks(content: string): StoredBlock[] | null {
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0].type === 'string') {
      return parsed as StoredBlock[];
    }
  } catch {
    /* plain text */
  }
  return null;
}

export async function fetchPostsForSitemap(): Promise<{ id: string; created_at: string }[]> {
  const { data } = await supabase
    .from('posts')
    .select('id, created_at')
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })
    .limit(1000);
  return (data ?? []) as { id: string; created_at: string }[];
}

export async function searchPosts(query: string): Promise<CommunityPost[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const { data: ids } = await supabase.rpc('search_post_ids', { query_text: trimmed });
  if (!ids || ids.length === 0) return [];

  const { data } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('is_deleted', false)
    .in('id', ids as string[]);

  return (data ?? []).map((p) => mapPost(p as Parameters<typeof mapPost>[0]));
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  const { data } = await supabase
    .from('comments')
    .select('id, content, user_id, parent_id, is_anonymous, created_at, like_count, users ( display_name, avatar_url )')
    .eq('post_id', postId)
    .eq('is_deleted', false)
    .order('created_at', { ascending: true });

  if (!data) return [];

  type RawRow = {
    id: string;
    content: string;
    user_id: string;
    parent_id: string | null;
    is_anonymous: boolean;
    created_at: string;
    like_count: number;
    users: unknown;
  };
  const rows = data as RawRow[];

  const anonymousMap = new Map<string, number>();
  let counter = 1;
  for (const c of rows) {
    if (c.is_anonymous && !anonymousMap.has(c.user_id)) {
      anonymousMap.set(c.user_id, counter++);
    }
  }

  const mapRow = (c: RawRow): CommentReply => {
    const user = c.users as RawUser;
    return {
      id: c.id,
      userId: c.user_id,
      author: c.is_anonymous ? `익명${anonymousMap.get(c.user_id)}` : (user?.display_name ?? '알 수 없음'),
      isAnonymous: c.is_anonymous,
      avatarUrl: c.is_anonymous ? null : (user?.avatar_url ?? null),
      body: c.content,
      createdAt: formatCommentDate(c.created_at),
      likeCount: c.like_count,
    };
  };

  const topLevel = rows.filter((c) => !c.parent_id);
  const replies = rows.filter((c) => c.parent_id);
  const topLevelIds = new Set(topLevel.map((c) => c.id));

  const orphanGroups = new Map<string, RawRow[]>();
  for (const r of replies) {
    if (r.parent_id && !topLevelIds.has(r.parent_id)) {
      if (!orphanGroups.has(r.parent_id)) orphanGroups.set(r.parent_id, []);
      orphanGroups.get(r.parent_id)!.push(r);
    }
  }

  const realComments: Comment[] = topLevel.map((c) => ({
    ...mapRow(c),
    replies: replies.filter((r) => r.parent_id === c.id).map(mapRow),
  }));

  const deletedPlaceholders: Comment[] = Array.from(orphanGroups.entries()).map(
    ([parentId, childReplies]) => ({
      id: parentId,
      userId: '',
      author: '',
      isAnonymous: false,
      body: '',
      createdAt: formatCommentDate(childReplies[0].created_at),
      likeCount: 0,
      isDeleted: true,
      replies: childReplies.map(mapRow),
    }),
  );

  return [...realComments, ...deletedPlaceholders].sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  );
}
