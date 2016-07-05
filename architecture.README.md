# Architecture

## Summary

There are two main ideas in the architecture:
- pipline
- plugins

The main program is only a pipline that apply plugins AFTER each stage.

The main plugin runs before any plugins.
Plugins should be as independent as possible.
Plugins modify the data piped through and can attach pulgin specific
data or manipulate data as however the plugin want.

The pipline will find a function called process\[Each|All\]\[StageName\]
in the plugin object to apply to the data.

## Stages

- htmlFiles
  ```javascript
  {
    htmlFiles: {
      [filePath]: {
        fileName: [fileName],
        filePath: [filePath],
        fileContent: [fileContent]
      }
    },
    options: { }
  }
  ```

- htmlSnippets
  ```javascript
  {
    components: {
      [componentName]: {
        fromPath: [fromPath],
        pathName: [pathName],
        componentName: [componentName],
        htmlSnippet: [htmlSnippet]
      }
    },
    options: { }
  }
  ```

- jsxSnippets
  ```javascript
  {
    components: {
      [componentName]: {
        fromPath: [fromPath],
        pathName: [pathName],
        componentName: [componentName],
        htmlSnippet: [htmlSnippet],
        jsxSnippet: [jsxSnippet]
      }
    },
    options: { }
  }
  ```

- declarationSnippets
  ```javascript
  {
    components: {
      [componentName]: {
        fromPath: [fromPath],
        pathName: [pathName],
        componentName: [componentName],
        htmlSnippet: [htmlSnippet],
        jsxSnippet: [jsxSnippet],
        declarationSnippet: [declarationSnippet]
      }
    },
    options: { }
  }
  ```

- imports
  ```javascript
  {
    components: {
      [componentName]: {
        fromPath: [fromPath],
        pathName: [pathName],
        componentName: [componentName],
        htmlSnippet: [htmlSnippet],
        jsxSnippet: [jsxSnippet],
        declarationSnippet: [declarationSnippet],
        imports: [imports]
      }
    },
    options: { }
  }
  ```

- export
  ```javascript
  {
    components: {
      [componentName]: {
        fromPath: [fromPath],
        pathName: [pathName],
        componentName: [componentName],
        htmlSnippet: [htmlSnippet],
        jsxSnippet: [jsxSnippet],
        declarationSnippet: [declarationSnippet],
        imports: [imports],
        export: [export]
      }
    },
    options: { }
  }
  ```

- formattedSnippets
  ```javascript
  {
    components: {
      [componentName]: {
        fromPath: [fromPath],
        pathName: [pathName],
        componentName: [componentName],
        htmlSnippet: [htmlSnippet],
        jsxSnippet: [jsxSnippet],
        declarationSnippet: [declarationSnippet],
        imports: [imports],
        export: [export],
        formatedsnippet: [formatedsnippet]
      }
    },
    options: { }
  }
  ```
