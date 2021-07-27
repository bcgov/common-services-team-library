# [Deprecated] Document Generation API

*Note: This image will no longer be receiving support updates as it has been succeeded by [common-document-generation-service](https://github.com/bcgov/common-document-generation-service). Please migrate to common-document-generation-service to continue receiving support updates.*

[![version](https://img.shields.io/docker/v/bcgovimages/doc-gen-api.svg?sort=semver)](https://hub.docker.com/r/bcgovimages/doc-gen-api)
[![pulls](https://img.shields.io/docker/pulls/bcgovimages/doc-gen-api.svg)](https://hub.docker.com/r/bcgovimages/doc-gen-api)
[![size](https://img.shields.io/docker/image-size/bcgovimages/doc-gen-api.svg)](https://hub.docker.com/r/bcgovimages/doc-gen-api)

This image is part of a [group of common components](https://github.com/bcgov/common-services-team-library), developed by the [Common Services Showcase Team](https://bcgov.github.io/common-service-showcase/).

## How does this work?

A Node Express API for generating documents from templates and data.

This images provides a fast way to set up a document generation API with a range of features like template caching, support for a wide range of file formats and file type conversions (including PDF).

NPM libraries used in this application include:

- [carbone-copy-api](https://www.npmjs.com/package/@bcgov/carbone-copy-api)
  - [carbone-render](https://www.npmjs.com/package/@bcgov/carbone-render)
  - [file-cache](https://www.npmjs.com/package/@bcgov/file-cache)

### References

- See the Document Generation API in action: [https://dgrsc.apps.silver.devops.gov.bc.ca/dgrsc/](https://dgrsc.apps.silver.devops.gov.bc.ca/dgrsc/)
- The Common Services Team Library: [https://github.com/bcgov/common-services-team-library](https://github.com/bcgov/common-services-team-library)
- Get help with your project from the Common Services Team: [https://github.com/bcgov/common-services-team-library](https://github.com/bcgov/common-services-team-library)
