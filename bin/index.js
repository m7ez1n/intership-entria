'use strict';

var program = require('commander');
var pkg = require('../package.json');
var searchWeather = require('./weather');

program.version(pkg.version).description('Search weather to any place').option('-C, --city <city>', 'City to be searched. (Default: São Paulo)').option('-S, --state <state>', 'State of the city to be searched. (Default: SP)').parse(process.argv);

searchWeather(program.city, program.state);