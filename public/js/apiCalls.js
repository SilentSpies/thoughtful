$(document).ready(function() {

    // Quote API
    $.ajax(getQuote);

    // Pixabay API
    $.ajax(getPixabay);



}); // end of READY



// Quote API Call
var getQuote = {
    type: 'get',
    url: '/api/quotes',
    dataType: 'json',
    success: function(data) {
        console.log("success");
        // console.log(data);
        // console.log(data.contents.quote);
        // console.log(data.contents.author);

        $('.profile_quote').append("<blockquote>");
        $("blockquote").append("<p id='quote-text'>");
        $("#quote-text").text("\"" + data.contents.quote + "\"");
        $("blockquote").append("<footer id='author'>");
        $("#author").text(data.contents.author);

    },
    error: function(error) {
        console.log("error")
        console.log(error);
    }
};





// Using pixabay.com api
// https://pixabay.com/api/docs/
var getPixabay = {
  type: "GET",
  url: "/api/pixabay",
  dataType: 'json',
  success: function(data) {
      var data = data;
      var counter = 0;
      // console.table(data);
      $('body').append("<div id='dvImages'>");
      // $('p').append(data.name);
      $.each( data.hits, function( i, item ) {
        counter += 1;
        // console.log(item.previewHeight);
        // this method doesn't allow specific size selection! boo
        // A work around is to call a lot of images
        // and only append those that fit the size requirement.
        // But you don't know if you will get enough images...
        if (item.previewHeight >= 90 && item.previewHeight <= 100) {
        // console.log(item.previewURL);
        var img = $("<img />");
        img.attr("src", item.previewURL).appendTo(".profile_image_row");
        if (counter >= 11) return false;
        }

      });
  },
  fail: function(error) {
      console.log("Something has gone wrong below");
      console.log(error);
      console.log("Something has gone wrong ^");
  }
};
