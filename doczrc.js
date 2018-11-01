import doczPluginNetlify from 'docz-plugin-netlify';

export default {
  title: 'react-releasy',
  description: 'Relay with zero-configuration',
  themeConfig: {
    colors: {
      primary: '#f57600',
    },
  },
  typescript: true,
  plugins: [doczPluginNetlify()],
};
