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

const pcSmall = window.matchMedia("(min-width:1220px)");
const tab = window.matchMedia("(min-width:720px) and (max-width:1219px)");
const mobile = window.matchMedia("(max-width:719px)");

/*about 서브페이지*/
gsap.from("#visual img", {
  xPercent: -150,
  scale: 0.1,
  duration: 1,
  ease: "power1.out",
  rotation: -5,
  // delay: 0.2,
});

gsap.registerPlugin(ScrollTrigger);

/*page1 title 양측 자라나는 라인*/
gsap
  .timeline()
  .to(".line_left", { width: "30%", duration: 3, ease: "power2.out" }, 0)
  .to(".line_right", { width: "30%", duration: 3, ease: "power2.out" }, 0)
  .to(".page1 .title h2", { opacity: 1 }, 0);

/*page1 title 곰 & 프랜차이즈*/
gsap.from(".logo_bear", {
  x: "-200%",
  rotation: 360,
  scale: 0.2,
  duration: 0.5,
  scrollTrigger: {
    trigger: ".page1",
    start: "top 20%",
    markers: true,
  },
});

gsap.from(".franchise", {
  x: "200%",
  duration: 0.5,
  scrollTrigger: {
    trigger: ".page1",
    start: "top 20%",
    // markers: true,
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
  .to(".frame_right", { translateX: 0, duration: 2 }, 0);

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
    { x: -70, opacity: 1, duration: 1 },
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
    { x: "-15vw", y: "3vw", opacity: 1, duration: 1.5 }
  );

// dessert 섹션
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".dessert",
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
  )
  .fromTo(
    ".dessert .text",
    { x: 0, opacity: 0 },
    { x: -70, opacity: 1, duration: 1 },
    0
  )

  //.origin_1 : 화면 밖에서 최종 위치로 이동
  .fromTo(
    ".dessert .text .origin_1",
    { x: "100vw", opacity: 0 },
    { x: "1vw", opacity: 1, duration: 1.5 }
  );

// flavor 섹션
gsap.to(".flavorImg img", {
  duration: 3 /* 지속시간 (초) */,
  rotationY: 360 /* Y축으로 360도 회전 */,
  ease: "power2.inOut",
  repeat: -1, //무한반복. 한 번 하려면 once:true
  repeatDelay: 3, // 한 바퀴 끝나고 3초 쉬고 회전
  yoyo: false /* 왕복 여부 (false 한 방향으로만 회전) */,
});

gsap.fromTo(
  ".flavor .season",
  { opacity: 0, y: 200 },
  {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: ".flavor",
      start: "top 50%",
      end: "top 30%",
      scrub: 2,
      // markers: true,
    },
  }
);

gsap.from(".design>img", {
  x: 250,
  y: 150,
  scale: 1,
  duration: 2,
  scrollTrigger: {
    trigger: ".design",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 2,
    // markers: true,
  },
});

gsap.from(".design .text", {
  x: "-100%",
  duration: 2,
  scrollTrigger: {
    trigger: ".design",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 2,
    // once: true,
    // markers: true,
  },
});

/***** 태블릿 jsap *****/
if (tab.matches) {
  gsap.registerPlugin(ScrollTrigger);

  /*page1 title 양측 자라나는 라인*/
  gsap
    .timeline()
    .to(".line_left", { width: "20%", duration: 3, ease: "power2.out" }, 0)
    .to(".line_right", { width: "20%", duration: 3, ease: "power2.out" }, 0)
    .to(".page1 .title h2", { opacity: 1 }, 0);

  /*page2 story 섹션*/
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".story",
        start: "top 50%",
        end: "bottom 30%",
        scrub: true,
        // markers: true,
      },
    })
    .fromTo(
      ".story .brandImg",
      { x: 0, opacity: 0 },
      { x: -35, opacity: 1, duration: 1 },
      0
    ) // 왼쪽으로
    .fromTo(
      ".story .text",
      { x: 0, opacity: 0 },
      { x: 30, opacity: 1, duration: 1 },
      0
    ) // 오른쪽으로

    //.origin 애니메이션: 밖에서 안으로 이동
    .fromTo(
      ".story .text .origin",
      { x: "-100vw", opacity: 0 },
      { x: "-15vw", y: "3vw", opacity: 1, duration: 1.5 }
    );

  // dessert 섹션
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".dessert",
        start: "top 90%",
        end: "top 30%",
        scrub: true,
        // markers: true,
      },
    })
    .fromTo(
      ".dessert .brandImg",
      { x: 0, opacity: 0 },
      { x: 150, opacity: 1, duration: 1 },
      0
    )
    .fromTo(
      ".dessert .text",
      { x: 0, opacity: 0 },
      { x: -30, opacity: 1, duration: 1 },
      0
    );
}

/***** 모바일 jsap *****/
if (mobile.matches) {
  gsap.registerPlugin(ScrollTrigger);
  /*page2 story 섹션*/
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".story",
        start: "top 50%",
        end: "bottom 30%",
        scrub: true,
        // markers: true,
      },
    })
    .fromTo(
      ".story .brandImg",
      { x: 0, opacity: 0 },
      { x: -35, opacity: 1, duration: 1 },
      0
    ) // 왼쪽으로
    .fromTo(
      ".story .text",
      { x: 0, opacity: 0 },
      { x: 30, opacity: 1, duration: 1 },
      0
    ) // 오른쪽으로

    //.origin 밖에서 안으로 이동
    .fromTo(
      ".story .text .origin",
      { x: "-100vw", opacity: 0 },
      { x: "-15vw", y: "3vw", opacity: 1, duration: 1.5 }
    );

  // dessert 섹션
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".dessert",
        start: "top 90%",
        end: "top 30%",
        scrub: true,
        // markers: true,
      },
    })
    .fromTo(
      ".dessert .brandImg",
      { x: 0, opacity: 0 },
      { x: 100, opacity: 1, duration: 1 },
      0
    )
    .fromTo(
      ".dessert .text",
      { x: 0, opacity: 0 },
      { x: -30, opacity: 1, duration: 1 },
      0
    );

  gsap.fromTo(
    ".flavor .season",
    { opacity: 0, y: 200 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: ".flavor",
        start: "top 50%",
        end: "bottom 30%",
        scrub: 2,
        // markers: true,
      },
    }
  );
}
