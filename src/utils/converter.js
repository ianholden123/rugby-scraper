const utils = require('./utils');

const converter = (module.exports = {});

/**
 * Convert a measurement array to a new unit of measurement and return the new array.
 * @param {array} fromMeasurementArray A valid height measurement array.
 * @param {string} toUnit The desired unit to return the height in.
 */
converter.convertHeight = (fromMeasurementArray, toUnit) => {
  if (!utils.isValidMeasurementArray(fromMeasurementArray)) {
    throw new Error('Please supply a valid measurement array for conversion to process correctly.');
  }

  if (!toUnit || typeof toUnit !== 'string') {
    throw new Error('Please supply a valid unit type for conversion to process correctly.');
  }

  switch (toUnit.toLowerCase()) {
    case 'cm': converter.convertToCentimeters(fromMeasurementArray);
    case 'm': converter.convertToMeters(fromMeasurementArray);
    default: throw new Error('Please supply a valid unit for conversion to process correctly.');
  }
};

/**
 * Convert a measurement array to an array that is represented in centimeters
 * @param {array} measurementArray A valid measurement array.
 * @return {array} A valid measurement array.
 */
converter.convertToCentimeters = (measurementArray) => {
  if (!utils.isValidMeasurementArray(measurementArray)) {
    throw new Error('Please supply a valid measurement array for conversion to process correctly.');
  }

  measurementArray = measurementArray.map((measure) => {
    switch (measure.unit) {
      case 'cm': return measure;
      case 'm': return {value: measure.value * 100, unit: 'cm'};
      default: throw new Error('Please supply a supported unit for conversion to process correctly.');
    }
  });

  if (measurementArray.length > 1) {
    measurementArray = measurementArray.reduce((accumulatedMeasure, currentMeasure) => {
      return [{
        value: accumulatedMeasure.value + currentMeasure.value,
        unit: currentMeasure.unit,
      }];
    });
  }

  return measurementArray;
};

/**
 * Convert a height measurement array to an array that is represented in meters
 * @param {array} fromMeasurementArray A valid height measurement array.
 * @return {array} A valid measurement array.
 */
converter.convertToMeters = (fromMeasurementArray) => {
  if (!utils.isValidMeasurementArray(fromMeasurementArray)) {
    throw new Error('Please supply a valid measurement array for conversion to process correctly.');
  }

  fromMeasurementArray = fromMeasurementArray.map((measure) => {
    switch (measure.unit) {
      case 'cm': return {value: measure.value / 100, unit: 'm'};
      case 'm': return measure;
      default: throw new Error('Please supply a supported unit for conversion to process correctly.');
    }
  });

  if (fromMeasurementArray.length > 1) {
    fromMeasurementArray = fromMeasurementArray.reduce((accumulatedMeasure, currentMeasure) => {
      return [{
        value: accumulatedMeasure.value + currentMeasure.value,
        unit: currentMeasure.unit,
      }];
    });
  }

  return fromMeasurementArray;
};

/**
 * Convert a weight array to a new unit of measurement and return the new array.
 * @param {array} fromWeightArray A weight array.
 * @param {string} toUnit The desired unit to return the weight in.
 */
converter.convertWeight = (fromWeightArray, toUnit) => {
  if (!utils.isValidMeasurementArray(fromWeightArray)) {
    throw new Error('Please supply a valid measurement array for conversion to process correctly.');
  }

  /** @TODO Implement weight conversion functions */
};
