const converter = require("./converter");

describe('convertHeight', () => {
  test('if no parametera are passed, it should throw Error', () => {
    expect(() => { converter.convertHeight() }).toThrow(Error)
  })

  test('if the first parameter is not an array of objects, throw Error', () => {
    expect(() => { converter.convertHeight('128cm', 'm') }).toThrow(Error);
    expect(() => { converter.convertHeight(128, 'm') }).toThrow(Error);
    expect(() => { converter.convertHeight([], 'm') }).toThrow(Error);
    expect(() => { converter.convertHeight(null, 'm') }).toThrow(Error);
  })

  test('if the second parameter is invalid, throw Error', () => {
    expect(() => { converter.convertHeight([{ value: 128, unit: 'cm' }], null) }).toThrow(Error);
    expect(() => { converter.convertHeight([{ value: 128, unit: 'cm' }], 0) }).toThrow(Error);
    expect(() => { converter.convertHeight([{ value: 128, unit: 'cm' }], 'some unit that is not supported') }).toThrow(Error);
  })
})

describe('convertToCentimeters', () => {
  test('if no parameters are passed, it should throw an error', () => {
    expect(() => { converter.convertToCentimeters() }).toThrow(Error)
  })

  test('if we want to convert from Centimeters (cm) to Centimeters (cm), return the correct value', () => {
    expect(converter.convertToCentimeters([{ value: 12800, unit: 'cm' }])).toEqual([{ value: 12800, unit: 'cm' }]);
    expect(converter.convertToCentimeters([{ value: 128, unit: 'cm' }])).toEqual([{ value: 128, unit: 'cm' }]);
  })

  test('if we want to convert from Meters (m) to Centimeters (cm), the calculation should be returned correctly', () => {
    expect(converter.convertToCentimeters([{ value: 128, unit: 'm' }])).toEqual([{ value: 12800, unit: 'cm' }]);
    expect(converter.convertToCentimeters([{ value: 1.28, unit: 'm' }])).toEqual([{ value: 128, unit: 'cm' }]);
    expect(converter.convertToCentimeters([{ value: 1, unit: 'm' }, { value: 1, unit: 'm' }])).toEqual([{ value: 200, unit: 'cm' }]);
  })
})

describe('convertToMeters', () => {
  test('if no parameters are passed, it should throw an error', () => {
    expect(() => { converter.convertToMeters() }).toThrow(Error)
  })

  test('if we want to convert from Meters (m) to Meters (m), return the correct value', () => {
    expect(converter.convertToMeters([{ value: 128, unit: 'm' }])).toEqual([{ value: 128, unit: 'm' }]);
    expect(converter.convertToMeters([{ value: 1.28, unit: 'm' }])).toEqual([{ value: 1.28, unit: 'm' }]);
  })

  test('if we want to convert from Centimeters (cm) to Meters (m), the calculation should be returned correctly', () => {
    expect(converter.convertToMeters([{ value: 12800, unit: 'cm' }])).toEqual([{ value: 128, unit: 'm' }]);
    expect(converter.convertToMeters([{ value: 128, unit: 'cm' }])).toEqual([{ value: 1.28, unit: 'm' }]);
    expect(converter.convertToMeters([{ value: 100, unit: 'cm' }, { value: 100, unit: 'cm' }])).toEqual([{ value: 2, unit: 'm' }]);
  })
})

describe('convertWeight', () => {
  test('if no parameters are passed, it should throw an error', () => {
    expect(() => { converter.convertWeight() }).toThrow(Error)
  })
})