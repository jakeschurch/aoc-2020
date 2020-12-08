"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var util_1 = require("util");
var readFileInput = util_1.promisify(fs_1.readFile);
var getText = function () { return readFileInput('./input.txt').then(function (data) { return data.toString().split('\n'); }); };
var getExpenses = function () { return getText().then(function (expenses) {
    var WANTED_VAL = 2020;
    var cache = new Set();
    var cacheNum = function (num) {
        if (num >= WANTED_VAL) {
            return;
        }
        if (!cache.has(num)) {
            cache.add(num);
        }
        return num;
    };
    var cacheAndFindVals = expenses.map(Number)
        .sort()
        .map(cacheNum)
        .map(function (num) {
        var valToFind = WANTED_VAL - num;
        if (cache.has(valToFind)) {
            return valToFind * num;
        }
    })
        .filter(function (num) { return num !== undefined; })[0];
    return cacheAndFindVals;
}); };
var getExpenses3Pair = function () { return getText().then(function (expenses) {
    var WANTED_VAL = 2020;
    var cache = new Set();
    var cacheNum = function (num) {
        if (num >= WANTED_VAL) {
            return;
        }
        if (!cache.has(num)) {
            cache.add(num);
        }
        return num;
    };
    var sortAndCacheNums = expenses.map(Number)
        .sort()
        .map(cacheNum);
    var cacheArr = Array.from(cache);
    var findPairs = sortAndCacheNums
        .map(function (iNum) { return cacheArr.map(function (jNum) {
        var currentSum = iNum + jNum;
        var valToFind = WANTED_VAL - currentSum;
        if (currentSum < WANTED_VAL && cache.has(valToFind)) {
            var product = iNum * jNum * valToFind;
            return product;
        }
    }); })
        .reduce(function (a, b) { return a.concat(b); }, [])
        .filter(function (num) { return num !== undefined && num !== 0; })[0];
    return findPairs;
}); };
