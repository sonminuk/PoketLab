import { useEffect } from 'react';
import firebase from './firebaseConfig'; // Firebase 초기화된 인스턴스 가져오기

const AuthObserver = ({ setUser }) => {
  // Firebase Authentication의 상태 변화를 감지
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser); // 로그인 상태가 변경되면 부모 컴포넌트의 사용자 상태 업데이트
    });

    // 컴포넌트가 언마운트될 때 상태 변화 감지 중지
    return () => unsubscribe();
  }, [setUser]);

  // 이 컴포넌트는 로그인 상태를 감지하는 역할만 하므로 UI를 렌더링하지 않음
  return null;
};

export default AuthObserver;
