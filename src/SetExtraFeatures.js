
'use strict';

Set.prototype.isSuperset = function (setB) {
  var self = this;
  var result = true;
  setB.forEach(function (elem) {
    if (!self.has(elem)) result = false;
  });
  return result;
}

Set.prototype.union = function (setB) {
  var resultSet = new Set(this)
  if (Array.isArray(setB)) {
    setB.forEach(function (set) {
      resultSet = resultSet.union(set);
    });
    return resultSet;
  }
  setB.forEach(function (elem) {
    resultSet.add(elem)
  });
  return resultSet;
}

Set.prototype.intersection = function (setB) {
  var self = this;
  var intersection = new Set();
  setB.forEach(function (elem) {
    if (self.has(elem)) intersection.add(elem);
  });
  return intersection;
}

Set.prototype.difference = function (setB) {
  var difference = new Set(this);
  setB.forEach(function (elem) {
    difference.delete(elem)
  });
  return difference;
}

Set.prototype.cartesianProduct = function (setB) {
  var setA = new Set(this);
  var restultSet = new Set();
  var valuesSetA = setA.values();
  if (setA.size === 0 || setB.size == 0) return resultSet;

  var times = (setA.size > setB.size) ? setA.size : setB.size;
  var p = 0;
  while (p < times) {
    var valuesSetA2 = valuesSetA.next();
    var valuesSetB = setB.values();
    var h = 0;
    while (h < times) {
      restultSet.add([valuesSetA2.value, valuesSetB.next().value]);
      h++;
    }
    p++;
  }
  return restultSet;
}

Set.prototype.toArray = function () {
  var setA = new Set(this);
  var resultArray = [];
  setA.forEach(function (elem) {
    resultArray.push(elem)
  });
  return resultArray;
}