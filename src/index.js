const program = require('commander');
const pkg = require('../package.json');
const searchWeather = require('./weather');

program
  .version(pkg.version)
  .description('Search weather to any place')
  .option('-C, --city <city>', 'City to be searched. (Default: São Paulo)')
  .option('-S, --state <state>', 'State of the city to be searched. (Default: SP)')
  .parse(process.argv);

searchWeather(program.city, program.state);
