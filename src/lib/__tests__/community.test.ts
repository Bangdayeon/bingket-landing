import { describe, it, expect } from 'vitest';
import { mapPost } from '../community';

const BASE = {
  id: 'post-1',
  title: '테스트 포스트',
  content: JSON.stringify([{ type: 'bingo' }]),
  category: 'bingo_board',
  like_count: 0,
  comment_count: 0,
  created_at: new Date().toISOString(),
  user_id: 'user-1',
  image_urls: null,
  is_anonymous: false,
  users: { display_name: '테스트유저', avatar_url: null },
} as const;

describe('mapPost', () => {
  it('board가 있으면 post.bingo를 board 데이터로 채운다', () => {
    const result = mapPost({
      ...BASE,
      bingo_boards: {
        id: 'board-1',
        title: '내 빙고',
        grid: '3x3',
        theme: 'default',
        bingo_cells: [
          { position: 0, content: '운동' },
          { position: 1, content: '독서' },
          { position: 2, content: '명상' },
        ],
      },
      bingo_snapshot: null,
    });

    expect(result.bingo).toBeDefined();
    expect(result.bingo?.title).toBe('내 빙고');
    expect(result.bingo?.grid).toBe('3x3');
    expect(result.bingo?.cells).toEqual(['운동', '독서', '명상']);
  });

  it('board가 null이고 snapshot이 있으면 snapshot으로 fallback한다', () => {
    const result = mapPost({
      ...BASE,
      bingo_boards: null,
      bingo_snapshot: {
        title: '스냅샷 빙고',
        cells: ['a', 'b', 'c'],
        grid: '3x3',
        theme: 'rabbit',
      },
    });

    expect(result.bingo).toBeDefined();
    expect(result.bingo?.title).toBe('스냅샷 빙고');
    expect(result.bingo?.cells).toEqual(['a', 'b', 'c']);
  });

  it('board=null, snapshot=null이면 post.bingo는 undefined이다', () => {
    const result = mapPost({
      ...BASE,
      bingo_boards: null,
      bingo_snapshot: null,
    });

    // 이것이 현재 RLS 버그로 인해 발생하는 상황:
    // bingo_board_id가 설정된 포스트도 anon 접근 시 bingo_boards = null → post.bingo = undefined
    expect(result.bingo).toBeUndefined();
  });

  it('bingo_cells는 position 순으로 정렬된다', () => {
    const result = mapPost({
      ...BASE,
      bingo_boards: {
        id: 'board-1',
        title: '순서 테스트',
        grid: '3x3',
        theme: 'default',
        bingo_cells: [
          { position: 2, content: 'C' },
          { position: 0, content: 'A' },
          { position: 1, content: 'B' },
        ],
      },
      bingo_snapshot: null,
    });

    expect(result.bingo?.cells).toEqual(['A', 'B', 'C']);
  });
});
