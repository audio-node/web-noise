module.exports = {
  prompt: ({ prompter, args }) =>
    prompter.prompt([
      {
        type: "input",
        name: "componentType",
        message: "component type",
      },
      {
        type: "input",
        name: "componentName",
        message: "component name",
      },
    ]),
};
