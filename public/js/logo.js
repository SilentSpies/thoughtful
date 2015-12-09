$(document).ready(function() {
  var backgroundImages = ["ireland-2.jpg", "madison-1.jpg", "madison-2.jpg", "madison-3.jpg", "nature-1.jpg", "nature-2.jpg", "nature-3.jpg", "seattle-1.jpg", "detroit-1.jpg", "dp-1.jpg", "dp-2.jpg", "dp-3.jpg", "stella-1.jpg", "stella-2.jpg", "stella-3.jpg", "stella-4.jpg"];
  $("body").css("background-image", "url(/img/background/"+pickElement(backgroundImages)+")");
  $('<img src="/img/logo/thoughtful-logo-4.png">').load(function() {
  $(this).appendTo('.main-logo');
});
});

function pickElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
