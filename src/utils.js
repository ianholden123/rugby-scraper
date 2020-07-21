
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
 * Convert a height object to a new unit of measurement and return the new object.
 * @param {object} fromHeightObject A height object.
 * @param {string} toUnit The desired unit to return the height in.
 */
utils.convertHeight = (fromHeightObject, toUnit) => {
  return null;
}

/**
 * Convert a weight object to a new unit of measurement and return the new object.
 * @param {object} fromWeightObject A weight object.
 * @param {string} toUnit The desired unit to return the weight in.
 */
utils.convertWeight = (fromWeightObject, toUnit) => {
  return null;
}