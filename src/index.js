/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const loggerNamespace = '@adobe/aio-lib-env'
const logger = require('@adobe/aio-lib-core-logging')(loggerNamespace, { level: process.env.LOG_LEVEL })
const config = require('@adobe/aio-lib-core-config')

// env var equivalent: AIO_CLI_ENV
const DEVELOPMENT_ENVIRONMENT_KEY = 'cli.env'

const PROD_ENV = 'prod'
const STAGE_ENV = 'stage'

const SUPPORTED_ENVS = [PROD_ENV, STAGE_ENV]
const DEFAULT_ENV = PROD_ENV

/**
 * Returns the cli environment.
 *
 * @returns {string} the cli environment (prod, stage)
 */
function getCliEnv () {
  logger.debug(`supported envs: ${JSON.stringify(SUPPORTED_ENVS)}`)
  logger.debug(`default env: ${DEFAULT_ENV}`)
  logger.debug(`config key to check for env: ${DEVELOPMENT_ENVIRONMENT_KEY}`)

  const configValue = config.get(DEVELOPMENT_ENVIRONMENT_KEY)
  logger.debug(`config key value set for env: ${configValue}`)

  const value = process.env.AIO_CLI_ENV || configValue || DEFAULT_ENV
  const lcValue = value.toLowerCase()

  // no config key set, or not a supported env, we return the default env
  if (!SUPPORTED_ENVS.includes(lcValue)) {
    return DEFAULT_ENV
  }

  return lcValue
}

/**
 * Set the cli environment.
 *
 * @param {string} envValue set the cli environment value (prod, stage)
 */
function setCliEnv (envValue) {
  logger.debug(`config key value to set for env: ${envValue}`)

  const lcValue = envValue.toLowerCase()

  // if not a supported env, we throw an Error
  if (!SUPPORTED_ENVS.includes(lcValue)) {
    throw new Error(`env value ${envValue} is not a supported env. Valid values are ${JSON.stringify(SUPPORTED_ENVS)}`)
  }

  config.set(DEVELOPMENT_ENVIRONMENT_KEY, lcValue)
}

module.exports = {
  getCliEnv,
  setCliEnv,
  SUPPORTED_ENVS,
  DEFAULT_ENV,
  PROD_ENV,
  STAGE_ENV
}
