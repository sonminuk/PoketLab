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
- **백엔드**: Firebase Realtime Database, Node.js
- **데이터 수집**: 웹 스크래핑 (python 사용)
