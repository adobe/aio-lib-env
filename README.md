<!--
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
-->

[![Version](https://img.shields.io/npm/v/@adobe/aio-lib-env.svg)](https://npmjs.org/package/@adobe/aio-lib-env)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-lib-env.svg)](https://npmjs.org/package/@adobe/aio-lib-env)
![Node.js CI](https://github.com/adobe/aio-lib-env/workflows/Node.js%20CI/badge.svg)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-lib-env/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-lib-env/)

# Adobe I/O Env Lib

This is a helper library that is to be used in the Adobe I/O CLI and SDKs to determine the environment to run in, whether `prod`, or `stage`.


### Installing

```bash
$ npm install @adobe/aio-lib-env 
```

### Usage

Determining the Environment
```javascript
const { 
  getCliEnv, /* function */ 
  setCliEnv, /* function */
  SUPPORTED_ENVS, /* array<string> */
  DEFAULT_ENV, /* string */
  PROD_ENV, /* string */
  STAGE_ENV /* string */
} = require('@adobe/aio-lib-env')

// getCliEnv defaults to PROD_ENV if the global config key is not set, or is set to an unknown env
const env = getCliEnv() 
// do something based on the env - switch to prod or stage endpoints, for example
```

Setting the Environment (.aio)
```json
{
  cli: {
    env: "prod"
  }
}
```

Setting the Environment (.env)
```ini
AIO_CLI_ENV=prod
```

Setting the Environment (in code)
```javascript
const { setCliEnv, PROD_ENV, STAGE_ENV } = require('@adobe/aio-lib-env')

setCliEnv(PROD_ENV)
setCliEnv(STAGE_ENV)
setCliEnv('delta-quadrant') // throws Error
```

### Debug Logs

```bash
LOG_LEVEL=debug <your_call_here>
```

Prepend the `LOG_LEVEL` environment variable and `debug` value to the call that invokes your function, on the command line. This should output a lot of debug data for your SDK calls.

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
