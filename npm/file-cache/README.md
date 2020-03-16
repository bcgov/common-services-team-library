## file-cache
Library to store files locally identified by a hash of the file contents.  A sub-directory is created and identified by a hash of the file, the original file is then stored under the hash sub-directory.  

The hash is created when writing the binary contents to disk.  Each file will generate a unique hash.  

```
/root-dir
.. /hash
.. / ../original-file.ext
```

### install
```
npm i file-cache
```

### configuration
The root directory for the file cache can be specified by an option (fileCachePath), or an environment variable (FILE\_CACHE\_PATH), or will just use the temp directory as specified by the Operating System.

#### pass in option
```
const FileCache = require('file-cache');
const fileCache = new FileCache({fileCachePath: '/var/usr/file-cache'});
```

#### use an environment variable
```
export FILE_CACHE_PATH = '/var/usr/file-cache';
...
const FileCache = require('file-cache');
const fileCache = new FileCache();
```

#### default is operating system temp dir
```
const FileCache = require('file-cache');
const fileCache = new FileCache();
```

### usage

#### create/initialize
Create a new fileCache object, the configured directory will be verified and created if required.  Will throw an Error if the directory does not exist and cannot be created.  

```
const FileCache = require('file-cache');
const fileCache = new FileCache({fileCachePath: '/var/usr/file-cache'});
```

#### async write
Write contents of a buffer to the file cache.

```
const writeFileResult = await fileCache.write(input.content, input.fileName, 'binary', {overwrite: true});

```

| Parameters | Description |
| --- | --- |
| content | string or buffer of data |
| name | Filename or extension or content.  If extension, then UUID will be used for the name: <UUID>.ext |
| contentEncodingType | Encoding type of content. ex. base64, bin, hex.  Default is base64 |
| options | Object for optional work.  default is {overwrite = false}. |
| options.overwrite | If true, then allow the destination file to be overwritten if it exists, otherwise will return an error. |

##### returns object
```
{ 
    success: false, 
    errorType: null, 
    errorMsg: null, 
    hash: null
}
```

| Field | Description |
| --- | --- |
| success | boolean, true indicates data written to cache, false otherwise |
| errorType | number - error number if not successful. |
| errorMsg | string - error message if not successful. |
| hash | string - hash/key identifying the file |

#### async move
Move existing file to file cache.

```
const moveFileResult = await fileCache.move(req.file.path, req.file.originalname);

```

| Parameters | Description |
| --- | --- |
| source | existing file |
| name | name of file with extension ex. my-word-file.docx |
| options | Object for optional work.  default is {overwrite = false}. |
| options.overwrite | If true, then allow the destination file to be overwritten if it exists, otherwise will return an error. |

##### returns object
```
{ 
    success: false, 
    errorType: null, 
    errorMsg: null, 
    hash: null
}
```

| Field | Description |
| --- | --- |
| success | boolean, true indicates data written to cache, false otherwise |
| errorType | number - error number if not successful. |
| errorMsg | string - error message if not successful. |
| hash | string - hash/key identifying the file |

#### async read
Read file from cache.  Will throw an Error if file not found or error reading from file system.  

```
const cachedFile = await fileCache.read(hash);
```

| Parameters | Description |
| --- | --- |
| hash | string - hash/key for file in cache |

##### returns file
See [fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)

#### find
Find a file in the cache.  

```
const findFileResult = fileCache.find(hash);
```

| Parameters | Description |
| --- | --- |
| hash | string - hash/key for file in cache |

##### returns object
```
{ 
    success: false,
    errorType: null,
    errorMsg: null,
    hash: null,
    name: null,
    ext: null,
    dir: null,
    path: null
}
```

| Field | Description |
| --- | --- |
| success | boolean, true indicates file found to cache, false otherwise |
| errorType | number - error number if not successful. |
| errorMsg | string - error message if not successful. |
| hash | string - hash/key identifying the file |
| name | name original file. ex. my-word-file.docx |
| ext | extension portion of file name. ex. .docx |
| dir | directory portion of full path (root dir + hash) |
| path | full path to original file in cache |

#### remove
Remove a file from the cache.  

```
const removeFileResult = await fileCache.remove(hash);
```

| Parameters | Description |
| --- | --- |
| hash | string - hash/key for file in cache |

##### returns object
```
{ 
    success: false,
    errorType: null,
    errorMsg: null
}
```

| Field | Description |
| --- | --- |
| success | boolean, true indicates file found and removed from cache, false otherwise |
| errorType | number - error number if not successful. |
| errorMsg | string - error message if not successful. |
