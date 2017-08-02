#!/usr/bin/env node

'use strict';

var resolve = require('json-refs').resolveRefs;
var YAML = require('js-yaml');
var fs = require('fs');

var program = require('commander');

program
  .version('2.0.0')
  .option('-o --output-format [output]',
          'output format. Choices are "json" and "yaml" (Default is json)',
          'json')
  .usage('[options] <yaml file ...>')
  .parse(process.argv);

if (program.outputFormat !== 'json' && program.outputFormat !== 'yaml') {
  console.error(program.help());
  process.exit(1);
}

var file = program.args[0];

if (!fs.existsSync(file)) {
  console.error('File does not exist. ('+file+')');
  process.exit(1);
}

var root = YAML.safeLoad(fs.readFileSync(file).toString());
var options = {
  filter        : ['relative', 'remote'],
  loaderOptions : {
    processContent : function (res, callback) {
      callback(null, YAML.safeLoad(res.text));
    }
  }
};
resolve(root, options).then(function (results) {
  if (program.outputFormat === 'yaml') {
    console.log(YAML.safeDump(results.resolved));
  } else if (program.outputFormat === 'json') {
    console.log(JSON.stringify(results.resolved, null, 2));
  }
});
