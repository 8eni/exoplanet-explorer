/*
Instructions:
(1) Get the master JSON with the list of planet URLs.
(2) Add the search header.
(3) Get the first planet's JSON.
(4) Create a thumbnail for the first planet.
(4) Handle errors!
  (a) Pass 'unknown' to the search header.
  (b) console.log the error.
  (c) You're performing two network requests. Consider how you'd want to handle errors for each one.
 */

(function(document) {
  'use strict';

  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} query - The search query.
   */
  function addSearchHeader(query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>';
  };

  /**
   * Helper function to create a planet thumbnail.
   * @param  {Object} data - The raw data describing the planet.
   */
  function createPlanetThumb(data) {
    var pT = document.createElement('planet-thumb');
    for (let d in data) {
      pT[d] = data[d];
    }
    home.appendChild(pT);
  }

  /**
   * XHR wrapped in a promise
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    return fetch(url, {
      method: 'get'
    })
  };

  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON(url) {
    return get(url).then(function(response) {
      return response.json();
    });
  };

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');

    getJSON('http://udacity.github.io/exoplanet-explorer/site/app/data/earth-like-results.json')
    .then(function(response) {
      addSearchHeader(response.query);
      return getJSON(response.results[0]);
    })
    .catch(function() {
      throw Error('Search Request Error');
    })
    .then(function(planetData) {
      createPlanetThumb(planetData)
    })
    .catch(function(e) {
      addSearchHeader('unknown');
      console.log(e);
    })
  });
})(document);
