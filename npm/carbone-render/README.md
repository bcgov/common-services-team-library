## carbone-render
Library to generate a document from an existing template and JSON data.  This is a wrapper around [carbone](https://carbone.io), please refer to their documentation for more detail.  

### important
This library will require LibreOffice installed.  It requires LibreOffice to do pdf generation.  
  

### usage

#### install/initialize

``` 
npm i carbone-render
...
const carboneRenderer = require('carbone-render');
```

#### startFactory
Optional call to start up the carbone python converter.  This is recommended to call on start of your application, otherwise, the first call to render will take longer as it starts the converter.  

``` 
carboneRenderer.startFactory();
```

#### fileTypes
Return a dictionary of allowable file conversions.  Convert to pdf is always allowed.  

``` 
const allowedConversions = carboneRenderer.fileTypes;
```

##### returns object
```
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

#### async render
Generate a new document from a template and JSON data.  Render the report.  

```
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

##### returns object
```
{ 
    success: false, 
    errorType: null, 
    errorMsg: null, 
    reportName: null, 
    report: null
}
```

| Field | Description |
| --- | --- |
| success | boolean, true indicates report generated, false otherwise |
| errorType | number - error number if not successful. |
| errorMsg | string - error message if not successful. |
| reportName | string - name of the generated report |
| report | binary - generated file |



