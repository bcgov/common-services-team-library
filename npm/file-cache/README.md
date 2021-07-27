# [Deprecated] file-cache

*Note: This package has been deprecated and will no longer be receiving support updates.*

[![npm](https://img.shields.io/npm/v/@bcgov/file-cache.svg)](https://www.npmjs.com/package/@bcgov/file-cache)
[![downloads](https://img.shields.io/npm/dm/@bcgov/file-cache.svg)](https://npmcharts.com/compare/@bcgov/file-cache?minimal=true)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![img](https://img.shields.io/badge/Lifecycle-Stable-97ca00)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

Library to store files locally identified by a hash of the file contents.  A sub-directory is created and identified by a hash of the file, the original file is then stored under the hash sub-directory.

The hash is created when writing the binary contents to disk.  Each file will generate a unique hash.

```sh
/root-dir
.. /hash
.. / ../original-file.ext
```

## Installation

```sh
npm i @bcgov/file-cache
```

## Configuration

The root directory for the file cache can be specified by an option (fileCachePath), or an environment variable (FILE\_CACHE\_PATH), or will just use the temp directory as specified by the Operating System.

### Options

The default FILE\_CACHE\_PATH will use the Operating System's default temporary directory. However, you may override this behavior with the following:

#### Direct

```js
const FileCache = require('@bcgov/file-cache');
const fileCache = new FileCache({fileCachePath: '/var/usr/file-cache'});
```

#### Environment Variables

```sh
export FILE_CACHE_PATH = '/var/usr/file-cache';
```

```js
const FileCache = require('@bcgov/file-cache');
const fileCache = new FileCache();
```

## Usage

### create/initialize

Create a new fileCache object, the configured directory will be verified and created if required.  Will throw an Error if the directory does not exist and cannot be created.

```js
const FileCache = require('@bcgov/file-cache');
const fileCache = new FileCache({fileCachePath: '/var/usr/file-cache'});
```

### async write

Write contents of a buffer to the file cache.

```js
const writeFileResult = await fileCache.write(input.content, input.fileName, 'binary', {overwrite: true});

```

| Parameters | Description |
| --- | --- |
| content | string or buffer of data |
| name | Filename or extension or content.  If extension, then UUID will be used for the name: `UUID`.ext |
| contentEncodingType | Encoding type of content. ex. base64, bin, hex.  Default is base64 |
| options | Object for optional work.  default is {overwrite = false}. |
| options.overwrite | If true, then allow the destination file to be overwritten if it exists, otherwise will return an error. |

Returns

```json
{
    "success": false,
    "errorType": null,
    "errorMsg": null,
    "hash": null
}
```

| Field | Description |
| --- | --- |
| success | boolean, true indicates data written to cache, false otherwise |
| errorType | number - error number if not successful. |
| errorMsg | string - error message if not successful. |
| hash | string - hash/key identifying the file |

### async move

Move existing file to file cache.

```js
const moveFileResult = await fileCache.move(req.file.path, req.file.originalname);
```

| Parameters | Description |
| --- | --- |
| source | existing file |
| name | name of file with extension ex. my-word-file.docx |
| options | Object for optional work.  default is {overwrite = false}. |
| options.overwrite | If true, then allow the destination file to be overwritten if it exists, otherwise will return an error. |

Returns object

```json
{
    "success": false,
    "errorType": null,
    "errorMsg": null,
    "hash": null
}
```

| Field | Description |
| --- | --- |
| success | boolean, true indicates data written to cache, false otherwise |
| errorType | number - error number if not successful. |
| errorMsg | string - error message if not successful. |
| hash | string - hash/key identifying the file |

### async read

Read file from cache.  Will throw an Error if file not found or error reading from file system.

```js
const cachedFile = await fileCache.read(hash);
```

| Parameters | Description |
| --- | --- |
| hash | string - hash/key for file in cache |

Returns file

See [fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)

### find

Find a file in the cache.

```js
const findFileResult = fileCache.find(hash);
```

| Parameters | Description |
| --- | --- |
| hash | string - hash/key for file in cache |

Returns object

```json
{
    "success": false,
    "errorType": null,
    "errorMsg": null,
    "hash": null,
    "name": null,
    "ext": null,
    "dir": null,
    "path": null
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

### remove

Remove a file from the cache.

```js
const removeFileResult = await fileCache.remove(hash);
```

| Parameters | Description |
| --- | --- |
| hash | string - hash/key for file in cache |

Returns object

```json
{
    "success": false,
    "errorType": null,
    "errorMsg": null
}
```

| Field | Description |
| --- | --- |
| success | boolean, true indicates file found and removed from cache, false otherwise |
| errorType | number - error number if not successful. |
| errorMsg | string - error message if not successful. |
