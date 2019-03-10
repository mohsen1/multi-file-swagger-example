#!/usr/bin/env node

'use strict';

var jsdiff = require('diff');
var fs = require('fs');

var expectJson = JSON.parse(fs.readFileSync('test/expected.json', 'utf8'));
var actualJson = JSON.parse(fs.readFileSync('test/resolved.json', 'utf8'));
var expectJaml = fs.readFileSync('test/expected.yaml', 'utf8');
var actualJaml = fs.readFileSync('test/resolved.yaml', 'utf8');
var diffJson = jsdiff.diffJson(expectJson, actualJson);
var diffJaml = jsdiff.diffJson(expectJaml, actualJaml);

if (diffJson.length !== 1) {
  console.error("FAIL - resolved.json does not match expected.json !!")
} else {
  console.log("SUCCESS - resolved.json matches expected.json")
}

if (diffJaml.length !== 1) {
  console.error("FAIL - resolved.yaml does not match expected.yaml !!")
} else {
  console.log("SUCCESS - resolved.yaml matches expected.yaml")
}
