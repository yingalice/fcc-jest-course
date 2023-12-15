function sum(a, b) {
  return a + b;
}

function throwError(input) {
  if (typeof input !== 'number') {
    throw new Error('Invalid Input');
  }
}

function fetchDataCallback(callback) {
  setTimeout(() => {
    callback('peanut butter');
  }, 1000);
}

function fetchPromise(a, b) {
  return new Promise((resolve, reject) => {
    if(a + b === 3) {
      setTimeout(() => resolve('peanut butter'), 1000);
    } else {
      setTimeout(() => reject('oh no'), 1000);
    }
  });
}

module.exports = {
  sum,
  throwError,
  fetchDataCallback,
  fetchPromise,
};