const carbone = require('carbone');
const fs = require('fs-extra');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const asyncRender = async (template, data, options) => {
  return new Promise(((resolve, reject) => {
    carbone.render(template, data, options, (err, result, reportName) => {
      if (err) {
        reject(err);
      } else {
        resolve({report: result, reportName: reportName});
      }
    });
  }));
};

module.exports.fileTypes = {
  'csv': [
    'doc',
    'docx',
    'html',
    'odt',
    'pdf',
    'rtf',
    'txt',
    'csv'
  ],
  'docx': [
    'doc',
    'docx',
    'html',
    'odt',
    'pdf',
    'rtf',
    'txt'
  ],
  'html': [
    'html',
    'odt',
    'pdf',
    'rtf',
    'txt'
  ],
  'odt': [
    'doc',
    'docx',
    'html',
    'odt',
    'pdf',
    'rtf',
    'txt'
  ],
  'pptx': [
    'odt',
    'pdf'
  ],
  'rtf': [
    'docx',
    'pdf'
  ],
  'txt': [
    'doc',
    'docx',
    'html',
    'odt',
    'pdf',
    'rtf',
    'txt'
  ],
  'xlsx': [
    'odt',
    'pdf',
    'rtf',
    'txt',
    'csv',
    'xls',
    'xlsx'
  ]
};

// initialize carbone formatters, add a marker to indicate defaults...
// unfortunately carbone is a singleton and we cannot set formatters for each render call,
const DEFAULT_CARBONE_FORMATTERS = Object.freeze(Object.assign({}, carbone.formatters));

const addFormatters = formatters => {
  if (Object.keys(formatters).length) {
    carbone.formatters = Object.assign({}, DEFAULT_CARBONE_FORMATTERS);
    carbone.addFormatters(formatters);
    return true;
  }
  return false;
};

const resetFormatters = reset => {
  if (reset) {
    carbone.formatters = Object.assign({}, DEFAULT_CARBONE_FORMATTERS);
  }
};

module.exports.startFactory = () => {
  carbone.set({startFactory: true});
};


module.exports.render = async (template, data = {}, options = {}, formatters = {}) => {
  const result = {success: false, errorType: null, errorMsg: null, reportName: null, report: null};

  if (!template) {
    result.errorType = 400;
    result.errorMsg = 'Template not specified.';
    return result;
  }
  if (!fs.existsSync(template)) {
    result.errorType = 404;
    result.errorMsg = 'Template not found.';
    return result;
  }

  // some defaults if options not set...
  if (!options.convertTo || !options.convertTo.trim().length) {
    // set convert to template type (no conversion)
    options.convertTo = path.extname(template).slice(1);
  }
  if (!options.reportName || !options.reportName.trim().length) {
    // no report name, set to UUID
    options.reportName = `${uuidv4()}.${options.convertTo}`;
  }

  // ensure the reportName has the same extension as the convertTo...
  if (options.convertTo !== path.extname(options.reportName).slice(1)) {
    options.reportName = `${path.parse(options.reportName).name}.${options.convertTo}`;
  }

  let reset = addFormatters(formatters);
  try {
    const renderResult = await asyncRender(template, data, options);
    result.report = renderResult.report;
    result.reportName = renderResult.reportName;
    result.success = true;
  } catch (e) {
    result.errorType = 500;
    result.errorMsg = `Could not render template. ${e.message}`;
  }
  resetFormatters(reset);
  return result;
};
