# Netflix clone

이 프로젝트는 노마드 코더의 Netflix clone 강의를 보며 공부한 내용과 간단한 추가적인 기능을 넣었습니다. <br />
추가 기능으로 React-hook-form을 연습하고자 회원가입과 로그인를 추가했습니다. <br />

<a href="https://nyoung03.github.io/nomflix-react/">보러가기</a>

### 스텍
- react
- typescript
- react-router-dom
- react-query
- react-hook-form
- styled-components
- framer-motion
- gh-pages

### 기간
2022.06.28 ~ 2022.07.21

### 구조
```plaintext
1) src
 - App.tsx
 - index.tsx
 - Style.tsx
 - styled.d.ts
 - theme.ts
 - components
    - Header.tsx
    - MovieDetail.tsx
    - TvDetail.tsx
    - SearchDetail.tsx
 - routes
    - Home.tsx
    - Login.tsx
    - SignUp.tsx
    - Tv.tsx
    - Search.tsx
    - api.ts
```

### 노션 정리
프로젝트를 구현하며 마주한 문제를 고민한 내용과 해결 방법을 작성하였습니다.
<a href="https://fuzzy-energy-8aa.notion.site/Nomflix-5ee4466f893149a8ac51b1f4460f4733">노션 정리</a>

<hr />

### 1. 회원가입, 로그인
- `localstorage`를 이용하여 회원가입과 로그인을 구현했습니다.
- react-hook-form을 이용하여 유효성 검사 기능을 구현했습니다.
<img src="https://user-images.githubusercontent.com/87607036/188459780-c2178d4e-44b3-49d1-a8b1-4494457b25aa.gif" />
<img src="https://user-images.githubusercontent.com/87607036/188464771-7d4ce862-4de2-4bc9-bb13-87e1939a66cc.gif" />

### 2. 메인화면
- TMDB API를 이용하여 카테고리별 영화와 방송 프로그램을 슬라이드 형식으로 구현했습니다.
- 각 영화, 방송 카드를 `hover` 하면 간단한 정보를 볼 수 있게 구현했습니다.
- 각 영화, 방송 카드를 클릭하면 상세 정보를 볼 수 있는 페이지를 구현했습니다.
<img src="https://user-images.githubusercontent.com/87607036/188464173-3615c8be-127e-42ab-bfbb-9a141d9be7af.gif" />

### 3. 검색
- `useLocation`과 `new URLSearchParams()`를 이용하여 키워드 검색 시 관련 데이터들을 나열하였습니다.
<img src="https://user-images.githubusercontent.com/87607036/188459879-cfb85795-a7e0-42f4-87ee-1c4887cb5239.gif" />

