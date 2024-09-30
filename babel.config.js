module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./src/shared/assets",
          },
          extensions: [".png", ".jpg", ".jpeg", ".svg"],
        },
      ],
    ],
  };
};
