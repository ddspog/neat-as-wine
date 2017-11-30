/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var {
    range
} = __webpack_require__(1);

window.range = range;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(2));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a range of numbers in an array, starting at a specified number and
 * ending before a different specified number.
 * @param {number} start  Indicates what number should be used as the first
 *     number in the returned array.  If this is the only number argument
 *     supplied, this will be used as the edge and 0 will be used as the start.
 * @param {number=} edge  Indicates the first number that should not appear in
 *     the range of numbers.  If this number preceeds the start in the range
 *     (taking into account the step), an empty array will be returned.  If not
 *     specified and not inferred this defaults to 0.
 * @param {number=} step  Indicates the difference between one number and the
 *     subsequent number placed in the returned array.  If not specified this
 *     defaults to 1.
 * @return {!Array.<number>}  Array of numbers in the specified range.
 */
function range_number(start, edge, step) {
    // Create the array of numbers, stopping before the edge.
    for (var ret = []; (edge - start) * step > 0; start += step) {
        ret.push(start);
    }
    return ret;
}
/**
 * Creates a range of chars in an array, starting at a specified char and
 * ending before a different specified char.
 * @param {string} start  Indicates what char should be used as the first
 *     char in the returned array.
 * @param {string=} edge  Indicates the first char that should not appear in
 *     the range of chars. If this char preceeds the start in the range
 *     (taking into account the step), an empty array will be returned.
 * @param {number=} step  Indicates the difference between one char and the
 *     subsequent char placed in the returned array. If not specified this
 *     defaults to 1.
 * @return {!Array.<char>} Array of chars in the specified range.
 */
function range_char(start, edge, step) {
    var startN = start.charCodeAt(0);
    var edgeN = edge.charCodeAt(0);
    var rangeArr = range_number(startN, edgeN, step);
    var ret = [];
    for (var i = 0; i < rangeArr.length; i++) {
        ret.push(String.fromCharCode(rangeArr[i]));
    }
    return ret;
}
/**
 * Creates a range of numbers or chars in an array, starting at a specified value and
 * ending before a different specified value.
 * @param {any=} start  Indicates what value should be used as the first
 *     value in the returned array.
 * @param {any=} edge  Indicates the first value that should not appear in
 *     the range of value.
 * @param {number=} step  Indicates the difference between one value and the
 *     subsequent value placed in the returned array. If not specified this
 *     defaults to 1.
 * @return {!Array.<any>}  Array of values in the specified range.
 */
function range(start, edge, step) {
    // Set step default value.
    step = step || 1;
    if (typeof start === 'number' && typeof edge === 'number') {
        return range_number(start, edge, step);
    }
    else if (typeof start === 'string' && typeof edge === 'string') {
        return range_char(start, edge, step);
    }
    else {
        var ret = [];
        return ret;
    }
}
exports.range = range;


/***/ })
/******/ ]);