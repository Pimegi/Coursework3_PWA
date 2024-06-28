module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Coursework3_PWA/' : '/',
  pwa: {
    name: 'PWA App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      
    },
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
};
