module.exports = {
  devServer: {
    "/": {
      target: "http://localhost:8080"
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? ''
  : './'
}