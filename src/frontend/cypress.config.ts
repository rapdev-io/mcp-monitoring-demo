// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'cypress';
import dotEnv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { resolve } from 'path';

import {datadogRum} from '@datadog/browser-rum'
                    
datadogRum.init({
    applicationId: '5edf844c-662c-4786-8e7b-949cb113037b',
    clientToken: 'pubbf94e78e831a1cdc6fd091780301c04d',
    site: 'datadoghq.com',
    service: 'otel-frontend',
    env: 'dev',
    version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackResources: true,
    trackUserInteractions: true,
    trackLongTasks: true,

                   
    // ----- Recommended Options -----
    // Do not forget to upload your debug symbols to get deobfuscated stack traces, read {docs} to learn how to
    // allowedTracingUrls: '<BACKEND-URL>',
    // defaultPrivacyLevel: 'mask-user-input',
});

const myEnv = dotEnv.config({
  path: resolve(__dirname, '../../.env'),
});
dotenvExpand.expand(myEnv);

const { FRONTEND_ADDR = '', NODE_ENV, FRONTEND_PORT = '8080' } = process.env;

const baseUrl = NODE_ENV === 'production' ? `http://${FRONTEND_ADDR}` : `http://localhost:${FRONTEND_PORT}`;

export default defineConfig({
  env: {
    baseUrl,
  },
  e2e: {
    baseUrl,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false,
  },
});
