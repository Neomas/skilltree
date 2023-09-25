// i18n
const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,

  reactStrictMode: true,

  env: {
    SB_ACCESS_TOKEN: process.env.SB_ACCESS_TOKEN,
  },

  // Images Options
  images: {
    domains: ["images.unsplash.com", "a.storyblok.com", "webwereld.nl", "img.youtube.com"],
    deviceSizes: [320, 450, 600, 768, 1024, 1360, 1440],
  },

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false,
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};