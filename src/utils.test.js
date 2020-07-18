const utils = require("./utils");

describe('extractHeightFromStringFromString', () => {
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

describe('convertHeight', () => {
  test('if no parametera are passed, it should return null', () => {
    expect(utils.convertHeight()).toEqual(null)
  })
})