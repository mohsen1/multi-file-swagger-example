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

var original = YAML.safeLoad(fs.readFileSync(file).toString());
const keys = Object.keys(original).filter((key)=>{return key!='swagger'})
console.log('keys',keys)

const writeFile = (filename, data) =>{
  fs.writeFile(
    filename,
    YAML.dump(data),
    'utf8',
    (e)=>{
      if(e){
        console.log(e.message);
        process.exit(1)
      }
    }
  )
}

for (const dir_name of keys){
  if(!fs.existsSync(`${dir_name}/`)){
    fs.mkdirSync(`${dir_name}`);
  }
  const dir_origin = original[dir_name];
  if (dir_name != 'info'){
    for(const indexes of Object.keys(dir_origin)) {
      const filename = `${dir_name}/${indexes.replace('/','-')}.yaml`;
      writeFile(filename, dir_origin[indexes]);
      dir_origin[indexes] = {$ref: './'+filename}
    }
  }
  writeFile(`${dir_name}/index.yaml`, dir_origin);
  original[dir_name] = {$ref: `./${dir_name}/index.js`}
}
writeFile(`ma.yaml`, original);
console.log('succssess');

// var options = {
//   filter        : ['relative', 'remote'],
//   loaderOptions : {
//     processContent : function (res, callback) {
//       callback(null, YAML.safeLoad(res.text));
//     }
//   }
// };
// resolve(root, options).then(function (results) {
//   if (program.outputFormat === 'yaml') {
//     console.log(YAML.safeDump(results.resolved));
//   } else if (program.outputFormat === 'json') {
//     console.log(JSON.stringify(results.resolved, null, 2));
//   }
// });
