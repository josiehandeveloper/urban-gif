'use strict';

const apiKeyUrban = '6a5710b987msh0943a7d38d91630p1e46b5jsn88519ffc22fb';

const searchURLUrban = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define';

const apiKeyGiphy = "lGu06gRbAL1hxD1P57OXOPJ18tD6SELU";

const searchURLGiphy = 'https://api.giphy.com/v1/gifs/search';


//Urban & GIF
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


//Display Urban Definitions
function displayResultsUrban(responseJson) {
  $('#results-list').empty();
  for (let i = 0; i < responseJson.list.length; i++){
    $('#results-list').append(
      `<h3>${responseJson.list[i].definition}</h3>`
    )};

  $('.results').removeClass('hidden');
};

//Display Gifs 
function displayResultsGiphy(responseJson) {
  $(".gif").empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $(".gif").append(
      `<img src= '${responseJson.data[i].images.fixed_width.url}'/>`
    )};

  $('.results');
};

//GET request to Urban
function getUrbanWord(query) {
  const params = {
    term: query,
 
  };
  const queryString = formatQueryParams(params)
  const url = searchURLUrban + '?' + queryString;

  const options = {
    headers: new Headers({
      "X-RapidAPI-Key": apiKeyUrban})
  };


  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResultsUrban(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

//GET request to Giphy
function getGiphy(query) {
  const params = {
    q: query,
    limit: 10
 
  };
  const queryString = formatQueryParams(params)
  const url = searchURLGiphy + '?' + queryString + '&api_key=' + apiKeyGiphy;


  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText);
      } 
    })
    .then(responseJson => displayResultsGiphy(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

//Submit Form
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getUrbanWord(searchTerm);
    getGiphy(searchTerm);
  });
}

$(watchForm);

