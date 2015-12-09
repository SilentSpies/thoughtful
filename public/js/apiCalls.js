var searchPhrase = "";
console.log(searchPhrase);
console.log("^ searchPhrase");

$(document).ready(function() {

    // Quote API
    $.when( $.ajax(getQuote) ).done(function() {
      console.log($('#quote-text').text());
      // getting rid of the surrounding quotation marks
      var quoteString = $('#quote-text').text()
      var punctuationless = quoteString.replace(/[.,-\/#!$%\^&\*;:{}=\-_`'"~()]/g,"");
      var finalString = punctuationless.replace(/\s{2,}/g," ");
      var quoteArray = finalString.split(" ");
      // quoteArray = quoteArray.slice(0,quoteString.length - 2).split(" ");
      console.log(quoteArray);
      // sort array so longer words are first
      quoteArray = quoteArray.sort(function(a, b){
        return b.length - a.length; // ASC -> a - b; DESC -> b - a
      });
      // concatinate words 4 letters long or greater
      searchPhrase = [];
      var charTotal = 0; // must be less than 50
      for (var i=0; i < quoteArray.length; i++) {
        if (quoteArray[i].length > 3) {
          charTotal += quoteArray[i].length + 1
          if (charTotal < 45) {
            searchPhrase.push(quoteArray[i]);
          }
        }
      }

      // Pixabay (Image) API
      var searchPhraseStr = searchPhrase.join("-");
      console.log(searchPhraseStr);

      $.ajax({
        type: "GET",
        url: "/api/pixabaySearch?search=" + searchPhraseStr,
        dataType: 'json',
        success: function(data) {
            var data = data;
            var counter = 0;
            console.table(data);
            // $('body').append("<div id='dvImages'>");
            // $('p').append(data.name);
            $.each( data.hits, function( i, item ) {
              counter += 1;
              // console.log(item.previewHeight);
              // this method doesn't allow specific size selection! boo
              // A work around is to call a lot of images
              // and only append those that fit the size requirement.
              // But you don't know if you will get enough images...
              if (item.previewHeight >= 95 && item.previewHeight <= 100) {
              // console.log(item.previewURL);
              var img = $("<div class='slide'><img /></div>");
              $('img').attr("src", item.previewURL).appendTo(".profile_image_row");
              if (counter >= 11) return false;
              }

            });
        },
        fail: function(error) {
            console.log("Something has gone wrong below");
            console.log(error);
            console.log("Something has gone wrong ^");
        }
      }); // END IMAGE API CALL

      var getQuoteText = document.querySelector("#quote-text");
      var getAuthorText = document.querySelector("#author");
      var btnFavorite = document.querySelector("#btn_favorite");
      var setQuoteText = document.querySelector("#setQuote");
      var setAuthorText = document.querySelector("#setAuthor");

      setQuoteText.value = $("#quote-text").text();
      setAuthorText.value = $("#author").text();



    }); // END WHEN




}); // end of READY



// Quote API Call
var getQuote = {
    type: 'get',
    url: '/api/quotes',
    dataType: 'json',
    success: function(data) {
        console.log("success");
        console.log(data);
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
