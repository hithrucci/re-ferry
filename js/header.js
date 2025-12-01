const mobile = window.matchMedia("(max-width:719px)");
if (mobile.matches) {
  /*#header3*/
  const hd3Bar = document.querySelector("#header3 .menuBar");
  const hd3Close = document.querySelector("#header3 .close");
  const hd3Nav = document.querySelector("#header3 nav");
  hd3Bar.addEventListener("click", () => {
    hd3Nav.classList.toggle("on");
  });
  hd3Close.addEventListener("click", () => {
    hd3Nav.classList.remove("on");
  });
  //header3아코디언
  const hd3List = document.querySelectorAll("#header3 nav .gnb>li");
  hd3List.forEach((list) => {
    list.addEventListener("click", () => {
      list.classList.toggle("active");
    });
  });
}
