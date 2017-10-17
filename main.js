var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +
    '<a class="js-title" href="" target="_blank"></a></h2>' +
    '<br>'+
    '<a class="js-vidLink"><img class="js-thumbnail"></a>'+
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
    q: searchTerm,
    part: 'snippet',
    key: 'AIzaSyAM1tuNqVLi0iiNW9a56xi83gnUDSNjM3c'
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}


function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-title").text(result.snippet.title);
  template.find(".js-thumbnail").attr("src", result.snippet.thumbnails.high.url);
  template.find(".js-vidLink").attr("href","https://www.youtube.com/watch?v="+result.id.videoId);
  return template;
}

function displayYouTubeSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-button').click(function(event) {
    event.preventDefault();
    var query = $('.js-searchTerm').val();
    // clear out the input
    $('.js-searchTerm').val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
