const fs = require('fs');
const path = require('path');
const regenerateCustomIndex = require('./regenerate-custom-index');
const ensurePathExist = require('../helpers/ensure-path-exist');
const generators = {
  components: require('./components'), // eslint-disable-line global-require
  'action-type-constants': require('./action-type-constants'), // eslint-disable-line global-require
  'action-creators': require('./action-creators'), // eslint-disable-line global-require
  reducers: require('./reducers'), // eslint-disable-line global-require
};

function contentForType({ type, customFolder, name, route }) {
  switch (type) {
    case 'components':
      ensurePathExist(path.resolve(customFolder, 'components'));
      return {
        absPath: path.resolve(customFolder, `components/${name}.jsx`),
        content: generators[type]({ name, route }),
      };
    case 'action-creators':
    case 'action-type-constants':
    case 'reducers':
      ensurePathExist(path.resolve(customFolder, `${type}/${route}`));
      return {
        absPath: path.resolve(customFolder, `${type}/${route}/${name}.js`),
        content: generators[type]({ name, route }),
      };
    default:
      throw new Error(`Type ${type} is not supported`);
  }
}

module.exports = function generate(rawPath, projectFolder = '.') {
  const customFolder = path.resolve(`${projectFolder}/custom`);
  const cleanPath = rawPath.replace(/\.(jsx|js)$/, '');
  const segments = cleanPath.split('/');

  const type = segments[0];
  const hasRoute = segments.length > 2;
  const route = hasRoute && segments[1];
  const name = segments[segments.length - 1];

  const { absPath, content } = contentForType({ type, customFolder, name, route });
  fs.writeFileSync(absPath, content);

  regenerateCustomIndex(customFolder);

  // generate an action-type-constant after we generate an action-creator
  if (type === 'action-creators') {
    generate(
      rawPath.replace('action-creators', 'action-type-constants'),
      projectFolder
    );
  }
};
