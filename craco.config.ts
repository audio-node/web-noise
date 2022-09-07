import conf from "./.storybook/webpack.config";

export default {
  webpack: {
    configure: (config: any, { env, paths }: { env: any; paths: any }) => {
      return conf({ config, mode: 'development' });
    },
  },
};
