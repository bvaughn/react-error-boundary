module.exports = {
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        targets: {
          safari: "12",
        },
      },
    ],
  ],
};
