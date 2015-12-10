
$(document).ready(function() {

    // Quote API
    $.when( $.ajax(getQuote) ).done(function() {
      console.log($('#quote-text').text());
      // get rid of things we don't want...
      var quoteString= cleanUpString($('#quote-text').text());
      console.log(quoteString);
      var quoteArray = quoteString.split(" ");
      // remove duplicates
      quoteArray = unique(quoteArray);
      console.log(quoteArray);
      // sort array so longer words are first
      quoteArray = quoteArray.sort(function(a, b){
        return b.length - a.length; // ASC -> a - b; DESC -> b - a
      });
      // concatinate words 4 letters long or greater
      searchPhrase = [];
      var charTotal = 0; // must be less than 40 (max search length is 100)
      for (var i=0; i < quoteArray.length; i++) {
        if (quoteArray[i].length > 3) {
          charTotal += quoteArray[i].length + 1
          if (charTotal < 40) {
            searchPhrase.push(quoteArray[i]);
          }
        }
      }

      // Pixabay (Image) API
      var searchPhraseStr = searchPhrase.join("-");
      console.log(searchPhraseStr);

      $.when($.ajax({
        type: "GET",
        url: "/api/pixabaySearch?search=" + searchPhraseStr,
        timeout: 3000,
        dataType: 'json',
        success: function(data) {
            var counter = 0;
            console.table(data);
            $.each( data.hits, function( i, item ) {
              counter += 1;
              $("<li class='slide'><img src='" + item.webformatURL + "'></li>").appendTo(".profile_image_row");
              if (counter >= 10) return false; // only bring up X pictures
            });
        },
        error: function(request, status, err) {
          if (status == "timeout") {
              // timeout -> reload the page and try again
              console.log("ImageAPI - timeout occured");
              // window.location.href = '/not_found';
              //  clearInterval(ajax_call);
              // window.location.reload(); //make it comment if you don't want to reload page
          } else {
              // another error occured
              alert("error: " + request + status + err);
          }
        },
        fail: function(error) {
            console.log("Something has gone wrong below");
            console.log(error);
            console.log("Something has gone wrong ^");
        }


      })).done(function() { // END IMAGE API CALL

      var setQuoteText = document.querySelector("#setQuote");
      var setAuthorText = document.querySelector("#setAuthor");

      setQuoteText.value = $("#quote-text").text();
      setAuthorText.value = $("#author").text();

      $('.profile_image_row').bxSlider({
        slideWidth: 600,
        minSlides: 1,
        maxSlides: 1,
        // auto: true, //auto play enabled (true)
        autoControls: true,
        adaptiveHeight: true,
        mode: 'fade',
        infiniteLoop: true
      });
    });

    }); // END WHEN




}); // end of READY


// Quote API Call
var getQuote = {
    type: 'get',
    url: '/api/quotes',
    timeout: 3000,
    dataType: 'json',
    success: function(data) {
        console.log("success");
        console.log(data);
        // console.log(data.contents.quote);
        // console.log(data.contents.author);
        if (data.contents.author == "") {
          data.contents.author = "Unknown"
        };

        $('.profile_quote').append("<blockquote>");
        $("blockquote").append("<p id='quote-text'>");
        $("#quote-text").text("\"" + data.contents.quote + "\"");
        $("blockquote").append("<footer id='author'>");
        $("#author").text(data.contents.author);

    },
    error: function(request, status, err) {
      if (status == "timeout") {
          // timeout -> reload the page and try again
          console.log("Quote API - timeout occured");
          // window.location.href = '/not_found';
          //  clearInterval(ajax_call);
          // window.location.reload(); //make it comment if you don't want to reload page
      } else {
          // another error occured
          alert("error: " + request + status + err);
      }
    },
    fail: function(error) {
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




function cleanUpString(str) {
  // first, lets get rid of unhelpful (for searching) words
  // \b -> word boundary ... gi -> global, ignore case
  str = str.replace(/\b(about|above|after|along|amid|among|around)\b/gi, '');
  str = str.replace(/\b(as|at|before|behind|below|beneath|beside)\b/gi, '');
  str = str.replace(/\b(besides|beyond|but|by|down|during|except)\b/gi, '');
  str = str.replace(/\b(for|from|in|inside|into|near|of|off|on|onto)\b/gi, '');
  str = str.replace(/\b(over|past|per|since|than|then|to|under|until)\b/gi, '');
  str = str.replace(/\b(up|upon|with|within|without|through|between)\b/gi, '');
  str = str.replace(/\b(out|can't|won't|don't|I|me|we|you|us|our)\b/gi, '');
  str = str.replace(/\b(have|had|their|there|they|that|when|your)\b/gi, '');

  // next, lets get rid of punctuation
  str = str.replace(/[.,-\/#!?$%\^&\*;:{}=\-_`'"~()]/g,"");
  // fix double spaces, if there are any
  str = str.replace(/\s{2,}/g," ");

  //send it back
  return str;

}

// source: https://jsfiddle.net/Guffa/Askwb/
function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}
