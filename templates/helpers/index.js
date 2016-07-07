// TODO: remove dependency on lodash
import _ from 'lodash';

const fileNameFromPath = (path) => _.last(path.split('/'));
const camelCase = (string) => _.camelCase(string);

const getAdditional = ({ type, path, baseFiles, custom }) => {
  const basePaths = baseFiles.map((baseFile) => (
    path
      ? [type, path, baseFile].join('/')
      : [type, baseFile, 'index'].join('/')
  ));

  const currentPath = path
    ? [type, path, 'index'].join('/')
    : [type, 'index'].join('/');

  const nonAdditionalPaths = basePaths.concat(currentPath);

  const additionalFilePaths = Object
    .keys(custom)
    .filter((filePath) => {
      const isForThisPath = path
        ? filePath.indexOf([type, path].join('/')) === 0
        : new RegExp(`^${type}/[^/]+/index$`).test(filePath);

      const isAdditional = nonAdditionalPaths.indexOf(filePath) === -1;

      return isForThisPath && isAdditional;
    });

  return additionalFilePaths.reduce(
    (acc, path) => {
      const variableName = camelCase(fileNameFromPath(path));
      acc[variableName] = custom[path]();
      return acc;
    },
    {}
  );
};

export default {
  getAdditional,
};







