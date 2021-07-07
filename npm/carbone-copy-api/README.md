# carbone-copy-api

[![npm](https://img.shields.io/npm/v/@bcgov/carbone-copy-api.svg)](https://www.npmjs.com/package/@bcgov/carbone-copy-api)
[![downloads](https://img.shields.io/npm/dm/@bcgov/carbone-copy-api.svg)](https://npmcharts.com/compare/@bcgov/carbone-copy-api?minimal=true)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![img](https://img.shields.io/badge/Lifecycle-Stable-97ca00)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

Express library that provides and interface for generating documents from templates and data.  It provides a local file storage cache that means callers do not have to upload the template for each render.  Callers should should store cache keys/hashes and check if templates exist before generation.

This is a wrapper around [carbone](https://carbone.io), please refer to their documentation for more detail.  The API follows their recommendations.

## Prerequisites

This library will require LibreOffice installed to do pdf generation.

See image: [alpine-node-libreoffice](https://hub.docker.com/r/bcgovimages/alpine-node-libreoffice).

## Installation

```sh
npm i @bcgov/carbone-copy-api
```

## Configuration

There are several configuration variables that allow for customization.

| Config Var | ENV Var | Default | Notes |
| --- | --- | --- | --- |
| fileUploadsDir | CACHE\_DIR | `/tmp/carbone-files` | This is the root location to read/write files.  Error will be thrown if directory does not exist and cannot be created.  Default is operating system temp file location. |
| formFieldName | UPLOAD\_FIELD\_NAME | `template` | Field name for multipart form data upload when uploading templates via /template api.  Default is 'template' |
| maxFileSize | UPLOAD\_FILE\_SIZE | `25MB` | Limit size of template files. Uses the [bytes](https://www.npmjs.com/package/bytes) library for parsing values.  Default is '25MB' |
| maxFileCount | UPLOAD\_FILE\_COUNT | `1` | Limit the number of files uploaded per call.  Default is 1, not recommended to use any other value. |
| startCarbone | START\_CARBONE | `true` | If true, then the carbone converter will be started on application start. This will ensure that the first call to /render will not incur the overhead of starting the converter. Default is 'true' |

**NOTE**: maxFileSize uses the [bytes](https://www.npmjs.com/package/bytes) library for parsing values.

### Options

```js
const carboneCopyApi = require('@bcgov/carbone-copy-api');
const options = {
    fileUploadsDir: '/tmp/my-application-holding/files',
    formFieldName: 'files',
    maxFileSize: '50MB',
    maxFileCount: 1,
    startCarbone: true
};
carboneCopyApi.init(options);
```

### Environment Variables

```sh
export CACHE_DIR = '/tmp/my-application-holding/files'
export CONVERTER_FACTORY_TIMEOUT = 60000
export UPLOAD_FIELD_NAME = 'files'
export UPLOAD_FILE_SIZE = '50MB'
export UPLOAD_FILE_COUNT = 1
export START_CARBONE = 'true'
```

```js
const carboneCopyApi = require('@bcgov/carbone-copy-api');
carboneCopyApi.init();
```

## Usage

The mount function accepts an express app, a path and configuration options (optional). Once mounted, you can view the OpenAPI spec at `/docs` wherever it is mounted.

### Examples

The following mounts the carbone-copy-api at the root of the server.

```js
const carboneCopyApi = require('@bcgov/carbone-copy-api');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
...
carboneCopyApi.mount(app, '/');

```

The following mounts the carbone-copy-api to an alternate path on the server.

```js
const carboneCopyApi = require('@bcgov/carbone-copy-api');

const options = {
   fileUploadsDir: '/tmp/my-application-holding/files',
   formFieldName: 'template',
   maxFileSize: '50MB',
   maxFileCount: 1,
   startCarbone: true
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
...
carboneCopyApi.mount(app, '/api/cc/v1', options);
```
