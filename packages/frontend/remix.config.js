/** @type {import('@remix-run/dev').AppConfig} */
const config = {
  browserNodeBuiltinsPolyfill: {
    modules: {
      buffer: true,
      fs: 'empty',
      events: true,
    },
  },
};

export default config;
