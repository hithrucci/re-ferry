/*header, footer 로드*/
document.addEventListener("DOMContentLoaded", () => {
  const basePath =
    location.hostname === "hithrucci.github.io" ? "/re-ferry" : "";

  // 공통: html 조각 삽입 함수
  const insert = (selector, url) =>
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        document.querySelector(selector).innerHTML = html;
      });

  // 1) 헤더 넣기
  const headerPromise = insert("header", `${basePath}/header.html`);

  // 2) 풋터 넣기 (헤더와 병렬로 해도 됨)
  insert("footer", `${basePath}/footer.html`);

  // 3) 헤더가 DOM에 들어간 뒤 header.js 로드
  headerPromise.then(() => {
    // 중복 로드 방지 (옵션)
    if (!document.querySelector("script[data-header-js]")) {
      const s = document.createElement("script");
      s.src = `${basePath}/js/header.js`; // 경로는 프로젝트에 맞게
      s.defer = true; // DOM 파싱 후 실행 (안 줘도 무방)
      s.setAttribute("data-header-js", ""); // 중복방지 마커
      document.body.appendChild(s);
    }
  });
});

/*서브메뉴 scroll 이동*/
document.addEventListener("DOMContentLoaded", () => {
  const p = new URLSearchParams(location.search).get("scroll");
  if (p) return scrollTo({ top: +p, behavior: "smooth" });

  if (!location.hash) return;

  const t = document.querySelector(location.hash);
  if (t) {
    const headerOffset = 100;
    const y = t.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
});

/*about 서브페이지*/
gsap.from("#visual img", {
  xPercent: -150,
  scale: 0.1,
  duration: 2,
  ease: "power1.out",
  rotation: -5,
  delay: 0.5,
});

gsap.registerPlugin(ScrollTrigger);

/*page1 title 양측 자라나는 라인*/
gsap
  .timeline()
  .to(".line_left", { width: "30%", duration: 3, ease: "power2.out" }, 0)
  .to(".line_right", { width: "30%", duration: 3, ease: "power2.out" }, 0)
  .to(".page1 .title h2", { opacity: 1, duration: 1 }, 0);

/*page1 title 곰 & 프랜차이즈*/
gsap.from(".logo_bear", {
  x: "-200%",
  rotation: 360,
  scale: 0.2,
  duration: 0.5,
  scrollTrigger: {
    trigger: ".page1",
    start: "top 30%",
    markers: true,
  },
});

gsap.from(".franchise", {
  x: "200%",
  duration: 0.5,
  scrollTrigger: {
    trigger: ".page1",
    start: "top 30%",
    markers: true,
  },
});

/*page2 타이틀*/
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".page2 .title",
      start: "top 50%",
      end: "top 70%",
      scrub: true,
      //   markers: true,
    },
  })
  .to(".frame_left", { translateX: 0, duration: 2 }, 0)
  .to(".frame_right", { translateX: 0, duration: 2 }, 0)
  .to(".title h2", { opacity: 1 });

/*story 섹션*/
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".story",
      start: "top 90%",
      end: "top 30%",
      scrub: true,
      // once: true,
      // markers: true,
    },
  })
  .fromTo(
    ".story .brandImg",
    { x: 0, opacity: 0 },
    { x: -90, opacity: 1, duration: 1 },
    0
  ) // 왼쪽으로
  .fromTo(
    ".story .text",
    { x: 0, opacity: 0 },
    { x: 70, opacity: 1, duration: 1 },
    0
  ) // 오른쪽으로

  //.origin 애니메이션: 화면 밖에서 최종 위치로 이동
  .fromTo(
    ".story .text .origin",
    { x: "-100vw", opacity: 0 },
    { x: "-18vw", opacity: 1 },
    // 메인 애니메이션이 끝나는 시점 이후 (스크롤 위치 '1' 이후)
    1.5
  );

// dessert 섹션
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".story",
      start: "top 90%",
      end: "top 30%",
      scrub: true,
      // once: true,
      // markers: true,
    },
  })
  .fromTo(
    ".dessert .brandImg",
    { x: 0, opacity: 0 },
    { x: 230, opacity: 1, duration: 1 },
    0
  ) // 오른쪽으로
  .fromTo(
    ".dessert .text",
    { x: 0, opacity: 0 },
    { x: -70, opacity: 1, duration: 1 },
    0
  ); // 왼쪽으로

gsap.to(".flavorImg img", {
  duration: 3 /* 애니메이션 지속 시간 (초 단위) */,
  rotationY: 360 /* Y축으로 360도 회전 */,
  ease: "power2.inOut",
  once: true /*무한 반복 repeat: -1*/,
  // repeatDelay: 2, // 한 바퀴 끝나고 2초 쉬었다가 다시 회전
  yoyo: false /* 왕복 여부 (false면 한 방향으로만 계속 회전) */,
});

gsap.from(".design>img", {
  x: 250,
  y: 250,
  scale: 1,
  duration: 2,
  scrollTrigger: {
    // scrollTrigger 옵션은 소문자로 시작
    trigger: ".design",
    start: "top 80%",
    end: "bottom 50%",
    scrub: 2,
    // markers: true,
  },
});

gsap.from(".design .text", {
  x: "-100%",
  duration: 2,
  scrollTrigger: {
    // scrollTrigger 옵션은 소문자로 시작
    trigger: ".design",
    start: "top 80%",
    end: "bottom 10%",
    scrub: 2,
    // once: true,
    // markers: true,
  },
});
