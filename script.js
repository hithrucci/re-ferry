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
    addr: "서울 관악구 남부순환로 2082 1층",
    tel: "02-1234-5678",
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
      li.scrollIntoView({ behavior: "smooth", block: "center" });
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
