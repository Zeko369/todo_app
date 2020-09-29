// @ts-check

const compose = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = compose([
  withCSS(),
  withBundleAnalyzer({
    trailingSlash: false,
  }),
]);
