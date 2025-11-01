$(function () {
  $("footer").load("../../footer.html");
});
gsap.registerPlugin(ScrollTrigger);

/*visual*/
const visualBg = document.querySelector("#visual .bg");
const stickers = document.querySelectorAll("#visual .bg .stickers li");
const visualLogo = stickers[0];
const stkrArr = [...stickers].slice(1);

const stkrOffsets = [
  { x: 200, y: 100 }, // stkr1
  { x: -200, y: 100 }, // stkr2
  { x: -360, y: -20 }, // stkr3
  { x: -300, y: -100 }, // stkr4
  { x: 200, y: -120 }, // stkr5
  { x: 200, y: 0 }, // stkr6
];
stkrArr.forEach((stkr) => {
  stkr.addEventListener("mouseenter", () => {
    gsap.to(stkr, {
      rotation: 360,
      duration: 0.5,
      scale: 1.2,
    });
  });
  stkr.addEventListener("mouseleave", () => {
    gsap.to(stkr, {
      rotation: 0,
      scale: 1,
      duration: 0.5,
    });
  });
});

// 로고 회전 (숫자 + rotation 사용)
gsap.fromTo(
  visualLogo,
  { rotation: 360 },
  { rotation: 0, duration: 2.3, ease: "bounce.out" }
);

// 배경 TL
const tl = gsap
  .timeline()
  .from(visualBg, { opacity: 0, scale: 0.2, duration: 1, ease: "power4.in" })
  .to(visualBg, { opacity: 1, scale: 1.02, duration: 0.8, ease: "bounce.out" })
  .to(visualBg, { opacity: 1, scale: 1, duration: 0.5, ease: "power1.out" });

// 스티커 초기 상태 즉시 세팅
gsap.set(stkrArr, { scale: 0, autoAlpha: 0 });

// 스티커
const t2 = gsap.timeline({ paused: true }).fromTo(
  stkrArr,
  {
    x: (i) => stkrOffsets[i].x,
    y: (i) => stkrOffsets[i].y,
    scale: 0,
    autoAlpha: 0,
    rotation: -12,
    transformOrigin: "50% 50%",
  },
  {
    x: 0,
    y: 0,
    scale: 1,
    autoAlpha: 1,
    rotation: 0,
    duration: 1.2,
    ease: "back.out(1.7)",
    overwrite: true,
    // 동시에 폭발: stagger 없이
  }
);
tl.add(() => t2.play(0));

//gnb more창
let headMore = document.querySelector(".gnb li:nth-child(5)");
let moreMenu = document.querySelector("header .moreMenu");
let body = document.querySelector("body");
headMore.addEventListener("click", () => {
  body.classList.add("on");
  gsap.to(moreMenu, {
    duration: 1,
    zIndex: 20,
    width: 600,
  });
});

/* text h2 after */
ScrollTrigger.create({
  trigger: "#about",
  start: "top top",
  once: true,
  onEnter: () => {
    const h2 = document.querySelector("#about .textBox h2");
    h2.classList.remove("on");
    void h2.offsetWidth; // reflow
    h2.classList.add("on");
  },
});

/* 본문 p 페이드 업 (1회) */
gsap.fromTo(
  "#about .inner .textBox p",
  { opacity: 0, y: 100 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#about",
      start: "top top",
      once: true,
      onEnter: () => {
        setTimeout(() => {
          document
            .querySelector("#about .inner .textBox p")
            .classList.add("on");
        }, 1200); // 페이드업 duration(1s)과 동일하게 설정
      },
    },
  }
);

/* 텍스트 박스 슬라이드 인 (1회) */
gsap.from("#about .textBox", {
  x: -80,
  opacity: 0,
  duration: 1.1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#about",
    start: "top 75%",
    once: true,
  },
});
gsap.to("#about .textBox", {});
/* 현재 on 이미지 살짝 인 (1회) */
gsap.from("#about .images li.on img", {
  x: 200,
  opacity: 0,
  duration: 1.1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#about",
    start: "top 75%",
    once: true,
  },
});

/* content 자동페이드 */
const aboutImages = document.querySelectorAll("#about .content .images li");
const total = aboutImages.length;
let current = 0;
const more = document.querySelector("#about .content .more");
const content = document.querySelector("#about .content");

function aboutFade() {
  current = (current + 1) % total;
  aboutImages.forEach((li) => li.classList.remove("on"));
  aboutImages[current].classList.add("on");
}
setInterval(aboutFade, 4000);

/* content list hover효과 */
$("#about .content").on("mouseleave", function () {
  $(aboutImages).css({ scale: "1" });
});
$(aboutImages).on("mouseenter", function () {
  $(aboutImages).css({ scale: "1.2" });
});

/* content more hover효과 + 흔들기 */
$(more).on("mouseleave", function () {
  $(aboutImages).css({ scale: "1" });
});
$(more).on("mouseenter", function () {
  $(aboutImages).css({ scale: "1.2" });
});
let moreShake;
content.addEventListener("mouseenter", () => {
  if (moreShake) moreShake.kill();
  moreShake = gsap.to(more, {
    rotation: 15,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
  });
});
content.addEventListener("mouseleave", () => {
  if (moreShake) moreShake.kill();
  gsap.to(more, { rotation: 0, duration: 0.5 });
});

/* menu walk */
gsap.to("#menu .walk", {
  x: 1300,
  scrollTrigger: {
    trigger: "#about",
    start: "bottom bottom",
    end: "bottom top",
    scrub: true,
    // markers: true,
  },
});

/*event 진입*/
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#event",
      start: "20% 70%",
      end: "bottom 20%",
      // markers: true,
    },
  })
  .from("#event .inner div:nth-child(3)", { opacity: 0, x: 1000, y: -200 }, 0)
  .from(
    "#event .inner div:nth-child(2)",
    { opacity: 0, x: -1000, y: -200 },
    0.2
  )
  .from(
    "#event .inner div:nth-child(1)",
    { opacity: 0, x: 1000, y: -300 },
    0.3
  );
/*event 클릭 모달창*/
