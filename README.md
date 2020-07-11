# Install

You can either install this module globally with:

```
npm install -g blocks-builder
```

or use it with npx like:

```
npx blocks-builder
```

Blocks-builder will run a npm script for every Wordpress Gutenberg plugin you specify in a **given** json file.

## Example

Let's say you have two Gutenberg plugins, A and B. Create a JSON file in your project and put an array with the plugin name. Like this:

```js
// example.json

["A", "B"];
```

Then you can run:

```shell
npx blocks-builder -f example.json -p /path/to/plugins-folder
```
**Note that plugins folder will default to `./plugins` if not specified.**

Blocks-builder will now loop through the plugin directories (if existing) and by default run:

```shell
npm run build
```

You can change which npm script that will be run in each plugin folder. To do so you can specify a plugin as an object in the JSON file. Let's say plugin A has a build script that is called "build-plugin". We can change our JSON file to this:

```js
// example.json

[{ "name": "A", "command": "build-plugin" }, "B"];
```

## Options

```
Options:
  --help               Show help                                       [boolean]
  --version            Show version number                             [boolean]
  -f, --file           The file path to json file.           [string] [required]
  -p, --plugin-folder  The path to your plugins folder       [string] [default: "./plugins"]
```
