exports.getDecimal = function getDecimal(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
};
