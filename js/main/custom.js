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
/*visual sticker*/
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

/*gnb .more*/
let headMore = document.querySelector(".gnb li:nth-child(5)");
let moreMenu = document.querySelector("header .moreMenu");
let body = document.querySelector("body");
headMore.addEventListener("click", () => {
  body.classList.add("on");
  gsap.to(moreMenu, { duration: 1, zIndex: 20, width: 600 });
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
gsap
  .timeline({
    scrollTrigger: { trigger: "#menu", start: "top 50%" },
  })
  .from("#menu h2", { y: 100, opacity: 0 })
  .from("#menu .donuts h3", { y: 100 }, 0.3)
  .from("#menu .donuts .title", { opacity: 0, y: 100 }, 0.5)
  .from("#menu .donuts .title span", { width: 0 }, 0.7);

gsap
  .timeline({
    scrollTrigger: { trigger: "#menu .beverage", start: "top 80%" },
  })
  .from("#menu .beverage h3", { opacity: 0, y: 100 }, 0.3)
  .from("#menu .beverage .title", { opacity: 0, y: 100 }, 0.3)
  .from("#menu .beverage .title span", { width: 0 }, 0.7);

gsap
  .timeline({
    scrollTrigger: { trigger: "#event", start: "20% 70%", end: "bottom 20%" },
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
