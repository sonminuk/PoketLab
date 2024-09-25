import { useState } from 'react';
import firebase from './firebaseConfig'; // Firebase 초기화된 인스턴스 가져오기

const SignUp = () => {
  // 상태 변수: 이메일과 비밀번호를 저장
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 회원가입 처리 함수
  const handleSignUp = async (e) => {
    e.preventDefault(); // 기본 form 제출 동작 방지
    try {
      // Firebase Authentication을 사용하여 이메일과 비밀번호로 사용자 생성
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // 성공적으로 회원가입이 완료되었을 때 사용자 정보 출력
      console.log("User signed up:", user);
    } catch (error) {
      // 에러 발생 시 콘솔에 출력
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      {/* 이메일 입력 필드 */}
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      {/* 비밀번호 입력 필드 */}
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <br></br>
      {/* 회원가입 버튼 */}
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignUp;
