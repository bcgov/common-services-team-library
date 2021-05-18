# carbone-render

[![npm](https://img.shields.io/npm/v/@bcgov/carbone-render.svg)](https://www.npmjs.com/package/@bcgov/carbone-render)
[![downloads](https://img.shields.io/npm/dm/@bcgov/carbone-render.svg)](https://npmcharts.com/compare/@bcgov/carbone-render?minimal=true)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![img](https://img.shields.io/badge/Lifecycle-Stable-97ca00)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

Library to generate a document from an existing template and JSON data.  This is a wrapper around [carbone](https://carbone.io), please refer to their documentation for more detail.

## Prerequisites

This library will require LibreOffice installed to do pdf generation.

## Installation

```sh
npm i @bcgov/carbone-render
```

## Usage

```js
const carboneRenderer = require('@bcgov/carbone-render');
```

### startFactory

Optional call to start up the carbone python converter.  This is recommended to call on the start of your application. Otherwise, the first call to render will take longer as it starts the converter in the background.

```js
carboneRenderer.startFactory();
```

### fileTypes

Return a dictionary of allowable file conversions.  Convert to pdf is always allowed.

```js
const allowedConversions = carboneRenderer.fileTypes;
```

Returns dictionary

```json
{
    "csv": [
        "doc",
        "docx",
        "html",
        "odt",
        "pdf",
        "rtf",
        "txt",
        "csv"
    ],
    "docx": [
        "doc",
        "docx",
        "html",
        "odt",
        "pdf",
        "rtf",
        "txt"
    ],
    "html": [
        "html",
        "odt",
        "pdf",
        "rtf",
        "txt"
    ],
    "odt": [
        "doc",
        "docx",
        "html",
        "odt",
        "pdf",
        "rtf",
        "txt"
    ],
    "pptx": [
        "odt",
        "pdf"
    ],
    "rtf": [
        "docx",
        "pdf"
    ],
    "txt": [
        "doc",
        "docx",
        "html",
        "odt",
        "pdf",
        "rtf",
        "txt"
    ],
    "xlsx": [
        "odt",
        "pdf",
        "rtf",
        "txt",
        "csv",
        "xls",
        "xlsx"
    ]
}
```

### async render

Generate a new document from a template and JSON data.  Render the report.

```js
const data = {
    "firstName": "Jane",
    "lastName": "Smith",
    "title": "Who?"
};

const options = {
    "convertTo": "pdf",
    "reportName": "{d.firstName}-{d.lastName}.docx",
    "overwrite": "true",
    "cacheReport": "true"
};

const formatters = {
    // this formatter can be used in a template with {d.myBoolean:yesOrNo()}
    yesOrNo : function (data) { // data = d.myBoolean
        if (this.lang === 'fr') {
            return data === true ? 'oui' : 'non';
        }
        return data === true ? 'yes' : 'no';
    }
};

const output = await carboneRenderer.render(template.path, data, options, formatters);
```

| Parameters | Description |
| --- | --- |
| template | template file |
| data | object or array of objects used in the template |
| options | Options object to pass to carbone.  See carbone documenation. |
| options.convertTo | What file type to convert to, see fileTypes or pdf |
| options.reportName | Name of the generated report, should include expected extension. Can contain template placeholders, see carbone documentation. |
| formatters | Object. Additional formatters to add to carbone.  See carbone documenation. |

Returns object

```json
{
    "success": false,
    "errorType": null,
    "errorMsg": null,
    "reportName": null,
    "report": null
}
```

| Field | Description |
| --- | --- |
| success | boolean, true indicates report generated, false otherwise |
| errorType | number - error number if not successful. |
| errorMsg | string - error message if not successful. |
| reportName | string - name of the generated report |
| report | binary - generated file |
