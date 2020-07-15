
let utils = (module.exports = {});

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

utils.convertHeight = (fromHeightObject, toUnit) => {
  return null;
}