const path = require('path');
const yaml = require('js-yaml');

const getAppYamlConfig = () => {
  // eslint-disable-next-line global-require
  return yaml.safeLoad(require('fs').readFileSync(path.resolve(__dirname, '../app.yaml'), 'utf8'));
};

module.exports = {
  getAppYamlConfig,
};
