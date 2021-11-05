module.exports = {
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    });

    return config;
  },
  images: {
    domains: ["images.ctfassets.net"],
    loader: "imgix",
    path: "/",
  },
};
