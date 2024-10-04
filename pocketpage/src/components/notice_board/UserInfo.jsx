import React from 'react';
import AuthPage from '../user/AuthPage';
const UserInfo = () => {
  return (
    <aside className="user-info">
      <h3>회원 정보</h3>
      <AuthPage />
      {/* If logged in, display user information */}
    </aside>
  );
};

export default UserInfo;
