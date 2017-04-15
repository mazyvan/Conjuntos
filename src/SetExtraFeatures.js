
'use strict';

Set.prototype.isSuperset = function (setB) {
  let result = true;
  setB.forEach(elem => {
    if (!this.has(elem)) result = false;
  })
  return result;
}

Set.prototype.union = function (setB) {
  let resultSet = new Set(this)
  if (Array.isArray(setB)) {
    setB.forEach(set => {
      resultSet = resultSet.union(set);
    });
    return resultSet;
  }
  setB.forEach(elem => resultSet.add(elem));
  return resultSet;
}

Set.prototype.intersection = function (setB) {
  let intersection = new Set();
  setB.forEach(elem => {
    if (this.has(elem)) intersection.add(elem);
  })
  return intersection;
}

Set.prototype.difference = function (setB) {
  let difference = new Set(this);
  setB.forEach(elem => difference.delete(elem));
  return difference;
}

Set.prototype.cartesianProduct = function (setB) {
  let setA = new Set(this);
  let restultSet = new Set();
  let valuesSetA = setA.values();
  if (setA.size === 0 || setB.size == 0) return resultSet;
  
  let times = (setA.size > setB.size) ? setA.size : setB.size;
  let p = 0;
  while (p < times) {
    let valuesSetA2 = valuesSetA.next();
    let valuesSetB = setB.values();
    let h = 0;
    while (h < times) {
      restultSet.add([valuesSetA2.value, valuesSetB.next().value]);
      h++;
    }
    p++;
  }
  return restultSet;
}

Set.prototype.toArray = function () {
  let setA = new Set(this);
  let result = []
  setA.forEach(elem => result.push(elem))
  return result;
}