# doc-gen-api

Node Express application that provides an interface for generating documents from templates and data.  It provides a local file storage cache that means callers do not have to upload the template for each render.  Callers should should store cache keys/hashes and check if templates exist before generation.

The most significant libraries used in this application are:

* [carbone-copy-api](https://www.npmjs.com/package/@bcgov/carbone-copy-api)
  * [carbone-render](https://www.npmjs.com/package/@bcgov/carbone-render)
  * [file-cache](https://www.npmjs.com/package/@bcgov/file-cache)

Please review their documentation.

## Prerequisites

This library will require LibreOffice installed to do pdf generation.

See image: [alpine-node-libreoffice](https://hub.docker.com/r/bcgovimages/alpine-node-libreoffice).

## Usage

## Configuration

Configuration is set by environment variables.

| Variable | Notes |
| --- | --- |
| CACHE\_DIR | This is the root location to read/write files.  Error will be thrown if directory does not exist and cannot be created.  Default is operating system temp file location. |
| CONVERTER\_FACTORY\_TIMEOUT | Timeout for the LibreOffice PDF conversion call.  Default is '60000' (60s). |
| UPLOAD\_FIELD\_NAME | Field name for multipart form data upload when uploading templates via /template api.  Default is 'template' |
| UPLOAD\_FILE\_SIZE | Limit size of template files. Uses the [bytes](https://www.npmjs.com/package/bytes) library for parsing values.  Default is '25MB'|
| UPLOAD\_FILE\_COUNT | Limit the number of files uploaded per call.  Default is 1, not recommended to use any other value. |
| START\_CARBONE | If true, then the carbone converter will be started on application start. This will ensure that the first call to /render will not incur the overhead of starting the converter. Default is 'true' |
| API\_PATH | Path to mount carbone-copy-api.  Default is '/' (root of server). |
| APP\_PORT | Port number to run express application.  Default is 8000. |

### Example

```sh
export CACHE_DIR = '/tmp/my-application-holding/files'
export CONVERTER_FACTORY_TIMEOUT = 60000
export UPLOAD_FIELD_NAME = 'templateFile'
export UPLOAD_FILE_SIZE = '50MB'
export UPLOAD_FILE_COUNT = 1
export START_CARBONE = 'true'
export API_PATH = '/api/v1/'
export APP_PORT = 3030

npm run start
```

### API Documentation

Once mounted, you can view the OpenAPI spec at <http://localhost:3030/docs> (if started like the above example).
