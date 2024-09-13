import React from 'react';

const PostForm = ({
  title,
  content,
  setTitle,
  setContent,
  isEditing,
  handleSaveEdit,
  handleAddPost,
  setShowPostForm,
}) => {
  // 글쓰기 취소 버튼 클릭 시 처리
  const handleCancel = () => {
    setTitle(''); // 제목 초기화
    setContent(''); // 내용 초기화
    setShowPostForm(false); // 글쓰기 폼 숨김
  };

  return (
    <div className="post-form">
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {isEditing ? (
        <button onClick={handleSaveEdit}>저장</button>
      ) : (
        <button onClick={handleAddPost}>작성</button>
      )}
      <button onClick={handleCancel}>취소</button> {/* 취소 버튼 */}
    </div>
  );
};

export default PostForm;
