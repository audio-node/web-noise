const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: ["ts-loader"],
    include: [path.resolve(__dirname, "../")],
    exclude: [path.resolve(__dirname, "../node_modules")],
  });

  config.module.rules.push({
    test: /\.worker\.(ts|js)$/,
    type: "asset/inline",
    generator: {
      dataUrl: (content) => {
        return `data:application/javascript;base64,${content.toString(
          "base64"
        )}`;
      },
    },
    // type: 'javascript/auto',
    include: [path.resolve(__dirname, "../")],
    exclude: [path.resolve(__dirname, "../node_modules")],
  });

  config.module.rules.push({
    test: /\.(wav)$/,
    type: "asset/inline",
    include: [path.resolve(__dirname, "../")],
    exclude: [path.resolve(__dirname, "../node_modules")],
  });

  // Return the altered config
  return config;
};
