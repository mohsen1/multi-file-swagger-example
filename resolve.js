var resolve = require('json-refs').resolveRefs;
var YAML = require('yaml-js');
var fs = require('fs');

var root = YAML.load(fs.readFileSync('index.yaml').toString());
var options = {
  processContent: function (content) {
    return YAML.load(content);
  }
};
resolve(root, options).then(function (results) {
  console.log(JSON.stringify(results.resolved, null, 2));
});
