/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { getCliEnv, setCliEnv, SUPPORTED_ENVS, DEFAULT_ENV, PROD_ENV, STAGE_ENV } = require('../src')

jest.mock('@adobe/aio-lib-core-config')
const mockConfig = require('@adobe/aio-lib-core-config')

const PROD = 'prod'
const STAGE = 'stage'

// /////////////////////////////////////////////

afterEach(() => {
  mockConfig.get.mockClear()
  mockConfig.set.mockClear()
})

test('exports', () => {
  expect(typeof getCliEnv).toEqual('function')
  expect(typeof setCliEnv).toEqual('function')
  expect(Array.isArray(SUPPORTED_ENVS)).toBeTruthy()
  expect(DEFAULT_ENV).toBeDefined()
  expect(PROD_ENV).toBeDefined()
  expect(STAGE_ENV).toBeDefined()
  expect(SUPPORTED_ENVS.includes(DEFAULT_ENV)).toBeTruthy()
  expect(SUPPORTED_ENVS.includes(PROD_ENV)).toBeTruthy()
  expect(SUPPORTED_ENVS.includes(STAGE_ENV)).toBeTruthy()
})

describe('getCliEnv', () => {
  test('valid config key set', () => {
    mockConfig.get.mockReturnValueOnce(PROD)
    expect(getCliEnv()).toEqual(PROD)

    mockConfig.get.mockReturnValueOnce(STAGE)
    expect(getCliEnv()).toEqual(STAGE)
  })

  test('valid config key set (not all lowercase)', () => {
    mockConfig.get.mockReturnValueOnce(PROD.toUpperCase())
    expect(getCliEnv()).toEqual(PROD)

    mockConfig.get.mockReturnValueOnce(STAGE.toUpperCase())
    expect(getCliEnv()).toEqual(STAGE)
  })

  test('no config key set (return default env)', () => {
    mockConfig.get.mockReturnValueOnce(null)
    expect(getCliEnv()).toEqual(PROD)
  })

  test('invalid env set (return default env)', () => {
    mockConfig.get.mockReturnValueOnce('some-invalid-env')
    expect(getCliEnv()).toEqual(PROD)
  })
})

describe('setCliEnv', () => {
  test('invalid env value', () => {
    const envValue = 'invalid-env-value'
    expect(() => setCliEnv(envValue)).toThrow(
      new Error(`env value ${envValue} is not a supported env. Valid values are ["prod","stage"]`))
  })

  test('valid env value', () => {
    expect(() => setCliEnv(PROD)).not.toThrow()
    expect(() => setCliEnv(STAGE)).not.toThrow()
  })

  test('valid env value (not all lowercase)', () => {
    expect(() => setCliEnv(PROD.toUpperCase())).not.toThrow()
    expect(() => setCliEnv(STAGE.toUpperCase())).not.toThrow()
  })
})
