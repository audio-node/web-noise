const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {
  prompt: async ({ inquirer }) => {
    const { componentType } = await inquirer.prompt({
      type: "input",
      name: "componentType",
      message: "component type",
    });

    const { componentName } = await inquirer.prompt({
      type: "input",
      name: "componentName",
      message: "component name",
      default: capitalize(componentType),
    });

    const { componentFolder } = await inquirer.prompt({
      type: "input",
      name: "componentFolder",
      message: "component folder",
      default: componentName,
    });

    const { hasAudioNode } = await inquirer.prompt({
      type: "confirm",
      name: "hasAudioNode",
      message: "has audio node?",
      default: true,
    });

    const { hasWorklet } = hasAudioNode
      ? await inquirer.prompt({
          type: "confirm",
          name: "hasWorklet",
          message: "has worklet?",
          default: true,
        })
      : { hasWorklet: false };

    const workletParameters = hasWorklet
      ? await inquirer.prompt({
          type: "input",
          name: "workletParameters",
          message: "worklet parameters (comma-separated)",
          default: "",
        })
      : { workletParameters: "" };

    const { hasNode } = await inquirer.prompt({
      type: "confirm",
      name: "hasNode",
      message: "has node?",
      default: true,
    });

    const { hasControlPanel } = hasNode
      ? await inquirer.prompt({
          type: "confirm",
          name: "hasControlPanel",
          message: "has control panel?",
          default: true,
        })
      : { hasControlPanel: false };


    const { hasConfig } = hasNode
      ? await inquirer.prompt({
        type: "confirm",
        name: "hasConfig",
        message: "has config panel?",
        default: true,
        })
      : { hasConfig: false };

    return {
      componentType,
      componentName,
      componentFolder,
      hasAudioNode,
      hasWorklet,
      workletParameters: workletParameters.workletParameters,
      hasNode,
      hasControlPanel,
      hasConfig,
    };
  },
};
