import React from 'react';

const UserInfo = () => {
  return (
    <aside className="user-info">
      <h3>회원 정보</h3>
      <button>로그인</button>
      <button>회원가입</button>
      {/* If logged in, display user information */}
    </aside>
  );
};

export default UserInfo;
