# 포켓로그 공략 사이트 프로젝트 (PoketLab)

## 프로젝트 소개

**포켓로그 게임 공략 사이트**는 포켓몬과 관련된 다양한 정보를 제공하는 웹 애플리케이션입니다. 사용자들은 이 사이트를 통해 포켓몬, 기술, 특성 등의 세부 정보를 확인하고, 게임 공략에 도움을 받을 수 있습니다. 이 프로젝트는 프론트엔드와 백엔드를 나누어 개발하며, 웹 스크래핑을 활용한 데이터 수집과 사용자 친화적인 인터페이스를 목표로 하고 있습니다.

---

## 프로젝트 폴더 구조

- **back 폴더**  
  포켓몬 정보 스크래핑 및 자바스크립트 원본 코드 관리
- **pogetpage 폴더**  
  스크래핑된 데이터를 기반으로 React로 코드 변환 및 웹 페이지 제작

---

## 팀원 구성

- **프론트엔드 개발**: 손민욱  
  React를 사용해 사용자 인터페이스를 구축하고, 데이터 시각화 및 사용자 경험을 개선합니다.

  python, firebase Realtime 등을 이용한 웹 스크래핑을 이용 데이터 수집
  (현재 (포켓몬정보, 기술, 특성)데이터만 있음)

- **백엔드 개발**: 김석진  
  데이터베이스 설계 및 관리, 서버 사이드 로직 구현, API 개발 등을 담당합니다.

- **서포트**: 정현철 (번갈아 가면서 진행)  
  프론트엔드, 백엔드 서포트 및 정보를 제공하는 역할을 수행합니다.

- **기여자**: 김경완 (조기 취업으로 팀에서 하차)

---

## 주요 기능

1. **포켓몬 정보 제공**  
   포켓몬의 이름, 타입, 스탯, 특성, 이미지 등을 포함한 세부 정보를 사용자에게 제공합니다.

2. **기술 정보 제공**  
   기술의 이름, 타입, 위력, 명중률, PP, 설명 등 게임 내 기술에 대한 상세 정보를 제공합니다.

3. **특성 정보 제공**  
   각 포켓몬의 특성에 대한 설명과 능력 발동 조건 등을 안내합니다.

4. **웹 스크래핑을 통한 데이터 업데이트**  
   최신 데이터를 실시간으로 수집하여 사용자에게 제공할 수 있도록 웹 스크래핑을 사용합니다.

5. **반응형 웹 디자인**  
   다양한 기기에서 최적화된 화면을 제공하는 반응형 웹 인터페이스를 구현합니다.

---

## 기술 스택

- **프론트엔드**: React, HTML, CSS, JavaScript,
- **백엔드**: Firebase Realtime Database, Node.js, spring boot
- **데이터 수집**: 웹 스크래핑 (python 사용)

## 현) 프로젝트 구조
``````
pocketpage/
│
├── public/
│   └── index.html            # HTML 템플릿
│
├── src/
│   ├── components/
│   │   ├── AbilitiesList.jsx  # 특성 목록 컴포넌트
│   │   ├── MovesList.jsx      # 기술 목록 컴포넌트
│   │   ├── PokemonList.jsx    # 포켓몬 목록 컴포넌트
│   │   └── notice_board/
│   │       ├── NoticeMain.jsx        # 메인 게시판 페이지
│   │       ├── NoticeMain.css        # 메인 게시판 페이지 스타일 시트
│   │       ├── Sidebar.js            # 게시판 목록을 표시하는 사이드바 컴포넌트
│   │       ├── UserInfo.js           # 회원 정보 및 로그인/회원가입 버튼을 표시하는 컴포넌트
│   │       ├── PostForm.js           # 글쓰기 및 수정 폼을 담당하는 컴포넌트
│   │       ├── PostTable.js          # 게시글 목록을 테이블로 표시하는 컴포넌트
│   ├── firebase.jsx           # Firebase 설정
│   ├── App.jsx                # 앱의 메인 컴포넌트
│   ├── App.css                # 스타일 시트
│   └── index.js               # 엔트리 포인트
│
└── package.json               # 프로젝트 메타데이터 및 종속성


``````

# 다음주 9/19 까지

09/12
손민욱- 게시판 틀 생성및 (글쓰기, 삭제, 수정) 기능 구현, firebase 연결해놓음

## 게시판 

- **메인화면**: 메인화면 (개념글, 공지글,추천기능, 검색기능)
- **게시글 페이지**: 게시글 볼수있는페이지 (댓글 기능)
- **마이페이지**: 자신의 정보 수정 페이지
- **회원가입**: 메인화면
- **로그인**: 메인화면
- **글쓰기**: 글쓰기화면 (수정화면 추가)

### 상세 구조
- 가장 위에 헤더 부분 고정
- 왼쪽   : sidebar (여러 게시판) 생성
- 오른쪽 : 회원정보 볼수 있는 부분 생성
  (회원가입, 로그인) 버튼 -> 로그인을 했다면 회원정보 출력 ()
- 가운데 : 게시판(글쓰기, 수정, 삭제)기능추가 

``````
참조

메인화면
개념글, 공지글, 추천 기능, 검색바 등을 포함한 화면.
게시글은 그리드 형태로 정렬하고, 상단에 검색바를 배치해 사용자가 쉽게 게시글을 찾을 수 있도록 만들면 좋습니다.

게시글 페이지
게시글을 상세히 볼 수 있는 화면으로, 하단에 댓글을 달 수 있는 섹션을 추가.
관련 게시글이나 최근 게시글을 보여주는 사이드바를 추가해 사용자 참여를 유도하면 좋습니다.

마이페이지
사용자 정보(아이디, 이메일, 비밀번호 등)를 수정할 수 있는 폼을 제공합니다.
프로필 사진을 추가하거나 수정할 수 있는 기능도 넣어 사용자 맞춤화를 강화할 수 있어요.

회원가입 & 로그인 페이지
간결하고 깔끔한 회원가입 및 로그인 폼.
모달 팝업 형태로 구현하거나 별도의 페이지로 제공할 수 있습니다.

글쓰기 페이지
텍스트를 포맷할 수 있는 리치 텍스트 에디터를 제공해 글 작성 시 다양한 기능(이미지 삽입, 링크 추가 등)을 사용할 수 있게 만듭니다.
글을 임시 저장하거나 바로 게시할 수 있는 버튼을 추가해 편리하게 글을 작성할 수 있도록 합니다.

디자인 고려 사항:
상단에 네비게이션 바를 항상 유지해 메인 화면, 마이페이지 등으로 쉽게 이동할 수 있게 구성.
반응형 디자인(예: Bootstrap이나 Material UI)을 사용해 모바일 환경에서도 깔끔하게 보이도록 구현.
브랜드 이미지와 일치하는 색상 테마를 사용해 가독성을 높이는 것이 좋습니다.
``````
## 메인페이지
- **소개글**: 소개 부분
- **공략정보**: 포켓로그 유튜브, 공략사이트, 공략 가이드북












