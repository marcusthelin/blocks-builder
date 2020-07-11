const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const logger = require('./logger');

/**
 * Function that will run build command
 * in the given path.
 * @param {{}} plugin - Plugin information
 * @param {string} plugin.name - The name of the plugin.
 * @param {string=} plugin.buildCmd - NPM script to run. Defaults to "build"
 * @param {string} plugin.path - Absolute path to the plugin in the plugins directory.
 * @returns {Promise} Resolves when finished with the build command.
 */

function commander(plugin) {
    const buildCmd = plugin.buildCmd || 'build';
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(plugin.path)) {
            logger(`Path ${plugin.path} does not exist!`);
            return reject();
        }
        logger(`Building ${plugin.name}`);
        const cmd = spawn('npm', [`--prefix ${plugin.path} run ${buildCmd}`], {
            stdio: [process.stdin, process.stdout, process.stderr],
            shell: true,
        });
        global.spawnedCommands.push(cmd);
        cmd.once('error', reject);
        cmd.once('exit', resolve);
    });
}

module.exports = (plugins, pluginsPath) => {
    // Loop through the plugin paths and run build command
    const processes = [];
    for (const plugin of plugins) {
        const pluginInformation = {};
        if (typeof plugin === 'object') {
            if (!plugin.name) {
                throw new Error('You must provide a plugin name!');
            }
            pluginInformation.buildCmd = plugin.command;
            pluginInformation.name = plugin.name;
        } else {
            pluginInformation.name = plugin; // Plugin is just a string (the name).
        }

        const pluginPath = path.resolve(pluginsPath, pluginInformation.name);
        pluginInformation.path = pluginPath;
        const buildProcess = commander(pluginInformation);
        processes.push(buildProcess);
    }
    return Promise.allSettled(processes);
};
