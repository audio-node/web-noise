import conf from "./webpack.config";

export default {
  webpack: {
    configure: (config: any, { env, paths }: { env: any; paths: any }) => {
      return conf({ config, mode: 'development' });
    },
  },
};
