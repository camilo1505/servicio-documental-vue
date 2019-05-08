module.exports = {
  devServer: {
    "/*": {
      target: "http://localhost:8080",
      secure: false
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? ''
  : './'
}