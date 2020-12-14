exports.getDecimal = function getDecimal(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
};

exports.asyncForEach = async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
}
