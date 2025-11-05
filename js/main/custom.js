/*footer 로드*/
document.addEventListener("DOMContentLoaded", () => {
  const basePath =
    location.hostname === "hithrucci.github.io" ? "/re-ferry" : "";
  fetch(`${basePath}/footer.html`)
    .then((res) => res.text())
    .then((data) => (document.querySelector("footer").innerHTML = data));
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

/* ====== 메뉴 썸네일 원본 인덱스 박제 (캐러셀 DOM 재배치 무시) ====== */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".donuts .menuList li").forEach((li, i) => {
    li.dataset.idx = i; // 도넛 썸네일 원본 인덱스
  });
  document.querySelectorAll(".beverage .menuList li").forEach((li, i) => {
    li.dataset.idx = i; // 음료 썸네일 원본 인덱스
  });
});

/*visual*/

gsap.registerPlugin(ScrollTrigger);

const visualBg = document.querySelector("#visual .bg");
const stickers = document.querySelectorAll("#visual .bg .stickers li");
const visualLogo = stickers[0];
const stkrArr = [...stickers].slice(1);

const stkrOffsets = [
  { x: 200, y: 100 },
  { x: -200, y: 100 },
  { x: -360, y: -20 },
  { x: -300, y: -100 },
  { x: 200, y: -120 },
  { x: 200, y: 0 },
];

stkrArr.forEach((stkr) => {
  stkr.addEventListener("mouseenter", () => {
    gsap.to(stkr, { rotation: 360, duration: 0.5, scale: 1.2 });
  });
  stkr.addEventListener("mouseleave", () => {
    gsap.to(stkr, { rotation: 0, scale: 1, duration: 0.5 });
  });
});

gsap.fromTo(
  visualLogo,
  { rotation: 360 },
  { rotation: 0, duration: 2.3, ease: "bounce.out" }
);

const tl = gsap
  .timeline()
  .from(visualBg, { opacity: 0, scale: 0.2, duration: 1, ease: "power4.in" })
  .to(visualBg, { opacity: 1, scale: 1.02, duration: 0.8, ease: "bounce.out" })
  .to(visualBg, { opacity: 1, scale: 1, duration: 0.5, ease: "power1.out" });

gsap.set(stkrArr, { scale: 0, autoAlpha: 0 });

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
  }
);
tl.add(() => t2.play(0));

/*visual video*/
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#visual",
      pin: true,
      pinSpacing: false,
      start: "top top",
      scrub: 2,
    },
  })
  .to("#visual .stickers", {
    scale: 0,
    duration: 3,
  })
  .to("#visual .bg", {
    backgroundSize: "0",
    duration: 1,
  })
  .to("header", { left: -200, opacity: 0, duration: 1 }, 0)
  .to(".videoBox", {
    width: "100%",
    height: "100%",
    duration: 3,
    backgroundColor: "#000",
    borderRadius: "0",
    zIndex: 10,
  })
  .to("header", { left: 60, opacity: 1, duration: 3, delay: 3 });

/*scroll시 h1:hover 변화*/
window.addEventListener("scroll", () => {
  const pink = document.querySelector("header .logo_pk");
  const scrollY = window.scrollY;
  if (scrollY >= 2700 && scrollY <= 4300) {
    pink.style.opacity = 1;
  } else if (scrollY >= 0) {
    pink.style.opacity = 0;
  } else {
    pink.style.opacity = 0;
  }
});

/*gnb .more*/
let headMore = document.querySelector(".gnb li:nth-child(5)");
let moreMenu = document.querySelector("header .moreMenu");
let body = document.querySelector("body");
let close = document.querySelector("button.close");
headMore.addEventListener("click", () => {
  body.classList.add("on");
  gsap.to(moreMenu, { duration: 1, zIndex: 1001, left: -60 });
});
close.addEventListener("click", () => {
  body.classList.remove("on");
  gsap.to(moreMenu, {
    duration: 1,
    zIndex: 0,
    left: -660,
  });
});

/*gnb .more sub*/
const subMenus = document.querySelectorAll(".moreMenu .gnb > li");
const subArr = document.querySelector(".moreMenu .gnb li .title .arr");
subMenus.forEach((li) => {
  li.addEventListener("click", () => {
    const wasActive = li.classList.contains("on");
    subMenus.forEach((el) => el.classList.remove("on"));
    if (!wasActive) li.classList.add("on");
  });
});

/*about*/
ScrollTrigger.create({
  trigger: "#about",
  start: "top top",
  once: true,
  onEnter: () => {
    const h2 = document.querySelector("#about .textBox h2");
    h2.classList.remove("on");
    void h2.offsetWidth;
    h2.classList.add("on");
  },
});

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
        }, 1200);
      },
    },
  }
);

gsap.from("#about .textBox", {
  x: -80,
  opacity: 0,
  duration: 1.1,
  ease: "power3.out",
  scrollTrigger: { trigger: "#about", start: "20% 75%", once: true },
});

gsap.from("#about .images li.on img", {
  x: 200,
  opacity: 0,
  duration: 1.1,
  ease: "power3.out",
  scrollTrigger: { trigger: "#about", start: "50% 75%", once: true },
});

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

$("#about .content").on("mouseleave", function () {
  $(aboutImages).css({ scale: "1" });
});
$(aboutImages).on("mouseenter", function () {
  $(aboutImages).css({ scale: "1.2" });
});
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

/*menu*/
const secTitle = document.querySelector(".sectionTitle");
const hdTitle = document.querySelector(".sectionTitle .hiddenTitle");
const title = document.querySelector(".sectionTitle .basicTitle");
secTitle.addEventListener("mouseenter", () => {
  gsap.to(hdTitle, {
    opacity: 1,
    y: -60,
    duration: 0.3,
  });
  gsap.to(title, {
    y: -60,
    duration: 0.3,
  });
});
secTitle.addEventListener("mouseleave", () => {
  gsap.to(hdTitle, {
    opacity: 0,
    y: 30,
    duration: 0.3,
  });
  gsap.to(title, {
    y: 0,
    duration: 0.3,
  });
});
gsap
  .timeline({
    scrollTrigger: { trigger: secTitle, start: "top 85%" },
  })
  .from(secTitle, { y: 100, opacity: 0 })
  .from("#menu .donuts h3", { y: 100 }, 0.3)
  .from("#menu .donuts .title", { opacity: 0, y: 100 }, 0.5)
  .from("#menu .donuts .title span", { width: 0 }, 0.7)
  .to("#menu", { className: "on" }, 0);

gsap
  .timeline({
    scrollTrigger: { trigger: "#menu .beverage", start: "top 80%" },
  })
  .from("#menu .beverage h3", { opacity: 0, y: 100 }, 0.3)
  .from("#menu .beverage .title", { opacity: 0, y: 100 }, 0.3)
  .from("#menu .beverage .title span", { width: 0 }, 0.7);

/*event*/
const event1 = document.querySelector("#event .event1");
const event2 = document.querySelector("#event .event2");
const event3 = document.querySelector("#event .event3");
const eventTitle = document.querySelector("#event h2");

/*event 진입*/
gsap
  .timeline({
    scrollTrigger: { trigger: "#event", start: "20% 70%", end: "bottom 20%" },
  })
  .fromTo(
    event3,
    { rotation: "-12", x: 1500, y: -500 },
    { x: 500, y: -200, duration: 1 },
    0
  )
  .fromTo(
    event2,
    { rotation: "5", x: -2000, y: -500 },
    { x: 0, y: -200, duration: 1 },
    0.2
  )
  .fromTo(
    event1,
    { rotation: "-3", x: 2000, y: -500 },
    {
      x: 0,
      y: -220,
      duration: 1,
    },
    0.5
  )
  .from(
    eventTitle,
    {
      opacity: 0,
      y: 80,
      duration: 0.5,
    },
    0.3
  );
/*event click*/
const eventAll = document.querySelectorAll("#event .inner>div");
eventAll.forEach((event) => {
  event.addEventListener("click", () => {
    event.classList.toggle("on");
    gsap.to(event, {
      rotation: 0,
      width: "70%",
    });
    if (!event.classList.contains("on")) {
      gsap.to(event, {
        width: "100%",
      });
      gsap.to(event3, { rotation: "-12" });
      gsap.to(event2, { rotation: "5" });
      gsap.to(event1, { rotation: "-3" });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#menu .menuWrap .menuList").forEach((list) => {
    wrapListWithViewport(list);
    initFlipCarousel(list, { interval: 2500, duration: 0.6 });
  });
});

function wrapListWithViewport(list) {
  if (
    list.parentElement &&
    list.parentElement.classList.contains("menuViewport")
  )
    return;
  const viewport = document.createElement("div");
  viewport.className = "menuViewport";
  viewport.style.overflow = "hidden";
  const parent = list.parentNode;
  parent.insertBefore(viewport, list);
  viewport.appendChild(list);
  list.style.overflow = "visible";
  list.style.willChange = "transform";
}

function initFlipCarousel(list, { interval = 2500, duration = 0.6 } = {}) {
  const getItems = () => list.querySelectorAll("li");
  if (getItems().length < 2) return;

  const stepSize = () => {
    const items = getItems();
    const a = items[0],
      b = items[1];
    return b.offsetLeft - a.offsetLeft;
  };

  let step = stepSize();
  let tween = null;
  let timer = null;

  const goNext = () => {
    if (tween?.isActive()) return;
    step = stepSize();
    tween = gsap.to(list, {
      x: `-=${step}`,
      duration,
      ease: "power2.inOut",
      onComplete: () => {
        const first = getItems()[0];
        list.appendChild(first);
        gsap.set(list, { x: 0 });
      },
    });
  };

  const goPrev = () => {
    if (tween?.isActive()) return;
    step = stepSize();
    const items = getItems();
    const last = items[items.length - 1];
    list.insertBefore(last, items[0]);
    gsap.set(list, { x: -step });
    tween = gsap.to(list, { x: 0, duration, ease: "power2.inOut" });
  };

  const start = () => (timer = setInterval(goNext, interval));
  const stop = () => timer && clearInterval(timer);
  start();

  const wrap = list.closest(".menuWrap") || list.parentElement;
  wrap.addEventListener("mouseenter", stop);
  wrap.addEventListener("mouseleave", start);

  const leftBtn = wrap.querySelector(".leftChev");
  const rightBtn = wrap.querySelector(".rightChev");
  rightBtn &&
    rightBtn.addEventListener("click", () => {
      stop();
      goNext();
    });
  leftBtn &&
    leftBtn.addEventListener("click", () => {
      stop();
      goPrev();
    });

  let resizeRaf;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      step = stepSize();
    });
  });
}

/* ====== 메뉴 리스트 모달 (data-idx 사용) ====== */
$(function () {
  // 도넛
  $(".donuts .menuList li").on("click", function () {
    const i = +this.dataset.idx; // 원본 인덱스
    $(".modalBox1").addClass("on");
    $(".modalBox1 .modalImg > li").removeClass("on").eq(i).addClass("on");
  });

  $("#btn").on("click", function () {
    $(".modalBox1").removeClass("on");
  });

  // 음료
  $(".beverage .menuList li").on("click", function () {
    const i = +this.dataset.idx; // 원본 인덱스
    $(".modalBox2").addClass("on");
    $(".modalBox2 .modalImg > li").removeClass("on").eq(i).addClass("on");
  });

  $("#btn2").on("click", function () {
    $(".modalBox2").removeClass("on");
  });
});
