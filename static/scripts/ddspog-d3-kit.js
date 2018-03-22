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
    range, LayoutBox
} = __webpack_require__(1);

window.range = range;
window.LayoutBox = LayoutBox;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// index.js
var functions = __webpack_require__(2)
var elements = __webpack_require__(4)

module.exports = {
    range: functions.range,
    LayoutBox: elements.LayoutBox
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// functions/index.js
var generators = __webpack_require__(3)

module.exports = {
    range: generators.range
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// functions/generators.js

function range_number(start, edge, step) {
    // Create the array of numbers, stopping before the edge.
    for (var ret = []; (edge - start) * step > 0; start += step) {
        ret.push(start);
    }
    return ret;
}

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// elements/index.js
var layoutBox = __webpack_require__(5)

module.exports = {
    LayoutBox: layoutBox.LayoutBox
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * LayoutBox represents a layout ruled by four measures, this can
 * comprehend margins, visualizations objects, Viewbox, etc.
 */
class LayoutBox {
    /**
     * Simple constructor for LayoutBox.
     * @param {any=} measurements Dictates the four measures of the box,
     * being as a string or as an Array.
     */
    constructor(measurements) {
        if (typeof (measurements) === 'string') {
            this._values = measurements.split(" ");
            this._string = measurements;
        } else if (Array.isArray(measurements)) {
            this._values = measurements;
            this._string = measurements.join(" ");
        }
    }

    /**
     * Returns the LayoutBox measures as a string.
     */
    toString() {
        return this._string;
    }

    /**
     * Get minimum x value of box.
     */
    get minX() {
        return this._values[0];
    }

    /**
     * Set minimum x value of box.
     * @param {string=} val the minimum x value of box.
     */
    set minX(val) {
        this._values[0] = val;
    }

    /**
     * Get top measure of box.
     */
    get top() {
        return this._values[0];
    }

    /**
     * Set top measure of box.
     * @param {string=} val the top measure of box.
     */
    set top(val) {
        this._values[0] = val;
    }

    /**
     * Get minimum y value of box.
     */
    get minY() {
        return this._values[1];
    }

    /**
     * Set minimum y value of box.
     * @param {string=} val the minimum y value of box.
     */
    set minY(val) {
        this._values[1] = val;
    }

    /**
     * Get right measure of box.
     */
    get right() {
        return this._values[1];
    }

    /**
     * Set right measure of box.
     * @param {string=} val the right measure of box.
     */
    set right(val) {
        this._values[1] = val;
    }

    /**
     * Get width of box.
     */
    get width() {
        return this._values[2];
    }

    /**
     * Set width of box.
     * @param {string=} val the width of box.
     */
    set width(val) {
        this._values[2] = val;
    }

    /**
     * Get bottom measure of box.
     */
    get bottom() {
        return this._values[2];
    }

    /**
     * Set bottom measure of box.
     * @param {string=} val the bottom measure of box.
     */
    set bottom(val) {
        this._values[2] = val;
    }

    /**
     * Get height of box.
     */
    get height() {
        return this._values[3];
    }

    /**
     * Set height of box.
     * @param {string=} val the height of box.
     */
    set height(val) {
        this._values[3] = val;
    }

    /**
     * Get left measure of box.
     */
    get left() {
        return this._values[3];
    }

    /**
     * Set left measure of box.
     * @param {string=} val the left measure of box.
     */
    set left(val) {
        this._values[3] = val;
    }
}

exports.LayoutBox = LayoutBox;

/***/ })
/******/ ]);