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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(15)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_left_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_right_vue__ = __webpack_require__(29);
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'app',
  components: {
    left: __WEBPACK_IMPORTED_MODULE_0__component_left_vue__["a" /* default */], right: __WEBPACK_IMPORTED_MODULE_1__component_right_vue__["a" /* default */]
  }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_reset_css__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_reset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_reset_css__);



// import './style/style.styl'
// 以内联的形式配置loader
// import Styles from 'style-loader!css-loader?modules!./reset.css';
// import Stylus from 'style-loader!css-loader!stylus-loader?modules!./style.styl';

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App_vue__["a" /* default */] }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false && isObject(value) && ('@binding' in value))
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (process.env.NODE_ENV !== 'production') {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
}

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
]

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
}

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (process.env.NODE_ENV !== 'production') {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
}

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {}

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
}

var platformDirectives = {
  model: directive,
  show: show
}

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
}

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
}

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
}

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
}

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
}

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
}

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (process.env.NODE_ENV !== 'production') {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      process.env.NODE_ENV !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
}

var modules$1 = [
  klass$1,
  style$1,
  model$2
]

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
}

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  'delete': ['Backspace', 'Delete']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (process.env.NODE_ENV !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
}

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (process.env.NODE_ENV !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["a"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4), __webpack_require__(1), __webpack_require__(10).setImmediate))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(11);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(5);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_04c2046b_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(33);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(13)
}
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-04c2046b"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_04c2046b_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\App.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-04c2046b", Component.options)
  } else {
    hotAPI.reload("data-v-04c2046b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("28eb12ab", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.11@css-loader/index.js!../node_modules/_vue-loader@13.7.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-04c2046b\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_stylus-loader@3.0.2@stylus-loader/index.js!../node_modules/_vue-loader@13.7.1@vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.11@css-loader/index.js!../node_modules/_vue-loader@13.7.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-04c2046b\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_stylus-loader@3.0.2@stylus-loader/index.js!../node_modules/_vue-loader@13.7.1@vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n#app[data-v-04c2046b] {\n  height: 98vh;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: flex-start;\n}\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_left_vue__ = __webpack_require__(6);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_778068e8_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_left_vue__ = __webpack_require__(19);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(17)
}
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-778068e8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_left_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_778068e8_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_left_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\left.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-778068e8", Component.options)
  } else {
    hotAPI.reload("data-v-778068e8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("02691e30", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../node_modules/_vue-loader@13.7.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-778068e8\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/_stylus-loader@3.0.2@stylus-loader/index.js!../../node_modules/_vue-loader@13.7.1@vue-loader/lib/selector.js?type=styles&index=0!./left.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../node_modules/_vue-loader@13.7.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-778068e8\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/_stylus-loader@3.0.2@stylus-loader/index.js!../../node_modules/_vue-loader@13.7.1@vue-loader/lib/selector.js?type=styles&index=0!./left.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.left[data-v-778068e8] {\n  width: 300px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  border: 1px solid #ccc;\n}\n.left .top[data-v-778068e8] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: #f6f7f7;\n}\n.left .top .avatar[data-v-778068e8] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin: 40px 0 20px;\n  width: 130px;\n  height: 130px;\n  background-color: #fff;\n  border-radius: 50%;\n}\n.left .top .avatar img[data-v-778068e8] {\n  width: 100px;\n  height: 100px;\n}\n.left .top .name[data-v-778068e8] {\n  margin-bottom: 10px;\n  font-weight: 600;\n}\n.left .top .career[data-v-778068e8] {\n  margin-bottom: 10px;\n}\n.left .top .location[data-v-778068e8] {\n  margin-bottom: 40px;\n}\n.left .top .location img[data-v-778068e8] {\n  display: inline-block;\n  vertical-align: middle;\n  width: 20px;\n  height: 20px;\n}\n.left .top .location span[data-v-778068e8] {\n  display: inline-block;\n  vertical-align: middle;\n}\n.left .middle[data-v-778068e8] {\n  width: 100%;\n  height: 80px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n  background-color: #f6f7f7;\n  text-align: center;\n  border-top: 1px solid #e9e9e8;\n  border-bottom: 1px solid #e9e9e8;\n}\n.left .middle .wrapper[data-v-778068e8] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.left .middle .sex[data-v-778068e8] {\n  width: 100%;\n  height: 100%;\n  border-right: 1px solid #e9e9e8;\n}\n.left .middle .age[data-v-778068e8] {\n  width: 100%;\n  height: 100%;\n  border-right: 1px solid #e9e9e8;\n}\n.left .middle .degree[data-v-778068e8] {\n  width: 100%;\n  height: 100%;\n}\n.left .middle .content[data-v-778068e8] {\n  font-weight: 600;\n  margin-bottom: 10px;\n}\n.left .middle .type[data-v-778068e8] {\n  font-size: 14px;\n}\n.left .bottom[data-v-778068e8] {\n  width: 100%;\n/*height:400px*/\n  display: flex;\n  flex-direction: column;\n/*justify-content:space-between*/\n/*align-items: flex-start*/\n}\n.left .bottom .contain[data-v-778068e8] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  height: 50px;\n  padding-left: 60px;\n/*padding-left改为10px打印好看*/\n  border-bottom: 1px solid #e9e9e8;\n}\n.left .bottom .pic[data-v-778068e8] {\n  width: 20px;\n  height: 20px;\n  margin-right: 30px;\n}\n.left .bottom .contact[data-v-778068e8] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  height: 50px;\n  padding-left: 50px;\n  background-color: #f6f7f7;\n  border-bottom: 1px solid #e9e9e8;\n}\n.left .bottom .contact img[data-v-778068e8] {\n  width: 35px;\n  height: 35px;\n  margin-right: 24px;\n}\n.left .bottom .blog[data-v-778068e8] {\n  border-bottom: none;\n}\n", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "left" }, [
      _c("div", { staticClass: "top" }, [
        _c("div", { staticClass: "avatar" }, [
          _c("img", { attrs: { src: __webpack_require__(20) } })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "name" }, [_vm._v("辉 耀")]),
        _vm._v(" "),
        _c("div", { staticClass: "career" }, [_vm._v("前端工程师")]),
        _vm._v(" "),
        _c("div", { staticClass: "location" }, [
          _c("img", { attrs: { src: __webpack_require__(21) } }),
          _vm._v(" "),
          _c("span", [_vm._v("浙江，杭州")])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "middle" }, [
        _c("div", { staticClass: "sex wrapper" }, [
          _c("p", { staticClass: "content" }, [_vm._v("男")]),
          _vm._v(" "),
          _c("p", { staticClass: "type" }, [_vm._v("性别")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "age wrapper" }, [
          _c("p", { staticClass: "content" }, [_vm._v("26")]),
          _vm._v(" "),
          _c("p", { staticClass: "type" }, [_vm._v("年龄")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "degree wrapper" }, [
          _c("p", { staticClass: "content" }, [_vm._v("硕士")]),
          _vm._v(" "),
          _c("p", { staticClass: "type" }, [_vm._v("学历")])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "bottom" }, [
        _c("div", { staticClass: "contact" }, [
          _c("img", {
            staticClass: "pic",
            attrs: { src: __webpack_require__(22) }
          }),
          _vm._v(" "),
          _c("span", [_vm._v("联系方式")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "phone contain" }, [
          _c("img", {
            staticClass: "pic",
            attrs: { src: __webpack_require__(23) }
          }),
          _vm._v(" "),
          _c("span", [_vm._v("159*****450")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "email contain" }, [
          _c("img", {
            staticClass: "pic",
            attrs: { src: __webpack_require__(24) }
          }),
          _vm._v(" "),
          _c("span", [_vm._v("574***131@qq.com")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "wx contain" }, [
          _c("img", {
            staticClass: "pic",
            attrs: { src: __webpack_require__(25) }
          }),
          _vm._v(" "),
          _c("span", [_vm._v("Nirvana_cn")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "contact" }, [
          _c("img", {
            staticClass: "pic",
            attrs: { src: __webpack_require__(26) }
          }),
          _vm._v(" "),
          _c("span", [_vm._v("社交信息")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "github contain" }, [
          _c("img", {
            staticClass: "pic",
            attrs: { src: __webpack_require__(27) }
          }),
          _vm._v(" "),
          _c("span", [_vm._v("github.com/Nirvana-cn")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "blog contain" }, [
          _c("img", {
            staticClass: "pic",
            attrs: { src: __webpack_require__(28) }
          }),
          _vm._v(" "),
          _c("span", [_vm._v("iceiceice.top")])
        ])
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-778068e8", esExports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAQgUlEQVR4Xu1djdEUNxKVIjg7goMIjCOwLwJrIjBEYDsC4wjgIjCOYEQEQASYCDAR+Iigrx5o8fKxu6Pu0Yw00tsqyq769NN63W9aP62Wd/wRASJwFQFPbIgAEbiOAAlC6yACNxAgQWgeRIAEoQ0QARsC9CA23FhrEARIkEEUzWHaECBBbLix1iAIkCCDKJrDtCFAgthwY61BECBBBlE0h2lDgASx4cZagyBAggyiaA7ThgAJYsONtQZBgAQZRNEcpg0BEsSGG2sNggAJMoiiOUwbAiSIDTfWGgQBEmQQRXOYNgRIEBturDUIAiTIIIrmMG0IkCA23FhrEARIkEEUzWHaECBBbLix1iAIkCCDKJrDtCFAgthwY61BECBBBlE0h2lDgASx4cZagyBAggyiaA7ThgAJYsONtQZBgAQZRNEcpg0BEsSGG2sNggAJMoiiOUwbAiSIDTfWGgSB3QgyTdN3CdN7InJvEHw5zIIIeO//cs7hn5vn+VXBpq82tRlBQgggwQ/OuYfe+wd7DIZ9jIWAiPzpnHvmnHseY/xAnNK/4gQJIXzlnHvivX9YWli2RwSuISAiIMovMcb/lUSpKEFCCCAFyAGS8EcEdkVAREAOkARkKfIrRpAQwu/0GkV0wkZWIiAiT2OMv6xs5kP1IgQhOUqogm2URABTrhjjo7VtriZICOGx9/7XtYKwPhEojYCI/BZjfLym3VUECSEE7/28RgDWJQJbIiAiU4wxWvtYS5C33nueaVjRZ73NERCRv2KM960dmQmCHSvv/e/WjlmPCOyFgIg8su5srSEIvcdeGmY/qxBY40VMBAkhPPDev1ZK/d4596eIvFTWY3Ei8AkB7/33zjlEZvxLA4uIfBtjxMm76mcliHbn6pWIPNwqHEA1YhY+PAIIY/Le4zDwFN+3OCYRwQHi08WCdwqYCDJNE7xArnBv5nlmLJZWMyy/iMA0TfAI3ywW/Fjg1TzP8D6q3+YEWbvNphoNCw+FgPKYYVeCSK4m5nk2kTC3fZYbG4Fpmja1RZPxbi3U2Crn6DUIbG2LJIhGGyzbHAIkSHMqoUAtIUCCtKQNytIcAiRIcyqhQC0hQIK0pA3K0hwCJMiOKkmZV74SkS8ONr33CJN5ZwlX2GoIIYQXW7VduV2cemeFhZAgG2oqhICTVWRe+V6TeSVl08AdA2TTyFLkFsPQGMcW/W/Vpoj8J8aYFbOnwcByJjfcNm/KuvJTSke0+i4LIkVT6pn/ls6osWSAGuNYaqulv5MgFbRxSkfknMMtyOJZV1JGDQTD7UYUEsQ5DQb0IFeIF0KAx0AEcnFi3O0yeRTMoc3XPHO/HxrjyG2zhXL0IDtpIXkNpCMKO3X5qZutEpmdj4MEoQcx2zUudTnnXuzhNa4JmRbzuO65yUKeBCFBTARpgRwnwdPaBLsyxUlCgpAgaoK0RI6tSUKCkCAqgrRIjjskwb3oYlnISRASJJsgaUH+uuU8XViTxBi/zR7UQkEShATJtqUQwlxgt+pq5pWUTSP3Hv5VuUUE5yQ/Zw/sRsEUCVCiqdbawIck6xkDzUdi2HMQ5d3kL4xBRP5wzuHoYvHsIvWFZx4QomL6afb5TR0MVIkEWVD2yqmVOR0Rvt7eeyRGVnuV0lOtgfjwxVBJkGWCaHN0fWhxTTrKc5Gs2e1L9T8yOTB2EuT2HByhI0iBqgkheS8iITdaNMcALXmK16TDzJFplDIkyG2C/Oy9f6Ixhq3ydBlJYk6qrBlzz2VJkNsEwbZudtZGa/rJXAMLITz13iMwMvf3fJ7n3ePEcoU7QjkS5IqWUn7WtwolmjLrKdr/UHSaJhwE/ju3noh8nbulmdvmSOVIkOsEUU2v9tpa1U61tpryjUISEuSKpqdpwplF7lnELt7jJKomqTLOYGKMfFPeyGgS5LoH+Tt392rvLdUQgsa77Upeox02W40Eue5BspMW7z3P1z4wZAmBSOudbAyatfALgmmmwyTIBQDTKXZuypsq75NM04RYoqxXkETkviXKV2McJIhzlg/RIbOaKAlSZQqjeWRI88U8N3QShCfpFz98GoKUjJ7VfIVJEA1an5fVfDA0Hwl6kMvz2d9ijAgq3PWn2WXTGAQ9yOdqJEHWr0GqnFbTg9i/R5oPBgmyniBV1iAhhOwwGI1B0IPQgyx+ejTbqLWiZrf+snGb96OZbI3zIXextMBYH5FfZOqVAsobju/nedaE63/qVWMc1rHUqKfxqBoMhlmkJ4Jkv5G9905WCOGZ9/7HTOMyTwE1xpEpSxPFSJACatCElu85zUpXgLMvcYmIeZeNBOEU6yqVlNMYXLE1G6KGz9oruJqvpUaOUcpqPhJDTbHwpfbe4+5FbjgHQj8Q0pGVTsZiYIY7Ku/meV79RolF1l7qkCA3NKmc68OLFE3cdi5amlohWbbmhmOxHFm9GLx2HCTIbYIg9U5u0OKHlvAsQYzxkVYRS+UtieusQYpLsoz0dxJkQduaE+tTUyXf7kieA1kd8d5h9o8XpbKhulmQBFnAURO4eN5UertjsoSZn9pJybLxQE/2tOqMpNkPVZYxpT5bIUEy9KoJDLzbnIjgXUHscGUv3rEYd8796r03XZWl98hQamYREiQDqLR7hIPDrB2tS02KSPTeRxHB085fkCX18R2Szq1Mko3Edfc0hMyAYNgiJEim6rXZRJaaTY9xYhv5XsknFXjusYS87u8kiAIv7bavoukiRfc6rCwi7EEaIUGUirLsaim7MBXfYt0xTZM6s7xJ+BuV5nl+VbpNTXskiAYt51w6YX/pnPtGWXWz4luQA8JqjGOrwVnCN0rKosHAIuthw91vgZxI8kyRWK6kzj5raytykCAfYSZBVpiuJuJ3RTdXq2695tAYxxbjQ5uWr3JJWTQYWGTt0oOcKyBF/cKbmLeADQp9JyIPS75BckkGjXEYxpBVxWJ0WQ1nFtJgYJG1e4IA5xQOgpeoNE8TZKro82LwGs65p3ucc2iMwzSYjEoWo8toNruIBgOLrEMQ5IR2OgEHUXJv+2UrKj0E+nhN6Ep2Z6mgxji0beeWtxhdbts55TQYWGQdiiB3iIITcTzHnP2WxwWFvUmBj3ggF4eKu/40xrGVYBajKymLBgOLrEMS5M4aBXFViMRF6Dz+/9rZwukNdRAB28gva5DiXHaNcZQ0yvO2LEZXUhYNBhZZhydISWXt3ZbGOLaSzWJ0JWXRYGCRlQQpqa2d29IYx1aiWYyupCwaDCyykiAltbVzWymsZudeP+9unmfVRbHSwpIghRFNp+zfiAguOWHN8emy09KtwHTJ6hQKj7XIX977lyLyrvZ6pDBMh2mOBFmpqnTrD9u6IMKD3GfbLN2KCBbvf4I08zw/t7TBOjoESBAdXqdgxR9EBK4fW7mmtJ7Kbi8WxyWstOOFS1i7bwOXGEPrbZAgmRrC3XTn3I/Wa7CZ3ZiLwbt475/N8/yHuRFW/AIBEmTBKKZp+lFE8KqsOnFCDXtLNxURG4bnn+lVViqBBLkCYCLG05pTqJW6RY4udcKItX32Vp8EuaPRNJVCqp0uUnaKCHbFQBRkWczOrNKboVvHQ4Ik5FKgIYhRdd/dqsilemnq9QuCupbK8u//IECCfAxXR5g6onCr7UjtZZRp5+sRvUke4kMTxJrWMw/adkslbwKS4FyFvxsIDEuQdMCHbOk1vMYb59z5eqBK9hARwf0SXMDi7/pmjeSC000sFpLAOeeebESOU9g6MjFimxX/xbMI2QvktFGATQIklcOaCP+/5l7JVR1vlY0+16haLzecBwkhIOft48KKwcUmTFewBt5k2pI8Hu6UhBt3SkzDSjFgSHadTWJTRwesNBRBQgjYpTIlhL6gWyROwIEc3gPZ9UAurZ1ONxaL5OciSS6zdxiCFCTHKxzAtbJdmjwLTvpX34MnSb4kyRAEKZS/CtOon7eaQq2dfZRKGEGSfK6J7glSICs7nhMAMTCdav4Hj+K9x8m5eWdsy7cWmwfwjoBdEyQZy+sVSnmeErQdbvEaQsC0C5sRpoR23N36aDXdEiRNOV4bt3IP5TWufQDSBwKez7SQ3zq16YoP125VeyYIyGEJUQc5vo8x4vzi8L+044WoZNMifvQHebokSAgBcVW/GqwbC3GQ43BTqqWxWjFJYSnf9ojJEmZdTrFWrDu6JcfJEKwbFghwjDFOOQbVW5nuPEgIwTK16p4cBUiCJ62HC5XviiDGaQROxB+MNIWwnAthqhVjvN+bh1gaTzcESYvRt8pdq64W5EvKPv+75UHSEXe1eiKIemE+8g6N5a3FdH33/kjetguC4MzDe/9W8wUVEdzRxvMEw/7Shgaij7MPE7d8E7FFRfRCkGfKff5hFuVLRpdO3J8slTv9fTQvcniCiMjXzjnV2mPkqdUlImjffh9pLdIDQR5573/P/QI6557P84xLR/wlBLRnRyN5kR4Iggzo2TmsRASLzF0vOB2BidpdLRFB0odDRDivwf/wBNEMfrQFpgYbw0bHEJ54NILQe9xgjcGLdI/nMASh91j2J1ovIiLI1IjLWd3+RiLIkLFEWstV7mh1P80ahSDv5nnOXshrjaqn8pqIX+xmxRixzd7tbwiC8NQ8335TCMrfuTV6P1MahSCcXuVa/Md72Ag/yUr60Ps6ZBSCfD1SgJ2CCxeLaq4N9L75MQJB3szzbLmbvtbODlsfuYG99y8yB/Cq9lvmmXKqiymnm+/neVYnQvdqqZQufqn93r9wS+O3/n3rL6dVrj3rhRCQ3nXO7NP0oWiBIL/FGEsnq87E7LjFpmlC4oqsMHhL2v/WkUkX8HB9O3f3cz+CaEOwb4EtIlygG6xRuVDv6kQ95TtGovPsqbl1s8LkQbQnugsEQWDi+T8U//D2htJuTm0oqx2q+AkXXEDLxidlue8hABRjRurWbGKctGsNgjURBJ1O0wTAN3k05lAmS2GPgIB5I8hMEM2J7hEQpIz9IrAm9N9MkORFsg+s+oWfI2scAdPi/DSmVQTR3nRrHEiK1yECIoK0rOY8zqsIAjw51erQqjoZ0pqpVREPcmpEe5GnE/w5jIYRKBUAu9qDnJEED8Jkp6dpGFuKdnAESniOoh7kjCQ4+scNNm7/HtzIDio+8jg/LPlOZTEPckYSBITBmyArYlYoxEGVQbHbQQA5nPGycfGQpeIEuUMU5LdC5Cn+S7K0Y1A9SAJS4LkH/Hu51XWJzQhySQMI0+5BMxuMAV73WvgEzpr4+wcBXCM2b9tqgdyVIFrhWJ4I1EaABKmtAfbfNAIkSNPqoXC1ESBBamuA/TeNAAnStHooXG0ESJDaGmD/TSNAgjStHgpXGwESpLYG2H/TCJAgTauHwtVGgASprQH23zQCJEjT6qFwtREgQWprgP03jQAJ0rR6KFxtBEiQ2hpg/00jQII0rR4KVxsBEqS2Bth/0wiQIE2rh8LVRoAEqa0B9t80AiRI0+qhcLURIEFqa4D9N40ACdK0eihcbQRIkNoaYP9NI0CCNK0eClcbARKktgbYf9MIkCBNq4fC1UaABKmtAfbfNAIkSNPqoXC1ESBBamuA/TeNAAnStHooXG0ESJDaGmD/TSNAgjStHgpXGwESpLYG2H/TCJAgTauHwtVGgASprQH23zQC/weIExFfNDYz6wAAAABJRU5ErkJggg=="

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_right_vue__ = __webpack_require__(7);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_00febfe7_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_right_vue__ = __webpack_require__(32);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(30)
}
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-00febfe7"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_script_index_0_right_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_1_vue_loader_lib_template_compiler_index_id_data_v_00febfe7_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_1_vue_loader_lib_selector_type_template_index_0_right_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\component\\right.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-00febfe7", Component.options)
  } else {
    hotAPI.reload("data-v-00febfe7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e8aa5494", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../node_modules/_vue-loader@13.7.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-00febfe7\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/_stylus-loader@3.0.2@stylus-loader/index.js!../../node_modules/_vue-loader@13.7.1@vue-loader/lib/selector.js?type=styles&index=0!./right.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../node_modules/_vue-loader@13.7.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-00febfe7\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/_stylus-loader@3.0.2@stylus-loader/index.js!../../node_modules/_vue-loader@13.7.1@vue-loader/lib/selector.js?type=styles&index=0!./right.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.right[data-v-00febfe7] {\n  width: 600px;\n  height: 100%;\n/*margin-left:20px*/\n  padding: 0 20px;\n  border: 1px solid #ccc;\n  border-left: none;\n}\n.right .title[data-v-00febfe7] {\n  margin: 20px 0;\n  font-size: 18px;\n  font-weight: 800;\n}\n.right p[data-v-00febfe7] {\n  margin: 10px 0;\n}\n.right .school[data-v-00febfe7] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  margin-bottom: 10px;\n}\n.right .project .subtitle[data-v-00febfe7] {\n  font-weight: 600;\n}\n", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "right" }, [
      _c("div", { staticClass: "introduce" }, [
        _c("p", { staticClass: "title" }, [_vm._v("自我介绍")]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "1.对技术有执着的追求。熟悉前端基本技术，对Vue等流向框架有深入完整的实践。有较强的前端工程架构和组织能力"
          )
        ]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "2.有一定的技术视野。并不把自己局限在某个细小的领域，了解后端业务，了解基本的Linux命令以及运维技巧"
          )
        ]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "3.有很强的业务逻辑抽象能力。在项目中追求系统化、模块化、工程化。善于发现系统的弱点，并有能动性去改变缺陷。以追求系统的健壮性为终极目标"
          )
        ]),
        _vm._v(" "),
        _c("p", [
          _vm._v("4.在开发中一贯遵从代码格式规范，能够通过Git进行版本控制")
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "education" }, [
        _c("p", { staticClass: "title" }, [_vm._v("教育经历")]),
        _vm._v(" "),
        _c("div", { staticClass: "school" }, [
          _c("span", [_vm._v("浙江理工大学")]),
          _vm._v(" "),
          _c("span", [_vm._v("研究生")]),
          _vm._v(" "),
          _c("span", [_vm._v("2016年9月 - 2019年3月")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "school" }, [
          _c("span", [_vm._v("南京晓庄学院")]),
          _vm._v(" "),
          _c("span", [_vm._v("本科")]),
          _vm._v(" "),
          _c("span", [_vm._v("2011年9月 - 2015年6月")])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "project" }, [
        _c("p", { staticClass: "title" }, [_vm._v("项目经历")]),
        _vm._v(" "),
        _c("div", [
          _c("p", { staticClass: "subtitle" }, [
            _vm._v("基于JavaScript的智能车位管理系统")
          ]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "软件开发领域有一个流行的原则：DRY，Don’t repeat yourself，我们翻译过来更形象通俗：不要重复造轮子。开源项目主要目的是共享，其实就是为了让大家不要重复造轮子，尤其是在互联网这样一个快速发展的领域，速度就是生命，引入开源项目，可以节省大量的人力和时间，大大加快业务的发展速度，何乐而不为呢？然而现实往往没有那么美好，开源项目虽然节省了大量的人力和时间，但带来的问题也不少，相信绝大部分同学都踩过开源软件的坑，小的影响可能是宕机半小时，大的问题可能是丢失几十万数据，甚至灾难性的事故是全部数据都丢失。"
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "skill" }, [
        _c("p", { staticClass: "title" }, [_vm._v("个人技能")]),
        _vm._v(" "),
        _c("p", [_vm._v("较为扎实的HTML，CSS，JavaScript基础")]),
        _vm._v(" "),
        _c("p", [
          _vm._v("使用Vue开发前端页面，理解Vue组件式开发以及数据驱动的思想")
        ]),
        _vm._v(" "),
        _c("p", [_vm._v("使用mpvue开发微信小程序")]),
        _vm._v(" "),
        _c("p", [_vm._v("使用Node.js开发后端服务器")]),
        _vm._v(" "),
        _c("p", [_vm._v("使用Weex开发原生app")]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "熟悉webpack、MongoDB、nginx等辅助技术，并具有一定的移动端适配经验"
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "prize" }, [
        _c("p", { staticClass: "title" }, [_vm._v("获奖情况")]),
        _vm._v(" "),
        _c("p", [_vm._v("2017年全国研究生数学建模竞赛三等奖")]),
        _vm._v(" "),
        _c("p", [_vm._v("2018年挑战者杯校赛一等奖")]),
        _vm._v(" "),
        _c("p", [_vm._v("2018年全国研究生移动端创新实践大赛")]),
        _vm._v(" "),
        _c("p", [_vm._v("申请国家发明专利两项")])
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-00febfe7", esExports)
  }
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [_c("left"), _vm._v(" "), _c("right")],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-04c2046b", esExports)
  }
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(35);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(36)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js!./reset.css", function() {
		var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js!./reset.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/**\n * Eric Meyer's Reset CSS v2.0 (http://meyerweb.com/eric/tools/css/reset/)\n * http://cssreset.com\n */\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video, input {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font-weight: normal;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, menu, nav, section {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n  font-weight: 200;\n  font-family: 'PingFang SC',Arial,sans-serif;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* custom */\na {\n  color: #7e8c8d;\n  text-decoration: none;\n  -webkit-backface-visibility: hidden;\n}\n\nli {\n  list-style: none;\n}\n\n::-webkit-scrollbar {\n  width: 5px;\n  height: 5px;\n}\n\n::-webkit-scrollbar-track-piece {\n  background-color: rgba(0, 0, 0, 0.2);\n  -webkit-border-radius: 6px;\n}\n\n::-webkit-scrollbar-thumb:vertical {\n  height: 5px;\n  background-color: rgba(125, 125, 125, 0.7);\n  -webkit-border-radius: 6px;\n}\n\n::-webkit-scrollbar-thumb:horizontal {\n  width: 5px;\n  background-color: rgba(125, 125, 125, 0.7);\n  -webkit-border-radius: 6px;\n}\n\nhtml, body {\n  width: 100%;\n}\n\nbody {\n  -webkit-text-size-adjust: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(37);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 37 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);