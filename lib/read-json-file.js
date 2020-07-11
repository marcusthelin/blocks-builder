const fs = require('fs');

module.exports = filePath => {
    const jsonFileExists = fs.existsSync(filePath);
    if (!jsonFileExists) {
        throw new Error('JSON file does not exist!');
    }
    const jsonFileContent = fs.readFileSync(filePath, 'utf-8');
    try {
        const json = JSON.parse(jsonFileContent);
        return json;
    } catch (error) {
        throw new Error('Could not parse the JSON content.');
    }
};
