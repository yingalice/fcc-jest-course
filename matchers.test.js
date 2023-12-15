const {sum, throwError, fetchDataCallback, fetchPromise} = require('./matchers');

test('sum function: Adds one plus two is three', () => {
  expect(sum(1, 2)).toBe(3);
})

// ========== MATCHERS ==========

// toBe - For primitives (ie. Number, String, Boolean)
test('toBe: two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

// toEqual - For objects
test('toEqual: object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
})

// toBeFalsy - For testing undefined, false, 0, blank, NaN, null
test('toBeFalsy: zero is falsy', () => {
  const n = 0;
  expect(n).toBeFalsy();
});

// toBeTruthy - For testing anything NOT falsy
test('toBeTruthy: One is truthy', () => {
  const n = 1;
  expect(n).toBeTruthy();
})

// toThrow - For errors
test('toThrow: Throws error on invalid input', () => {
  expect(() => {
    throwError('fjdska')}).toThrow('Invalid Input');
});

// ========== Asynchronous Code ==========

// Callbacks
test('Callback: Data is peanut butter', (done) => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchDataCallback(callback);
});

// Promise
test('Promise (resolves): Data is peanut butter', () => {
  return expect(fetchPromise(1, 2)).resolves.toBe('peanut butter');
});

test('Promise (rejects): Fetch fails with error', () => {
  return expect(fetchPromise(2, 3)).rejects.toMatch(/Oh no/i);
})

// Async / Await
test('Async/Await: Data is peanut butter', async () => {
  const data = await fetchPromise(1, 2);
  expect(data).toBe('peanut butter');
});

// ========== Mock Functions and Spies ==========

// Mock Functions
test('Mock: Implementation of a basic function', () => {
  const mock = jest.fn(x => 42 + x);
  expect(mock(1)).toBe(43);
  expect(mock).toHaveBeenCalledWith(1);
});

// Spy
test('Spying: On a method of a object', () => {
  const video = {
    play() {
      return true;
    },
  };
  const spy = jest.spyOn(video, 'play');
  video.play();

  expect(spy).toHaveBeenCalled();
  spy.mockRestore();
});