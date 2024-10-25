const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
const { transformer, resolver } = config;

config.resolver = {
  ...resolver,
}

module.exports = withNativeWind(config, { input: "./global.css" })