const fs = require('fs-extra')

const File = (module.exports = {});

/**
 * Write data to a file.
 * @param {string} path The path where the new file will be stored.
 * @param {*} data Any data type that should be stored in the file.
 */
File.writeToFile = (path, data) => {
  if (!path) throw new Error('Path not supplied to File.storeData');
  if (typeof data !== 'string') data = JSON.stringify(data);

  return fs.outputFile(path, data)
}

/**
 * Return data from a file.
 * @param {string} path The path where the new file will be stored.
 * @param {boolean} returnAsJson True if you would like to return the data as JSON.
 */
File.readFromFile = (path, returnAsJson = false) => {
  if (!path) throw new Error('Path not supplied to File.storeData');

  try {
    return returnAsJson 
      ? JSON.parse(fs.readFileSync(path, 'utf8'))
      : fs.readFileSync(path, 'utf8');
  } catch (err) {
    console.error(err)
    return false
  }
}