const scraper = require("./Scraper");
const axios = require('axios');

jest.mock('axios');

describe('scrapePage', () => {
  test('Call Axios with supplied URL parameter', () => {
    scraper.scrapePage('https://...')
    expect(axios).toHaveBeenCalledWith('https://...',);
  });
});

describe('formPlayerObject', () => {
  test('supplying zero parameters', () => {
    const expectedResult = {
      team: null,
      name: null,
      position: null,
      isForwardOrBack: null,
      playerLink: null,
      image: null,
      height: null,
      weight: null,
      dob: null
    };

    expect(scraper.formPlayerObject()).toEqual(expectedResult);
    expect(scraper.formPlayerObject({})).toEqual(expectedResult);
  });

  test('supplying incorrect parameters should return null for that field', () => {
    const expectedResult = {
      team: null,
      name: null,
      position: null,
      isForwardOrBack: null,
      playerLink: null,
      image: null,
      height: null,
      weight: null,
      dob: null
    };

    expect(scraper.formPlayerObject({ team: {} })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ name: {} })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ position: {} })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ playerLink: {} })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ image: {} })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ height: {} })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ weight: {} })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ dob: {} })).toEqual(expectedResult);
    
    expect(scraper.formPlayerObject({ team: [] })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ name: [] })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ position: [] })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ playerLink: [] })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ image: [] })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ height: [] })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ weight: [] })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ dob: [] })).toEqual(expectedResult);

    expect(scraper.formPlayerObject({ team: 0 })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ name: 0 })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ position: 0 })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ playerLink: 0 })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ image: 0 })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ height: 0 })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ weight: 0 })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ dob: 0 })).toEqual(expectedResult);

    expect(scraper.formPlayerObject({ team: undefined })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ name: undefined })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ position: undefined })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ playerLink: undefined })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ image: undefined })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ height: undefined })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ weight: undefined })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ dob: undefined })).toEqual(expectedResult);

    expect(scraper.formPlayerObject({ height: [{ value: 3, unit: 'in' }, { value: 5 }] })).toEqual(expectedResult);
    expect(scraper.formPlayerObject({ weight: [{ value: 3 }] })).toEqual(expectedResult);
  });
  
  test('supplying correct object values should return that object\'s value', () => {
    expect(scraper.formPlayerObject({ team: 'Wasps' })).toMatchObject({ team: 'Wasps' });
    expect(scraper.formPlayerObject({ name: 'Joe Launchbury' })).toMatchObject({ name: 'Joe Launchbury' });
    expect(scraper.formPlayerObject({ position: 'Second Row' })).toMatchObject({ position: 'Second Row' });
    expect(scraper.formPlayerObject({ position: 'Second Row' })).toMatchObject({ isForwardOrBack: 'Forward' });
    expect(scraper.formPlayerObject({ position: 'Centre' })).toMatchObject({ isForwardOrBack: 'Back' });
    expect(scraper.formPlayerObject({ playerLink: 'https://...' })).toMatchObject({ playerLink: 'https://...' });
    expect(scraper.formPlayerObject({ image: 'https://...' })).toMatchObject({ image: 'https://...' });
    expect(scraper.formPlayerObject({ height: [{ value: 2, unit: 'ft' }, { value: 4, unit: 'in' }] })).toMatchObject({ height: [{ value: 2, unit: 'ft' }, { value: 4, unit: 'in' }] });
    expect(scraper.formPlayerObject({ weight: [{ value: 64, unit: 'kg' }] })).toMatchObject({ weight: [{ value: 64, unit: 'kg' }] });
    expect(scraper.formPlayerObject({ dob: '24th February 1993' })).toMatchObject({ dob: '24th February 1993' });
  });

  test('supplying unsupported object keys should not return in the object\'s response', () => {
    expect(scraper.formPlayerObject({ somethingUnsupported: 'SOME VALUE' })).not.toMatchObject({ somethingUnsupported: 'SOME VALUE' });
  });
})