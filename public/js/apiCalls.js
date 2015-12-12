// Use a namespace for various API variables
var apiInfo = {};
apiInfo.imageArray = [];

// Run the enclosed once the page is ready
$(document).ready(function() {

    // CHANGED 12Dec2015 - Improved Ajax call flow

    // show a loading spinner gif
    $("#spinner").show();

    // WHEN ajaxCallGetQuote is done THEN ajaxCallGetImages
    $.when( ajaxCallGetQuote() ).then(
      ajaxCallGetImages() )

}); // END DOC READY



// When the ajax calls are all done
$(document).ajaxStop(function() {
  // hide the gif
  $("#spinner").hide();
  // show the things
  displayTheThings();
});



// Quote API Call
function ajaxCallGetQuote() {
  return $.ajax({
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

          // save into the apiInfo namespace
          apiInfo.quoteContent = data.contents.quote;
          apiInfo.quoteAuthor = data.contents.author;

          // save a cleaned up version of the quote to search with
          apiInfo.searchPhraseStr = prepareQuoteForImageSearching();

      },
      error: function(request, status, err) {
        if (status == "timeout") {
            // timeout -> reload the page and try again
            console.log("Quote API - timeout occured");
        } else {
            // another error occured
            alert("error: " + request + status + err);
        }
      },
      fail: function(error) {
          console.log("error")
          console.log(error);
      }
  });
} // end ajaxCallGetQuote



// Image API Call
function ajaxCallGetImages() {
  return $.ajax({
    type: "GET",
    url: "/api/pixabaySearch?search=" + apiInfo.searchPhraseStr,
    timeout: 3000,
    dataType: 'json',
    success: function(data) {
        var counter = 0;
        console.table(data);

        // save the images to an array
        $.each( data.hits, function( i, item ) {
          apiInfo.imageArray[i] = item;
        });
        console.log(apiInfo.imageArray);
    },
    error: function(request, status, err) {
      if (status == "timeout") {
          // timeout -> reload the page and try again
          console.log("ImageAPI - timeout occured");
          // TODO: deal with timeout properly
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
  });
} // end ajaxCallGetImages



// Manipulate the returned quote into search terms
function prepareQuoteForImageSearching() {
  // cleanup the string (get rid of stuff we don't want)
  var quote = cleanUpString(apiInfo.quoteContent);
  console.log(quote);

  // turn into an array
  apiInfo.quoteCleanAsArray = quote.split(" ");

  // remove duplicates
  apiInfo.quoteCleanAsArrayNoDups = unique(apiInfo.quoteCleanAsArray);
  console.log(apiInfo.quoteCleanAsArrayNoDups);

  // sort array so longer words are first
  apiInfo.quoteCleanAsArrayNoDupsSorted = apiInfo.quoteCleanAsArrayNoDups.sort(function(a, b){
    return b.length - a.length; // ASC -> a - b; DESC -> b - a
  });

  // concatinate words 4 letters long or greater
  apiInfo.searchPhrase = [];
  var charTotal = 0; // must be less than 40 (max search length is 100)
  for (var i=0; i < apiInfo.quoteCleanAsArrayNoDupsSorted.length; i++) {
    if (apiInfo.quoteCleanAsArrayNoDupsSorted[i].length > 3) {
      charTotal += apiInfo.quoteCleanAsArrayNoDupsSorted[i].length + 1
      if (charTotal < 40) {
        apiInfo.searchPhrase.push(apiInfo.quoteCleanAsArrayNoDupsSorted[i]);
      }
    }
  }

  // join the words with a hyphen so I can shoot it through the URL (And return)
  console.log(apiInfo.searchPhrase);
  return apiInfo.searchPhrase.join("-");
}



function cleanUpString(str) {
  // first, lets get rid of unhelpful (for searching) words
  // \b -> word boundary ... gi -> global, ignore case
  str = str.replace(/\b(about|above|after|along|amid|among|around)\b/gi, '');
  str = str.replace(/\b(as|at|before|behind|below|beneath|beside)\b/gi, '');
  str = str.replace(/\b(besides|beyond|but|by|down|during|except)\b/gi, '');
  str = str.replace(/\b(for|from|in|inside|into|near|of|off|on|onto)\b/gi, '');
  str = str.replace(/\b(over|past|per|since|than|then|to|under|until)\b/gi, '');
  str = str.replace(/\b(up|upon|with|within|without|through|between)\b/gi, '');
  str = str.replace(/\b(out|can't|won't|don't|I|me|we|you|us|our|had)\b/gi, '');
  str = str.replace(/\b(have|whether|their|there|they|that|when|your)\b/gi, '');

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



// do all the appending for the quote and images
function displayTheThings() {
  // show the Quote
  $('.profile_quote').append("<blockquote>");
  $("blockquote").append("<p id='quote-text'>");
  $("#quote-text").text("\"" + apiInfo.quoteContent + "\"");
  $("blockquote").append("<footer id='author'>");
  $("#author").text(apiInfo.quoteAuthor);
  $("blockquote").append('<input id="btn-tweet" type="button" onclick="location.href=\'http://twitter.com/home/?status='+ apiInfo.quoteContent + "&#8212;" + apiInfo.quoteAuthor + '\'"; value="Tweet" />');

  // set hidden inputs for favoriting
  var setQuoteText = document.querySelector("#setQuote");
  var setAuthorText = document.querySelector("#setAuthor");
  setQuoteText.value = apiInfo.quoteContent;
  setAuthorText.value = apiInfo.quoteAuthor;

  // get 10 random numbers, no duplicates
  var randArray = [];
  var temp = [];
  var temp2 = [];
  do {
    temp = randArray;
    temp.push(Math.floor(Math.random()*apiInfo.imageArray.length));
    randArray = unique(temp);
  } while (randArray.length < 10)
  console.log(randArray);

  // show the Images
  for (var i = 0; i < apiInfo.imageArray.length; i++) {
    // console.log(apiInfo.imageArray[i].webformatURL);
    $("<li class='slide'><img src='" + apiInfo.imageArray[randArray[i]].webformatURL + "'></li>").appendTo(".profile_image_row");
    if (i == 9) break; // get out of the loop after 10 images
  };

  // get the carousel running now that the images are ready
  bootUpCarousel();
}



function bootUpCarousel() {
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
}
