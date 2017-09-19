
module.exports = {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style',
    {
      name: 'i18n',
      vuxStaticReplace: false,
      staticReplace: false,
      extractToFiles: 'src/locales/components.yml',
      localeList: ['en', 'zh-CN']
    }]
}
