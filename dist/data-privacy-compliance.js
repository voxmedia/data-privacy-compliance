'use strict';

function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

var f = {}.propertyIsEnumerable;
var _objectPie = {
  f: f
};

var _propertyDesc = function _propertyDesc(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var _cof = function _cof(it) {
  return toString.call(it).slice(8, -1);
}; // fallback for non-array-like ES3 and non-enumerable old V8 strings
// eslint-disable-next-line no-prototype-builtins


var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
}; // 7.2.1 RequireObjectCoercible(argument)


var _defined = function _defined(it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
}; // to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function _toIobject(it) {
  return _iobject(_defined(it));
};

var _isObject = function _isObject(it) {
  return _typeof2(it) === 'object' ? it !== null : typeof it === 'function';
}; // 7.1.1 ToPrimitive(input [, PreferredType])
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string


var _toPrimitive = function _toPrimitive(it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;

var _has = function _has(it, key) {
  return hasOwnProperty.call(it, key);
};

var _fails = function _fails(exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
}; // Thank's IE8 for his funny defineProperty


var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function require(path, base) {
      return commonjsRequire(path, base === undefined || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}

function commonjsRequire() {
  throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
  : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var document$1 = _global.document; // typeof document.createElement is 'object' in old IE

var is = _isObject(document$1) && _isObject(document$1.createElement);

var _domCreate = function _domCreate(it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

var gOPD = Object.getOwnPropertyDescriptor;
var f$1 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) {
    /* empty */
  }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};
var _objectGopd = {
  f: f$1
}; // 7.1.13 ToObject(argument)

var _toObject = function _toObject(it) {
  return Object(_defined(it));
};

var _core = createCommonjsModule(function (module) {
  var core = module.exports = {
    version: '2.6.11'
  };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = _global[SHARED] || (_global[SHARED] = {});
  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: _core.version,
    mode: 'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
});

var id = 0;
var px = Math.random();

var _uid = function _uid(key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function _sharedKey(key) {
  return shared[key] || (shared[key] = _uid(key));
}; // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO = _sharedKey('IE_PROTO');

var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectProto : null;
};

var _anObject = function _anObject(it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var dP = Object.defineProperty;
var f$2 = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);

  P = _toPrimitive(P, true);

  _anObject(Attributes);

  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
var _objectDp = {
  f: f$2
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var _functionToString = _shared('native-function-to-string', Function.toString);

var _redefine = createCommonjsModule(function (module) {
  var SRC = _uid('src');

  var TO_STRING = 'toString';

  var TPL = ('' + _functionToString).split(TO_STRING);

  _core.inspectSource = function (it) {
    return _functionToString.call(it);
  };

  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));

    if (O === _global) {
      O[key] = val;
    } else if (!safe) {
      delete O[key];

      _hide(O, key, val);
    } else if (O[key]) {
      O[key] = val;
    } else {
      _hide(O, key, val);
    } // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative

  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || _functionToString.call(this);
  });
});

var _aFunction = function _aFunction(it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
}; // optional / simple context binding


var _ctx = function _ctx(fn, that, length) {
  _aFunction(fn);

  if (that === undefined) return fn;

  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;

  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined; // export native or passed

    out = (own ? target : source)[key]; // bind timers to global for call from export context

    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out; // extend global

    if (target) _redefine(target, key, out, type & $export.U); // export

    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};

_global.core = _core; // type bitmap

$export.F = 1; // forced

$export.G = 2; // global

$export.S = 4; // static

$export.P = 8; // proto

$export.B = 16; // bind

$export.W = 32; // wrap

$export.U = 64; // safe

$export.R = 128; // real proto method for `library`

var _export = $export; // 26.1.6 Reflect.get(target, propertyKey [, receiver])

function get(target, propertyKey
/* , receiver */
) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (_anObject(target) === receiver) return target[propertyKey];
  if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
  if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
}

_export(_export.S, 'Reflect', {
  get: get
}); // 26.1.9 Reflect.has(target, propertyKey)


_export(_export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
}); // call something on iterator step with safe closing on error


var _iterCall = function _iterCall(iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

var _iterators = {};

var _wks = createCommonjsModule(function (module) {
  var store = _shared('wks');

  var _Symbol = _global.Symbol;
  var USE_SYMBOL = typeof _Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : _uid)('Symbol.' + name));
  };

  $exports.store = store;
}); // check on default Array iterator


var ITERATOR = _wks('iterator');

var ArrayProto = Array.prototype;

var _isArrayIter = function _isArrayIter(it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR] === it);
}; // 7.1.4 ToInteger


var ceil = Math.ceil;
var floor = Math.floor;

var _toInteger = function _toInteger(it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
}; // 7.1.15 ToLength


var min = Math.min;

var _toLength = function _toLength(it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var _createProperty = function _createProperty(object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));else object[index] = value;
}; // getting tag from 19.1.3.6 Object.prototype.toString()


var TAG = _wks('toStringTag'); // ES3 wrong here


var ARG = _cof(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {
    /* empty */
  }
};

var _classof = function _classof(it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T // builtinTag case
  : ARG ? _cof(O) // ES3 arguments fallback
  : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$1 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1] || it['@@iterator'] || _iterators[_classof(it)];
};

var ITERATOR$2 = _wks('iterator');

var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$2]();

  riter['return'] = function () {
    SAFE_CLOSING = true;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {
  /* empty */
}

var _iterDetect = function _iterDetect(exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;

  try {
    var arr = [7];
    var iter = arr[ITERATOR$2]();

    iter.next = function () {
      return {
        done: safe = true
      };
    };

    arr[ITERATOR$2] = function () {
      return iter;
    };

    exec(arr);
  } catch (e) {
    /* empty */
  }

  return safe;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) {
  Array.from(iter);
}), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike
  /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = _toObject(arrayLike);

    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); // if object isn't iterable or it's array with default iterator - use simple case

    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);

      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }

    result.length = index;
    return result;
  }
});

var dP$1 = _objectDp.f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // 19.2.4.2 name

NAME in FProto || _descriptors && dP$1(FProto, NAME, {
  configurable: true,
  get: function get() {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof2(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
} // 22.1.3.31 Array.prototype[@@unscopables]


var UNSCOPABLES = _wks('unscopables');

var ArrayProto$1 = Array.prototype;
if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});

var _addToUnscopables = function _addToUnscopables(key) {
  ArrayProto$1[UNSCOPABLES][key] = true;
};

var _iterStep = function _iterStep(done, value) {
  return {
    value: value,
    done: !!done
  };
};

var max = Math.max;
var min$1 = Math.min;

var _toAbsoluteIndex = function _toAbsoluteIndex(index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
}; // false -> Array#indexOf
// true  -> Array#includes


var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);

    var length = _toLength(O.length);

    var index = _toAbsoluteIndex(fromIndex, length);

    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIndexOf = _arrayIncludes(false);

var IE_PROTO$1 = _sharedKey('IE_PROTO');

var _objectKeysInternal = function _objectKeysInternal(object, names) {
  var O = _toIobject(object);

  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    if (key != IE_PROTO$1) _has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }

  return result;
}; // IE 8- don't enum bug keys


var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(','); // 19.1.2.14 / 15.2.3.14 Object.keys(O)


var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);

  var keys = _objectKeys(Properties);

  var length = keys.length;
  var i = 0;
  var P;

  while (length > i) {
    _objectDp.f(O, P = keys[i++], Properties[P]);
  }

  return O;
};

var document$2 = _global.document;

var _html = document$2 && document$2.documentElement; // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])


var IE_PROTO$2 = _sharedKey('IE_PROTO');

var Empty = function Empty() {
  /* empty */
};

var PROTOTYPE$1 = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');

  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';

  _html.appendChild(iframe);

  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);

  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;

  while (i--) {
    delete _createDict[PROTOTYPE$1][_enumBugKeys[i]];
  }

  return _createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO$2] = O;
  } else result = _createDict();

  return Properties === undefined ? result : _objectDps(result, Properties);
};

var def = _objectDp.f;

var TAG$1 = _wks('toStringTag');

var _setToStringTag = function _setToStringTag(it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, {
    configurable: true,
    value: tag
  });
};

var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

_hide(IteratorPrototype, _wks('iterator'), function () {
  return this;
});

var _iterCreate = function _iterCreate(Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, {
    next: _propertyDesc(1, next)
  });

  _setToStringTag(Constructor, NAME + ' Iterator');
};

var ITERATOR$3 = _wks('iterator');

var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

var _iterDefine = function _iterDefine(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);

  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];

    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };

      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }

    return function entries() {
      return new Constructor(this, kind);
    };
  };

  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR$3] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype; // Fix native

  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));

    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines


      if (typeof IteratorPrototype[ITERATOR$3] != 'function') _hide(IteratorPrototype, ITERATOR$3, returnThis);
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;

    $default = function values() {
      return $native.call(this);
    };
  } // Define iterator


  if (BUGGY || VALUES_BUG || !proto[ITERATOR$3]) {
    _hide(proto, ITERATOR$3, $default);
  } // Plug for library


  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;

  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }

  return methods;
}; // 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()


var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target

  this._i = 0; // next index

  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;

  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }

  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)


_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');

_addToUnscopables('values');

_addToUnscopables('entries');

var ITERATOR$4 = _wks('iterator');

var TO_STRING_TAG = _wks('toStringTag');

var ArrayValues = _iterators.Array;
var DOMIterables = {
  CSSRuleList: true,
  // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true,
  // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true,
  // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME$1 = collections[i];
  var explicit = DOMIterables[NAME$1];
  var Collection = _global[NAME$1];
  var proto = Collection && Collection.prototype;
  var key;

  if (proto) {
    if (!proto[ITERATOR$4]) _hide(proto, ITERATOR$4, ArrayValues);
    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME$1);
    _iterators[NAME$1] = ArrayValues;
    if (explicit) for (key in es6_array_iterator) {
      if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
    }
  }
} // 19.1.3.6 Object.prototype.toString()


var test = {};
test[_wks('toStringTag')] = 'z';

if (test + '' != '[object z]') {
  _redefine(Object.prototype, 'toString', function toString() {
    return '[object ' + _classof(this) + ']';
  }, true);
} // true  -> String#at
// false -> String#codePointAt


var _stringAt = function _stringAt(TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));

    var i = _toInteger(pos);

    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var $at = _stringAt(true); // 21.1.3.27 String.prototype[@@iterator]()


_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target

  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return {
    value: undefined,
    done: true
  };
  point = $at(O, index);
  this._i += point.length;
  return {
    value: point,
    done: false
  };
});

var _redefineAll = function _redefineAll(target, src, safe) {
  for (var key in src) {
    _redefine(target, key, src[key], safe);
  }

  return target;
};

var _anInstance = function _anInstance(it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }

  return it;
};

var _forOf = createCommonjsModule(function (module) {
  var BREAK = {};
  var RETURN = {};

  var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
    var iterFn = ITERATOR ? function () {
      return iterable;
    } : core_getIteratorMethod(iterable);

    var f = _ctx(fn, that, entries ? 2 : 1);

    var index = 0;
    var length, step, iterator, result;
    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!'); // fast case for arrays with default iterator

    if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
      result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
      if (result === BREAK || result === RETURN) return result;
    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      result = _iterCall(iterator, f, step.value, entries);
      if (result === BREAK || result === RETURN) return result;
    }
  };

  exports.BREAK = BREAK;
  exports.RETURN = RETURN;
});

var SPECIES = _wks('species');

var _setSpecies = function _setSpecies(KEY) {
  var C = _global[KEY];
  if (_descriptors && C && !C[SPECIES]) _objectDp.f(C, SPECIES, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

var _meta = createCommonjsModule(function (module) {
  var META = _uid('meta');

  var setDesc = _objectDp.f;
  var id = 0;

  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var FREEZE = !_fails(function () {
    return isExtensible(Object.preventExtensions({}));
  });

  var setMeta = function setMeta(it) {
    setDesc(it, META, {
      value: {
        i: 'O' + ++id,
        // object ID
        w: {} // weak collections IDs

      }
    });
  };

  var fastKey = function fastKey(it, create) {
    // return primitive with prefix
    if (!_isObject(it)) return _typeof2(it) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

      if (!create) return 'E'; // add missing metadata

      setMeta(it); // return object ID
    }

    return it[META].i;
  };

  var getWeak = function getWeak(it, create) {
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true; // not necessary to add metadata

      if (!create) return false; // add missing metadata

      setMeta(it); // return hash weak collections IDs
    }

    return it[META].w;
  }; // add metadata on freeze-family methods calling


  var onFreeze = function onFreeze(it) {
    if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
    return it;
  };

  var meta = module.exports = {
    KEY: META,
    NEED: false,
    fastKey: fastKey,
    getWeak: getWeak,
    onFreeze: onFreeze
  };
});

var _validateCollection = function _validateCollection(it, TYPE) {
  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

var dP$2 = _objectDp.f;
var fastKey = _meta.fastKey;
var SIZE = _descriptors ? '_s' : 'size';

var getEntry = function getEntry(that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index]; // frozen object case

  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

var _collectionStrong = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');

      that._t = NAME; // collection type

      that._i = _objectCreate(null); // index

      that._f = undefined; // first entry

      that._l = undefined; // last entry

      that[SIZE] = 0; // size

      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });

    _redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }

        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function _delete(key) {
        var that = _validateCollection(this, NAME);

        var entry = getEntry(that, key);

        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        }

        return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn
      /* , that = undefined */
      ) {
        _validateCollection(this, NAME);

        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);

        var entry;

        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this); // revert to the last existing entry

          while (entry && entry.r) {
            entry = entry.p;
          }
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(_validateCollection(this, NAME), key);
      }
    });

    if (_descriptors) dP$2(C.prototype, 'size', {
      get: function get() {
        return _validateCollection(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var entry = getEntry(that, key);
    var prev, index; // change existing entry

    if (entry) {
      entry.v = value; // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true),
        // <- index
        k: key,
        // <- key
        v: value,
        // <- value
        p: prev = that._l,
        // <- previous entry
        n: undefined,
        // <- next entry
        r: false // <- removed

      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++; // add to index

      if (index !== 'F') that._i[index] = entry;
    }

    return that;
  },
  getEntry: getEntry,
  setStrong: function setStrong(C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    _iterDefine(C, NAME, function (iterated, kind) {
      this._t = _validateCollection(iterated, NAME); // target

      this._k = kind; // kind

      this._l = undefined; // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l; // revert to the last existing entry

      while (entry && entry.r) {
        entry = entry.p;
      } // get next entry


      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return _iterStep(1);
      } // return step by kind


      if (kind == 'keys') return _iterStep(0, entry.k);
      if (kind == 'values') return _iterStep(0, entry.v);
      return _iterStep(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2


    _setSpecies(NAME);
  }
}; // Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */

var check = function check(O, proto) {
  _anObject(O);

  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};

var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
  function (test, buggy, set) {
    try {
      set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
      set(test, []);
      buggy = !(test instanceof Array);
    } catch (e) {
      buggy = true;
    }

    return function setPrototypeOf(O, proto) {
      check(O, proto);
      if (buggy) O.__proto__ = proto;else set(O, proto);
      return O;
    };
  }({}, false) : undefined),
  check: check
};
var setPrototypeOf = _setProto.set;

var _inheritIfRequired = function _inheritIfRequired(that, target, C) {
  var S = target.constructor;
  var P;

  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  }

  return that;
};

var _collection = function _collection(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = _global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};

  var fixMethod = function fixMethod(KEY) {
    var fn = proto[KEY];

    _redefine(proto, KEY, KEY == 'delete' ? function (a) {
      return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'has' ? function has(a) {
      return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'get' ? function get(a) {
      return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'add' ? function add(a) {
      fn.call(this, a === 0 ? 0 : a);
      return this;
    } : function set(a, b) {
      fn.call(this, a === 0 ? 0 : a, b);
      return this;
    });
  };

  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);

    _redefineAll(C.prototype, methods);

    _meta.NEED = true;
  } else {
    var instance = new C(); // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = _fails(function () {
      instance.has(1);
    }); // most early implementations doesn't supports iterables, most modern - not close it correctly


    var ACCEPT_ITERABLES = _iterDetect(function (iter) {
      new C(iter);
    }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same


    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;

      while (index--) {
        $instance[ADDER](index, index);
      }

      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        _anInstance(target, C, NAME);

        var that = _inheritIfRequired(new Base(), target, C);

        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  _setToStringTag(C, NAME);

  O[NAME] = C;

  _export(_export.G + _export.W + _export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
  return C;
};

var SET = 'Set'; // 23.2 Set Objects

var es6_set = _collection(SET, function (get) {
  return function Set() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
  }
}, _collectionStrong); // 7.2.8 IsRegExp(argument)


var MATCH = _wks('match');

var _isRegexp = function _isRegexp(it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
}; // 7.3.20 SpeciesConstructor(O, defaultConstructor)


var SPECIES$1 = _wks('species');

var _speciesConstructor = function _speciesConstructor(O, D) {
  var C = _anObject(O).constructor;

  var S;
  return C === undefined || (S = _anObject(C)[SPECIES$1]) == undefined ? D : _aFunction(S);
};

var at = _stringAt(true); // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex


var _advanceStringIndex = function _advanceStringIndex(S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

var builtinExec = RegExp.prototype.exec; // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec

var _regexpExecAbstract = function _regexpExecAbstract(R, S) {
  var exec = R.exec;

  if (typeof exec === 'function') {
    var result = exec.call(R, S);

    if (_typeof2(result) !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }

    return result;
  }

  if (_classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }

  return builtinExec.call(R, S);
}; // 21.2.5.3 get RegExp.prototype.flags


var _flags = function _flags() {
  var that = _anObject(this);

  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.

var nativeReplace = String.prototype.replace;
var patchedExec = nativeExec;
var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
}(); // nonparticipating capturing group, copied from es5-shim's String#split patch.


var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
    }

    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];
    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var _regexpExec = patchedExec;

_export({
  target: 'RegExp',
  proto: true,
  forced: _regexpExec !== /./.exec
}, {
  exec: _regexpExec
});

var SPECIES$2 = _wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;

  re.exec = function () {
    var result = [];
    result.groups = {
      a: '7'
    };
    return result;
  };

  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;

  re.exec = function () {
    return originalExec.apply(this, arguments);
  };

  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
}();

var _fixReWks = function _fixReWks(KEY, length, exec) {
  var SYMBOL = _wks(KEY);

  var DELEGATES_TO_SYMBOL = !_fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};

    O[SYMBOL] = function () {
      return 7;
    };

    return ''[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    re.exec = function () {
      execCalled = true;
      return null;
    };

    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};

      re.constructor[SPECIES$2] = function () {
        return re;
      };
    }

    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(_defined, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === _regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return {
            done: true,
            value: nativeRegExpMethod.call(regexp, str, arg2)
          };
        }

        return {
          done: true,
          value: nativeMethod.call(str, regexp, arg2)
        };
      }

      return {
        done: false
      };
    });
    var strfn = fns[0];
    var rxfn = fns[1];

    _redefine(String.prototype, KEY, strfn);

    _hide(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return rxfn.call(string, this, arg);
    } // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return rxfn.call(string, this);
    });
  }
};

var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX$1 = 'lastIndex';
var MAX_UINT32 = 0xffffffff; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

var SUPPORTS_Y = !_fails(function () {
  RegExp(MAX_UINT32, 'y');
}); // @@split logic

_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;

  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function internalSplit(separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return []; // If `separator` is not a regex, use native split

      if (!_isRegexp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0; // Make `global` and avoid `lastIndex` issues by working with a copy

      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;

      while (match = _regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX$1];

        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }

        if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
      }

      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));

      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    }; // Chakra, V8

  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function internalSplit(separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [// `String.prototype.split` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.split
  function split(separator, limit) {
    var O = defined(this);
    var splitter = separator == undefined ? undefined : separator[SPLIT];
    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
  }, // `RegExp.prototype[@@split]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
  //
  // NOTE: This cannot be properly polyfilled in engines that don't support
  // the 'y' flag.
  function (regexp, limit) {
    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
    if (res.done) return res.value;

    var rx = _anObject(regexp);

    var S = String(this);

    var C = _speciesConstructor(rx, RegExp);

    var unicodeMatching = rx.unicode;
    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
    // simulate the 'y' flag.

    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
    if (lim === 0) return [];
    if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
    var p = 0;
    var q = 0;
    var A = [];

    while (q < S.length) {
      splitter.lastIndex = SUPPORTS_Y ? q : 0;

      var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));

      var e;

      if (z === null || (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
        q = _advanceStringIndex(S, q, unicodeMatching);
      } else {
        A.push(S.slice(p, q));
        if (A.length === lim) return A;

        for (var i = 1; i <= z.length - 1; i++) {
          A.push(z[i]);
          if (A.length === lim) return A;
        }

        q = p = e;
      }
    }

    A.push(S.slice(p));
    return A;
  }];
});

var MAP = 'Map'; // 23.1 Map Objects

var es6_map = _collection(MAP, function (get) {
  return function Map() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);

    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
  }
}, _collectionStrong, true);
/**
 * Gets all the cookies as a Map
 *
 * @returns Map of cookie values
 */


function getAllCookies() {
  return new Map(document.cookie.split(';').map(function (cookie) {
    return cookie.trim().split('=');
  }));
}
/**
 * Checks if cookie exists
 *
 * @param {String} name name of cookie
 * @return {Boolean} true of cookie is present
 */


function hasCookie(name) {
  return getAllCookies().has(name);
}
/**
 * Gets the cookie value
 *
 * @param {String} name name of cookie
 * @return {String} the value of the cookie
 */


function getCookie(name) {
  return getAllCookies().get(name);
}

var cookie = {
  getAllCookies: getAllCookies,
  hasCookie: hasCookie,
  getCookie: getCookie
}; // https://github.com/tc39/Array.prototype.includes

var $includes = _arrayIncludes(true);

_export(_export.P, 'Array', {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_addToUnscopables('includes'); // helper for String#{startsWith, endsWith, includes}


var _stringContext = function _stringContext(that, searchString, NAME) {
  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(_defined(that));
};

var MATCH$1 = _wks('match');

var _failsIsRegexp = function _failsIsRegexp(KEY) {
  var re = /./;

  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH$1] = false;
      return !'/./'[KEY](re);
    } catch (f) {
      /* empty */
    }
  }

  return true;
};

var INCLUDES = 'includes';

_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~_stringContext(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var FrameworkBase = /*#__PURE__*/function () {
  function FrameworkBase() {
    _classCallCheck(this, FrameworkBase);

    this.privacyComplianceInstance = null;
  }

  _createClass(FrameworkBase, [{
    key: "name",
    value: function name() {
      return 'FrameworkBase';
    }
  }, {
    key: "isApplicable",
    value: function isApplicable() {
      return true;
    }
  }, {
    key: "useConfig",
    value: function useConfig() {}
  }, {
    key: "supportedCapabilities",
    value: function supportedCapabilities() {
      return [];
    }
  }, {
    key: "supportedGenerators",
    value: function supportedGenerators() {
      return [];
    }
  }, {
    key: "canAnswerCapability",
    value: function canAnswerCapability(capability) {
      return this.supportedCapabilities().includes(capability);
    }
  }, {
    key: "canGenerate",
    value: function canGenerate(ability) {
      return this.supportedGenerators().includes(ability);
    }
  }, {
    key: "setPrivacyComplianceInstance",
    value: function setPrivacyComplianceInstance(pc) {
      this.privacyComplianceInstance = pc;
    }
  }, {
    key: "log",
    value: function log() {
      var _this$privacyComplian;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.privacyComplianceInstance && (_this$privacyComplian = this.privacyComplianceInstance).log.apply(_this$privacyComplian, ["[".concat(this.name(), "]")].concat(args));
    }
  }], [{
    key: "isAutoLoaded",
    value: function isAutoLoaded() {
      return true;
    }
  }]);

  return FrameworkBase;
}();

var base = FrameworkBase;

var CcpaOnChorus = /*#__PURE__*/function (_FrameworkBase) {
  _inherits(CcpaOnChorus, _FrameworkBase);

  var _super = _createSuper(CcpaOnChorus);

  function CcpaOnChorus() {
    _classCallCheck(this, CcpaOnChorus);

    return _super.apply(this, arguments);
  }

  _createClass(CcpaOnChorus, [{
    key: "name",
    value: function name() {
      return 'CcpaOnChorus';
    }
  }, {
    key: "isApplicable",
    value: function isApplicable() {
      return !!window && !!window.Chorus;
    }
  }, {
    key: "supportedCapabilities",
    value: function supportedCapabilities() {
      return ['canUsePersonalInformationForTargeting', 'hasBeenNotifiedOfRights', 'isLSPACoveredTransaction'];
    }
  }, {
    key: "canUsePersonalInformationForTargeting",
    value: function canUsePersonalInformationForTargeting() {
      return !cookie.hasCookie('_chorus_ccpa_consent_donotsell');
    }
  }, {
    key: "hasBeenNotifiedOfRights",
    value: function hasBeenNotifiedOfRights() {
      // see https://voxmedia.slack.com/archives/CPJDM3CCU/p1594741208106400
      return true;
    }
  }, {
    key: "isLSPACoveredTransaction",
    value: function isLSPACoveredTransaction() {
      return true;
    }
  }]);

  return CcpaOnChorus;
}(base);

var ccpa_on_chorus = CcpaOnChorus;
/**
 * Implements usprivacy string framework
 * for more information on the US Privacy string see:
 * https://github.com/InteractiveAdvertisingBureau/USPrivacy/blob/master/CCPA/US%20Privacy%20String.md#us-privacy-string-format
 */

var CCPAFromUSPrivacyString = /*#__PURE__*/function (_FrameworkBase) {
  _inherits(CCPAFromUSPrivacyString, _FrameworkBase);

  var _super = _createSuper(CCPAFromUSPrivacyString);

  function CCPAFromUSPrivacyString() {
    var _this;

    _classCallCheck(this, CCPAFromUSPrivacyString);

    _this = _super.call(this);
    _this.usPrivacyString = '';
    return _this;
  }

  _createClass(CCPAFromUSPrivacyString, [{
    key: "name",
    value: function name() {
      return 'CCPAFromUSPrivacyString';
    }
  }, {
    key: "useConfig",
    value: function useConfig(_ref) {
      var usp = _ref.usp;

      if (usp) {
        this.usPrivacyString = ('' + usp).toUpperCase();
      }
    }
  }, {
    key: "isApplicable",
    value: function isApplicable() {
      return !!this.usPrivacyString;
    }
  }, {
    key: "supportedCapabilities",
    value: function supportedCapabilities() {
      return ['canUsePersonalInformationForTargeting', 'hasBeenNotifiedOfRights', 'isLSPACoveredTransaction'];
    }
  }, {
    key: "canUsePersonalInformationForTargeting",
    value: function canUsePersonalInformationForTargeting() {
      return this.consentStringAllowsPersonalDataSale();
    }
  }, {
    key: "hasBeenNotifiedOfRights",
    value: function hasBeenNotifiedOfRights() {
      return this.consentStringAcknowledgesUserHasBeenNotifiedOfRights();
    }
  }, {
    key: "consentStringAllowsPersonalDataSale",
    value: function consentStringAllowsPersonalDataSale() {
      if (!this.supportedUsPrivacyStringVersion()) return true;
      if (!this.consentStringAcknowledgesUserHasBeenNotifiedOfRights()) return true;
      return this.usPrivacyString[2] !== 'Y';
    }
  }, {
    key: "isLSPACoveredTransaction",
    value: function isLSPACoveredTransaction() {
      return this.supportedUsPrivacyStringVersion() && this.usPrivacyString[3] === 'Y';
    }
  }, {
    key: "consentStringAcknowledgesUserHasBeenNotifiedOfRights",
    value: function consentStringAcknowledgesUserHasBeenNotifiedOfRights() {
      return this.supportedUsPrivacyStringVersion() && this.usPrivacyString[1] === 'Y';
    }
  }, {
    key: "supportedUsPrivacyStringVersion",
    value: function supportedUsPrivacyStringVersion() {
      return this.usPrivacyString.length === 4 && this.usPrivacyString[0] === '1';
    }
  }]);

  return CCPAFromUSPrivacyString;
}(base);

var ccpa_from_us_privacy_string = CCPAFromUSPrivacyString;
var US_PRIVACY_API_VERSION = 1;
/**
 * Implements usprivacy string framework
 * for more information on the US Privacy string see:
 * https://github.com/InteractiveAdvertisingBureau/USPrivacy/blob/master/CCPA/US%20Privacy%20String.md#us-privacy-string-format
 */

var UsPrivacyStringAndAPIGenerator = /*#__PURE__*/function (_FrameworkBase) {
  _inherits(UsPrivacyStringAndAPIGenerator, _FrameworkBase);

  var _super = _createSuper(UsPrivacyStringAndAPIGenerator);

  function UsPrivacyStringAndAPIGenerator() {
    var _this;

    _classCallCheck(this, UsPrivacyStringAndAPIGenerator);

    _this = _super.call(this);
    _this.window = window;
    _this.document = document;
    return _this;
  }

  _createClass(UsPrivacyStringAndAPIGenerator, [{
    key: "name",
    value: function name() {
      return 'UsPrivacyStringAndAPIGenerator';
    }
  }, {
    key: "supportedGenerators",
    value: function supportedGenerators() {
      return ['usPrivacyString', 'installPrivacyAPI'];
    }
  }, {
    key: "useConfig",
    value: function useConfig(_ref) {
      var window = _ref.window,
          document = _ref.document;

      if (window) {
        this.window = window;
      }

      if (document) {
        this.document = document;
      }
    }
  }, {
    key: "usPrivacyString",
    value: function usPrivacyString() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      callback(this.buildUsPrivacyString(), this);
    }
  }, {
    key: "installPrivacyAPI",
    value: function installPrivacyAPI() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.window.__uspapi = this.handleUSPrivacyAPI.bind(this);
      this.createUspapiFrame();
      callback(true);
    } // Private methods ---------

  }, {
    key: "buildUsPrivacyString",
    value: function buildUsPrivacyString() {
      var usp = '' + US_PRIVACY_API_VERSION;
      usp += this.privacyComplianceInstance.hasBeenNotifiedOfRights() ? 'Y' : 'N';
      usp += this.privacyComplianceInstance.canUsePersonalInformationForTargeting() ? 'N' : 'Y';
      usp += this.privacyComplianceInstance.isLSPACoveredTransaction() ? 'Y' : 'N';
      return usp;
    }
  }, {
    key: "handleUSPrivacyAPI",
    value: function handleUSPrivacyAPI(command, version, callback) {
      if (typeof callback !== 'function') {
        throw "__uspapi: Expected ".concat(callback, " to be a function, received a ").concat(_typeof(callback));
      }

      var canSuccessfullyAnswer = true;
      var usPrivacyDataString = "".concat(US_PRIVACY_API_VERSION, "---");

      if (version !== US_PRIVACY_API_VERSION) {
        console.error("__uspapi: Only able to handle version 1");
        canSuccessfullyAnswer = false;
      }

      switch (command) {
        case 'getUSPData':
          usPrivacyDataString = this.buildUsPrivacyString();
          break;

        default:
          canSuccessfullyAnswer = false;
          console.error("__uspapi: Unable to handle command '".concat(command, "'"));
      }

      this.log("".concat(canSuccessfullyAnswer ? 'Successfully' : 'Unsuccessfully', " handled CCPA privacy request ").concat(usPrivacyDataString));
      callback({
        uspString: usPrivacyDataString,
        version: US_PRIVACY_API_VERSION
      }, canSuccessfullyAnswer);
    }
    /**
     * Creates a top level iframe used to proxy messages between
     * frames and this implementation of the CCPA Compliance Framework
     *
     * It works by:
     *   1. Creating a specially named iframe
     *   2. Setting up an event listener on this frame
     *   3. This listener will proxy "__uspapiCall" messages to handleUSPrivacyAPI
     *   4. and post the message back to the sending frame.
     */

  }, {
    key: "createUspapiFrame",
    value: function createUspapiFrame() {
      var _this2 = this;

      this.log('Creating __uspapiLocator iframe');
      var frame = this.document.createElement('iframe');
      frame.setAttribute('name', '__uspapiLocator');
      frame.style.display = 'none';

      if (this.document.readyState === 'loading') {
        this.document.addEventListener('DOMContentLoaded', function () {
          _this2.document.body.appendChild(frame);

          _this2.setupIframeMessageProxyOn(frame);
        });
      } else {
        this.document.body.appendChild(frame);
        this.setupIframeMessageProxyOn(frame);
      }
    }
    /**
     * Will setup listener proxy on the iframe which... accomplish 2-4 from above
     *
     *   2. Setting up an event listener on this frame
     *   3. This listener will proxy "__uspapiCall" messages to handleUSPrivacyAPI
     *   4. and post the message back to the sending frame.
     *
     * @param {DOMElement} frame the iframe to setup the listener on
     */

  }, {
    key: "setupIframeMessageProxyOn",
    value: function setupIframeMessageProxyOn(frame) {
      var _this3 = this;

      frame.contentWindow.addEventListener('message', function (event) {
        var messageData = event.data;

        if (messageData && messageData.__uspapiCall) {
          _this3.log('__uspapiLocator responding to message request');

          var uspapiCallParameters = messageData.__uspapiCall;
          var targetSource = event.source || window.top;
          var targetOrigin = event.origin || '*';

          _this3.handleUSPrivacyAPI(uspapiCallParameters.command, uspapiCallParameters.version, function (uspData, wasSuccessful) {
            targetSource.postMessage({
              __uspapiReturn: {
                returnValue: uspData,
                success: wasSuccessful,
                callId: uspapiCallParameters.callId
              }
            }, targetOrigin);
          });
        }
      });
    }
  }]);

  return UsPrivacyStringAndAPIGenerator;
}(base);

var us_privacy_string_and_api_generator = UsPrivacyStringAndAPIGenerator;
var RAKUTEN_CONSENT_PARAM = 'cnst';

var RakutenConsentGenerator = /*#__PURE__*/function (_FrameworkBase) {
  _inherits(RakutenConsentGenerator, _FrameworkBase);

  var _super = _createSuper(RakutenConsentGenerator);

  function RakutenConsentGenerator() {
    var _this;

    _classCallCheck(this, RakutenConsentGenerator);

    _this = _super.call(this);
    _this.document = document;
    _this.rakutenLinkSelector = 'a[href^="https://click.linksynergy.com"]';
    return _this;
  }

  _createClass(RakutenConsentGenerator, [{
    key: "name",
    value: function name() {
      return 'RakutenConsentGenerator';
    }
  }, {
    key: "isApplicable",
    value: function isApplicable() {
      // This generator depends on being able to generate a usPrivacyString
      // this is checked when this Generator is being called, so load order isn't important
      // since all the generators are loaded by the time they are being run
      return this.privacyComplianceInstance.canGenerate('usPrivacyString');
    }
  }, {
    key: "supportedGenerators",
    value: function supportedGenerators() {
      return ['addConsentParameterToCommerceLinks'];
    }
  }, {
    key: "useConfig",
    value: function useConfig(_ref) {
      var document = _ref.document,
          rakutenLinkSelector = _ref.rakutenLinkSelector;

      if (document) {
        this.document = document;
      }

      if (rakutenLinkSelector) {
        this.rakutenLinkSelector = rakutenLinkSelector;
      }
    }
  }, {
    key: "addConsentParameterToCommerceLinks",
    value: function addConsentParameterToCommerceLinks() {
      var _this2 = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var usp;
      this.privacyComplianceInstance.Generator.usPrivacyString(function (val) {
        return usp = val;
      });
      var allRakutenLinks = Array.from(this.document.querySelectorAll(this.rakutenLinkSelector));
      var rakutenLinksThatNeedConsentParams = allRakutenLinks.filter(function (link) {
        var _link$href;

        return !((_link$href = link.href) === null || _link$href === void 0 ? void 0 : _link$href.includes(RAKUTEN_CONSENT_PARAM + '='));
      });
      rakutenLinksThatNeedConsentParams.forEach(function (link) {
        _this2.log('Adding rakuten consent parameter to a link', link.href, usp);

        link.href += link.href.includes('?') ? '&' : '?' + "".concat(RAKUTEN_CONSENT_PARAM, "=c").concat(usp);
      });
      callback(rakutenLinksThatNeedConsentParams, this);
    }
  }]);

  return RakutenConsentGenerator;
}(base);

var rakuten_consent_generator = RakutenConsentGenerator;
var frameworks = [ccpa_on_chorus, ccpa_from_us_privacy_string, us_privacy_string_and_api_generator, rakuten_consent_generator];
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var proxy = function proxyPolyfill() {
  var lastRevokeFn = null;

  var _ProxyPolyfill;
  /**
   * @param {*} o
   * @return {boolean} whether this is probably a (non-null) Object
   */


  function isObject(o) {
    return o ? _typeof2(o) === 'object' || typeof o === 'function' : false;
  }

  function validateProto(proto) {
    if (proto !== null && !isObject(proto)) {
      throw new TypeError('Object prototype may only be an Object or null: ' + proto);
    }
  }

  var $Object = Object; // Closure assumes that `{__proto__: null} instanceof Object` is always true, hence why we check against a different name.

  var canCreateNullProtoObjects = Boolean($Object.create) || !({
    __proto__: null
  } instanceof $Object);
  var objectCreate = $Object.create || (canCreateNullProtoObjects ? function create(proto) {
    validateProto(proto);
    return {
      __proto__: proto
    };
  } : function create(proto) {
    validateProto(proto);

    if (proto === null) {
      throw new SyntaxError('Native Object.create is required to create objects with null prototype');
    } // nb. cast to convince Closure compiler that this is a constructor


    var T =
    /** @type {!Function} */
    function T() {};

    T.prototype = proto;
    return new T();
  });

  var noop = function noop() {
    return null;
  };

  var getProto = $Object.getPrototypeOf || ([].__proto__ === Array.prototype ? function getPrototypeOf(O) {
    // If O.[[Prototype]] === null, then the __proto__ accessor won't exist,
    // as it's inherited from `Object.prototype`
    var proto = O.__proto__;
    return isObject(proto) ? proto : null;
  } : noop);
  /**
   * @constructor
   * @param {!Object} target
   * @param {{apply, construct, get, set}} handler
   */

  _ProxyPolyfill = function ProxyPolyfill(target, handler) {
    var newTarget = this && this instanceof _ProxyPolyfill ? this.constructor : undefined;

    if (newTarget === undefined) {
      throw new TypeError("Constructor Proxy requires 'new'");
    }

    if (!isObject(target) || !isObject(handler)) {
      throw new TypeError('Cannot create proxy with a non-object as target or handler');
    } // Construct revoke function, and set lastRevokeFn so that Proxy.revocable can steal it.
    // The caller might get the wrong revoke function if a user replaces or wraps scope.Proxy
    // to call itself, but that seems unlikely especially when using the polyfill.


    var throwRevoked = function throwRevoked() {};

    lastRevokeFn = function lastRevokeFn() {
      /** @suppress {checkTypes} */
      target = null; // clear ref

      throwRevoked = function throwRevoked(trap) {
        throw new TypeError("Cannot perform '".concat(trap, "' on a proxy that has been revoked"));
      };
    };

    setTimeout(function () {
      lastRevokeFn = null;
    }, 0); // Fail on unsupported traps: Chrome doesn't do this, but ensure that users of the polyfill
    // are a bit more careful. Copy the internal parts of handler to prevent user changes.

    var unsafeHandler = handler;
    handler = {
      'get': null,
      'set': null,
      'apply': null,
      'construct': null
    };

    for (var k in unsafeHandler) {
      if (!(k in handler)) {
        throw new TypeError("Proxy polyfill does not support trap '".concat(k, "'"));
      }

      handler[k] = unsafeHandler[k];
    }

    if (typeof unsafeHandler === 'function') {
      // Allow handler to be a function (which has an 'apply' method). This matches what is
      // probably a bug in native versions. It treats the apply call as a trap to be configured.
      handler.apply = unsafeHandler.apply.bind(unsafeHandler);
    } // Define proxy as an object that extends target.[[Prototype]],
    // or a Function (if either it's callable, or apply is set).


    var proto = getProto(target); // can return null in old browsers

    var proxy;
    var isMethod = false;
    var isArray = false;

    if (typeof target === 'function') {
      proxy = function ProxyPolyfill() {
        var usingNew = this && this.constructor === proxy;
        var args = Array.prototype.slice.call(arguments);
        throwRevoked(usingNew ? 'construct' : 'apply'); // TODO(samthor): Closure compiler doesn't know about 'construct', attempts to rename it.

        if (usingNew && handler['construct']) {
          return handler['construct'].call(this, target, args);
        } else if (!usingNew && handler.apply) {
          return handler['apply'](target, this, args);
        } // since the target was a function, fallback to calling it directly.


        if (usingNew) {
          // inspired by answers to https://stackoverflow.com/q/1606797
          args.unshift(target); // pass class as first arg to constructor, although irrelevant
          // nb. cast to convince Closure compiler that this is a constructor

          var _f =
          /** @type {!Function} */
          target.bind.apply(target, args);

          return new _f();
        }

        return target.apply(this, args);
      };

      isMethod = true;
    } else if (target instanceof Array) {
      proxy = [];
      isArray = true;
    } else {
      proxy = canCreateNullProtoObjects || proto !== null ? objectCreate(proto) : {};
    } // Create default getters/setters. Create different code paths as handler.get/handler.set can't
    // change after creation.


    var getter = handler.get ? function (prop) {
      throwRevoked('get');
      return handler.get(this, prop, proxy);
    } : function (prop) {
      throwRevoked('get');
      return this[prop];
    };
    var setter = handler.set ? function (prop, value) {
      throwRevoked('set');
      var status = handler.set(this, prop, value, proxy); // TODO(samthor): If the calling code is in strict mode, throw TypeError.
      // if (!status) {
      // It's (sometimes) possible to work this out, if this code isn't strict- try to load the
      // callee, and if it's available, that code is non-strict. However, this isn't exhaustive.
      // }
    } : function (prop, value) {
      throwRevoked('set');
      this[prop] = value;
    }; // Clone direct properties (i.e., not part of a prototype).

    var propertyNames = $Object.getOwnPropertyNames(target);
    var propertyMap = {};
    propertyNames.forEach(function (prop) {
      if ((isMethod || isArray) && prop in proxy) {
        return; // ignore properties already here, e.g. 'bind', 'prototype' etc
      }

      var real = $Object.getOwnPropertyDescriptor(target, prop);
      var desc = {
        enumerable: Boolean(real.enumerable),
        get: getter.bind(target, prop),
        set: setter.bind(target, prop)
      };
      $Object.defineProperty(proxy, prop, desc);
      propertyMap[prop] = true;
    }); // Set the prototype, or clone all prototype methods (always required if a getter is provided).
    // TODO(samthor): We don't allow prototype methods to be set. It's (even more) awkward.
    // An alternative here would be to _just_ clone methods to keep behavior consistent.

    var prototypeOk = true;

    if (isMethod || isArray) {
      // Arrays and methods are special: above, we instantiate boring versions of these then swap
      // our their prototype later. So we only need to use setPrototypeOf in these cases. Some old
      // engines support `Object.getPrototypeOf` but not `Object.setPrototypeOf`.
      var setProto = $Object.setPrototypeOf || ([].__proto__ === Array.prototype ? function setPrototypeOf(O, proto) {
        validateProto(proto);
        O.__proto__ = proto;
        return O;
      } : noop);

      if (!(proto && setProto(proxy, proto))) {
        prototypeOk = false;
      }
    }

    if (handler.get || !prototypeOk) {
      for (var _k in target) {
        if (propertyMap[_k]) {
          continue;
        }

        $Object.defineProperty(proxy, _k, {
          get: getter.bind(target, _k)
        });
      }
    } // The Proxy polyfill cannot handle adding new properties. Seal the target and proxy.


    $Object.seal(target);
    $Object.seal(proxy);
    return proxy; // nb. if isMethod is true, proxy != this
  };

  _ProxyPolyfill.revocable = function (target, handler) {
    var p = new _ProxyPolyfill(target, handler);
    return {
      'proxy': p,
      'revoke': lastRevokeFn
    };
  };

  return _ProxyPolyfill;
};

(function (scope) {
  if (scope['Proxy']) {
    return;
  }

  scope.Proxy = proxy();
  scope.Proxy['revocable'] = scope.Proxy.revocable;
})('undefined' !== typeof process && '[object process]' === {}.toString.call(process) || 'undefined' !== typeof navigator && navigator.product === 'ReactNative' ? commonjsGlobal : self);
/**
 * The public Privacy Compliance class, which is exported as a singleton
 *
 * Responsible for managing frameworks and proxying requests to related
 * frameworks.
 *
 * Note: This uses Proxy() to support introspection of method calls
 * to make it look like this class has a lot more functions
 * than it really does
 */


var PrivacyCompliance = /*#__PURE__*/function () {
  function PrivacyCompliance() {
    var _this = this;

    _classCallCheck(this, PrivacyCompliance);

    this.frameworks = [];
    this.supportedCapabilities = new Set();
    this.supportedGenerators = new Set();
    this.logEntries = [];

    this.logger = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.logEntries.push(args);
    };
  }
  /**
   * useConfig is a convenient way to pass configuration values to all frameworks.
   * When a useConfig is called, every loaded framework will have their own
   * useConfig methods called.
   *
   * The ideal pattern is to use keys to type the configs, for example:
   * PrivacyCompliance.useConfig({
   *   usp: "1TFT"
   * })
   * Which could signal to any listening capabiltiy-frameworks to use the new
   * US Privacy String
   *
   * @param {Object} someConfigs any config to share with all frameworks
   */


  _createClass(PrivacyCompliance, [{
    key: "useConfig",
    value: function useConfig(someConfigs) {
      this.frameworks.forEach(function (f) {
        return f.useConfig(someConfigs);
      });
    }
    /**
     * Allows this libraries internal logs to be accessible to including libraries.
     * The default is to also insert any missed logs. Because this is setup as a singleton,
     * it is easy to miss the initial setup logs, that happened, before a logger was setup.
     *
     * @param {Function} logFunction to be called everytime a new log entry is generated
     * @param {Boolean} relogMissedEntries when true will relog missed entries from before the logger was wired up
     */

  }, {
    key: "useLogger",
    value: function useLogger(logFunction) {
      var _this2 = this;

      var relogMissedEntries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.logger = logFunction;

      if (relogMissedEntries) {
        this.logEntries.forEach(function (entry) {
          return _this2.log.apply(_this2, _toConsumableArray(entry));
        });
      }
    }
  }, {
    key: "addFramework",
    value: function addFramework(frameworkInstance) {
      var _this3 = this;

      this.log('Adding new framework: ', frameworkInstance.name());
      frameworkInstance.setPrivacyComplianceInstance(privacyComplianceSingleton);
      this.frameworks.push(frameworkInstance);
      frameworkInstance.supportedCapabilities().forEach(function (c) {
        return _this3.supportedCapabilities.add(c);
      });
      frameworkInstance.supportedGenerators().forEach(function (c) {
        return _this3.supportedGenerators.add(c);
      });
    }
    /**
     * Checks if a given Capability (as a string) can be answered by the loaded
     * frameworks.
     *
     * Caution: not all frameworks will be applicable and able to
     * answer this capability for all environments.
     *
     * @param {String} capability the method name of the capability
     * @returns Boolean true if the capability can be answered
     */

  }, {
    key: "hasFrameworkLoadedToAnswerCapability",
    value: function hasFrameworkLoadedToAnswerCapability(capability) {
      return this.supportedCapabilities.has(capability);
    }
  }, {
    key: "canGenerate",
    value: function canGenerate(ability) {
      return this.supportedGenerators.has(ability);
    }
    /**
     * Returns a list of applicable frameworks for this environment.
     */

  }, {
    key: "applicableFrameworks",
    value: function applicableFrameworks() {
      return this.frameworks.filter(function (f) {
        return f.isApplicable();
      });
    }
  }, {
    key: "log",
    value: function log() {
      this.logger.apply(this, arguments);
    }
  }, {
    key: "reset",
    // For use with testing only
    value: function reset() {
      this.log("Reset called. Removing ".concat(this.frameworks.length, " framework(s)"));
      this.frameworks = [];
      this.supportedCapabilities = new Set();
      this.supportedGenerators = new Set();
    }
    /**
     * This method will take a string, translate it into a method and call it
     * on the added frameworks. If all applicable frameworks support this capability
     * then it will return true, if not it will be false.
     *
     * @param {String} methodName the name of methods to call on the base frameworks
     * @return Boolean if all the frameworks permit this
     */

  }, {
    key: "proxyToFrameworks",
    value: function proxyToFrameworks(methodName) {
      var _this4 = this;

      try {
        return this.frameworks.filter(function (f) {
          return f.isApplicable();
        }).filter(function (f) {
          return f.canAnswerCapability(methodName);
        }).map(function (f) {
          _this4.log(f.name() + ' answering: ' + methodName);

          return f;
        }).map(function (f) {
          return f[methodName].call(f);
        }).every(function (result) {
          return !!result;
        });
      } catch (e) {
        console.error("There was an error calling ".concat(methodName, " - ").concat(e));
      }
    }
    /**
     * This method will take a string, translate it into a method and call it
     * on the added frameworks. If all applicable frameworks support this generator
     * then it will be called, with the given passback.
     *
     * Note this is a little more complex than capabilities, because like capabilities
     * multiple frameworks can be called for this generator, and there is no convenient way
     * to collect those responses, so instead it takes a callback that will be executed for
     * every generator run.
     *
     * @param {String} methodName the name of methods to call on the base frameworks
     * @returns {Function} the function to execute, with callback of the generators response
     */

  }, {
    key: "proxyToFrameworkGenerators",
    value: function proxyToFrameworkGenerators(methodName) {
      var _this5 = this;

      if (this.canGenerate(methodName)) {
        return function () {
          var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

          try {
            _this5.frameworks.filter(function (f) {
              return f.isApplicable();
            }).filter(function (f) {
              return f.canGenerate(methodName);
            }).forEach(function (f) {
              return f[methodName].call(f, callback);
            });
          } catch (e) {
            console.error("There was an error calling ".concat(methodName, " - ").concat(e));
          }
        };
      } else {
        this.throwUnsupportedError(methodName);
      }
    }
  }, {
    key: "throwUnsupportedError",
    value: function throwUnsupportedError(method) {
      throw new TypeError("Can not call '".concat(method, "'. It is not found in the loaded frameworks. Supported capabilities: ").concat(Array.from(this.supportedCapabilities).join(', ')));
    }
    /**
     * This uses a modern Proxy() object to support arbitrary missing methods
     * which allows the frameworks to declare their own capability methods without
     * needing to add those to this class.
     */

  }, {
    key: "applyProxy",
    value: function applyProxy() {
      return new Proxy(this, {
        get: function get(privacyComplianceInstance, property) {
          if (Reflect.has(privacyComplianceInstance, property)) {
            return Reflect.get(privacyComplianceInstance, property);
          } else if (privacyComplianceInstance.hasFrameworkLoadedToAnswerCapability(property)) {
            return function () {
              return privacyComplianceInstance.proxyToFrameworks(property);
            };
          } else {
            privacyComplianceInstance.throwUnsupportedError(property);
          }
        }
      });
    }
  }, {
    key: "Generator",
    get: function get() {
      return new Proxy(this, {
        get: function get(privacyComplianceInstance, property) {
          return privacyComplianceInstance.proxyToFrameworkGenerators(property);
        }
      });
    }
  }]);

  return PrivacyCompliance;
}();

var privacyComplianceSingleton = new PrivacyCompliance().applyProxy(); // Autoload all of the auto-loaded frameworks

frameworks.filter(function (f) {
  return f.isAutoLoaded();
}).forEach(function (f) {
  privacyComplianceSingleton.addFramework(new f());
});
var privacy_compliance = privacyComplianceSingleton;
var src = {
  PrivacyCompliance: privacy_compliance
};
module.exports = src;
//# sourceMappingURL=data-privacy-compliance.js.map
