const fs = require('fs').promises;

const processFiles = async (filenames) => {
    const fileContents = await Promise.all(
        filenames.map(filename => fs.readFile(filename, 'utf8'))
    );
    return fileContents;
}

module.exports = processFiles;