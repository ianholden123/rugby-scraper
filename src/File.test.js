const fs = require('fs-extra');
const File = require('./File');

jest.mock('fs-extra');

describe('writeToFile', () => {
  test('throws if the path argument is not supplied', () => {
    expect(() => {
      File.writeToFile();
    }).toThrow(Error);
    expect(() => {
      File.writeToFile(undefined, 'data');
    }).toThrow(Error);
  });

  test('calls the file system write function', () => {
    File.writeToFile('path', 'data');
    expect(fs.outputFile).toHaveBeenCalledWith('path', 'data');
  });

  test('transforms and sends number data to the file system write function correctly.', () => {
    File.writeToFile('path', 2);
    expect(fs.outputFile).toHaveBeenCalledWith('path', '2');
  });

  test('transforms and sends JSON object data to the file system write function correctly.', () => {
    File.writeToFile('path', [{}]);
    expect(fs.outputFile).toHaveBeenCalledWith('path', '[{}]');
  });
});

describe('readFromFile', () => {
  test('throws if the path argument is not supplied', () => {
    expect(() => {
      File.readFromFile(undefined, 'data');
    }).toThrow(Error);
  });

  test('calls the file system read function', () => {
    File.readFromFile('path');
    expect(fs.readFileSync).toHaveBeenCalledWith('path', 'utf8');
  });

  describe('return as JSON', () => {
    beforeEach(() => {
      fs.readFileSync.mockReturnValue('[{}]');
    });

    test('calls the file system read function', () => {
      File.readFromFile('path');
      expect(fs.readFileSync).toHaveBeenCalledWith('path', 'utf8');
    });

    test('returns response as string if no JSON parameter is set', () => {
      expect(File.readFromFile('path')).toEqual('[{}]');
    });

    test('returns response as JSON if JSON parameter is set', () => {
      expect(File.readFromFile('path', true)).toEqual([{}]);
    });
  });
});
