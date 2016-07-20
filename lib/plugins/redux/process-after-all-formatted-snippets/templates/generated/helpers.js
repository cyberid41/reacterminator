// NOTE: here we do not use lodash to reduce the dependencies of this package
const fileNameFromPath = (path) => path.split('/').pop();
const camelCase = (string) => (
  string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    ))
    .replace(/\s+/g, '')
);

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
    (acc, additionalFilePath) => {
      const variableName = camelCase(fileNameFromPath(additionalFilePath));
      const newAcc = acc;
      newAcc[variableName] = custom[additionalFilePath]();
      return newAcc;
    },
    {}
  );
};

export default {
  getAdditional,
};
