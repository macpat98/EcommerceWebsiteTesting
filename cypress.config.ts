// © Example Copyright 2024. All Rights Reserved.

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://example-ecommerce-website.com/',
  },
  env: {
    TEST_USER_EMAIL: '',
    TEST_USER_PASSWORD: ''
  }
});