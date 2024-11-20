import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../user/FirebaseConfig';
import './NoticeMain.css';

const PostList = ({ user, board }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pageGroup, setPageGroup] = useState(1);
  const [searchCondition, setSearchCondition] = useState('전체'); // 검색 조건
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [triggerSearch, setTriggerSearch] = useState(false); // 검색 버튼 트리거

  const navigate = useNavigate();
  const POSTS_PER_PAGE = 20;
  const PAGES_PER_GROUP = 5;

  // 작성 시간을 조건에 맞게 형식화하는 함수
  const formatCreatedAt = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    // 작성 시간과 현재 시간의 날짜를 비교
    const isSameDate =
      createdDate.getFullYear() === currentDate.getFullYear() &&
      createdDate.getMonth() === currentDate.getMonth() &&
      createdDate.getDate() === currentDate.getDate();

    if (isSameDate) {
      // 오늘 작성된 경우: 시간만 표시 (24시간 형식)
      return createdDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24시간 형식
      });
    } else {
      // 오늘이 아닌 경우: 날짜만 표시 (YYYY-MM-DD 형식)
      return createdDate.toLocaleDateString();
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);

    const postRef = firebase.database().ref('posts');
    let query = board === '전체'
      ? postRef.orderByChild('createdAt')
      : postRef.orderByChild('board').equalTo(board);

    try {
      const snapshot = await query.once('value');
      const allPosts = [];
      snapshot.forEach((childSnapshot) => {
        const post = childSnapshot.val();
        post.id = childSnapshot.key;
        allPosts.unshift(post); // 최신순으로 추가
      });

      // 검색 조건 필터링
      const filteredPosts = allPosts.filter((post) => {
        if (searchCondition === '전체') {
          return true;
        } else if (searchCondition === '작성자') {
          return post.author?.email?.includes(searchTerm);
        } else if (searchCondition === '댓글') {
          return post.comments && post.comments.some((comment) => comment.text.includes(searchTerm));
        } else if (searchCondition === '내용') {
          return post.content?.includes(searchTerm);
        }
        return false;
      });

      // 페이지네이션 적용
      const totalPosts = filteredPosts.length;
      const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
      setTotalPages(totalPages);

      const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;

      setPosts(filteredPosts.slice(startIndex, endIndex));
    } catch (error) {
      console.error('게시글을 가져오는 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색 버튼 클릭 또는 페이지 변경 시 게시글 가져오기
  useEffect(() => {
    fetchPosts();
  }, [board, currentPage, triggerSearch]);

  const handlePostClick = (postId) => {
    if (user) {
      navigate(`/post/${postId}`, { state: { uid: user.uid, email: user.email } });
    } else {
      navigate(`/post/${postId}`);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageGroupChange = (direction) => {
    if (direction === 'next' && pageGroup * PAGES_PER_GROUP < totalPages) {
      setPageGroup((prev) => prev + 1);
    } else if (direction === 'prev' && pageGroup > 1) {
      setPageGroup((prev) => prev - 1);
    }
  };

  const renderPagination = () => {
    const startPage = (pageGroup - 1) * PAGES_PER_GROUP + 1;
    const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);

    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        {pageGroup > 1 && (
          <button onClick={() => handlePageGroupChange('prev')} className="page-button arrow">
            &lt;
          </button>
        )}
        {pageButtons}
        {pageGroup * PAGES_PER_GROUP < totalPages && (
          <button onClick={() => handlePageGroupChange('next')} className="page-button arrow">
            &gt;
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2>{board} 게시글 목록</h2>
      <hr />
      <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 200px 150px 80px 80px 80px', gap: '10px' }}>
        <div><strong>번호</strong></div>
        <div><strong>제목</strong></div>
        <div><strong>작성자</strong></div>
        <div><strong>작성시간</strong></div>
        <div><strong>조회수</strong></div>
        <div><strong>추천수</strong></div>
        <div><strong>비추수</strong></div>
      </div>
      <hr />
      {isLoading ? (
        <p>게시글을 불러오는 중입니다...</p>
      ) : posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        posts.map((post, index) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="post-item"
          >
            <div>{(currentPage - 1) * POSTS_PER_PAGE + index + 1}</div>
            <div className="post-title-container">
              <span className={`post-category post-category-${post.board}`}>
                {post.board}
              </span>
              <span>&nbsp;{post.title}</span>
              <span className="post-comments-count">&nbsp;[{post.commentsCount || 0}]</span>
            </div>
            <div>{post.author && post.author.email ? post.author.email : '알 수 없음'}</div>
            <div>{formatCreatedAt(post.createdAt)}</div> {/* 작성 시간 조건부 표시 */}
            <div>{post.views || 0}</div>
            <div>{post.likes || 0}</div>
            <div>{post.dislikes || 0}</div>
          </div>
        ))
      )}
      <hr />
      <div className="pagination-container">
        <div className="pagination">
          {renderPagination()}
        </div>
        <div className="search-container-custom">
          <select
            value={searchCondition}
            onChange={(e) => setSearchCondition(e.target.value)}
            className="search-select-custom"
          >
            <option value="전체">전체</option>
            <option value="작성자">작성자</option>
            <option value="댓글">댓글</option>
            <option value="내용">내용</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-custom"
          />
          <button
            onClick={() => setTriggerSearch(!triggerSearch)}
            className="search-button-custom"
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostList;


