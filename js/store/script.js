/*header, footer 로드*/
document.addEventListener("DOMContentLoaded", () => {
  const basePath =
    location.hostname === "hithrucci.github.io" ? "/re-ferry" : "";
  fetch(`${basePath}/header.html`)
    .then((res) => res.text())
    .then((data) => (document.querySelector("header").innerHTML = data));

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

// ✅ script.js 실행
window.addEventListener("DOMContentLoaded", () => {
  console.log("script.js 정상 작동 ✅");

  //visual 비주얼 화면 효과
  gsap.registerPlugin(ScrollTrigger);

  window.addEventListener("load", () => {
    gsap.from(".visual .store", {
      y: 150,
      opacity: 0,
      duration: 1.8,
      ease: "power3.out",
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
