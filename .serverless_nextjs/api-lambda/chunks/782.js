exports.id = 782;
exports.ids = [782];
exports.modules = {

/***/ 11248:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;(typeof navigator !== "undefined") && (function(root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return factory(root);
        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}((window || {}), function(window) {
	/* global locationHref:writable, animationManager, subframeEnabled:writable, defaultCurveSegments:writable, roundValues,
expressionsPlugin:writable, PropertyFactory, ShapePropertyFactory, Matrix, idPrefix:writable, _useWebWorker:writable */
/* exported locationHref, subframeEnabled, expressionsPlugin, idPrefix, _useWebWorker */

'use strict';

/* exported svgNS, locationHref, initialDefaultFrame, _useWebWorker */

var svgNS = 'http://www.w3.org/2000/svg';

var locationHref = '';

var initialDefaultFrame = -999999;

var _useWebWorker = false;

/* global createSizedArray */
/* exported subframeEnabled, expressionsPlugin, isSafari, cachedColors, bmPow, bmSqrt, bmFloor, bmMax, bmMin, ProjectInterface,
defaultCurveSegments, degToRads, roundCorner, bmRnd, styleDiv, BMEnterFrameEvent, BMCompleteEvent, BMCompleteLoopEvent,
BMSegmentStartEvent, BMDestroyEvent, BMRenderFrameErrorEvent, BMConfigErrorEvent, BMAnimationConfigErrorEvent, createElementID,
addSaturationToRGB, addBrightnessToRGB, addHueToRGB, rgbToHex */

var subframeEnabled = true;
var idPrefix = '';
var expressionsPlugin;
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var cachedColors = {};
var bmRnd;
var bmPow = Math.pow;
var bmSqrt = Math.sqrt;
var bmFloor = Math.floor;
var bmMax = Math.max;
var bmMin = Math.min;

var BMMath = {};
(function () {
  var propertyNames = ['abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'atan2', 'ceil', 'cbrt', 'expm1', 'clz32', 'cos', 'cosh', 'exp', 'floor', 'fround', 'hypot', 'imul', 'log', 'log1p', 'log2', 'log10', 'max', 'min', 'pow', 'random', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc', 'E', 'LN10', 'LN2', 'LOG10E', 'LOG2E', 'PI', 'SQRT1_2', 'SQRT2'];
  var i;
  var len = propertyNames.length;
  for (i = 0; i < len; i += 1) {
    BMMath[propertyNames[i]] = Math[propertyNames[i]];
  }
}());

function ProjectInterface() { return {}; }

BMMath.random = Math.random;
BMMath.abs = function (val) {
  var tOfVal = typeof val;
  if (tOfVal === 'object' && val.length) {
    var absArr = createSizedArray(val.length);
    var i;
    var len = val.length;
    for (i = 0; i < len; i += 1) {
      absArr[i] = Math.abs(val[i]);
    }
    return absArr;
  }
  return Math.abs(val);
};
var defaultCurveSegments = 150;
var degToRads = Math.PI / 180;
var roundCorner = 0.5519;

function roundValues(flag) {
  if (flag) {
    bmRnd = Math.round;
  } else {
    bmRnd = function (val) {
      return val;
    };
  }
}
roundValues(false);

function styleDiv(element) {
  element.style.position = 'absolute';
  element.style.top = 0;
  element.style.left = 0;
  element.style.display = 'block';
  element.style.transformOrigin = '0 0';
  element.style.webkitTransformOrigin = '0 0';
  element.style.backfaceVisibility = 'visible';
  element.style.webkitBackfaceVisibility = 'visible';
  element.style.transformStyle = 'preserve-3d';
  element.style.webkitTransformStyle = 'preserve-3d';
  element.style.mozTransformStyle = 'preserve-3d';
}

function BMEnterFrameEvent(type, currentTime, totalTime, frameMultiplier) {
  this.type = type;
  this.currentTime = currentTime;
  this.totalTime = totalTime;
  this.direction = frameMultiplier < 0 ? -1 : 1;
}

function BMCompleteEvent(type, frameMultiplier) {
  this.type = type;
  this.direction = frameMultiplier < 0 ? -1 : 1;
}

function BMCompleteLoopEvent(type, totalLoops, currentLoop, frameMultiplier) {
  this.type = type;
  this.currentLoop = currentLoop;
  this.totalLoops = totalLoops;
  this.direction = frameMultiplier < 0 ? -1 : 1;
}

function BMSegmentStartEvent(type, firstFrame, totalFrames) {
  this.type = type;
  this.firstFrame = firstFrame;
  this.totalFrames = totalFrames;
}

function BMDestroyEvent(type, target) {
  this.type = type;
  this.target = target;
}

function BMRenderFrameErrorEvent(nativeError, currentTime) {
  this.type = 'renderFrameError';
  this.nativeError = nativeError;
  this.currentTime = currentTime;
}

function BMConfigErrorEvent(nativeError) {
  this.type = 'configError';
  this.nativeError = nativeError;
}

function BMAnimationConfigErrorEvent(type, nativeError) {
  this.type = type;
  this.nativeError = nativeError;
}

var createElementID = (function () {
  var _count = 0;
  return function createID() {
    _count += 1;
    return idPrefix + '__lottie_element_' + _count;
  };
}());

function HSVtoRGB(h, s, v) {
  var r;
  var g;
  var b;
  var i;
  var f;
  var p;
  var q;
  var t;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: break;
  }
  return [r,
    g,
    b];
}

function RGBtoHSV(r, g, b) {
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var d = max - min;
  var h;
  var s = (max === 0 ? 0 : d / max);
  var v = max / 255;

  switch (max) {
    case min: h = 0; break;
    case r: h = (g - b) + d * (g < b ? 6 : 0); h /= 6 * d; break;
    case g: h = (b - r) + d * 2; h /= 6 * d; break;
    case b: h = (r - g) + d * 4; h /= 6 * d; break;
    default: break;
  }

  return [
    h,
    s,
    v,
  ];
}

function addSaturationToRGB(color, offset) {
  var hsv = RGBtoHSV(color[0] * 255, color[1] * 255, color[2] * 255);
  hsv[1] += offset;
  if (hsv[1] > 1) {
    hsv[1] = 1;
  } else if (hsv[1] <= 0) {
    hsv[1] = 0;
  }
  return HSVtoRGB(hsv[0], hsv[1], hsv[2]);
}

function addBrightnessToRGB(color, offset) {
  var hsv = RGBtoHSV(color[0] * 255, color[1] * 255, color[2] * 255);
  hsv[2] += offset;
  if (hsv[2] > 1) {
    hsv[2] = 1;
  } else if (hsv[2] < 0) {
    hsv[2] = 0;
  }
  return HSVtoRGB(hsv[0], hsv[1], hsv[2]);
}

function addHueToRGB(color, offset) {
  var hsv = RGBtoHSV(color[0] * 255, color[1] * 255, color[2] * 255);
  hsv[0] += offset / 360;
  if (hsv[0] > 1) {
    hsv[0] -= 1;
  } else if (hsv[0] < 0) {
    hsv[0] += 1;
  }
  return HSVtoRGB(hsv[0], hsv[1], hsv[2]);
}

var rgbToHex = (function () {
  var colorMap = [];
  var i;
  var hex;
  for (i = 0; i < 256; i += 1) {
    hex = i.toString(16);
    colorMap[i] = hex.length === 1 ? '0' + hex : hex;
  }

  return function (r, g, b) {
    if (r < 0) {
      r = 0;
    }
    if (g < 0) {
      g = 0;
    }
    if (b < 0) {
      b = 0;
    }
    return '#' + colorMap[r] + colorMap[g] + colorMap[b];
  };
}());

function BaseEvent() {}
BaseEvent.prototype = {
  triggerEvent: function (eventName, args) {
    if (this._cbs[eventName]) {
      var callbacks = this._cbs[eventName];
      for (var i = 0; i < callbacks.length; i += 1) {
        callbacks[i](args);
      }
    }
  },
  addEventListener: function (eventName, callback) {
    if (!this._cbs[eventName]) {
      this._cbs[eventName] = [];
    }
    this._cbs[eventName].push(callback);

    return function () {
      this.removeEventListener(eventName, callback);
    }.bind(this);
  },
  removeEventListener: function (eventName, callback) {
    if (!callback) {
      this._cbs[eventName] = null;
    } else if (this._cbs[eventName]) {
      var i = 0;
      var len = this._cbs[eventName].length;
      while (i < len) {
        if (this._cbs[eventName][i] === callback) {
          this._cbs[eventName].splice(i, 1);
          i -= 1;
          len -= 1;
        }
        i += 1;
      }
      if (!this._cbs[eventName].length) {
        this._cbs[eventName] = null;
      }
    }
  },
};

/* exported createTypedArray, createSizedArray */

var createTypedArray = (function () {
  function createRegularArray(type, len) {
    var i = 0;
    var arr = [];
    var value;
    switch (type) {
      case 'int16':
      case 'uint8c':
        value = 1;
        break;
      default:
        value = 1.1;
        break;
    }
    for (i = 0; i < len; i += 1) {
      arr.push(value);
    }
    return arr;
  }
  function createTypedArrayFactory(type, len) {
    if (type === 'float32') {
      return new Float32Array(len);
    } if (type === 'int16') {
      return new Int16Array(len);
    } if (type === 'uint8c') {
      return new Uint8ClampedArray(len);
    }
    return createRegularArray(type, len);
  }
  if (typeof Uint8ClampedArray === 'function' && typeof Float32Array === 'function') {
    return createTypedArrayFactory;
  }
  return createRegularArray;
}());

function createSizedArray(len) {
  return Array.apply(null, { length: len });
}

/* global svgNS */
/* exported createNS */

function createNS(type) {
  // return {appendChild:function(){},setAttribute:function(){},style:{}}
  return document.createElementNS(svgNS, type);
}

/* exported createTag */

function createTag(type) {
  // return {appendChild:function(){},setAttribute:function(){},style:{}}
  return document.createElement(type);
}

function DynamicPropertyContainer() {}
DynamicPropertyContainer.prototype = {
  addDynamicProperty: function (prop) {
    if (this.dynamicProperties.indexOf(prop) === -1) {
      this.dynamicProperties.push(prop);
      this.container.addDynamicProperty(this);
      this._isAnimated = true;
    }
  },
  iterateDynamicProperties: function () {
    this._mdf = false;
    var i;
    var len = this.dynamicProperties.length;
    for (i = 0; i < len; i += 1) {
      this.dynamicProperties[i].getValue();
      if (this.dynamicProperties[i]._mdf) {
        this._mdf = true;
      }
    }
  },
  initDynamicPropertyContainer: function (container) {
    this.container = container;
    this.dynamicProperties = [];
    this._mdf = false;
    this._isAnimated = false;
  },
};

/* exported getBlendMode */

var getBlendMode = (function () {
  var blendModeEnums = {
    0: 'source-over',
    1: 'multiply',
    2: 'screen',
    3: 'overlay',
    4: 'darken',
    5: 'lighten',
    6: 'color-dodge',
    7: 'color-burn',
    8: 'hard-light',
    9: 'soft-light',
    10: 'difference',
    11: 'exclusion',
    12: 'hue',
    13: 'saturation',
    14: 'color',
    15: 'luminosity',
  };

  return function (mode) {
    return blendModeEnums[mode] || '';
  };
}());

/* exported lineCapEnum, lineJoinEnum */

var lineCapEnum = {
  1: 'butt',
  2: 'round',
  3: 'square',
};

var lineJoinEnum = {
  1: 'miter',
  2: 'round',
  3: 'bevel',
};

/* global createTypedArray */

/*!
 Transformation Matrix v2.0
 (c) Epistemex 2014-2015
 www.epistemex.com
 By Ken Fyrstenberg
 Contributions by leeoniya.
 License: MIT, header required.
 */

/**
 * 2D transformation matrix object initialized with identity matrix.
 *
 * The matrix can synchronize a canvas context by supplying the context
 * as an argument, or later apply current absolute transform to an
 * existing context.
 *
 * All values are handled as floating point values.
 *
 * @param {CanvasRenderingContext2D} [context] - Optional context to sync with Matrix
 * @prop {number} a - scale x
 * @prop {number} b - shear y
 * @prop {number} c - shear x
 * @prop {number} d - scale y
 * @prop {number} e - translate x
 * @prop {number} f - translate y
 * @prop {CanvasRenderingContext2D|null} [context=null] - set or get current canvas context
 * @constructor
 */

var Matrix = (function () {
  var _cos = Math.cos;
  var _sin = Math.sin;
  var _tan = Math.tan;
  var _rnd = Math.round;

  function reset() {
    this.props[0] = 1;
    this.props[1] = 0;
    this.props[2] = 0;
    this.props[3] = 0;
    this.props[4] = 0;
    this.props[5] = 1;
    this.props[6] = 0;
    this.props[7] = 0;
    this.props[8] = 0;
    this.props[9] = 0;
    this.props[10] = 1;
    this.props[11] = 0;
    this.props[12] = 0;
    this.props[13] = 0;
    this.props[14] = 0;
    this.props[15] = 1;
    return this;
  }

  function rotate(angle) {
    if (angle === 0) {
      return this;
    }
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  function rotateX(angle) {
    if (angle === 0) {
      return this;
    }
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(1, 0, 0, 0, 0, mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1);
  }

  function rotateY(angle) {
    if (angle === 0) {
      return this;
    }
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(mCos, 0, mSin, 0, 0, 1, 0, 0, -mSin, 0, mCos, 0, 0, 0, 0, 1);
  }

  function rotateZ(angle) {
    if (angle === 0) {
      return this;
    }
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  function shear(sx, sy) {
    return this._t(1, sy, sx, 1, 0, 0);
  }

  function skew(ax, ay) {
    return this.shear(_tan(ax), _tan(ay));
  }

  function skewFromAxis(ax, angle) {
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(mCos, mSin, 0, 0, -mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
      ._t(1, 0, 0, 0, _tan(ax), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
      ._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    // return this._t(mCos, mSin, -mSin, mCos, 0, 0)._t(1, 0, _tan(ax), 1, 0, 0)._t(mCos, -mSin, mSin, mCos, 0, 0);
  }

  function scale(sx, sy, sz) {
    if (!sz && sz !== 0) {
      sz = 1;
    }
    if (sx === 1 && sy === 1 && sz === 1) {
      return this;
    }
    return this._t(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
  }

  function setTransform(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    this.props[0] = a;
    this.props[1] = b;
    this.props[2] = c;
    this.props[3] = d;
    this.props[4] = e;
    this.props[5] = f;
    this.props[6] = g;
    this.props[7] = h;
    this.props[8] = i;
    this.props[9] = j;
    this.props[10] = k;
    this.props[11] = l;
    this.props[12] = m;
    this.props[13] = n;
    this.props[14] = o;
    this.props[15] = p;
    return this;
  }

  function translate(tx, ty, tz) {
    tz = tz || 0;
    if (tx !== 0 || ty !== 0 || tz !== 0) {
      return this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1);
    }
    return this;
  }

  function transform(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
    var _p = this.props;

    if (a2 === 1 && b2 === 0 && c2 === 0 && d2 === 0 && e2 === 0 && f2 === 1 && g2 === 0 && h2 === 0 && i2 === 0 && j2 === 0 && k2 === 1 && l2 === 0) {
      // NOTE: commenting this condition because TurboFan deoptimizes code when present
      // if(m2 !== 0 || n2 !== 0 || o2 !== 0){
      _p[12] = _p[12] * a2 + _p[15] * m2;
      _p[13] = _p[13] * f2 + _p[15] * n2;
      _p[14] = _p[14] * k2 + _p[15] * o2;
      _p[15] *= p2;
      // }
      this._identityCalculated = false;
      return this;
    }

    var a1 = _p[0];
    var b1 = _p[1];
    var c1 = _p[2];
    var d1 = _p[3];
    var e1 = _p[4];
    var f1 = _p[5];
    var g1 = _p[6];
    var h1 = _p[7];
    var i1 = _p[8];
    var j1 = _p[9];
    var k1 = _p[10];
    var l1 = _p[11];
    var m1 = _p[12];
    var n1 = _p[13];
    var o1 = _p[14];
    var p1 = _p[15];

    /* matrix order (canvas compatible):
         * ace
         * bdf
         * 001
         */
    _p[0] = a1 * a2 + b1 * e2 + c1 * i2 + d1 * m2;
    _p[1] = a1 * b2 + b1 * f2 + c1 * j2 + d1 * n2;
    _p[2] = a1 * c2 + b1 * g2 + c1 * k2 + d1 * o2;
    _p[3] = a1 * d2 + b1 * h2 + c1 * l2 + d1 * p2;

    _p[4] = e1 * a2 + f1 * e2 + g1 * i2 + h1 * m2;
    _p[5] = e1 * b2 + f1 * f2 + g1 * j2 + h1 * n2;
    _p[6] = e1 * c2 + f1 * g2 + g1 * k2 + h1 * o2;
    _p[7] = e1 * d2 + f1 * h2 + g1 * l2 + h1 * p2;

    _p[8] = i1 * a2 + j1 * e2 + k1 * i2 + l1 * m2;
    _p[9] = i1 * b2 + j1 * f2 + k1 * j2 + l1 * n2;
    _p[10] = i1 * c2 + j1 * g2 + k1 * k2 + l1 * o2;
    _p[11] = i1 * d2 + j1 * h2 + k1 * l2 + l1 * p2;

    _p[12] = m1 * a2 + n1 * e2 + o1 * i2 + p1 * m2;
    _p[13] = m1 * b2 + n1 * f2 + o1 * j2 + p1 * n2;
    _p[14] = m1 * c2 + n1 * g2 + o1 * k2 + p1 * o2;
    _p[15] = m1 * d2 + n1 * h2 + o1 * l2 + p1 * p2;

    this._identityCalculated = false;
    return this;
  }

  function isIdentity() {
    if (!this._identityCalculated) {
      this._identity = !(this.props[0] !== 1 || this.props[1] !== 0 || this.props[2] !== 0 || this.props[3] !== 0 || this.props[4] !== 0 || this.props[5] !== 1 || this.props[6] !== 0 || this.props[7] !== 0 || this.props[8] !== 0 || this.props[9] !== 0 || this.props[10] !== 1 || this.props[11] !== 0 || this.props[12] !== 0 || this.props[13] !== 0 || this.props[14] !== 0 || this.props[15] !== 1);
      this._identityCalculated = true;
    }
    return this._identity;
  }

  function equals(matr) {
    var i = 0;
    while (i < 16) {
      if (matr.props[i] !== this.props[i]) {
        return false;
      }
      i += 1;
    }
    return true;
  }

  function clone(matr) {
    var i;
    for (i = 0; i < 16; i += 1) {
      matr.props[i] = this.props[i];
    }
    return matr;
  }

  function cloneFromProps(props) {
    var i;
    for (i = 0; i < 16; i += 1) {
      this.props[i] = props[i];
    }
  }

  function applyToPoint(x, y, z) {
    return {
      x: x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
      y: x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
      z: x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14],
    };
    /* return {
         x: x * me.a + y * me.c + me.e,
         y: x * me.b + y * me.d + me.f
         }; */
  }
  function applyToX(x, y, z) {
    return x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12];
  }
  function applyToY(x, y, z) {
    return x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13];
  }
  function applyToZ(x, y, z) {
    return x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14];
  }

  function getInverseMatrix() {
    var determinant = this.props[0] * this.props[5] - this.props[1] * this.props[4];
    var a = this.props[5] / determinant;
    var b = -this.props[1] / determinant;
    var c = -this.props[4] / determinant;
    var d = this.props[0] / determinant;
    var e = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / determinant;
    var f = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / determinant;
    var inverseMatrix = new Matrix();
    inverseMatrix.props[0] = a;
    inverseMatrix.props[1] = b;
    inverseMatrix.props[4] = c;
    inverseMatrix.props[5] = d;
    inverseMatrix.props[12] = e;
    inverseMatrix.props[13] = f;
    return inverseMatrix;
  }

  function inversePoint(pt) {
    var inverseMatrix = this.getInverseMatrix();
    return inverseMatrix.applyToPointArray(pt[0], pt[1], pt[2] || 0);
  }

  function inversePoints(pts) {
    var i;
    var len = pts.length;
    var retPts = [];
    for (i = 0; i < len; i += 1) {
      retPts[i] = inversePoint(pts[i]);
    }
    return retPts;
  }

  function applyToTriplePoints(pt1, pt2, pt3) {
    var arr = createTypedArray('float32', 6);
    if (this.isIdentity()) {
      arr[0] = pt1[0];
      arr[1] = pt1[1];
      arr[2] = pt2[0];
      arr[3] = pt2[1];
      arr[4] = pt3[0];
      arr[5] = pt3[1];
    } else {
      var p0 = this.props[0];
      var p1 = this.props[1];
      var p4 = this.props[4];
      var p5 = this.props[5];
      var p12 = this.props[12];
      var p13 = this.props[13];
      arr[0] = pt1[0] * p0 + pt1[1] * p4 + p12;
      arr[1] = pt1[0] * p1 + pt1[1] * p5 + p13;
      arr[2] = pt2[0] * p0 + pt2[1] * p4 + p12;
      arr[3] = pt2[0] * p1 + pt2[1] * p5 + p13;
      arr[4] = pt3[0] * p0 + pt3[1] * p4 + p12;
      arr[5] = pt3[0] * p1 + pt3[1] * p5 + p13;
    }
    return arr;
  }

  function applyToPointArray(x, y, z) {
    var arr;
    if (this.isIdentity()) {
      arr = [x, y, z];
    } else {
      arr = [
        x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
        x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
        x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14],
      ];
    }
    return arr;
  }

  function applyToPointStringified(x, y) {
    if (this.isIdentity()) {
      return x + ',' + y;
    }
    var _p = this.props;
    return Math.round((x * _p[0] + y * _p[4] + _p[12]) * 100) / 100 + ',' + Math.round((x * _p[1] + y * _p[5] + _p[13]) * 100) / 100;
  }

  function toCSS() {
    // Doesn't make much sense to add this optimization. If it is an identity matrix, it's very likely this will get called only once since it won't be keyframed.
    /* if(this.isIdentity()) {
            return '';
        } */
    var i = 0;
    var props = this.props;
    var cssValue = 'matrix3d(';
    var v = 10000;
    while (i < 16) {
      cssValue += _rnd(props[i] * v) / v;
      cssValue += i === 15 ? ')' : ',';
      i += 1;
    }
    return cssValue;
  }

  function roundMatrixProperty(val) {
    var v = 10000;
    if ((val < 0.000001 && val > 0) || (val > -0.000001 && val < 0)) {
      return _rnd(val * v) / v;
    }
    return val;
  }

  function to2dCSS() {
    // Doesn't make much sense to add this optimization. If it is an identity matrix, it's very likely this will get called only once since it won't be keyframed.
    /* if(this.isIdentity()) {
            return '';
        } */
    var props = this.props;
    var _a = roundMatrixProperty(props[0]);
    var _b = roundMatrixProperty(props[1]);
    var _c = roundMatrixProperty(props[4]);
    var _d = roundMatrixProperty(props[5]);
    var _e = roundMatrixProperty(props[12]);
    var _f = roundMatrixProperty(props[13]);
    return 'matrix(' + _a + ',' + _b + ',' + _c + ',' + _d + ',' + _e + ',' + _f + ')';
  }

  return function () {
    this.reset = reset;
    this.rotate = rotate;
    this.rotateX = rotateX;
    this.rotateY = rotateY;
    this.rotateZ = rotateZ;
    this.skew = skew;
    this.skewFromAxis = skewFromAxis;
    this.shear = shear;
    this.scale = scale;
    this.setTransform = setTransform;
    this.translate = translate;
    this.transform = transform;
    this.applyToPoint = applyToPoint;
    this.applyToX = applyToX;
    this.applyToY = applyToY;
    this.applyToZ = applyToZ;
    this.applyToPointArray = applyToPointArray;
    this.applyToTriplePoints = applyToTriplePoints;
    this.applyToPointStringified = applyToPointStringified;
    this.toCSS = toCSS;
    this.to2dCSS = to2dCSS;
    this.clone = clone;
    this.cloneFromProps = cloneFromProps;
    this.equals = equals;
    this.inversePoints = inversePoints;
    this.inversePoint = inversePoint;
    this.getInverseMatrix = getInverseMatrix;
    this._t = this.transform;
    this.isIdentity = isIdentity;
    this._identity = true;
    this._identityCalculated = false;

    this.props = createTypedArray('float32', 16);
    this.reset();
  };
}());

/* eslint-disable */
/*
 Copyright 2014 David Bau.

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//
    var global = this,
        width = 256,        // each RC4 output is 0 <= x < 256
        chunks = 6,         // at least six RC4 outputs for each double
        digits = 52,        // there are 52 significant digits in a double
        rngname = 'random', // rngname: name for Math.random and Math.seedrandom
        startdenom = math.pow(width, chunks),
        significance = math.pow(2, digits),
        overflow = significance * 2,
        mask = width - 1,
        nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
    function seedrandom(seed, options, callback) {
        var key = [];
        options = (options === true) ? { entropy: true } : (options || {});

        // Flatten the seed string or build one from local entropy if needed.
        var shortseed = mixkey(flatten(
            options.entropy ? [seed, tostring(pool)] :
                (seed === null) ? autoseed() : seed, 3), key);

        // Use the seed to initialize an ARC4 generator.
        var arc4 = new ARC4(key);

        // This function returns a random double in [0, 1) that contains
        // randomness in every bit of the mantissa of the IEEE 754 value.
        var prng = function() {
            var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
                d = startdenom,                 //   and denominator d = 2 ^ 48.
                x = 0;                          //   and no 'extra last byte'.
            while (n < significance) {          // Fill up all significant digits by
                n = (n + x) * width;              //   shifting numerator and
                d *= width;                       //   denominator and generating a
                x = arc4.g(1);                    //   new least-significant-byte.
            }
            while (n >= overflow) {             // To avoid rounding up, before adding
                n /= 2;                           //   last byte, shift everything
                d /= 2;                           //   right using integer math until
                x >>>= 1;                         //   we have exactly the desired bits.
            }
            return (n + x) / d;                 // Form the number within [0, 1).
        };

        prng.int32 = function() { return arc4.g(4) | 0; };
        prng.quick = function() { return arc4.g(4) / 0x100000000; };
        prng.double = prng;

        // Mix the randomness into accumulated entropy.
        mixkey(tostring(arc4.S), pool);

        // Calling convention: what to return as a function of prng, seed, is_math.
        return (options.pass || callback ||
        function(prng, seed, is_math_call, state) {
            if (state) {
                // Load the arc4 state from the given state if it has an S array.
                if (state.S) { copy(state, arc4); }
                // Only provide the .state method if requested via options.state.
                prng.state = function() { return copy(arc4, {}); };
            }

            // If called as a method of Math (Math.seedrandom()), mutate
            // Math.random because that is how seedrandom.js has worked since v1.0.
            if (is_math_call) { math[rngname] = prng; return seed; }

            // Otherwise, it is a newer calling convention, so return the
            // prng directly.
            else return prng;
        })(
            prng,
            shortseed,
            'global' in options ? options.global : (this == math),
            options.state);
    }
    math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
    function ARC4(key) {
        var t, keylen = key.length,
            me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

        // The empty key [] is treated as [0].
        if (!keylen) { key = [keylen++]; }

        // Set up S using the standard key scheduling algorithm.
        while (i < width) {
            s[i] = i++;
        }
        for (i = 0; i < width; i++) {
            s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
            s[j] = t;
        }

        // The "g" method returns the next (count) outputs as one number.
        me.g = function(count) {
            // Using instance members instead of closure state nearly doubles speed.
            var t, r = 0,
                i = me.i, j = me.j, s = me.S;
            while (count--) {
                t = s[i = mask & (i + 1)];
                r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
            }
            me.i = i; me.j = j;
            return r;
            // For robust unpredictability, the function call below automatically
            // discards an initial batch of values.  This is called RC4-drop[256].
            // See http://google.com/search?q=rsa+fluhrer+response&btnI
        };
    }

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
    function copy(f, t) {
        t.i = f.i;
        t.j = f.j;
        t.S = f.S.slice();
        return t;
    }

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
    function flatten(obj, depth) {
        var result = [], typ = (typeof obj), prop;
        if (depth && typ == 'object') {
            for (prop in obj) {
                try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
            }
        }
        return (result.length ? result : typ == 'string' ? obj : obj + '\0');
    }

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
    function mixkey(seed, key) {
        var stringseed = seed + '', smear, j = 0;
        while (j < stringseed.length) {
            key[mask & j] =
                mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
        }
        return tostring(key);
    }

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
    function autoseed() {
        try {
            if (nodecrypto) { return tostring(nodecrypto.randomBytes(width)); }
            var out = new Uint8Array(width);
            (global.crypto || global.msCrypto).getRandomValues(out);
            return tostring(out);
        } catch (e) {
            var browser = global.navigator,
                plugins = browser && browser.plugins;
            return [+new Date(), global, plugins, global.screen, tostring(pool)];
        }
    }

//
// tostring()
// Converts an array of charcodes to a string
//
    function tostring(a) {
        return String.fromCharCode.apply(0, a);
    }

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
    mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//

// End anonymous scope, and pass initial values.
})(
    [],     // pool: entropy pool starts empty
    BMMath    // math: package containing random, pow, and seedrandom
);
/* eslint-disable */
var BezierFactory = (function () {
  /**
     * BezierEasing - use bezier curve for transition easing function
     * by Gaëtan Renaudeau 2014 - 2015 – MIT License
     *
     * Credits: is based on Firefox's nsSMILKeySpline.cpp
     * Usage:
     * var spline = BezierEasing([ 0.25, 0.1, 0.25, 1.0 ])
     * spline.get(x) => returns the easing value | x must be in [0, 1] range
     *
     */

  var ob = {};
  ob.getBezierEasing = getBezierEasing;
  var beziers = {};

  function getBezierEasing(a, b, c, d, nm) {
    var str = nm || ('bez_' + a + '_' + b + '_' + c + '_' + d).replace(/\./g, 'p');
    if (beziers[str]) {
      return beziers[str];
    }
    var bezEasing = new BezierEasing([a, b, c, d]);
    beziers[str] = bezEasing;
    return bezEasing;
  }

  // These values are established by empiricism with tests (tradeoff: performance VS precision)
  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 0.001;
  var SUBDIVISION_PRECISION = 0.0000001;
  var SUBDIVISION_MAX_ITERATIONS = 10;

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  var float32ArraySupported = typeof Float32Array === 'function';

  function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
  function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
  function C(aA1) { return 3.0 * aA1; }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function getSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX,
      currentT,
      i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) return aGuessT;
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  /**
     * points is an array of [ mX1, mY1, mX2, mY2 ]
     */
  function BezierEasing(points) {
    this._p = points;
    this._mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    this._precomputed = false;

    this.get = this.get.bind(this);
  }

  BezierEasing.prototype = {

    get: function (x) {
      var mX1 = this._p[0],
        mY1 = this._p[1],
        mX2 = this._p[2],
        mY2 = this._p[3];
      if (!this._precomputed) this._precompute();
      if (mX1 === mY1 && mX2 === mY2) return x; // linear
      // Because JavaScript number are imprecise, we should guarantee the extremes are right.
      if (x === 0) return 0;
      if (x === 1) return 1;
      return calcBezier(this._getTForX(x), mY1, mY2);
    },

    // Private part

    _precompute: function () {
      var mX1 = this._p[0],
        mY1 = this._p[1],
        mX2 = this._p[2],
        mY2 = this._p[3];
      this._precomputed = true;
      if (mX1 !== mY1 || mX2 !== mY2) { this._calcSampleValues(); }
    },

    _calcSampleValues: function () {
      var mX1 = this._p[0],
        mX2 = this._p[2];
      for (var i = 0; i < kSplineTableSize; ++i) {
        this._mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    },

    /**
         * getTForX chose the fastest heuristic to determine the percentage value precisely from a given X projection.
         */
    _getTForX: function (aX) {
      var mX1 = this._p[0],
        mX2 = this._p[2],
        mSampleValues = this._mSampleValues;

      var intervalStart = 0.0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;

      // Interpolate to provide an initial guess for t
      var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;

      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } if (initialSlope === 0.0) {
        return guessForT;
      }
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    },
  };

  return ob;
}());

(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) { // eslint-disable-line no-plusplus
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = setTimeout(function () {
        callback(currTime + timeToCall);
      },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
}());

/* exported extendPrototype, getDescriptor, createProxyFunction */

function extendPrototype(sources, destination) {
  var i;
  var len = sources.length;
  var sourcePrototype;
  for (i = 0; i < len; i += 1) {
    sourcePrototype = sources[i].prototype;
    for (var attr in sourcePrototype) {
      if (Object.prototype.hasOwnProperty.call(sourcePrototype, attr)) destination.prototype[attr] = sourcePrototype[attr];
    }
  }
}

function getDescriptor(object, prop) {
  return Object.getOwnPropertyDescriptor(object, prop);
}

function createProxyFunction(prototype) {
  function ProxyFunction() {}
  ProxyFunction.prototype = prototype;
  return ProxyFunction;
}

/* global segmentsLengthPool, defaultCurveSegments, createSizedArray, bmPow, bmSqrt, bmFloor, createTypedArray, bezierLengthPool */
/* exported bez */

function bezFunction() {
  var math = Math;

  function pointOnLine2D(x1, y1, x2, y2, x3, y3) {
    var det1 = (x1 * y2) + (y1 * x3) + (x2 * y3) - (x3 * y2) - (y3 * x1) - (x2 * y1);
    return det1 > -0.001 && det1 < 0.001;
  }

  function pointOnLine3D(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    if (z1 === 0 && z2 === 0 && z3 === 0) {
      return pointOnLine2D(x1, y1, x2, y2, x3, y3);
    }
    var dist1 = math.sqrt(math.pow(x2 - x1, 2) + math.pow(y2 - y1, 2) + math.pow(z2 - z1, 2));
    var dist2 = math.sqrt(math.pow(x3 - x1, 2) + math.pow(y3 - y1, 2) + math.pow(z3 - z1, 2));
    var dist3 = math.sqrt(math.pow(x3 - x2, 2) + math.pow(y3 - y2, 2) + math.pow(z3 - z2, 2));
    var diffDist;
    if (dist1 > dist2) {
      if (dist1 > dist3) {
        diffDist = dist1 - dist2 - dist3;
      } else {
        diffDist = dist3 - dist2 - dist1;
      }
    } else if (dist3 > dist2) {
      diffDist = dist3 - dist2 - dist1;
    } else {
      diffDist = dist2 - dist1 - dist3;
    }
    return diffDist > -0.0001 && diffDist < 0.0001;
  }

  var getBezierLength = (function () {
    return function (pt1, pt2, pt3, pt4) {
      var curveSegments = defaultCurveSegments;
      var k;
      var i;
      var len;
      var ptCoord;
      var perc;
      var addedLength = 0;
      var ptDistance;
      var point = [];
      var lastPoint = [];
      var lengthData = bezierLengthPool.newElement();
      len = pt3.length;
      for (k = 0; k < curveSegments; k += 1) {
        perc = k / (curveSegments - 1);
        ptDistance = 0;
        for (i = 0; i < len; i += 1) {
          ptCoord = bmPow(1 - perc, 3) * pt1[i] + 3 * bmPow(1 - perc, 2) * perc * pt3[i] + 3 * (1 - perc) * bmPow(perc, 2) * pt4[i] + bmPow(perc, 3) * pt2[i];
          point[i] = ptCoord;
          if (lastPoint[i] !== null) {
            ptDistance += bmPow(point[i] - lastPoint[i], 2);
          }
          lastPoint[i] = point[i];
        }
        if (ptDistance) {
          ptDistance = bmSqrt(ptDistance);
          addedLength += ptDistance;
        }
        lengthData.percents[k] = perc;
        lengthData.lengths[k] = addedLength;
      }
      lengthData.addedLength = addedLength;
      return lengthData;
    };
  }());

  function getSegmentsLength(shapeData) {
    var segmentsLength = segmentsLengthPool.newElement();
    var closed = shapeData.c;
    var pathV = shapeData.v;
    var pathO = shapeData.o;
    var pathI = shapeData.i;
    var i;
    var len = shapeData._length;
    var lengths = segmentsLength.lengths;
    var totalLength = 0;
    for (i = 0; i < len - 1; i += 1) {
      lengths[i] = getBezierLength(pathV[i], pathV[i + 1], pathO[i], pathI[i + 1]);
      totalLength += lengths[i].addedLength;
    }
    if (closed && len) {
      lengths[i] = getBezierLength(pathV[i], pathV[0], pathO[i], pathI[0]);
      totalLength += lengths[i].addedLength;
    }
    segmentsLength.totalLength = totalLength;
    return segmentsLength;
  }

  function BezierData(length) {
    this.segmentLength = 0;
    this.points = new Array(length);
  }

  function PointData(partial, point) {
    this.partialLength = partial;
    this.point = point;
  }

  var buildBezierData = (function () {
    var storedData = {};

    return function (pt1, pt2, pt3, pt4) {
      var bezierName = (pt1[0] + '_' + pt1[1] + '_' + pt2[0] + '_' + pt2[1] + '_' + pt3[0] + '_' + pt3[1] + '_' + pt4[0] + '_' + pt4[1]).replace(/\./g, 'p');
      if (!storedData[bezierName]) {
        var curveSegments = defaultCurveSegments;
        var k;
        var i;
        var len;
        var ptCoord;
        var perc;
        var addedLength = 0;
        var ptDistance;
        var point;
        var lastPoint = null;
        if (pt1.length === 2 && (pt1[0] !== pt2[0] || pt1[1] !== pt2[1]) && pointOnLine2D(pt1[0], pt1[1], pt2[0], pt2[1], pt1[0] + pt3[0], pt1[1] + pt3[1]) && pointOnLine2D(pt1[0], pt1[1], pt2[0], pt2[1], pt2[0] + pt4[0], pt2[1] + pt4[1])) {
          curveSegments = 2;
        }
        var bezierData = new BezierData(curveSegments);
        len = pt3.length;
        for (k = 0; k < curveSegments; k += 1) {
          point = createSizedArray(len);
          perc = k / (curveSegments - 1);
          ptDistance = 0;
          for (i = 0; i < len; i += 1) {
            ptCoord = bmPow(1 - perc, 3) * pt1[i] + 3 * bmPow(1 - perc, 2) * perc * (pt1[i] + pt3[i]) + 3 * (1 - perc) * bmPow(perc, 2) * (pt2[i] + pt4[i]) + bmPow(perc, 3) * pt2[i];
            point[i] = ptCoord;
            if (lastPoint !== null) {
              ptDistance += bmPow(point[i] - lastPoint[i], 2);
            }
          }
          ptDistance = bmSqrt(ptDistance);
          addedLength += ptDistance;
          bezierData.points[k] = new PointData(ptDistance, point);
          lastPoint = point;
        }
        bezierData.segmentLength = addedLength;
        storedData[bezierName] = bezierData;
      }
      return storedData[bezierName];
    };
  }());

  function getDistancePerc(perc, bezierData) {
    var percents = bezierData.percents;
    var lengths = bezierData.lengths;
    var len = percents.length;
    var initPos = bmFloor((len - 1) * perc);
    var lengthPos = perc * bezierData.addedLength;
    var lPerc = 0;
    if (initPos === len - 1 || initPos === 0 || lengthPos === lengths[initPos]) {
      return percents[initPos];
    }
    var dir = lengths[initPos] > lengthPos ? -1 : 1;
    var flag = true;
    while (flag) {
      if (lengths[initPos] <= lengthPos && lengths[initPos + 1] > lengthPos) {
        lPerc = (lengthPos - lengths[initPos]) / (lengths[initPos + 1] - lengths[initPos]);
        flag = false;
      } else {
        initPos += dir;
      }
      if (initPos < 0 || initPos >= len - 1) {
        // FIX for TypedArrays that don't store floating point values with enough accuracy
        if (initPos === len - 1) {
          return percents[initPos];
        }
        flag = false;
      }
    }
    return percents[initPos] + (percents[initPos + 1] - percents[initPos]) * lPerc;
  }

  function getPointInSegment(pt1, pt2, pt3, pt4, percent, bezierData) {
    var t1 = getDistancePerc(percent, bezierData);
    var u1 = 1 - t1;
    var ptX = math.round((u1 * u1 * u1 * pt1[0] + (t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1) * pt3[0] + (t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1) * pt4[0] + t1 * t1 * t1 * pt2[0]) * 1000) / 1000;
    var ptY = math.round((u1 * u1 * u1 * pt1[1] + (t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1) * pt3[1] + (t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1) * pt4[1] + t1 * t1 * t1 * pt2[1]) * 1000) / 1000;
    return [ptX, ptY];
  }

  var bezierSegmentPoints = createTypedArray('float32', 8);

  function getNewSegment(pt1, pt2, pt3, pt4, startPerc, endPerc, bezierData) {
    if (startPerc < 0) {
      startPerc = 0;
    } else if (startPerc > 1) {
      startPerc = 1;
    }
    var t0 = getDistancePerc(startPerc, bezierData);
    endPerc = endPerc > 1 ? 1 : endPerc;
    var t1 = getDistancePerc(endPerc, bezierData);
    var i;
    var len = pt1.length;
    var u0 = 1 - t0;
    var u1 = 1 - t1;
    var u0u0u0 = u0 * u0 * u0;
    var t0u0u0_3 = t0 * u0 * u0 * 3; // eslint-disable-line camelcase
    var t0t0u0_3 = t0 * t0 * u0 * 3; // eslint-disable-line camelcase
    var t0t0t0 = t0 * t0 * t0;
    //
    var u0u0u1 = u0 * u0 * u1;
    var t0u0u1_3 = t0 * u0 * u1 + u0 * t0 * u1 + u0 * u0 * t1; // eslint-disable-line camelcase
    var t0t0u1_3 = t0 * t0 * u1 + u0 * t0 * t1 + t0 * u0 * t1; // eslint-disable-line camelcase
    var t0t0t1 = t0 * t0 * t1;
    //
    var u0u1u1 = u0 * u1 * u1;
    var t0u1u1_3 = t0 * u1 * u1 + u0 * t1 * u1 + u0 * u1 * t1; // eslint-disable-line camelcase
    var t0t1u1_3 = t0 * t1 * u1 + u0 * t1 * t1 + t0 * u1 * t1; // eslint-disable-line camelcase
    var t0t1t1 = t0 * t1 * t1;
    //
    var u1u1u1 = u1 * u1 * u1;
    var t1u1u1_3 = t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1; // eslint-disable-line camelcase
    var t1t1u1_3 = t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1; // eslint-disable-line camelcase
    var t1t1t1 = t1 * t1 * t1;
    for (i = 0; i < len; i += 1) {
      bezierSegmentPoints[i * 4] = math.round((u0u0u0 * pt1[i] + t0u0u0_3 * pt3[i] + t0t0u0_3 * pt4[i] + t0t0t0 * pt2[i]) * 1000) / 1000; // eslint-disable-line camelcase
      bezierSegmentPoints[i * 4 + 1] = math.round((u0u0u1 * pt1[i] + t0u0u1_3 * pt3[i] + t0t0u1_3 * pt4[i] + t0t0t1 * pt2[i]) * 1000) / 1000; // eslint-disable-line camelcase
      bezierSegmentPoints[i * 4 + 2] = math.round((u0u1u1 * pt1[i] + t0u1u1_3 * pt3[i] + t0t1u1_3 * pt4[i] + t0t1t1 * pt2[i]) * 1000) / 1000; // eslint-disable-line camelcase
      bezierSegmentPoints[i * 4 + 3] = math.round((u1u1u1 * pt1[i] + t1u1u1_3 * pt3[i] + t1t1u1_3 * pt4[i] + t1t1t1 * pt2[i]) * 1000) / 1000; // eslint-disable-line camelcase
    }

    return bezierSegmentPoints;
  }

  return {
    getSegmentsLength: getSegmentsLength,
    getNewSegment: getNewSegment,
    getPointInSegment: getPointInSegment,
    buildBezierData: buildBezierData,
    pointOnLine2D: pointOnLine2D,
    pointOnLine3D: pointOnLine3D,
  };
}

var bez = bezFunction();

/* global _useWebWorker */

var dataManager = (function () {
  var _counterId = 1;
  var processes = [];
  var workerFn;
  var workerInstance;
  var workerProxy = {
    onmessage: function () {

    },
    postMessage: function (path) {
      workerFn({
        data: path,
      });
    },
  };
  var _workerSelf = {
    postMessage: function (data) {
      workerProxy.onmessage({
        data: data,
      });
    },
  };
  function createWorker(fn) {
    if (window.Worker && window.Blob && _useWebWorker) {
      var blob = new Blob(['var _workerSelf = self; self.onmessage = ', fn.toString()], { type: 'text/javascript' });
      // var blob = new Blob(['self.onmessage = ', fn.toString()], { type: 'text/javascript' });
      var url = URL.createObjectURL(blob);
      return new Worker(url);
    }
    workerFn = fn;
    return workerProxy;
  }

  function setupWorker() {
    if (!workerInstance) {
      workerInstance = createWorker(function workerStart(e) {
        /* exported dataManager */

        function dataFunctionManager() {
          // var tCanvasHelper = createTag('canvas').getContext('2d');

          function completeLayers(layers, comps) {
            var layerData;
            var i;
            var len = layers.length;
            var j;
            var jLen;
            var k;
            var kLen;
            for (i = 0; i < len; i += 1) {
              layerData = layers[i];
              if (('ks' in layerData) && !layerData.completed) {
                layerData.completed = true;
                if (layerData.tt) {
                  layers[i - 1].td = layerData.tt;
                }
                if (layerData.hasMask) {
                  var maskProps = layerData.masksProperties;
                  jLen = maskProps.length;
                  for (j = 0; j < jLen; j += 1) {
                    if (maskProps[j].pt.k.i) {
                      convertPathsToAbsoluteValues(maskProps[j].pt.k);
                    } else {
                      kLen = maskProps[j].pt.k.length;
                      for (k = 0; k < kLen; k += 1) {
                        if (maskProps[j].pt.k[k].s) {
                          convertPathsToAbsoluteValues(maskProps[j].pt.k[k].s[0]);
                        }
                        if (maskProps[j].pt.k[k].e) {
                          convertPathsToAbsoluteValues(maskProps[j].pt.k[k].e[0]);
                        }
                      }
                    }
                  }
                }
                if (layerData.ty === 0) {
                  layerData.layers = findCompLayers(layerData.refId, comps);
                  completeLayers(layerData.layers, comps);
                } else if (layerData.ty === 4) {
                  completeShapes(layerData.shapes);
                } else if (layerData.ty === 5) {
                  completeText(layerData);
                }
              }
            }
          }

          function findCompLayers(id, comps) {
            var i = 0;
            var len = comps.length;
            while (i < len) {
              if (comps[i].id === id) {
                if (!comps[i].layers.__used) {
                  comps[i].layers.__used = true;
                  return comps[i].layers;
                }
                return JSON.parse(JSON.stringify(comps[i].layers));
              }
              i += 1;
            }
            return null;
          }

          function completeShapes(arr) {
            var i;
            var len = arr.length;
            var j;
            var jLen;
            for (i = len - 1; i >= 0; i -= 1) {
              if (arr[i].ty === 'sh') {
                if (arr[i].ks.k.i) {
                  convertPathsToAbsoluteValues(arr[i].ks.k);
                } else {
                  jLen = arr[i].ks.k.length;
                  for (j = 0; j < jLen; j += 1) {
                    if (arr[i].ks.k[j].s) {
                      convertPathsToAbsoluteValues(arr[i].ks.k[j].s[0]);
                    }
                    if (arr[i].ks.k[j].e) {
                      convertPathsToAbsoluteValues(arr[i].ks.k[j].e[0]);
                    }
                  }
                }
              } else if (arr[i].ty === 'gr') {
                completeShapes(arr[i].it);
              }
            }
          }

          function convertPathsToAbsoluteValues(path) {
            var i;
            var len = path.i.length;
            for (i = 0; i < len; i += 1) {
              path.i[i][0] += path.v[i][0];
              path.i[i][1] += path.v[i][1];
              path.o[i][0] += path.v[i][0];
              path.o[i][1] += path.v[i][1];
            }
          }

          function checkVersion(minimum, animVersionString) {
            var animVersion = animVersionString ? animVersionString.split('.') : [100, 100, 100];
            if (minimum[0] > animVersion[0]) {
              return true;
            } if (animVersion[0] > minimum[0]) {
              return false;
            }
            if (minimum[1] > animVersion[1]) {
              return true;
            } if (animVersion[1] > minimum[1]) {
              return false;
            }
            if (minimum[2] > animVersion[2]) {
              return true;
            } if (animVersion[2] > minimum[2]) {
              return false;
            }
            return null;
          }

          var checkText = (function () {
            var minimumVersion = [4, 4, 14];

            function updateTextLayer(textLayer) {
              var documentData = textLayer.t.d;
              textLayer.t.d = {
                k: [
                  {
                    s: documentData,
                    t: 0,
                  },
                ],
              };
            }

            function iterateLayers(layers) {
              var i;
              var len = layers.length;
              for (i = 0; i < len; i += 1) {
                if (layers[i].ty === 5) {
                  updateTextLayer(layers[i]);
                }
              }
            }

            return function (animationData) {
              if (checkVersion(minimumVersion, animationData.v)) {
                iterateLayers(animationData.layers);
                if (animationData.assets) {
                  var i;
                  var len = animationData.assets.length;
                  for (i = 0; i < len; i += 1) {
                    if (animationData.assets[i].layers) {
                      iterateLayers(animationData.assets[i].layers);
                    }
                  }
                }
              }
            };
          }());

          var checkChars = (function () {
            var minimumVersion = [4, 7, 99];
            return function (animationData) {
              if (animationData.chars && !checkVersion(minimumVersion, animationData.v)) {
                var i;
                var len = animationData.chars.length;
                var j;
                var jLen;
                var pathData;
                var paths;
                for (i = 0; i < len; i += 1) {
                  if (animationData.chars[i].data && animationData.chars[i].data.shapes) {
                    paths = animationData.chars[i].data.shapes[0].it;
                    jLen = paths.length;

                    for (j = 0; j < jLen; j += 1) {
                      pathData = paths[j].ks.k;
                      if (!pathData.__converted) {
                        convertPathsToAbsoluteValues(paths[j].ks.k);
                        pathData.__converted = true;
                      }
                    }
                  }
                }
              }
            };
          }());

          var checkPathProperties = (function () {
            var minimumVersion = [5, 7, 15];

            function updateTextLayer(textLayer) {
              var pathData = textLayer.t.p;
              if (typeof pathData.a === 'number') {
                pathData.a = {
                  a: 0,
                  k: pathData.a,
                };
              }
              if (typeof pathData.p === 'number') {
                pathData.p = {
                  a: 0,
                  k: pathData.p,
                };
              }
              if (typeof pathData.r === 'number') {
                pathData.r = {
                  a: 0,
                  k: pathData.r,
                };
              }
            }

            function iterateLayers(layers) {
              var i;
              var len = layers.length;
              for (i = 0; i < len; i += 1) {
                if (layers[i].ty === 5) {
                  updateTextLayer(layers[i]);
                }
              }
            }

            return function (animationData) {
              if (checkVersion(minimumVersion, animationData.v)) {
                iterateLayers(animationData.layers);
                if (animationData.assets) {
                  var i;
                  var len = animationData.assets.length;
                  for (i = 0; i < len; i += 1) {
                    if (animationData.assets[i].layers) {
                      iterateLayers(animationData.assets[i].layers);
                    }
                  }
                }
              }
            };
          }());

          var checkColors = (function () {
            var minimumVersion = [4, 1, 9];

            function iterateShapes(shapes) {
              var i;
              var len = shapes.length;
              var j;
              var jLen;
              for (i = 0; i < len; i += 1) {
                if (shapes[i].ty === 'gr') {
                  iterateShapes(shapes[i].it);
                } else if (shapes[i].ty === 'fl' || shapes[i].ty === 'st') {
                  if (shapes[i].c.k && shapes[i].c.k[0].i) {
                    jLen = shapes[i].c.k.length;
                    for (j = 0; j < jLen; j += 1) {
                      if (shapes[i].c.k[j].s) {
                        shapes[i].c.k[j].s[0] /= 255;
                        shapes[i].c.k[j].s[1] /= 255;
                        shapes[i].c.k[j].s[2] /= 255;
                        shapes[i].c.k[j].s[3] /= 255;
                      }
                      if (shapes[i].c.k[j].e) {
                        shapes[i].c.k[j].e[0] /= 255;
                        shapes[i].c.k[j].e[1] /= 255;
                        shapes[i].c.k[j].e[2] /= 255;
                        shapes[i].c.k[j].e[3] /= 255;
                      }
                    }
                  } else {
                    shapes[i].c.k[0] /= 255;
                    shapes[i].c.k[1] /= 255;
                    shapes[i].c.k[2] /= 255;
                    shapes[i].c.k[3] /= 255;
                  }
                }
              }
            }

            function iterateLayers(layers) {
              var i;
              var len = layers.length;
              for (i = 0; i < len; i += 1) {
                if (layers[i].ty === 4) {
                  iterateShapes(layers[i].shapes);
                }
              }
            }

            return function (animationData) {
              if (checkVersion(minimumVersion, animationData.v)) {
                iterateLayers(animationData.layers);
                if (animationData.assets) {
                  var i;
                  var len = animationData.assets.length;
                  for (i = 0; i < len; i += 1) {
                    if (animationData.assets[i].layers) {
                      iterateLayers(animationData.assets[i].layers);
                    }
                  }
                }
              }
            };
          }());

          var checkShapes = (function () {
            var minimumVersion = [4, 4, 18];

            function completeClosingShapes(arr) {
              var i;
              var len = arr.length;
              var j;
              var jLen;
              for (i = len - 1; i >= 0; i -= 1) {
                if (arr[i].ty === 'sh') {
                  if (arr[i].ks.k.i) {
                    arr[i].ks.k.c = arr[i].closed;
                  } else {
                    jLen = arr[i].ks.k.length;
                    for (j = 0; j < jLen; j += 1) {
                      if (arr[i].ks.k[j].s) {
                        arr[i].ks.k[j].s[0].c = arr[i].closed;
                      }
                      if (arr[i].ks.k[j].e) {
                        arr[i].ks.k[j].e[0].c = arr[i].closed;
                      }
                    }
                  }
                } else if (arr[i].ty === 'gr') {
                  completeClosingShapes(arr[i].it);
                }
              }
            }

            function iterateLayers(layers) {
              var layerData;
              var i;
              var len = layers.length;
              var j;
              var jLen;
              var k;
              var kLen;
              for (i = 0; i < len; i += 1) {
                layerData = layers[i];
                if (layerData.hasMask) {
                  var maskProps = layerData.masksProperties;
                  jLen = maskProps.length;
                  for (j = 0; j < jLen; j += 1) {
                    if (maskProps[j].pt.k.i) {
                      maskProps[j].pt.k.c = maskProps[j].cl;
                    } else {
                      kLen = maskProps[j].pt.k.length;
                      for (k = 0; k < kLen; k += 1) {
                        if (maskProps[j].pt.k[k].s) {
                          maskProps[j].pt.k[k].s[0].c = maskProps[j].cl;
                        }
                        if (maskProps[j].pt.k[k].e) {
                          maskProps[j].pt.k[k].e[0].c = maskProps[j].cl;
                        }
                      }
                    }
                  }
                }
                if (layerData.ty === 4) {
                  completeClosingShapes(layerData.shapes);
                }
              }
            }

            return function (animationData) {
              if (checkVersion(minimumVersion, animationData.v)) {
                iterateLayers(animationData.layers);
                if (animationData.assets) {
                  var i;
                  var len = animationData.assets.length;
                  for (i = 0; i < len; i += 1) {
                    if (animationData.assets[i].layers) {
                      iterateLayers(animationData.assets[i].layers);
                    }
                  }
                }
              }
            };
          }());

          function completeData(animationData) {
            if (animationData.__complete) {
              return;
            }
            checkColors(animationData);
            checkText(animationData);
            checkChars(animationData);
            checkPathProperties(animationData);
            checkShapes(animationData);
            completeLayers(animationData.layers, animationData.assets);
            animationData.__complete = true;
          }

          function completeText(data) {
            if (data.t.a.length === 0 && !('m' in data.t.p)) {
              data.singleShape = true;
            }
          }

          var moduleOb = {};
          moduleOb.completeData = completeData;
          moduleOb.checkColors = checkColors;
          moduleOb.checkChars = checkChars;
          moduleOb.checkPathProperties = checkPathProperties;
          moduleOb.checkShapes = checkShapes;
          moduleOb.completeLayers = completeLayers;

          return moduleOb;
        }
        if (!_workerSelf.dataManager) {
          _workerSelf.dataManager = dataFunctionManager();
        }

        /* exported assetLoader */
        if (!_workerSelf.assetLoader) {
          _workerSelf.assetLoader = (function () {
            function formatResponse(xhr) {
              // using typeof doubles the time of execution of this method,
              // so if available, it's better to use the header to validate the type
              var contentTypeHeader = xhr.getResponseHeader('content-type');
              if (contentTypeHeader && xhr.responseType === 'json' && contentTypeHeader.indexOf('json') !== -1) {
                return xhr.response;
              }
              if (xhr.response && typeof xhr.response === 'object') {
                return xhr.response;
              } if (xhr.response && typeof xhr.response === 'string') {
                return JSON.parse(xhr.response);
              } if (xhr.responseText) {
                return JSON.parse(xhr.responseText);
              }
              return null;
            }

            function loadAsset(path, fullPath, callback, errorCallback) {
              var response;
              var xhr = new XMLHttpRequest();
              // set responseType after calling open or IE will break.
              try {
                // This crashes on Android WebView prior to KitKat
                xhr.responseType = 'json';
              } catch (err) {} // eslint-disable-line no-empty
              xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                    response = formatResponse(xhr);
                    callback(response);
                  } else {
                    try {
                      response = formatResponse(xhr);
                      callback(response);
                    } catch (err) {
                      if (errorCallback) {
                        errorCallback(err);
                      }
                    }
                  }
                }
              };
              try {
                xhr.open('GET', path, true);
              } catch (error) {
                xhr.open('GET', fullPath + '/' + path, true);
              }
              xhr.send();
            }
            return {
              load: loadAsset,
            };
          }());
        }

        if (e.data.type === 'loadAnimation') {
          _workerSelf.assetLoader.load(
            e.data.path,
            e.data.fullPath,
            function (data) {
              _workerSelf.dataManager.completeData(data);
              _workerSelf.postMessage({
                id: e.data.id,
                payload: data,
                status: 'success',
              });
            },
            function () {
              _workerSelf.postMessage({
                id: e.data.id,
                status: 'error',
              });
            }
          );
        } else if (e.data.type === 'complete') {
          var animation = e.data.animation;
          _workerSelf.dataManager.completeData(animation);
          _workerSelf.postMessage({
            id: e.data.id,
            payload: animation,
            status: 'success',
          });
        } else if (e.data.type === 'loadData') {
          _workerSelf.assetLoader.load(
            e.data.path,
            e.data.fullPath,
            function (data) {
              _workerSelf.postMessage({
                id: e.data.id,
                payload: data,
                status: 'success',
              });
            },
            function () {
              _workerSelf.postMessage({
                id: e.data.id,
                status: 'error',
              });
            }
          );
        }
      });

      workerInstance.onmessage = function (event) {
        var data = event.data;
        var id = data.id;
        var process = processes[id];
        processes[id] = null;
        if (data.status === 'success') {
          process.onComplete(data.payload);
        } else if (process.onError) {
          process.onError();
        }
      };
    }
  }

  function createProcess(onComplete, onError) {
    _counterId += 1;
    var id = 'processId_' + _counterId;
    processes[id] = {
      onComplete: onComplete,
      onError: onError,
    };
    return id;
  }

  function loadAnimation(path, onComplete, onError) {
    setupWorker();
    var processId = createProcess(onComplete, onError);
    workerInstance.postMessage({
      type: 'loadAnimation',
      path: path,
      fullPath: window.location.origin + window.location.pathname,
      id: processId,
    });
  }

  function loadData(path, onComplete, onError) {
    setupWorker();
    var processId = createProcess(onComplete, onError);
    workerInstance.postMessage({
      type: 'loadData',
      path: path,
      fullPath: window.location.origin + window.location.pathname,
      id: processId,
    });
  }

  function completeAnimation(anim, onComplete, onError) {
    setupWorker();
    var processId = createProcess(onComplete, onError);
    workerInstance.postMessage({
      type: 'complete',
      animation: anim,
      id: processId,
    });
  }

  return {
    loadAnimation: loadAnimation,
    loadData: loadData,
    completeAnimation: completeAnimation,
  };
}());

/* exported getFontProperties */

function getFontProperties(fontData) {
  var styles = fontData.fStyle ? fontData.fStyle.split(' ') : [];

  var fWeight = 'normal'; var
    fStyle = 'normal';
  var len = styles.length;
  var styleName;
  for (var i = 0; i < len; i += 1) {
    styleName = styles[i].toLowerCase();
    switch (styleName) {
      case 'italic':
        fStyle = 'italic';
        break;
      case 'bold':
        fWeight = '700';
        break;
      case 'black':
        fWeight = '900';
        break;
      case 'medium':
        fWeight = '500';
        break;
      case 'regular':
      case 'normal':
        fWeight = '400';
        break;
      case 'light':
      case 'thin':
        fWeight = '200';
        break;
      default:
        break;
    }
  }

  return {
    style: fStyle,
    weight: fontData.fWeight || fWeight,
  };
}

/* global createNS, createTag, getFontProperties */
/* exported FontManager */

var FontManager = (function () {
  var maxWaitingTime = 5000;
  var emptyChar = {
    w: 0,
    size: 0,
    shapes: [],
  };
  var combinedCharacters = [];
  // Hindi characters
  combinedCharacters = combinedCharacters.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366,
    2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379,
    2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);

  var surrogateModifiers = [
    'd83cdffb',
    'd83cdffc',
    'd83cdffd',
    'd83cdffe',
    'd83cdfff',
  ];

  var zeroWidthJoiner = [65039, 8205];

  function trimFontOptions(font) {
    var familyArray = font.split(',');
    var i;
    var len = familyArray.length;
    var enabledFamilies = [];
    for (i = 0; i < len; i += 1) {
      if (familyArray[i] !== 'sans-serif' && familyArray[i] !== 'monospace') {
        enabledFamilies.push(familyArray[i]);
      }
    }
    return enabledFamilies.join(',');
  }

  function setUpNode(font, family) {
    var parentNode = createTag('span');
    // Node is invisible to screen readers.
    parentNode.setAttribute('aria-hidden', true);
    parentNode.style.fontFamily = family;
    var node = createTag('span');
    // Characters that vary significantly among different fonts
    node.innerText = 'giItT1WQy@!-/#';
    // Visible - so we can measure it - but not on the screen
    parentNode.style.position = 'absolute';
    parentNode.style.left = '-10000px';
    parentNode.style.top = '-10000px';
    // Large font size makes even subtle changes obvious
    parentNode.style.fontSize = '300px';
    // Reset any font properties
    parentNode.style.fontVariant = 'normal';
    parentNode.style.fontStyle = 'normal';
    parentNode.style.fontWeight = 'normal';
    parentNode.style.letterSpacing = '0';
    parentNode.appendChild(node);
    document.body.appendChild(parentNode);

    // Remember width with no applied web font
    var width = node.offsetWidth;
    node.style.fontFamily = trimFontOptions(font) + ', ' + family;
    return { node: node, w: width, parent: parentNode };
  }

  function checkLoadedFonts() {
    var i;
    var len = this.fonts.length;
    var node;
    var w;
    var loadedCount = len;
    for (i = 0; i < len; i += 1) {
      if (this.fonts[i].loaded) {
        loadedCount -= 1;
      } else if (this.fonts[i].fOrigin === 'n' || this.fonts[i].origin === 0) {
        this.fonts[i].loaded = true;
      } else {
        node = this.fonts[i].monoCase.node;
        w = this.fonts[i].monoCase.w;
        if (node.offsetWidth !== w) {
          loadedCount -= 1;
          this.fonts[i].loaded = true;
        } else {
          node = this.fonts[i].sansCase.node;
          w = this.fonts[i].sansCase.w;
          if (node.offsetWidth !== w) {
            loadedCount -= 1;
            this.fonts[i].loaded = true;
          }
        }
        if (this.fonts[i].loaded) {
          this.fonts[i].sansCase.parent.parentNode.removeChild(this.fonts[i].sansCase.parent);
          this.fonts[i].monoCase.parent.parentNode.removeChild(this.fonts[i].monoCase.parent);
        }
      }
    }

    if (loadedCount !== 0 && Date.now() - this.initTime < maxWaitingTime) {
      setTimeout(this.checkLoadedFontsBinded, 20);
    } else {
      setTimeout(this.setIsLoadedBinded, 10);
    }
  }

  function createHelper(def, fontData) {
    var tHelper = createNS('text');
    tHelper.style.fontSize = '100px';
    // tHelper.style.fontFamily = fontData.fFamily;

    var fontProps = getFontProperties(fontData);
    tHelper.setAttribute('font-family', fontData.fFamily);
    tHelper.setAttribute('font-style', fontProps.style);
    tHelper.setAttribute('font-weight', fontProps.weight);
    tHelper.textContent = '1';
    if (fontData.fClass) {
      tHelper.style.fontFamily = 'inherit';
      tHelper.setAttribute('class', fontData.fClass);
    } else {
      tHelper.style.fontFamily = fontData.fFamily;
    }
    def.appendChild(tHelper);
    var tCanvasHelper = createTag('canvas').getContext('2d');
    tCanvasHelper.font = fontData.fWeight + ' ' + fontData.fStyle + ' 100px ' + fontData.fFamily;
    // tCanvasHelper.font = ' 100px '+ fontData.fFamily;
    return tHelper;
  }

  function addFonts(fontData, defs) {
    if (!fontData) {
      this.isLoaded = true;
      return;
    }
    if (this.chars) {
      this.isLoaded = true;
      this.fonts = fontData.list;
      return;
    }

    var fontArr = fontData.list;
    var i;
    var len = fontArr.length;
    var _pendingFonts = len;
    for (i = 0; i < len; i += 1) {
      var shouldLoadFont = true;
      var loadedSelector;
      var j;
      fontArr[i].loaded = false;
      fontArr[i].monoCase = setUpNode(fontArr[i].fFamily, 'monospace');
      fontArr[i].sansCase = setUpNode(fontArr[i].fFamily, 'sans-serif');
      if (!fontArr[i].fPath) {
        fontArr[i].loaded = true;
        _pendingFonts -= 1;
      } else if (fontArr[i].fOrigin === 'p' || fontArr[i].origin === 3) {
        loadedSelector = document.querySelectorAll('style[f-forigin="p"][f-family="' + fontArr[i].fFamily + '"], style[f-origin="3"][f-family="' + fontArr[i].fFamily + '"]');

        if (loadedSelector.length > 0) {
          shouldLoadFont = false;
        }

        if (shouldLoadFont) {
          var s = createTag('style');
          s.setAttribute('f-forigin', fontArr[i].fOrigin);
          s.setAttribute('f-origin', fontArr[i].origin);
          s.setAttribute('f-family', fontArr[i].fFamily);
          s.type = 'text/css';
          s.innerText = '@font-face {font-family: ' + fontArr[i].fFamily + "; font-style: normal; src: url('" + fontArr[i].fPath + "');}";
          defs.appendChild(s);
        }
      } else if (fontArr[i].fOrigin === 'g' || fontArr[i].origin === 1) {
        loadedSelector = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]');

        for (j = 0; j < loadedSelector.length; j += 1) {
          if (loadedSelector[j].href.indexOf(fontArr[i].fPath) !== -1) {
            // Font is already loaded
            shouldLoadFont = false;
          }
        }

        if (shouldLoadFont) {
          var l = createTag('link');
          l.setAttribute('f-forigin', fontArr[i].fOrigin);
          l.setAttribute('f-origin', fontArr[i].origin);
          l.type = 'text/css';
          l.rel = 'stylesheet';
          l.href = fontArr[i].fPath;
          document.body.appendChild(l);
        }
      } else if (fontArr[i].fOrigin === 't' || fontArr[i].origin === 2) {
        loadedSelector = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]');

        for (j = 0; j < loadedSelector.length; j += 1) {
          if (fontArr[i].fPath === loadedSelector[j].src) {
            // Font is already loaded
            shouldLoadFont = false;
          }
        }

        if (shouldLoadFont) {
          var sc = createTag('link');
          sc.setAttribute('f-forigin', fontArr[i].fOrigin);
          sc.setAttribute('f-origin', fontArr[i].origin);
          sc.setAttribute('rel', 'stylesheet');
          sc.setAttribute('href', fontArr[i].fPath);
          defs.appendChild(sc);
        }
      }
      fontArr[i].helper = createHelper(defs, fontArr[i]);
      fontArr[i].cache = {};
      this.fonts.push(fontArr[i]);
    }
    if (_pendingFonts === 0) {
      this.isLoaded = true;
    } else {
      // On some cases even if the font is loaded, it won't load correctly when measuring text on canvas.
      // Adding this timeout seems to fix it
      setTimeout(this.checkLoadedFonts.bind(this), 100);
    }
  }

  function addChars(chars) {
    if (!chars) {
      return;
    }
    if (!this.chars) {
      this.chars = [];
    }
    var i;
    var len = chars.length;
    var j;
    var jLen = this.chars.length;
    var found;
    for (i = 0; i < len; i += 1) {
      j = 0;
      found = false;
      while (j < jLen) {
        if (this.chars[j].style === chars[i].style && this.chars[j].fFamily === chars[i].fFamily && this.chars[j].ch === chars[i].ch) {
          found = true;
        }
        j += 1;
      }
      if (!found) {
        this.chars.push(chars[i]);
        jLen += 1;
      }
    }
  }

  function getCharData(char, style, font) {
    var i = 0;
    var len = this.chars.length;
    while (i < len) {
      if (this.chars[i].ch === char && this.chars[i].style === style && this.chars[i].fFamily === font) {
        return this.chars[i];
      }
      i += 1;
    }
    if (((typeof char === 'string' && char.charCodeAt(0) !== 13) || !char)
            && console
            && console.warn // eslint-disable-line no-console
            && !this._warned
    ) {
      this._warned = true;
      console.warn('Missing character from exported characters list: ', char, style, font); // eslint-disable-line no-console
    }
    return emptyChar;
  }

  function measureText(char, fontName, size) {
    var fontData = this.getFontByName(fontName);
    var index = char.charCodeAt(0);
    if (!fontData.cache[index + 1]) {
      var tHelper = fontData.helper;
      // Canvas version
      // fontData.cache[index] = tHelper.measureText(char).width / 100;
      // SVG version
      // console.log(tHelper.getBBox().width)
      if (char === ' ') {
        tHelper.textContent = '|' + char + '|';
        var doubleSize = tHelper.getComputedTextLength();
        tHelper.textContent = '||';
        var singleSize = tHelper.getComputedTextLength();
        fontData.cache[index + 1] = (doubleSize - singleSize) / 100;
      } else {
        tHelper.textContent = char;
        fontData.cache[index + 1] = (tHelper.getComputedTextLength()) / 100;
      }
    }
    return fontData.cache[index + 1] * size;
  }

  function getFontByName(name) {
    var i = 0;
    var len = this.fonts.length;
    while (i < len) {
      if (this.fonts[i].fName === name) {
        return this.fonts[i];
      }
      i += 1;
    }
    return this.fonts[0];
  }

  function isModifier(firstCharCode, secondCharCode) {
    var sum = firstCharCode.toString(16) + secondCharCode.toString(16);
    return surrogateModifiers.indexOf(sum) !== -1;
  }

  function isZeroWidthJoiner(firstCharCode, secondCharCode) {
    if (!secondCharCode) {
      return firstCharCode === zeroWidthJoiner[1];
    }
    return firstCharCode === zeroWidthJoiner[0] && secondCharCode === zeroWidthJoiner[1];
  }

  function isCombinedCharacter(char) {
    return combinedCharacters.indexOf(char) !== -1;
  }

  function setIsLoaded() {
    this.isLoaded = true;
  }

  var Font = function () {
    this.fonts = [];
    this.chars = null;
    this.typekitLoaded = 0;
    this.isLoaded = false;
    this._warned = false;
    this.initTime = Date.now();
    this.setIsLoadedBinded = this.setIsLoaded.bind(this);
    this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this);
  };
  Font.isModifier = isModifier;
  Font.isZeroWidthJoiner = isZeroWidthJoiner;
  Font.isCombinedCharacter = isCombinedCharacter;

  var fontPrototype = {
    addChars: addChars,
    addFonts: addFonts,
    getCharData: getCharData,
    getFontByName: getFontByName,
    measureText: measureText,
    checkLoadedFonts: checkLoadedFonts,
    setIsLoaded: setIsLoaded,
  };

  Font.prototype = fontPrototype;

  return Font;
}());

/* global initialDefaultFrame, BezierFactory, degToRads, bez, createTypedArray */
/* exported PropertyFactory */

var PropertyFactory = (function () {
  var initFrame = initialDefaultFrame;
  var mathAbs = Math.abs;

  function interpolateValue(frameNum, caching) {
    var offsetTime = this.offsetTime;
    var newValue;
    if (this.propType === 'multidimensional') {
      newValue = createTypedArray('float32', this.pv.length);
    }
    var iterationIndex = caching.lastIndex;
    var i = iterationIndex;
    var len = this.keyframes.length - 1;
    var flag = true;
    var keyData;
    var nextKeyData;
    var keyframeMetadata;

    while (flag) {
      keyData = this.keyframes[i];
      nextKeyData = this.keyframes[i + 1];
      if (i === len - 1 && frameNum >= nextKeyData.t - offsetTime) {
        if (keyData.h) {
          keyData = nextKeyData;
        }
        iterationIndex = 0;
        break;
      }
      if ((nextKeyData.t - offsetTime) > frameNum) {
        iterationIndex = i;
        break;
      }
      if (i < len - 1) {
        i += 1;
      } else {
        iterationIndex = 0;
        flag = false;
      }
    }
    keyframeMetadata = this.keyframesMetadata[i] || {};

    var k;
    var kLen;
    var perc;
    var jLen;
    var j;
    var fnc;
    var nextKeyTime = nextKeyData.t - offsetTime;
    var keyTime = keyData.t - offsetTime;
    var endValue;
    if (keyData.to) {
      if (!keyframeMetadata.bezierData) {
        keyframeMetadata.bezierData = bez.buildBezierData(keyData.s, nextKeyData.s || keyData.e, keyData.to, keyData.ti);
      }
      var bezierData = keyframeMetadata.bezierData;
      if (frameNum >= nextKeyTime || frameNum < keyTime) {
        var ind = frameNum >= nextKeyTime ? bezierData.points.length - 1 : 0;
        kLen = bezierData.points[ind].point.length;
        for (k = 0; k < kLen; k += 1) {
          newValue[k] = bezierData.points[ind].point[k];
        }
        // caching._lastKeyframeIndex = -1;
      } else {
        if (keyframeMetadata.__fnct) {
          fnc = keyframeMetadata.__fnct;
        } else {
          fnc = BezierFactory.getBezierEasing(keyData.o.x, keyData.o.y, keyData.i.x, keyData.i.y, keyData.n).get;
          keyframeMetadata.__fnct = fnc;
        }
        perc = fnc((frameNum - keyTime) / (nextKeyTime - keyTime));
        var distanceInLine = bezierData.segmentLength * perc;

        var segmentPerc;
        var addedLength = (caching.lastFrame < frameNum && caching._lastKeyframeIndex === i) ? caching._lastAddedLength : 0;
        j = (caching.lastFrame < frameNum && caching._lastKeyframeIndex === i) ? caching._lastPoint : 0;
        flag = true;
        jLen = bezierData.points.length;
        while (flag) {
          addedLength += bezierData.points[j].partialLength;
          if (distanceInLine === 0 || perc === 0 || j === bezierData.points.length - 1) {
            kLen = bezierData.points[j].point.length;
            for (k = 0; k < kLen; k += 1) {
              newValue[k] = bezierData.points[j].point[k];
            }
            break;
          } else if (distanceInLine >= addedLength && distanceInLine < addedLength + bezierData.points[j + 1].partialLength) {
            segmentPerc = (distanceInLine - addedLength) / bezierData.points[j + 1].partialLength;
            kLen = bezierData.points[j].point.length;
            for (k = 0; k < kLen; k += 1) {
              newValue[k] = bezierData.points[j].point[k] + (bezierData.points[j + 1].point[k] - bezierData.points[j].point[k]) * segmentPerc;
            }
            break;
          }
          if (j < jLen - 1) {
            j += 1;
          } else {
            flag = false;
          }
        }
        caching._lastPoint = j;
        caching._lastAddedLength = addedLength - bezierData.points[j].partialLength;
        caching._lastKeyframeIndex = i;
      }
    } else {
      var outX;
      var outY;
      var inX;
      var inY;
      var keyValue;
      len = keyData.s.length;
      endValue = nextKeyData.s || keyData.e;
      if (this.sh && keyData.h !== 1) {
        if (frameNum >= nextKeyTime) {
          newValue[0] = endValue[0];
          newValue[1] = endValue[1];
          newValue[2] = endValue[2];
        } else if (frameNum <= keyTime) {
          newValue[0] = keyData.s[0];
          newValue[1] = keyData.s[1];
          newValue[2] = keyData.s[2];
        } else {
          var quatStart = createQuaternion(keyData.s);
          var quatEnd = createQuaternion(endValue);
          var time = (frameNum - keyTime) / (nextKeyTime - keyTime);
          quaternionToEuler(newValue, slerp(quatStart, quatEnd, time));
        }
      } else {
        for (i = 0; i < len; i += 1) {
          if (keyData.h !== 1) {
            if (frameNum >= nextKeyTime) {
              perc = 1;
            } else if (frameNum < keyTime) {
              perc = 0;
            } else {
              if (keyData.o.x.constructor === Array) {
                if (!keyframeMetadata.__fnct) {
                  keyframeMetadata.__fnct = [];
                }
                if (!keyframeMetadata.__fnct[i]) {
                  outX = keyData.o.x[i] === undefined ? keyData.o.x[0] : keyData.o.x[i];
                  outY = keyData.o.y[i] === undefined ? keyData.o.y[0] : keyData.o.y[i];
                  inX = keyData.i.x[i] === undefined ? keyData.i.x[0] : keyData.i.x[i];
                  inY = keyData.i.y[i] === undefined ? keyData.i.y[0] : keyData.i.y[i];
                  fnc = BezierFactory.getBezierEasing(outX, outY, inX, inY).get;
                  keyframeMetadata.__fnct[i] = fnc;
                } else {
                  fnc = keyframeMetadata.__fnct[i];
                }
              } else if (!keyframeMetadata.__fnct) {
                outX = keyData.o.x;
                outY = keyData.o.y;
                inX = keyData.i.x;
                inY = keyData.i.y;
                fnc = BezierFactory.getBezierEasing(outX, outY, inX, inY).get;
                keyData.keyframeMetadata = fnc;
              } else {
                fnc = keyframeMetadata.__fnct;
              }
              perc = fnc((frameNum - keyTime) / (nextKeyTime - keyTime));
            }
          }

          endValue = nextKeyData.s || keyData.e;
          keyValue = keyData.h === 1 ? keyData.s[i] : keyData.s[i] + (endValue[i] - keyData.s[i]) * perc;

          if (this.propType === 'multidimensional') {
            newValue[i] = keyValue;
          } else {
            newValue = keyValue;
          }
        }
      }
    }
    caching.lastIndex = iterationIndex;
    return newValue;
  }

  // based on @Toji's https://github.com/toji/gl-matrix/
  function slerp(a, b, t) {
    var out = [];
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    var aw = a[3];
    var bx = b[0];
    var by = b[1];
    var bz = b[2];
    var bw = b[3];

    var omega;
    var cosom;
    var sinom;
    var scale0;
    var scale1;

    cosom = ax * bx + ay * by + az * bz + aw * bw;
    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    if ((1.0 - cosom) > 0.000001) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      scale0 = 1.0 - t;
      scale1 = t;
    }
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
  }

  function quaternionToEuler(out, quat) {
    var qx = quat[0];
    var qy = quat[1];
    var qz = quat[2];
    var qw = quat[3];
    var heading = Math.atan2(2 * qy * qw - 2 * qx * qz, 1 - 2 * qy * qy - 2 * qz * qz);
    var attitude = Math.asin(2 * qx * qy + 2 * qz * qw);
    var bank = Math.atan2(2 * qx * qw - 2 * qy * qz, 1 - 2 * qx * qx - 2 * qz * qz);
    out[0] = heading / degToRads;
    out[1] = attitude / degToRads;
    out[2] = bank / degToRads;
  }

  function createQuaternion(values) {
    var heading = values[0] * degToRads;
    var attitude = values[1] * degToRads;
    var bank = values[2] * degToRads;
    var c1 = Math.cos(heading / 2);
    var c2 = Math.cos(attitude / 2);
    var c3 = Math.cos(bank / 2);
    var s1 = Math.sin(heading / 2);
    var s2 = Math.sin(attitude / 2);
    var s3 = Math.sin(bank / 2);
    var w = c1 * c2 * c3 - s1 * s2 * s3;
    var x = s1 * s2 * c3 + c1 * c2 * s3;
    var y = s1 * c2 * c3 + c1 * s2 * s3;
    var z = c1 * s2 * c3 - s1 * c2 * s3;

    return [x, y, z, w];
  }

  function getValueAtCurrentTime() {
    var frameNum = this.comp.renderedFrame - this.offsetTime;
    var initTime = this.keyframes[0].t - this.offsetTime;
    var endTime = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
    if (!(frameNum === this._caching.lastFrame || (this._caching.lastFrame !== initFrame && ((this._caching.lastFrame >= endTime && frameNum >= endTime) || (this._caching.lastFrame < initTime && frameNum < initTime))))) {
      if (this._caching.lastFrame >= frameNum) {
        this._caching._lastKeyframeIndex = -1;
        this._caching.lastIndex = 0;
      }

      var renderResult = this.interpolateValue(frameNum, this._caching);
      this.pv = renderResult;
    }
    this._caching.lastFrame = frameNum;
    return this.pv;
  }

  function setVValue(val) {
    var multipliedValue;
    if (this.propType === 'unidimensional') {
      multipliedValue = val * this.mult;
      if (mathAbs(this.v - multipliedValue) > 0.00001) {
        this.v = multipliedValue;
        this._mdf = true;
      }
    } else {
      var i = 0;
      var len = this.v.length;
      while (i < len) {
        multipliedValue = val[i] * this.mult;
        if (mathAbs(this.v[i] - multipliedValue) > 0.00001) {
          this.v[i] = multipliedValue;
          this._mdf = true;
        }
        i += 1;
      }
    }
  }

  function processEffectsSequence() {
    if (this.elem.globalData.frameId === this.frameId || !this.effectsSequence.length) {
      return;
    }
    if (this.lock) {
      this.setVValue(this.pv);
      return;
    }
    this.lock = true;
    this._mdf = this._isFirstFrame;
    var i;
    var len = this.effectsSequence.length;
    var finalValue = this.kf ? this.pv : this.data.k;
    for (i = 0; i < len; i += 1) {
      finalValue = this.effectsSequence[i](finalValue);
    }
    this.setVValue(finalValue);
    this._isFirstFrame = false;
    this.lock = false;
    this.frameId = this.elem.globalData.frameId;
  }

  function addEffect(effectFunction) {
    this.effectsSequence.push(effectFunction);
    this.container.addDynamicProperty(this);
  }

  function ValueProperty(elem, data, mult, container) {
    this.propType = 'unidimensional';
    this.mult = mult || 1;
    this.data = data;
    this.v = mult ? data.k * mult : data.k;
    this.pv = data.k;
    this._mdf = false;
    this.elem = elem;
    this.container = container;
    this.comp = elem.comp;
    this.k = false;
    this.kf = false;
    this.vel = 0;
    this.effectsSequence = [];
    this._isFirstFrame = true;
    this.getValue = processEffectsSequence;
    this.setVValue = setVValue;
    this.addEffect = addEffect;
  }

  function MultiDimensionalProperty(elem, data, mult, container) {
    this.propType = 'multidimensional';
    this.mult = mult || 1;
    this.data = data;
    this._mdf = false;
    this.elem = elem;
    this.container = container;
    this.comp = elem.comp;
    this.k = false;
    this.kf = false;
    this.frameId = -1;
    var i;
    var len = data.k.length;
    this.v = createTypedArray('float32', len);
    this.pv = createTypedArray('float32', len);
    this.vel = createTypedArray('float32', len);
    for (i = 0; i < len; i += 1) {
      this.v[i] = data.k[i] * this.mult;
      this.pv[i] = data.k[i];
    }
    this._isFirstFrame = true;
    this.effectsSequence = [];
    this.getValue = processEffectsSequence;
    this.setVValue = setVValue;
    this.addEffect = addEffect;
  }

  function KeyframedValueProperty(elem, data, mult, container) {
    this.propType = 'unidimensional';
    this.keyframes = data.k;
    this.keyframesMetadata = [];
    this.offsetTime = elem.data.st;
    this.frameId = -1;
    this._caching = {
      lastFrame: initFrame, lastIndex: 0, value: 0, _lastKeyframeIndex: -1,
    };
    this.k = true;
    this.kf = true;
    this.data = data;
    this.mult = mult || 1;
    this.elem = elem;
    this.container = container;
    this.comp = elem.comp;
    this.v = initFrame;
    this.pv = initFrame;
    this._isFirstFrame = true;
    this.getValue = processEffectsSequence;
    this.setVValue = setVValue;
    this.interpolateValue = interpolateValue;
    this.effectsSequence = [getValueAtCurrentTime.bind(this)];
    this.addEffect = addEffect;
  }

  function KeyframedMultidimensionalProperty(elem, data, mult, container) {
    this.propType = 'multidimensional';
    var i;
    var len = data.k.length;
    var s;
    var e;
    var to;
    var ti;
    for (i = 0; i < len - 1; i += 1) {
      if (data.k[i].to && data.k[i].s && data.k[i + 1] && data.k[i + 1].s) {
        s = data.k[i].s;
        e = data.k[i + 1].s;
        to = data.k[i].to;
        ti = data.k[i].ti;
        if ((s.length === 2 && !(s[0] === e[0] && s[1] === e[1]) && bez.pointOnLine2D(s[0], s[1], e[0], e[1], s[0] + to[0], s[1] + to[1]) && bez.pointOnLine2D(s[0], s[1], e[0], e[1], e[0] + ti[0], e[1] + ti[1])) || (s.length === 3 && !(s[0] === e[0] && s[1] === e[1] && s[2] === e[2]) && bez.pointOnLine3D(s[0], s[1], s[2], e[0], e[1], e[2], s[0] + to[0], s[1] + to[1], s[2] + to[2]) && bez.pointOnLine3D(s[0], s[1], s[2], e[0], e[1], e[2], e[0] + ti[0], e[1] + ti[1], e[2] + ti[2]))) {
          data.k[i].to = null;
          data.k[i].ti = null;
        }
        if (s[0] === e[0] && s[1] === e[1] && to[0] === 0 && to[1] === 0 && ti[0] === 0 && ti[1] === 0) {
          if (s.length === 2 || (s[2] === e[2] && to[2] === 0 && ti[2] === 0)) {
            data.k[i].to = null;
            data.k[i].ti = null;
          }
        }
      }
    }
    this.effectsSequence = [getValueAtCurrentTime.bind(this)];
    this.data = data;
    this.keyframes = data.k;
    this.keyframesMetadata = [];
    this.offsetTime = elem.data.st;
    this.k = true;
    this.kf = true;
    this._isFirstFrame = true;
    this.mult = mult || 1;
    this.elem = elem;
    this.container = container;
    this.comp = elem.comp;
    this.getValue = processEffectsSequence;
    this.setVValue = setVValue;
    this.interpolateValue = interpolateValue;
    this.frameId = -1;
    var arrLen = data.k[0].s.length;
    this.v = createTypedArray('float32', arrLen);
    this.pv = createTypedArray('float32', arrLen);
    for (i = 0; i < arrLen; i += 1) {
      this.v[i] = initFrame;
      this.pv[i] = initFrame;
    }
    this._caching = { lastFrame: initFrame, lastIndex: 0, value: createTypedArray('float32', arrLen) };
    this.addEffect = addEffect;
  }

  function getProp(elem, data, type, mult, container) {
    var p;
    if (!data.k.length) {
      p = new ValueProperty(elem, data, mult, container);
    } else if (typeof (data.k[0]) === 'number') {
      p = new MultiDimensionalProperty(elem, data, mult, container);
    } else {
      switch (type) {
        case 0:
          p = new KeyframedValueProperty(elem, data, mult, container);
          break;
        case 1:
          p = new KeyframedMultidimensionalProperty(elem, data, mult, container);
          break;
        default:
          break;
      }
    }
    if (p.effectsSequence.length) {
      container.addDynamicProperty(p);
    }
    return p;
  }

  var ob = {
    getProp: getProp,
  };
  return ob;
}());

/* global Matrix, degToRads, PropertyFactory, extendPrototype, DynamicPropertyContainer */
/* exported TransformPropertyFactory */

var TransformPropertyFactory = (function () {
  var defaultVector = [0, 0];

  function applyToMatrix(mat) {
    var _mdf = this._mdf;
    this.iterateDynamicProperties();
    this._mdf = this._mdf || _mdf;
    if (this.a) {
      mat.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]);
    }
    if (this.s) {
      mat.scale(this.s.v[0], this.s.v[1], this.s.v[2]);
    }
    if (this.sk) {
      mat.skewFromAxis(-this.sk.v, this.sa.v);
    }
    if (this.r) {
      mat.rotate(-this.r.v);
    } else {
      mat.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2])
        .rotateY(this.or.v[1])
        .rotateX(this.or.v[0]);
    }
    if (this.data.p.s) {
      if (this.data.p.z) {
        mat.translate(this.px.v, this.py.v, -this.pz.v);
      } else {
        mat.translate(this.px.v, this.py.v, 0);
      }
    } else {
      mat.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
    }
  }
  function processKeys(forceRender) {
    if (this.elem.globalData.frameId === this.frameId) {
      return;
    }
    if (this._isDirty) {
      this.precalculateMatrix();
      this._isDirty = false;
    }

    this.iterateDynamicProperties();

    if (this._mdf || forceRender) {
      var frameRate;
      this.v.cloneFromProps(this.pre.props);
      if (this.appliedTransformations < 1) {
        this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]);
      }
      if (this.appliedTransformations < 2) {
        this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]);
      }
      if (this.sk && this.appliedTransformations < 3) {
        this.v.skewFromAxis(-this.sk.v, this.sa.v);
      }
      if (this.r && this.appliedTransformations < 4) {
        this.v.rotate(-this.r.v);
      } else if (!this.r && this.appliedTransformations < 4) {
        this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2])
          .rotateY(this.or.v[1])
          .rotateX(this.or.v[0]);
      }
      if (this.autoOriented) {
        var v1;
        var v2;
        frameRate = this.elem.globalData.frameRate;
        if (this.p && this.p.keyframes && this.p.getValueAtTime) {
          if (this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t) {
            v1 = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / frameRate, 0);
            v2 = this.p.getValueAtTime(this.p.keyframes[0].t / frameRate, 0);
          } else if (this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t) {
            v1 = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t / frameRate), 0);
            v2 = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - 0.05) / frameRate, 0);
          } else {
            v1 = this.p.pv;
            v2 = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - 0.01) / frameRate, this.p.offsetTime);
          }
        } else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
          v1 = [];
          v2 = [];
          var px = this.px;
          var py = this.py;
          if (px._caching.lastFrame + px.offsetTime <= px.keyframes[0].t) {
            v1[0] = px.getValueAtTime((px.keyframes[0].t + 0.01) / frameRate, 0);
            v1[1] = py.getValueAtTime((py.keyframes[0].t + 0.01) / frameRate, 0);
            v2[0] = px.getValueAtTime((px.keyframes[0].t) / frameRate, 0);
            v2[1] = py.getValueAtTime((py.keyframes[0].t) / frameRate, 0);
          } else if (px._caching.lastFrame + px.offsetTime >= px.keyframes[px.keyframes.length - 1].t) {
            v1[0] = px.getValueAtTime((px.keyframes[px.keyframes.length - 1].t / frameRate), 0);
            v1[1] = py.getValueAtTime((py.keyframes[py.keyframes.length - 1].t / frameRate), 0);
            v2[0] = px.getValueAtTime((px.keyframes[px.keyframes.length - 1].t - 0.01) / frameRate, 0);
            v2[1] = py.getValueAtTime((py.keyframes[py.keyframes.length - 1].t - 0.01) / frameRate, 0);
          } else {
            v1 = [px.pv, py.pv];
            v2[0] = px.getValueAtTime((px._caching.lastFrame + px.offsetTime - 0.01) / frameRate, px.offsetTime);
            v2[1] = py.getValueAtTime((py._caching.lastFrame + py.offsetTime - 0.01) / frameRate, py.offsetTime);
          }
        } else {
          v2 = defaultVector;
          v1 = v2;
        }
        this.v.rotate(-Math.atan2(v1[1] - v2[1], v1[0] - v2[0]));
      }
      if (this.data.p && this.data.p.s) {
        if (this.data.p.z) {
          this.v.translate(this.px.v, this.py.v, -this.pz.v);
        } else {
          this.v.translate(this.px.v, this.py.v, 0);
        }
      } else {
        this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
      }
    }
    this.frameId = this.elem.globalData.frameId;
  }

  function precalculateMatrix() {
    if (!this.a.k) {
      this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]);
      this.appliedTransformations = 1;
    } else {
      return;
    }
    if (!this.s.effectsSequence.length) {
      this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]);
      this.appliedTransformations = 2;
    } else {
      return;
    }
    if (this.sk) {
      if (!this.sk.effectsSequence.length && !this.sa.effectsSequence.length) {
        this.pre.skewFromAxis(-this.sk.v, this.sa.v);
        this.appliedTransformations = 3;
      } else {
        return;
      }
    }
    if (this.r) {
      if (!this.r.effectsSequence.length) {
        this.pre.rotate(-this.r.v);
        this.appliedTransformations = 4;
      }
    } else if (!this.rz.effectsSequence.length && !this.ry.effectsSequence.length && !this.rx.effectsSequence.length && !this.or.effectsSequence.length) {
      this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2])
        .rotateY(this.or.v[1])
        .rotateX(this.or.v[0]);
      this.appliedTransformations = 4;
    }
  }

  function autoOrient() {
    //
    // var prevP = this.getValueAtTime();
  }

  function addDynamicProperty(prop) {
    this._addDynamicProperty(prop);
    this.elem.addDynamicProperty(prop);
    this._isDirty = true;
  }

  function TransformProperty(elem, data, container) {
    this.elem = elem;
    this.frameId = -1;
    this.propType = 'transform';
    this.data = data;
    this.v = new Matrix();
    // Precalculated matrix with non animated properties
    this.pre = new Matrix();
    this.appliedTransformations = 0;
    this.initDynamicPropertyContainer(container || elem);
    if (data.p && data.p.s) {
      this.px = PropertyFactory.getProp(elem, data.p.x, 0, 0, this);
      this.py = PropertyFactory.getProp(elem, data.p.y, 0, 0, this);
      if (data.p.z) {
        this.pz = PropertyFactory.getProp(elem, data.p.z, 0, 0, this);
      }
    } else {
      this.p = PropertyFactory.getProp(elem, data.p || { k: [0, 0, 0] }, 1, 0, this);
    }
    if (data.rx) {
      this.rx = PropertyFactory.getProp(elem, data.rx, 0, degToRads, this);
      this.ry = PropertyFactory.getProp(elem, data.ry, 0, degToRads, this);
      this.rz = PropertyFactory.getProp(elem, data.rz, 0, degToRads, this);
      if (data.or.k[0].ti) {
        var i;
        var len = data.or.k.length;
        for (i = 0; i < len; i += 1) {
          data.or.k[i].to = null;
          data.or.k[i].ti = null;
        }
      }
      this.or = PropertyFactory.getProp(elem, data.or, 1, degToRads, this);
      // sh Indicates it needs to be capped between -180 and 180
      this.or.sh = true;
    } else {
      this.r = PropertyFactory.getProp(elem, data.r || { k: 0 }, 0, degToRads, this);
    }
    if (data.sk) {
      this.sk = PropertyFactory.getProp(elem, data.sk, 0, degToRads, this);
      this.sa = PropertyFactory.getProp(elem, data.sa, 0, degToRads, this);
    }
    this.a = PropertyFactory.getProp(elem, data.a || { k: [0, 0, 0] }, 1, 0, this);
    this.s = PropertyFactory.getProp(elem, data.s || { k: [100, 100, 100] }, 1, 0.01, this);
    // Opacity is not part of the transform properties, that's why it won't use this.dynamicProperties. That way transforms won't get updated if opacity changes.
    if (data.o) {
      this.o = PropertyFactory.getProp(elem, data.o, 0, 0.01, elem);
    } else {
      this.o = { _mdf: false, v: 1 };
    }
    this._isDirty = true;
    if (!this.dynamicProperties.length) {
      this.getValue(true);
    }
  }

  TransformProperty.prototype = {
    applyToMatrix: applyToMatrix,
    getValue: processKeys,
    precalculateMatrix: precalculateMatrix,
    autoOrient: autoOrient,
  };

  extendPrototype([DynamicPropertyContainer], TransformProperty);
  TransformProperty.prototype.addDynamicProperty = addDynamicProperty;
  TransformProperty.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty;

  function getTransformProperty(elem, data, container) {
    return new TransformProperty(elem, data, container);
  }

  return {
    getTransformProperty: getTransformProperty,
  };
}());

/* global createSizedArray, createSizedArray, pointPool */

function ShapePath() {
  this.c = false;
  this._length = 0;
  this._maxLength = 8;
  this.v = createSizedArray(this._maxLength);
  this.o = createSizedArray(this._maxLength);
  this.i = createSizedArray(this._maxLength);
}

ShapePath.prototype.setPathData = function (closed, len) {
  this.c = closed;
  this.setLength(len);
  var i = 0;
  while (i < len) {
    this.v[i] = pointPool.newElement();
    this.o[i] = pointPool.newElement();
    this.i[i] = pointPool.newElement();
    i += 1;
  }
};

ShapePath.prototype.setLength = function (len) {
  while (this._maxLength < len) {
    this.doubleArrayLength();
  }
  this._length = len;
};

ShapePath.prototype.doubleArrayLength = function () {
  this.v = this.v.concat(createSizedArray(this._maxLength));
  this.i = this.i.concat(createSizedArray(this._maxLength));
  this.o = this.o.concat(createSizedArray(this._maxLength));
  this._maxLength *= 2;
};

ShapePath.prototype.setXYAt = function (x, y, type, pos, replace) {
  var arr;
  this._length = Math.max(this._length, pos + 1);
  if (this._length >= this._maxLength) {
    this.doubleArrayLength();
  }
  switch (type) {
    case 'v':
      arr = this.v;
      break;
    case 'i':
      arr = this.i;
      break;
    case 'o':
      arr = this.o;
      break;
    default:
      arr = [];
      break;
  }
  if (!arr[pos] || (arr[pos] && !replace)) {
    arr[pos] = pointPool.newElement();
  }
  arr[pos][0] = x;
  arr[pos][1] = y;
};

ShapePath.prototype.setTripleAt = function (vX, vY, oX, oY, iX, iY, pos, replace) {
  this.setXYAt(vX, vY, 'v', pos, replace);
  this.setXYAt(oX, oY, 'o', pos, replace);
  this.setXYAt(iX, iY, 'i', pos, replace);
};

ShapePath.prototype.reverse = function () {
  var newPath = new ShapePath();
  newPath.setPathData(this.c, this._length);
  var vertices = this.v;
  var outPoints = this.o;
  var inPoints = this.i;
  var init = 0;
  if (this.c) {
    newPath.setTripleAt(vertices[0][0], vertices[0][1], inPoints[0][0], inPoints[0][1], outPoints[0][0], outPoints[0][1], 0, false);
    init = 1;
  }
  var cnt = this._length - 1;
  var len = this._length;

  var i;
  for (i = init; i < len; i += 1) {
    newPath.setTripleAt(vertices[cnt][0], vertices[cnt][1], inPoints[cnt][0], inPoints[cnt][1], outPoints[cnt][0], outPoints[cnt][1], i, false);
    cnt -= 1;
  }
  return newPath;
};

/* global extendPrototype, roundCorner, BezierFactory, shapePool, degToRads,
  shapeCollectionPool, PropertyFactory, bmMin, DynamicPropertyContainer */
/* exported ShapePropertyFactory */

var ShapePropertyFactory = (function () {
  var initFrame = -999999;

  function interpolateShape(frameNum, previousValue, caching) {
    var iterationIndex = caching.lastIndex;
    var keyPropS;
    var keyPropE;
    var isHold;
    var j;
    var k;
    var jLen;
    var kLen;
    var perc;
    var vertexValue;
    var kf = this.keyframes;
    if (frameNum < kf[0].t - this.offsetTime) {
      keyPropS = kf[0].s[0];
      isHold = true;
      iterationIndex = 0;
    } else if (frameNum >= kf[kf.length - 1].t - this.offsetTime) {
      keyPropS = kf[kf.length - 1].s ? kf[kf.length - 1].s[0] : kf[kf.length - 2].e[0];
      /* if(kf[kf.length - 1].s){
                keyPropS = kf[kf.length - 1].s[0];
            }else{
                keyPropS = kf[kf.length - 2].e[0];
            } */
      isHold = true;
    } else {
      var i = iterationIndex;
      var len = kf.length - 1;
      var flag = true;
      var keyData;
      var nextKeyData;
      var keyframeMetadata;
      while (flag) {
        keyData = kf[i];
        nextKeyData = kf[i + 1];
        if ((nextKeyData.t - this.offsetTime) > frameNum) {
          break;
        }
        if (i < len - 1) {
          i += 1;
        } else {
          flag = false;
        }
      }
      keyframeMetadata = this.keyframesMetadata[i] || {};
      isHold = keyData.h === 1;
      iterationIndex = i;
      if (!isHold) {
        if (frameNum >= nextKeyData.t - this.offsetTime) {
          perc = 1;
        } else if (frameNum < keyData.t - this.offsetTime) {
          perc = 0;
        } else {
          var fnc;
          if (keyframeMetadata.__fnct) {
            fnc = keyframeMetadata.__fnct;
          } else {
            fnc = BezierFactory.getBezierEasing(keyData.o.x, keyData.o.y, keyData.i.x, keyData.i.y).get;
            keyframeMetadata.__fnct = fnc;
          }
          perc = fnc((frameNum - (keyData.t - this.offsetTime)) / ((nextKeyData.t - this.offsetTime) - (keyData.t - this.offsetTime)));
        }
        keyPropE = nextKeyData.s ? nextKeyData.s[0] : keyData.e[0];
      }
      keyPropS = keyData.s[0];
    }
    jLen = previousValue._length;
    kLen = keyPropS.i[0].length;
    caching.lastIndex = iterationIndex;

    for (j = 0; j < jLen; j += 1) {
      for (k = 0; k < kLen; k += 1) {
        vertexValue = isHold ? keyPropS.i[j][k] : keyPropS.i[j][k] + (keyPropE.i[j][k] - keyPropS.i[j][k]) * perc;
        previousValue.i[j][k] = vertexValue;
        vertexValue = isHold ? keyPropS.o[j][k] : keyPropS.o[j][k] + (keyPropE.o[j][k] - keyPropS.o[j][k]) * perc;
        previousValue.o[j][k] = vertexValue;
        vertexValue = isHold ? keyPropS.v[j][k] : keyPropS.v[j][k] + (keyPropE.v[j][k] - keyPropS.v[j][k]) * perc;
        previousValue.v[j][k] = vertexValue;
      }
    }
  }

  function interpolateShapeCurrentTime() {
    var frameNum = this.comp.renderedFrame - this.offsetTime;
    var initTime = this.keyframes[0].t - this.offsetTime;
    var endTime = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
    var lastFrame = this._caching.lastFrame;
    if (!(lastFrame !== initFrame && ((lastFrame < initTime && frameNum < initTime) || (lastFrame > endTime && frameNum > endTime)))) {
      /// /
      this._caching.lastIndex = lastFrame < frameNum ? this._caching.lastIndex : 0;
      this.interpolateShape(frameNum, this.pv, this._caching);
      /// /
    }
    this._caching.lastFrame = frameNum;
    return this.pv;
  }

  function resetShape() {
    this.paths = this.localShapeCollection;
  }

  function shapesEqual(shape1, shape2) {
    if (shape1._length !== shape2._length || shape1.c !== shape2.c) {
      return false;
    }
    var i;
    var len = shape1._length;
    for (i = 0; i < len; i += 1) {
      if (shape1.v[i][0] !== shape2.v[i][0]
            || shape1.v[i][1] !== shape2.v[i][1]
            || shape1.o[i][0] !== shape2.o[i][0]
            || shape1.o[i][1] !== shape2.o[i][1]
            || shape1.i[i][0] !== shape2.i[i][0]
            || shape1.i[i][1] !== shape2.i[i][1]) {
        return false;
      }
    }
    return true;
  }

  function setVValue(newPath) {
    if (!shapesEqual(this.v, newPath)) {
      this.v = shapePool.clone(newPath);
      this.localShapeCollection.releaseShapes();
      this.localShapeCollection.addShape(this.v);
      this._mdf = true;
      this.paths = this.localShapeCollection;
    }
  }

  function processEffectsSequence() {
    if (this.elem.globalData.frameId === this.frameId) {
      return;
    } if (!this.effectsSequence.length) {
      this._mdf = false;
      return;
    }
    if (this.lock) {
      this.setVValue(this.pv);
      return;
    }
    this.lock = true;
    this._mdf = false;
    var finalValue;
    if (this.kf) {
      finalValue = this.pv;
    } else if (this.data.ks) {
      finalValue = this.data.ks.k;
    } else {
      finalValue = this.data.pt.k;
    }
    var i;
    var len = this.effectsSequence.length;
    for (i = 0; i < len; i += 1) {
      finalValue = this.effectsSequence[i](finalValue);
    }
    this.setVValue(finalValue);
    this.lock = false;
    this.frameId = this.elem.globalData.frameId;
  }

  function ShapeProperty(elem, data, type) {
    this.propType = 'shape';
    this.comp = elem.comp;
    this.container = elem;
    this.elem = elem;
    this.data = data;
    this.k = false;
    this.kf = false;
    this._mdf = false;
    var pathData = type === 3 ? data.pt.k : data.ks.k;
    this.v = shapePool.clone(pathData);
    this.pv = shapePool.clone(this.v);
    this.localShapeCollection = shapeCollectionPool.newShapeCollection();
    this.paths = this.localShapeCollection;
    this.paths.addShape(this.v);
    this.reset = resetShape;
    this.effectsSequence = [];
  }

  function addEffect(effectFunction) {
    this.effectsSequence.push(effectFunction);
    this.container.addDynamicProperty(this);
  }

  ShapeProperty.prototype.interpolateShape = interpolateShape;
  ShapeProperty.prototype.getValue = processEffectsSequence;
  ShapeProperty.prototype.setVValue = setVValue;
  ShapeProperty.prototype.addEffect = addEffect;

  function KeyframedShapeProperty(elem, data, type) {
    this.propType = 'shape';
    this.comp = elem.comp;
    this.elem = elem;
    this.container = elem;
    this.offsetTime = elem.data.st;
    this.keyframes = type === 3 ? data.pt.k : data.ks.k;
    this.keyframesMetadata = [];
    this.k = true;
    this.kf = true;
    var len = this.keyframes[0].s[0].i.length;
    this.v = shapePool.newElement();
    this.v.setPathData(this.keyframes[0].s[0].c, len);
    this.pv = shapePool.clone(this.v);
    this.localShapeCollection = shapeCollectionPool.newShapeCollection();
    this.paths = this.localShapeCollection;
    this.paths.addShape(this.v);
    this.lastFrame = initFrame;
    this.reset = resetShape;
    this._caching = { lastFrame: initFrame, lastIndex: 0 };
    this.effectsSequence = [interpolateShapeCurrentTime.bind(this)];
  }
  KeyframedShapeProperty.prototype.getValue = processEffectsSequence;
  KeyframedShapeProperty.prototype.interpolateShape = interpolateShape;
  KeyframedShapeProperty.prototype.setVValue = setVValue;
  KeyframedShapeProperty.prototype.addEffect = addEffect;

  var EllShapeProperty = (function () {
    var cPoint = roundCorner;

    function EllShapePropertyFactory(elem, data) {
      /* this.v = {
                v: createSizedArray(4),
                i: createSizedArray(4),
                o: createSizedArray(4),
                c: true
            }; */
      this.v = shapePool.newElement();
      this.v.setPathData(true, 4);
      this.localShapeCollection = shapeCollectionPool.newShapeCollection();
      this.paths = this.localShapeCollection;
      this.localShapeCollection.addShape(this.v);
      this.d = data.d;
      this.elem = elem;
      this.comp = elem.comp;
      this.frameId = -1;
      this.initDynamicPropertyContainer(elem);
      this.p = PropertyFactory.getProp(elem, data.p, 1, 0, this);
      this.s = PropertyFactory.getProp(elem, data.s, 1, 0, this);
      if (this.dynamicProperties.length) {
        this.k = true;
      } else {
        this.k = false;
        this.convertEllToPath();
      }
    }

    EllShapePropertyFactory.prototype = {
      reset: resetShape,
      getValue: function () {
        if (this.elem.globalData.frameId === this.frameId) {
          return;
        }
        this.frameId = this.elem.globalData.frameId;
        this.iterateDynamicProperties();

        if (this._mdf) {
          this.convertEllToPath();
        }
      },
      convertEllToPath: function () {
        var p0 = this.p.v[0];
        var p1 = this.p.v[1];
        var s0 = this.s.v[0] / 2;
        var s1 = this.s.v[1] / 2;
        var _cw = this.d !== 3;
        var _v = this.v;
        _v.v[0][0] = p0;
        _v.v[0][1] = p1 - s1;
        _v.v[1][0] = _cw ? p0 + s0 : p0 - s0;
        _v.v[1][1] = p1;
        _v.v[2][0] = p0;
        _v.v[2][1] = p1 + s1;
        _v.v[3][0] = _cw ? p0 - s0 : p0 + s0;
        _v.v[3][1] = p1;
        _v.i[0][0] = _cw ? p0 - s0 * cPoint : p0 + s0 * cPoint;
        _v.i[0][1] = p1 - s1;
        _v.i[1][0] = _cw ? p0 + s0 : p0 - s0;
        _v.i[1][1] = p1 - s1 * cPoint;
        _v.i[2][0] = _cw ? p0 + s0 * cPoint : p0 - s0 * cPoint;
        _v.i[2][1] = p1 + s1;
        _v.i[3][0] = _cw ? p0 - s0 : p0 + s0;
        _v.i[3][1] = p1 + s1 * cPoint;
        _v.o[0][0] = _cw ? p0 + s0 * cPoint : p0 - s0 * cPoint;
        _v.o[0][1] = p1 - s1;
        _v.o[1][0] = _cw ? p0 + s0 : p0 - s0;
        _v.o[1][1] = p1 + s1 * cPoint;
        _v.o[2][0] = _cw ? p0 - s0 * cPoint : p0 + s0 * cPoint;
        _v.o[2][1] = p1 + s1;
        _v.o[3][0] = _cw ? p0 - s0 : p0 + s0;
        _v.o[3][1] = p1 - s1 * cPoint;
      },
    };

    extendPrototype([DynamicPropertyContainer], EllShapePropertyFactory);

    return EllShapePropertyFactory;
  }());

  var StarShapeProperty = (function () {
    function StarShapePropertyFactory(elem, data) {
      this.v = shapePool.newElement();
      this.v.setPathData(true, 0);
      this.elem = elem;
      this.comp = elem.comp;
      this.data = data;
      this.frameId = -1;
      this.d = data.d;
      this.initDynamicPropertyContainer(elem);
      if (data.sy === 1) {
        this.ir = PropertyFactory.getProp(elem, data.ir, 0, 0, this);
        this.is = PropertyFactory.getProp(elem, data.is, 0, 0.01, this);
        this.convertToPath = this.convertStarToPath;
      } else {
        this.convertToPath = this.convertPolygonToPath;
      }
      this.pt = PropertyFactory.getProp(elem, data.pt, 0, 0, this);
      this.p = PropertyFactory.getProp(elem, data.p, 1, 0, this);
      this.r = PropertyFactory.getProp(elem, data.r, 0, degToRads, this);
      this.or = PropertyFactory.getProp(elem, data.or, 0, 0, this);
      this.os = PropertyFactory.getProp(elem, data.os, 0, 0.01, this);
      this.localShapeCollection = shapeCollectionPool.newShapeCollection();
      this.localShapeCollection.addShape(this.v);
      this.paths = this.localShapeCollection;
      if (this.dynamicProperties.length) {
        this.k = true;
      } else {
        this.k = false;
        this.convertToPath();
      }
    }

    StarShapePropertyFactory.prototype = {
      reset: resetShape,
      getValue: function () {
        if (this.elem.globalData.frameId === this.frameId) {
          return;
        }
        this.frameId = this.elem.globalData.frameId;
        this.iterateDynamicProperties();
        if (this._mdf) {
          this.convertToPath();
        }
      },
      convertStarToPath: function () {
        var numPts = Math.floor(this.pt.v) * 2;
        var angle = (Math.PI * 2) / numPts;
        /* this.v.v.length = numPts;
                this.v.i.length = numPts;
                this.v.o.length = numPts; */
        var longFlag = true;
        var longRad = this.or.v;
        var shortRad = this.ir.v;
        var longRound = this.os.v;
        var shortRound = this.is.v;
        var longPerimSegment = (2 * Math.PI * longRad) / (numPts * 2);
        var shortPerimSegment = (2 * Math.PI * shortRad) / (numPts * 2);
        var i;
        var rad;
        var roundness;
        var perimSegment;
        var currentAng = -Math.PI / 2;
        currentAng += this.r.v;
        var dir = this.data.d === 3 ? -1 : 1;
        this.v._length = 0;
        for (i = 0; i < numPts; i += 1) {
          rad = longFlag ? longRad : shortRad;
          roundness = longFlag ? longRound : shortRound;
          perimSegment = longFlag ? longPerimSegment : shortPerimSegment;
          var x = rad * Math.cos(currentAng);
          var y = rad * Math.sin(currentAng);
          var ox = x === 0 && y === 0 ? 0 : y / Math.sqrt(x * x + y * y);
          var oy = x === 0 && y === 0 ? 0 : -x / Math.sqrt(x * x + y * y);
          x += +this.p.v[0];
          y += +this.p.v[1];
          this.v.setTripleAt(x, y, x - ox * perimSegment * roundness * dir, y - oy * perimSegment * roundness * dir, x + ox * perimSegment * roundness * dir, y + oy * perimSegment * roundness * dir, i, true);

          /* this.v.v[i] = [x,y];
                    this.v.i[i] = [x+ox*perimSegment*roundness*dir,y+oy*perimSegment*roundness*dir];
                    this.v.o[i] = [x-ox*perimSegment*roundness*dir,y-oy*perimSegment*roundness*dir];
                    this.v._length = numPts; */
          longFlag = !longFlag;
          currentAng += angle * dir;
        }
      },
      convertPolygonToPath: function () {
        var numPts = Math.floor(this.pt.v);
        var angle = (Math.PI * 2) / numPts;
        var rad = this.or.v;
        var roundness = this.os.v;
        var perimSegment = (2 * Math.PI * rad) / (numPts * 4);
        var i;
        var currentAng = -Math.PI * 0.5;
        var dir = this.data.d === 3 ? -1 : 1;
        currentAng += this.r.v;
        this.v._length = 0;
        for (i = 0; i < numPts; i += 1) {
          var x = rad * Math.cos(currentAng);
          var y = rad * Math.sin(currentAng);
          var ox = x === 0 && y === 0 ? 0 : y / Math.sqrt(x * x + y * y);
          var oy = x === 0 && y === 0 ? 0 : -x / Math.sqrt(x * x + y * y);
          x += +this.p.v[0];
          y += +this.p.v[1];
          this.v.setTripleAt(x, y, x - ox * perimSegment * roundness * dir, y - oy * perimSegment * roundness * dir, x + ox * perimSegment * roundness * dir, y + oy * perimSegment * roundness * dir, i, true);
          currentAng += angle * dir;
        }
        this.paths.length = 0;
        this.paths[0] = this.v;
      },

    };
    extendPrototype([DynamicPropertyContainer], StarShapePropertyFactory);

    return StarShapePropertyFactory;
  }());

  var RectShapeProperty = (function () {
    function RectShapePropertyFactory(elem, data) {
      this.v = shapePool.newElement();
      this.v.c = true;
      this.localShapeCollection = shapeCollectionPool.newShapeCollection();
      this.localShapeCollection.addShape(this.v);
      this.paths = this.localShapeCollection;
      this.elem = elem;
      this.comp = elem.comp;
      this.frameId = -1;
      this.d = data.d;
      this.initDynamicPropertyContainer(elem);
      this.p = PropertyFactory.getProp(elem, data.p, 1, 0, this);
      this.s = PropertyFactory.getProp(elem, data.s, 1, 0, this);
      this.r = PropertyFactory.getProp(elem, data.r, 0, 0, this);
      if (this.dynamicProperties.length) {
        this.k = true;
      } else {
        this.k = false;
        this.convertRectToPath();
      }
    }

    RectShapePropertyFactory.prototype = {
      convertRectToPath: function () {
        var p0 = this.p.v[0];
        var p1 = this.p.v[1];
        var v0 = this.s.v[0] / 2;
        var v1 = this.s.v[1] / 2;
        var round = bmMin(v0, v1, this.r.v);
        var cPoint = round * (1 - roundCorner);
        this.v._length = 0;

        if (this.d === 2 || this.d === 1) {
          this.v.setTripleAt(p0 + v0, p1 - v1 + round, p0 + v0, p1 - v1 + round, p0 + v0, p1 - v1 + cPoint, 0, true);
          this.v.setTripleAt(p0 + v0, p1 + v1 - round, p0 + v0, p1 + v1 - cPoint, p0 + v0, p1 + v1 - round, 1, true);
          if (round !== 0) {
            this.v.setTripleAt(p0 + v0 - round, p1 + v1, p0 + v0 - round, p1 + v1, p0 + v0 - cPoint, p1 + v1, 2, true);
            this.v.setTripleAt(p0 - v0 + round, p1 + v1, p0 - v0 + cPoint, p1 + v1, p0 - v0 + round, p1 + v1, 3, true);
            this.v.setTripleAt(p0 - v0, p1 + v1 - round, p0 - v0, p1 + v1 - round, p0 - v0, p1 + v1 - cPoint, 4, true);
            this.v.setTripleAt(p0 - v0, p1 - v1 + round, p0 - v0, p1 - v1 + cPoint, p0 - v0, p1 - v1 + round, 5, true);
            this.v.setTripleAt(p0 - v0 + round, p1 - v1, p0 - v0 + round, p1 - v1, p0 - v0 + cPoint, p1 - v1, 6, true);
            this.v.setTripleAt(p0 + v0 - round, p1 - v1, p0 + v0 - cPoint, p1 - v1, p0 + v0 - round, p1 - v1, 7, true);
          } else {
            this.v.setTripleAt(p0 - v0, p1 + v1, p0 - v0 + cPoint, p1 + v1, p0 - v0, p1 + v1, 2);
            this.v.setTripleAt(p0 - v0, p1 - v1, p0 - v0, p1 - v1 + cPoint, p0 - v0, p1 - v1, 3);
          }
        } else {
          this.v.setTripleAt(p0 + v0, p1 - v1 + round, p0 + v0, p1 - v1 + cPoint, p0 + v0, p1 - v1 + round, 0, true);
          if (round !== 0) {
            this.v.setTripleAt(p0 + v0 - round, p1 - v1, p0 + v0 - round, p1 - v1, p0 + v0 - cPoint, p1 - v1, 1, true);
            this.v.setTripleAt(p0 - v0 + round, p1 - v1, p0 - v0 + cPoint, p1 - v1, p0 - v0 + round, p1 - v1, 2, true);
            this.v.setTripleAt(p0 - v0, p1 - v1 + round, p0 - v0, p1 - v1 + round, p0 - v0, p1 - v1 + cPoint, 3, true);
            this.v.setTripleAt(p0 - v0, p1 + v1 - round, p0 - v0, p1 + v1 - cPoint, p0 - v0, p1 + v1 - round, 4, true);
            this.v.setTripleAt(p0 - v0 + round, p1 + v1, p0 - v0 + round, p1 + v1, p0 - v0 + cPoint, p1 + v1, 5, true);
            this.v.setTripleAt(p0 + v0 - round, p1 + v1, p0 + v0 - cPoint, p1 + v1, p0 + v0 - round, p1 + v1, 6, true);
            this.v.setTripleAt(p0 + v0, p1 + v1 - round, p0 + v0, p1 + v1 - round, p0 + v0, p1 + v1 - cPoint, 7, true);
          } else {
            this.v.setTripleAt(p0 - v0, p1 - v1, p0 - v0 + cPoint, p1 - v1, p0 - v0, p1 - v1, 1, true);
            this.v.setTripleAt(p0 - v0, p1 + v1, p0 - v0, p1 + v1 - cPoint, p0 - v0, p1 + v1, 2, true);
            this.v.setTripleAt(p0 + v0, p1 + v1, p0 + v0 - cPoint, p1 + v1, p0 + v0, p1 + v1, 3, true);
          }
        }
      },
      getValue: function () {
        if (this.elem.globalData.frameId === this.frameId) {
          return;
        }
        this.frameId = this.elem.globalData.frameId;
        this.iterateDynamicProperties();
        if (this._mdf) {
          this.convertRectToPath();
        }
      },
      reset: resetShape,
    };
    extendPrototype([DynamicPropertyContainer], RectShapePropertyFactory);

    return RectShapePropertyFactory;
  }());

  function getShapeProp(elem, data, type) {
    var prop;
    if (type === 3 || type === 4) {
      var dataProp = type === 3 ? data.pt : data.ks;
      var keys = dataProp.k;
      if (keys.length) {
        prop = new KeyframedShapeProperty(elem, data, type);
      } else {
        prop = new ShapeProperty(elem, data, type);
      }
    } else if (type === 5) {
      prop = new RectShapeProperty(elem, data);
    } else if (type === 6) {
      prop = new EllShapeProperty(elem, data);
    } else if (type === 7) {
      prop = new StarShapeProperty(elem, data);
    }
    if (prop.k) {
      elem.addDynamicProperty(prop);
    }
    return prop;
  }

  function getConstructorFunction() {
    return ShapeProperty;
  }

  function getKeyframedConstructorFunction() {
    return KeyframedShapeProperty;
  }

  var ob = {};
  ob.getShapeProp = getShapeProp;
  ob.getConstructorFunction = getConstructorFunction;
  ob.getKeyframedConstructorFunction = getKeyframedConstructorFunction;
  return ob;
}());

/* global shapeCollectionPool, initialDefaultFrame, extendPrototype, DynamicPropertyContainer */
/* exported ShapeModifiers */

var ShapeModifiers = (function () {
  var ob = {};
  var modifiers = {};
  ob.registerModifier = registerModifier;
  ob.getModifier = getModifier;

  function registerModifier(nm, factory) {
    if (!modifiers[nm]) {
      modifiers[nm] = factory;
    }
  }

  function getModifier(nm, elem, data) {
    return new modifiers[nm](elem, data);
  }

  return ob;
}());

function ShapeModifier() {}
ShapeModifier.prototype.initModifierProperties = function () {};
ShapeModifier.prototype.addShapeToModifier = function () {};
ShapeModifier.prototype.addShape = function (data) {
  if (!this.closed) {
    // Adding shape to dynamic properties. It covers the case where a shape has no effects applied, to reset it's _mdf state on every tick.
    data.sh.container.addDynamicProperty(data.sh);
    var shapeData = { shape: data.sh, data: data, localShapeCollection: shapeCollectionPool.newShapeCollection() };
    this.shapes.push(shapeData);
    this.addShapeToModifier(shapeData);
    if (this._isAnimated) {
      data.setAsAnimated();
    }
  }
};
ShapeModifier.prototype.init = function (elem, data) {
  this.shapes = [];
  this.elem = elem;
  this.initDynamicPropertyContainer(elem);
  this.initModifierProperties(elem, data);
  this.frameId = initialDefaultFrame;
  this.closed = false;
  this.k = false;
  if (this.dynamicProperties.length) {
    this.k = true;
  } else {
    this.getValue(true);
  }
};
ShapeModifier.prototype.processKeys = function () {
  if (this.elem.globalData.frameId === this.frameId) {
    return;
  }
  this.frameId = this.elem.globalData.frameId;
  this.iterateDynamicProperties();
};

extendPrototype([DynamicPropertyContainer], ShapeModifier);

/* global extendPrototype, ShapeModifier, PropertyFactory, segmentsLengthPool, bez, shapePool, ShapeModifiers */

function TrimModifier() {
}
extendPrototype([ShapeModifier], TrimModifier);
TrimModifier.prototype.initModifierProperties = function (elem, data) {
  this.s = PropertyFactory.getProp(elem, data.s, 0, 0.01, this);
  this.e = PropertyFactory.getProp(elem, data.e, 0, 0.01, this);
  this.o = PropertyFactory.getProp(elem, data.o, 0, 0, this);
  this.sValue = 0;
  this.eValue = 0;
  this.getValue = this.processKeys;
  this.m = data.m;
  this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
};

TrimModifier.prototype.addShapeToModifier = function (shapeData) {
  shapeData.pathsData = [];
};

TrimModifier.prototype.calculateShapeEdges = function (s, e, shapeLength, addedLength, totalModifierLength) {
  var segments = [];
  if (e <= 1) {
    segments.push({
      s: s,
      e: e,
    });
  } else if (s >= 1) {
    segments.push({
      s: s - 1,
      e: e - 1,
    });
  } else {
    segments.push({
      s: s,
      e: 1,
    });
    segments.push({
      s: 0,
      e: e - 1,
    });
  }
  var shapeSegments = [];
  var i;
  var len = segments.length;
  var segmentOb;
  for (i = 0; i < len; i += 1) {
    segmentOb = segments[i];
    if (!(segmentOb.e * totalModifierLength < addedLength || segmentOb.s * totalModifierLength > addedLength + shapeLength)) {
      var shapeS;
      var shapeE;
      if (segmentOb.s * totalModifierLength <= addedLength) {
        shapeS = 0;
      } else {
        shapeS = (segmentOb.s * totalModifierLength - addedLength) / shapeLength;
      }
      if (segmentOb.e * totalModifierLength >= addedLength + shapeLength) {
        shapeE = 1;
      } else {
        shapeE = ((segmentOb.e * totalModifierLength - addedLength) / shapeLength);
      }
      shapeSegments.push([shapeS, shapeE]);
    }
  }
  if (!shapeSegments.length) {
    shapeSegments.push([0, 0]);
  }
  return shapeSegments;
};

TrimModifier.prototype.releasePathsData = function (pathsData) {
  var i;
  var len = pathsData.length;
  for (i = 0; i < len; i += 1) {
    segmentsLengthPool.release(pathsData[i]);
  }
  pathsData.length = 0;
  return pathsData;
};

TrimModifier.prototype.processShapes = function (_isFirstFrame) {
  var s;
  var e;
  if (this._mdf || _isFirstFrame) {
    var o = (this.o.v % 360) / 360;
    if (o < 0) {
      o += 1;
    }
    if (this.s.v > 1) {
      s = 1 + o;
    } else if (this.s.v < 0) {
      s = 0 + o;
    } else {
      s = this.s.v + o;
    }
    if (this.e.v > 1) {
      e = 1 + o;
    } else if (this.e.v < 0) {
      e = 0 + o;
    } else {
      e = this.e.v + o;
    }

    if (s > e) {
      var _s = s;
      s = e;
      e = _s;
    }
    s = Math.round(s * 10000) * 0.0001;
    e = Math.round(e * 10000) * 0.0001;
    this.sValue = s;
    this.eValue = e;
  } else {
    s = this.sValue;
    e = this.eValue;
  }
  var shapePaths;
  var i;
  var len = this.shapes.length;
  var j;
  var jLen;
  var pathsData;
  var pathData;
  var totalShapeLength;
  var totalModifierLength = 0;

  if (e === s) {
    for (i = 0; i < len; i += 1) {
      this.shapes[i].localShapeCollection.releaseShapes();
      this.shapes[i].shape._mdf = true;
      this.shapes[i].shape.paths = this.shapes[i].localShapeCollection;
      if (this._mdf) {
        this.shapes[i].pathsData.length = 0;
      }
    }
  } else if (!((e === 1 && s === 0) || (e === 0 && s === 1))) {
    var segments = [];
    var shapeData;
    var localShapeCollection;
    for (i = 0; i < len; i += 1) {
      shapeData = this.shapes[i];
      // if shape hasn't changed and trim properties haven't changed, cached previous path can be used
      if (!shapeData.shape._mdf && !this._mdf && !_isFirstFrame && this.m !== 2) {
        shapeData.shape.paths = shapeData.localShapeCollection;
      } else {
        shapePaths = shapeData.shape.paths;
        jLen = shapePaths._length;
        totalShapeLength = 0;
        if (!shapeData.shape._mdf && shapeData.pathsData.length) {
          totalShapeLength = shapeData.totalShapeLength;
        } else {
          pathsData = this.releasePathsData(shapeData.pathsData);
          for (j = 0; j < jLen; j += 1) {
            pathData = bez.getSegmentsLength(shapePaths.shapes[j]);
            pathsData.push(pathData);
            totalShapeLength += pathData.totalLength;
          }
          shapeData.totalShapeLength = totalShapeLength;
          shapeData.pathsData = pathsData;
        }

        totalModifierLength += totalShapeLength;
        shapeData.shape._mdf = true;
      }
    }
    var shapeS = s;
    var shapeE = e;
    var addedLength = 0;
    var edges;
    for (i = len - 1; i >= 0; i -= 1) {
      shapeData = this.shapes[i];
      if (shapeData.shape._mdf) {
        localShapeCollection = shapeData.localShapeCollection;
        localShapeCollection.releaseShapes();
        // if m === 2 means paths are trimmed individually so edges need to be found for this specific shape relative to whoel group
        if (this.m === 2 && len > 1) {
          edges = this.calculateShapeEdges(s, e, shapeData.totalShapeLength, addedLength, totalModifierLength);
          addedLength += shapeData.totalShapeLength;
        } else {
          edges = [[shapeS, shapeE]];
        }
        jLen = edges.length;
        for (j = 0; j < jLen; j += 1) {
          shapeS = edges[j][0];
          shapeE = edges[j][1];
          segments.length = 0;
          if (shapeE <= 1) {
            segments.push({
              s: shapeData.totalShapeLength * shapeS,
              e: shapeData.totalShapeLength * shapeE,
            });
          } else if (shapeS >= 1) {
            segments.push({
              s: shapeData.totalShapeLength * (shapeS - 1),
              e: shapeData.totalShapeLength * (shapeE - 1),
            });
          } else {
            segments.push({
              s: shapeData.totalShapeLength * shapeS,
              e: shapeData.totalShapeLength,
            });
            segments.push({
              s: 0,
              e: shapeData.totalShapeLength * (shapeE - 1),
            });
          }
          var newShapesData = this.addShapes(shapeData, segments[0]);
          if (segments[0].s !== segments[0].e) {
            if (segments.length > 1) {
              var lastShapeInCollection = shapeData.shape.paths.shapes[shapeData.shape.paths._length - 1];
              if (lastShapeInCollection.c) {
                var lastShape = newShapesData.pop();
                this.addPaths(newShapesData, localShapeCollection);
                newShapesData = this.addShapes(shapeData, segments[1], lastShape);
              } else {
                this.addPaths(newShapesData, localShapeCollection);
                newShapesData = this.addShapes(shapeData, segments[1]);
              }
            }
            this.addPaths(newShapesData, localShapeCollection);
          }
        }
        shapeData.shape.paths = localShapeCollection;
      }
    }
  } else if (this._mdf) {
    for (i = 0; i < len; i += 1) {
      // Releasign Trim Cached paths data when no trim applied in case shapes are modified inbetween.
      // Don't remove this even if it's losing cached info.
      this.shapes[i].pathsData.length = 0;
      this.shapes[i].shape._mdf = true;
    }
  }
};

TrimModifier.prototype.addPaths = function (newPaths, localShapeCollection) {
  var i;
  var len = newPaths.length;
  for (i = 0; i < len; i += 1) {
    localShapeCollection.addShape(newPaths[i]);
  }
};

TrimModifier.prototype.addSegment = function (pt1, pt2, pt3, pt4, shapePath, pos, newShape) {
  shapePath.setXYAt(pt2[0], pt2[1], 'o', pos);
  shapePath.setXYAt(pt3[0], pt3[1], 'i', pos + 1);
  if (newShape) {
    shapePath.setXYAt(pt1[0], pt1[1], 'v', pos);
  }
  shapePath.setXYAt(pt4[0], pt4[1], 'v', pos + 1);
};

TrimModifier.prototype.addSegmentFromArray = function (points, shapePath, pos, newShape) {
  shapePath.setXYAt(points[1], points[5], 'o', pos);
  shapePath.setXYAt(points[2], points[6], 'i', pos + 1);
  if (newShape) {
    shapePath.setXYAt(points[0], points[4], 'v', pos);
  }
  shapePath.setXYAt(points[3], points[7], 'v', pos + 1);
};

TrimModifier.prototype.addShapes = function (shapeData, shapeSegment, shapePath) {
  var pathsData = shapeData.pathsData;
  var shapePaths = shapeData.shape.paths.shapes;
  var i;
  var len = shapeData.shape.paths._length;
  var j;
  var jLen;
  var addedLength = 0;
  var currentLengthData;
  var segmentCount;
  var lengths;
  var segment;
  var shapes = [];
  var initPos;
  var newShape = true;
  if (!shapePath) {
    shapePath = shapePool.newElement();
    segmentCount = 0;
    initPos = 0;
  } else {
    segmentCount = shapePath._length;
    initPos = shapePath._length;
  }
  shapes.push(shapePath);
  for (i = 0; i < len; i += 1) {
    lengths = pathsData[i].lengths;
    shapePath.c = shapePaths[i].c;
    jLen = shapePaths[i].c ? lengths.length : lengths.length + 1;
    for (j = 1; j < jLen; j += 1) {
      currentLengthData = lengths[j - 1];
      if (addedLength + currentLengthData.addedLength < shapeSegment.s) {
        addedLength += currentLengthData.addedLength;
        shapePath.c = false;
      } else if (addedLength > shapeSegment.e) {
        shapePath.c = false;
        break;
      } else {
        if (shapeSegment.s <= addedLength && shapeSegment.e >= addedLength + currentLengthData.addedLength) {
          this.addSegment(shapePaths[i].v[j - 1], shapePaths[i].o[j - 1], shapePaths[i].i[j], shapePaths[i].v[j], shapePath, segmentCount, newShape);
          newShape = false;
        } else {
          segment = bez.getNewSegment(shapePaths[i].v[j - 1], shapePaths[i].v[j], shapePaths[i].o[j - 1], shapePaths[i].i[j], (shapeSegment.s - addedLength) / currentLengthData.addedLength, (shapeSegment.e - addedLength) / currentLengthData.addedLength, lengths[j - 1]);
          this.addSegmentFromArray(segment, shapePath, segmentCount, newShape);
          // this.addSegment(segment.pt1, segment.pt3, segment.pt4, segment.pt2, shapePath, segmentCount, newShape);
          newShape = false;
          shapePath.c = false;
        }
        addedLength += currentLengthData.addedLength;
        segmentCount += 1;
      }
    }
    if (shapePaths[i].c && lengths.length) {
      currentLengthData = lengths[j - 1];
      if (addedLength <= shapeSegment.e) {
        var segmentLength = lengths[j - 1].addedLength;
        if (shapeSegment.s <= addedLength && shapeSegment.e >= addedLength + segmentLength) {
          this.addSegment(shapePaths[i].v[j - 1], shapePaths[i].o[j - 1], shapePaths[i].i[0], shapePaths[i].v[0], shapePath, segmentCount, newShape);
          newShape = false;
        } else {
          segment = bez.getNewSegment(shapePaths[i].v[j - 1], shapePaths[i].v[0], shapePaths[i].o[j - 1], shapePaths[i].i[0], (shapeSegment.s - addedLength) / segmentLength, (shapeSegment.e - addedLength) / segmentLength, lengths[j - 1]);
          this.addSegmentFromArray(segment, shapePath, segmentCount, newShape);
          // this.addSegment(segment.pt1, segment.pt3, segment.pt4, segment.pt2, shapePath, segmentCount, newShape);
          newShape = false;
          shapePath.c = false;
        }
      } else {
        shapePath.c = false;
      }
      addedLength += currentLengthData.addedLength;
      segmentCount += 1;
    }
    if (shapePath._length) {
      shapePath.setXYAt(shapePath.v[initPos][0], shapePath.v[initPos][1], 'i', initPos);
      shapePath.setXYAt(shapePath.v[shapePath._length - 1][0], shapePath.v[shapePath._length - 1][1], 'o', shapePath._length - 1);
    }
    if (addedLength > shapeSegment.e) {
      break;
    }
    if (i < len - 1) {
      shapePath = shapePool.newElement();
      newShape = true;
      shapes.push(shapePath);
      segmentCount = 0;
    }
  }
  return shapes;
};

ShapeModifiers.registerModifier('tm', TrimModifier);

/* global extendPrototype, ShapeModifier, PropertyFactory, shapePool, roundCorner, ShapeModifiers */

function RoundCornersModifier() {}
extendPrototype([ShapeModifier], RoundCornersModifier);
RoundCornersModifier.prototype.initModifierProperties = function (elem, data) {
  this.getValue = this.processKeys;
  this.rd = PropertyFactory.getProp(elem, data.r, 0, null, this);
  this._isAnimated = !!this.rd.effectsSequence.length;
};

RoundCornersModifier.prototype.processPath = function (path, round) {
  var clonedPath = shapePool.newElement();
  clonedPath.c = path.c;
  var i;
  var len = path._length;
  var currentV;
  var currentI;
  var currentO;
  var closerV;
  var distance;
  var newPosPerc;
  var index = 0;
  var vX;
  var vY;
  var oX;
  var oY;
  var iX;
  var iY;
  for (i = 0; i < len; i += 1) {
    currentV = path.v[i];
    currentO = path.o[i];
    currentI = path.i[i];
    if (currentV[0] === currentO[0] && currentV[1] === currentO[1] && currentV[0] === currentI[0] && currentV[1] === currentI[1]) {
      if ((i === 0 || i === len - 1) && !path.c) {
        clonedPath.setTripleAt(currentV[0], currentV[1], currentO[0], currentO[1], currentI[0], currentI[1], index);
        /* clonedPath.v[index] = currentV;
                clonedPath.o[index] = currentO;
                clonedPath.i[index] = currentI; */
        index += 1;
      } else {
        if (i === 0) {
          closerV = path.v[len - 1];
        } else {
          closerV = path.v[i - 1];
        }
        distance = Math.sqrt(Math.pow(currentV[0] - closerV[0], 2) + Math.pow(currentV[1] - closerV[1], 2));
        newPosPerc = distance ? Math.min(distance / 2, round) / distance : 0;
        iX = currentV[0] + (closerV[0] - currentV[0]) * newPosPerc;
        vX = iX;
        iY = currentV[1] - (currentV[1] - closerV[1]) * newPosPerc;
        vY = iY;
        oX = vX - (vX - currentV[0]) * roundCorner;
        oY = vY - (vY - currentV[1]) * roundCorner;
        clonedPath.setTripleAt(vX, vY, oX, oY, iX, iY, index);
        index += 1;

        if (i === len - 1) {
          closerV = path.v[0];
        } else {
          closerV = path.v[i + 1];
        }
        distance = Math.sqrt(Math.pow(currentV[0] - closerV[0], 2) + Math.pow(currentV[1] - closerV[1], 2));
        newPosPerc = distance ? Math.min(distance / 2, round) / distance : 0;
        oX = currentV[0] + (closerV[0] - currentV[0]) * newPosPerc;
        vX = oX;
        oY = currentV[1] + (closerV[1] - currentV[1]) * newPosPerc;
        vY = oY;
        iX = vX - (vX - currentV[0]) * roundCorner;
        iY = vY - (vY - currentV[1]) * roundCorner;
        clonedPath.setTripleAt(vX, vY, oX, oY, iX, iY, index);
        index += 1;
      }
    } else {
      clonedPath.setTripleAt(path.v[i][0], path.v[i][1], path.o[i][0], path.o[i][1], path.i[i][0], path.i[i][1], index);
      index += 1;
    }
  }
  return clonedPath;
};

RoundCornersModifier.prototype.processShapes = function (_isFirstFrame) {
  var shapePaths;
  var i;
  var len = this.shapes.length;
  var j;
  var jLen;
  var rd = this.rd.v;

  if (rd !== 0) {
    var shapeData;
    var localShapeCollection;
    for (i = 0; i < len; i += 1) {
      shapeData = this.shapes[i];
      localShapeCollection = shapeData.localShapeCollection;
      if (!(!shapeData.shape._mdf && !this._mdf && !_isFirstFrame)) {
        localShapeCollection.releaseShapes();
        shapeData.shape._mdf = true;
        shapePaths = shapeData.shape.paths.shapes;
        jLen = shapeData.shape.paths._length;
        for (j = 0; j < jLen; j += 1) {
          localShapeCollection.addShape(this.processPath(shapePaths[j], rd));
        }
      }
      shapeData.shape.paths = shapeData.localShapeCollection;
    }
  }
  if (!this.dynamicProperties.length) {
    this._mdf = false;
  }
};

ShapeModifiers.registerModifier('rd', RoundCornersModifier);

/* global extendPrototype, ShapeModifier, PropertyFactory, shapePool, ShapeModifiers */

function PuckerAndBloatModifier() {}
extendPrototype([ShapeModifier], PuckerAndBloatModifier);
PuckerAndBloatModifier.prototype.initModifierProperties = function (elem, data) {
  this.getValue = this.processKeys;
  this.amount = PropertyFactory.getProp(elem, data.a, 0, null, this);
  this._isAnimated = !!this.amount.effectsSequence.length;
};

PuckerAndBloatModifier.prototype.processPath = function (path, amount) {
  var percent = amount / 100;
  var centerPoint = [0, 0];
  var pathLength = path._length;
  var i = 0;
  for (i = 0; i < pathLength; i += 1) {
    centerPoint[0] += path.v[i][0];
    centerPoint[1] += path.v[i][1];
  }
  centerPoint[0] /= pathLength;
  centerPoint[1] /= pathLength;
  var clonedPath = shapePool.newElement();
  clonedPath.c = path.c;
  var vX;
  var vY;
  var oX;
  var oY;
  var iX;
  var iY;
  for (i = 0; i < pathLength; i += 1) {
    vX = path.v[i][0] + (centerPoint[0] - path.v[i][0]) * percent;
    vY = path.v[i][1] + (centerPoint[1] - path.v[i][1]) * percent;
    oX = path.o[i][0] + (centerPoint[0] - path.o[i][0]) * -percent;
    oY = path.o[i][1] + (centerPoint[1] - path.o[i][1]) * -percent;
    iX = path.i[i][0] + (centerPoint[0] - path.i[i][0]) * -percent;
    iY = path.i[i][1] + (centerPoint[1] - path.i[i][1]) * -percent;
    clonedPath.setTripleAt(vX, vY, oX, oY, iX, iY, i);
  }
  return clonedPath;
};

PuckerAndBloatModifier.prototype.processShapes = function (_isFirstFrame) {
  var shapePaths;
  var i;
  var len = this.shapes.length;
  var j;
  var jLen;
  var amount = this.amount.v;

  if (amount !== 0) {
    var shapeData;
    var localShapeCollection;
    for (i = 0; i < len; i += 1) {
      shapeData = this.shapes[i];
      localShapeCollection = shapeData.localShapeCollection;
      if (!(!shapeData.shape._mdf && !this._mdf && !_isFirstFrame)) {
        localShapeCollection.releaseShapes();
        shapeData.shape._mdf = true;
        shapePaths = shapeData.shape.paths.shapes;
        jLen = shapeData.shape.paths._length;
        for (j = 0; j < jLen; j += 1) {
          localShapeCollection.addShape(this.processPath(shapePaths[j], amount));
        }
      }
      shapeData.shape.paths = shapeData.localShapeCollection;
    }
  }
  if (!this.dynamicProperties.length) {
    this._mdf = false;
  }
};
ShapeModifiers.registerModifier('pb', PuckerAndBloatModifier);

/* global extendPrototype, ShapeModifier, TransformPropertyFactory, PropertyFactory, Matrix, ShapeModifiers */

function RepeaterModifier() {}
extendPrototype([ShapeModifier], RepeaterModifier);

RepeaterModifier.prototype.initModifierProperties = function (elem, data) {
  this.getValue = this.processKeys;
  this.c = PropertyFactory.getProp(elem, data.c, 0, null, this);
  this.o = PropertyFactory.getProp(elem, data.o, 0, null, this);
  this.tr = TransformPropertyFactory.getTransformProperty(elem, data.tr, this);
  this.so = PropertyFactory.getProp(elem, data.tr.so, 0, 0.01, this);
  this.eo = PropertyFactory.getProp(elem, data.tr.eo, 0, 0.01, this);
  this.data = data;
  if (!this.dynamicProperties.length) {
    this.getValue(true);
  }
  this._isAnimated = !!this.dynamicProperties.length;
  this.pMatrix = new Matrix();
  this.rMatrix = new Matrix();
  this.sMatrix = new Matrix();
  this.tMatrix = new Matrix();
  this.matrix = new Matrix();
};

RepeaterModifier.prototype.applyTransforms = function (pMatrix, rMatrix, sMatrix, transform, perc, inv) {
  var dir = inv ? -1 : 1;
  var scaleX = transform.s.v[0] + (1 - transform.s.v[0]) * (1 - perc);
  var scaleY = transform.s.v[1] + (1 - transform.s.v[1]) * (1 - perc);
  pMatrix.translate(transform.p.v[0] * dir * perc, transform.p.v[1] * dir * perc, transform.p.v[2]);
  rMatrix.translate(-transform.a.v[0], -transform.a.v[1], transform.a.v[2]);
  rMatrix.rotate(-transform.r.v * dir * perc);
  rMatrix.translate(transform.a.v[0], transform.a.v[1], transform.a.v[2]);
  sMatrix.translate(-transform.a.v[0], -transform.a.v[1], transform.a.v[2]);
  sMatrix.scale(inv ? 1 / scaleX : scaleX, inv ? 1 / scaleY : scaleY);
  sMatrix.translate(transform.a.v[0], transform.a.v[1], transform.a.v[2]);
};

RepeaterModifier.prototype.init = function (elem, arr, pos, elemsData) {
  this.elem = elem;
  this.arr = arr;
  this.pos = pos;
  this.elemsData = elemsData;
  this._currentCopies = 0;
  this._elements = [];
  this._groups = [];
  this.frameId = -1;
  this.initDynamicPropertyContainer(elem);
  this.initModifierProperties(elem, arr[pos]);
  while (pos > 0) {
    pos -= 1;
    // this._elements.unshift(arr.splice(pos,1)[0]);
    this._elements.unshift(arr[pos]);
  }
  if (this.dynamicProperties.length) {
    this.k = true;
  } else {
    this.getValue(true);
  }
};

RepeaterModifier.prototype.resetElements = function (elements) {
  var i;
  var len = elements.length;
  for (i = 0; i < len; i += 1) {
    elements[i]._processed = false;
    if (elements[i].ty === 'gr') {
      this.resetElements(elements[i].it);
    }
  }
};

RepeaterModifier.prototype.cloneElements = function (elements) {
  var newElements = JSON.parse(JSON.stringify(elements));
  this.resetElements(newElements);
  return newElements;
};

RepeaterModifier.prototype.changeGroupRender = function (elements, renderFlag) {
  var i;
  var len = elements.length;
  for (i = 0; i < len; i += 1) {
    elements[i]._render = renderFlag;
    if (elements[i].ty === 'gr') {
      this.changeGroupRender(elements[i].it, renderFlag);
    }
  }
};

RepeaterModifier.prototype.processShapes = function (_isFirstFrame) {
  var items;
  var itemsTransform;
  var i;
  var dir;
  var cont;
  var hasReloaded = false;
  if (this._mdf || _isFirstFrame) {
    var copies = Math.ceil(this.c.v);
    if (this._groups.length < copies) {
      while (this._groups.length < copies) {
        var group = {
          it: this.cloneElements(this._elements),
          ty: 'gr',
        };
        group.it.push({
          a: { a: 0, ix: 1, k: [0, 0] }, nm: 'Transform', o: { a: 0, ix: 7, k: 100 }, p: { a: 0, ix: 2, k: [0, 0] }, r: { a: 1, ix: 6, k: [{ s: 0, e: 0, t: 0 }, { s: 0, e: 0, t: 1 }] }, s: { a: 0, ix: 3, k: [100, 100] }, sa: { a: 0, ix: 5, k: 0 }, sk: { a: 0, ix: 4, k: 0 }, ty: 'tr',
        });

        this.arr.splice(0, 0, group);
        this._groups.splice(0, 0, group);
        this._currentCopies += 1;
      }
      this.elem.reloadShapes();
      hasReloaded = true;
    }
    cont = 0;
    var renderFlag;
    for (i = 0; i <= this._groups.length - 1; i += 1) {
      renderFlag = cont < copies;
      this._groups[i]._render = renderFlag;
      this.changeGroupRender(this._groups[i].it, renderFlag);
      if (!renderFlag) {
        var elems = this.elemsData[i].it;
        var transformData = elems[elems.length - 1];
        if (transformData.transform.op.v !== 0) {
          transformData.transform.op._mdf = true;
          transformData.transform.op.v = 0;
        } else {
          transformData.transform.op._mdf = false;
        }
      }
      cont += 1;
    }

    this._currentCopies = copies;
    /// /

    var offset = this.o.v;
    var offsetModulo = offset % 1;
    var roundOffset = offset > 0 ? Math.floor(offset) : Math.ceil(offset);
    var pProps = this.pMatrix.props;
    var rProps = this.rMatrix.props;
    var sProps = this.sMatrix.props;
    this.pMatrix.reset();
    this.rMatrix.reset();
    this.sMatrix.reset();
    this.tMatrix.reset();
    this.matrix.reset();
    var iteration = 0;

    if (offset > 0) {
      while (iteration < roundOffset) {
        this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false);
        iteration += 1;
      }
      if (offsetModulo) {
        this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, offsetModulo, false);
        iteration += offsetModulo;
      }
    } else if (offset < 0) {
      while (iteration > roundOffset) {
        this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, true);
        iteration -= 1;
      }
      if (offsetModulo) {
        this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -offsetModulo, true);
        iteration -= offsetModulo;
      }
    }
    i = this.data.m === 1 ? 0 : this._currentCopies - 1;
    dir = this.data.m === 1 ? 1 : -1;
    cont = this._currentCopies;
    var j;
    var jLen;
    while (cont) {
      items = this.elemsData[i].it;
      itemsTransform = items[items.length - 1].transform.mProps.v.props;
      jLen = itemsTransform.length;
      items[items.length - 1].transform.mProps._mdf = true;
      items[items.length - 1].transform.op._mdf = true;
      items[items.length - 1].transform.op.v = this._currentCopies === 1
        ? this.so.v
        : this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1));

      if (iteration !== 0) {
        if ((i !== 0 && dir === 1) || (i !== this._currentCopies - 1 && dir === -1)) {
          this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false);
        }
        this.matrix.transform(rProps[0], rProps[1], rProps[2], rProps[3], rProps[4], rProps[5], rProps[6], rProps[7], rProps[8], rProps[9], rProps[10], rProps[11], rProps[12], rProps[13], rProps[14], rProps[15]);
        this.matrix.transform(sProps[0], sProps[1], sProps[2], sProps[3], sProps[4], sProps[5], sProps[6], sProps[7], sProps[8], sProps[9], sProps[10], sProps[11], sProps[12], sProps[13], sProps[14], sProps[15]);
        this.matrix.transform(pProps[0], pProps[1], pProps[2], pProps[3], pProps[4], pProps[5], pProps[6], pProps[7], pProps[8], pProps[9], pProps[10], pProps[11], pProps[12], pProps[13], pProps[14], pProps[15]);

        for (j = 0; j < jLen; j += 1) {
          itemsTransform[j] = this.matrix.props[j];
        }
        this.matrix.reset();
      } else {
        this.matrix.reset();
        for (j = 0; j < jLen; j += 1) {
          itemsTransform[j] = this.matrix.props[j];
        }
      }
      iteration += 1;
      cont -= 1;
      i += dir;
    }
  } else {
    cont = this._currentCopies;
    i = 0;
    dir = 1;
    while (cont) {
      items = this.elemsData[i].it;
      itemsTransform = items[items.length - 1].transform.mProps.v.props;
      items[items.length - 1].transform.mProps._mdf = false;
      items[items.length - 1].transform.op._mdf = false;
      cont -= 1;
      i += dir;
    }
  }
  return hasReloaded;
};

RepeaterModifier.prototype.addShape = function () {};

ShapeModifiers.registerModifier('rp', RepeaterModifier);

/* global createSizedArray, shapePool */

function ShapeCollection() {
  this._length = 0;
  this._maxLength = 4;
  this.shapes = createSizedArray(this._maxLength);
}

ShapeCollection.prototype.addShape = function (shapeData) {
  if (this._length === this._maxLength) {
    this.shapes = this.shapes.concat(createSizedArray(this._maxLength));
    this._maxLength *= 2;
  }
  this.shapes[this._length] = shapeData;
  this._length += 1;
};

ShapeCollection.prototype.releaseShapes = function () {
  var i;
  for (i = 0; i < this._length; i += 1) {
    shapePool.release(this.shapes[i]);
  }
  this._length = 0;
};

/* global createSizedArray, createTypedArray, PropertyFactory, extendPrototype, DynamicPropertyContainer */

function DashProperty(elem, data, renderer, container) {
  this.elem = elem;
  this.frameId = -1;
  this.dataProps = createSizedArray(data.length);
  this.renderer = renderer;
  this.k = false;
  this.dashStr = '';
  this.dashArray = createTypedArray('float32', data.length ? data.length - 1 : 0);
  this.dashoffset = createTypedArray('float32', 1);
  this.initDynamicPropertyContainer(container);
  var i;
  var len = data.length || 0;
  var prop;
  for (i = 0; i < len; i += 1) {
    prop = PropertyFactory.getProp(elem, data[i].v, 0, 0, this);
    this.k = prop.k || this.k;
    this.dataProps[i] = { n: data[i].n, p: prop };
  }
  if (!this.k) {
    this.getValue(true);
  }
  this._isAnimated = this.k;
}

DashProperty.prototype.getValue = function (forceRender) {
  if (this.elem.globalData.frameId === this.frameId && !forceRender) {
    return;
  }
  this.frameId = this.elem.globalData.frameId;
  this.iterateDynamicProperties();
  this._mdf = this._mdf || forceRender;
  if (this._mdf) {
    var i = 0;
    var len = this.dataProps.length;
    if (this.renderer === 'svg') {
      this.dashStr = '';
    }
    for (i = 0; i < len; i += 1) {
      if (this.dataProps[i].n !== 'o') {
        if (this.renderer === 'svg') {
          this.dashStr += ' ' + this.dataProps[i].p.v;
        } else {
          this.dashArray[i] = this.dataProps[i].p.v;
        }
      } else {
        this.dashoffset[0] = this.dataProps[i].p.v;
      }
    }
  }
};
extendPrototype([DynamicPropertyContainer], DashProperty);

/* global createTypedArray, PropertyFactory, extendPrototype, DynamicPropertyContainer */
function GradientProperty(elem, data, container) {
  this.data = data;
  this.c = createTypedArray('uint8c', data.p * 4);
  var cLength = data.k.k[0].s ? (data.k.k[0].s.length - data.p * 4) : data.k.k.length - data.p * 4;
  this.o = createTypedArray('float32', cLength);
  this._cmdf = false;
  this._omdf = false;
  this._collapsable = this.checkCollapsable();
  this._hasOpacity = cLength;
  this.initDynamicPropertyContainer(container);
  this.prop = PropertyFactory.getProp(elem, data.k, 1, null, this);
  this.k = this.prop.k;
  this.getValue(true);
}

GradientProperty.prototype.comparePoints = function (values, points) {
  var i = 0;
  var len = this.o.length / 2;
  var diff;
  while (i < len) {
    diff = Math.abs(values[i * 4] - values[points * 4 + i * 2]);
    if (diff > 0.01) {
      return false;
    }
    i += 1;
  }
  return true;
};

GradientProperty.prototype.checkCollapsable = function () {
  if (this.o.length / 2 !== this.c.length / 4) {
    return false;
  }
  if (this.data.k.k[0].s) {
    var i = 0;
    var len = this.data.k.k.length;
    while (i < len) {
      if (!this.comparePoints(this.data.k.k[i].s, this.data.p)) {
        return false;
      }
      i += 1;
    }
  } else if (!this.comparePoints(this.data.k.k, this.data.p)) {
    return false;
  }
  return true;
};

GradientProperty.prototype.getValue = function (forceRender) {
  this.prop.getValue();
  this._mdf = false;
  this._cmdf = false;
  this._omdf = false;
  if (this.prop._mdf || forceRender) {
    var i;
    var len = this.data.p * 4;
    var mult;
    var val;
    for (i = 0; i < len; i += 1) {
      mult = i % 4 === 0 ? 100 : 255;
      val = Math.round(this.prop.v[i] * mult);
      if (this.c[i] !== val) {
        this.c[i] = val;
        this._cmdf = !forceRender;
      }
    }
    if (this.o.length) {
      len = this.prop.v.length;
      for (i = this.data.p * 4; i < len; i += 1) {
        mult = i % 2 === 0 ? 100 : 1;
        val = i % 2 === 0 ? Math.round(this.prop.v[i] * 100) : this.prop.v[i];
        if (this.o[i - this.data.p * 4] !== val) {
          this.o[i - this.data.p * 4] = val;
          this._omdf = !forceRender;
        }
      }
    }
    this._mdf = !forceRender;
  }
};

extendPrototype([DynamicPropertyContainer], GradientProperty);

/* exported buildShapeString */

var buildShapeString = function (pathNodes, length, closed, mat) {
  if (length === 0) {
    return '';
  }
  var _o = pathNodes.o;
  var _i = pathNodes.i;
  var _v = pathNodes.v;
  var i;
  var shapeString = ' M' + mat.applyToPointStringified(_v[0][0], _v[0][1]);
  for (i = 1; i < length; i += 1) {
    shapeString += ' C' + mat.applyToPointStringified(_o[i - 1][0], _o[i - 1][1]) + ' ' + mat.applyToPointStringified(_i[i][0], _i[i][1]) + ' ' + mat.applyToPointStringified(_v[i][0], _v[i][1]);
  }
  if (closed && length) {
    shapeString += ' C' + mat.applyToPointStringified(_o[i - 1][0], _o[i - 1][1]) + ' ' + mat.applyToPointStringified(_i[0][0], _i[0][1]) + ' ' + mat.applyToPointStringified(_v[0][0], _v[0][1]);
    shapeString += 'z';
  }
  return shapeString;
};

/* global Howl */
/* exported audioControllerFactory */

var audioControllerFactory = (function () {
  function AudioController(audioFactory) {
    this.audios = [];
    this.audioFactory = audioFactory;
    this._volume = 1;
    this._isMuted = false;
  }

  AudioController.prototype = {
    addAudio: function (audio) {
      this.audios.push(audio);
    },
    pause: function () {
      var i;
      var len = this.audios.length;
      for (i = 0; i < len; i += 1) {
        this.audios[i].pause();
      }
    },
    resume: function () {
      var i;
      var len = this.audios.length;
      for (i = 0; i < len; i += 1) {
        this.audios[i].resume();
      }
    },
    setRate: function (rateValue) {
      var i;
      var len = this.audios.length;
      for (i = 0; i < len; i += 1) {
        this.audios[i].setRate(rateValue);
      }
    },
    createAudio: function (assetPath) {
      if (this.audioFactory) {
        return this.audioFactory(assetPath);
      } if (Howl) {
        return new Howl({
          src: [assetPath],
        });
      }
      return {
        isPlaying: false,
        play: function () { this.isPlaying = true; },
        seek: function () { this.isPlaying = false; },
        playing: function () {},
        rate: function () {},
        setVolume: function () {},
      };
    },
    setAudioFactory: function (audioFactory) {
      this.audioFactory = audioFactory;
    },
    setVolume: function (value) {
      this._volume = value;
      this._updateVolume();
    },
    mute: function () {
      this._isMuted = true;
      this._updateVolume();
    },
    unmute: function () {
      this._isMuted = false;
      this._updateVolume();
    },
    getVolume: function () {
      return this._volume;
    },
    _updateVolume: function () {
      var i;
      var len = this.audios.length;
      for (i = 0; i < len; i += 1) {
        this.audios[i].volume(this._volume * (this._isMuted ? 0 : 1));
      }
    },
  };

  return function () {
    return new AudioController();
  };
}());

/* global createTag, createNS, isSafari, dataManager */
/* exported ImagePreloader */

var ImagePreloader = (function () {
  var proxyImage = (function () {
    var canvas = createTag('canvas');
    canvas.width = 1;
    canvas.height = 1;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, 1, 1);
    return canvas;
  }());

  function imageLoaded() {
    this.loadedAssets += 1;
    if (this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages) {
      if (this.imagesLoadedCb) {
        this.imagesLoadedCb(null);
      }
    }
  }
  function footageLoaded() {
    this.loadedFootagesCount += 1;
    if (this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages) {
      if (this.imagesLoadedCb) {
        this.imagesLoadedCb(null);
      }
    }
  }

  function getAssetsPath(assetData, assetsPath, originalPath) {
    var path = '';
    if (assetData.e) {
      path = assetData.p;
    } else if (assetsPath) {
      var imagePath = assetData.p;
      if (imagePath.indexOf('images/') !== -1) {
        imagePath = imagePath.split('/')[1];
      }
      path = assetsPath + imagePath;
    } else {
      path = originalPath;
      path += assetData.u ? assetData.u : '';
      path += assetData.p;
    }
    return path;
  }

  function testImageLoaded(img) {
    var _count = 0;
    var intervalId = setInterval(function () {
      var box = img.getBBox();
      if (box.width || _count > 500) {
        this._imageLoaded();
        clearInterval(intervalId);
      }
      _count += 1;
    }.bind(this), 50);
  }

  function createImageData(assetData) {
    var path = getAssetsPath(assetData, this.assetsPath, this.path);
    var img = createNS('image');
    if (isSafari) {
      this.testImageLoaded(img);
    } else {
      img.addEventListener('load', this._imageLoaded, false);
    }
    img.addEventListener('error', function () {
      ob.img = proxyImage;
      this._imageLoaded();
    }.bind(this), false);
    img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', path);
    if (this._elementHelper.append) {
      this._elementHelper.append(img);
    } else {
      this._elementHelper.appendChild(img);
    }
    var ob = {
      img: img,
      assetData: assetData,
    };
    return ob;
  }

  function createImgData(assetData) {
    var path = getAssetsPath(assetData, this.assetsPath, this.path);
    var img = createTag('img');
    img.crossOrigin = 'anonymous';
    img.addEventListener('load', this._imageLoaded, false);
    img.addEventListener('error', function () {
      ob.img = proxyImage;
      this._imageLoaded();
    }.bind(this), false);
    img.src = path;
    var ob = {
      img: img,
      assetData: assetData,
    };
    return ob;
  }

  function createFootageData(data) {
    var ob = {
      assetData: data,
    };
    var path = getAssetsPath(data, this.assetsPath, this.path);
    dataManager.loadData(path, function (footageData) {
      ob.img = footageData;
      this._footageLoaded();
    }.bind(this), function () {
      ob.img = {};
      this._footageLoaded();
    }.bind(this));
    return ob;
  }

  function loadAssets(assets, cb) {
    this.imagesLoadedCb = cb;
    var i;
    var len = assets.length;
    for (i = 0; i < len; i += 1) {
      if (!assets[i].layers) {
        if (!assets[i].t || assets[i].t === 'seq') {
          this.totalImages += 1;
          this.images.push(this._createImageData(assets[i]));
        } else if (assets[i].t === 3) {
          this.totalFootages += 1;
          this.images.push(this.createFootageData(assets[i]));
        }
      }
    }
  }

  function setPath(path) {
    this.path = path || '';
  }

  function setAssetsPath(path) {
    this.assetsPath = path || '';
  }

  function getAsset(assetData) {
    var i = 0;
    var len = this.images.length;
    while (i < len) {
      if (this.images[i].assetData === assetData) {
        return this.images[i].img;
      }
      i += 1;
    }
    return null;
  }

  function destroy() {
    this.imagesLoadedCb = null;
    this.images.length = 0;
  }

  function loadedImages() {
    return this.totalImages === this.loadedAssets;
  }

  function loadedFootages() {
    return this.totalFootages === this.loadedFootagesCount;
  }

  function setCacheType(type, elementHelper) {
    if (type === 'svg') {
      this._elementHelper = elementHelper;
      this._createImageData = this.createImageData.bind(this);
    } else {
      this._createImageData = this.createImgData.bind(this);
    }
  }

  function ImagePreloaderFactory() {
    this._imageLoaded = imageLoaded.bind(this);
    this._footageLoaded = footageLoaded.bind(this);
    this.testImageLoaded = testImageLoaded.bind(this);
    this.createFootageData = createFootageData.bind(this);
    this.assetsPath = '';
    this.path = '';
    this.totalImages = 0;
    this.totalFootages = 0;
    this.loadedAssets = 0;
    this.loadedFootagesCount = 0;
    this.imagesLoadedCb = null;
    this.images = [];
  }

  ImagePreloaderFactory.prototype = {
    loadAssets: loadAssets,
    setAssetsPath: setAssetsPath,
    setPath: setPath,
    loadedImages: loadedImages,
    loadedFootages: loadedFootages,
    destroy: destroy,
    getAsset: getAsset,
    createImgData: createImgData,
    createImageData: createImageData,
    imageLoaded: imageLoaded,
    footageLoaded: footageLoaded,
    setCacheType: setCacheType,
  };

  return ImagePreloaderFactory;
}());

/* exported featureSupport */

var featureSupport = (function () {
  var ob = {
    maskType: true,
  };
  if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
    ob.maskType = false;
  }
  return ob;
}());

/* global createNS */
/* exported filtersFactory */

var filtersFactory = (function () {
  var ob = {};
  ob.createFilter = createFilter;
  ob.createAlphaToLuminanceFilter = createAlphaToLuminanceFilter;

  function createFilter(filId, skipCoordinates) {
    var fil = createNS('filter');
    fil.setAttribute('id', filId);
    if (skipCoordinates !== true) {
      fil.setAttribute('filterUnits', 'objectBoundingBox');
      fil.setAttribute('x', '0%');
      fil.setAttribute('y', '0%');
      fil.setAttribute('width', '100%');
      fil.setAttribute('height', '100%');
    }
    return fil;
  }

  function createAlphaToLuminanceFilter() {
    var feColorMatrix = createNS('feColorMatrix');
    feColorMatrix.setAttribute('type', 'matrix');
    feColorMatrix.setAttribute('color-interpolation-filters', 'sRGB');
    feColorMatrix.setAttribute('values', '0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1');
    return feColorMatrix;
  }

  return ob;
}());

/* global createSizedArray, PropertyFactory, TextAnimatorDataProperty, bez, addHueToRGB,
  addSaturationToRGB, addBrightnessToRGB, LetterProps, Matrix, extendPrototype, DynamicPropertyContainer */

function TextAnimatorProperty(textData, renderType, elem) {
  this._isFirstFrame = true;
  this._hasMaskedPath = false;
  this._frameId = -1;
  this._textData = textData;
  this._renderType = renderType;
  this._elem = elem;
  this._animatorsData = createSizedArray(this._textData.a.length);
  this._pathData = {};
  this._moreOptions = {
    alignment: {},
  };
  this.renderedLetters = [];
  this.lettersChangedFlag = false;
  this.initDynamicPropertyContainer(elem);
}

TextAnimatorProperty.prototype.searchProperties = function () {
  var i;
  var len = this._textData.a.length;
  var animatorProps;
  var getProp = PropertyFactory.getProp;
  for (i = 0; i < len; i += 1) {
    animatorProps = this._textData.a[i];
    this._animatorsData[i] = new TextAnimatorDataProperty(this._elem, animatorProps, this);
  }
  if (this._textData.p && 'm' in this._textData.p) {
    this._pathData = {
      a: getProp(this._elem, this._textData.p.a, 0, 0, this),
      f: getProp(this._elem, this._textData.p.f, 0, 0, this),
      l: getProp(this._elem, this._textData.p.l, 0, 0, this),
      r: getProp(this._elem, this._textData.p.r, 0, 0, this),
      p: getProp(this._elem, this._textData.p.p, 0, 0, this),
      m: this._elem.maskManager.getMaskProperty(this._textData.p.m),
    };
    this._hasMaskedPath = true;
  } else {
    this._hasMaskedPath = false;
  }
  this._moreOptions.alignment = getProp(this._elem, this._textData.m.a, 1, 0, this);
};

TextAnimatorProperty.prototype.getMeasures = function (documentData, lettersChangedFlag) {
  this.lettersChangedFlag = lettersChangedFlag;
  if (!this._mdf && !this._isFirstFrame && !lettersChangedFlag && (!this._hasMaskedPath || !this._pathData.m._mdf)) {
    return;
  }
  this._isFirstFrame = false;
  var alignment = this._moreOptions.alignment.v;
  var animators = this._animatorsData;
  var textData = this._textData;
  var matrixHelper = this.mHelper;
  var renderType = this._renderType;
  var renderedLettersCount = this.renderedLetters.length;
  var xPos;
  var yPos;
  var i;
  var len;
  var letters = documentData.l;
  var pathInfo;
  var currentLength;
  var currentPoint;
  var segmentLength;
  var flag;
  var pointInd;
  var segmentInd;
  var prevPoint;
  var points;
  var segments;
  var partialLength;
  var totalLength;
  var perc;
  var tanAngle;
  var mask;
  if (this._hasMaskedPath) {
    mask = this._pathData.m;
    if (!this._pathData.n || this._pathData._mdf) {
      var paths = mask.v;
      if (this._pathData.r.v) {
        paths = paths.reverse();
      }
      // TODO: release bezier data cached from previous pathInfo: this._pathData.pi
      pathInfo = {
        tLength: 0,
        segments: [],
      };
      len = paths._length - 1;
      var bezierData;
      totalLength = 0;
      for (i = 0; i < len; i += 1) {
        bezierData = bez.buildBezierData(paths.v[i],
          paths.v[i + 1],
          [paths.o[i][0] - paths.v[i][0], paths.o[i][1] - paths.v[i][1]],
          [paths.i[i + 1][0] - paths.v[i + 1][0], paths.i[i + 1][1] - paths.v[i + 1][1]]);
        pathInfo.tLength += bezierData.segmentLength;
        pathInfo.segments.push(bezierData);
        totalLength += bezierData.segmentLength;
      }
      i = len;
      if (mask.v.c) {
        bezierData = bez.buildBezierData(paths.v[i],
          paths.v[0],
          [paths.o[i][0] - paths.v[i][0], paths.o[i][1] - paths.v[i][1]],
          [paths.i[0][0] - paths.v[0][0], paths.i[0][1] - paths.v[0][1]]);
        pathInfo.tLength += bezierData.segmentLength;
        pathInfo.segments.push(bezierData);
        totalLength += bezierData.segmentLength;
      }
      this._pathData.pi = pathInfo;
    }
    pathInfo = this._pathData.pi;

    currentLength = this._pathData.f.v;
    segmentInd = 0;
    pointInd = 1;
    segmentLength = 0;
    flag = true;
    segments = pathInfo.segments;
    if (currentLength < 0 && mask.v.c) {
      if (pathInfo.tLength < Math.abs(currentLength)) {
        currentLength = -Math.abs(currentLength) % pathInfo.tLength;
      }
      segmentInd = segments.length - 1;
      points = segments[segmentInd].points;
      pointInd = points.length - 1;
      while (currentLength < 0) {
        currentLength += points[pointInd].partialLength;
        pointInd -= 1;
        if (pointInd < 0) {
          segmentInd -= 1;
          points = segments[segmentInd].points;
          pointInd = points.length - 1;
        }
      }
    }
    points = segments[segmentInd].points;
    prevPoint = points[pointInd - 1];
    currentPoint = points[pointInd];
    partialLength = currentPoint.partialLength;
  }

  len = letters.length;
  xPos = 0;
  yPos = 0;
  var yOff = documentData.finalSize * 1.2 * 0.714;
  var firstLine = true;
  var animatorProps;
  var animatorSelector;
  var j;
  var jLen;
  var letterValue;

  jLen = animators.length;

  var mult;
  var ind = -1;
  var offf;
  var xPathPos;
  var yPathPos;
  var initPathPos = currentLength;
  var initSegmentInd = segmentInd;
  var initPointInd = pointInd;
  var currentLine = -1;
  var elemOpacity;
  var sc;
  var sw;
  var fc;
  var k;
  var letterSw;
  var letterSc;
  var letterFc;
  var letterM = '';
  var letterP = this.defaultPropsArray;
  var letterO;

  //
  if (documentData.j === 2 || documentData.j === 1) {
    var animatorJustifyOffset = 0;
    var animatorFirstCharOffset = 0;
    var justifyOffsetMult = documentData.j === 2 ? -0.5 : -1;
    var lastIndex = 0;
    var isNewLine = true;

    for (i = 0; i < len; i += 1) {
      if (letters[i].n) {
        if (animatorJustifyOffset) {
          animatorJustifyOffset += animatorFirstCharOffset;
        }
        while (lastIndex < i) {
          letters[lastIndex].animatorJustifyOffset = animatorJustifyOffset;
          lastIndex += 1;
        }
        animatorJustifyOffset = 0;
        isNewLine = true;
      } else {
        for (j = 0; j < jLen; j += 1) {
          animatorProps = animators[j].a;
          if (animatorProps.t.propType) {
            if (isNewLine && documentData.j === 2) {
              animatorFirstCharOffset += animatorProps.t.v * justifyOffsetMult;
            }
            animatorSelector = animators[j].s;
            mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
            if (mult.length) {
              animatorJustifyOffset += animatorProps.t.v * mult[0] * justifyOffsetMult;
            } else {
              animatorJustifyOffset += animatorProps.t.v * mult * justifyOffsetMult;
            }
          }
        }
        isNewLine = false;
      }
    }
    if (animatorJustifyOffset) {
      animatorJustifyOffset += animatorFirstCharOffset;
    }
    while (lastIndex < i) {
      letters[lastIndex].animatorJustifyOffset = animatorJustifyOffset;
      lastIndex += 1;
    }
  }
  //

  for (i = 0; i < len; i += 1) {
    matrixHelper.reset();
    elemOpacity = 1;
    if (letters[i].n) {
      xPos = 0;
      yPos += documentData.yOffset;
      yPos += firstLine ? 1 : 0;
      currentLength = initPathPos;
      firstLine = false;
      if (this._hasMaskedPath) {
        segmentInd = initSegmentInd;
        pointInd = initPointInd;
        points = segments[segmentInd].points;
        prevPoint = points[pointInd - 1];
        currentPoint = points[pointInd];
        partialLength = currentPoint.partialLength;
        segmentLength = 0;
      }
      letterM = '';
      letterFc = '';
      letterSw = '';
      letterO = '';
      letterP = this.defaultPropsArray;
    } else {
      if (this._hasMaskedPath) {
        if (currentLine !== letters[i].line) {
          switch (documentData.j) {
            case 1:
              currentLength += totalLength - documentData.lineWidths[letters[i].line];
              break;
            case 2:
              currentLength += (totalLength - documentData.lineWidths[letters[i].line]) / 2;
              break;
            default:
              break;
          }
          currentLine = letters[i].line;
        }
        if (ind !== letters[i].ind) {
          if (letters[ind]) {
            currentLength += letters[ind].extra;
          }
          currentLength += letters[i].an / 2;
          ind = letters[i].ind;
        }
        currentLength += (alignment[0] * letters[i].an) * 0.005;
        var animatorOffset = 0;
        for (j = 0; j < jLen; j += 1) {
          animatorProps = animators[j].a;
          if (animatorProps.p.propType) {
            animatorSelector = animators[j].s;
            mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
            if (mult.length) {
              animatorOffset += animatorProps.p.v[0] * mult[0];
            } else {
              animatorOffset += animatorProps.p.v[0] * mult;
            }
          }
          if (animatorProps.a.propType) {
            animatorSelector = animators[j].s;
            mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
            if (mult.length) {
              animatorOffset += animatorProps.a.v[0] * mult[0];
            } else {
              animatorOffset += animatorProps.a.v[0] * mult;
            }
          }
        }
        flag = true;
        // Force alignment only works with a single line for now
        if (this._pathData.a.v) {
          currentLength = letters[0].an * 0.5 + ((totalLength - this._pathData.f.v - letters[0].an * 0.5 - letters[letters.length - 1].an * 0.5) * ind) / (len - 1);
          currentLength += this._pathData.f.v;
        }
        while (flag) {
          if (segmentLength + partialLength >= currentLength + animatorOffset || !points) {
            perc = (currentLength + animatorOffset - segmentLength) / currentPoint.partialLength;
            xPathPos = prevPoint.point[0] + (currentPoint.point[0] - prevPoint.point[0]) * perc;
            yPathPos = prevPoint.point[1] + (currentPoint.point[1] - prevPoint.point[1]) * perc;
            matrixHelper.translate((-alignment[0] * letters[i].an) * 0.005, -(alignment[1] * yOff) * 0.01);
            flag = false;
          } else if (points) {
            segmentLength += currentPoint.partialLength;
            pointInd += 1;
            if (pointInd >= points.length) {
              pointInd = 0;
              segmentInd += 1;
              if (!segments[segmentInd]) {
                if (mask.v.c) {
                  pointInd = 0;
                  segmentInd = 0;
                  points = segments[segmentInd].points;
                } else {
                  segmentLength -= currentPoint.partialLength;
                  points = null;
                }
              } else {
                points = segments[segmentInd].points;
              }
            }
            if (points) {
              prevPoint = currentPoint;
              currentPoint = points[pointInd];
              partialLength = currentPoint.partialLength;
            }
          }
        }
        offf = letters[i].an / 2 - letters[i].add;
        matrixHelper.translate(-offf, 0, 0);
      } else {
        offf = letters[i].an / 2 - letters[i].add;
        matrixHelper.translate(-offf, 0, 0);

        // Grouping alignment
        matrixHelper.translate((-alignment[0] * letters[i].an) * 0.005, (-alignment[1] * yOff) * 0.01, 0);
      }

      for (j = 0; j < jLen; j += 1) {
        animatorProps = animators[j].a;
        if (animatorProps.t.propType) {
          animatorSelector = animators[j].s;
          mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
          // This condition is to prevent applying tracking to first character in each line. Might be better to use a boolean "isNewLine"
          if (xPos !== 0 || documentData.j !== 0) {
            if (this._hasMaskedPath) {
              if (mult.length) {
                currentLength += animatorProps.t.v * mult[0];
              } else {
                currentLength += animatorProps.t.v * mult;
              }
            } else if (mult.length) {
              xPos += animatorProps.t.v * mult[0];
            } else {
              xPos += animatorProps.t.v * mult;
            }
          }
        }
      }
      if (documentData.strokeWidthAnim) {
        sw = documentData.sw || 0;
      }
      if (documentData.strokeColorAnim) {
        if (documentData.sc) {
          sc = [documentData.sc[0], documentData.sc[1], documentData.sc[2]];
        } else {
          sc = [0, 0, 0];
        }
      }
      if (documentData.fillColorAnim && documentData.fc) {
        fc = [documentData.fc[0], documentData.fc[1], documentData.fc[2]];
      }
      for (j = 0; j < jLen; j += 1) {
        animatorProps = animators[j].a;
        if (animatorProps.a.propType) {
          animatorSelector = animators[j].s;
          mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);

          if (mult.length) {
            matrixHelper.translate(-animatorProps.a.v[0] * mult[0], -animatorProps.a.v[1] * mult[1], animatorProps.a.v[2] * mult[2]);
          } else {
            matrixHelper.translate(-animatorProps.a.v[0] * mult, -animatorProps.a.v[1] * mult, animatorProps.a.v[2] * mult);
          }
        }
      }
      for (j = 0; j < jLen; j += 1) {
        animatorProps = animators[j].a;
        if (animatorProps.s.propType) {
          animatorSelector = animators[j].s;
          mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
          if (mult.length) {
            matrixHelper.scale(1 + ((animatorProps.s.v[0] - 1) * mult[0]), 1 + ((animatorProps.s.v[1] - 1) * mult[1]), 1);
          } else {
            matrixHelper.scale(1 + ((animatorProps.s.v[0] - 1) * mult), 1 + ((animatorProps.s.v[1] - 1) * mult), 1);
          }
        }
      }
      for (j = 0; j < jLen; j += 1) {
        animatorProps = animators[j].a;
        animatorSelector = animators[j].s;
        mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
        if (animatorProps.sk.propType) {
          if (mult.length) {
            matrixHelper.skewFromAxis(-animatorProps.sk.v * mult[0], animatorProps.sa.v * mult[1]);
          } else {
            matrixHelper.skewFromAxis(-animatorProps.sk.v * mult, animatorProps.sa.v * mult);
          }
        }
        if (animatorProps.r.propType) {
          if (mult.length) {
            matrixHelper.rotateZ(-animatorProps.r.v * mult[2]);
          } else {
            matrixHelper.rotateZ(-animatorProps.r.v * mult);
          }
        }
        if (animatorProps.ry.propType) {
          if (mult.length) {
            matrixHelper.rotateY(animatorProps.ry.v * mult[1]);
          } else {
            matrixHelper.rotateY(animatorProps.ry.v * mult);
          }
        }
        if (animatorProps.rx.propType) {
          if (mult.length) {
            matrixHelper.rotateX(animatorProps.rx.v * mult[0]);
          } else {
            matrixHelper.rotateX(animatorProps.rx.v * mult);
          }
        }
        if (animatorProps.o.propType) {
          if (mult.length) {
            elemOpacity += ((animatorProps.o.v) * mult[0] - elemOpacity) * mult[0];
          } else {
            elemOpacity += ((animatorProps.o.v) * mult - elemOpacity) * mult;
          }
        }
        if (documentData.strokeWidthAnim && animatorProps.sw.propType) {
          if (mult.length) {
            sw += animatorProps.sw.v * mult[0];
          } else {
            sw += animatorProps.sw.v * mult;
          }
        }
        if (documentData.strokeColorAnim && animatorProps.sc.propType) {
          for (k = 0; k < 3; k += 1) {
            if (mult.length) {
              sc[k] += (animatorProps.sc.v[k] - sc[k]) * mult[0];
            } else {
              sc[k] += (animatorProps.sc.v[k] - sc[k]) * mult;
            }
          }
        }
        if (documentData.fillColorAnim && documentData.fc) {
          if (animatorProps.fc.propType) {
            for (k = 0; k < 3; k += 1) {
              if (mult.length) {
                fc[k] += (animatorProps.fc.v[k] - fc[k]) * mult[0];
              } else {
                fc[k] += (animatorProps.fc.v[k] - fc[k]) * mult;
              }
            }
          }
          if (animatorProps.fh.propType) {
            if (mult.length) {
              fc = addHueToRGB(fc, animatorProps.fh.v * mult[0]);
            } else {
              fc = addHueToRGB(fc, animatorProps.fh.v * mult);
            }
          }
          if (animatorProps.fs.propType) {
            if (mult.length) {
              fc = addSaturationToRGB(fc, animatorProps.fs.v * mult[0]);
            } else {
              fc = addSaturationToRGB(fc, animatorProps.fs.v * mult);
            }
          }
          if (animatorProps.fb.propType) {
            if (mult.length) {
              fc = addBrightnessToRGB(fc, animatorProps.fb.v * mult[0]);
            } else {
              fc = addBrightnessToRGB(fc, animatorProps.fb.v * mult);
            }
          }
        }
      }

      for (j = 0; j < jLen; j += 1) {
        animatorProps = animators[j].a;

        if (animatorProps.p.propType) {
          animatorSelector = animators[j].s;
          mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
          if (this._hasMaskedPath) {
            if (mult.length) {
              matrixHelper.translate(0, animatorProps.p.v[1] * mult[0], -animatorProps.p.v[2] * mult[1]);
            } else {
              matrixHelper.translate(0, animatorProps.p.v[1] * mult, -animatorProps.p.v[2] * mult);
            }
          } else if (mult.length) {
            matrixHelper.translate(animatorProps.p.v[0] * mult[0], animatorProps.p.v[1] * mult[1], -animatorProps.p.v[2] * mult[2]);
          } else {
            matrixHelper.translate(animatorProps.p.v[0] * mult, animatorProps.p.v[1] * mult, -animatorProps.p.v[2] * mult);
          }
        }
      }
      if (documentData.strokeWidthAnim) {
        letterSw = sw < 0 ? 0 : sw;
      }
      if (documentData.strokeColorAnim) {
        letterSc = 'rgb(' + Math.round(sc[0] * 255) + ',' + Math.round(sc[1] * 255) + ',' + Math.round(sc[2] * 255) + ')';
      }
      if (documentData.fillColorAnim && documentData.fc) {
        letterFc = 'rgb(' + Math.round(fc[0] * 255) + ',' + Math.round(fc[1] * 255) + ',' + Math.round(fc[2] * 255) + ')';
      }

      if (this._hasMaskedPath) {
        matrixHelper.translate(0, -documentData.ls);

        matrixHelper.translate(0, (alignment[1] * yOff) * 0.01 + yPos, 0);
        if (this._pathData.p.v) {
          tanAngle = (currentPoint.point[1] - prevPoint.point[1]) / (currentPoint.point[0] - prevPoint.point[0]);
          var rot = (Math.atan(tanAngle) * 180) / Math.PI;
          if (currentPoint.point[0] < prevPoint.point[0]) {
            rot += 180;
          }
          matrixHelper.rotate((-rot * Math.PI) / 180);
        }
        matrixHelper.translate(xPathPos, yPathPos, 0);
        currentLength -= (alignment[0] * letters[i].an) * 0.005;
        if (letters[i + 1] && ind !== letters[i + 1].ind) {
          currentLength += letters[i].an / 2;
          currentLength += (documentData.tr * 0.001) * documentData.finalSize;
        }
      } else {
        matrixHelper.translate(xPos, yPos, 0);

        if (documentData.ps) {
          // matrixHelper.translate(documentData.ps[0],documentData.ps[1],0);
          matrixHelper.translate(documentData.ps[0], documentData.ps[1] + documentData.ascent, 0);
        }
        switch (documentData.j) {
          case 1:
            matrixHelper.translate(letters[i].animatorJustifyOffset + documentData.justifyOffset + (documentData.boxWidth - documentData.lineWidths[letters[i].line]), 0, 0);
            break;
          case 2:
            matrixHelper.translate(letters[i].animatorJustifyOffset + documentData.justifyOffset + (documentData.boxWidth - documentData.lineWidths[letters[i].line]) / 2, 0, 0);
            break;
          default:
            break;
        }
        matrixHelper.translate(0, -documentData.ls);
        matrixHelper.translate(offf, 0, 0);
        matrixHelper.translate((alignment[0] * letters[i].an) * 0.005, (alignment[1] * yOff) * 0.01, 0);
        xPos += letters[i].l + (documentData.tr * 0.001) * documentData.finalSize;
      }
      if (renderType === 'html') {
        letterM = matrixHelper.toCSS();
      } else if (renderType === 'svg') {
        letterM = matrixHelper.to2dCSS();
      } else {
        letterP = [matrixHelper.props[0], matrixHelper.props[1], matrixHelper.props[2], matrixHelper.props[3], matrixHelper.props[4], matrixHelper.props[5], matrixHelper.props[6], matrixHelper.props[7], matrixHelper.props[8], matrixHelper.props[9], matrixHelper.props[10], matrixHelper.props[11], matrixHelper.props[12], matrixHelper.props[13], matrixHelper.props[14], matrixHelper.props[15]];
      }
      letterO = elemOpacity;
    }

    if (renderedLettersCount <= i) {
      letterValue = new LetterProps(letterO, letterSw, letterSc, letterFc, letterM, letterP);
      this.renderedLetters.push(letterValue);
      renderedLettersCount += 1;
      this.lettersChangedFlag = true;
    } else {
      letterValue = this.renderedLetters[i];
      this.lettersChangedFlag = letterValue.update(letterO, letterSw, letterSc, letterFc, letterM, letterP) || this.lettersChangedFlag;
    }
  }
};

TextAnimatorProperty.prototype.getValue = function () {
  if (this._elem.globalData.frameId === this._frameId) {
    return;
  }
  this._frameId = this._elem.globalData.frameId;
  this.iterateDynamicProperties();
};

TextAnimatorProperty.prototype.mHelper = new Matrix();
TextAnimatorProperty.prototype.defaultPropsArray = [];
extendPrototype([DynamicPropertyContainer], TextAnimatorProperty);

/* global PropertyFactory, degToRads, TextSelectorProp */
/* exported TextAnimatorDataProperty */

function TextAnimatorDataProperty(elem, animatorProps, container) {
  var defaultData = { propType: false };
  var getProp = PropertyFactory.getProp;
  var textAnimatorAnimatables = animatorProps.a;
  this.a = {
    r: textAnimatorAnimatables.r ? getProp(elem, textAnimatorAnimatables.r, 0, degToRads, container) : defaultData,
    rx: textAnimatorAnimatables.rx ? getProp(elem, textAnimatorAnimatables.rx, 0, degToRads, container) : defaultData,
    ry: textAnimatorAnimatables.ry ? getProp(elem, textAnimatorAnimatables.ry, 0, degToRads, container) : defaultData,
    sk: textAnimatorAnimatables.sk ? getProp(elem, textAnimatorAnimatables.sk, 0, degToRads, container) : defaultData,
    sa: textAnimatorAnimatables.sa ? getProp(elem, textAnimatorAnimatables.sa, 0, degToRads, container) : defaultData,
    s: textAnimatorAnimatables.s ? getProp(elem, textAnimatorAnimatables.s, 1, 0.01, container) : defaultData,
    a: textAnimatorAnimatables.a ? getProp(elem, textAnimatorAnimatables.a, 1, 0, container) : defaultData,
    o: textAnimatorAnimatables.o ? getProp(elem, textAnimatorAnimatables.o, 0, 0.01, container) : defaultData,
    p: textAnimatorAnimatables.p ? getProp(elem, textAnimatorAnimatables.p, 1, 0, container) : defaultData,
    sw: textAnimatorAnimatables.sw ? getProp(elem, textAnimatorAnimatables.sw, 0, 0, container) : defaultData,
    sc: textAnimatorAnimatables.sc ? getProp(elem, textAnimatorAnimatables.sc, 1, 0, container) : defaultData,
    fc: textAnimatorAnimatables.fc ? getProp(elem, textAnimatorAnimatables.fc, 1, 0, container) : defaultData,
    fh: textAnimatorAnimatables.fh ? getProp(elem, textAnimatorAnimatables.fh, 0, 0, container) : defaultData,
    fs: textAnimatorAnimatables.fs ? getProp(elem, textAnimatorAnimatables.fs, 0, 0.01, container) : defaultData,
    fb: textAnimatorAnimatables.fb ? getProp(elem, textAnimatorAnimatables.fb, 0, 0.01, container) : defaultData,
    t: textAnimatorAnimatables.t ? getProp(elem, textAnimatorAnimatables.t, 0, 0, container) : defaultData,
  };

  this.s = TextSelectorProp.getTextSelectorProp(elem, animatorProps.s, container);
  this.s.t = animatorProps.s.t;
}

function LetterProps(o, sw, sc, fc, m, p) {
  this.o = o;
  this.sw = sw;
  this.sc = sc;
  this.fc = fc;
  this.m = m;
  this.p = p;
  this._mdf = {
    o: true,
    sw: !!sw,
    sc: !!sc,
    fc: !!fc,
    m: true,
    p: true,
  };
}

LetterProps.prototype.update = function (o, sw, sc, fc, m, p) {
  this._mdf.o = false;
  this._mdf.sw = false;
  this._mdf.sc = false;
  this._mdf.fc = false;
  this._mdf.m = false;
  this._mdf.p = false;
  var updated = false;

  if (this.o !== o) {
    this.o = o;
    this._mdf.o = true;
    updated = true;
  }
  if (this.sw !== sw) {
    this.sw = sw;
    this._mdf.sw = true;
    updated = true;
  }
  if (this.sc !== sc) {
    this.sc = sc;
    this._mdf.sc = true;
    updated = true;
  }
  if (this.fc !== fc) {
    this.fc = fc;
    this._mdf.fc = true;
    updated = true;
  }
  if (this.m !== m) {
    this.m = m;
    this._mdf.m = true;
    updated = true;
  }
  if (p.length && (this.p[0] !== p[0] || this.p[1] !== p[1] || this.p[4] !== p[4] || this.p[5] !== p[5] || this.p[12] !== p[12] || this.p[13] !== p[13])) {
    this.p = p;
    this._mdf.p = true;
    updated = true;
  }
  return updated;
};

/* global FontManager, initialDefaultFrame, getFontProperties */
/* exported TextProperty */

function TextProperty(elem, data) {
  this._frameId = initialDefaultFrame;
  this.pv = '';
  this.v = '';
  this.kf = false;
  this._isFirstFrame = true;
  this._mdf = false;
  this.data = data;
  this.elem = elem;
  this.comp = this.elem.comp;
  this.keysIndex = 0;
  this.canResize = false;
  this.minimumFontSize = 1;
  this.effectsSequence = [];
  this.currentData = {
    ascent: 0,
    boxWidth: this.defaultBoxWidth,
    f: '',
    fStyle: '',
    fWeight: '',
    fc: '',
    j: '',
    justifyOffset: '',
    l: [],
    lh: 0,
    lineWidths: [],
    ls: '',
    of: '',
    s: '',
    sc: '',
    sw: 0,
    t: 0,
    tr: 0,
    sz: 0,
    ps: null,
    fillColorAnim: false,
    strokeColorAnim: false,
    strokeWidthAnim: false,
    yOffset: 0,
    finalSize: 0,
    finalText: [],
    finalLineHeight: 0,
    __complete: false,

  };
  this.copyData(this.currentData, this.data.d.k[0].s);

  if (!this.searchProperty()) {
    this.completeTextData(this.currentData);
  }
}

TextProperty.prototype.defaultBoxWidth = [0, 0];

TextProperty.prototype.copyData = function (obj, data) {
  for (var s in data) {
    if (Object.prototype.hasOwnProperty.call(data, s)) {
      obj[s] = data[s];
    }
  }
  return obj;
};

TextProperty.prototype.setCurrentData = function (data) {
  if (!data.__complete) {
    this.completeTextData(data);
  }
  this.currentData = data;
  this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth;
  this._mdf = true;
};

TextProperty.prototype.searchProperty = function () {
  return this.searchKeyframes();
};

TextProperty.prototype.searchKeyframes = function () {
  this.kf = this.data.d.k.length > 1;
  if (this.kf) {
    this.addEffect(this.getKeyframeValue.bind(this));
  }
  return this.kf;
};

TextProperty.prototype.addEffect = function (effectFunction) {
  this.effectsSequence.push(effectFunction);
  this.elem.addDynamicProperty(this);
};

TextProperty.prototype.getValue = function (_finalValue) {
  if ((this.elem.globalData.frameId === this.frameId || !this.effectsSequence.length) && !_finalValue) {
    return;
  }
  this.currentData.t = this.data.d.k[this.keysIndex].s.t;
  var currentValue = this.currentData;
  var currentIndex = this.keysIndex;
  if (this.lock) {
    this.setCurrentData(this.currentData);
    return;
  }
  this.lock = true;
  this._mdf = false;
  var i; var
    len = this.effectsSequence.length;
  var finalValue = _finalValue || this.data.d.k[this.keysIndex].s;
  for (i = 0; i < len; i += 1) {
    // Checking if index changed to prevent creating a new object every time the expression updates.
    if (currentIndex !== this.keysIndex) {
      finalValue = this.effectsSequence[i](finalValue, finalValue.t);
    } else {
      finalValue = this.effectsSequence[i](this.currentData, finalValue.t);
    }
  }
  if (currentValue !== finalValue) {
    this.setCurrentData(finalValue);
  }
  this.v = this.currentData;
  this.pv = this.v;
  this.lock = false;
  this.frameId = this.elem.globalData.frameId;
};

TextProperty.prototype.getKeyframeValue = function () {
  var textKeys = this.data.d.k;
  var frameNum = this.elem.comp.renderedFrame;
  var i = 0; var
    len = textKeys.length;
  while (i <= len - 1) {
    if (i === len - 1 || textKeys[i + 1].t > frameNum) {
      break;
    }
    i += 1;
  }
  if (this.keysIndex !== i) {
    this.keysIndex = i;
  }
  return this.data.d.k[this.keysIndex].s;
};

TextProperty.prototype.buildFinalText = function (text) {
  var charactersArray = [];
  var i = 0;
  var len = text.length;
  var charCode;
  var secondCharCode;
  var shouldCombine = false;
  while (i < len) {
    charCode = text.charCodeAt(i);
    if (FontManager.isCombinedCharacter(charCode)) {
      charactersArray[charactersArray.length - 1] += text.charAt(i);
    } else if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      secondCharCode = text.charCodeAt(i + 1);
      if (secondCharCode >= 0xDC00 && secondCharCode <= 0xDFFF) {
        if (shouldCombine || FontManager.isModifier(charCode, secondCharCode)) {
          charactersArray[charactersArray.length - 1] += text.substr(i, 2);
          shouldCombine = false;
        } else {
          charactersArray.push(text.substr(i, 2));
        }
        i += 1;
      } else {
        charactersArray.push(text.charAt(i));
      }
    } else if (charCode > 0xDBFF) {
      secondCharCode = text.charCodeAt(i + 1);
      if (FontManager.isZeroWidthJoiner(charCode, secondCharCode)) {
        shouldCombine = true;
        charactersArray[charactersArray.length - 1] += text.substr(i, 2);
        i += 1;
      } else {
        charactersArray.push(text.charAt(i));
      }
    } else if (FontManager.isZeroWidthJoiner(charCode)) {
      charactersArray[charactersArray.length - 1] += text.charAt(i);
      shouldCombine = true;
    } else {
      charactersArray.push(text.charAt(i));
    }
    i += 1;
  }
  return charactersArray;
};

TextProperty.prototype.completeTextData = function (documentData) {
  documentData.__complete = true;
  var fontManager = this.elem.globalData.fontManager;
  var data = this.data;
  var letters = [];
  var i; var
    len;
  var newLineFlag; var index = 0; var
    val;
  var anchorGrouping = data.m.g;
  var currentSize = 0; var currentPos = 0; var currentLine = 0; var
    lineWidths = [];
  var lineWidth = 0;
  var maxLineWidth = 0;
  var j; var
    jLen;
  var fontData = fontManager.getFontByName(documentData.f);
  var charData; var
    cLength = 0;

  var fontProps = getFontProperties(fontData);
  documentData.fWeight = fontProps.weight;
  documentData.fStyle = fontProps.style;
  documentData.finalSize = documentData.s;
  documentData.finalText = this.buildFinalText(documentData.t);
  len = documentData.finalText.length;
  documentData.finalLineHeight = documentData.lh;
  var trackingOffset = (documentData.tr / 1000) * documentData.finalSize;
  var charCode;
  if (documentData.sz) {
    var flag = true;
    var boxWidth = documentData.sz[0];
    var boxHeight = documentData.sz[1];
    var currentHeight; var
      finalText;
    while (flag) {
      finalText = this.buildFinalText(documentData.t);
      currentHeight = 0;
      lineWidth = 0;
      len = finalText.length;
      trackingOffset = (documentData.tr / 1000) * documentData.finalSize;
      var lastSpaceIndex = -1;
      for (i = 0; i < len; i += 1) {
        charCode = finalText[i].charCodeAt(0);
        newLineFlag = false;
        if (finalText[i] === ' ') {
          lastSpaceIndex = i;
        } else if (charCode === 13 || charCode === 3) {
          lineWidth = 0;
          newLineFlag = true;
          currentHeight += documentData.finalLineHeight || documentData.finalSize * 1.2;
        }
        if (fontManager.chars) {
          charData = fontManager.getCharData(finalText[i], fontData.fStyle, fontData.fFamily);
          cLength = newLineFlag ? 0 : (charData.w * documentData.finalSize) / 100;
        } else {
          // tCanvasHelper.font = documentData.s + 'px '+ fontData.fFamily;
          cLength = fontManager.measureText(finalText[i], documentData.f, documentData.finalSize);
        }
        if (lineWidth + cLength > boxWidth && finalText[i] !== ' ') {
          if (lastSpaceIndex === -1) {
            len += 1;
          } else {
            i = lastSpaceIndex;
          }
          currentHeight += documentData.finalLineHeight || documentData.finalSize * 1.2;
          finalText.splice(i, lastSpaceIndex === i ? 1 : 0, '\r');
          // finalText = finalText.substr(0,i) + "\r" + finalText.substr(i === lastSpaceIndex ? i + 1 : i);
          lastSpaceIndex = -1;
          lineWidth = 0;
        } else {
          lineWidth += cLength;
          lineWidth += trackingOffset;
        }
      }
      currentHeight += (fontData.ascent * documentData.finalSize) / 100;
      if (this.canResize && documentData.finalSize > this.minimumFontSize && boxHeight < currentHeight) {
        documentData.finalSize -= 1;
        documentData.finalLineHeight = (documentData.finalSize * documentData.lh) / documentData.s;
      } else {
        documentData.finalText = finalText;
        len = documentData.finalText.length;
        flag = false;
      }
    }
  }
  lineWidth = -trackingOffset;
  cLength = 0;
  var uncollapsedSpaces = 0;
  var currentChar;
  for (i = 0; i < len; i += 1) {
    newLineFlag = false;
    currentChar = documentData.finalText[i];
    charCode = currentChar.charCodeAt(0);
    if (charCode === 13 || charCode === 3) {
      uncollapsedSpaces = 0;
      lineWidths.push(lineWidth);
      maxLineWidth = lineWidth > maxLineWidth ? lineWidth : maxLineWidth;
      lineWidth = -2 * trackingOffset;
      val = '';
      newLineFlag = true;
      currentLine += 1;
    } else {
      val = currentChar;
    }
    if (fontManager.chars) {
      charData = fontManager.getCharData(currentChar, fontData.fStyle, fontManager.getFontByName(documentData.f).fFamily);
      cLength = newLineFlag ? 0 : (charData.w * documentData.finalSize) / 100;
    } else {
      // var charWidth = fontManager.measureText(val, documentData.f, documentData.finalSize);
      // tCanvasHelper.font = documentData.finalSize + 'px '+ fontManager.getFontByName(documentData.f).fFamily;
      cLength = fontManager.measureText(val, documentData.f, documentData.finalSize);
    }

    //
    if (currentChar === ' ') {
      uncollapsedSpaces += cLength + trackingOffset;
    } else {
      lineWidth += cLength + trackingOffset + uncollapsedSpaces;
      uncollapsedSpaces = 0;
    }
    letters.push({
      l: cLength, an: cLength, add: currentSize, n: newLineFlag, anIndexes: [], val: val, line: currentLine, animatorJustifyOffset: 0,
    });
    if (anchorGrouping == 2) { // eslint-disable-line eqeqeq
      currentSize += cLength;
      if (val === '' || val === ' ' || i === len - 1) {
        if (val === '' || val === ' ') {
          currentSize -= cLength;
        }
        while (currentPos <= i) {
          letters[currentPos].an = currentSize;
          letters[currentPos].ind = index;
          letters[currentPos].extra = cLength;
          currentPos += 1;
        }
        index += 1;
        currentSize = 0;
      }
    } else if (anchorGrouping == 3) { // eslint-disable-line eqeqeq
      currentSize += cLength;
      if (val === '' || i === len - 1) {
        if (val === '') {
          currentSize -= cLength;
        }
        while (currentPos <= i) {
          letters[currentPos].an = currentSize;
          letters[currentPos].ind = index;
          letters[currentPos].extra = cLength;
          currentPos += 1;
        }
        currentSize = 0;
        index += 1;
      }
    } else {
      letters[index].ind = index;
      letters[index].extra = 0;
      index += 1;
    }
  }
  documentData.l = letters;
  maxLineWidth = lineWidth > maxLineWidth ? lineWidth : maxLineWidth;
  lineWidths.push(lineWidth);
  if (documentData.sz) {
    documentData.boxWidth = documentData.sz[0];
    documentData.justifyOffset = 0;
  } else {
    documentData.boxWidth = maxLineWidth;
    switch (documentData.j) {
      case 1:
        documentData.justifyOffset = -documentData.boxWidth;
        break;
      case 2:
        documentData.justifyOffset = -documentData.boxWidth / 2;
        break;
      default:
        documentData.justifyOffset = 0;
    }
  }
  documentData.lineWidths = lineWidths;

  var animators = data.a; var animatorData; var
    letterData;
  jLen = animators.length;
  var based; var ind; var
    indexes = [];
  for (j = 0; j < jLen; j += 1) {
    animatorData = animators[j];
    if (animatorData.a.sc) {
      documentData.strokeColorAnim = true;
    }
    if (animatorData.a.sw) {
      documentData.strokeWidthAnim = true;
    }
    if (animatorData.a.fc || animatorData.a.fh || animatorData.a.fs || animatorData.a.fb) {
      documentData.fillColorAnim = true;
    }
    ind = 0;
    based = animatorData.s.b;
    for (i = 0; i < len; i += 1) {
      letterData = letters[i];
      letterData.anIndexes[j] = ind;
      if ((based == 1 && letterData.val !== '') || (based == 2 && letterData.val !== '' && letterData.val !== ' ') || (based == 3 && (letterData.n || letterData.val == ' ' || i == len - 1)) || (based == 4 && (letterData.n || i == len - 1))) { // eslint-disable-line eqeqeq
        if (animatorData.s.rn === 1) {
          indexes.push(ind);
        }
        ind += 1;
      }
    }
    data.a[j].s.totalChars = ind;
    var currentInd = -1; var
      newInd;
    if (animatorData.s.rn === 1) {
      for (i = 0; i < len; i += 1) {
        letterData = letters[i];
        if (currentInd != letterData.anIndexes[j]) { // eslint-disable-line eqeqeq
          currentInd = letterData.anIndexes[j];
          newInd = indexes.splice(Math.floor(Math.random() * indexes.length), 1)[0];
        }
        letterData.anIndexes[j] = newInd;
      }
    }
  }
  documentData.yOffset = documentData.finalLineHeight || documentData.finalSize * 1.2;
  documentData.ls = documentData.ls || 0;
  documentData.ascent = (fontData.ascent * documentData.finalSize) / 100;
};

TextProperty.prototype.updateDocumentData = function (newData, index) {
  index = index === undefined ? this.keysIndex : index;
  var dData = this.copyData({}, this.data.d.k[index].s);
  dData = this.copyData(dData, newData);
  this.data.d.k[index].s = dData;
  this.recalculate(index);
  this.elem.addDynamicProperty(this);
};

TextProperty.prototype.recalculate = function (index) {
  var dData = this.data.d.k[index].s;
  dData.__complete = false;
  this.keysIndex = 0;
  this._isFirstFrame = true;
  this.getValue(dData);
};

TextProperty.prototype.canResizeFont = function (_canResize) {
  this.canResize = _canResize;
  this.recalculate(this.keysIndex);
  this.elem.addDynamicProperty(this);
};

TextProperty.prototype.setMinimumFontSize = function (_fontValue) {
  this.minimumFontSize = Math.floor(_fontValue) || 1;
  this.recalculate(this.keysIndex);
  this.elem.addDynamicProperty(this);
};

/* global extendPrototype, BezierFactory, PropertyFactory, DynamicPropertyContainer */
/* exported TextSelectorProp */

var TextSelectorProp = (function () {
  var max = Math.max;
  var min = Math.min;
  var floor = Math.floor;

  function TextSelectorPropFactory(elem, data) {
    this._currentTextLength = -1;
    this.k = false;
    this.data = data;
    this.elem = elem;
    this.comp = elem.comp;
    this.finalS = 0;
    this.finalE = 0;
    this.initDynamicPropertyContainer(elem);
    this.s = PropertyFactory.getProp(elem, data.s || { k: 0 }, 0, 0, this);
    if ('e' in data) {
      this.e = PropertyFactory.getProp(elem, data.e, 0, 0, this);
    } else {
      this.e = { v: 100 };
    }
    this.o = PropertyFactory.getProp(elem, data.o || { k: 0 }, 0, 0, this);
    this.xe = PropertyFactory.getProp(elem, data.xe || { k: 0 }, 0, 0, this);
    this.ne = PropertyFactory.getProp(elem, data.ne || { k: 0 }, 0, 0, this);
    this.sm = PropertyFactory.getProp(elem, data.sm || { k: 100 }, 0, 0, this);
    this.a = PropertyFactory.getProp(elem, data.a, 0, 0.01, this);
    if (!this.dynamicProperties.length) {
      this.getValue();
    }
  }

  TextSelectorPropFactory.prototype = {
    getMult: function (ind) {
      if (this._currentTextLength !== this.elem.textProperty.currentData.l.length) {
        this.getValue();
      }
      // var easer = bez.getEasingCurve(this.ne.v/100,0,1-this.xe.v/100,1);
      var x1 = 0;
      var y1 = 0;
      var x2 = 1;
      var y2 = 1;
      if (this.ne.v > 0) {
        x1 = this.ne.v / 100.0;
      } else {
        y1 = -this.ne.v / 100.0;
      }
      if (this.xe.v > 0) {
        x2 = 1.0 - this.xe.v / 100.0;
      } else {
        y2 = 1.0 + this.xe.v / 100.0;
      }
      var easer = BezierFactory.getBezierEasing(x1, y1, x2, y2).get;

      var mult = 0;
      var s = this.finalS;
      var e = this.finalE;
      var type = this.data.sh;
      if (type === 2) {
        if (e === s) {
          mult = ind >= e ? 1 : 0;
        } else {
          mult = max(0, min(0.5 / (e - s) + (ind - s) / (e - s), 1));
        }
        mult = easer(mult);
      } else if (type === 3) {
        if (e === s) {
          mult = ind >= e ? 0 : 1;
        } else {
          mult = 1 - max(0, min(0.5 / (e - s) + (ind - s) / (e - s), 1));
        }

        mult = easer(mult);
      } else if (type === 4) {
        if (e === s) {
          mult = 0;
        } else {
          mult = max(0, min(0.5 / (e - s) + (ind - s) / (e - s), 1));
          if (mult < 0.5) {
            mult *= 2;
          } else {
            mult = 1 - 2 * (mult - 0.5);
          }
        }
        mult = easer(mult);
      } else if (type === 5) {
        if (e === s) {
          mult = 0;
        } else {
          var tot = e - s;
          /* ind += 0.5;
                    mult = -4/(tot*tot)*(ind*ind)+(4/tot)*ind; */
          ind = min(max(0, ind + 0.5 - s), e - s);
          var x = -tot / 2 + ind;
          var a = tot / 2;
          mult = Math.sqrt(1 - (x * x) / (a * a));
        }
        mult = easer(mult);
      } else if (type === 6) {
        if (e === s) {
          mult = 0;
        } else {
          ind = min(max(0, ind + 0.5 - s), e - s);
          mult = (1 + (Math.cos((Math.PI + Math.PI * 2 * (ind) / (e - s))))) / 2; // eslint-disable-line
        }
        mult = easer(mult);
      } else {
        if (ind >= floor(s)) {
          if (ind - s < 0) {
            mult = max(0, min(min(e, 1) - (s - ind), 1));
          } else {
            mult = max(0, min(e - ind, 1));
          }
        }
        mult = easer(mult);
      }
      // Smoothness implementation.
      // The smoothness represents a reduced range of the original [0; 1] range.
      // if smoothness is 25%, the new range will be [0.375; 0.625]
      // Steps are:
      // - find the lower value of the new range (threshold)
      // - if multiplier is smaller than that value, floor it to 0
      // - if it is larger,
      //     - subtract the threshold
      //     - divide it by the smoothness (this will return the range to [0; 1])
      // Note: If it doesn't work on some scenarios, consider applying it before the easer.
      if (this.sm.v !== 100) {
        var smoothness = this.sm.v * 0.01;
        if (smoothness === 0) {
          smoothness = 0.00000001;
        }
        var threshold = 0.5 - smoothness * 0.5;
        if (mult < threshold) {
          mult = 0;
        } else {
          mult = (mult - threshold) / smoothness;
          if (mult > 1) {
            mult = 1;
          }
        }
      }
      return mult * this.a.v;
    },
    getValue: function (newCharsFlag) {
      this.iterateDynamicProperties();
      this._mdf = newCharsFlag || this._mdf;
      this._currentTextLength = this.elem.textProperty.currentData.l.length || 0;
      if (newCharsFlag && this.data.r === 2) {
        this.e.v = this._currentTextLength;
      }
      var divisor = this.data.r === 2 ? 1 : 100 / this.data.totalChars;
      var o = this.o.v / divisor;
      var s = this.s.v / divisor + o;
      var e = (this.e.v / divisor) + o;
      if (s > e) {
        var _s = s;
        s = e;
        e = _s;
      }
      this.finalS = s;
      this.finalE = e;
    },
  };
  extendPrototype([DynamicPropertyContainer], TextSelectorPropFactory);

  function getTextSelectorProp(elem, data, arr) {
    return new TextSelectorPropFactory(elem, data, arr);
  }

  return {
    getTextSelectorProp: getTextSelectorProp,
  };
}());

/* global createSizedArray, pooling */
/* exported poolFactory */

var poolFactory = (function () {
  return function (initialLength, _create, _release) {
    var _length = 0;
    var _maxLength = initialLength;
    var pool = createSizedArray(_maxLength);

    var ob = {
      newElement: newElement,
      release: release,
    };

    function newElement() {
      var element;
      if (_length) {
        _length -= 1;
        element = pool[_length];
      } else {
        element = _create();
      }
      return element;
    }

    function release(element) {
      if (_length === _maxLength) {
        pool = pooling.double(pool);
        _maxLength *= 2;
      }
      if (_release) {
        _release(element);
      }
      pool[_length] = element;
      _length += 1;
    }

    return ob;
  };
}());

/* global createSizedArray */
/* exported pooling */

var pooling = (function () {
  function double(arr) {
    return arr.concat(createSizedArray(arr.length));
  }

  return {
    double: double,
  };
}());

/* global createTypedArray, poolFactory */
/* exported pointPool */

var pointPool = (function () {
  function create() {
    return createTypedArray('float32', 2);
  }
  return poolFactory(8, create);
}());

/* global ShapePath, pointPool, poolFactory */
/* exported shapePool */

var shapePool = (function () {
  function create() {
    return new ShapePath();
  }

  function release(shapePath) {
    var len = shapePath._length;
    var i;
    for (i = 0; i < len; i += 1) {
      pointPool.release(shapePath.v[i]);
      pointPool.release(shapePath.i[i]);
      pointPool.release(shapePath.o[i]);
      shapePath.v[i] = null;
      shapePath.i[i] = null;
      shapePath.o[i] = null;
    }
    shapePath._length = 0;
    shapePath.c = false;
  }

  function clone(shape) {
    var cloned = factory.newElement();
    var i;
    var len = shape._length === undefined ? shape.v.length : shape._length;
    cloned.setLength(len);
    cloned.c = shape.c;

    for (i = 0; i < len; i += 1) {
      cloned.setTripleAt(shape.v[i][0], shape.v[i][1], shape.o[i][0], shape.o[i][1], shape.i[i][0], shape.i[i][1], i);
    }
    return cloned;
  }

  var factory = poolFactory(4, create, release);
  factory.clone = clone;

  return factory;
}());

/* global createSizedArray, ShapeCollection, shapePool, pooling */
/* exported shapeCollectionPool */

var shapeCollectionPool = (function () {
  var ob = {
    newShapeCollection: newShapeCollection,
    release: release,
  };

  var _length = 0;
  var _maxLength = 4;
  var pool = createSizedArray(_maxLength);

  function newShapeCollection() {
    var shapeCollection;
    if (_length) {
      _length -= 1;
      shapeCollection = pool[_length];
    } else {
      shapeCollection = new ShapeCollection();
    }
    return shapeCollection;
  }

  function release(shapeCollection) {
    var i;
    var len = shapeCollection._length;
    for (i = 0; i < len; i += 1) {
      shapePool.release(shapeCollection.shapes[i]);
    }
    shapeCollection._length = 0;

    if (_length === _maxLength) {
      pool = pooling.double(pool);
      _maxLength *= 2;
    }
    pool[_length] = shapeCollection;
    _length += 1;
  }

  return ob;
}());

/* global poolFactory, bezierLengthPool */
/* exported segmentsLengthPool */

var segmentsLengthPool = (function () {
  function create() {
    return {
      lengths: [],
      totalLength: 0,
    };
  }

  function release(element) {
    var i;
    var len = element.lengths.length;
    for (i = 0; i < len; i += 1) {
      bezierLengthPool.release(element.lengths[i]);
    }
    element.lengths.length = 0;
  }

  return poolFactory(8, create, release);
}());

/* global createTypedArray, defaultCurveSegments, poolFactory */
/* exported bezierLengthPool */

var bezierLengthPool = (function () {
  function create() {
    return {
      addedLength: 0,
      percents: createTypedArray('float32', defaultCurveSegments),
      lengths: createTypedArray('float32', defaultCurveSegments),
    };
  }
  return poolFactory(8, create);
}());

/* exported markerParser */

var markerParser = (

  function () {
    function parsePayloadLines(payload) {
      var lines = payload.split('\r\n');
      var keys = {};
      var line;
      var keysCount = 0;
      for (var i = 0; i < lines.length; i += 1) {
        line = lines[i].split(':');
        if (line.length === 2) {
          keys[line[0]] = line[1].trim();
          keysCount += 1;
        }
      }
      if (keysCount === 0) {
        throw new Error();
      }
      return keys;
    }

    return function (_markers) {
      var markers = [];
      for (var i = 0; i < _markers.length; i += 1) {
        var _marker = _markers[i];
        var markerData = {
          time: _marker.tm,
          duration: _marker.dr,
        };
        try {
          markerData.payload = JSON.parse(_markers[i].cm);
        } catch (_) {
          try {
            markerData.payload = parsePayloadLines(_markers[i].cm);
          } catch (__) {
            markerData.payload = {
              name: _markers[i],
            };
          }
        }
        markers.push(markerData);
      }
      return markers;
    };
  }());

/* global AudioElement, FootageElement, FontManager */

function BaseRenderer() {}
BaseRenderer.prototype.checkLayers = function (num) {
  var i;
  var len = this.layers.length;
  var data;
  this.completeLayers = true;
  for (i = len - 1; i >= 0; i -= 1) {
    if (!this.elements[i]) {
      data = this.layers[i];
      if (data.ip - data.st <= (num - this.layers[i].st) && data.op - data.st > (num - this.layers[i].st)) {
        this.buildItem(i);
      }
    }
    this.completeLayers = this.elements[i] ? this.completeLayers : false;
  }
  this.checkPendingElements();
};

BaseRenderer.prototype.createItem = function (layer) {
  switch (layer.ty) {
    case 2:
      return this.createImage(layer);
    case 0:
      return this.createComp(layer);
    case 1:
      return this.createSolid(layer);
    case 3:
      return this.createNull(layer);
    case 4:
      return this.createShape(layer);
    case 5:
      return this.createText(layer);
    case 6:
      return this.createAudio(layer);
    case 13:
      return this.createCamera(layer);
    case 15:
      return this.createFootage(layer);
    default:
      return this.createNull(layer);
  }
};

BaseRenderer.prototype.createCamera = function () {
  throw new Error('You\'re using a 3d camera. Try the html renderer.');
};

BaseRenderer.prototype.createAudio = function (data) {
  return new AudioElement(data, this.globalData, this);
};

BaseRenderer.prototype.createFootage = function (data) {
  return new FootageElement(data, this.globalData, this);
};

BaseRenderer.prototype.buildAllItems = function () {
  var i;
  var len = this.layers.length;
  for (i = 0; i < len; i += 1) {
    this.buildItem(i);
  }
  this.checkPendingElements();
};

BaseRenderer.prototype.includeLayers = function (newLayers) {
  this.completeLayers = false;
  var i;
  var len = newLayers.length;
  var j;
  var jLen = this.layers.length;
  for (i = 0; i < len; i += 1) {
    j = 0;
    while (j < jLen) {
      if (this.layers[j].id === newLayers[i].id) {
        this.layers[j] = newLayers[i];
        break;
      }
      j += 1;
    }
  }
};

BaseRenderer.prototype.setProjectInterface = function (pInterface) {
  this.globalData.projectInterface = pInterface;
};

BaseRenderer.prototype.initItems = function () {
  if (!this.globalData.progressiveLoad) {
    this.buildAllItems();
  }
};
BaseRenderer.prototype.buildElementParenting = function (element, parentName, hierarchy) {
  var elements = this.elements;
  var layers = this.layers;
  var i = 0;
  var len = layers.length;
  while (i < len) {
    if (layers[i].ind == parentName) { // eslint-disable-line eqeqeq
      if (!elements[i] || elements[i] === true) {
        this.buildItem(i);
        this.addPendingElement(element);
      } else {
        hierarchy.push(elements[i]);
        elements[i].setAsParent();
        if (layers[i].parent !== undefined) {
          this.buildElementParenting(element, layers[i].parent, hierarchy);
        } else {
          element.setHierarchy(hierarchy);
        }
      }
    }
    i += 1;
  }
};

BaseRenderer.prototype.addPendingElement = function (element) {
  this.pendingElements.push(element);
};

BaseRenderer.prototype.searchExtraCompositions = function (assets) {
  var i;
  var len = assets.length;
  for (i = 0; i < len; i += 1) {
    if (assets[i].xt) {
      var comp = this.createComp(assets[i]);
      comp.initExpressions();
      this.globalData.projectInterface.registerComposition(comp);
    }
  }
};

BaseRenderer.prototype.setupGlobalData = function (animData, fontsContainer) {
  this.globalData.fontManager = new FontManager();
  this.globalData.fontManager.addChars(animData.chars);
  this.globalData.fontManager.addFonts(animData.fonts, fontsContainer);
  this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem);
  this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem);
  this.globalData.imageLoader = this.animationItem.imagePreloader;
  this.globalData.audioController = this.animationItem.audioController;
  this.globalData.frameId = 0;
  this.globalData.frameRate = animData.fr;
  this.globalData.nm = animData.nm;
  this.globalData.compSize = {
    w: animData.w,
    h: animData.h,
  };
};

/* global createElementID, extendPrototype, BaseRenderer, NullElement, SVGShapeElement, SVGTextLottieElement,
IImageElement, SVGCompElement, ISolidElement, createNS, locationHref, createSizedArray, expressionsPlugin */

function SVGRenderer(animationItem, config) {
  this.animationItem = animationItem;
  this.layers = null;
  this.renderedFrame = -1;
  this.svgElement = createNS('svg');
  var ariaLabel = '';
  if (config && config.title) {
    var titleElement = createNS('title');
    var titleId = createElementID();
    titleElement.setAttribute('id', titleId);
    titleElement.textContent = config.title;
    this.svgElement.appendChild(titleElement);
    ariaLabel += titleId;
  }
  if (config && config.description) {
    var descElement = createNS('desc');
    var descId = createElementID();
    descElement.setAttribute('id', descId);
    descElement.textContent = config.description;
    this.svgElement.appendChild(descElement);
    ariaLabel += ' ' + descId;
  }
  if (ariaLabel) {
    this.svgElement.setAttribute('aria-labelledby', ariaLabel);
  }
  var defs = createNS('defs');
  this.svgElement.appendChild(defs);
  var maskElement = createNS('g');
  this.svgElement.appendChild(maskElement);
  this.layerElement = maskElement;
  this.renderConfig = {
    preserveAspectRatio: (config && config.preserveAspectRatio) || 'xMidYMid meet',
    imagePreserveAspectRatio: (config && config.imagePreserveAspectRatio) || 'xMidYMid slice',
    contentVisibility: (config && config.contentVisibility) || 'visible',
    progressiveLoad: (config && config.progressiveLoad) || false,
    hideOnTransparent: !((config && config.hideOnTransparent === false)),
    viewBoxOnly: (config && config.viewBoxOnly) || false,
    viewBoxSize: (config && config.viewBoxSize) || false,
    className: (config && config.className) || '',
    id: (config && config.id) || '',
    focusable: config && config.focusable,
    filterSize: {
      width: (config && config.filterSize && config.filterSize.width) || '100%',
      height: (config && config.filterSize && config.filterSize.height) || '100%',
      x: (config && config.filterSize && config.filterSize.x) || '0%',
      y: (config && config.filterSize && config.filterSize.y) || '0%',
    },
  };

  this.globalData = {
    _mdf: false,
    frameNum: -1,
    defs: defs,
    renderConfig: this.renderConfig,
  };
  this.elements = [];
  this.pendingElements = [];
  this.destroyed = false;
  this.rendererType = 'svg';
}

extendPrototype([BaseRenderer], SVGRenderer);

SVGRenderer.prototype.createNull = function (data) {
  return new NullElement(data, this.globalData, this);
};

SVGRenderer.prototype.createShape = function (data) {
  return new SVGShapeElement(data, this.globalData, this);
};

SVGRenderer.prototype.createText = function (data) {
  return new SVGTextLottieElement(data, this.globalData, this);
};

SVGRenderer.prototype.createImage = function (data) {
  return new IImageElement(data, this.globalData, this);
};

SVGRenderer.prototype.createComp = function (data) {
  return new SVGCompElement(data, this.globalData, this);
};

SVGRenderer.prototype.createSolid = function (data) {
  return new ISolidElement(data, this.globalData, this);
};

SVGRenderer.prototype.configAnimation = function (animData) {
  this.svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  if (this.renderConfig.viewBoxSize) {
    this.svgElement.setAttribute('viewBox', this.renderConfig.viewBoxSize);
  } else {
    this.svgElement.setAttribute('viewBox', '0 0 ' + animData.w + ' ' + animData.h);
  }

  if (!this.renderConfig.viewBoxOnly) {
    this.svgElement.setAttribute('width', animData.w);
    this.svgElement.setAttribute('height', animData.h);
    this.svgElement.style.width = '100%';
    this.svgElement.style.height = '100%';
    this.svgElement.style.transform = 'translate3d(0,0,0)';
    this.svgElement.style.contentVisibility = this.renderConfig.contentVisibility;
  }
  if (this.renderConfig.className) {
    this.svgElement.setAttribute('class', this.renderConfig.className);
  }
  if (this.renderConfig.id) {
    this.svgElement.setAttribute('id', this.renderConfig.id);
  }
  if (this.renderConfig.focusable !== undefined) {
    this.svgElement.setAttribute('focusable', this.renderConfig.focusable);
  }
  this.svgElement.setAttribute('preserveAspectRatio', this.renderConfig.preserveAspectRatio);
  // this.layerElement.style.transform = 'translate3d(0,0,0)';
  // this.layerElement.style.transformOrigin = this.layerElement.style.mozTransformOrigin = this.layerElement.style.webkitTransformOrigin = this.layerElement.style['-webkit-transform'] = "0px 0px 0px";
  this.animationItem.wrapper.appendChild(this.svgElement);
  // Mask animation
  var defs = this.globalData.defs;

  this.setupGlobalData(animData, defs);
  this.globalData.progressiveLoad = this.renderConfig.progressiveLoad;
  this.data = animData;

  var maskElement = createNS('clipPath');
  var rect = createNS('rect');
  rect.setAttribute('width', animData.w);
  rect.setAttribute('height', animData.h);
  rect.setAttribute('x', 0);
  rect.setAttribute('y', 0);
  var maskId = createElementID();
  maskElement.setAttribute('id', maskId);
  maskElement.appendChild(rect);
  this.layerElement.setAttribute('clip-path', 'url(' + locationHref + '#' + maskId + ')');

  defs.appendChild(maskElement);
  this.layers = animData.layers;
  this.elements = createSizedArray(animData.layers.length);
};

SVGRenderer.prototype.destroy = function () {
  if (this.animationItem.wrapper) {
    this.animationItem.wrapper.innerText = '';
  }
  this.layerElement = null;
  this.globalData.defs = null;
  var i;
  var len = this.layers ? this.layers.length : 0;
  for (i = 0; i < len; i += 1) {
    if (this.elements[i]) {
      this.elements[i].destroy();
    }
  }
  this.elements.length = 0;
  this.destroyed = true;
  this.animationItem = null;
};

SVGRenderer.prototype.updateContainerSize = function () {
};

SVGRenderer.prototype.buildItem = function (pos) {
  var elements = this.elements;
  if (elements[pos] || this.layers[pos].ty === 99) {
    return;
  }
  elements[pos] = true;
  var element = this.createItem(this.layers[pos]);

  elements[pos] = element;
  if (expressionsPlugin) {
    if (this.layers[pos].ty === 0) {
      this.globalData.projectInterface.registerComposition(element);
    }
    element.initExpressions();
  }
  this.appendElementInPos(element, pos);
  if (this.layers[pos].tt) {
    if (!this.elements[pos - 1] || this.elements[pos - 1] === true) {
      this.buildItem(pos - 1);
      this.addPendingElement(element);
    } else {
      element.setMatte(elements[pos - 1].layerId);
    }
  }
};

SVGRenderer.prototype.checkPendingElements = function () {
  while (this.pendingElements.length) {
    var element = this.pendingElements.pop();
    element.checkParenting();
    if (element.data.tt) {
      var i = 0;
      var len = this.elements.length;
      while (i < len) {
        if (this.elements[i] === element) {
          element.setMatte(this.elements[i - 1].layerId);
          break;
        }
        i += 1;
      }
    }
  }
};

SVGRenderer.prototype.renderFrame = function (num) {
  if (this.renderedFrame === num || this.destroyed) {
    return;
  }
  if (num === null) {
    num = this.renderedFrame;
  } else {
    this.renderedFrame = num;
  }
  // console.log('-------');
  // console.log('FRAME ',num);
  this.globalData.frameNum = num;
  this.globalData.frameId += 1;
  this.globalData.projectInterface.currentFrame = num;
  this.globalData._mdf = false;
  var i;
  var len = this.layers.length;
  if (!this.completeLayers) {
    this.checkLayers(num);
  }
  for (i = len - 1; i >= 0; i -= 1) {
    if (this.completeLayers || this.elements[i]) {
      this.elements[i].prepareFrame(num - this.layers[i].st);
    }
  }
  if (this.globalData._mdf) {
    for (i = 0; i < len; i += 1) {
      if (this.completeLayers || this.elements[i]) {
        this.elements[i].renderFrame();
      }
    }
  }
};

SVGRenderer.prototype.appendElementInPos = function (element, pos) {
  var newElement = element.getBaseElement();
  if (!newElement) {
    return;
  }
  var i = 0;
  var nextElement;
  while (i < pos) {
    if (this.elements[i] && this.elements[i] !== true && this.elements[i].getBaseElement()) {
      nextElement = this.elements[i].getBaseElement();
    }
    i += 1;
  }
  if (nextElement) {
    this.layerElement.insertBefore(newElement, nextElement);
  } else {
    this.layerElement.appendChild(newElement);
  }
};

SVGRenderer.prototype.hide = function () {
  this.layerElement.style.display = 'none';
};

SVGRenderer.prototype.show = function () {
  this.layerElement.style.display = 'block';
};

/* global CVContextData, Matrix, extendPrototype, BaseRenderer, CVShapeElement, CVTextElement,
CVImageElement, CVCompElement, CVSolidElement, SVGRenderer, createTag, createSizedArray */

function CanvasRenderer(animationItem, config) {
  this.animationItem = animationItem;
  this.renderConfig = {
    clearCanvas: (config && config.clearCanvas !== undefined) ? config.clearCanvas : true,
    context: (config && config.context) || null,
    progressiveLoad: (config && config.progressiveLoad) || false,
    preserveAspectRatio: (config && config.preserveAspectRatio) || 'xMidYMid meet',
    imagePreserveAspectRatio: (config && config.imagePreserveAspectRatio) || 'xMidYMid slice',
    contentVisibility: (config && config.contentVisibility) || 'visible',
    className: (config && config.className) || '',
    id: (config && config.id) || '',
  };
  this.renderConfig.dpr = (config && config.dpr) || 1;
  if (this.animationItem.wrapper) {
    this.renderConfig.dpr = (config && config.dpr) || window.devicePixelRatio || 1;
  }
  this.renderedFrame = -1;
  this.globalData = {
    frameNum: -1,
    _mdf: false,
    renderConfig: this.renderConfig,
    currentGlobalAlpha: -1,
  };
  this.contextData = new CVContextData();
  this.elements = [];
  this.pendingElements = [];
  this.transformMat = new Matrix();
  this.completeLayers = false;
  this.rendererType = 'canvas';
}
extendPrototype([BaseRenderer], CanvasRenderer);

CanvasRenderer.prototype.createShape = function (data) {
  return new CVShapeElement(data, this.globalData, this);
};

CanvasRenderer.prototype.createText = function (data) {
  return new CVTextElement(data, this.globalData, this);
};

CanvasRenderer.prototype.createImage = function (data) {
  return new CVImageElement(data, this.globalData, this);
};

CanvasRenderer.prototype.createComp = function (data) {
  return new CVCompElement(data, this.globalData, this);
};

CanvasRenderer.prototype.createSolid = function (data) {
  return new CVSolidElement(data, this.globalData, this);
};

CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull;

CanvasRenderer.prototype.ctxTransform = function (props) {
  if (props[0] === 1 && props[1] === 0 && props[4] === 0 && props[5] === 1 && props[12] === 0 && props[13] === 0) {
    return;
  }
  if (!this.renderConfig.clearCanvas) {
    this.canvasContext.transform(props[0], props[1], props[4], props[5], props[12], props[13]);
    return;
  }
  this.transformMat.cloneFromProps(props);
  var cProps = this.contextData.cTr.props;
  this.transformMat.transform(cProps[0], cProps[1], cProps[2], cProps[3], cProps[4], cProps[5], cProps[6], cProps[7], cProps[8], cProps[9], cProps[10], cProps[11], cProps[12], cProps[13], cProps[14], cProps[15]);
  // this.contextData.cTr.transform(props[0],props[1],props[2],props[3],props[4],props[5],props[6],props[7],props[8],props[9],props[10],props[11],props[12],props[13],props[14],props[15]);
  this.contextData.cTr.cloneFromProps(this.transformMat.props);
  var trProps = this.contextData.cTr.props;
  this.canvasContext.setTransform(trProps[0], trProps[1], trProps[4], trProps[5], trProps[12], trProps[13]);
};

CanvasRenderer.prototype.ctxOpacity = function (op) {
  /* if(op === 1){
        return;
    } */
  if (!this.renderConfig.clearCanvas) {
    this.canvasContext.globalAlpha *= op < 0 ? 0 : op;
    this.globalData.currentGlobalAlpha = this.contextData.cO;
    return;
  }
  this.contextData.cO *= op < 0 ? 0 : op;
  if (this.globalData.currentGlobalAlpha !== this.contextData.cO) {
    this.canvasContext.globalAlpha = this.contextData.cO;
    this.globalData.currentGlobalAlpha = this.contextData.cO;
  }
};

CanvasRenderer.prototype.reset = function () {
  if (!this.renderConfig.clearCanvas) {
    this.canvasContext.restore();
    return;
  }
  this.contextData.reset();
};

CanvasRenderer.prototype.save = function (actionFlag) {
  if (!this.renderConfig.clearCanvas) {
    this.canvasContext.save();
    return;
  }
  if (actionFlag) {
    this.canvasContext.save();
  }
  var props = this.contextData.cTr.props;
  if (this.contextData._length <= this.contextData.cArrPos) {
    this.contextData.duplicate();
  }
  var i;
  var arr = this.contextData.saved[this.contextData.cArrPos];
  for (i = 0; i < 16; i += 1) {
    arr[i] = props[i];
  }
  this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO;
  this.contextData.cArrPos += 1;
};

CanvasRenderer.prototype.restore = function (actionFlag) {
  if (!this.renderConfig.clearCanvas) {
    this.canvasContext.restore();
    return;
  }
  if (actionFlag) {
    this.canvasContext.restore();
    this.globalData.blendMode = 'source-over';
  }
  this.contextData.cArrPos -= 1;
  var popped = this.contextData.saved[this.contextData.cArrPos];
  var i;
  var arr = this.contextData.cTr.props;
  for (i = 0; i < 16; i += 1) {
    arr[i] = popped[i];
  }
  this.canvasContext.setTransform(popped[0], popped[1], popped[4], popped[5], popped[12], popped[13]);
  popped = this.contextData.savedOp[this.contextData.cArrPos];
  this.contextData.cO = popped;
  if (this.globalData.currentGlobalAlpha !== popped) {
    this.canvasContext.globalAlpha = popped;
    this.globalData.currentGlobalAlpha = popped;
  }
};

CanvasRenderer.prototype.configAnimation = function (animData) {
  if (this.animationItem.wrapper) {
    this.animationItem.container = createTag('canvas');
    var containerStyle = this.animationItem.container.style;
    containerStyle.width = '100%';
    containerStyle.height = '100%';
    var origin = '0px 0px 0px';
    containerStyle.transformOrigin = origin;
    containerStyle.mozTransformOrigin = origin;
    containerStyle.webkitTransformOrigin = origin;
    containerStyle['-webkit-transform'] = origin;
    containerStyle.contentVisibility = this.renderConfig.contentVisibility;
    this.animationItem.wrapper.appendChild(this.animationItem.container);
    this.canvasContext = this.animationItem.container.getContext('2d');
    if (this.renderConfig.className) {
      this.animationItem.container.setAttribute('class', this.renderConfig.className);
    }
    if (this.renderConfig.id) {
      this.animationItem.container.setAttribute('id', this.renderConfig.id);
    }
  } else {
    this.canvasContext = this.renderConfig.context;
  }
  this.data = animData;
  this.layers = animData.layers;
  this.transformCanvas = {
    w: animData.w,
    h: animData.h,
    sx: 0,
    sy: 0,
    tx: 0,
    ty: 0,
  };
  this.setupGlobalData(animData, document.body);
  this.globalData.canvasContext = this.canvasContext;
  this.globalData.renderer = this;
  this.globalData.isDashed = false;
  this.globalData.progressiveLoad = this.renderConfig.progressiveLoad;
  this.globalData.transformCanvas = this.transformCanvas;
  this.elements = createSizedArray(animData.layers.length);

  this.updateContainerSize();
};

CanvasRenderer.prototype.updateContainerSize = function () {
  this.reset();
  var elementWidth;
  var elementHeight;
  if (this.animationItem.wrapper && this.animationItem.container) {
    elementWidth = this.animationItem.wrapper.offsetWidth;
    elementHeight = this.animationItem.wrapper.offsetHeight;
    this.animationItem.container.setAttribute('width', elementWidth * this.renderConfig.dpr);
    this.animationItem.container.setAttribute('height', elementHeight * this.renderConfig.dpr);
  } else {
    elementWidth = this.canvasContext.canvas.width * this.renderConfig.dpr;
    elementHeight = this.canvasContext.canvas.height * this.renderConfig.dpr;
  }
  var elementRel;
  var animationRel;
  if (this.renderConfig.preserveAspectRatio.indexOf('meet') !== -1 || this.renderConfig.preserveAspectRatio.indexOf('slice') !== -1) {
    var par = this.renderConfig.preserveAspectRatio.split(' ');
    var fillType = par[1] || 'meet';
    var pos = par[0] || 'xMidYMid';
    var xPos = pos.substr(0, 4);
    var yPos = pos.substr(4);
    elementRel = elementWidth / elementHeight;
    animationRel = this.transformCanvas.w / this.transformCanvas.h;
    if ((animationRel > elementRel && fillType === 'meet') || (animationRel < elementRel && fillType === 'slice')) {
      this.transformCanvas.sx = elementWidth / (this.transformCanvas.w / this.renderConfig.dpr);
      this.transformCanvas.sy = elementWidth / (this.transformCanvas.w / this.renderConfig.dpr);
    } else {
      this.transformCanvas.sx = elementHeight / (this.transformCanvas.h / this.renderConfig.dpr);
      this.transformCanvas.sy = elementHeight / (this.transformCanvas.h / this.renderConfig.dpr);
    }

    if (xPos === 'xMid' && ((animationRel < elementRel && fillType === 'meet') || (animationRel > elementRel && fillType === 'slice'))) {
      this.transformCanvas.tx = ((elementWidth - this.transformCanvas.w * (elementHeight / this.transformCanvas.h)) / 2) * this.renderConfig.dpr;
    } else if (xPos === 'xMax' && ((animationRel < elementRel && fillType === 'meet') || (animationRel > elementRel && fillType === 'slice'))) {
      this.transformCanvas.tx = (elementWidth - this.transformCanvas.w * (elementHeight / this.transformCanvas.h)) * this.renderConfig.dpr;
    } else {
      this.transformCanvas.tx = 0;
    }
    if (yPos === 'YMid' && ((animationRel > elementRel && fillType === 'meet') || (animationRel < elementRel && fillType === 'slice'))) {
      this.transformCanvas.ty = ((elementHeight - this.transformCanvas.h * (elementWidth / this.transformCanvas.w)) / 2) * this.renderConfig.dpr;
    } else if (yPos === 'YMax' && ((animationRel > elementRel && fillType === 'meet') || (animationRel < elementRel && fillType === 'slice'))) {
      this.transformCanvas.ty = ((elementHeight - this.transformCanvas.h * (elementWidth / this.transformCanvas.w))) * this.renderConfig.dpr;
    } else {
      this.transformCanvas.ty = 0;
    }
  } else if (this.renderConfig.preserveAspectRatio === 'none') {
    this.transformCanvas.sx = elementWidth / (this.transformCanvas.w / this.renderConfig.dpr);
    this.transformCanvas.sy = elementHeight / (this.transformCanvas.h / this.renderConfig.dpr);
    this.transformCanvas.tx = 0;
    this.transformCanvas.ty = 0;
  } else {
    this.transformCanvas.sx = this.renderConfig.dpr;
    this.transformCanvas.sy = this.renderConfig.dpr;
    this.transformCanvas.tx = 0;
    this.transformCanvas.ty = 0;
  }
  this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1];
  /* var i, len = this.elements.length;
    for(i=0;i<len;i+=1){
        if(this.elements[i] && this.elements[i].data.ty === 0){
            this.elements[i].resize(this.globalData.transformCanvas);
        }
    } */
  this.ctxTransform(this.transformCanvas.props);
  this.canvasContext.beginPath();
  this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h);
  this.canvasContext.closePath();
  this.canvasContext.clip();

  this.renderFrame(this.renderedFrame, true);
};

CanvasRenderer.prototype.destroy = function () {
  if (this.renderConfig.clearCanvas && this.animationItem.wrapper) {
    this.animationItem.wrapper.innerText = '';
  }
  var i;
  var len = this.layers ? this.layers.length : 0;
  for (i = len - 1; i >= 0; i -= 1) {
    if (this.elements[i]) {
      this.elements[i].destroy();
    }
  }
  this.elements.length = 0;
  this.globalData.canvasContext = null;
  this.animationItem.container = null;
  this.destroyed = true;
};

CanvasRenderer.prototype.renderFrame = function (num, forceRender) {
  if ((this.renderedFrame === num && this.renderConfig.clearCanvas === true && !forceRender) || this.destroyed || num === -1) {
    return;
  }
  this.renderedFrame = num;
  this.globalData.frameNum = num - this.animationItem._isFirstFrame;
  this.globalData.frameId += 1;
  this.globalData._mdf = !this.renderConfig.clearCanvas || forceRender;
  this.globalData.projectInterface.currentFrame = num;

  // console.log('--------');
  // console.log('NEW: ',num);
  var i;
  var len = this.layers.length;
  if (!this.completeLayers) {
    this.checkLayers(num);
  }

  for (i = 0; i < len; i += 1) {
    if (this.completeLayers || this.elements[i]) {
      this.elements[i].prepareFrame(num - this.layers[i].st);
    }
  }
  if (this.globalData._mdf) {
    if (this.renderConfig.clearCanvas === true) {
      this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h);
    } else {
      this.save();
    }
    for (i = len - 1; i >= 0; i -= 1) {
      if (this.completeLayers || this.elements[i]) {
        this.elements[i].renderFrame();
      }
    }
    if (this.renderConfig.clearCanvas !== true) {
      this.restore();
    }
  }
};

CanvasRenderer.prototype.buildItem = function (pos) {
  var elements = this.elements;
  if (elements[pos] || this.layers[pos].ty === 99) {
    return;
  }
  var element = this.createItem(this.layers[pos], this, this.globalData);
  elements[pos] = element;
  element.initExpressions();
  /* if(this.layers[pos].ty === 0){
        element.resize(this.globalData.transformCanvas);
    } */
};

CanvasRenderer.prototype.checkPendingElements = function () {
  while (this.pendingElements.length) {
    var element = this.pendingElements.pop();
    element.checkParenting();
  }
};

CanvasRenderer.prototype.hide = function () {
  this.animationItem.container.style.display = 'none';
};

CanvasRenderer.prototype.show = function () {
  this.animationItem.container.style.display = 'block';
};

/* global extendPrototype, BaseRenderer, SVGRenderer, SVGShapeElement, HShapeElement, SVGTextLottieElement,
HTextElement, HCameraElement, IImageElement, HImageElement, SVGCompElement, HCompElement, ISolidElement,
HSolidElement, styleDiv, createTag, createNS */

function HybridRenderer(animationItem, config) {
  this.animationItem = animationItem;
  this.layers = null;
  this.renderedFrame = -1;
  this.renderConfig = {
    className: (config && config.className) || '',
    imagePreserveAspectRatio: (config && config.imagePreserveAspectRatio) || 'xMidYMid slice',
    hideOnTransparent: !(config && config.hideOnTransparent === false),
    filterSize: {
      width: (config && config.filterSize && config.filterSize.width) || '400%',
      height: (config && config.filterSize && config.filterSize.height) || '400%',
      x: (config && config.filterSize && config.filterSize.x) || '-100%',
      y: (config && config.filterSize && config.filterSize.y) || '-100%',
    },
  };
  this.globalData = {
    _mdf: false,
    frameNum: -1,
    renderConfig: this.renderConfig,
  };
  this.pendingElements = [];
  this.elements = [];
  this.threeDElements = [];
  this.destroyed = false;
  this.camera = null;
  this.supports3d = true;
  this.rendererType = 'html';
}

extendPrototype([BaseRenderer], HybridRenderer);

HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem;

HybridRenderer.prototype.checkPendingElements = function () {
  while (this.pendingElements.length) {
    var element = this.pendingElements.pop();
    element.checkParenting();
  }
};

HybridRenderer.prototype.appendElementInPos = function (element, pos) {
  var newDOMElement = element.getBaseElement();
  if (!newDOMElement) {
    return;
  }
  var layer = this.layers[pos];
  if (!layer.ddd || !this.supports3d) {
    if (this.threeDElements) {
      this.addTo3dContainer(newDOMElement, pos);
    } else {
      var i = 0;
      var nextDOMElement;
      var nextLayer;
      var tmpDOMElement;
      while (i < pos) {
        if (this.elements[i] && this.elements[i] !== true && this.elements[i].getBaseElement) {
          nextLayer = this.elements[i];
          tmpDOMElement = this.layers[i].ddd ? this.getThreeDContainerByPos(i) : nextLayer.getBaseElement();
          nextDOMElement = tmpDOMElement || nextDOMElement;
        }
        i += 1;
      }
      if (nextDOMElement) {
        if (!layer.ddd || !this.supports3d) {
          this.layerElement.insertBefore(newDOMElement, nextDOMElement);
        }
      } else if (!layer.ddd || !this.supports3d) {
        this.layerElement.appendChild(newDOMElement);
      }
    }
  } else {
    this.addTo3dContainer(newDOMElement, pos);
  }
};

HybridRenderer.prototype.createShape = function (data) {
  if (!this.supports3d) {
    return new SVGShapeElement(data, this.globalData, this);
  }
  return new HShapeElement(data, this.globalData, this);
};

HybridRenderer.prototype.createText = function (data) {
  if (!this.supports3d) {
    return new SVGTextLottieElement(data, this.globalData, this);
  }
  return new HTextElement(data, this.globalData, this);
};

HybridRenderer.prototype.createCamera = function (data) {
  this.camera = new HCameraElement(data, this.globalData, this);
  return this.camera;
};

HybridRenderer.prototype.createImage = function (data) {
  if (!this.supports3d) {
    return new IImageElement(data, this.globalData, this);
  }
  return new HImageElement(data, this.globalData, this);
};

HybridRenderer.prototype.createComp = function (data) {
  if (!this.supports3d) {
    return new SVGCompElement(data, this.globalData, this);
  }
  return new HCompElement(data, this.globalData, this);
};

HybridRenderer.prototype.createSolid = function (data) {
  if (!this.supports3d) {
    return new ISolidElement(data, this.globalData, this);
  }
  return new HSolidElement(data, this.globalData, this);
};

HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull;

HybridRenderer.prototype.getThreeDContainerByPos = function (pos) {
  var i = 0;
  var len = this.threeDElements.length;
  while (i < len) {
    if (this.threeDElements[i].startPos <= pos && this.threeDElements[i].endPos >= pos) {
      return this.threeDElements[i].perspectiveElem;
    }
    i += 1;
  }
  return null;
};

HybridRenderer.prototype.createThreeDContainer = function (pos, type) {
  var perspectiveElem = createTag('div');
  var style;
  var containerStyle;
  styleDiv(perspectiveElem);
  var container = createTag('div');
  styleDiv(container);
  if (type === '3d') {
    style = perspectiveElem.style;
    style.width = this.globalData.compSize.w + 'px';
    style.height = this.globalData.compSize.h + 'px';
    var center = '50% 50%';
    style.webkitTransformOrigin = center;
    style.mozTransformOrigin = center;
    style.transformOrigin = center;
    containerStyle = container.style;
    var matrix = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)';
    containerStyle.transform = matrix;
    containerStyle.webkitTransform = matrix;
  }

  perspectiveElem.appendChild(container);
  // this.resizerElem.appendChild(perspectiveElem);
  var threeDContainerData = {
    container: container,
    perspectiveElem: perspectiveElem,
    startPos: pos,
    endPos: pos,
    type: type,
  };
  this.threeDElements.push(threeDContainerData);
  return threeDContainerData;
};

HybridRenderer.prototype.build3dContainers = function () {
  var i;
  var len = this.layers.length;
  var lastThreeDContainerData;
  var currentContainer = '';
  for (i = 0; i < len; i += 1) {
    if (this.layers[i].ddd && this.layers[i].ty !== 3) {
      if (currentContainer !== '3d') {
        currentContainer = '3d';
        lastThreeDContainerData = this.createThreeDContainer(i, '3d');
      }
      lastThreeDContainerData.endPos = Math.max(lastThreeDContainerData.endPos, i);
    } else {
      if (currentContainer !== '2d') {
        currentContainer = '2d';
        lastThreeDContainerData = this.createThreeDContainer(i, '2d');
      }
      lastThreeDContainerData.endPos = Math.max(lastThreeDContainerData.endPos, i);
    }
  }
  len = this.threeDElements.length;
  for (i = len - 1; i >= 0; i -= 1) {
    this.resizerElem.appendChild(this.threeDElements[i].perspectiveElem);
  }
};

HybridRenderer.prototype.addTo3dContainer = function (elem, pos) {
  var i = 0;
  var len = this.threeDElements.length;
  while (i < len) {
    if (pos <= this.threeDElements[i].endPos) {
      var j = this.threeDElements[i].startPos;
      var nextElement;
      while (j < pos) {
        if (this.elements[j] && this.elements[j].getBaseElement) {
          nextElement = this.elements[j].getBaseElement();
        }
        j += 1;
      }
      if (nextElement) {
        this.threeDElements[i].container.insertBefore(elem, nextElement);
      } else {
        this.threeDElements[i].container.appendChild(elem);
      }
      break;
    }
    i += 1;
  }
};

HybridRenderer.prototype.configAnimation = function (animData) {
  var resizerElem = createTag('div');
  var wrapper = this.animationItem.wrapper;
  var style = resizerElem.style;
  style.width = animData.w + 'px';
  style.height = animData.h + 'px';
  this.resizerElem = resizerElem;
  styleDiv(resizerElem);
  style.transformStyle = 'flat';
  style.mozTransformStyle = 'flat';
  style.webkitTransformStyle = 'flat';
  if (this.renderConfig.className) {
    resizerElem.setAttribute('class', this.renderConfig.className);
  }
  wrapper.appendChild(resizerElem);

  style.overflow = 'hidden';
  var svg = createNS('svg');
  svg.setAttribute('width', '1');
  svg.setAttribute('height', '1');
  styleDiv(svg);
  this.resizerElem.appendChild(svg);
  var defs = createNS('defs');
  svg.appendChild(defs);
  this.data = animData;
  // Mask animation
  this.setupGlobalData(animData, svg);
  this.globalData.defs = defs;
  this.layers = animData.layers;
  this.layerElement = this.resizerElem;
  this.build3dContainers();
  this.updateContainerSize();
};

HybridRenderer.prototype.destroy = function () {
  if (this.animationItem.wrapper) {
    this.animationItem.wrapper.innerText = '';
  }
  this.animationItem.container = null;
  this.globalData.defs = null;
  var i;
  var len = this.layers ? this.layers.length : 0;
  for (i = 0; i < len; i += 1) {
    this.elements[i].destroy();
  }
  this.elements.length = 0;
  this.destroyed = true;
  this.animationItem = null;
};

HybridRenderer.prototype.updateContainerSize = function () {
  var elementWidth = this.animationItem.wrapper.offsetWidth;
  var elementHeight = this.animationItem.wrapper.offsetHeight;
  var elementRel = elementWidth / elementHeight;
  var animationRel = this.globalData.compSize.w / this.globalData.compSize.h;
  var sx;
  var sy;
  var tx;
  var ty;
  if (animationRel > elementRel) {
    sx = elementWidth / (this.globalData.compSize.w);
    sy = elementWidth / (this.globalData.compSize.w);
    tx = 0;
    ty = ((elementHeight - this.globalData.compSize.h * (elementWidth / this.globalData.compSize.w)) / 2);
  } else {
    sx = elementHeight / (this.globalData.compSize.h);
    sy = elementHeight / (this.globalData.compSize.h);
    tx = (elementWidth - this.globalData.compSize.w * (elementHeight / this.globalData.compSize.h)) / 2;
    ty = 0;
  }
  var style = this.resizerElem.style;
  style.webkitTransform = 'matrix3d(' + sx + ',0,0,0,0,' + sy + ',0,0,0,0,1,0,' + tx + ',' + ty + ',0,1)';
  style.transform = style.webkitTransform;
};

HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame;

HybridRenderer.prototype.hide = function () {
  this.resizerElem.style.display = 'none';
};

HybridRenderer.prototype.show = function () {
  this.resizerElem.style.display = 'block';
};

HybridRenderer.prototype.initItems = function () {
  this.buildAllItems();
  if (this.camera) {
    this.camera.setup();
  } else {
    var cWidth = this.globalData.compSize.w;
    var cHeight = this.globalData.compSize.h;
    var i;
    var len = this.threeDElements.length;
    for (i = 0; i < len; i += 1) {
      var style = this.threeDElements[i].perspectiveElem.style;
      style.webkitPerspective = Math.sqrt(Math.pow(cWidth, 2) + Math.pow(cHeight, 2)) + 'px';
      style.perspective = style.webkitPerspective;
    }
  }
};

HybridRenderer.prototype.searchExtraCompositions = function (assets) {
  var i;
  var len = assets.length;
  var floatingContainer = createTag('div');
  for (i = 0; i < len; i += 1) {
    if (assets[i].xt) {
      var comp = this.createComp(assets[i], floatingContainer, this.globalData.comp, null);
      comp.initExpressions();
      this.globalData.projectInterface.registerComposition(comp);
    }
  }
};

/* global createSizedArray, createElementID, PropertyFactory, ShapePropertyFactory, createNS, locationHref */

function MaskElement(data, element, globalData) {
  this.data = data;
  this.element = element;
  this.globalData = globalData;
  this.storedData = [];
  this.masksProperties = this.data.masksProperties || [];
  this.maskElement = null;
  var defs = this.globalData.defs;
  var i;
  var len = this.masksProperties ? this.masksProperties.length : 0;
  this.viewData = createSizedArray(len);
  this.solidPath = '';

  var path;
  var properties = this.masksProperties;
  var count = 0;
  var currentMasks = [];
  var j;
  var jLen;
  var layerId = createElementID();
  var rect;
  var expansor;
  var feMorph;
  var x;
  var maskType = 'clipPath';
  var maskRef = 'clip-path';
  for (i = 0; i < len; i += 1) {
    if ((properties[i].mode !== 'a' && properties[i].mode !== 'n') || properties[i].inv || properties[i].o.k !== 100 || properties[i].o.x) {
      maskType = 'mask';
      maskRef = 'mask';
    }

    if ((properties[i].mode === 's' || properties[i].mode === 'i') && count === 0) {
      rect = createNS('rect');
      rect.setAttribute('fill', '#ffffff');
      rect.setAttribute('width', this.element.comp.data.w || 0);
      rect.setAttribute('height', this.element.comp.data.h || 0);
      currentMasks.push(rect);
    } else {
      rect = null;
    }

    path = createNS('path');
    if (properties[i].mode === 'n') {
      // TODO move this to a factory or to a constructor
      this.viewData[i] = {
        op: PropertyFactory.getProp(this.element, properties[i].o, 0, 0.01, this.element),
        prop: ShapePropertyFactory.getShapeProp(this.element, properties[i], 3),
        elem: path,
        lastPath: '',
      };
      defs.appendChild(path);
    } else {
      count += 1;

      path.setAttribute('fill', properties[i].mode === 's' ? '#000000' : '#ffffff');
      path.setAttribute('clip-rule', 'nonzero');
      var filterID;

      if (properties[i].x.k !== 0) {
        maskType = 'mask';
        maskRef = 'mask';
        x = PropertyFactory.getProp(this.element, properties[i].x, 0, null, this.element);
        filterID = createElementID();
        expansor = createNS('filter');
        expansor.setAttribute('id', filterID);
        feMorph = createNS('feMorphology');
        feMorph.setAttribute('operator', 'erode');
        feMorph.setAttribute('in', 'SourceGraphic');
        feMorph.setAttribute('radius', '0');
        expansor.appendChild(feMorph);
        defs.appendChild(expansor);
        path.setAttribute('stroke', properties[i].mode === 's' ? '#000000' : '#ffffff');
      } else {
        feMorph = null;
        x = null;
      }

      // TODO move this to a factory or to a constructor
      this.storedData[i] = {
        elem: path,
        x: x,
        expan: feMorph,
        lastPath: '',
        lastOperator: '',
        filterId: filterID,
        lastRadius: 0,
      };
      if (properties[i].mode === 'i') {
        jLen = currentMasks.length;
        var g = createNS('g');
        for (j = 0; j < jLen; j += 1) {
          g.appendChild(currentMasks[j]);
        }
        var mask = createNS('mask');
        mask.setAttribute('mask-type', 'alpha');
        mask.setAttribute('id', layerId + '_' + count);
        mask.appendChild(path);
        defs.appendChild(mask);
        g.setAttribute('mask', 'url(' + locationHref + '#' + layerId + '_' + count + ')');

        currentMasks.length = 0;
        currentMasks.push(g);
      } else {
        currentMasks.push(path);
      }
      if (properties[i].inv && !this.solidPath) {
        this.solidPath = this.createLayerSolidPath();
      }
      // TODO move this to a factory or to a constructor
      this.viewData[i] = {
        elem: path,
        lastPath: '',
        op: PropertyFactory.getProp(this.element, properties[i].o, 0, 0.01, this.element),
        prop: ShapePropertyFactory.getShapeProp(this.element, properties[i], 3),
        invRect: rect,
      };
      if (!this.viewData[i].prop.k) {
        this.drawPath(properties[i], this.viewData[i].prop.v, this.viewData[i]);
      }
    }
  }

  this.maskElement = createNS(maskType);

  len = currentMasks.length;
  for (i = 0; i < len; i += 1) {
    this.maskElement.appendChild(currentMasks[i]);
  }

  if (count > 0) {
    this.maskElement.setAttribute('id', layerId);
    this.element.maskedElement.setAttribute(maskRef, 'url(' + locationHref + '#' + layerId + ')');
    defs.appendChild(this.maskElement);
  }
  if (this.viewData.length) {
    this.element.addRenderableComponent(this);
  }
}

MaskElement.prototype.getMaskProperty = function (pos) {
  return this.viewData[pos].prop;
};

MaskElement.prototype.renderFrame = function (isFirstFrame) {
  var finalMat = this.element.finalTransform.mat;
  var i;
  var len = this.masksProperties.length;
  for (i = 0; i < len; i += 1) {
    if (this.viewData[i].prop._mdf || isFirstFrame) {
      this.drawPath(this.masksProperties[i], this.viewData[i].prop.v, this.viewData[i]);
    }
    if (this.viewData[i].op._mdf || isFirstFrame) {
      this.viewData[i].elem.setAttribute('fill-opacity', this.viewData[i].op.v);
    }
    if (this.masksProperties[i].mode !== 'n') {
      if (this.viewData[i].invRect && (this.element.finalTransform.mProp._mdf || isFirstFrame)) {
        this.viewData[i].invRect.setAttribute('transform', finalMat.getInverseMatrix().to2dCSS());
      }
      if (this.storedData[i].x && (this.storedData[i].x._mdf || isFirstFrame)) {
        var feMorph = this.storedData[i].expan;
        if (this.storedData[i].x.v < 0) {
          if (this.storedData[i].lastOperator !== 'erode') {
            this.storedData[i].lastOperator = 'erode';
            this.storedData[i].elem.setAttribute('filter', 'url(' + locationHref + '#' + this.storedData[i].filterId + ')');
          }
          feMorph.setAttribute('radius', -this.storedData[i].x.v);
        } else {
          if (this.storedData[i].lastOperator !== 'dilate') {
            this.storedData[i].lastOperator = 'dilate';
            this.storedData[i].elem.setAttribute('filter', null);
          }
          this.storedData[i].elem.setAttribute('stroke-width', this.storedData[i].x.v * 2);
        }
      }
    }
  }
};

MaskElement.prototype.getMaskelement = function () {
  return this.maskElement;
};

MaskElement.prototype.createLayerSolidPath = function () {
  var path = 'M0,0 ';
  path += ' h' + this.globalData.compSize.w;
  path += ' v' + this.globalData.compSize.h;
  path += ' h-' + this.globalData.compSize.w;
  path += ' v-' + this.globalData.compSize.h + ' ';
  return path;
};

MaskElement.prototype.drawPath = function (pathData, pathNodes, viewData) {
  var pathString = ' M' + pathNodes.v[0][0] + ',' + pathNodes.v[0][1];
  var i;
  var len;
  len = pathNodes._length;
  for (i = 1; i < len; i += 1) {
    // pathString += " C"+pathNodes.o[i-1][0]+','+pathNodes.o[i-1][1] + " "+pathNodes.i[i][0]+','+pathNodes.i[i][1] + " "+pathNodes.v[i][0]+','+pathNodes.v[i][1];
    pathString += ' C' + pathNodes.o[i - 1][0] + ',' + pathNodes.o[i - 1][1] + ' ' + pathNodes.i[i][0] + ',' + pathNodes.i[i][1] + ' ' + pathNodes.v[i][0] + ',' + pathNodes.v[i][1];
  }
  // pathString += " C"+pathNodes.o[i-1][0]+','+pathNodes.o[i-1][1] + " "+pathNodes.i[0][0]+','+pathNodes.i[0][1] + " "+pathNodes.v[0][0]+','+pathNodes.v[0][1];
  if (pathNodes.c && len > 1) {
    pathString += ' C' + pathNodes.o[i - 1][0] + ',' + pathNodes.o[i - 1][1] + ' ' + pathNodes.i[0][0] + ',' + pathNodes.i[0][1] + ' ' + pathNodes.v[0][0] + ',' + pathNodes.v[0][1];
  }
  // pathNodes.__renderedString = pathString;

  if (viewData.lastPath !== pathString) {
    var pathShapeValue = '';
    if (viewData.elem) {
      if (pathNodes.c) {
        pathShapeValue = pathData.inv ? this.solidPath + pathString : pathString;
      }
      viewData.elem.setAttribute('d', pathShapeValue);
    }
    viewData.lastPath = pathString;
  }
};

MaskElement.prototype.destroy = function () {
  this.element = null;
  this.globalData = null;
  this.maskElement = null;
  this.data = null;
  this.masksProperties = null;
};

/**
 * @file
 * Handles AE's layer parenting property.
 *
 */

function HierarchyElement() {}

HierarchyElement.prototype = {
  /**
     * @function
     * Initializes hierarchy properties
     *
     */
  initHierarchy: function () {
    // element's parent list
    this.hierarchy = [];
    // if element is parent of another layer _isParent will be true
    this._isParent = false;
    this.checkParenting();
  },
  /**
     * @function
     * Sets layer's hierarchy.
     * @param {array} hierarch
     * layer's parent list
     *
     */
  setHierarchy: function (hierarchy) {
    this.hierarchy = hierarchy;
  },
  /**
     * @function
     * Sets layer as parent.
     *
     */
  setAsParent: function () {
    this._isParent = true;
  },
  /**
     * @function
     * Searches layer's parenting chain
     *
     */
  checkParenting: function () {
    if (this.data.parent !== undefined) {
      this.comp.buildElementParenting(this, this.data.parent, []);
    }
  },
};

/**
 * @file
 * Handles element's layer frame update.
 * Checks layer in point and out point
 *
 */

function FrameElement() {}

FrameElement.prototype = {
  /**
     * @function
     * Initializes frame related properties.
     *
     */
  initFrame: function () {
    // set to true when inpoint is rendered
    this._isFirstFrame = false;
    // list of animated properties
    this.dynamicProperties = [];
    // If layer has been modified in current tick this will be true
    this._mdf = false;
  },
  /**
     * @function
     * Calculates all dynamic values
     *
     * @param {number} num
     * current frame number in Layer's time
     * @param {boolean} isVisible
     * if layers is currently in range
     *
     */
  prepareProperties: function (num, isVisible) {
    var i;
    var len = this.dynamicProperties.length;
    for (i = 0; i < len; i += 1) {
      if (isVisible || (this._isParent && this.dynamicProperties[i].propType === 'transform')) {
        this.dynamicProperties[i].getValue();
        if (this.dynamicProperties[i]._mdf) {
          this.globalData._mdf = true;
          this._mdf = true;
        }
      }
    }
  },
  addDynamicProperty: function (prop) {
    if (this.dynamicProperties.indexOf(prop) === -1) {
      this.dynamicProperties.push(prop);
    }
  },
};

/* global TransformPropertyFactory, Matrix */

function TransformElement() {}

TransformElement.prototype = {
  initTransform: function () {
    this.finalTransform = {
      mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : { o: 0 },
      _matMdf: false,
      _opMdf: false,
      mat: new Matrix(),
    };
    if (this.data.ao) {
      this.finalTransform.mProp.autoOriented = true;
    }

    // TODO: check TYPE 11: Guided elements
    if (this.data.ty !== 11) {
      // this.createElements();
    }
  },
  renderTransform: function () {
    this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame;
    this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame;

    if (this.hierarchy) {
      var mat;
      var finalMat = this.finalTransform.mat;
      var i = 0;
      var len = this.hierarchy.length;
      // Checking if any of the transformation matrices in the hierarchy chain has changed.
      if (!this.finalTransform._matMdf) {
        while (i < len) {
          if (this.hierarchy[i].finalTransform.mProp._mdf) {
            this.finalTransform._matMdf = true;
            break;
          }
          i += 1;
        }
      }

      if (this.finalTransform._matMdf) {
        mat = this.finalTransform.mProp.v.props;
        finalMat.cloneFromProps(mat);
        for (i = 0; i < len; i += 1) {
          mat = this.hierarchy[i].finalTransform.mProp.v.props;
          finalMat.transform(mat[0], mat[1], mat[2], mat[3], mat[4], mat[5], mat[6], mat[7], mat[8], mat[9], mat[10], mat[11], mat[12], mat[13], mat[14], mat[15]);
        }
      }
    }
  },
  globalToLocal: function (pt) {
    var transforms = [];
    transforms.push(this.finalTransform);
    var flag = true;
    var comp = this.comp;
    while (flag) {
      if (comp.finalTransform) {
        if (comp.data.hasMask) {
          transforms.splice(0, 0, comp.finalTransform);
        }
        comp = comp.comp;
      } else {
        flag = false;
      }
    }
    var i;
    var len = transforms.length;
    var ptNew;
    for (i = 0; i < len; i += 1) {
      ptNew = transforms[i].mat.applyToPointArray(0, 0, 0);
      // ptNew = transforms[i].mat.applyToPointArray(pt[0],pt[1],pt[2]);
      pt = [pt[0] - ptNew[0], pt[1] - ptNew[1], 0];
    }
    return pt;
  },
  mHelper: new Matrix(),
};

function RenderableElement() {

}

RenderableElement.prototype = {
  initRenderable: function () {
    // layer's visibility related to inpoint and outpoint. Rename isVisible to isInRange
    this.isInRange = false;
    // layer's display state
    this.hidden = false;
    // If layer's transparency equals 0, it can be hidden
    this.isTransparent = false;
    // list of animated components
    this.renderableComponents = [];
  },
  addRenderableComponent: function (component) {
    if (this.renderableComponents.indexOf(component) === -1) {
      this.renderableComponents.push(component);
    }
  },
  removeRenderableComponent: function (component) {
    if (this.renderableComponents.indexOf(component) !== -1) {
      this.renderableComponents.splice(this.renderableComponents.indexOf(component), 1);
    }
  },
  prepareRenderableFrame: function (num) {
    this.checkLayerLimits(num);
  },
  checkTransparency: function () {
    if (this.finalTransform.mProp.o.v <= 0) {
      if (!this.isTransparent && this.globalData.renderConfig.hideOnTransparent) {
        this.isTransparent = true;
        this.hide();
      }
    } else if (this.isTransparent) {
      this.isTransparent = false;
      this.show();
    }
  },
  /**
     * @function
     * Initializes frame related properties.
     *
     * @param {number} num
     * current frame number in Layer's time
     *
     */
  checkLayerLimits: function (num) {
    if (this.data.ip - this.data.st <= num && this.data.op - this.data.st > num) {
      if (this.isInRange !== true) {
        this.globalData._mdf = true;
        this._mdf = true;
        this.isInRange = true;
        this.show();
      }
    } else if (this.isInRange !== false) {
      this.globalData._mdf = true;
      this.isInRange = false;
      this.hide();
    }
  },
  renderRenderable: function () {
    var i;
    var len = this.renderableComponents.length;
    for (i = 0; i < len; i += 1) {
      this.renderableComponents[i].renderFrame(this._isFirstFrame);
    }
    /* this.maskManager.renderFrame(this.finalTransform.mat);
        this.renderableEffectsManager.renderFrame(this._isFirstFrame); */
  },
  sourceRectAtTime: function () {
    return {
      top: 0,
      left: 0,
      width: 100,
      height: 100,
    };
  },
  getLayerSize: function () {
    if (this.data.ty === 5) {
      return { w: this.data.textData.width, h: this.data.textData.height };
    }
    return { w: this.data.width, h: this.data.height };
  },
};

/* global extendPrototype, RenderableElement, createProxyFunction */

function RenderableDOMElement() {}

(function () {
  var _prototype = {
    initElement: function (data, globalData, comp) {
      this.initFrame();
      this.initBaseData(data, globalData, comp);
      this.initTransform(data, globalData, comp);
      this.initHierarchy();
      this.initRenderable();
      this.initRendererElement();
      this.createContainerElements();
      this.createRenderableComponents();
      this.createContent();
      this.hide();
    },
    hide: function () {
      if (!this.hidden && (!this.isInRange || this.isTransparent)) {
        var elem = this.baseElement || this.layerElement;
        elem.style.display = 'none';
        this.hidden = true;
      }
    },
    show: function () {
      if (this.isInRange && !this.isTransparent) {
        if (!this.data.hd) {
          var elem = this.baseElement || this.layerElement;
          elem.style.display = 'block';
        }
        this.hidden = false;
        this._isFirstFrame = true;
      }
    },
    renderFrame: function () {
      // If it is exported as hidden (data.hd === true) no need to render
      // If it is not visible no need to render
      if (this.data.hd || this.hidden) {
        return;
      }
      this.renderTransform();
      this.renderRenderable();
      this.renderElement();
      this.renderInnerContent();
      if (this._isFirstFrame) {
        this._isFirstFrame = false;
      }
    },
    renderInnerContent: function () {},
    prepareFrame: function (num) {
      this._mdf = false;
      this.prepareRenderableFrame(num);
      this.prepareProperties(num, this.isInRange);
      this.checkTransparency();
    },
    destroy: function () {
      this.innerElem = null;
      this.destroyBaseElement();
    },
  };
  extendPrototype([RenderableElement, createProxyFunction(_prototype)], RenderableDOMElement);
}());

/* exported ProcessedElement */

function ProcessedElement(element, position) {
  this.elem = element;
  this.pos = position;
}

/* global createNS */

function SVGStyleData(data, level) {
  this.data = data;
  this.type = data.ty;
  this.d = '';
  this.lvl = level;
  this._mdf = false;
  this.closed = data.hd === true;
  this.pElem = createNS('path');
  this.msElem = null;
}

SVGStyleData.prototype.reset = function () {
  this.d = '';
  this._mdf = false;
};

function SVGShapeData(transformers, level, shape) {
  this.caches = [];
  this.styles = [];
  this.transformers = transformers;
  this.lStr = '';
  this.sh = shape;
  this.lvl = level;
  // TODO find if there are some cases where _isAnimated can be false.
  // For now, since shapes add up with other shapes. They have to be calculated every time.
  // One way of finding out is checking if all styles associated to this shape depend only of this shape
  this._isAnimated = !!shape.k;
  // TODO: commenting this for now since all shapes are animated
  var i = 0;
  var len = transformers.length;
  while (i < len) {
    if (transformers[i].mProps.dynamicProperties.length) {
      this._isAnimated = true;
      break;
    }
    i += 1;
  }
}

SVGShapeData.prototype.setAsAnimated = function () {
  this._isAnimated = true;
};

/* exported SVGTransformData */

function SVGTransformData(mProps, op, container) {
  this.transform = {
    mProps: mProps,
    op: op,
    container: container,
  };
  this.elements = [];
  this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length;
}

/* global DashProperty, PropertyFactory, extendPrototype, DynamicPropertyContainer */

function SVGStrokeStyleData(elem, data, styleOb) {
  this.initDynamicPropertyContainer(elem);
  this.getValue = this.iterateDynamicProperties;
  this.o = PropertyFactory.getProp(elem, data.o, 0, 0.01, this);
  this.w = PropertyFactory.getProp(elem, data.w, 0, null, this);
  this.d = new DashProperty(elem, data.d || {}, 'svg', this);
  this.c = PropertyFactory.getProp(elem, data.c, 1, 255, this);
  this.style = styleOb;
  this._isAnimated = !!this._isAnimated;
}

extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData);

/* global PropertyFactory, extendPrototype, DynamicPropertyContainer */

function SVGFillStyleData(elem, data, styleOb) {
  this.initDynamicPropertyContainer(elem);
  this.getValue = this.iterateDynamicProperties;
  this.o = PropertyFactory.getProp(elem, data.o, 0, 0.01, this);
  this.c = PropertyFactory.getProp(elem, data.c, 1, 255, this);
  this.style = styleOb;
}

extendPrototype([DynamicPropertyContainer], SVGFillStyleData);

/* global PropertyFactory, degToRads, GradientProperty, createElementID, createNS, locationHref,
extendPrototype, DynamicPropertyContainer, lineCapEnum, lineJoinEnum */

function SVGGradientFillStyleData(elem, data, styleOb) {
  this.initDynamicPropertyContainer(elem);
  this.getValue = this.iterateDynamicProperties;
  this.initGradientData(elem, data, styleOb);
}

SVGGradientFillStyleData.prototype.initGradientData = function (elem, data, styleOb) {
  this.o = PropertyFactory.getProp(elem, data.o, 0, 0.01, this);
  this.s = PropertyFactory.getProp(elem, data.s, 1, null, this);
  this.e = PropertyFactory.getProp(elem, data.e, 1, null, this);
  this.h = PropertyFactory.getProp(elem, data.h || { k: 0 }, 0, 0.01, this);
  this.a = PropertyFactory.getProp(elem, data.a || { k: 0 }, 0, degToRads, this);
  this.g = new GradientProperty(elem, data.g, this);
  this.style = styleOb;
  this.stops = [];
  this.setGradientData(styleOb.pElem, data);
  this.setGradientOpacity(data, styleOb);
  this._isAnimated = !!this._isAnimated;
};

SVGGradientFillStyleData.prototype.setGradientData = function (pathElement, data) {
  var gradientId = createElementID();
  var gfill = createNS(data.t === 1 ? 'linearGradient' : 'radialGradient');
  gfill.setAttribute('id', gradientId);
  gfill.setAttribute('spreadMethod', 'pad');
  gfill.setAttribute('gradientUnits', 'userSpaceOnUse');
  var stops = [];
  var stop;
  var j;
  var jLen;
  jLen = data.g.p * 4;
  for (j = 0; j < jLen; j += 4) {
    stop = createNS('stop');
    gfill.appendChild(stop);
    stops.push(stop);
  }
  pathElement.setAttribute(data.ty === 'gf' ? 'fill' : 'stroke', 'url(' + locationHref + '#' + gradientId + ')');
  this.gf = gfill;
  this.cst = stops;
};

SVGGradientFillStyleData.prototype.setGradientOpacity = function (data, styleOb) {
  if (this.g._hasOpacity && !this.g._collapsable) {
    var stop;
    var j;
    var jLen;
    var mask = createNS('mask');
    var maskElement = createNS('path');
    mask.appendChild(maskElement);
    var opacityId = createElementID();
    var maskId = createElementID();
    mask.setAttribute('id', maskId);
    var opFill = createNS(data.t === 1 ? 'linearGradient' : 'radialGradient');
    opFill.setAttribute('id', opacityId);
    opFill.setAttribute('spreadMethod', 'pad');
    opFill.setAttribute('gradientUnits', 'userSpaceOnUse');
    jLen = data.g.k.k[0].s ? data.g.k.k[0].s.length : data.g.k.k.length;
    var stops = this.stops;
    for (j = data.g.p * 4; j < jLen; j += 2) {
      stop = createNS('stop');
      stop.setAttribute('stop-color', 'rgb(255,255,255)');
      opFill.appendChild(stop);
      stops.push(stop);
    }
    maskElement.setAttribute(data.ty === 'gf' ? 'fill' : 'stroke', 'url(' + locationHref + '#' + opacityId + ')');
    if (data.ty === 'gs') {
      maskElement.setAttribute('stroke-linecap', lineCapEnum[data.lc || 2]);
      maskElement.setAttribute('stroke-linejoin', lineJoinEnum[data.lj || 2]);
      if (data.lj === 1) {
        maskElement.setAttribute('stroke-miterlimit', data.ml);
      }
    }
    this.of = opFill;
    this.ms = mask;
    this.ost = stops;
    this.maskId = maskId;
    styleOb.msElem = maskElement;
  }
};

extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData);

/* global PropertyFactory, DashProperty, extendPrototype, SVGGradientFillStyleData, DynamicPropertyContainer */

function SVGGradientStrokeStyleData(elem, data, styleOb) {
  this.initDynamicPropertyContainer(elem);
  this.getValue = this.iterateDynamicProperties;
  this.w = PropertyFactory.getProp(elem, data.w, 0, null, this);
  this.d = new DashProperty(elem, data.d || {}, 'svg', this);
  this.initGradientData(elem, data, styleOb);
  this._isAnimated = !!this._isAnimated;
}

extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);

/* global createNS */
/* exported ShapeGroupData */

function ShapeGroupData() {
  this.it = [];
  this.prevViewData = [];
  this.gr = createNS('g');
}

/* global Matrix, buildShapeString, bmFloor */
/* exported SVGElementsRenderer */

var SVGElementsRenderer = (function () {
  var _identityMatrix = new Matrix();
  var _matrixHelper = new Matrix();

  var ob = {
    createRenderFunction: createRenderFunction,
  };

  function createRenderFunction(data) {
    switch (data.ty) {
      case 'fl':
        return renderFill;
      case 'gf':
        return renderGradient;
      case 'gs':
        return renderGradientStroke;
      case 'st':
        return renderStroke;
      case 'sh':
      case 'el':
      case 'rc':
      case 'sr':
        return renderPath;
      case 'tr':
        return renderContentTransform;
      default:
        return null;
    }
  }

  function renderContentTransform(styleData, itemData, isFirstFrame) {
    if (isFirstFrame || itemData.transform.op._mdf) {
      itemData.transform.container.setAttribute('opacity', itemData.transform.op.v);
    }
    if (isFirstFrame || itemData.transform.mProps._mdf) {
      itemData.transform.container.setAttribute('transform', itemData.transform.mProps.v.to2dCSS());
    }
  }

  function renderPath(styleData, itemData, isFirstFrame) {
    var j;
    var jLen;
    var pathStringTransformed;
    var redraw;
    var pathNodes;
    var l;
    var lLen = itemData.styles.length;
    var lvl = itemData.lvl;
    var paths;
    var mat;
    var props;
    var iterations;
    var k;
    for (l = 0; l < lLen; l += 1) {
      redraw = itemData.sh._mdf || isFirstFrame;
      if (itemData.styles[l].lvl < lvl) {
        mat = _matrixHelper.reset();
        iterations = lvl - itemData.styles[l].lvl;
        k = itemData.transformers.length - 1;
        while (!redraw && iterations > 0) {
          redraw = itemData.transformers[k].mProps._mdf || redraw;
          iterations -= 1;
          k -= 1;
        }
        if (redraw) {
          iterations = lvl - itemData.styles[l].lvl;
          k = itemData.transformers.length - 1;
          while (iterations > 0) {
            props = itemData.transformers[k].mProps.v.props;
            mat.transform(props[0], props[1], props[2], props[3], props[4], props[5], props[6], props[7], props[8], props[9], props[10], props[11], props[12], props[13], props[14], props[15]);
            iterations -= 1;
            k -= 1;
          }
        }
      } else {
        mat = _identityMatrix;
      }
      paths = itemData.sh.paths;
      jLen = paths._length;
      if (redraw) {
        pathStringTransformed = '';
        for (j = 0; j < jLen; j += 1) {
          pathNodes = paths.shapes[j];
          if (pathNodes && pathNodes._length) {
            pathStringTransformed += buildShapeString(pathNodes, pathNodes._length, pathNodes.c, mat);
          }
        }
        itemData.caches[l] = pathStringTransformed;
      } else {
        pathStringTransformed = itemData.caches[l];
      }
      itemData.styles[l].d += styleData.hd === true ? '' : pathStringTransformed;
      itemData.styles[l]._mdf = redraw || itemData.styles[l]._mdf;
    }
  }

  function renderFill(styleData, itemData, isFirstFrame) {
    var styleElem = itemData.style;

    if (itemData.c._mdf || isFirstFrame) {
      styleElem.pElem.setAttribute('fill', 'rgb(' + bmFloor(itemData.c.v[0]) + ',' + bmFloor(itemData.c.v[1]) + ',' + bmFloor(itemData.c.v[2]) + ')');
    }
    if (itemData.o._mdf || isFirstFrame) {
      styleElem.pElem.setAttribute('fill-opacity', itemData.o.v);
    }
  }

  function renderGradientStroke(styleData, itemData, isFirstFrame) {
    renderGradient(styleData, itemData, isFirstFrame);
    renderStroke(styleData, itemData, isFirstFrame);
  }

  function renderGradient(styleData, itemData, isFirstFrame) {
    var gfill = itemData.gf;
    var hasOpacity = itemData.g._hasOpacity;
    var pt1 = itemData.s.v;
    var pt2 = itemData.e.v;

    if (itemData.o._mdf || isFirstFrame) {
      var attr = styleData.ty === 'gf' ? 'fill-opacity' : 'stroke-opacity';
      itemData.style.pElem.setAttribute(attr, itemData.o.v);
    }
    if (itemData.s._mdf || isFirstFrame) {
      var attr1 = styleData.t === 1 ? 'x1' : 'cx';
      var attr2 = attr1 === 'x1' ? 'y1' : 'cy';
      gfill.setAttribute(attr1, pt1[0]);
      gfill.setAttribute(attr2, pt1[1]);
      if (hasOpacity && !itemData.g._collapsable) {
        itemData.of.setAttribute(attr1, pt1[0]);
        itemData.of.setAttribute(attr2, pt1[1]);
      }
    }
    var stops;
    var i;
    var len;
    var stop;
    if (itemData.g._cmdf || isFirstFrame) {
      stops = itemData.cst;
      var cValues = itemData.g.c;
      len = stops.length;
      for (i = 0; i < len; i += 1) {
        stop = stops[i];
        stop.setAttribute('offset', cValues[i * 4] + '%');
        stop.setAttribute('stop-color', 'rgb(' + cValues[i * 4 + 1] + ',' + cValues[i * 4 + 2] + ',' + cValues[i * 4 + 3] + ')');
      }
    }
    if (hasOpacity && (itemData.g._omdf || isFirstFrame)) {
      var oValues = itemData.g.o;
      if (itemData.g._collapsable) {
        stops = itemData.cst;
      } else {
        stops = itemData.ost;
      }
      len = stops.length;
      for (i = 0; i < len; i += 1) {
        stop = stops[i];
        if (!itemData.g._collapsable) {
          stop.setAttribute('offset', oValues[i * 2] + '%');
        }
        stop.setAttribute('stop-opacity', oValues[i * 2 + 1]);
      }
    }
    if (styleData.t === 1) {
      if (itemData.e._mdf || isFirstFrame) {
        gfill.setAttribute('x2', pt2[0]);
        gfill.setAttribute('y2', pt2[1]);
        if (hasOpacity && !itemData.g._collapsable) {
          itemData.of.setAttribute('x2', pt2[0]);
          itemData.of.setAttribute('y2', pt2[1]);
        }
      }
    } else {
      var rad;
      if (itemData.s._mdf || itemData.e._mdf || isFirstFrame) {
        rad = Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
        gfill.setAttribute('r', rad);
        if (hasOpacity && !itemData.g._collapsable) {
          itemData.of.setAttribute('r', rad);
        }
      }
      if (itemData.e._mdf || itemData.h._mdf || itemData.a._mdf || isFirstFrame) {
        if (!rad) {
          rad = Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
        }
        var ang = Math.atan2(pt2[1] - pt1[1], pt2[0] - pt1[0]);

        var percent = itemData.h.v;
        if (percent >= 1) {
          percent = 0.99;
        } else if (percent <= -1) {
          percent = -0.99;
        }
        var dist = rad * percent;
        var x = Math.cos(ang + itemData.a.v) * dist + pt1[0];
        var y = Math.sin(ang + itemData.a.v) * dist + pt1[1];
        gfill.setAttribute('fx', x);
        gfill.setAttribute('fy', y);
        if (hasOpacity && !itemData.g._collapsable) {
          itemData.of.setAttribute('fx', x);
          itemData.of.setAttribute('fy', y);
        }
      }
      // gfill.setAttribute('fy','200');
    }
  }

  function renderStroke(styleData, itemData, isFirstFrame) {
    var styleElem = itemData.style;
    var d = itemData.d;
    if (d && (d._mdf || isFirstFrame) && d.dashStr) {
      styleElem.pElem.setAttribute('stroke-dasharray', d.dashStr);
      styleElem.pElem.setAttribute('stroke-dashoffset', d.dashoffset[0]);
    }
    if (itemData.c && (itemData.c._mdf || isFirstFrame)) {
      styleElem.pElem.setAttribute('stroke', 'rgb(' + bmFloor(itemData.c.v[0]) + ',' + bmFloor(itemData.c.v[1]) + ',' + bmFloor(itemData.c.v[2]) + ')');
    }
    if (itemData.o._mdf || isFirstFrame) {
      styleElem.pElem.setAttribute('stroke-opacity', itemData.o.v);
    }
    if (itemData.w._mdf || isFirstFrame) {
      styleElem.pElem.setAttribute('stroke-width', itemData.w.v);
      if (styleElem.msElem) {
        styleElem.msElem.setAttribute('stroke-width', itemData.w.v);
      }
    }
  }

  return ob;
}());

/* global Matrix */

function ShapeTransformManager() {
  this.sequences = {};
  this.sequenceList = [];
  this.transform_key_count = 0;
}

ShapeTransformManager.prototype = {
  addTransformSequence: function (transforms) {
    var i;
    var len = transforms.length;
    var key = '_';
    for (i = 0; i < len; i += 1) {
      key += transforms[i].transform.key + '_';
    }
    var sequence = this.sequences[key];
    if (!sequence) {
      sequence = {
        transforms: [].concat(transforms),
        finalTransform: new Matrix(),
        _mdf: false,
      };
      this.sequences[key] = sequence;
      this.sequenceList.push(sequence);
    }
    return sequence;
  },
  processSequence: function (sequence, isFirstFrame) {
    var i = 0;
    var len = sequence.transforms.length;
    var _mdf = isFirstFrame;
    while (i < len && !isFirstFrame) {
      if (sequence.transforms[i].transform.mProps._mdf) {
        _mdf = true;
        break;
      }
      i += 1;
    }
    if (_mdf) {
      var props;
      sequence.finalTransform.reset();
      for (i = len - 1; i >= 0; i -= 1) {
        props = sequence.transforms[i].transform.mProps.v.props;
        sequence.finalTransform.transform(props[0], props[1], props[2], props[3], props[4], props[5], props[6], props[7], props[8], props[9], props[10], props[11], props[12], props[13], props[14], props[15]);
      }
    }
    sequence._mdf = _mdf;
  },
  processSequences: function (isFirstFrame) {
    var i;
    var len = this.sequenceList.length;
    for (i = 0; i < len; i += 1) {
      this.processSequence(this.sequenceList[i], isFirstFrame);
    }
  },
  getNewKey: function () {
    this.transform_key_count += 1;
    return '_' + this.transform_key_count;
  },
};

/* global ShapePropertyFactory, SVGShapeData */

function CVShapeData(element, data, styles, transformsManager) {
  this.styledShapes = [];
  this.tr = [0, 0, 0, 0, 0, 0];
  var ty = 4;
  if (data.ty === 'rc') {
    ty = 5;
  } else if (data.ty === 'el') {
    ty = 6;
  } else if (data.ty === 'sr') {
    ty = 7;
  }
  this.sh = ShapePropertyFactory.getShapeProp(element, data, ty, element);
  var i;
  var len = styles.length;
  var styledShape;
  for (i = 0; i < len; i += 1) {
    if (!styles[i].closed) {
      styledShape = {
        transforms: transformsManager.addTransformSequence(styles[i].transforms),
        trNodes: [],
      };
      this.styledShapes.push(styledShape);
      styles[i].elements.push(styledShape);
    }
  }
}

CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated;

/* global LayerExpressionInterface, EffectsExpressionInterface, CompExpressionInterface, ShapeExpressionInterface,
TextExpressionInterface, getBlendMode,createElementID, EffectsManager */

function BaseElement() {
}

BaseElement.prototype = {
  checkMasks: function () {
    if (!this.data.hasMask) {
      return false;
    }
    var i = 0;
    var len = this.data.masksProperties.length;
    while (i < len) {
      if ((this.data.masksProperties[i].mode !== 'n' && this.data.masksProperties[i].cl !== false)) {
        return true;
      }
      i += 1;
    }
    return false;
  },
  initExpressions: function () {
    this.layerInterface = LayerExpressionInterface(this);
    if (this.data.hasMask && this.maskManager) {
      this.layerInterface.registerMaskInterface(this.maskManager);
    }
    var effectsInterface = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
    this.layerInterface.registerEffectsInterface(effectsInterface);

    if (this.data.ty === 0 || this.data.xt) {
      this.compInterface = CompExpressionInterface(this);
    } else if (this.data.ty === 4) {
      this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface);
      this.layerInterface.content = this.layerInterface.shapeInterface;
    } else if (this.data.ty === 5) {
      this.layerInterface.textInterface = TextExpressionInterface(this);
      this.layerInterface.text = this.layerInterface.textInterface;
    }
  },
  setBlendMode: function () {
    var blendModeValue = getBlendMode(this.data.bm);
    var elem = this.baseElement || this.layerElement;

    elem.style['mix-blend-mode'] = blendModeValue;
  },
  initBaseData: function (data, globalData, comp) {
    this.globalData = globalData;
    this.comp = comp;
    this.data = data;
    this.layerId = createElementID();

    // Stretch factor for old animations missing this property.
    if (!this.data.sr) {
      this.data.sr = 1;
    }
    // effects manager
    this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties);
  },
  getType: function () {
    return this.type;
  },
  sourceRectAtTime: function () {},
};

/* global extendPrototype, BaseElement, TransformElement, HierarchyElement, FrameElement */

function NullElement(data, globalData, comp) {
  this.initFrame();
  this.initBaseData(data, globalData, comp);
  this.initFrame();
  this.initTransform(data, globalData, comp);
  this.initHierarchy();
}

NullElement.prototype.prepareFrame = function (num) {
  this.prepareProperties(num, true);
};

NullElement.prototype.renderFrame = function () {
};

NullElement.prototype.getBaseElement = function () {
  return null;
};

NullElement.prototype.destroy = function () {
};

NullElement.prototype.sourceRectAtTime = function () {
};

NullElement.prototype.hide = function () {
};

extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement);

/* global filtersFactory, featureSupport, filtersFactory, createElementID, createNS, MaskElement, SVGEffects, locationHref */

function SVGBaseElement() {
}

SVGBaseElement.prototype = {
  initRendererElement: function () {
    this.layerElement = createNS('g');
  },
  createContainerElements: function () {
    this.matteElement = createNS('g');
    this.transformedElement = this.layerElement;
    this.maskedElement = this.layerElement;
    this._sizeChanged = false;
    var layerElementParent = null;
    // If this layer acts as a mask for the following layer
    var filId;
    var fil;
    var gg;
    if (this.data.td) {
      if (this.data.td == 3 || this.data.td == 1) { // eslint-disable-line eqeqeq
        var masker = createNS('mask');
        masker.setAttribute('id', this.layerId);
        masker.setAttribute('mask-type', this.data.td == 3 ? 'luminance' : 'alpha'); // eslint-disable-line eqeqeq
        masker.appendChild(this.layerElement);
        layerElementParent = masker;
        this.globalData.defs.appendChild(masker);
        // This is only for IE and Edge when mask if of type alpha
        if (!featureSupport.maskType && this.data.td == 1) { // eslint-disable-line eqeqeq
          masker.setAttribute('mask-type', 'luminance');
          filId = createElementID();
          fil = filtersFactory.createFilter(filId);
          this.globalData.defs.appendChild(fil);
          fil.appendChild(filtersFactory.createAlphaToLuminanceFilter());
          gg = createNS('g');
          gg.appendChild(this.layerElement);
          layerElementParent = gg;
          masker.appendChild(gg);
          gg.setAttribute('filter', 'url(' + locationHref + '#' + filId + ')');
        }
      } else if (this.data.td == 2) { // eslint-disable-line eqeqeq
        var maskGroup = createNS('mask');
        maskGroup.setAttribute('id', this.layerId);
        maskGroup.setAttribute('mask-type', 'alpha');
        var maskGrouper = createNS('g');
        maskGroup.appendChild(maskGrouper);
        filId = createElementID();
        fil = filtersFactory.createFilter(filId);
        /// /

        // This solution doesn't work on Android when meta tag with viewport attribute is set
        /* var feColorMatrix = createNS('feColorMatrix');
                feColorMatrix.setAttribute('type', 'matrix');
                feColorMatrix.setAttribute('color-interpolation-filters', 'sRGB');
                feColorMatrix.setAttribute('values','1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 -1 1');
                fil.appendChild(feColorMatrix); */
        /// /
        var feCTr = createNS('feComponentTransfer');
        feCTr.setAttribute('in', 'SourceGraphic');
        fil.appendChild(feCTr);
        var feFunc = createNS('feFuncA');
        feFunc.setAttribute('type', 'table');
        feFunc.setAttribute('tableValues', '1.0 0.0');
        feCTr.appendChild(feFunc);
        /// /
        this.globalData.defs.appendChild(fil);
        var alphaRect = createNS('rect');
        alphaRect.setAttribute('width', this.comp.data.w);
        alphaRect.setAttribute('height', this.comp.data.h);
        alphaRect.setAttribute('x', '0');
        alphaRect.setAttribute('y', '0');
        alphaRect.setAttribute('fill', '#ffffff');
        alphaRect.setAttribute('opacity', '0');
        maskGrouper.setAttribute('filter', 'url(' + locationHref + '#' + filId + ')');
        maskGrouper.appendChild(alphaRect);
        maskGrouper.appendChild(this.layerElement);
        layerElementParent = maskGrouper;
        if (!featureSupport.maskType) {
          maskGroup.setAttribute('mask-type', 'luminance');
          fil.appendChild(filtersFactory.createAlphaToLuminanceFilter());
          gg = createNS('g');
          maskGrouper.appendChild(alphaRect);
          gg.appendChild(this.layerElement);
          layerElementParent = gg;
          maskGrouper.appendChild(gg);
        }
        this.globalData.defs.appendChild(maskGroup);
      }
    } else if (this.data.tt) {
      this.matteElement.appendChild(this.layerElement);
      layerElementParent = this.matteElement;
      this.baseElement = this.matteElement;
    } else {
      this.baseElement = this.layerElement;
    }
    if (this.data.ln) {
      this.layerElement.setAttribute('id', this.data.ln);
    }
    if (this.data.cl) {
      this.layerElement.setAttribute('class', this.data.cl);
    }
    // Clipping compositions to hide content that exceeds boundaries. If collapsed transformations is on, component should not be clipped
    if (this.data.ty === 0 && !this.data.hd) {
      var cp = createNS('clipPath');
      var pt = createNS('path');
      pt.setAttribute('d', 'M0,0 L' + this.data.w + ',0 L' + this.data.w + ',' + this.data.h + ' L0,' + this.data.h + 'z');
      var clipId = createElementID();
      cp.setAttribute('id', clipId);
      cp.appendChild(pt);
      this.globalData.defs.appendChild(cp);

      if (this.checkMasks()) {
        var cpGroup = createNS('g');
        cpGroup.setAttribute('clip-path', 'url(' + locationHref + '#' + clipId + ')');
        cpGroup.appendChild(this.layerElement);
        this.transformedElement = cpGroup;
        if (layerElementParent) {
          layerElementParent.appendChild(this.transformedElement);
        } else {
          this.baseElement = this.transformedElement;
        }
      } else {
        this.layerElement.setAttribute('clip-path', 'url(' + locationHref + '#' + clipId + ')');
      }
    }
    if (this.data.bm !== 0) {
      this.setBlendMode();
    }
  },
  renderElement: function () {
    if (this.finalTransform._matMdf) {
      this.transformedElement.setAttribute('transform', this.finalTransform.mat.to2dCSS());
    }
    if (this.finalTransform._opMdf) {
      this.transformedElement.setAttribute('opacity', this.finalTransform.mProp.o.v);
    }
  },
  destroyBaseElement: function () {
    this.layerElement = null;
    this.matteElement = null;
    this.maskManager.destroy();
  },
  getBaseElement: function () {
    if (this.data.hd) {
      return null;
    }
    return this.baseElement;
  },
  createRenderableComponents: function () {
    this.maskManager = new MaskElement(this.data, this, this.globalData);
    this.renderableEffectsManager = new SVGEffects(this);
  },
  setMatte: function (id) {
    if (!this.matteElement) {
      return;
    }
    this.matteElement.setAttribute('mask', 'url(' + locationHref + '#' + id + ')');
  },
};

/* global ProcessedElement */

function IShapeElement() {
}

IShapeElement.prototype = {
  addShapeToModifiers: function (data) {
    var i;
    var len = this.shapeModifiers.length;
    for (i = 0; i < len; i += 1) {
      this.shapeModifiers[i].addShape(data);
    }
  },
  isShapeInAnimatedModifiers: function (data) {
    var i = 0;
    var len = this.shapeModifiers.length;
    while (i < len) {
      if (this.shapeModifiers[i].isAnimatedWithShape(data)) {
        return true;
      }
    }
    return false;
  },
  renderModifiers: function () {
    if (!this.shapeModifiers.length) {
      return;
    }
    var i;
    var len = this.shapes.length;
    for (i = 0; i < len; i += 1) {
      this.shapes[i].sh.reset();
    }

    len = this.shapeModifiers.length;
    var shouldBreakProcess;
    for (i = len - 1; i >= 0; i -= 1) {
      shouldBreakProcess = this.shapeModifiers[i].processShapes(this._isFirstFrame);
      // workaround to fix cases where a repeater resets the shape so the following processes get called twice
      // TODO: find a better solution for this
      if (shouldBreakProcess) {
        break;
      }
    }
  },

  searchProcessedElement: function (elem) {
    var elements = this.processedElements;
    var i = 0;
    var len = elements.length;
    while (i < len) {
      if (elements[i].elem === elem) {
        return elements[i].pos;
      }
      i += 1;
    }
    return 0;
  },
  addProcessedElement: function (elem, pos) {
    var elements = this.processedElements;
    var i = elements.length;
    while (i) {
      i -= 1;
      if (elements[i].elem === elem) {
        elements[i].pos = pos;
        return;
      }
    }
    elements.push(new ProcessedElement(elem, pos));
  },
  prepareFrame: function (num) {
    this.prepareRenderableFrame(num);
    this.prepareProperties(num, this.isInRange);
  },
};

/* global TextProperty, TextAnimatorProperty, buildShapeString, LetterProps */

function ITextElement() {
}

ITextElement.prototype.initElement = function (data, globalData, comp) {
  this.lettersChangedFlag = true;
  this.initFrame();
  this.initBaseData(data, globalData, comp);
  this.textProperty = new TextProperty(this, data.t, this.dynamicProperties);
  this.textAnimator = new TextAnimatorProperty(data.t, this.renderType, this);
  this.initTransform(data, globalData, comp);
  this.initHierarchy();
  this.initRenderable();
  this.initRendererElement();
  this.createContainerElements();
  this.createRenderableComponents();
  this.createContent();
  this.hide();
  this.textAnimator.searchProperties(this.dynamicProperties);
};

ITextElement.prototype.prepareFrame = function (num) {
  this._mdf = false;
  this.prepareRenderableFrame(num);
  this.prepareProperties(num, this.isInRange);
  if (this.textProperty._mdf || this.textProperty._isFirstFrame) {
    this.buildNewText();
    this.textProperty._isFirstFrame = false;
    this.textProperty._mdf = false;
  }
};

ITextElement.prototype.createPathShape = function (matrixHelper, shapes) {
  var j;
  var jLen = shapes.length;
  var pathNodes;
  var shapeStr = '';
  for (j = 0; j < jLen; j += 1) {
    pathNodes = shapes[j].ks.k;
    shapeStr += buildShapeString(pathNodes, pathNodes.i.length, true, matrixHelper);
  }
  return shapeStr;
};

ITextElement.prototype.updateDocumentData = function (newData, index) {
  this.textProperty.updateDocumentData(newData, index);
};

ITextElement.prototype.canResizeFont = function (_canResize) {
  this.textProperty.canResizeFont(_canResize);
};

ITextElement.prototype.setMinimumFontSize = function (_fontSize) {
  this.textProperty.setMinimumFontSize(_fontSize);
};

ITextElement.prototype.applyTextPropertiesToMatrix = function (documentData, matrixHelper, lineNumber, xPos, yPos) {
  if (documentData.ps) {
    matrixHelper.translate(documentData.ps[0], documentData.ps[1] + documentData.ascent, 0);
  }
  matrixHelper.translate(0, -documentData.ls, 0);
  switch (documentData.j) {
    case 1:
      matrixHelper.translate(documentData.justifyOffset + (documentData.boxWidth - documentData.lineWidths[lineNumber]), 0, 0);
      break;
    case 2:
      matrixHelper.translate(documentData.justifyOffset + (documentData.boxWidth - documentData.lineWidths[lineNumber]) / 2, 0, 0);
      break;
    default:
      break;
  }
  matrixHelper.translate(xPos, yPos, 0);
};

ITextElement.prototype.buildColor = function (colorData) {
  return 'rgb(' + Math.round(colorData[0] * 255) + ',' + Math.round(colorData[1] * 255) + ',' + Math.round(colorData[2] * 255) + ')';
};

ITextElement.prototype.emptyProp = new LetterProps();

ITextElement.prototype.destroy = function () {

};

/* global extendPrototype, BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement */

function ICompElement() {}

extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement);

ICompElement.prototype.initElement = function (data, globalData, comp) {
  this.initFrame();
  this.initBaseData(data, globalData, comp);
  this.initTransform(data, globalData, comp);
  this.initRenderable();
  this.initHierarchy();
  this.initRendererElement();
  this.createContainerElements();
  this.createRenderableComponents();
  if (this.data.xt || !globalData.progressiveLoad) {
    this.buildAllItems();
  }
  this.hide();
};

/* ICompElement.prototype.hide = function(){
    if(!this.hidden){
        this.hideElement();
        var i,len = this.elements.length;
        for( i = 0; i < len; i+=1 ){
            if(this.elements[i]){
                this.elements[i].hide();
            }
        }
    }
}; */

ICompElement.prototype.prepareFrame = function (num) {
  this._mdf = false;
  this.prepareRenderableFrame(num);
  this.prepareProperties(num, this.isInRange);
  if (!this.isInRange && !this.data.xt) {
    return;
  }

  if (!this.tm._placeholder) {
    var timeRemapped = this.tm.v;
    if (timeRemapped === this.data.op) {
      timeRemapped = this.data.op - 1;
    }
    this.renderedFrame = timeRemapped;
  } else {
    this.renderedFrame = num / this.data.sr;
  }
  var i;
  var len = this.elements.length;
  if (!this.completeLayers) {
    this.checkLayers(this.renderedFrame);
  }
  // This iteration needs to be backwards because of how expressions connect between each other
  for (i = len - 1; i >= 0; i -= 1) {
    if (this.completeLayers || this.elements[i]) {
      this.elements[i].prepareFrame(this.renderedFrame - this.layers[i].st);
      if (this.elements[i]._mdf) {
        this._mdf = true;
      }
    }
  }
};

ICompElement.prototype.renderInnerContent = function () {
  var i;
  var len = this.layers.length;
  for (i = 0; i < len; i += 1) {
    if (this.completeLayers || this.elements[i]) {
      this.elements[i].renderFrame();
    }
  }
};

ICompElement.prototype.setElements = function (elems) {
  this.elements = elems;
};

ICompElement.prototype.getElements = function () {
  return this.elements;
};

ICompElement.prototype.destroyElements = function () {
  var i;
  var len = this.layers.length;
  for (i = 0; i < len; i += 1) {
    if (this.elements[i]) {
      this.elements[i].destroy();
    }
  }
};

ICompElement.prototype.destroy = function () {
  this.destroyElements();
  this.destroyBaseElement();
};

/* global extendPrototype, BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, createNS */

function IImageElement(data, globalData, comp) {
  this.assetData = globalData.getAssetData(data.refId);
  this.initElement(data, globalData, comp);
  this.sourceRect = {
    top: 0, left: 0, width: this.assetData.w, height: this.assetData.h,
  };
}

extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement);

IImageElement.prototype.createContent = function () {
  var assetPath = this.globalData.getAssetsPath(this.assetData);

  this.innerElem = createNS('image');
  this.innerElem.setAttribute('width', this.assetData.w + 'px');
  this.innerElem.setAttribute('height', this.assetData.h + 'px');
  this.innerElem.setAttribute('preserveAspectRatio', this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio);
  this.innerElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', assetPath);

  this.layerElement.appendChild(this.innerElem);
};

IImageElement.prototype.sourceRectAtTime = function () {
  return this.sourceRect;
};

/* global extendPrototype, IImageElement, createNS */

function ISolidElement(data, globalData, comp) {
  this.initElement(data, globalData, comp);
}
extendPrototype([IImageElement], ISolidElement);

ISolidElement.prototype.createContent = function () {
  var rect = createNS('rect');
  /// /rect.style.width = this.data.sw;
  /// /rect.style.height = this.data.sh;
  /// /rect.style.fill = this.data.sc;
  rect.setAttribute('width', this.data.sw);
  rect.setAttribute('height', this.data.sh);
  rect.setAttribute('fill', this.data.sc);
  this.layerElement.appendChild(rect);
};

/* global PropertyFactory, extendPrototype, RenderableElement, BaseElement, FrameElement */

function AudioElement(data, globalData, comp) {
  this.initFrame();
  this.initRenderable();
  this.assetData = globalData.getAssetData(data.refId);
  this.initBaseData(data, globalData, comp);
  this._isPlaying = false;
  this._canPlay = false;
  var assetPath = this.globalData.getAssetsPath(this.assetData);
  this.audio = this.globalData.audioController.createAudio(assetPath);
  this._currentTime = 0;
  this.globalData.audioController.addAudio(this);
  this.tm = data.tm ? PropertyFactory.getProp(this, data.tm, 0, globalData.frameRate, this) : { _placeholder: true };
}

AudioElement.prototype.prepareFrame = function (num) {
  this.prepareRenderableFrame(num, true);
  this.prepareProperties(num, true);
  if (!this.tm._placeholder) {
    var timeRemapped = this.tm.v;
    this._currentTime = timeRemapped;
  } else {
    this._currentTime = num / this.data.sr;
  }
};

extendPrototype([RenderableElement, BaseElement, FrameElement], AudioElement);

AudioElement.prototype.renderFrame = function () {
  if (this.isInRange && this._canPlay) {
    if (!this._isPlaying) {
      this.audio.play();
      this.audio.seek(this._currentTime / this.globalData.frameRate);
      this._isPlaying = true;
    } else if (!this.audio.playing()
      || Math.abs(this._currentTime / this.globalData.frameRate - this.audio.seek()) > 0.1
    ) {
      this.audio.seek(this._currentTime / this.globalData.frameRate);
    }
  }
};

AudioElement.prototype.show = function () {
  // this.audio.play()
};

AudioElement.prototype.hide = function () {
  this.audio.pause();
  this._isPlaying = false;
};

AudioElement.prototype.pause = function () {
  this.audio.pause();
  this._isPlaying = false;
  this._canPlay = false;
};

AudioElement.prototype.resume = function () {
  this._canPlay = true;
};

AudioElement.prototype.setRate = function (rateValue) {
  this.audio.rate(rateValue);
};

AudioElement.prototype.volume = function (volumeValue) {
  this.audio.volume(volumeValue);
};

AudioElement.prototype.getBaseElement = function () {
  return null;
};

AudioElement.prototype.destroy = function () {
};

AudioElement.prototype.sourceRectAtTime = function () {
};

AudioElement.prototype.initExpressions = function () {
};

/* global extendPrototype, RenderableElement, BaseElement, FrameElement, FootageInterface */

function FootageElement(data, globalData, comp) {
  this.initFrame();
  this.initRenderable();
  this.assetData = globalData.getAssetData(data.refId);
  this.footageData = globalData.imageLoader.getAsset(this.assetData);
  this.initBaseData(data, globalData, comp);
}

FootageElement.prototype.prepareFrame = function () {
};

extendPrototype([RenderableElement, BaseElement, FrameElement], FootageElement);

FootageElement.prototype.getBaseElement = function () {
  return null;
};

FootageElement.prototype.renderFrame = function () {
};

FootageElement.prototype.destroy = function () {
};

FootageElement.prototype.initExpressions = function () {
  this.layerInterface = FootageInterface(this);
};

FootageElement.prototype.getFootageData = function () {
  return this.footageData;
};

/* global createSizedArray, PropertyFactory, extendPrototype, SVGRenderer, ICompElement, SVGBaseElement */

function SVGCompElement(data, globalData, comp) {
  this.layers = data.layers;
  this.supports3d = true;
  this.completeLayers = false;
  this.pendingElements = [];
  this.elements = this.layers ? createSizedArray(this.layers.length) : [];
  // this.layerElement = createNS('g');
  this.initElement(data, globalData, comp);
  this.tm = data.tm ? PropertyFactory.getProp(this, data.tm, 0, globalData.frameRate, this) : { _placeholder: true };
}

extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement);

/* global extendPrototype, BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement,
RenderableDOMElement, ITextElement, createSizedArray, createNS */

function SVGTextLottieElement(data, globalData, comp) {
  this.textSpans = [];
  this.renderType = 'svg';
  this.initElement(data, globalData, comp);
}

extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextLottieElement);

SVGTextLottieElement.prototype.createContent = function () {
  if (this.data.singleShape && !this.globalData.fontManager.chars) {
    this.textContainer = createNS('text');
  }
};

SVGTextLottieElement.prototype.buildTextContents = function (textArray) {
  var i = 0;
  var len = textArray.length;
  var textContents = [];
  var currentTextContent = '';
  while (i < len) {
    if (textArray[i] === String.fromCharCode(13) || textArray[i] === String.fromCharCode(3)) {
      textContents.push(currentTextContent);
      currentTextContent = '';
    } else {
      currentTextContent += textArray[i];
    }
    i += 1;
  }
  textContents.push(currentTextContent);
  return textContents;
};

SVGTextLottieElement.prototype.buildNewText = function () {
  var i;
  var len;

  var documentData = this.textProperty.currentData;
  this.renderedLetters = createSizedArray(documentData ? documentData.l.length : 0);
  if (documentData.fc) {
    this.layerElement.setAttribute('fill', this.buildColor(documentData.fc));
  } else {
    this.layerElement.setAttribute('fill', 'rgba(0,0,0,0)');
  }
  if (documentData.sc) {
    this.layerElement.setAttribute('stroke', this.buildColor(documentData.sc));
    this.layerElement.setAttribute('stroke-width', documentData.sw);
  }
  this.layerElement.setAttribute('font-size', documentData.finalSize);
  var fontData = this.globalData.fontManager.getFontByName(documentData.f);
  if (fontData.fClass) {
    this.layerElement.setAttribute('class', fontData.fClass);
  } else {
    this.layerElement.setAttribute('font-family', fontData.fFamily);
    var fWeight = documentData.fWeight;
    var fStyle = documentData.fStyle;
    this.layerElement.setAttribute('font-style', fStyle);
    this.layerElement.setAttribute('font-weight', fWeight);
  }
  this.layerElement.setAttribute('aria-label', documentData.t);

  var letters = documentData.l || [];
  var usesGlyphs = !!this.globalData.fontManager.chars;
  len = letters.length;

  var tSpan;
  var matrixHelper = this.mHelper;
  var shapes;
  var shapeStr = '';
  var singleShape = this.data.singleShape;
  var xPos = 0;
  var yPos = 0;
  var firstLine = true;
  var trackingOffset = documentData.tr * 0.001 * documentData.finalSize;
  if (singleShape && !usesGlyphs && !documentData.sz) {
    var tElement = this.textContainer;
    var justify = 'start';
    switch (documentData.j) {
      case 1:
        justify = 'end';
        break;
      case 2:
        justify = 'middle';
        break;
      default:
        justify = 'start';
        break;
    }
    tElement.setAttribute('text-anchor', justify);
    tElement.setAttribute('letter-spacing', trackingOffset);
    var textContent = this.buildTextContents(documentData.finalText);
    len = textContent.length;
    yPos = documentData.ps ? documentData.ps[1] + documentData.ascent : 0;
    for (i = 0; i < len; i += 1) {
      tSpan = this.textSpans[i] || createNS('tspan');
      tSpan.textContent = textContent[i];
      tSpan.setAttribute('x', 0);
      tSpan.setAttribute('y', yPos);
      tSpan.style.display = 'inherit';
      tElement.appendChild(tSpan);
      this.textSpans[i] = tSpan;
      yPos += documentData.finalLineHeight;
    }

    this.layerElement.appendChild(tElement);
  } else {
    var cachedSpansLength = this.textSpans.length;
    var shapeData;
    var charData;
    for (i = 0; i < len; i += 1) {
      if (!usesGlyphs || !singleShape || i === 0) {
        tSpan = cachedSpansLength > i ? this.textSpans[i] : createNS(usesGlyphs ? 'path' : 'text');
        if (cachedSpansLength <= i) {
          tSpan.setAttribute('stroke-linecap', 'butt');
          tSpan.setAttribute('stroke-linejoin', 'round');
          tSpan.setAttribute('stroke-miterlimit', '4');
          this.textSpans[i] = tSpan;
          this.layerElement.appendChild(tSpan);
        }
        tSpan.style.display = 'inherit';
      }

      matrixHelper.reset();
      matrixHelper.scale(documentData.finalSize / 100, documentData.finalSize / 100);
      if (singleShape) {
        if (letters[i].n) {
          xPos = -trackingOffset;
          yPos += documentData.yOffset;
          yPos += firstLine ? 1 : 0;
          firstLine = false;
        }
        this.applyTextPropertiesToMatrix(documentData, matrixHelper, letters[i].line, xPos, yPos);
        xPos += letters[i].l || 0;
        // xPos += letters[i].val === ' ' ? 0 : trackingOffset;
        xPos += trackingOffset;
      }
      if (usesGlyphs) {
        charData = this.globalData.fontManager.getCharData(documentData.finalText[i], fontData.fStyle, this.globalData.fontManager.getFontByName(documentData.f).fFamily);
        shapeData = (charData && charData.data) || {};
        shapes = shapeData.shapes ? shapeData.shapes[0].it : [];
        if (!singleShape) {
          tSpan.setAttribute('d', this.createPathShape(matrixHelper, shapes));
        } else {
          shapeStr += this.createPathShape(matrixHelper, shapes);
        }
      } else {
        if (singleShape) {
          tSpan.setAttribute('transform', 'translate(' + matrixHelper.props[12] + ',' + matrixHelper.props[13] + ')');
        }
        tSpan.textContent = letters[i].val;
        tSpan.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
      }
      //
    }
    if (singleShape && tSpan) {
      tSpan.setAttribute('d', shapeStr);
    }
  }
  while (i < this.textSpans.length) {
    this.textSpans[i].style.display = 'none';
    i += 1;
  }

  this._sizeChanged = true;
};

SVGTextLottieElement.prototype.sourceRectAtTime = function () {
  this.prepareFrame(this.comp.renderedFrame - this.data.st);
  this.renderInnerContent();
  if (this._sizeChanged) {
    this._sizeChanged = false;
    var textBox = this.layerElement.getBBox();
    this.bbox = {
      top: textBox.y,
      left: textBox.x,
      width: textBox.width,
      height: textBox.height,
    };
  }
  return this.bbox;
};

SVGTextLottieElement.prototype.renderInnerContent = function () {
  if (!this.data.singleShape) {
    this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
    if (this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
      this._sizeChanged = true;
      var i;
      var len;
      var renderedLetters = this.textAnimator.renderedLetters;

      var letters = this.textProperty.currentData.l;

      len = letters.length;
      var renderedLetter;
      var textSpan;
      for (i = 0; i < len; i += 1) {
        if (!letters[i].n) {
          renderedLetter = renderedLetters[i];
          textSpan = this.textSpans[i];
          if (renderedLetter._mdf.m) {
            textSpan.setAttribute('transform', renderedLetter.m);
          }
          if (renderedLetter._mdf.o) {
            textSpan.setAttribute('opacity', renderedLetter.o);
          }
          if (renderedLetter._mdf.sw) {
            textSpan.setAttribute('stroke-width', renderedLetter.sw);
          }
          if (renderedLetter._mdf.sc) {
            textSpan.setAttribute('stroke', renderedLetter.sc);
          }
          if (renderedLetter._mdf.fc) {
            textSpan.setAttribute('fill', renderedLetter.fc);
          }
        }
      }
    }
  }
};

/* global extendPrototype, BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement,
FrameElement, RenderableDOMElement, Matrix, SVGStyleData, SVGStrokeStyleData, SVGFillStyleData,
SVGGradientFillStyleData, SVGGradientStrokeStyleData, locationHref, getBlendMode, ShapeGroupData,
TransformPropertyFactory, SVGTransformData, ShapePropertyFactory, SVGShapeData, SVGElementsRenderer, ShapeModifiers,
lineCapEnum, lineJoinEnum */

function SVGShapeElement(data, globalData, comp) {
  // List of drawable elements
  this.shapes = [];
  // Full shape data
  this.shapesData = data.shapes;
  // List of styles that will be applied to shapes
  this.stylesList = [];
  // List of modifiers that will be applied to shapes
  this.shapeModifiers = [];
  // List of items in shape tree
  this.itemsData = [];
  // List of items in previous shape tree
  this.processedElements = [];
  // List of animated components
  this.animatedContents = [];
  this.initElement(data, globalData, comp);
  // Moving any property that doesn't get too much access after initialization because of v8 way of handling more than 10 properties.
  // List of elements that have been created
  this.prevViewData = [];
  // Moving any property that doesn't get too much access after initialization because of v8 way of handling more than 10 properties.
}

extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement);

SVGShapeElement.prototype.initSecondaryElement = function () {
};

SVGShapeElement.prototype.identityMatrix = new Matrix();

SVGShapeElement.prototype.buildExpressionInterface = function () {};

SVGShapeElement.prototype.createContent = function () {
  this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], true);
  this.filterUniqueShapes();
};

/*
This method searches for multiple shapes that affect a single element and one of them is animated
*/
SVGShapeElement.prototype.filterUniqueShapes = function () {
  var i;
  var len = this.shapes.length;
  var shape;
  var j;
  var jLen = this.stylesList.length;
  var style;
  var tempShapes = [];
  var areAnimated = false;
  for (j = 0; j < jLen; j += 1) {
    style = this.stylesList[j];
    areAnimated = false;
    tempShapes.length = 0;
    for (i = 0; i < len; i += 1) {
      shape = this.shapes[i];
      if (shape.styles.indexOf(style) !== -1) {
        tempShapes.push(shape);
        areAnimated = shape._isAnimated || areAnimated;
      }
    }
    if (tempShapes.length > 1 && areAnimated) {
      this.setShapesAsAnimated(tempShapes);
    }
  }
};

SVGShapeElement.prototype.setShapesAsAnimated = function (shapes) {
  var i;
  var len = shapes.length;
  for (i = 0; i < len; i += 1) {
    shapes[i].setAsAnimated();
  }
};

SVGShapeElement.prototype.createStyleElement = function (data, level) {
  // TODO: prevent drawing of hidden styles
  var elementData;
  var styleOb = new SVGStyleData(data, level);

  var pathElement = styleOb.pElem;
  if (data.ty === 'st') {
    elementData = new SVGStrokeStyleData(this, data, styleOb);
  } else if (data.ty === 'fl') {
    elementData = new SVGFillStyleData(this, data, styleOb);
  } else if (data.ty === 'gf' || data.ty === 'gs') {
    var GradientConstructor = data.ty === 'gf' ? SVGGradientFillStyleData : SVGGradientStrokeStyleData;
    elementData = new GradientConstructor(this, data, styleOb);
    this.globalData.defs.appendChild(elementData.gf);
    if (elementData.maskId) {
      this.globalData.defs.appendChild(elementData.ms);
      this.globalData.defs.appendChild(elementData.of);
      pathElement.setAttribute('mask', 'url(' + locationHref + '#' + elementData.maskId + ')');
    }
  }

  if (data.ty === 'st' || data.ty === 'gs') {
    pathElement.setAttribute('stroke-linecap', lineCapEnum[data.lc || 2]);
    pathElement.setAttribute('stroke-linejoin', lineJoinEnum[data.lj || 2]);
    pathElement.setAttribute('fill-opacity', '0');
    if (data.lj === 1) {
      pathElement.setAttribute('stroke-miterlimit', data.ml);
    }
  }

  if (data.r === 2) {
    pathElement.setAttribute('fill-rule', 'evenodd');
  }

  if (data.ln) {
    pathElement.setAttribute('id', data.ln);
  }
  if (data.cl) {
    pathElement.setAttribute('class', data.cl);
  }
  if (data.bm) {
    pathElement.style['mix-blend-mode'] = getBlendMode(data.bm);
  }
  this.stylesList.push(styleOb);
  this.addToAnimatedContents(data, elementData);
  return elementData;
};

SVGShapeElement.prototype.createGroupElement = function (data) {
  var elementData = new ShapeGroupData();
  if (data.ln) {
    elementData.gr.setAttribute('id', data.ln);
  }
  if (data.cl) {
    elementData.gr.setAttribute('class', data.cl);
  }
  if (data.bm) {
    elementData.gr.style['mix-blend-mode'] = getBlendMode(data.bm);
  }
  return elementData;
};

SVGShapeElement.prototype.createTransformElement = function (data, container) {
  var transformProperty = TransformPropertyFactory.getTransformProperty(this, data, this);
  var elementData = new SVGTransformData(transformProperty, transformProperty.o, container);
  this.addToAnimatedContents(data, elementData);
  return elementData;
};

SVGShapeElement.prototype.createShapeElement = function (data, ownTransformers, level) {
  var ty = 4;
  if (data.ty === 'rc') {
    ty = 5;
  } else if (data.ty === 'el') {
    ty = 6;
  } else if (data.ty === 'sr') {
    ty = 7;
  }
  var shapeProperty = ShapePropertyFactory.getShapeProp(this, data, ty, this);
  var elementData = new SVGShapeData(ownTransformers, level, shapeProperty);
  this.shapes.push(elementData);
  this.addShapeToModifiers(elementData);
  this.addToAnimatedContents(data, elementData);
  return elementData;
};

SVGShapeElement.prototype.addToAnimatedContents = function (data, element) {
  var i = 0;
  var len = this.animatedContents.length;
  while (i < len) {
    if (this.animatedContents[i].element === element) {
      return;
    }
    i += 1;
  }
  this.animatedContents.push({
    fn: SVGElementsRenderer.createRenderFunction(data),
    element: element,
    data: data,
  });
};

SVGShapeElement.prototype.setElementStyles = function (elementData) {
  var arr = elementData.styles;
  var j;
  var jLen = this.stylesList.length;
  for (j = 0; j < jLen; j += 1) {
    if (!this.stylesList[j].closed) {
      arr.push(this.stylesList[j]);
    }
  }
};

SVGShapeElement.prototype.reloadShapes = function () {
  this._isFirstFrame = true;
  var i;
  var len = this.itemsData.length;
  for (i = 0; i < len; i += 1) {
    this.prevViewData[i] = this.itemsData[i];
  }
  this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], true);
  this.filterUniqueShapes();
  len = this.dynamicProperties.length;
  for (i = 0; i < len; i += 1) {
    this.dynamicProperties[i].getValue();
  }
  this.renderModifiers();
};

SVGShapeElement.prototype.searchShapes = function (arr, itemsData, prevViewData, container, level, transformers, render) {
  var ownTransformers = [].concat(transformers);
  var i;
  var len = arr.length - 1;
  var j;
  var jLen;
  var ownStyles = [];
  var ownModifiers = [];
  var currentTransform;
  var modifier;
  var processedPos;
  for (i = len; i >= 0; i -= 1) {
    processedPos = this.searchProcessedElement(arr[i]);
    if (!processedPos) {
      arr[i]._render = render;
    } else {
      itemsData[i] = prevViewData[processedPos - 1];
    }
    if (arr[i].ty === 'fl' || arr[i].ty === 'st' || arr[i].ty === 'gf' || arr[i].ty === 'gs') {
      if (!processedPos) {
        itemsData[i] = this.createStyleElement(arr[i], level);
      } else {
        itemsData[i].style.closed = false;
      }
      if (arr[i]._render) {
        if (itemsData[i].style.pElem.parentNode !== container) {
          container.appendChild(itemsData[i].style.pElem);
        }
      }
      ownStyles.push(itemsData[i].style);
    } else if (arr[i].ty === 'gr') {
      if (!processedPos) {
        itemsData[i] = this.createGroupElement(arr[i]);
      } else {
        jLen = itemsData[i].it.length;
        for (j = 0; j < jLen; j += 1) {
          itemsData[i].prevViewData[j] = itemsData[i].it[j];
        }
      }
      this.searchShapes(arr[i].it, itemsData[i].it, itemsData[i].prevViewData, itemsData[i].gr, level + 1, ownTransformers, render);
      if (arr[i]._render) {
        if (itemsData[i].gr.parentNode !== container) {
          container.appendChild(itemsData[i].gr);
        }
      }
    } else if (arr[i].ty === 'tr') {
      if (!processedPos) {
        itemsData[i] = this.createTransformElement(arr[i], container);
      }
      currentTransform = itemsData[i].transform;
      ownTransformers.push(currentTransform);
    } else if (arr[i].ty === 'sh' || arr[i].ty === 'rc' || arr[i].ty === 'el' || arr[i].ty === 'sr') {
      if (!processedPos) {
        itemsData[i] = this.createShapeElement(arr[i], ownTransformers, level);
      }
      this.setElementStyles(itemsData[i]);
    } else if (arr[i].ty === 'tm' || arr[i].ty === 'rd' || arr[i].ty === 'ms' || arr[i].ty === 'pb') {
      if (!processedPos) {
        modifier = ShapeModifiers.getModifier(arr[i].ty);
        modifier.init(this, arr[i]);
        itemsData[i] = modifier;
        this.shapeModifiers.push(modifier);
      } else {
        modifier = itemsData[i];
        modifier.closed = false;
      }
      ownModifiers.push(modifier);
    } else if (arr[i].ty === 'rp') {
      if (!processedPos) {
        modifier = ShapeModifiers.getModifier(arr[i].ty);
        itemsData[i] = modifier;
        modifier.init(this, arr, i, itemsData);
        this.shapeModifiers.push(modifier);
        render = false;
      } else {
        modifier = itemsData[i];
        modifier.closed = true;
      }
      ownModifiers.push(modifier);
    }
    this.addProcessedElement(arr[i], i + 1);
  }
  len = ownStyles.length;
  for (i = 0; i < len; i += 1) {
    ownStyles[i].closed = true;
  }
  len = ownModifiers.length;
  for (i = 0; i < len; i += 1) {
    ownModifiers[i].closed = true;
  }
};

SVGShapeElement.prototype.renderInnerContent = function () {
  this.renderModifiers();
  var i;
  var len = this.stylesList.length;
  for (i = 0; i < len; i += 1) {
    this.stylesList[i].reset();
  }
  this.renderShape();

  for (i = 0; i < len; i += 1) {
    if (this.stylesList[i]._mdf || this._isFirstFrame) {
      if (this.stylesList[i].msElem) {
        this.stylesList[i].msElem.setAttribute('d', this.stylesList[i].d);
        // Adding M0 0 fixes same mask bug on all browsers
        this.stylesList[i].d = 'M0 0' + this.stylesList[i].d;
      }
      this.stylesList[i].pElem.setAttribute('d', this.stylesList[i].d || 'M0 0');
    }
  }
};

SVGShapeElement.prototype.renderShape = function () {
  var i;
  var len = this.animatedContents.length;
  var animatedContent;
  for (i = 0; i < len; i += 1) {
    animatedContent = this.animatedContents[i];
    if ((this._isFirstFrame || animatedContent.element._isAnimated) && animatedContent.data !== true) {
      animatedContent.fn(animatedContent.data, animatedContent.element, this._isFirstFrame);
    }
  }
};

SVGShapeElement.prototype.destroy = function () {
  this.destroyBaseElement();
  this.shapesData = null;
  this.itemsData = null;
};

/* global createNS */

function SVGTintFilter(filter, filterManager) {
  this.filterManager = filterManager;
  var feColorMatrix = createNS('feColorMatrix');
  feColorMatrix.setAttribute('type', 'matrix');
  feColorMatrix.setAttribute('color-interpolation-filters', 'linearRGB');
  feColorMatrix.setAttribute('values', '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0');
  feColorMatrix.setAttribute('result', 'f1');
  filter.appendChild(feColorMatrix);
  feColorMatrix = createNS('feColorMatrix');
  feColorMatrix.setAttribute('type', 'matrix');
  feColorMatrix.setAttribute('color-interpolation-filters', 'sRGB');
  feColorMatrix.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0');
  feColorMatrix.setAttribute('result', 'f2');
  filter.appendChild(feColorMatrix);
  this.matrixFilter = feColorMatrix;
  if (filterManager.effectElements[2].p.v !== 100 || filterManager.effectElements[2].p.k) {
    var feMerge = createNS('feMerge');
    filter.appendChild(feMerge);
    var feMergeNode;
    feMergeNode = createNS('feMergeNode');
    feMergeNode.setAttribute('in', 'SourceGraphic');
    feMerge.appendChild(feMergeNode);
    feMergeNode = createNS('feMergeNode');
    feMergeNode.setAttribute('in', 'f2');
    feMerge.appendChild(feMergeNode);
  }
}

SVGTintFilter.prototype.renderFrame = function (forceRender) {
  if (forceRender || this.filterManager._mdf) {
    var colorBlack = this.filterManager.effectElements[0].p.v;
    var colorWhite = this.filterManager.effectElements[1].p.v;
    var opacity = this.filterManager.effectElements[2].p.v / 100;
    this.matrixFilter.setAttribute('values', (colorWhite[0] - colorBlack[0]) + ' 0 0 0 ' + colorBlack[0] + ' ' + (colorWhite[1] - colorBlack[1]) + ' 0 0 0 ' + colorBlack[1] + ' ' + (colorWhite[2] - colorBlack[2]) + ' 0 0 0 ' + colorBlack[2] + ' 0 0 0 ' + opacity + ' 0');
  }
};

/* global createNS */

function SVGFillFilter(filter, filterManager) {
  this.filterManager = filterManager;
  var feColorMatrix = createNS('feColorMatrix');
  feColorMatrix.setAttribute('type', 'matrix');
  feColorMatrix.setAttribute('color-interpolation-filters', 'sRGB');
  feColorMatrix.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0');
  filter.appendChild(feColorMatrix);
  this.matrixFilter = feColorMatrix;
}
SVGFillFilter.prototype.renderFrame = function (forceRender) {
  if (forceRender || this.filterManager._mdf) {
    var color = this.filterManager.effectElements[2].p.v;
    var opacity = this.filterManager.effectElements[6].p.v;
    this.matrixFilter.setAttribute('values', '0 0 0 0 ' + color[0] + ' 0 0 0 0 ' + color[1] + ' 0 0 0 0 ' + color[2] + ' 0 0 0 ' + opacity + ' 0');
  }
};

/* global createNS */

function SVGGaussianBlurEffect(filter, filterManager) {
  // Outset the filter region by 100% on all sides to accommodate blur expansion.
  filter.setAttribute('x', '-100%');
  filter.setAttribute('y', '-100%');
  filter.setAttribute('width', '300%');
  filter.setAttribute('height', '300%');

  this.filterManager = filterManager;
  var feGaussianBlur = createNS('feGaussianBlur');
  filter.appendChild(feGaussianBlur);
  this.feGaussianBlur = feGaussianBlur;
}

SVGGaussianBlurEffect.prototype.renderFrame = function (forceRender) {
  if (forceRender || this.filterManager._mdf) {
    // Empirical value, matching AE's blur appearance.
    var kBlurrinessToSigma = 0.3;
    var sigma = this.filterManager.effectElements[0].p.v * kBlurrinessToSigma;

    // Dimensions mapping:
    //
    //   1 -> horizontal & vertical
    //   2 -> horizontal only
    //   3 -> vertical only
    //
    var dimensions = this.filterManager.effectElements[1].p.v;
    var sigmaX = (dimensions == 3) ? 0 : sigma; // eslint-disable-line eqeqeq
    var sigmaY = (dimensions == 2) ? 0 : sigma; // eslint-disable-line eqeqeq

    this.feGaussianBlur.setAttribute('stdDeviation', sigmaX + ' ' + sigmaY);

    // Repeat edges mapping:
    //
    //   0 -> off -> duplicate
    //   1 -> on  -> wrap
    var edgeMode = (this.filterManager.effectElements[2].p.v == 1) ? 'wrap' : 'duplicate'; // eslint-disable-line eqeqeq
    this.feGaussianBlur.setAttribute('edgeMode', edgeMode);
  }
};

/* global createNS, createElementID, locationHref, bmFloor */

function SVGStrokeEffect(elem, filterManager) {
  this.initialized = false;
  this.filterManager = filterManager;
  this.elem = elem;
  this.paths = [];
}

SVGStrokeEffect.prototype.initialize = function () {
  var elemChildren = this.elem.layerElement.children || this.elem.layerElement.childNodes;
  var path;
  var groupPath;
  var i;
  var len;
  if (this.filterManager.effectElements[1].p.v === 1) {
    len = this.elem.maskManager.masksProperties.length;
    i = 0;
  } else {
    i = this.filterManager.effectElements[0].p.v - 1;
    len = i + 1;
  }
  groupPath = createNS('g');
  groupPath.setAttribute('fill', 'none');
  groupPath.setAttribute('stroke-linecap', 'round');
  groupPath.setAttribute('stroke-dashoffset', 1);
  for (i; i < len; i += 1) {
    path = createNS('path');
    groupPath.appendChild(path);
    this.paths.push({ p: path, m: i });
  }
  if (this.filterManager.effectElements[10].p.v === 3) {
    var mask = createNS('mask');
    var id = createElementID();
    mask.setAttribute('id', id);
    mask.setAttribute('mask-type', 'alpha');
    mask.appendChild(groupPath);
    this.elem.globalData.defs.appendChild(mask);
    var g = createNS('g');
    g.setAttribute('mask', 'url(' + locationHref + '#' + id + ')');
    while (elemChildren[0]) {
      g.appendChild(elemChildren[0]);
    }
    this.elem.layerElement.appendChild(g);
    this.masker = mask;
    groupPath.setAttribute('stroke', '#fff');
  } else if (this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2) {
    if (this.filterManager.effectElements[10].p.v === 2) {
      elemChildren = this.elem.layerElement.children || this.elem.layerElement.childNodes;
      while (elemChildren.length) {
        this.elem.layerElement.removeChild(elemChildren[0]);
      }
    }
    this.elem.layerElement.appendChild(groupPath);
    this.elem.layerElement.removeAttribute('mask');
    groupPath.setAttribute('stroke', '#fff');
  }
  this.initialized = true;
  this.pathMasker = groupPath;
};

SVGStrokeEffect.prototype.renderFrame = function (forceRender) {
  if (!this.initialized) {
    this.initialize();
  }
  var i;
  var len = this.paths.length;
  var mask;
  var path;
  for (i = 0; i < len; i += 1) {
    if (this.paths[i].m !== -1) {
      mask = this.elem.maskManager.viewData[this.paths[i].m];
      path = this.paths[i].p;
      if (forceRender || this.filterManager._mdf || mask.prop._mdf) {
        path.setAttribute('d', mask.lastPath);
      }
      if (forceRender || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || mask.prop._mdf) {
        var dasharrayValue;
        if (this.filterManager.effectElements[7].p.v !== 0 || this.filterManager.effectElements[8].p.v !== 100) {
          var s = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) * 0.01;
          var e = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) * 0.01;
          var l = path.getTotalLength();
          dasharrayValue = '0 0 0 ' + l * s + ' ';
          var lineLength = l * (e - s);
          var segment = 1 + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01;
          var units = Math.floor(lineLength / segment);
          var j;
          for (j = 0; j < units; j += 1) {
            dasharrayValue += '1 ' + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01 + ' ';
          }
          dasharrayValue += '0 ' + l * 10 + ' 0 0';
        } else {
          dasharrayValue = '1 ' + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01;
        }
        path.setAttribute('stroke-dasharray', dasharrayValue);
      }
    }
  }
  if (forceRender || this.filterManager.effectElements[4].p._mdf) {
    this.pathMasker.setAttribute('stroke-width', this.filterManager.effectElements[4].p.v * 2);
  }

  if (forceRender || this.filterManager.effectElements[6].p._mdf) {
    this.pathMasker.setAttribute('opacity', this.filterManager.effectElements[6].p.v);
  }
  if (this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2) {
    if (forceRender || this.filterManager.effectElements[3].p._mdf) {
      var color = this.filterManager.effectElements[3].p.v;
      this.pathMasker.setAttribute('stroke', 'rgb(' + bmFloor(color[0] * 255) + ',' + bmFloor(color[1] * 255) + ',' + bmFloor(color[2] * 255) + ')');
    }
  }
};

/* global createNS */

function SVGTritoneFilter(filter, filterManager) {
  this.filterManager = filterManager;
  var feColorMatrix = createNS('feColorMatrix');
  feColorMatrix.setAttribute('type', 'matrix');
  feColorMatrix.setAttribute('color-interpolation-filters', 'linearRGB');
  feColorMatrix.setAttribute('values', '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0');
  feColorMatrix.setAttribute('result', 'f1');
  filter.appendChild(feColorMatrix);
  var feComponentTransfer = createNS('feComponentTransfer');
  feComponentTransfer.setAttribute('color-interpolation-filters', 'sRGB');
  filter.appendChild(feComponentTransfer);
  this.matrixFilter = feComponentTransfer;
  var feFuncR = createNS('feFuncR');
  feFuncR.setAttribute('type', 'table');
  feComponentTransfer.appendChild(feFuncR);
  this.feFuncR = feFuncR;
  var feFuncG = createNS('feFuncG');
  feFuncG.setAttribute('type', 'table');
  feComponentTransfer.appendChild(feFuncG);
  this.feFuncG = feFuncG;
  var feFuncB = createNS('feFuncB');
  feFuncB.setAttribute('type', 'table');
  feComponentTransfer.appendChild(feFuncB);
  this.feFuncB = feFuncB;
}

SVGTritoneFilter.prototype.renderFrame = function (forceRender) {
  if (forceRender || this.filterManager._mdf) {
    var color1 = this.filterManager.effectElements[0].p.v;
    var color2 = this.filterManager.effectElements[1].p.v;
    var color3 = this.filterManager.effectElements[2].p.v;
    var tableR = color3[0] + ' ' + color2[0] + ' ' + color1[0];
    var tableG = color3[1] + ' ' + color2[1] + ' ' + color1[1];
    var tableB = color3[2] + ' ' + color2[2] + ' ' + color1[2];
    this.feFuncR.setAttribute('tableValues', tableR);
    this.feFuncG.setAttribute('tableValues', tableG);
    this.feFuncB.setAttribute('tableValues', tableB);
    // var opacity = this.filterManager.effectElements[2].p.v/100;
    // this.matrixFilter.setAttribute('values',(colorWhite[0]- colorBlack[0])+' 0 0 0 '+ colorBlack[0] +' '+ (colorWhite[1]- colorBlack[1]) +' 0 0 0 '+ colorBlack[1] +' '+ (colorWhite[2]- colorBlack[2]) +' 0 0 0 '+ colorBlack[2] +' 0 0 0 ' + opacity + ' 0');
  }
};

/* global createNS */

function SVGProLevelsFilter(filter, filterManager) {
  this.filterManager = filterManager;
  var effectElements = this.filterManager.effectElements;
  var feComponentTransfer = createNS('feComponentTransfer');

  if (effectElements[10].p.k || effectElements[10].p.v !== 0 || effectElements[11].p.k || effectElements[11].p.v !== 1 || effectElements[12].p.k || effectElements[12].p.v !== 1 || effectElements[13].p.k || effectElements[13].p.v !== 0 || effectElements[14].p.k || effectElements[14].p.v !== 1) {
    this.feFuncR = this.createFeFunc('feFuncR', feComponentTransfer);
  }
  if (effectElements[17].p.k || effectElements[17].p.v !== 0 || effectElements[18].p.k || effectElements[18].p.v !== 1 || effectElements[19].p.k || effectElements[19].p.v !== 1 || effectElements[20].p.k || effectElements[20].p.v !== 0 || effectElements[21].p.k || effectElements[21].p.v !== 1) {
    this.feFuncG = this.createFeFunc('feFuncG', feComponentTransfer);
  }
  if (effectElements[24].p.k || effectElements[24].p.v !== 0 || effectElements[25].p.k || effectElements[25].p.v !== 1 || effectElements[26].p.k || effectElements[26].p.v !== 1 || effectElements[27].p.k || effectElements[27].p.v !== 0 || effectElements[28].p.k || effectElements[28].p.v !== 1) {
    this.feFuncB = this.createFeFunc('feFuncB', feComponentTransfer);
  }
  if (effectElements[31].p.k || effectElements[31].p.v !== 0 || effectElements[32].p.k || effectElements[32].p.v !== 1 || effectElements[33].p.k || effectElements[33].p.v !== 1 || effectElements[34].p.k || effectElements[34].p.v !== 0 || effectElements[35].p.k || effectElements[35].p.v !== 1) {
    this.feFuncA = this.createFeFunc('feFuncA', feComponentTransfer);
  }

  if (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) {
    feComponentTransfer.setAttribute('color-interpolation-filters', 'sRGB');
    filter.appendChild(feComponentTransfer);
    feComponentTransfer = createNS('feComponentTransfer');
  }

  if (effectElements[3].p.k || effectElements[3].p.v !== 0 || effectElements[4].p.k || effectElements[4].p.v !== 1 || effectElements[5].p.k || effectElements[5].p.v !== 1 || effectElements[6].p.k || effectElements[6].p.v !== 0 || effectElements[7].p.k || effectElements[7].p.v !== 1) {
    feComponentTransfer.setAttribute('color-interpolation-filters', 'sRGB');
    filter.appendChild(feComponentTransfer);
    this.feFuncRComposed = this.createFeFunc('feFuncR', feComponentTransfer);
    this.feFuncGComposed = this.createFeFunc('feFuncG', feComponentTransfer);
    this.feFuncBComposed = this.createFeFunc('feFuncB', feComponentTransfer);
  }
}

SVGProLevelsFilter.prototype.createFeFunc = function (type, feComponentTransfer) {
  var feFunc = createNS(type);
  feFunc.setAttribute('type', 'table');
  feComponentTransfer.appendChild(feFunc);
  return feFunc;
};

SVGProLevelsFilter.prototype.getTableValue = function (inputBlack, inputWhite, gamma, outputBlack, outputWhite) {
  var cnt = 0;
  var segments = 256;
  var perc;
  var min = Math.min(inputBlack, inputWhite);
  var max = Math.max(inputBlack, inputWhite);
  var table = Array.call(null, { length: segments });
  var colorValue;
  var pos = 0;
  var outputDelta = outputWhite - outputBlack;
  var inputDelta = inputWhite - inputBlack;
  while (cnt <= 256) {
    perc = cnt / 256;
    if (perc <= min) {
      colorValue = inputDelta < 0 ? outputWhite : outputBlack;
    } else if (perc >= max) {
      colorValue = inputDelta < 0 ? outputBlack : outputWhite;
    } else {
      colorValue = (outputBlack + outputDelta * Math.pow((perc - inputBlack) / inputDelta, 1 / gamma));
    }
    table[pos] = colorValue;
    pos += 1;
    cnt += 256 / (segments - 1);
  }
  return table.join(' ');
};

SVGProLevelsFilter.prototype.renderFrame = function (forceRender) {
  if (forceRender || this.filterManager._mdf) {
    var val;
    var effectElements = this.filterManager.effectElements;
    if (this.feFuncRComposed && (forceRender || effectElements[3].p._mdf || effectElements[4].p._mdf || effectElements[5].p._mdf || effectElements[6].p._mdf || effectElements[7].p._mdf)) {
      val = this.getTableValue(effectElements[3].p.v, effectElements[4].p.v, effectElements[5].p.v, effectElements[6].p.v, effectElements[7].p.v);
      this.feFuncRComposed.setAttribute('tableValues', val);
      this.feFuncGComposed.setAttribute('tableValues', val);
      this.feFuncBComposed.setAttribute('tableValues', val);
    }

    if (this.feFuncR && (forceRender || effectElements[10].p._mdf || effectElements[11].p._mdf || effectElements[12].p._mdf || effectElements[13].p._mdf || effectElements[14].p._mdf)) {
      val = this.getTableValue(effectElements[10].p.v, effectElements[11].p.v, effectElements[12].p.v, effectElements[13].p.v, effectElements[14].p.v);
      this.feFuncR.setAttribute('tableValues', val);
    }

    if (this.feFuncG && (forceRender || effectElements[17].p._mdf || effectElements[18].p._mdf || effectElements[19].p._mdf || effectElements[20].p._mdf || effectElements[21].p._mdf)) {
      val = this.getTableValue(effectElements[17].p.v, effectElements[18].p.v, effectElements[19].p.v, effectElements[20].p.v, effectElements[21].p.v);
      this.feFuncG.setAttribute('tableValues', val);
    }

    if (this.feFuncB && (forceRender || effectElements[24].p._mdf || effectElements[25].p._mdf || effectElements[26].p._mdf || effectElements[27].p._mdf || effectElements[28].p._mdf)) {
      val = this.getTableValue(effectElements[24].p.v, effectElements[25].p.v, effectElements[26].p.v, effectElements[27].p.v, effectElements[28].p.v);
      this.feFuncB.setAttribute('tableValues', val);
    }

    if (this.feFuncA && (forceRender || effectElements[31].p._mdf || effectElements[32].p._mdf || effectElements[33].p._mdf || effectElements[34].p._mdf || effectElements[35].p._mdf)) {
      val = this.getTableValue(effectElements[31].p.v, effectElements[32].p.v, effectElements[33].p.v, effectElements[34].p.v, effectElements[35].p.v);
      this.feFuncA.setAttribute('tableValues', val);
    }
  }
};

/* global createNS, rgbToHex, degToRads */

function SVGDropShadowEffect(filter, filterManager) {
  var filterSize = filterManager.container.globalData.renderConfig.filterSize;
  filter.setAttribute('x', filterSize.x);
  filter.setAttribute('y', filterSize.y);
  filter.setAttribute('width', filterSize.width);
  filter.setAttribute('height', filterSize.height);
  this.filterManager = filterManager;

  var feGaussianBlur = createNS('feGaussianBlur');
  feGaussianBlur.setAttribute('in', 'SourceAlpha');
  feGaussianBlur.setAttribute('result', 'drop_shadow_1');
  feGaussianBlur.setAttribute('stdDeviation', '0');
  this.feGaussianBlur = feGaussianBlur;
  filter.appendChild(feGaussianBlur);

  var feOffset = createNS('feOffset');
  feOffset.setAttribute('dx', '25');
  feOffset.setAttribute('dy', '0');
  feOffset.setAttribute('in', 'drop_shadow_1');
  feOffset.setAttribute('result', 'drop_shadow_2');
  this.feOffset = feOffset;
  filter.appendChild(feOffset);
  var feFlood = createNS('feFlood');
  feFlood.setAttribute('flood-color', '#00ff00');
  feFlood.setAttribute('flood-opacity', '1');
  feFlood.setAttribute('result', 'drop_shadow_3');
  this.feFlood = feFlood;
  filter.appendChild(feFlood);

  var feComposite = createNS('feComposite');
  feComposite.setAttribute('in', 'drop_shadow_3');
  feComposite.setAttribute('in2', 'drop_shadow_2');
  feComposite.setAttribute('operator', 'in');
  feComposite.setAttribute('result', 'drop_shadow_4');
  filter.appendChild(feComposite);

  var feMerge = createNS('feMerge');
  filter.appendChild(feMerge);
  var feMergeNode;
  feMergeNode = createNS('feMergeNode');
  feMerge.appendChild(feMergeNode);
  feMergeNode = createNS('feMergeNode');
  feMergeNode.setAttribute('in', 'SourceGraphic');
  this.feMergeNode = feMergeNode;
  this.feMerge = feMerge;
  this.originalNodeAdded = false;
  feMerge.appendChild(feMergeNode);
}

SVGDropShadowEffect.prototype.renderFrame = function (forceRender) {
  if (forceRender || this.filterManager._mdf) {
    if (forceRender || this.filterManager.effectElements[4].p._mdf) {
      this.feGaussianBlur.setAttribute('stdDeviation', this.filterManager.effectElements[4].p.v / 4);
    }
    if (forceRender || this.filterManager.effectElements[0].p._mdf) {
      var col = this.filterManager.effectElements[0].p.v;
      this.feFlood.setAttribute('flood-color', rgbToHex(Math.round(col[0] * 255), Math.round(col[1] * 255), Math.round(col[2] * 255)));
    }
    if (forceRender || this.filterManager.effectElements[1].p._mdf) {
      this.feFlood.setAttribute('flood-opacity', this.filterManager.effectElements[1].p.v / 255);
    }
    if (forceRender || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
      var distance = this.filterManager.effectElements[3].p.v;
      var angle = (this.filterManager.effectElements[2].p.v - 90) * degToRads;
      var x = distance * Math.cos(angle);
      var y = distance * Math.sin(angle);
      this.feOffset.setAttribute('dx', x);
      this.feOffset.setAttribute('dy', y);
    }
    /* if(forceRender || this.filterManager.effectElements[5].p._mdf){
            if(this.filterManager.effectElements[5].p.v === 1 && this.originalNodeAdded) {
                this.feMerge.removeChild(this.feMergeNode);
                this.originalNodeAdded = false;
            } else if(this.filterManager.effectElements[5].p.v === 0 && !this.originalNodeAdded) {
                this.feMerge.appendChild(this.feMergeNode);
                this.originalNodeAdded = true;
            }
        } */
  }
};

/* global createElementID, createNS */

var _svgMatteSymbols = [];

function SVGMatte3Effect(filterElem, filterManager, elem) {
  this.initialized = false;
  this.filterManager = filterManager;
  this.filterElem = filterElem;
  this.elem = elem;
  elem.matteElement = createNS('g');
  elem.matteElement.appendChild(elem.layerElement);
  elem.matteElement.appendChild(elem.transformedElement);
  elem.baseElement = elem.matteElement;
}

SVGMatte3Effect.prototype.findSymbol = function (mask) {
  var i = 0;
  var len = _svgMatteSymbols.length;
  while (i < len) {
    if (_svgMatteSymbols[i] === mask) {
      return _svgMatteSymbols[i];
    }
    i += 1;
  }
  return null;
};

SVGMatte3Effect.prototype.replaceInParent = function (mask, symbolId) {
  var parentNode = mask.layerElement.parentNode;
  if (!parentNode) {
    return;
  }
  var children = parentNode.children;
  var i = 0;
  var len = children.length;
  while (i < len) {
    if (children[i] === mask.layerElement) {
      break;
    }
    i += 1;
  }
  var nextChild;
  if (i <= len - 2) {
    nextChild = children[i + 1];
  }
  var useElem = createNS('use');
  useElem.setAttribute('href', '#' + symbolId);
  if (nextChild) {
    parentNode.insertBefore(useElem, nextChild);
  } else {
    parentNode.appendChild(useElem);
  }
};

SVGMatte3Effect.prototype.setElementAsMask = function (elem, mask) {
  if (!this.findSymbol(mask)) {
    var symbolId = createElementID();
    var masker = createNS('mask');
    masker.setAttribute('id', mask.layerId);
    masker.setAttribute('mask-type', 'alpha');
    _svgMatteSymbols.push(mask);
    var defs = elem.globalData.defs;
    defs.appendChild(masker);
    var symbol = createNS('symbol');
    symbol.setAttribute('id', symbolId);
    this.replaceInParent(mask, symbolId);
    symbol.appendChild(mask.layerElement);
    defs.appendChild(symbol);
    var useElem = createNS('use');
    useElem.setAttribute('href', '#' + symbolId);
    masker.appendChild(useElem);
    mask.data.hd = false;
    mask.show();
  }
  elem.setMatte(mask.layerId);
};

SVGMatte3Effect.prototype.initialize = function () {
  var ind = this.filterManager.effectElements[0].p.v;
  var elements = this.elem.comp.elements;
  var i = 0;
  var len = elements.length;
  while (i < len) {
    if (elements[i] && elements[i].data.ind === ind) {
      this.setElementAsMask(this.elem, elements[i]);
    }
    i += 1;
  }
  this.initialized = true;
};

SVGMatte3Effect.prototype.renderFrame = function () {
  if (!this.initialized) {
    this.initialize();
  }
};

/* global createElementID, filtersFactory, SVGTintFilter, SVGFillFilter, SVGStrokeEffect, SVGTritoneFilter,
SVGProLevelsFilter, SVGDropShadowEffect, SVGMatte3Effect, SVGGaussianBlurEffect, locationHref */

function SVGEffects(elem) {
  var i;
  var len = elem.data.ef ? elem.data.ef.length : 0;
  var filId = createElementID();
  var fil = filtersFactory.createFilter(filId, true);
  var count = 0;
  this.filters = [];
  var filterManager;
  for (i = 0; i < len; i += 1) {
    filterManager = null;
    if (elem.data.ef[i].ty === 20) {
      count += 1;
      filterManager = new SVGTintFilter(fil, elem.effectsManager.effectElements[i]);
    } else if (elem.data.ef[i].ty === 21) {
      count += 1;
      filterManager = new SVGFillFilter(fil, elem.effectsManager.effectElements[i]);
    } else if (elem.data.ef[i].ty === 22) {
      filterManager = new SVGStrokeEffect(elem, elem.effectsManager.effectElements[i]);
    } else if (elem.data.ef[i].ty === 23) {
      count += 1;
      filterManager = new SVGTritoneFilter(fil, elem.effectsManager.effectElements[i]);
    } else if (elem.data.ef[i].ty === 24) {
      count += 1;
      filterManager = new SVGProLevelsFilter(fil, elem.effectsManager.effectElements[i]);
    } else if (elem.data.ef[i].ty === 25) {
      count += 1;
      filterManager = new SVGDropShadowEffect(fil, elem.effectsManager.effectElements[i]);
    } else if (elem.data.ef[i].ty === 28) {
      // count += 1;
      filterManager = new SVGMatte3Effect(fil, elem.effectsManager.effectElements[i], elem);
    } else if (elem.data.ef[i].ty === 29) {
      count += 1;
      filterManager = new SVGGaussianBlurEffect(fil, elem.effectsManager.effectElements[i]);
    }
    if (filterManager) {
      this.filters.push(filterManager);
    }
  }
  if (count) {
    elem.globalData.defs.appendChild(fil);
    elem.layerElement.setAttribute('filter', 'url(' + locationHref + '#' + filId + ')');
  }
  if (this.filters.length) {
    elem.addRenderableComponent(this);
  }
}

SVGEffects.prototype.renderFrame = function (_isFirstFrame) {
  var i;
  var len = this.filters.length;
  for (i = 0; i < len; i += 1) {
    this.filters[i].renderFrame(_isFirstFrame);
  }
};

/* global Matrix, createTypedArray */

function CVContextData() {
  this.saved = [];
  this.cArrPos = 0;
  this.cTr = new Matrix();
  this.cO = 1;
  var i;
  var len = 15;
  this.savedOp = createTypedArray('float32', len);
  for (i = 0; i < len; i += 1) {
    this.saved[i] = createTypedArray('float32', 16);
  }
  this._length = len;
}

CVContextData.prototype.duplicate = function () {
  var newLength = this._length * 2;
  var currentSavedOp = this.savedOp;
  this.savedOp = createTypedArray('float32', newLength);
  this.savedOp.set(currentSavedOp);
  var i = 0;
  for (i = this._length; i < newLength; i += 1) {
    this.saved[i] = createTypedArray('float32', 16);
  }
  this._length = newLength;
};

CVContextData.prototype.reset = function () {
  this.cArrPos = 0;
  this.cTr.reset();
  this.cO = 1;
};

/* global CVEffects, getBlendMode, CVMaskElement, Matrix */

function CVBaseElement() {
}

CVBaseElement.prototype = {
  createElements: function () {},
  initRendererElement: function () {},
  createContainerElements: function () {
    this.canvasContext = this.globalData.canvasContext;
    this.renderableEffectsManager = new CVEffects(this);
  },
  createContent: function () {},
  setBlendMode: function () {
    var globalData = this.globalData;
    if (globalData.blendMode !== this.data.bm) {
      globalData.blendMode = this.data.bm;
      var blendModeValue = getBlendMode(this.data.bm);
      globalData.canvasContext.globalCompositeOperation = blendModeValue;
    }
  },
  createRenderableComponents: function () {
    this.maskManager = new CVMaskElement(this.data, this);
  },
  hideElement: function () {
    if (!this.hidden && (!this.isInRange || this.isTransparent)) {
      this.hidden = true;
    }
  },
  showElement: function () {
    if (this.isInRange && !this.isTransparent) {
      this.hidden = false;
      this._isFirstFrame = true;
      this.maskManager._isFirstFrame = true;
    }
  },
  renderFrame: function () {
    if (this.hidden || this.data.hd) {
      return;
    }
    this.renderTransform();
    this.renderRenderable();
    this.setBlendMode();
    var forceRealStack = this.data.ty === 0;
    this.globalData.renderer.save(forceRealStack);
    this.globalData.renderer.ctxTransform(this.finalTransform.mat.props);
    this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v);
    this.renderInnerContent();
    this.globalData.renderer.restore(forceRealStack);
    if (this.maskManager.hasMasks) {
      this.globalData.renderer.restore(true);
    }
    if (this._isFirstFrame) {
      this._isFirstFrame = false;
    }
  },
  destroy: function () {
    this.canvasContext = null;
    this.data = null;
    this.globalData = null;
    this.maskManager.destroy();
  },
  mHelper: new Matrix(),
};
CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement;
CVBaseElement.prototype.show = CVBaseElement.prototype.showElement;

/* global extendPrototype, BaseElement, TransformElement, CVBaseElement,HierarchyElement, FrameElement,
RenderableElement, SVGShapeElement, IImageElement, createTag */

function CVImageElement(data, globalData, comp) {
  this.assetData = globalData.getAssetData(data.refId);
  this.img = globalData.imageLoader.getAsset(this.assetData);
  this.initElement(data, globalData, comp);
}
extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement);

CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement;
CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame;

CVImageElement.prototype.createContent = function () {
  if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
    var canvas = createTag('canvas');
    canvas.width = this.assetData.w;
    canvas.height = this.assetData.h;
    var ctx = canvas.getContext('2d');

    var imgW = this.img.width;
    var imgH = this.img.height;
    var imgRel = imgW / imgH;
    var canvasRel = this.assetData.w / this.assetData.h;
    var widthCrop;
    var heightCrop;
    var par = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
    if ((imgRel > canvasRel && par === 'xMidYMid slice') || (imgRel < canvasRel && par !== 'xMidYMid slice')) {
      heightCrop = imgH;
      widthCrop = heightCrop * canvasRel;
    } else {
      widthCrop = imgW;
      heightCrop = widthCrop / canvasRel;
    }
    ctx.drawImage(this.img, (imgW - widthCrop) / 2, (imgH - heightCrop) / 2, widthCrop, heightCrop, 0, 0, this.assetData.w, this.assetData.h);
    this.img = canvas;
  }
};

CVImageElement.prototype.renderInnerContent = function () {
  this.canvasContext.drawImage(this.img, 0, 0);
};

CVImageElement.prototype.destroy = function () {
  this.img = null;
};

/* global createSizedArray, PropertyFactory, extendPrototype, CanvasRenderer, ICompElement, CVBaseElement */

function CVCompElement(data, globalData, comp) {
  this.completeLayers = false;
  this.layers = data.layers;
  this.pendingElements = [];
  this.elements = createSizedArray(this.layers.length);
  this.initElement(data, globalData, comp);
  this.tm = data.tm ? PropertyFactory.getProp(this, data.tm, 0, globalData.frameRate, this) : { _placeholder: true };
}

extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement);

CVCompElement.prototype.renderInnerContent = function () {
  var ctx = this.canvasContext;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(this.data.w, 0);
  ctx.lineTo(this.data.w, this.data.h);
  ctx.lineTo(0, this.data.h);
  ctx.lineTo(0, 0);
  ctx.clip();
  var i;
  var len = this.layers.length;
  for (i = len - 1; i >= 0; i -= 1) {
    if (this.completeLayers || this.elements[i]) {
      this.elements[i].renderFrame();
    }
  }
};

CVCompElement.prototype.destroy = function () {
  var i;
  var len = this.layers.length;
  for (i = len - 1; i >= 0; i -= 1) {
    if (this.elements[i]) {
      this.elements[i].destroy();
    }
  }
  this.layers = null;
  this.elements = null;
};

/* global createSizedArray, ShapePropertyFactory, MaskElement */

function CVMaskElement(data, element) {
  this.data = data;
  this.element = element;
  this.masksProperties = this.data.masksProperties || [];
  this.viewData = createSizedArray(this.masksProperties.length);
  var i;
  var len = this.masksProperties.length;
  var hasMasks = false;
  for (i = 0; i < len; i += 1) {
    if (this.masksProperties[i].mode !== 'n') {
      hasMasks = true;
    }
    this.viewData[i] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[i], 3);
  }
  this.hasMasks = hasMasks;
  if (hasMasks) {
    this.element.addRenderableComponent(this);
  }
}

CVMaskElement.prototype.renderFrame = function () {
  if (!this.hasMasks) {
    return;
  }
  var transform = this.element.finalTransform.mat;
  var ctx = this.element.canvasContext;
  var i;
  var len = this.masksProperties.length;
  var pt;
  var pts;
  var data;
  ctx.beginPath();
  for (i = 0; i < len; i += 1) {
    if (this.masksProperties[i].mode !== 'n') {
      if (this.masksProperties[i].inv) {
        ctx.moveTo(0, 0);
        ctx.lineTo(this.element.globalData.compSize.w, 0);
        ctx.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h);
        ctx.lineTo(0, this.element.globalData.compSize.h);
        ctx.lineTo(0, 0);
      }
      data = this.viewData[i].v;
      pt = transform.applyToPointArray(data.v[0][0], data.v[0][1], 0);
      ctx.moveTo(pt[0], pt[1]);
      var j;
      var jLen = data._length;
      for (j = 1; j < jLen; j += 1) {
        pts = transform.applyToTriplePoints(data.o[j - 1], data.i[j], data.v[j]);
        ctx.bezierCurveTo(pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]);
      }
      pts = transform.applyToTriplePoints(data.o[j - 1], data.i[0], data.v[0]);
      ctx.bezierCurveTo(pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]);
    }
  }
  this.element.globalData.renderer.save(true);
  ctx.clip();
};

CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty;

CVMaskElement.prototype.destroy = function () {
  this.element = null;
};

/* global ShapeTransformManager, extendPrototype, BaseElement, TransformElement, CVBaseElement, IShapeElement,
HierarchyElement, FrameElement, RenderableElement, RenderableDOMElement, PropertyFactory, degToRads, GradientProperty,
DashProperty, TransformPropertyFactory, CVShapeData, ShapeModifiers, bmFloor, lineCapEnum, lineJoinEnum */

function CVShapeElement(data, globalData, comp) {
  this.shapes = [];
  this.shapesData = data.shapes;
  this.stylesList = [];
  this.itemsData = [];
  this.prevViewData = [];
  this.shapeModifiers = [];
  this.processedElements = [];
  this.transformsManager = new ShapeTransformManager();
  this.initElement(data, globalData, comp);
}

extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement);

CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement;

CVShapeElement.prototype.transformHelper = { opacity: 1, _opMdf: false };

CVShapeElement.prototype.dashResetter = [];

CVShapeElement.prototype.createContent = function () {
  this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, true, []);
};

CVShapeElement.prototype.createStyleElement = function (data, transforms) {
  var styleElem = {
    data: data,
    type: data.ty,
    preTransforms: this.transformsManager.addTransformSequence(transforms),
    transforms: [],
    elements: [],
    closed: data.hd === true,
  };
  var elementData = {};
  if (data.ty === 'fl' || data.ty === 'st') {
    elementData.c = PropertyFactory.getProp(this, data.c, 1, 255, this);
    if (!elementData.c.k) {
      styleElem.co = 'rgb(' + bmFloor(elementData.c.v[0]) + ',' + bmFloor(elementData.c.v[1]) + ',' + bmFloor(elementData.c.v[2]) + ')';
    }
  } else if (data.ty === 'gf' || data.ty === 'gs') {
    elementData.s = PropertyFactory.getProp(this, data.s, 1, null, this);
    elementData.e = PropertyFactory.getProp(this, data.e, 1, null, this);
    elementData.h = PropertyFactory.getProp(this, data.h || { k: 0 }, 0, 0.01, this);
    elementData.a = PropertyFactory.getProp(this, data.a || { k: 0 }, 0, degToRads, this);
    elementData.g = new GradientProperty(this, data.g, this);
  }
  elementData.o = PropertyFactory.getProp(this, data.o, 0, 0.01, this);
  if (data.ty === 'st' || data.ty === 'gs') {
    styleElem.lc = lineCapEnum[data.lc || 2];
    styleElem.lj = lineJoinEnum[data.lj || 2];
    if (data.lj == 1) { // eslint-disable-line eqeqeq
      styleElem.ml = data.ml;
    }
    elementData.w = PropertyFactory.getProp(this, data.w, 0, null, this);
    if (!elementData.w.k) {
      styleElem.wi = elementData.w.v;
    }
    if (data.d) {
      var d = new DashProperty(this, data.d, 'canvas', this);
      elementData.d = d;
      if (!elementData.d.k) {
        styleElem.da = elementData.d.dashArray;
        styleElem.do = elementData.d.dashoffset[0];
      }
    }
  } else {
    styleElem.r = data.r === 2 ? 'evenodd' : 'nonzero';
  }
  this.stylesList.push(styleElem);
  elementData.style = styleElem;
  return elementData;
};

CVShapeElement.prototype.createGroupElement = function () {
  var elementData = {
    it: [],
    prevViewData: [],
  };
  return elementData;
};

CVShapeElement.prototype.createTransformElement = function (data) {
  var elementData = {
    transform: {
      opacity: 1,
      _opMdf: false,
      key: this.transformsManager.getNewKey(),
      op: PropertyFactory.getProp(this, data.o, 0, 0.01, this),
      mProps: TransformPropertyFactory.getTransformProperty(this, data, this),
    },
  };
  return elementData;
};

CVShapeElement.prototype.createShapeElement = function (data) {
  var elementData = new CVShapeData(this, data, this.stylesList, this.transformsManager);

  this.shapes.push(elementData);
  this.addShapeToModifiers(elementData);
  return elementData;
};

CVShapeElement.prototype.reloadShapes = function () {
  this._isFirstFrame = true;
  var i;
  var len = this.itemsData.length;
  for (i = 0; i < len; i += 1) {
    this.prevViewData[i] = this.itemsData[i];
  }
  this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, true, []);
  len = this.dynamicProperties.length;
  for (i = 0; i < len; i += 1) {
    this.dynamicProperties[i].getValue();
  }
  this.renderModifiers();
  this.transformsManager.processSequences(this._isFirstFrame);
};

CVShapeElement.prototype.addTransformToStyleList = function (transform) {
  var i;
  var len = this.stylesList.length;
  for (i = 0; i < len; i += 1) {
    if (!this.stylesList[i].closed) {
      this.stylesList[i].transforms.push(transform);
    }
  }
};

CVShapeElement.prototype.removeTransformFromStyleList = function () {
  var i;
  var len = this.stylesList.length;
  for (i = 0; i < len; i += 1) {
    if (!this.stylesList[i].closed) {
      this.stylesList[i].transforms.pop();
    }
  }
};

CVShapeElement.prototype.closeStyles = function (styles) {
  var i;
  var len = styles.length;
  for (i = 0; i < len; i += 1) {
    styles[i].closed = true;
  }
};

CVShapeElement.prototype.searchShapes = function (arr, itemsData, prevViewData, shouldRender, transforms) {
  var i;
  var len = arr.length - 1;
  var j;
  var jLen;
  var ownStyles = [];
  var ownModifiers = [];
  var processedPos;
  var modifier;
  var currentTransform;
  var ownTransforms = [].concat(transforms);
  for (i = len; i >= 0; i -= 1) {
    processedPos = this.searchProcessedElement(arr[i]);
    if (!processedPos) {
      arr[i]._shouldRender = shouldRender;
    } else {
      itemsData[i] = prevViewData[processedPos - 1];
    }
    if (arr[i].ty === 'fl' || arr[i].ty === 'st' || arr[i].ty === 'gf' || arr[i].ty === 'gs') {
      if (!processedPos) {
        itemsData[i] = this.createStyleElement(arr[i], ownTransforms);
      } else {
        itemsData[i].style.closed = false;
      }

      ownStyles.push(itemsData[i].style);
    } else if (arr[i].ty === 'gr') {
      if (!processedPos) {
        itemsData[i] = this.createGroupElement(arr[i]);
      } else {
        jLen = itemsData[i].it.length;
        for (j = 0; j < jLen; j += 1) {
          itemsData[i].prevViewData[j] = itemsData[i].it[j];
        }
      }
      this.searchShapes(arr[i].it, itemsData[i].it, itemsData[i].prevViewData, shouldRender, ownTransforms);
    } else if (arr[i].ty === 'tr') {
      if (!processedPos) {
        currentTransform = this.createTransformElement(arr[i]);
        itemsData[i] = currentTransform;
      }
      ownTransforms.push(itemsData[i]);
      this.addTransformToStyleList(itemsData[i]);
    } else if (arr[i].ty === 'sh' || arr[i].ty === 'rc' || arr[i].ty === 'el' || arr[i].ty === 'sr') {
      if (!processedPos) {
        itemsData[i] = this.createShapeElement(arr[i]);
      }
    } else if (arr[i].ty === 'tm' || arr[i].ty === 'rd' || arr[i].ty === 'pb') {
      if (!processedPos) {
        modifier = ShapeModifiers.getModifier(arr[i].ty);
        modifier.init(this, arr[i]);
        itemsData[i] = modifier;
        this.shapeModifiers.push(modifier);
      } else {
        modifier = itemsData[i];
        modifier.closed = false;
      }
      ownModifiers.push(modifier);
    } else if (arr[i].ty === 'rp') {
      if (!processedPos) {
        modifier = ShapeModifiers.getModifier(arr[i].ty);
        itemsData[i] = modifier;
        modifier.init(this, arr, i, itemsData);
        this.shapeModifiers.push(modifier);
        shouldRender = false;
      } else {
        modifier = itemsData[i];
        modifier.closed = true;
      }
      ownModifiers.push(modifier);
    }
    this.addProcessedElement(arr[i], i + 1);
  }
  this.removeTransformFromStyleList();
  this.closeStyles(ownStyles);
  len = ownModifiers.length;
  for (i = 0; i < len; i += 1) {
    ownModifiers[i].closed = true;
  }
};

CVShapeElement.prototype.renderInnerContent = function () {
  this.transformHelper.opacity = 1;
  this.transformHelper._opMdf = false;
  this.renderModifiers();
  this.transformsManager.processSequences(this._isFirstFrame);
  this.renderShape(this.transformHelper, this.shapesData, this.itemsData, true);
};

CVShapeElement.prototype.renderShapeTransform = function (parentTransform, groupTransform) {
  if (parentTransform._opMdf || groupTransform.op._mdf || this._isFirstFrame) {
    groupTransform.opacity = parentTransform.opacity;
    groupTransform.opacity *= groupTransform.op.v;
    groupTransform._opMdf = true;
  }
};

CVShapeElement.prototype.drawLayer = function () {
  var i;
  var len = this.stylesList.length;
  var j;
  var jLen;
  var k;
  var kLen;
  var elems;
  var nodes;
  var renderer = this.globalData.renderer;
  var ctx = this.globalData.canvasContext;
  var type;
  var currentStyle;
  for (i = 0; i < len; i += 1) {
    currentStyle = this.stylesList[i];
    type = currentStyle.type;

    // Skipping style when
    // Stroke width equals 0
    // style should not be rendered (extra unused repeaters)
    // current opacity equals 0
    // global opacity equals 0
    if (!(((type === 'st' || type === 'gs') && currentStyle.wi === 0) || !currentStyle.data._shouldRender || currentStyle.coOp === 0 || this.globalData.currentGlobalAlpha === 0)) {
      renderer.save();
      elems = currentStyle.elements;
      if (type === 'st' || type === 'gs') {
        ctx.strokeStyle = type === 'st' ? currentStyle.co : currentStyle.grd;
        ctx.lineWidth = currentStyle.wi;
        ctx.lineCap = currentStyle.lc;
        ctx.lineJoin = currentStyle.lj;
        ctx.miterLimit = currentStyle.ml || 0;
      } else {
        ctx.fillStyle = type === 'fl' ? currentStyle.co : currentStyle.grd;
      }
      renderer.ctxOpacity(currentStyle.coOp);
      if (type !== 'st' && type !== 'gs') {
        ctx.beginPath();
      }
      renderer.ctxTransform(currentStyle.preTransforms.finalTransform.props);
      jLen = elems.length;
      for (j = 0; j < jLen; j += 1) {
        if (type === 'st' || type === 'gs') {
          ctx.beginPath();
          if (currentStyle.da) {
            ctx.setLineDash(currentStyle.da);
            ctx.lineDashOffset = currentStyle.do;
          }
        }
        nodes = elems[j].trNodes;
        kLen = nodes.length;

        for (k = 0; k < kLen; k += 1) {
          if (nodes[k].t === 'm') {
            ctx.moveTo(nodes[k].p[0], nodes[k].p[1]);
          } else if (nodes[k].t === 'c') {
            ctx.bezierCurveTo(nodes[k].pts[0], nodes[k].pts[1], nodes[k].pts[2], nodes[k].pts[3], nodes[k].pts[4], nodes[k].pts[5]);
          } else {
            ctx.closePath();
          }
        }
        if (type === 'st' || type === 'gs') {
          ctx.stroke();
          if (currentStyle.da) {
            ctx.setLineDash(this.dashResetter);
          }
        }
      }
      if (type !== 'st' && type !== 'gs') {
        ctx.fill(currentStyle.r);
      }
      renderer.restore();
    }
  }
};

CVShapeElement.prototype.renderShape = function (parentTransform, items, data, isMain) {
  var i;
  var len = items.length - 1;
  var groupTransform;
  groupTransform = parentTransform;
  for (i = len; i >= 0; i -= 1) {
    if (items[i].ty === 'tr') {
      groupTransform = data[i].transform;
      this.renderShapeTransform(parentTransform, groupTransform);
    } else if (items[i].ty === 'sh' || items[i].ty === 'el' || items[i].ty === 'rc' || items[i].ty === 'sr') {
      this.renderPath(items[i], data[i]);
    } else if (items[i].ty === 'fl') {
      this.renderFill(items[i], data[i], groupTransform);
    } else if (items[i].ty === 'st') {
      this.renderStroke(items[i], data[i], groupTransform);
    } else if (items[i].ty === 'gf' || items[i].ty === 'gs') {
      this.renderGradientFill(items[i], data[i], groupTransform);
    } else if (items[i].ty === 'gr') {
      this.renderShape(groupTransform, items[i].it, data[i].it);
    } else if (items[i].ty === 'tm') {
      //
    }
  }
  if (isMain) {
    this.drawLayer();
  }
};

CVShapeElement.prototype.renderStyledShape = function (styledShape, shape) {
  if (this._isFirstFrame || shape._mdf || styledShape.transforms._mdf) {
    var shapeNodes = styledShape.trNodes;
    var paths = shape.paths;
    var i;
    var len;
    var j;
    var jLen = paths._length;
    shapeNodes.length = 0;
    var groupTransformMat = styledShape.transforms.finalTransform;
    for (j = 0; j < jLen; j += 1) {
      var pathNodes = paths.shapes[j];
      if (pathNodes && pathNodes.v) {
        len = pathNodes._length;
        for (i = 1; i < len; i += 1) {
          if (i === 1) {
            shapeNodes.push({
              t: 'm',
              p: groupTransformMat.applyToPointArray(pathNodes.v[0][0], pathNodes.v[0][1], 0),
            });
          }
          shapeNodes.push({
            t: 'c',
            pts: groupTransformMat.applyToTriplePoints(pathNodes.o[i - 1], pathNodes.i[i], pathNodes.v[i]),
          });
        }
        if (len === 1) {
          shapeNodes.push({
            t: 'm',
            p: groupTransformMat.applyToPointArray(pathNodes.v[0][0], pathNodes.v[0][1], 0),
          });
        }
        if (pathNodes.c && len) {
          shapeNodes.push({
            t: 'c',
            pts: groupTransformMat.applyToTriplePoints(pathNodes.o[i - 1], pathNodes.i[0], pathNodes.v[0]),
          });
          shapeNodes.push({
            t: 'z',
          });
        }
      }
    }
    styledShape.trNodes = shapeNodes;
  }
};

CVShapeElement.prototype.renderPath = function (pathData, itemData) {
  if (pathData.hd !== true && pathData._shouldRender) {
    var i;
    var len = itemData.styledShapes.length;
    for (i = 0; i < len; i += 1) {
      this.renderStyledShape(itemData.styledShapes[i], itemData.sh);
    }
  }
};

CVShapeElement.prototype.renderFill = function (styleData, itemData, groupTransform) {
  var styleElem = itemData.style;

  if (itemData.c._mdf || this._isFirstFrame) {
    styleElem.co = 'rgb('
        + bmFloor(itemData.c.v[0]) + ','
        + bmFloor(itemData.c.v[1]) + ','
        + bmFloor(itemData.c.v[2]) + ')';
  }
  if (itemData.o._mdf || groupTransform._opMdf || this._isFirstFrame) {
    styleElem.coOp = itemData.o.v * groupTransform.opacity;
  }
};

CVShapeElement.prototype.renderGradientFill = function (styleData, itemData, groupTransform) {
  var styleElem = itemData.style;
  var grd;
  if (!styleElem.grd || itemData.g._mdf || itemData.s._mdf || itemData.e._mdf || (styleData.t !== 1 && (itemData.h._mdf || itemData.a._mdf))) {
    var ctx = this.globalData.canvasContext;
    var pt1 = itemData.s.v;
    var pt2 = itemData.e.v;
    if (styleData.t === 1) {
      grd = ctx.createLinearGradient(pt1[0], pt1[1], pt2[0], pt2[1]);
    } else {
      var rad = Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
      var ang = Math.atan2(pt2[1] - pt1[1], pt2[0] - pt1[0]);

      var percent = itemData.h.v;
      if (percent >= 1) {
        percent = 0.99;
      } else if (percent <= -1) {
        percent = -0.99;
      }
      var dist = rad * percent;
      var x = Math.cos(ang + itemData.a.v) * dist + pt1[0];
      var y = Math.sin(ang + itemData.a.v) * dist + pt1[1];
      grd = ctx.createRadialGradient(x, y, 0, pt1[0], pt1[1], rad);
    }

    var i;
    var len = styleData.g.p;
    var cValues = itemData.g.c;
    var opacity = 1;

    for (i = 0; i < len; i += 1) {
      if (itemData.g._hasOpacity && itemData.g._collapsable) {
        opacity = itemData.g.o[i * 2 + 1];
      }
      grd.addColorStop(cValues[i * 4] / 100, 'rgba(' + cValues[i * 4 + 1] + ',' + cValues[i * 4 + 2] + ',' + cValues[i * 4 + 3] + ',' + opacity + ')');
    }
    styleElem.grd = grd;
  }
  styleElem.coOp = itemData.o.v * groupTransform.opacity;
};

CVShapeElement.prototype.renderStroke = function (styleData, itemData, groupTransform) {
  var styleElem = itemData.style;
  var d = itemData.d;
  if (d && (d._mdf || this._isFirstFrame)) {
    styleElem.da = d.dashArray;
    styleElem.do = d.dashoffset[0];
  }
  if (itemData.c._mdf || this._isFirstFrame) {
    styleElem.co = 'rgb(' + bmFloor(itemData.c.v[0]) + ',' + bmFloor(itemData.c.v[1]) + ',' + bmFloor(itemData.c.v[2]) + ')';
  }
  if (itemData.o._mdf || groupTransform._opMdf || this._isFirstFrame) {
    styleElem.coOp = itemData.o.v * groupTransform.opacity;
  }
  if (itemData.w._mdf || this._isFirstFrame) {
    styleElem.wi = itemData.w.v;
  }
};

CVShapeElement.prototype.destroy = function () {
  this.shapesData = null;
  this.globalData = null;
  this.canvasContext = null;
  this.stylesList.length = 0;
  this.itemsData.length = 0;
};

/* global extendPrototype, BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement,
SVGShapeElement, IImageElement */

function CVSolidElement(data, globalData, comp) {
  this.initElement(data, globalData, comp);
}
extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement);

CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement;
CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame;

CVSolidElement.prototype.renderInnerContent = function () {
  var ctx = this.canvasContext;
  ctx.fillStyle = this.data.sc;
  ctx.fillRect(0, 0, this.data.sw, this.data.sh);
  //
};

/* global extendPrototype, BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement,
RenderableElement, ITextElement, createTag, createSizedArray */

function CVTextElement(data, globalData, comp) {
  this.textSpans = [];
  this.yOffset = 0;
  this.fillColorAnim = false;
  this.strokeColorAnim = false;
  this.strokeWidthAnim = false;
  this.stroke = false;
  this.fill = false;
  this.justifyOffset = 0;
  this.currentRender = null;
  this.renderType = 'canvas';
  this.values = {
    fill: 'rgba(0,0,0,0)',
    stroke: 'rgba(0,0,0,0)',
    sWidth: 0,
    fValue: '',
  };
  this.initElement(data, globalData, comp);
}
extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement);

CVTextElement.prototype.tHelper = createTag('canvas').getContext('2d');

CVTextElement.prototype.buildNewText = function () {
  var documentData = this.textProperty.currentData;
  this.renderedLetters = createSizedArray(documentData.l ? documentData.l.length : 0);

  var hasFill = false;
  if (documentData.fc) {
    hasFill = true;
    this.values.fill = this.buildColor(documentData.fc);
  } else {
    this.values.fill = 'rgba(0,0,0,0)';
  }
  this.fill = hasFill;
  var hasStroke = false;
  if (documentData.sc) {
    hasStroke = true;
    this.values.stroke = this.buildColor(documentData.sc);
    this.values.sWidth = documentData.sw;
  }
  var fontData = this.globalData.fontManager.getFontByName(documentData.f);
  var i;
  var len;
  var letters = documentData.l;
  var matrixHelper = this.mHelper;
  this.stroke = hasStroke;
  this.values.fValue = documentData.finalSize + 'px ' + this.globalData.fontManager.getFontByName(documentData.f).fFamily;
  len = documentData.finalText.length;
  // this.tHelper.font = this.values.fValue;
  var charData;
  var shapeData;
  var k;
  var kLen;
  var shapes;
  var j;
  var jLen;
  var pathNodes;
  var commands;
  var pathArr;
  var singleShape = this.data.singleShape;
  var trackingOffset = documentData.tr * 0.001 * documentData.finalSize;
  var xPos = 0;
  var yPos = 0;
  var firstLine = true;
  var cnt = 0;
  for (i = 0; i < len; i += 1) {
    charData = this.globalData.fontManager.getCharData(documentData.finalText[i], fontData.fStyle, this.globalData.fontManager.getFontByName(documentData.f).fFamily);
    shapeData = (charData && charData.data) || {};
    matrixHelper.reset();
    if (singleShape && letters[i].n) {
      xPos = -trackingOffset;
      yPos += documentData.yOffset;
      yPos += firstLine ? 1 : 0;
      firstLine = false;
    }

    shapes = shapeData.shapes ? shapeData.shapes[0].it : [];
    jLen = shapes.length;
    matrixHelper.scale(documentData.finalSize / 100, documentData.finalSize / 100);
    if (singleShape) {
      this.applyTextPropertiesToMatrix(documentData, matrixHelper, letters[i].line, xPos, yPos);
    }
    commands = createSizedArray(jLen);
    for (j = 0; j < jLen; j += 1) {
      kLen = shapes[j].ks.k.i.length;
      pathNodes = shapes[j].ks.k;
      pathArr = [];
      for (k = 1; k < kLen; k += 1) {
        if (k === 1) {
          pathArr.push(matrixHelper.applyToX(pathNodes.v[0][0], pathNodes.v[0][1], 0), matrixHelper.applyToY(pathNodes.v[0][0], pathNodes.v[0][1], 0));
        }
        pathArr.push(matrixHelper.applyToX(pathNodes.o[k - 1][0], pathNodes.o[k - 1][1], 0), matrixHelper.applyToY(pathNodes.o[k - 1][0], pathNodes.o[k - 1][1], 0), matrixHelper.applyToX(pathNodes.i[k][0], pathNodes.i[k][1], 0), matrixHelper.applyToY(pathNodes.i[k][0], pathNodes.i[k][1], 0), matrixHelper.applyToX(pathNodes.v[k][0], pathNodes.v[k][1], 0), matrixHelper.applyToY(pathNodes.v[k][0], pathNodes.v[k][1], 0));
      }
      pathArr.push(matrixHelper.applyToX(pathNodes.o[k - 1][0], pathNodes.o[k - 1][1], 0), matrixHelper.applyToY(pathNodes.o[k - 1][0], pathNodes.o[k - 1][1], 0), matrixHelper.applyToX(pathNodes.i[0][0], pathNodes.i[0][1], 0), matrixHelper.applyToY(pathNodes.i[0][0], pathNodes.i[0][1], 0), matrixHelper.applyToX(pathNodes.v[0][0], pathNodes.v[0][1], 0), matrixHelper.applyToY(pathNodes.v[0][0], pathNodes.v[0][1], 0));
      commands[j] = pathArr;
    }
    if (singleShape) {
      xPos += letters[i].l;
      xPos += trackingOffset;
    }
    if (this.textSpans[cnt]) {
      this.textSpans[cnt].elem = commands;
    } else {
      this.textSpans[cnt] = { elem: commands };
    }
    cnt += 1;
  }
};

CVTextElement.prototype.renderInnerContent = function () {
  var ctx = this.canvasContext;
  ctx.font = this.values.fValue;
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 4;

  if (!this.data.singleShape) {
    this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
  }

  var i;
  var len;
  var j;
  var jLen;
  var k;
  var kLen;
  var renderedLetters = this.textAnimator.renderedLetters;

  var letters = this.textProperty.currentData.l;

  len = letters.length;
  var renderedLetter;
  var lastFill = null;
  var lastStroke = null;
  var lastStrokeW = null;
  var commands;
  var pathArr;
  for (i = 0; i < len; i += 1) {
    if (!letters[i].n) {
      renderedLetter = renderedLetters[i];
      if (renderedLetter) {
        this.globalData.renderer.save();
        this.globalData.renderer.ctxTransform(renderedLetter.p);
        this.globalData.renderer.ctxOpacity(renderedLetter.o);
      }
      if (this.fill) {
        if (renderedLetter && renderedLetter.fc) {
          if (lastFill !== renderedLetter.fc) {
            lastFill = renderedLetter.fc;
            ctx.fillStyle = renderedLetter.fc;
          }
        } else if (lastFill !== this.values.fill) {
          lastFill = this.values.fill;
          ctx.fillStyle = this.values.fill;
        }
        commands = this.textSpans[i].elem;
        jLen = commands.length;
        this.globalData.canvasContext.beginPath();
        for (j = 0; j < jLen; j += 1) {
          pathArr = commands[j];
          kLen = pathArr.length;
          this.globalData.canvasContext.moveTo(pathArr[0], pathArr[1]);
          for (k = 2; k < kLen; k += 6) {
            this.globalData.canvasContext.bezierCurveTo(pathArr[k], pathArr[k + 1], pathArr[k + 2], pathArr[k + 3], pathArr[k + 4], pathArr[k + 5]);
          }
        }
        this.globalData.canvasContext.closePath();
        this.globalData.canvasContext.fill();
        /// ctx.fillText(this.textSpans[i].val,0,0);
      }
      if (this.stroke) {
        if (renderedLetter && renderedLetter.sw) {
          if (lastStrokeW !== renderedLetter.sw) {
            lastStrokeW = renderedLetter.sw;
            ctx.lineWidth = renderedLetter.sw;
          }
        } else if (lastStrokeW !== this.values.sWidth) {
          lastStrokeW = this.values.sWidth;
          ctx.lineWidth = this.values.sWidth;
        }
        if (renderedLetter && renderedLetter.sc) {
          if (lastStroke !== renderedLetter.sc) {
            lastStroke = renderedLetter.sc;
            ctx.strokeStyle = renderedLetter.sc;
          }
        } else if (lastStroke !== this.values.stroke) {
          lastStroke = this.values.stroke;
          ctx.strokeStyle = this.values.stroke;
        }
        commands = this.textSpans[i].elem;
        jLen = commands.length;
        this.globalData.canvasContext.beginPath();
        for (j = 0; j < jLen; j += 1) {
          pathArr = commands[j];
          kLen = pathArr.length;
          this.globalData.canvasContext.moveTo(pathArr[0], pathArr[1]);
          for (k = 2; k < kLen; k += 6) {
            this.globalData.canvasContext.bezierCurveTo(pathArr[k], pathArr[k + 1], pathArr[k + 2], pathArr[k + 3], pathArr[k + 4], pathArr[k + 5]);
          }
        }
        this.globalData.canvasContext.closePath();
        this.globalData.canvasContext.stroke();
        /// ctx.strokeText(letters[i].val,0,0);
      }
      if (renderedLetter) {
        this.globalData.renderer.restore();
      }
    }
  }
};

function CVEffects() {

}
CVEffects.prototype.renderFrame = function () {};

/* global createTag, createNS, styleDiv, CVEffects, MaskElement, SVGBaseElement, HybridRenderer */

function HBaseElement() {}
HBaseElement.prototype = {
  checkBlendMode: function () {},
  initRendererElement: function () {
    this.baseElement = createTag(this.data.tg || 'div');
    if (this.data.hasMask) {
      this.svgElement = createNS('svg');
      this.layerElement = createNS('g');
      this.maskedElement = this.layerElement;
      this.svgElement.appendChild(this.layerElement);
      this.baseElement.appendChild(this.svgElement);
    } else {
      this.layerElement = this.baseElement;
    }
    styleDiv(this.baseElement);
  },
  createContainerElements: function () {
    this.renderableEffectsManager = new CVEffects(this);
    this.transformedElement = this.baseElement;
    this.maskedElement = this.layerElement;
    if (this.data.ln) {
      this.layerElement.setAttribute('id', this.data.ln);
    }
    if (this.data.cl) {
      this.layerElement.setAttribute('class', this.data.cl);
    }
    if (this.data.bm !== 0) {
      this.setBlendMode();
    }
  },
  renderElement: function () {
    var transformedElementStyle = this.transformedElement ? this.transformedElement.style : {};
    if (this.finalTransform._matMdf) {
      var matrixValue = this.finalTransform.mat.toCSS();
      transformedElementStyle.transform = matrixValue;
      transformedElementStyle.webkitTransform = matrixValue;
    }
    if (this.finalTransform._opMdf) {
      transformedElementStyle.opacity = this.finalTransform.mProp.o.v;
    }
  },
  renderFrame: function () {
    // If it is exported as hidden (data.hd === true) no need to render
    // If it is not visible no need to render
    if (this.data.hd || this.hidden) {
      return;
    }
    this.renderTransform();
    this.renderRenderable();
    this.renderElement();
    this.renderInnerContent();
    if (this._isFirstFrame) {
      this._isFirstFrame = false;
    }
  },
  destroy: function () {
    this.layerElement = null;
    this.transformedElement = null;
    if (this.matteElement) {
      this.matteElement = null;
    }
    if (this.maskManager) {
      this.maskManager.destroy();
      this.maskManager = null;
    }
  },
  createRenderableComponents: function () {
    this.maskManager = new MaskElement(this.data, this, this.globalData);
  },
  addEffects: function () {
  },
  setMatte: function () {},
};
HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement;
HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy;
HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting;

/* global extendPrototype, BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement,
RenderableDOMElement, createNS, createTag */

function HSolidElement(data, globalData, comp) {
  this.initElement(data, globalData, comp);
}
extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement);

HSolidElement.prototype.createContent = function () {
  var rect;
  if (this.data.hasMask) {
    rect = createNS('rect');
    rect.setAttribute('width', this.data.sw);
    rect.setAttribute('height', this.data.sh);
    rect.setAttribute('fill', this.data.sc);
    this.svgElement.setAttribute('width', this.data.sw);
    this.svgElement.setAttribute('height', this.data.sh);
  } else {
    rect = createTag('div');
    rect.style.width = this.data.sw + 'px';
    rect.style.height = this.data.sh + 'px';
    rect.style.backgroundColor = this.data.sc;
  }
  this.layerElement.appendChild(rect);
};

/* global createSizedArray, PropertyFactory, extendPrototype, HybridRenderer, ICompElement, HBaseElement */

function HCompElement(data, globalData, comp) {
  this.layers = data.layers;
  this.supports3d = !data.hasMask;
  this.completeLayers = false;
  this.pendingElements = [];
  this.elements = this.layers ? createSizedArray(this.layers.length) : [];
  this.initElement(data, globalData, comp);
  this.tm = data.tm ? PropertyFactory.getProp(this, data.tm, 0, globalData.frameRate, this) : { _placeholder: true };
}

extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement);
HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements;

HCompElement.prototype.createContainerElements = function () {
  this._createBaseContainerElements();
  // divElement.style.clip = 'rect(0px, '+this.data.w+'px, '+this.data.h+'px, 0px)';
  if (this.data.hasMask) {
    this.svgElement.setAttribute('width', this.data.w);
    this.svgElement.setAttribute('height', this.data.h);
    this.transformedElement = this.baseElement;
  } else {
    this.transformedElement = this.layerElement;
  }
};

HCompElement.prototype.addTo3dContainer = function (elem, pos) {
  var j = 0;
  var nextElement;
  while (j < pos) {
    if (this.elements[j] && this.elements[j].getBaseElement) {
      nextElement = this.elements[j].getBaseElement();
    }
    j += 1;
  }
  if (nextElement) {
    this.layerElement.insertBefore(elem, nextElement);
  } else {
    this.layerElement.appendChild(elem);
  }
};

/* global createNS, extendPrototype, BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement,
HierarchyElement, FrameElement, RenderableElement, createNS, bmMin, bmSqrt, bmMin, bmMax, bmPow */

function HShapeElement(data, globalData, comp) {
  // List of drawable elements
  this.shapes = [];
  // Full shape data
  this.shapesData = data.shapes;
  // List of styles that will be applied to shapes
  this.stylesList = [];
  // List of modifiers that will be applied to shapes
  this.shapeModifiers = [];
  // List of items in shape tree
  this.itemsData = [];
  // List of items in previous shape tree
  this.processedElements = [];
  // List of animated components
  this.animatedContents = [];
  this.shapesContainer = createNS('g');
  this.initElement(data, globalData, comp);
  // Moving any property that doesn't get too much access after initialization because of v8 way of handling more than 10 properties.
  // List of elements that have been created
  this.prevViewData = [];
  this.currentBBox = {
    x: 999999,
    y: -999999,
    h: 0,
    w: 0,
  };
}
extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement);
HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent;

HShapeElement.prototype.createContent = function () {
  var cont;
  this.baseElement.style.fontSize = 0;
  if (this.data.hasMask) {
    this.layerElement.appendChild(this.shapesContainer);
    cont = this.svgElement;
  } else {
    cont = createNS('svg');
    var size = this.comp.data ? this.comp.data : this.globalData.compSize;
    cont.setAttribute('width', size.w);
    cont.setAttribute('height', size.h);
    cont.appendChild(this.shapesContainer);
    this.layerElement.appendChild(cont);
  }

  this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], true);
  this.filterUniqueShapes();
  this.shapeCont = cont;
};

HShapeElement.prototype.getTransformedPoint = function (transformers, point) {
  var i;
  var len = transformers.length;
  for (i = 0; i < len; i += 1) {
    point = transformers[i].mProps.v.applyToPointArray(point[0], point[1], 0);
  }
  return point;
};

HShapeElement.prototype.calculateShapeBoundingBox = function (item, boundingBox) {
  var shape = item.sh.v;
  var transformers = item.transformers;
  var i;
  var len = shape._length;
  var vPoint;
  var oPoint;
  var nextIPoint;
  var nextVPoint;
  if (len <= 1) {
    return;
  }
  for (i = 0; i < len - 1; i += 1) {
    vPoint = this.getTransformedPoint(transformers, shape.v[i]);
    oPoint = this.getTransformedPoint(transformers, shape.o[i]);
    nextIPoint = this.getTransformedPoint(transformers, shape.i[i + 1]);
    nextVPoint = this.getTransformedPoint(transformers, shape.v[i + 1]);
    this.checkBounds(vPoint, oPoint, nextIPoint, nextVPoint, boundingBox);
  }
  if (shape.c) {
    vPoint = this.getTransformedPoint(transformers, shape.v[i]);
    oPoint = this.getTransformedPoint(transformers, shape.o[i]);
    nextIPoint = this.getTransformedPoint(transformers, shape.i[0]);
    nextVPoint = this.getTransformedPoint(transformers, shape.v[0]);
    this.checkBounds(vPoint, oPoint, nextIPoint, nextVPoint, boundingBox);
  }
};

HShapeElement.prototype.checkBounds = function (vPoint, oPoint, nextIPoint, nextVPoint, boundingBox) {
  this.getBoundsOfCurve(vPoint, oPoint, nextIPoint, nextVPoint);
  var bounds = this.shapeBoundingBox;
  boundingBox.x = bmMin(bounds.left, boundingBox.x);
  boundingBox.xMax = bmMax(bounds.right, boundingBox.xMax);
  boundingBox.y = bmMin(bounds.top, boundingBox.y);
  boundingBox.yMax = bmMax(bounds.bottom, boundingBox.yMax);
};

HShapeElement.prototype.shapeBoundingBox = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

HShapeElement.prototype.tempBoundingBox = {
  x: 0,
  xMax: 0,
  y: 0,
  yMax: 0,
  width: 0,
  height: 0,
};

HShapeElement.prototype.getBoundsOfCurve = function (p0, p1, p2, p3) {
  var bounds = [[p0[0], p3[0]], [p0[1], p3[1]]];

  for (var a, b, c, t, b2ac, t1, t2, i = 0; i < 2; ++i) { // eslint-disable-line no-plusplus
    b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
    a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
    c = 3 * p1[i] - 3 * p0[i];

    b |= 0; // eslint-disable-line no-bitwise
    a |= 0; // eslint-disable-line no-bitwise
    c |= 0; // eslint-disable-line no-bitwise

    if (a === 0 && b === 0) {
      //
    } else if (a === 0) {
      t = -c / b;

      if (t > 0 && t < 1) {
        bounds[i].push(this.calculateF(t, p0, p1, p2, p3, i));
      }
    } else {
      b2ac = b * b - 4 * c * a;

      if (b2ac >= 0) {
        t1 = (-b + bmSqrt(b2ac)) / (2 * a);
        if (t1 > 0 && t1 < 1) bounds[i].push(this.calculateF(t1, p0, p1, p2, p3, i));
        t2 = (-b - bmSqrt(b2ac)) / (2 * a);
        if (t2 > 0 && t2 < 1) bounds[i].push(this.calculateF(t2, p0, p1, p2, p3, i));
      }
    }
  }

  this.shapeBoundingBox.left = bmMin.apply(null, bounds[0]);
  this.shapeBoundingBox.top = bmMin.apply(null, bounds[1]);
  this.shapeBoundingBox.right = bmMax.apply(null, bounds[0]);
  this.shapeBoundingBox.bottom = bmMax.apply(null, bounds[1]);
};

HShapeElement.prototype.calculateF = function (t, p0, p1, p2, p3, i) {
  return bmPow(1 - t, 3) * p0[i]
        + 3 * bmPow(1 - t, 2) * t * p1[i]
        + 3 * (1 - t) * bmPow(t, 2) * p2[i]
        + bmPow(t, 3) * p3[i];
};

HShapeElement.prototype.calculateBoundingBox = function (itemsData, boundingBox) {
  var i;
  var len = itemsData.length;
  for (i = 0; i < len; i += 1) {
    if (itemsData[i] && itemsData[i].sh) {
      this.calculateShapeBoundingBox(itemsData[i], boundingBox);
    } else if (itemsData[i] && itemsData[i].it) {
      this.calculateBoundingBox(itemsData[i].it, boundingBox);
    }
  }
};

HShapeElement.prototype.currentBoxContains = function (box) {
  return this.currentBBox.x <= box.x
    && this.currentBBox.y <= box.y
    && this.currentBBox.width + this.currentBBox.x >= box.x + box.width
    && this.currentBBox.height + this.currentBBox.y >= box.y + box.height;
};

HShapeElement.prototype.renderInnerContent = function () {
  this._renderShapeFrame();

  if (!this.hidden && (this._isFirstFrame || this._mdf)) {
    var tempBoundingBox = this.tempBoundingBox;
    var max = 999999;
    tempBoundingBox.x = max;
    tempBoundingBox.xMax = -max;
    tempBoundingBox.y = max;
    tempBoundingBox.yMax = -max;
    this.calculateBoundingBox(this.itemsData, tempBoundingBox);
    tempBoundingBox.width = tempBoundingBox.xMax < tempBoundingBox.x ? 0 : tempBoundingBox.xMax - tempBoundingBox.x;
    tempBoundingBox.height = tempBoundingBox.yMax < tempBoundingBox.y ? 0 : tempBoundingBox.yMax - tempBoundingBox.y;
    // var tempBoundingBox = this.shapeCont.getBBox();
    if (this.currentBoxContains(tempBoundingBox)) {
      return;
    }
    var changed = false;
    if (this.currentBBox.w !== tempBoundingBox.width) {
      this.currentBBox.w = tempBoundingBox.width;
      this.shapeCont.setAttribute('width', tempBoundingBox.width);
      changed = true;
    }
    if (this.currentBBox.h !== tempBoundingBox.height) {
      this.currentBBox.h = tempBoundingBox.height;
      this.shapeCont.setAttribute('height', tempBoundingBox.height);
      changed = true;
    }
    if (changed || this.currentBBox.x !== tempBoundingBox.x || this.currentBBox.y !== tempBoundingBox.y) {
      this.currentBBox.w = tempBoundingBox.width;
      this.currentBBox.h = tempBoundingBox.height;
      this.currentBBox.x = tempBoundingBox.x;
      this.currentBBox.y = tempBoundingBox.y;

      this.shapeCont.setAttribute('viewBox', this.currentBBox.x + ' ' + this.currentBBox.y + ' ' + this.currentBBox.w + ' ' + this.currentBBox.h);
      var shapeStyle = this.shapeCont.style;
      var shapeTransform = 'translate(' + this.currentBBox.x + 'px,' + this.currentBBox.y + 'px)';
      shapeStyle.transform = shapeTransform;
      shapeStyle.webkitTransform = shapeTransform;
    }
  }
};

/* global extendPrototype, BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement,
RenderableDOMElement, ITextElement, createSizedArray, createTag, styleDiv, createNS, lineJoinEnum, lineCapEnum */

function HTextElement(data, globalData, comp) {
  this.textSpans = [];
  this.textPaths = [];
  this.currentBBox = {
    x: 999999,
    y: -999999,
    h: 0,
    w: 0,
  };
  this.renderType = 'svg';
  this.isMasked = false;
  this.initElement(data, globalData, comp);
}
extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement);

HTextElement.prototype.createContent = function () {
  this.isMasked = this.checkMasks();
  if (this.isMasked) {
    this.renderType = 'svg';
    this.compW = this.comp.data.w;
    this.compH = this.comp.data.h;
    this.svgElement.setAttribute('width', this.compW);
    this.svgElement.setAttribute('height', this.compH);
    var g = createNS('g');
    this.maskedElement.appendChild(g);
    this.innerElem = g;
  } else {
    this.renderType = 'html';
    this.innerElem = this.layerElement;
  }

  this.checkParenting();
};

HTextElement.prototype.buildNewText = function () {
  var documentData = this.textProperty.currentData;
  this.renderedLetters = createSizedArray(documentData.l ? documentData.l.length : 0);
  var innerElemStyle = this.innerElem.style;
  var textColor = documentData.fc ? this.buildColor(documentData.fc) : 'rgba(0,0,0,0)';
  innerElemStyle.fill = textColor;
  innerElemStyle.color = textColor;
  if (documentData.sc) {
    innerElemStyle.stroke = this.buildColor(documentData.sc);
    innerElemStyle.strokeWidth = documentData.sw + 'px';
  }
  var fontData = this.globalData.fontManager.getFontByName(documentData.f);
  if (!this.globalData.fontManager.chars) {
    innerElemStyle.fontSize = documentData.finalSize + 'px';
    innerElemStyle.lineHeight = documentData.finalSize + 'px';
    if (fontData.fClass) {
      this.innerElem.className = fontData.fClass;
    } else {
      innerElemStyle.fontFamily = fontData.fFamily;
      var fWeight = documentData.fWeight;
      var fStyle = documentData.fStyle;
      innerElemStyle.fontStyle = fStyle;
      innerElemStyle.fontWeight = fWeight;
    }
  }
  var i;
  var len;

  var letters = documentData.l;
  len = letters.length;
  var tSpan;
  var tParent;
  var tCont;
  var matrixHelper = this.mHelper;
  var shapes;
  var shapeStr = '';
  var cnt = 0;
  for (i = 0; i < len; i += 1) {
    if (this.globalData.fontManager.chars) {
      if (!this.textPaths[cnt]) {
        tSpan = createNS('path');
        tSpan.setAttribute('stroke-linecap', lineCapEnum[1]);
        tSpan.setAttribute('stroke-linejoin', lineJoinEnum[2]);
        tSpan.setAttribute('stroke-miterlimit', '4');
      } else {
        tSpan = this.textPaths[cnt];
      }
      if (!this.isMasked) {
        if (this.textSpans[cnt]) {
          tParent = this.textSpans[cnt];
          tCont = tParent.children[0];
        } else {
          tParent = createTag('div');
          tParent.style.lineHeight = 0;
          tCont = createNS('svg');
          tCont.appendChild(tSpan);
          styleDiv(tParent);
        }
      }
    } else if (!this.isMasked) {
      if (this.textSpans[cnt]) {
        tParent = this.textSpans[cnt];
        tSpan = this.textPaths[cnt];
      } else {
        tParent = createTag('span');
        styleDiv(tParent);
        tSpan = createTag('span');
        styleDiv(tSpan);
        tParent.appendChild(tSpan);
      }
    } else {
      tSpan = this.textPaths[cnt] ? this.textPaths[cnt] : createNS('text');
    }
    // tSpan.setAttribute('visibility', 'hidden');
    if (this.globalData.fontManager.chars) {
      var charData = this.globalData.fontManager.getCharData(documentData.finalText[i], fontData.fStyle, this.globalData.fontManager.getFontByName(documentData.f).fFamily);
      var shapeData;
      if (charData) {
        shapeData = charData.data;
      } else {
        shapeData = null;
      }
      matrixHelper.reset();
      if (shapeData && shapeData.shapes) {
        shapes = shapeData.shapes[0].it;
        matrixHelper.scale(documentData.finalSize / 100, documentData.finalSize / 100);
        shapeStr = this.createPathShape(matrixHelper, shapes);
        tSpan.setAttribute('d', shapeStr);
      }
      if (!this.isMasked) {
        this.innerElem.appendChild(tParent);
        if (shapeData && shapeData.shapes) {
          // document.body.appendChild is needed to get exact measure of shape
          document.body.appendChild(tCont);
          var boundingBox = tCont.getBBox();
          tCont.setAttribute('width', boundingBox.width + 2);
          tCont.setAttribute('height', boundingBox.height + 2);
          tCont.setAttribute('viewBox', (boundingBox.x - 1) + ' ' + (boundingBox.y - 1) + ' ' + (boundingBox.width + 2) + ' ' + (boundingBox.height + 2));
          var tContStyle = tCont.style;
          var tContTranslation = 'translate(' + (boundingBox.x - 1) + 'px,' + (boundingBox.y - 1) + 'px)';
          tContStyle.transform = tContTranslation;
          tContStyle.webkitTransform = tContTranslation;

          letters[i].yOffset = boundingBox.y - 1;
        } else {
          tCont.setAttribute('width', 1);
          tCont.setAttribute('height', 1);
        }
        tParent.appendChild(tCont);
      } else {
        this.innerElem.appendChild(tSpan);
      }
    } else {
      tSpan.textContent = letters[i].val;
      tSpan.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
      if (!this.isMasked) {
        this.innerElem.appendChild(tParent);
        //
        var tStyle = tSpan.style;
        var tSpanTranslation = 'translate3d(0,' + -documentData.finalSize / 1.2 + 'px,0)';
        tStyle.transform = tSpanTranslation;
        tStyle.webkitTransform = tSpanTranslation;
      } else {
        this.innerElem.appendChild(tSpan);
      }
    }
    //
    if (!this.isMasked) {
      this.textSpans[cnt] = tParent;
    } else {
      this.textSpans[cnt] = tSpan;
    }
    this.textSpans[cnt].style.display = 'block';
    this.textPaths[cnt] = tSpan;
    cnt += 1;
  }
  while (cnt < this.textSpans.length) {
    this.textSpans[cnt].style.display = 'none';
    cnt += 1;
  }
};

HTextElement.prototype.renderInnerContent = function () {
  var svgStyle;
  if (this.data.singleShape) {
    if (!this._isFirstFrame && !this.lettersChangedFlag) {
      return;
    } if (this.isMasked && this.finalTransform._matMdf) {
      // Todo Benchmark if using this is better than getBBox
      this.svgElement.setAttribute('viewBox', -this.finalTransform.mProp.p.v[0] + ' ' + -this.finalTransform.mProp.p.v[1] + ' ' + this.compW + ' ' + this.compH);
      svgStyle = this.svgElement.style;
      var translation = 'translate(' + -this.finalTransform.mProp.p.v[0] + 'px,' + -this.finalTransform.mProp.p.v[1] + 'px)';
      svgStyle.transform = translation;
      svgStyle.webkitTransform = translation;
    }
  }

  this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
  if (!this.lettersChangedFlag && !this.textAnimator.lettersChangedFlag) {
    return;
  }
  var i;
  var len;
  var count = 0;
  var renderedLetters = this.textAnimator.renderedLetters;

  var letters = this.textProperty.currentData.l;

  len = letters.length;
  var renderedLetter;
  var textSpan;
  var textPath;
  for (i = 0; i < len; i += 1) {
    if (letters[i].n) {
      count += 1;
    } else {
      textSpan = this.textSpans[i];
      textPath = this.textPaths[i];
      renderedLetter = renderedLetters[count];
      count += 1;
      if (renderedLetter._mdf.m) {
        if (!this.isMasked) {
          textSpan.style.webkitTransform = renderedLetter.m;
          textSpan.style.transform = renderedLetter.m;
        } else {
          textSpan.setAttribute('transform', renderedLetter.m);
        }
      }
      /// /textSpan.setAttribute('opacity',renderedLetter.o);
      textSpan.style.opacity = renderedLetter.o;
      if (renderedLetter.sw && renderedLetter._mdf.sw) {
        textPath.setAttribute('stroke-width', renderedLetter.sw);
      }
      if (renderedLetter.sc && renderedLetter._mdf.sc) {
        textPath.setAttribute('stroke', renderedLetter.sc);
      }
      if (renderedLetter.fc && renderedLetter._mdf.fc) {
        textPath.setAttribute('fill', renderedLetter.fc);
        textPath.style.color = renderedLetter.fc;
      }
    }
  }

  if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
    var boundingBox = this.innerElem.getBBox();

    if (this.currentBBox.w !== boundingBox.width) {
      this.currentBBox.w = boundingBox.width;
      this.svgElement.setAttribute('width', boundingBox.width);
    }
    if (this.currentBBox.h !== boundingBox.height) {
      this.currentBBox.h = boundingBox.height;
      this.svgElement.setAttribute('height', boundingBox.height);
    }

    var margin = 1;
    if (this.currentBBox.w !== (boundingBox.width + margin * 2) || this.currentBBox.h !== (boundingBox.height + margin * 2) || this.currentBBox.x !== (boundingBox.x - margin) || this.currentBBox.y !== (boundingBox.y - margin)) {
      this.currentBBox.w = boundingBox.width + margin * 2;
      this.currentBBox.h = boundingBox.height + margin * 2;
      this.currentBBox.x = boundingBox.x - margin;
      this.currentBBox.y = boundingBox.y - margin;

      this.svgElement.setAttribute('viewBox', this.currentBBox.x + ' ' + this.currentBBox.y + ' ' + this.currentBBox.w + ' ' + this.currentBBox.h);
      svgStyle = this.svgElement.style;
      var svgTransform = 'translate(' + this.currentBBox.x + 'px,' + this.currentBBox.y + 'px)';
      svgStyle.transform = svgTransform;
      svgStyle.webkitTransform = svgTransform;
    }
  }
};

/* global extendPrototype, BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement,
FrameElement, RenderableElement, createNS */

function HImageElement(data, globalData, comp) {
  this.assetData = globalData.getAssetData(data.refId);
  this.initElement(data, globalData, comp);
}

extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement);

HImageElement.prototype.createContent = function () {
  var assetPath = this.globalData.getAssetsPath(this.assetData);
  var img = new Image();

  if (this.data.hasMask) {
    this.imageElem = createNS('image');
    this.imageElem.setAttribute('width', this.assetData.w + 'px');
    this.imageElem.setAttribute('height', this.assetData.h + 'px');
    this.imageElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', assetPath);
    this.layerElement.appendChild(this.imageElem);
    this.baseElement.setAttribute('width', this.assetData.w);
    this.baseElement.setAttribute('height', this.assetData.h);
  } else {
    this.layerElement.appendChild(img);
  }
  img.crossOrigin = 'anonymous';
  img.src = assetPath;
  if (this.data.ln) {
    this.baseElement.setAttribute('id', this.data.ln);
  }
};

/* global PropertyFactory, degToRads, Matrix, extendPrototype, BaseElement, FrameElement, HierarchyElement */

function HCameraElement(data, globalData, comp) {
  this.initFrame();
  this.initBaseData(data, globalData, comp);
  this.initHierarchy();
  var getProp = PropertyFactory.getProp;
  this.pe = getProp(this, data.pe, 0, 0, this);
  if (data.ks.p.s) {
    this.px = getProp(this, data.ks.p.x, 1, 0, this);
    this.py = getProp(this, data.ks.p.y, 1, 0, this);
    this.pz = getProp(this, data.ks.p.z, 1, 0, this);
  } else {
    this.p = getProp(this, data.ks.p, 1, 0, this);
  }
  if (data.ks.a) {
    this.a = getProp(this, data.ks.a, 1, 0, this);
  }
  if (data.ks.or.k.length && data.ks.or.k[0].to) {
    var i;
    var len = data.ks.or.k.length;
    for (i = 0; i < len; i += 1) {
      data.ks.or.k[i].to = null;
      data.ks.or.k[i].ti = null;
    }
  }
  this.or = getProp(this, data.ks.or, 1, degToRads, this);
  this.or.sh = true;
  this.rx = getProp(this, data.ks.rx, 0, degToRads, this);
  this.ry = getProp(this, data.ks.ry, 0, degToRads, this);
  this.rz = getProp(this, data.ks.rz, 0, degToRads, this);
  this.mat = new Matrix();
  this._prevMat = new Matrix();
  this._isFirstFrame = true;

  // TODO: find a better way to make the HCamera element to be compatible with the LayerInterface and TransformInterface.
  this.finalTransform = {
    mProp: this,
  };
}
extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement);

HCameraElement.prototype.setup = function () {
  var i;
  var len = this.comp.threeDElements.length;
  var comp;
  var perspectiveStyle;
  var containerStyle;
  for (i = 0; i < len; i += 1) {
    // [perspectiveElem,container]
    comp = this.comp.threeDElements[i];
    if (comp.type === '3d') {
      perspectiveStyle = comp.perspectiveElem.style;
      containerStyle = comp.container.style;
      var perspective = this.pe.v + 'px';
      var origin = '0px 0px 0px';
      var matrix = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)';
      perspectiveStyle.perspective = perspective;
      perspectiveStyle.webkitPerspective = perspective;
      containerStyle.transformOrigin = origin;
      containerStyle.mozTransformOrigin = origin;
      containerStyle.webkitTransformOrigin = origin;
      perspectiveStyle.transform = matrix;
      perspectiveStyle.webkitTransform = matrix;
    }
  }
};

HCameraElement.prototype.createElements = function () {
};

HCameraElement.prototype.hide = function () {
};

HCameraElement.prototype.renderFrame = function () {
  var _mdf = this._isFirstFrame;
  var i;
  var len;
  if (this.hierarchy) {
    len = this.hierarchy.length;
    for (i = 0; i < len; i += 1) {
      _mdf = this.hierarchy[i].finalTransform.mProp._mdf || _mdf;
    }
  }
  if (_mdf || this.pe._mdf || (this.p && this.p._mdf) || (this.px && (this.px._mdf || this.py._mdf || this.pz._mdf)) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || (this.a && this.a._mdf)) {
    this.mat.reset();

    if (this.hierarchy) {
      len = this.hierarchy.length - 1;
      for (i = len; i >= 0; i -= 1) {
        var mTransf = this.hierarchy[i].finalTransform.mProp;
        this.mat.translate(-mTransf.p.v[0], -mTransf.p.v[1], mTransf.p.v[2]);
        this.mat.rotateX(-mTransf.or.v[0]).rotateY(-mTransf.or.v[1]).rotateZ(mTransf.or.v[2]);
        this.mat.rotateX(-mTransf.rx.v).rotateY(-mTransf.ry.v).rotateZ(mTransf.rz.v);
        this.mat.scale(1 / mTransf.s.v[0], 1 / mTransf.s.v[1], 1 / mTransf.s.v[2]);
        this.mat.translate(mTransf.a.v[0], mTransf.a.v[1], mTransf.a.v[2]);
      }
    }
    if (this.p) {
      this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]);
    } else {
      this.mat.translate(-this.px.v, -this.py.v, this.pz.v);
    }
    if (this.a) {
      var diffVector;
      if (this.p) {
        diffVector = [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]];
      } else {
        diffVector = [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]];
      }
      var mag = Math.sqrt(Math.pow(diffVector[0], 2) + Math.pow(diffVector[1], 2) + Math.pow(diffVector[2], 2));
      // var lookDir = getNormalizedPoint(getDiffVector(this.a.v,this.p.v));
      var lookDir = [diffVector[0] / mag, diffVector[1] / mag, diffVector[2] / mag];
      var lookLengthOnXZ = Math.sqrt(lookDir[2] * lookDir[2] + lookDir[0] * lookDir[0]);
      var mRotationX = (Math.atan2(lookDir[1], lookLengthOnXZ));
      var mRotationY = (Math.atan2(lookDir[0], -lookDir[2]));
      this.mat.rotateY(mRotationY).rotateX(-mRotationX);
    }
    this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v);
    this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]);
    this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0);
    this.mat.translate(0, 0, this.pe.v);

    var hasMatrixChanged = !this._prevMat.equals(this.mat);
    if ((hasMatrixChanged || this.pe._mdf) && this.comp.threeDElements) {
      len = this.comp.threeDElements.length;
      var comp;
      var perspectiveStyle;
      var containerStyle;
      for (i = 0; i < len; i += 1) {
        comp = this.comp.threeDElements[i];
        if (comp.type === '3d') {
          if (hasMatrixChanged) {
            var matValue = this.mat.toCSS();
            containerStyle = comp.container.style;
            containerStyle.transform = matValue;
            containerStyle.webkitTransform = matValue;
          }
          if (this.pe._mdf) {
            perspectiveStyle = comp.perspectiveElem.style;
            perspectiveStyle.perspective = this.pe.v + 'px';
            perspectiveStyle.webkitPerspective = this.pe.v + 'px';
          }
        }
      }
      this.mat.clone(this._prevMat);
    }
  }
  this._isFirstFrame = false;
};

HCameraElement.prototype.prepareFrame = function (num) {
  this.prepareProperties(num, true);
};

HCameraElement.prototype.destroy = function () {
};
HCameraElement.prototype.getBaseElement = function () { return null; };

function HEffects() {
}
HEffects.prototype.renderFrame = function () {};

/* global createTag, AnimationItem */
/* exported animationManager */

var animationManager = (function () {
  var moduleOb = {};
  var registeredAnimations = [];
  var initTime = 0;
  var len = 0;
  var playingAnimationsNum = 0;
  var _stopped = true;
  var _isFrozen = false;

  function removeElement(ev) {
    var i = 0;
    var animItem = ev.target;
    while (i < len) {
      if (registeredAnimations[i].animation === animItem) {
        registeredAnimations.splice(i, 1);
        i -= 1;
        len -= 1;
        if (!animItem.isPaused) {
          subtractPlayingCount();
        }
      }
      i += 1;
    }
  }

  function registerAnimation(element, animationData) {
    if (!element) {
      return null;
    }
    var i = 0;
    while (i < len) {
      if (registeredAnimations[i].elem === element && registeredAnimations[i].elem !== null) {
        return registeredAnimations[i].animation;
      }
      i += 1;
    }
    var animItem = new AnimationItem();
    setupAnimation(animItem, element);
    animItem.setData(element, animationData);
    return animItem;
  }

  function getRegisteredAnimations() {
    var i;
    var lenAnims = registeredAnimations.length;
    var animations = [];
    for (i = 0; i < lenAnims; i += 1) {
      animations.push(registeredAnimations[i].animation);
    }
    return animations;
  }

  function addPlayingCount() {
    playingAnimationsNum += 1;
    activate();
  }

  function subtractPlayingCount() {
    playingAnimationsNum -= 1;
  }

  function setupAnimation(animItem, element) {
    animItem.addEventListener('destroy', removeElement);
    animItem.addEventListener('_active', addPlayingCount);
    animItem.addEventListener('_idle', subtractPlayingCount);
    registeredAnimations.push({ elem: element, animation: animItem });
    len += 1;
  }

  function loadAnimation(params) {
    var animItem = new AnimationItem();
    setupAnimation(animItem, null);
    animItem.setParams(params);
    return animItem;
  }

  function setSpeed(val, animation) {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.setSpeed(val, animation);
    }
  }

  function setDirection(val, animation) {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.setDirection(val, animation);
    }
  }

  function play(animation) {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.play(animation);
    }
  }
  function resume(nowTime) {
    var elapsedTime = nowTime - initTime;
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.advanceTime(elapsedTime);
    }
    initTime = nowTime;
    if (playingAnimationsNum && !_isFrozen) {
      window.requestAnimationFrame(resume);
    } else {
      _stopped = true;
    }
  }

  function first(nowTime) {
    initTime = nowTime;
    window.requestAnimationFrame(resume);
  }

  function pause(animation) {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.pause(animation);
    }
  }

  function goToAndStop(value, isFrame, animation) {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.goToAndStop(value, isFrame, animation);
    }
  }

  function stop(animation) {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.stop(animation);
    }
  }

  function togglePause(animation) {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.togglePause(animation);
    }
  }

  function destroy(animation) {
    var i;
    for (i = (len - 1); i >= 0; i -= 1) {
      registeredAnimations[i].animation.destroy(animation);
    }
  }

  function searchAnimations(animationData, standalone, renderer) {
    var animElements = [].concat([].slice.call(document.getElementsByClassName('lottie')),
      [].slice.call(document.getElementsByClassName('bodymovin')));
    var i;
    var lenAnims = animElements.length;
    for (i = 0; i < lenAnims; i += 1) {
      if (renderer) {
        animElements[i].setAttribute('data-bm-type', renderer);
      }
      registerAnimation(animElements[i], animationData);
    }
    if (standalone && lenAnims === 0) {
      if (!renderer) {
        renderer = 'svg';
      }
      var body = document.getElementsByTagName('body')[0];
      body.innerText = '';
      var div = createTag('div');
      div.style.width = '100%';
      div.style.height = '100%';
      div.setAttribute('data-bm-type', renderer);
      body.appendChild(div);
      registerAnimation(div, animationData);
    }
  }

  function resize() {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.resize();
    }
  }

  function activate() {
    if (!_isFrozen && playingAnimationsNum) {
      if (_stopped) {
        window.requestAnimationFrame(first);
        _stopped = false;
      }
    }
  }

  function freeze() {
    _isFrozen = true;
  }

  function unfreeze() {
    _isFrozen = false;
    activate();
  }

  function setVolume(val, animation) {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.setVolume(val, animation);
    }
  }

  function mute(animation) {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.mute(animation);
    }
  }

  function unmute(animation) {
    var i;
    for (i = 0; i < len; i += 1) {
      registeredAnimations[i].animation.unmute(animation);
    }
  }

  moduleOb.registerAnimation = registerAnimation;
  moduleOb.loadAnimation = loadAnimation;
  moduleOb.setSpeed = setSpeed;
  moduleOb.setDirection = setDirection;
  moduleOb.play = play;
  moduleOb.pause = pause;
  moduleOb.stop = stop;
  moduleOb.togglePause = togglePause;
  moduleOb.searchAnimations = searchAnimations;
  moduleOb.resize = resize;
  // moduleOb.start = start;
  moduleOb.goToAndStop = goToAndStop;
  moduleOb.destroy = destroy;
  moduleOb.freeze = freeze;
  moduleOb.unfreeze = unfreeze;
  moduleOb.setVolume = setVolume;
  moduleOb.mute = mute;
  moduleOb.unmute = unmute;
  moduleOb.getRegisteredAnimations = getRegisteredAnimations;
  return moduleOb;
}());

/* global createElementID, subframeEnabled, ProjectInterface, ImagePreloader, audioControllerFactory, extendPrototype, BaseEvent,
CanvasRenderer, SVGRenderer, HybridRenderer, dataManager, expressionsPlugin, BMEnterFrameEvent, BMCompleteLoopEvent,
BMCompleteEvent, BMSegmentStartEvent, BMDestroyEvent, BMEnterFrameEvent, BMCompleteLoopEvent, BMCompleteEvent, BMSegmentStartEvent,
BMDestroyEvent, BMRenderFrameErrorEvent, BMConfigErrorEvent, markerParser */

var AnimationItem = function () {
  this._cbs = [];
  this.name = '';
  this.path = '';
  this.isLoaded = false;
  this.currentFrame = 0;
  this.currentRawFrame = 0;
  this.firstFrame = 0;
  this.totalFrames = 0;
  this.frameRate = 0;
  this.frameMult = 0;
  this.playSpeed = 1;
  this.playDirection = 1;
  this.playCount = 0;
  this.animationData = {};
  this.assets = [];
  this.isPaused = true;
  this.autoplay = false;
  this.loop = true;
  this.renderer = null;
  this.animationID = createElementID();
  this.assetsPath = '';
  this.timeCompleted = 0;
  this.segmentPos = 0;
  this.isSubframeEnabled = subframeEnabled;
  this.segments = [];
  this._idle = true;
  this._completedLoop = false;
  this.projectInterface = ProjectInterface();
  this.imagePreloader = new ImagePreloader();
  this.audioController = audioControllerFactory();
  this.markers = [];
  this.configAnimation = this.configAnimation.bind(this);
  this.onSetupError = this.onSetupError.bind(this);
  this.onSegmentComplete = this.onSegmentComplete.bind(this);
};

extendPrototype([BaseEvent], AnimationItem);

AnimationItem.prototype.setParams = function (params) {
  if (params.wrapper || params.container) {
    this.wrapper = params.wrapper || params.container;
  }
  var animType = 'svg';
  if (params.animType) {
    animType = params.animType;
  } else if (params.renderer) {
    animType = params.renderer;
  }
  switch (animType) {
    case 'canvas':
      this.renderer = new CanvasRenderer(this, params.rendererSettings);
      break;
    case 'svg':
      this.renderer = new SVGRenderer(this, params.rendererSettings);
      break;
    default:
      this.renderer = new HybridRenderer(this, params.rendererSettings);
      break;
  }
  this.imagePreloader.setCacheType(animType, this.renderer.globalData.defs);
  this.renderer.setProjectInterface(this.projectInterface);
  this.animType = animType;
  if (params.loop === ''
        || params.loop === null
        || params.loop === undefined
        || params.loop === true) {
    this.loop = true;
  } else if (params.loop === false) {
    this.loop = false;
  } else {
    this.loop = parseInt(params.loop, 10);
  }
  this.autoplay = 'autoplay' in params ? params.autoplay : true;
  this.name = params.name ? params.name : '';
  this.autoloadSegments = Object.prototype.hasOwnProperty.call(params, 'autoloadSegments') ? params.autoloadSegments : true;
  this.assetsPath = params.assetsPath;
  this.initialSegment = params.initialSegment;
  if (params.audioFactory) {
    this.audioController.setAudioFactory(params.audioFactory);
  }
  if (params.animationData) {
    this.setupAnimation(params.animationData);
  } else if (params.path) {
    if (params.path.lastIndexOf('\\') !== -1) {
      this.path = params.path.substr(0, params.path.lastIndexOf('\\') + 1);
    } else {
      this.path = params.path.substr(0, params.path.lastIndexOf('/') + 1);
    }
    this.fileName = params.path.substr(params.path.lastIndexOf('/') + 1);
    this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf('.json'));
    dataManager.loadAnimation(
      params.path,
      this.configAnimation,
      this.onSetupError
    );
  }
};

AnimationItem.prototype.onSetupError = function () {
  this.trigger('data_failed');
};

AnimationItem.prototype.setupAnimation = function (data) {
  dataManager.completeAnimation(
    data,
    this.configAnimation
  );
};

AnimationItem.prototype.setData = function (wrapper, animationData) {
  if (animationData) {
    if (typeof animationData !== 'object') {
      animationData = JSON.parse(animationData);
    }
  }
  var params = {
    wrapper: wrapper,
    animationData: animationData,
  };
  var wrapperAttributes = wrapper.attributes;

  params.path = wrapperAttributes.getNamedItem('data-animation-path') // eslint-disable-line no-nested-ternary
    ? wrapperAttributes.getNamedItem('data-animation-path').value
    : wrapperAttributes.getNamedItem('data-bm-path') // eslint-disable-line no-nested-ternary
      ? wrapperAttributes.getNamedItem('data-bm-path').value
      : wrapperAttributes.getNamedItem('bm-path')
        ? wrapperAttributes.getNamedItem('bm-path').value
        : '';
  params.animType = wrapperAttributes.getNamedItem('data-anim-type') // eslint-disable-line no-nested-ternary
    ? wrapperAttributes.getNamedItem('data-anim-type').value
    : wrapperAttributes.getNamedItem('data-bm-type') // eslint-disable-line no-nested-ternary
      ? wrapperAttributes.getNamedItem('data-bm-type').value
      : wrapperAttributes.getNamedItem('bm-type') // eslint-disable-line no-nested-ternary
        ? wrapperAttributes.getNamedItem('bm-type').value
        : wrapperAttributes.getNamedItem('data-bm-renderer') // eslint-disable-line no-nested-ternary
          ? wrapperAttributes.getNamedItem('data-bm-renderer').value
          : wrapperAttributes.getNamedItem('bm-renderer')
            ? wrapperAttributes.getNamedItem('bm-renderer').value
            : 'canvas';

  var loop = wrapperAttributes.getNamedItem('data-anim-loop') // eslint-disable-line no-nested-ternary
    ? wrapperAttributes.getNamedItem('data-anim-loop').value
    : wrapperAttributes.getNamedItem('data-bm-loop') // eslint-disable-line no-nested-ternary
      ? wrapperAttributes.getNamedItem('data-bm-loop').value
      : wrapperAttributes.getNamedItem('bm-loop')
        ? wrapperAttributes.getNamedItem('bm-loop').value
        : '';
  if (loop === 'false') {
    params.loop = false;
  } else if (loop === 'true') {
    params.loop = true;
  } else if (loop !== '') {
    params.loop = parseInt(loop, 10);
  }
  var autoplay = wrapperAttributes.getNamedItem('data-anim-autoplay') // eslint-disable-line no-nested-ternary
    ? wrapperAttributes.getNamedItem('data-anim-autoplay').value
    : wrapperAttributes.getNamedItem('data-bm-autoplay') // eslint-disable-line no-nested-ternary
      ? wrapperAttributes.getNamedItem('data-bm-autoplay').value
      : wrapperAttributes.getNamedItem('bm-autoplay')
        ? wrapperAttributes.getNamedItem('bm-autoplay').value
        : true;
  params.autoplay = autoplay !== 'false';

  params.name = wrapperAttributes.getNamedItem('data-name') // eslint-disable-line no-nested-ternary
    ? wrapperAttributes.getNamedItem('data-name').value
    : wrapperAttributes.getNamedItem('data-bm-name') // eslint-disable-line no-nested-ternary
      ? wrapperAttributes.getNamedItem('data-bm-name').value
      : wrapperAttributes.getNamedItem('bm-name')
        ? wrapperAttributes.getNamedItem('bm-name').value
        : '';
  var prerender = wrapperAttributes.getNamedItem('data-anim-prerender') // eslint-disable-line no-nested-ternary
    ? wrapperAttributes.getNamedItem('data-anim-prerender').value
    : wrapperAttributes.getNamedItem('data-bm-prerender') // eslint-disable-line no-nested-ternary
      ? wrapperAttributes.getNamedItem('data-bm-prerender').value
      : wrapperAttributes.getNamedItem('bm-prerender')
        ? wrapperAttributes.getNamedItem('bm-prerender').value
        : '';

  if (prerender === 'false') {
    params.prerender = false;
  }
  this.setParams(params);
};

AnimationItem.prototype.includeLayers = function (data) {
  if (data.op > this.animationData.op) {
    this.animationData.op = data.op;
    this.totalFrames = Math.floor(data.op - this.animationData.ip);
  }
  var layers = this.animationData.layers;
  var i;
  var len = layers.length;
  var newLayers = data.layers;
  var j;
  var jLen = newLayers.length;
  for (j = 0; j < jLen; j += 1) {
    i = 0;
    while (i < len) {
      if (layers[i].id === newLayers[j].id) {
        layers[i] = newLayers[j];
        break;
      }
      i += 1;
    }
  }
  if (data.chars || data.fonts) {
    this.renderer.globalData.fontManager.addChars(data.chars);
    this.renderer.globalData.fontManager.addFonts(data.fonts, this.renderer.globalData.defs);
  }
  if (data.assets) {
    len = data.assets.length;
    for (i = 0; i < len; i += 1) {
      this.animationData.assets.push(data.assets[i]);
    }
  }
  this.animationData.__complete = false;
  dataManager.completeAnimation(
    this.animationData,
    this.onSegmentComplete
  );
};

AnimationItem.prototype.onSegmentComplete = function (data) {
  this.animationData = data;
  if (expressionsPlugin) {
    expressionsPlugin.initExpressions(this);
  }
  this.loadNextSegment();
};

AnimationItem.prototype.loadNextSegment = function () {
  var segments = this.animationData.segments;
  if (!segments || segments.length === 0 || !this.autoloadSegments) {
    this.trigger('data_ready');
    this.timeCompleted = this.totalFrames;
    return;
  }
  var segment = segments.shift();
  this.timeCompleted = segment.time * this.frameRate;
  var segmentPath = this.path + this.fileName + '_' + this.segmentPos + '.json';
  this.segmentPos += 1;
  dataManager.loadData(segmentPath, this.includeLayers.bind(this), function () {
    this.trigger('data_failed');
  }.bind(this));
};

AnimationItem.prototype.loadSegments = function () {
  var segments = this.animationData.segments;
  if (!segments) {
    this.timeCompleted = this.totalFrames;
  }
  this.loadNextSegment();
};

AnimationItem.prototype.imagesLoaded = function () {
  this.trigger('loaded_images');
  this.checkLoaded();
};

AnimationItem.prototype.preloadImages = function () {
  this.imagePreloader.setAssetsPath(this.assetsPath);
  this.imagePreloader.setPath(this.path);
  this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
};

AnimationItem.prototype.configAnimation = function (animData) {
  if (!this.renderer) {
    return;
  }
  try {
    this.animationData = animData;
    if (this.initialSegment) {
      this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]);
      this.firstFrame = Math.round(this.initialSegment[0]);
    } else {
      this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip);
      this.firstFrame = Math.round(this.animationData.ip);
    }
    this.renderer.configAnimation(animData);
    if (!animData.assets) {
      animData.assets = [];
    }

    this.assets = this.animationData.assets;
    this.frameRate = this.animationData.fr;
    this.frameMult = this.animationData.fr / 1000;
    this.renderer.searchExtraCompositions(animData.assets);
    this.markers = markerParser(animData.markers || []);
    this.trigger('config_ready');
    this.preloadImages();
    this.loadSegments();
    this.updaFrameModifier();
    this.waitForFontsLoaded();
    if (this.isPaused) {
      this.audioController.pause();
    }
  } catch (error) {
    this.triggerConfigError(error);
  }
};

AnimationItem.prototype.waitForFontsLoaded = function () {
  if (!this.renderer) {
    return;
  }
  if (this.renderer.globalData.fontManager.isLoaded) {
    this.checkLoaded();
  } else {
    setTimeout(this.waitForFontsLoaded.bind(this), 20);
  }
};

AnimationItem.prototype.checkLoaded = function () {
  if (!this.isLoaded
        && this.renderer.globalData.fontManager.isLoaded
        && (this.imagePreloader.loadedImages() || this.renderer.rendererType !== 'canvas')
        && (this.imagePreloader.loadedFootages())
  ) {
    this.isLoaded = true;
    if (expressionsPlugin) {
      expressionsPlugin.initExpressions(this);
    }
    this.renderer.initItems();
    setTimeout(function () {
      this.trigger('DOMLoaded');
    }.bind(this), 0);
    this.gotoFrame();
    if (this.autoplay) {
      this.play();
    }
  }
};

AnimationItem.prototype.resize = function () {
  this.renderer.updateContainerSize();
};

AnimationItem.prototype.setSubframe = function (flag) {
  this.isSubframeEnabled = !!flag;
};

AnimationItem.prototype.gotoFrame = function () {
  this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame; // eslint-disable-line no-bitwise

  if (this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted) {
    this.currentFrame = this.timeCompleted;
  }
  this.trigger('enterFrame');
  this.renderFrame();
  this.trigger('drawnFrame');
};

AnimationItem.prototype.renderFrame = function () {
  if (this.isLoaded === false || !this.renderer) {
    return;
  }
  try {
    this.renderer.renderFrame(this.currentFrame + this.firstFrame);
  } catch (error) {
    this.triggerRenderFrameError(error);
  }
};

AnimationItem.prototype.play = function (name) {
  if (name && this.name !== name) {
    return;
  }
  if (this.isPaused === true) {
    this.isPaused = false;
    this.audioController.resume();
    if (this._idle) {
      this._idle = false;
      this.trigger('_active');
    }
  }
};

AnimationItem.prototype.pause = function (name) {
  if (name && this.name !== name) {
    return;
  }
  if (this.isPaused === false) {
    this.isPaused = true;
    this._idle = true;
    this.trigger('_idle');
    this.audioController.pause();
  }
};

AnimationItem.prototype.togglePause = function (name) {
  if (name && this.name !== name) {
    return;
  }
  if (this.isPaused === true) {
    this.play();
  } else {
    this.pause();
  }
};

AnimationItem.prototype.stop = function (name) {
  if (name && this.name !== name) {
    return;
  }
  this.pause();
  this.playCount = 0;
  this._completedLoop = false;
  this.setCurrentRawFrameValue(0);
};

AnimationItem.prototype.getMarkerData = function (markerName) {
  var marker;
  for (var i = 0; i < this.markers.length; i += 1) {
    marker = this.markers[i];
    if (marker.payload && marker.payload.name === markerName) {
      return marker;
    }
  }
  return null;
};

AnimationItem.prototype.goToAndStop = function (value, isFrame, name) {
  if (name && this.name !== name) {
    return;
  }
  var numValue = Number(value);
  if (isNaN(numValue)) {
    var marker = this.getMarkerData(value);
    if (marker) {
      this.goToAndStop(marker.time, true);
    }
  } else if (isFrame) {
    this.setCurrentRawFrameValue(value);
  } else {
    this.setCurrentRawFrameValue(value * this.frameModifier);
  }
  this.pause();
};

AnimationItem.prototype.goToAndPlay = function (value, isFrame, name) {
  if (name && this.name !== name) {
    return;
  }
  var numValue = Number(value);
  if (isNaN(numValue)) {
    var marker = this.getMarkerData(value);
    if (marker) {
      if (!marker.duration) {
        this.goToAndStop(marker.time, true);
      } else {
        this.playSegments([marker.time, marker.time + marker.duration], true);
      }
    }
  } else {
    this.goToAndStop(numValue, isFrame, name);
  }
  this.play();
};

AnimationItem.prototype.advanceTime = function (value) {
  if (this.isPaused === true || this.isLoaded === false) {
    return;
  }
  var nextValue = this.currentRawFrame + value * this.frameModifier;
  var _isComplete = false;
  // Checking if nextValue > totalFrames - 1 for addressing non looping and looping animations.
  // If animation won't loop, it should stop at totalFrames - 1. If it will loop it should complete the last frame and then loop.
  if (nextValue >= this.totalFrames - 1 && this.frameModifier > 0) {
    if (!this.loop || this.playCount === this.loop) {
      if (!this.checkSegments(nextValue > this.totalFrames ? nextValue % this.totalFrames : 0)) {
        _isComplete = true;
        nextValue = this.totalFrames - 1;
      }
    } else if (nextValue >= this.totalFrames) {
      this.playCount += 1;
      if (!this.checkSegments(nextValue % this.totalFrames)) {
        this.setCurrentRawFrameValue(nextValue % this.totalFrames);
        this._completedLoop = true;
        this.trigger('loopComplete');
      }
    } else {
      this.setCurrentRawFrameValue(nextValue);
    }
  } else if (nextValue < 0) {
    if (!this.checkSegments(nextValue % this.totalFrames)) {
      if (this.loop && !(this.playCount-- <= 0 && this.loop !== true)) { // eslint-disable-line no-plusplus
        this.setCurrentRawFrameValue(this.totalFrames + (nextValue % this.totalFrames));
        if (!this._completedLoop) {
          this._completedLoop = true;
        } else {
          this.trigger('loopComplete');
        }
      } else {
        _isComplete = true;
        nextValue = 0;
      }
    }
  } else {
    this.setCurrentRawFrameValue(nextValue);
  }
  if (_isComplete) {
    this.setCurrentRawFrameValue(nextValue);
    this.pause();
    this.trigger('complete');
  }
};

AnimationItem.prototype.adjustSegment = function (arr, offset) {
  this.playCount = 0;
  if (arr[1] < arr[0]) {
    if (this.frameModifier > 0) {
      if (this.playSpeed < 0) {
        this.setSpeed(-this.playSpeed);
      } else {
        this.setDirection(-1);
      }
    }
    this.totalFrames = arr[0] - arr[1];
    this.timeCompleted = this.totalFrames;
    this.firstFrame = arr[1];
    this.setCurrentRawFrameValue(this.totalFrames - 0.001 - offset);
  } else if (arr[1] > arr[0]) {
    if (this.frameModifier < 0) {
      if (this.playSpeed < 0) {
        this.setSpeed(-this.playSpeed);
      } else {
        this.setDirection(1);
      }
    }
    this.totalFrames = arr[1] - arr[0];
    this.timeCompleted = this.totalFrames;
    this.firstFrame = arr[0];
    this.setCurrentRawFrameValue(0.001 + offset);
  }
  this.trigger('segmentStart');
};
AnimationItem.prototype.setSegment = function (init, end) {
  var pendingFrame = -1;
  if (this.isPaused) {
    if (this.currentRawFrame + this.firstFrame < init) {
      pendingFrame = init;
    } else if (this.currentRawFrame + this.firstFrame > end) {
      pendingFrame = end - init;
    }
  }

  this.firstFrame = init;
  this.totalFrames = end - init;
  this.timeCompleted = this.totalFrames;
  if (pendingFrame !== -1) {
    this.goToAndStop(pendingFrame, true);
  }
};

AnimationItem.prototype.playSegments = function (arr, forceFlag) {
  if (forceFlag) {
    this.segments.length = 0;
  }
  if (typeof arr[0] === 'object') {
    var i;
    var len = arr.length;
    for (i = 0; i < len; i += 1) {
      this.segments.push(arr[i]);
    }
  } else {
    this.segments.push(arr);
  }
  if (this.segments.length && forceFlag) {
    this.adjustSegment(this.segments.shift(), 0);
  }
  if (this.isPaused) {
    this.play();
  }
};

AnimationItem.prototype.resetSegments = function (forceFlag) {
  this.segments.length = 0;
  this.segments.push([this.animationData.ip, this.animationData.op]);
  if (forceFlag) {
    this.checkSegments(0);
  }
};
AnimationItem.prototype.checkSegments = function (offset) {
  if (this.segments.length) {
    this.adjustSegment(this.segments.shift(), offset);
    return true;
  }
  return false;
};

AnimationItem.prototype.destroy = function (name) {
  if ((name && this.name !== name) || !this.renderer) {
    return;
  }
  this.renderer.destroy();
  this.imagePreloader.destroy();
  this.trigger('destroy');
  this._cbs = null;
  this.onEnterFrame = null;
  this.onLoopComplete = null;
  this.onComplete = null;
  this.onSegmentStart = null;
  this.onDestroy = null;
  this.renderer = null;
  this.renderer = null;
  this.imagePreloader = null;
  this.projectInterface = null;
};

AnimationItem.prototype.setCurrentRawFrameValue = function (value) {
  this.currentRawFrame = value;
  this.gotoFrame();
};

AnimationItem.prototype.setSpeed = function (val) {
  this.playSpeed = val;
  this.updaFrameModifier();
};

AnimationItem.prototype.setDirection = function (val) {
  this.playDirection = val < 0 ? -1 : 1;
  this.updaFrameModifier();
};

AnimationItem.prototype.setVolume = function (val, name) {
  if (name && this.name !== name) {
    return;
  }
  this.audioController.setVolume(val);
};

AnimationItem.prototype.getVolume = function () {
  return this.audioController.getVolume();
};

AnimationItem.prototype.mute = function (name) {
  if (name && this.name !== name) {
    return;
  }
  this.audioController.mute();
};

AnimationItem.prototype.unmute = function (name) {
  if (name && this.name !== name) {
    return;
  }
  this.audioController.unmute();
};

AnimationItem.prototype.updaFrameModifier = function () {
  this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
  this.audioController.setRate(this.playSpeed * this.playDirection);
};

AnimationItem.prototype.getPath = function () {
  return this.path;
};

AnimationItem.prototype.getAssetsPath = function (assetData) {
  var path = '';
  if (assetData.e) {
    path = assetData.p;
  } else if (this.assetsPath) {
    var imagePath = assetData.p;
    if (imagePath.indexOf('images/') !== -1) {
      imagePath = imagePath.split('/')[1];
    }
    path = this.assetsPath + imagePath;
  } else {
    path = this.path;
    path += assetData.u ? assetData.u : '';
    path += assetData.p;
  }
  return path;
};

AnimationItem.prototype.getAssetData = function (id) {
  var i = 0;
  var len = this.assets.length;
  while (i < len) {
    if (id === this.assets[i].id) {
      return this.assets[i];
    }
    i += 1;
  }
  return null;
};

AnimationItem.prototype.hide = function () {
  this.renderer.hide();
};

AnimationItem.prototype.show = function () {
  this.renderer.show();
};

AnimationItem.prototype.getDuration = function (isFrame) {
  return isFrame ? this.totalFrames : this.totalFrames / this.frameRate;
};

AnimationItem.prototype.trigger = function (name) {
  if (this._cbs && this._cbs[name]) {
    switch (name) {
      case 'enterFrame':
      case 'drawnFrame':
        this.triggerEvent(name, new BMEnterFrameEvent(name, this.currentFrame, this.totalFrames, this.frameModifier));
        break;
      case 'loopComplete':
        this.triggerEvent(name, new BMCompleteLoopEvent(name, this.loop, this.playCount, this.frameMult));
        break;
      case 'complete':
        this.triggerEvent(name, new BMCompleteEvent(name, this.frameMult));
        break;
      case 'segmentStart':
        this.triggerEvent(name, new BMSegmentStartEvent(name, this.firstFrame, this.totalFrames));
        break;
      case 'destroy':
        this.triggerEvent(name, new BMDestroyEvent(name, this));
        break;
      default:
        this.triggerEvent(name);
    }
  }
  if (name === 'enterFrame' && this.onEnterFrame) {
    this.onEnterFrame.call(this, new BMEnterFrameEvent(name, this.currentFrame, this.totalFrames, this.frameMult));
  }
  if (name === 'loopComplete' && this.onLoopComplete) {
    this.onLoopComplete.call(this, new BMCompleteLoopEvent(name, this.loop, this.playCount, this.frameMult));
  }
  if (name === 'complete' && this.onComplete) {
    this.onComplete.call(this, new BMCompleteEvent(name, this.frameMult));
  }
  if (name === 'segmentStart' && this.onSegmentStart) {
    this.onSegmentStart.call(this, new BMSegmentStartEvent(name, this.firstFrame, this.totalFrames));
  }
  if (name === 'destroy' && this.onDestroy) {
    this.onDestroy.call(this, new BMDestroyEvent(name, this));
  }
};

AnimationItem.prototype.triggerRenderFrameError = function (nativeError) {
  var error = new BMRenderFrameErrorEvent(nativeError, this.currentFrame);
  this.triggerEvent('error', error);

  if (this.onError) {
    this.onError.call(this, error);
  }
};

AnimationItem.prototype.triggerConfigError = function (nativeError) {
  var error = new BMConfigErrorEvent(nativeError, this.currentFrame);
  this.triggerEvent('error', error);

  if (this.onError) {
    this.onError.call(this, error);
  }
};

/* global CompExpressionInterface, expressionsPlugin: writable */
/* exported expressionsPlugin */

var Expressions = (function () {
  var ob = {};
  ob.initExpressions = initExpressions;

  function initExpressions(animation) {
    var stackCount = 0;
    var registers = [];

    function pushExpression() {
      stackCount += 1;
    }

    function popExpression() {
      stackCount -= 1;
      if (stackCount === 0) {
        releaseInstances();
      }
    }

    function registerExpressionProperty(expression) {
      if (registers.indexOf(expression) === -1) {
        registers.push(expression);
      }
    }

    function releaseInstances() {
      var i;
      var len = registers.length;
      for (i = 0; i < len; i += 1) {
        registers[i].release();
      }
      registers.length = 0;
    }

    animation.renderer.compInterface = CompExpressionInterface(animation.renderer);
    animation.renderer.globalData.projectInterface.registerComposition(animation.renderer);
    animation.renderer.globalData.pushExpression = pushExpression;
    animation.renderer.globalData.popExpression = popExpression;
    animation.renderer.globalData.registerExpressionProperty = registerExpressionProperty;
  }
  return ob;
}());

expressionsPlugin = Expressions;

/* eslint-disable camelcase, no-unused-vars */
/* global BMMath, BezierFactory, createTypedArray, degToRads, shapePool */

var ExpressionManager = (function () {
  'use strict';

  var ob = {};
  var Math = BMMath;
  var window = null;
  var document = null;
  var XMLHttpRequest = null;
  var fetch = null;
  var frames = null;

  function $bm_isInstanceOfArray(arr) {
    return arr.constructor === Array || arr.constructor === Float32Array;
  }

  function isNumerable(tOfV, v) {
    return tOfV === 'number' || tOfV === 'boolean' || tOfV === 'string' || v instanceof Number;
  }

  function $bm_neg(a) {
    var tOfA = typeof a;
    if (tOfA === 'number' || tOfA === 'boolean' || a instanceof Number) {
      return -a;
    }
    if ($bm_isInstanceOfArray(a)) {
      var i;
      var lenA = a.length;
      var retArr = [];
      for (i = 0; i < lenA; i += 1) {
        retArr[i] = -a[i];
      }
      return retArr;
    }
    if (a.propType) {
      return a.v;
    }
    return -a;
  }

  var easeInBez = BezierFactory.getBezierEasing(0.333, 0, 0.833, 0.833, 'easeIn').get;
  var easeOutBez = BezierFactory.getBezierEasing(0.167, 0.167, 0.667, 1, 'easeOut').get;
  var easeInOutBez = BezierFactory.getBezierEasing(0.33, 0, 0.667, 1, 'easeInOut').get;

  function sum(a, b) {
    var tOfA = typeof a;
    var tOfB = typeof b;
    if (tOfA === 'string' || tOfB === 'string') {
      return a + b;
    }
    if (isNumerable(tOfA, a) && isNumerable(tOfB, b)) {
      return a + b;
    }
    if ($bm_isInstanceOfArray(a) && isNumerable(tOfB, b)) {
      a = a.slice(0);
      a[0] += b;
      return a;
    }
    if (isNumerable(tOfA, a) && $bm_isInstanceOfArray(b)) {
      b = b.slice(0);
      b[0] = a + b[0];
      return b;
    }
    if ($bm_isInstanceOfArray(a) && $bm_isInstanceOfArray(b)) {
      var i = 0;
      var lenA = a.length;
      var lenB = b.length;
      var retArr = [];
      while (i < lenA || i < lenB) {
        if ((typeof a[i] === 'number' || a[i] instanceof Number) && (typeof b[i] === 'number' || b[i] instanceof Number)) {
          retArr[i] = a[i] + b[i];
        } else {
          retArr[i] = b[i] === undefined ? a[i] : a[i] || b[i];
        }
        i += 1;
      }
      return retArr;
    }
    return 0;
  }
  var add = sum;

  function sub(a, b) {
    var tOfA = typeof a;
    var tOfB = typeof b;
    if (isNumerable(tOfA, a) && isNumerable(tOfB, b)) {
      if (tOfA === 'string') {
        a = parseInt(a, 10);
      }
      if (tOfB === 'string') {
        b = parseInt(b, 10);
      }
      return a - b;
    }
    if ($bm_isInstanceOfArray(a) && isNumerable(tOfB, b)) {
      a = a.slice(0);
      a[0] -= b;
      return a;
    }
    if (isNumerable(tOfA, a) && $bm_isInstanceOfArray(b)) {
      b = b.slice(0);
      b[0] = a - b[0];
      return b;
    }
    if ($bm_isInstanceOfArray(a) && $bm_isInstanceOfArray(b)) {
      var i = 0;
      var lenA = a.length;
      var lenB = b.length;
      var retArr = [];
      while (i < lenA || i < lenB) {
        if ((typeof a[i] === 'number' || a[i] instanceof Number) && (typeof b[i] === 'number' || b[i] instanceof Number)) {
          retArr[i] = a[i] - b[i];
        } else {
          retArr[i] = b[i] === undefined ? a[i] : a[i] || b[i];
        }
        i += 1;
      }
      return retArr;
    }
    return 0;
  }

  function mul(a, b) {
    var tOfA = typeof a;
    var tOfB = typeof b;
    var arr;
    if (isNumerable(tOfA, a) && isNumerable(tOfB, b)) {
      return a * b;
    }

    var i;
    var len;
    if ($bm_isInstanceOfArray(a) && isNumerable(tOfB, b)) {
      len = a.length;
      arr = createTypedArray('float32', len);
      for (i = 0; i < len; i += 1) {
        arr[i] = a[i] * b;
      }
      return arr;
    }
    if (isNumerable(tOfA, a) && $bm_isInstanceOfArray(b)) {
      len = b.length;
      arr = createTypedArray('float32', len);
      for (i = 0; i < len; i += 1) {
        arr[i] = a * b[i];
      }
      return arr;
    }
    return 0;
  }

  function div(a, b) {
    var tOfA = typeof a;
    var tOfB = typeof b;
    var arr;
    if (isNumerable(tOfA, a) && isNumerable(tOfB, b)) {
      return a / b;
    }
    var i;
    var len;
    if ($bm_isInstanceOfArray(a) && isNumerable(tOfB, b)) {
      len = a.length;
      arr = createTypedArray('float32', len);
      for (i = 0; i < len; i += 1) {
        arr[i] = a[i] / b;
      }
      return arr;
    }
    if (isNumerable(tOfA, a) && $bm_isInstanceOfArray(b)) {
      len = b.length;
      arr = createTypedArray('float32', len);
      for (i = 0; i < len; i += 1) {
        arr[i] = a / b[i];
      }
      return arr;
    }
    return 0;
  }
  function mod(a, b) {
    if (typeof a === 'string') {
      a = parseInt(a, 10);
    }
    if (typeof b === 'string') {
      b = parseInt(b, 10);
    }
    return a % b;
  }
  var $bm_sum = sum;
  var $bm_sub = sub;
  var $bm_mul = mul;
  var $bm_div = div;
  var $bm_mod = mod;

  function clamp(num, min, max) {
    if (min > max) {
      var mm = max;
      max = min;
      min = mm;
    }
    return Math.min(Math.max(num, min), max);
  }

  function radiansToDegrees(val) {
    return val / degToRads;
  }
  var radians_to_degrees = radiansToDegrees;

  function degreesToRadians(val) {
    return val * degToRads;
  }
  var degrees_to_radians = radiansToDegrees;

  var helperLengthArray = [0, 0, 0, 0, 0, 0];

  function length(arr1, arr2) {
    if (typeof arr1 === 'number' || arr1 instanceof Number) {
      arr2 = arr2 || 0;
      return Math.abs(arr1 - arr2);
    }
    if (!arr2) {
      arr2 = helperLengthArray;
    }
    var i;
    var len = Math.min(arr1.length, arr2.length);
    var addedLength = 0;
    for (i = 0; i < len; i += 1) {
      addedLength += Math.pow(arr2[i] - arr1[i], 2);
    }
    return Math.sqrt(addedLength);
  }

  function normalize(vec) {
    return div(vec, length(vec));
  }

  function rgbToHsl(val) {
    var r = val[0]; var g = val[1]; var b = val[2];
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h;
    var s;
    var l = (max + min) / 2;

    if (max === min) {
      h = 0; // achromatic
      s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }

    return [h, s, l, val[3]];
  }

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  function hslToRgb(val) {
    var h = val[0];
    var s = val[1];
    var l = val[2];

    var r;
    var g;
    var b;

    if (s === 0) {
      r = l; // achromatic
      b = l; // achromatic
      g = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r, g, b, val[3]];
  }

  function linear(t, tMin, tMax, value1, value2) {
    if (value1 === undefined || value2 === undefined) {
      value1 = tMin;
      value2 = tMax;
      tMin = 0;
      tMax = 1;
    }
    if (tMax < tMin) {
      var _tMin = tMax;
      tMax = tMin;
      tMin = _tMin;
    }
    if (t <= tMin) {
      return value1;
    } if (t >= tMax) {
      return value2;
    }
    var perc = tMax === tMin ? 0 : (t - tMin) / (tMax - tMin);
    if (!value1.length) {
      return value1 + (value2 - value1) * perc;
    }
    var i;
    var len = value1.length;
    var arr = createTypedArray('float32', len);
    for (i = 0; i < len; i += 1) {
      arr[i] = value1[i] + (value2[i] - value1[i]) * perc;
    }
    return arr;
  }
  function random(min, max) {
    if (max === undefined) {
      if (min === undefined) {
        min = 0;
        max = 1;
      } else {
        max = min;
        min = undefined;
      }
    }
    if (max.length) {
      var i;
      var len = max.length;
      if (!min) {
        min = createTypedArray('float32', len);
      }
      var arr = createTypedArray('float32', len);
      var rnd = BMMath.random();
      for (i = 0; i < len; i += 1) {
        arr[i] = min[i] + rnd * (max[i] - min[i]);
      }
      return arr;
    }
    if (min === undefined) {
      min = 0;
    }
    var rndm = BMMath.random();
    return min + rndm * (max - min);
  }

  function createPath(points, inTangents, outTangents, closed) {
    var i;
    var len = points.length;
    var path = shapePool.newElement();
    path.setPathData(!!closed, len);
    var arrPlaceholder = [0, 0];
    var inVertexPoint;
    var outVertexPoint;
    for (i = 0; i < len; i += 1) {
      inVertexPoint = (inTangents && inTangents[i]) ? inTangents[i] : arrPlaceholder;
      outVertexPoint = (outTangents && outTangents[i]) ? outTangents[i] : arrPlaceholder;
      path.setTripleAt(points[i][0], points[i][1], outVertexPoint[0] + points[i][0], outVertexPoint[1] + points[i][1], inVertexPoint[0] + points[i][0], inVertexPoint[1] + points[i][1], i, true);
    }
    return path;
  }

  function initiateExpression(elem, data, property) {
    var val = data.x;
    var needsVelocity = /velocity(?![\w\d])/.test(val);
    var _needsRandom = val.indexOf('random') !== -1;
    var elemType = elem.data.ty;
    var transform;
    var $bm_transform;
    var content;
    var effect;
    var thisProperty = property;
    thisProperty.valueAtTime = thisProperty.getValueAtTime;
    Object.defineProperty(thisProperty, 'value', {
      get: function () {
        return thisProperty.v;
      },
    });
    elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate;
    elem.comp.displayStartTime = 0;
    var inPoint = elem.data.ip / elem.comp.globalData.frameRate;
    var outPoint = elem.data.op / elem.comp.globalData.frameRate;
    var width = elem.data.sw ? elem.data.sw : 0;
    var height = elem.data.sh ? elem.data.sh : 0;
    var name = elem.data.nm;
    var loopIn;
    var loop_in;
    var loopOut;
    var loop_out;
    var smooth;
    var toWorld;
    var fromWorld;
    var fromComp;
    var toComp;
    var fromCompToSurface;
    var position;
    var rotation;
    var anchorPoint;
    var scale;
    var thisLayer;
    var thisComp;
    var mask;
    var valueAtTime;
    var velocityAtTime;

    var scoped_bm_rt;
    // val = val.replace(/(\\?"|')((http)(s)?(:\/))?\/.*?(\\?"|')/g, "\"\""); // deter potential network calls
    var expression_function = eval('[function _expression_function(){' + val + ';scoped_bm_rt=$bm_rt}]')[0]; // eslint-disable-line no-eval
    var numKeys = property.kf ? data.k.length : 0;

    var active = !this.data || this.data.hd !== true;

    var wiggle = function wiggle(freq, amp) {
      var iWiggle;
      var j;
      var lenWiggle = this.pv.length ? this.pv.length : 1;
      var addedAmps = createTypedArray('float32', lenWiggle);
      freq = 5;
      var iterations = Math.floor(time * freq);
      iWiggle = 0;
      j = 0;
      while (iWiggle < iterations) {
        // var rnd = BMMath.random();
        for (j = 0; j < lenWiggle; j += 1) {
          addedAmps[j] += -amp + amp * 2 * BMMath.random();
          // addedAmps[j] += -amp + amp*2*rnd;
        }
        iWiggle += 1;
      }
      // var rnd2 = BMMath.random();
      var periods = time * freq;
      var perc = periods - Math.floor(periods);
      var arr = createTypedArray('float32', lenWiggle);
      if (lenWiggle > 1) {
        for (j = 0; j < lenWiggle; j += 1) {
          arr[j] = this.pv[j] + addedAmps[j] + (-amp + amp * 2 * BMMath.random()) * perc;
          // arr[j] = this.pv[j] + addedAmps[j] + (-amp + amp*2*rnd)*perc;
          // arr[i] = this.pv[i] + addedAmp + amp1*perc + amp2*(1-perc);
        }
        return arr;
      }
      return this.pv + addedAmps[0] + (-amp + amp * 2 * BMMath.random()) * perc;
    }.bind(this);

    if (thisProperty.loopIn) {
      loopIn = thisProperty.loopIn.bind(thisProperty);
      loop_in = loopIn;
    }

    if (thisProperty.loopOut) {
      loopOut = thisProperty.loopOut.bind(thisProperty);
      loop_out = loopOut;
    }

    if (thisProperty.smooth) {
      smooth = thisProperty.smooth.bind(thisProperty);
    }

    function loopInDuration(type, duration) {
      return loopIn(type, duration, true);
    }

    function loopOutDuration(type, duration) {
      return loopOut(type, duration, true);
    }

    if (this.getValueAtTime) {
      valueAtTime = this.getValueAtTime.bind(this);
    }

    if (this.getVelocityAtTime) {
      velocityAtTime = this.getVelocityAtTime.bind(this);
    }

    var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface);

    function lookAt(elem1, elem2) {
      var fVec = [elem2[0] - elem1[0], elem2[1] - elem1[1], elem2[2] - elem1[2]];
      var pitch = Math.atan2(fVec[0], Math.sqrt(fVec[1] * fVec[1] + fVec[2] * fVec[2])) / degToRads;
      var yaw = -Math.atan2(fVec[1], fVec[2]) / degToRads;
      return [yaw, pitch, 0];
    }

    function easeOut(t, tMin, tMax, val1, val2) {
      return applyEase(easeOutBez, t, tMin, tMax, val1, val2);
    }

    function easeIn(t, tMin, tMax, val1, val2) {
      return applyEase(easeInBez, t, tMin, tMax, val1, val2);
    }

    function ease(t, tMin, tMax, val1, val2) {
      return applyEase(easeInOutBez, t, tMin, tMax, val1, val2);
    }

    function applyEase(fn, t, tMin, tMax, val1, val2) {
      if (val1 === undefined) {
        val1 = tMin;
        val2 = tMax;
      } else {
        t = (t - tMin) / (tMax - tMin);
      }
      if (t > 1) {
        t = 1;
      } else if (t < 0) {
        t = 0;
      }
      var mult = fn(t);
      if ($bm_isInstanceOfArray(val1)) {
        var iKey;
        var lenKey = val1.length;
        var arr = createTypedArray('float32', lenKey);
        for (iKey = 0; iKey < lenKey; iKey += 1) {
          arr[iKey] = (val2[iKey] - val1[iKey]) * mult + val1[iKey];
        }
        return arr;
      }
      return (val2 - val1) * mult + val1;
    }

    function nearestKey(time) {
      var iKey;
      var lenKey = data.k.length;
      var index;
      var keyTime;
      if (!data.k.length || typeof (data.k[0]) === 'number') {
        index = 0;
        keyTime = 0;
      } else {
        index = -1;
        time *= elem.comp.globalData.frameRate;
        if (time < data.k[0].t) {
          index = 1;
          keyTime = data.k[0].t;
        } else {
          for (iKey = 0; iKey < lenKey - 1; iKey += 1) {
            if (time === data.k[iKey].t) {
              index = iKey + 1;
              keyTime = data.k[iKey].t;
              break;
            } else if (time > data.k[iKey].t && time < data.k[iKey + 1].t) {
              if (time - data.k[iKey].t > data.k[iKey + 1].t - time) {
                index = iKey + 2;
                keyTime = data.k[iKey + 1].t;
              } else {
                index = iKey + 1;
                keyTime = data.k[iKey].t;
              }
              break;
            }
          }
          if (index === -1) {
            index = iKey + 1;
            keyTime = data.k[iKey].t;
          }
        }
      }
      var obKey = {};
      obKey.index = index;
      obKey.time = keyTime / elem.comp.globalData.frameRate;
      return obKey;
    }

    function key(ind) {
      var obKey;
      var iKey;
      var lenKey;
      if (!data.k.length || typeof (data.k[0]) === 'number') {
        throw new Error('The property has no keyframe at index ' + ind);
      }
      ind -= 1;
      obKey = {
        time: data.k[ind].t / elem.comp.globalData.frameRate,
        value: [],
      };
      var arr = Object.prototype.hasOwnProperty.call(data.k[ind], 's') ? data.k[ind].s : data.k[ind - 1].e;

      lenKey = arr.length;
      for (iKey = 0; iKey < lenKey; iKey += 1) {
        obKey[iKey] = arr[iKey];
        obKey.value[iKey] = arr[iKey];
      }
      return obKey;
    }

    function framesToTime(fr, fps) {
      if (!fps) {
        fps = elem.comp.globalData.frameRate;
      }
      return fr / fps;
    }

    function timeToFrames(t, fps) {
      if (!t && t !== 0) {
        t = time;
      }
      if (!fps) {
        fps = elem.comp.globalData.frameRate;
      }
      return t * fps;
    }

    function seedRandom(seed) {
      BMMath.seedrandom(randSeed + seed);
    }

    function sourceRectAtTime() {
      return elem.sourceRectAtTime();
    }

    function substring(init, end) {
      if (typeof value === 'string') {
        if (end === undefined) {
          return value.substring(init);
        }
        return value.substring(init, end);
      }
      return '';
    }

    function substr(init, end) {
      if (typeof value === 'string') {
        if (end === undefined) {
          return value.substr(init);
        }
        return value.substr(init, end);
      }
      return '';
    }

    function posterizeTime(framesPerSecond) {
      time = framesPerSecond === 0 ? 0 : Math.floor(time * framesPerSecond) / framesPerSecond;
      value = valueAtTime(time);
    }

    var time;
    var velocity;
    var value;
    var text;
    var textIndex;
    var textTotal;
    var selectorValue;
    var index = elem.data.ind;
    var hasParent = !!(elem.hierarchy && elem.hierarchy.length);
    var parent;
    var randSeed = Math.floor(Math.random() * 1000000);
    var globalData = elem.globalData;
    function executeExpression(_value) {
      // globalData.pushExpression();
      value = _value;
      if (this.frameExpressionId === elem.globalData.frameId && this.propType !== 'textSelector') {
        return value;
      }
      if (this.propType === 'textSelector') {
        textIndex = this.textIndex;
        textTotal = this.textTotal;
        selectorValue = this.selectorValue;
      }
      if (!thisLayer) {
        text = elem.layerInterface.text;
        thisLayer = elem.layerInterface;
        thisComp = elem.comp.compInterface;
        toWorld = thisLayer.toWorld.bind(thisLayer);
        fromWorld = thisLayer.fromWorld.bind(thisLayer);
        fromComp = thisLayer.fromComp.bind(thisLayer);
        toComp = thisLayer.toComp.bind(thisLayer);
        mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null;
        fromCompToSurface = fromComp;
      }
      if (!transform) {
        transform = elem.layerInterface('ADBE Transform Group');
        $bm_transform = transform;
        if (transform) {
          anchorPoint = transform.anchorPoint;
          /* position = transform.position;
                    rotation = transform.rotation;
                    scale = transform.scale; */
        }
      }

      if (elemType === 4 && !content) {
        content = thisLayer('ADBE Root Vectors Group');
      }
      if (!effect) {
        effect = thisLayer(4);
      }
      hasParent = !!(elem.hierarchy && elem.hierarchy.length);
      if (hasParent && !parent) {
        parent = elem.hierarchy[0].layerInterface;
      }
      time = this.comp.renderedFrame / this.comp.globalData.frameRate;
      if (_needsRandom) {
        seedRandom(randSeed + time);
      }
      if (needsVelocity) {
        velocity = velocityAtTime(time);
      }
      expression_function();
      this.frameExpressionId = elem.globalData.frameId;

      // TODO: Check if it's possible to return on ShapeInterface the .v value
      if (scoped_bm_rt.propType === 'shape') {
        scoped_bm_rt = scoped_bm_rt.v;
      }
      // globalData.popExpression();
      return scoped_bm_rt;
    }
    return executeExpression;
  }

  ob.initiateExpression = initiateExpression;
  return ob;
}());

/* global ExpressionManager, createTypedArray */
/* exported expressionHelpers */

var expressionHelpers = (function () {
  function searchExpressions(elem, data, prop) {
    if (data.x) {
      prop.k = true;
      prop.x = true;
      prop.initiateExpression = ExpressionManager.initiateExpression;
      prop.effectsSequence.push(prop.initiateExpression(elem, data, prop).bind(prop));
    }
  }

  function getValueAtTime(frameNum) {
    frameNum *= this.elem.globalData.frameRate;
    frameNum -= this.offsetTime;
    if (frameNum !== this._cachingAtTime.lastFrame) {
      this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < frameNum ? this._cachingAtTime.lastIndex : 0;
      this._cachingAtTime.value = this.interpolateValue(frameNum, this._cachingAtTime);
      this._cachingAtTime.lastFrame = frameNum;
    }
    return this._cachingAtTime.value;
  }

  function getSpeedAtTime(frameNum) {
    var delta = -0.01;
    var v1 = this.getValueAtTime(frameNum);
    var v2 = this.getValueAtTime(frameNum + delta);
    var speed = 0;
    if (v1.length) {
      var i;
      for (i = 0; i < v1.length; i += 1) {
        speed += Math.pow(v2[i] - v1[i], 2);
      }
      speed = Math.sqrt(speed) * 100;
    } else {
      speed = 0;
    }
    return speed;
  }

  function getVelocityAtTime(frameNum) {
    if (this.vel !== undefined) {
      return this.vel;
    }
    var delta = -0.001;
    // frameNum += this.elem.data.st;
    var v1 = this.getValueAtTime(frameNum);
    var v2 = this.getValueAtTime(frameNum + delta);
    var velocity;
    if (v1.length) {
      velocity = createTypedArray('float32', v1.length);
      var i;
      for (i = 0; i < v1.length; i += 1) {
        // removing frameRate
        // if needed, don't add it here
        // velocity[i] = this.elem.globalData.frameRate*((v2[i] - v1[i])/delta);
        velocity[i] = (v2[i] - v1[i]) / delta;
      }
    } else {
      velocity = (v2 - v1) / delta;
    }
    return velocity;
  }

  function getStaticValueAtTime() {
    return this.pv;
  }

  function setGroupProperty(propertyGroup) {
    this.propertyGroup = propertyGroup;
  }

  return {
    searchExpressions: searchExpressions,
    getSpeedAtTime: getSpeedAtTime,
    getVelocityAtTime: getVelocityAtTime,
    getValueAtTime: getValueAtTime,
    getStaticValueAtTime: getStaticValueAtTime,
    setGroupProperty: setGroupProperty,
  };
}());

/* global createTypedArray, Matrix, TransformPropertyFactory, expressionHelpers, PropertyFactory, expressionHelpers,
initialDefaultFrame, shapePool, ShapePropertyFactory, bez, extendPrototype, ExpressionManager, createSizedArray */

(function addPropertyDecorator() {
  function loopOut(type, duration, durationFlag) {
    if (!this.k || !this.keyframes) {
      return this.pv;
    }
    type = type ? type.toLowerCase() : '';
    var currentFrame = this.comp.renderedFrame;
    var keyframes = this.keyframes;
    var lastKeyFrame = keyframes[keyframes.length - 1].t;
    if (currentFrame <= lastKeyFrame) {
      return this.pv;
    }
    var cycleDuration;
    var firstKeyFrame;
    if (!durationFlag) {
      if (!duration || duration > keyframes.length - 1) {
        duration = keyframes.length - 1;
      }
      firstKeyFrame = keyframes[keyframes.length - 1 - duration].t;
      cycleDuration = lastKeyFrame - firstKeyFrame;
    } else {
      if (!duration) {
        cycleDuration = Math.max(0, lastKeyFrame - this.elem.data.ip);
      } else {
        cycleDuration = Math.abs(lastKeyFrame - this.elem.comp.globalData.frameRate * duration);
      }
      firstKeyFrame = lastKeyFrame - cycleDuration;
    }
    var i;
    var len;
    var ret;
    if (type === 'pingpong') {
      var iterations = Math.floor((currentFrame - firstKeyFrame) / cycleDuration);
      if (iterations % 2 !== 0) {
          return this.getValueAtTime(((cycleDuration - (currentFrame - firstKeyFrame) % cycleDuration + firstKeyFrame)) / this.comp.globalData.frameRate, 0); // eslint-disable-line
      }
    } else if (type === 'offset') {
      var initV = this.getValueAtTime(firstKeyFrame / this.comp.globalData.frameRate, 0);
      var endV = this.getValueAtTime(lastKeyFrame / this.comp.globalData.frameRate, 0);
        var current = this.getValueAtTime(((currentFrame - firstKeyFrame) % cycleDuration + firstKeyFrame) / this.comp.globalData.frameRate, 0); // eslint-disable-line
      var repeats = Math.floor((currentFrame - firstKeyFrame) / cycleDuration);
      if (this.pv.length) {
        ret = new Array(initV.length);
        len = ret.length;
        for (i = 0; i < len; i += 1) {
          ret[i] = (endV[i] - initV[i]) * repeats + current[i];
        }
        return ret;
      }
      return (endV - initV) * repeats + current;
    } else if (type === 'continue') {
      var lastValue = this.getValueAtTime(lastKeyFrame / this.comp.globalData.frameRate, 0);
      var nextLastValue = this.getValueAtTime((lastKeyFrame - 0.001) / this.comp.globalData.frameRate, 0);
      if (this.pv.length) {
        ret = new Array(lastValue.length);
        len = ret.length;
        for (i = 0; i < len; i += 1) {
            ret[i] = lastValue[i] + (lastValue[i] - nextLastValue[i]) * ((currentFrame - lastKeyFrame) / this.comp.globalData.frameRate) / 0.0005; // eslint-disable-line
        }
        return ret;
      }
      return lastValue + (lastValue - nextLastValue) * (((currentFrame - lastKeyFrame)) / 0.001);
    }
      return this.getValueAtTime((((currentFrame - firstKeyFrame) % cycleDuration + firstKeyFrame)) / this.comp.globalData.frameRate, 0); // eslint-disable-line

  }

  function loopIn(type, duration, durationFlag) {
    if (!this.k) {
      return this.pv;
    }
    type = type ? type.toLowerCase() : '';
    var currentFrame = this.comp.renderedFrame;
    var keyframes = this.keyframes;
    var firstKeyFrame = keyframes[0].t;
    if (currentFrame >= firstKeyFrame) {
      return this.pv;
    }
    var cycleDuration;
    var lastKeyFrame;
    if (!durationFlag) {
      if (!duration || duration > keyframes.length - 1) {
        duration = keyframes.length - 1;
      }
      lastKeyFrame = keyframes[duration].t;
      cycleDuration = lastKeyFrame - firstKeyFrame;
    } else {
      if (!duration) {
        cycleDuration = Math.max(0, this.elem.data.op - firstKeyFrame);
      } else {
        cycleDuration = Math.abs(this.elem.comp.globalData.frameRate * duration);
      }
      lastKeyFrame = firstKeyFrame + cycleDuration;
    }
    var i;
    var len;
    var ret;
    if (type === 'pingpong') {
      var iterations = Math.floor((firstKeyFrame - currentFrame) / cycleDuration);
      if (iterations % 2 === 0) {
          return this.getValueAtTime((((firstKeyFrame - currentFrame) % cycleDuration + firstKeyFrame)) / this.comp.globalData.frameRate, 0); // eslint-disable-line
      }
    } else if (type === 'offset') {
      var initV = this.getValueAtTime(firstKeyFrame / this.comp.globalData.frameRate, 0);
      var endV = this.getValueAtTime(lastKeyFrame / this.comp.globalData.frameRate, 0);
      var current = this.getValueAtTime((cycleDuration - ((firstKeyFrame - currentFrame) % cycleDuration) + firstKeyFrame) / this.comp.globalData.frameRate, 0);
      var repeats = Math.floor((firstKeyFrame - currentFrame) / cycleDuration) + 1;
      if (this.pv.length) {
        ret = new Array(initV.length);
        len = ret.length;
        for (i = 0; i < len; i += 1) {
          ret[i] = current[i] - (endV[i] - initV[i]) * repeats;
        }
        return ret;
      }
      return current - (endV - initV) * repeats;
    } else if (type === 'continue') {
      var firstValue = this.getValueAtTime(firstKeyFrame / this.comp.globalData.frameRate, 0);
      var nextFirstValue = this.getValueAtTime((firstKeyFrame + 0.001) / this.comp.globalData.frameRate, 0);
      if (this.pv.length) {
        ret = new Array(firstValue.length);
        len = ret.length;
        for (i = 0; i < len; i += 1) {
          ret[i] = firstValue[i] + ((firstValue[i] - nextFirstValue[i]) * (firstKeyFrame - currentFrame)) / 0.001;
        }
        return ret;
      }
      return firstValue + ((firstValue - nextFirstValue) * (firstKeyFrame - currentFrame)) / 0.001;
    }
      return this.getValueAtTime(((cycleDuration - ((firstKeyFrame - currentFrame) % cycleDuration + firstKeyFrame))) / this.comp.globalData.frameRate, 0); // eslint-disable-line

  }

  function smooth(width, samples) {
    if (!this.k) {
      return this.pv;
    }
    width = (width || 0.4) * 0.5;
    samples = Math.floor(samples || 5);
    if (samples <= 1) {
      return this.pv;
    }
    var currentTime = this.comp.renderedFrame / this.comp.globalData.frameRate;
    var initFrame = currentTime - width;
    var endFrame = currentTime + width;
    var sampleFrequency = samples > 1 ? (endFrame - initFrame) / (samples - 1) : 1;
    var i = 0;
    var j = 0;
    var value;
    if (this.pv.length) {
      value = createTypedArray('float32', this.pv.length);
    } else {
      value = 0;
    }
    var sampleValue;
    while (i < samples) {
      sampleValue = this.getValueAtTime(initFrame + i * sampleFrequency);
      if (this.pv.length) {
        for (j = 0; j < this.pv.length; j += 1) {
          value[j] += sampleValue[j];
        }
      } else {
        value += sampleValue;
      }
      i += 1;
    }
    if (this.pv.length) {
      for (j = 0; j < this.pv.length; j += 1) {
        value[j] /= samples;
      }
    } else {
      value /= samples;
    }
    return value;
  }

  function getTransformValueAtTime(time) {
    if (!this._transformCachingAtTime) {
      this._transformCachingAtTime = {
        v: new Matrix(),
      };
    }
    /// /
    var matrix = this._transformCachingAtTime.v;
    matrix.cloneFromProps(this.pre.props);
    if (this.appliedTransformations < 1) {
      var anchor = this.a.getValueAtTime(time);
      matrix.translate(
        -anchor[0] * this.a.mult,
        -anchor[1] * this.a.mult,
        anchor[2] * this.a.mult
      );
    }
    if (this.appliedTransformations < 2) {
      var scale = this.s.getValueAtTime(time);
      matrix.scale(
        scale[0] * this.s.mult,
        scale[1] * this.s.mult,
        scale[2] * this.s.mult
      );
    }
    if (this.sk && this.appliedTransformations < 3) {
      var skew = this.sk.getValueAtTime(time);
      var skewAxis = this.sa.getValueAtTime(time);
      matrix.skewFromAxis(-skew * this.sk.mult, skewAxis * this.sa.mult);
    }
    if (this.r && this.appliedTransformations < 4) {
      var rotation = this.r.getValueAtTime(time);
      matrix.rotate(-rotation * this.r.mult);
    } else if (!this.r && this.appliedTransformations < 4) {
      var rotationZ = this.rz.getValueAtTime(time);
      var rotationY = this.ry.getValueAtTime(time);
      var rotationX = this.rx.getValueAtTime(time);
      var orientation = this.or.getValueAtTime(time);
      matrix.rotateZ(-rotationZ * this.rz.mult)
        .rotateY(rotationY * this.ry.mult)
        .rotateX(rotationX * this.rx.mult)
        .rotateZ(-orientation[2] * this.or.mult)
        .rotateY(orientation[1] * this.or.mult)
        .rotateX(orientation[0] * this.or.mult);
    }
    if (this.data.p && this.data.p.s) {
      var positionX = this.px.getValueAtTime(time);
      var positionY = this.py.getValueAtTime(time);
      if (this.data.p.z) {
        var positionZ = this.pz.getValueAtTime(time);
        matrix.translate(
          positionX * this.px.mult,
          positionY * this.py.mult,
          -positionZ * this.pz.mult
        );
      } else {
        matrix.translate(positionX * this.px.mult, positionY * this.py.mult, 0);
      }
    } else {
      var position = this.p.getValueAtTime(time);
      matrix.translate(
        position[0] * this.p.mult,
        position[1] * this.p.mult,
        -position[2] * this.p.mult
      );
    }
    return matrix;
    /// /
  }

  function getTransformStaticValueAtTime() {
    return this.v.clone(new Matrix());
  }

  var getTransformProperty = TransformPropertyFactory.getTransformProperty;
  TransformPropertyFactory.getTransformProperty = function (elem, data, container) {
    var prop = getTransformProperty(elem, data, container);
    if (prop.dynamicProperties.length) {
      prop.getValueAtTime = getTransformValueAtTime.bind(prop);
    } else {
      prop.getValueAtTime = getTransformStaticValueAtTime.bind(prop);
    }
    prop.setGroupProperty = expressionHelpers.setGroupProperty;
    return prop;
  };

  var propertyGetProp = PropertyFactory.getProp;
  PropertyFactory.getProp = function (elem, data, type, mult, container) {
    var prop = propertyGetProp(elem, data, type, mult, container);
    // prop.getVelocityAtTime = getVelocityAtTime;
    // prop.loopOut = loopOut;
    // prop.loopIn = loopIn;
    if (prop.kf) {
      prop.getValueAtTime = expressionHelpers.getValueAtTime.bind(prop);
    } else {
      prop.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(prop);
    }
    prop.setGroupProperty = expressionHelpers.setGroupProperty;
    prop.loopOut = loopOut;
    prop.loopIn = loopIn;
    prop.smooth = smooth;
    prop.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(prop);
    prop.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(prop);
    prop.numKeys = data.a === 1 ? data.k.length : 0;
    prop.propertyIndex = data.ix;
    var value = 0;
    if (type !== 0) {
      value = createTypedArray('float32', data.a === 1 ? data.k[0].s.length : data.k.length);
    }
    prop._cachingAtTime = {
      lastFrame: initialDefaultFrame,
      lastIndex: 0,
      value: value,
    };
    expressionHelpers.searchExpressions(elem, data, prop);
    if (prop.k) {
      container.addDynamicProperty(prop);
    }

    return prop;
  };

  function getShapeValueAtTime(frameNum) {
    // For now this caching object is created only when needed instead of creating it when the shape is initialized.
    if (!this._cachingAtTime) {
      this._cachingAtTime = {
        shapeValue: shapePool.clone(this.pv),
        lastIndex: 0,
        lastTime: initialDefaultFrame,
      };
    }

    frameNum *= this.elem.globalData.frameRate;
    frameNum -= this.offsetTime;
    if (frameNum !== this._cachingAtTime.lastTime) {
      this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < frameNum ? this._caching.lastIndex : 0;
      this._cachingAtTime.lastTime = frameNum;
      this.interpolateShape(frameNum, this._cachingAtTime.shapeValue, this._cachingAtTime);
    }
    return this._cachingAtTime.shapeValue;
  }

  var ShapePropertyConstructorFunction = ShapePropertyFactory.getConstructorFunction();
  var KeyframedShapePropertyConstructorFunction = ShapePropertyFactory.getKeyframedConstructorFunction();

  function ShapeExpressions() {}
  ShapeExpressions.prototype = {
    vertices: function (prop, time) {
      if (this.k) {
        this.getValue();
      }
      var shapePath = this.v;
      if (time !== undefined) {
        shapePath = this.getValueAtTime(time, 0);
      }
      var i;
      var len = shapePath._length;
      var vertices = shapePath[prop];
      var points = shapePath.v;
      var arr = createSizedArray(len);
      for (i = 0; i < len; i += 1) {
        if (prop === 'i' || prop === 'o') {
          arr[i] = [vertices[i][0] - points[i][0], vertices[i][1] - points[i][1]];
        } else {
          arr[i] = [vertices[i][0], vertices[i][1]];
        }
      }
      return arr;
    },
    points: function (time) {
      return this.vertices('v', time);
    },
    inTangents: function (time) {
      return this.vertices('i', time);
    },
    outTangents: function (time) {
      return this.vertices('o', time);
    },
    isClosed: function () {
      return this.v.c;
    },
    pointOnPath: function (perc, time) {
      var shapePath = this.v;
      if (time !== undefined) {
        shapePath = this.getValueAtTime(time, 0);
      }
      if (!this._segmentsLength) {
        this._segmentsLength = bez.getSegmentsLength(shapePath);
      }

      var segmentsLength = this._segmentsLength;
      var lengths = segmentsLength.lengths;
      var lengthPos = segmentsLength.totalLength * perc;
      var i = 0;
      var len = lengths.length;
      var accumulatedLength = 0;
      var pt;
      while (i < len) {
        if (accumulatedLength + lengths[i].addedLength > lengthPos) {
          var initIndex = i;
          var endIndex = (shapePath.c && i === len - 1) ? 0 : i + 1;
          var segmentPerc = (lengthPos - accumulatedLength) / lengths[i].addedLength;
          pt = bez.getPointInSegment(shapePath.v[initIndex], shapePath.v[endIndex], shapePath.o[initIndex], shapePath.i[endIndex], segmentPerc, lengths[i]);
          break;
        } else {
          accumulatedLength += lengths[i].addedLength;
        }
        i += 1;
      }
      if (!pt) {
        pt = shapePath.c ? [shapePath.v[0][0], shapePath.v[0][1]] : [shapePath.v[shapePath._length - 1][0], shapePath.v[shapePath._length - 1][1]];
      }
      return pt;
    },
    vectorOnPath: function (perc, time, vectorType) {
      // perc doesn't use triple equality because it can be a Number object as well as a primitive.
      if (perc == 1) { // eslint-disable-line eqeqeq
        perc = this.v.c;
      } else if (perc == 0) { // eslint-disable-line eqeqeq
        perc = 0.999;
      }
      var pt1 = this.pointOnPath(perc, time);
      var pt2 = this.pointOnPath(perc + 0.001, time);
      var xLength = pt2[0] - pt1[0];
      var yLength = pt2[1] - pt1[1];
      var magnitude = Math.sqrt(Math.pow(xLength, 2) + Math.pow(yLength, 2));
      if (magnitude === 0) {
        return [0, 0];
      }
      var unitVector = vectorType === 'tangent' ? [xLength / magnitude, yLength / magnitude] : [-yLength / magnitude, xLength / magnitude];
      return unitVector;
    },
    tangentOnPath: function (perc, time) {
      return this.vectorOnPath(perc, time, 'tangent');
    },
    normalOnPath: function (perc, time) {
      return this.vectorOnPath(perc, time, 'normal');
    },
    setGroupProperty: expressionHelpers.setGroupProperty,
    getValueAtTime: expressionHelpers.getStaticValueAtTime,
  };
  extendPrototype([ShapeExpressions], ShapePropertyConstructorFunction);
  extendPrototype([ShapeExpressions], KeyframedShapePropertyConstructorFunction);
  KeyframedShapePropertyConstructorFunction.prototype.getValueAtTime = getShapeValueAtTime;
  KeyframedShapePropertyConstructorFunction.prototype.initiateExpression = ExpressionManager.initiateExpression;

  var propertyGetShapeProp = ShapePropertyFactory.getShapeProp;
  ShapePropertyFactory.getShapeProp = function (elem, data, type, arr, trims) {
    var prop = propertyGetShapeProp(elem, data, type, arr, trims);
    prop.propertyIndex = data.ix;
    prop.lock = false;
    if (type === 3) {
      expressionHelpers.searchExpressions(elem, data.pt, prop);
    } else if (type === 4) {
      expressionHelpers.searchExpressions(elem, data.ks, prop);
    }
    if (prop.k) {
      elem.addDynamicProperty(prop);
    }
    return prop;
  };
}());

/* global ExpressionManager, TextProperty */

(function addDecorator() {
  function searchExpressions() {
    if (this.data.d.x) {
      this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this);
      this.addEffect(this.getExpressionValue.bind(this));
      return true;
    }
    return null;
  }

  TextProperty.prototype.getExpressionValue = function (currentValue, text) {
    var newValue = this.calculateExpression(text);
    if (currentValue.t !== newValue) {
      var newData = {};
      this.copyData(newData, currentValue);
      newData.t = newValue.toString();
      newData.__complete = false;
      return newData;
    }
    return currentValue;
  };

  TextProperty.prototype.searchProperty = function () {
    var isKeyframed = this.searchKeyframes();
    var hasExpressions = this.searchExpressions();
    this.kf = isKeyframed || hasExpressions;
    return this.kf;
  };

  TextProperty.prototype.searchExpressions = searchExpressions;
}());

/* global propertyGroupFactory, PropertyInterface */
/* exported ShapePathInterface */

var ShapePathInterface = (

  function () {
    return function pathInterfaceFactory(shape, view, propertyGroup) {
      var prop = view.sh;

      function interfaceFunction(val) {
        if (val === 'Shape' || val === 'shape' || val === 'Path' || val === 'path' || val === 'ADBE Vector Shape' || val === 2) {
          return interfaceFunction.path;
        }
        return null;
      }

      var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
      prop.setGroupProperty(PropertyInterface('Path', _propertyGroup));
      Object.defineProperties(interfaceFunction, {
        path: {
          get: function () {
            if (prop.k) {
              prop.getValue();
            }
            return prop;
          },
        },
        shape: {
          get: function () {
            if (prop.k) {
              prop.getValue();
            }
            return prop;
          },
        },
        _name: { value: shape.nm },
        ix: { value: shape.ix },
        propertyIndex: { value: shape.ix },
        mn: { value: shape.mn },
        propertyGroup: { value: propertyGroup },
      });
      return interfaceFunction;
    };
  }()
);

/* exported propertyGroupFactory */

var propertyGroupFactory = (function () {
  return function (interfaceFunction, parentPropertyGroup) {
    return function (val) {
      val = val === undefined ? 1 : val;
      if (val <= 0) {
        return interfaceFunction;
      }
      return parentPropertyGroup(val - 1);
    };
  };
}());

/* exported PropertyInterface */

var PropertyInterface = (function () {
  return function (propertyName, propertyGroup) {
    var interfaceFunction = {
      _name: propertyName,
    };

    function _propertyGroup(val) {
      val = val === undefined ? 1 : val;
      if (val <= 0) {
        return interfaceFunction;
      }
      return propertyGroup(val - 1);
    }

    return _propertyGroup;
  };
}());

/* global ExpressionPropertyInterface, PropertyInterface, propertyGroupFactory, ShapePathInterface */
/* exported ShapeExpressionInterface */

var ShapeExpressionInterface = (function () {
  function iterateElements(shapes, view, propertyGroup) {
    var arr = [];
    var i;
    var len = shapes ? shapes.length : 0;
    for (i = 0; i < len; i += 1) {
      if (shapes[i].ty === 'gr') {
        arr.push(groupInterfaceFactory(shapes[i], view[i], propertyGroup));
      } else if (shapes[i].ty === 'fl') {
        arr.push(fillInterfaceFactory(shapes[i], view[i], propertyGroup));
      } else if (shapes[i].ty === 'st') {
        arr.push(strokeInterfaceFactory(shapes[i], view[i], propertyGroup));
      } else if (shapes[i].ty === 'tm') {
        arr.push(trimInterfaceFactory(shapes[i], view[i], propertyGroup));
      } else if (shapes[i].ty === 'tr') {
        // arr.push(transformInterfaceFactory(shapes[i],view[i],propertyGroup));
      } else if (shapes[i].ty === 'el') {
        arr.push(ellipseInterfaceFactory(shapes[i], view[i], propertyGroup));
      } else if (shapes[i].ty === 'sr') {
        arr.push(starInterfaceFactory(shapes[i], view[i], propertyGroup));
      } else if (shapes[i].ty === 'sh') {
        arr.push(ShapePathInterface(shapes[i], view[i], propertyGroup));
      } else if (shapes[i].ty === 'rc') {
        arr.push(rectInterfaceFactory(shapes[i], view[i], propertyGroup));
      } else if (shapes[i].ty === 'rd') {
        arr.push(roundedInterfaceFactory(shapes[i], view[i], propertyGroup));
      } else if (shapes[i].ty === 'rp') {
        arr.push(repeaterInterfaceFactory(shapes[i], view[i], propertyGroup));
      } else if (shapes[i].ty === 'gf') {
        arr.push(gradientFillInterfaceFactory(shapes[i], view[i], propertyGroup));
      } else {
        arr.push(defaultInterfaceFactory(shapes[i], view[i], propertyGroup));
      }
    }
    return arr;
  }

  function contentsInterfaceFactory(shape, view, propertyGroup) {
    var interfaces;
    var interfaceFunction = function _interfaceFunction(value) {
      var i = 0;
      var len = interfaces.length;
      while (i < len) {
        if (interfaces[i]._name === value || interfaces[i].mn === value || interfaces[i].propertyIndex === value || interfaces[i].ix === value || interfaces[i].ind === value) {
          return interfaces[i];
        }
        i += 1;
      }
      if (typeof value === 'number') {
        return interfaces[value - 1];
      }
      return null;
    };

    interfaceFunction.propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
    interfaces = iterateElements(shape.it, view.it, interfaceFunction.propertyGroup);
    interfaceFunction.numProperties = interfaces.length;
    var transformInterface = transformInterfaceFactory(shape.it[shape.it.length - 1], view.it[view.it.length - 1], interfaceFunction.propertyGroup);
    interfaceFunction.transform = transformInterface;
    interfaceFunction.propertyIndex = shape.cix;
    interfaceFunction._name = shape.nm;

    return interfaceFunction;
  }

  function groupInterfaceFactory(shape, view, propertyGroup) {
    var interfaceFunction = function _interfaceFunction(value) {
      switch (value) {
        case 'ADBE Vectors Group':
        case 'Contents':
        case 2:
          return interfaceFunction.content;
          // Not necessary for now. Keeping them here in case a new case appears
          // case 'ADBE Vector Transform Group':
          // case 3:
        default:
          return interfaceFunction.transform;
      }
    };
    interfaceFunction.propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
    var content = contentsInterfaceFactory(shape, view, interfaceFunction.propertyGroup);
    var transformInterface = transformInterfaceFactory(shape.it[shape.it.length - 1], view.it[view.it.length - 1], interfaceFunction.propertyGroup);
    interfaceFunction.content = content;
    interfaceFunction.transform = transformInterface;
    Object.defineProperty(interfaceFunction, '_name', {
      get: function () {
        return shape.nm;
      },
    });
    // interfaceFunction.content = interfaceFunction;
    interfaceFunction.numProperties = shape.np;
    interfaceFunction.propertyIndex = shape.ix;
    interfaceFunction.nm = shape.nm;
    interfaceFunction.mn = shape.mn;
    return interfaceFunction;
  }

  function fillInterfaceFactory(shape, view, propertyGroup) {
    function interfaceFunction(val) {
      if (val === 'Color' || val === 'color') {
        return interfaceFunction.color;
      } if (val === 'Opacity' || val === 'opacity') {
        return interfaceFunction.opacity;
      }
      return null;
    }
    Object.defineProperties(interfaceFunction, {
      color: {
        get: ExpressionPropertyInterface(view.c),
      },
      opacity: {
        get: ExpressionPropertyInterface(view.o),
      },
      _name: { value: shape.nm },
      mn: { value: shape.mn },
    });

    view.c.setGroupProperty(PropertyInterface('Color', propertyGroup));
    view.o.setGroupProperty(PropertyInterface('Opacity', propertyGroup));
    return interfaceFunction;
  }

  function gradientFillInterfaceFactory(shape, view, propertyGroup) {
    function interfaceFunction(val) {
      if (val === 'Start Point' || val === 'start point') {
        return interfaceFunction.startPoint;
      }
      if (val === 'End Point' || val === 'end point') {
        return interfaceFunction.endPoint;
      }
      if (val === 'Opacity' || val === 'opacity') {
        return interfaceFunction.opacity;
      }
      return null;
    }
    Object.defineProperties(interfaceFunction, {
      startPoint: {
        get: ExpressionPropertyInterface(view.s),
      },
      endPoint: {
        get: ExpressionPropertyInterface(view.e),
      },
      opacity: {
        get: ExpressionPropertyInterface(view.o),
      },
      type: {
        get: function () {
          return 'a';
        },
      },
      _name: { value: shape.nm },
      mn: { value: shape.mn },
    });

    view.s.setGroupProperty(PropertyInterface('Start Point', propertyGroup));
    view.e.setGroupProperty(PropertyInterface('End Point', propertyGroup));
    view.o.setGroupProperty(PropertyInterface('Opacity', propertyGroup));
    return interfaceFunction;
  }
  function defaultInterfaceFactory() {
    function interfaceFunction() {
      return null;
    }
    return interfaceFunction;
  }

  function strokeInterfaceFactory(shape, view, propertyGroup) {
    var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
    var _dashPropertyGroup = propertyGroupFactory(dashOb, _propertyGroup);
    function addPropertyToDashOb(i) {
      Object.defineProperty(dashOb, shape.d[i].nm, {
        get: ExpressionPropertyInterface(view.d.dataProps[i].p),
      });
    }
    var i;
    var len = shape.d ? shape.d.length : 0;
    var dashOb = {};
    for (i = 0; i < len; i += 1) {
      addPropertyToDashOb(i);
      view.d.dataProps[i].p.setGroupProperty(_dashPropertyGroup);
    }

    function interfaceFunction(val) {
      if (val === 'Color' || val === 'color') {
        return interfaceFunction.color;
      } if (val === 'Opacity' || val === 'opacity') {
        return interfaceFunction.opacity;
      } if (val === 'Stroke Width' || val === 'stroke width') {
        return interfaceFunction.strokeWidth;
      }
      return null;
    }
    Object.defineProperties(interfaceFunction, {
      color: {
        get: ExpressionPropertyInterface(view.c),
      },
      opacity: {
        get: ExpressionPropertyInterface(view.o),
      },
      strokeWidth: {
        get: ExpressionPropertyInterface(view.w),
      },
      dash: {
        get: function () {
          return dashOb;
        },
      },
      _name: { value: shape.nm },
      mn: { value: shape.mn },
    });

    view.c.setGroupProperty(PropertyInterface('Color', _propertyGroup));
    view.o.setGroupProperty(PropertyInterface('Opacity', _propertyGroup));
    view.w.setGroupProperty(PropertyInterface('Stroke Width', _propertyGroup));
    return interfaceFunction;
  }

  function trimInterfaceFactory(shape, view, propertyGroup) {
    function interfaceFunction(val) {
      if (val === shape.e.ix || val === 'End' || val === 'end') {
        return interfaceFunction.end;
      }
      if (val === shape.s.ix) {
        return interfaceFunction.start;
      }
      if (val === shape.o.ix) {
        return interfaceFunction.offset;
      }
      return null;
    }

    var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
    interfaceFunction.propertyIndex = shape.ix;

    view.s.setGroupProperty(PropertyInterface('Start', _propertyGroup));
    view.e.setGroupProperty(PropertyInterface('End', _propertyGroup));
    view.o.setGroupProperty(PropertyInterface('Offset', _propertyGroup));
    interfaceFunction.propertyIndex = shape.ix;
    interfaceFunction.propertyGroup = propertyGroup;

    Object.defineProperties(interfaceFunction, {
      start: {
        get: ExpressionPropertyInterface(view.s),
      },
      end: {
        get: ExpressionPropertyInterface(view.e),
      },
      offset: {
        get: ExpressionPropertyInterface(view.o),
      },
      _name: { value: shape.nm },
    });
    interfaceFunction.mn = shape.mn;
    return interfaceFunction;
  }

  function transformInterfaceFactory(shape, view, propertyGroup) {
    function interfaceFunction(value) {
      if (shape.a.ix === value || value === 'Anchor Point') {
        return interfaceFunction.anchorPoint;
      }
      if (shape.o.ix === value || value === 'Opacity') {
        return interfaceFunction.opacity;
      }
      if (shape.p.ix === value || value === 'Position') {
        return interfaceFunction.position;
      }
      if (shape.r.ix === value || value === 'Rotation' || value === 'ADBE Vector Rotation') {
        return interfaceFunction.rotation;
      }
      if (shape.s.ix === value || value === 'Scale') {
        return interfaceFunction.scale;
      }
      if ((shape.sk && shape.sk.ix === value) || value === 'Skew') {
        return interfaceFunction.skew;
      }
      if ((shape.sa && shape.sa.ix === value) || value === 'Skew Axis') {
        return interfaceFunction.skewAxis;
      }
      return null;
    }
    var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
    view.transform.mProps.o.setGroupProperty(PropertyInterface('Opacity', _propertyGroup));
    view.transform.mProps.p.setGroupProperty(PropertyInterface('Position', _propertyGroup));
    view.transform.mProps.a.setGroupProperty(PropertyInterface('Anchor Point', _propertyGroup));
    view.transform.mProps.s.setGroupProperty(PropertyInterface('Scale', _propertyGroup));
    view.transform.mProps.r.setGroupProperty(PropertyInterface('Rotation', _propertyGroup));
    if (view.transform.mProps.sk) {
      view.transform.mProps.sk.setGroupProperty(PropertyInterface('Skew', _propertyGroup));
      view.transform.mProps.sa.setGroupProperty(PropertyInterface('Skew Angle', _propertyGroup));
    }
    view.transform.op.setGroupProperty(PropertyInterface('Opacity', _propertyGroup));
    Object.defineProperties(interfaceFunction, {
      opacity: {
        get: ExpressionPropertyInterface(view.transform.mProps.o),
      },
      position: {
        get: ExpressionPropertyInterface(view.transform.mProps.p),
      },
      anchorPoint: {
        get: ExpressionPropertyInterface(view.transform.mProps.a),
      },
      scale: {
        get: ExpressionPropertyInterface(view.transform.mProps.s),
      },
      rotation: {
        get: ExpressionPropertyInterface(view.transform.mProps.r),
      },
      skew: {
        get: ExpressionPropertyInterface(view.transform.mProps.sk),
      },
      skewAxis: {
        get: ExpressionPropertyInterface(view.transform.mProps.sa),
      },
      _name: { value: shape.nm },
    });
    interfaceFunction.ty = 'tr';
    interfaceFunction.mn = shape.mn;
    interfaceFunction.propertyGroup = propertyGroup;
    return interfaceFunction;
  }

  function ellipseInterfaceFactory(shape, view, propertyGroup) {
    function interfaceFunction(value) {
      if (shape.p.ix === value) {
        return interfaceFunction.position;
      }
      if (shape.s.ix === value) {
        return interfaceFunction.size;
      }
      return null;
    }
    var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
    interfaceFunction.propertyIndex = shape.ix;
    var prop = view.sh.ty === 'tm' ? view.sh.prop : view.sh;
    prop.s.setGroupProperty(PropertyInterface('Size', _propertyGroup));
    prop.p.setGroupProperty(PropertyInterface('Position', _propertyGroup));

    Object.defineProperties(interfaceFunction, {
      size: {
        get: ExpressionPropertyInterface(prop.s),
      },
      position: {
        get: ExpressionPropertyInterface(prop.p),
      },
      _name: { value: shape.nm },
    });
    interfaceFunction.mn = shape.mn;
    return interfaceFunction;
  }

  function starInterfaceFactory(shape, view, propertyGroup) {
    function interfaceFunction(value) {
      if (shape.p.ix === value) {
        return interfaceFunction.position;
      }
      if (shape.r.ix === value) {
        return interfaceFunction.rotation;
      }
      if (shape.pt.ix === value) {
        return interfaceFunction.points;
      }
      if (shape.or.ix === value || value === 'ADBE Vector Star Outer Radius') {
        return interfaceFunction.outerRadius;
      }
      if (shape.os.ix === value) {
        return interfaceFunction.outerRoundness;
      }
      if (shape.ir && (shape.ir.ix === value || value === 'ADBE Vector Star Inner Radius')) {
        return interfaceFunction.innerRadius;
      }
      if (shape.is && shape.is.ix === value) {
        return interfaceFunction.innerRoundness;
      }
      return null;
    }

    var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
    var prop = view.sh.ty === 'tm' ? view.sh.prop : view.sh;
    interfaceFunction.propertyIndex = shape.ix;
    prop.or.setGroupProperty(PropertyInterface('Outer Radius', _propertyGroup));
    prop.os.setGroupProperty(PropertyInterface('Outer Roundness', _propertyGroup));
    prop.pt.setGroupProperty(PropertyInterface('Points', _propertyGroup));
    prop.p.setGroupProperty(PropertyInterface('Position', _propertyGroup));
    prop.r.setGroupProperty(PropertyInterface('Rotation', _propertyGroup));
    if (shape.ir) {
      prop.ir.setGroupProperty(PropertyInterface('Inner Radius', _propertyGroup));
      prop.is.setGroupProperty(PropertyInterface('Inner Roundness', _propertyGroup));
    }

    Object.defineProperties(interfaceFunction, {
      position: {
        get: ExpressionPropertyInterface(prop.p),
      },
      rotation: {
        get: ExpressionPropertyInterface(prop.r),
      },
      points: {
        get: ExpressionPropertyInterface(prop.pt),
      },
      outerRadius: {
        get: ExpressionPropertyInterface(prop.or),
      },
      outerRoundness: {
        get: ExpressionPropertyInterface(prop.os),
      },
      innerRadius: {
        get: ExpressionPropertyInterface(prop.ir),
      },
      innerRoundness: {
        get: ExpressionPropertyInterface(prop.is),
      },
      _name: { value: shape.nm },
    });
    interfaceFunction.mn = shape.mn;
    return interfaceFunction;
  }

  function rectInterfaceFactory(shape, view, propertyGroup) {
    function interfaceFunction(value) {
      if (shape.p.ix === value) {
        return interfaceFunction.position;
      }
      if (shape.r.ix === value) {
        return interfaceFunction.roundness;
      }
      if (shape.s.ix === value || value === 'Size' || value === 'ADBE Vector Rect Size') {
        return interfaceFunction.size;
      }
      return null;
    }
    var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);

    var prop = view.sh.ty === 'tm' ? view.sh.prop : view.sh;
    interfaceFunction.propertyIndex = shape.ix;
    prop.p.setGroupProperty(PropertyInterface('Position', _propertyGroup));
    prop.s.setGroupProperty(PropertyInterface('Size', _propertyGroup));
    prop.r.setGroupProperty(PropertyInterface('Rotation', _propertyGroup));

    Object.defineProperties(interfaceFunction, {
      position: {
        get: ExpressionPropertyInterface(prop.p),
      },
      roundness: {
        get: ExpressionPropertyInterface(prop.r),
      },
      size: {
        get: ExpressionPropertyInterface(prop.s),
      },
      _name: { value: shape.nm },
    });
    interfaceFunction.mn = shape.mn;
    return interfaceFunction;
  }

  function roundedInterfaceFactory(shape, view, propertyGroup) {
    function interfaceFunction(value) {
      if (shape.r.ix === value || value === 'Round Corners 1') {
        return interfaceFunction.radius;
      }
      return null;
    }

    var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
    var prop = view;
    interfaceFunction.propertyIndex = shape.ix;
    prop.rd.setGroupProperty(PropertyInterface('Radius', _propertyGroup));

    Object.defineProperties(interfaceFunction, {
      radius: {
        get: ExpressionPropertyInterface(prop.rd),
      },
      _name: { value: shape.nm },
    });
    interfaceFunction.mn = shape.mn;
    return interfaceFunction;
  }

  function repeaterInterfaceFactory(shape, view, propertyGroup) {
    function interfaceFunction(value) {
      if (shape.c.ix === value || value === 'Copies') {
        return interfaceFunction.copies;
      } if (shape.o.ix === value || value === 'Offset') {
        return interfaceFunction.offset;
      }
      return null;
    }

    var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
    var prop = view;
    interfaceFunction.propertyIndex = shape.ix;
    prop.c.setGroupProperty(PropertyInterface('Copies', _propertyGroup));
    prop.o.setGroupProperty(PropertyInterface('Offset', _propertyGroup));
    Object.defineProperties(interfaceFunction, {
      copies: {
        get: ExpressionPropertyInterface(prop.c),
      },
      offset: {
        get: ExpressionPropertyInterface(prop.o),
      },
      _name: { value: shape.nm },
    });
    interfaceFunction.mn = shape.mn;
    return interfaceFunction;
  }

  return function (shapes, view, propertyGroup) {
    var interfaces;
    function _interfaceFunction(value) {
      if (typeof value === 'number') {
        value = value === undefined ? 1 : value;
        if (value === 0) {
          return propertyGroup;
        }
        return interfaces[value - 1];
      }
      var i = 0;
      var len = interfaces.length;
      while (i < len) {
        if (interfaces[i]._name === value) {
          return interfaces[i];
        }
        i += 1;
      }
      return null;
    }
    function parentGroupWrapper() {
      return propertyGroup;
    }
    _interfaceFunction.propertyGroup = propertyGroupFactory(_interfaceFunction, parentGroupWrapper);
    interfaces = iterateElements(shapes, view, _interfaceFunction.propertyGroup);
    _interfaceFunction.numProperties = interfaces.length;
    _interfaceFunction._name = 'Contents';
    return _interfaceFunction;
  };
}());

/* exported TextExpressionInterface */

var TextExpressionInterface = (function () {
  return function (elem) {
    var _prevValue;
    var _sourceText;
    function _thisLayerFunction(name) {
      switch (name) {
        case 'ADBE Text Document':
          return _thisLayerFunction.sourceText;
        default:
          return null;
      }
    }
    Object.defineProperty(_thisLayerFunction, 'sourceText', {
      get: function () {
        elem.textProperty.getValue();
        var stringValue = elem.textProperty.currentData.t;
        if (stringValue !== _prevValue) {
          elem.textProperty.currentData.t = _prevValue;
          _sourceText = new String(stringValue); // eslint-disable-line no-new-wrappers
          // If stringValue is an empty string, eval returns undefined, so it has to be returned as a String primitive
          _sourceText.value = stringValue || new String(stringValue); // eslint-disable-line no-new-wrappers
        }
        return _sourceText;
      },
    });
    return _thisLayerFunction;
  };
}());

/* global Matrix, MaskManagerInterface, TransformExpressionInterface, getDescriptor */
/* exported LayerExpressionInterface */

var LayerExpressionInterface = (function () {
  function getMatrix(time) {
    var toWorldMat = new Matrix();
    if (time !== undefined) {
      var propMatrix = this._elem.finalTransform.mProp.getValueAtTime(time);
      propMatrix.clone(toWorldMat);
    } else {
      var transformMat = this._elem.finalTransform.mProp;
      transformMat.applyToMatrix(toWorldMat);
    }
    return toWorldMat;
  }

  function toWorldVec(arr, time) {
    var toWorldMat = this.getMatrix(time);
    toWorldMat.props[12] = 0;
    toWorldMat.props[13] = 0;
    toWorldMat.props[14] = 0;
    return this.applyPoint(toWorldMat, arr);
  }

  function toWorld(arr, time) {
    var toWorldMat = this.getMatrix(time);
    return this.applyPoint(toWorldMat, arr);
  }

  function fromWorldVec(arr, time) {
    var toWorldMat = this.getMatrix(time);
    toWorldMat.props[12] = 0;
    toWorldMat.props[13] = 0;
    toWorldMat.props[14] = 0;
    return this.invertPoint(toWorldMat, arr);
  }

  function fromWorld(arr, time) {
    var toWorldMat = this.getMatrix(time);
    return this.invertPoint(toWorldMat, arr);
  }

  function applyPoint(matrix, arr) {
    if (this._elem.hierarchy && this._elem.hierarchy.length) {
      var i;
      var len = this._elem.hierarchy.length;
      for (i = 0; i < len; i += 1) {
        this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(matrix);
      }
    }
    return matrix.applyToPointArray(arr[0], arr[1], arr[2] || 0);
  }

  function invertPoint(matrix, arr) {
    if (this._elem.hierarchy && this._elem.hierarchy.length) {
      var i;
      var len = this._elem.hierarchy.length;
      for (i = 0; i < len; i += 1) {
        this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(matrix);
      }
    }
    return matrix.inversePoint(arr);
  }

  function fromComp(arr) {
    var toWorldMat = new Matrix();
    toWorldMat.reset();
    this._elem.finalTransform.mProp.applyToMatrix(toWorldMat);
    if (this._elem.hierarchy && this._elem.hierarchy.length) {
      var i;
      var len = this._elem.hierarchy.length;
      for (i = 0; i < len; i += 1) {
        this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(toWorldMat);
      }
      return toWorldMat.inversePoint(arr);
    }
    return toWorldMat.inversePoint(arr);
  }

  function sampleImage() {
    return [1, 1, 1, 1];
  }

  return function (elem) {
    var transformInterface;

    function _registerMaskInterface(maskManager) {
      _thisLayerFunction.mask = new MaskManagerInterface(maskManager, elem);
    }
    function _registerEffectsInterface(effects) {
      _thisLayerFunction.effect = effects;
    }

    function _thisLayerFunction(name) {
      switch (name) {
        case 'ADBE Root Vectors Group':
        case 'Contents':
        case 2:
          return _thisLayerFunction.shapeInterface;
        case 1:
        case 6:
        case 'Transform':
        case 'transform':
        case 'ADBE Transform Group':
          return transformInterface;
        case 4:
        case 'ADBE Effect Parade':
        case 'effects':
        case 'Effects':
          return _thisLayerFunction.effect;
        case 'ADBE Text Properties':
          return _thisLayerFunction.textInterface;
        default:
          return null;
      }
    }
    _thisLayerFunction.getMatrix = getMatrix;
    _thisLayerFunction.invertPoint = invertPoint;
    _thisLayerFunction.applyPoint = applyPoint;
    _thisLayerFunction.toWorld = toWorld;
    _thisLayerFunction.toWorldVec = toWorldVec;
    _thisLayerFunction.fromWorld = fromWorld;
    _thisLayerFunction.fromWorldVec = fromWorldVec;
    _thisLayerFunction.toComp = toWorld;
    _thisLayerFunction.fromComp = fromComp;
    _thisLayerFunction.sampleImage = sampleImage;
    _thisLayerFunction.sourceRectAtTime = elem.sourceRectAtTime.bind(elem);
    _thisLayerFunction._elem = elem;
    transformInterface = TransformExpressionInterface(elem.finalTransform.mProp);
    var anchorPointDescriptor = getDescriptor(transformInterface, 'anchorPoint');
    Object.defineProperties(_thisLayerFunction, {
      hasParent: {
        get: function () {
          return elem.hierarchy.length;
        },
      },
      parent: {
        get: function () {
          return elem.hierarchy[0].layerInterface;
        },
      },
      rotation: getDescriptor(transformInterface, 'rotation'),
      scale: getDescriptor(transformInterface, 'scale'),
      position: getDescriptor(transformInterface, 'position'),
      opacity: getDescriptor(transformInterface, 'opacity'),
      anchorPoint: anchorPointDescriptor,
      anchor_point: anchorPointDescriptor,
      transform: {
        get: function () {
          return transformInterface;
        },
      },
      active: {
        get: function () {
          return elem.isInRange;
        },
      },
    });

    _thisLayerFunction.startTime = elem.data.st;
    _thisLayerFunction.index = elem.data.ind;
    _thisLayerFunction.source = elem.data.refId;
    _thisLayerFunction.height = elem.data.ty === 0 ? elem.data.h : 100;
    _thisLayerFunction.width = elem.data.ty === 0 ? elem.data.w : 100;
    _thisLayerFunction.inPoint = elem.data.ip / elem.comp.globalData.frameRate;
    _thisLayerFunction.outPoint = elem.data.op / elem.comp.globalData.frameRate;
    _thisLayerFunction._name = elem.data.nm;

    _thisLayerFunction.registerMaskInterface = _registerMaskInterface;
    _thisLayerFunction.registerEffectsInterface = _registerEffectsInterface;
    return _thisLayerFunction;
  };
}());

/* global */
/* exported FootageInterface */

var FootageInterface = (function () {
  var outlineInterfaceFactory = (function (elem) {
    var currentPropertyName = '';
    var currentProperty = elem.getFootageData();
    function init() {
      currentPropertyName = '';
      currentProperty = elem.getFootageData();
      return searchProperty;
    }
    function searchProperty(value) {
      if (currentProperty[value]) {
        currentPropertyName = value;
        currentProperty = currentProperty[value];
        if (typeof currentProperty === 'object') {
          return searchProperty;
        }
        return currentProperty;
      }
      var propertyNameIndex = value.indexOf(currentPropertyName);
      if (propertyNameIndex !== -1) {
        var index = parseInt(value.substr(propertyNameIndex + currentPropertyName.length), 10);
        currentProperty = currentProperty[index];
        if (typeof currentProperty === 'object') {
          return searchProperty;
        }
        return currentProperty;
      }
      return '';
    }
    return init;
  });

  var dataInterfaceFactory = function (elem) {
    function interfaceFunction(value) {
      if (value === 'Outline') {
        return interfaceFunction.outlineInterface();
      }
      return null;
    }

    interfaceFunction._name = 'Outline';
    interfaceFunction.outlineInterface = outlineInterfaceFactory(elem);
    return interfaceFunction;
  };

  return function (elem) {
    function _interfaceFunction(value) {
      if (value === 'Data') {
        return _interfaceFunction.dataInterface;
      }
      return null;
    }

    _interfaceFunction._name = 'Data';
    _interfaceFunction.dataInterface = dataInterfaceFactory(elem);
    return _interfaceFunction;
  };
}());

/* exported CompExpressionInterface */

var CompExpressionInterface = (function () {
  return function (comp) {
    function _thisLayerFunction(name) {
      var i = 0;
      var len = comp.layers.length;
      while (i < len) {
        if (comp.layers[i].nm === name || comp.layers[i].ind === name) {
          return comp.elements[i].layerInterface;
        }
        i += 1;
      }
      return null;
      // return {active:false};
    }
    Object.defineProperty(_thisLayerFunction, '_name', { value: comp.data.nm });
    _thisLayerFunction.layer = _thisLayerFunction;
    _thisLayerFunction.pixelAspect = 1;
    _thisLayerFunction.height = comp.data.h || comp.globalData.compSize.h;
    _thisLayerFunction.width = comp.data.w || comp.globalData.compSize.w;
    _thisLayerFunction.pixelAspect = 1;
    _thisLayerFunction.frameDuration = 1 / comp.globalData.frameRate;
    _thisLayerFunction.displayStartTime = 0;
    _thisLayerFunction.numLayers = comp.layers.length;
    return _thisLayerFunction;
  };
}());

/* global ExpressionPropertyInterface */
/* exported TransformExpressionInterface */

var TransformExpressionInterface = (function () {
  return function (transform) {
    function _thisFunction(name) {
      switch (name) {
        case 'scale':
        case 'Scale':
        case 'ADBE Scale':
        case 6:
          return _thisFunction.scale;
        case 'rotation':
        case 'Rotation':
        case 'ADBE Rotation':
        case 'ADBE Rotate Z':
        case 10:
          return _thisFunction.rotation;
        case 'ADBE Rotate X':
          return _thisFunction.xRotation;
        case 'ADBE Rotate Y':
          return _thisFunction.yRotation;
        case 'position':
        case 'Position':
        case 'ADBE Position':
        case 2:
          return _thisFunction.position;
        case 'ADBE Position_0':
          return _thisFunction.xPosition;
        case 'ADBE Position_1':
          return _thisFunction.yPosition;
        case 'ADBE Position_2':
          return _thisFunction.zPosition;
        case 'anchorPoint':
        case 'AnchorPoint':
        case 'Anchor Point':
        case 'ADBE AnchorPoint':
        case 1:
          return _thisFunction.anchorPoint;
        case 'opacity':
        case 'Opacity':
        case 11:
          return _thisFunction.opacity;
        default:
          return null;
      }
    }
    Object.defineProperty(_thisFunction, 'rotation', {
      get: ExpressionPropertyInterface(transform.r || transform.rz),
    });

    Object.defineProperty(_thisFunction, 'zRotation', {
      get: ExpressionPropertyInterface(transform.rz || transform.r),
    });

    Object.defineProperty(_thisFunction, 'xRotation', {
      get: ExpressionPropertyInterface(transform.rx),
    });

    Object.defineProperty(_thisFunction, 'yRotation', {
      get: ExpressionPropertyInterface(transform.ry),
    });
    Object.defineProperty(_thisFunction, 'scale', {
      get: ExpressionPropertyInterface(transform.s),
    });
    var _px;
    var _py;
    var _pz;
    var _transformFactory;
    if (transform.p) {
      _transformFactory = ExpressionPropertyInterface(transform.p);
    } else {
      _px = ExpressionPropertyInterface(transform.px);
      _py = ExpressionPropertyInterface(transform.py);
      if (transform.pz) {
        _pz = ExpressionPropertyInterface(transform.pz);
      }
    }
    Object.defineProperty(_thisFunction, 'position', {
      get: function () {
        if (transform.p) {
          return _transformFactory();
        }
        return [
          _px(),
          _py(),
          _pz ? _pz() : 0];
      },
    });

    Object.defineProperty(_thisFunction, 'xPosition', {
      get: ExpressionPropertyInterface(transform.px),
    });

    Object.defineProperty(_thisFunction, 'yPosition', {
      get: ExpressionPropertyInterface(transform.py),
    });

    Object.defineProperty(_thisFunction, 'zPosition', {
      get: ExpressionPropertyInterface(transform.pz),
    });

    Object.defineProperty(_thisFunction, 'anchorPoint', {
      get: ExpressionPropertyInterface(transform.a),
    });

    Object.defineProperty(_thisFunction, 'opacity', {
      get: ExpressionPropertyInterface(transform.o),
    });

    Object.defineProperty(_thisFunction, 'skew', {
      get: ExpressionPropertyInterface(transform.sk),
    });

    Object.defineProperty(_thisFunction, 'skewAxis', {
      get: ExpressionPropertyInterface(transform.sa),
    });

    Object.defineProperty(_thisFunction, 'orientation', {
      get: ExpressionPropertyInterface(transform.or),
    });

    return _thisFunction;
  };
}());

/* exported ProjectInterface */

var ProjectInterface = (function () {
  function registerComposition(comp) {
    this.compositions.push(comp);
  }

  return function () {
    function _thisProjectFunction(name) {
      var i = 0;
      var len = this.compositions.length;
      while (i < len) {
        if (this.compositions[i].data && this.compositions[i].data.nm === name) {
          if (this.compositions[i].prepareFrame && this.compositions[i].data.xt) {
            this.compositions[i].prepareFrame(this.currentFrame);
          }
          return this.compositions[i].compInterface;
        }
        i += 1;
      }
      return null;
    }

    _thisProjectFunction.compositions = [];
    _thisProjectFunction.currentFrame = 0;

    _thisProjectFunction.registerComposition = registerComposition;

    return _thisProjectFunction;
  };
}());

/* global propertyGroupFactory, ExpressionPropertyInterface, PropertyInterface */
/* exported EffectsExpressionInterface */

var EffectsExpressionInterface = (function () {
  var ob = {
    createEffectsInterface: createEffectsInterface,
  };

  function createEffectsInterface(elem, propertyGroup) {
    if (elem.effectsManager) {
      var effectElements = [];
      var effectsData = elem.data.ef;
      var i;
      var len = elem.effectsManager.effectElements.length;
      for (i = 0; i < len; i += 1) {
        effectElements.push(createGroupInterface(effectsData[i], elem.effectsManager.effectElements[i], propertyGroup, elem));
      }

      var effects = elem.data.ef || [];
      var groupInterface = function (name) {
        i = 0;
        len = effects.length;
        while (i < len) {
          if (name === effects[i].nm || name === effects[i].mn || name === effects[i].ix) {
            return effectElements[i];
          }
          i += 1;
        }
        return null;
      };
      Object.defineProperty(groupInterface, 'numProperties', {
        get: function () {
          return effects.length;
        },
      });
      return groupInterface;
    }
    return null;
  }

  function createGroupInterface(data, elements, propertyGroup, elem) {
    function groupInterface(name) {
      var effects = data.ef;
      var i = 0;
      var len = effects.length;
      while (i < len) {
        if (name === effects[i].nm || name === effects[i].mn || name === effects[i].ix) {
          if (effects[i].ty === 5) {
            return effectElements[i];
          }
          return effectElements[i]();
        }
        i += 1;
      }
      throw new Error();
    }
    var _propertyGroup = propertyGroupFactory(groupInterface, propertyGroup);

    var effectElements = [];
    var i;
    var len = data.ef.length;
    for (i = 0; i < len; i += 1) {
      if (data.ef[i].ty === 5) {
        effectElements.push(createGroupInterface(data.ef[i], elements.effectElements[i], elements.effectElements[i].propertyGroup, elem));
      } else {
        effectElements.push(createValueInterface(elements.effectElements[i], data.ef[i].ty, elem, _propertyGroup));
      }
    }

    if (data.mn === 'ADBE Color Control') {
      Object.defineProperty(groupInterface, 'color', {
        get: function () {
          return effectElements[0]();
        },
      });
    }
    Object.defineProperties(groupInterface, {
      numProperties: {
        get: function () {
          return data.np;
        },
      },
      _name: { value: data.nm },
      propertyGroup: { value: _propertyGroup },
    });
    groupInterface.enabled = data.en !== 0;
    groupInterface.active = groupInterface.enabled;
    return groupInterface;
  }

  function createValueInterface(element, type, elem, propertyGroup) {
    var expressionProperty = ExpressionPropertyInterface(element.p);
    function interfaceFunction() {
      if (type === 10) {
        return elem.comp.compInterface(element.p.v);
      }
      return expressionProperty();
    }

    if (element.p.setGroupProperty) {
      element.p.setGroupProperty(PropertyInterface('', propertyGroup));
    }

    return interfaceFunction;
  }

  return ob;
}());

/* global createSizedArray */
/* exported MaskManagerInterface */

var MaskManagerInterface = (function () {
  function MaskInterface(mask, data) {
    this._mask = mask;
    this._data = data;
  }
  Object.defineProperty(MaskInterface.prototype, 'maskPath', {
    get: function () {
      if (this._mask.prop.k) {
        this._mask.prop.getValue();
      }
      return this._mask.prop;
    },
  });
  Object.defineProperty(MaskInterface.prototype, 'maskOpacity', {
    get: function () {
      if (this._mask.op.k) {
        this._mask.op.getValue();
      }
      return this._mask.op.v * 100;
    },
  });

  var MaskManager = function (maskManager) {
    var _masksInterfaces = createSizedArray(maskManager.viewData.length);
    var i;
    var len = maskManager.viewData.length;
    for (i = 0; i < len; i += 1) {
      _masksInterfaces[i] = new MaskInterface(maskManager.viewData[i], maskManager.masksProperties[i]);
    }

    var maskFunction = function (name) {
      i = 0;
      while (i < len) {
        if (maskManager.masksProperties[i].nm === name) {
          return _masksInterfaces[i];
        }
        i += 1;
      }
      return null;
    };
    return maskFunction;
  };
  return MaskManager;
}());

/* global createTypedArray */
/* exported ExpressionPropertyInterface */

var ExpressionPropertyInterface = (function () {
  var defaultUnidimensionalValue = { pv: 0, v: 0, mult: 1 };
  var defaultMultidimensionalValue = { pv: [0, 0, 0], v: [0, 0, 0], mult: 1 };

  function completeProperty(expressionValue, property, type) {
    Object.defineProperty(expressionValue, 'velocity', {
      get: function () {
        return property.getVelocityAtTime(property.comp.currentFrame);
      },
    });
    expressionValue.numKeys = property.keyframes ? property.keyframes.length : 0;
    expressionValue.key = function (pos) {
      if (!expressionValue.numKeys) {
        return 0;
      }
      var value = '';
      if ('s' in property.keyframes[pos - 1]) {
        value = property.keyframes[pos - 1].s;
      } else if ('e' in property.keyframes[pos - 2]) {
        value = property.keyframes[pos - 2].e;
      } else {
        value = property.keyframes[pos - 2].s;
      }
      var valueProp = type === 'unidimensional' ? new Number(value) : Object.assign({}, value); // eslint-disable-line no-new-wrappers
      valueProp.time = property.keyframes[pos - 1].t / property.elem.comp.globalData.frameRate;
      valueProp.value = type === 'unidimensional' ? value[0] : value;
      return valueProp;
    };
    expressionValue.valueAtTime = property.getValueAtTime;
    expressionValue.speedAtTime = property.getSpeedAtTime;
    expressionValue.velocityAtTime = property.getVelocityAtTime;
    expressionValue.propertyGroup = property.propertyGroup;
  }

  function UnidimensionalPropertyInterface(property) {
    if (!property || !('pv' in property)) {
      property = defaultUnidimensionalValue;
    }
    var mult = 1 / property.mult;
    var val = property.pv * mult;
    var expressionValue = new Number(val); // eslint-disable-line no-new-wrappers
    expressionValue.value = val;
    completeProperty(expressionValue, property, 'unidimensional');

    return function () {
      if (property.k) {
        property.getValue();
      }
      val = property.v * mult;
      if (expressionValue.value !== val) {
        expressionValue = new Number(val); // eslint-disable-line no-new-wrappers
        expressionValue.value = val;
        completeProperty(expressionValue, property, 'unidimensional');
      }
      return expressionValue;
    };
  }

  function MultidimensionalPropertyInterface(property) {
    if (!property || !('pv' in property)) {
      property = defaultMultidimensionalValue;
    }
    var mult = 1 / property.mult;
    var len = (property.data && property.data.l) || property.pv.length;
    var expressionValue = createTypedArray('float32', len);
    var arrValue = createTypedArray('float32', len);
    expressionValue.value = arrValue;
    completeProperty(expressionValue, property, 'multidimensional');

    return function () {
      if (property.k) {
        property.getValue();
      }
      for (var i = 0; i < len; i += 1) {
        arrValue[i] = property.v[i] * mult;
        expressionValue[i] = arrValue[i];
      }
      return expressionValue;
    };
  }

  // TODO: try to avoid using this getter
  function defaultGetter() {
    return defaultUnidimensionalValue;
  }

  return function (property) {
    if (!property) {
      return defaultGetter;
    } if (property.propType === 'unidimensional') {
      return UnidimensionalPropertyInterface(property);
    }
    return MultidimensionalPropertyInterface(property);
  };
}());

/* global expressionHelpers, TextSelectorProp, ExpressionManager */
/* exported TextExpressionSelectorPropFactory */

var TextExpressionSelectorPropFactory = (function () { // eslint-disable-line no-unused-vars
  function getValueProxy(index, total) {
    this.textIndex = index + 1;
    this.textTotal = total;
    this.v = this.getValue() * this.mult;
    return this.v;
  }

  return function (elem, data) {
    this.pv = 1;
    this.comp = elem.comp;
    this.elem = elem;
    this.mult = 0.01;
    this.propType = 'textSelector';
    this.textTotal = data.totalChars;
    this.selectorValue = 100;
    this.lastValue = [1, 1, 1];
    this.k = true;
    this.x = true;
    this.getValue = ExpressionManager.initiateExpression.bind(this)(elem, data, this);
    this.getMult = getValueProxy;
    this.getVelocityAtTime = expressionHelpers.getVelocityAtTime;
    if (this.kf) {
      this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this);
    } else {
      this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this);
    }
    this.setGroupProperty = expressionHelpers.setGroupProperty;
  };
}());

var propertyGetTextProp = TextSelectorProp.getTextSelectorProp;
TextSelectorProp.getTextSelectorProp = function (elem, data, arr) {
  if (data.t === 1) {
    return new TextExpressionSelectorPropFactory(elem, data, arr); // eslint-disable-line no-undef
  }
  return propertyGetTextProp(elem, data, arr);
};

/* global PropertyFactory */
/* exported SliderEffect, AngleEffect, ColorEffect, PointEffect, LayerIndexEffect, MaskIndexEffect, CheckboxEffect, NoValueEffect */

function SliderEffect(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 0, 0, container);
}
function AngleEffect(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 0, 0, container);
}
function ColorEffect(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 1, 0, container);
}
function PointEffect(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 1, 0, container);
}
function LayerIndexEffect(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 0, 0, container);
}
function MaskIndexEffect(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 0, 0, container);
}
function CheckboxEffect(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 0, 0, container);
}
function NoValueEffect() {
  this.p = {};
}

/* global extendPrototype, SliderEffect, AngleEffect, ColorEffect, PointEffect, CheckboxEffect, LayerIndexEffect,
MaskIndexEffect, NoValueEffect, DynamicPropertyContainer */

function EffectsManager(data, element) {
  var effects = data.ef || [];
  this.effectElements = [];
  var i;
  var len = effects.length;
  var effectItem;
  for (i = 0; i < len; i += 1) {
    effectItem = new GroupEffect(effects[i], element);
    this.effectElements.push(effectItem);
  }
}

function GroupEffect(data, element) {
  this.init(data, element);
}

extendPrototype([DynamicPropertyContainer], GroupEffect);

GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties;

GroupEffect.prototype.init = function (data, element) {
  this.data = data;
  this.effectElements = [];
  this.initDynamicPropertyContainer(element);
  var i;
  var len = this.data.ef.length;
  var eff;
  var effects = this.data.ef;
  for (i = 0; i < len; i += 1) {
    eff = null;
    switch (effects[i].ty) {
      case 0:
        eff = new SliderEffect(effects[i], element, this);
        break;
      case 1:
        eff = new AngleEffect(effects[i], element, this);
        break;
      case 2:
        eff = new ColorEffect(effects[i], element, this);
        break;
      case 3:
        eff = new PointEffect(effects[i], element, this);
        break;
      case 4:
      case 7:
        eff = new CheckboxEffect(effects[i], element, this);
        break;
      case 10:
        eff = new LayerIndexEffect(effects[i], element, this);
        break;
      case 11:
        eff = new MaskIndexEffect(effects[i], element, this);
        break;
      case 5:
        eff = new EffectsManager(effects[i], element, this);
        break;
        // case 6:
      default:
        eff = new NoValueEffect(effects[i], element, this);
        break;
    }
    if (eff) {
      this.effectElements.push(eff);
    }
  }
};


var lottie = {};

function setLocationHref(href) {
  locationHref = href;
}

function searchAnimations() {
  if (standalone === true) {
    animationManager.searchAnimations(animationData, standalone, renderer);
  } else {
    animationManager.searchAnimations();
  }
}

function setSubframeRendering(flag) {
  subframeEnabled = flag;
}

function setIDPrefix(prefix) {
  idPrefix = prefix;
}

function loadAnimation(params) {
  if (standalone === true) {
    params.animationData = JSON.parse(animationData);
  }
  return animationManager.loadAnimation(params);
}

function setQuality(value) {
  if (typeof value === 'string') {
    switch (value) {
      case 'high':
        defaultCurveSegments = 200;
        break;
      default:
      case 'medium':
        defaultCurveSegments = 50;
        break;
      case 'low':
        defaultCurveSegments = 10;
        break;
    }
  } else if (!isNaN(value) && value > 1) {
    defaultCurveSegments = value;
  }
  if (defaultCurveSegments >= 50) {
    roundValues(false);
  } else {
    roundValues(true);
  }
}

function inBrowser() {
  return typeof navigator !== 'undefined';
}

function installPlugin(type, plugin) {
  if (type === 'expressions') {
    expressionsPlugin = plugin;
  }
}

function getFactory(name) {
  switch (name) {
    case 'propertyFactory':
      return PropertyFactory;
    case 'shapePropertyFactory':
      return ShapePropertyFactory;
    case 'matrix':
      return Matrix;
    default:
      return null;
  }
}

lottie.play = animationManager.play;
lottie.pause = animationManager.pause;
lottie.setLocationHref = setLocationHref;
lottie.togglePause = animationManager.togglePause;
lottie.setSpeed = animationManager.setSpeed;
lottie.setDirection = animationManager.setDirection;
lottie.stop = animationManager.stop;
lottie.searchAnimations = searchAnimations;
lottie.registerAnimation = animationManager.registerAnimation;
lottie.loadAnimation = loadAnimation;
lottie.setSubframeRendering = setSubframeRendering;
lottie.resize = animationManager.resize;
// lottie.start = start;
lottie.goToAndStop = animationManager.goToAndStop;
lottie.destroy = animationManager.destroy;
lottie.setQuality = setQuality;
lottie.inBrowser = inBrowser;
lottie.installPlugin = installPlugin;
lottie.freeze = animationManager.freeze;
lottie.unfreeze = animationManager.unfreeze;
lottie.setVolume = animationManager.setVolume;
lottie.mute = animationManager.mute;
lottie.unmute = animationManager.unmute;
lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations;
lottie.useWebWorker = function (flag) {
  _useWebWorker = flag;
};
lottie.setIDPrefix = setIDPrefix;
lottie.__getFactory = getFactory;
lottie.version = '5.8.1';

function checkReady() {
  if (document.readyState === 'complete') {
    clearInterval(readyStateCheckInterval);
    searchAnimations();
  }
}

function getQueryVariable(variable) {
  var vars = queryString.split('&');
  for (var i = 0; i < vars.length; i += 1) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) { // eslint-disable-line eqeqeq
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
}
var standalone = '__[STANDALONE]__';
var animationData = '__[ANIMATIONDATA]__';
var renderer = '';
var queryString;
if (standalone) {
  var scripts = document.getElementsByTagName('script');
  var index = scripts.length - 1;
  var myScript = scripts[index] || {
    src: '',
  };
  queryString = myScript.src.replace(/^[^\?]+\??/, ''); // eslint-disable-line no-useless-escape
  renderer = getQueryVariable('renderer');
}
var readyStateCheckInterval = setInterval(checkReady, 100);

return lottie;
}));

/***/ }),

/***/ 11691:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "E": () => (/* binding */ motion)
});

// UNUSED EXPORTS: createDomMotionComponent

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(70655);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/features/definitions.mjs
var createDefinition = function (propNames) { return ({
    isEnabled: function (props) { return propNames.some(function (name) { return !!props[name]; }); },
}); };
var featureDefinitions = {
    measureLayout: createDefinition(["layout", "layoutId", "drag"]),
    animation: createDefinition([
        "animate",
        "exit",
        "variants",
        "whileHover",
        "whileTap",
        "whileFocus",
        "whileDrag",
        "whileInView",
    ]),
    exit: createDefinition(["exit"]),
    drag: createDefinition(["drag", "dragControls"]),
    focus: createDefinition(["whileFocus"]),
    hover: createDefinition(["whileHover", "onHoverStart", "onHoverEnd"]),
    tap: createDefinition(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
    pan: createDefinition([
        "onPan",
        "onPanStart",
        "onPanSessionStart",
        "onPanEnd",
    ]),
    inView: createDefinition([
        "whileInView",
        "onViewportEnter",
        "onViewportLeave",
    ]),
};
function loadFeatures(features) {
    for (var key in features) {
        if (features[key] === null)
            continue;
        if (key === "projectionNodeConstructor") {
            featureDefinitions.projectionNodeConstructor = features[key];
        }
        else {
            featureDefinitions[key].Component = features[key];
        }
    }
}



// EXTERNAL MODULE: ./node_modules/hey-listen/dist/index.js
var dist = __webpack_require__(91320);
;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/context/LazyContext.mjs


var LazyContext = (0,react.createContext)({ strict: false });



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/features/use-features.mjs







var featureNames = Object.keys(featureDefinitions);
var numFeatures = featureNames.length;
/**
 * Load features via renderless components based on the provided MotionProps.
 */
function useFeatures(props, visualElement, preloadedFeatures) {
    var features = [];
    var lazyContext = (0,react.useContext)(LazyContext);
    if (!visualElement)
        return null;
    /**
     * If we're in development mode, check to make sure we're not rendering a motion component
     * as a child of LazyMotion, as this will break the file-size benefits of using it.
     */
    if (false) {}
    for (var i = 0; i < numFeatures; i++) {
        var name_1 = featureNames[i];
        var _a = featureDefinitions[name_1], isEnabled = _a.isEnabled, Component = _a.Component;
        /**
         * It might be possible in the future to use this moment to
         * dynamically request functionality. In initial tests this
         * was producing a lot of duplication amongst bundles.
         */
        if (isEnabled(props) && Component) {
            features.push(react.createElement(Component, (0,tslib_es6.__assign)({ key: name_1 }, props, { visualElement: visualElement })));
        }
    }
    return features;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs


/**
 * @public
 */
var MotionConfigContext = (0,react.createContext)({
    transformPagePoint: function (p) { return p; },
    isStatic: false,
});



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/context/MotionContext/index.mjs


var MotionContext = (0,react.createContext)({});
function useVisualElementContext() {
    return (0,react.useContext)(MotionContext).visualElement;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/context/PresenceContext.mjs


/**
 * @public
 */
var PresenceContext_PresenceContext = (0,react.createContext)(null);



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/is-browser.mjs
var isBrowser = typeof window !== "undefined";



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs



var useIsomorphicLayoutEffect = isBrowser ? react.useLayoutEffect : react.useEffect;



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs






function useVisualElement(Component, visualState, props, createVisualElement) {
    var lazyContext = (0,react.useContext)(LazyContext);
    var parent = useVisualElementContext();
    var presenceContext = (0,react.useContext)(PresenceContext_PresenceContext);
    var visualElementRef = (0,react.useRef)(undefined);
    /**
     * If we haven't preloaded a renderer, check to see if we have one lazy-loaded
     */
    if (!createVisualElement)
        createVisualElement = lazyContext.renderer;
    if (!visualElementRef.current && createVisualElement) {
        visualElementRef.current = createVisualElement(Component, {
            visualState: visualState,
            parent: parent,
            props: props,
            presenceId: presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id,
            blockInitialAnimation: (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false,
        });
    }
    var visualElement = visualElementRef.current;
    useIsomorphicLayoutEffect(function () {
        visualElement === null || visualElement === void 0 ? void 0 : visualElement.syncRender();
    });
    (0,react.useEffect)(function () {
        var _a;
        (_a = visualElement === null || visualElement === void 0 ? void 0 : visualElement.animationState) === null || _a === void 0 ? void 0 : _a.animateChanges();
    });
    useIsomorphicLayoutEffect(function () { return function () { return visualElement === null || visualElement === void 0 ? void 0 : visualElement.notifyUnmount(); }; }, []);
    return visualElement;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
function isRefObject(ref) {
    return (typeof ref === "object" &&
        Object.prototype.hasOwnProperty.call(ref, "current"));
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs



/**
 * Creates a ref function that, when called, hydrates the provided
 * external ref and VisualElement.
 */
function useMotionRef(visualState, visualElement, externalRef) {
    return (0,react.useCallback)(function (instance) {
        var _a;
        instance && ((_a = visualState.mount) === null || _a === void 0 ? void 0 : _a.call(visualState, instance));
        if (visualElement) {
            instance
                ? visualElement.mount(instance)
                : visualElement.unmount();
        }
        if (externalRef) {
            if (typeof externalRef === "function") {
                externalRef(instance);
            }
            else if (isRefObject(externalRef)) {
                externalRef.current = instance;
            }
        }
    }, 
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [visualElement]);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/utils/variants.mjs
/**
 * Decides if the supplied variable is an array of variant labels
 */
function isVariantLabels(v) {
    return Array.isArray(v);
}
/**
 * Decides if the supplied variable is variant label
 */
function isVariantLabel(v) {
    return typeof v === "string" || isVariantLabels(v);
}
/**
 * Creates an object containing the latest state of every MotionValue on a VisualElement
 */
function getCurrent(visualElement) {
    var current = {};
    visualElement.forEachValue(function (value, key) { return (current[key] = value.get()); });
    return current;
}
/**
 * Creates an object containing the latest velocity of every MotionValue on a VisualElement
 */
function getVelocity(visualElement) {
    var velocity = {};
    visualElement.forEachValue(function (value, key) { return (velocity[key] = value.getVelocity()); });
    return velocity;
}
function resolveVariantFromProps(props, definition, custom, currentValues, currentVelocity) {
    var _a;
    if (currentValues === void 0) { currentValues = {}; }
    if (currentVelocity === void 0) { currentVelocity = {}; }
    /**
     * If the variant definition is a function, resolve.
     */
    if (typeof definition === "function") {
        definition = definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
    }
    /**
     * If the variant definition is a variant label, or
     * the function returned a variant label, resolve.
     */
    if (typeof definition === "string") {
        definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
    }
    /**
     * At this point we've resolved both functions and variant labels,
     * but the resolved variant label might itself have been a function.
     * If so, resolve. This can only have returned a valid target object.
     */
    if (typeof definition === "function") {
        definition = definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
    }
    return definition;
}
function resolveVariant(visualElement, definition, custom) {
    var props = visualElement.getProps();
    return resolveVariantFromProps(props, definition, custom !== null && custom !== void 0 ? custom : props.custom, getCurrent(visualElement), getVelocity(visualElement));
}
function checkIfControllingVariants(props) {
    var _a;
    return (typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" ||
        isVariantLabel(props.initial) ||
        isVariantLabel(props.animate) ||
        isVariantLabel(props.whileHover) ||
        isVariantLabel(props.whileDrag) ||
        isVariantLabel(props.whileTap) ||
        isVariantLabel(props.whileFocus) ||
        isVariantLabel(props.exit));
}
function checkIfVariantNode(props) {
    return Boolean(checkIfControllingVariants(props) || props.variants);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs


function getCurrentTreeVariants(props, context) {
    if (checkIfControllingVariants(props)) {
        var initial = props.initial, animate = props.animate;
        return {
            initial: initial === false || isVariantLabel(initial)
                ? initial
                : undefined,
            animate: isVariantLabel(animate) ? animate : undefined,
        };
    }
    return props.inherit !== false ? context : {};
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/context/MotionContext/create.mjs




function useCreateMotionContext(props) {
    var _a = getCurrentTreeVariants(props, (0,react.useContext)(MotionContext)), initial = _a.initial, animate = _a.animate;
    return (0,react.useMemo)(function () { return ({ initial: initial, animate: animate }); }, [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
    return Array.isArray(prop) ? prop.join(" ") : prop;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/use-constant.mjs


/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */
function useConstant(init) {
    var ref = (0,react.useRef)(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/node_modules/framesync/dist/es/on-next-frame.mjs
const defaultTimestep = (1 / 60) * 1000;
const getCurrentTime = typeof performance !== "undefined"
    ? () => performance.now()
    : () => Date.now();
const onNextFrame = typeof window !== "undefined"
    ? (callback) => window.requestAnimationFrame(callback)
    : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);



;// CONCATENATED MODULE: ./node_modules/framer-motion/node_modules/framesync/dist/es/create-render-step.mjs
function createRenderStep(runNextFrame) {
    let toRun = [];
    let toRunNextFrame = [];
    let numToRun = 0;
    let isProcessing = false;
    let flushNextFrame = false;
    const toKeepAlive = new WeakSet();
    const step = {
        schedule: (callback, keepAlive = false, immediate = false) => {
            const addToCurrentFrame = immediate && isProcessing;
            const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
            if (keepAlive)
                toKeepAlive.add(callback);
            if (buffer.indexOf(callback) === -1) {
                buffer.push(callback);
                if (addToCurrentFrame && isProcessing)
                    numToRun = toRun.length;
            }
            return callback;
        },
        cancel: (callback) => {
            const index = toRunNextFrame.indexOf(callback);
            if (index !== -1)
                toRunNextFrame.splice(index, 1);
            toKeepAlive.delete(callback);
        },
        process: (frameData) => {
            if (isProcessing) {
                flushNextFrame = true;
                return;
            }
            isProcessing = true;
            [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
            toRunNextFrame.length = 0;
            numToRun = toRun.length;
            if (numToRun) {
                for (let i = 0; i < numToRun; i++) {
                    const callback = toRun[i];
                    callback(frameData);
                    if (toKeepAlive.has(callback)) {
                        step.schedule(callback);
                        runNextFrame();
                    }
                }
            }
            isProcessing = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        },
    };
    return step;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/node_modules/framesync/dist/es/index.mjs



const maxElapsed = 40;
let useDefaultElapsed = true;
let runNextFrame = false;
let isProcessing = false;
const es_frame = {
    delta: 0,
    timestamp: 0,
};
const stepsOrder = [
    "read",
    "update",
    "preRender",
    "render",
    "postRender",
];
const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(() => (runNextFrame = true));
    return acc;
}, {});
const sync = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process, keepAlive = false, immediate = false) => {
        if (!runNextFrame)
            startLoop();
        return step.schedule(process, keepAlive, immediate);
    };
    return acc;
}, {});
const cancelSync = stepsOrder.reduce((acc, key) => {
    acc[key] = steps[key].cancel;
    return acc;
}, {});
const flushSync = stepsOrder.reduce((acc, key) => {
    acc[key] = () => steps[key].process(es_frame);
    return acc;
}, {});
const processStep = (stepId) => steps[stepId].process(es_frame);
const processFrame = (timestamp) => {
    runNextFrame = false;
    es_frame.delta = useDefaultElapsed
        ? defaultTimestep
        : Math.max(Math.min(timestamp - es_frame.timestamp, maxElapsed), 1);
    es_frame.timestamp = timestamp;
    isProcessing = true;
    stepsOrder.forEach(processStep);
    isProcessing = false;
    if (runNextFrame) {
        useDefaultElapsed = false;
        onNextFrame(processFrame);
    }
};
const startLoop = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!isProcessing)
        onNextFrame(processFrame);
};
const getFrameData = () => es_frame;

/* harmony default export */ const es = (sync);


;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/mix.mjs
const mix = (from, to, progress) => -progress * from + progress * to + from;



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/velocity-per-second.mjs
function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/array.mjs


function addUniqueItem(arr, item) {
    arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
    var index = arr.indexOf(item);
    index > -1 && arr.splice(index, 1);
}
// Adapted from array-move
function moveItem(_a, fromIndex, toIndex) {
    var _b = __read(_a), arr = _b.slice(0);
    var startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
    if (startIndex >= 0 && startIndex < arr.length) {
        var endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
        var _c = __read(arr.splice(fromIndex, 1), 1), item = _c[0];
        arr.splice(endIndex, 0, item);
    }
    return arr;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/subscription-manager.mjs


var SubscriptionManager = /** @class */ (function () {
    function SubscriptionManager() {
        this.subscriptions = [];
    }
    SubscriptionManager.prototype.add = function (handler) {
        var _this = this;
        addUniqueItem(this.subscriptions, handler);
        return function () { return removeItem(_this.subscriptions, handler); };
    };
    SubscriptionManager.prototype.notify = function (a, b, c) {
        var numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions)
            return;
        if (numSubscriptions === 1) {
            /**
             * If there's only a single handler we can just call it without invoking a loop.
             */
            this.subscriptions[0](a, b, c);
        }
        else {
            for (var i = 0; i < numSubscriptions; i++) {
                /**
                 * Check whether the handler exists before firing as it's possible
                 * the subscriptions were modified during this loop running.
                 */
                var handler = this.subscriptions[i];
                handler && handler(a, b, c);
            }
        }
    };
    SubscriptionManager.prototype.getSize = function () {
        return this.subscriptions.length;
    };
    SubscriptionManager.prototype.clear = function () {
        this.subscriptions.length = 0;
    };
    return SubscriptionManager;
}());



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/value/index.mjs




var isFloat = function (value) {
    return !isNaN(parseFloat(value));
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */
var MotionValue = /** @class */ (function () {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     *
     * @internal
     */
    function MotionValue(init) {
        var _this = this;
        /**
         * Duration, in milliseconds, since last updating frame.
         *
         * @internal
         */
        this.timeDelta = 0;
        /**
         * Timestamp of the last time this `MotionValue` was updated.
         *
         * @internal
         */
        this.lastUpdated = 0;
        /**
         * Functions to notify when the `MotionValue` updates.
         *
         * @internal
         */
        this.updateSubscribers = new SubscriptionManager();
        /**
         * Functions to notify when the velocity updates.
         *
         * @internal
         */
        this.velocityUpdateSubscribers = new SubscriptionManager();
        /**
         * Functions to notify when the `MotionValue` updates and `render` is set to `true`.
         *
         * @internal
         */
        this.renderSubscribers = new SubscriptionManager();
        /**
         * Tracks whether this value can output a velocity. Currently this is only true
         * if the value is numerical, but we might be able to widen the scope here and support
         * other value types.
         *
         * @internal
         */
        this.canTrackVelocity = false;
        this.updateAndNotify = function (v, render) {
            if (render === void 0) { render = true; }
            _this.prev = _this.current;
            _this.current = v;
            // Update timestamp
            var _a = getFrameData(), delta = _a.delta, timestamp = _a.timestamp;
            if (_this.lastUpdated !== timestamp) {
                _this.timeDelta = delta;
                _this.lastUpdated = timestamp;
                es.postRender(_this.scheduleVelocityCheck);
            }
            // Update update subscribers
            if (_this.prev !== _this.current) {
                _this.updateSubscribers.notify(_this.current);
            }
            // Update velocity subscribers
            if (_this.velocityUpdateSubscribers.getSize()) {
                _this.velocityUpdateSubscribers.notify(_this.getVelocity());
            }
            // Update render subscribers
            if (render) {
                _this.renderSubscribers.notify(_this.current);
            }
        };
        /**
         * Schedule a velocity check for the next frame.
         *
         * This is an instanced and bound function to prevent generating a new
         * function once per frame.
         *
         * @internal
         */
        this.scheduleVelocityCheck = function () { return es.postRender(_this.velocityCheck); };
        /**
         * Updates `prev` with `current` if the value hasn't been updated this frame.
         * This ensures velocity calculations return `0`.
         *
         * This is an instanced and bound function to prevent generating a new
         * function once per frame.
         *
         * @internal
         */
        this.velocityCheck = function (_a) {
            var timestamp = _a.timestamp;
            if (timestamp !== _this.lastUpdated) {
                _this.prev = _this.current;
                _this.velocityUpdateSubscribers.notify(_this.getVelocity());
            }
        };
        this.hasAnimated = false;
        this.prev = this.current = init;
        this.canTrackVelocity = isFloat(this.current);
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.onChange(updateOpacity)
     *     const unsubscribeY = y.onChange(updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @internalremarks
     *
     * We could look into a `useOnChange` hook if the above lifecycle management proves confusing.
     *
     * ```jsx
     * useOnChange(x, () => {})
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @public
     */
    MotionValue.prototype.onChange = function (subscription) {
        return this.updateSubscribers.add(subscription);
    };
    MotionValue.prototype.clearListeners = function () {
        this.updateSubscribers.clear();
    };
    /**
     * Adds a function that will be notified when the `MotionValue` requests a render.
     *
     * @param subscriber - A function that's provided the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @internal
     */
    MotionValue.prototype.onRenderRequest = function (subscription) {
        // Render immediately
        subscription(this.get());
        return this.renderSubscribers.add(subscription);
    };
    /**
     * Attaches a passive effect to the `MotionValue`.
     *
     * @internal
     */
    MotionValue.prototype.attach = function (passiveEffect) {
        this.passiveEffect = passiveEffect;
    };
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */
    MotionValue.prototype.set = function (v, render) {
        if (render === void 0) { render = true; }
        if (!render || !this.passiveEffect) {
            this.updateAndNotify(v, render);
        }
        else {
            this.passiveEffect(v, this.updateAndNotify);
        }
    };
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */
    MotionValue.prototype.get = function () {
        return this.current;
    };
    /**
     * @public
     */
    MotionValue.prototype.getPrevious = function () {
        return this.prev;
    };
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */
    MotionValue.prototype.getVelocity = function () {
        // This could be isFloat(this.prev) && isFloat(this.current), but that would be wasteful
        return this.canTrackVelocity
            ? // These casts could be avoided if parseFloat would be typed better
                velocityPerSecond(parseFloat(this.current) -
                    parseFloat(this.prev), this.timeDelta)
            : 0;
    };
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     *
     * @internal
     */
    MotionValue.prototype.start = function (animation) {
        var _this = this;
        this.stop();
        return new Promise(function (resolve) {
            _this.hasAnimated = true;
            _this.stopAnimation = animation(resolve);
        }).then(function () { return _this.clearAnimation(); });
    };
    /**
     * Stop the currently active animation.
     *
     * @public
     */
    MotionValue.prototype.stop = function () {
        if (this.stopAnimation)
            this.stopAnimation();
        this.clearAnimation();
    };
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */
    MotionValue.prototype.isAnimating = function () {
        return !!this.stopAnimation;
    };
    MotionValue.prototype.clearAnimation = function () {
        this.stopAnimation = null;
    };
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */
    MotionValue.prototype.destroy = function () {
        this.updateSubscribers.clear();
        this.renderSubscribers.clear();
        this.stop();
    };
    return MotionValue;
}());
/**
 * @internal
 */
function motionValue(init) {
    return new MotionValue(init);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs
var isMotionValue = function (value) {
    return Boolean(value !== null && typeof value === "object" && value.getVelocity);
};



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/clamp.mjs
const clamp = (min, max, v) => Math.min(Math.max(v, min), max);



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/animations/utils/find-spring.mjs



const safeMin = 0.001;
const minDuration = 0.01;
const maxDuration = 10.0;
const minDamping = 0.05;
const maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1, }) {
    let envelope;
    let derivative;
    (0,dist.warning)(duration <= maxDuration * 1000, "Spring duration must be 10 seconds or less");
    let dampingRatio = 1 - bounce;
    dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
    duration = clamp(minDuration, maxDuration, duration / 1000);
    if (dampingRatio < 1) {
        envelope = (undampedFreq) => {
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const a = exponentialDecay - velocity;
            const b = calcAngularFreq(undampedFreq, dampingRatio);
            const c = Math.exp(-delta);
            return safeMin - (a / b) * c;
        };
        derivative = (undampedFreq) => {
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const d = delta * velocity + velocity;
            const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
            const f = Math.exp(-delta);
            const g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
            const factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
            return (factor * ((d - e) * f)) / g;
        };
    }
    else {
        envelope = (undampedFreq) => {
            const a = Math.exp(-undampedFreq * duration);
            const b = (undampedFreq - velocity) * duration + 1;
            return -safeMin + a * b;
        };
        derivative = (undampedFreq) => {
            const a = Math.exp(-undampedFreq * duration);
            const b = (velocity - undampedFreq) * (duration * duration);
            return a * b;
        };
    }
    const initialGuess = 5 / duration;
    const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = duration * 1000;
    if (isNaN(undampedFreq)) {
        return {
            stiffness: 100,
            damping: 10,
            duration,
        };
    }
    else {
        const stiffness = Math.pow(undampedFreq, 2) * mass;
        return {
            stiffness,
            damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
            duration,
        };
    }
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for (let i = 1; i < rootIterations; i++) {
        result = result - envelope(result) / derivative(result);
    }
    return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/animations/generators/spring.mjs



const durationKeys = ["duration", "bounce"];
const physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
    return keys.some((key) => options[key] !== undefined);
}
function getSpringOptions(options) {
    let springOptions = Object.assign({ velocity: 0.0, stiffness: 100, damping: 10, mass: 1.0, isResolvedFromDuration: false }, options);
    if (!isSpringType(options, physicsKeys) &&
        isSpringType(options, durationKeys)) {
        const derived = findSpring(options);
        springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived), { velocity: 0.0, mass: 1.0 });
        springOptions.isResolvedFromDuration = true;
    }
    return springOptions;
}
function spring(_a) {
    var { from = 0.0, to = 1.0, restSpeed = 2, restDelta } = _a, options = (0,tslib_es6.__rest)(_a, ["from", "to", "restSpeed", "restDelta"]);
    const state = { done: false, value: from };
    let { stiffness, damping, mass, velocity, duration, isResolvedFromDuration, } = getSpringOptions(options);
    let resolveSpring = zero;
    let resolveVelocity = zero;
    function createSpring() {
        const initialVelocity = velocity ? -(velocity / 1000) : 0.0;
        const initialDelta = to - from;
        const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
        const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1000;
        if (restDelta === undefined) {
            restDelta = Math.min(Math.abs(to - from) / 100, 0.4);
        }
        if (dampingRatio < 1) {
            const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
            resolveSpring = (t) => {
                const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                return (to -
                    envelope *
                        (((initialVelocity +
                            dampingRatio * undampedAngularFreq * initialDelta) /
                            angularFreq) *
                            Math.sin(angularFreq * t) +
                            initialDelta * Math.cos(angularFreq * t)));
            };
            resolveVelocity = (t) => {
                const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                return (dampingRatio *
                    undampedAngularFreq *
                    envelope *
                    ((Math.sin(angularFreq * t) *
                        (initialVelocity +
                            dampingRatio *
                                undampedAngularFreq *
                                initialDelta)) /
                        angularFreq +
                        initialDelta * Math.cos(angularFreq * t)) -
                    envelope *
                        (Math.cos(angularFreq * t) *
                            (initialVelocity +
                                dampingRatio *
                                    undampedAngularFreq *
                                    initialDelta) -
                            angularFreq *
                                initialDelta *
                                Math.sin(angularFreq * t)));
            };
        }
        else if (dampingRatio === 1) {
            resolveSpring = (t) => to -
                Math.exp(-undampedAngularFreq * t) *
                    (initialDelta +
                        (initialVelocity + undampedAngularFreq * initialDelta) *
                            t);
        }
        else {
            const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
            resolveSpring = (t) => {
                const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                const freqForT = Math.min(dampedAngularFreq * t, 300);
                return (to -
                    (envelope *
                        ((initialVelocity +
                            dampingRatio * undampedAngularFreq * initialDelta) *
                            Math.sinh(freqForT) +
                            dampedAngularFreq *
                                initialDelta *
                                Math.cosh(freqForT))) /
                        dampedAngularFreq);
            };
        }
    }
    createSpring();
    return {
        next: (t) => {
            const current = resolveSpring(t);
            if (!isResolvedFromDuration) {
                const currentVelocity = resolveVelocity(t) * 1000;
                const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
                const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
                state.done =
                    isBelowVelocityThreshold && isBelowDisplacementThreshold;
            }
            else {
                state.done = t >= duration;
            }
            state.value = state.done ? to : current;
            return state;
        },
        flipTarget: () => {
            velocity = -velocity;
            [from, to] = [to, from];
            createSpring();
        },
    };
}
spring.needsInterpolation = (a, b) => typeof a === "string" || typeof b === "string";
const zero = (_t) => 0;



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/progress.mjs
const progress = (from, to, value) => {
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};



;// CONCATENATED MODULE: ./node_modules/style-value-types/dist/es/utils.mjs
const utils_clamp = (min, max) => (v) => Math.max(Math.min(v, max), min);
const sanitize = (v) => (v % 1 ? Number(v.toFixed(5)) : v);
const floatRegex = /(-)?([\d]*\.?[\d])+/g;
const colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
const singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
function isString(v) {
    return typeof v === 'string';
}



;// CONCATENATED MODULE: ./node_modules/style-value-types/dist/es/numbers/index.mjs


const number = {
    test: (v) => typeof v === 'number',
    parse: parseFloat,
    transform: (v) => v,
};
const alpha = Object.assign(Object.assign({}, number), { transform: utils_clamp(0, 1) });
const scale = Object.assign(Object.assign({}, number), { default: 1 });



;// CONCATENATED MODULE: ./node_modules/style-value-types/dist/es/color/utils.mjs


const isColorString = (type, testProp) => (v) => {
    return Boolean((isString(v) && singleColorRegex.test(v) && v.startsWith(type)) ||
        (testProp && Object.prototype.hasOwnProperty.call(v, testProp)));
};
const splitColor = (aName, bName, cName) => (v) => {
    if (!isString(v))
        return v;
    const [a, b, c, alpha] = v.match(floatRegex);
    return {
        [aName]: parseFloat(a),
        [bName]: parseFloat(b),
        [cName]: parseFloat(c),
        alpha: alpha !== undefined ? parseFloat(alpha) : 1,
    };
};



;// CONCATENATED MODULE: ./node_modules/style-value-types/dist/es/color/rgba.mjs




const clampRgbUnit = utils_clamp(0, 255);
const rgbUnit = Object.assign(Object.assign({}, number), { transform: (v) => Math.round(clampRgbUnit(v)) });
const rgba = {
    test: isColorString('rgb', 'red'),
    parse: splitColor('red', 'green', 'blue'),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => 'rgba(' +
        rgbUnit.transform(red) +
        ', ' +
        rgbUnit.transform(green) +
        ', ' +
        rgbUnit.transform(blue) +
        ', ' +
        sanitize(alpha.transform(alpha$1)) +
        ')',
};



;// CONCATENATED MODULE: ./node_modules/style-value-types/dist/es/color/hex.mjs



function parseHex(v) {
    let r = '';
    let g = '';
    let b = '';
    let a = '';
    if (v.length > 5) {
        r = v.substr(1, 2);
        g = v.substr(3, 2);
        b = v.substr(5, 2);
        a = v.substr(7, 2);
    }
    else {
        r = v.substr(1, 1);
        g = v.substr(2, 1);
        b = v.substr(3, 1);
        a = v.substr(4, 1);
        r += r;
        g += g;
        b += b;
        a += a;
    }
    return {
        red: parseInt(r, 16),
        green: parseInt(g, 16),
        blue: parseInt(b, 16),
        alpha: a ? parseInt(a, 16) / 255 : 1,
    };
}
const hex = {
    test: isColorString('#'),
    parse: parseHex,
    transform: rgba.transform,
};



;// CONCATENATED MODULE: ./node_modules/style-value-types/dist/es/numbers/units.mjs


const createUnitType = (unit) => ({
    test: (v) => isString(v) && v.endsWith(unit) && v.split(' ').length === 1,
    parse: parseFloat,
    transform: (v) => `${v}${unit}`,
});
const degrees = createUnitType('deg');
const percent = createUnitType('%');
const px = createUnitType('px');
const vh = createUnitType('vh');
const vw = createUnitType('vw');
const progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v) => percent.parse(v) / 100, transform: (v) => percent.transform(v * 100) });



;// CONCATENATED MODULE: ./node_modules/style-value-types/dist/es/color/hsla.mjs





const hsla = {
    test: isColorString('hsl', 'hue'),
    parse: splitColor('hue', 'saturation', 'lightness'),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
        return ('hsla(' +
            Math.round(hue) +
            ', ' +
            percent.transform(sanitize(saturation)) +
            ', ' +
            percent.transform(sanitize(lightness)) +
            ', ' +
            sanitize(alpha.transform(alpha$1)) +
            ')');
    },
};



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/hsla-to-rgba.mjs
function hueToRgb(p, q, t) {
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1 / 6)
        return p + (q - p) * 6 * t;
    if (t < 1 / 2)
        return q;
    if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
        red = green = blue = lightness;
    }
    else {
        const q = lightness < 0.5
            ? lightness * (1 + saturation)
            : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        red = hueToRgb(p, q, hue + 1 / 3);
        green = hueToRgb(p, q, hue);
        blue = hueToRgb(p, q, hue - 1 / 3);
    }
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha,
    };
}



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/mix-color.mjs





const mixLinearColor = (from, to, v) => {
    const fromExpo = from * from;
    const toExpo = to * to;
    return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
};
const colorTypes = [hex, rgba, hsla];
const getColorType = (v) => colorTypes.find((type) => type.test(v));
const notAnimatable = (color) => `'${color}' is not an animatable color. Use the equivalent color code instead.`;
const mixColor = (from, to) => {
    let fromColorType = getColorType(from);
    let toColorType = getColorType(to);
    (0,dist.invariant)(!!fromColorType, notAnimatable(from));
    (0,dist.invariant)(!!toColorType, notAnimatable(to));
    let fromColor = fromColorType.parse(from);
    let toColor = toColorType.parse(to);
    if (fromColorType === hsla) {
        fromColor = hslaToRgba(fromColor);
        fromColorType = rgba;
    }
    if (toColorType === hsla) {
        toColor = hslaToRgba(toColor);
        toColorType = rgba;
    }
    const blended = Object.assign({}, fromColor);
    return (v) => {
        for (const key in blended) {
            if (key !== "alpha") {
                blended[key] = mixLinearColor(fromColor[key], toColor[key], v);
            }
        }
        blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
        return fromColorType.transform(blended);
    };
};



;// CONCATENATED MODULE: ./node_modules/style-value-types/dist/es/color/index.mjs





const color = {
    test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
    parse: (v) => {
        if (rgba.test(v)) {
            return rgba.parse(v);
        }
        else if (hsla.test(v)) {
            return hsla.parse(v);
        }
        else {
            return hex.parse(v);
        }
    },
    transform: (v) => {
        return isString(v)
            ? v
            : v.hasOwnProperty('red')
                ? rgba.transform(v)
                : hsla.transform(v);
    },
};



;// CONCATENATED MODULE: ./node_modules/style-value-types/dist/es/complex/index.mjs




const colorToken = '${c}';
const numberToken = '${n}';
function test(v) {
    var _a, _b, _c, _d;
    return (isNaN(v) &&
        isString(v) &&
        ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0);
}
function analyse(v) {
    if (typeof v === 'number')
        v = `${v}`;
    const values = [];
    let numColors = 0;
    const colors = v.match(colorRegex);
    if (colors) {
        numColors = colors.length;
        v = v.replace(colorRegex, colorToken);
        values.push(...colors.map(color.parse));
    }
    const numbers = v.match(floatRegex);
    if (numbers) {
        v = v.replace(floatRegex, numberToken);
        values.push(...numbers.map(number.parse));
    }
    return { values, numColors, tokenised: v };
}
function parse(v) {
    return analyse(v).values;
}
function createTransformer(v) {
    const { values, numColors, tokenised } = analyse(v);
    const numValues = values.length;
    return (v) => {
        let output = tokenised;
        for (let i = 0; i < numValues; i++) {
            output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v[i]) : sanitize(v[i]));
        }
        return output;
    };
}
const convertNumbersToZero = (v) => typeof v === 'number' ? 0 : v;
function getAnimatableNone(v) {
    const parsed = parse(v);
    const transformer = createTransformer(v);
    return transformer(parsed.map(convertNumbersToZero));
}
const complex = { test, parse, createTransformer, getAnimatableNone };



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/inc.mjs
const zeroPoint = {
    x: 0,
    y: 0,
    z: 0
};
const isNum = (v) => typeof v === 'number';



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/pipe.mjs
const combineFunctions = (a, b) => (v) => b(a(v));
const pipe = (...transformers) => transformers.reduce(combineFunctions);



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/mix-complex.mjs







function getMixer(origin, target) {
    if (isNum(origin)) {
        return (v) => mix(origin, target, v);
    }
    else if (color.test(origin)) {
        return mixColor(origin, target);
    }
    else {
        return mixComplex(origin, target);
    }
}
const mixArray = (from, to) => {
    const output = [...from];
    const numValues = output.length;
    const blendValue = from.map((fromThis, i) => getMixer(fromThis, to[i]));
    return (v) => {
        for (let i = 0; i < numValues; i++) {
            output[i] = blendValue[i](v);
        }
        return output;
    };
};
const mixObject = (origin, target) => {
    const output = Object.assign(Object.assign({}, origin), target);
    const blendValue = {};
    for (const key in output) {
        if (origin[key] !== undefined && target[key] !== undefined) {
            blendValue[key] = getMixer(origin[key], target[key]);
        }
    }
    return (v) => {
        for (const key in blendValue) {
            output[key] = blendValue[key](v);
        }
        return output;
    };
};
function mix_complex_analyse(value) {
    const parsed = complex.parse(value);
    const numValues = parsed.length;
    let numNumbers = 0;
    let numRGB = 0;
    let numHSL = 0;
    for (let i = 0; i < numValues; i++) {
        if (numNumbers || typeof parsed[i] === "number") {
            numNumbers++;
        }
        else {
            if (parsed[i].hue !== undefined) {
                numHSL++;
            }
            else {
                numRGB++;
            }
        }
    }
    return { parsed, numNumbers, numRGB, numHSL };
}
const mixComplex = (origin, target) => {
    const template = complex.createTransformer(target);
    const originStats = mix_complex_analyse(origin);
    const targetStats = mix_complex_analyse(target);
    const canInterpolate = originStats.numHSL === targetStats.numHSL &&
        originStats.numRGB === targetStats.numRGB &&
        originStats.numNumbers >= targetStats.numNumbers;
    if (canInterpolate) {
        return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
    }
    else {
        (0,dist.warning)(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
        return (p) => `${p > 0 ? target : origin}`;
    }
};



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/interpolate.mjs









const mixNumber = (from, to) => (p) => mix(from, to, p);
function detectMixerFactory(v) {
    if (typeof v === 'number') {
        return mixNumber;
    }
    else if (typeof v === 'string') {
        if (color.test(v)) {
            return mixColor;
        }
        else {
            return mixComplex;
        }
    }
    else if (Array.isArray(v)) {
        return mixArray;
    }
    else if (typeof v === 'object') {
        return mixObject;
    }
}
function createMixers(output, ease, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || detectMixerFactory(output[0]);
    const numMixers = output.length - 1;
    for (let i = 0; i < numMixers; i++) {
        let mixer = mixerFactory(output[i], output[i + 1]);
        if (ease) {
            const easingFunction = Array.isArray(ease) ? ease[i] : ease;
            mixer = pipe(easingFunction, mixer);
        }
        mixers.push(mixer);
    }
    return mixers;
}
function fastInterpolate([from, to], [mixer]) {
    return (v) => mixer(progress(from, to, v));
}
function slowInterpolate(input, mixers) {
    const inputLength = input.length;
    const lastInputIndex = inputLength - 1;
    return (v) => {
        let mixerIndex = 0;
        let foundMixerIndex = false;
        if (v <= input[0]) {
            foundMixerIndex = true;
        }
        else if (v >= input[lastInputIndex]) {
            mixerIndex = lastInputIndex - 1;
            foundMixerIndex = true;
        }
        if (!foundMixerIndex) {
            let i = 1;
            for (; i < inputLength; i++) {
                if (input[i] > v || i === lastInputIndex) {
                    break;
                }
            }
            mixerIndex = i - 1;
        }
        const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
        return mixers[mixerIndex](progressInRange);
    };
}
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
    const inputLength = input.length;
    (0,dist.invariant)(inputLength === output.length, 'Both input and output ranges must be the same length');
    (0,dist.invariant)(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, 'Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.');
    if (input[0] > input[inputLength - 1]) {
        input = [].concat(input);
        output = [].concat(output);
        input.reverse();
        output.reverse();
    }
    const mixers = createMixers(output, ease, mixer);
    const interpolator = inputLength === 2
        ? fastInterpolate(input, mixers)
        : slowInterpolate(input, mixers);
    return isClamp
        ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v))
        : interpolator;
}



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/easing/utils.mjs
const reverseEasing = easing => p => 1 - easing(1 - p);
const mirrorEasing = easing => p => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
const createExpoIn = (power) => p => Math.pow(p, power);
const createBackIn = (power) => p => p * p * ((power + 1) * p - power);
const createAnticipate = (power) => {
    const backEasing = createBackIn(power);
    return p => (p *= 2) < 1
        ? 0.5 * backEasing(p)
        : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
};



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/easing/index.mjs


const DEFAULT_OVERSHOOT_STRENGTH = 1.525;
const BOUNCE_FIRST_THRESHOLD = 4.0 / 11.0;
const BOUNCE_SECOND_THRESHOLD = 8.0 / 11.0;
const BOUNCE_THIRD_THRESHOLD = 9.0 / 10.0;
const linear = p => p;
const easeIn = createExpoIn(2);
const easeOut = reverseEasing(easeIn);
const easeInOut = mirrorEasing(easeIn);
const circIn = p => 1 - Math.sin(Math.acos(p));
const circOut = reverseEasing(circIn);
const circInOut = mirrorEasing(circOut);
const backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
const backOut = reverseEasing(backIn);
const backInOut = mirrorEasing(backIn);
const anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
const ca = 4356.0 / 361.0;
const cb = 35442.0 / 1805.0;
const cc = 16061.0 / 1805.0;
const bounceOut = (p) => {
    if (p === 1 || p === 0)
        return p;
    const p2 = p * p;
    return p < BOUNCE_FIRST_THRESHOLD
        ? 7.5625 * p2
        : p < BOUNCE_SECOND_THRESHOLD
            ? 9.075 * p2 - 9.9 * p + 3.4
            : p < BOUNCE_THIRD_THRESHOLD
                ? ca * p2 - cb * p + cc
                : 10.8 * p * p - 20.52 * p + 10.72;
};
const bounceIn = reverseEasing(bounceOut);
const bounceInOut = (p) => p < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - p * 2.0))
    : 0.5 * bounceOut(p * 2.0 - 1.0) + 0.5;



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/animations/generators/keyframes.mjs



function defaultEasing(values, easing) {
    return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function defaultOffset(values) {
    const numValues = values.length;
    return values.map((_value, i) => i !== 0 ? i / (numValues - 1) : 0);
}
function convertOffsetToTimes(offset, duration) {
    return offset.map((o) => o * duration);
}
function keyframes({ from = 0, to = 1, ease, offset, duration = 300, }) {
    const state = { done: false, value: from };
    const values = Array.isArray(to) ? to : [from, to];
    const times = convertOffsetToTimes(offset && offset.length === values.length
        ? offset
        : defaultOffset(values), duration);
    function createInterpolator() {
        return interpolate(times, values, {
            ease: Array.isArray(ease) ? ease : defaultEasing(values, ease),
        });
    }
    let interpolator = createInterpolator();
    return {
        next: (t) => {
            state.value = interpolator(t);
            state.done = t >= duration;
            return state;
        },
        flipTarget: () => {
            values.reverse();
            interpolator = createInterpolator();
        },
    };
}



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/animations/generators/decay.mjs
function decay({ velocity = 0, from = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget, }) {
    const state = { done: false, value: from };
    let amplitude = power * velocity;
    const ideal = from + amplitude;
    const target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
    if (target !== ideal)
        amplitude = target - from;
    return {
        next: (t) => {
            const delta = -amplitude * Math.exp(-t / timeConstant);
            state.done = !(delta > restDelta || delta < -restDelta);
            state.value = state.done ? target : target + delta;
            return state;
        },
        flipTarget: () => { },
    };
}



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs




const types = { keyframes: keyframes, spring: spring, decay: decay };
function detectAnimationFromOptions(config) {
    if (Array.isArray(config.to)) {
        return keyframes;
    }
    else if (types[config.type]) {
        return types[config.type];
    }
    const keys = new Set(Object.keys(config));
    if (keys.has("ease") ||
        (keys.has("duration") && !keys.has("dampingRatio"))) {
        return keyframes;
    }
    else if (keys.has("dampingRatio") ||
        keys.has("stiffness") ||
        keys.has("mass") ||
        keys.has("damping") ||
        keys.has("restSpeed") ||
        keys.has("restDelta")) {
        return spring;
    }
    return keyframes;
}



;// CONCATENATED MODULE: ./node_modules/popmotion/node_modules/framesync/dist/es/on-next-frame.mjs
const on_next_frame_defaultTimestep = (1 / 60) * 1000;
const on_next_frame_getCurrentTime = typeof performance !== "undefined"
    ? () => performance.now()
    : () => Date.now();
const on_next_frame_onNextFrame = typeof window !== "undefined"
    ? (callback) => window.requestAnimationFrame(callback)
    : (callback) => setTimeout(() => callback(on_next_frame_getCurrentTime()), on_next_frame_defaultTimestep);



;// CONCATENATED MODULE: ./node_modules/popmotion/node_modules/framesync/dist/es/create-render-step.mjs
function create_render_step_createRenderStep(runNextFrame) {
    let toRun = [];
    let toRunNextFrame = [];
    let numToRun = 0;
    let isProcessing = false;
    let flushNextFrame = false;
    const toKeepAlive = new WeakSet();
    const step = {
        schedule: (callback, keepAlive = false, immediate = false) => {
            const addToCurrentFrame = immediate && isProcessing;
            const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
            if (keepAlive)
                toKeepAlive.add(callback);
            if (buffer.indexOf(callback) === -1) {
                buffer.push(callback);
                if (addToCurrentFrame && isProcessing)
                    numToRun = toRun.length;
            }
            return callback;
        },
        cancel: (callback) => {
            const index = toRunNextFrame.indexOf(callback);
            if (index !== -1)
                toRunNextFrame.splice(index, 1);
            toKeepAlive.delete(callback);
        },
        process: (frameData) => {
            if (isProcessing) {
                flushNextFrame = true;
                return;
            }
            isProcessing = true;
            [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
            toRunNextFrame.length = 0;
            numToRun = toRun.length;
            if (numToRun) {
                for (let i = 0; i < numToRun; i++) {
                    const callback = toRun[i];
                    callback(frameData);
                    if (toKeepAlive.has(callback)) {
                        step.schedule(callback);
                        runNextFrame();
                    }
                }
            }
            isProcessing = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        },
    };
    return step;
}



;// CONCATENATED MODULE: ./node_modules/popmotion/node_modules/framesync/dist/es/index.mjs



const es_maxElapsed = 40;
let es_useDefaultElapsed = true;
let es_runNextFrame = false;
let es_isProcessing = false;
const dist_es_frame = {
    delta: 0,
    timestamp: 0,
};
const es_stepsOrder = [
    "read",
    "update",
    "preRender",
    "render",
    "postRender",
];
const es_steps = es_stepsOrder.reduce((acc, key) => {
    acc[key] = create_render_step_createRenderStep(() => (es_runNextFrame = true));
    return acc;
}, {});
const es_sync = es_stepsOrder.reduce((acc, key) => {
    const step = es_steps[key];
    acc[key] = (process, keepAlive = false, immediate = false) => {
        if (!es_runNextFrame)
            es_startLoop();
        return step.schedule(process, keepAlive, immediate);
    };
    return acc;
}, {});
const es_cancelSync = es_stepsOrder.reduce((acc, key) => {
    acc[key] = es_steps[key].cancel;
    return acc;
}, {});
const es_flushSync = es_stepsOrder.reduce((acc, key) => {
    acc[key] = () => es_steps[key].process(dist_es_frame);
    return acc;
}, {});
const es_processStep = (stepId) => es_steps[stepId].process(dist_es_frame);
const es_processFrame = (timestamp) => {
    es_runNextFrame = false;
    dist_es_frame.delta = es_useDefaultElapsed
        ? on_next_frame_defaultTimestep
        : Math.max(Math.min(timestamp - dist_es_frame.timestamp, es_maxElapsed), 1);
    dist_es_frame.timestamp = timestamp;
    es_isProcessing = true;
    es_stepsOrder.forEach(es_processStep);
    es_isProcessing = false;
    if (es_runNextFrame) {
        es_useDefaultElapsed = false;
        on_next_frame_onNextFrame(es_processFrame);
    }
};
const es_startLoop = () => {
    es_runNextFrame = true;
    es_useDefaultElapsed = true;
    if (!es_isProcessing)
        on_next_frame_onNextFrame(es_processFrame);
};
const es_getFrameData = () => dist_es_frame;

/* harmony default export */ const dist_es = (es_sync);


;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/animations/utils/elapsed.mjs
function loopElapsed(elapsed, duration, delay = 0) {
    return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
    return isForwardPlayback
        ? loopElapsed(duration + -elapsed, duration, delay)
        : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
    return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/animations/index.mjs






const framesync = (update) => {
    const passTimestamp = ({ delta }) => update(delta);
    return {
        start: () => dist_es.update(passTimestamp, true),
        stop: () => es_cancelSync.update(passTimestamp),
    };
};
function animate(_a) {
    var _b, _c;
    var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options = (0,tslib_es6.__rest)(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
    let { to } = options;
    let driverControls;
    let repeatCount = 0;
    let computedDuration = options.duration;
    let latest;
    let isComplete = false;
    let isForwardPlayback = true;
    let interpolateFromNumber;
    const animator = detectAnimationFromOptions(options);
    if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
        interpolateFromNumber = interpolate([0, 100], [from, to], {
            clamp: false,
        });
        from = 0;
        to = 100;
    }
    const animation = animator(Object.assign(Object.assign({}, options), { from, to }));
    function repeat() {
        repeatCount++;
        if (repeatType === "reverse") {
            isForwardPlayback = repeatCount % 2 === 0;
            elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
        }
        else {
            elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
            if (repeatType === "mirror")
                animation.flipTarget();
        }
        isComplete = false;
        onRepeat && onRepeat();
    }
    function complete() {
        driverControls.stop();
        onComplete && onComplete();
    }
    function update(delta) {
        if (!isForwardPlayback)
            delta = -delta;
        elapsed += delta;
        if (!isComplete) {
            const state = animation.next(Math.max(0, elapsed));
            latest = state.value;
            if (interpolateFromNumber)
                latest = interpolateFromNumber(latest);
            isComplete = isForwardPlayback ? state.done : elapsed <= 0;
        }
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
        if (isComplete) {
            if (repeatCount === 0)
                computedDuration !== null && computedDuration !== void 0 ? computedDuration : (computedDuration = elapsed);
            if (repeatCount < repeatMax) {
                hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
            }
            else {
                complete();
            }
        }
    }
    function play() {
        onPlay === null || onPlay === void 0 ? void 0 : onPlay();
        driverControls = driver(update);
        driverControls.start();
    }
    autoplay && play();
    return {
        stop: () => {
            onStop === null || onStop === void 0 ? void 0 : onStop();
            driverControls.stop();
        },
    };
}



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/animations/inertia.mjs




function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop, }) {
    let currentAnimation;
    function isOutOfBounds(v) {
        return (min !== undefined && v < min) || (max !== undefined && v > max);
    }
    function boundaryNearest(v) {
        if (min === undefined)
            return max;
        if (max === undefined)
            return min;
        return Math.abs(min - v) < Math.abs(max - v) ? min : max;
    }
    function startAnimation(options) {
        currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
        currentAnimation = animate(Object.assign(Object.assign({}, options), { driver, onUpdate: (v) => {
                var _a;
                onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
                (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v);
            }, onComplete,
            onStop }));
    }
    function startSpring(options) {
        startAnimation(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
    }
    if (isOutOfBounds(from)) {
        startSpring({ from, velocity, to: boundaryNearest(from) });
    }
    else {
        let target = power * velocity + from;
        if (typeof modifyTarget !== "undefined")
            target = modifyTarget(target);
        const boundary = boundaryNearest(target);
        const heading = boundary === min ? -1 : 1;
        let prev;
        let current;
        const checkBoundary = (v) => {
            prev = current;
            current = v;
            velocity = velocityPerSecond(v - prev, es_getFrameData().delta);
            if ((heading === 1 && v > boundary) ||
                (heading === -1 && v < boundary)) {
                startSpring({ from: v, to: boundary, velocity });
            }
        };
        startAnimation({
            type: "decay",
            from,
            velocity,
            timeConstant,
            power,
            restDelta,
            modifyTarget,
            onUpdate: isOutOfBounds(target) ? checkBoundary : undefined,
        });
    }
    return {
        stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop(),
    };
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/time-conversion.mjs
/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */
var secondsToMilliseconds = function (seconds) { return seconds * 1000; };



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/easing/cubic-bezier.mjs


const a = (a1, a2) => 1.0 - 3.0 * a2 + 3.0 * a1;
const b = (a1, a2) => 3.0 * a2 - 6.0 * a1;
const c = (a1) => 3.0 * a1;
const calcBezier = (t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
const getSlope = (t, a1, a2) => 3.0 * a(a1, a2) * t * t + 2.0 * b(a1, a2) * t + c(a1);
const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 10;
function binarySubdivide(aX, aA, aB, mX1, mX2) {
    let currentX;
    let currentT;
    let i = 0;
    do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0.0) {
            aB = currentT;
        }
        else {
            aA = currentT;
        }
    } while (Math.abs(currentX) > subdivisionPrecision &&
        ++i < subdivisionMaxIterations);
    return currentT;
}
const newtonIterations = 8;
const newtonMinSlope = 0.001;
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (let i = 0; i < newtonIterations; ++i) {
        const currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) {
            return aGuessT;
        }
        const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
}
const kSplineTableSize = 11;
const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
function cubicBezier(mX1, mY1, mX2, mY2) {
    if (mX1 === mY1 && mX2 === mY2)
        return linear;
    const sampleValues = new Float32Array(kSplineTableSize);
    for (let i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }
    function getTForX(aX) {
        let intervalStart = 0.0;
        let currentSample = 1;
        const lastSample = kSplineTableSize - 1;
        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
        }
        --currentSample;
        const dist = (aX - sampleValues[currentSample]) /
            (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        const guessForT = intervalStart + dist * kSampleStepSize;
        const initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= newtonMinSlope) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        }
        else if (initialSlope === 0.0) {
            return guessForT;
        }
        else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
    }
    return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/animation/utils/easing.mjs




var easingLookup = {
    linear: linear,
    easeIn: easeIn,
    easeInOut: easeInOut,
    easeOut: easeOut,
    circIn: circIn,
    circInOut: circInOut,
    circOut: circOut,
    backIn: backIn,
    backInOut: backInOut,
    backOut: backOut,
    anticipate: anticipate,
    bounceIn: bounceIn,
    bounceInOut: bounceInOut,
    bounceOut: bounceOut,
};
var easingDefinitionToFunction = function (definition) {
    if (Array.isArray(definition)) {
        // If cubic bezier definition, create bezier curve
        (0,dist.invariant)(definition.length === 4, "Cubic bezier arrays must contain four numerical values.");
        var _a = (0,tslib_es6.__read)(definition, 4), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
        return cubicBezier(x1, y1, x2, y2);
    }
    else if (typeof definition === "string") {
        // Else lookup from table
        (0,dist.invariant)(easingLookup[definition] !== undefined, "Invalid easing type '".concat(definition, "'"));
        return easingLookup[definition];
    }
    return definition;
};
var isEasingArray = function (ease) {
    return Array.isArray(ease) && typeof ease[0] !== "number";
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs


/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */
var isAnimatable = function (key, value) {
    // If the list of keys tat might be non-animatable grows, replace with Set
    if (key === "zIndex")
        return false;
    // If it's a number or a keyframes array, we can animate it. We might at some point
    // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
    // but for now lets leave it like this for performance reasons
    if (typeof value === "number" || Array.isArray(value))
        return true;
    if (typeof value === "string" && // It's animatable if we have a string
        complex.test(value) && // And it contains numbers and/or colors
        !value.startsWith("url(") // Unless it starts with "url("
    ) {
        return true;
    }
    return false;
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs
var isKeyframesTarget = function (v) {
    return Array.isArray(v);
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs



var underDampedSpring = function () { return ({
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10,
}); };
var criticallyDampedSpring = function (to) { return ({
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
}); };
var linearTween = function () { return ({
    type: "keyframes",
    ease: "linear",
    duration: 0.3,
}); };
var default_transitions_keyframes = function (values) { return ({
    type: "keyframes",
    duration: 0.8,
    values: values,
}); };
var defaultTransitions = {
    x: underDampedSpring,
    y: underDampedSpring,
    z: underDampedSpring,
    rotate: underDampedSpring,
    rotateX: underDampedSpring,
    rotateY: underDampedSpring,
    rotateZ: underDampedSpring,
    scaleX: criticallyDampedSpring,
    scaleY: criticallyDampedSpring,
    scale: criticallyDampedSpring,
    opacity: linearTween,
    backgroundColor: linearTween,
    color: linearTween,
    default: criticallyDampedSpring,
};
var getDefaultTransition = function (valueKey, to) {
    var transitionFactory;
    if (isKeyframesTarget(to)) {
        transitionFactory = default_transitions_keyframes;
    }
    else {
        transitionFactory =
            defaultTransitions[valueKey] || defaultTransitions.default;
    }
    return (0,tslib_es6.__assign)({ to: to }, transitionFactory(to));
};



;// CONCATENATED MODULE: ./node_modules/style-value-types/dist/es/complex/filter.mjs



const maxDefaults = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
function applyDefaultFilter(v) {
    let [name, value] = v.slice(0, -1).split('(');
    if (name === 'drop-shadow')
        return v;
    const [number] = value.match(floatRegex) || [];
    if (!number)
        return v;
    const unit = value.replace(number, '');
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number !== value)
        defaultValue *= 100;
    return name + '(' + defaultValue + unit + ')';
}
const functionRegex = /([a-z-]*)\(.*?\)/g;
const filter = Object.assign(Object.assign({}, complex), { getAnimatableNone: (v) => {
        const functions = v.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(' ') : v;
    } });



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/value-types/type-int.mjs



var type_int_int = (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, number), { transform: Math.round });



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs



var numberValueTypes = {
    // Border props
    borderWidth: px,
    borderTopWidth: px,
    borderRightWidth: px,
    borderBottomWidth: px,
    borderLeftWidth: px,
    borderRadius: px,
    radius: px,
    borderTopLeftRadius: px,
    borderTopRightRadius: px,
    borderBottomRightRadius: px,
    borderBottomLeftRadius: px,
    // Positioning props
    width: px,
    maxWidth: px,
    height: px,
    maxHeight: px,
    size: px,
    top: px,
    right: px,
    bottom: px,
    left: px,
    // Spacing props
    padding: px,
    paddingTop: px,
    paddingRight: px,
    paddingBottom: px,
    paddingLeft: px,
    margin: px,
    marginTop: px,
    marginRight: px,
    marginBottom: px,
    marginLeft: px,
    // Transform props
    rotate: degrees,
    rotateX: degrees,
    rotateY: degrees,
    rotateZ: degrees,
    scale: scale,
    scaleX: scale,
    scaleY: scale,
    scaleZ: scale,
    skew: degrees,
    skewX: degrees,
    skewY: degrees,
    distance: px,
    translateX: px,
    translateY: px,
    translateZ: px,
    x: px,
    y: px,
    z: px,
    perspective: px,
    transformPerspective: px,
    opacity: alpha,
    originX: progressPercentage,
    originY: progressPercentage,
    originZ: px,
    // Misc
    zIndex: type_int_int,
    // SVG
    fillOpacity: alpha,
    strokeOpacity: alpha,
    numOctaves: type_int_int,
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs




/**
 * A map of default value types for common values
 */
var defaultValueTypes = (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, numberValueTypes), { 
    // Color props
    color: color, backgroundColor: color, outlineColor: color, fill: color, stroke: color, 
    // Border props
    borderColor: color, borderTopColor: color, borderRightColor: color, borderBottomColor: color, borderLeftColor: color, filter: filter, WebkitFilter: filter });
/**
 * Gets the default ValueType for the provided value key
 */
var getDefaultValueType = function (key) { return defaultValueTypes[key]; };



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs



function animatable_none_getAnimatableNone(key, value) {
    var _a;
    var defaultValueType = getDefaultValueType(key);
    if (defaultValueType !== filter)
        defaultValueType = complex;
    // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
    return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs
var instantAnimationState = {
    current: false,
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/resolve-value.mjs


var isCustomValue = function (v) {
    return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
var resolveFinalValueInKeyframes = function (v) {
    // TODO maybe throw if v.length - 1 is placeholder token?
    return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/animation/utils/transitions.mjs











/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */
function isTransitionDefined(_a) {
    _a.when; _a.delay; _a.delayChildren; _a.staggerChildren; _a.staggerDirection; _a.repeat; _a.repeatType; _a.repeatDelay; _a.from; var transition = (0,tslib_es6.__rest)(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);
    return !!Object.keys(transition).length;
}
var legacyRepeatWarning = false;
/**
 * Convert Framer Motion's Transition type into Popmotion-compatible options.
 */
function convertTransitionToAnimationOptions(_a) {
    var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop = _a.loop, transition = (0,tslib_es6.__rest)(_a, ["ease", "times", "yoyo", "flip", "loop"]);
    var options = (0,tslib_es6.__assign)({}, transition);
    if (times)
        options["offset"] = times;
    /**
     * Convert any existing durations from seconds to milliseconds
     */
    if (transition.duration)
        options["duration"] = secondsToMilliseconds(transition.duration);
    if (transition.repeatDelay)
        options.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
    /**
     * Map easing names to Popmotion's easing functions
     */
    if (ease) {
        options["ease"] = isEasingArray(ease)
            ? ease.map(easingDefinitionToFunction)
            : easingDefinitionToFunction(ease);
    }
    /**
     * Support legacy transition API
     */
    if (transition.type === "tween")
        options.type = "keyframes";
    /**
     * TODO: These options are officially removed from the API.
     */
    if (yoyo || loop || flip) {
        (0,dist.warning)(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
        legacyRepeatWarning = true;
        if (yoyo) {
            options.repeatType = "reverse";
        }
        else if (loop) {
            options.repeatType = "loop";
        }
        else if (flip) {
            options.repeatType = "mirror";
        }
        options.repeat = loop || yoyo || flip || transition.repeat;
    }
    /**
     * TODO: Popmotion 9 has the ability to automatically detect whether to use
     * a keyframes or spring animation, but does so by detecting velocity and other spring options.
     * It'd be good to introduce a similar thing here.
     */
    if (transition.type !== "spring")
        options.type = "keyframes";
    return options;
}
/**
 * Get the delay for a value by checking Transition with decreasing specificity.
 */
function getDelayFromTransition(transition, key) {
    var _a, _b;
    var valueTransition = getValueTransition(transition, key) || {};
    return (_b = (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : transition.delay) !== null && _b !== void 0 ? _b : 0;
}
function hydrateKeyframes(options) {
    if (Array.isArray(options.to) && options.to[0] === null) {
        options.to = (0,tslib_es6.__spreadArray)([], (0,tslib_es6.__read)(options.to), false);
        options.to[0] = options.from;
    }
    return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
    var _a;
    if (Array.isArray(options.to)) {
        (_a = transition.duration) !== null && _a !== void 0 ? _a : (transition.duration = 0.8);
    }
    hydrateKeyframes(options);
    /**
     * Get a default transition if none is determined to be defined.
     */
    if (!isTransitionDefined(transition)) {
        transition = (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, transition), getDefaultTransition(key, options.to));
    }
    return (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, options), convertTransitionToAnimationOptions(transition));
}
/**
 *
 */
function getAnimation(key, value, target, transition, onComplete) {
    var _a;
    var valueTransition = getValueTransition(transition, key);
    var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
    var isTargetAnimatable = isAnimatable(key, target);
    if (origin === "none" && isTargetAnimatable && typeof target === "string") {
        /**
         * If we're trying to animate from "none", try and get an animatable version
         * of the target. This could be improved to work both ways.
         */
        origin = animatable_none_getAnimatableNone(key, target);
    }
    else if (isZero(origin) && typeof target === "string") {
        origin = getZeroUnit(target);
    }
    else if (!Array.isArray(target) &&
        isZero(target) &&
        typeof origin === "string") {
        target = getZeroUnit(origin);
    }
    var isOriginAnimatable = isAnimatable(key, origin);
    (0,dist.warning)(isOriginAnimatable === isTargetAnimatable, "You are trying to animate ".concat(key, " from \"").concat(origin, "\" to \"").concat(target, "\". ").concat(origin, " is not an animatable value - to enable this animation set ").concat(origin, " to a value animatable to ").concat(target, " via the `style` property."));
    function start() {
        var options = {
            from: origin,
            to: target,
            velocity: value.getVelocity(),
            onComplete: onComplete,
            onUpdate: function (v) { return value.set(v); },
        };
        return valueTransition.type === "inertia" ||
            valueTransition.type === "decay"
            ? inertia((0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, options), valueTransition))
            : animate((0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, getPopmotionAnimationOptions(valueTransition, options, key)), { onUpdate: function (v) {
                    var _a;
                    options.onUpdate(v);
                    (_a = valueTransition.onUpdate) === null || _a === void 0 ? void 0 : _a.call(valueTransition, v);
                }, onComplete: function () {
                    var _a;
                    options.onComplete();
                    (_a = valueTransition.onComplete) === null || _a === void 0 ? void 0 : _a.call(valueTransition);
                } }));
    }
    function set() {
        var _a, _b;
        var finalTarget = resolveFinalValueInKeyframes(target);
        value.set(finalTarget);
        onComplete();
        (_a = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onUpdate) === null || _a === void 0 ? void 0 : _a.call(valueTransition, finalTarget);
        (_b = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _b === void 0 ? void 0 : _b.call(valueTransition);
        return { stop: function () { } };
    }
    return !isOriginAnimatable ||
        !isTargetAnimatable ||
        valueTransition.type === false
        ? set
        : start;
}
function isZero(value) {
    return (value === 0 ||
        (typeof value === "string" &&
            parseFloat(value) === 0 &&
            value.indexOf(" ") === -1));
}
function getZeroUnit(potentialUnitType) {
    return typeof potentialUnitType === "number"
        ? 0
        : animatable_none_getAnimatableNone("", potentialUnitType);
}
function getValueTransition(transition, key) {
    return transition[key] || transition["default"] || transition;
}
/**
 * Start animation on a MotionValue. This function is an interface between
 * Framer Motion and Popmotion
 *
 * @internal
 */
function startAnimation(key, value, target, transition) {
    if (transition === void 0) { transition = {}; }
    if (instantAnimationState.current) {
        transition = { type: false };
    }
    return value.start(function (onComplete) {
        var delayTimer;
        var controls;
        var animation = getAnimation(key, value, target, transition, onComplete);
        var delay = getDelayFromTransition(transition, key);
        var start = function () { return (controls = animation()); };
        if (delay) {
            delayTimer = setTimeout(start, secondsToMilliseconds(delay));
        }
        else {
            start();
        }
        return function () {
            clearTimeout(delayTimer);
            controls === null || controls === void 0 ? void 0 : controls.stop();
        };
    });
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/animation/animate.mjs




/**
 * Animate a single value or a `MotionValue`.
 *
 * The first argument is either a `MotionValue` to animate, or an initial animation value.
 *
 * The second is either a value to animate to, or an array of keyframes to animate through.
 *
 * The third argument can be either tween or spring options, and optional lifecycle methods: `onUpdate`, `onPlay`, `onComplete`, `onRepeat` and `onStop`.
 *
 * Returns `AnimationPlaybackControls`, currently just a `stop` method.
 *
 * ```javascript
 * const x = useMotionValue(0)
 *
 * useEffect(() => {
 *   const controls = animate(x, 100, {
 *     type: "spring",
 *     stiffness: 2000,
 *     onComplete: v => {}
 *   })
 *
 *   return controls.stop
 * })
 * ```
 *
 * @public
 */
function animate_animate(from, to, transition) {
    if (transition === void 0) { transition = {}; }
    var value = isMotionValue(from) ? from : motionValue(from);
    startAnimation("", value, to, transition);
    return {
        stop: function () { return value.stop(); },
        isAnimating: function () { return value.isAnimating(); },
    };
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs



var borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
var numBorders = borders.length;
var asNumber = function (value) {
    return typeof value === "string" ? parseFloat(value) : value;
};
var isPx = function (value) {
    return typeof value === "number" || px.test(value);
};
function mixValues(target, follow, lead, progress, shouldCrossfadeOpacity, isOnlyMember) {
    var _a, _b, _c, _d;
    if (shouldCrossfadeOpacity) {
        target.opacity = mix(0, 
        // (follow?.opacity as number) ?? 0,
        // TODO Reinstate this if only child
        (_a = lead.opacity) !== null && _a !== void 0 ? _a : 1, easeCrossfadeIn(progress));
        target.opacityExit = mix((_b = follow.opacity) !== null && _b !== void 0 ? _b : 1, 0, easeCrossfadeOut(progress));
    }
    else if (isOnlyMember) {
        target.opacity = mix((_c = follow.opacity) !== null && _c !== void 0 ? _c : 1, (_d = lead.opacity) !== null && _d !== void 0 ? _d : 1, progress);
    }
    /**
     * Mix border radius
     */
    for (var i = 0; i < numBorders; i++) {
        var borderLabel = "border".concat(borders[i], "Radius");
        var followRadius = getRadius(follow, borderLabel);
        var leadRadius = getRadius(lead, borderLabel);
        if (followRadius === undefined && leadRadius === undefined)
            continue;
        followRadius || (followRadius = 0);
        leadRadius || (leadRadius = 0);
        var canMix = followRadius === 0 ||
            leadRadius === 0 ||
            isPx(followRadius) === isPx(leadRadius);
        if (canMix) {
            target[borderLabel] = Math.max(mix(asNumber(followRadius), asNumber(leadRadius), progress), 0);
            if (percent.test(leadRadius) || percent.test(followRadius)) {
                target[borderLabel] += "%";
            }
        }
        else {
            target[borderLabel] = leadRadius;
        }
    }
    /**
     * Mix rotation
     */
    if (follow.rotate || lead.rotate) {
        target.rotate = mix(follow.rotate || 0, lead.rotate || 0, progress);
    }
}
function getRadius(values, radiusName) {
    var _a;
    return (_a = values[radiusName]) !== null && _a !== void 0 ? _a : values.borderRadius;
}
// /**
//  * We only want to mix the background color if there's a follow element
//  * that we're not crossfading opacity between. For instance with switch
//  * AnimateSharedLayout animations, this helps the illusion of a continuous
//  * element being animated but also cuts down on the number of paints triggered
//  * for elements where opacity is doing that work for us.
//  */
// if (
//     !hasFollowElement &&
//     latestLeadValues.backgroundColor &&
//     latestFollowValues.backgroundColor
// ) {
//     /**
//      * This isn't ideal performance-wise as mixColor is creating a new function every frame.
//      * We could probably create a mixer that runs at the start of the animation but
//      * the idea behind the crossfader is that it runs dynamically between two potentially
//      * changing targets (ie opacity or borderRadius may be animating independently via variants)
//      */
//     leadState.backgroundColor = followState.backgroundColor = mixColor(
//         latestFollowValues.backgroundColor as string,
//         latestLeadValues.backgroundColor as string
//     )(p)
// }
var easeCrossfadeIn = compress(0, 0.5, circOut);
var easeCrossfadeOut = compress(0.5, 0.95, linear);
function compress(min, max, easing) {
    return function (p) {
        // Could replace ifs with clamp
        if (p < min)
            return 0;
        if (p > max)
            return 1;
        return easing(progress(min, max, p));
    };
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/geometry/copy.mjs
/**
 * Reset an axis to the provided origin box.
 *
 * This is a mutative operation.
 */
function copyAxisInto(axis, originAxis) {
    axis.min = originAxis.min;
    axis.max = originAxis.max;
}
/**
 * Reset a box to the provided origin box.
 *
 * This is a mutative operation.
 */
function copyBoxInto(box, originBox) {
    copyAxisInto(box.x, originBox.x);
    copyAxisInto(box.y, originBox.y);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs
function isIdentityScale(scale) {
    return scale === undefined || scale === 1;
}
function hasScale(_a) {
    var scale = _a.scale, scaleX = _a.scaleX, scaleY = _a.scaleY;
    return (!isIdentityScale(scale) ||
        !isIdentityScale(scaleX) ||
        !isIdentityScale(scaleY));
}
function hasTransform(values) {
    return (hasScale(values) ||
        hasTranslate(values.x) ||
        hasTranslate(values.y) ||
        values.z ||
        values.rotate ||
        values.rotateX ||
        values.rotateY);
}
function hasTranslate(value) {
    return value && value !== "0%";
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs




/**
 * Scales a point based on a factor and an originPoint
 */
function scalePoint(point, scale, originPoint) {
    var distanceFromOrigin = point - originPoint;
    var scaled = scale * distanceFromOrigin;
    return originPoint + scaled;
}
/**
 * Applies a translate/scale delta to a point
 */
function applyPointDelta(point, translate, scale, originPoint, boxScale) {
    if (boxScale !== undefined) {
        point = scalePoint(point, boxScale, originPoint);
    }
    return scalePoint(point, scale, originPoint) + translate;
}
/**
 * Applies a translate/scale delta to an axis
 */
function applyAxisDelta(axis, translate, scale, originPoint, boxScale) {
    if (translate === void 0) { translate = 0; }
    if (scale === void 0) { scale = 1; }
    axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Applies a translate/scale delta to a box
 */
function applyBoxDelta(box, _a) {
    var x = _a.x, y = _a.y;
    applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
    applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
/**
 * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
 * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
 *
 * This is the final nested loop within updateLayoutDelta for future refactoring
 */
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition) {
    var _a, _b;
    if (isSharedTransition === void 0) { isSharedTransition = false; }
    var treeLength = treePath.length;
    if (!treeLength)
        return;
    // Reset the treeScale
    treeScale.x = treeScale.y = 1;
    var node;
    var delta;
    for (var i = 0; i < treeLength; i++) {
        node = treePath[i];
        delta = node.projectionDelta;
        if (((_b = (_a = node.instance) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.display) === "contents")
            continue;
        if (isSharedTransition &&
            node.options.layoutScroll &&
            node.scroll &&
            node !== node.root) {
            transformBox(box, { x: -node.scroll.x, y: -node.scroll.y });
        }
        if (delta) {
            // Incoporate each ancestor's scale into a culmulative treeScale for this component
            treeScale.x *= delta.x.scale;
            treeScale.y *= delta.y.scale;
            // Apply each ancestor's calculated delta into this component's recorded layout box
            applyBoxDelta(box, delta);
        }
        if (isSharedTransition && hasTransform(node.latestValues)) {
            transformBox(box, node.latestValues);
        }
    }
}
function translateAxis(axis, distance) {
    axis.min = axis.min + distance;
    axis.max = axis.max + distance;
}
/**
 * Apply a transform to an axis from the latest resolved motion values.
 * This function basically acts as a bridge between a flat motion value map
 * and applyAxisDelta
 */
function transformAxis(axis, transforms, _a) {
    var _b = (0,tslib_es6.__read)(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
    var axisOrigin = transforms[originKey] !== undefined ? transforms[originKey] : 0.5;
    var originPoint = mix(axis.min, axis.max, axisOrigin);
    // Apply the axis delta to the final axis
    applyAxisDelta(axis, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
/**
 * The names of the motion values we want to apply as translation, scale and origin.
 */
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
/**
 * Apply a transform to a box from the latest resolved motion values.
 */
function transformBox(box, transform) {
    transformAxis(box.x, transform, xKeys);
    transformAxis(box.y, transform, yKeys);
}



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/is-point.mjs
const isPoint = (point) => point.hasOwnProperty('x') && point.hasOwnProperty('y');



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/is-point-3d.mjs


const isPoint3D = (point) => isPoint(point) && point.hasOwnProperty('z');



;// CONCATENATED MODULE: ./node_modules/popmotion/dist/es/utils/distance.mjs




const distance1D = (a, b) => Math.abs(a - b);
function distance(a, b) {
    if (isNum(a) && isNum(b)) {
        return distance1D(a, b);
    }
    else if (isPoint(a) && isPoint(b)) {
        const xDelta = distance1D(a.x, b.x);
        const yDelta = distance1D(a.y, b.y);
        const zDelta = isPoint3D(a) && isPoint3D(b) ? distance1D(a.z, b.z) : 0;
        return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
    }
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs


function calcLength(axis) {
    return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
    if (target === void 0) { target = 0; }
    if (maxDistance === void 0) { maxDistance = 0.01; }
    return distance(value, target) < maxDistance;
}
function calcAxisDelta(delta, source, target, origin) {
    if (origin === void 0) { origin = 0.5; }
    delta.origin = origin;
    delta.originPoint = mix(source.min, source.max, delta.origin);
    delta.scale = calcLength(target) / calcLength(source);
    if (isNear(delta.scale, 1, 0.0001) || isNaN(delta.scale))
        delta.scale = 1;
    delta.translate =
        mix(target.min, target.max, delta.origin) - delta.originPoint;
    if (isNear(delta.translate) || isNaN(delta.translate))
        delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
    calcAxisDelta(delta.x, source.x, target.x, origin === null || origin === void 0 ? void 0 : origin.originX);
    calcAxisDelta(delta.y, source.y, target.y, origin === null || origin === void 0 ? void 0 : origin.originY);
}
function calcRelativeAxis(target, relative, parent) {
    target.min = parent.min + relative.min;
    target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
    calcRelativeAxis(target.x, relative.x, parent.x);
    calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout, parent) {
    target.min = layout.min - parent.min;
    target.max = target.min + calcLength(layout);
}
function calcRelativePosition(target, layout, parent) {
    calcRelativeAxisPosition(target.x, layout.x, parent.x);
    calcRelativeAxisPosition(target.y, layout.y, parent.y);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs





/**
 * Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
 */
function removePointDelta(point, translate, scale, originPoint, boxScale) {
    point -= translate;
    point = scalePoint(point, 1 / scale, originPoint);
    if (boxScale !== undefined) {
        point = scalePoint(point, 1 / boxScale, originPoint);
    }
    return point;
}
/**
 * Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
 */
function removeAxisDelta(axis, translate, scale, origin, boxScale, originAxis, sourceAxis) {
    if (translate === void 0) { translate = 0; }
    if (scale === void 0) { scale = 1; }
    if (origin === void 0) { origin = 0.5; }
    if (originAxis === void 0) { originAxis = axis; }
    if (sourceAxis === void 0) { sourceAxis = axis; }
    if (percent.test(translate)) {
        translate = parseFloat(translate);
        var relativeProgress = mix(sourceAxis.min, sourceAxis.max, translate / 100);
        translate = relativeProgress - sourceAxis.min;
    }
    if (typeof translate !== "number")
        return;
    var originPoint = mix(originAxis.min, originAxis.max, origin);
    if (axis === originAxis)
        originPoint -= translate;
    axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */
function removeAxisTransforms(axis, transforms, _a, origin, sourceAxis) {
    var _b = (0,tslib_es6.__read)(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
    removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
/**
 * The names of the motion values we want to apply as translation, scale and origin.
 */
var delta_remove_xKeys = ["x", "scaleX", "originX"];
var delta_remove_yKeys = ["y", "scaleY", "originY"];
/**
 * Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
    removeAxisTransforms(box.x, transforms, delta_remove_xKeys, originBox === null || originBox === void 0 ? void 0 : originBox.x, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.x);
    removeAxisTransforms(box.y, transforms, delta_remove_yKeys, originBox === null || originBox === void 0 ? void 0 : originBox.y, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.y);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/geometry/models.mjs
var createAxisDelta = function () { return ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0,
}); };
var createDelta = function () { return ({
    x: createAxisDelta(),
    y: createAxisDelta(),
}); };
var createAxis = function () { return ({ min: 0, max: 0 }); };
var createBox = function () { return ({
    x: createAxis(),
    y: createAxis(),
}); };



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/geometry/utils.mjs
function isAxisDeltaZero(delta) {
    return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
    return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function boxEquals(a, b) {
    return (a.x.min === b.x.min &&
        a.x.max === b.x.max &&
        a.y.min === b.y.min &&
        a.y.max === b.y.max);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/shared/stack.mjs


var NodeStack = /** @class */ (function () {
    function NodeStack() {
        this.members = [];
    }
    NodeStack.prototype.add = function (node) {
        addUniqueItem(this.members, node);
        node.scheduleRender();
    };
    NodeStack.prototype.remove = function (node) {
        removeItem(this.members, node);
        if (node === this.prevLead) {
            this.prevLead = undefined;
        }
        if (node === this.lead) {
            var prevLead = this.members[this.members.length - 1];
            if (prevLead) {
                this.promote(prevLead);
            }
        }
    };
    NodeStack.prototype.relegate = function (node) {
        var indexOfNode = this.members.findIndex(function (member) { return node === member; });
        if (indexOfNode === 0)
            return false;
        /**
         * Find the next projection node that is present
         */
        var prevLead;
        for (var i = indexOfNode; i >= 0; i--) {
            var member = this.members[i];
            if (member.isPresent !== false) {
                prevLead = member;
                break;
            }
        }
        if (prevLead) {
            this.promote(prevLead);
            return true;
        }
        else {
            return false;
        }
    };
    NodeStack.prototype.promote = function (node, preserveFollowOpacity) {
        var _a;
        var prevLead = this.lead;
        if (node === prevLead)
            return;
        this.prevLead = prevLead;
        this.lead = node;
        node.show();
        if (prevLead) {
            prevLead.instance && prevLead.scheduleRender();
            node.scheduleRender();
            node.resumeFrom = prevLead;
            if (preserveFollowOpacity) {
                node.resumeFrom.preserveOpacity = true;
            }
            if (prevLead.snapshot) {
                node.snapshot = prevLead.snapshot;
                node.snapshot.latestValues =
                    prevLead.animationValues || prevLead.latestValues;
                node.snapshot.isShared = true;
            }
            if ((_a = node.root) === null || _a === void 0 ? void 0 : _a.isUpdating) {
                node.isLayoutDirty = true;
            }
            var crossfade = node.options.crossfade;
            if (crossfade === false) {
                prevLead.hide();
            }
            /**
             * TODO:
             *   - Test border radius when previous node was deleted
             *   - boxShadow mixing
             *   - Shared between element A in scrolled container and element B (scroll stays the same or changes)
             *   - Shared between element A in transformed container and element B (transform stays the same or changes)
             *   - Shared between element A in scrolled page and element B (scroll stays the same or changes)
             * ---
             *   - Crossfade opacity of root nodes
             *   - layoutId changes after animation
             *   - layoutId changes mid animation
             */
        }
    };
    NodeStack.prototype.exitAnimationComplete = function () {
        this.members.forEach(function (node) {
            var _a, _b, _c, _d, _e;
            (_b = (_a = node.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_e = (_c = node.resumingFrom) === null || _c === void 0 ? void 0 : (_d = _c.options).onExitComplete) === null || _e === void 0 ? void 0 : _e.call(_d);
        });
    };
    NodeStack.prototype.scheduleRender = function () {
        this.members.forEach(function (node) {
            node.instance && node.scheduleRender(false);
        });
    };
    /**
     * Clear any leads that have been removed this render to prevent them from being
     * used in future animations and to prevent memory leaks
     */
    NodeStack.prototype.removeLeadSnapshot = function () {
        if (this.lead && this.lead.snapshot) {
            this.lead.snapshot = undefined;
        }
    };
    return NodeStack;
}());



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
    Object.assign(scaleCorrectors, correctors);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/styles/transform.mjs
var identityProjection = "translate3d(0px, 0px, 0) scale(1, 1)";
function buildProjectionTransform(delta, treeScale, latestTransform) {
    /**
     * The translations we use to calculate are always relative to the viewport coordinate space.
     * But when we apply scales, we also scale the coordinate space of an element and its children.
     * For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
     * to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
     */
    var xTranslate = delta.x.translate / treeScale.x;
    var yTranslate = delta.y.translate / treeScale.y;
    var transform = "translate3d(".concat(xTranslate, "px, ").concat(yTranslate, "px, 0) ");
    if (latestTransform) {
        var rotate = latestTransform.rotate, rotateX = latestTransform.rotateX, rotateY = latestTransform.rotateY;
        if (rotate)
            transform += "rotate(".concat(rotate, "deg) ");
        if (rotateX)
            transform += "rotateX(".concat(rotateX, "deg) ");
        if (rotateY)
            transform += "rotateY(".concat(rotateY, "deg) ");
    }
    transform += "scale(".concat(delta.x.scale, ", ").concat(delta.y.scale, ")");
    return transform === identityProjection ? "none" : transform;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs
function eachAxis(callback) {
    return [callback("x"), callback("y")];
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/html/utils/transform.mjs
/**
 * A list of all transformable axes. We'll use this list to generated a version
 * of each axes for each transform.
 */
var transformAxes = ["", "X", "Y", "Z"];
/**
 * An ordered array of each transformable value. By default, transform values
 * will be sorted to this order.
 */
var order = ["translate", "scale", "rotate", "skew"];
/**
 * Generate a list of every possible transform key.
 */
var transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach(function (operationKey) {
    return transformAxes.forEach(function (axesKey) {
        return transformProps.push(operationKey + axesKey);
    });
});
/**
 * A function to use with Array.sort to sort transform keys by their default order.
 */
function sortTransformProps(a, b) {
    return transformProps.indexOf(a) - transformProps.indexOf(b);
}
/**
 * A quick lookup for transform props.
 */
var transformPropSet = new Set(transformProps);
function isTransformProp(key) {
    return transformPropSet.has(key);
}
/**
 * A quick lookup for transform origin props
 */
var transformOriginProps = new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
    return transformOriginProps.has(key);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs
var compareByDepth = function (a, b) {
    return a.depth - b.depth;
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs



var FlatTree = /** @class */ (function () {
    function FlatTree() {
        this.children = [];
        this.isDirty = false;
    }
    FlatTree.prototype.add = function (child) {
        addUniqueItem(this.children, child);
        this.isDirty = true;
    };
    FlatTree.prototype.remove = function (child) {
        removeItem(this.children, child);
        this.isDirty = true;
    };
    FlatTree.prototype.forEach = function (callback) {
        this.isDirty && this.children.sort(compareByDepth);
        this.isDirty = false;
        this.children.forEach(callback);
    };
    return FlatTree;
}());



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs



/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 *
 * @internal
 */
function resolveMotionValue(value) {
    var unwrappedValue = isMotionValue(value) ? value.get() : value;
    return isCustomValue(unwrappedValue)
        ? unwrappedValue.toValue()
        : unwrappedValue;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs






















/**
 * We use 1000 as the animation target as 0-1000 maps better to pixels than 0-1
 * which has a noticeable difference in spring animations
 */
var animationTarget = 1000;
/**
 * This should only ever be modified on the client otherwise it'll
 * persist through server requests. If we need instanced states we
 * could lazy-init via root.
 */
var globalProjectionState = {
    /**
     * Global flag as to whether the tree has animated since the last time
     * we resized the window
     */
    hasAnimatedSinceResize: true,
    /**
     * We set this to true once, on the first update. Any nodes added to the tree beyond that
     * update will be given a `data-projection-id` attribute.
     */
    hasEverUpdated: false,
};
function createProjectionNode(_a) {
    var attachResizeListener = _a.attachResizeListener, defaultParent = _a.defaultParent, measureScroll = _a.measureScroll, resetTransform = _a.resetTransform;
    return /** @class */ (function () {
        function ProjectionNode(id, latestValues, parent) {
            var _this = this;
            if (latestValues === void 0) { latestValues = {}; }
            if (parent === void 0) { parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent(); }
            /**
             * A Set containing all this component's children. This is used to iterate
             * through the children.
             *
             * TODO: This could be faster to iterate as a flat array stored on the root node.
             */
            this.children = new Set();
            /**
             * Options for the node. We use this to configure what kind of layout animations
             * we should perform (if any).
             */
            this.options = {};
            /**
             * We use this to detect when its safe to shut down part of a projection tree.
             * We have to keep projecting children for scale correction and relative projection
             * until all their parents stop performing layout animations.
             */
            this.isTreeAnimating = false;
            this.isAnimationBlocked = false;
            /**
             * Flag to true if we think this layout has been changed. We can't always know this,
             * currently we set it to true every time a component renders, or if it has a layoutDependency
             * if that has changed between renders. Additionally, components can be grouped by LayoutGroup
             * and if one node is dirtied, they all are.
             */
            this.isLayoutDirty = false;
            /**
             * Block layout updates for instant layout transitions throughout the tree.
             */
            this.updateManuallyBlocked = false;
            this.updateBlockedByResize = false;
            /**
             * Set to true between the start of the first `willUpdate` call and the end of the `didUpdate`
             * call.
             */
            this.isUpdating = false;
            /**
             * If this is an SVG element we currently disable projection transforms
             */
            this.isSVG = false;
            /**
             * Flag to true (during promotion) if a node doing an instant layout transition needs to reset
             * its projection styles.
             */
            this.needsReset = false;
            /**
             * Flags whether this node should have its transform reset prior to measuring.
             */
            this.shouldResetTransform = false;
            /**
             * An object representing the calculated contextual/accumulated/tree scale.
             * This will be used to scale calculcated projection transforms, as these are
             * calculated in screen-space but need to be scaled for elements to actually
             * make it to their calculated destinations.
             *
             * TODO: Lazy-init
             */
            this.treeScale = { x: 1, y: 1 };
            /**
             *
             */
            this.eventHandlers = new Map();
            // Note: Currently only running on root node
            this.potentialNodes = new Map();
            this.checkUpdateFailed = function () {
                if (_this.isUpdating) {
                    _this.isUpdating = false;
                    _this.clearAllSnapshots();
                }
            };
            this.updateProjection = function () {
                _this.nodes.forEach(resolveTargetDelta);
                _this.nodes.forEach(calcProjection);
            };
            this.hasProjected = false;
            this.isVisible = true;
            /**
             * Animation
             */
            this.animationProgress = 0;
            /**
             * Shared layout
             */
            // TODO Only running on root node
            this.sharedNodes = new Map();
            this.id = id;
            this.latestValues = latestValues;
            this.root = parent ? parent.root || parent : this;
            this.path = parent ? (0,tslib_es6.__spreadArray)((0,tslib_es6.__spreadArray)([], (0,tslib_es6.__read)(parent.path), false), [parent], false) : [];
            this.parent = parent;
            this.depth = parent ? parent.depth + 1 : 0;
            id && this.root.registerPotentialNode(id, this);
            for (var i = 0; i < this.path.length; i++) {
                this.path[i].shouldResetTransform = true;
            }
            if (this.root === this)
                this.nodes = new FlatTree();
        }
        ProjectionNode.prototype.addEventListener = function (name, handler) {
            if (!this.eventHandlers.has(name)) {
                this.eventHandlers.set(name, new SubscriptionManager());
            }
            return this.eventHandlers.get(name).add(handler);
        };
        ProjectionNode.prototype.notifyListeners = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var subscriptionManager = this.eventHandlers.get(name);
            subscriptionManager === null || subscriptionManager === void 0 ? void 0 : subscriptionManager.notify.apply(subscriptionManager, (0,tslib_es6.__spreadArray)([], (0,tslib_es6.__read)(args), false));
        };
        ProjectionNode.prototype.hasListeners = function (name) {
            return this.eventHandlers.has(name);
        };
        ProjectionNode.prototype.registerPotentialNode = function (id, node) {
            this.potentialNodes.set(id, node);
        };
        /**
         * Lifecycles
         */
        ProjectionNode.prototype.mount = function (instance, isLayoutDirty) {
            var _this = this;
            var _a;
            if (isLayoutDirty === void 0) { isLayoutDirty = false; }
            if (this.instance)
                return;
            this.isSVG =
                instance instanceof SVGElement && instance.tagName !== "svg";
            this.instance = instance;
            var _b = this.options, layoutId = _b.layoutId, layout = _b.layout, visualElement = _b.visualElement;
            if (visualElement && !visualElement.getInstance()) {
                visualElement.mount(instance);
            }
            this.root.nodes.add(this);
            (_a = this.parent) === null || _a === void 0 ? void 0 : _a.children.add(this);
            this.id && this.root.potentialNodes.delete(this.id);
            if (isLayoutDirty && (layout || layoutId)) {
                this.isLayoutDirty = true;
            }
            if (attachResizeListener) {
                var unblockTimeout_1;
                var resizeUnblockUpdate_1 = function () {
                    return (_this.root.updateBlockedByResize = false);
                };
                attachResizeListener(instance, function () {
                    _this.root.updateBlockedByResize = true;
                    clearTimeout(unblockTimeout_1);
                    unblockTimeout_1 = setTimeout(resizeUnblockUpdate_1, 250);
                    if (globalProjectionState.hasAnimatedSinceResize) {
                        globalProjectionState.hasAnimatedSinceResize = false;
                        _this.nodes.forEach(finishAnimation);
                    }
                });
            }
            if (layoutId) {
                this.root.registerSharedNode(layoutId, this);
            }
            // Only register the handler if it requires layout animation
            if (this.options.animate !== false &&
                visualElement &&
                (layoutId || layout)) {
                this.addEventListener("didUpdate", function (_a) {
                    var _b, _c, _d, _e, _f;
                    var delta = _a.delta, hasLayoutChanged = _a.hasLayoutChanged, hasRelativeTargetChanged = _a.hasRelativeTargetChanged, newLayout = _a.layout;
                    if (_this.isTreeAnimationBlocked()) {
                        _this.target = undefined;
                        _this.relativeTarget = undefined;
                        return;
                    }
                    // TODO: Check here if an animation exists
                    var layoutTransition = (_c = (_b = _this.options.transition) !== null && _b !== void 0 ? _b : visualElement.getDefaultTransition()) !== null && _c !== void 0 ? _c : defaultLayoutTransition;
                    var onLayoutAnimationComplete = visualElement.getProps().onLayoutAnimationComplete;
                    /**
                     * The target layout of the element might stay the same,
                     * but its position relative to its parent has changed.
                     */
                    var targetChanged = !_this.targetLayout ||
                        !boxEquals(_this.targetLayout, newLayout) ||
                        hasRelativeTargetChanged;
                    /**
                     * If the layout hasn't seemed to have changed, it might be that the
                     * element is visually in the same place in the document but its position
                     * relative to its parent has indeed changed. So here we check for that.
                     */
                    var hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
                    if (((_d = _this.resumeFrom) === null || _d === void 0 ? void 0 : _d.instance) ||
                        hasOnlyRelativeTargetChanged ||
                        (hasLayoutChanged &&
                            (targetChanged || !_this.currentAnimation))) {
                        if (_this.resumeFrom) {
                            _this.resumingFrom = _this.resumeFrom;
                            _this.resumingFrom.resumingFrom = undefined;
                        }
                        _this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
                        _this.startAnimation((0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, getValueTransition(layoutTransition, "layout")), { onComplete: onLayoutAnimationComplete }));
                    }
                    else {
                        _this.isLead() && ((_f = (_e = _this.options).onExitComplete) === null || _f === void 0 ? void 0 : _f.call(_e));
                    }
                    _this.targetLayout = newLayout;
                });
            }
        };
        ProjectionNode.prototype.unmount = function () {
            var _a, _b;
            this.options.layoutId && this.willUpdate();
            this.root.nodes.remove(this);
            (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.remove(this);
            (_b = this.parent) === null || _b === void 0 ? void 0 : _b.children.delete(this);
            this.instance = undefined;
            cancelSync.preRender(this.updateProjection);
        };
        // only on the root
        ProjectionNode.prototype.blockUpdate = function () {
            this.updateManuallyBlocked = true;
        };
        ProjectionNode.prototype.unblockUpdate = function () {
            this.updateManuallyBlocked = false;
        };
        ProjectionNode.prototype.isUpdateBlocked = function () {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
        };
        ProjectionNode.prototype.isTreeAnimationBlocked = function () {
            var _a;
            return (this.isAnimationBlocked ||
                ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isTreeAnimationBlocked()) ||
                false);
        };
        // Note: currently only running on root node
        ProjectionNode.prototype.startUpdate = function () {
            var _a;
            if (this.isUpdateBlocked())
                return;
            this.isUpdating = true;
            (_a = this.nodes) === null || _a === void 0 ? void 0 : _a.forEach(resetRotation);
        };
        ProjectionNode.prototype.willUpdate = function (shouldNotifyListeners) {
            var _a, _b, _c;
            if (shouldNotifyListeners === void 0) { shouldNotifyListeners = true; }
            if (this.root.isUpdateBlocked()) {
                (_b = (_a = this.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
                return;
            }
            !this.root.isUpdating && this.root.startUpdate();
            if (this.isLayoutDirty)
                return;
            this.isLayoutDirty = true;
            for (var i = 0; i < this.path.length; i++) {
                var node = this.path[i];
                node.shouldResetTransform = true;
                /**
                 * TODO: Check we haven't updated the scroll
                 * since the last didUpdate
                 */
                node.updateScroll();
            }
            var _d = this.options, layoutId = _d.layoutId, layout = _d.layout;
            if (layoutId === undefined && !layout)
                return;
            var transformTemplate = (_c = this.options.visualElement) === null || _c === void 0 ? void 0 : _c.getProps().transformTemplate;
            this.prevTransformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
            this.updateSnapshot();
            shouldNotifyListeners && this.notifyListeners("willUpdate");
        };
        // Note: Currently only running on root node
        ProjectionNode.prototype.didUpdate = function () {
            var updateWasBlocked = this.isUpdateBlocked();
            // When doing an instant transition, we skip the layout update,
            // but should still clean up the measurements so that the next
            // snapshot could be taken correctly.
            if (updateWasBlocked) {
                this.unblockUpdate();
                this.clearAllSnapshots();
                this.nodes.forEach(clearMeasurements);
                return;
            }
            if (!this.isUpdating)
                return;
            this.isUpdating = false;
            /**
             * Search for and mount newly-added projection elements.
             *
             * TODO: Every time a new component is rendered we could search up the tree for
             * the closest mounted node and query from there rather than document.
             */
            if (this.potentialNodes.size) {
                this.potentialNodes.forEach(mountNodeEarly);
                this.potentialNodes.clear();
            }
            /**
             * Write
             */
            this.nodes.forEach(resetTransformStyle);
            /**
             * Read ==================
             */
            // Update layout measurements of updated children
            this.nodes.forEach(updateLayout);
            /**
             * Write
             */
            // Notify listeners that the layout is updated
            this.nodes.forEach(notifyLayoutUpdate);
            this.clearAllSnapshots();
            // Flush any scheduled updates
            flushSync.update();
            flushSync.preRender();
            flushSync.render();
        };
        ProjectionNode.prototype.clearAllSnapshots = function () {
            this.nodes.forEach(clearSnapshot);
            this.sharedNodes.forEach(removeLeadSnapshots);
        };
        ProjectionNode.prototype.scheduleUpdateProjection = function () {
            es.preRender(this.updateProjection, false, true);
        };
        ProjectionNode.prototype.scheduleCheckAfterUnmount = function () {
            var _this = this;
            /**
             * If the unmounting node is in a layoutGroup and did trigger a willUpdate,
             * we manually call didUpdate to give a chance to the siblings to animate.
             * Otherwise, cleanup all snapshots to prevents future nodes from reusing them.
             */
            es.postRender(function () {
                if (_this.isLayoutDirty) {
                    _this.root.didUpdate();
                }
                else {
                    _this.root.checkUpdateFailed();
                }
            });
        };
        /**
         * Update measurements
         */
        ProjectionNode.prototype.updateSnapshot = function () {
            if (this.snapshot || !this.instance)
                return;
            var measured = this.measure();
            var layout = this.removeTransform(this.removeElementScroll(measured));
            roundBox(layout);
            this.snapshot = {
                measured: measured,
                layout: layout,
                latestValues: {},
            };
        };
        ProjectionNode.prototype.updateLayout = function () {
            var _a;
            if (!this.instance)
                return;
            // TODO: Incorporate into a forwarded scroll offset
            this.updateScroll();
            if (!(this.options.alwaysMeasureLayout && this.isLead()) &&
                !this.isLayoutDirty) {
                return;
            }
            /**
             * When a node is mounted, it simply resumes from the prevLead's
             * snapshot instead of taking a new one, but the ancestors scroll
             * might have updated while the prevLead is unmounted. We need to
             * update the scroll again to make sure the layout we measure is
             * up to date.
             */
            if (this.resumeFrom && !this.resumeFrom.instance) {
                for (var i = 0; i < this.path.length; i++) {
                    var node = this.path[i];
                    node.updateScroll();
                }
            }
            var measured = this.measure();
            roundBox(measured);
            var prevLayout = this.layout;
            this.layout = {
                measured: measured,
                actual: this.removeElementScroll(measured),
            };
            this.layoutCorrected = createBox();
            this.isLayoutDirty = false;
            this.projectionDelta = undefined;
            this.notifyListeners("measure", this.layout.actual);
            (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.notifyLayoutMeasure(this.layout.actual, prevLayout === null || prevLayout === void 0 ? void 0 : prevLayout.actual);
        };
        ProjectionNode.prototype.updateScroll = function () {
            if (this.options.layoutScroll && this.instance) {
                this.scroll = measureScroll(this.instance);
            }
        };
        ProjectionNode.prototype.resetTransform = function () {
            var _a;
            if (!resetTransform)
                return;
            var isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
            var hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
            var transformTemplate = (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.getProps().transformTemplate;
            var transformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
            var transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
            if (isResetRequested &&
                (hasProjection ||
                    hasTransform(this.latestValues) ||
                    transformTemplateHasChanged)) {
                resetTransform(this.instance, transformTemplateValue);
                this.shouldResetTransform = false;
                this.scheduleRender();
            }
        };
        ProjectionNode.prototype.measure = function () {
            var visualElement = this.options.visualElement;
            if (!visualElement)
                return createBox();
            var box = visualElement.measureViewportBox();
            // Remove viewport scroll to give page-relative coordinates
            var scroll = this.root.scroll;
            if (scroll) {
                translateAxis(box.x, scroll.x);
                translateAxis(box.y, scroll.y);
            }
            return box;
        };
        ProjectionNode.prototype.removeElementScroll = function (box) {
            var boxWithoutScroll = createBox();
            copyBoxInto(boxWithoutScroll, box);
            /**
             * Performance TODO: Keep a cumulative scroll offset down the tree
             * rather than loop back up the path.
             */
            for (var i = 0; i < this.path.length; i++) {
                var node = this.path[i];
                var scroll_1 = node.scroll, options = node.options;
                if (node !== this.root && scroll_1 && options.layoutScroll) {
                    translateAxis(boxWithoutScroll.x, scroll_1.x);
                    translateAxis(boxWithoutScroll.y, scroll_1.y);
                }
            }
            return boxWithoutScroll;
        };
        ProjectionNode.prototype.applyTransform = function (box, transformOnly) {
            if (transformOnly === void 0) { transformOnly = false; }
            var withTransforms = createBox();
            copyBoxInto(withTransforms, box);
            for (var i = 0; i < this.path.length; i++) {
                var node = this.path[i];
                if (!transformOnly &&
                    node.options.layoutScroll &&
                    node.scroll &&
                    node !== node.root) {
                    transformBox(withTransforms, {
                        x: -node.scroll.x,
                        y: -node.scroll.y,
                    });
                }
                if (!hasTransform(node.latestValues))
                    continue;
                transformBox(withTransforms, node.latestValues);
            }
            if (hasTransform(this.latestValues)) {
                transformBox(withTransforms, this.latestValues);
            }
            return withTransforms;
        };
        ProjectionNode.prototype.removeTransform = function (box) {
            var _a;
            var boxWithoutTransform = createBox();
            copyBoxInto(boxWithoutTransform, box);
            for (var i = 0; i < this.path.length; i++) {
                var node = this.path[i];
                if (!node.instance)
                    continue;
                if (!hasTransform(node.latestValues))
                    continue;
                hasScale(node.latestValues) && node.updateSnapshot();
                var sourceBox = createBox();
                var nodeBox = node.measure();
                copyBoxInto(sourceBox, nodeBox);
                removeBoxTransforms(boxWithoutTransform, node.latestValues, (_a = node.snapshot) === null || _a === void 0 ? void 0 : _a.layout, sourceBox);
            }
            if (hasTransform(this.latestValues)) {
                removeBoxTransforms(boxWithoutTransform, this.latestValues);
            }
            return boxWithoutTransform;
        };
        /**
         *
         */
        ProjectionNode.prototype.setTargetDelta = function (delta) {
            this.targetDelta = delta;
            this.root.scheduleUpdateProjection();
        };
        ProjectionNode.prototype.setOptions = function (options) {
            var _a;
            this.options = (0,tslib_es6.__assign)((0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, this.options), options), { crossfade: (_a = options.crossfade) !== null && _a !== void 0 ? _a : true });
        };
        ProjectionNode.prototype.clearMeasurements = function () {
            this.scroll = undefined;
            this.layout = undefined;
            this.snapshot = undefined;
            this.prevTransformTemplateValue = undefined;
            this.targetDelta = undefined;
            this.target = undefined;
            this.isLayoutDirty = false;
        };
        /**
         * Frame calculations
         */
        ProjectionNode.prototype.resolveTargetDelta = function () {
            var _a;
            var _b = this.options, layout = _b.layout, layoutId = _b.layoutId;
            /**
             * If we have no layout, we can't perform projection, so early return
             */
            if (!this.layout || !(layout || layoutId))
                return;
            /**
             * If we don't have a targetDelta but do have a layout, we can attempt to resolve
             * a relativeParent. This will allow a component to perform scale correction
             * even if no animation has started.
             */
            // TODO If this is unsuccessful this currently happens every frame
            if (!this.targetDelta && !this.relativeTarget) {
                // TODO: This is a semi-repetition of further down this function, make DRY
                this.relativeParent = this.getClosestProjectingParent();
                if (this.relativeParent && this.relativeParent.layout) {
                    this.relativeTarget = createBox();
                    this.relativeTargetOrigin = createBox();
                    calcRelativePosition(this.relativeTargetOrigin, this.layout.actual, this.relativeParent.layout.actual);
                    copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
                }
            }
            /**
             * If we have no relative target or no target delta our target isn't valid
             * for this frame.
             */
            if (!this.relativeTarget && !this.targetDelta)
                return;
            /**
             * Lazy-init target data structure
             */
            if (!this.target) {
                this.target = createBox();
                this.targetWithTransforms = createBox();
            }
            /**
             * If we've got a relative box for this component, resolve it into a target relative to the parent.
             */
            if (this.relativeTarget &&
                this.relativeTargetOrigin &&
                ((_a = this.relativeParent) === null || _a === void 0 ? void 0 : _a.target)) {
                calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
                /**
                 * If we've only got a targetDelta, resolve it into a target
                 */
            }
            else if (this.targetDelta) {
                if (Boolean(this.resumingFrom)) {
                    // TODO: This is creating a new object every frame
                    this.target = this.applyTransform(this.layout.actual);
                }
                else {
                    copyBoxInto(this.target, this.layout.actual);
                }
                applyBoxDelta(this.target, this.targetDelta);
            }
            else {
                /**
                 * If no target, use own layout as target
                 */
                copyBoxInto(this.target, this.layout.actual);
            }
            /**
             * If we've been told to attempt to resolve a relative target, do so.
             */
            if (this.attemptToResolveRelativeTarget) {
                this.attemptToResolveRelativeTarget = false;
                this.relativeParent = this.getClosestProjectingParent();
                if (this.relativeParent &&
                    Boolean(this.relativeParent.resumingFrom) ===
                        Boolean(this.resumingFrom) &&
                    !this.relativeParent.options.layoutScroll &&
                    this.relativeParent.target) {
                    this.relativeTarget = createBox();
                    this.relativeTargetOrigin = createBox();
                    calcRelativePosition(this.relativeTargetOrigin, this.target, this.relativeParent.target);
                    copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
                }
            }
        };
        ProjectionNode.prototype.getClosestProjectingParent = function () {
            if (!this.parent || hasTransform(this.parent.latestValues))
                return undefined;
            if ((this.parent.relativeTarget || this.parent.targetDelta) &&
                this.parent.layout) {
                return this.parent;
            }
            else {
                return this.parent.getClosestProjectingParent();
            }
        };
        ProjectionNode.prototype.calcProjection = function () {
            var _a;
            var _b = this.options, layout = _b.layout, layoutId = _b.layoutId;
            /**
             * If this section of the tree isn't animating we can
             * delete our target sources for the following frame.
             */
            this.isTreeAnimating = Boolean(((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isTreeAnimating) ||
                this.currentAnimation ||
                this.pendingAnimation);
            if (!this.isTreeAnimating) {
                this.targetDelta = this.relativeTarget = undefined;
            }
            if (!this.layout || !(layout || layoutId))
                return;
            var lead = this.getLead();
            /**
             * Reset the corrected box with the latest values from box, as we're then going
             * to perform mutative operations on it.
             */
            copyBoxInto(this.layoutCorrected, this.layout.actual);
            /**
             * Apply all the parent deltas to this box to produce the corrected box. This
             * is the layout box, as it will appear on screen as a result of the transforms of its parents.
             */
            applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, Boolean(this.resumingFrom) || this !== lead);
            var target = lead.target;
            if (!target)
                return;
            if (!this.projectionDelta) {
                this.projectionDelta = createDelta();
                this.projectionDeltaWithTransform = createDelta();
            }
            var prevTreeScaleX = this.treeScale.x;
            var prevTreeScaleY = this.treeScale.y;
            var prevProjectionTransform = this.projectionTransform;
            /**
             * Update the delta between the corrected box and the target box before user-set transforms were applied.
             * This will allow us to calculate the corrected borderRadius and boxShadow to compensate
             * for our layout reprojection, but still allow them to be scaled correctly by the user.
             * It might be that to simplify this we may want to accept that user-set scale is also corrected
             * and we wouldn't have to keep and calc both deltas, OR we could support a user setting
             * to allow people to choose whether these styles are corrected based on just the
             * layout reprojection or the final bounding box.
             */
            calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
            this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
            if (this.projectionTransform !== prevProjectionTransform ||
                this.treeScale.x !== prevTreeScaleX ||
                this.treeScale.y !== prevTreeScaleY) {
                this.hasProjected = true;
                this.scheduleRender();
                this.notifyListeners("projectionUpdate", target);
            }
        };
        ProjectionNode.prototype.hide = function () {
            this.isVisible = false;
            // TODO: Schedule render
        };
        ProjectionNode.prototype.show = function () {
            this.isVisible = true;
            // TODO: Schedule render
        };
        ProjectionNode.prototype.scheduleRender = function (notifyAll) {
            var _a, _b, _c;
            if (notifyAll === void 0) { notifyAll = true; }
            (_b = (_a = this.options).scheduleRender) === null || _b === void 0 ? void 0 : _b.call(_a);
            notifyAll && ((_c = this.getStack()) === null || _c === void 0 ? void 0 : _c.scheduleRender());
            if (this.resumingFrom && !this.resumingFrom.instance) {
                this.resumingFrom = undefined;
            }
        };
        ProjectionNode.prototype.setAnimationOrigin = function (delta, hasOnlyRelativeTargetChanged) {
            var _this = this;
            var _a;
            if (hasOnlyRelativeTargetChanged === void 0) { hasOnlyRelativeTargetChanged = false; }
            var snapshot = this.snapshot;
            var snapshotLatestValues = (snapshot === null || snapshot === void 0 ? void 0 : snapshot.latestValues) || {};
            var mixedValues = (0,tslib_es6.__assign)({}, this.latestValues);
            var targetDelta = createDelta();
            this.relativeTarget = this.relativeTargetOrigin = undefined;
            this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
            var relativeLayout = createBox();
            var isSharedLayoutAnimation = snapshot === null || snapshot === void 0 ? void 0 : snapshot.isShared;
            var isOnlyMember = (((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.members.length) || 0) <= 1;
            var shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation &&
                !isOnlyMember &&
                this.options.crossfade === true &&
                !this.path.some(hasOpacityCrossfade));
            this.mixTargetDelta = function (latest) {
                var _a;
                var progress = latest / 1000;
                mixAxisDelta(targetDelta.x, delta.x, progress);
                mixAxisDelta(targetDelta.y, delta.y, progress);
                _this.setTargetDelta(targetDelta);
                if (_this.relativeTarget &&
                    _this.relativeTargetOrigin &&
                    _this.layout &&
                    ((_a = _this.relativeParent) === null || _a === void 0 ? void 0 : _a.layout)) {
                    calcRelativePosition(relativeLayout, _this.layout.actual, _this.relativeParent.layout.actual);
                    mixBox(_this.relativeTarget, _this.relativeTargetOrigin, relativeLayout, progress);
                }
                if (isSharedLayoutAnimation) {
                    _this.animationValues = mixedValues;
                    mixValues(mixedValues, snapshotLatestValues, _this.latestValues, progress, shouldCrossfadeOpacity, isOnlyMember);
                }
                _this.root.scheduleUpdateProjection();
                _this.scheduleRender();
            };
            this.mixTargetDelta(0);
        };
        ProjectionNode.prototype.startAnimation = function (options) {
            var _this = this;
            var _a, _b;
            (_a = this.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
            if (this.resumingFrom) {
                (_b = this.resumingFrom.currentAnimation) === null || _b === void 0 ? void 0 : _b.stop();
            }
            if (this.pendingAnimation) {
                cancelSync.update(this.pendingAnimation);
                this.pendingAnimation = undefined;
            }
            /**
             * Start the animation in the next frame to have a frame with progress 0,
             * where the target is the same as when the animation started, so we can
             * calculate the relative positions correctly for instant transitions.
             */
            this.pendingAnimation = es.update(function () {
                globalProjectionState.hasAnimatedSinceResize = true;
                _this.currentAnimation = animate_animate(0, animationTarget, (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, options), { onUpdate: function (latest) {
                        var _a;
                        _this.mixTargetDelta(latest);
                        (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, latest);
                    }, onComplete: function () {
                        var _a;
                        (_a = options.onComplete) === null || _a === void 0 ? void 0 : _a.call(options);
                        _this.completeAnimation();
                    } }));
                if (_this.resumingFrom) {
                    _this.resumingFrom.currentAnimation = _this.currentAnimation;
                }
                _this.pendingAnimation = undefined;
            });
        };
        ProjectionNode.prototype.completeAnimation = function () {
            var _a;
            if (this.resumingFrom) {
                this.resumingFrom.currentAnimation = undefined;
                this.resumingFrom.preserveOpacity = undefined;
            }
            (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.exitAnimationComplete();
            this.resumingFrom =
                this.currentAnimation =
                    this.animationValues =
                        undefined;
            this.notifyListeners("animationComplete");
        };
        ProjectionNode.prototype.finishAnimation = function () {
            var _a;
            if (this.currentAnimation) {
                (_a = this.mixTargetDelta) === null || _a === void 0 ? void 0 : _a.call(this, animationTarget);
                this.currentAnimation.stop();
            }
            this.completeAnimation();
        };
        ProjectionNode.prototype.applyTransformsToTarget = function () {
            var _a = this.getLead(), targetWithTransforms = _a.targetWithTransforms, target = _a.target, layout = _a.layout, latestValues = _a.latestValues;
            if (!targetWithTransforms || !target || !layout)
                return;
            copyBoxInto(targetWithTransforms, target);
            /**
             * Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
             * This is the final box that we will then project into by calculating a transform delta and
             * applying it to the corrected box.
             */
            transformBox(targetWithTransforms, latestValues);
            /**
             * Update the delta between the corrected box and the final target box, after
             * user-set transforms are applied to it. This will be used by the renderer to
             * create a transform style that will reproject the element from its actual layout
             * into the desired bounding box.
             */
            calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
        };
        ProjectionNode.prototype.registerSharedNode = function (layoutId, node) {
            var _a, _b, _c;
            if (!this.sharedNodes.has(layoutId)) {
                this.sharedNodes.set(layoutId, new NodeStack());
            }
            var stack = this.sharedNodes.get(layoutId);
            stack.add(node);
            node.promote({
                transition: (_a = node.options.initialPromotionConfig) === null || _a === void 0 ? void 0 : _a.transition,
                preserveFollowOpacity: (_c = (_b = node.options.initialPromotionConfig) === null || _b === void 0 ? void 0 : _b.shouldPreserveFollowOpacity) === null || _c === void 0 ? void 0 : _c.call(_b, node),
            });
        };
        ProjectionNode.prototype.isLead = function () {
            var stack = this.getStack();
            return stack ? stack.lead === this : true;
        };
        ProjectionNode.prototype.getLead = function () {
            var _a;
            var layoutId = this.options.layoutId;
            return layoutId ? ((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.lead) || this : this;
        };
        ProjectionNode.prototype.getPrevLead = function () {
            var _a;
            var layoutId = this.options.layoutId;
            return layoutId ? (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.prevLead : undefined;
        };
        ProjectionNode.prototype.getStack = function () {
            var layoutId = this.options.layoutId;
            if (layoutId)
                return this.root.sharedNodes.get(layoutId);
        };
        ProjectionNode.prototype.promote = function (_a) {
            var _b = _a === void 0 ? {} : _a, needsReset = _b.needsReset, transition = _b.transition, preserveFollowOpacity = _b.preserveFollowOpacity;
            var stack = this.getStack();
            if (stack)
                stack.promote(this, preserveFollowOpacity);
            if (needsReset) {
                this.projectionDelta = undefined;
                this.needsReset = true;
            }
            if (transition)
                this.setOptions({ transition: transition });
        };
        ProjectionNode.prototype.relegate = function () {
            var stack = this.getStack();
            if (stack) {
                return stack.relegate(this);
            }
            else {
                return false;
            }
        };
        ProjectionNode.prototype.resetRotation = function () {
            var visualElement = this.options.visualElement;
            if (!visualElement)
                return;
            // If there's no detected rotation values, we can early return without a forced render.
            var hasRotate = false;
            // Keep a record of all the values we've reset
            var resetValues = {};
            // Check the rotate value of all axes and reset to 0
            for (var i = 0; i < transformAxes.length; i++) {
                var axis = transformAxes[i];
                var key = "rotate" + axis;
                // If this rotation doesn't exist as a motion value, then we don't
                // need to reset it
                if (!visualElement.getStaticValue(key)) {
                    continue;
                }
                hasRotate = true;
                // Record the rotation and then temporarily set it to 0
                resetValues[key] = visualElement.getStaticValue(key);
                visualElement.setStaticValue(key, 0);
            }
            // If there's no rotation values, we don't need to do any more.
            if (!hasRotate)
                return;
            // Force a render of this element to apply the transform with all rotations
            // set to 0.
            visualElement === null || visualElement === void 0 ? void 0 : visualElement.syncRender();
            // Put back all the values we reset
            for (var key in resetValues) {
                visualElement.setStaticValue(key, resetValues[key]);
            }
            // Schedule a render for the next frame. This ensures we won't visually
            // see the element with the reset rotate value applied.
            visualElement.scheduleRender();
        };
        ProjectionNode.prototype.getProjectionStyles = function (styleProp) {
            var _a, _b, _c, _d, _e, _f;
            if (styleProp === void 0) { styleProp = {}; }
            // TODO: Return lifecycle-persistent object
            var styles = {};
            if (!this.instance || this.isSVG)
                return styles;
            if (!this.isVisible) {
                return { visibility: "hidden" };
            }
            else {
                styles.visibility = "";
            }
            var transformTemplate = (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.getProps().transformTemplate;
            if (this.needsReset) {
                this.needsReset = false;
                styles.opacity = "";
                styles.pointerEvents =
                    resolveMotionValue(styleProp.pointerEvents) || "";
                styles.transform = transformTemplate
                    ? transformTemplate(this.latestValues, "")
                    : "none";
                return styles;
            }
            var lead = this.getLead();
            if (!this.projectionDelta || !this.layout || !lead.target) {
                var emptyStyles = {};
                if (this.options.layoutId) {
                    emptyStyles.opacity = (_b = this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1;
                    emptyStyles.pointerEvents =
                        resolveMotionValue(styleProp.pointerEvents) || "";
                }
                if (this.hasProjected && !hasTransform(this.latestValues)) {
                    emptyStyles.transform = transformTemplate
                        ? transformTemplate({}, "")
                        : "none";
                    this.hasProjected = false;
                }
                return emptyStyles;
            }
            var valuesToRender = lead.animationValues || lead.latestValues;
            this.applyTransformsToTarget();
            styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
            if (transformTemplate) {
                styles.transform = transformTemplate(valuesToRender, styles.transform);
            }
            var _g = this.projectionDelta, x = _g.x, y = _g.y;
            styles.transformOrigin = "".concat(x.origin * 100, "% ").concat(y.origin * 100, "% 0");
            if (lead.animationValues) {
                /**
                 * If the lead component is animating, assign this either the entering/leaving
                 * opacity
                 */
                styles.opacity =
                    lead === this
                        ? (_d = (_c = valuesToRender.opacity) !== null && _c !== void 0 ? _c : this.latestValues.opacity) !== null && _d !== void 0 ? _d : 1
                        : this.preserveOpacity
                            ? this.latestValues.opacity
                            : valuesToRender.opacityExit;
            }
            else {
                /**
                 * Or we're not animating at all, set the lead component to its actual
                 * opacity and other components to hidden.
                 */
                styles.opacity =
                    lead === this
                        ? (_e = valuesToRender.opacity) !== null && _e !== void 0 ? _e : ""
                        : (_f = valuesToRender.opacityExit) !== null && _f !== void 0 ? _f : 0;
            }
            /**
             * Apply scale correction
             */
            for (var key in scaleCorrectors) {
                if (valuesToRender[key] === undefined)
                    continue;
                var _h = scaleCorrectors[key], correct = _h.correct, applyTo = _h.applyTo;
                var corrected = correct(valuesToRender[key], lead);
                if (applyTo) {
                    var num = applyTo.length;
                    for (var i = 0; i < num; i++) {
                        styles[applyTo[i]] = corrected;
                    }
                }
                else {
                    styles[key] = corrected;
                }
            }
            /**
             * Disable pointer events on follow components. This is to ensure
             * that if a follow component covers a lead component it doesn't block
             * pointer events on the lead.
             */
            if (this.options.layoutId) {
                styles.pointerEvents =
                    lead === this
                        ? resolveMotionValue(styleProp.pointerEvents) || ""
                        : "none";
            }
            return styles;
        };
        ProjectionNode.prototype.clearSnapshot = function () {
            this.resumeFrom = this.snapshot = undefined;
        };
        // Only run on root
        ProjectionNode.prototype.resetTree = function () {
            this.root.nodes.forEach(function (node) { var _a; return (_a = node.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop(); });
            this.root.nodes.forEach(clearMeasurements);
            this.root.sharedNodes.clear();
        };
        return ProjectionNode;
    }());
}
function updateLayout(node) {
    node.updateLayout();
}
function notifyLayoutUpdate(node) {
    var _a, _b, _c, _d;
    var snapshot = (_b = (_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) !== null && _b !== void 0 ? _b : node.snapshot;
    if (node.isLead() &&
        node.layout &&
        snapshot &&
        node.hasListeners("didUpdate")) {
        var _e = node.layout, layout_1 = _e.actual, measuredLayout = _e.measured;
        // TODO Maybe we want to also resize the layout snapshot so we don't trigger
        // animations for instance if layout="size" and an element has only changed position
        if (node.options.animationType === "size") {
            eachAxis(function (axis) {
                var axisSnapshot = snapshot.isShared
                    ? snapshot.measured[axis]
                    : snapshot.layout[axis];
                var length = calcLength(axisSnapshot);
                axisSnapshot.min = layout_1[axis].min;
                axisSnapshot.max = axisSnapshot.min + length;
            });
        }
        else if (node.options.animationType === "position") {
            eachAxis(function (axis) {
                var axisSnapshot = snapshot.isShared
                    ? snapshot.measured[axis]
                    : snapshot.layout[axis];
                var length = calcLength(layout_1[axis]);
                axisSnapshot.max = axisSnapshot.min + length;
            });
        }
        var layoutDelta = createDelta();
        calcBoxDelta(layoutDelta, layout_1, snapshot.layout);
        var visualDelta = createDelta();
        if (snapshot.isShared) {
            calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measured);
        }
        else {
            calcBoxDelta(visualDelta, layout_1, snapshot.layout);
        }
        var hasLayoutChanged = !isDeltaZero(layoutDelta);
        var hasRelativeTargetChanged = false;
        if (!node.resumeFrom) {
            node.relativeParent = node.getClosestProjectingParent();
            /**
             * If the relativeParent is itself resuming from a different element then
             * the relative snapshot is not relavent
             */
            if (node.relativeParent && !node.relativeParent.resumeFrom) {
                var _f = node.relativeParent, parentSnapshot = _f.snapshot, parentLayout = _f.layout;
                if (parentSnapshot && parentLayout) {
                    var relativeSnapshot = createBox();
                    calcRelativePosition(relativeSnapshot, snapshot.layout, parentSnapshot.layout);
                    var relativeLayout = createBox();
                    calcRelativePosition(relativeLayout, layout_1, parentLayout.actual);
                    if (!boxEquals(relativeSnapshot, relativeLayout)) {
                        hasRelativeTargetChanged = true;
                    }
                }
            }
        }
        node.notifyListeners("didUpdate", {
            layout: layout_1,
            snapshot: snapshot,
            delta: visualDelta,
            layoutDelta: layoutDelta,
            hasLayoutChanged: hasLayoutChanged,
            hasRelativeTargetChanged: hasRelativeTargetChanged,
        });
    }
    else if (node.isLead()) {
        (_d = (_c = node.options).onExitComplete) === null || _d === void 0 ? void 0 : _d.call(_c);
    }
    /**
     * Clearing transition
     * TODO: Investigate why this transition is being passed in as {type: false } from Framer
     * and why we need it at all
     */
    node.options.transition = undefined;
}
function clearSnapshot(node) {
    node.clearSnapshot();
}
function clearMeasurements(node) {
    node.clearMeasurements();
}
function resetTransformStyle(node) {
    node.resetTransform();
}
function finishAnimation(node) {
    node.finishAnimation();
    node.targetDelta = node.relativeTarget = node.target = undefined;
}
function resolveTargetDelta(node) {
    node.resolveTargetDelta();
}
function calcProjection(node) {
    node.calcProjection();
}
function resetRotation(node) {
    node.resetRotation();
}
function removeLeadSnapshots(stack) {
    stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p) {
    output.translate = mix(delta.translate, 0, p);
    output.scale = mix(delta.scale, 1, p);
    output.origin = delta.origin;
    output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
    output.min = mix(from.min, to.min, p);
    output.max = mix(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
    mixAxis(output.x, from.x, to.x, p);
    mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
    return (node.animationValues && node.animationValues.opacityExit !== undefined);
}
var defaultLayoutTransition = {
    duration: 0.45,
    ease: [0.4, 0, 0.1, 1],
};
function mountNodeEarly(node, id) {
    /**
     * Rather than searching the DOM from document we can search the
     * path for the deepest mounted ancestor and search from there
     */
    var searchNode = node.root;
    for (var i = node.path.length - 1; i >= 0; i--) {
        if (Boolean(node.path[i].instance)) {
            searchNode = node.path[i];
            break;
        }
    }
    var searchElement = searchNode && searchNode !== node.root ? searchNode.instance : document;
    var element = searchElement.querySelector("[data-projection-id=\"".concat(id, "\"]"));
    if (element)
        node.mount(element, true);
}
function roundAxis(axis) {
    axis.min = Math.round(axis.min);
    axis.max = Math.round(axis.max);
}
function roundBox(box) {
    roundAxis(box.x);
    roundAxis(box.y);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/node/id.mjs



var id = 1;
function useProjectionId() {
    return useConstant(function () {
        if (globalProjectionState.hasEverUpdated) {
            return id++;
        }
    });
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs


/**
 * @internal
 */
var LayoutGroupContext = (0,react.createContext)({});



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs


/**
 * @internal
 */
var SwitchLayoutGroupContext = (0,react.createContext)({});



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/features/use-projection.mjs




function useProjection(projectionId, _a, visualElement, ProjectionNodeConstructor) {
    var _b;
    var layoutId = _a.layoutId, layout = _a.layout, drag = _a.drag, dragConstraints = _a.dragConstraints, layoutScroll = _a.layoutScroll;
    var initialPromotionConfig = (0,react.useContext)(SwitchLayoutGroupContext);
    if (!ProjectionNodeConstructor ||
        !visualElement ||
        (visualElement === null || visualElement === void 0 ? void 0 : visualElement.projection)) {
        return;
    }
    visualElement.projection = new ProjectionNodeConstructor(projectionId, visualElement.getLatestValues(), (_b = visualElement.parent) === null || _b === void 0 ? void 0 : _b.projection);
    visualElement.projection.setOptions({
        layoutId: layoutId,
        layout: layout,
        alwaysMeasureLayout: Boolean(drag) || (dragConstraints && isRefObject(dragConstraints)),
        visualElement: visualElement,
        scheduleRender: function () { return visualElement.scheduleRender(); },
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */
        animationType: typeof layout === "string" ? layout : "both",
        initialPromotionConfig: initialPromotionConfig,
        layoutScroll: layoutScroll,
    });
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/utils/VisualElementHandler.mjs



var VisualElementHandler = /** @class */ (function (_super) {
    (0,tslib_es6.__extends)(VisualElementHandler, _super);
    function VisualElementHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Update visual element props as soon as we know this update is going to be commited.
     */
    VisualElementHandler.prototype.getSnapshotBeforeUpdate = function () {
        this.updateProps();
        return null;
    };
    VisualElementHandler.prototype.componentDidUpdate = function () { };
    VisualElementHandler.prototype.updateProps = function () {
        var _a = this.props, visualElement = _a.visualElement, props = _a.props;
        if (visualElement)
            visualElement.setProps(props);
    };
    VisualElementHandler.prototype.render = function () {
        return this.props.children;
    };
    return VisualElementHandler;
}(react.Component));



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/index.mjs
















/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 *
 * @internal
 */
function motion_createMotionComponent(_a) {
    var preloadedFeatures = _a.preloadedFeatures, createVisualElement = _a.createVisualElement, projectionNodeConstructor = _a.projectionNodeConstructor, useRender = _a.useRender, useVisualState = _a.useVisualState, Component = _a.Component;
    preloadedFeatures && loadFeatures(preloadedFeatures);
    function MotionComponent(props, externalRef) {
        var layoutId = useLayoutId(props);
        props = (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, props), { layoutId: layoutId });
        /**
         * If we're rendering in a static environment, we only visually update the component
         * as a result of a React-rerender rather than interactions or animations. This
         * means we don't need to load additional memory structures like VisualElement,
         * or any gesture/animation features.
         */
        var config = (0,react.useContext)(MotionConfigContext);
        var features = null;
        var context = useCreateMotionContext(props);
        /**
         * Create a unique projection ID for this component. If a new component is added
         * during a layout animation we'll use this to query the DOM and hydrate its ref early, allowing
         * us to measure it as soon as any layout effect flushes pending layout animations.
         *
         * Performance note: It'd be better not to have to search the DOM for these elements.
         * For newly-entering components it could be enough to only correct treeScale, in which
         * case we could mount in a scale-correction mode. This wouldn't be enough for
         * shared element transitions however. Perhaps for those we could revert to a root node
         * that gets forceRendered and layout animations are triggered on its layout effect.
         */
        var projectionId = config.isStatic ? undefined : useProjectionId();
        /**
         *
         */
        var visualState = useVisualState(props, config.isStatic);
        if (!config.isStatic && isBrowser) {
            /**
             * Create a VisualElement for this component. A VisualElement provides a common
             * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
             * providing a way of rendering to these APIs outside of the React render loop
             * for more performant animations and interactions
             */
            context.visualElement = useVisualElement(Component, visualState, (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, config), props), createVisualElement);
            useProjection(projectionId, props, context.visualElement, projectionNodeConstructor ||
                featureDefinitions.projectionNodeConstructor);
            /**
             * Load Motion gesture and animation features. These are rendered as renderless
             * components so each feature can optionally make use of React lifecycle methods.
             */
            features = useFeatures(props, context.visualElement, preloadedFeatures);
        }
        /**
         * The mount order and hierarchy is specific to ensure our element ref
         * is hydrated by the time features fire their effects.
         */
        return (react.createElement(VisualElementHandler, { visualElement: context.visualElement, props: (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, config), props) },
            features,
            react.createElement(MotionContext.Provider, { value: context }, useRender(Component, props, projectionId, useMotionRef(visualState, context.visualElement, externalRef), visualState, config.isStatic, context.visualElement))));
    }
    return (0,react.forwardRef)(MotionComponent);
}
function useLayoutId(_a) {
    var _b;
    var layoutId = _a.layoutId;
    var layoutGroupId = (_b = (0,react.useContext)(LayoutGroupContext)) === null || _b === void 0 ? void 0 : _b.id;
    return layoutGroupId && layoutId !== undefined
        ? layoutGroupId + "-" + layoutId
        : layoutId;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/motion-proxy.mjs


/**
 * Convert any React component into a `motion` component. The provided component
 * **must** use `React.forwardRef` to the underlying DOM component you want to animate.
 *
 * ```jsx
 * const Component = React.forwardRef((props, ref) => {
 *   return <div ref={ref} />
 * })
 *
 * const MotionComponent = motion(Component)
 * ```
 *
 * @public
 */
function createMotionProxy(createConfig) {
    function custom(Component, customMotionComponentConfig) {
        if (customMotionComponentConfig === void 0) { customMotionComponentConfig = {}; }
        return motion_createMotionComponent(createConfig(Component, customMotionComponentConfig));
    }
    if (typeof Proxy === "undefined") {
        return custom;
    }
    /**
     * A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
     * Rather than generating them anew every render.
     */
    var componentCache = new Map();
    return new Proxy(custom, {
        /**
         * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
         * The prop name is passed through as `key` and we can use that to generate a `motion`
         * DOM component with that name.
         */
        get: function (_target, key) {
            /**
             * If this element doesn't exist in the component cache, create it and cache.
             */
            if (!componentCache.has(key)) {
                componentCache.set(key, custom(key));
            }
            return componentCache.get(key);
        },
    });
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
/**
 * We keep these listed seperately as we use the lowercase tag names as part
 * of the runtime bundle to detect SVG components
 */
var lowercaseSVGElements = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "svg",
    "switch",
    "symbol",
    "text",
    "tspan",
    "use",
    "view",
];



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs


function isSVGComponent(Component) {
    if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component !== "string" ||
        /**
         * If it contains a dash, the element is a custom HTML webcomponent.
         */
        Component.includes("-")) {
        return false;
    }
    else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    lowercaseSVGElements.indexOf(Component) > -1 ||
        /**
         * If it contains a capital letter, it's an SVG component
         */
        /[A-Z]/.test(Component)) {
        return true;
    }
    return false;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs



function isForcedMotionValue(key, _a) {
    var layout = _a.layout, layoutId = _a.layoutId;
    return (isTransformProp(key) ||
        isTransformOriginProp(key) ||
        ((layout || layoutId !== undefined) &&
            (!!scaleCorrectors[key] || key === "opacity")));
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs


var translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
};
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */
function buildTransform(_a, _b, transformIsDefault, transformTemplate) {
    var transform = _a.transform, transformKeys = _a.transformKeys;
    var _c = _b.enableHardwareAcceleration, enableHardwareAcceleration = _c === void 0 ? true : _c, _d = _b.allowTransformNone, allowTransformNone = _d === void 0 ? true : _d;
    // The transform string we're going to build into.
    var transformString = "";
    // Transform keys into their default order - this will determine the output order.
    transformKeys.sort(sortTransformProps);
    // Track whether the defined transform has a defined z so we don't add a
    // second to enable hardware acceleration
    var transformHasZ = false;
    // Loop over each transform and build them into transformString
    var numTransformKeys = transformKeys.length;
    for (var i = 0; i < numTransformKeys; i++) {
        var key = transformKeys[i];
        transformString += "".concat(translateAlias[key] || key, "(").concat(transform[key], ") ");
        if (key === "z")
            transformHasZ = true;
    }
    if (!transformHasZ && enableHardwareAcceleration) {
        transformString += "translateZ(0)";
    }
    else {
        transformString = transformString.trim();
    }
    // If we have a custom `transform` template, pass our transform values and
    // generated transformString to that before returning
    if (transformTemplate) {
        transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    }
    else if (allowTransformNone && transformIsDefault) {
        transformString = "none";
    }
    return transformString;
}
/**
 * Build a transformOrigin style. Uses the same defaults as the browser for
 * undefined origins.
 */
function buildTransformOrigin(_a) {
    var _b = _a.originX, originX = _b === void 0 ? "50%" : _b, _c = _a.originY, originY = _c === void 0 ? "50%" : _c, _d = _a.originZ, originZ = _d === void 0 ? 0 : _d;
    return "".concat(originX, " ").concat(originY, " ").concat(originZ);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs
/**
 * Returns true if the provided key is a CSS variable
 */
function isCSSVariable(key) {
    return key.startsWith("--");
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs
/**
 * Provided a value and a ValueType, returns the value as that value type.
 */
var getValueAsType = function (value, type) {
    return type && typeof value === "number"
        ? type.transform(value)
        : value;
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs






function buildHTMLStyles(state, latestValues, options, transformTemplate) {
    var _a;
    var style = state.style, vars = state.vars, transform = state.transform, transformKeys = state.transformKeys, transformOrigin = state.transformOrigin;
    // Empty the transformKeys array. As we're throwing out refs to its items
    // this might not be as cheap as suspected. Maybe using the array as a buffer
    // with a manual incrementation would be better.
    transformKeys.length = 0;
    // Track whether we encounter any transform or transformOrigin values.
    var hasTransform = false;
    var hasTransformOrigin = false;
    // Does the calculated transform essentially equal "none"?
    var transformIsNone = true;
    /**
     * Loop over all our latest animated values and decide whether to handle them
     * as a style or CSS variable.
     *
     * Transforms and transform origins are kept seperately for further processing.
     */
    for (var key in latestValues) {
        var value = latestValues[key];
        /**
         * If this is a CSS variable we don't do any further processing.
         */
        if (isCSSVariable(key)) {
            vars[key] = value;
            continue;
        }
        // Convert the value to its default value type, ie 0 -> "0px"
        var valueType = numberValueTypes[key];
        var valueAsType = getValueAsType(value, valueType);
        if (isTransformProp(key)) {
            // If this is a transform, flag to enable further transform processing
            hasTransform = true;
            transform[key] = valueAsType;
            transformKeys.push(key);
            // If we already know we have a non-default transform, early return
            if (!transformIsNone)
                continue;
            // Otherwise check to see if this is a default transform
            if (value !== ((_a = valueType.default) !== null && _a !== void 0 ? _a : 0))
                transformIsNone = false;
        }
        else if (isTransformOriginProp(key)) {
            transformOrigin[key] = valueAsType;
            // If this is a transform origin, flag and enable further transform-origin processing
            hasTransformOrigin = true;
        }
        else {
            style[key] = valueAsType;
        }
    }
    if (hasTransform) {
        style.transform = buildTransform(state, options, transformIsNone, transformTemplate);
    }
    else if (transformTemplate) {
        style.transform = transformTemplate({}, "");
    }
    else if (!latestValues.transform && style.transform) {
        style.transform = "none";
    }
    if (hasTransformOrigin) {
        style.transformOrigin = buildTransformOrigin(transformOrigin);
    }
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
var createHtmlRenderState = function () { return ({
    style: {},
    transform: {},
    transformKeys: [],
    transformOrigin: {},
    vars: {},
}); };



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/html/use-props.mjs







function copyRawValuesOnly(target, source, props) {
    for (var key in source) {
        if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
            target[key] = source[key];
        }
    }
}
function useInitialMotionValues(_a, visualState, isStatic) {
    var transformTemplate = _a.transformTemplate;
    return (0,react.useMemo)(function () {
        var state = createHtmlRenderState();
        buildHTMLStyles(state, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate);
        var vars = state.vars, style = state.style;
        return (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, vars), style);
    }, [visualState]);
}
function useStyle(props, visualState, isStatic) {
    var styleProp = props.style || {};
    var style = {};
    /**
     * Copy non-Motion Values straight into style
     */
    copyRawValuesOnly(style, styleProp, props);
    Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
    if (props.transformValues) {
        style = props.transformValues(style);
    }
    return style;
}
function useHTMLProps(props, visualState, isStatic) {
    // The `any` isn't ideal but it is the type of createElement props argument
    var htmlProps = {};
    var style = useStyle(props, visualState, isStatic);
    if (Boolean(props.drag) && props.dragListener !== false) {
        // Disable the ghost element when a user drags
        htmlProps.draggable = false;
        // Disable text selection
        style.userSelect =
            style.WebkitUserSelect =
                style.WebkitTouchCallout =
                    "none";
        // Disable scrolling on the draggable direction
        style.touchAction =
            props.drag === true
                ? "none"
                : "pan-".concat(props.drag === "x" ? "y" : "x");
    }
    htmlProps.style = style;
    return htmlProps;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
/**
 * A list of all valid MotionProps.
 *
 * @internalremarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */
var validMotionProps = new Set([
    "initial",
    "animate",
    "exit",
    "style",
    "variants",
    "transition",
    "transformTemplate",
    "transformValues",
    "custom",
    "inherit",
    "layout",
    "layoutId",
    "layoutDependency",
    "onLayoutAnimationComplete",
    "onLayoutMeasure",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "drag",
    "dragControls",
    "dragListener",
    "dragConstraints",
    "dragDirectionLock",
    "dragSnapToOrigin",
    "_dragX",
    "_dragY",
    "dragElastic",
    "dragMomentum",
    "dragPropagation",
    "dragTransition",
    "whileDrag",
    "onPan",
    "onPanStart",
    "onPanEnd",
    "onPanSessionStart",
    "onTap",
    "onTapStart",
    "onTapCancel",
    "onHoverStart",
    "onHoverEnd",
    "whileFocus",
    "whileTap",
    "whileHover",
    "whileInView",
    "onViewportEnter",
    "onViewportLeave",
    "viewport",
    "layoutScroll",
]);
/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */
function isValidMotionProp(key) {
    return validMotionProps.has(key);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs


var shouldForward = function (key) { return !isValidMotionProp(key); };
function loadExternalIsValidProp(isValidProp) {
    if (!isValidProp)
        return;
    // Explicitly filter our events
    shouldForward = function (key) {
        return key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
    };
}
/**
 * Emotion and Styled Components both allow users to pass through arbitrary props to their components
 * to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
 * of these should be passed to the underlying DOM node.
 *
 * However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
 * as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
 * passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
 * `@emotion/is-prop-valid`, however to fix this problem we need to use it.
 *
 * By making it an optionalDependency we can offer this functionality only in the situations where it's
 * actually required.
 */
try {
    /**
     * We attempt to import this package but require won't be defined in esm environments, in that case
     * isPropValid will have to be provided via `MotionContext`. In a 6.0.0 this should probably be removed
     * in favour of explicit injection.
     */
    loadExternalIsValidProp(require("@emotion/is-prop-valid").default);
}
catch (_a) {
    // We don't need to actually do anything here - the fallback is the existing `isPropValid`.
}
function filterProps(props, isDom, forwardMotionProps) {
    var filteredProps = {};
    for (var key in props) {
        if (shouldForward(key) ||
            (forwardMotionProps === true && isValidMotionProp(key)) ||
            (!isDom && !isValidMotionProp(key)) ||
            // If trying to use native HTML drag events, forward drag listeners
            (props["draggable"] && key.startsWith("onDrag"))) {
            filteredProps[key] = props[key];
        }
    }
    return filteredProps;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs


function calcOrigin(origin, offset, size) {
    return typeof origin === "string"
        ? origin
        : px.transform(offset + size * origin);
}
/**
 * The SVG transform origin defaults are different to CSS and is less intuitive,
 * so we use the measured dimensions of the SVG to reconcile these.
 */
function calcSVGTransformOrigin(dimensions, originX, originY) {
    var pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
    var pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
    return "".concat(pxOriginX, " ").concat(pxOriginY);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/svg/utils/path.mjs


var dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray",
};
var camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray",
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 */
function buildSVGPath(attrs, length, spacing, offset, useDashCase) {
    if (spacing === void 0) { spacing = 1; }
    if (offset === void 0) { offset = 0; }
    if (useDashCase === void 0) { useDashCase = true; }
    // Normalise path length by setting SVG attribute pathLength to 1
    attrs.pathLength = 1;
    // We use dash case when setting attributes directly to the DOM node and camel case
    // when defining props on a React component.
    var keys = useDashCase ? dashKeys : camelKeys;
    // Build the dash offset
    attrs[keys.offset] = px.transform(-offset);
    // Build the dash array
    var pathLength = px.transform(length);
    var pathSpacing = px.transform(spacing);
    attrs[keys.array] = "".concat(pathLength, " ").concat(pathSpacing);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs





/**
 * Build SVG visual attrbutes, like cx and style.transform
 */
function buildSVGAttrs(state, _a, options, transformTemplate) {
    var attrX = _a.attrX, attrY = _a.attrY, originX = _a.originX, originY = _a.originY, pathLength = _a.pathLength, _b = _a.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a.pathOffset, pathOffset = _c === void 0 ? 0 : _c, 
    // This is object creation, which we try to avoid per-frame.
    latest = (0,tslib_es6.__rest)(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
    buildHTMLStyles(state, latest, options, transformTemplate);
    state.attrs = state.style;
    state.style = {};
    var attrs = state.attrs, style = state.style, dimensions = state.dimensions;
    /**
     * However, we apply transforms as CSS transforms. So if we detect a transform we take it from attrs
     * and copy it into style.
     */
    if (attrs.transform) {
        if (dimensions)
            style.transform = attrs.transform;
        delete attrs.transform;
    }
    // Parse transformOrigin
    if (dimensions &&
        (originX !== undefined || originY !== undefined || style.transform)) {
        style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== undefined ? originX : 0.5, originY !== undefined ? originY : 0.5);
    }
    // Treat x/y not as shortcuts but as actual attributes
    if (attrX !== undefined)
        attrs.x = attrX;
    if (attrY !== undefined)
        attrs.y = attrY;
    // Build SVG path if one has been defined
    if (pathLength !== undefined) {
        buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
    }
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs



var createSvgRenderState = function () { return ((0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, createHtmlRenderState()), { attrs: {} })); };



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/svg/use-props.mjs






function useSVGProps(props, visualState) {
    var visualProps = (0,react.useMemo)(function () {
        var state = createSvgRenderState();
        buildSVGAttrs(state, visualState, { enableHardwareAcceleration: false }, props.transformTemplate);
        return (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, state.attrs), { style: (0,tslib_es6.__assign)({}, state.style) });
    }, [visualState]);
    if (props.style) {
        var rawStyles = {};
        copyRawValuesOnly(rawStyles, props.style, props);
        visualProps.style = (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, rawStyles), visualProps.style);
    }
    return visualProps;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/use-render.mjs







function createUseRender(forwardMotionProps) {
    if (forwardMotionProps === void 0) { forwardMotionProps = false; }
    var useRender = function (Component, props, projectionId, ref, _a, isStatic) {
        var latestValues = _a.latestValues;
        var useVisualProps = isSVGComponent(Component)
            ? useSVGProps
            : useHTMLProps;
        var visualProps = useVisualProps(props, latestValues, isStatic);
        var filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
        var elementProps = (0,tslib_es6.__assign)((0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, filteredProps), visualProps), { ref: ref });
        if (projectionId) {
            elementProps["data-projection-id"] = projectionId;
        }
        return (0,react.createElement)(Component, elementProps);
    };
    return useRender;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
/**
 * Convert camelCase to dash-case properties.
 */
var camelToDash = function (str) {
    return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/html/utils/render.mjs
function renderHTML(element, _a, styleProp, projection) {
    var style = _a.style, vars = _a.vars;
    Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
    // Loop over any CSS variables and assign those.
    for (var key in vars) {
        element.style.setProperty(key, vars[key]);
    }
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
/**
 * A set of attribute names that are always read/written as camel case.
 */
var camelCaseAttributes = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
]);



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/svg/utils/render.mjs




function renderSVG(element, renderState) {
    renderHTML(element, renderState);
    for (var key in renderState.attrs) {
        element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
    }
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs



function scrapeMotionValuesFromProps(props) {
    var style = props.style;
    var newValues = {};
    for (var key in style) {
        if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
            newValues[key] = style[key];
        }
    }
    return newValues;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs



function scrape_motion_values_scrapeMotionValuesFromProps(props) {
    var newValues = scrapeMotionValuesFromProps(props);
    for (var key in props) {
        if (isMotionValue(props[key])) {
            var targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
            newValues[targetKey] = props[key];
        }
    }
    return newValues;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
function isAnimationControls(v) {
    return typeof v === "object" && typeof v.start === "function";
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs









function makeState(_a, props, context, presenceContext) {
    var scrapeMotionValuesFromProps = _a.scrapeMotionValuesFromProps, createRenderState = _a.createRenderState, onMount = _a.onMount;
    var state = {
        latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps),
        renderState: createRenderState(),
    };
    if (onMount) {
        state.mount = function (instance) { return onMount(props, instance, state); };
    }
    return state;
}
var makeUseVisualState = function (config) {
    return function (props, isStatic) {
        var context = (0,react.useContext)(MotionContext);
        var presenceContext = (0,react.useContext)(PresenceContext_PresenceContext);
        return isStatic
            ? makeState(config, props, context, presenceContext)
            : useConstant(function () {
                return makeState(config, props, context, presenceContext);
            });
    };
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
    var values = {};
    var blockInitialAnimation = (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false;
    var motionValues = scrapeMotionValues(props);
    for (var key in motionValues) {
        values[key] = resolveMotionValue(motionValues[key]);
    }
    var initial = props.initial, animate = props.animate;
    var isControllingVariants = checkIfControllingVariants(props);
    var isVariantNode = checkIfVariantNode(props);
    if (context &&
        isVariantNode &&
        !isControllingVariants &&
        props.inherit !== false) {
        initial !== null && initial !== void 0 ? initial : (initial = context.initial);
        animate !== null && animate !== void 0 ? animate : (animate = context.animate);
    }
    var initialAnimationIsBlocked = blockInitialAnimation || initial === false;
    var variantToSet = initialAnimationIsBlocked ? animate : initial;
    if (variantToSet &&
        typeof variantToSet !== "boolean" &&
        !isAnimationControls(variantToSet)) {
        var list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
        list.forEach(function (definition) {
            var resolved = resolveVariantFromProps(props, definition);
            if (!resolved)
                return;
            var transitionEnd = resolved.transitionEnd; resolved.transition; var target = (0,tslib_es6.__rest)(resolved, ["transitionEnd", "transition"]);
            for (var key in target) {
                var valueTarget = target[key];
                if (Array.isArray(valueTarget)) {
                    /**
                     * Take final keyframe if the initial animation is blocked because
                     * we want to initialise at the end of that blocked animation.
                     */
                    var index = initialAnimationIsBlocked
                        ? valueTarget.length - 1
                        : 0;
                    valueTarget = valueTarget[index];
                }
                if (valueTarget !== null) {
                    values[key] = valueTarget;
                }
            }
            for (var key in transitionEnd)
                values[key] = transitionEnd[key];
        });
    }
    return values;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/svg/config-motion.mjs






var svgMotionConfig = {
    useVisualState: makeUseVisualState({
        scrapeMotionValuesFromProps: scrape_motion_values_scrapeMotionValuesFromProps,
        createRenderState: createSvgRenderState,
        onMount: function (props, instance, _a) {
            var renderState = _a.renderState, latestValues = _a.latestValues;
            try {
                renderState.dimensions =
                    typeof instance.getBBox ===
                        "function"
                        ? instance.getBBox()
                        : instance.getBoundingClientRect();
            }
            catch (e) {
                // Most likely trying to measure an unrendered element under Firefox
                renderState.dimensions = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                };
            }
            buildSVGAttrs(renderState, latestValues, { enableHardwareAcceleration: false }, props.transformTemplate);
            // TODO: Replace with direct assignment
            renderSVG(instance, renderState);
        },
    }),
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/html/config-motion.mjs




var htmlMotionConfig = {
    useVisualState: makeUseVisualState({
        scrapeMotionValuesFromProps: scrapeMotionValuesFromProps,
        createRenderState: createHtmlRenderState,
    }),
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/utils/create-config.mjs






function create_config_createDomMotionConfig(Component, _a, preloadedFeatures, createVisualElement, projectionNodeConstructor) {
    var _b = _a.forwardMotionProps, forwardMotionProps = _b === void 0 ? false : _b;
    var baseConfig = isSVGComponent(Component)
        ? svgMotionConfig
        : htmlMotionConfig;
    return (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, baseConfig), { preloadedFeatures: preloadedFeatures, useRender: createUseRender(forwardMotionProps), createVisualElement: createVisualElement, projectionNodeConstructor: projectionNodeConstructor, Component: Component });
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/utils/types.mjs
var AnimationType;
(function (AnimationType) {
    AnimationType["Animate"] = "animate";
    AnimationType["Hover"] = "whileHover";
    AnimationType["Tap"] = "whileTap";
    AnimationType["Drag"] = "whileDrag";
    AnimationType["Focus"] = "whileFocus";
    AnimationType["InView"] = "whileInView";
    AnimationType["Exit"] = "exit";
})(AnimationType || (AnimationType = {}));



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/events/use-dom-event.mjs


function addDomEvent(target, eventName, handler, options) {
    target.addEventListener(eventName, handler, options);
    return function () { return target.removeEventListener(eventName, handler, options); };
}
/**
 * Attaches an event listener directly to the provided DOM element.
 *
 * Bypassing React's event system can be desirable, for instance when attaching non-passive
 * event handlers.
 *
 * ```jsx
 * const ref = useRef(null)
 *
 * useDomEvent(ref, 'wheel', onWheel, { passive: false })
 *
 * return <div ref={ref} />
 * ```
 *
 * @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
 * @param eventName - Name of the event you want listen for.
 * @param handler - Function to fire when receiving the event.
 * @param options - Options to pass to `Event.addEventListener`.
 *
 * @public
 */
function useDomEvent(ref, eventName, handler, options) {
    (0,react.useEffect)(function () {
        var element = ref.current;
        if (handler && element) {
            return addDomEvent(element, eventName, handler, options);
        }
    }, [ref, eventName, handler, options]);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/gestures/use-focus-gesture.mjs



/**
 *
 * @param props
 * @param ref
 * @internal
 */
function useFocusGesture(_a) {
    var whileFocus = _a.whileFocus, visualElement = _a.visualElement;
    var onFocus = function () {
        var _a;
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Focus, true);
    };
    var onBlur = function () {
        var _a;
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Focus, false);
    };
    useDomEvent(visualElement, "focus", whileFocus ? onFocus : undefined);
    useDomEvent(visualElement, "blur", whileFocus ? onBlur : undefined);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/gestures/utils/event-type.mjs
function isMouseEvent(event) {
    // PointerEvent inherits from MouseEvent so we can't use a straight instanceof check.
    if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
        return !!(event.pointerType === "mouse");
    }
    return event instanceof MouseEvent;
}
function isTouchEvent(event) {
    var hasTouches = !!event.touches;
    return hasTouches;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/events/event-info.mjs


/**
 * Filters out events not attached to the primary pointer (currently left mouse button)
 * @param eventHandler
 */
function filterPrimaryPointer(eventHandler) {
    return function (event) {
        var isMouseEvent = event instanceof MouseEvent;
        var isPrimaryPointer = !isMouseEvent ||
            (isMouseEvent && event.button === 0);
        if (isPrimaryPointer) {
            eventHandler(event);
        }
    };
}
var defaultPagePoint = { pageX: 0, pageY: 0 };
function pointFromTouch(e, pointType) {
    if (pointType === void 0) { pointType = "page"; }
    var primaryTouch = e.touches[0] || e.changedTouches[0];
    var point = primaryTouch || defaultPagePoint;
    return {
        x: point[pointType + "X"],
        y: point[pointType + "Y"],
    };
}
function pointFromMouse(point, pointType) {
    if (pointType === void 0) { pointType = "page"; }
    return {
        x: point[pointType + "X"],
        y: point[pointType + "Y"],
    };
}
function extractEventInfo(event, pointType) {
    if (pointType === void 0) { pointType = "page"; }
    return {
        point: isTouchEvent(event)
            ? pointFromTouch(event, pointType)
            : pointFromMouse(event, pointType),
    };
}
var wrapHandler = function (handler, shouldFilterPrimaryPointer) {
    if (shouldFilterPrimaryPointer === void 0) { shouldFilterPrimaryPointer = false; }
    var listener = function (event) {
        return handler(event, extractEventInfo(event));
    };
    return shouldFilterPrimaryPointer
        ? filterPrimaryPointer(listener)
        : listener;
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/events/utils.mjs


// We check for event support via functions in case they've been mocked by a testing suite.
var supportsPointerEvents = function () {
    return isBrowser && window.onpointerdown === null;
};
var supportsTouchEvents = function () {
    return isBrowser && window.ontouchstart === null;
};
var supportsMouseEvents = function () {
    return isBrowser && window.onmousedown === null;
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/events/use-pointer-event.mjs




var mouseEventNames = {
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointercancel: "mousecancel",
    pointerover: "mouseover",
    pointerout: "mouseout",
    pointerenter: "mouseenter",
    pointerleave: "mouseleave",
};
var touchEventNames = {
    pointerdown: "touchstart",
    pointermove: "touchmove",
    pointerup: "touchend",
    pointercancel: "touchcancel",
};
function getPointerEventName(name) {
    if (supportsPointerEvents()) {
        return name;
    }
    else if (supportsTouchEvents()) {
        return touchEventNames[name];
    }
    else if (supportsMouseEvents()) {
        return mouseEventNames[name];
    }
    return name;
}
function addPointerEvent(target, eventName, handler, options) {
    return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
}
function usePointerEvent(ref, eventName, handler, options) {
    return useDomEvent(ref, getPointerEventName(eventName), handler && wrapHandler(handler, eventName === "pointerdown"), options);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/gestures/drag/utils/lock.mjs
function createLock(name) {
    var lock = null;
    return function () {
        var openLock = function () {
            lock = null;
        };
        if (lock === null) {
            lock = name;
            return openLock;
        }
        return false;
    };
}
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag) {
    var lock = false;
    if (drag === "y") {
        lock = globalVerticalLock();
    }
    else if (drag === "x") {
        lock = globalHorizontalLock();
    }
    else {
        var openHorizontal_1 = globalHorizontalLock();
        var openVertical_1 = globalVerticalLock();
        if (openHorizontal_1 && openVertical_1) {
            lock = function () {
                openHorizontal_1();
                openVertical_1();
            };
        }
        else {
            // Release the locks because we don't use them
            if (openHorizontal_1)
                openHorizontal_1();
            if (openVertical_1)
                openVertical_1();
        }
    }
    return lock;
}
function isDragActive() {
    // Check the gesture lock - if we get it, it means no drag gesture is active
    // and we can safely fire the tap gesture.
    var openGestureLock = getGlobalLock(true);
    if (!openGestureLock)
        return true;
    openGestureLock();
    return false;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/gestures/use-hover-gesture.mjs





function createHoverEvent(visualElement, isActive, callback) {
    return function (event, info) {
        var _a;
        if (!isMouseEvent(event) || isDragActive())
            return;
        /**
         * Ensure we trigger animations before firing event callback
         */
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Hover, isActive);
        callback === null || callback === void 0 ? void 0 : callback(event, info);
    };
}
function useHoverGesture(_a) {
    var onHoverStart = _a.onHoverStart, onHoverEnd = _a.onHoverEnd, whileHover = _a.whileHover, visualElement = _a.visualElement;
    usePointerEvent(visualElement, "pointerenter", onHoverStart || whileHover
        ? createHoverEvent(visualElement, true, onHoverStart)
        : undefined);
    usePointerEvent(visualElement, "pointerleave", onHoverEnd || whileHover
        ? createHoverEvent(visualElement, false, onHoverEnd)
        : undefined);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/gestures/utils/is-node-or-child.mjs
/**
 * Recursively traverse up the tree to check whether the provided child node
 * is the parent or a descendant of it.
 *
 * @param parent - Element to find
 * @param child - Element to test against parent
 */
var isNodeOrChild = function (parent, child) {
    if (!child) {
        return false;
    }
    else if (parent === child) {
        return true;
    }
    else {
        return isNodeOrChild(parent, child.parentElement);
    }
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/use-unmount-effect.mjs


function useUnmountEffect(callback) {
    return (0,react.useEffect)(function () { return function () { return callback(); }; }, []);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/gestures/use-tap-gesture.mjs








/**
 * @param handlers -
 * @internal
 */
function useTapGesture(_a) {
    var onTap = _a.onTap, onTapStart = _a.onTapStart, onTapCancel = _a.onTapCancel, whileTap = _a.whileTap, visualElement = _a.visualElement;
    var hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
    var isPressing = (0,react.useRef)(false);
    var cancelPointerEndListeners = (0,react.useRef)(null);
    function removePointerEndListener() {
        var _a;
        (_a = cancelPointerEndListeners.current) === null || _a === void 0 ? void 0 : _a.call(cancelPointerEndListeners);
        cancelPointerEndListeners.current = null;
    }
    function checkPointerEnd() {
        var _a;
        removePointerEndListener();
        isPressing.current = false;
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Tap, false);
        return !isDragActive();
    }
    function onPointerUp(event, info) {
        if (!checkPointerEnd())
            return;
        /**
         * We only count this as a tap gesture if the event.target is the same
         * as, or a child of, this component's element
         */
        !isNodeOrChild(visualElement.getInstance(), event.target)
            ? onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info)
            : onTap === null || onTap === void 0 ? void 0 : onTap(event, info);
    }
    function onPointerCancel(event, info) {
        if (!checkPointerEnd())
            return;
        onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info);
    }
    function onPointerDown(event, info) {
        var _a;
        removePointerEndListener();
        if (isPressing.current)
            return;
        isPressing.current = true;
        cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp), addPointerEvent(window, "pointercancel", onPointerCancel));
        /**
         * Ensure we trigger animations before firing event callback
         */
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Tap, true);
        onTapStart === null || onTapStart === void 0 ? void 0 : onTapStart(event, info);
    }
    usePointerEvent(visualElement, "pointerdown", hasPressListeners ? onPointerDown : undefined);
    useUnmountEffect(removePointerEndListener);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs


/**
 * Map an IntersectionHandler callback to an element. We only ever make one handler for one
 * element, so even though these handlers might all be triggered by different
 * observers, we can keep them in the same map.
 */
var observerCallbacks = new WeakMap();
/**
 * Multiple observers can be created for multiple element/document roots. Each with
 * different settings. So here we store dictionaries of observers to each root,
 * using serialised settings (threshold/margin) as lookup keys.
 */
var observers = new WeakMap();
var fireObserverCallback = function (entry) {
    var _a;
    (_a = observerCallbacks.get(entry.target)) === null || _a === void 0 ? void 0 : _a(entry);
};
var fireAllObserverCallbacks = function (entries) {
    entries.forEach(fireObserverCallback);
};
function initIntersectionObserver(_a) {
    var root = _a.root, options = (0,tslib_es6.__rest)(_a, ["root"]);
    var lookupRoot = root || document;
    /**
     * If we don't have an observer lookup map for this root, create one.
     */
    if (!observers.has(lookupRoot)) {
        observers.set(lookupRoot, {});
    }
    var rootObservers = observers.get(lookupRoot);
    var key = JSON.stringify(options);
    /**
     * If we don't have an observer for this combination of root and settings,
     * create one.
     */
    if (!rootObservers[key]) {
        rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, (0,tslib_es6.__assign)({ root: root }, options));
    }
    return rootObservers[key];
}
function observeIntersection(element, options, callback) {
    var rootInteresectionObserver = initIntersectionObserver(options);
    observerCallbacks.set(element, callback);
    rootInteresectionObserver.observe(element);
    return function () {
        observerCallbacks.delete(element);
        rootInteresectionObserver.unobserve(element);
    };
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/features/viewport/use-viewport.mjs





function useViewport(_a) {
    var visualElement = _a.visualElement, whileInView = _a.whileInView, onViewportEnter = _a.onViewportEnter, onViewportLeave = _a.onViewportLeave, _b = _a.viewport, viewport = _b === void 0 ? {} : _b;
    var state = (0,react.useRef)({
        hasEnteredView: false,
        isInView: false,
    });
    var shouldObserve = Boolean(whileInView || onViewportEnter || onViewportLeave);
    if (viewport.once && state.current.hasEnteredView)
        shouldObserve = false;
    var useObserver = typeof IntersectionObserver === "undefined"
        ? useMissingIntersectionObserver
        : useIntersectionObserver;
    useObserver(shouldObserve, state.current, visualElement, viewport);
}
var thresholdNames = {
    some: 0,
    all: 1,
};
function useIntersectionObserver(shouldObserve, state, visualElement, _a) {
    var root = _a.root, rootMargin = _a.margin, _b = _a.amount, amount = _b === void 0 ? "some" : _b, once = _a.once;
    (0,react.useEffect)(function () {
        if (!shouldObserve)
            return;
        var options = {
            root: root === null || root === void 0 ? void 0 : root.current,
            rootMargin: rootMargin,
            threshold: typeof amount === "number" ? amount : thresholdNames[amount],
        };
        var intersectionCallback = function (entry) {
            var _a;
            var isIntersecting = entry.isIntersecting;
            /**
             * If there's been no change in the viewport state, early return.
             */
            if (state.isInView === isIntersecting)
                return;
            state.isInView = isIntersecting;
            /**
             * Handle hasEnteredView. If this is only meant to run once, and
             * element isn't visible, early return. Otherwise set hasEnteredView to true.
             */
            if (once && !isIntersecting && state.hasEnteredView) {
                return;
            }
            else if (isIntersecting) {
                state.hasEnteredView = true;
            }
            (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.InView, isIntersecting);
            /**
             * Use the latest committed props rather than the ones in scope
             * when this observer is created
             */
            var props = visualElement.getProps();
            var callback = isIntersecting
                ? props.onViewportEnter
                : props.onViewportLeave;
            callback === null || callback === void 0 ? void 0 : callback(entry);
        };
        return observeIntersection(visualElement.getInstance(), options, intersectionCallback);
    }, [shouldObserve, root, rootMargin, amount]);
}
/**
 * If IntersectionObserver is missing, we activate inView and fire onViewportEnter
 * on mount. This way, the page will be in the state the author expects users
 * to see it in for everyone.
 */
function useMissingIntersectionObserver(shouldObserve, state, visualElement) {
    (0,react.useEffect)(function () {
        if (!shouldObserve)
            return;
        if (false) {}
        /**
         * Fire this in an rAF because, at this point, the animation state
         * won't have flushed for the first time and there's certain logic in
         * there that behaves differently on the initial animation.
         *
         * This hook should be quite rarely called so setting this in an rAF
         * is preferred to changing the behaviour of the animation state.
         */
        requestAnimationFrame(function () {
            var _a;
            state.hasEnteredView = true;
            var onViewportEnter = visualElement.getProps().onViewportEnter;
            onViewportEnter === null || onViewportEnter === void 0 ? void 0 : onViewportEnter(null);
            (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.InView, true);
        });
    }, [shouldObserve]);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/utils/make-renderless-component.mjs
var makeRenderlessComponent = function (hook) { return function (props) {
    hook(props);
    return null;
}; };



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/features/gestures.mjs






var gestureAnimations = {
    inView: makeRenderlessComponent(useViewport),
    tap: makeRenderlessComponent(useTapGesture),
    focus: makeRenderlessComponent(useFocusGesture),
    hover: makeRenderlessComponent(useHoverGesture),
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs




/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed the tree, but
 * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */
function usePresence() {
    var context = (0,react.useContext)(PresenceContext_PresenceContext);
    if (context === null)
        return [true, null];
    var isPresent = context.isPresent, onExitComplete = context.onExitComplete, register = context.register;
    // It's safe to call the following hooks conditionally (after an early return) because the context will always
    // either be null or non-null for the lifespan of the component.
    // Replace with useOpaqueId when released in React
    var id = useUniqueId();
    (0,react.useEffect)(function () { return register(id); }, []);
    var safeToRemove = function () { return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id); };
    return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */
function useIsPresent() {
    return isPresent(useContext(PresenceContext));
}
function isPresent(context) {
    return context === null ? true : context.isPresent;
}
var counter = 0;
var incrementId = function () { return counter++; };
var useUniqueId = function () { return useConstant(incrementId); };



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/shallow-compare.mjs
function shallowCompare(next, prev) {
    if (!Array.isArray(prev))
        return false;
    var prevLength = prev.length;
    if (prevLength !== next.length)
        return false;
    for (var i = 0; i < prevLength; i++) {
        if (prev[i] !== next[i])
            return false;
    }
    return true;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs
/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */
var isNumericalString = function (v) { return /^\-?\d*\.?\d+$/.test(v); };



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs
/**
 * Check if the value is a zero value string like "0px" or "0%"
 */
var isZeroValueString = function (v) { return /^0[^.\s]+$/.test(v); };



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs
/**
 * Tests a provided value against a ValueType
 */
var testValueType = function (v) { return function (type) { return type.test(v); }; };



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs
/**
 * ValueType for "auto"
 */
var auto = {
    test: function (v) { return v === "auto"; },
    parse: function (v) { return v; },
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs




/**
 * A list of value types commonly used for dimensions
 */
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */
var findDimensionValueType = function (v) {
    return dimensionValueTypes.find(testValueType(v));
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs





/**
 * A list of all ValueTypes
 */
var valueTypes = (0,tslib_es6.__spreadArray)((0,tslib_es6.__spreadArray)([], (0,tslib_es6.__read)(dimensionValueTypes), false), [color, complex], false);
/**
 * Tests a value against the list of ValueTypes
 */
var findValueType = function (v) { return valueTypes.find(testValueType(v)); };



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/utils/setters.mjs










/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */
function setMotionValue(visualElement, key, value) {
    if (visualElement.hasValue(key)) {
        visualElement.getValue(key).set(value);
    }
    else {
        visualElement.addValue(key, motionValue(value));
    }
}
function setTarget(visualElement, definition) {
    var resolved = resolveVariant(visualElement, definition);
    var _a = resolved ? visualElement.makeTargetAnimatable(resolved, false) : {}, _b = _a.transitionEnd, transitionEnd = _b === void 0 ? {} : _b; _a.transition; var target = (0,tslib_es6.__rest)(_a, ["transitionEnd", "transition"]);
    target = (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, target), transitionEnd);
    for (var key in target) {
        var value = resolveFinalValueInKeyframes(target[key]);
        setMotionValue(visualElement, key, value);
    }
}
function setVariants(visualElement, variantLabels) {
    var reversedLabels = __spreadArray([], __read(variantLabels), false).reverse();
    reversedLabels.forEach(function (key) {
        var _a;
        var variant = visualElement.getVariant(key);
        variant && setTarget(visualElement, variant);
        (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
            setVariants(child, variantLabels);
        });
    });
}
function setValues(visualElement, definition) {
    if (Array.isArray(definition)) {
        return setVariants(visualElement, definition);
    }
    else if (typeof definition === "string") {
        return setVariants(visualElement, [definition]);
    }
    else {
        setTarget(visualElement, definition);
    }
}
function checkTargetForNewValues(visualElement, target, origin) {
    var _a, _b, _c;
    var _d;
    var newValueKeys = Object.keys(target).filter(function (key) { return !visualElement.hasValue(key); });
    var numNewValues = newValueKeys.length;
    if (!numNewValues)
        return;
    for (var i = 0; i < numNewValues; i++) {
        var key = newValueKeys[i];
        var targetValue = target[key];
        var value = null;
        /**
         * If the target is a series of keyframes, we can use the first value
         * in the array. If this first value is null, we'll still need to read from the DOM.
         */
        if (Array.isArray(targetValue)) {
            value = targetValue[0];
        }
        /**
         * If the target isn't keyframes, or the first keyframe was null, we need to
         * first check if an origin value was explicitly defined in the transition as "from",
         * if not read the value from the DOM. As an absolute fallback, take the defined target value.
         */
        if (value === null) {
            value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
        }
        /**
         * If value is still undefined or null, ignore it. Preferably this would throw,
         * but this was causing issues in Framer.
         */
        if (value === undefined || value === null)
            continue;
        if (typeof value === "string" &&
            (isNumericalString(value) || isZeroValueString(value))) {
            // If this is a number read as a string, ie "0" or "200", convert it to a number
            value = parseFloat(value);
        }
        else if (!findValueType(value) && complex.test(targetValue)) {
            value = animatable_none_getAnimatableNone(key, targetValue);
        }
        visualElement.addValue(key, motionValue(value));
        (_c = (_d = origin)[key]) !== null && _c !== void 0 ? _c : (_d[key] = value);
        visualElement.setBaseTarget(key, value);
    }
}
function getOriginFromTransition(key, transition) {
    if (!transition)
        return;
    var valueTransition = transition[key] || transition["default"] || transition;
    return valueTransition.from;
}
function getOrigin(target, transition, visualElement) {
    var _a, _b;
    var origin = {};
    for (var key in target) {
        origin[key] =
            (_a = getOriginFromTransition(key, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
    }
    return origin;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/utils/animation.mjs





/**
 * @internal
 */
function animateVisualElement(visualElement, definition, options) {
    if (options === void 0) { options = {}; }
    visualElement.notifyAnimationStart(definition);
    var animation;
    if (Array.isArray(definition)) {
        var animations = definition.map(function (variant) {
            return animateVariant(visualElement, variant, options);
        });
        animation = Promise.all(animations);
    }
    else if (typeof definition === "string") {
        animation = animateVariant(visualElement, definition, options);
    }
    else {
        var resolvedDefinition = typeof definition === "function"
            ? resolveVariant(visualElement, definition, options.custom)
            : definition;
        animation = animateTarget(visualElement, resolvedDefinition, options);
    }
    return animation.then(function () {
        return visualElement.notifyAnimationComplete(definition);
    });
}
function animateVariant(visualElement, variant, options) {
    var _a;
    if (options === void 0) { options = {}; }
    var resolved = resolveVariant(visualElement, variant, options.custom);
    var _b = (resolved || {}).transition, transition = _b === void 0 ? visualElement.getDefaultTransition() || {} : _b;
    if (options.transitionOverride) {
        transition = options.transitionOverride;
    }
    /**
     * If we have a variant, create a callback that runs it as an animation.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */
    var getAnimation = resolved
        ? function () { return animateTarget(visualElement, resolved, options); }
        : function () { return Promise.resolve(); };
    /**
     * If we have children, create a callback that runs all their animations.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */
    var getChildAnimations = ((_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.size)
        ? function (forwardDelay) {
            if (forwardDelay === void 0) { forwardDelay = 0; }
            var _a = transition.delayChildren, delayChildren = _a === void 0 ? 0 : _a, staggerChildren = transition.staggerChildren, staggerDirection = transition.staggerDirection;
            return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
        }
        : function () { return Promise.resolve(); };
    /**
     * If the transition explicitly defines a "when" option, we need to resolve either
     * this animation or all children animations before playing the other.
     */
    var when = transition.when;
    if (when) {
        var _c = (0,tslib_es6.__read)(when === "beforeChildren"
            ? [getAnimation, getChildAnimations]
            : [getChildAnimations, getAnimation], 2), first = _c[0], last = _c[1];
        return first().then(last);
    }
    else {
        return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
    }
}
/**
 * @internal
 */
function animateTarget(visualElement, definition, _a) {
    var _b;
    var _c = _a === void 0 ? {} : _a, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
    var _e = visualElement.makeTargetAnimatable(definition), _f = _e.transition, transition = _f === void 0 ? visualElement.getDefaultTransition() : _f, transitionEnd = _e.transitionEnd, target = (0,tslib_es6.__rest)(_e, ["transition", "transitionEnd"]);
    if (transitionOverride)
        transition = transitionOverride;
    var animations = [];
    var animationTypeState = type && ((_b = visualElement.animationState) === null || _b === void 0 ? void 0 : _b.getState()[type]);
    for (var key in target) {
        var value = visualElement.getValue(key);
        var valueTarget = target[key];
        if (!value ||
            valueTarget === undefined ||
            (animationTypeState &&
                shouldBlockAnimation(animationTypeState, key))) {
            continue;
        }
        var animation = startAnimation(key, value, valueTarget, (0,tslib_es6.__assign)({ delay: delay }, transition));
        animations.push(animation);
    }
    return Promise.all(animations).then(function () {
        transitionEnd && setTarget(visualElement, transitionEnd);
    });
}
function animateChildren(visualElement, variant, delayChildren, staggerChildren, staggerDirection, options) {
    if (delayChildren === void 0) { delayChildren = 0; }
    if (staggerChildren === void 0) { staggerChildren = 0; }
    if (staggerDirection === void 0) { staggerDirection = 1; }
    var animations = [];
    var maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
    var generateStaggerDuration = staggerDirection === 1
        ? function (i) {
            if (i === void 0) { i = 0; }
            return i * staggerChildren;
        }
        : function (i) {
            if (i === void 0) { i = 0; }
            return maxStaggerDuration - i * staggerChildren;
        };
    Array.from(visualElement.variantChildren)
        .sort(sortByTreeOrder)
        .forEach(function (child, i) {
        animations.push(animateVariant(child, variant, (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, options), { delay: delayChildren + generateStaggerDuration(i) })).then(function () { return child.notifyAnimationComplete(variant); }));
    });
    return Promise.all(animations);
}
function stopAnimation(visualElement) {
    visualElement.forEachValue(function (value) { return value.stop(); });
}
function sortByTreeOrder(a, b) {
    return a.sortNodePosition(b);
}
/**
 * Decide whether we should block this animation. Previously, we achieved this
 * just by checking whether the key was listed in protectedKeys, but this
 * posed problems if an animation was triggered by afterChildren and protectedKeys
 * had been set to true in the meantime.
 */
function shouldBlockAnimation(_a, key) {
    var protectedKeys = _a.protectedKeys, needsAnimating = _a.needsAnimating;
    var shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
    needsAnimating[key] = false;
    return shouldBlock;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/utils/animation-state.mjs








var variantPriorityOrder = [
    AnimationType.Animate,
    AnimationType.InView,
    AnimationType.Focus,
    AnimationType.Hover,
    AnimationType.Tap,
    AnimationType.Drag,
    AnimationType.Exit,
];
var reversePriorityOrder = (0,tslib_es6.__spreadArray)([], (0,tslib_es6.__read)(variantPriorityOrder), false).reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
    return function (animations) {
        return Promise.all(animations.map(function (_a) {
            var animation = _a.animation, options = _a.options;
            return animateVisualElement(visualElement, animation, options);
        }));
    };
}
function createAnimationState(visualElement) {
    var animate = animateList(visualElement);
    var state = createState();
    var allAnimatedKeys = {};
    var isInitialRender = true;
    /**
     * This function will be used to reduce the animation definitions for
     * each active animation type into an object of resolved values for it.
     */
    var buildResolvedTypeValues = function (acc, definition) {
        var resolved = resolveVariant(visualElement, definition);
        if (resolved) {
            resolved.transition; var transitionEnd = resolved.transitionEnd, target = (0,tslib_es6.__rest)(resolved, ["transition", "transitionEnd"]);
            acc = (0,tslib_es6.__assign)((0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, acc), target), transitionEnd);
        }
        return acc;
    };
    function isAnimated(key) {
        return allAnimatedKeys[key] !== undefined;
    }
    /**
     * This just allows us to inject mocked animation functions
     * @internal
     */
    function setAnimateFunction(makeAnimator) {
        animate = makeAnimator(visualElement);
    }
    /**
     * When we receive new props, we need to:
     * 1. Create a list of protected keys for each type. This is a directory of
     *    value keys that are currently being "handled" by types of a higher priority
     *    so that whenever an animation is played of a given type, these values are
     *    protected from being animated.
     * 2. Determine if an animation type needs animating.
     * 3. Determine if any values have been removed from a type and figure out
     *    what to animate those to.
     */
    function animateChanges(options, changedActiveType) {
        var _a;
        var props = visualElement.getProps();
        var context = visualElement.getVariantContext(true) || {};
        /**
         * A list of animations that we'll build into as we iterate through the animation
         * types. This will get executed at the end of the function.
         */
        var animations = [];
        /**
         * Keep track of which values have been removed. Then, as we hit lower priority
         * animation types, we can check if they contain removed values and animate to that.
         */
        var removedKeys = new Set();
        /**
         * A dictionary of all encountered keys. This is an object to let us build into and
         * copy it without iteration. Each time we hit an animation type we set its protected
         * keys - the keys its not allowed to animate - to the latest version of this object.
         */
        var encounteredKeys = {};
        /**
         * If a variant has been removed at a given index, and this component is controlling
         * variant animations, we want to ensure lower-priority variants are forced to animate.
         */
        var removedVariantIndex = Infinity;
        var _loop_1 = function (i) {
            var type = reversePriorityOrder[i];
            var typeState = state[type];
            var prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
            var propIsVariant = isVariantLabel(prop);
            /**
             * If this type has *just* changed isActive status, set activeDelta
             * to that status. Otherwise set to null.
             */
            var activeDelta = type === changedActiveType ? typeState.isActive : null;
            if (activeDelta === false)
                removedVariantIndex = i;
            /**
             * If this prop is an inherited variant, rather than been set directly on the
             * component itself, we want to make sure we allow the parent to trigger animations.
             *
             * TODO: Can probably change this to a !isControllingVariants check
             */
            var isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
            /**
             *
             */
            if (isInherited &&
                isInitialRender &&
                visualElement.manuallyAnimateOnMount) {
                isInherited = false;
            }
            /**
             * Set all encountered keys so far as the protected keys for this type. This will
             * be any key that has been animated or otherwise handled by active, higher-priortiy types.
             */
            typeState.protectedKeys = (0,tslib_es6.__assign)({}, encounteredKeys);
            // Check if we can skip analysing this prop early
            if (
            // If it isn't active and hasn't *just* been set as inactive
            (!typeState.isActive && activeDelta === null) ||
                // If we didn't and don't have any defined prop for this animation type
                (!prop && !typeState.prevProp) ||
                // Or if the prop doesn't define an animation
                isAnimationControls(prop) ||
                typeof prop === "boolean") {
                return "continue";
            }
            /**
             * As we go look through the values defined on this type, if we detect
             * a changed value or a value that was removed in a higher priority, we set
             * this to true and add this prop to the animation list.
             */
            var variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
            var shouldAnimateType = variantDidChange ||
                // If we're making this variant active, we want to always make it active
                (type === changedActiveType &&
                    typeState.isActive &&
                    !isInherited &&
                    propIsVariant) ||
                // If we removed a higher-priority variant (i is in reverse order)
                (i > removedVariantIndex && propIsVariant);
            /**
             * As animations can be set as variant lists, variants or target objects, we
             * coerce everything to an array if it isn't one already
             */
            var definitionList = Array.isArray(prop) ? prop : [prop];
            /**
             * Build an object of all the resolved values. We'll use this in the subsequent
             * animateChanges calls to determine whether a value has changed.
             */
            var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
            if (activeDelta === false)
                resolvedValues = {};
            /**
             * Now we need to loop through all the keys in the prev prop and this prop,
             * and decide:
             * 1. If the value has changed, and needs animating
             * 2. If it has been removed, and needs adding to the removedKeys set
             * 3. If it has been removed in a higher priority type and needs animating
             * 4. If it hasn't been removed in a higher priority but hasn't changed, and
             *    needs adding to the type's protectedKeys list.
             */
            var _b = typeState.prevResolvedValues, prevResolvedValues = _b === void 0 ? {} : _b;
            var allKeys = (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, prevResolvedValues), resolvedValues);
            var markToAnimate = function (key) {
                shouldAnimateType = true;
                removedKeys.delete(key);
                typeState.needsAnimating[key] = true;
            };
            for (var key in allKeys) {
                var next = resolvedValues[key];
                var prev = prevResolvedValues[key];
                // If we've already handled this we can just skip ahead
                if (encounteredKeys.hasOwnProperty(key))
                    continue;
                /**
                 * If the value has changed, we probably want to animate it.
                 */
                if (next !== prev) {
                    /**
                     * If both values are keyframes, we need to shallow compare them to
                     * detect whether any value has changed. If it has, we animate it.
                     */
                    if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
                        if (!shallowCompare(next, prev) || variantDidChange) {
                            markToAnimate(key);
                        }
                        else {
                            /**
                             * If it hasn't changed, we want to ensure it doesn't animate by
                             * adding it to the list of protected keys.
                             */
                            typeState.protectedKeys[key] = true;
                        }
                    }
                    else if (next !== undefined) {
                        // If next is defined and doesn't equal prev, it needs animating
                        markToAnimate(key);
                    }
                    else {
                        // If it's undefined, it's been removed.
                        removedKeys.add(key);
                    }
                }
                else if (next !== undefined && removedKeys.has(key)) {
                    /**
                     * If next hasn't changed and it isn't undefined, we want to check if it's
                     * been removed by a higher priority
                     */
                    markToAnimate(key);
                }
                else {
                    /**
                     * If it hasn't changed, we add it to the list of protected values
                     * to ensure it doesn't get animated.
                     */
                    typeState.protectedKeys[key] = true;
                }
            }
            /**
             * Update the typeState so next time animateChanges is called we can compare the
             * latest prop and resolvedValues to these.
             */
            typeState.prevProp = prop;
            typeState.prevResolvedValues = resolvedValues;
            /**
             *
             */
            if (typeState.isActive) {
                encounteredKeys = (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, encounteredKeys), resolvedValues);
            }
            if (isInitialRender && visualElement.blockInitialAnimation) {
                shouldAnimateType = false;
            }
            /**
             * If this is an inherited prop we want to hard-block animations
             * TODO: Test as this should probably still handle animations triggered
             * by removed values?
             */
            if (shouldAnimateType && !isInherited) {
                animations.push.apply(animations, (0,tslib_es6.__spreadArray)([], (0,tslib_es6.__read)(definitionList.map(function (animation) { return ({
                    animation: animation,
                    options: (0,tslib_es6.__assign)({ type: type }, options),
                }); })), false));
            }
        };
        /**
         * Iterate through all animation types in reverse priority order. For each, we want to
         * detect which values it's handling and whether or not they've changed (and therefore
         * need to be animated). If any values have been removed, we want to detect those in
         * lower priority props and flag for animation.
         */
        for (var i = 0; i < numAnimationTypes; i++) {
            _loop_1(i);
        }
        allAnimatedKeys = (0,tslib_es6.__assign)({}, encounteredKeys);
        /**
         * If there are some removed value that haven't been dealt with,
         * we need to create a new animation that falls back either to the value
         * defined in the style prop, or the last read value.
         */
        if (removedKeys.size) {
            var fallbackAnimation_1 = {};
            removedKeys.forEach(function (key) {
                var fallbackTarget = visualElement.getBaseTarget(key);
                if (fallbackTarget !== undefined) {
                    fallbackAnimation_1[key] = fallbackTarget;
                }
            });
            animations.push({ animation: fallbackAnimation_1 });
        }
        var shouldAnimate = Boolean(animations.length);
        if (isInitialRender &&
            props.initial === false &&
            !visualElement.manuallyAnimateOnMount) {
            shouldAnimate = false;
        }
        isInitialRender = false;
        return shouldAnimate ? animate(animations) : Promise.resolve();
    }
    /**
     * Change whether a certain animation type is active.
     */
    function setActive(type, isActive, options) {
        var _a;
        // If the active state hasn't changed, we can safely do nothing here
        if (state[type].isActive === isActive)
            return Promise.resolve();
        // Propagate active change to children
        (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function (child) { var _a; return (_a = child.animationState) === null || _a === void 0 ? void 0 : _a.setActive(type, isActive); });
        state[type].isActive = isActive;
        return animateChanges(options, type);
    }
    return {
        isAnimated: isAnimated,
        animateChanges: animateChanges,
        setActive: setActive,
        setAnimateFunction: setAnimateFunction,
        getState: function () { return state; },
    };
}
function checkVariantsDidChange(prev, next) {
    if (typeof next === "string") {
        return next !== prev;
    }
    else if (isVariantLabels(next)) {
        return !shallowCompare(next, prev);
    }
    return false;
}
function createTypeState(isActive) {
    if (isActive === void 0) { isActive = false; }
    return {
        isActive: isActive,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {},
    };
}
function createState() {
    var _a;
    return _a = {},
        _a[AnimationType.Animate] = createTypeState(true),
        _a[AnimationType.InView] = createTypeState(),
        _a[AnimationType.Hover] = createTypeState(),
        _a[AnimationType.Tap] = createTypeState(),
        _a[AnimationType.Drag] = createTypeState(),
        _a[AnimationType.Focus] = createTypeState(),
        _a[AnimationType.Exit] = createTypeState(),
        _a;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/features/animations.mjs









var animations = {
    animation: makeRenderlessComponent(function (_a) {
        var visualElement = _a.visualElement, animate = _a.animate;
        /**
         * We dynamically generate the AnimationState manager as it contains a reference
         * to the underlying animation library. We only want to load that if we load this,
         * so people can optionally code split it out using the `m` component.
         */
        visualElement.animationState || (visualElement.animationState = createAnimationState(visualElement));
        /**
         * Subscribe any provided AnimationControls to the component's VisualElement
         */
        if (isAnimationControls(animate)) {
            (0,react.useEffect)(function () { return animate.subscribe(visualElement); }, [animate]);
        }
    }),
    exit: makeRenderlessComponent(function (props) {
        var custom = props.custom, visualElement = props.visualElement;
        var _a = (0,tslib_es6.__read)(usePresence(), 2), isPresent = _a[0], safeToRemove = _a[1];
        var presenceContext = (0,react.useContext)(PresenceContext_PresenceContext);
        (0,react.useEffect)(function () {
            var _a, _b;
            visualElement.isPresent = isPresent;
            var animation = (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Exit, !isPresent, { custom: (_b = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.custom) !== null && _b !== void 0 ? _b : custom });
            !isPresent && (animation === null || animation === void 0 ? void 0 : animation.then(safeToRemove));
        }, [isPresent]);
    }),
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/gestures/PanSession.mjs








/**
 * @internal
 */
var PanSession = /** @class */ (function () {
    function PanSession(event, handlers, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, transformPagePoint = _b.transformPagePoint;
        /**
         * @internal
         */
        this.startEvent = null;
        /**
         * @internal
         */
        this.lastMoveEvent = null;
        /**
         * @internal
         */
        this.lastMoveEventInfo = null;
        /**
         * @internal
         */
        this.handlers = {};
        this.updatePoint = function () {
            if (!(_this.lastMoveEvent && _this.lastMoveEventInfo))
                return;
            var info = getPanInfo(_this.lastMoveEventInfo, _this.history);
            var isPanStarted = _this.startEvent !== null;
            // Only start panning if the offset is larger than 3 pixels. If we make it
            // any larger than this we'll want to reset the pointer history
            // on the first update to avoid visual snapping to the cursoe.
            var isDistancePastThreshold = distance(info.offset, { x: 0, y: 0 }) >= 3;
            if (!isPanStarted && !isDistancePastThreshold)
                return;
            var point = info.point;
            var timestamp = getFrameData().timestamp;
            _this.history.push((0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, point), { timestamp: timestamp }));
            var _a = _this.handlers, onStart = _a.onStart, onMove = _a.onMove;
            if (!isPanStarted) {
                onStart && onStart(_this.lastMoveEvent, info);
                _this.startEvent = _this.lastMoveEvent;
            }
            onMove && onMove(_this.lastMoveEvent, info);
        };
        this.handlePointerMove = function (event, info) {
            _this.lastMoveEvent = event;
            _this.lastMoveEventInfo = transformPoint(info, _this.transformPagePoint);
            // Because Safari doesn't trigger mouseup events when it's above a `<select>`
            if (isMouseEvent(event) && event.buttons === 0) {
                _this.handlePointerUp(event, info);
                return;
            }
            // Throttle mouse move event to once per frame
            es.update(_this.updatePoint, true);
        };
        this.handlePointerUp = function (event, info) {
            _this.end();
            var _a = _this.handlers, onEnd = _a.onEnd, onSessionEnd = _a.onSessionEnd;
            var panInfo = getPanInfo(transformPoint(info, _this.transformPagePoint), _this.history);
            if (_this.startEvent && onEnd) {
                onEnd(event, panInfo);
            }
            onSessionEnd && onSessionEnd(event, panInfo);
        };
        // If we have more than one touch, don't start detecting this gesture
        if (isTouchEvent(event) && event.touches.length > 1)
            return;
        this.handlers = handlers;
        this.transformPagePoint = transformPagePoint;
        var info = extractEventInfo(event);
        var initialInfo = transformPoint(info, this.transformPagePoint);
        var point = initialInfo.point;
        var timestamp = getFrameData().timestamp;
        this.history = [(0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, point), { timestamp: timestamp })];
        var onSessionStart = handlers.onSessionStart;
        onSessionStart &&
            onSessionStart(event, getPanInfo(initialInfo, this.history));
        this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
    }
    PanSession.prototype.updateHandlers = function (handlers) {
        this.handlers = handlers;
    };
    PanSession.prototype.end = function () {
        this.removeListeners && this.removeListeners();
        cancelSync.update(this.updatePoint);
    };
    return PanSession;
}());
function transformPoint(info, transformPagePoint) {
    return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo(_a, history) {
    var point = _a.point;
    return {
        point: point,
        delta: subtractPoint(point, lastDevicePoint(history)),
        offset: subtractPoint(point, startDevicePoint(history)),
        velocity: PanSession_getVelocity(history, 0.1),
    };
}
function startDevicePoint(history) {
    return history[0];
}
function lastDevicePoint(history) {
    return history[history.length - 1];
}
function PanSession_getVelocity(history, timeDelta) {
    if (history.length < 2) {
        return { x: 0, y: 0 };
    }
    var i = history.length - 1;
    var timestampedPoint = null;
    var lastPoint = lastDevicePoint(history);
    while (i >= 0) {
        timestampedPoint = history[i];
        if (lastPoint.timestamp - timestampedPoint.timestamp >
            secondsToMilliseconds(timeDelta)) {
            break;
        }
        i--;
    }
    if (!timestampedPoint) {
        return { x: 0, y: 0 };
    }
    var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1000;
    if (time === 0) {
        return { x: 0, y: 0 };
    }
    var currentVelocity = {
        x: (lastPoint.x - timestampedPoint.x) / time,
        y: (lastPoint.y - timestampedPoint.y) / time,
    };
    if (currentVelocity.x === Infinity) {
        currentVelocity.x = 0;
    }
    if (currentVelocity.y === Infinity) {
        currentVelocity.y = 0;
    }
    return currentVelocity;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs




/**
 * Apply constraints to a point. These constraints are both physical along an
 * axis, and an elastic factor that determines how much to constrain the point
 * by if it does lie outside the defined parameters.
 */
function applyConstraints(point, _a, elastic) {
    var min = _a.min, max = _a.max;
    if (min !== undefined && point < min) {
        // If we have a min point defined, and this is outside of that, constrain
        point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
    }
    else if (max !== undefined && point > max) {
        // If we have a max point defined, and this is outside of that, constrain
        point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
    }
    return point;
}
/**
 * Calculate constraints in terms of the viewport when defined relatively to the
 * measured axis. This is measured from the nearest edge, so a max constraint of 200
 * on an axis with a max value of 300 would return a constraint of 500 - axis length
 */
function calcRelativeAxisConstraints(axis, min, max) {
    return {
        min: min !== undefined ? axis.min + min : undefined,
        max: max !== undefined
            ? axis.max + max - (axis.max - axis.min)
            : undefined,
    };
}
/**
 * Calculate constraints in terms of the viewport when
 * defined relatively to the measured bounding box.
 */
function calcRelativeConstraints(layoutBox, _a) {
    var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
    return {
        x: calcRelativeAxisConstraints(layoutBox.x, left, right),
        y: calcRelativeAxisConstraints(layoutBox.y, top, bottom),
    };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative axis
 */
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
    var _a;
    var min = constraintsAxis.min - layoutAxis.min;
    var max = constraintsAxis.max - layoutAxis.max;
    // If the constraints axis is actually smaller than the layout axis then we can
    // flip the constraints
    if (constraintsAxis.max - constraintsAxis.min <
        layoutAxis.max - layoutAxis.min) {
        _a = (0,tslib_es6.__read)([max, min], 2), min = _a[0], max = _a[1];
    }
    return { min: min, max: max };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative box
 */
function calcViewportConstraints(layoutBox, constraintsBox) {
    return {
        x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
        y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y),
    };
}
/**
 * Calculate a transform origin relative to the source axis, between 0-1, that results
 * in an asthetically pleasing scale/transform needed to project from source to target.
 */
function constraints_calcOrigin(source, target) {
    var origin = 0.5;
    var sourceLength = calcLength(source);
    var targetLength = calcLength(target);
    if (targetLength > sourceLength) {
        origin = progress(target.min, target.max - sourceLength, source.min);
    }
    else if (sourceLength > targetLength) {
        origin = progress(source.min, source.max - targetLength, target.min);
    }
    return clamp(0, 1, origin);
}
/**
 * Rebase the calculated viewport constraints relative to the layout.min point.
 */
function rebaseAxisConstraints(layout, constraints) {
    var relativeConstraints = {};
    if (constraints.min !== undefined) {
        relativeConstraints.min = constraints.min - layout.min;
    }
    if (constraints.max !== undefined) {
        relativeConstraints.max = constraints.max - layout.min;
    }
    return relativeConstraints;
}
var defaultElastic = 0.35;
/**
 * Accepts a dragElastic prop and returns resolved elastic values for each axis.
 */
function resolveDragElastic(dragElastic) {
    if (dragElastic === void 0) { dragElastic = defaultElastic; }
    if (dragElastic === false) {
        dragElastic = 0;
    }
    else if (dragElastic === true) {
        dragElastic = defaultElastic;
    }
    return {
        x: resolveAxisElastic(dragElastic, "left", "right"),
        y: resolveAxisElastic(dragElastic, "top", "bottom"),
    };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
    return {
        min: resolvePointElastic(dragElastic, minLabel),
        max: resolvePointElastic(dragElastic, maxLabel),
    };
}
function resolvePointElastic(dragElastic, label) {
    var _a;
    return typeof dragElastic === "number"
        ? dragElastic
        : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs
/**
 * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
 * it's easier to consider each axis individually. This function returns a bounding box
 * as a map of single-axis min/max values.
 */
function convertBoundingBoxToBox(_a) {
    var top = _a.top, left = _a.left, right = _a.right, bottom = _a.bottom;
    return {
        x: { min: left, max: right },
        y: { min: top, max: bottom },
    };
}
function convertBoxToBoundingBox(_a) {
    var x = _a.x, y = _a.y;
    return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
/**
 * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
 * provided by Framer to allow measured points to be corrected for device scaling. This is used
 * when measuring DOM elements and DOM event points.
 */
function transformBoxPoints(point, transformPoint) {
    if (!transformPoint)
        return point;
    var topLeft = transformPoint({ x: point.left, y: point.top });
    var bottomRight = transformPoint({ x: point.right, y: point.bottom });
    return {
        top: topLeft.y,
        left: topLeft.x,
        bottom: bottomRight.y,
        right: bottomRight.x,
    };
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/utils/measure.mjs



function measureViewportBox(instance, transformPoint) {
    return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint));
}
function measurePageBox(element, rootProjectionNode, transformPagePoint) {
    var viewportBox = measureViewportBox(element, transformPagePoint);
    var scroll = rootProjectionNode.scroll;
    if (scroll) {
        translateAxis(viewportBox.x, scroll.x);
        translateAxis(viewportBox.y, scroll.y);
    }
    return viewportBox;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs



















var elementDragControls = new WeakMap();
/**
 *
 */
// let latestPointerEvent: AnyPointerEvent
var VisualElementDragControls = /** @class */ (function () {
    function VisualElementDragControls(visualElement) {
        // This is a reference to the global drag gesture lock, ensuring only one component
        // can "capture" the drag of one or both axes.
        // TODO: Look into moving this into pansession?
        this.openGlobalLock = null;
        this.isDragging = false;
        this.currentDirection = null;
        this.originPoint = { x: 0, y: 0 };
        /**
         * The permitted boundaries of travel, in pixels.
         */
        this.constraints = false;
        this.hasMutatedConstraints = false;
        /**
         * The per-axis resolved elastic values.
         */
        this.elastic = createBox();
        this.visualElement = visualElement;
    }
    VisualElementDragControls.prototype.start = function (originEvent, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.snapToCursor, snapToCursor = _c === void 0 ? false : _c;
        /**
         * Don't start dragging if this component is exiting
         */
        if (this.visualElement.isPresent === false)
            return;
        var onSessionStart = function (event) {
            // Stop any animations on both axis values immediately. This allows the user to throw and catch
            // the component.
            _this.stopAnimation();
            if (snapToCursor) {
                _this.snapToCursor(extractEventInfo(event, "page").point);
            }
        };
        var onStart = function (event, info) {
            var _a;
            // Attempt to grab the global drag gesture lock - maybe make this part of PanSession
            var _b = _this.getProps(), drag = _b.drag, dragPropagation = _b.dragPropagation, onDragStart = _b.onDragStart;
            if (drag && !dragPropagation) {
                if (_this.openGlobalLock)
                    _this.openGlobalLock();
                _this.openGlobalLock = getGlobalLock(drag);
                // If we don 't have the lock, don't start dragging
                if (!_this.openGlobalLock)
                    return;
            }
            _this.isDragging = true;
            _this.currentDirection = null;
            _this.resolveConstraints();
            if (_this.visualElement.projection) {
                _this.visualElement.projection.isAnimationBlocked = true;
                _this.visualElement.projection.target = undefined;
            }
            /**
             * Record gesture origin
             */
            eachAxis(function (axis) {
                var _a, _b;
                var current = _this.getAxisMotionValue(axis).get() || 0;
                /**
                 * If the MotionValue is a percentage value convert to px
                 */
                if (percent.test(current)) {
                    var measuredAxis = (_b = (_a = _this.visualElement.projection) === null || _a === void 0 ? void 0 : _a.layout) === null || _b === void 0 ? void 0 : _b.actual[axis];
                    if (measuredAxis) {
                        var length_1 = calcLength(measuredAxis);
                        current = length_1 * (parseFloat(current) / 100);
                    }
                }
                _this.originPoint[axis] = current;
            });
            // Fire onDragStart event
            onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(event, info);
            (_a = _this.visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Drag, true);
        };
        var onMove = function (event, info) {
            // latestPointerEvent = event
            var _a = _this.getProps(), dragPropagation = _a.dragPropagation, dragDirectionLock = _a.dragDirectionLock, onDirectionLock = _a.onDirectionLock, onDrag = _a.onDrag;
            // If we didn't successfully receive the gesture lock, early return.
            if (!dragPropagation && !_this.openGlobalLock)
                return;
            var offset = info.offset;
            // Attempt to detect drag direction if directionLock is true
            if (dragDirectionLock && _this.currentDirection === null) {
                _this.currentDirection = getCurrentDirection(offset);
                // If we've successfully set a direction, notify listener
                if (_this.currentDirection !== null) {
                    onDirectionLock === null || onDirectionLock === void 0 ? void 0 : onDirectionLock(_this.currentDirection);
                }
                return;
            }
            // Update each point with the latest position
            _this.updateAxis("x", info.point, offset);
            _this.updateAxis("y", info.point, offset);
            /**
             * Ideally we would leave the renderer to fire naturally at the end of
             * this frame but if the element is about to change layout as the result
             * of a re-render we want to ensure the browser can read the latest
             * bounding box to ensure the pointer and element don't fall out of sync.
             */
            _this.visualElement.syncRender();
            /**
             * This must fire after the syncRender call as it might trigger a state
             * change which itself might trigger a layout update.
             */
            onDrag === null || onDrag === void 0 ? void 0 : onDrag(event, info);
        };
        var onSessionEnd = function (event, info) {
            return _this.stop(event, info);
        };
        this.panSession = new PanSession(originEvent, {
            onSessionStart: onSessionStart,
            onStart: onStart,
            onMove: onMove,
            onSessionEnd: onSessionEnd,
        }, { transformPagePoint: this.visualElement.getTransformPagePoint() });
    };
    VisualElementDragControls.prototype.stop = function (event, info) {
        var isDragging = this.isDragging;
        this.cancel();
        if (!isDragging)
            return;
        var velocity = info.velocity;
        this.startAnimation(velocity);
        var onDragEnd = this.getProps().onDragEnd;
        onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(event, info);
    };
    VisualElementDragControls.prototype.cancel = function () {
        var _a, _b;
        this.isDragging = false;
        if (this.visualElement.projection) {
            this.visualElement.projection.isAnimationBlocked = false;
        }
        (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
        this.panSession = undefined;
        var dragPropagation = this.getProps().dragPropagation;
        if (!dragPropagation && this.openGlobalLock) {
            this.openGlobalLock();
            this.openGlobalLock = null;
        }
        (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
    };
    VisualElementDragControls.prototype.updateAxis = function (axis, _point, offset) {
        var drag = this.getProps().drag;
        // If we're not dragging this axis, do an early return.
        if (!offset || !shouldDrag(axis, drag, this.currentDirection))
            return;
        var axisValue = this.getAxisMotionValue(axis);
        var next = this.originPoint[axis] + offset[axis];
        // Apply constraints
        if (this.constraints && this.constraints[axis]) {
            next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
        }
        axisValue.set(next);
    };
    VisualElementDragControls.prototype.resolveConstraints = function () {
        var _this = this;
        var _a = this.getProps(), dragConstraints = _a.dragConstraints, dragElastic = _a.dragElastic;
        var layout = (this.visualElement.projection || {}).layout;
        var prevConstraints = this.constraints;
        if (dragConstraints && isRefObject(dragConstraints)) {
            if (!this.constraints) {
                this.constraints = this.resolveRefConstraints();
            }
        }
        else {
            if (dragConstraints && layout) {
                this.constraints = calcRelativeConstraints(layout.actual, dragConstraints);
            }
            else {
                this.constraints = false;
            }
        }
        this.elastic = resolveDragElastic(dragElastic);
        /**
         * If we're outputting to external MotionValues, we want to rebase the measured constraints
         * from viewport-relative to component-relative.
         */
        if (prevConstraints !== this.constraints &&
            layout &&
            this.constraints &&
            !this.hasMutatedConstraints) {
            eachAxis(function (axis) {
                if (_this.getAxisMotionValue(axis)) {
                    _this.constraints[axis] = rebaseAxisConstraints(layout.actual[axis], _this.constraints[axis]);
                }
            });
        }
    };
    VisualElementDragControls.prototype.resolveRefConstraints = function () {
        var _a = this.getProps(), constraints = _a.dragConstraints, onMeasureDragConstraints = _a.onMeasureDragConstraints;
        if (!constraints || !isRefObject(constraints))
            return false;
        var constraintsElement = constraints.current;
        (0,dist.invariant)(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
        var projection = this.visualElement.projection;
        // TODO
        if (!projection || !projection.layout)
            return false;
        var constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
        var measuredConstraints = calcViewportConstraints(projection.layout.actual, constraintsBox);
        /**
         * If there's an onMeasureDragConstraints listener we call it and
         * if different constraints are returned, set constraints to that
         */
        if (onMeasureDragConstraints) {
            var userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
            this.hasMutatedConstraints = !!userConstraints;
            if (userConstraints) {
                measuredConstraints = convertBoundingBoxToBox(userConstraints);
            }
        }
        return measuredConstraints;
    };
    VisualElementDragControls.prototype.startAnimation = function (velocity) {
        var _this = this;
        var _a = this.getProps(), drag = _a.drag, dragMomentum = _a.dragMomentum, dragElastic = _a.dragElastic, dragTransition = _a.dragTransition, dragSnapToOrigin = _a.dragSnapToOrigin, onDragTransitionEnd = _a.onDragTransitionEnd;
        var constraints = this.constraints || {};
        var momentumAnimations = eachAxis(function (axis) {
            var _a;
            if (!shouldDrag(axis, drag, _this.currentDirection)) {
                return;
            }
            var transition = (_a = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a !== void 0 ? _a : {};
            if (dragSnapToOrigin)
                transition = { min: 0, max: 0 };
            /**
             * Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
             * of spring animations so we should look into adding a disable spring option to `inertia`.
             * We could do something here where we affect the `bounceStiffness` and `bounceDamping`
             * using the value of `dragElastic`.
             */
            var bounceStiffness = dragElastic ? 200 : 1000000;
            var bounceDamping = dragElastic ? 40 : 10000000;
            var inertia = (0,tslib_es6.__assign)((0,tslib_es6.__assign)({ type: "inertia", velocity: dragMomentum ? velocity[axis] : 0, bounceStiffness: bounceStiffness, bounceDamping: bounceDamping, timeConstant: 750, restDelta: 1, restSpeed: 10 }, dragTransition), transition);
            // If we're not animating on an externally-provided `MotionValue` we can use the
            // component's animation controls which will handle interactions with whileHover (etc),
            // otherwise we just have to animate the `MotionValue` itself.
            return _this.startAxisValueAnimation(axis, inertia);
        });
        // Run all animations and then resolve the new drag constraints.
        return Promise.all(momentumAnimations).then(onDragTransitionEnd);
    };
    VisualElementDragControls.prototype.startAxisValueAnimation = function (axis, transition) {
        var axisValue = this.getAxisMotionValue(axis);
        return startAnimation(axis, axisValue, 0, transition);
    };
    VisualElementDragControls.prototype.stopAnimation = function () {
        var _this = this;
        eachAxis(function (axis) { return _this.getAxisMotionValue(axis).stop(); });
    };
    /**
     * Drag works differently depending on which props are provided.
     *
     * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
     * - Otherwise, we apply the delta to the x/y motion values.
     */
    VisualElementDragControls.prototype.getAxisMotionValue = function (axis) {
        var _a, _b;
        var dragKey = "_drag" + axis.toUpperCase();
        var externalMotionValue = this.visualElement.getProps()[dragKey];
        return externalMotionValue
            ? externalMotionValue
            : this.visualElement.getValue(axis, (_b = (_a = this.visualElement.getProps().initial) === null || _a === void 0 ? void 0 : _a[axis]) !== null && _b !== void 0 ? _b : 0);
    };
    VisualElementDragControls.prototype.snapToCursor = function (point) {
        var _this = this;
        eachAxis(function (axis) {
            var drag = _this.getProps().drag;
            // If we're not dragging this axis, do an early return.
            if (!shouldDrag(axis, drag, _this.currentDirection))
                return;
            var projection = _this.visualElement.projection;
            var axisValue = _this.getAxisMotionValue(axis);
            if (projection && projection.layout) {
                var _a = projection.layout.actual[axis], min = _a.min, max = _a.max;
                axisValue.set(point[axis] - mix(min, max, 0.5));
            }
        });
    };
    /**
     * When the viewport resizes we want to check if the measured constraints
     * have changed and, if so, reposition the element within those new constraints
     * relative to where it was before the resize.
     */
    VisualElementDragControls.prototype.scalePositionWithinConstraints = function () {
        var _this = this;
        var _a;
        var _b = this.getProps(), drag = _b.drag, dragConstraints = _b.dragConstraints;
        var projection = this.visualElement.projection;
        if (!isRefObject(dragConstraints) || !projection || !this.constraints)
            return;
        /**
         * Stop current animations as there can be visual glitching if we try to do
         * this mid-animation
         */
        this.stopAnimation();
        /**
         * Record the relative position of the dragged element relative to the
         * constraints box and save as a progress value.
         */
        var boxProgress = { x: 0, y: 0 };
        eachAxis(function (axis) {
            var axisValue = _this.getAxisMotionValue(axis);
            if (axisValue) {
                var latest = axisValue.get();
                boxProgress[axis] = constraints_calcOrigin({ min: latest, max: latest }, _this.constraints[axis]);
            }
        });
        /**
         * Update the layout of this element and resolve the latest drag constraints
         */
        var transformTemplate = this.visualElement.getProps().transformTemplate;
        this.visualElement.getInstance().style.transform = transformTemplate
            ? transformTemplate({}, "")
            : "none";
        (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
        projection.updateLayout();
        this.resolveConstraints();
        /**
         * For each axis, calculate the current progress of the layout axis
         * within the new constraints.
         */
        eachAxis(function (axis) {
            if (!shouldDrag(axis, drag, null))
                return;
            /**
             * Calculate a new transform based on the previous box progress
             */
            var axisValue = _this.getAxisMotionValue(axis);
            var _a = _this.constraints[axis], min = _a.min, max = _a.max;
            axisValue.set(mix(min, max, boxProgress[axis]));
        });
    };
    VisualElementDragControls.prototype.addListeners = function () {
        var _this = this;
        var _a;
        elementDragControls.set(this.visualElement, this);
        var element = this.visualElement.getInstance();
        /**
         * Attach a pointerdown event listener on this DOM element to initiate drag tracking.
         */
        var stopPointerListener = addPointerEvent(element, "pointerdown", function (event) {
            var _a = _this.getProps(), drag = _a.drag, _b = _a.dragListener, dragListener = _b === void 0 ? true : _b;
            drag && dragListener && _this.start(event);
        });
        var measureDragConstraints = function () {
            var dragConstraints = _this.getProps().dragConstraints;
            if (isRefObject(dragConstraints)) {
                _this.constraints = _this.resolveRefConstraints();
            }
        };
        var projection = this.visualElement.projection;
        var stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
        if (projection && !projection.layout) {
            (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
            projection.updateLayout();
        }
        measureDragConstraints();
        /**
         * Attach a window resize listener to scale the draggable target within its defined
         * constraints as the window resizes.
         */
        var stopResizeListener = addDomEvent(window, "resize", function () {
            _this.scalePositionWithinConstraints();
        });
        /**
         * If the element's layout changes, calculate the delta and apply that to
         * the drag gesture's origin point.
         */
        projection.addEventListener("didUpdate", (function (_a) {
            var delta = _a.delta, hasLayoutChanged = _a.hasLayoutChanged;
            if (_this.isDragging && hasLayoutChanged) {
                eachAxis(function (axis) {
                    var motionValue = _this.getAxisMotionValue(axis);
                    if (!motionValue)
                        return;
                    _this.originPoint[axis] += delta[axis].translate;
                    motionValue.set(motionValue.get() + delta[axis].translate);
                });
                _this.visualElement.syncRender();
            }
        }));
        return function () {
            stopResizeListener();
            stopPointerListener();
            stopMeasureLayoutListener();
        };
    };
    VisualElementDragControls.prototype.getProps = function () {
        var props = this.visualElement.getProps();
        var _a = props.drag, drag = _a === void 0 ? false : _a, _b = props.dragDirectionLock, dragDirectionLock = _b === void 0 ? false : _b, _c = props.dragPropagation, dragPropagation = _c === void 0 ? false : _c, _d = props.dragConstraints, dragConstraints = _d === void 0 ? false : _d, _e = props.dragElastic, dragElastic = _e === void 0 ? defaultElastic : _e, _f = props.dragMomentum, dragMomentum = _f === void 0 ? true : _f;
        return (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, props), { drag: drag, dragDirectionLock: dragDirectionLock, dragPropagation: dragPropagation, dragConstraints: dragConstraints, dragElastic: dragElastic, dragMomentum: dragMomentum });
    };
    return VisualElementDragControls;
}());
function shouldDrag(direction, drag, currentDirection) {
    return ((drag === true || drag === direction) &&
        (currentDirection === null || currentDirection === direction));
}
/**
 * Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
 * than the provided threshold, return `null`.
 *
 * @param offset - The x/y offset from origin.
 * @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
 */
function getCurrentDirection(offset, lockThreshold) {
    if (lockThreshold === void 0) { lockThreshold = 10; }
    var direction = null;
    if (Math.abs(offset.y) > lockThreshold) {
        direction = "y";
    }
    else if (Math.abs(offset.x) > lockThreshold) {
        direction = "x";
    }
    return direction;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/gestures/drag/use-drag.mjs




/**
 * A hook that allows an element to be dragged.
 *
 * @internal
 */
function useDrag(props) {
    var groupDragControls = props.dragControls, visualElement = props.visualElement;
    var dragControls = useConstant(function () { return new VisualElementDragControls(visualElement); });
    // If we've been provided a DragControls for manual control over the drag gesture,
    // subscribe this component to it on mount.
    (0,react.useEffect)(function () { return groupDragControls && groupDragControls.subscribe(dragControls); }, [dragControls, groupDragControls]);
    // Apply the event listeners to the element
    (0,react.useEffect)(function () { return dragControls.addListeners(); }, [dragControls]);
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/gestures/use-pan-gesture.mjs






/**
 *
 * @param handlers -
 * @param ref -
 *
 * @internalremarks
 * Currently this sets new pan gesture functions every render. The memo route has been explored
 * in the past but ultimately we're still creating new functions every render. An optimisation
 * to explore is creating the pan gestures and loading them into a `ref`.
 *
 * @internal
 */
function usePanGesture(_a) {
    var onPan = _a.onPan, onPanStart = _a.onPanStart, onPanEnd = _a.onPanEnd, onPanSessionStart = _a.onPanSessionStart, visualElement = _a.visualElement;
    var hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
    var panSession = (0,react.useRef)(null);
    var transformPagePoint = (0,react.useContext)(MotionConfigContext).transformPagePoint;
    var handlers = {
        onSessionStart: onPanSessionStart,
        onStart: onPanStart,
        onMove: onPan,
        onEnd: function (event, info) {
            panSession.current = null;
            onPanEnd && onPanEnd(event, info);
        },
    };
    (0,react.useEffect)(function () {
        if (panSession.current !== null) {
            panSession.current.updateHandlers(handlers);
        }
    });
    function onPointerDown(event) {
        panSession.current = new PanSession(event, handlers, {
            transformPagePoint: transformPagePoint,
        });
    }
    usePointerEvent(visualElement, "pointerdown", hasPanEvents && onPointerDown);
    useUnmountEffect(function () { return panSession.current && panSession.current.end(); });
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/features/drag.mjs




var drag = {
    pan: makeRenderlessComponent(usePanGesture),
    drag: makeRenderlessComponent(useDrag),
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/utils/lifecycles.mjs



var names = [
    "LayoutMeasure",
    "BeforeLayoutMeasure",
    "LayoutUpdate",
    "ViewportBoxUpdate",
    "Update",
    "Render",
    "AnimationComplete",
    "LayoutAnimationComplete",
    "AnimationStart",
    "SetAxisTarget",
    "Unmount",
];
function createLifecycles() {
    var managers = names.map(function () { return new SubscriptionManager(); });
    var propSubscriptions = {};
    var lifecycles = {
        clearAllListeners: function () { return managers.forEach(function (manager) { return manager.clear(); }); },
        updatePropListeners: function (props) {
            names.forEach(function (name) {
                var _a;
                var on = "on" + name;
                var propListener = props[on];
                // Unsubscribe existing subscription
                (_a = propSubscriptions[name]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
                // Add new subscription
                if (propListener) {
                    propSubscriptions[name] = lifecycles[on](propListener);
                }
            });
        },
    };
    managers.forEach(function (manager, i) {
        lifecycles["on" + names[i]] = function (handler) { return manager.add(handler); };
        lifecycles["notify" + names[i]] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            manager.notify.apply(manager, (0,tslib_es6.__spreadArray)([], (0,tslib_es6.__read)(args), false));
        };
    });
    return lifecycles;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/utils/motion-values.mjs



function updateMotionValuesFromProps(element, next, prev) {
    var _a;
    for (var key in next) {
        var nextValue = next[key];
        var prevValue = prev[key];
        if (isMotionValue(nextValue)) {
            /**
             * If this is a motion value found in props or style, we want to add it
             * to our visual element's motion value map.
             */
            element.addValue(key, nextValue);
        }
        else if (isMotionValue(prevValue)) {
            /**
             * If we're swapping to a new motion value, create a new motion value
             * from that
             */
            element.addValue(key, motionValue(nextValue));
        }
        else if (prevValue !== nextValue) {
            /**
             * If this is a flat value that has changed, update the motion value
             * or create one if it doesn't exist. We only want to do this if we're
             * not handling the value with our animation state.
             */
            if (element.hasValue(key)) {
                var existingValue = element.getValue(key);
                // TODO: Only update values that aren't being animated or even looked at
                !existingValue.hasAnimated && existingValue.set(nextValue);
            }
            else {
                element.addValue(key, motionValue((_a = element.getStaticValue(key)) !== null && _a !== void 0 ? _a : nextValue));
            }
        }
    }
    // Handle removed values
    for (var key in prev) {
        if (next[key] === undefined)
            element.removeValue(key);
    }
    return next;
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/index.mjs









var visualElement = function (_a) {
    var _b = _a.treeType, treeType = _b === void 0 ? "" : _b, build = _a.build, getBaseTarget = _a.getBaseTarget, makeTargetAnimatable = _a.makeTargetAnimatable, measureViewportBox = _a.measureViewportBox, renderInstance = _a.render, readValueFromInstance = _a.readValueFromInstance, removeValueFromRenderState = _a.removeValueFromRenderState, sortNodePosition = _a.sortNodePosition, scrapeMotionValuesFromProps = _a.scrapeMotionValuesFromProps;
    return function (_a, options) {
        var parent = _a.parent, props = _a.props, presenceId = _a.presenceId, blockInitialAnimation = _a.blockInitialAnimation, visualState = _a.visualState;
        if (options === void 0) { options = {}; }
        var isMounted = false;
        var latestValues = visualState.latestValues, renderState = visualState.renderState;
        /**
         * The instance of the render-specific node that will be hydrated by the
         * exposed React ref. So for example, this visual element can host a
         * HTMLElement, plain object, or Three.js object. The functions provided
         * in VisualElementConfig allow us to interface with this instance.
         */
        var instance;
        /**
         * Manages the subscriptions for a visual element's lifecycle, for instance
         * onRender
         */
        var lifecycles = createLifecycles();
        /**
         * A map of all motion values attached to this visual element. Motion
         * values are source of truth for any given animated value. A motion
         * value might be provided externally by the component via props.
         */
        var values = new Map();
        /**
         * A map of every subscription that binds the provided or generated
         * motion values onChange listeners to this visual element.
         */
        var valueSubscriptions = new Map();
        /**
         * A reference to the previously-provided motion values as returned
         * from scrapeMotionValuesFromProps. We use the keys in here to determine
         * if any motion values need to be removed after props are updated.
         */
        var prevMotionValues = {};
        /**
         * When values are removed from all animation props we need to search
         * for a fallback value to animate to. These values are tracked in baseTarget.
         */
        var baseTarget = (0,tslib_es6.__assign)({}, latestValues);
        // Internal methods ========================
        /**
         * On mount, this will be hydrated with a callback to disconnect
         * this visual element from its parent on unmount.
         */
        var removeFromVariantTree;
        /**
         * Render the element with the latest styles outside of the React
         * render lifecycle
         */
        function render() {
            if (!instance || !isMounted)
                return;
            triggerBuild();
            renderInstance(instance, renderState, props.style, element.projection);
        }
        function triggerBuild() {
            build(element, renderState, latestValues, options, props);
        }
        function update() {
            lifecycles.notifyUpdate(latestValues);
        }
        /**
         *
         */
        function bindToMotionValue(key, value) {
            var removeOnChange = value.onChange(function (latestValue) {
                latestValues[key] = latestValue;
                props.onUpdate && es.update(update, false, true);
            });
            var removeOnRenderRequest = value.onRenderRequest(element.scheduleRender);
            valueSubscriptions.set(key, function () {
                removeOnChange();
                removeOnRenderRequest();
            });
        }
        /**
         * Any motion values that are provided to the element when created
         * aren't yet bound to the element, as this would technically be impure.
         * However, we iterate through the motion values and set them to the
         * initial values for this component.
         *
         * TODO: This is impure and we should look at changing this to run on mount.
         * Doing so will break some tests but this isn't neccessarily a breaking change,
         * more a reflection of the test.
         */
        var initialMotionValues = scrapeMotionValuesFromProps(props);
        for (var key in initialMotionValues) {
            var value = initialMotionValues[key];
            if (latestValues[key] !== undefined && isMotionValue(value)) {
                value.set(latestValues[key], false);
            }
        }
        /**
         * Determine what role this visual element should take in the variant tree.
         */
        var isControllingVariants = checkIfControllingVariants(props);
        var isVariantNode = checkIfVariantNode(props);
        var element = (0,tslib_es6.__assign)((0,tslib_es6.__assign)({ treeType: treeType, 
            /**
             * This is a mirror of the internal instance prop, which keeps
             * VisualElement type-compatible with React's RefObject.
             */
            current: null, 
            /**
             * The depth of this visual element within the visual element tree.
             */
            depth: parent ? parent.depth + 1 : 0, parent: parent, children: new Set(), 
            /**
             *
             */
            presenceId: presenceId, 
            /**
             * If this component is part of the variant tree, it should track
             * any children that are also part of the tree. This is essentially
             * a shadow tree to simplify logic around how to stagger over children.
             */
            variantChildren: isVariantNode ? new Set() : undefined, 
            /**
             * Whether this instance is visible. This can be changed imperatively
             * by the projection tree, is analogous to CSS's visibility in that
             * hidden elements should take up layout, and needs enacting by the configured
             * render function.
             */
            isVisible: undefined, 
            /**
             * Normally, if a component is controlled by a parent's variants, it can
             * rely on that ancestor to trigger animations further down the tree.
             * However, if a component is created after its parent is mounted, the parent
             * won't trigger that mount animation so the child needs to.
             *
             * TODO: This might be better replaced with a method isParentMounted
             */
            manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()), 
            /**
             * This can be set by AnimatePresence to force components that mount
             * at the same time as it to mount as if they have initial={false} set.
             */
            blockInitialAnimation: blockInitialAnimation, 
            /**
             * Determine whether this component has mounted yet. This is mostly used
             * by variant children to determine whether they need to trigger their
             * own animations on mount.
             */
            isMounted: function () { return Boolean(instance); }, mount: function (newInstance) {
                isMounted = true;
                instance = element.current = newInstance;
                if (element.projection) {
                    element.projection.mount(newInstance);
                }
                if (isVariantNode && parent && !isControllingVariants) {
                    removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
                }
                parent === null || parent === void 0 ? void 0 : parent.children.add(element);
                element.setProps(props);
            }, 
            /**
             *
             */
            unmount: function () {
                var _a;
                (_a = element.projection) === null || _a === void 0 ? void 0 : _a.unmount();
                cancelSync.update(update);
                cancelSync.render(render);
                valueSubscriptions.forEach(function (remove) { return remove(); });
                removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
                parent === null || parent === void 0 ? void 0 : parent.children.delete(element);
                lifecycles.clearAllListeners();
                instance = undefined;
                isMounted = false;
            }, 
            /**
             * Add a child visual element to our set of children.
             */
            addVariantChild: function (child) {
                var _a;
                var closestVariantNode = element.getClosestVariantNode();
                if (closestVariantNode) {
                    (_a = closestVariantNode.variantChildren) === null || _a === void 0 ? void 0 : _a.add(child);
                    return function () {
                        return closestVariantNode.variantChildren.delete(child);
                    };
                }
            }, sortNodePosition: function (other) {
                /**
                 * If these nodes aren't even of the same type we can't compare their depth.
                 */
                if (!sortNodePosition || treeType !== other.treeType)
                    return 0;
                return sortNodePosition(element.getInstance(), other.getInstance());
            }, 
            /**
             * Returns the closest variant node in the tree starting from
             * this visual element.
             */
            getClosestVariantNode: function () {
                return isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode();
            }, 
            /**
             * Expose the latest layoutId prop.
             */
            getLayoutId: function () { return props.layoutId; }, 
            /**
             * Returns the current instance.
             */
            getInstance: function () { return instance; }, 
            /**
             * Get/set the latest static values.
             */
            getStaticValue: function (key) { return latestValues[key]; }, setStaticValue: function (key, value) { return (latestValues[key] = value); }, 
            /**
             * Returns the latest motion value state. Currently only used to take
             * a snapshot of the visual element - perhaps this can return the whole
             * visual state
             */
            getLatestValues: function () { return latestValues; }, 
            /**
             * Set the visiblity of the visual element. If it's changed, schedule
             * a render to reflect these changes.
             */
            setVisibility: function (visibility) {
                if (element.isVisible === visibility)
                    return;
                element.isVisible = visibility;
                element.scheduleRender();
            }, 
            /**
             * Make a target animatable by Popmotion. For instance, if we're
             * trying to animate width from 100px to 100vw we need to measure 100vw
             * in pixels to determine what we really need to animate to. This is also
             * pluggable to support Framer's custom value types like Color,
             * and CSS variables.
             */
            makeTargetAnimatable: function (target, canMutate) {
                if (canMutate === void 0) { canMutate = true; }
                return makeTargetAnimatable(element, target, props, canMutate);
            }, 
            /**
             * Measure the current viewport box with or without transforms.
             * Only measures axis-aligned boxes, rotate and skew must be manually
             * removed with a re-render to work.
             */
            measureViewportBox: function () {
                return measureViewportBox(instance, props);
            }, 
            // Motion values ========================
            /**
             * Add a motion value and bind it to this visual element.
             */
            addValue: function (key, value) {
                // Remove existing value if it exists
                if (element.hasValue(key))
                    element.removeValue(key);
                values.set(key, value);
                latestValues[key] = value.get();
                bindToMotionValue(key, value);
            }, 
            /**
             * Remove a motion value and unbind any active subscriptions.
             */
            removeValue: function (key) {
                var _a;
                values.delete(key);
                (_a = valueSubscriptions.get(key)) === null || _a === void 0 ? void 0 : _a();
                valueSubscriptions.delete(key);
                delete latestValues[key];
                removeValueFromRenderState(key, renderState);
            }, 
            /**
             * Check whether we have a motion value for this key
             */
            hasValue: function (key) { return values.has(key); }, 
            /**
             * Get a motion value for this key. If called with a default
             * value, we'll create one if none exists.
             */
            getValue: function (key, defaultValue) {
                var value = values.get(key);
                if (value === undefined && defaultValue !== undefined) {
                    value = motionValue(defaultValue);
                    element.addValue(key, value);
                }
                return value;
            }, 
            /**
             * Iterate over our motion values.
             */
            forEachValue: function (callback) { return values.forEach(callback); }, 
            /**
             * If we're trying to animate to a previously unencountered value,
             * we need to check for it in our state and as a last resort read it
             * directly from the instance (which might have performance implications).
             */
            readValue: function (key) {
                var _a;
                return (_a = latestValues[key]) !== null && _a !== void 0 ? _a : readValueFromInstance(instance, key, options);
            }, 
            /**
             * Set the base target to later animate back to. This is currently
             * only hydrated on creation and when we first read a value.
             */
            setBaseTarget: function (key, value) {
                baseTarget[key] = value;
            }, 
            /**
             * Find the base target for a value thats been removed from all animation
             * props.
             */
            getBaseTarget: function (key) {
                if (getBaseTarget) {
                    var target = getBaseTarget(props, key);
                    if (target !== undefined && !isMotionValue(target))
                        return target;
                }
                return baseTarget[key];
            } }, lifecycles), { 
            /**
             * Build the renderer state based on the latest visual state.
             */
            build: function () {
                triggerBuild();
                return renderState;
            }, 
            /**
             * Schedule a render on the next animation frame.
             */
            scheduleRender: function () {
                es.render(render, false, true);
            }, 
            /**
             * Synchronously fire render. It's prefered that we batch renders but
             * in many circumstances, like layout measurement, we need to run this
             * synchronously. However in those instances other measures should be taken
             * to batch reads/writes.
             */
            syncRender: render, 
            /**
             * Update the provided props. Ensure any newly-added motion values are
             * added to our map, old ones removed, and listeners updated.
             */
            setProps: function (newProps) {
                if (newProps.transformTemplate || props.transformTemplate) {
                    element.scheduleRender();
                }
                props = newProps;
                lifecycles.updatePropListeners(newProps);
                prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps(props), prevMotionValues);
            }, getProps: function () { return props; }, 
            // Variants ==============================
            /**
             * Returns the variant definition with a given name.
             */
            getVariant: function (name) { var _a; return (_a = props.variants) === null || _a === void 0 ? void 0 : _a[name]; }, 
            /**
             * Returns the defined default transition on this component.
             */
            getDefaultTransition: function () { return props.transition; }, getTransformPagePoint: function () {
                return props.transformPagePoint;
            }, 
            /**
             * Used by child variant nodes to get the closest ancestor variant props.
             */
            getVariantContext: function (startAtParent) {
                if (startAtParent === void 0) { startAtParent = false; }
                if (startAtParent)
                    return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
                if (!isControllingVariants) {
                    var context_1 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
                    if (props.initial !== undefined) {
                        context_1.initial = props.initial;
                    }
                    return context_1;
                }
                var context = {};
                for (var i = 0; i < numVariantProps; i++) {
                    var name_1 = variantProps[i];
                    var prop = props[name_1];
                    if (isVariantLabel(prop) || prop === false) {
                        context[name_1] = prop;
                    }
                }
                return context;
            } });
        return element;
    };
};
var variantProps = (0,tslib_es6.__spreadArray)(["initial"], (0,tslib_es6.__read)(variantPriorityOrder), false);
var numVariantProps = variantProps.length;



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs



function css_variables_conversion_isCSSVariable(value) {
    return typeof value === "string" && value.startsWith("var(--");
}
/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
    var match = cssVariableRegex.exec(current);
    if (!match)
        return [,];
    var _a = (0,tslib_es6.__read)(match, 3), token = _a[1], fallback = _a[2];
    return [token, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth) {
    if (depth === void 0) { depth = 1; }
    (0,dist.invariant)(depth <= maxDepth, "Max CSS variable fallback depth detected in property \"".concat(current, "\". This may indicate a circular fallback dependency."));
    var _a = (0,tslib_es6.__read)(parseCSSVariable(current), 2), token = _a[0], fallback = _a[1];
    // No CSS variable detected
    if (!token)
        return;
    // Attempt to read this CSS variable off the element
    var resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
        return resolved.trim();
    }
    else if (css_variables_conversion_isCSSVariable(fallback)) {
        // The fallback might itself be a CSS variable, in which case we attempt to resolve it too.
        return getVariableValue(fallback, element, depth + 1);
    }
    else {
        return fallback;
    }
}
/**
 * Resolve CSS variables from
 *
 * @internal
 */
function resolveCSSVariables(visualElement, _a, transitionEnd) {
    var _b;
    var target = (0,tslib_es6.__rest)(_a, []);
    var element = visualElement.getInstance();
    if (!(element instanceof Element))
        return { target: target, transitionEnd: transitionEnd };
    // If `transitionEnd` isn't `undefined`, clone it. We could clone `target` and `transitionEnd`
    // only if they change but I think this reads clearer and this isn't a performance-critical path.
    if (transitionEnd) {
        transitionEnd = (0,tslib_es6.__assign)({}, transitionEnd);
    }
    // Go through existing `MotionValue`s and ensure any existing CSS variables are resolved
    visualElement.forEachValue(function (value) {
        var current = value.get();
        if (!css_variables_conversion_isCSSVariable(current))
            return;
        var resolved = getVariableValue(current, element);
        if (resolved)
            value.set(resolved);
    });
    // Cycle through every target property and resolve CSS variables. Currently
    // we only read single-var properties like `var(--foo)`, not `calc(var(--foo) + 20px)`
    for (var key in target) {
        var current = target[key];
        if (!css_variables_conversion_isCSSVariable(current))
            continue;
        var resolved = getVariableValue(current, element);
        if (!resolved)
            continue;
        // Clone target if it hasn't already been
        target[key] = resolved;
        // If the user hasn't already set this key on `transitionEnd`, set it to the unresolved
        // CSS variable. This will ensure that after the animation the component will reflect
        // changes in the value of the CSS variable.
        if (transitionEnd)
            (_b = transitionEnd[key]) !== null && _b !== void 0 ? _b : (transitionEnd[key] = current);
    }
    return { target: target, transitionEnd: transitionEnd };
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs







var positionalKeys = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "x",
    "y",
]);
var isPositionalKey = function (key) { return positionalKeys.has(key); };
var hasPositionalKey = function (target) {
    return Object.keys(target).some(isPositionalKey);
};
var setAndResetVelocity = function (value, to) {
    // Looks odd but setting it twice doesn't render, it'll just
    // set both prev and current to the latest value
    value.set(to, false);
    value.set(to);
};
var isNumOrPxType = function (v) {
    return v === number || v === px;
};
var BoundingBoxDimension;
(function (BoundingBoxDimension) {
    BoundingBoxDimension["width"] = "width";
    BoundingBoxDimension["height"] = "height";
    BoundingBoxDimension["left"] = "left";
    BoundingBoxDimension["right"] = "right";
    BoundingBoxDimension["top"] = "top";
    BoundingBoxDimension["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));
var getPosFromMatrix = function (matrix, pos) {
    return parseFloat(matrix.split(", ")[pos]);
};
var getTranslateFromMatrix = function (pos2, pos3) {
    return function (_bbox, _a) {
        var transform = _a.transform;
        if (transform === "none" || !transform)
            return 0;
        var matrix3d = transform.match(/^matrix3d\((.+)\)$/);
        if (matrix3d) {
            return getPosFromMatrix(matrix3d[1], pos3);
        }
        else {
            var matrix = transform.match(/^matrix\((.+)\)$/);
            if (matrix) {
                return getPosFromMatrix(matrix[1], pos2);
            }
            else {
                return 0;
            }
        }
    };
};
var transformKeys = new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformProps.filter(function (key) { return !transformKeys.has(key); });
function removeNonTranslationalTransform(visualElement) {
    var removedTransforms = [];
    nonTranslationalTransformKeys.forEach(function (key) {
        var value = visualElement.getValue(key);
        if (value !== undefined) {
            removedTransforms.push([key, value.get()]);
            value.set(key.startsWith("scale") ? 1 : 0);
        }
    });
    // Apply changes to element before measurement
    if (removedTransforms.length)
        visualElement.syncRender();
    return removedTransforms;
}
var positionalValues = {
    // Dimensions
    width: function (_a, _b) {
        var x = _a.x;
        var _c = _b.paddingLeft, paddingLeft = _c === void 0 ? "0" : _c, _d = _b.paddingRight, paddingRight = _d === void 0 ? "0" : _d;
        return x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight);
    },
    height: function (_a, _b) {
        var y = _a.y;
        var _c = _b.paddingTop, paddingTop = _c === void 0 ? "0" : _c, _d = _b.paddingBottom, paddingBottom = _d === void 0 ? "0" : _d;
        return y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom);
    },
    top: function (_bbox, _a) {
        var top = _a.top;
        return parseFloat(top);
    },
    left: function (_bbox, _a) {
        var left = _a.left;
        return parseFloat(left);
    },
    bottom: function (_a, _b) {
        var y = _a.y;
        var top = _b.top;
        return parseFloat(top) + (y.max - y.min);
    },
    right: function (_a, _b) {
        var x = _a.x;
        var left = _b.left;
        return parseFloat(left) + (x.max - x.min);
    },
    // Transform
    x: getTranslateFromMatrix(4, 13),
    y: getTranslateFromMatrix(5, 14),
};
var convertChangedValueTypes = function (target, visualElement, changedKeys) {
    var originBbox = visualElement.measureViewportBox();
    var element = visualElement.getInstance();
    var elementComputedStyle = getComputedStyle(element);
    var display = elementComputedStyle.display;
    var origin = {};
    // If the element is currently set to display: "none", make it visible before
    // measuring the target bounding box
    if (display === "none") {
        visualElement.setStaticValue("display", target.display || "block");
    }
    /**
     * Record origins before we render and update styles
     */
    changedKeys.forEach(function (key) {
        origin[key] = positionalValues[key](originBbox, elementComputedStyle);
    });
    // Apply the latest values (as set in checkAndConvertChangedValueTypes)
    visualElement.syncRender();
    var targetBbox = visualElement.measureViewportBox();
    changedKeys.forEach(function (key) {
        // Restore styles to their **calculated computed style**, not their actual
        // originally set style. This allows us to animate between equivalent pixel units.
        var value = visualElement.getValue(key);
        setAndResetVelocity(value, origin[key]);
        target[key] = positionalValues[key](targetBbox, elementComputedStyle);
    });
    return target;
};
var checkAndConvertChangedValueTypes = function (visualElement, target, origin, transitionEnd) {
    if (origin === void 0) { origin = {}; }
    if (transitionEnd === void 0) { transitionEnd = {}; }
    target = (0,tslib_es6.__assign)({}, target);
    transitionEnd = (0,tslib_es6.__assign)({}, transitionEnd);
    var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
    // We want to remove any transform values that could affect the element's bounding box before
    // it's measured. We'll reapply these later.
    var removedTransformValues = [];
    var hasAttemptedToRemoveTransformValues = false;
    var changedValueTypeKeys = [];
    targetPositionalKeys.forEach(function (key) {
        var value = visualElement.getValue(key);
        if (!visualElement.hasValue(key))
            return;
        var from = origin[key];
        var fromType = findDimensionValueType(from);
        var to = target[key];
        var toType;
        // TODO: The current implementation of this basically throws an error
        // if you try and do value conversion via keyframes. There's probably
        // a way of doing this but the performance implications would need greater scrutiny,
        // as it'd be doing multiple resize-remeasure operations.
        if (isKeyframesTarget(to)) {
            var numKeyframes = to.length;
            var fromIndex = to[0] === null ? 1 : 0;
            from = to[fromIndex];
            fromType = findDimensionValueType(from);
            for (var i = fromIndex; i < numKeyframes; i++) {
                if (!toType) {
                    toType = findDimensionValueType(to[i]);
                    (0,dist.invariant)(toType === fromType ||
                        (isNumOrPxType(fromType) && isNumOrPxType(toType)), "Keyframes must be of the same dimension as the current value");
                }
                else {
                    (0,dist.invariant)(findDimensionValueType(to[i]) === toType, "All keyframes must be of the same type");
                }
            }
        }
        else {
            toType = findDimensionValueType(to);
        }
        if (fromType !== toType) {
            // If they're both just number or px, convert them both to numbers rather than
            // relying on resize/remeasure to convert (which is wasteful in this situation)
            if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
                var current = value.get();
                if (typeof current === "string") {
                    value.set(parseFloat(current));
                }
                if (typeof to === "string") {
                    target[key] = parseFloat(to);
                }
                else if (Array.isArray(to) && toType === px) {
                    target[key] = to.map(parseFloat);
                }
            }
            else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) &&
                (toType === null || toType === void 0 ? void 0 : toType.transform) &&
                (from === 0 || to === 0)) {
                // If one or the other value is 0, it's safe to coerce it to the
                // type of the other without measurement
                if (from === 0) {
                    value.set(toType.transform(from));
                }
                else {
                    target[key] = fromType.transform(to);
                }
            }
            else {
                // If we're going to do value conversion via DOM measurements, we first
                // need to remove non-positional transform values that could affect the bbox measurements.
                if (!hasAttemptedToRemoveTransformValues) {
                    removedTransformValues =
                        removeNonTranslationalTransform(visualElement);
                    hasAttemptedToRemoveTransformValues = true;
                }
                changedValueTypeKeys.push(key);
                transitionEnd[key] =
                    transitionEnd[key] !== undefined
                        ? transitionEnd[key]
                        : target[key];
                setAndResetVelocity(value, to);
            }
        }
    });
    if (changedValueTypeKeys.length) {
        var convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys);
        // If we removed transform values, reapply them before the next render
        if (removedTransformValues.length) {
            removedTransformValues.forEach(function (_a) {
                var _b = (0,tslib_es6.__read)(_a, 2), key = _b[0], value = _b[1];
                visualElement.getValue(key).set(value);
            });
        }
        // Reapply original values
        visualElement.syncRender();
        return { target: convertedTarget, transitionEnd: transitionEnd };
    }
    else {
        return { target: target, transitionEnd: transitionEnd };
    }
};
/**
 * Convert value types for x/y/width/height/top/left/bottom/right
 *
 * Allows animation between `'auto'` -> `'100%'` or `0` -> `'calc(50% - 10vw)'`
 *
 * @internal
 */
function unitConversion(visualElement, target, origin, transitionEnd) {
    return hasPositionalKey(target)
        ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd)
        : { target: target, transitionEnd: transitionEnd };
}



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/utils/parse-dom-variant.mjs



/**
 * Parse a DOM variant to make it animatable. This involves resolving CSS variables
 * and ensuring animations like "20%" => "calc(50vw)" are performed in pixels.
 */
var parseDomVariant = function (visualElement, target, origin, transitionEnd) {
    var resolved = resolveCSSVariables(visualElement, target, transitionEnd);
    target = resolved.target;
    transitionEnd = resolved.transitionEnd;
    return unitConversion(visualElement, target, origin, transitionEnd);
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/html/visual-element.mjs












function visual_element_getComputedStyle(element) {
    return window.getComputedStyle(element);
}
var htmlConfig = {
    treeType: "dom",
    readValueFromInstance: function (domElement, key) {
        if (isTransformProp(key)) {
            var defaultType = getDefaultValueType(key);
            return defaultType ? defaultType.default || 0 : 0;
        }
        else {
            var computedStyle = visual_element_getComputedStyle(domElement);
            return ((isCSSVariable(key)
                ? computedStyle.getPropertyValue(key)
                : computedStyle[key]) || 0);
        }
    },
    sortNodePosition: function (a, b) {
        /**
         * compareDocumentPosition returns a bitmask, by using the bitwise &
         * we're returning true if 2 in that bitmask is set to true. 2 is set
         * to true if b preceeds a.
         */
        return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    },
    getBaseTarget: function (props, key) {
        var _a;
        return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
    },
    measureViewportBox: function (element, _a) {
        var transformPagePoint = _a.transformPagePoint;
        return measureViewportBox(element, transformPagePoint);
    },
    /**
     * Reset the transform on the current Element. This is called as part
     * of a batched process across the entire layout tree. To remove this write
     * cycle it'd be interesting to see if it's possible to "undo" all the current
     * layout transforms up the tree in the same way this.getBoundingBoxWithoutTransforms
     * works
     */
    resetTransform: function (element, domElement, props) {
        var transformTemplate = props.transformTemplate;
        domElement.style.transform = transformTemplate
            ? transformTemplate({}, "")
            : "none";
        // Ensure that whatever happens next, we restore our transform on the next frame
        element.scheduleRender();
    },
    restoreTransform: function (instance, mutableState) {
        instance.style.transform = mutableState.style.transform;
    },
    removeValueFromRenderState: function (key, _a) {
        var vars = _a.vars, style = _a.style;
        delete vars[key];
        delete style[key];
    },
    /**
     * Ensure that HTML and Framer-specific value types like `px`->`%` and `Color`
     * can be animated by Motion.
     */
    makeTargetAnimatable: function (element, _a, _b, isMounted) {
        var transformValues = _b.transformValues;
        if (isMounted === void 0) { isMounted = true; }
        var transition = _a.transition, transitionEnd = _a.transitionEnd, target = (0,tslib_es6.__rest)(_a, ["transition", "transitionEnd"]);
        var origin = getOrigin(target, transition || {}, element);
        /**
         * If Framer has provided a function to convert `Color` etc value types, convert them
         */
        if (transformValues) {
            if (transitionEnd)
                transitionEnd = transformValues(transitionEnd);
            if (target)
                target = transformValues(target);
            if (origin)
                origin = transformValues(origin);
        }
        if (isMounted) {
            checkTargetForNewValues(element, target, origin);
            var parsed = parseDomVariant(element, target, origin, transitionEnd);
            transitionEnd = parsed.transitionEnd;
            target = parsed.target;
        }
        return (0,tslib_es6.__assign)({ transition: transition, transitionEnd: transitionEnd }, target);
    },
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps,
    build: function (element, renderState, latestValues, options, props) {
        if (element.isVisible !== undefined) {
            renderState.style.visibility = element.isVisible
                ? "visible"
                : "hidden";
        }
        buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
    },
    render: renderHTML,
};
var htmlVisualElement = visualElement(htmlConfig);



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/svg/visual-element.mjs











var svgVisualElement = visualElement((0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, htmlConfig), { getBaseTarget: function (props, key) {
        return props[key];
    }, readValueFromInstance: function (domElement, key) {
        var _a;
        if (isTransformProp(key)) {
            return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
        }
        key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
        return domElement.getAttribute(key);
    }, scrapeMotionValuesFromProps: scrape_motion_values_scrapeMotionValuesFromProps, build: function (_element, renderState, latestValues, options, props) {
        buildSVGAttrs(renderState, latestValues, options, props.transformTemplate);
    }, render: renderSVG }));



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs




var create_visual_element_createDomVisualElement = function (Component, options) {
    return isSVGComponent(Component)
        ? svgVisualElement(options, { enableHardwareAcceleration: false })
        : htmlVisualElement(options, { enableHardwareAcceleration: true });
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs


function pixelsToPercent(pixels, axis) {
    if (axis.max === axis.min)
        return 0;
    return (pixels / (axis.max - axis.min)) * 100;
}
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */
var correctBorderRadius = {
    correct: function (latest, node) {
        if (!node.target)
            return latest;
        /**
         * If latest is a string, if it's a percentage we can return immediately as it's
         * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
         */
        if (typeof latest === "string") {
            if (px.test(latest)) {
                latest = parseFloat(latest);
            }
            else {
                return latest;
            }
        }
        /**
         * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
         * pixel value as a percentage of each axis
         */
        var x = pixelsToPercent(latest, node.target.x);
        var y = pixelsToPercent(latest, node.target.y);
        return "".concat(x, "% ").concat(y, "%");
    },
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs




var varToken = "_$css";
var correctBoxShadow = {
    correct: function (latest, _a) {
        var treeScale = _a.treeScale, projectionDelta = _a.projectionDelta;
        var original = latest;
        /**
         * We need to first strip and store CSS variables from the string.
         */
        var containsCSSVariables = latest.includes("var(");
        var cssVariables = [];
        if (containsCSSVariables) {
            latest = latest.replace(cssVariableRegex, function (match) {
                cssVariables.push(match);
                return varToken;
            });
        }
        var shadow = complex.parse(latest);
        // TODO: Doesn't support multiple shadows
        if (shadow.length > 5)
            return original;
        var template = complex.createTransformer(latest);
        var offset = typeof shadow[0] !== "number" ? 1 : 0;
        // Calculate the overall context scale
        var xScale = projectionDelta.x.scale * treeScale.x;
        var yScale = projectionDelta.y.scale * treeScale.y;
        shadow[0 + offset] /= xScale;
        shadow[1 + offset] /= yScale;
        /**
         * Ideally we'd correct x and y scales individually, but because blur and
         * spread apply to both we have to take a scale average and apply that instead.
         * We could potentially improve the outcome of this by incorporating the ratio between
         * the two scales.
         */
        var averageScale = mix(xScale, yScale, 0.5);
        // Blur
        if (typeof shadow[2 + offset] === "number")
            shadow[2 + offset] /= averageScale;
        // Spread
        if (typeof shadow[3 + offset] === "number")
            shadow[3 + offset] /= averageScale;
        var output = template(shadow);
        if (containsCSSVariables) {
            var i_1 = 0;
            output = output.replace(varToken, function () {
                var cssVariable = cssVariables[i_1];
                i_1++;
                return cssVariable;
            });
        }
        return output;
    },
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs











var MeasureLayoutWithContext = /** @class */ (function (_super) {
    (0,tslib_es6.__extends)(MeasureLayoutWithContext, _super);
    function MeasureLayoutWithContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This only mounts projection nodes for components that
     * need measuring, we might want to do it for all components
     * in order to incorporate transforms
     */
    MeasureLayoutWithContext.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, visualElement = _a.visualElement, layoutGroup = _a.layoutGroup, switchLayoutGroup = _a.switchLayoutGroup, layoutId = _a.layoutId;
        var projection = visualElement.projection;
        addScaleCorrector(defaultScaleCorrectors);
        if (projection) {
            if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group)
                layoutGroup.group.add(projection);
            if ((switchLayoutGroup === null || switchLayoutGroup === void 0 ? void 0 : switchLayoutGroup.register) && layoutId) {
                switchLayoutGroup.register(projection);
            }
            projection.root.didUpdate();
            projection.addEventListener("animationComplete", function () {
                _this.safeToRemove();
            });
            projection.setOptions((0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, projection.options), { onExitComplete: function () { return _this.safeToRemove(); } }));
        }
        globalProjectionState.hasEverUpdated = true;
    };
    MeasureLayoutWithContext.prototype.getSnapshotBeforeUpdate = function (prevProps) {
        var _this = this;
        var _a = this.props, layoutDependency = _a.layoutDependency, visualElement = _a.visualElement, drag = _a.drag, isPresent = _a.isPresent;
        var projection = visualElement.projection;
        if (!projection)
            return null;
        /**
         * TODO: We use this data in relegate to determine whether to
         * promote a previous element. There's no guarantee its presence data
         * will have updated by this point - if a bug like this arises it will
         * have to be that we markForRelegation and then find a new lead some other way,
         * perhaps in didUpdate
         */
        projection.isPresent = isPresent;
        if (drag ||
            prevProps.layoutDependency !== layoutDependency ||
            layoutDependency === undefined) {
            projection.willUpdate();
        }
        else {
            this.safeToRemove();
        }
        if (prevProps.isPresent !== isPresent) {
            if (isPresent) {
                projection.promote();
            }
            else if (!projection.relegate()) {
                /**
                 * If there's another stack member taking over from this one,
                 * it's in charge of the exit animation and therefore should
                 * be in charge of the safe to remove. Otherwise we call it here.
                 */
                es.postRender(function () {
                    var _a;
                    if (!((_a = projection.getStack()) === null || _a === void 0 ? void 0 : _a.members.length)) {
                        _this.safeToRemove();
                    }
                });
            }
        }
        return null;
    };
    MeasureLayoutWithContext.prototype.componentDidUpdate = function () {
        var projection = this.props.visualElement.projection;
        if (projection) {
            projection.root.didUpdate();
            if (!projection.currentAnimation && projection.isLead()) {
                this.safeToRemove();
            }
        }
    };
    MeasureLayoutWithContext.prototype.componentWillUnmount = function () {
        var _a = this.props, visualElement = _a.visualElement, layoutGroup = _a.layoutGroup, promoteContext = _a.switchLayoutGroup;
        var projection = visualElement.projection;
        if (projection) {
            projection.scheduleCheckAfterUnmount();
            if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group)
                layoutGroup.group.remove(projection);
            if (promoteContext === null || promoteContext === void 0 ? void 0 : promoteContext.deregister)
                promoteContext.deregister(projection);
        }
    };
    MeasureLayoutWithContext.prototype.safeToRemove = function () {
        var safeToRemove = this.props.safeToRemove;
        safeToRemove === null || safeToRemove === void 0 ? void 0 : safeToRemove();
    };
    MeasureLayoutWithContext.prototype.render = function () {
        return null;
    };
    return MeasureLayoutWithContext;
}(react.Component));
function MeasureLayout(props) {
    var _a = (0,tslib_es6.__read)(usePresence(), 2), isPresent = _a[0], safeToRemove = _a[1];
    var layoutGroup = (0,react.useContext)(LayoutGroupContext);
    return (react.createElement(MeasureLayoutWithContext, (0,tslib_es6.__assign)({}, props, { layoutGroup: layoutGroup, switchLayoutGroup: (0,react.useContext)(SwitchLayoutGroupContext), isPresent: isPresent, safeToRemove: safeToRemove })));
}
var defaultScaleCorrectors = {
    borderRadius: (0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, correctBorderRadius), { applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
        ] }),
    borderTopLeftRadius: correctBorderRadius,
    borderTopRightRadius: correctBorderRadius,
    borderBottomLeftRadius: correctBorderRadius,
    borderBottomRightRadius: correctBorderRadius,
    boxShadow: correctBoxShadow,
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/motion/features/layout/index.mjs


var layoutFeatures = {
    measureLayout: MeasureLayout,
};



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs


var DocumentProjectionNode = createProjectionNode({
    attachResizeListener: function (ref, notify) {
        ref.addEventListener("resize", notify, { passive: true });
        return function () { return ref.removeEventListener("resize", notify); };
    },
    measureScroll: function () { return ({
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop,
    }); },
});



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs



var rootProjectionNode = {
    current: undefined,
};
var HTMLProjectionNode_HTMLProjectionNode = createProjectionNode({
    measureScroll: function (instance) { return ({
        x: instance.scrollLeft,
        y: instance.scrollTop,
    }); },
    defaultParent: function () {
        if (!rootProjectionNode.current) {
            var documentNode = new DocumentProjectionNode(0, {});
            documentNode.mount(window);
            documentNode.setOptions({ layoutScroll: true });
            rootProjectionNode.current = documentNode;
        }
        return rootProjectionNode.current;
    },
    resetTransform: function (instance, value) {
        instance.style.transform = value !== null && value !== void 0 ? value : "none";
    },
});



;// CONCATENATED MODULE: ./node_modules/framer-motion/dist/es/render/dom/motion.mjs











var featureBundle = (0,tslib_es6.__assign)((0,tslib_es6.__assign)((0,tslib_es6.__assign)((0,tslib_es6.__assign)({}, animations), gestureAnimations), drag), layoutFeatures);
/**
 * HTML & SVG components, optimised for use with gestures and animation. These can be used as
 * drop-in replacements for any HTML & SVG component, all CSS & SVG properties are supported.
 *
 * @public
 */
var motion = /*@__PURE__*/ createMotionProxy(function (Component, config) {
    return create_config_createDomMotionConfig(Component, config, featureBundle, create_visual_element_createDomVisualElement, HTMLProjectionNode_HTMLProjectionNode);
});
/**
 * Create a DOM `motion` component with the provided string. This is primarily intended
 * as a full alternative to `motion` for consumers who have to support environments that don't
 * support `Proxy`.
 *
 * ```javascript
 * import { createDomMotionComponent } from "framer-motion"
 *
 * const motion = {
 *   div: createDomMotionComponent('div')
 * }
 * ```
 *
 * @public
 */
function createDomMotionComponent(key) {
    return createMotionComponent(createDomMotionConfig(key, { forwardMotionProps: false }, featureBundle, createDomVisualElement, HTMLProjectionNode));
}




/***/ })

};
;