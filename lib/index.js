// TODO: give the user a way to specify order for each process e.g. super-components before redux
// TODO: let user choose plugins
// TODO: improve performance by using one ast hook to go through the whole project

const _ = require('lodash');
const path = require('path');
const generate = require('./generate/index');
const createHtmlFiles = require('./create-html-files');
const htmlFileToHtmlSnippets = require('./html-file-to-html-snippets');

const builtInPluginNames = [
  'main', // this need to be at the beginning
  'super-components', // this need to come before redux
  'redux',
  'change-wrapper-name',
  'reactify-style-attr',
  'tags-to-component-names',
  'replace-inner-html-with-value-attr',
  'add-props', // this need to be after all props manipulation since it removes all other props
  'clean-jsx-ast', // this need to be at the end to clean ast
  'main-last', // this need to be at the end of everything
];

const processes = [
  'processBeforeAllJsxSnippets',
  'processEachJsxSnippet',
  'processAfterAllJsxSnippets',
  'processEachDeclarationSnippet',
  'processEachImports',
  'processAfterAllImports',
  'processEachExports',
  'processEachFormattedSnippet',
  'processAfterAllFormattedSnippets',
];

const builtInPlugins = builtInPluginNames.reduce((acc, pluginName) => {
  acc[pluginName] = require(`./plugins/${pluginName}`); // eslint-disable-line global-require
  return acc;
}, {});

function pipeThroughPlugins(plugins, processName, initialValue) {
  return _.reduce(plugins, (finalValue, plugin) => {
    const processFunction = plugin[processName] || _.identity;
    return processFunction(finalValue);
  }, initialValue);
}

function processReducer(previousComponents, processName, options) {
  const processType = /processEach/.test(processName) ? 'each' : 'all';

  switch (processType) {
    case 'each':
      return _.mapValues(
        previousComponents,
        (component) => (
          pipeThroughPlugins(
            options.plugins,
            processName,
            {
              component,
              components: previousComponents,
              options,
            }
          ).component
        )
      );
    case 'all':
      return pipeThroughPlugins(
        options.plugins,
        processName,
        {
          components: previousComponents,
          options,
        }
      ).components;
    default:
      throw new Error(`This process type ${processType} is not recognized.`);
  }
}

/**
 * options:
 *
 *  outputPath
 *  recursive
 *  fileToComponent
 *  generateFiles
 *
 */
function reacterminator({ type, content }, options = {}) {
  // prepare options
  options.outputPath = path.resolve(options.outputPath || './reacterminator/');
  options.plugins = builtInPlugins;

  const htmlFiles = createHtmlFiles({
    type,
    content,
    recursive: options.recursive,
  });

  const htmlSnippets = _.reduce(
    htmlFiles,
    (acc, htmlFile) => {
      Object.assign(acc, htmlFileToHtmlSnippets({ htmlFile, htmlFiles, options }));
      return acc;
    },
    {}
  );

  const components = processes.reduce(
    (acc, processName) => processReducer(acc, processName, options),
    htmlSnippets
  );

  if (_.isEmpty(components)) {
    throw new Error(
      'No components are detected, please specify data-component-name ' +
      'on the tags you want as a component'
    );
  }

  return components;
}

reacterminator.generate = generate;

module.exports = reacterminator;
