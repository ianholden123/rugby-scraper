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

describe('convertHeight', () => {
  test('if no parametera are passed, it should return null', () => {
    expect(utils.convertHeight()).toEqual(null)
  })
})

describe('convertWeight', () => {
  test('if no parametera are passed, it should return null', () => {
    expect(utils.convertWeight()).toEqual(null)
  })
})