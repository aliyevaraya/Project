

$('.count').each(function () {
  $(this).prop('Counter',0).animate({
      Counter: $(this).text()
  }, {
      duration: 4000,
      easing: 'swing',
      step: function (now) {
          $(this).text(Math.ceil(now));
      }
  });
});


// let a = 0;
// $(window).scroll(function () {
//   const oTop = $("#statics").offset().top - window.innerHeight;
//   console.log($("#statics").offset());
//   if ($(window).scrollTop() > oTop) {
//     $(".count").each(function () {
//       const $this = $(this),
//         countTo = $this.attr("data-count");
//       $({
//         countNum: $this.text(),
//       }).animate(
//         {
//           countNum: countTo,
//         },

//         {
//           duration: 2500,
//           easing: "swing",
//           step: function () {
//             $this.text(Math.floor(this.countNum));
//           },
//           complete: function () {
//             $this.text(this.countNum);
//             //alert('finished');
//           },
//         }
//       );
//     });
//     // a = 1;
//   }
// });
