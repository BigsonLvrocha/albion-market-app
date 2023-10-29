/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import commonConfig from '@albion-market-app/jest-config';
import { resolve } from 'path';
import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  ...commonConfig,
  setupFiles: [resolve(__dirname, 'src', 'test', 'beforeEach.ts')],
};

export default config;
