const path = require('path');

module.exports = (env) => {
  console.log('exporting the webpack config object!');
  return {
    output: {
      path: path.resolve(__diraname, 'build'),
      filename: 'bundle.js',
    },
    //mode: process.env.Node_ENV,
    mode: 'development', 
    module: {
      rules: [],
    },
  };
};
