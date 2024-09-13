import React from 'react';

const PostTable = ({ posts, handleEditPost, handleDeletePost }) => {
  return (
    <table className="post-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
          <th>추천수</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        {posts.length > 0 ? (
          posts.map(([id, post], index) => (
            <tr key={id}>
              <td>{index + 1}</td> {/* 번호 */}
              <td>{post.title}</td> {/* 제목 */}
              <td>{post.authorId}</td> {/* 작성자 */}
              <td>{new Date(post.date).toLocaleDateString()}</td> {/* 작성일 */}
              <td>{post.views}</td> {/* 조회수 */}
              <td>{post.recommendations}</td> {/* 추천수 */}
              <td>
                <button onClick={() => handleEditPost(id, post)}>수정</button>
                <button onClick={() => handleDeletePost(id)}>삭제</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">게시물이 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PostTable;
