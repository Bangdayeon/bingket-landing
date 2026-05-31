import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchPost, fetchComments, parseBlocks } from '@/lib/community';
import { CategoryBadge } from '@/components/lounge/CategoryBadge';
import { BingoGrid } from '@/components/lounge/BingoGrid';
import { Avatar } from '@/components/lounge/Avatar';
import type { Comment, CommentReply } from '@/types/community';

const BASE_URL = 'https://bingket-landing.vercel.app';

// ISR: 6시간마다 재생성 — 콘텐츠 신선도 유지하면서 DB 부하 최소화
export const revalidate = 21600;

interface Props {
  params: Promise<{ id: string }>;
}

// 게시글 본문에서 첫 번째 텍스트 추출 (meta description용)
function extractDescription(body: string, author: string): string {
  const blocks = parseBlocks(body);
  const textBlock = blocks?.find((b): b is Extract<typeof b, { type: 'text' }> => b.type === 'text' && !!b.value.trim());
  const firstText = textBlock?.value ?? body;
  const clean = firstText.replace(/\n+/g, ' ').trim();
  const truncated = clean.length > 120 ? `${clean.slice(0, 120)}…` : clean;
  return truncated || `${author}이 빙킷 라운지에 공유한 게시글입니다.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPost(id);
  if (!post) return { title: '빙킷 라운지' };

  const description = extractDescription(post.body, post.author);
  const url = `${BASE_URL}/lounge/${id}`;
  const ogImage = post.imageUrls?.[0]
    ? { url: post.imageUrls[0], width: 1200, height: 630, alt: post.title }
    : { url: `${BASE_URL}/images/og_default.png`, width: 1200, height: 630, alt: '빙킷 라운지' };

  return {
    title: `${post.title} | 빙킷 라운지`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url,
      siteName: '빙킷',
      locale: 'ko_KR',
      images: [ogImage],
      publishedTime: new Date(post.createdAt).toISOString(),
      authors: [post.isAnonymous ? '익명' : post.author],
      tags: ['빙고', '목표달성', '자기계발', '빙킷', post.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage.url],
    },
  };
}

function ReplyItemWeb({ reply, postAuthorId }: { reply: CommentReply; postAuthorId: string }) {
  const isPostAuthor = reply.userId === postAuthorId;
  return (
    <div className="flex gap-2 mt-2 mb-3">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#929898" strokeWidth="2" className="mt-1 shrink-0">
        <polyline points="15 10 20 15 15 20"/>
        <path d="M4 4v7a4 4 0 0 0 4 4h12"/>
      </svg>
      <div className="flex-1 rounded-lg px-3 pt-2 pb-2 bg-[#E8FAFE]">
        <div className="flex items-center gap-2">
          <Avatar avatarUrl={reply.avatarUrl} author={reply.author} seed={reply.isAnonymous ? reply.id : undefined} size={22} />
          <span className="text-xs font-semibold text-[#181C1C]">{reply.author}</span>
          {isPostAuthor && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#54DBED] text-[#023540]">작성자</span>
          )}
          <time dateTime={reply.createdAt} className="ml-auto text-[10px] text-[#929898]">{reply.createdAt}</time>
        </div>
        <p className="text-xs text-[#4C5252] mt-1 leading-relaxed">{reply.body}</p>
      </div>
    </div>
  );
}

function CommentItemWeb({ comment, postAuthorId }: { comment: Comment; postAuthorId: string }) {
  const isPostAuthor = comment.userId === postAuthorId;

  if (comment.isDeleted) {
    return (
      <div>
        <p className="text-sm text-[#B4BBBB] pb-4 border-b border-gray-200 px-5">(삭제된 댓글입니다.)</p>
        {comment.replies?.map((r) => (
          <div key={r.id} className="px-5">
            <ReplyItemWeb reply={r} postAuthorId={postAuthorId} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="pb-1 border-b border-gray-200 px-5">
      <div className="flex items-center gap-2 py-2">
        <Avatar avatarUrl={comment.avatarUrl} author={comment.author} seed={comment.isAnonymous ? comment.id : undefined} size={22} />
        <span className="text-sm font-semibold text-[#181C1C]">{comment.author}</span>
        {isPostAuthor && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#54DBED] text-[#023540]">작성자</span>
        )}
        <div className="flex items-center gap-1 ml-auto text-[#929898]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span className="text-xs">{comment.likeCount}</span>
        </div>
      </div>
      <p className="text-sm text-[#181C1C] leading-relaxed">{comment.body}</p>
      <time dateTime={comment.createdAt} className="block text-xs text-[#929898] mt-1 text-right pb-2">{comment.createdAt}</time>
      {comment.replies?.map((r) => (
        <ReplyItemWeb key={r.id} reply={r} postAuthorId={postAuthorId} />
      ))}
    </div>
  );
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const [post, comments] = await Promise.all([fetchPost(id), fetchComments(id)]);

  if (!post) notFound();

  const blocks = parseBlocks(post.body);
  const bingoData = post.bingo;
  const textBlocks = blocks?.filter((b): b is Extract<typeof b, { type: 'text' }> => b.type === 'text') ?? [];
  const mediaBlocks = blocks?.filter((b) => b.type !== 'text') ?? [];
  const description = extractDescription(post.body, post.author);
  const postUrl = `${BASE_URL}/lounge/${id}`;
  const isoDate = new Date(post.createdAt).toISOString();

  // JSON-LD: SocialMediaPosting + BreadcrumbList
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SocialMediaPosting',
      '@id': postUrl,
      headline: post.title,
      text: description,
      url: postUrl,
      datePublished: isoDate,
      author: {
        '@type': 'Person',
        name: post.isAnonymous ? '익명' : post.author,
      },
      publisher: {
        '@type': 'Organization',
        name: '빙킷',
        url: BASE_URL,
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/logo.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
      ...(post.imageUrls?.[0] && {
        image: { '@type': 'ImageObject', url: post.imageUrls[0] },
      }),
      interactionStatistic: [
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/LikeAction',
          userInteractionCount: post.likeCount,
        },
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/CommentAction',
          userInteractionCount: post.commentCount,
        },
      ],
      sharedContent: {
        '@type': 'WebPage',
        '@id': BASE_URL,
        name: '빙킷 — 빙고로 이루는 버킷리스트·투두리스트 앱',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '빙킷', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: '라운지', item: `${BASE_URL}/lounge` },
        { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
      ],
    },
  ];

  return (
    <>
      {/* JSON-LD 구조화 데이터 */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="w-full flex justify-center">
        <div className="w-full max-w-lg bg-white min-h-screen border-x border-gray-100">

          {/* 헤더 + 브레드크럼 */}
          <nav aria-label="breadcrumb" className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 text-xs text-[#929898]">
            <Link href="/" className="hover:text-[#28C8DE] transition-colors">빙킷</Link>
            <span>›</span>
            <Link href="/lounge" className="hover:text-[#28C8DE] transition-colors">라운지</Link>
            <span>›</span>
            <span className="text-[#4C5252] truncate max-w-[160px]">{post.title}</span>
          </nav>

          {/* 카테고리 배지 + 뒤로 */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
            <Link href="/lounge" className="p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors" aria-label="라운지로 돌아가기">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4C5252" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </Link>
            <CategoryBadge category={post.category} />
          </div>

          {/* 게시글 — <article>로 시맨틱 마크업 */}
          <article itemScope itemType="https://schema.org/SocialMediaPosting">
            <meta itemProp="url" content={postUrl} />
            <meta itemProp="datePublished" content={isoDate} />

            <div className="px-5 pt-4">
              {/* 작성자 */}
              <address className="flex items-center gap-2 not-italic" itemProp="author" itemScope itemType="https://schema.org/Person">
                <Avatar avatarUrl={post.avatarUrl} author={post.author} seed={post.isAnonymous ? post.id : undefined} size={32} />
                <span className="text-sm font-semibold text-[#181C1C]" itemProp="name">{post.author}</span>
                <span className="text-[#181C1C] text-xs" aria-hidden="true">•</span>
                <time dateTime={isoDate} className="text-xs text-[#929898]">{post.timeAgo}</time>
              </address>

              {/* 제목 */}
              <h1 className="mt-3 text-lg font-bold text-[#181C1C] leading-snug" itemProp="headline">
                {post.title}
              </h1>

              {/* 본문 */}
              <div itemProp="articleBody">
                {blocks ? (
                  <>
                    {textBlocks.map((block, i) =>
                      block.value ? (
                        <p key={i} className="mt-3 text-sm text-[#4C5252] leading-relaxed whitespace-pre-wrap">{block.value}</p>
                      ) : null
                    )}
                    {(() => {
                      let imgCount = 0;
                      return mediaBlocks.map((block, i) => {
                        if (block.type === 'image') {
                          const url = (post.imageUrls ?? [])[block.index];
                          const isFirst = imgCount++ === 0;
                          return url ? (
                            <figure key={i} className="mt-3">
                              <Image
                                src={url}
                                alt={`${post.title} 이미지`}
                                width={600}
                                height={400}
                                priority={isFirst}
                                sizes="(max-width: 512px) calc(100vw - 40px), 472px"
                                className="w-full h-auto rounded-xl"
                              />
                            </figure>
                          ) : null;
                        }
                        if (block.type === 'bingo' && bingoData) {
                          return (
                            <div key={i} className="mt-3">
                              <BingoGrid cells={bingoData.cells} grid={bingoData.grid} title={bingoData.title} theme={bingoData.theme} />
                            </div>
                          );
                        }
                        return null;
                      });
                    })()}
                  </>
                ) : (
                  <>
                    <p className="mt-3 text-sm text-[#4C5252] leading-relaxed whitespace-pre-wrap">{post.body}</p>
                    {bingoData && (
                      <div className="mt-3">
                        <BingoGrid cells={bingoData.cells} grid={bingoData.grid} title={bingoData.title} theme={bingoData.theme} />
                      </div>
                    )}
                    {post.imageUrls?.map((url, i) => (
                      <figure key={i} className="mt-3">
                        <Image
                          src={url}
                          alt={`${post.title} 이미지`}
                          width={600}
                          height={400}
                          priority={i === 0}
                          sizes="(max-width: 512px) calc(100vw - 40px), 472px"
                          className="w-full h-auto rounded-xl"
                        />
                      </figure>
                    ))}
                  </>
                )}
              </div>

              {/* 좋아요 / 댓글 수 */}
              <div className="flex items-center gap-4 mt-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-1 text-[#929898]" aria-label={`좋아요 ${post.likeCount}개`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span className="text-sm">{post.likeCount}</span>
                </div>
                <div className="flex items-center gap-1 text-[#929898]" aria-label={`댓글 ${post.commentCount}개`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span className="text-sm">{post.commentCount}</span>
                </div>
              </div>
            </div>

            {/* 댓글 섹션 */}
            <section aria-label="댓글" className="pt-2 pb-4">
              {comments.length === 0 ? (
                <p className="text-center text-sm text-[#929898] py-8">아직 댓글이 없어요</p>
              ) : (
                <div>
                  {comments.map((comment) => (
                    <CommentItemWeb key={comment.id} comment={comment} postAuthorId={post.userId} />
                  ))}
                </div>
              )}
            </section>
          </article>

          {/* 앱에서 댓글 달기 CTA */}
          <div className="mx-5 mb-8 p-4 rounded-2xl bg-linear-to-tr from-[#E8FAFE] to-[#F2FDE8] border border-[#D2F5F5]">
            <p className="text-sm font-semibold text-[#181C1C] mb-1">댓글을 달고 싶다면?</p>
            <p className="text-xs text-[#4C5252] mb-3">앱에서 직접 참여하고 소통해보세요</p>
            <div className="flex gap-2">
              <a href="https://apps.apple.com/kr/app/%EB%B9%99%ED%82%B7-bingket/id6761634987" target="_blank" rel="noopener noreferrer"
                className="flex-1 h-9 rounded-lg bg-black text-white text-xs font-medium flex items-center justify-center hover:opacity-80 transition-opacity">
                App Store
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.day.bingket.app" target="_blank" rel="noopener noreferrer"
                className="flex-1 h-9 rounded-lg bg-black text-white text-xs font-medium flex items-center justify-center hover:opacity-80 transition-opacity">
                Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
