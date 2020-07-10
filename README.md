# Install

You can either install this module globally with:

```
npm install -g blocks-builder
```

or use it with npx like:

```
npx blocks-builder
```

Blocks-builder will run "npm run build" for every Wordpress Gutenberg plugin you specify in a **given** json file.

## Example

Let's say you have to Gutenberg plugins, A and B. Create a JSON file in your project and put an array with the plugin name. Like this:

```js
// example.json

['A', 'B'];
```

Then you can run:

```shell
npx blocks-builder -f example.json -p /path/to/plugins-folder
```

Note that plugins folder will default to `./plugins` if not specified.

## Options

```
Options:
  --help               Show help                                       [boolean]
  --version            Show version number                             [boolean]
  -f, --file           The file path to json file.           [string] [required]
  -p, --plugin-folder  The path to your plugins folder       [string] [default: "./plugins"]
```
