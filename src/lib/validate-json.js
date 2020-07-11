module.exports = data => {
    if (!Array.isArray(data) || !data.length > 0) {
        throw new Error(`JSON data must be an array!\nGot: ${JSON.stringify(data, null, 4)}`);
    }
    // Move on
};
