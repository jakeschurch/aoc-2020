import { readFile } from 'fs';
import { promisify } from 'util';

const readFileInput = promisify(readFile);

const getText = () => readFileInput('./input.txt').then(data => data.toString().split('\n'));

const getExpenses = () => getText().then((expenses) => {
  const WANTED_VAL = 2020;
  const cache = new Set();

  const cacheNum = (num: number) => {
    if (num >= WANTED_VAL) {
      return;
    }

    if (!cache.has(num)) {
      cache.add(num);
    }

    return num;
  };

  const cacheAndFindVals = expenses.map(Number)
    .sort()
    .map(cacheNum)
    .map(num => {
      const valToFind = WANTED_VAL - num;
      if (cache.has(valToFind)) {
        return valToFind * num;
      }
    })
    .filter(num => num !== undefined)[0];

  return cacheAndFindVals;
});

const getExpenses3Pair = () => getText().then((expenses) => {
  const WANTED_VAL = 2020;
  const cache: Set<number> = new Set();

  const cacheNum = (num: number) => {
    if (num >= WANTED_VAL) {
      return;
    }

    if (!cache.has(num)) {
      cache.add(num);
    }

    return num;
  };

  const sortAndCacheNums = expenses.map(Number)
    .sort()
    .map(cacheNum);

  const cacheArr = Array.from(cache);

  const findPairs = sortAndCacheNums
    .map(iNum => cacheArr.map(jNum => {
      const currentSum = iNum + jNum;
      const valToFind = WANTED_VAL - currentSum;

      if (currentSum < WANTED_VAL && cache.has(valToFind)) {
        const product = iNum * jNum * valToFind;
        return product;
      }
    }))
    .reduce((a, b) => a.concat(b), [])
    .filter(num => num !== undefined && num !== 0)[0];

  return findPairs;
});
