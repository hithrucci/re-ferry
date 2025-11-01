$(function () {
  $("header").load("../../header.html");
  $("footer").load("../../footer.html");
});
gsap.registerPlugin(ScrollTrigger);

/*page1 title 양측 자라나는 라인*/
gsap
  .timeline()
  .to(".line_left", { width: "40%", duration: 3, ease: "power2.out" }, 0)
  .to(".line_right", { width: "40%", duration: 3, ease: "power2.out" }, 0)
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

/*page2*/
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

// story 섹션
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".story",
      start: "top 90%",
      end: "top 30%",
      scrub: true,
      // markers: true,
    },
  })
  .fromTo(
    ".story .brandImg",
    { x: 0, opacity: 0 },
    { x: -200, opacity: 1, duration: 1 },
    0
  ) // 왼쪽으로
  .fromTo(
    ".story .text",
    { x: 0, opacity: 0 },
    { x: 200, opacity: 1, duration: 1 },
    0
  ); // 오른쪽으로

// dessert 섹션
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".dessert",
      start: "top 80%",
      end: "top 30%",
      scrub: true,
      // markers: true,
    },
  })
  .fromTo(
    ".dessert .brandImg",
    { x: 0, opacity: 0 },
    { x: 45, opacity: 1, duration: 1 },
    0
  ) // 오른쪽으로
  .fromTo(
    ".dessert .text",
    { x: 0, opacity: 0 },
    { x: -45, opacity: 1, duration: 1 },
    0
  ); // 왼쪽으로

//flavor섹션(이미지 회전)
// gsap.to(".flavorImg img", {
//   duration: 3 /* 애니메이션 지속 시간 (초 단위) */,
//   rotationY: 360 /* Y축으로 360도 회전 */,
//   ease: "power2.inOut" /* 애니메이션 속도 곡선 (선택 사항) */,
//   repeat: -1 /* 무한 반복 */,
//   repeatDelay: 2, // 한 바퀴 끝나고 2초 쉬었다가 다시 회전
//   yoyo: false /* 왕복 여부 (false면 한 방향으로만 계속 회전) */,
// });

gsap.to(".flavorImg img", {
  duration: 3 /* 애니메이션 지속 시간 (초 단위) */,
  rotationY: 360 /* Y축으로 360도 회전 */,
  ease: "power2.inOut" /* 애니메이션 속도 곡선 (선택 사항) */,
  repeat: -1 /* 무한 반복 */,
  repeatDelay: 2, // 한 바퀴 끝나고 2초 쉬었다가 다시 회전
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
