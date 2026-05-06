const weeks = [
  {
    week: 1,
    type: "basic",
    title: "웹 앱 구조 이해하기",
    meta: "HTML · CSS · JS의 역할",
    goals: ["HTML 문서 구조 만들기", "CSS 연결하기", "JS 파일 실행 확인하기"],
    mission: "자기소개 랜딩 페이지를 만들고, 버튼을 누르면 인사 문구가 바뀌게 해보세요.",
    prompt: `나는 코딩 초보자입니다. HTML, CSS, JS만 사용해서 자기소개 랜딩 페이지를 만들고 싶어요.\n파일은 index.html, styles.css, app.js로 나누고, 버튼을 누르면 인사 문구가 바뀌는 예제를 단계별로 설명해 주세요.`,
  },
  {
    week: 2,
    type: "basic",
    title: "레이아웃과 반응형 디자인",
    meta: "Flexbox · Grid · Mobile",
    goals: ["카드 레이아웃 만들기", "모바일 화면 대응", "색상과 여백 정리"],
    mission: "관심 있는 주제 6개를 카드로 보여주는 반응형 갤러리를 만들어보세요.",
    prompt: `HTML/CSS 초보자도 이해할 수 있게 반응형 카드 갤러리를 만들어 주세요.\nFlexbox 또는 Grid를 사용하고, 모바일에서는 1열로 보이게 해주세요.`,
  },
  {
    week: 3,
    type: "basic",
    title: "JavaScript 기초 상호작용",
    meta: "DOM · Event · State",
    goals: ["DOM 요소 선택하기", "클릭 이벤트 연결", "화면 내용 동적으로 변경"],
    mission: "할 일 추가/완료/삭제가 가능한 작은 Todo 앱을 만들어보세요.",
    prompt: `바닐라 JavaScript로 Todo 앱을 만들고 싶어요.\n할 일 추가, 완료 체크, 삭제 기능을 넣고 각 코드가 어떤 의미인지 초보자 기준으로 설명해 주세요.`,
  },
  {
    week: 4,
    type: "project",
    title: "데이터를 화면에 그리기",
    meta: "Array · Render · Filter",
    goals: ["배열 데이터 만들기", "map으로 카드 렌더링", "필터 버튼 구현"],
    mission: "영화/책/강의 목록을 배열로 만들고 카테고리 필터를 추가해보세요.",
    prompt: `배열 데이터를 기반으로 목록 카드를 렌더링하는 웹 앱을 만들고 싶어요.\n카테고리 필터 버튼도 추가하고, 초보자가 이해할 수 있게 render 함수 구조를 설명해 주세요.`,
  },
  {
    week: 5,
    type: "project",
    title: "브라우저 저장소 활용",
    meta: "localStorage · Progress",
    goals: ["localStorage 이해", "사용자 입력 저장", "새로고침 후 데이터 유지"],
    mission: "학습 체크리스트를 만들고 완료 상태가 브라우저에 저장되게 해보세요.",
    prompt: `localStorage를 사용해서 체크리스트 완료 상태가 저장되는 웹 앱을 만들고 싶어요.\n새로고침해도 상태가 유지되도록 구현하고, 저장/불러오기 흐름을 설명해 주세요.`,
  },
  {
    week: 6,
    type: "project",
    title: "API와 비동기 처리 맛보기",
    meta: "fetch · async/await · Error",
    goals: ["fetch로 데이터 요청", "로딩/에러 상태 표시", "API 응답 화면 출력"],
    mission: "공개 API 또는 샘플 JSON을 불러와 카드 목록으로 보여주세요.",
    prompt: `fetch와 async/await를 처음 배우는 사람입니다.\n공개 API 데이터를 불러와 화면에 보여주는 예제를 만들고, 로딩 상태와 에러 메시지도 포함해 주세요.`,
  },
  {
    week: 7,
    type: "project",
    title: "AI와 함께 기능 개선하기",
    meta: "Prompting · Debugging · Refactor",
    goals: ["오류 메시지 읽기", "AI에게 수정 요청하기", "코드 정리/리팩터링"],
    mission: "기존 앱에 검색 기능, 다크모드, 빈 상태 메시지 중 하나를 추가해보세요.",
    prompt: `아래 코드에 기능을 하나 추가하고 싶습니다.\n초보자가 이해할 수 있게 변경 위치를 알려주고, 수정된 전체 코드를 파일별로 제시해 주세요.\n추가할 기능: 검색 기능`,
  },
  {
    week: 8,
    type: "deploy",
    title: "완성 앱 배포하기",
    meta: "Netlify · Vercel · README",
    goals: ["정적 웹 앱 구조 확인", "배포 설정 이해", "README 작성"],
    mission: "완성한 웹 앱을 Netlify 또는 Vercel에 배포하고 공유 링크를 만들어보세요.",
    prompt: `HTML, CSS, JS로 만든 정적 웹 앱을 Netlify 또는 Vercel에 배포하려고 합니다.\n초보자 기준으로 폴더 구조 확인, 배포 방법, 자주 나는 오류 해결법을 단계별로 알려주세요.`,
  },
];

const STORAGE_KEY = "vibe-coding-class-progress";
const weekGrid = document.querySelector("#weekGrid");
const completedCount = document.querySelector("#completedCount");
const progressPercent = document.querySelector("#progressPercent");
const filters = document.querySelectorAll(".filter");
const lessonDialog = document.querySelector("#lessonDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeDialogButton = document.querySelector("#closeDialogButton");
const resetProgressButton = document.querySelector("#resetProgressButton");

let currentFilter = "all";
let completedWeeks = loadProgress();

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(completedWeeks));
}

function updateStats() {
  completedCount.textContent = completedWeeks.length;
  progressPercent.textContent = `${Math.round((completedWeeks.length / weeks.length) * 100)}%`;
}

function renderWeeks() {
  const visibleWeeks = currentFilter === "all" ? weeks : weeks.filter((item) => item.type === currentFilter);

  weekGrid.innerHTML = visibleWeeks
    .map((item) => {
      const completed = completedWeeks.includes(item.week);
      return `
        <article class="week-card ${completed ? "completed" : ""}">
          <span class="week-number">${item.week}</span>
          <h3>${item.title}</h3>
          <p class="week-meta">${item.meta}</p>
          <ul>
            ${item.goals.map((goal) => `<li>${goal}</li>`).join("")}
          </ul>
          <div class="card-actions">
            <button type="button" data-action="detail" data-week="${item.week}">자세히</button>
            <button class="done" type="button" data-action="toggle" data-week="${item.week}">
              ${completed ? "완료 취소" : "완료"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  updateStats();
}

function openLesson(weekNumber) {
  const item = weeks.find((week) => week.week === weekNumber);
  if (!item) return;

  dialogContent.innerHTML = `
    <p class="section-label">Week ${item.week}</p>
    <h2>${item.title}</h2>
    <p>${item.meta}</p>
    <h3>이번 주 미션</h3>
    <p>${item.mission}</p>
    <h3>AI에게 이렇게 요청해 보세요</h3>
    <div class="prompt-box">${item.prompt}</div>
  `;

  lessonDialog.showModal();
}

function toggleWeek(weekNumber) {
  if (completedWeeks.includes(weekNumber)) {
    completedWeeks = completedWeeks.filter((week) => week !== weekNumber);
  } else {
    completedWeeks = [...completedWeeks, weekNumber].sort((a, b) => a - b);
  }
  saveProgress();
  renderWeeks();
}

weekGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const weekNumber = Number(button.dataset.week);
  if (button.dataset.action === "detail") openLesson(weekNumber);
  if (button.dataset.action === "toggle") toggleWeek(weekNumber);
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    renderWeeks();
  });
});

closeDialogButton.addEventListener("click", () => lessonDialog.close());

resetProgressButton.addEventListener("click", () => {
  const shouldReset = confirm("학습 진도를 모두 초기화할까요?");
  if (!shouldReset) return;
  completedWeeks = [];
  saveProgress();
  renderWeeks();
});

renderWeeks();
