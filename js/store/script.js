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

// ✅ script.js 실행
window.addEventListener("DOMContentLoaded", () => {
  console.log("script.js 정상 작동 ✅");

  //visual 비주얼 화면 효과
  gsap.registerPlugin(ScrollTrigger);

  window.addEventListener("load", () => {
    gsap.from(".visual .store", {
      y: 100,
      rotation: -180,
      transformOrigin: "right bottom ",
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });

    gsap.from(".visual .belt", {
      x: "100vw",
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5,
    });
  });

  // #store 스토어 화면
  const stores = [
    {
      name: "가로수길 마켓점",
      img: "img/store/가로수길마켓점.png",
      addr: "서울 강남구 강남대로162길 35 1층",
      tel: "0507-1339-2589",
    },
    {
      name: "사당점",
      img: "img/store/사당점.png",
      addr: "서울 서초구 동작대로 36 1층 101호",
      tel: "02-585-5060",
    },
    {
      name: "아이파크몰 고척점",
      img: "img/store/아이파크몰 고척점.png",
      addr: "서울 구로구 경인로43길 49 1층 B-101호",
      tel: "02-3017-4522",
    },
    {
      name: "시흥프리미엄 아울렛점",
      img: "img/store/시흥프리미엄 아울렛점.png",
      addr: "경기 시흥시 서해안로 699 1층 9000호",
      tel: "0507-1418-6103",
    },
    {
      name: "파주프리미엄 아울렛점",
      img: "img/store/파주프리미엄 아울렛점.png",
      addr: "경기 파주시 탄현면 필승로 200 8026호",
      tel: "031-8071-7363",
    },
    {
      name: "롯데프리미엄 아울렛 의왕점",
      img: "img/store/롯데프리미엄 아울렛 의왕점.png",
      addr: "경기 의왕시 바라산로1 1층",
      tel: "",
    },
    {
      name: "수원오목천점",
      img: "img/store/수원오목천점.png",
      addr: "경기 수원시 권선구 서수원로7 3층",
      tel: "1661-5535",
    },
    {
      name: "정자점",
      img: "img/store/정자점.png",
      addr: "경기 성남시 분당구 정자일로135 D동 111호",
      tel: "031-607-4137",
    },
    {
      name: "연남점",
      img: "img/store/연남점.png",
      addr: "서울 마포구 동교로 211",
      tel: "02-332-7200",
    },
    {
      name: "석촌호수점",
      img: "img/store/석촌호수점.png",
      addr: "서울 송파구 석촌호수로 258 잠실 아르누보 팰리스 1층 102호",
      tel: "0507-1365-9736",
    },
  ];

  const imgTag = document.querySelector(".store-photo img");
  const nameTag = document.querySelector(".store-photo h3");
  const addrTag = document.querySelectorAll(".store-photo p")[0];
  const telTag = document.querySelectorAll(".store-photo p")[1];
  const leftBtn = document.querySelector(".arrow.left");
  const rightBtn = document.querySelector(".arrow.right");
  const listItems = document.querySelectorAll(".store-list li");
  const parent = document.querySelector(".store-right");

  let index = 0;

  function showStore(i) {
    const s = stores[i];
    imgTag.src = s.img;
    nameTag.textContent = s.name;
    addrTag.textContent = s.addr;
    telTag.textContent = s.tel;

    listItems.forEach((li, j) => {
      li.style.background = j === i ? "#c8353f" : "white";
      li.style.color = j === i ? "white" : "black";

      if (j === i) {
        const parentRect = parent.getBoundingClientRect();
        const liRect = li.getBoundingClientRect();

        if (liRect.top < parentRect.top) {
          parent.scrollTo({
            top: parent.scrollTop - (parentRect.top - liRect.top) - 20,
            behavior: "smooth",
          });
        } else if (liRect.bottom > parentRect.bottom) {
          parent.scrollTo({
            top: parent.scrollTop + (liRect.bottom - parentRect.bottom) + 20,
            behavior: "smooth",
          });
        }
      }
    });
  }

  // 버튼 클릭 시 매장 전환
  leftBtn.addEventListener("click", () => {
    index = (index - 1 + stores.length) % stores.length;
    showStore(index);
  });

  rightBtn.addEventListener("click", () => {
    index = (index + 1) % stores.length;
    showStore(index);
  });

  // 리스트 클릭 시 매장 전환
  listItems.forEach((li, i) => {
    li.addEventListener("click", () => {
      index = i;
      showStore(i);
    });
  });

  showStore(index);

  // store 페이지 GSAP
  gsap.from(".store-left", {
    scrollTrigger: {
      trigger: "#store",
      start: "top 85%",
      toggleActions: "play none none none",
    },
    y: 80,
    scale: 0.9,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.7)",
  });

  gsap.from(".store-right", {
    scrollTrigger: {
      trigger: "#store",
      start: "top 85%",
      toggleActions: "play none none none",
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out",
  });

  ScrollTrigger.create({
    trigger: ".store-right",
    start: "top 90%",
    once: true,
    onEnter: () => {
      gsap.fromTo(
        ".store-list li",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        }
      );
    },
  });

  // catering01 페이지
  gsap.from(".cater01-left", {
    scrollTrigger: {
      trigger: "#catering01",
      start: "top 80%",
    },
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  gsap.from(".cater01-right", {
    scrollTrigger: {
      trigger: "#catering01",
      start: "top 80%",
    },
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2,
  });
});

//catering02 모션효과

//catering02-01 시계 효과
gsap.fromTo(
  ".tv1",
  { opacity: 0, rotation: 0, y: -30 },
  {
    opacity: 1,
    rotation: 0,
    y: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".tv1",
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(".tv1", {
          rotation: 10,
          duration: 0.15,
          yoyo: true,
          repeat: 10,
          ease: "sine.inOut",
          onComplete: () => gsap.set(".tv1", { clearProps: "transform" }), //
        });
      },
    },
  }
);

//catering02-02 하트 효과
gsap.registerPlugin(ScrollTrigger);

/* ❤️ 순차 등장 */
gsap.registerPlugin(ScrollTrigger);

/* ❤️ 순차 등장 */
const heartOrder = [
  [".l5"],
  [".l4", ".l6"],
  [".l3", ".l7"],
  [".l2", ".l8"],
  [".l1", ".l9"],
];

heartOrder.forEach((group, i) => {
  gsap.fromTo(
    group,
    { opacity: 0, scale: 0.3, y: 30 },
    {
      opacity: 1,
      scale: 1,
      y: -10,
      duration: 0.6,
      ease: "back.out(2)",
      delay: i * 0.25,
      scrollTrigger: {
        trigger: ".gomlove",
        start: "top 80%",
        once: true,
      },
      stagger: 0.1,
      onComplete: () => {
        gsap.to(group, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      },
    }
  );
});

/* 하트에만 hover 애니메이션 적용 */
document.querySelectorAll(".gomlove img").forEach((img) => {
  if (!img.classList.contains("love")) {
    img.addEventListener("mouseenter", () => {
      gsap.to(img, {
        y: -8,
        scale: 1.2,
        duration: 0.25,
        ease: "power1.out",
      });
    });

    img.addEventListener("mouseleave", () => {
      gsap.to(img, {
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "power1.inOut",
      });
    });
  }
});

//catering03
//곰돌이도넛

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".dn1",
  { opacity: 0, scale: 0.8, y: 30 },
  {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".donut",
      start: "top 80%",
      once: true,
    },
  }
);

document.querySelectorAll(".dn1").forEach((donut) => {
  donut.addEventListener("mouseenter", () => {
    gsap.to(donut, {
      y: -8,
      rotation: gsap.utils.random(-6, 6),
      duration: 0.4,
      ease: "power1.out",
    });
  });

  donut.addEventListener("mouseleave", () => {
    gsap.to(donut, {
      y: 0,
      rotation: 0,
      duration: 0.4,
      ease: "power1.inOut",
    });
  });
});

// catering01,02,03 이미지 효과
gsap.registerPlugin(ScrollTrigger);

/* 🎬 공통 등장 애니메이션 (cater01~03 전부 동일 효과) */
[".tv", ".love", ".dn2"].forEach((selector) => {
  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector,
      start: "top 85%",
      once: true,
    },
    opacity: 0,
    y: 50,
    rotation: 3, // 살짝 흔들리는 듯한 느낌
    scale: 0.95,
    duration: 1.2,
    ease: "power2.out",
  });
});

gsap.fromTo(
  ".dn1",
  { opacity: 0, scale: 0.8, y: 30 },
  {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".donut",
      start: "top 80%",
      once: true,
    },
  }
);

document.querySelectorAll(".dn1").forEach((donut) => {
  donut.addEventListener("mouseenter", () => {
    gsap.to(donut, {
      y: -8,
      rotation: gsap.utils.random(-6, 6),
      duration: 0.4,
      ease: "power1.out",
    });
  });

  donut.addEventListener("mouseleave", () => {
    gsap.to(donut, {
      y: 0,
      rotation: 0,
      duration: 0.4,
      ease: "power1.inOut",
    });
  });
});

// catering03 - 구름, 주문판, 오토바이

gsap.registerPlugin(ScrollTrigger);

const cater03Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#cater03",
    start: "top 80%",
    once: true,
  },
});

cater03Timeline.from(
  ".cloud",
  {
    x: 400,
    opacity: 0,
    duration: 1,
    ease: "power2.inut",
  },
  0
);

cater03Timeline.from(
  ".order",
  {
    y: 80,
    opacity: 0,
    duration: 1.1,
    ease: "back.out(1.6)",
  },
  0
);

cater03Timeline.from(
  ".bike",
  {
    x: -500,
    opacity: 0.9,
    duration: 1.8,
    ease: "power2.inOut",
  },
  0
);

gsap.to(".cloud", {
  x: "+=10",
  y: "+=5",
  rotation: 1,
  yoyo: true,
  repeat: -1,
  duration: 3,
  ease: "sine.inOut",
});

gsap.to(".bike", {
  y: "+=3",
  rotation: 0.6,
  yoyo: true,
  repeat: -1,
  duration: 1.5,
  ease: "sine.inOut",
});

// 모달창
document.addEventListener("DOMContentLoaded", function () {
  const orderBtn = document.querySelector(".order button");
  const modal = document.getElementById("ordermodal"); //
  const modalContent = document.querySelector(".modal-content");
  const closeModal = document.getElementById("closeModal");

  if (!orderBtn || !modal || !closeModal) {
    console.warn("모달 관련 요소를 찾을 수 없습니다.");
    return;
  }

  orderBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";

    gsap.fromTo(
      modalContent,
      { opacity: 0, scale: 0.6 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      }
    );
  });

  closeModal.addEventListener("click", function () {
    gsap.to(modalContent, {
      opacity: 0,
      scale: 0.6,
      duration: 0.3,
      ease: "back.in(1.7)",
      onComplete: () => {
        modal.style.display = "none";
      },
    });
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      gsap.to(modalContent, {
        opacity: 0,
        scale: 0.6,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          modal.style.display = "none";
        },
      });
    }
  });
});
