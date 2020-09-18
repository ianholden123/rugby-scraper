const utils = require("./utils");

describe('extractHeightFromString', () => {
  test('if no parameter is passed, it should return null', () => {
    expect(utils.extractHeightFromString()).toEqual(null)
  })

  test('if an invalid parameter is passed, return null', () => {
    expect(utils.extractHeightFromString(1)).toEqual(null)
    expect(utils.extractHeightFromString({})).toEqual(null)
    expect(utils.extractHeightFromString([])).toEqual(null)
  })

  test('if an invalid string is passed, return null', () => {
    expect(utils.extractHeightFromString('')).toEqual(null)
    expect(utils.extractHeightFromString('?')).toEqual(null)
    expect(utils.extractHeightFromString('one hundred and twenty eight centimeters')).toEqual(null)
    expect(utils.extractHeightFromString('one hundred and twenty eight cm')).toEqual(null)
    expect(utils.extractHeightFromString('something')).toEqual(null) // test that we are not picking up the 'm' in 'something'
  })

  test('if a valid string is passed, it should try to decipher the height value and return the value and unit', () => {
    expect(utils.extractHeightFromString('128cm')).toEqual([{ value: 128, unit: 'cm' }])
    expect(utils.extractHeightFromString('128 cm')).toEqual([{ value: 128, unit: 'cm' }])
    expect(utils.extractHeightFromString('1.2m')).toEqual([{ value: 1.2, unit: 'm' }])
    expect(utils.extractHeightFromString('1.2 m')).toEqual([{ value: 1.2, unit: 'm' }])
    expect(utils.extractHeightFromString('6\'0"')).toEqual([{ value: 6, unit: '\'' }, { value: 0, unit: '"'}])
    expect(utils.extractHeightFromString('6\' 3"')).toEqual([{ value: 6, unit: '\'' }, { value: 3, unit: '"'}])
    expect(utils.extractHeightFromString('6ft 0in')).toEqual([{ value: 6, unit: 'ft' }, { value: 0, unit: 'in'}])
    expect(utils.extractHeightFromString('6ft3in')).toEqual([{ value: 6, unit: 'ft' }, { value: 3, unit: 'in'}])
  })
})

describe('extractWeightFromString', () => {
  test('if no parameter is passed, it should return null', () => {
    expect(utils.extractWeightFromString()).toEqual(null)
  })

  test('if an invalid parameter is passed, return null', () => {
    expect(utils.extractWeightFromString(1)).toEqual(null)
    expect(utils.extractWeightFromString({})).toEqual(null)
    expect(utils.extractWeightFromString([])).toEqual(null)
  })

  test('if an invalid string is passed, return null', () => {
    expect(utils.extractWeightFromString('')).toEqual(null)
    expect(utils.extractWeightFromString('?')).toEqual(null)
    expect(utils.extractWeightFromString('one hundred and twenty eight kilograms')).toEqual(null)
    expect(utils.extractWeightFromString('one hundred and twenty eight kg')).toEqual(null)
    expect(utils.extractWeightFromString('something')).toEqual(null) // test that we are not picking up the 's' in 'something'
  })

  test('if a valid string is passed, it should try to decipher the height value and return the value and unit', () => {
    expect(utils.extractWeightFromString('128kg')).toEqual([{ value: 128, unit: 'kg' }])
    expect(utils.extractWeightFromString('128 kg')).toEqual([{ value: 128, unit: 'kg' }])
    expect(utils.extractWeightFromString('1.2lb')).toEqual([{ value: 1.2, unit: 'lb' }])
    expect(utils.extractWeightFromString('1.2 lb')).toEqual([{ value: 1.2, unit: 'lb' }])
    expect(utils.extractWeightFromString('1.2lbs')).toEqual([{ value: 1.2, unit: 'lb' }])
    expect(utils.extractWeightFromString('1.2 lbs')).toEqual([{ value: 1.2, unit: 'lb' }])
    expect(utils.extractWeightFromString('1.2 lbs 5kgs')).toEqual([{ value: 1.2, unit: 'lb' }, { value: 5, unit: 'kg' }])
  })
})

describe('isValidMeasurementArray', () => {
  test('if no parameters are passed, it should return false', () => {
    expect(utils.isValidMeasurementArray()).toEqual(false);
  })

  test('if the parameter is an invalid type, return false', () => {
    expect(utils.isValidMeasurementArray(null)).toEqual(false);
    expect(utils.isValidMeasurementArray(undefined)).toEqual(false);
    expect(utils.isValidMeasurementArray('')).toEqual(false);
    expect(utils.isValidMeasurementArray(1)).toEqual(false);
    expect(utils.isValidMeasurementArray({})).toEqual(false);
  })

  test('if the parameter is an array of length 0, return false', () => {
    expect(utils.isValidMeasurementArray([])).toEqual(false);
  })

  test('if the parameter is an array of invalid objects, return false', () => {
    expect(utils.isValidMeasurementArray([{}])).toEqual(false);
    expect(utils.isValidMeasurementArray([{ value: '1', unit: 'cm' }])).toEqual(false);
    expect(utils.isValidMeasurementArray([{ value: 1, something: 'cm' }])).toEqual(false);
  })

  test('if the parameter is an array of valid objects, return true', () => {
    expect(utils.isValidMeasurementArray([{ value: 1, unit: 'cm' }])).toEqual(true);
    expect(utils.isValidMeasurementArray([{ value: 1, unit: 'cm', someIrrelevantKey: 'something' }])).toEqual(true);
    expect(utils.isValidMeasurementArray([{ value: 1, unit: 'cm' }, { value: 3, unit: 'm' }])).toEqual(true);
  })
})

describe('createAbsoluteUrl', () => {
  test('if no parameters are passed, it should return null', () => {
    expect(utils.createAbsoluteUrl()).toEqual(null)
    expect(utils.createAbsoluteUrl('')).toEqual(null)
  })

  test('if invalid parameters are passed, throw error', () => {
    expect(() => { utils.createAbsoluteUrl(1, 1) }).toThrow(Error)
    expect(() => { utils.createAbsoluteUrl({}, {}) }).toThrow(Error)
    expect(() => { utils.createAbsoluteUrl([], []) }).toThrow(Error)
  })

  test('if valid strings are passed, it should prepend the site root URL if it does not already exist in the given string', () => {
    expect(utils.createAbsoluteUrl('https://www.site.com/', '/some/directory/file.png')).toEqual('https://www.site.com/some/directory/file.png')
    expect(utils.createAbsoluteUrl('https://www.site.com/', 'some/directory/file.png')).toEqual('https://www.site.com/some/directory/file.png')
    expect(utils.createAbsoluteUrl('https://www.site.com', '/some/directory/file.png')).toEqual('https://www.site.com/some/directory/file.png')
    expect(utils.createAbsoluteUrl('https://www.site.com', 'some/directory/file.png')).toEqual('https://www.site.com/some/directory/file.png')
  })

  test('if valid strings are passed, it should not prepend the site root URL if it already exists in the given string', () => {
    expect(utils.createAbsoluteUrl('https://www.site.com/', 'https://www.site.com/some/directory/file.png')).toEqual('https://www.site.com/some/directory/file.png')
    expect(utils.createAbsoluteUrl('https://www.site.com', 'https://www.site.com/some/directory/file.png')).toEqual('https://www.site.com/some/directory/file.png')
  })
})