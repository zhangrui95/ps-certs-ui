const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  options: { showVuxVersionInfo: !isProduction },
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
}
