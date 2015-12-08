$(document).ready(function() {
  var backgroundImages = ["ireland-1.jpg", "ireland-2.jpg", "madison-1.jpg", "madison-2.jpg", "madison-3.jpg", "nature-1.jpg", "nature-2.jpg", "nature-3.jpg", "nature-4.jpg", "seattle-1.jpg", "seattle-2.jpg"];
  $("body").css("background-image", "url(/img/background/"+pickElement(backgroundImages)+")");
  $('<img src="/img/logo/thoughtful-logo-3.png">').load(function() {
  $(this).appendTo('.main-logo');
});
});

function pickElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
