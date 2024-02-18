module.exports = {
    // Other webpack configuration options...
  
    stats: {
      warningsFilter: [
        /Failed to parse source map: 'webpack:\/\/antd\/\..+?\/style\/index\.less' URL is not supported/,
      ]
    }
  };
  