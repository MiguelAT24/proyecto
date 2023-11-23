// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.plugins = config.plugins.filter((plugin) => {
          return plugin.constructor.name !== 'ReactRefreshPlugin';
        });
      }
      return config;
    },
  };
  