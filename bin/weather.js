'use strict';

require('dotenv').config();
var chalk = require('chalk');
var request = require('request-promise-native');
var ora = require('ora');

var spinner = ora({
  text: 'Retrieving weather data...',
  color: 'magenta'
});

function searchWeather() {
  var city = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'São Paulo';
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'SP';

  var url = 'https://api.hgbrasil.com/weather?key=' + process.env.HG_KEY + '&city_name=' + city + ',' + state;

  spinner.start();

  return request(url).then(function (body) {
    spinner.stop();
    return body;
  }).then(function (body) {
    var response = JSON.parse(body);
    console.info('The temperature in ' + chalk.red(city, '-', state) + ' is ' + chalk.whiteBright(response.results.temp) + '\xBAC, at ' + chalk.yellow(response.results.time));
  }).catch(function (err) {
    spinner.stop();
    console.info(chalk.red('Something went wrong in the API. Try in a few minutes.'));
  });
}

module.exports = searchWeather;