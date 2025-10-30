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
