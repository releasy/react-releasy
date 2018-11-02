import doczPluginNetlify from 'docz-plugin-netlify';

export default {
  title: 'react-releasy',
  description: 'Relay with zero-configuration. SSR, caching, testing and more.',
  menu: [
    'Getting Started',
    {
      name: 'Components',
      menu: ['ReleasyProvider', 'Query'],
    },
    {
      name: 'Core',
      menu: ['Config', 'Cache', 'Link', 'VCR'],
    },
    'Utils',
    'SSR',
    {
      name: 'Examples',
      href: 'https://github.com/releasy/releasy-examples',
    },
  ],
  themeConfig: {
    colors: {
      primary: '#f57600',
    },
  },
  typescript: true,
  plugins: [doczPluginNetlify()],
};
