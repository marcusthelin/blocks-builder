#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const yargs = require('yargs');
// const blockPlugins = require('./block-plugins.json');

const cmds = [];

function getJson() {
    const argv = yargs
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
    const filePath = argv.f;
    const jsonFileExists = fs.existsSync(filePath);
    if (!jsonFileExists) {
        logger('JSON file does not exist!');
        process.exit(1);
    }
    const jsonFileContent = fs.readFileSync(filePath, 'utf-8');
    try {
        const json = JSON.parse(jsonFileContent);
        run(json, argv.p);
    } catch (error) {
        logger(error);
        process.exit(1);
    }
}
getJson();

function logger(str) {
    process.stdout.write('\n' + str);
}

async function builder(path) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(path)) {
            logger(`Path ${path} does not exist!`);
            return;
        }
        const cmd = spawn('npm', [`--prefix ${path} run build`], {
            stdio: [process.stdin, process.stdout, process.stderr],
            shell: true,
        });
        cmds.push(cmd);
        cmd.once('error', reject);
        cmd.once('exit', resolve);
    });
}

async function run(blockPlugins, pluginsPath) {
    if (Array.isArray(blockPlugins) && blockPlugins.length > 0) {
        for (const plugin of blockPlugins) {
            const pluginPath = path.resolve(pluginsPath, plugin);
            logger(`Installing ${plugin}`);
            await builder(pluginPath).catch(err => {
                logger(`Failed to install ${plugin}. ${err}`);
            });
        }
        logger('Done!');
        process.exit(0);
    }
}
