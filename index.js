#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const { logger, readJsonFile, argumentParser, buildCommander, validateJson } = require('./lib');

// const blockPlugins = require('./block-plugins.json');

global.spawnedCommands = [];

process.on('SIGTERM', () => {
    global.spawnedCommands.forEach(command => command.kill());
});

function countSuccessfulCommands(result) {
    return result.reduce((acc, curr) => {
        if (curr.status === 'fulfilled') {
            return ++acc;
        }
        return acc;
    }, 0);
}

async function start() {
    try {
        const { f: jsonFilePath, p: pluginsPath } = argumentParser();
        const jsonFileContent = readJsonFile(jsonFilePath); // Syncronous
        validateJson(jsonFileContent); // Either throws or let us continue the program
        const result = await buildCommander(jsonFileContent, pluginsPath);
        const successFulCommands = countSuccessfulCommands(result);
        logger(`Successfully built ${successFulCommands}/${jsonFileContent.length} plugins`);
        if (successFulCommands !== jsonFileContent.length) {
            logger('One or more plugin(s) could not be built. Please see error log(s).');
        }
    } catch (err) {
        logger(err);
    }
}

start();
