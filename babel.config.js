export default {
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
