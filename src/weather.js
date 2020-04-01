require('dotenv').config();
const chalk = require('chalk');
const request = require('request-promise-native');
const ora = require('ora');

const spinner = ora({
  text: 'Retrieving weather data...',
  color: 'magenta',
});

function searchWeather(city = 'São Paulo', state = 'SP') {
  const url = `https://api.hgbrasil.com/weather?key=${process.env.HG_KEY}&city_name=${city},${state}`;

  spinner.start();

  return request(url)
    .then(body => {
      spinner.stop();
      return body;
    })
    .then(body => {
      const response = JSON.parse(body);
      console.info(
        `The temperature in ${chalk.red(city, '-', state)} is ${chalk.whiteBright(
          response.results.temp,
        )}ºC, at ${chalk.yellow(response.results.time)}`,
      );
    })
    .catch(err => {
      spinner.stop();
      console.info(chalk.red('Something went wrong in the API. Try in a few minutes.'));
    });
}

module.exports = searchWeather;
