## carbone-copy-api
Express library that provides and interface for generating documents from templates and data.  It provides a local file storage cache that means callers do not have to upload the template for each render.  Callers should should store cache keys/hashes and check if templates exist before generation.  
This is a wrapper around [carbone](https://carbone.io), please refer to their documentation for more detail.  The API follows their recommendations.    

### important
This library will require LibreOffice installed.  It requires LibreOffice to do pdf generation.  
  

### usage

#### install

``` 
npm i carbone-copy-api
```

### configuration
There are several configuration variables that allow for customization.  

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
#   startCarbone: true
#

const carboneCopyApi = require('carbone-copy-api');
carboneCopyApi.init();
```

**NOTE**: maxFileSize uses the [bytes](https://www.npmjs.com/package/bytes) library for parsing values.   

#### mount the routes
The following example will mount the carbone-copy-api at the root of the server.

```
const carboneCopyApi = require('carbone-copy-api');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
...
app.use('/', carboneCopyApi.routes());

```

#### review api at /docs
Once mounted, view the Open API spec at /docs. 

