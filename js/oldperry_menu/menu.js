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

$(function () {
  /* -------------------------------
    모달 관련 이벤트
  ------------------------------- */

  // 도넛 메뉴에 data-index 추가
  $(".donutmenu li").each(function (i) {
    $(this).attr("data-index", i);
  });

  // 음료 메뉴에 data-index 추가
  $(".beveragemenu li").each(function (i) {
    $(this).attr("data-index", i);
  });

  // 도넛 클릭 이벤트 - data-index 사용
  $(".donutmenu li").on("click", function () {
    let index = $(this).data("index"); // data-index 사용
    $(".modalBox1").addClass("on");
    $(".modalBox1 .modalImg li").removeClass("on");
    $(".modalBox1 .modalImg li").eq(index).addClass("on");
  });

  $("#btn").on("click", function () {
    $(".modalBox1").removeClass("on");
  });

  // 음료 클릭 이벤트 - data-index 사용
  $(".beveragemenu li").on("click", function () {
    let index = $(this).data("index"); // data-index 사용
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
      $("html, body").animate({ scrollTop: targetPosition }, 500);
      $(".menu li").removeClass("on");
      $('.menu a[href="' + target + '"]')
        .parent()
        .addClass("on");
    }
  });

  /* -------------------------------
    슬라이드 관련 (모바일 전용)
  ------------------------------- */
  const mobile = window.matchMedia("(max-width:719px)");

  /* -------------------------------
    🍩 도넛 자동 슬라이드
  ------------------------------- */
  let donutStop;

  function startDonutSlider() {
    donutStop = setInterval(function () {
      $(".donutmenu").animate({ "margin-left": "-300px" }, function () {
        $(".donutmenu li:first-child").appendTo(".donutmenu");
        $(".donutmenu").css({ "margin-left": "0px" });
      });
    }, 2000);
  }

  function stopDonutSlider() {
    clearInterval(donutStop);
  }

  function initDonutSlider() {
    stopDonutSlider();

    if (mobile.matches) {
      startDonutSlider();

      $(".leftChev")
        .off("click")
        .on("click", function () {
          stopDonutSlider();
          $(".donutmenu li:last-child").prependTo(".donutmenu");
          $(".donutmenu").css({ "margin-left": "-250px" });
          $(".donutmenu").animate({ "margin-left": "0px" });
          startDonutSlider();
        });

      $(".rightChev")
        .off("click")
        .on("click", function () {
          stopDonutSlider();
          $(".donutmenu").animate({ "margin-left": "-300px" }, function () {
            $(".donutmenu li:first-child").appendTo(".donutmenu");
            $(".donutmenu").css({ "margin-left": "0px" });
          });
          startDonutSlider();
        });
    } else {
      stopDonutSlider();
      $(".donutmenu").removeAttr("style");
    }
  }

  /* -------------------------------
    🧃 음료(beverage) 자동 슬라이드
  ------------------------------- */
  let beverageStop;

  function startBeverageSlider() {
    beverageStop = setInterval(function () {
      $(".beveragemenu").animate({ "margin-left": "-300px" }, function () {
        $(".beveragemenu li:first-child").appendTo(".beveragemenu");
        $(".beveragemenu").css({ "margin-left": "0px" });
      });
    }, 2000);
  }

  function stopBeverageSlider() {
    clearInterval(beverageStop);
  }

  function initBeverageSlider() {
    stopBeverageSlider();

    if (mobile.matches) {
      startBeverageSlider();

      $(".leftChev2")
        .off("click")
        .on("click", function () {
          stopBeverageSlider();
          $(".beveragemenu li:last-child").prependTo(".beveragemenu");
          $(".beveragemenu").css({ "margin-left": "-250px" });
          $(".beveragemenu").animate({ "margin-left": "0px" });
          startBeverageSlider();
        });

      $(".rightChev2")
        .off("click")
        .on("click", function () {
          stopBeverageSlider();
          $(".beveragemenu").animate({ "margin-left": "-300px" }, function () {
            $(".beveragemenu li:first-child").appendTo(".beveragemenu");
            $(".beveragemenu").css({ "margin-left": "0px" });
          });
          startBeverageSlider();
        });
    } else {
      stopBeverageSlider();
      $(".beveragemenu").removeAttr("style");
    }
  }

  /* -------------------------------
    ✅ 실행 및 반응형 감지
  ------------------------------- */
  function initAllSliders() {
    initDonutSlider();
    initBeverageSlider();
  }

  initAllSliders();
  mobile.addEventListener("change", initAllSliders);
});
