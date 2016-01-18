var resolve = require('json-refs').resolveRefs;
var YAML = require('yaml-js');
var fs = require('fs');

var root = YAML.load(fs.readFileSync('index.yaml').toString());
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
