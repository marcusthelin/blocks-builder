/**
 * Initialize the CLI, e.g parsing the arguments.
 * @returns {Object} arguments
 */

const yargs = require('yargs');

module.exports = () =>
    yargs
        .option('f', {
            alias: 'file',
            demandOption: true,
            describe: 'The file path to json file.',
            type: 'string',
        })
        .option('p', {
            alias: 'plugin-folder',
            default: './plugins',
            describe: 'The path to your plugins folder',
            type: 'string',
        }).argv;
