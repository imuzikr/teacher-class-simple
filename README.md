# Vibe Coding Class

초보자를 위한 8주차 Vibe Coding 학습용 정적 웹 앱입니다.

## 구성

```txt
index.html   # 페이지 구조
styles.css   # 디자인/반응형 스타일
app.js       # 커리큘럼 렌더링, 필터, 진도 저장 기능
```

## 실행 방법

가장 간단하게는 `index.html` 파일을 브라우저로 열면 됩니다.

로컬 서버로 실행하려면 프로젝트 폴더에서 아래 명령을 사용할 수 있습니다.

```bash
npx serve .
```

또는 Python이 설치되어 있다면:

```bash
python -m http.server 5173
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

## 기능

- 8주차 Vibe Coding 커리큘럼 카드
- 기초/프로젝트/배포 필터
- 주차별 상세 미션 보기
- AI에게 줄 수 있는 예시 프롬프트 제공
- 완료 진도 저장: `localStorage` 사용
- 모바일 반응형 디자인

## 배포

Netlify나 Vercel에 정적 사이트로 배포할 수 있습니다.

- Build command: 비워둠
- Publish directory: `.`

빌드 도구 없이 HTML/CSS/JS 원본 파일을 그대로 배포하는 방식입니다.
