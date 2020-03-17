## carbone-copy-api
Express library that provides and interface for generating documents from templates and data.  It provides a local file storage cache that means callers do not have to upload the template for each render.  Callers should should store cache keys/hashes and check if templates exist before generation.  
This is a wrapper around [carbone](https://carbone.io), please refer to their documentation for more detail.  The API follows their recommendations.    

### important
This library will require LibreOffice installed.  It requires LibreOffice to do pdf generation.  

See image: [alpine-node-libreoffice](https://hub.docker.com/r/bcgovimages/alpine-node-libreoffice).  

### usage

#### install

``` 
npm i carbone-copy-api
```

### configuration
There are several configuration variables that allow for customization.  

| Config Var | ENV Var | Notes |
| --- | --- | --- |
| fileUploadsDir | CACHE\_DIR | This is the root location to read/write files.  Error will be thrown if directory does not exist and cannot be created.  Default is operating system temp file location. |
| formFieldName | UPLOAD\_FIELD\_NAME | Field name for multipart form data upload when uploading templates via /template api.  Default is 'template' |
| maxFileSize | UPLOAD\_FILE\_SIZE | Limit size of template files. Uses the [bytes](https://www.npmjs.com/package/bytes) library for parsing values.  Default is '25MB'|
| maxFileCount | UPLOAD\_FILE\_COUNT | Limit the number of files uploaded per call.  Default is 1, not recommended to use any other value. |
| startCarbone | START\_CARBONE |If true, then the carbone converter will be started on application start. This will ensure that the first call to /render will not incur the overhead of starting the converter. Default is 'true' |


#### pass in options
```
const carboneCopyApi = require('carbone-copy-api');

const options = {
   fileUploadsDir: '/tmp/my-application-holding/files',
   formFieldName: 'files',
   maxFileSize: '50MB',
   maxFileCount: 1,
   startCarbone: true
};

carboneCopyApi.init(options);
```

#### use environment variables
```
export CACHE_DIR = '/tmp/my-application-holding/files'
export UPLOAD_FIELD_NAME = 'files'
export UPLOAD_FILE_SIZE = '50MB'
export UPLOAD_FILE_COUNT = 1
export START_CARBONE = 'true'

...
const carboneCopyApi = require('carbone-copy-api');
carboneCopyApi.init();
```

#### default
```
# defaults are:
#
#   fileUploadsDir: '/tmp/carbone-files',
#   formFieldName: 'template',
#   maxFileSize: '25MB',
#   maxFileCount: 1,
#   ccApiBasePath: '/',
#   startCarbone: true
#

const carboneCopyApi = require('carbone-copy-api');
carboneCopyApi.init();
```

**NOTE**: maxFileSize uses the [bytes](https://www.npmjs.com/package/bytes) library for parsing values.   

#### mount the routes
The mount function accepts an express app, a path and configuration options (optional).  

The following example will mount the carbone-copy-api at the root of the server.

```
const carboneCopyApi = require('carbone-copy-api');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
...
carboneCopyApi.mount(app, '/');

```
The following example will mount the carbone-copy-api to an alternate path on the server.

```
const carboneCopyApi = require('carbone-copy-api');

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

#### review api at /docs
Once mounted, view the Open API spec at /docs. 

