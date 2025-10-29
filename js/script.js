// #store 스토어 화면
const stores = [
  {
    name: "가로수길 마켓점",
    img: "img/가로수길마켓점.png",
    addr: "서울 강남구 강남대로162길 35 1층",
    tel: "0507-1339-2589",
  },
  {
    name: "사당점",
    img: "img/사당점.png",
    addr: "서울 서초구 동작대로 36 1층 101호",
    tel: "02-585-5060",
  },
  {
    name: "아이파크몰 고척점",
    img: "img/아이파크몰 고척점.png",
    addr: "서울 구로구 경인로43길 49 1층 B-101호",
    tel: "02-3017-4522",
  },
  {
    name: "시흥프리미엄 아울렛점",
    img: "img/시흥프리미엄 아울렛점.png",
    addr: "경기 시흥시 서해안로 699 1층 9000호",
    tel: "0507-1418-6103",
  },
  {
    name: "파주프리미엄 아울렛점",
    img: "img/파주프리미엄 아울렛점.png",
    addr: "경기 파주시 탄현면 필승로 200 8026호",
    tel: "031-8071-7363",
  },
  {
    name: "롯데프리미엄 아울렛 의왕점",
    img: "img/롯데프리미엄 아울렛 의왕점.png",
    addr: "경기 의왕시 바라산로1 1층",
    tel: "",
  },
  {
    name: "수원오목천점",
    img: "img/수원오목천점.png",
    addr: "경기 수원시 권선구 서수원로7 3층",
    tel: "1661-5535",
  },
  {
    name: "정자점",
    img: "img/정자점.png",
    addr: "경기 성남시 분당구 정자일로135 D동 111호",
    tel: "031-607-4137",
  },
  {
    name: "연남점",
    img: "img/연남점.png",
    addr: "서울 마포구 동교로 211",
    tel: "02-332-7200",
  },
  {
    name: "석촌호수점",
    img: "img/석촌호수점.png",
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
      // 🔽 .store-right가 실제 스크롤 박스
      const parent = document.querySelector(".store-right");
      const parentRect = parent.getBoundingClientRect();
      const liRect = li.getBoundingClientRect();

      // li가 부모 영역 밖으로 나갔을 때만 스크롤 이동
      if (liRect.top < parentRect.top) {
        // 위로 벗어났을 때
        parent.scrollTo({
          top: parent.scrollTop - (parentRect.top - liRect.top) - 20,
          behavior: "smooth",
        });
      } else if (liRect.bottom > parentRect.bottom) {
        // 아래로 벗어났을 때
        parent.scrollTo({
          top: parent.scrollTop + (liRect.bottom - parentRect.bottom) + 20,
          behavior: "smooth",
        });
      }
    }
  });
}

leftBtn.addEventListener("click", () => {
  index = (index - 1 + stores.length) % stores.length;
  showStore(index);
});

rightBtn.addEventListener("click", () => {
  index = (index + 1) % stores.length;
  showStore(index);
});

listItems.forEach((li, i) => {
  li.addEventListener("click", () => {
    index = i;
    showStore(i);
  });
});

showStore(index);

// store 페이지
gsap.registerPlugin(ScrollTrigger);

// ✅ 스토어 섹션 등장
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

// ✅ 매장 리스트 순차 등장
ScrollTrigger.create({
  trigger: ".store-right",
  start: "top 90%",
  once: true, // 한 번만 실행
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
gsap.registerPlugin(ScrollTrigger);

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
