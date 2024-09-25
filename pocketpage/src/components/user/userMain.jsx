// App.jsx (혹은 main routing 파일)
import React from 'react';
import AuthPage from './AuthPage'; // 로그인 메인 페이지 불러오기

const App = () => {
  return (
    <div>
      {/* 로그인 메인 페이지 렌더링 */}
      <AuthPage />
    </div>
  );
};

export default App;
