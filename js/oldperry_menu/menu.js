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

document.addEventListener("DOMContentLoaded", () => {
  const p = new URLSearchParams(location.search).get("scroll");
  if (p) return scrollTo({ top: +p, behavior: "smooth" });

  if (!location.hash) return; // ✅ 해시 없으면 바로 종료

  const t = document.querySelector(location.hash);
  if (t) {
    const headerOffset = 100;
    const y = t.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
});

$(function () {
  $(".donut ul li").on("click", function () {
    let index = $(this).index();
    $(".modalBox1").addClass("on");
    $(".modalBox1 .modalImg li").removeClass("on");
    $(".modalBox1 .modalImg li").eq(index).addClass("on");
  });

  $("#btn").on("click", function () {
    $(".modalBox1").removeClass("on");
  });

  $(".beverage ul li").on("click", function () {
    let index = $(this).index();
    $(".modalBox2").addClass("on");

    $(".modalBox2 .modalImg li").removeClass("on");
    $(".modalBox2 .modalImg li").eq(index).addClass("on");
  });

  $("#btn2").on("click", function () {
    $(".modalBox2").removeClass("on");
  });

  $(".menu li a").on("click", function (e) {
    e.preventDefault();

    let target = $(this).attr("href");

    if (target.startsWith("#")) {
      let targetPosition = $(target).offset().top - 150;

      $("html, body").animate(
        {
          scrollTop: targetPosition,
        },
        500
      );

      $(".menu li").removeClass("on");

      $('.menu a[href="' + target + '"]')
        .parent()
        .addClass("on");
    }
  });
});
