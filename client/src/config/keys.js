/* eslint-enable global-require */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
/* eslint-enable global-require */
