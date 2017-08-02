# Multi-file [Swagger](http://swagger.io) example

Example of how to split up a large Swagger spec into smaller files.

### [Read the blog post](http://azimi.me/2015/07/16/split-swagger-into-smaller-files.html)


### Usage
Install the node tool:

```bash
  npm install -g multi-file-swagger
```

Run the command like so:

```bash
  multi-file-swagger index.yaml > index.json
```

This will resolve every json pointer ($ref) externally or internally and then save it in a json file. Which can then be used for code generation and so on.


You can also output as yaml by using the `--output-format` option
```bash
  multi-file-swagger -o yaml index.yaml > compiled.yaml
```

#### License
MIT
