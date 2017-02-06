#!/usr/bin/env node

'use strict';

var resolve = require('json-refs').resolveRefs;
var YAML = require('yaml-js');
var fs = require('fs');

var program = require('commander');

program
  .version('0.0.1')
  .usage('[options] <yaml file ...>')
  .parse(process.argv);

var file = program.args[0];

if (!fs.existsSync(file)) {
  console.error('File does not exist. ('+file+')');
  process.exit(1);
}

var root = YAML.load(fs.readFileSync(file).toString());
var options = {
  filter        : ['relative', 'remote'],
  loaderOptions : {
    processContent : function (res, callback) {
      callback(null, YAML.load(res.text));
    }
  }
};
resolve(root, options).then(function (results) {
  console.log(JSON.stringify(results.resolved, null, 2));
});
