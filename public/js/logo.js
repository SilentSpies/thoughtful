$(document).ready(function() {
  // add images to array for random pull
  var backgroundImages = ["ireland-2.jpg", "madison-1.jpg", "madison-2.jpg", "madison-3.jpg", "nature-1.jpg", "nature-2.jpg", "nature-3.jpg", "seattle-1.jpg", "detroit-1.jpg", "dp-1.jpg", "dp-2.jpg", "dp-3.jpg", "stella-1.jpg", "stella-2.jpg", "stella-3.jpg", "stella-4.jpg"];
  // add a random image to the css background
  $("body").css("background-image", "url(/img/background/"+pickElement(backgroundImages)+")");
  // append the logo
  $('.main-logo').append('<img id="main-logo-image" src="/img/logo/thoughtful-logo-4.png">');
  // add a click event for the logo
  $('#main-logo-image').bind('click', function() {
    window.location.href = '/';
    console.log("button clicked");
  })
});

// send in an array, get a random element back
function pickElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
