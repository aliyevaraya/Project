$('.owl-carousel').owlCarousel({
loop:true,
margin:10,
nav:false,
autoplay:true,
autoplayTimeout:3000 ,
dotsEach:1,
singleItem: true,
responsive:{
  0:{
      items:1
  },
  600:{
      items:2
  },
  1000:{
      items:3
  }
}
})