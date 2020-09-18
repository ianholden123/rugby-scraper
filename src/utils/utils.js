const converter = require('./converter');

let utils = (module.exports = {});

/**
 * Extract the height value and height unit from a string.
 * @param {string} heightString The height value and unit as a string.
 */
utils.extractHeightFromString = (heightString) => {
  if (!heightString || (typeof heightString !== 'string')) return null;
  heightString = heightString.trim();

  const regex = /([0-9]*[\.]*[0-9])+[ ]*(ft|in|cm|m|\'|")/g;
  let matches = heightString.match(regex);

  if (matches && Array.isArray(matches)) {
    matches = matches.map(match => {
      const regex2 = /([0-9]*[\.]*[0-9])+[ ]*(ft|in|cm|m|\'|")/;
      const subMatches = match.match(regex2)
      return { value: parseFloat(subMatches[1]), unit: subMatches[2] }
    })
  }

  return matches;
}

/**
 * Extract the weight value and weight unit from a string.
 * @param {string} weightString The weight value and unit as a string.
 */
utils.extractWeightFromString = (weightString) => {
  if (!weightString || (typeof weightString !== 'string')) return null;
  weightString = weightString.trim();

  const regex = /([0-9]*[\.]*[0-9])+[ ]*(kg|lb|s)/g;
  let matches = weightString.match(regex);

  if (matches && Array.isArray(matches)) {
    matches = matches.map(match => {
      const regex2 = /([0-9]*[\.]*[0-9])+[ ]*(kg|lb|s)/;
      const subMatches = match.match(regex2)
      return { value: parseFloat(subMatches[1]), unit: subMatches[2] }
    })
  }

  return matches;
}

/**
 * Test if an array is a valid measurement array.
 * @param {array} measurementArray The array to test
 */
utils.isValidMeasurementArray = (measurementArray) => {
  if (
    !measurementArray ||
    !Array.isArray(measurementArray) ||
    measurementArray.length === 0
  ) return false;

  for(const item of measurementArray) {
    if (
      typeof item !== 'object' ||
      !item.hasOwnProperty('value') ||
      typeof item.value !== 'number' ||
      !item.hasOwnProperty('unit') ||
      typeof item.unit !== 'string'
    ) return false;
  }

  return true;
}

/**
 * Create an absolute URL from a given URL string using the given site URL
 * @param {string} siteUrlToPrepend The site URL - including protocol, subdomain and domain
 * @param {string} url The remaining URL string - including entire web address, or just the directory and file
 */
utils.createAbsoluteUrl = (siteUrlToPrepend, url) => {
  if (!siteUrlToPrepend || !url) return null
  if (typeof siteUrlToPrepend !== 'string' || typeof url !== 'string')
    throw new Error('Please provide valid parameters when creating a URL.')

  if (url.includes(siteUrlToPrepend)) return url

  if (siteUrlToPrepend.substr(siteUrlToPrepend.length - 1, 1) !== '/') siteUrlToPrepend = siteUrlToPrepend + '/'
  if (url.substr(0, 1) === '/') url = url.substr(1)
  
  return siteUrlToPrepend + url
}