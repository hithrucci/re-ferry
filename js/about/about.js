gsap.registerPlugin(ScrollTrigger);

/*page1*/
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".page1 .title",
      start: "top 30%",
      end: "bottom 70%",
      scrub: true,
      pin: true,
      // once: true, /*최초 한 번만 작동하게*/
      //   markers: true,
    },
  })
  .to(".title h2", { opacity: 1 })
  .to(".line_left", { scaleX: 1, duration: 20 }, 0.5)
  .to(".line_right", { scaleX: 1, duration: 20 }, 0.5); // 동시에 실행

gsap.from(".logo_bear", {
  x: "-200%",
  rotation: 360,
  scale: 0.2,
  duration: 0.5,
  scrollTrigger: {
    trigger: ".logo_bear",
    start: "top 40%",
    // markers: true,
  },
});

gsap.from(".franchise", {
  x: "200%",
  duration: 0.5,
  scrollTrigger: {
    trigger: ".franchise",
    start: "top 40%",
    // markers: true,
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
    { x: -200, opacity: 1, duration: 1.5 },
    0
  ) // 왼쪽으로
  .fromTo(
    ".story .text",
    { x: 0, opacity: 0 },
    { x: 200, opacity: 1, duration: 1.5 },
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
    { x: 45, opacity: 1, duration: 2 },
    0
  ) // 오른쪽으로
  .fromTo(
    ".dessert .text",
    { x: 0, opacity: 0 },
    { x: -45, opacity: 1, duration: 2 },
    0
  ); // 왼쪽으로

//flavor섹션(이미지 회전)
gsap.to(".flavorImg img", {
  duration: 3 /* 애니메이션 지속 시간 (초 단위) */,
  rotationY: 360 /* Y축으로 360도 회전 */,
  ease: "power2.inOut" /* 애니메이션 속도 곡선 (선택 사항) */,
  repeat: -1 /* 무한 반복 */,
  yoyo: false /* 왕복 여부 (false면 한 방향으로만 계속 회전) */,
});
