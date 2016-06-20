var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
var java;
(function (java) {
    var lang;
    (function (lang) {
        var System = (function () {
            function System() {
            }

            System.gc = function () {
            };
            System.arraycopy = function (src, srcPos, dest, destPos, numElements) {
                if ((dest instanceof Float64Array || dest instanceof Int32Array)
                    && (src instanceof Float64Array || src instanceof Int32Array)) {
                    if (numElements == src.length) {
                        dest.set(src, destPos);
                    }
                    else {
                        dest.set(src.subarray(srcPos, srcPos + numElements), destPos);
                    }
                }
                else {
                    for (var i = 0; i < numElements; i++) {
                        dest[destPos + i] = src[srcPos + i];
                    }
                }
            };
            return System;
        }());
        lang.System = System;
        var StringBuilder = (function () {
            function StringBuilder() {
                this._buffer = "";
                this.length = 0;
            }

            StringBuilder.prototype.append = function (val) {
                this._buffer = this._buffer + val;
                this.length = this._buffer.length;
                return this;
            };
            StringBuilder.prototype.insert = function (position, val) {
                this._buffer = this._buffer.slice(0, position) + val + this._buffer.slice(position);
                return this;
            };
            StringBuilder.prototype.toString = function () {
                return this._buffer;
            };
            return StringBuilder;
        }());
        lang.StringBuilder = StringBuilder;
        var String = (function () {
            function String() {
            }

            String.valueOf = function (data, offset, count) {
                if (typeof offset === 'undefined' && typeof count === 'undefined') {
                    return data + '';
                }
                else {
                    return data.slice(offset, offset + count);
                }
            };
            String.hashCode = function (str) {
                var h = str['_hashCode'] ? str['_hashCode'] : 0;
                if (h === 0 && str.length > 0) {
                    var val = str;
                    for (var i = 0; i < str.length; i++) {
                        h = 31 * h + str.charCodeAt(i);
                    }
                    str['_hashCode'] = h;
                }
                return h;
            };
            String.isEmpty = function (str) {
                return str.length === 0;
            };
            String.join = function (delimiter) {
                var elements = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    elements[_i - 1] = arguments[_i];
                }
                return elements.join(delimiter);
            };
            return String;
        }());
        lang.String = String;
        var Thread = (function () {
            function Thread() {
            }

            Thread.sleep = function (time) {
            };
            return Thread;
        }());
        lang.Thread = Thread;
        var Double = (function () {
            function Double() {
            }

            Double.MAX_VALUE = Number.MAX_VALUE;
            Double.NaN = NaN;
            return Double;
        }());
        lang.Double = Double;
    })(lang = java.lang || (java.lang = {}));
    var util;
    (function (util) {
        var concurrent;
        (function (concurrent) {
            var atomic;
            (function (atomic) {
                var AtomicIntegerArray = (function () {
                    function AtomicIntegerArray(p) {
                        this._internal = p;
                    }

                    AtomicIntegerArray.prototype.set = function (index, newVal) {
                        this._internal[index] = newVal;
                    };
                    AtomicIntegerArray.prototype.get = function (index) {
                        return this._internal[index];
                    };
                    AtomicIntegerArray.prototype.getAndSet = function (index, newVal) {
                        var temp = this._internal[index];
                        this._internal[index] = newVal;
                        return temp;
                    };
                    AtomicIntegerArray.prototype.compareAndSet = function (index, expect, update) {
                        if (this._internal[index] == expect) {
                            this._internal[index] = update;
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    return AtomicIntegerArray;
                }());
                atomic.AtomicIntegerArray = AtomicIntegerArray;
                var AtomicReference = (function () {
                    function AtomicReference() {
                        this._internal = null;
                    }

                    AtomicReference.prototype.compareAndSet = function (expect, update) {
                        if (this._internal == expect) {
                            this._internal = update;
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    AtomicReference.prototype.get = function () {
                        return this._internal;
                    };
                    AtomicReference.prototype.set = function (newRef) {
                        this._internal = newRef;
                    };
                    AtomicReference.prototype.getAndSet = function (newVal) {
                        var temp = this._internal;
                        this._internal = newVal;
                        return temp;
                    };
                    return AtomicReference;
                }());
                atomic.AtomicReference = AtomicReference;
                var AtomicLong = (function () {
                    function AtomicLong(init) {
                        this._internal = 0;
                        this._internal = init;
                    }

                    AtomicLong.prototype.compareAndSet = function (expect, update) {
                        if (this._internal == expect) {
                            this._internal = update;
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    AtomicLong.prototype.get = function () {
                        return this._internal;
                    };
                    AtomicLong.prototype.incrementAndGet = function () {
                        this._internal++;
                        return this._internal;
                    };
                    AtomicLong.prototype.decrementAndGet = function () {
                        this._internal--;
                        return this._internal;
                    };
                    return AtomicLong;
                }());
                atomic.AtomicLong = AtomicLong;
                var AtomicBoolean = (function () {
                    function AtomicBoolean(init) {
                        this._internal = false;
                        this._internal = init;
                    }

                    AtomicBoolean.prototype.compareAndSet = function (expect, update) {
                        if (this._internal == expect) {
                            this._internal = update;
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    AtomicBoolean.prototype.get = function () {
                        return this._internal;
                    };
                    AtomicBoolean.prototype.set = function (newVal) {
                        this._internal = newVal;
                    };
                    return AtomicBoolean;
                }());
                atomic.AtomicBoolean = AtomicBoolean;
                var AtomicInteger = (function () {
                    function AtomicInteger(init) {
                        this._internal = 0;
                        this._internal = init;
                    }

                    AtomicInteger.prototype.compareAndSet = function (expect, update) {
                        if (this._internal == expect) {
                            this._internal = update;
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    AtomicInteger.prototype.get = function () {
                        return this._internal;
                    };
                    AtomicInteger.prototype.set = function (newVal) {
                        this._internal = newVal;
                    };
                    AtomicInteger.prototype.getAndSet = function (newVal) {
                        var temp = this._internal;
                        this._internal = newVal;
                        return temp;
                    };
                    AtomicInteger.prototype.incrementAndGet = function () {
                        this._internal++;
                        return this._internal;
                    };
                    AtomicInteger.prototype.decrementAndGet = function () {
                        this._internal--;
                        return this._internal;
                    };
                    AtomicInteger.prototype.getAndIncrement = function () {
                        var temp = this._internal;
                        this._internal++;
                        return temp;
                    };
                    AtomicInteger.prototype.getAndDecrement = function () {
                        var temp = this._internal;
                        this._internal--;
                        return temp;
                    };
                    return AtomicInteger;
                }());
                atomic.AtomicInteger = AtomicInteger;
            })(atomic = concurrent.atomic || (concurrent.atomic = {}));
            var locks;
            (function (locks) {
                var ReentrantLock = (function () {
                    function ReentrantLock() {
                    }

                    ReentrantLock.prototype.lock = function () {
                    };
                    ReentrantLock.prototype.unlock = function () {
                    };
                    return ReentrantLock;
                }());
                locks.ReentrantLock = ReentrantLock;
            })(locks = concurrent.locks || (concurrent.locks = {}));
        })(concurrent = util.concurrent || (util.concurrent = {}));
        var Random = (function () {
            function Random() {
            }

            Random.prototype.nextInt = function (max) {
                if (typeof max === 'undefined') {
                    max = Math.pow(2, 32);
                }
                return Math.floor(Math.random() * max);
            };
            Random.prototype.nextDouble = function () {
                return Math.random();
            };
            Random.prototype.nextBoolean = function () {
                return Math.random() >= 0.5;
            };
            return Random;
        }());
        util.Random = Random;
        var Arrays = (function () {
            function Arrays() {
            }

            Arrays.fill = function (data, begin, nbElem, param) {
                var max = begin + nbElem;
                for (var i = begin; i < max; i++) {
                    data[i] = param;
                }
            };
            Arrays.copyOf = function (original, newLength, ignore) {
                var copy = new Array(newLength);
                lang.System.arraycopy(original, 0, copy, 0, Math.min(original.length, newLength));
                return copy;
            };
            return Arrays;
        }());
        util.Arrays = Arrays;
        var Collections = (function () {
            function Collections() {
            }

            Collections.swap = function (list, i, j) {
                var l = list;
                l.set(i, l.set(j, l.get(i)));
            };
            return Collections;
        }());
        util.Collections = Collections;
        var Itr = (function () {
            function Itr(list) {
                this.cursor = 0;
                this.lastRet = -1;
                this.list = list;
            }

            Itr.prototype.hasNext = function () {
                return this.cursor != this.list.size();
            };
            Itr.prototype.next = function () {
                try {
                    var i = this.cursor;
                    var next = this.list.get(i);
                    this.lastRet = i;
                    this.cursor = i + 1;
                    return next;
                }
                catch ($ex$) {
                    if ($ex$ instanceof Error) {
                        var e = $ex$;
                        throw new Error("no such element exception");
                    }
                    else {
                        throw $ex$;
                    }
                }
            };
            return Itr;
        }());
        util.Itr = Itr;
        var HashSet = (function () {
            function HashSet() {
                this.content = {};
            }

            HashSet.prototype.add = function (val) {
                this.content[val] = val;
            };
            HashSet.prototype.clear = function () {
                this.content = {};
            };
            HashSet.prototype.contains = function (val) {
                return this.content.hasOwnProperty(val);
            };
            HashSet.prototype.containsAll = function (elems) {
                return false;
            };
            HashSet.prototype.addAll = function (vals) {
                var tempArray = vals.toArray(null);
                for (var i = 0; i < tempArray.length; i++) {
                    this.content[tempArray[i]] = tempArray[i];
                }
                return true;
            };
            HashSet.prototype.remove = function (val) {
                var b = false;
                if (this.content[val]) {
                    b = true;
                }
                delete this.content[val];
                return b;
            };
            HashSet.prototype.removeAll = function () {
                return false;
            };
            HashSet.prototype.size = function () {
                return Object.keys(this.content).length;
            };
            HashSet.prototype.isEmpty = function () {
                return this.size() == 0;
            };
            HashSet.prototype.toArray = function (a) {
                return Object.keys(this.content);
            };
            HashSet.prototype.iterator = function () {
                return new java.util.Itr(this);
            };
            HashSet.prototype.forEach = function (f) {
                for (var p in this.content) {
                    f(this.content[p]);
                }
            };
            HashSet.prototype.get = function (index) {
                return this.content[index];
            };
            return HashSet;
        }());
        util.HashSet = HashSet;
        var AbstractList = (function () {
            function AbstractList() {
                this.content = [];
            }

            AbstractList.prototype.addAll = function (index, vals) {
                var tempArray = vals.toArray(null);
                for (var i = 0; i < tempArray.length; i++) {
                    this.content.push(tempArray[i]);
                }
                return false;
            };
            AbstractList.prototype.clear = function () {
                this.content = [];
            };
            AbstractList.prototype.poll = function () {
                return this.content.shift();
            };
            AbstractList.prototype.remove = function (indexOrElem) {
                this.content.splice(indexOrElem, 1);
                return true;
            };
            AbstractList.prototype.removeAll = function () {
                this.content = [];
                return true;
            };
            AbstractList.prototype.toArray = function (a) {
                return this.content;
            };
            AbstractList.prototype.size = function () {
                return this.content.length;
            };
            AbstractList.prototype.add = function (index, elem) {
                if (typeof elem !== 'undefined') {
                    this.content.splice(index, 0, elem);
                }
                else {
                    this.content.push(index);
                }
            };
            AbstractList.prototype.get = function (index) {
                return this.content[index];
            };
            AbstractList.prototype.contains = function (val) {
                return this.content.indexOf(val) != -1;
            };
            AbstractList.prototype.containsAll = function (elems) {
                return false;
            };
            AbstractList.prototype.isEmpty = function () {
                return this.content.length == 0;
            };
            AbstractList.prototype.set = function (index, element) {
                this.content[index] = element;
                return element;
            };
            AbstractList.prototype.indexOf = function (element) {
                return this.content.indexOf(element);
            };
            AbstractList.prototype.lastIndexOf = function (element) {
                return this.content.lastIndexOf(element);
            };
            AbstractList.prototype.iterator = function () {
                return new Itr(this);
            };
            return AbstractList;
        }());
        util.AbstractList = AbstractList;
        var LinkedList = (function (_super) {
            __extends(LinkedList, _super);
            function LinkedList() {
                _super.apply(this, arguments);
            }

            return LinkedList;
        }(AbstractList));
        util.LinkedList = LinkedList;
        var ArrayList = (function (_super) {
            __extends(ArrayList, _super);
            function ArrayList() {
                _super.apply(this, arguments);
            }

            return ArrayList;
        }(AbstractList));
        util.ArrayList = ArrayList;
        var Stack = (function () {
            function Stack() {
                this.content = [];
            }

            Stack.prototype.pop = function () {
                return this.content.pop();
            };
            Stack.prototype.push = function (t) {
                this.content.push(t);
            };
            Stack.prototype.isEmpty = function () {
                return this.content.length == 0;
            };
            Stack.prototype.peek = function () {
                return this.content.slice(-1)[0];
            };
            return Stack;
        }());
        util.Stack = Stack;
        var HashMap = (function () {
            function HashMap() {
                this.content = {};
            }

            HashMap.prototype.get = function (key) {
                return this.content[key];
            };
            HashMap.prototype.put = function (key, value) {
                var previous_val = this.content[key];
                this.content[key] = value;
                return previous_val;
            };
            HashMap.prototype.containsKey = function (key) {
                return this.content.hasOwnProperty(key);
            };
            HashMap.prototype.remove = function (key) {
                var tmp = this.content[key];
                delete this.content[key];
                return tmp;
            };
            HashMap.prototype.keySet = function () {
                var result = new HashSet();
                for (var p in this.content) {
                    if (this.content.hasOwnProperty(p)) {
                        result.add(p);
                    }
                }
                return result;
            };
            HashMap.prototype.isEmpty = function () {
                return Object.keys(this.content).length == 0;
            };
            HashMap.prototype.values = function () {
                var result = new HashSet();
                for (var p in this.content) {
                    if (this.content.hasOwnProperty(p)) {
                        result.add(this.content[p]);
                    }
                }
                return result;
            };
            HashMap.prototype.clear = function () {
                this.content = {};
            };
            HashMap.prototype.size = function () {
                return Object.keys(this.content).length;
            };
            return HashMap;
        }());
        util.HashMap = HashMap;
        var ConcurrentHashMap = (function (_super) {
            __extends(ConcurrentHashMap, _super);
            function ConcurrentHashMap() {
                _super.apply(this, arguments);
            }

            return ConcurrentHashMap;
        }(HashMap));
        util.ConcurrentHashMap = ConcurrentHashMap;
    })(util = java.util || (java.util = {}));
})(java || (java = {}));
function arrayInstanceOf(arr, arg) {
    if (!(arr instanceof Array)) {
        return false;
    }
    else {
        if (arr.length == 0) {
            return true;
        }
        else {
            return (arr[0] instanceof arg);
        }
    }
}
var Long = (function () {
    function Long(low, high, unsigned) {
        /*
         long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
         Released under the Apache License, Version 2.0
         see: https://github.com/dcodeIO/long.js for details
         */
        this.high = 0;
        this.low = 0;
        this.unsigned = false;
        this.eq = this.equals;
        this.neq = this.notEquals;
        this.lt = this.lessThan;
        this.lte = this.lessThanOrEqual;
        this.gt = this.greaterThan;
        this.gte = this.greaterThanOrEqual;
        this.comp = this.compare;
        this.neg = this.negate;
        this.sub = this.subtract;
        this.mul = this.multiply;
        this.div = this.divide;
        this.mod = this.modulo;
        this.shl = this.shiftLeft;
        this.shr = this.shiftRight;
        this.shru = this.shiftRightUnsigned;
        if (!(high == undefined)) {
            this.high = high;
        }
        if (!(low == undefined)) {
            this.low = low;
        }
        if (!(unsigned == undefined)) {
            this.unsigned = unsigned;
        }
    }

    Long.isLong = function (obj) {
        return (obj && obj["__isLong__"]) === true;
    };
    Long.fromInt = function (value, unsigned) {
        var obj, cachedObj, cache;
        if (unsigned) {
            value >>>= 0;
            if (cache = (0 <= value && value < 256)) {
                cachedObj = Long.UINT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = Long.fromBits(value, (value | 0) < 0 ? -1 : 0, true);
            if (cache)
                Long.UINT_CACHE[value] = obj;
            return obj;
        }
        else {
            value |= 0;
            if (cache = (-128 <= value && value < 128)) {
                cachedObj = Long.INT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = Long.fromBits(value, value < 0 ? -1 : 0, false);
            if (cache)
                Long.INT_CACHE[value] = obj;
            return obj;
        }
    };
    Long.fromNumber = function (value, unsigned) {
        if (isNaN(value) || !isFinite(value))
            return unsigned ? Long.UZERO : Long.ZERO;
        if (unsigned) {
            if (value < 0)
                return Long.UZERO;
            if (value >= Long.TWO_PWR_64_DBL)
                return Long.MAX_UNSIGNED_VALUE;
        }
        else {
            if (value <= -Long.TWO_PWR_63_DBL)
                return Long.MIN_VALUE;
            if (value + 1 >= Long.TWO_PWR_63_DBL)
                return Long.MAX_VALUE;
        }
        if (value < 0)
            return Long.fromNumber(-value, unsigned).neg();
        return Long.fromBits((value % Long.TWO_PWR_32_DBL) | 0, (value / Long.TWO_PWR_32_DBL) | 0, unsigned);
    };
    Long.fromBits = function (lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
    };
    Long.fromString = function (str, radix, unsigned) {
        if (radix === void 0) {
            radix = 10;
        }
        if (unsigned === void 0) {
            unsigned = false;
        }
        if (str.length === 0)
            throw Error('empty string');
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
            return Long.ZERO;
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');
        var p;
        if ((p = str.indexOf('-')) > 0)
            throw Error('interior hyphen');
        else if (p === 0) {
            return Long.fromString(str.substring(1), radix, unsigned).neg();
        }
        // Do several (8) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = Long.fromNumber(Long.pow_dbl(radix, 8));
        var result = Long.ZERO;
        for (var i = 0; i < str.length; i += 8) {
            var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
                var power = Long.fromNumber(Long.pow_dbl(radix, size));
                result = result.mul(power).add(Long.fromNumber(value));
            }
            else {
                result = result.mul(radixToPower);
                result = result.add(Long.fromNumber(value));
            }
        }
        result.unsigned = unsigned;
        return result;
    };
    Long.fromValue = function (val) {
        if (val /* is compatible */ instanceof Long)
            return val;
        if (typeof val === 'number')
            return Long.fromNumber(val);
        if (typeof val === 'string')
            return Long.fromString(val);
        // Throws for non-objects, converts non-instanceof Long:
        return Long.fromBits(val.low, val.high, val.unsigned);
    };
    Long.prototype.toInt = function () {
        return this.unsigned ? this.low >>> 0 : this.low;
    };
    Long.prototype.toNumber = function () {
        if (this.unsigned)
            return ((this.high >>> 0) * Long.TWO_PWR_32_DBL) + (this.low >>> 0);
        return this.high * Long.TWO_PWR_32_DBL + (this.low >>> 0);
    };
    Long.prototype.toString = function (radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');
        if (this.isZero())
            return '0';
        if (this.isNegative()) {
            if (this.eq(Long.MIN_VALUE)) {
                // We need to change the Long value before it can be negated, so we remove
                // the bottom-most digit in this base and then recurse to do the rest.
                var radixLong = Long.fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
                return div.toString(radix) + rem1.toInt().toString(radix);
            }
            else
                return '-' + this.neg().toString(radix);
        }
        // Do several (6) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = Long.fromNumber(Long.pow_dbl(radix, 6), this.unsigned);
        var rem = this;
        var result = '';
        while (true) {
            var remDiv = rem.div(radixToPower);
            var intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0;
            var digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero())
                return digits + result;
            else {
                while (digits.length < 6)
                    digits = '0' + digits;
                result = '' + digits + result;
            }
        }
    };
    Long.prototype.getHighBits = function () {
        return this.high;
    };
    Long.prototype.getHighBitsUnsigned = function () {
        return this.high >>> 0;
    };
    Long.prototype.getLowBits = function () {
        return this.low;
    };
    Long.prototype.getLowBitsUnsigned = function () {
        return this.low >>> 0;
    };
    Long.prototype.getNumBitsAbs = function () {
        if (this.isNegative())
            return this.eq(Long.MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
            if ((val & (1 << bit)) != 0)
                break;
        return this.high != 0 ? bit + 33 : bit + 1;
    };
    Long.prototype.isZero = function () {
        return this.high === 0 && this.low === 0;
    };
    Long.prototype.isNegative = function () {
        return !this.unsigned && this.high < 0;
    };
    Long.prototype.isPositive = function () {
        return this.unsigned || this.high >= 0;
    };
    Long.prototype.isOdd = function () {
        return (this.low & 1) === 1;
    };
    Long.prototype.isEven = function () {
        return (this.low & 1) === 0;
    };
    Long.prototype.equals = function (other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
            return false;
        return this.high === other.high && this.low === other.low;
    };
    Long.prototype.notEquals = function (other) {
        return !this.eq(other);
    };
    Long.prototype.lessThan = function (other) {
        return this.comp(other) < 0;
    };
    Long.prototype.lessThanOrEqual = function (other) {
        return this.comp(other) <= 0;
    };
    Long.prototype.greaterThan = function (other) {
        return this.comp(other) > 0;
    };
    Long.prototype.greaterThanOrEqual = function (other) {
        return this.comp(other) >= 0;
    };
    Long.prototype.compare = function (other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        if (this.eq(other))
            return 0;
        var thisNeg = this.isNegative(), otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
            return -1;
        if (!thisNeg && otherNeg)
            return 1;
        // At this point the sign bits are the same
        if (!this.unsigned)
            return this.sub(other).isNegative() ? -1 : 1;
        // Both are positive if at least one is unsigned
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
    };
    Long.prototype.negate = function () {
        if (!this.unsigned && this.eq(Long.MIN_VALUE))
            return Long.MIN_VALUE;
        return this.not().add(Long.ONE);
    };
    Long.prototype.add = function (addend) {
        if (!Long.isLong(addend)) {
            addend = Long.fromValue(addend);
        }
        // Divide each number into 4 chunks of 16 bits, and then sum the chunks.
        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;
        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };
    Long.prototype.subtract = function (subtrahend) {
        if (!Long.isLong(subtrahend))
            subtrahend = Long.fromValue(subtrahend);
        return this.add(subtrahend.neg());
    };
    Long.prototype.multiply = function (multiplier) {
        if (this.isZero())
            return Long.ZERO;
        if (!Long.isLong(multiplier))
            multiplier = Long.fromValue(multiplier);
        if (multiplier.isZero())
            return Long.ZERO;
        if (this.eq(Long.MIN_VALUE))
            return multiplier.isOdd() ? Long.MIN_VALUE : Long.ZERO;
        if (multiplier.eq(Long.MIN_VALUE))
            return this.isOdd() ? Long.MIN_VALUE : Long.ZERO;
        if (this.isNegative()) {
            if (multiplier.isNegative())
                return this.neg().mul(multiplier.neg());
            else
                return this.neg().mul(multiplier).neg();
        }
        else if (multiplier.isNegative())
            return this.mul(multiplier.neg()).neg();
        // If both longs are small, use float multiplication
        if (this.lt(Long.TWO_PWR_24) && multiplier.lt(Long.TWO_PWR_24))
            return Long.fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
        // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
        // We can skip products that would overflow.
        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;
        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };
    Long.prototype.divide = function (divisor) {
        if (!Long.isLong(divisor))
            divisor = Long.fromValue(divisor);
        if (divisor.isZero())
            throw Error('division by zero');
        if (this.isZero())
            return this.unsigned ? Long.UZERO : Long.ZERO;
        var approx, rem, res;
        if (!this.unsigned) {
            // This section is only relevant for signed longs and is derived from the
            // closure library as a whole.
            if (this.eq(Long.MIN_VALUE)) {
                if (divisor.eq(Long.ONE) || divisor.eq(Long.NEG_ONE))
                    return Long.MIN_VALUE; // recall that -MIN_VALUE == MIN_VALUE
                else if (divisor.eq(Long.MIN_VALUE))
                    return Long.ONE;
                else {
                    // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                    var halfThis = this.shr(1);
                    approx = halfThis.div(divisor).shl(1);
                    if (approx.eq(Long.ZERO)) {
                        return divisor.isNegative() ? Long.ONE : Long.NEG_ONE;
                    }
                    else {
                        rem = this.sub(divisor.mul(approx));
                        res = approx.add(rem.div(divisor));
                        return res;
                    }
                }
            }
            else if (divisor.eq(Long.MIN_VALUE))
                return this.unsigned ? Long.UZERO : Long.ZERO;
            if (this.isNegative()) {
                if (divisor.isNegative())
                    return this.neg().div(divisor.neg());
                return this.neg().div(divisor).neg();
            }
            else if (divisor.isNegative())
                return this.div(divisor.neg()).neg();
            res = Long.ZERO;
        }
        else {
            // The algorithm below has not been made for unsigned longs. It's therefore
            // required to take special care of the MSB prior to running it.
            if (!divisor.unsigned)
                divisor = divisor.toUnsigned();
            if (divisor.gt(this))
                return Long.UZERO;
            if (divisor.gt(this.shru(1)))
                return Long.UONE;
            res = Long.UZERO;
        }
        // Repeat the following until the remainder is less than other:  find a
        // floating-point that approximates remainder / other *from below*, add this
        // into the result, and subtract it from the remainder.  It is critical that
        // the approximate value is less than or equal to the real value so that the
        // remainder never becomes negative.
        rem = this;
        while (rem.gte(divisor)) {
            // Approximate the result of division. This may be a little greater or
            // smaller than the actual value.
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
            // We will tweak the approximate result by changing it in the 48-th digit or
            // the smallest non-fractional digit, whichever is larger.
            var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = (log2 <= 48) ? 1 : Long.pow_dbl(2, log2 - 48),
            // Decrease the approximation until it is smaller than the remainder.  Note
            // that if it is too large, the product overflows and is negative.
                approxRes = Long.fromNumber(approx), approxRem = approxRes.mul(divisor);
            while (approxRem.isNegative() || approxRem.gt(rem)) {
                approx -= delta;
                approxRes = Long.fromNumber(approx, this.unsigned);
                approxRem = approxRes.mul(divisor);
            }
            // We know the answer can't be zero... and actually, zero would cause
            // infinite recursion since we would make no progress.
            if (approxRes.isZero())
                approxRes = Long.ONE;
            res = res.add(approxRes);
            rem = rem.sub(approxRem);
        }
        return res;
    };
    Long.prototype.modulo = function (divisor) {
        if (!Long.isLong(divisor))
            divisor = Long.fromValue(divisor);
        return this.sub(this.div(divisor).mul(divisor));
    };
    Long.prototype.not = function () {
        return Long.fromBits(~this.low, ~this.high, this.unsigned);
    };
    Long.prototype.and = function (other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return Long.fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };
    Long.prototype.or = function (other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return Long.fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };
    Long.prototype.xor = function (other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return Long.fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };
    Long.prototype.shiftLeft = function (numBits) {
        if (Long.isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return Long.fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
            return Long.fromBits(0, this.low << (numBits - 32), this.unsigned);
    };
    Long.prototype.shiftRight = function (numBits) {
        if (Long.isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return Long.fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
            return Long.fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
    };
    Long.prototype.shiftRightUnsigned = function (numBits) {
        if (Long.isLong(numBits))
            numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
            return this;
        else {
            var high = this.high;
            if (numBits < 32) {
                var low = this.low;
                return Long.fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
            }
            else if (numBits === 32)
                return Long.fromBits(high, 0, this.unsigned);
            else
                return Long.fromBits(high >>> (numBits - 32), 0, this.unsigned);
        }
    };
    Long.prototype.toSigned = function () {
        if (!this.unsigned)
            return this;
        return Long.fromBits(this.low, this.high, false);
    };
    Long.prototype.toUnsigned = function () {
        if (this.unsigned)
            return this;
        return Long.fromBits(this.low, this.high, true);
    };
    Long.INT_CACHE = {};
    Long.UINT_CACHE = {};
    Long.pow_dbl = Math.pow;
    Long.TWO_PWR_16_DBL = 1 << 16;
    Long.TWO_PWR_24_DBL = 1 << 24;
    Long.TWO_PWR_32_DBL = Long.TWO_PWR_16_DBL * Long.TWO_PWR_16_DBL;
    Long.TWO_PWR_64_DBL = Long.TWO_PWR_32_DBL * Long.TWO_PWR_32_DBL;
    Long.TWO_PWR_63_DBL = Long.TWO_PWR_64_DBL / 2;
    Long.TWO_PWR_24 = Long.fromInt(Long.TWO_PWR_24_DBL);
    Long.ZERO = Long.fromInt(0);
    Long.UZERO = Long.fromInt(0, true);
    Long.ONE = Long.fromInt(1);
    Long.UONE = Long.fromInt(1, true);
    Long.NEG_ONE = Long.fromInt(-1);
    Long.MAX_VALUE = Long.fromBits(0x7FFFFFFF, 0xFFFFFFFF, false);
    Long.MAX_UNSIGNED_VALUE = Long.fromBits(0xFFFFFFFF, 0xFFFFFFFF, true);
    Long.MIN_VALUE = Long.fromBits(0x80000000, 0, false);
    return Long;
}());
Object.defineProperty(Long.prototype, "__isLong__", {
    value: true,
    enumerable: false,
    configurable: false
});
/// <reference path="./jre.ts" />
var org;
(function (org) {
    var mwg;
    (function (mwg) {
        var Constants = (function () {
            function Constants() {
            }

            Constants.isDefined = function (param) {
                return param != undefined && param != null;
            };
            Constants.equals = function (src, other) {
                return src === other;
            };
            Constants.longArrayEquals = function (src, other) {
                if (src.length != other.length) {
                    return false;
                }
                for (var i = 0; i < src.length; i++) {
                    if (src[i] != other[i]) {
                        return false;
                    }
                }
                return true;
            };
            Constants.LONG_SIZE = 53;
            Constants.PREFIX_SIZE = 16;
            Constants.BEGINNING_OF_TIME = -0x001FFFFFFFFFFFFE;
            Constants.END_OF_TIME = 0x001FFFFFFFFFFFFE;
            Constants.NULL_LONG = 0x001FFFFFFFFFFFFF;
            Constants.KEY_PREFIX_MASK = 0x0000001FFFFFFFFF;
            Constants.CACHE_MISS_ERROR = "Cache miss error";
            Constants.QUERY_SEP = ',';
            Constants.QUERY_KV_SEP = '=';
            Constants.TASK_SEP = '.';
            Constants.TASK_PARAM_OPEN = '(';
            Constants.TASK_PARAM_CLOSE = ')';
            Constants.BUFFER_SEP = "#".charCodeAt(0);
            Constants.KEY_SEP = ";".charCodeAt(0);
            return Constants;
        }());
        mwg.Constants = Constants;
        var GraphBuilder = (function () {
            function GraphBuilder() {
                this._storage = null;
                this._scheduler = null;
                this._plugins = null;
                this._offHeap = false;
                this._gc = false;
                this._memorySize = -1;
                this._saveBatchSize = -1;
                this._readOnly = false;
            }

            GraphBuilder.prototype.withOffHeapMemory = function () {
                this._offHeap = true;
                return this;
            };
            GraphBuilder.prototype.withStorage = function (storage) {
                this._storage = storage;
                return this;
            };
            GraphBuilder.prototype.withReadOnlyStorage = function (storage) {
                this._storage = storage;
                this._readOnly = true;
                return this;
            };
            GraphBuilder.prototype.withMemorySize = function (numberOfElements) {
                this._memorySize = numberOfElements;
                return this;
            };
            GraphBuilder.prototype.saveEvery = function (numberOfElements) {
                this._saveBatchSize = numberOfElements;
                return this;
            };
            GraphBuilder.prototype.withScheduler = function (scheduler) {
                this._scheduler = scheduler;
                return this;
            };
            GraphBuilder.prototype.withPlugin = function (plugin) {
                if (this._plugins == null) {
                    this._plugins = new Array(1);
                    this._plugins[0] = plugin;
                }
                else {
                    var _plugins2 = new Array(this._plugins.length + 1);
                    java.lang.System.arraycopy(this._plugins, 0, _plugins2, 0, this._plugins.length);
                    _plugins2[this._plugins.length] = plugin;
                    this._plugins = _plugins2;
                }
                return this;
            };
            GraphBuilder.prototype.withGC = function () {
                this._gc = true;
                return this;
            };
            GraphBuilder.prototype.build = function () {
                if (org.mwg.GraphBuilder._internalBuilder == null) {
                    org.mwg.GraphBuilder._internalBuilder = new org.mwg.core.Builder();
                }
                return org.mwg.GraphBuilder._internalBuilder.newGraph(this._storage, this._readOnly, this._scheduler, this._plugins, this._gc, this._offHeap, this._memorySize, this._saveBatchSize);
            };
            GraphBuilder._internalBuilder = null;
            return GraphBuilder;
        }());
        mwg.GraphBuilder = GraphBuilder;
        var plugin;
        (function (plugin) {
            var AbstractNode = (function () {
                function AbstractNode(p_world, p_time, p_id, p_graph, currentResolution) {
                    this._world = p_world;
                    this._time = p_time;
                    this._id = p_id;
                    this._graph = p_graph;
                    this._resolver = p_graph.resolver();
                    this._previousResolveds = new java.util.concurrent.atomic.AtomicReference();
                    this._previousResolveds.set(currentResolution);
                }

                AbstractNode.prototype.init = function () {
                };
                AbstractNode.prototype.unphasedState = function () {
                    return this._resolver.resolveState(this, true);
                };
                AbstractNode.prototype.phasedState = function () {
                    return this._resolver.resolveState(this, false);
                };
                AbstractNode.prototype.newState = function (time) {
                    return this._resolver.newState(this, this._world, time);
                };
                AbstractNode.prototype.graph = function () {
                    return this._graph;
                };
                AbstractNode.prototype.world = function () {
                    return this._world;
                };
                AbstractNode.prototype.time = function () {
                    return this._time;
                };
                AbstractNode.prototype.id = function () {
                    return this._id;
                };
                AbstractNode.prototype.get = function (propertyName) {
                    var resolved = this._resolver.resolveState(this, true);
                    if (resolved != null) {
                        return resolved.get(this._resolver.stringToHash(propertyName, false));
                    }
                    return null;
                };
                AbstractNode.prototype.set = function (propertyName, propertyValue) {
                    if (typeof propertyValue === 'string' || propertyValue instanceof String) {
                        this.setProperty(propertyName, org.mwg.Type.STRING, propertyValue);
                    }
                    else if (typeof propertyValue === 'number' || propertyValue instanceof Number) {
                        if (propertyValue % 1 != 0) {
                            this.setProperty(propertyName, org.mwg.Type.DOUBLE, propertyValue);
                        }
                        else {
                            this.setProperty(propertyName, org.mwg.Type.LONG, propertyValue);
                        }
                    }
                    else if (typeof propertyValue === 'boolean' || propertyValue instanceof Boolean) {
                        this.setProperty(propertyName, org.mwg.Type.BOOL, propertyValue);
                    }
                    else if (propertyValue instanceof Int32Array) {
                        this.setProperty(propertyName, org.mwg.Type.LONG_ARRAY, propertyValue);
                    }
                    else if (propertyValue instanceof Float64Array) {
                        this.setProperty(propertyName, org.mwg.Type.DOUBLE_ARRAY, propertyValue);
                    }
                    else {
                        throw new Error("Invalid property type: " + propertyValue + ", please use a Type listed in org.mwg.Type");
                    }
                };
                AbstractNode.prototype.setProperty = function (propertyName, propertyType, propertyValue) {
                    var preciseState = this._resolver.resolveState(this, false);
                    if (preciseState != null) {
                        preciseState.set(this._resolver.stringToHash(propertyName, true), propertyType, propertyValue);
                    }
                    else {
                        throw new Error(org.mwg.Constants.CACHE_MISS_ERROR);
                    }
                };
                AbstractNode.prototype.getOrCreateMap = function (propertyName, propertyType) {
                    var preciseState = this._resolver.resolveState(this, false);
                    if (preciseState != null) {
                        return preciseState.getOrCreate(this._resolver.stringToHash(propertyName, true), propertyType);
                    }
                    else {
                        throw new Error(org.mwg.Constants.CACHE_MISS_ERROR);
                    }
                };
                AbstractNode.prototype.type = function (propertyName) {
                    var resolved = this._resolver.resolveState(this, true);
                    if (resolved != null) {
                        return resolved.getType(this._resolver.stringToHash(propertyName, false));
                    }
                    return -1;
                };
                AbstractNode.prototype.removeProperty = function (attributeName) {
                    this.setProperty(attributeName, org.mwg.Type.INT, null);
                };
                AbstractNode.prototype.rel = function (relationName, callback) {
                    if (callback == null) {
                        return;
                    }
                    var resolved = this._resolver.resolveState(this, true);
                    if (resolved != null) {
                        var flatRefs = resolved.get(this._resolver.stringToHash(relationName, false));
                        if (flatRefs == null || flatRefs.length == 0) {
                            callback(new Array(0));
                        }
                        else {
                            var result = new Array(flatRefs.length);
                            var counter = this._graph.newCounter(flatRefs.length);
                            var resultIndex = new Int32Array(1);
                            for (var i = 0; i < flatRefs.length; i++) {
                                this._resolver.lookup(this._world, this._time, flatRefs[i], function (kNode) {
                                    if (kNode != null) {
                                        result[resultIndex[0]] = kNode;
                                        resultIndex[0]++;
                                    }
                                    counter.count();
                                });
                            }
                            counter.then(function () {
                                if (resultIndex[0] == result.length) {
                                    callback(result);
                                }
                                else {
                                    var toSend = new Array(resultIndex[0]);
                                    java.lang.System.arraycopy(result, 0, toSend, 0, toSend.length);
                                    callback(toSend);
                                }
                            });
                        }
                    }
                };
                AbstractNode.prototype.add = function (relationName, relatedNode) {
                    var preciseState = this._resolver.resolveState(this, false);
                    var relationKey = this._resolver.stringToHash(relationName, true);
                    if (preciseState != null) {
                        var previous = preciseState.get(relationKey);
                        if (previous == null) {
                            previous = new Float64Array(1);
                            previous[0] = relatedNode.id();
                        }
                        else {
                            var incArray = new Float64Array(previous.length + 1);
                            java.lang.System.arraycopy(previous, 0, incArray, 0, previous.length);
                            incArray[previous.length] = relatedNode.id();
                            previous = incArray;
                        }
                        preciseState.set(relationKey, org.mwg.Type.RELATION, previous);
                    }
                    else {
                        throw new Error(org.mwg.Constants.CACHE_MISS_ERROR);
                    }
                };
                AbstractNode.prototype.remove = function (relationName, relatedNode) {
                    var preciseState = this._resolver.resolveState(this, false);
                    var relationKey = this._resolver.stringToHash(relationName, false);
                    if (preciseState != null) {
                        var previous = preciseState.get(relationKey);
                        if (previous != null) {
                            var indexToRemove = -1;
                            for (var i = 0; i < previous.length; i++) {
                                if (previous[i] == relatedNode.id()) {
                                    indexToRemove = i;
                                    break;
                                }
                            }
                            if (indexToRemove != -1) {
                                if ((previous.length - 1) == 0) {
                                    preciseState.set(relationKey, org.mwg.Type.RELATION, null);
                                }
                                else {
                                    var newArray = new Float64Array(previous.length - 1);
                                    java.lang.System.arraycopy(previous, 0, newArray, 0, indexToRemove);
                                    java.lang.System.arraycopy(previous, indexToRemove + 1, newArray, indexToRemove, previous.length - indexToRemove - 1);
                                    preciseState.set(relationKey, org.mwg.Type.RELATION, newArray);
                                }
                            }
                        }
                    }
                    else {
                        throw new Error(org.mwg.Constants.CACHE_MISS_ERROR);
                    }
                };
                AbstractNode.prototype.free = function () {
                    this._resolver.freeNode(this);
                };
                AbstractNode.prototype.timeDephasing = function () {
                    var state = this._resolver.resolveState(this, true);
                    if (state != null) {
                        return (this._time - state.time());
                    }
                    else {
                        throw new Error(org.mwg.Constants.CACHE_MISS_ERROR);
                    }
                };
                AbstractNode.prototype.rephase = function () {
                    this._resolver.resolveState(this, false);
                };
                AbstractNode.prototype.timepoints = function (beginningOfSearch, endOfSearch, callback) {
                    this._resolver.resolveTimepoints(this, beginningOfSearch, endOfSearch, callback);
                };
                AbstractNode.prototype.jump = function (targetTime, callback) {
                    this._resolver.lookup(this._world, targetTime, this._id, callback);
                };
                AbstractNode.prototype.findByQuery = function (query, callback) {
                    var currentNodeState = this._resolver.resolveState(this, false);
                    if (currentNodeState == null) {
                        throw new Error(org.mwg.Constants.CACHE_MISS_ERROR);
                    }
                    var indexName = query.indexName();
                    if (indexName == null) {
                        throw new Error("Please specify indexName in query before first use!");
                    }
                    var queryWorld = query.world();
                    if (queryWorld == org.mwg.Constants.NULL_LONG) {
                        queryWorld = this.world();
                    }
                    var queryTime = query.time();
                    if (queryTime == org.mwg.Constants.NULL_LONG) {
                        queryTime = this.time();
                    }
                    var indexMap = currentNodeState.get(this._resolver.stringToHash(indexName, false));
                    if (indexMap != null) {
                        var selfPointer = this;
                        var foundId = indexMap.get(query.hash());
                        if (foundId == null) {
                            callback(new Array(0));
                            return;
                        }
                        var resolved = new Array(foundId.length);
                        var waiter = this._graph.newCounter(foundId.length);
                        var nextResolvedTabIndex = new java.util.concurrent.atomic.AtomicInteger(0);
                        for (var i = 0; i < foundId.length; i++) {
                            selfPointer._resolver.lookup(queryWorld, queryTime, foundId[i], function (resolvedNode) {
                                if (resolvedNode != null) {
                                    resolved[nextResolvedTabIndex.getAndIncrement()] = resolvedNode;
                                }
                                waiter.count();
                            });
                        }
                        waiter.then(function () {
                            var resultSet = new Array(nextResolvedTabIndex.get());
                            var resultSetIndex = 0;
                            for (var i = 0; i < resultSet.length; i++) {
                                var resolvedNode = resolved[i];
                                var resolvedState = selfPointer._resolver.resolveState(resolvedNode, true);
                                var exact = true;
                                for (var j = 0; j < query.attributes().length; j++) {
                                    var obj = resolvedState.get(query.attributes()[j]);
                                    if (query.values()[j] == null) {
                                        if (obj != null) {
                                            exact = false;
                                            break;
                                        }
                                    }
                                    else {
                                        if (obj == null) {
                                            exact = false;
                                            break;
                                        }
                                        else {
                                            if (obj instanceof Float64Array) {
                                                if (query.values()[j] instanceof Float64Array) {
                                                    if (!org.mwg.Constants.longArrayEquals(query.values()[j], obj)) {
                                                        exact = false;
                                                        break;
                                                    }
                                                }
                                                else {
                                                    exact = false;
                                                    break;
                                                }
                                            }
                                            else {
                                                if (!org.mwg.Constants.equals(query.values()[j].toString(), obj.toString())) {
                                                    exact = false;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (exact) {
                                    resultSet[resultSetIndex] = resolvedNode;
                                    resultSetIndex++;
                                }
                            }
                            if (resultSet.length == resultSetIndex) {
                                callback(resultSet);
                            }
                            else {
                                var trimmedResultSet = new Array(resultSetIndex);
                                java.lang.System.arraycopy(resultSet, 0, trimmedResultSet, 0, resultSetIndex);
                                callback(trimmedResultSet);
                            }
                        });
                    }
                    else {
                        callback(new Array(0));
                    }
                };
                AbstractNode.prototype.find = function (indexName, query, callback) {
                    var queryObj = this._graph.newQuery();
                    queryObj.setWorld(this.world());
                    queryObj.setTime(this.time());
                    queryObj.setIndexName(indexName);
                    queryObj.parse(query);
                    this.findByQuery(queryObj, callback);
                };
                AbstractNode.prototype.findAll = function (indexName, callback) {
                    var _this = this;
                    var currentNodeState = this._resolver.resolveState(this, false);
                    if (currentNodeState == null) {
                        throw new Error(org.mwg.Constants.CACHE_MISS_ERROR);
                    }
                    var indexMap = currentNodeState.get(this._resolver.stringToHash(indexName, false));
                    if (indexMap != null) {
                        var selfPointer = this;
                        var mapSize = indexMap.size();
                        var resolved = new Array(mapSize);
                        var waiter = this._graph.newCounter(mapSize);
                        var loopInteger = new java.util.concurrent.atomic.AtomicInteger(0);
                        indexMap.each(function (hash, nodeId) {
                            selfPointer._resolver.lookup(_this.world(), _this.time(), nodeId, function (resolvedNode) {
                                resolved[loopInteger.getAndIncrement()] = resolvedNode;
                                waiter.count();
                            });
                        });
                        waiter.then(function () {
                            if (loopInteger.get() == resolved.length) {
                                callback(resolved);
                            }
                            else {
                                var toSend = new Array(loopInteger.get());
                                java.lang.System.arraycopy(resolved, 0, toSend, 0, toSend.length);
                                callback(toSend);
                            }
                        });
                    }
                    else {
                        callback(new Array(0));
                    }
                };
                AbstractNode.prototype.index = function (indexName, nodeToIndex, flatKeyAttributes, callback) {
                    var keyAttributes = flatKeyAttributes.split(org.mwg.Constants.QUERY_SEP + "");
                    var currentNodeState = this._resolver.resolveState(this, true);
                    if (currentNodeState == null) {
                        throw new Error(org.mwg.Constants.CACHE_MISS_ERROR);
                    }
                    var indexMap = currentNodeState.getOrCreate(this._resolver.stringToHash(indexName, true), org.mwg.Type.LONG_TO_LONG_ARRAY_MAP);
                    var flatQuery = this._graph.newQuery();
                    var toIndexNodeState = this._resolver.resolveState(nodeToIndex, true);
                    for (var i = 0; i < keyAttributes.length; i++) {
                        var attKey = keyAttributes[i];
                        var attValue = toIndexNodeState.getFromKey(attKey);
                        if (attValue != null) {
                            flatQuery.add(keyAttributes[i], attValue);
                        }
                        else {
                            flatQuery.add(keyAttributes[i], null);
                        }
                    }
                    indexMap.put(flatQuery.hash(), nodeToIndex.id());
                    if (org.mwg.Constants.isDefined(callback)) {
                        callback(true);
                    }
                };
                AbstractNode.prototype.unindex = function (indexName, nodeToIndex, flatKeyAttributes, callback) {
                    var keyAttributes = flatKeyAttributes.split(org.mwg.Constants.QUERY_SEP + "");
                    var currentNodeState = this._resolver.resolveState(this, true);
                    if (currentNodeState == null) {
                        throw new Error(org.mwg.Constants.CACHE_MISS_ERROR);
                    }
                    var indexMap = currentNodeState.get(this._resolver.stringToHash(indexName, false));
                    if (indexMap != null) {
                        var flatQuery = this._graph.newQuery();
                        var toIndexNodeState = this._resolver.resolveState(nodeToIndex, true);
                        for (var i = 0; i < keyAttributes.length; i++) {
                            var attKey = keyAttributes[i];
                            var attValue = toIndexNodeState.getFromKey(attKey);
                            if (attValue != null) {
                                flatQuery.add(attKey, attValue.toString());
                            }
                            else {
                                flatQuery.add(attKey, null);
                            }
                        }
                        indexMap.remove(flatQuery.hash(), nodeToIndex.id());
                    }
                    if (org.mwg.Constants.isDefined(callback)) {
                        callback(true);
                    }
                };
                AbstractNode.prototype.isNaN = function (toTest) {
                    return isNaN(toTest);
                };
                AbstractNode.prototype.toString = function () {
                    var _this = this;
                    var builder = new java.lang.StringBuilder();
                    builder.append("{\"world\":");
                    builder.append(this.world());
                    builder.append(",\"time\":");
                    builder.append(this.time());
                    builder.append(",\"id\":");
                    builder.append(this.id());
                    var state = this._resolver.resolveState(this, true);
                    if (state != null) {
                        state.each(function (attributeKey, elemType, elem) {
                            if (elem != null) {
                                switch (elemType) {
                                    case org.mwg.Type.BOOL:
                                        builder.append(",\"");
                                        builder.append(_this._resolver.hashToString(attributeKey));
                                        builder.append("\":");
                                        if (elem) {
                                            builder.append("0");
                                        }
                                        else {
                                            builder.append("1");
                                        }
                                        break;
                                    case org.mwg.Type.STRING:
                                        builder.append(",\"");
                                        builder.append(_this._resolver.hashToString(attributeKey));
                                        builder.append("\":");
                                        builder.append("\"");
                                        builder.append(elem);
                                        builder.append("\"");
                                        break;
                                    case org.mwg.Type.LONG:
                                        builder.append(",\"");
                                        builder.append(_this._resolver.hashToString(attributeKey));
                                        builder.append("\":");
                                        builder.append(elem);
                                        break;
                                    case org.mwg.Type.INT:
                                        builder.append(",\"");
                                        builder.append(_this._resolver.hashToString(attributeKey));
                                        builder.append("\":");
                                        builder.append(elem);
                                        break;
                                    case org.mwg.Type.DOUBLE:
                                        if (!_this.isNaN(elem)) {
                                            builder.append(",\"");
                                            builder.append(_this._resolver.hashToString(attributeKey));
                                            builder.append("\":");
                                            builder.append(elem);
                                        }
                                        break;
                                    case org.mwg.Type.DOUBLE_ARRAY:
                                        builder.append(",\"");
                                        builder.append(_this._resolver.hashToString(attributeKey));
                                        builder.append("\":");
                                        builder.append("[");
                                        var castedArr = elem;
                                        for (var j = 0; j < castedArr.length; j++) {
                                            if (j != 0) {
                                                builder.append(",");
                                            }
                                            builder.append(castedArr[j]);
                                        }
                                        builder.append("]");
                                        break;
                                    case org.mwg.Type.RELATION:
                                    case org.mwg.Type.LONG_ARRAY:
                                        builder.append(",\"");
                                        builder.append(_this._resolver.hashToString(attributeKey));
                                        builder.append("\":");
                                        builder.append("[");
                                        var castedArr2 = elem;
                                        for (var j = 0; j < castedArr2.length; j++) {
                                            if (j != 0) {
                                                builder.append(",");
                                            }
                                            builder.append(castedArr2[j]);
                                        }
                                        builder.append("]");
                                        break;
                                    case org.mwg.Type.INT_ARRAY:
                                        builder.append(",\"");
                                        builder.append(_this._resolver.hashToString(attributeKey));
                                        builder.append("\":");
                                        builder.append("[");
                                        var castedArr3 = elem;
                                        for (var j = 0; j < castedArr3.length; j++) {
                                            if (j != 0) {
                                                builder.append(",");
                                            }
                                            builder.append(castedArr3[j]);
                                        }
                                        builder.append("]");
                                        break;
                                }
                            }
                        });
                        builder.append("}");
                    }
                    return builder.toString();
                };
                return AbstractNode;
            }());
            plugin.AbstractNode = AbstractNode;
            var AbstractPlugin = (function () {
                function AbstractPlugin() {
                    this._nodeTypes = new java.util.HashMap();
                    this._taskActions = new java.util.HashMap();
                }

                AbstractPlugin.prototype.declareNodeType = function (name, factory) {
                    this._nodeTypes.put(name, factory);
                    return this;
                };
                AbstractPlugin.prototype.declareTaskAction = function (name, factory) {
                    this._taskActions.put(name, factory);
                    return this;
                };
                AbstractPlugin.prototype.nodeTypes = function () {
                    return this._nodeTypes.keySet().toArray(new Array(this._nodeTypes.size()));
                };
                AbstractPlugin.prototype.nodeType = function (nodeTypeName) {
                    return this._nodeTypes.get(nodeTypeName);
                };
                AbstractPlugin.prototype.taskActionTypes = function () {
                    return this._taskActions.keySet().toArray(new Array(this._taskActions.size()));
                };
                AbstractPlugin.prototype.taskActionType = function (taskTypeName) {
                    return this._taskActions.get(taskTypeName);
                };
                return AbstractPlugin;
            }());
            plugin.AbstractPlugin = AbstractPlugin;
            var Base64 = (function () {
                function Base64() {
                }

                Base64.encodeLongToBuffer = function (l, buffer) {
                    var empty = true;
                    var tmp = l;
                    if (l < 0) {
                        tmp = -tmp;
                    }
                    for (var i = 47; i >= 5; i -= 6) {
                        if (!(empty && ((tmp / Base64.powTwo[i]) & 0x3F) == 0)) {
                            empty = false;
                            buffer.write(Base64.dictionary[(tmp / Base64.powTwo[i]) & 0x3F]);
                        }
                    }
                    buffer.write(Base64.dictionary[(tmp & 0x1F) * 2 + (l < 0 ? 1 : 0)]);
                };
                Base64.encodeIntToBuffer = function (l, buffer) {
                    var empty = true;
                    var tmp = l;
                    if (l < 0) {
                        tmp = -tmp;
                    }
                    for (var i = 29; i >= 5; i -= 6) {
                        if (!(empty && ((tmp / Base64.powTwo[i]) & 0x3F) == 0)) {
                            empty = false;
                            buffer.write(Base64.dictionary[(tmp / Base64.powTwo[i]) & 0x3F]);
                        }
                    }
                    buffer.write(Base64.dictionary[(tmp & 0x1F) * 2 + (l < 0 ? 1 : 0)]);
                };
                Base64.decodeToLong = function (s) {
                    return Base64.decodeToLongWithBounds(s, 0, s.length());
                };
                Base64.decodeToLongWithBounds = function (s, offsetBegin, offsetEnd) {
                    var result = Long.ZERO;
                    result = result.add(Base64.longIndexes[Base64.dictionary.indexOf(s.read((offsetEnd - 1))) & 0xFF].shiftRightUnsigned(1));
                    for (var i = 1; i < (offsetEnd - offsetBegin); i++) {
                        result = result.add(Base64.longIndexes[Base64.dictionary.indexOf(s.read((offsetEnd - 1) - i)) & 0xFF].shiftLeft((6 * i) - 1));
                    }
                    if (((Base64.dictionary.indexOf(s.read((offsetEnd - 1))) & 0xFF) & 0x1) != 0) {
                        result = result.mul(-1);
                    }
                    return result.toNumber();
                };
                Base64.decodeToInt = function (s) {
                    return Base64.decodeToIntWithBounds(s, 0, s.length());
                };
                Base64.decodeToIntWithBounds = function (s, offsetBegin, offsetEnd) {
                    var result = 0;
                    result += (Base64.dictionary.indexOf(s.read((offsetEnd - 1))) & 0xFF) / 2;
                    for (var i = 1; i < (offsetEnd - offsetBegin); i++) {
                        result += (Base64.dictionary.indexOf(s.read((offsetEnd - 1) - i)) & 0xFF) * Base64.powTwo[(6 * i) - 1];
                    }
                    if (((Base64.dictionary.indexOf(s.read((offsetEnd - 1))) & 0xFF) & 0x1) != 0) {
                        result = -result;
                    }
                    return result;
                };
                Base64.encodeDoubleToBuffer = function (d, buffer) {
                    var result = [];
                    var floatArr = new Float64Array(1);
                    var bytes = new Uint8Array(floatArr.buffer);
                    floatArr[0] = d;
                    var exponent = (((bytes[7] & 0x7f) * 16) | bytes[6] / 16) - 0x3ff;
                    var signAndExp = (((bytes[7] / 128) & 0x1) * 2048) + (exponent + 1023);
                    //encode sign + exp
                    result.push(Base64.dictionary[(signAndExp / 64) & 0x3F]);
                    result.push(Base64.dictionary[signAndExp & 0x3F]);
                    result.push(Base64.dictionary[bytes[6] & 0x0F]);
                    result.push(Base64.dictionary[(bytes[5] / 4) & 0x3F]);
                    result.push(Base64.dictionary[((bytes[5] & 0x3) * 16) | (bytes[4] / 16)]);
                    result.push(Base64.dictionary[((bytes[4] & 0x0F) * 4) | (bytes[3] / 64)]);
                    result.push(Base64.dictionary[(bytes[3] & 0x3F)]);
                    result.push(Base64.dictionary[(bytes[2] / 4) & 0x3F]);
                    result.push(Base64.dictionary[((bytes[2] & 0x3) * 16) | (bytes[1] / 16)]);
                    result.push(Base64.dictionary[((bytes[1] & 0x0F) * 4) | (bytes[0] / 64)]);
                    result.push(Base64.dictionary[(bytes[0] & 0x3F)]);
                    var indexMax = result.length;
                    while (indexMax >= 3 && result[i] == 65) {
                        indexMax--;
                    }
                    for (var i = 0; i < indexMax; i++) {
                        buffer.write(result[i]);
                    }
                };
                Base64.decodeToDouble = function (s) {
                    return Base64.decodeToDoubleWithBounds(s, 0, s.length());
                };
                Base64.decodeToDoubleWithBounds = function (s, offsetBegin, offsetEnd) {
                    var signAndExp = ((Base64.dictionary.indexOf(s.read(offsetBegin)) & 0xFF) * 64) + (Base64.dictionary.indexOf(s.read(offsetBegin + 1)) & 0xFF);
                    var sign = ((signAndExp & 0x800) != 0 ? -1 : 1);
                    var exp = signAndExp & 0x7FF;
                    //Mantisse
                    var mantissaBits = 0;
                    for (var i = 2; i < (offsetEnd - offsetBegin); i++) {
                        mantissaBits += (Base64.dictionary.indexOf(s.read(offsetBegin + i)) & 0xFF) * Base64.powTwo[48 - (6 * (i - 2))];
                    }
                    return (exp != 0) ? sign * Math.pow(2, exp - 1023) * (1 + (mantissaBits / Math.pow(2, 52))) : sign * Math.pow(2, -1022) * (0 + (mantissaBits / Math.pow(2, 52)));
                };
                Base64.encodeBoolArrayToBuffer = function (boolArr, buffer) {
                    var tmpVal = 0;
                    for (var i = 0; i < boolArr.length; i++) {
                        tmpVal = tmpVal | ((boolArr[i] ? 1 : 0) * Base64.powTwo[i % 6]);
                        if (i % 6 == 5 || i == boolArr.length - 1) {
                            buffer.write(Base64.dictionary[tmpVal]);
                            tmpVal = 0;
                        }
                    }
                };
                Base64.decodeBoolArray = function (s, arraySize) {
                    return Base64.decodeToBoolArrayWithBounds(s, 0, s.length(), arraySize);
                };
                Base64.decodeToBoolArrayWithBounds = function (s, offsetBegin, offsetEnd, arraySize) {
                    var resultTmp = [];
                    for (var i = 0; i < (offsetEnd - offsetBegin); i++) {
                        var bitarray = Base64.dictionary.indexOf(s.read(offsetBegin + i)) & 0xFF;
                        for (var bit_i = 0; bit_i < 6; bit_i++) {
                            if ((6 * i) + bit_i < arraySize) {
                                resultTmp[(6 * i) + bit_i] = (bitarray & (1 * Base64.powTwo[bit_i])) != 0;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    return resultTmp;
                };
                Base64.encodeStringToBuffer = function (s, buffer) {
                    var sLength = s.length;
                    var currentSourceChar;
                    var currentEncodedChar = 0;
                    var freeBitsInCurrentChar = 6;
                    for (var charIdx = 0; charIdx < sLength; charIdx++) {
                        currentSourceChar = s.charCodeAt(charIdx);
                        if (freeBitsInCurrentChar == 6) {
                            buffer.write(Base64.dictionary[(currentSourceChar / 4) & 0x3F]);
                            currentEncodedChar = (currentSourceChar & 0x3) * 16;
                            freeBitsInCurrentChar = 4;
                        }
                        else if (freeBitsInCurrentChar == 4) {
                            buffer.write(Base64.dictionary[(currentEncodedChar | ((currentSourceChar / 16) & 0xF)) & 0x3F]);
                            currentEncodedChar = (currentSourceChar & 0xF) * 4;
                            freeBitsInCurrentChar = 2;
                        }
                        else if (freeBitsInCurrentChar == 2) {
                            buffer.write(Base64.dictionary[(currentEncodedChar | ((currentSourceChar / 64) & 0x3)) & 0x3F]);
                            buffer.write(Base64.dictionary[currentSourceChar & 0x3F]);
                            freeBitsInCurrentChar = 6;
                        }
                    }
                    if (freeBitsInCurrentChar != 6) {
                        buffer.write(Base64.dictionary[currentEncodedChar]);
                    }
                };
                Base64.decodeString = function (s) {
                    return Base64.decodeToStringWithBounds(s, 0, s.length());
                };
                Base64.decodeToStringWithBounds = function (s, offsetBegin, offsetEnd) {
                    var result = "";
                    var currentSourceChar;
                    var currentDecodedChar = 0;
                    var freeBitsInCurrentChar = 8;
                    for (var charIdx = offsetBegin; charIdx < offsetEnd; charIdx++) {
                        currentSourceChar = Base64.dictionary.indexOf(s.read(charIdx));
                        if (freeBitsInCurrentChar == 8) {
                            currentDecodedChar = currentSourceChar * 4;
                            freeBitsInCurrentChar = 2;
                        }
                        else if (freeBitsInCurrentChar == 2) {
                            result += String.fromCharCode(currentDecodedChar | (currentSourceChar / 16));
                            currentDecodedChar = (currentSourceChar & 0xF) * 16;
                            freeBitsInCurrentChar = 4;
                        }
                        else if (freeBitsInCurrentChar == 4) {
                            result += String.fromCharCode(currentDecodedChar | (currentSourceChar / 4));
                            currentDecodedChar = (currentSourceChar & 0x3) * 64;
                            freeBitsInCurrentChar = 6;
                        }
                        else if (freeBitsInCurrentChar == 6) {
                            result += String.fromCharCode(currentDecodedChar | currentSourceChar);
                            freeBitsInCurrentChar = 8;
                        }
                    }
                    return result;
                };
                Base64.dictionary = ['A'.charCodeAt(0), 'B'.charCodeAt(0), 'C'.charCodeAt(0), 'D'.charCodeAt(0), 'E'.charCodeAt(0), 'F'.charCodeAt(0), 'G'.charCodeAt(0), 'H'.charCodeAt(0), 'I'.charCodeAt(0), 'J'.charCodeAt(0), 'K'.charCodeAt(0), 'L'.charCodeAt(0), 'M'.charCodeAt(0), 'N'.charCodeAt(0), 'O'.charCodeAt(0), 'P'.charCodeAt(0), 'Q'.charCodeAt(0), 'R'.charCodeAt(0), 'S'.charCodeAt(0), 'T'.charCodeAt(0), 'U'.charCodeAt(0), 'V'.charCodeAt(0), 'W'.charCodeAt(0), 'X'.charCodeAt(0), 'Y'.charCodeAt(0), 'Z'.charCodeAt(0), 'a'.charCodeAt(0), 'b'.charCodeAt(0), 'c'.charCodeAt(0), 'd'.charCodeAt(0), 'e'.charCodeAt(0), 'f'.charCodeAt(0), 'g'.charCodeAt(0), 'h'.charCodeAt(0), 'i'.charCodeAt(0), 'j'.charCodeAt(0), 'k'.charCodeAt(0), 'l'.charCodeAt(0), 'm'.charCodeAt(0), 'n'.charCodeAt(0), 'o'.charCodeAt(0), 'p'.charCodeAt(0), 'q'.charCodeAt(0), 'r'.charCodeAt(0), 's'.charCodeAt(0), 't'.charCodeAt(0), 'u'.charCodeAt(0), 'v'.charCodeAt(0), 'w'.charCodeAt(0), 'x'.charCodeAt(0), 'y'.charCodeAt(0), 'z'.charCodeAt(0), '0'.charCodeAt(0), '1'.charCodeAt(0), '2'.charCodeAt(0), '3'.charCodeAt(0), '4'.charCodeAt(0), '5'.charCodeAt(0), '6'.charCodeAt(0), '7'.charCodeAt(0), '8'.charCodeAt(0), '9'.charCodeAt(0), '+'.charCodeAt(0), '/'.charCodeAt(0)];
                Base64.powTwo = {
                    0: 1,
                    1: 2,
                    2: 4,
                    3: 8,
                    4: 16,
                    5: 32,
                    6: 64,
                    7: 128,
                    8: 256,
                    9: 512,
                    10: 1024,
                    11: 2048,
                    12: 4096,
                    13: 8192,
                    14: 16384,
                    15: 32768,
                    16: 65536,
                    17: 131072,
                    18: 262144,
                    19: 524288,
                    20: 1048576,
                    21: 2097152,
                    22: 4194304,
                    23: 8388608,
                    24: 16777216,
                    25: 33554432,
                    26: 67108864,
                    27: 134217728,
                    28: 268435456,
                    29: 536870912,
                    30: 1073741824,
                    31: 2147483648,
                    32: 4294967296,
                    33: 8589934592,
                    34: 17179869184,
                    35: 34359738368,
                    36: 68719476736,
                    37: 137438953472,
                    38: 274877906944,
                    39: 549755813888,
                    40: 1099511627776,
                    41: 2199023255552,
                    42: 4398046511104,
                    43: 8796093022208,
                    44: 17592186044416,
                    45: 35184372088832,
                    46: 70368744177664,
                    47: 140737488355328,
                    48: 281474976710656,
                    49: 562949953421312,
                    50: 1125899906842624,
                    51: 2251799813685248,
                    52: 4503599627370496,
                    53: 9007199254740992
                };
                Base64.longIndexes = [Long.fromNumber(0), Long.fromNumber(1), Long.fromNumber(2), Long.fromNumber(3), Long.fromNumber(4), Long.fromNumber(5), Long.fromNumber(6), Long.fromNumber(7), Long.fromNumber(8), Long.fromNumber(9), Long.fromNumber(10), Long.fromNumber(11), Long.fromNumber(12), Long.fromNumber(13), Long.fromNumber(14), Long.fromNumber(15), Long.fromNumber(16), Long.fromNumber(17), Long.fromNumber(18), Long.fromNumber(19), Long.fromNumber(20), Long.fromNumber(21), Long.fromNumber(22), Long.fromNumber(23), Long.fromNumber(24), Long.fromNumber(25), Long.fromNumber(26), Long.fromNumber(27), Long.fromNumber(28), Long.fromNumber(29), Long.fromNumber(30), Long.fromNumber(31), Long.fromNumber(32), Long.fromNumber(33), Long.fromNumber(34), Long.fromNumber(35), Long.fromNumber(36), Long.fromNumber(37), Long.fromNumber(38), Long.fromNumber(39), Long.fromNumber(40), Long.fromNumber(41), Long.fromNumber(42), Long.fromNumber(43), Long.fromNumber(44), Long.fromNumber(45), Long.fromNumber(46), Long.fromNumber(47), Long.fromNumber(48), Long.fromNumber(49), Long.fromNumber(50), Long.fromNumber(51), Long.fromNumber(52), Long.fromNumber(53), Long.fromNumber(54), Long.fromNumber(55), Long.fromNumber(56), Long.fromNumber(57), Long.fromNumber(58), Long.fromNumber(59), Long.fromNumber(60), Long.fromNumber(61), Long.fromNumber(62), Long.fromNumber(63)];
                return Base64;
            }());
            plugin.Base64 = Base64;
            var ChunkType = (function () {
                function ChunkType() {
                }

                ChunkType.STATE_CHUNK = 0;
                ChunkType.TIME_TREE_CHUNK = 1;
                ChunkType.WORLD_ORDER_CHUNK = 2;
                ChunkType.GEN_CHUNK = 3;
                return ChunkType;
            }());
            plugin.ChunkType = ChunkType;
            var Enforcer = (function () {
                function Enforcer() {
                    this.checkers = new java.util.HashMap();
                }

                Enforcer.prototype.asBool = function (propertyName) {
                    return this.declare(propertyName, {
                        check: function (inputType, input) {
                            if (input != null && inputType != org.mwg.Type.BOOL) {
                                throw new Error("Property " + propertyName + " should be Boolean value, currently " + input);
                            }
                        }
                    });
                };
                Enforcer.prototype.asString = function (propertyName) {
                    return this.declare(propertyName, {
                        check: function (inputType, input) {
                            if (input != null && inputType != org.mwg.Type.STRING) {
                                throw new Error("Property " + propertyName + " should be String value, currently " + input);
                            }
                        }
                    });
                };
                Enforcer.prototype.asLong = function (propertyName) {
                    return this.declare(propertyName, {
                        check: function (inputType, input) {
                            if (input != null && inputType != org.mwg.Type.LONG && inputType != org.mwg.Type.INT) {
                                throw new Error("Property " + propertyName + " should be long value, currently " + input);
                            }
                        }
                    });
                };
                Enforcer.prototype.asLongWithin = function (propertyName, min, max) {
                    return this.declare(propertyName, {
                        check: function (inputType, input) {
                            var inputDouble = input;
                            if (input != null && ((inputType != org.mwg.Type.LONG && inputType != org.mwg.Type.INT) || inputDouble < min || inputDouble > max)) {
                                throw new Error("Property " + propertyName + " should be long value [" + min + "," + max + "], currently " + input);
                            }
                        }
                    });
                };
                Enforcer.prototype.asDouble = function (propertyName) {
                    return this.declare(propertyName, {
                        check: function (inputType, input) {
                            if (input != null && (inputType != org.mwg.Type.DOUBLE && inputType != org.mwg.Type.INT && inputType != org.mwg.Type.LONG)) {
                                throw new Error("Property " + propertyName + " should be double value, currently " + input);
                            }
                        }
                    });
                };
                Enforcer.prototype.asDoubleWithin = function (propertyName, min, max) {
                    return this.declare(propertyName, {
                        check: function (inputType, input) {
                            var inputDouble = input;
                            if (input != null && ((inputType != org.mwg.Type.DOUBLE && inputType != org.mwg.Type.INT && inputType != org.mwg.Type.LONG) || inputDouble < min || inputDouble > max)) {
                                throw new Error("Property " + propertyName + " should be double value [" + min + "," + max + "], currently " + input);
                            }
                        }
                    });
                };
                Enforcer.prototype.asInt = function (propertyName) {
                    return this.declare(propertyName, {
                        check: function (inputType, input) {
                            if (input != null && inputType != org.mwg.Type.INT && inputType != org.mwg.Type.LONG) {
                                throw new Error("Property " + propertyName + " should be integer value, currently " + input);
                            }
                        }
                    });
                };
                Enforcer.prototype.asIntWithin = function (propertyName, min, max) {
                    return this.declare(propertyName, {
                        check: function (inputType, input) {
                            var inputInt = input;
                            if (input != null && ((inputType != org.mwg.Type.INT && inputType != org.mwg.Type.LONG) || inputInt < min || inputInt > max)) {
                                throw new Error("Property " + propertyName + " should be integer value [" + min + "," + max + "], currently " + input);
                            }
                        }
                    });
                };
                Enforcer.prototype.asDoubleArray = function (propertyName) {
                    return this.declare(propertyName, {
                        check: function (inputType, input) {
                            if (input != null && inputType != org.mwg.Type.DOUBLE_ARRAY) {
                                throw new Error("Property " + propertyName + " should be doubleArray value, currently " + input);
                            }
                        }
                    });
                };
                Enforcer.prototype.asPositiveInt = function (propertyName) {
                    return this.declare(propertyName, {
                        check: function (inputType, input) {
                            var inputInt = input;
                            if (input != null && inputType != org.mwg.Type.INT && inputInt <= 0) {
                                throw new Error("Property " + propertyName + " should be a positive integer, currently " + input);
                            }
                        }
                    });
                };
                Enforcer.prototype.asPositiveDouble = function (propertyName) {
                    return this.declare(propertyName, {
                        check: function (inputType, input) {
                            var inputDouble = input;
                            if (input != null && ((inputType != org.mwg.Type.DOUBLE && inputType != org.mwg.Type.INT && inputType != org.mwg.Type.LONG) || inputDouble <= 0)) {
                                throw new Error("Property " + propertyName + " should be a positive double, currently " + input);
                            }
                        }
                    });
                };
                Enforcer.prototype.asPositiveLong = function (propertyName) {
                    return this.declare(propertyName, {
                        check: function (inputType, input) {
                            var inputLong = input;
                            if (input != null && ((inputType != org.mwg.Type.LONG && inputType != org.mwg.Type.INT) || inputLong <= 0)) {
                                throw new Error("Property " + propertyName + " should be a positive long, currently " + input);
                            }
                        }
                    });
                };
                Enforcer.prototype.declare = function (propertyName, checker) {
                    this.checkers.put(propertyName, checker);
                    return this;
                };
                Enforcer.prototype.check = function (propertyName, propertyType, propertyValue) {
                    var checker = this.checkers.get(propertyName);
                    if (checker != null) {
                        checker.check(propertyType, propertyValue);
                    }
                };
                return Enforcer;
            }());
            plugin.Enforcer = Enforcer;
        })(plugin = mwg.plugin || (mwg.plugin = {}));
        var Type = (function () {
            function Type() {
            }

            Type.typeName = function (p_type) {
                switch (p_type) {
                    case org.mwg.Type.BOOL:
                        return "boolean";
                    case org.mwg.Type.STRING:
                        return "string";
                    case org.mwg.Type.LONG:
                        return "long";
                    case org.mwg.Type.INT:
                        return "int";
                    case org.mwg.Type.DOUBLE:
                        return "double";
                    case org.mwg.Type.DOUBLE_ARRAY:
                        return "double[]";
                    case org.mwg.Type.LONG_ARRAY:
                        return "long[]";
                    case org.mwg.Type.INT_ARRAY:
                        return "int[]";
                    case org.mwg.Type.LONG_TO_LONG_MAP:
                        return "map(long->long)";
                    case org.mwg.Type.LONG_TO_LONG_ARRAY_MAP:
                        return "map(long->long[])";
                    case org.mwg.Type.STRING_TO_LONG_MAP:
                        return "map(string->long)";
                    case org.mwg.Type.RELATION:
                        return "relation";
                    default:
                        return "unknown";
                }
            };
            Type.BOOL = 1;
            Type.STRING = 2;
            Type.LONG = 3;
            Type.INT = 4;
            Type.DOUBLE = 5;
            Type.DOUBLE_ARRAY = 6;
            Type.LONG_ARRAY = 7;
            Type.INT_ARRAY = 8;
            Type.LONG_TO_LONG_MAP = 9;
            Type.LONG_TO_LONG_ARRAY_MAP = 10;
            Type.STRING_TO_LONG_MAP = 11;
            Type.RELATION = 12;
            return Type;
        }());
        mwg.Type = Type;
    })(mwg = org.mwg || (org.mwg = {}));
})(org || (org = {}));
/// <reference path="./api.ts" />
/// <reference path="./jre.ts" />
var org;
(function (org) {
    var mwg;
    (function (mwg) {
        var core;
        (function (core) {
            var BlackHoleStorage = (function () {
                function BlackHoleStorage() {
                    this.prefix = 0;
                }

                BlackHoleStorage.prototype.get = function (keys, callback) {
                    var result = this._graph.newBuffer();
                    var it = keys.iterator();
                    var isFirst = true;
                    while (it.hasNext()) {
                        var tempView = it.next();
                        if (isFirst) {
                            isFirst = false;
                        }
                        else {
                            result.write(org.mwg.core.CoreConstants.BUFFER_SEP);
                        }
                    }
                    callback(result);
                };
                BlackHoleStorage.prototype.put = function (stream, callback) {
                    if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                        callback(true);
                    }
                };
                BlackHoleStorage.prototype.remove = function (keys, callback) {
                    callback(true);
                };
                BlackHoleStorage.prototype.connect = function (graph, callback) {
                    this._graph = graph;
                    callback(true);
                };
                BlackHoleStorage.prototype.lock = function (callback) {
                    var buffer = this._graph.newBuffer();
                    org.mwg.plugin.Base64.encodeIntToBuffer(this.prefix, buffer);
                    this.prefix++;
                    callback(buffer);
                };
                BlackHoleStorage.prototype.unlock = function (previousLock, callback) {
                    callback(true);
                };
                BlackHoleStorage.prototype.disconnect = function (callback) {
                    this._graph = null;
                    callback(true);
                };
                return BlackHoleStorage;
            }());
            core.BlackHoleStorage = BlackHoleStorage;
            var Builder = (function () {
                function Builder() {
                }

                Builder.prototype.newGraph = function (p_storage, p_readOnly, p_scheduler, p_plugins, p_usingGC, p_usingOffHeapMemory, p_memorySize, p_autoSaveSize) {
                    var storage = p_storage;
                    if (storage == null) {
                        storage = new org.mwg.core.BlackHoleStorage();
                    }
                    if (p_readOnly) {
                        storage = new org.mwg.core.utility.ReadOnlyStorage(storage);
                    }
                    var scheduler = p_scheduler;
                    if (scheduler == null) {
                        scheduler = new org.mwg.core.scheduler.NoopScheduler();
                    }
                    var nodeTracker;
                    if (p_usingGC) {
                        throw new Error("Not implemented yet !!!");
                    }
                    else {
                        nodeTracker = new org.mwg.core.NoopNodeTracker();
                    }
                    var space;
                    var memorySize = p_memorySize;
                    if (memorySize == -1) {
                        memorySize = 100000;
                    }
                    var autoSaveSize = p_autoSaveSize;
                    if (p_autoSaveSize == -1) {
                        autoSaveSize = memorySize;
                    }
                    space = this.createSpace(p_usingOffHeapMemory, memorySize, autoSaveSize);
                    var graph = new org.mwg.core.CoreGraph(storage, space, scheduler, new org.mwg.core.MWGResolver(storage, space, nodeTracker, scheduler), p_plugins);
                    if (p_usingOffHeapMemory) {
                        graph.offHeapBuffer = true;
                    }
                    return graph;
                };
                Builder.prototype.createSpace = function (usingOffHeapMemory, memorySize, autoSaveSize) {
                    return new org.mwg.core.chunk.heap.HeapChunkSpace(memorySize, autoSaveSize);
                };
                return Builder;
            }());
            core.Builder = Builder;
            var chunk;
            (function (chunk_1) {
                var heap;
                (function (heap) {
                    var ArrayLongLongArrayMap = (function () {
                        function ArrayLongLongArrayMap(p_listener, initialCapacity, p_origin) {
                            this._listener = p_listener;
                            if (p_origin == null) {
                                var newstate = new org.mwg.core.chunk.heap.ArrayLongLongArrayMap.InternalState(initialCapacity, new Float64Array(initialCapacity), new Float64Array(initialCapacity), new Int32Array(initialCapacity), new Int32Array(initialCapacity), 0, 0);
                                for (var i = 0; i < initialCapacity; i++) {
                                    if (i == initialCapacity - 1) {
                                        newstate._elementNext[i] = -1;
                                    }
                                    else {
                                        newstate._elementNext[i] = i + 1;
                                    }
                                    newstate._elementHash[i] = -1;
                                    newstate._elementV[i] = org.mwg.core.CoreConstants.NULL_LONG;
                                }
                                this.state = newstate;
                                this.aligned = true;
                            }
                            else {
                                this.state = p_origin.state;
                                this.aligned = false;
                            }
                        }

                        ArrayLongLongArrayMap.prototype.get = function (key) {
                            var internalState = this.state;
                            if (internalState._stateSize == 0) {
                                return new Float64Array(0);
                            }
                            var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(key, internalState._stateSize);
                            var result = new Float64Array(0);
                            var capacity = 0;
                            var resultIndex = 0;
                            var m = internalState._elementHash[hashIndex];
                            while (m >= 0) {
                                if (key == internalState._elementK[m]) {
                                    if (resultIndex == capacity) {
                                        var newCapacity;
                                        if (capacity == 0) {
                                            newCapacity = 1;
                                        }
                                        else {
                                            newCapacity = capacity * 2;
                                        }
                                        var tempResult = new Float64Array(newCapacity);
                                        java.lang.System.arraycopy(result, 0, tempResult, 0, result.length);
                                        result = tempResult;
                                        capacity = newCapacity;
                                    }
                                    result[resultIndex] = internalState._elementV[m];
                                    resultIndex++;
                                }
                                m = internalState._elementNext[m];
                            }
                            if (resultIndex == capacity) {
                                return result;
                            }
                            else {
                                var shrinkedResult = new Float64Array(resultIndex);
                                java.lang.System.arraycopy(result, 0, shrinkedResult, 0, resultIndex);
                                return shrinkedResult;
                            }
                        };
                        ArrayLongLongArrayMap.prototype.each = function (callback) {
                            var internalState = this.state;
                            for (var i = 0; i < internalState._stateSize; i++) {
                                if (internalState._elementV[i] != org.mwg.core.CoreConstants.NULL_LONG) {
                                    callback(internalState._elementK[i], internalState._elementV[i]);
                                }
                            }
                        };
                        ArrayLongLongArrayMap.prototype.size = function () {
                            return this.state._elementCount;
                        };
                        ArrayLongLongArrayMap.prototype.put = function (key, value) {
                            this.internal_modify_map(key, value, true);
                        };
                        ArrayLongLongArrayMap.prototype.internal_modify_map = function (key, value, toInsert) {
                            var internalState = this.state;
                            if (toInsert) {
                                if ((internalState._elementCount + 1) > internalState._threshold) {
                                    var newCapacity = internalState._stateSize * 2;
                                    var newElementK = new Float64Array(newCapacity);
                                    var newElementV = new Float64Array(newCapacity);
                                    java.lang.System.arraycopy(internalState._elementK, 0, newElementK, 0, internalState._stateSize);
                                    java.lang.System.arraycopy(internalState._elementV, 0, newElementV, 0, internalState._stateSize);
                                    for (var i = internalState._stateSize; i < newCapacity; i++) {
                                        newElementV[i] = org.mwg.core.CoreConstants.NULL_LONG;
                                    }
                                    var newElementNext = new Int32Array(newCapacity);
                                    var newElementHash = new Int32Array(newCapacity);
                                    for (var i = 0; i < newCapacity; i++) {
                                        newElementNext[i] = -1;
                                        newElementHash[i] = -1;
                                    }
                                    var previousEmptySlot = -1;
                                    var emptySlotHEad = -1;
                                    for (var i = 0; i < newElementV.length; i++) {
                                        if (newElementV[i] != org.mwg.core.CoreConstants.NULL_LONG) {
                                            var newHashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(newElementK[i], newCapacity);
                                            var currentHashedIndex = newElementHash[newHashIndex];
                                            if (currentHashedIndex != -1) {
                                                newElementNext[i] = currentHashedIndex;
                                            }
                                            else {
                                                newElementNext[i] = -2;
                                            }
                                            newElementHash[newHashIndex] = i;
                                        }
                                        else {
                                            if (previousEmptySlot == -1) {
                                                emptySlotHEad = i;
                                            }
                                            else {
                                                newElementNext[previousEmptySlot] = i;
                                            }
                                            previousEmptySlot = i;
                                        }
                                    }
                                    internalState = new org.mwg.core.chunk.heap.ArrayLongLongArrayMap.InternalState(newCapacity, newElementK, newElementV, newElementNext, newElementHash, internalState._elementCount, emptySlotHEad);
                                    this.state = internalState;
                                }
                                var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(key, internalState._stateSize);
                                var m = internalState._elementHash[hashIndex];
                                while (m >= 0) {
                                    if (key == internalState._elementK[m] && value == internalState._elementV[m]) {
                                        return;
                                    }
                                    m = internalState._elementNext[m];
                                }
                                if (!this.aligned) {
                                    this.state = this.state.clone();
                                    internalState = this.state;
                                    this.aligned = true;
                                }
                                var newIndex = internalState._nextAvailableSlot;
                                if (newIndex == -1) {
                                    throw new Error("Full Map should not happen, implementation error");
                                }
                                internalState._nextAvailableSlot = internalState._elementNext[newIndex];
                                internalState._elementNext[newIndex] = -1;
                                internalState._elementK[newIndex] = key;
                                internalState._elementV[newIndex] = value;
                                var currentHashedElemIndex = internalState._elementHash[hashIndex];
                                if (currentHashedElemIndex != -1) {
                                    internalState._elementNext[newIndex] = currentHashedElemIndex;
                                }
                                else {
                                    internalState._elementNext[newIndex] = -2;
                                }
                                internalState._elementHash[hashIndex] = newIndex;
                                internalState._elementCount = internalState._elementCount + 1;
                                this._listener.declareDirty(null);
                            }
                            else {
                                var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(key, internalState._stateSize);
                                var m = internalState._elementHash[hashIndex];
                                var previousM = -1;
                                while (m >= 0) {
                                    if (key == internalState._elementK[m] && value == internalState._elementV[m]) {
                                        internalState._elementCount--;
                                        internalState._elementK[m] = org.mwg.core.CoreConstants.NULL_LONG;
                                        internalState._elementV[m] = org.mwg.core.CoreConstants.NULL_LONG;
                                        if (previousM == -1) {
                                            internalState._elementHash[hashIndex] = internalState._elementNext[m];
                                        }
                                        else {
                                            internalState._elementNext[previousM] = internalState._elementNext[m];
                                        }
                                        internalState._elementNext[m] = internalState._nextAvailableSlot;
                                        internalState._nextAvailableSlot = m;
                                        return;
                                    }
                                    previousM = m;
                                    m = internalState._elementNext[m];
                                }
                            }
                        };
                        ArrayLongLongArrayMap.prototype.remove = function (key, value) {
                            this.internal_modify_map(key, value, false);
                        };
                        return ArrayLongLongArrayMap;
                    }());
                    heap.ArrayLongLongArrayMap = ArrayLongLongArrayMap;
                    var ArrayLongLongArrayMap;
                    (function (ArrayLongLongArrayMap) {
                        var InternalState = (function () {
                            function InternalState(p_stateSize, p_elementK, p_elementV, p_elementNext, p_elementHash, p_elementCount, p_nextAvailableSlot) {
                                this._stateSize = p_stateSize;
                                this._elementK = p_elementK;
                                this._elementV = p_elementV;
                                this._elementNext = p_elementNext;
                                this._elementHash = p_elementHash;
                                this._elementCount = p_elementCount;
                                this._nextAvailableSlot = p_nextAvailableSlot;
                                this._threshold = (p_stateSize * org.mwg.core.CoreConstants.MAP_LOAD_FACTOR);
                            }

                            InternalState.prototype.clone = function () {
                                var cloned_elementK = new Float64Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementK, 0, cloned_elementK, 0, this._stateSize);
                                var cloned_elementV = new Float64Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementV, 0, cloned_elementV, 0, this._stateSize);
                                var cloned_elementNext = new Int32Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementNext, 0, cloned_elementNext, 0, this._stateSize);
                                var cloned_elementHash = new Int32Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementHash, 0, cloned_elementHash, 0, this._stateSize);
                                return new org.mwg.core.chunk.heap.ArrayLongLongArrayMap.InternalState(this._stateSize, cloned_elementK, cloned_elementV, cloned_elementNext, cloned_elementHash, this._elementCount, this._nextAvailableSlot);
                            };
                            return InternalState;
                        }());
                        ArrayLongLongArrayMap.InternalState = InternalState;
                    })(ArrayLongLongArrayMap = heap.ArrayLongLongArrayMap || (heap.ArrayLongLongArrayMap = {}));
                    var ArrayLongLongMap = (function () {
                        function ArrayLongLongMap(p_listener, initialCapacity, p_origin) {
                            this._listener = p_listener;
                            if (p_origin == null) {
                                var newstate = new org.mwg.core.chunk.heap.ArrayLongLongMap.InternalState(initialCapacity, new Float64Array(initialCapacity), new Float64Array(initialCapacity), new Int32Array(initialCapacity), new Int32Array(initialCapacity), 0);
                                for (var i = 0; i < initialCapacity; i++) {
                                    newstate._elementNext[i] = -1;
                                    newstate._elementHash[i] = -1;
                                }
                                this.state = newstate;
                                this.aligned = true;
                            }
                            else {
                                this.state = p_origin.state;
                                this.aligned = false;
                            }
                        }

                        ArrayLongLongMap.prototype.get = function (key) {
                            var internalState = this.state;
                            if (internalState._stateSize == 0) {
                                return org.mwg.core.CoreConstants.NULL_LONG;
                            }
                            var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(key, internalState._stateSize);
                            var m = internalState._elementHash[hashIndex];
                            while (m >= 0) {
                                if (key == internalState._elementK[m]) {
                                    return internalState._elementV[m];
                                }
                                else {
                                    m = internalState._elementNext[m];
                                }
                            }
                            return org.mwg.core.CoreConstants.NULL_LONG;
                        };
                        ArrayLongLongMap.prototype.each = function (callback) {
                            var internalState = this.state;
                            for (var i = 0; i < internalState._elementCount; i++) {
                                if (internalState._elementNext[i] != -1) {
                                    callback(internalState._elementK[i], internalState._elementV[i]);
                                }
                            }
                        };
                        ArrayLongLongMap.prototype.size = function () {
                            return this.state._elementCount;
                        };
                        ArrayLongLongMap.prototype.put = function (key, value) {
                            this.internal_modify_map(key, value);
                        };
                        ArrayLongLongMap.prototype.internal_modify_map = function (key, value) {
                            if (!this.aligned) {
                                this.state = this.state.clone();
                                this.aligned = true;
                            }
                            var entry = -1;
                            var hashIndex = -1;
                            var internalState = this.state;
                            if (internalState._stateSize > 0) {
                                hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(key, internalState._stateSize);
                                var m = internalState._elementHash[hashIndex];
                                while (m >= 0) {
                                    if (key == internalState._elementK[m]) {
                                        entry = m;
                                        break;
                                    }
                                    m = internalState._elementNext[m];
                                }
                            }
                            if (entry == -1) {
                                if ((internalState._elementCount + 1) > internalState._threshold) {
                                    var newCapacity = internalState._stateSize * 2;
                                    var newElementK = new Float64Array(newCapacity);
                                    var newElementV = new Float64Array(newCapacity);
                                    java.lang.System.arraycopy(internalState._elementK, 0, newElementK, 0, internalState._stateSize);
                                    java.lang.System.arraycopy(internalState._elementV, 0, newElementV, 0, internalState._stateSize);
                                    var newElementNext = new Int32Array(newCapacity);
                                    var newElementHash = new Int32Array(newCapacity);
                                    for (var i = 0; i < newCapacity; i++) {
                                        newElementNext[i] = -1;
                                        newElementHash[i] = -1;
                                    }
                                    for (var i = 0; i < internalState._elementCount; i++) {
                                        if (internalState._elementNext[i] != -1) {
                                            var newHashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(internalState._elementK[i], newCapacity);
                                            var currentHashedIndex = newElementHash[newHashIndex];
                                            if (currentHashedIndex != -1) {
                                                newElementNext[i] = currentHashedIndex;
                                            }
                                            else {
                                                newElementNext[i] = -2;
                                            }
                                            newElementHash[newHashIndex] = i;
                                        }
                                    }
                                    internalState = new org.mwg.core.chunk.heap.ArrayLongLongMap.InternalState(newCapacity, newElementK, newElementV, newElementNext, newElementHash, internalState._elementCount);
                                    this.state = internalState;
                                    hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(key, internalState._stateSize);
                                }
                                var newIndex = internalState._elementCount;
                                internalState._elementK[newIndex] = key;
                                if (value == org.mwg.core.CoreConstants.NULL_LONG) {
                                    internalState._elementV[newIndex] = internalState._elementCount;
                                }
                                else {
                                    internalState._elementV[newIndex] = value;
                                }
                                var currentHashedElemIndex = internalState._elementHash[hashIndex];
                                if (currentHashedElemIndex != -1) {
                                    internalState._elementNext[newIndex] = currentHashedElemIndex;
                                }
                                else {
                                    internalState._elementNext[newIndex] = -2;
                                }
                                internalState._elementHash[hashIndex] = newIndex;
                                internalState._elementCount = internalState._elementCount + 1;
                                if (this._listener != null) {
                                    this._listener.declareDirty(null);
                                }
                            }
                            else {
                                if (internalState._elementV[entry] != value && value != org.mwg.core.CoreConstants.NULL_LONG) {
                                    internalState._elementV[entry] = value;
                                    this._listener.declareDirty(null);
                                }
                            }
                        };
                        ArrayLongLongMap.prototype.remove = function (key) {
                            throw new Error("Not implemented yet!!!");
                        };
                        return ArrayLongLongMap;
                    }());
                    heap.ArrayLongLongMap = ArrayLongLongMap;
                    var ArrayLongLongMap;
                    (function (ArrayLongLongMap) {
                        var InternalState = (function () {
                            function InternalState(p_stateSize, p_elementK, p_elementV, p_elementNext, p_elementHash, p_elementCount) {
                                this._stateSize = p_stateSize;
                                this._elementK = p_elementK;
                                this._elementV = p_elementV;
                                this._elementNext = p_elementNext;
                                this._elementHash = p_elementHash;
                                this._elementCount = p_elementCount;
                                this._threshold = (p_stateSize * org.mwg.core.CoreConstants.MAP_LOAD_FACTOR);
                            }

                            InternalState.prototype.clone = function () {
                                var cloned_elementK = new Float64Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementK, 0, cloned_elementK, 0, this._stateSize);
                                var cloned_elementV = new Float64Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementV, 0, cloned_elementV, 0, this._stateSize);
                                var cloned_elementNext = new Int32Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementNext, 0, cloned_elementNext, 0, this._stateSize);
                                var cloned_elementHash = new Int32Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementHash, 0, cloned_elementHash, 0, this._stateSize);
                                return new org.mwg.core.chunk.heap.ArrayLongLongMap.InternalState(this._stateSize, cloned_elementK, cloned_elementV, cloned_elementNext, cloned_elementHash, this._elementCount);
                            };
                            return InternalState;
                        }());
                        ArrayLongLongMap.InternalState = InternalState;
                    })(ArrayLongLongMap = heap.ArrayLongLongMap || (heap.ArrayLongLongMap = {}));
                    var ArrayStringLongMap = (function () {
                        function ArrayStringLongMap(p_listener, initialCapacity, p_origin) {
                            this._listener = p_listener;
                            if (p_origin == null) {
                                var newstate = new org.mwg.core.chunk.heap.ArrayStringLongMap.InternalState(initialCapacity, new Array(initialCapacity), new Float64Array(initialCapacity), new Float64Array(initialCapacity), new Int32Array(initialCapacity), new Int32Array(initialCapacity), 0);
                                for (var i = 0; i < initialCapacity; i++) {
                                    newstate._elementNext[i] = -1;
                                    newstate._elementHash[i] = -1;
                                }
                                this.state = newstate;
                                this.aligned = true;
                            }
                            else {
                                this.state = p_origin.state;
                                this.aligned = false;
                            }
                        }

                        ArrayStringLongMap.prototype.getValue = function (key) {
                            var internalState = this.state;
                            if (internalState._stateSize == 0) {
                                return org.mwg.core.CoreConstants.NULL_LONG;
                            }
                            var keyHash = org.mwg.core.utility.DataHasher.hash(key);
                            var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(keyHash, internalState._stateSize);
                            var m = internalState._elementHash[hashIndex];
                            while (m >= 0) {
                                if (keyHash == internalState._elementKH[m]) {
                                    return internalState._elementV[m];
                                }
                                else {
                                    m = internalState._elementNext[m];
                                }
                            }
                            return org.mwg.core.CoreConstants.NULL_LONG;
                        };
                        ArrayStringLongMap.prototype.getByHash = function (keyHash) {
                            var internalState = this.state;
                            var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(keyHash, internalState._stateSize);
                            var m = internalState._elementHash[hashIndex];
                            while (m >= 0) {
                                if (internalState._elementKH[m] == keyHash) {
                                    return internalState._elementK[m];
                                }
                                else {
                                    m = internalState._elementNext[m];
                                }
                            }
                            return null;
                        };
                        ArrayStringLongMap.prototype.containsHash = function (keyHash) {
                            var internalState = this.state;
                            var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(keyHash, internalState._stateSize);
                            var m = internalState._elementHash[hashIndex];
                            while (m >= 0) {
                                if (internalState._elementKH[m] == keyHash) {
                                    return true;
                                }
                                else {
                                    m = internalState._elementNext[m];
                                }
                            }
                            return false;
                        };
                        ArrayStringLongMap.prototype.each = function (callback) {
                            var internalState = this.state;
                            for (var i = 0; i < internalState._elementCount; i++) {
                                if (internalState._elementK[i] != null) {
                                    callback(internalState._elementK[i], internalState._elementV[i]);
                                }
                            }
                        };
                        ArrayStringLongMap.prototype.size = function () {
                            return this.state._elementCount;
                        };
                        ArrayStringLongMap.prototype.remove = function (key) {
                            throw new Error("Not implemented yet!!!");
                        };
                        ArrayStringLongMap.prototype.put = function (key, value) {
                            this.internal_modify_map(key, value);
                        };
                        ArrayStringLongMap.prototype.internal_modify_map = function (key, value) {
                            if (!this.aligned) {
                                this.state = this.state.clone();
                                this.aligned = true;
                            }
                            var keyHash = org.mwg.core.utility.DataHasher.hash(key);
                            var entry = -1;
                            var hashIndex = -1;
                            var internalState = this.state;
                            if (internalState._stateSize > 0) {
                                hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(keyHash, internalState._stateSize);
                                var m = internalState._elementHash[hashIndex];
                                while (m >= 0) {
                                    if (internalState._elementKH[m] == keyHash) {
                                        entry = m;
                                        break;
                                    }
                                    m = internalState._elementNext[m];
                                }
                            }
                            if (entry == -1) {
                                if ((internalState._elementCount + 1) > internalState._threshold) {
                                    var newCapacity = internalState._stateSize * 2;
                                    var newElementK = new Array(newCapacity);
                                    var newElementKH = new Float64Array(newCapacity);
                                    var newElementV = new Float64Array(newCapacity);
                                    java.lang.System.arraycopy(internalState._elementK, 0, newElementK, 0, internalState._stateSize);
                                    java.lang.System.arraycopy(internalState._elementKH, 0, newElementKH, 0, internalState._stateSize);
                                    java.lang.System.arraycopy(internalState._elementV, 0, newElementV, 0, internalState._stateSize);
                                    var newElementNext = new Int32Array(newCapacity);
                                    var newElementHash = new Int32Array(newCapacity);
                                    for (var i = 0; i < newCapacity; i++) {
                                        newElementNext[i] = -1;
                                        newElementHash[i] = -1;
                                    }
                                    for (var i = 0; i < internalState._elementCount; i++) {
                                        if (internalState._elementK[i] != null) {
                                            var newHashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(internalState._elementKH[i], newCapacity);
                                            var currentHashedIndex = newElementHash[newHashIndex];
                                            if (currentHashedIndex != -1) {
                                                newElementNext[i] = currentHashedIndex;
                                            }
                                            newElementHash[newHashIndex] = i;
                                        }
                                    }
                                    internalState = new org.mwg.core.chunk.heap.ArrayStringLongMap.InternalState(newCapacity, newElementK, newElementKH, newElementV, newElementNext, newElementHash, internalState._elementCount);
                                    this.state = internalState;
                                    hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(keyHash, internalState._stateSize);
                                }
                                var newIndex = internalState._elementCount;
                                internalState._elementK[newIndex] = key;
                                internalState._elementKH[newIndex] = keyHash;
                                internalState._elementV[newIndex] = value;
                                var currentHashedElemIndex = internalState._elementHash[hashIndex];
                                if (currentHashedElemIndex != -1) {
                                    internalState._elementNext[newIndex] = currentHashedElemIndex;
                                }
                                internalState._elementHash[hashIndex] = newIndex;
                                internalState._elementCount = internalState._elementCount + 1;
                                this._listener.declareDirty(null);
                            }
                            else {
                                if (internalState._elementV[entry] != value && value != org.mwg.core.CoreConstants.NULL_LONG) {
                                    internalState._elementV[entry] = value;
                                    this._listener.declareDirty(null);
                                }
                            }
                        };
                        return ArrayStringLongMap;
                    }());
                    heap.ArrayStringLongMap = ArrayStringLongMap;
                    var ArrayStringLongMap;
                    (function (ArrayStringLongMap) {
                        var InternalState = (function () {
                            function InternalState(p_stateSize, p_elementK, p_elementKH, p_elementV, p_elementNext, p_elementHash, p_elementCount) {
                                this._stateSize = p_stateSize;
                                this._elementK = p_elementK;
                                this._elementKH = p_elementKH;
                                this._elementV = p_elementV;
                                this._elementNext = p_elementNext;
                                this._elementHash = p_elementHash;
                                this._elementCount = p_elementCount;
                                this._threshold = (p_stateSize * org.mwg.core.CoreConstants.MAP_LOAD_FACTOR);
                            }

                            InternalState.prototype.clone = function () {
                                var cloned_elementK = new Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementK, 0, cloned_elementK, 0, this._stateSize);
                                var cloned_elementKH = new Float64Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementKH, 0, cloned_elementKH, 0, this._stateSize);
                                var cloned_elementV = new Float64Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementV, 0, cloned_elementV, 0, this._stateSize);
                                var cloned_elementNext = new Int32Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementNext, 0, cloned_elementNext, 0, this._stateSize);
                                var cloned_elementHash = new Int32Array(this._stateSize);
                                java.lang.System.arraycopy(this._elementHash, 0, cloned_elementHash, 0, this._stateSize);
                                return new org.mwg.core.chunk.heap.ArrayStringLongMap.InternalState(this._stateSize, cloned_elementK, cloned_elementKH, cloned_elementV, cloned_elementNext, cloned_elementHash, this._elementCount);
                            };
                            return InternalState;
                        }());
                        ArrayStringLongMap.InternalState = InternalState;
                    })(ArrayStringLongMap = heap.ArrayStringLongMap || (heap.ArrayStringLongMap = {}));
                    var FixedStack = (function () {
                        function FixedStack(capacity) {
                            this.lock = new java.util.concurrent.locks.ReentrantLock();
                            this._capacity = capacity;
                            this._next = new Int32Array(capacity);
                            this._prev = new Int32Array(capacity);
                            this._first = -1;
                            this._last = -1;
                            for (var i = 0; i < capacity; i++) {
                                this._next[i] = -1;
                                this._prev[i] = -1;
                            }
                            for (var i = 0; i < capacity; i++) {
                                var l = this._last;
                                this._prev[i] = l;
                                this._last = i;
                                if (this._first == -1) {
                                    this._first = i;
                                }
                                else {
                                    this._next[l] = i;
                                }
                            }
                            this._count = capacity;
                        }

                        FixedStack.prototype.enqueue = function (index) {
                            var lock = this.lock;
                            lock.lock();
                            try {
                                if (this._count >= this._capacity) {
                                    return false;
                                }
                                var castedIndex = index;
                                if (this._first == castedIndex || this._last == castedIndex) {
                                    return false;
                                }
                                if (this._prev[castedIndex] != -1 || this._next[castedIndex] != -1) {
                                    return false;
                                }
                                var l = this._last;
                                this._prev[castedIndex] = l;
                                this._last = castedIndex;
                                if (this._first == -1) {
                                    this._first = castedIndex;
                                }
                                else {
                                    this._next[l] = castedIndex;
                                }
                                ++this._count;
                                return true;
                            }
                            finally {
                                lock.unlock();
                            }
                        };
                        FixedStack.prototype.dequeueTail = function () {
                            var lock = this.lock;
                            lock.lock();
                            try {
                                var f = this._first;
                                if (f == -1) {
                                    return -1;
                                }
                                var n = this._next[f];
                                this._next[f] = -1;
                                this._prev[f] = -1;
                                this._first = n;
                                if (n == -1) {
                                    this._last = -1;
                                }
                                else {
                                    this._prev[n] = -1;
                                }
                                --this._count;
                                return f;
                            }
                            finally {
                                lock.unlock();
                            }
                        };
                        FixedStack.prototype.dequeue = function (index) {
                            var lock = this.lock;
                            lock.lock();
                            try {
                                var castedIndex = index;
                                var p = this._prev[castedIndex];
                                var n = this._next[castedIndex];
                                if (p == -1 && n == -1) {
                                    return false;
                                }
                                if (p == -1) {
                                    var f = this._first;
                                    if (f == -1) {
                                        return false;
                                    }
                                    var n2 = this._next[f];
                                    this._next[f] = -1;
                                    this._prev[f] = -1;
                                    this._first = n2;
                                    if (n2 == -1) {
                                        this._last = -1;
                                    }
                                    else {
                                        this._prev[n2] = -1;
                                    }
                                    --this._count;
                                }
                                else {
                                    if (n == -1) {
                                        var l = this._last;
                                        if (l == -1) {
                                            return false;
                                        }
                                        var p2 = this._prev[l];
                                        this._prev[l] = -1;
                                        this._next[l] = -1;
                                        this._last = p2;
                                        if (p2 == -1) {
                                            this._first = -1;
                                        }
                                        else {
                                            this._next[p2] = -1;
                                        }
                                        --this._count;
                                    }
                                    else {
                                        this._next[p] = n;
                                        this._prev[n] = p;
                                        this._prev[castedIndex] = -1;
                                        this._next[castedIndex] = -1;
                                        --this._count;
                                    }
                                }
                                return true;
                            }
                            finally {
                                lock.unlock();
                            }
                        };
                        FixedStack.prototype.free = function () {
                        };
                        FixedStack.prototype.size = function () {
                            return this._count;
                        };
                        return FixedStack;
                    }());
                    heap.FixedStack = FixedStack;
                    var HeapChunkSpace = (function () {
                        function HeapChunkSpace(initialCapacity, saveBatchSize) {
                            if (saveBatchSize > initialCapacity) {
                                throw new Error("Save Batch Size can't be bigger than cache size");
                            }
                            this._maxEntries = initialCapacity;
                            this._saveBatchSize = saveBatchSize;
                            this._lru = new org.mwg.core.chunk.heap.FixedStack(initialCapacity);
                            this._dirtyState = new java.util.concurrent.atomic.AtomicReference();
                            this._dirtyState.set(new org.mwg.core.chunk.heap.HeapChunkSpace.InternalDirtyStateList(saveBatchSize, this));
                            this._elementNext = new Int32Array(initialCapacity);
                            this._elementHashLock = new java.util.concurrent.atomic.AtomicIntegerArray(new Int32Array(initialCapacity));
                            this._elementHash = new Int32Array(initialCapacity);
                            this._values = new Array(initialCapacity);
                            this._elementCount = new java.util.concurrent.atomic.AtomicInteger(0);
                            for (var i = 0; i < initialCapacity; i++) {
                                this._elementNext[i] = -1;
                                this._elementHash[i] = -1;
                                this._elementHashLock.set(i, -1);
                            }
                        }

                        HeapChunkSpace.prototype.setGraph = function (p_graph) {
                            this._graph = p_graph;
                        };
                        HeapChunkSpace.prototype.graph = function () {
                            return this._graph;
                        };
                        HeapChunkSpace.prototype.getValues = function () {
                            return this._values;
                        };
                        HeapChunkSpace.prototype.getAndMark = function (type, world, time, id) {
                            var index = org.mwg.core.utility.PrimitiveHelper.tripleHash(type, world, time, id, this._maxEntries);
                            var m = this._elementHash[index];
                            while (m != -1) {
                                var foundChunk = this._values[m];
                                if (foundChunk != null && type == foundChunk.chunkType() && world == foundChunk.world() && time == foundChunk.time() && id == foundChunk.id()) {
                                    if (foundChunk.mark() == 1) {
                                        if (this._lru.dequeue(m)) {
                                            return foundChunk;
                                        }
                                        else {
                                            if (foundChunk.marks() > 1) {
                                            }
                                            else {
                                                return null;
                                            }
                                        }
                                    }
                                    else {
                                        return foundChunk;
                                    }
                                }
                                else {
                                    m = this._elementNext[m];
                                }
                            }
                            return null;
                        };
                        HeapChunkSpace.prototype.getOrLoadAndMark = function (type, world, time, id, callback) {
                            var _this = this;
                            var fromMemory = this.getAndMark(type, world, time, id);
                            if (fromMemory != null) {
                                callback(fromMemory);
                            }
                            else {
                                var keys = this.graph().newBuffer();
                                org.mwg.core.utility.BufferBuilder.keyToBuffer(keys, type, world, time, id);
                                this.graph().storage().get(keys, function (result) {
                                    if (result != null) {
                                        var loadedChunk_0 = _this.create(type, world, time, id, result, null);
                                        result.free();
                                        if (loadedChunk_0 == null) {
                                            callback(null);
                                        }
                                        else {
                                            var loadedChunk = _this.putAndMark(loadedChunk_0);
                                            if (loadedChunk != loadedChunk_0) {
                                                _this.freeChunk(loadedChunk_0);
                                            }
                                            callback(loadedChunk);
                                        }
                                    }
                                    else {
                                        keys.free();
                                        callback(null);
                                    }
                                });
                            }
                        };
                        HeapChunkSpace.prototype.unmark = function (type, world, time, id) {
                            var index = org.mwg.core.utility.PrimitiveHelper.tripleHash(type, world, time, id, this._maxEntries);
                            var m = this._elementHash[index];
                            while (m != -1) {
                                var foundChunk = this._values[m];
                                if (foundChunk != null && type == foundChunk.chunkType() && world == foundChunk.world() && time == foundChunk.time() && id == foundChunk.id()) {
                                    if (foundChunk.unmark() == 0) {
                                        this._lru.enqueue(m);
                                    }
                                    return;
                                }
                                else {
                                    m = this._elementNext[m];
                                }
                            }
                        };
                        HeapChunkSpace.prototype.unmarkChunk = function (chunk) {
                            var heapChunk = chunk;
                            if (heapChunk.unmark() == 0) {
                                var nodeWorld = chunk.world();
                                var nodeTime = chunk.time();
                                var nodeId = chunk.id();
                                var nodeType = chunk.chunkType();
                                var index = org.mwg.core.utility.PrimitiveHelper.tripleHash(chunk.chunkType(), nodeWorld, nodeTime, nodeId, this._maxEntries);
                                var m = this._elementHash[index];
                                while (m != -1) {
                                    var foundChunk = this._values[m];
                                    if (foundChunk != null && nodeType == foundChunk.chunkType() && nodeWorld == foundChunk.world() && nodeTime == foundChunk.time() && nodeId == foundChunk.id()) {
                                        this._lru.enqueue(m);
                                        return;
                                    }
                                    else {
                                        m = this._elementNext[m];
                                    }
                                }
                            }
                        };
                        HeapChunkSpace.prototype.freeChunk = function (chunk) {
                        };
                        HeapChunkSpace.prototype.create = function (p_type, p_world, p_time, p_id, p_initialPayload, origin) {
                            switch (p_type) {
                                case org.mwg.plugin.ChunkType.STATE_CHUNK:
                                    return new org.mwg.core.chunk.heap.HeapStateChunk(p_world, p_time, p_id, this, p_initialPayload, origin);
                                case org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK:
                                    return new org.mwg.core.chunk.heap.HeapWorldOrderChunk(p_world, p_time, p_id, this, p_initialPayload);
                                case org.mwg.plugin.ChunkType.TIME_TREE_CHUNK:
                                    return new org.mwg.core.chunk.heap.HeapTimeTreeChunk(p_world, p_time, p_id, this, p_initialPayload);
                                case org.mwg.plugin.ChunkType.GEN_CHUNK:
                                    return new org.mwg.core.chunk.heap.HeapGenChunk(p_world, p_time, p_id, this, p_initialPayload);
                            }
                            return null;
                        };
                        HeapChunkSpace.prototype.putAndMark = function (p_elem) {
                            var heapChunk = p_elem;
                            if (heapChunk.mark() != 1) {
                                throw new Error("Warning, trying to put an unsafe object " + p_elem);
                            }
                            var entry = -1;
                            var hashIndex = org.mwg.core.utility.PrimitiveHelper.tripleHash(p_elem.chunkType(), p_elem.world(), p_elem.time(), p_elem.id(), this._maxEntries);
                            var m = this._elementHash[hashIndex];
                            while (m >= 0) {
                                var currentM = this._values[m];
                                if (currentM != null && p_elem.chunkType() == currentM.chunkType() && p_elem.world() == currentM.world() && p_elem.time() == currentM.time() && p_elem.id() == currentM.id()) {
                                    entry = m;
                                    break;
                                }
                                m = this._elementNext[m];
                            }
                            if (entry == -1) {
                                var currentVictimIndex = this._lru.dequeueTail();
                                if (currentVictimIndex == -1) {
                                    java.lang.System.gc();
                                    try {
                                        java.lang.Thread.sleep(100);
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof Error) {
                                            var e = $ex$;
                                            console.error(e);
                                        }
                                        else {
                                            throw $ex$;
                                        }
                                    }
                                    currentVictimIndex = this._lru.dequeueTail();
                                    if (currentVictimIndex == -1) {
                                        throw new Error("mwDB crashed, cache is full, please avoid to much retention of nodes or augment cache capacity!");
                                    }
                                }
                                if (this._values[currentVictimIndex] != null) {
                                    var victim = this._values[currentVictimIndex];
                                    var victimWorld = victim.world();
                                    var victimTime = victim.time();
                                    var victimObj = victim.id();
                                    var victimType = victim.chunkType();
                                    var indexVictim = org.mwg.core.utility.PrimitiveHelper.tripleHash(victimType, victimWorld, victimTime, victimObj, this._maxEntries);
                                    while (!this._elementHashLock.compareAndSet(indexVictim, -1, 1)) {
                                    }
                                    m = this._elementHash[indexVictim];
                                    var last = -1;
                                    while (m >= 0) {
                                        var currentM = this._values[m];
                                        if (currentM != null && victimType == currentM.chunkType() && victimWorld == currentM.world() && victimTime == currentM.time() && victimObj == currentM.id()) {
                                            break;
                                        }
                                        last = m;
                                        m = this._elementNext[m];
                                    }
                                    if (last == -1) {
                                        var previousNext = this._elementNext[m];
                                        this._elementHash[indexVictim] = previousNext;
                                    }
                                    else {
                                        if (m == -1) {
                                            this._elementNext[last] = -1;
                                        }
                                        else {
                                            this._elementNext[last] = this._elementNext[m];
                                        }
                                    }
                                    this._elementNext[m] = -1;
                                    this._values[currentVictimIndex] = null;
                                    this._elementHashLock.set(indexVictim, -1);
                                    this._elementCount.decrementAndGet();
                                }
                                this._values[currentVictimIndex] = p_elem;
                                while (!this._elementHashLock.compareAndSet(hashIndex, -1, 1)) {
                                }
                                this._elementNext[currentVictimIndex] = this._elementHash[hashIndex];
                                this._elementHash[hashIndex] = currentVictimIndex;
                                this._elementHashLock.set(hashIndex, -1);
                                this._elementCount.incrementAndGet();
                                return p_elem;
                            }
                            else {
                                return this._values[entry];
                            }
                        };
                        HeapChunkSpace.prototype.detachDirties = function () {
                            return this._dirtyState.getAndSet(new org.mwg.core.chunk.heap.HeapChunkSpace.InternalDirtyStateList(this._saveBatchSize, this));
                        };
                        HeapChunkSpace.prototype.declareDirty = function (dirtyChunk) {
                            var world = dirtyChunk.world();
                            var time = dirtyChunk.time();
                            var id = dirtyChunk.id();
                            var type = dirtyChunk.chunkType();
                            var hashIndex = org.mwg.core.utility.PrimitiveHelper.tripleHash(type, world, time, id, this._maxEntries);
                            var m = this._elementHash[hashIndex];
                            while (m >= 0) {
                                var currentM = this._values[m];
                                if (currentM != null && type == currentM.chunkType() && world == currentM.world() && time == currentM.time() && id == currentM.id()) {
                                    if (currentM.setFlags(org.mwg.core.CoreConstants.DIRTY_BIT, 0)) {
                                        currentM.mark();
                                        var success = false;
                                        while (!success) {
                                            var previousState = this._dirtyState.get();
                                            success = previousState.declareDirty(m);
                                            if (!success) {
                                                this._graph.save(null);
                                            }
                                        }
                                    }
                                    return;
                                }
                                m = this._elementNext[m];
                            }
                            throw new Error("Try to declare a non existing object!");
                        };
                        HeapChunkSpace.prototype.declareClean = function (cleanChunk) {
                            var heapChunk = cleanChunk;
                            var world = cleanChunk.world();
                            var time = cleanChunk.time();
                            var id = cleanChunk.id();
                            var type = cleanChunk.chunkType();
                            var hashIndex = org.mwg.core.utility.PrimitiveHelper.tripleHash(type, world, time, id, this._maxEntries);
                            var m = this._elementHash[hashIndex];
                            while (m >= 0) {
                                var currentM = this._values[m];
                                if (currentM != null && type == currentM.chunkType() && world == currentM.world() && time == currentM.time() && id == currentM.id()) {
                                    currentM.setFlags(0, org.mwg.core.CoreConstants.DIRTY_BIT);
                                    if (heapChunk.unmark() == 0) {
                                        this._lru.enqueue(m);
                                    }
                                    return;
                                }
                                m = this._elementNext[m];
                            }
                            throw new Error("Try to declare a non existing object!");
                        };
                        HeapChunkSpace.prototype.clear = function () {
                        };
                        HeapChunkSpace.prototype.free = function () {
                        };
                        HeapChunkSpace.prototype.size = function () {
                            return this._elementCount.get();
                        };
                        HeapChunkSpace.prototype.available = function () {
                            return this._lru.size();
                        };
                        HeapChunkSpace.prototype.printMarked = function () {
                            for (var i = 0; i < this._values.length; i++) {
                                if (this._values[i] != null) {
                                    if (this._values[i].marks() != 0) {
                                        console.log(this._values[i].chunkType() + "," + this._values[i].world() + "," + this._values[i].time() + "," + this._values[i].id());
                                    }
                                }
                            }
                        };
                        return HeapChunkSpace;
                    }());
                    heap.HeapChunkSpace = HeapChunkSpace;
                    var HeapChunkSpace;
                    (function (HeapChunkSpace) {
                        var InternalDirtyStateList = (function () {
                            function InternalDirtyStateList(maxSize, p_parent) {
                                this._dirtyElements = new Int32Array(maxSize);
                                this._nextCounter = new java.util.concurrent.atomic.AtomicInteger(0);
                                this._iterationCounter = new java.util.concurrent.atomic.AtomicInteger(0);
                                this._max = maxSize;
                                this._parent = p_parent;
                            }

                            InternalDirtyStateList.prototype.hasNext = function () {
                                return this._iterationCounter.get() < this._nextCounter.get();
                            };
                            InternalDirtyStateList.prototype.next = function () {
                                var previous;
                                var next;
                                do {
                                    previous = this._iterationCounter.get();
                                    if (this._nextCounter.get() == previous) {
                                        return null;
                                    }
                                    next = previous + 1;
                                } while (!this._iterationCounter.compareAndSet(previous, next));
                                return this._parent.getValues()[this._dirtyElements[previous]];
                            };
                            InternalDirtyStateList.prototype.declareDirty = function (dirtyIndex) {
                                var previousDirty;
                                var nextDirty;
                                do {
                                    previousDirty = this._nextCounter.get();
                                    if (previousDirty == this._max) {
                                        return false;
                                    }
                                    nextDirty = previousDirty + 1;
                                } while (!this._nextCounter.compareAndSet(previousDirty, nextDirty));
                                this._dirtyElements[previousDirty] = dirtyIndex;
                                return true;
                            };
                            InternalDirtyStateList.prototype.size = function () {
                                return this._nextCounter.get();
                            };
                            InternalDirtyStateList.prototype.free = function () {
                            };
                            return InternalDirtyStateList;
                        }());
                        HeapChunkSpace.InternalDirtyStateList = InternalDirtyStateList;
                    })(HeapChunkSpace = heap.HeapChunkSpace || (heap.HeapChunkSpace = {}));
                    var HeapGenChunk = (function () {
                        function HeapGenChunk(p_world, p_time, p_id, p_space, initialPayload) {
                            this._world = p_world;
                            this._time = p_time;
                            this._id = p_id;
                            this._space = p_space;
                            this._flags = 0;
                            this._marks = 0;
                            this._prefix = Long.fromNumber(p_id).shiftLeft((org.mwg.Constants.LONG_SIZE - org.mwg.Constants.PREFIX_SIZE));
                            this._currentIndex = new java.util.concurrent.atomic.AtomicLong(0);
                            this.load(initialPayload);
                        }

                        HeapGenChunk.prototype.load = function (payload) {
                            if (payload != null && payload.length() > 0) {
                                this._currentIndex.compareAndSet(this._currentIndex.get(), org.mwg.plugin.Base64.decodeToLongWithBounds(payload, 0, payload.length()));
                            }
                            else {
                                this._currentIndex.compareAndSet(this._currentIndex.get(), 0);
                            }
                        };
                        HeapGenChunk.prototype.save = function (buffer) {
                            org.mwg.plugin.Base64.encodeLongToBuffer(this._currentIndex.get(), buffer);
                        };
                        HeapGenChunk.prototype.merge = function (buffer) {
                            var previous;
                            var toInsert = org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, 0, buffer.length());
                            do {
                                previous = this._currentIndex.get();
                            } while (!this._currentIndex.compareAndSet(previous, toInsert));
                            if (toInsert != previous) {
                                this.internal_set_dirty();
                            }
                        };
                        HeapGenChunk.prototype.newKey = function () {
                            if (this._currentIndex.get() == org.mwg.Constants.KEY_PREFIX_MASK) {
                                throw new Error("Object Index could not be created because it exceeded the capacity of the current prefix. Ask for a new prefix.");
                            }
                            var previousIndex = this._currentIndex.get();
                            this._currentIndex.compareAndSet(previousIndex, previousIndex + 1);
                            this.internal_set_dirty();
                            var newIndex = this._currentIndex.get();
                            var objectKey = this._prefix.add(newIndex).toNumber();
                            if (objectKey >= org.mwg.Constants.NULL_LONG) {
                                throw new Error("Object Index exceeds the maximum JavaScript number capacity. (2^" + org.mwg.Constants.LONG_SIZE + ")");
                            }
                            return objectKey;
                        };
                        HeapGenChunk.prototype.world = function () {
                            return this._world;
                        };
                        HeapGenChunk.prototype.time = function () {
                            return this._time;
                        };
                        HeapGenChunk.prototype.id = function () {
                            return this._id;
                        };
                        HeapGenChunk.prototype.chunkType = function () {
                            return org.mwg.plugin.ChunkType.GEN_CHUNK;
                        };
                        HeapGenChunk.prototype.marks = function () {
                            return this._marks;
                        };
                        HeapGenChunk.prototype.mark = function () {
                            this._marks = this._marks + 1;
                            return this._marks;
                        };
                        HeapGenChunk.prototype.unmark = function () {
                            this._marks = this._marks - 1;
                            return this._marks;
                        };
                        HeapGenChunk.prototype.flags = function () {
                            return this._flags;
                        };
                        HeapGenChunk.prototype.setFlags = function (bitsToEnable, bitsToDisable) {
                            var val = this._flags;
                            var nval = val & ~bitsToDisable | bitsToEnable;
                            this._flags = nval;
                            return val != nval;
                        };
                        HeapGenChunk.prototype.internal_set_dirty = function () {
                            if (this._space != null) {
                                if ((this._flags & org.mwg.core.CoreConstants.DIRTY_BIT) != org.mwg.core.CoreConstants.DIRTY_BIT) {
                                    this._space.declareDirty(this);
                                }
                            }
                        };
                        return HeapGenChunk;
                    }());
                    heap.HeapGenChunk = HeapGenChunk;
                    var HeapStateChunk = (function () {
                        function HeapStateChunk(p_world, p_time, p_id, p_space, initialPayload, origin) {
                            this.inLoadMode = false;
                            this._world = p_world;
                            this._time = p_time;
                            this._id = p_id;
                            this._flags = 0;
                            this._marks = 0;
                            this._space = p_space;
                            if (initialPayload != null && initialPayload.length() > 0) {
                                this.load(initialPayload, false);
                            }
                            else {
                                if (origin != null) {
                                    var castedOrigin = origin;
                                    var clonedState = castedOrigin.state.softClone();
                                    this.state = clonedState;
                                    for (var i = 0; i < clonedState._elementCount; i++) {
                                        switch (clonedState._elementType[i]) {
                                            case org.mwg.Type.LONG_TO_LONG_MAP:
                                                if (clonedState._elementV[i] != null) {
                                                    clonedState._elementV[i] = new org.mwg.core.chunk.heap.ArrayLongLongMap(this, -1, clonedState._elementV[i]);
                                                }
                                                break;
                                            case org.mwg.Type.LONG_TO_LONG_ARRAY_MAP:
                                                if (clonedState._elementV[i] != null) {
                                                    clonedState._elementV[i] = new org.mwg.core.chunk.heap.ArrayLongLongArrayMap(this, -1, clonedState._elementV[i]);
                                                }
                                                break;
                                            case org.mwg.Type.STRING_TO_LONG_MAP:
                                                if (clonedState._elementV[i] != null) {
                                                    clonedState._elementV[i] = new org.mwg.core.chunk.heap.ArrayStringLongMap(this, -1, clonedState._elementV[i]);
                                                }
                                                break;
                                        }
                                    }
                                }
                                else {
                                    var initialCapacity = org.mwg.core.CoreConstants.MAP_INITIAL_CAPACITY;
                                    var newstate = new org.mwg.core.chunk.heap.HeapStateChunk.InternalState(initialCapacity, new Float64Array(initialCapacity), new Array(initialCapacity), new Int32Array(initialCapacity), new Int32Array(initialCapacity), new Int8Array(initialCapacity), 0, false);
                                    for (var i = 0; i < initialCapacity; i++) {
                                        newstate._elementNext[i] = -1;
                                        newstate._elementHash[i] = -1;
                                    }
                                    this.state = newstate;
                                }
                            }
                        }

                        HeapStateChunk.prototype.declareDirty = function (chunk) {
                            if (!this.inLoadMode) {
                                this.internal_set_dirty();
                            }
                        };
                        HeapStateChunk.prototype.graph = function () {
                            return this._space.graph();
                        };
                        HeapStateChunk.prototype.world = function () {
                            return this._world;
                        };
                        HeapStateChunk.prototype.time = function () {
                            return this._time;
                        };
                        HeapStateChunk.prototype.id = function () {
                            return this._id;
                        };
                        HeapStateChunk.prototype.chunkType = function () {
                            return org.mwg.plugin.ChunkType.STATE_CHUNK;
                        };
                        HeapStateChunk.prototype.marks = function () {
                            return this._marks;
                        };
                        HeapStateChunk.prototype.mark = function () {
                            this._marks = this._marks + 1;
                            return this._marks;
                        };
                        HeapStateChunk.prototype.unmark = function () {
                            this._marks = this._marks - 1;
                            return this._marks;
                        };
                        HeapStateChunk.prototype.set = function (p_elementIndex, p_elemType, p_unsafe_elem) {
                            if (p_unsafe_elem != null) {
                                if (p_elemType == org.mwg.Type.STRING) {
                                    if (!(typeof p_unsafe_elem === 'string')) {
                                        throw new Error("mwDB usage error, set method called with type " + org.mwg.Type.typeName(p_elemType) + " while param object is " + p_unsafe_elem);
                                    }
                                }
                                if (p_elemType == org.mwg.Type.BOOL) {
                                    if (!(typeof p_unsafe_elem === 'boolean')) {
                                        throw new Error("mwDB usage error, set method called with type " + org.mwg.Type.typeName(p_elemType) + " while param object is " + p_unsafe_elem);
                                    }
                                }
                                if (p_elemType == org.mwg.Type.DOUBLE || p_elemType == org.mwg.Type.LONG || p_elemType == org.mwg.Type.INT) {
                                    if (!(typeof p_unsafe_elem === 'number')) {
                                        throw new Error("mwDB usage error, set method called with type " + org.mwg.Type.typeName(p_elemType) + " while param object is " + p_unsafe_elem);
                                    }
                                }
                                if (p_elemType == org.mwg.Type.DOUBLE_ARRAY) {
                                    if (!(p_unsafe_elem instanceof Float64Array)) {
                                        throw new Error("mwDB usage error, set method called with type " + org.mwg.Type.typeName(p_elemType) + " while param object is " + p_unsafe_elem);
                                    }
                                }
                                if (p_elemType == org.mwg.Type.LONG_ARRAY) {
                                    if (!(p_unsafe_elem instanceof Float64Array)) {
                                        throw new Error("mwDB usage error, set method called with type " + org.mwg.Type.typeName(p_elemType) + " while param object is " + p_unsafe_elem);
                                    }
                                }
                                if (p_elemType == org.mwg.Type.INT_ARRAY) {
                                    if (!(p_unsafe_elem instanceof Int32Array)) {
                                        throw new Error("mwDB usage error, set method called with type " + org.mwg.Type.typeName(p_elemType) + " while param object is " + p_unsafe_elem);
                                    }
                                }
                                if (p_elemType == org.mwg.Type.STRING_TO_LONG_MAP) {
                                    if (!(typeof p_unsafe_elem === 'object')) {
                                        throw new Error("mwDB usage error, set method called with type " + org.mwg.Type.typeName(p_elemType) + " while param object is " + p_unsafe_elem);
                                    }
                                }
                                if (p_elemType == org.mwg.Type.LONG_TO_LONG_MAP) {
                                    if (!(typeof p_unsafe_elem === 'boolean')) {
                                        throw new Error("mwDB usage error, set method called with type " + org.mwg.Type.typeName(p_elemType) + " while param object is " + p_unsafe_elem);
                                    }
                                }
                                if (p_elemType == org.mwg.Type.LONG_TO_LONG_ARRAY_MAP) {
                                    if (!(typeof p_unsafe_elem === 'boolean')) {
                                        throw new Error("mwDB usage error, set method called with type " + org.mwg.Type.typeName(p_elemType) + " while param object is " + p_unsafe_elem);
                                    }
                                }
                            }
                            this.internal_set(p_elementIndex, p_elemType, p_unsafe_elem, true);
                        };
                        HeapStateChunk.prototype.setFromKey = function (key, p_elemType, p_unsafe_elem) {
                            this.internal_set(this._space.graph().resolver().stringToHash(key, true), p_elemType, p_unsafe_elem, true);
                        };
                        HeapStateChunk.prototype.internal_set = function (p_elementIndex, p_elemType, p_unsafe_elem, replaceIfPresent) {
                            var param_elem = null;
                            if (p_unsafe_elem != null) {
                                try {
                                    switch (p_elemType) {
                                        case org.mwg.Type.BOOL:
                                            param_elem = p_unsafe_elem;
                                            break;
                                        case org.mwg.Type.DOUBLE:
                                            param_elem = p_unsafe_elem;
                                            break;
                                        case org.mwg.Type.LONG:
                                            if (p_unsafe_elem instanceof Number) {
                                                var preCasting = p_unsafe_elem;
                                                param_elem = preCasting;
                                            }
                                            else {
                                                param_elem = p_unsafe_elem;
                                            }
                                            break;
                                        case org.mwg.Type.INT:
                                            param_elem = p_unsafe_elem;
                                            break;
                                        case org.mwg.Type.STRING:
                                            param_elem = p_unsafe_elem;
                                            break;
                                        case org.mwg.Type.DOUBLE_ARRAY:
                                            if (p_unsafe_elem != null) {
                                                var castedParamDouble = p_unsafe_elem;
                                                var clonedDoubleArray = new Float64Array(castedParamDouble.length);
                                                java.lang.System.arraycopy(castedParamDouble, 0, clonedDoubleArray, 0, castedParamDouble.length);
                                                param_elem = clonedDoubleArray;
                                            }
                                            break;
                                        case org.mwg.Type.RELATION:
                                        case org.mwg.Type.LONG_ARRAY:
                                            if (p_unsafe_elem != null) {
                                                var castedParamLong = p_unsafe_elem;
                                                var clonedLongArray = new Float64Array(castedParamLong.length);
                                                java.lang.System.arraycopy(castedParamLong, 0, clonedLongArray, 0, castedParamLong.length);
                                                param_elem = clonedLongArray;
                                            }
                                            break;
                                        case org.mwg.Type.INT_ARRAY:
                                            if (p_unsafe_elem != null) {
                                                var castedParamInt = p_unsafe_elem;
                                                var clonedIntArray = new Int32Array(castedParamInt.length);
                                                java.lang.System.arraycopy(castedParamInt, 0, clonedIntArray, 0, castedParamInt.length);
                                                param_elem = clonedIntArray;
                                            }
                                            break;
                                        case org.mwg.Type.STRING_TO_LONG_MAP:
                                            param_elem = p_unsafe_elem;
                                            break;
                                        case org.mwg.Type.LONG_TO_LONG_MAP:
                                            param_elem = p_unsafe_elem;
                                            break;
                                        case org.mwg.Type.LONG_TO_LONG_ARRAY_MAP:
                                            param_elem = p_unsafe_elem;
                                            break;
                                        default:
                                            throw new Error("Internal Exception, unknown type");
                                    }
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof Error) {
                                        var e = $ex$;
                                        throw new Error("mwDB usage error, set method called with type " + org.mwg.Type.typeName(p_elemType) + " while param object is " + p_unsafe_elem);
                                    }
                                    else {
                                        throw $ex$;
                                    }
                                }
                            }
                            var entry = -1;
                            var internalState = this.state;
                            var hashIndex = -1;
                            if (internalState._elementDataSize > 0) {
                                hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(p_elementIndex, internalState._elementDataSize);
                                var m = internalState._elementHash[hashIndex];
                                while (m != -1) {
                                    if (p_elementIndex == internalState._elementK[m]) {
                                        entry = m;
                                        break;
                                    }
                                    m = internalState._elementNext[m];
                                }
                            }
                            if (entry == -1) {
                                if (internalState._elementCount + 1 > internalState.threshold) {
                                    var newLength = (internalState._elementDataSize == 0 ? 1 : internalState._elementDataSize * 2);
                                    var newElementK = new Float64Array(newLength);
                                    var newElementV = new Array(newLength);
                                    var newElementType = new Int8Array(newLength);
                                    if (internalState._elementDataSize > 0) {
                                        java.lang.System.arraycopy(internalState._elementK, 0, newElementK, 0, internalState._elementDataSize);
                                        java.lang.System.arraycopy(internalState._elementV, 0, newElementV, 0, internalState._elementDataSize);
                                        java.lang.System.arraycopy(internalState._elementType, 0, newElementType, 0, internalState._elementDataSize);
                                    }
                                    var newElementNext = new Int32Array(newLength);
                                    var newElementHash = new Int32Array(newLength);
                                    for (var i = 0; i < newLength; i++) {
                                        newElementNext[i] = -1;
                                        newElementHash[i] = -1;
                                    }
                                    for (var i = 0; i < newElementV.length; i++) {
                                        if (newElementV[i] != null) {
                                            var keyHash = org.mwg.core.utility.PrimitiveHelper.longHash(newElementK[i], newLength);
                                            var currentHashedIndex = newElementHash[keyHash];
                                            if (currentHashedIndex != -1) {
                                                newElementNext[i] = currentHashedIndex;
                                            }
                                            newElementHash[keyHash] = i;
                                        }
                                    }
                                    internalState = new org.mwg.core.chunk.heap.HeapStateChunk.InternalState(newLength, newElementK, newElementV, newElementNext, newElementHash, newElementType, internalState._elementCount, false);
                                    this.state = internalState;
                                    hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(p_elementIndex, internalState._elementDataSize);
                                }
                                else {
                                    if (internalState.hashReadOnly) {
                                        internalState = internalState.deepClone();
                                        this.state = internalState;
                                    }
                                }
                                var newIndex = internalState._elementCount;
                                internalState._elementCount = internalState._elementCount + 1;
                                internalState._elementK[newIndex] = p_elementIndex;
                                internalState._elementV[newIndex] = param_elem;
                                internalState._elementType[newIndex] = p_elemType;
                                var currentHashedIndex = internalState._elementHash[hashIndex];
                                if (currentHashedIndex != -1) {
                                    internalState._elementNext[newIndex] = currentHashedIndex;
                                }
                                internalState._elementHash[hashIndex] = newIndex;
                            }
                            else {
                                if (replaceIfPresent || (p_elemType != internalState._elementType[entry])) {
                                    internalState._elementV[entry] = param_elem;
                                    if (internalState._elementType[entry] != p_elemType) {
                                        internalState = internalState.deepClone();
                                        this.state = internalState;
                                        internalState._elementType[entry] = p_elemType;
                                    }
                                }
                            }
                            this.internal_set_dirty();
                        };
                        HeapStateChunk.prototype.get = function (p_elementIndex) {
                            var internalState = this.state;
                            if (internalState._elementDataSize == 0) {
                                return null;
                            }
                            var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(p_elementIndex, internalState._elementDataSize);
                            var m = internalState._elementHash[hashIndex];
                            var result = null;
                            while (m >= 0) {
                                if (p_elementIndex == internalState._elementK[m]) {
                                    result = internalState._elementV[m];
                                    break;
                                }
                                else {
                                    m = internalState._elementNext[m];
                                }
                            }
                            if (result == null) {
                                return null;
                            }
                            switch (internalState._elementType[m]) {
                                case org.mwg.Type.DOUBLE_ARRAY:
                                    var castedResultD = result;
                                    var copyD = new Float64Array(castedResultD.length);
                                    java.lang.System.arraycopy(castedResultD, 0, copyD, 0, castedResultD.length);
                                    return copyD;
                                case org.mwg.Type.RELATION:
                                case org.mwg.Type.LONG_ARRAY:
                                    var castedResultL = result;
                                    var copyL = new Float64Array(castedResultL.length);
                                    java.lang.System.arraycopy(castedResultL, 0, copyL, 0, castedResultL.length);
                                    return copyL;
                                case org.mwg.Type.INT_ARRAY:
                                    var castedResultI = result;
                                    var copyI = new Int32Array(castedResultI.length);
                                    java.lang.System.arraycopy(castedResultI, 0, copyI, 0, castedResultI.length);
                                    return copyI;
                                default:
                                    return result;
                            }
                        };
                        HeapStateChunk.prototype.getFromKey = function (key) {
                            return this.get(this._space.graph().resolver().stringToHash(key, false));
                        };
                        HeapStateChunk.prototype.getFromKeyWithDefault = function (key, defaultValue) {
                            var result = this.getFromKey(key);
                            if (result == null) {
                                return defaultValue;
                            }
                            else {
                                return result;
                            }
                        };
                        HeapStateChunk.prototype.getType = function (p_elementIndex) {
                            var internalState = this.state;
                            if (internalState._elementDataSize == 0) {
                                return -1;
                            }
                            var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(p_elementIndex, internalState._elementDataSize);
                            var m = internalState._elementHash[hashIndex];
                            while (m >= 0) {
                                if (p_elementIndex == internalState._elementK[m]) {
                                    return internalState._elementType[m];
                                }
                                else {
                                    m = internalState._elementNext[m];
                                }
                            }
                            return -1;
                        };
                        HeapStateChunk.prototype.getTypeFromKey = function (key) {
                            return this.getType(this._space.graph().resolver().stringToHash(key, false));
                        };
                        HeapStateChunk.prototype.getOrCreate = function (p_elementIndex, elemType) {
                            var previousObject = this.get(p_elementIndex);
                            var previousType = this.getType(p_elementIndex);
                            if (previousObject != null && previousType == elemType) {
                                return previousObject;
                            }
                            switch (elemType) {
                                case org.mwg.Type.STRING_TO_LONG_MAP:
                                    this.internal_set(p_elementIndex, elemType, new org.mwg.core.chunk.heap.ArrayStringLongMap(this, org.mwg.core.CoreConstants.MAP_INITIAL_CAPACITY, null), false);
                                    break;
                                case org.mwg.Type.LONG_TO_LONG_MAP:
                                    this.internal_set(p_elementIndex, elemType, new org.mwg.core.chunk.heap.ArrayLongLongMap(this, org.mwg.core.CoreConstants.MAP_INITIAL_CAPACITY, null), false);
                                    break;
                                case org.mwg.Type.LONG_TO_LONG_ARRAY_MAP:
                                    this.internal_set(p_elementIndex, elemType, new org.mwg.core.chunk.heap.ArrayLongLongArrayMap(this, org.mwg.core.CoreConstants.MAP_INITIAL_CAPACITY, null), false);
                                    break;
                            }
                            return this.get(p_elementIndex);
                        };
                        HeapStateChunk.prototype.getOrCreateFromKey = function (key, elemType) {
                            return this.getOrCreate(this._space.graph().resolver().stringToHash(key, true), elemType);
                        };
                        HeapStateChunk.prototype.each = function (callBack) {
                            var currentState = this.state;
                            for (var i = 0; i < (currentState._elementCount); i++) {
                                if (currentState._elementV[i] != null) {
                                    callBack(currentState._elementK[i], currentState._elementType[i], currentState._elementV[i]);
                                }
                            }
                        };
                        HeapStateChunk.prototype.merge = function (buffer) {
                            this.load(buffer, true);
                        };
                        HeapStateChunk.prototype.load = function (payload, isMerge) {
                            if (payload == null || payload.length() == 0) {
                                return;
                            }
                            this.inLoadMode = true;
                            var newElementK = null;
                            var newElementV = null;
                            var newElementType = null;
                            var newElementNext = null;
                            var newElementHash = null;
                            var newNumberElement = 0;
                            var newStateCapacity = 0;
                            var currentElemIndex = 0;
                            var cursor = 0;
                            var payloadSize = payload.length();
                            var previousStart = -1;
                            var currentChunkElemKey = org.mwg.core.CoreConstants.NULL_LONG;
                            var currentChunkElemType = -1;
                            var isFirstElem = true;
                            var currentDoubleArr = null;
                            var currentLongArr = null;
                            var currentIntArr = null;
                            var currentStringLongMap = null;
                            var currentLongLongMap = null;
                            var currentLongLongArrayMap = null;
                            var currentSubSize = -1;
                            var currentSubIndex = 0;
                            var currentMapLongKey = org.mwg.core.CoreConstants.NULL_LONG;
                            var currentMapStringKey = null;
                            while (cursor < payloadSize) {
                                var current = payload.read(cursor);
                                if (current == org.mwg.core.CoreConstants.CHUNK_SEP) {
                                    if (isFirstElem) {
                                        isFirstElem = false;
                                        var stateChunkSize = org.mwg.plugin.Base64.decodeToIntWithBounds(payload, 0, cursor);
                                        if (!isMerge) {
                                            newNumberElement = stateChunkSize;
                                            var newStateChunkSize = (stateChunkSize == 0 ? 1 : stateChunkSize * 2);
                                            newElementK = new Float64Array(newStateChunkSize);
                                            newElementV = new Array(newStateChunkSize);
                                            newElementType = new Int8Array(newStateChunkSize);
                                            newStateCapacity = newStateChunkSize;
                                            newElementNext = new Int32Array(newStateChunkSize);
                                            newElementHash = new Int32Array(newStateChunkSize);
                                            for (var i = 0; i < newStateChunkSize; i++) {
                                                newElementNext[i] = -1;
                                                newElementHash[i] = -1;
                                            }
                                        }
                                        previousStart = cursor + 1;
                                    }
                                    else {
                                        if (currentChunkElemType != -1) {
                                            var toInsert = null;
                                            switch (currentChunkElemType) {
                                                case org.mwg.Type.BOOL:
                                                    if (payload.read(previousStart) == org.mwg.core.CoreConstants.BOOL_FALSE) {
                                                        toInsert = false;
                                                    }
                                                    else {
                                                        if (payload.read(previousStart) == org.mwg.core.CoreConstants.BOOL_TRUE) {
                                                            toInsert = true;
                                                        }
                                                    }
                                                    break;
                                                case org.mwg.Type.STRING:
                                                    toInsert = org.mwg.plugin.Base64.decodeToStringWithBounds(payload, previousStart, cursor);
                                                    break;
                                                case org.mwg.Type.DOUBLE:
                                                    toInsert = org.mwg.plugin.Base64.decodeToDoubleWithBounds(payload, previousStart, cursor);
                                                    break;
                                                case org.mwg.Type.LONG:
                                                    toInsert = org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor);
                                                    break;
                                                case org.mwg.Type.INT:
                                                    toInsert = org.mwg.plugin.Base64.decodeToIntWithBounds(payload, previousStart, cursor);
                                                    break;
                                                case org.mwg.Type.DOUBLE_ARRAY:
                                                    if (currentDoubleArr == null) {
                                                        currentDoubleArr = new Float64Array(org.mwg.plugin.Base64.decodeToIntWithBounds(payload, previousStart, cursor));
                                                    }
                                                    else {
                                                        currentDoubleArr[currentSubIndex] = org.mwg.plugin.Base64.decodeToDoubleWithBounds(payload, previousStart, cursor);
                                                    }
                                                    toInsert = currentDoubleArr;
                                                    break;
                                                case org.mwg.Type.RELATION:
                                                case org.mwg.Type.LONG_ARRAY:
                                                    if (currentLongArr == null) {
                                                        currentLongArr = new Float64Array(org.mwg.plugin.Base64.decodeToIntWithBounds(payload, previousStart, cursor));
                                                    }
                                                    else {
                                                        currentLongArr[currentSubIndex] = org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor);
                                                    }
                                                    toInsert = currentLongArr;
                                                    break;
                                                case org.mwg.Type.INT_ARRAY:
                                                    if (currentIntArr == null) {
                                                        currentIntArr = new Int32Array(org.mwg.plugin.Base64.decodeToIntWithBounds(payload, previousStart, cursor));
                                                    }
                                                    else {
                                                        currentIntArr[currentSubIndex] = org.mwg.plugin.Base64.decodeToIntWithBounds(payload, previousStart, cursor);
                                                    }
                                                    toInsert = currentIntArr;
                                                    break;
                                                case org.mwg.Type.STRING_TO_LONG_MAP:
                                                    if (currentMapStringKey != null) {
                                                        currentStringLongMap.put(currentMapStringKey, org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor));
                                                    }
                                                    toInsert = currentStringLongMap;
                                                    break;
                                                case org.mwg.Type.LONG_TO_LONG_MAP:
                                                    if (currentMapLongKey != org.mwg.core.CoreConstants.NULL_LONG) {
                                                        currentLongLongMap.put(currentMapLongKey, org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor));
                                                    }
                                                    toInsert = currentLongLongMap;
                                                    break;
                                                case org.mwg.Type.LONG_TO_LONG_ARRAY_MAP:
                                                    if (currentMapLongKey != org.mwg.core.CoreConstants.NULL_LONG) {
                                                        currentLongLongArrayMap.put(currentMapLongKey, org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor));
                                                    }
                                                    toInsert = currentLongLongArrayMap;
                                                    break;
                                            }
                                            if (toInsert != null) {
                                                if (isMerge) {
                                                    this.internal_set(currentChunkElemKey, currentChunkElemType, toInsert, true);
                                                }
                                                else {
                                                    var newIndex = currentElemIndex;
                                                    newElementK[newIndex] = currentChunkElemKey;
                                                    newElementV[newIndex] = toInsert;
                                                    newElementType[newIndex] = currentChunkElemType;
                                                    var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(currentChunkElemKey, newStateCapacity);
                                                    var currentHashedIndex = newElementHash[hashIndex];
                                                    if (currentHashedIndex != -1) {
                                                        newElementNext[newIndex] = currentHashedIndex;
                                                    }
                                                    newElementHash[hashIndex] = newIndex;
                                                    currentElemIndex++;
                                                }
                                            }
                                        }
                                        previousStart = cursor + 1;
                                        currentChunkElemKey = org.mwg.core.CoreConstants.NULL_LONG;
                                        currentChunkElemType = -1;
                                        currentSubSize = -1;
                                        currentSubIndex = 0;
                                        currentMapLongKey = org.mwg.core.CoreConstants.NULL_LONG;
                                        currentMapStringKey = null;
                                    }
                                }
                                else {
                                    if (current == org.mwg.core.CoreConstants.CHUNK_SUB_SEP) {
                                        if (currentChunkElemKey == org.mwg.core.CoreConstants.NULL_LONG) {
                                            currentChunkElemKey = org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor);
                                            previousStart = cursor + 1;
                                        }
                                        else {
                                            if (currentChunkElemType == -1) {
                                                currentChunkElemType = org.mwg.plugin.Base64.decodeToIntWithBounds(payload, previousStart, cursor);
                                                previousStart = cursor + 1;
                                            }
                                        }
                                    }
                                    else {
                                        if (current == org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SEP) {
                                            if (currentSubSize == -1) {
                                                currentSubSize = org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor);
                                                switch (currentChunkElemType) {
                                                    case org.mwg.Type.DOUBLE_ARRAY:
                                                        currentDoubleArr = new Float64Array(currentSubSize);
                                                        break;
                                                    case org.mwg.Type.RELATION:
                                                    case org.mwg.Type.LONG_ARRAY:
                                                        currentLongArr = new Float64Array(currentSubSize);
                                                        break;
                                                    case org.mwg.Type.INT_ARRAY:
                                                        currentIntArr = new Int32Array(currentSubSize);
                                                        break;
                                                    case org.mwg.Type.STRING_TO_LONG_MAP:
                                                        currentStringLongMap = new org.mwg.core.chunk.heap.ArrayStringLongMap(this, currentSubSize, null);
                                                        break;
                                                    case org.mwg.Type.LONG_TO_LONG_MAP:
                                                        currentLongLongMap = new org.mwg.core.chunk.heap.ArrayLongLongMap(this, currentSubSize, null);
                                                        break;
                                                    case org.mwg.Type.LONG_TO_LONG_ARRAY_MAP:
                                                        currentLongLongArrayMap = new org.mwg.core.chunk.heap.ArrayLongLongArrayMap(this, currentSubSize, null);
                                                        break;
                                                }
                                            }
                                            else {
                                                switch (currentChunkElemType) {
                                                    case org.mwg.Type.DOUBLE_ARRAY:
                                                        currentDoubleArr[currentSubIndex] = org.mwg.plugin.Base64.decodeToDoubleWithBounds(payload, previousStart, cursor);
                                                        currentSubIndex++;
                                                        break;
                                                    case org.mwg.Type.RELATION:
                                                    case org.mwg.Type.LONG_ARRAY:
                                                        currentLongArr[currentSubIndex] = org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor);
                                                        currentSubIndex++;
                                                        break;
                                                    case org.mwg.Type.INT_ARRAY:
                                                        currentIntArr[currentSubIndex] = org.mwg.plugin.Base64.decodeToIntWithBounds(payload, previousStart, cursor);
                                                        currentSubIndex++;
                                                        break;
                                                    case org.mwg.Type.STRING_TO_LONG_MAP:
                                                        if (currentMapStringKey != null) {
                                                            currentStringLongMap.put(currentMapStringKey, org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor));
                                                            currentMapStringKey = null;
                                                        }
                                                        break;
                                                    case org.mwg.Type.LONG_TO_LONG_MAP:
                                                        if (currentMapLongKey != org.mwg.core.CoreConstants.NULL_LONG) {
                                                            currentLongLongMap.put(currentMapLongKey, org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor));
                                                            currentMapLongKey = org.mwg.core.CoreConstants.NULL_LONG;
                                                        }
                                                        break;
                                                    case org.mwg.Type.LONG_TO_LONG_ARRAY_MAP:
                                                        if (currentMapLongKey != org.mwg.core.CoreConstants.NULL_LONG) {
                                                            currentLongLongArrayMap.put(currentMapLongKey, org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor));
                                                            currentMapLongKey = org.mwg.core.CoreConstants.NULL_LONG;
                                                        }
                                                        break;
                                                }
                                            }
                                            previousStart = cursor + 1;
                                        }
                                        else {
                                            if (current == org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SUB_SEP) {
                                                switch (currentChunkElemType) {
                                                    case org.mwg.Type.STRING_TO_LONG_MAP:
                                                        if (currentMapStringKey == null) {
                                                            currentMapStringKey = org.mwg.plugin.Base64.decodeToStringWithBounds(payload, previousStart, cursor);
                                                        }
                                                        else {
                                                            currentStringLongMap.put(currentMapStringKey, org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor));
                                                            currentMapStringKey = null;
                                                        }
                                                        break;
                                                    case org.mwg.Type.LONG_TO_LONG_MAP:
                                                        if (currentMapLongKey == org.mwg.core.CoreConstants.NULL_LONG) {
                                                            currentMapLongKey = org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor);
                                                        }
                                                        else {
                                                            currentLongLongMap.put(currentMapLongKey, org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor));
                                                            currentMapLongKey = org.mwg.core.CoreConstants.NULL_LONG;
                                                        }
                                                        break;
                                                    case org.mwg.Type.LONG_TO_LONG_ARRAY_MAP:
                                                        if (currentMapLongKey == org.mwg.core.CoreConstants.NULL_LONG) {
                                                            currentMapLongKey = org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor);
                                                        }
                                                        else {
                                                            currentLongLongArrayMap.put(currentMapLongKey, org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor));
                                                            currentMapLongKey = org.mwg.core.CoreConstants.NULL_LONG;
                                                        }
                                                        break;
                                                }
                                                previousStart = cursor + 1;
                                            }
                                        }
                                    }
                                }
                                cursor++;
                            }
                            if (currentChunkElemType != -1) {
                                var toInsert = null;
                                switch (currentChunkElemType) {
                                    case org.mwg.Type.BOOL:
                                        if (payload.read(previousStart) == org.mwg.core.CoreConstants.BOOL_FALSE) {
                                            toInsert = false;
                                        }
                                        else {
                                            if (payload.read(previousStart) == org.mwg.core.CoreConstants.BOOL_TRUE) {
                                                toInsert = true;
                                            }
                                        }
                                        break;
                                    case org.mwg.Type.STRING:
                                        toInsert = org.mwg.plugin.Base64.decodeToStringWithBounds(payload, previousStart, cursor);
                                        break;
                                    case org.mwg.Type.DOUBLE:
                                        toInsert = org.mwg.plugin.Base64.decodeToDoubleWithBounds(payload, previousStart, cursor);
                                        break;
                                    case org.mwg.Type.LONG:
                                        toInsert = org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor);
                                        break;
                                    case org.mwg.Type.INT:
                                        toInsert = org.mwg.plugin.Base64.decodeToIntWithBounds(payload, previousStart, cursor);
                                        break;
                                    case org.mwg.Type.DOUBLE_ARRAY:
                                        if (currentDoubleArr == null) {
                                            currentDoubleArr = new Float64Array(org.mwg.plugin.Base64.decodeToIntWithBounds(payload, previousStart, cursor));
                                        }
                                        else {
                                            currentDoubleArr[currentSubIndex] = org.mwg.plugin.Base64.decodeToDoubleWithBounds(payload, previousStart, cursor);
                                        }
                                        toInsert = currentDoubleArr;
                                        break;
                                    case org.mwg.Type.RELATION:
                                    case org.mwg.Type.LONG_ARRAY:
                                        if (currentLongArr == null) {
                                            currentLongArr = new Float64Array(org.mwg.plugin.Base64.decodeToIntWithBounds(payload, previousStart, cursor));
                                        }
                                        else {
                                            currentLongArr[currentSubIndex] = org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor);
                                        }
                                        toInsert = currentLongArr;
                                        break;
                                    case org.mwg.Type.INT_ARRAY:
                                        if (currentIntArr == null) {
                                            currentIntArr = new Int32Array(org.mwg.plugin.Base64.decodeToIntWithBounds(payload, previousStart, cursor));
                                        }
                                        else {
                                            currentIntArr[currentSubIndex] = org.mwg.plugin.Base64.decodeToIntWithBounds(payload, previousStart, cursor);
                                        }
                                        toInsert = currentIntArr;
                                        break;
                                    case org.mwg.Type.STRING_TO_LONG_MAP:
                                        if (currentMapStringKey != null) {
                                            currentStringLongMap.put(currentMapStringKey, org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor));
                                        }
                                        toInsert = currentStringLongMap;
                                        break;
                                    case org.mwg.Type.LONG_TO_LONG_MAP:
                                        if (currentMapLongKey != org.mwg.core.CoreConstants.NULL_LONG) {
                                            currentLongLongMap.put(currentMapLongKey, org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor));
                                        }
                                        toInsert = currentLongLongMap;
                                        break;
                                    case org.mwg.Type.LONG_TO_LONG_ARRAY_MAP:
                                        if (currentMapLongKey != org.mwg.core.CoreConstants.NULL_LONG) {
                                            currentLongLongArrayMap.put(currentMapLongKey, org.mwg.plugin.Base64.decodeToLongWithBounds(payload, previousStart, cursor));
                                        }
                                        toInsert = currentLongLongArrayMap;
                                        break;
                                }
                                if (toInsert != null) {
                                    if (isMerge) {
                                        this.internal_set(currentChunkElemKey, currentChunkElemType, toInsert, true);
                                    }
                                    else {
                                        newElementK[currentElemIndex] = currentChunkElemKey;
                                        newElementV[currentElemIndex] = toInsert;
                                        newElementType[currentElemIndex] = currentChunkElemType;
                                        var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(currentChunkElemKey, newStateCapacity);
                                        var currentHashedIndex = newElementHash[hashIndex];
                                        if (currentHashedIndex != -1) {
                                            newElementNext[currentElemIndex] = currentHashedIndex;
                                        }
                                        newElementHash[hashIndex] = currentElemIndex;
                                    }
                                }
                            }
                            if (!isMerge) {
                                this.state = new org.mwg.core.chunk.heap.HeapStateChunk.InternalState(newStateCapacity, newElementK, newElementV, newElementNext, newElementHash, newElementType, newNumberElement, false);
                            }
                            this.inLoadMode = false;
                        };
                        HeapStateChunk.prototype.save = function (buffer) {
                            var internalState = this.state;
                            org.mwg.plugin.Base64.encodeIntToBuffer(internalState._elementCount, buffer);
                            for (var i = 0; i < internalState._elementCount; i++) {
                                if (internalState._elementV[i] != null) {
                                    var loopKey = internalState._elementK[i];
                                    var loopValue = internalState._elementV[i];
                                    if (loopValue != null) {
                                        buffer.write(org.mwg.core.CoreConstants.CHUNK_SEP);
                                        org.mwg.plugin.Base64.encodeLongToBuffer(loopKey, buffer);
                                        buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SEP);
                                        org.mwg.plugin.Base64.encodeIntToBuffer(internalState._elementType[i], buffer);
                                        buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SEP);
                                        switch (internalState._elementType[i]) {
                                            case org.mwg.Type.STRING:
                                                org.mwg.plugin.Base64.encodeStringToBuffer(loopValue, buffer);
                                                break;
                                            case org.mwg.Type.BOOL:
                                                if (internalState._elementV[i]) {
                                                    buffer.write(org.mwg.core.CoreConstants.BOOL_TRUE);
                                                }
                                                else {
                                                    buffer.write(org.mwg.core.CoreConstants.BOOL_FALSE);
                                                }
                                                break;
                                            case org.mwg.Type.LONG:
                                                org.mwg.plugin.Base64.encodeLongToBuffer(loopValue, buffer);
                                                break;
                                            case org.mwg.Type.DOUBLE:
                                                org.mwg.plugin.Base64.encodeDoubleToBuffer(loopValue, buffer);
                                                break;
                                            case org.mwg.Type.INT:
                                                org.mwg.plugin.Base64.encodeIntToBuffer(loopValue, buffer);
                                                break;
                                            case org.mwg.Type.DOUBLE_ARRAY:
                                                var castedDoubleArr = loopValue;
                                                org.mwg.plugin.Base64.encodeIntToBuffer(castedDoubleArr.length, buffer);
                                                for (var j = 0; j < castedDoubleArr.length; j++) {
                                                    buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SEP);
                                                    org.mwg.plugin.Base64.encodeDoubleToBuffer(castedDoubleArr[j], buffer);
                                                }
                                                break;
                                            case org.mwg.Type.RELATION:
                                            case org.mwg.Type.LONG_ARRAY:
                                                var castedLongArr = loopValue;
                                                org.mwg.plugin.Base64.encodeIntToBuffer(castedLongArr.length, buffer);
                                                for (var j = 0; j < castedLongArr.length; j++) {
                                                    buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SEP);
                                                    org.mwg.plugin.Base64.encodeLongToBuffer(castedLongArr[j], buffer);
                                                }
                                                break;
                                            case org.mwg.Type.INT_ARRAY:
                                                var castedIntArr = loopValue;
                                                org.mwg.plugin.Base64.encodeIntToBuffer(castedIntArr.length, buffer);
                                                for (var j = 0; j < castedIntArr.length; j++) {
                                                    buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SEP);
                                                    org.mwg.plugin.Base64.encodeIntToBuffer(castedIntArr[j], buffer);
                                                }
                                                break;
                                            case org.mwg.Type.STRING_TO_LONG_MAP:
                                                var castedStringLongMap = loopValue;
                                                org.mwg.plugin.Base64.encodeLongToBuffer(castedStringLongMap.size(), buffer);
                                                castedStringLongMap.each(function (key, value) {
                                                    buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SEP);
                                                    org.mwg.plugin.Base64.encodeStringToBuffer(key, buffer);
                                                    buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SUB_SEP);
                                                    org.mwg.plugin.Base64.encodeLongToBuffer(value, buffer);
                                                });
                                                break;
                                            case org.mwg.Type.LONG_TO_LONG_MAP:
                                                var castedLongLongMap = loopValue;
                                                org.mwg.plugin.Base64.encodeLongToBuffer(castedLongLongMap.size(), buffer);
                                                castedLongLongMap.each(function (key, value) {
                                                    buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SEP);
                                                    org.mwg.plugin.Base64.encodeLongToBuffer(key, buffer);
                                                    buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SUB_SEP);
                                                    org.mwg.plugin.Base64.encodeLongToBuffer(value, buffer);
                                                });
                                                break;
                                            case org.mwg.Type.LONG_TO_LONG_ARRAY_MAP:
                                                var castedLongLongArrayMap = loopValue;
                                                org.mwg.plugin.Base64.encodeLongToBuffer(castedLongLongArrayMap.size(), buffer);
                                                castedLongLongArrayMap.each(function (key, value) {
                                                    buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SEP);
                                                    org.mwg.plugin.Base64.encodeLongToBuffer(key, buffer);
                                                    buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SUB_SEP);
                                                    org.mwg.plugin.Base64.encodeLongToBuffer(value, buffer);
                                                });
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                            }
                        };
                        HeapStateChunk.prototype.internal_set_dirty = function () {
                            if (this._space != null) {
                                if ((this._flags & org.mwg.core.CoreConstants.DIRTY_BIT) != org.mwg.core.CoreConstants.DIRTY_BIT) {
                                    this._space.declareDirty(this);
                                }
                            }
                        };
                        HeapStateChunk.prototype.flags = function () {
                            return this._flags;
                        };
                        HeapStateChunk.prototype.setFlags = function (bitsToEnable, bitsToDisable) {
                            var val = this._flags;
                            var nval = val & ~bitsToDisable | bitsToEnable;
                            this._flags = nval;
                            return val != nval;
                        };
                        return HeapStateChunk;
                    }());
                    heap.HeapStateChunk = HeapStateChunk;
                    var HeapStateChunk;
                    (function (HeapStateChunk) {
                        var InternalState = (function () {
                            function InternalState(elementDataSize, p_elementK, p_elementV, p_elementNext, p_elementHash, p_elementType, p_elementCount, p_hashReadOnly) {
                                this.hashReadOnly = p_hashReadOnly;
                                this._elementDataSize = elementDataSize;
                                this._elementK = p_elementK;
                                this._elementV = p_elementV;
                                this._elementNext = p_elementNext;
                                this._elementHash = p_elementHash;
                                this._elementType = p_elementType;
                                this._elementCount = p_elementCount;
                                this.threshold = (this._elementDataSize * org.mwg.core.CoreConstants.MAP_LOAD_FACTOR);
                            }

                            InternalState.prototype.deepClone = function () {
                                var clonedElementK = new Float64Array(this._elementDataSize);
                                java.lang.System.arraycopy(this._elementK, 0, clonedElementK, 0, this._elementDataSize);
                                var clonedElementNext = new Int32Array(this._elementDataSize);
                                java.lang.System.arraycopy(this._elementNext, 0, clonedElementNext, 0, this._elementDataSize);
                                var clonedElementHash = new Int32Array(this._elementDataSize);
                                java.lang.System.arraycopy(this._elementHash, 0, clonedElementHash, 0, this._elementDataSize);
                                var clonedElementType = new Int8Array(this._elementDataSize);
                                java.lang.System.arraycopy(this._elementType, 0, clonedElementType, 0, this._elementDataSize);
                                return new org.mwg.core.chunk.heap.HeapStateChunk.InternalState(this._elementDataSize, clonedElementK, this._elementV, clonedElementNext, clonedElementHash, clonedElementType, this._elementCount, false);
                            };
                            InternalState.prototype.softClone = function () {
                                var clonedElementV = new Array(this._elementDataSize);
                                java.lang.System.arraycopy(this._elementV, 0, clonedElementV, 0, this._elementDataSize);
                                return new org.mwg.core.chunk.heap.HeapStateChunk.InternalState(this._elementDataSize, this._elementK, clonedElementV, this._elementNext, this._elementHash, this._elementType, this._elementCount, true);
                            };
                            return InternalState;
                        }());
                        HeapStateChunk.InternalState = InternalState;
                    })(HeapStateChunk = heap.HeapStateChunk || (heap.HeapStateChunk = {}));
                    var HeapTimeTreeChunk = (function () {
                        function HeapTimeTreeChunk(p_world, p_time, p_obj, p_listener, initialPayload) {
                            this._root_index = -1;
                            this._size = 0;
                            this._listener = p_listener;
                            this._world = p_world;
                            this._time = p_time;
                            this._id = p_obj;
                            this._threshold = 0;
                            this._flags = 0;
                            this._marks = 0;
                            this._magic = 0;
                            this._lock = 0;
                            try {
                                this.load(initialPayload);
                            }
                            catch ($ex$) {
                                if ($ex$ instanceof Error) {
                                    var e = $ex$;
                                    console.error(e);
                                }
                                else {
                                    throw $ex$;
                                }
                            }
                        }

                        HeapTimeTreeChunk.prototype.lock = function () {
                        };
                        HeapTimeTreeChunk.prototype.unlock = function () {
                        };
                        HeapTimeTreeChunk.prototype.marks = function () {
                            return this._marks;
                        };
                        HeapTimeTreeChunk.prototype.mark = function () {
                            this._marks = this._marks + 1;
                            return this._marks;
                        };
                        HeapTimeTreeChunk.prototype.unmark = function () {
                            this._marks = this._marks - 1;
                            return this._marks;
                        };
                        HeapTimeTreeChunk.prototype.world = function () {
                            return this._world;
                        };
                        HeapTimeTreeChunk.prototype.time = function () {
                            return this._time;
                        };
                        HeapTimeTreeChunk.prototype.id = function () {
                            return this._id;
                        };
                        HeapTimeTreeChunk.prototype.flags = function () {
                            return this._flags;
                        };
                        HeapTimeTreeChunk.prototype.setFlags = function (bitsToEnable, bitsToDisable) {
                            var val = this._flags;
                            var nval = val & ~bitsToDisable | bitsToEnable;
                            this._flags = nval;
                            return val != nval;
                        };
                        HeapTimeTreeChunk.prototype.size = function () {
                            return this._size;
                        };
                        HeapTimeTreeChunk.prototype.range = function (startKey, endKey, maxElements, walker) {
                            this.lock();
                            var nbElements = 0;
                            var indexEnd = this.internal_previousOrEqual_index(endKey);
                            while (indexEnd != -1 && this.key(indexEnd) >= startKey && nbElements < maxElements) {
                                walker(this.key(indexEnd));
                                nbElements++;
                                indexEnd = this.previous(indexEnd);
                            }
                            this.unlock();
                        };
                        HeapTimeTreeChunk.prototype.save = function (buffer) {
                            this.lock();
                            try {
                                if (this._root_index == -1) {
                                    return;
                                }
                                var isFirst = true;
                                for (var i = 0; i < this._size; i++) {
                                    if (!isFirst) {
                                        buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SEP);
                                    }
                                    else {
                                        isFirst = false;
                                    }
                                    org.mwg.plugin.Base64.encodeLongToBuffer(this._back_k[i], buffer);
                                }
                            }
                            finally {
                                this.unlock();
                            }
                        };
                        HeapTimeTreeChunk.prototype.load = function (buffer) {
                            if (buffer == null || buffer.length() == 0) {
                                return;
                            }
                            this._size = 0;
                            var cursor = 0;
                            var previous = 0;
                            var payloadSize = buffer.length();
                            while (cursor < payloadSize) {
                                var current = buffer.read(cursor);
                                if (current == org.mwg.core.CoreConstants.CHUNK_SUB_SEP) {
                                    this.internal_insert(org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, previous, cursor));
                                    previous = cursor + 1;
                                }
                                cursor++;
                            }
                            this.internal_insert(org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, previous, cursor));
                        };
                        HeapTimeTreeChunk.prototype.merge = function (buffer) {
                            this.lock();
                            var isDirty = false;
                            try {
                                var cursor = 0;
                                var previous = 0;
                                var payloadSize = buffer.length();
                                while (cursor < payloadSize) {
                                    var current = buffer.read(cursor);
                                    if (current == org.mwg.core.CoreConstants.CHUNK_SUB_SEP) {
                                        isDirty = isDirty || this.internal_insert(org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, previous, cursor));
                                        previous = cursor + 1;
                                    }
                                    cursor++;
                                }
                                isDirty = isDirty || this.internal_insert(org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, previous, cursor));
                            }
                            finally {
                                this.unlock();
                                if (isDirty) {
                                    this.internal_set_dirty();
                                }
                            }
                        };
                        HeapTimeTreeChunk.prototype.previousOrEqual = function (key) {
                            this.lock();
                            var resultKey;
                            try {
                                var result = this.internal_previousOrEqual_index(key);
                                if (result != -1) {
                                    resultKey = this.key(result);
                                }
                                else {
                                    resultKey = org.mwg.core.CoreConstants.NULL_LONG;
                                }
                            }
                            finally {
                                this.unlock();
                            }
                            return resultKey;
                        };
                        HeapTimeTreeChunk.prototype.magic = function () {
                            return this._magic;
                        };
                        HeapTimeTreeChunk.prototype.insert = function (p_key) {
                            var toSetDirty;
                            this.lock();
                            try {
                                toSetDirty = this.internal_insert(p_key);
                            }
                            finally {
                                this.unlock();
                            }
                            if (toSetDirty) {
                                this.internal_set_dirty();
                            }
                        };
                        HeapTimeTreeChunk.prototype.unsafe_insert = function (p_key) {
                            this.internal_insert(p_key);
                        };
                        HeapTimeTreeChunk.prototype.chunkType = function () {
                            return org.mwg.plugin.ChunkType.TIME_TREE_CHUNK;
                        };
                        HeapTimeTreeChunk.prototype.clearAt = function (max) {
                            this.lock();
                            try {
                                var previousValue = this._back_k;
                                this._back_k = new Float64Array(this._back_k.length);
                                this._back_meta = new Int32Array(this._back_k.length * HeapTimeTreeChunk.META_SIZE);
                                this._back_colors = [];
                                this._root_index = -1;
                                var _previousSize = this._size;
                                this._size = 0;
                                for (var i = 0; i < _previousSize; i++) {
                                    if (previousValue[i] != org.mwg.core.CoreConstants.NULL_LONG && previousValue[i] < max) {
                                        this.internal_insert(previousValue[i]);
                                    }
                                }
                            }
                            finally {
                                this.unlock();
                            }
                            this.internal_set_dirty();
                        };
                        HeapTimeTreeChunk.prototype.allocate = function (capacity) {
                            this._back_meta = new Int32Array(capacity * HeapTimeTreeChunk.META_SIZE);
                            this._back_k = new Float64Array(capacity);
                            this._back_colors = [];
                            this._threshold = (capacity * org.mwg.core.CoreConstants.MAP_LOAD_FACTOR);
                        };
                        HeapTimeTreeChunk.prototype.reallocate = function (newCapacity) {
                            this._threshold = (newCapacity * org.mwg.core.CoreConstants.MAP_LOAD_FACTOR);
                            var new_back_kv = new Float64Array(newCapacity);
                            if (this._back_k != null) {
                                java.lang.System.arraycopy(this._back_k, 0, new_back_kv, 0, this._size);
                            }
                            var new_back_colors = [];
                            if (this._back_colors != null) {
                                java.lang.System.arraycopy(this._back_colors, 0, new_back_colors, 0, this._size);
                                for (var i = this._size; i < newCapacity; i++) {
                                    new_back_colors[i] = false;
                                }
                            }
                            var new_back_meta = new Int32Array(newCapacity * HeapTimeTreeChunk.META_SIZE);
                            if (this._back_meta != null) {
                                java.lang.System.arraycopy(this._back_meta, 0, new_back_meta, 0, this._size * HeapTimeTreeChunk.META_SIZE);
                                for (var i = this._size * HeapTimeTreeChunk.META_SIZE; i < newCapacity * HeapTimeTreeChunk.META_SIZE; i++) {
                                    new_back_meta[i] = -1;
                                }
                            }
                            this._back_meta = new_back_meta;
                            this._back_k = new_back_kv;
                            this._back_colors = new_back_colors;
                        };
                        HeapTimeTreeChunk.prototype.key = function (p_currentIndex) {
                            if (p_currentIndex == -1) {
                                return -1;
                            }
                            return this._back_k[p_currentIndex];
                        };
                        HeapTimeTreeChunk.prototype.setKey = function (p_currentIndex, p_paramIndex) {
                            this._back_k[p_currentIndex] = p_paramIndex;
                        };
                        HeapTimeTreeChunk.prototype.value = function (p_currentIndex) {
                            if (p_currentIndex == -1) {
                                return -1;
                            }
                            return this._back_k[(p_currentIndex) + 1];
                        };
                        HeapTimeTreeChunk.prototype.setValue = function (p_currentIndex, p_paramIndex) {
                            this._back_k[(p_currentIndex) + 1] = p_paramIndex;
                        };
                        HeapTimeTreeChunk.prototype.left = function (p_currentIndex) {
                            if (p_currentIndex == -1) {
                                return -1;
                            }
                            return this._back_meta[p_currentIndex * HeapTimeTreeChunk.META_SIZE];
                        };
                        HeapTimeTreeChunk.prototype.setLeft = function (p_currentIndex, p_paramIndex) {
                            this._back_meta[p_currentIndex * HeapTimeTreeChunk.META_SIZE] = p_paramIndex;
                        };
                        HeapTimeTreeChunk.prototype.right = function (p_currentIndex) {
                            if (p_currentIndex == -1) {
                                return -1;
                            }
                            return this._back_meta[(p_currentIndex * HeapTimeTreeChunk.META_SIZE) + 1];
                        };
                        HeapTimeTreeChunk.prototype.setRight = function (p_currentIndex, p_paramIndex) {
                            this._back_meta[(p_currentIndex * HeapTimeTreeChunk.META_SIZE) + 1] = p_paramIndex;
                        };
                        HeapTimeTreeChunk.prototype.parent = function (p_currentIndex) {
                            if (p_currentIndex == -1) {
                                return -1;
                            }
                            return this._back_meta[(p_currentIndex * HeapTimeTreeChunk.META_SIZE) + 2];
                        };
                        HeapTimeTreeChunk.prototype.setParent = function (p_currentIndex, p_paramIndex) {
                            this._back_meta[(p_currentIndex * HeapTimeTreeChunk.META_SIZE) + 2] = p_paramIndex;
                        };
                        HeapTimeTreeChunk.prototype.color = function (p_currentIndex) {
                            if (p_currentIndex == -1) {
                                return true;
                            }
                            return this._back_colors[p_currentIndex];
                        };
                        HeapTimeTreeChunk.prototype.setColor = function (p_currentIndex, p_paramIndex) {
                            this._back_colors[p_currentIndex] = p_paramIndex;
                        };
                        HeapTimeTreeChunk.prototype.grandParent = function (p_currentIndex) {
                            if (p_currentIndex == -1) {
                                return -1;
                            }
                            if (this.parent(p_currentIndex) != -1) {
                                return this.parent(this.parent(p_currentIndex));
                            }
                            else {
                                return -1;
                            }
                        };
                        HeapTimeTreeChunk.prototype.sibling = function (p_currentIndex) {
                            if (this.parent(p_currentIndex) == -1) {
                                return -1;
                            }
                            else {
                                if (p_currentIndex == this.left(this.parent(p_currentIndex))) {
                                    return this.right(this.parent(p_currentIndex));
                                }
                                else {
                                    return this.left(this.parent(p_currentIndex));
                                }
                            }
                        };
                        HeapTimeTreeChunk.prototype.uncle = function (p_currentIndex) {
                            if (this.parent(p_currentIndex) != -1) {
                                return this.sibling(this.parent(p_currentIndex));
                            }
                            else {
                                return -1;
                            }
                        };
                        HeapTimeTreeChunk.prototype.previous = function (p_index) {
                            var p = p_index;
                            if (this.left(p) != -1) {
                                p = this.left(p);
                                while (this.right(p) != -1) {
                                    p = this.right(p);
                                }
                                return p;
                            }
                            else {
                                if (this.parent(p) != -1) {
                                    if (p == this.right(this.parent(p))) {
                                        return this.parent(p);
                                    }
                                    else {
                                        while (this.parent(p) != -1 && p == this.left(this.parent(p))) {
                                            p = this.parent(p);
                                        }
                                        return this.parent(p);
                                    }
                                }
                                else {
                                    return -1;
                                }
                            }
                        };
                        HeapTimeTreeChunk.prototype.internal_previousOrEqual_index = function (p_key) {
                            var p = this._root_index;
                            if (p == -1) {
                                return p;
                            }
                            while (p != -1) {
                                if (p_key == this.key(p)) {
                                    return p;
                                }
                                if (p_key > this.key(p)) {
                                    if (this.right(p) != -1) {
                                        p = this.right(p);
                                    }
                                    else {
                                        return p;
                                    }
                                }
                                else {
                                    if (this.left(p) != -1) {
                                        p = this.left(p);
                                    }
                                    else {
                                        var parent = this.parent(p);
                                        var ch = p;
                                        while (parent != -1 && ch == this.left(parent)) {
                                            ch = parent;
                                            parent = this.parent(parent);
                                        }
                                        return parent;
                                    }
                                }
                            }
                            return -1;
                        };
                        HeapTimeTreeChunk.prototype.rotateLeft = function (n) {
                            var r = this.right(n);
                            this.replaceNode(n, r);
                            this.setRight(n, this.left(r));
                            if (this.left(r) != -1) {
                                this.setParent(this.left(r), n);
                            }
                            this.setLeft(r, n);
                            this.setParent(n, r);
                        };
                        HeapTimeTreeChunk.prototype.rotateRight = function (n) {
                            var l = this.left(n);
                            this.replaceNode(n, l);
                            this.setLeft(n, this.right(l));
                            if (this.right(l) != -1) {
                                this.setParent(this.right(l), n);
                            }
                            this.setRight(l, n);
                            this.setParent(n, l);
                        };
                        HeapTimeTreeChunk.prototype.replaceNode = function (oldn, newn) {
                            if (this.parent(oldn) == -1) {
                                this._root_index = newn;
                            }
                            else {
                                if (oldn == this.left(this.parent(oldn))) {
                                    this.setLeft(this.parent(oldn), newn);
                                }
                                else {
                                    this.setRight(this.parent(oldn), newn);
                                }
                            }
                            if (newn != -1) {
                                this.setParent(newn, this.parent(oldn));
                            }
                        };
                        HeapTimeTreeChunk.prototype.insertCase1 = function (n) {
                            if (this.parent(n) == -1) {
                                this.setColor(n, true);
                            }
                            else {
                                this.insertCase2(n);
                            }
                        };
                        HeapTimeTreeChunk.prototype.insertCase2 = function (n) {
                            if (!this.color(this.parent(n))) {
                                this.insertCase3(n);
                            }
                        };
                        HeapTimeTreeChunk.prototype.insertCase3 = function (n) {
                            if (!this.color(this.uncle(n))) {
                                this.setColor(this.parent(n), true);
                                this.setColor(this.uncle(n), true);
                                this.setColor(this.grandParent(n), false);
                                this.insertCase1(this.grandParent(n));
                            }
                            else {
                                this.insertCase4(n);
                            }
                        };
                        HeapTimeTreeChunk.prototype.insertCase4 = function (n_n) {
                            var n = n_n;
                            if (n == this.right(this.parent(n)) && this.parent(n) == this.left(this.grandParent(n))) {
                                this.rotateLeft(this.parent(n));
                                n = this.left(n);
                            }
                            else {
                                if (n == this.left(this.parent(n)) && this.parent(n) == this.right(this.grandParent(n))) {
                                    this.rotateRight(this.parent(n));
                                    n = this.right(n);
                                }
                            }
                            this.insertCase5(n);
                        };
                        HeapTimeTreeChunk.prototype.insertCase5 = function (n) {
                            this.setColor(this.parent(n), true);
                            this.setColor(this.grandParent(n), false);
                            if (n == this.left(this.parent(n)) && this.parent(n) == this.left(this.grandParent(n))) {
                                this.rotateRight(this.grandParent(n));
                            }
                            else {
                                this.rotateLeft(this.grandParent(n));
                            }
                        };
                        HeapTimeTreeChunk.prototype.internal_insert = function (p_key) {
                            if ((this._size + 1) > this._threshold) {
                                var length = (this._size == 0 ? 1 : this._size * 2);
                                this.reallocate(length);
                            }
                            var newIndex = this._size;
                            if (newIndex == 0) {
                                this.setKey(newIndex, p_key);
                                this.setColor(newIndex, false);
                                this.setLeft(newIndex, -1);
                                this.setRight(newIndex, -1);
                                this.setParent(newIndex, -1);
                                this._root_index = newIndex;
                                this._size = 1;
                            }
                            else {
                                var n = this._root_index;
                                while (true) {
                                    if (p_key == this.key(n)) {
                                        return false;
                                    }
                                    else {
                                        if (p_key < this.key(n)) {
                                            if (this.left(n) == -1) {
                                                this.setKey(newIndex, p_key);
                                                this.setColor(newIndex, false);
                                                this.setLeft(newIndex, -1);
                                                this.setRight(newIndex, -1);
                                                this.setParent(newIndex, -1);
                                                this.setLeft(n, newIndex);
                                                this._size++;
                                                break;
                                            }
                                            else {
                                                n = this.left(n);
                                            }
                                        }
                                        else {
                                            if (this.right(n) == -1) {
                                                this.setKey(newIndex, p_key);
                                                this.setColor(newIndex, false);
                                                this.setLeft(newIndex, -1);
                                                this.setRight(newIndex, -1);
                                                this.setParent(newIndex, -1);
                                                this.setRight(n, newIndex);
                                                this._size++;
                                                break;
                                            }
                                            else {
                                                n = this.right(n);
                                            }
                                        }
                                    }
                                }
                                this.setParent(newIndex, n);
                            }
                            this.insertCase1(newIndex);
                            return true;
                        };
                        HeapTimeTreeChunk.prototype.internal_set_dirty = function () {
                            this._magic = this._magic + 1;
                            if (this._listener != null) {
                                if ((this._flags & org.mwg.core.CoreConstants.DIRTY_BIT) != org.mwg.core.CoreConstants.DIRTY_BIT) {
                                    this._listener.declareDirty(this);
                                }
                            }
                        };
                        HeapTimeTreeChunk.META_SIZE = 3;
                        return HeapTimeTreeChunk;
                    }());
                    heap.HeapTimeTreeChunk = HeapTimeTreeChunk;
                    var HeapWorldOrderChunk = (function () {
                        function HeapWorldOrderChunk(p_universe, p_time, p_obj, p_listener, initialPayload) {
                            this._world = p_universe;
                            this._time = p_time;
                            this._id = p_obj;
                            this._flags = 0;
                            this._marks = 0;
                            this._lock = 0;
                            this._magic = 0;
                            this._extra = org.mwg.core.CoreConstants.NULL_LONG;
                            this._listener = p_listener;
                            if (initialPayload != null && initialPayload.length() > 0) {
                                this.load(initialPayload);
                            }
                            else {
                                var initialCapacity = org.mwg.core.CoreConstants.MAP_INITIAL_CAPACITY;
                                var newstate = new org.mwg.core.chunk.heap.HeapWorldOrderChunk.InternalState(initialCapacity, new Float64Array(initialCapacity * 2), new Int32Array(initialCapacity), new Int32Array(initialCapacity), 0);
                                for (var i = 0; i < initialCapacity; i++) {
                                    newstate.elementNext[i] = -1;
                                    newstate.elementHash[i] = -1;
                                }
                                this.state = newstate;
                            }
                        }

                        HeapWorldOrderChunk.prototype.world = function () {
                            return this._world;
                        };
                        HeapWorldOrderChunk.prototype.time = function () {
                            return this._time;
                        };
                        HeapWorldOrderChunk.prototype.id = function () {
                            return this._id;
                        };
                        HeapWorldOrderChunk.prototype.extra = function () {
                            return this._extra;
                        };
                        HeapWorldOrderChunk.prototype.setExtra = function (extraValue) {
                            this._extra = extraValue;
                        };
                        HeapWorldOrderChunk.prototype.lock = function () {
                        };
                        HeapWorldOrderChunk.prototype.unlock = function () {
                        };
                        HeapWorldOrderChunk.prototype.marks = function () {
                            return this._marks;
                        };
                        HeapWorldOrderChunk.prototype.mark = function () {
                            this._marks = this._marks + 1;
                            return this._marks;
                        };
                        HeapWorldOrderChunk.prototype.unmark = function () {
                            this._marks = this._marks - 1;
                            return this._marks;
                        };
                        HeapWorldOrderChunk.prototype.magic = function () {
                            return this._magic;
                        };
                        HeapWorldOrderChunk.prototype.rehashCapacity = function (capacity, previousState) {
                            var length = (capacity == 0 ? 1 : capacity * 2);
                            var newElementKV = new Float64Array(length * 2);
                            java.lang.System.arraycopy(previousState.elementKV, 0, newElementKV, 0, previousState.elementKV.length);
                            var newElementNext = new Int32Array(length);
                            var newElementHash = new Int32Array(length);
                            for (var i = 0; i < length; i++) {
                                newElementNext[i] = -1;
                                newElementHash[i] = -1;
                            }
                            for (var i = 0; i < previousState.elementNext.length; i++) {
                                if (previousState.elementNext[i] != -1) {
                                    var index = org.mwg.core.utility.PrimitiveHelper.longHash(previousState.elementKV[i * 2], length);
                                    var currentHashedIndex = newElementHash[index];
                                    if (currentHashedIndex != -1) {
                                        newElementNext[i] = currentHashedIndex;
                                    }
                                    else {
                                        newElementNext[i] = -2;
                                    }
                                    newElementHash[index] = i;
                                }
                            }
                            this.state = new org.mwg.core.chunk.heap.HeapWorldOrderChunk.InternalState(length, newElementKV, newElementNext, newElementHash, previousState.elementCount);
                        };
                        HeapWorldOrderChunk.prototype.each = function (callback) {
                            var internalState = this.state;
                            for (var i = 0; i < internalState.elementCount; i++) {
                                callback(internalState.elementKV[i * 2], internalState.elementKV[i * 2 + 1]);
                            }
                        };
                        HeapWorldOrderChunk.prototype.get = function (key) {
                            var internalState = this.state;
                            if (internalState.elementDataSize == 0) {
                                return org.mwg.core.CoreConstants.NULL_LONG;
                            }
                            var index = org.mwg.core.utility.PrimitiveHelper.longHash(key, internalState.elementDataSize);
                            var m = internalState.elementHash[index];
                            while (m >= 0) {
                                if (key == internalState.elementKV[m * 2]) {
                                    return internalState.elementKV[(m * 2) + 1];
                                }
                                else {
                                    m = internalState.elementNext[m];
                                }
                            }
                            return org.mwg.core.CoreConstants.NULL_LONG;
                        };
                        HeapWorldOrderChunk.prototype.put = function (key, value) {
                            var internalState = this.state;
                            if (internalState == null) {
                                internalState = new org.mwg.core.chunk.heap.HeapWorldOrderChunk.InternalState(0, new Float64Array(0), new Int32Array(0), new Int32Array(0), 0);
                            }
                            var entry = -1;
                            var index = -1;
                            if (internalState.elementDataSize != 0) {
                                index = org.mwg.core.utility.PrimitiveHelper.longHash(key, internalState.elementDataSize);
                                entry = this.findNonNullKeyEntry(key, index, internalState);
                            }
                            if (entry == -1) {
                                if (++internalState.elementCount > internalState.threshold) {
                                    this.rehashCapacity(internalState.elementDataSize, internalState);
                                    internalState = this.state;
                                    index = org.mwg.core.utility.PrimitiveHelper.longHash(key, internalState.elementDataSize);
                                }
                                var newIndex = (internalState.elementCount - 1);
                                internalState.elementKV[newIndex * 2] = key;
                                internalState.elementKV[newIndex * 2 + 1] = value;
                                var currentHashedIndex = internalState.elementHash[index];
                                if (currentHashedIndex != -1) {
                                    internalState.elementNext[newIndex] = currentHashedIndex;
                                }
                                else {
                                    internalState.elementNext[newIndex] = -2;
                                }
                                internalState.elementHash[index] = newIndex;
                                this.internal_set_dirty();
                            }
                            else {
                                if (internalState.elementKV[entry + 1] != value) {
                                    internalState.elementKV[entry + 1] = value;
                                    this.internal_set_dirty();
                                }
                            }
                        };
                        HeapWorldOrderChunk.prototype.merge = function (buffer) {
                            var cursor = 0;
                            var bufferSize = buffer.length();
                            var initDone = false;
                            var previousStart = 0;
                            var loopKey = org.mwg.core.CoreConstants.NULL_LONG;
                            while (cursor < bufferSize) {
                                if (buffer.read(cursor) == org.mwg.core.CoreConstants.CHUNK_SEP) {
                                    if (!initDone) {
                                        initDone = true;
                                    }
                                    else {
                                        this._extra = org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, previousStart, cursor);
                                    }
                                    previousStart = cursor + 1;
                                }
                                else {
                                    if (buffer.read(cursor) == org.mwg.core.CoreConstants.CHUNK_SUB_SEP) {
                                        if (loopKey != org.mwg.core.CoreConstants.NULL_LONG) {
                                            var loopValue = org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, previousStart, cursor);
                                            this.put(loopKey, loopValue);
                                            loopKey = org.mwg.core.CoreConstants.NULL_LONG;
                                        }
                                        previousStart = cursor + 1;
                                    }
                                    else {
                                        if (buffer.read(cursor) == org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SEP) {
                                            loopKey = org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, previousStart, cursor);
                                            previousStart = cursor + 1;
                                        }
                                    }
                                }
                                cursor++;
                            }
                            if (loopKey != org.mwg.core.CoreConstants.NULL_LONG) {
                                var loopValue = org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, previousStart, cursor);
                                this.put(loopKey, loopValue);
                            }
                        };
                        HeapWorldOrderChunk.prototype.findNonNullKeyEntry = function (key, index, internalState) {
                            var m = internalState.elementHash[index];
                            while (m >= 0) {
                                if (key == internalState.elementKV[m * 2]) {
                                    return m;
                                }
                                m = internalState.elementNext[m];
                            }
                            return -1;
                        };
                        HeapWorldOrderChunk.prototype.remove = function (key) {
                            throw new Error("Not implemented yet!!!");
                        };
                        HeapWorldOrderChunk.prototype.size = function () {
                            return this.state.elementCount;
                        };
                        HeapWorldOrderChunk.prototype.load = function (buffer) {
                            if (buffer == null || buffer.length() == 0) {
                                return;
                            }
                            var cursor = 0;
                            var loopKey = org.mwg.core.CoreConstants.NULL_LONG;
                            var previousStart = -1;
                            var capacity = -1;
                            var insertIndex = 0;
                            var temp_state = null;
                            var bufferSize = buffer.length();
                            var initDone = false;
                            while (cursor < bufferSize) {
                                if (buffer.read(cursor) == org.mwg.core.CoreConstants.CHUNK_SEP) {
                                    if (!initDone) {
                                        var size = org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, 0, cursor);
                                        if (size == 0) {
                                            capacity = 1;
                                        }
                                        else {
                                            capacity = size * 2;
                                        }
                                        var newElementKV = new Float64Array((capacity * 2));
                                        var newElementNext = new Int32Array(capacity);
                                        var newElementHash = new Int32Array(capacity);
                                        for (var i = 0; i < capacity; i++) {
                                            newElementNext[i] = -1;
                                            newElementHash[i] = -1;
                                        }
                                        temp_state = new org.mwg.core.chunk.heap.HeapWorldOrderChunk.InternalState(capacity, newElementKV, newElementNext, newElementHash, size);
                                        initDone = true;
                                    }
                                    else {
                                        this._extra = org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, previousStart, cursor);
                                    }
                                    previousStart = cursor + 1;
                                }
                                else {
                                    if (buffer.read(cursor) == org.mwg.core.CoreConstants.CHUNK_SUB_SEP && temp_state != null) {
                                        if (loopKey != org.mwg.core.CoreConstants.NULL_LONG) {
                                            var loopValue = org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, previousStart, cursor);
                                            temp_state.elementKV[insertIndex * 2] = loopKey;
                                            temp_state.elementKV[insertIndex * 2 + 1] = loopValue;
                                            var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(loopKey, capacity);
                                            var currentHashedIndex = temp_state.elementHash[hashIndex];
                                            if (currentHashedIndex != -1) {
                                                temp_state.elementNext[insertIndex] = currentHashedIndex;
                                            }
                                            temp_state.elementHash[hashIndex] = insertIndex;
                                            insertIndex++;
                                            loopKey = org.mwg.core.CoreConstants.NULL_LONG;
                                        }
                                        previousStart = cursor + 1;
                                    }
                                    else {
                                        if (buffer.read(cursor) == org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SEP) {
                                            loopKey = org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, previousStart, cursor);
                                            previousStart = cursor + 1;
                                        }
                                    }
                                }
                                cursor++;
                            }
                            if (loopKey != org.mwg.core.CoreConstants.NULL_LONG && temp_state != null) {
                                var loopValue = org.mwg.plugin.Base64.decodeToLongWithBounds(buffer, previousStart, cursor);
                                temp_state.elementKV[insertIndex * 2] = loopKey;
                                temp_state.elementKV[insertIndex * 2 + 1] = loopValue;
                                var hashIndex = org.mwg.core.utility.PrimitiveHelper.longHash(loopKey, capacity);
                                var currentHashedIndex = temp_state.elementHash[hashIndex];
                                if (currentHashedIndex != -1) {
                                    temp_state.elementNext[insertIndex] = currentHashedIndex;
                                }
                                temp_state.elementHash[hashIndex] = insertIndex;
                            }
                            if (temp_state != null) {
                                this.state = temp_state;
                            }
                        };
                        HeapWorldOrderChunk.prototype.save = function (buffer) {
                            var internalState = this.state;
                            org.mwg.plugin.Base64.encodeLongToBuffer(internalState.elementCount, buffer);
                            buffer.write(org.mwg.core.CoreConstants.CHUNK_SEP);
                            if (this._extra != org.mwg.core.CoreConstants.NULL_LONG) {
                                org.mwg.plugin.Base64.encodeLongToBuffer(this._extra, buffer);
                                buffer.write(org.mwg.core.CoreConstants.CHUNK_SEP);
                            }
                            var isFirst = true;
                            for (var i = 0; i < internalState.elementCount; i++) {
                                var loopKey = internalState.elementKV[i * 2];
                                var loopValue = internalState.elementKV[i * 2 + 1];
                                if (!isFirst) {
                                    buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SEP);
                                }
                                isFirst = false;
                                org.mwg.plugin.Base64.encodeLongToBuffer(loopKey, buffer);
                                buffer.write(org.mwg.core.CoreConstants.CHUNK_SUB_SUB_SEP);
                                org.mwg.plugin.Base64.encodeLongToBuffer(loopValue, buffer);
                            }
                        };
                        HeapWorldOrderChunk.prototype.chunkType = function () {
                            return org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK;
                        };
                        HeapWorldOrderChunk.prototype.internal_set_dirty = function () {
                            this._magic = this._magic + 1;
                            if (this._listener != null) {
                                if ((this._flags & org.mwg.core.CoreConstants.DIRTY_BIT) != org.mwg.core.CoreConstants.DIRTY_BIT) {
                                    this._listener.declareDirty(this);
                                }
                            }
                        };
                        HeapWorldOrderChunk.prototype.flags = function () {
                            return this._flags;
                        };
                        HeapWorldOrderChunk.prototype.setFlags = function (bitsToEnable, bitsToDisable) {
                            var val = this._flags;
                            var nval = val & ~bitsToDisable | bitsToEnable;
                            this._flags = nval;
                            return val != nval;
                        };
                        return HeapWorldOrderChunk;
                    }());
                    heap.HeapWorldOrderChunk = HeapWorldOrderChunk;
                    var HeapWorldOrderChunk;
                    (function (HeapWorldOrderChunk) {
                        var InternalState = (function () {
                            function InternalState(elementDataSize, elementKV, elementNext, elementHash, elemCount) {
                                this.elementDataSize = elementDataSize;
                                this.elementKV = elementKV;
                                this.elementNext = elementNext;
                                this.elementHash = elementHash;
                                this.threshold = (elementDataSize * org.mwg.core.CoreConstants.MAP_LOAD_FACTOR);
                                this.elementCount = elemCount;
                            }

                            return InternalState;
                        }());
                        HeapWorldOrderChunk.InternalState = InternalState;
                    })(HeapWorldOrderChunk = heap.HeapWorldOrderChunk || (heap.HeapWorldOrderChunk = {}));
                })(heap = chunk_1.heap || (chunk_1.heap = {}));
            })(chunk = core.chunk || (core.chunk = {}));
            var CoreConstants = (function (_super) {
                __extends(CoreConstants, _super);
                function CoreConstants() {
                    _super.apply(this, arguments);
                }

                CoreConstants.CHUNK_SEP = "|".charCodeAt(0);
                CoreConstants.CHUNK_SUB_SEP = ",".charCodeAt(0);
                CoreConstants.CHUNK_SUB_SUB_SEP = ":".charCodeAt(0);
                CoreConstants.CHUNK_SUB_SUB_SUB_SEP = "%".charCodeAt(0);
                CoreConstants.DIRTY_BIT = 0x01;
                CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX = 0;
                CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX = 1;
                CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX = 2;
                CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC = 3;
                CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC = 4;
                CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC = 5;
                CoreConstants.PREFIX_TO_SAVE_SIZE = 2;
                CoreConstants.NULL_KEY = new Float64Array([org.mwg.Constants.END_OF_TIME, org.mwg.Constants.END_OF_TIME, org.mwg.Constants.END_OF_TIME]);
                CoreConstants.GLOBAL_UNIVERSE_KEY = new Float64Array([org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG]);
                CoreConstants.GLOBAL_DICTIONARY_KEY = new Float64Array([org.mwg.Constants.NULL_LONG, 0, 0]);
                CoreConstants.GLOBAL_INDEX_KEY = new Float64Array([org.mwg.Constants.NULL_LONG, 1, 0]);
                CoreConstants.INDEX_ATTRIBUTE = "index";
                CoreConstants.MAP_INITIAL_CAPACITY = 16;
                CoreConstants.MAP_LOAD_FACTOR = (75 / 100);
                CoreConstants.DISCONNECTED_ERROR = "Please connect your graph, prior to any usage of it";
                CoreConstants.OFFHEAP_NULL_PTR = -1;
                CoreConstants.OFFHEAP_CHUNK_INDEX_WORLD = 0;
                CoreConstants.OFFHEAP_CHUNK_INDEX_TIME = 1;
                CoreConstants.OFFHEAP_CHUNK_INDEX_ID = 2;
                CoreConstants.OFFHEAP_CHUNK_INDEX_TYPE = 3;
                CoreConstants.OFFHEAP_CHUNK_INDEX_FLAGS = 4;
                CoreConstants.OFFHEAP_CHUNK_INDEX_MARKS = 5;
                CoreConstants.SCALE_1 = 1000;
                CoreConstants.SCALE_2 = 10000;
                CoreConstants.SCALE_3 = 100000;
                CoreConstants.SCALE_4 = 1000000;
                CoreConstants.DEAD_NODE_ERROR = "This Node has been tagged destroyed, please don't use it anymore!";
                CoreConstants.BOOL_TRUE = "1".charCodeAt(0);
                CoreConstants.BOOL_FALSE = "0".charCodeAt(0);
                return CoreConstants;
            }(org.mwg.Constants));
            core.CoreConstants = CoreConstants;
            var CoreGraph = (function () {
                function CoreGraph(p_storage, p_space, p_scheduler, p_resolver, p_plugins) {
                    this.offHeapBuffer = false;
                    this._prefix = null;
                    this._nodeKeyCalculator = null;
                    this._worldKeyCalculator = null;
                    this._storage = p_storage;
                    this._space = p_space;
                    this._space.setGraph(this);
                    this._scheduler = p_scheduler;
                    this._resolver = p_resolver;
                    this._taskActions = new java.util.HashMap();
                    org.mwg.core.task.CoreTask.fillDefault(this._taskActions);
                    if (p_plugins != null) {
                        this._nodeTypes = new java.util.HashMap();
                        for (var i = 0; i < p_plugins.length; i++) {
                            var loopPlugin = p_plugins[i];
                            var plugin_names = loopPlugin.nodeTypes();
                            for (var j = 0; j < plugin_names.length; j++) {
                                var plugin_name = plugin_names[j];
                                this._nodeTypes.put(this._resolver.stringToHash(plugin_name, false), loopPlugin.nodeType(plugin_name));
                            }
                            var task_names = loopPlugin.taskActionTypes();
                            for (var j = 0; j < task_names.length; j++) {
                                var task_name = task_names[j];
                                this._taskActions.put(task_name, loopPlugin.taskActionType(task_name));
                            }
                        }
                    }
                    else {
                        this._nodeTypes = null;
                    }
                    this._isConnected = new java.util.concurrent.atomic.AtomicBoolean(false);
                    this._lock = new java.util.concurrent.atomic.AtomicBoolean(false);
                }

                CoreGraph.prototype.fork = function (world) {
                    var childWorld = this._worldKeyCalculator.newKey();
                    this._resolver.initWorld(world, childWorld);
                    return childWorld;
                };
                CoreGraph.prototype.newNode = function (world, time) {
                    if (!this._isConnected.get()) {
                        throw new Error(org.mwg.core.CoreConstants.DISCONNECTED_ERROR);
                    }
                    var initPreviouslyResolved = new Float64Array(6);
                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = world;
                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = time;
                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = time;
                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = org.mwg.Constants.NULL_LONG;
                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = org.mwg.Constants.NULL_LONG;
                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = org.mwg.Constants.NULL_LONG;
                    var newNode = new org.mwg.core.CoreNode(world, time, this._nodeKeyCalculator.newKey(), this, initPreviouslyResolved);
                    this._resolver.initNode(newNode, org.mwg.Constants.NULL_LONG);
                    return newNode;
                };
                CoreGraph.prototype.newTypedNode = function (world, time, nodeType) {
                    if (nodeType == null) {
                        throw new Error("nodeType should not be null");
                    }
                    if (!this._isConnected.get()) {
                        throw new Error(org.mwg.core.CoreConstants.DISCONNECTED_ERROR);
                    }
                    var initPreviouslyResolved = new Float64Array(6);
                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = world;
                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = time;
                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = time;
                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = org.mwg.Constants.NULL_LONG;
                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = org.mwg.Constants.NULL_LONG;
                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = org.mwg.Constants.NULL_LONG;
                    var extraCode = this._resolver.stringToHash(nodeType, false);
                    var resolvedFactory = this.factoryByCode(extraCode);
                    var newNode;
                    if (resolvedFactory == null) {
                        console.log("WARNING: UnKnow NodeType " + nodeType + ", missing plugin configuration in the builder ? Using generic node as a fallback");
                        newNode = new org.mwg.core.CoreNode(world, time, this._nodeKeyCalculator.newKey(), this, initPreviouslyResolved);
                    }
                    else {
                        newNode = resolvedFactory(world, time, this._nodeKeyCalculator.newKey(), this, initPreviouslyResolved);
                    }
                    this._resolver.initNode(newNode, extraCode);
                    return newNode;
                };
                CoreGraph.prototype.cloneNode = function (origin) {
                    if (origin == null) {
                        throw new Error("origin node should not be null");
                    }
                    if (!this._isConnected.get()) {
                        throw new Error(org.mwg.core.CoreConstants.DISCONNECTED_ERROR);
                    }
                    var castedOrigin = origin;
                    var initPreviouslyResolved = castedOrigin._previousResolveds.get();
                    if (initPreviouslyResolved == null) {
                        throw new Error(org.mwg.core.CoreConstants.DEAD_NODE_ERROR + " node id: " + origin.id());
                    }
                    var typeCode = this._resolver.markNodeAndGetType(origin);
                    var resolvedFactory = this.factoryByCode(typeCode);
                    var newNode;
                    if (resolvedFactory == null) {
                        newNode = new org.mwg.core.CoreNode(castedOrigin.world(), castedOrigin.time(), castedOrigin.id(), this, initPreviouslyResolved);
                    }
                    else {
                        newNode = resolvedFactory(castedOrigin.world(), castedOrigin.time(), castedOrigin.id(), this, initPreviouslyResolved);
                    }
                    return newNode;
                };
                CoreGraph.prototype.factoryByCode = function (code) {
                    if (this._nodeTypes != null && code != org.mwg.Constants.NULL_LONG) {
                        return this._nodeTypes.get(code);
                    }
                    else {
                        return null;
                    }
                };
                CoreGraph.prototype.taskAction = function (taskActionName) {
                    if (this._taskActions != null && taskActionName != null) {
                        return this._taskActions.get(taskActionName);
                    }
                    else {
                        return null;
                    }
                };
                CoreGraph.prototype.lookup = function (world, time, id, callback) {
                    if (!this._isConnected.get()) {
                        throw new Error(org.mwg.core.CoreConstants.DISCONNECTED_ERROR);
                    }
                    this._resolver.lookup(world, time, id, callback);
                };
                CoreGraph.prototype.save = function (callback) {
                    var dirtyIterator = this._space.detachDirties();
                    this.saveDirtyList(dirtyIterator, callback);
                };
                CoreGraph.prototype.connect = function (callback) {
                    var _this = this;
                    while (this._lock.compareAndSet(false, true)) {
                    }
                    if (this._isConnected.compareAndSet(false, true)) {
                        this._scheduler.start();
                        var selfPointer = this;
                        this._storage.connect(this, function (connection) {
                            selfPointer._storage.lock(function (prefixBuf) {
                                _this._prefix = org.mwg.plugin.Base64.decodeToIntWithBounds(prefixBuf, 0, prefixBuf.length());
                                prefixBuf.free();
                                var connectionKeys = selfPointer.newBuffer();
                                org.mwg.core.utility.BufferBuilder.keyToBuffer(connectionKeys, org.mwg.plugin.ChunkType.GEN_CHUNK, org.mwg.Constants.BEGINNING_OF_TIME, org.mwg.Constants.NULL_LONG, _this._prefix);
                                connectionKeys.write(org.mwg.core.CoreConstants.BUFFER_SEP);
                                org.mwg.core.utility.BufferBuilder.keyToBuffer(connectionKeys, org.mwg.plugin.ChunkType.GEN_CHUNK, org.mwg.Constants.END_OF_TIME, org.mwg.Constants.NULL_LONG, _this._prefix);
                                connectionKeys.write(org.mwg.core.CoreConstants.BUFFER_SEP);
                                org.mwg.core.utility.BufferBuilder.keyToBuffer(connectionKeys, org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG);
                                connectionKeys.write(org.mwg.core.CoreConstants.BUFFER_SEP);
                                org.mwg.core.utility.BufferBuilder.keyToBuffer(connectionKeys, org.mwg.plugin.ChunkType.STATE_CHUNK, org.mwg.core.CoreConstants.GLOBAL_DICTIONARY_KEY[0], org.mwg.core.CoreConstants.GLOBAL_DICTIONARY_KEY[1], org.mwg.core.CoreConstants.GLOBAL_DICTIONARY_KEY[2]);
                                connectionKeys.write(org.mwg.core.CoreConstants.BUFFER_SEP);
                                selfPointer._storage.get(connectionKeys, function (payloads) {
                                    connectionKeys.free();
                                    if (payloads != null) {
                                        var it = payloads.iterator();
                                        var view1 = it.next();
                                        var view2 = it.next();
                                        var view3 = it.next();
                                        var view4 = it.next();
                                        var noError = true;
                                        try {
                                            var globalWorldOrder;
                                            if (view3.length() > 0) {
                                                globalWorldOrder = selfPointer._space.create(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, view3, null);
                                            }
                                            else {
                                                globalWorldOrder = selfPointer._space.create(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, null, null);
                                            }
                                            selfPointer._space.putAndMark(globalWorldOrder);
                                            var globalDictionaryChunk;
                                            if (view4.length() > 0) {
                                                globalDictionaryChunk = selfPointer._space.create(org.mwg.plugin.ChunkType.STATE_CHUNK, org.mwg.core.CoreConstants.GLOBAL_DICTIONARY_KEY[0], org.mwg.core.CoreConstants.GLOBAL_DICTIONARY_KEY[1], org.mwg.core.CoreConstants.GLOBAL_DICTIONARY_KEY[2], view4, null);
                                            }
                                            else {
                                                globalDictionaryChunk = selfPointer._space.create(org.mwg.plugin.ChunkType.STATE_CHUNK, org.mwg.core.CoreConstants.GLOBAL_DICTIONARY_KEY[0], org.mwg.core.CoreConstants.GLOBAL_DICTIONARY_KEY[1], org.mwg.core.CoreConstants.GLOBAL_DICTIONARY_KEY[2], null, null);
                                            }
                                            selfPointer._space.putAndMark(globalDictionaryChunk);
                                            if (view2.length() > 0) {
                                                selfPointer._worldKeyCalculator = selfPointer._space.create(org.mwg.plugin.ChunkType.GEN_CHUNK, org.mwg.Constants.END_OF_TIME, org.mwg.Constants.NULL_LONG, _this._prefix, view2, null);
                                            }
                                            else {
                                                selfPointer._worldKeyCalculator = selfPointer._space.create(org.mwg.plugin.ChunkType.GEN_CHUNK, org.mwg.Constants.END_OF_TIME, org.mwg.Constants.NULL_LONG, _this._prefix, null, null);
                                            }
                                            selfPointer._space.putAndMark(selfPointer._worldKeyCalculator);
                                            if (view1.length() > 0) {
                                                selfPointer._nodeKeyCalculator = selfPointer._space.create(org.mwg.plugin.ChunkType.GEN_CHUNK, org.mwg.Constants.BEGINNING_OF_TIME, org.mwg.Constants.NULL_LONG, _this._prefix, view1, null);
                                            }
                                            else {
                                                selfPointer._nodeKeyCalculator = selfPointer._space.create(org.mwg.plugin.ChunkType.GEN_CHUNK, org.mwg.Constants.BEGINNING_OF_TIME, org.mwg.Constants.NULL_LONG, _this._prefix, null, null);
                                            }
                                            selfPointer._space.putAndMark(selfPointer._nodeKeyCalculator);
                                            selfPointer._resolver.init(selfPointer);
                                        }
                                        catch ($ex$) {
                                            if ($ex$ instanceof Error) {
                                                var e = $ex$;
                                                console.error(e);
                                                noError = false;
                                            }
                                            else {
                                                throw $ex$;
                                            }
                                        }
                                        payloads.free();
                                        selfPointer._lock.set(true);
                                        if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                            callback(noError);
                                        }
                                    }
                                    else {
                                        selfPointer._lock.set(true);
                                        if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                            callback(false);
                                        }
                                    }
                                });
                            });
                        });
                    }
                    else {
                        this._lock.set(true);
                        if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                            callback(null);
                        }
                    }
                };
                CoreGraph.prototype.disconnect = function (callback) {
                    while (this._lock.compareAndSet(false, true)) {
                    }
                    if (this._isConnected.compareAndSet(true, false)) {
                        var selfPointer = this;
                        selfPointer._scheduler.stop();
                        this.save(function (result) {
                            selfPointer._space.free();
                            if (selfPointer._storage != null) {
                                var prefixBuf = selfPointer.newBuffer();
                                org.mwg.plugin.Base64.encodeIntToBuffer(selfPointer._prefix, prefixBuf);
                                selfPointer._storage.unlock(prefixBuf, function (result) {
                                    prefixBuf.free();
                                    selfPointer._storage.disconnect(function (result) {
                                        selfPointer._lock.set(true);
                                        if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                            callback(result);
                                        }
                                    });
                                });
                            }
                            else {
                                selfPointer._lock.set(true);
                                if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                    callback(result);
                                }
                            }
                        });
                    }
                    else {
                        this._lock.set(true);
                        if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                            callback(null);
                        }
                    }
                };
                CoreGraph.prototype.newBuffer = function () {
                    if (this.offHeapBuffer) {
                        return org.mwg.core.utility.BufferBuilder.newOffHeapBuffer();
                    }
                    else {
                        return org.mwg.core.utility.BufferBuilder.newHeapBuffer();
                    }
                };
                CoreGraph.prototype.newTask = function () {
                    return new org.mwg.core.task.CoreTask(this);
                };
                CoreGraph.prototype.newTaskContext = function () {
                    return new org.mwg.core.task.CoreTaskContext(null, null, this, new Array(0));
                };
                CoreGraph.prototype.newQuery = function () {
                    return new org.mwg.core.CoreQuery(this._resolver);
                };
                CoreGraph.prototype.saveDirtyList = function (dirtyIterator, callback) {
                    if (dirtyIterator.size() == 0) {
                        dirtyIterator.free();
                        if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                            callback(null);
                        }
                    }
                    else {
                        var isNoop = this._storage instanceof org.mwg.core.BlackHoleStorage;
                        var stream = this.newBuffer();
                        var isFirst = true;
                        while (dirtyIterator.hasNext()) {
                            var loopChunk = dirtyIterator.next();
                            if (loopChunk != null && (loopChunk.flags() & org.mwg.core.CoreConstants.DIRTY_BIT) == org.mwg.core.CoreConstants.DIRTY_BIT) {
                                if (!isNoop) {
                                    if (isFirst) {
                                        isFirst = false;
                                    }
                                    else {
                                        stream.write(org.mwg.core.CoreConstants.BUFFER_SEP);
                                    }
                                    org.mwg.core.utility.BufferBuilder.keyToBuffer(stream, loopChunk.chunkType(), loopChunk.world(), loopChunk.time(), loopChunk.id());
                                }
                                stream.write(org.mwg.core.CoreConstants.BUFFER_SEP);
                                try {
                                    if (!isNoop) {
                                        loopChunk.save(stream);
                                    }
                                    this._space.declareClean(loopChunk);
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof Error) {
                                        var e = $ex$;
                                        console.error(e);
                                    }
                                    else {
                                        throw $ex$;
                                    }
                                }
                            }
                        }
                        this._storage.put(stream, function (result) {
                            stream.free();
                            dirtyIterator.free();
                            if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                callback(result);
                            }
                        });
                    }
                };
                CoreGraph.prototype.index = function (indexName, toIndexNode, flatKeyAttributes, callback) {
                    if (indexName == null) {
                        throw new Error("indexName should not be null");
                    }
                    if (toIndexNode == null) {
                        throw new Error("toIndexNode should not be null");
                    }
                    if (flatKeyAttributes == null) {
                        throw new Error("flatKeyAttributes should not be null");
                    }
                    this.getIndexOrCreate(toIndexNode.world(), toIndexNode.time(), indexName, function (foundIndex) {
                        if (foundIndex == null) {
                            throw new Error("Index creation failed, cache is probably full !!!");
                        }
                        foundIndex.index(org.mwg.core.CoreConstants.INDEX_ATTRIBUTE, toIndexNode, flatKeyAttributes, function (result) {
                            foundIndex.free();
                            if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                callback(result);
                            }
                        });
                    }, true);
                };
                CoreGraph.prototype.unindex = function (indexName, nodeToUnindex, flatKeyAttributes, callback) {
                    if (indexName == null) {
                        throw new Error("indexName should not be null");
                    }
                    if (nodeToUnindex == null) {
                        throw new Error("toIndexNode should not be null");
                    }
                    if (flatKeyAttributes == null) {
                        throw new Error("flatKeyAttributes should not be null");
                    }
                    this.getIndexOrCreate(nodeToUnindex.world(), nodeToUnindex.time(), indexName, function (foundIndex) {
                        if (foundIndex != null) {
                            foundIndex.unindex(org.mwg.core.CoreConstants.INDEX_ATTRIBUTE, nodeToUnindex, flatKeyAttributes, function (result) {
                                foundIndex.free();
                                if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                    callback(result);
                                }
                            });
                        }
                    }, false);
                };
                CoreGraph.prototype.indexes = function (world, time, callback) {
                    var selfPointer = this;
                    this._resolver.lookup(world, time, org.mwg.core.CoreConstants.END_OF_TIME, function (globalIndexNodeUnsafe) {
                        if (globalIndexNodeUnsafe == null) {
                            callback(new Array(0));
                        }
                        else {
                            var globalIndexContent = globalIndexNodeUnsafe.get(org.mwg.core.CoreConstants.INDEX_ATTRIBUTE);
                            if (globalIndexContent == null) {
                                globalIndexNodeUnsafe.free();
                                callback(new Array(0));
                            }
                            else {
                                var result = new Array(globalIndexContent.size());
                                var resultIndex = new Int32Array([0]);
                                globalIndexContent.each(function (key, value) {
                                    result[resultIndex[0]] = selfPointer._resolver.hashToString(key);
                                    resultIndex[0]++;
                                });
                                globalIndexNodeUnsafe.free();
                                callback(result);
                            }
                        }
                    });
                };
                CoreGraph.prototype.find = function (world, time, indexName, query, callback) {
                    if (indexName == null) {
                        throw new Error("indexName should not be null");
                    }
                    if (query == null) {
                        throw new Error("query should not be null");
                    }
                    this.getIndexOrCreate(world, time, indexName, function (foundIndex) {
                        if (foundIndex == null) {
                            if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                callback(new Array(0));
                            }
                        }
                        else {
                            foundIndex.find(org.mwg.core.CoreConstants.INDEX_ATTRIBUTE, query, function (collectedNodes) {
                                foundIndex.free();
                                if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                    callback(collectedNodes);
                                }
                            });
                        }
                    }, false);
                };
                CoreGraph.prototype.findByQuery = function (query, callback) {
                    if (query == null) {
                        throw new Error("query should not be null");
                    }
                    if (query.world() == org.mwg.Constants.NULL_LONG) {
                        throw new Error("Please fill world parameter in query before first usage!");
                    }
                    if (query.time() == org.mwg.Constants.NULL_LONG) {
                        throw new Error("Please fill time parameter in query before first usage!");
                    }
                    if (query.indexName() == null) {
                        throw new Error("Please fill indexName parameter in query before first usage!");
                    }
                    this.getIndexOrCreate(query.world(), query.time(), query.indexName(), function (foundIndex) {
                        if (foundIndex == null) {
                            if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                callback(new Array(0));
                            }
                        }
                        else {
                            query.setIndexName(org.mwg.core.CoreConstants.INDEX_ATTRIBUTE);
                            foundIndex.findByQuery(query, function (collectedNodes) {
                                foundIndex.free();
                                if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                    callback(collectedNodes);
                                }
                            });
                        }
                    }, false);
                };
                CoreGraph.prototype.findAll = function (world, time, indexName, callback) {
                    if (indexName == null) {
                        throw new Error("indexName should not be null");
                    }
                    this.getIndexOrCreate(world, time, indexName, function (foundIndex) {
                        if (foundIndex == null) {
                            if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                callback(new Array(0));
                            }
                        }
                        else {
                            foundIndex.findAll(org.mwg.core.CoreConstants.INDEX_ATTRIBUTE, function (collectedNodes) {
                                foundIndex.free();
                                if (org.mwg.core.utility.PrimitiveHelper.isDefined(callback)) {
                                    callback(collectedNodes);
                                }
                            });
                        }
                    }, false);
                };
                CoreGraph.prototype.getIndexNode = function (world, time, indexName, callback) {
                    if (indexName == null) {
                        throw new Error("indexName should not be null");
                    }
                    this.getIndexOrCreate(world, time, indexName, callback, false);
                };
                CoreGraph.prototype.getIndexOrCreate = function (world, time, indexName, callback, createIfNull) {
                    var selfPointer = this;
                    var indexNameCoded = this._resolver.stringToHash(indexName, createIfNull);
                    this._resolver.lookup(world, time, org.mwg.core.CoreConstants.END_OF_TIME, function (globalIndexNodeUnsafe) {
                        if (globalIndexNodeUnsafe == null && !createIfNull) {
                            callback(null);
                        }
                        else {
                            var globalIndexContent;
                            if (globalIndexNodeUnsafe == null) {
                                var initPreviouslyResolved = new Float64Array(6);
                                initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = world;
                                initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = time;
                                initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = time;
                                initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = org.mwg.core.CoreConstants.NULL_LONG;
                                initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = org.mwg.core.CoreConstants.NULL_LONG;
                                initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = org.mwg.core.CoreConstants.NULL_LONG;
                                globalIndexNodeUnsafe = new org.mwg.core.CoreNode(world, time, org.mwg.core.CoreConstants.END_OF_TIME, selfPointer, initPreviouslyResolved);
                                selfPointer._resolver.initNode(globalIndexNodeUnsafe, org.mwg.core.CoreConstants.NULL_LONG);
                                globalIndexContent = globalIndexNodeUnsafe.getOrCreateMap(org.mwg.core.CoreConstants.INDEX_ATTRIBUTE, org.mwg.Type.LONG_TO_LONG_MAP);
                            }
                            else {
                                globalIndexContent = globalIndexNodeUnsafe.get(org.mwg.core.CoreConstants.INDEX_ATTRIBUTE);
                            }
                            var indexId = globalIndexContent.get(indexNameCoded);
                            if (indexId == org.mwg.core.CoreConstants.NULL_LONG) {
                                if (createIfNull) {
                                    var newIndexNode = selfPointer.newNode(world, time);
                                    newIndexNode.getOrCreateMap(org.mwg.core.CoreConstants.INDEX_ATTRIBUTE, org.mwg.Type.LONG_TO_LONG_ARRAY_MAP);
                                    indexId = newIndexNode.id();
                                    globalIndexContent.put(indexNameCoded, indexId);
                                    callback(newIndexNode);
                                }
                                else {
                                    callback(null);
                                }
                            }
                            else {
                                selfPointer._resolver.lookup(world, time, indexId, callback);
                            }
                        }
                    });
                };
                CoreGraph.prototype.newCounter = function (expectedCountCalls) {
                    return new org.mwg.core.utility.CoreDeferCounter(expectedCountCalls);
                };
                CoreGraph.prototype.resolver = function () {
                    return this._resolver;
                };
                CoreGraph.prototype.scheduler = function () {
                    return this._scheduler;
                };
                CoreGraph.prototype.space = function () {
                    return this._space;
                };
                CoreGraph.prototype.storage = function () {
                    return this._storage;
                };
                CoreGraph.prototype.freeNodes = function (nodes) {
                    if (nodes != null) {
                        for (var i = 0; i < nodes.length; i++) {
                            if (nodes[i] != null) {
                                nodes[i].free();
                            }
                        }
                    }
                };
                return CoreGraph;
            }());
            core.CoreGraph = CoreGraph;
            var CoreNode = (function (_super) {
                __extends(CoreNode, _super);
                function CoreNode(p_world, p_time, p_id, p_graph, currentResolution) {
                    _super.call(this, p_world, p_time, p_id, p_graph, currentResolution);
                }

                return CoreNode;
            }(org.mwg.plugin.AbstractNode));
            core.CoreNode = CoreNode;
            var CoreQuery = (function () {
                function CoreQuery(p_resolver) {
                    this.capacity = 1;
                    this._attributes = new Float64Array(this.capacity);
                    this._values = new Array(this.capacity);
                    this.size = 0;
                    this._world = org.mwg.Constants.NULL_LONG;
                    this._time = org.mwg.Constants.NULL_LONG;
                    this._indexName = null;
                    this._resolver = p_resolver;
                    this._hash = null;
                }

                CoreQuery.prototype.parse = function (flatQuery) {
                    var cursor = 0;
                    var currentKey = org.mwg.Constants.NULL_LONG;
                    var lastElemStart = 0;
                    while (cursor < flatQuery.length) {
                        if (flatQuery.charAt(cursor) == org.mwg.Constants.QUERY_KV_SEP) {
                            if (lastElemStart != -1) {
                                currentKey = this._resolver.stringToHash(flatQuery.substring(lastElemStart, cursor).trim(), false);
                            }
                            lastElemStart = cursor + 1;
                        }
                        else {
                            if (flatQuery.charAt(cursor) == org.mwg.Constants.QUERY_SEP) {
                                if (currentKey != org.mwg.Constants.NULL_LONG) {
                                    this.internal_add(currentKey, flatQuery.substring(lastElemStart, cursor).trim());
                                }
                                currentKey = org.mwg.Constants.NULL_LONG;
                                lastElemStart = cursor + 1;
                            }
                        }
                        cursor++;
                    }
                    if (currentKey != org.mwg.Constants.NULL_LONG) {
                        this.internal_add(currentKey, flatQuery.substring(lastElemStart, cursor).trim());
                    }
                    return this;
                };
                CoreQuery.prototype.add = function (attributeName, value) {
                    this.internal_add(this._resolver.stringToHash(attributeName.trim(), false), value);
                    return this;
                };
                CoreQuery.prototype.setWorld = function (initialWorld) {
                    this._world = initialWorld;
                    return this;
                };
                CoreQuery.prototype.world = function () {
                    return this._world;
                };
                CoreQuery.prototype.setTime = function (initialTime) {
                    this._time = initialTime;
                    return this;
                };
                CoreQuery.prototype.time = function () {
                    return this._time;
                };
                CoreQuery.prototype.setIndexName = function (indexName) {
                    this._indexName = indexName;
                    return this;
                };
                CoreQuery.prototype.indexName = function () {
                    return this._indexName;
                };
                CoreQuery.prototype.hash = function () {
                    if (this._hash == null) {
                        this.compute();
                    }
                    return this._hash;
                };
                CoreQuery.prototype.attributes = function () {
                    return this._attributes;
                };
                CoreQuery.prototype.values = function () {
                    return this._values;
                };
                CoreQuery.prototype.internal_add = function (att, val) {
                    if (this.size == this.capacity) {
                        var temp_capacity = this.capacity * 2;
                        var temp_attributes = new Float64Array(temp_capacity);
                        var temp_values = new Array(temp_capacity);
                        java.lang.System.arraycopy(this._attributes, 0, temp_attributes, 0, this.capacity);
                        java.lang.System.arraycopy(this._values, 0, temp_values, 0, this.capacity);
                        this._attributes = temp_attributes;
                        this._values = temp_values;
                        this.capacity = temp_capacity;
                    }
                    this._attributes[this.size] = att;
                    this._values[this.size] = val;
                    this.size++;
                };
                CoreQuery.prototype.compute = function () {
                    for (var i = (this.size - 1); i >= 0; i--) {
                        for (var j = 1; j <= i; j++) {
                            if (this._attributes[j - 1] > this._attributes[j]) {
                                var tempK = this._attributes[j - 1];
                                var tempV = this._values[j - 1];
                                this._attributes[j - 1] = this._attributes[j];
                                this._values[j - 1] = this._values[j];
                                this._attributes[j] = tempK;
                                this._values[j] = tempV;
                            }
                        }
                    }
                    var buf = org.mwg.core.utility.BufferBuilder.newHeapBuffer();
                    for (var i = 0; i < this.size; i++) {
                        org.mwg.plugin.Base64.encodeLongToBuffer(this._attributes[i], buf);
                        var loopValue = this._values[i];
                        if (loopValue != null) {
                            if (loopValue instanceof Float64Array) {
                                var castedRelation = loopValue;
                                for (var j = 0; j < castedRelation.length; j++) {
                                    org.mwg.plugin.Base64.encodeLongToBuffer(castedRelation[j], buf);
                                }
                            }
                            else {
                                org.mwg.plugin.Base64.encodeStringToBuffer(this._values[i].toString(), buf);
                            }
                        }
                    }
                    this._hash = org.mwg.core.utility.DataHasher.hashBytes(buf.data());
                    buf.free();
                };
                return CoreQuery;
            }());
            core.CoreQuery = CoreQuery;
            var MWGResolver = (function () {
                function MWGResolver(p_storage, p_space, p_tracker, p_scheduler) {
                    this._storage = p_storage;
                    this._space = p_space;
                    this._tracker = p_tracker;
                    this._scheduler = p_scheduler;
                }

                MWGResolver.prototype.init = function (graph) {
                    this._graph = graph;
                    this.dictionary = this._space.getAndMark(org.mwg.plugin.ChunkType.STATE_CHUNK, org.mwg.core.CoreConstants.GLOBAL_DICTIONARY_KEY[0], org.mwg.core.CoreConstants.GLOBAL_DICTIONARY_KEY[1], org.mwg.core.CoreConstants.GLOBAL_DICTIONARY_KEY[2]);
                };
                MWGResolver.prototype.markNodeAndGetType = function (node) {
                    var initPreviouslyResolved = node._previousResolveds.get();
                    if (initPreviouslyResolved == null) {
                        throw new Error(org.mwg.core.CoreConstants.DEAD_NODE_ERROR + " node id: " + node.id());
                    }
                    this._space.getAndMark(org.mwg.plugin.ChunkType.STATE_CHUNK, node.world(), node.time(), node.id());
                    this._space.getAndMark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, node.world(), org.mwg.Constants.NULL_LONG, node.id());
                    this._space.getAndMark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, node.world(), initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX], node.id());
                    var worldOrderChunk = this._space.getAndMark(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, node.id());
                    this._space.getAndMark(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG);
                    return worldOrderChunk.extra();
                };
                MWGResolver.prototype.initNode = function (node, codeType) {
                    var cacheEntry_0 = this._space.create(org.mwg.plugin.ChunkType.STATE_CHUNK, node.world(), node.time(), node.id(), null, null);
                    var cacheEntry = this._space.putAndMark(cacheEntry_0);
                    if (cacheEntry_0 != cacheEntry) {
                        this._space.freeChunk(cacheEntry_0);
                    }
                    this._space.declareDirty(cacheEntry);
                    var superTimeTree_0 = this._space.create(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, node.world(), org.mwg.Constants.NULL_LONG, node.id(), null, null);
                    var superTimeTree = this._space.putAndMark(superTimeTree_0);
                    if (superTimeTree != superTimeTree_0) {
                        this._space.freeChunk(superTimeTree_0);
                    }
                    superTimeTree.insert(node.time());
                    var timeTree_0 = this._space.create(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, node.world(), node.time(), node.id(), null, null);
                    var timeTree = this._space.putAndMark(timeTree_0);
                    if (timeTree_0 != timeTree) {
                        this._space.freeChunk(timeTree_0);
                    }
                    timeTree.insert(node.time());
                    var objectWorldOrder_0 = this._space.create(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, node.id(), null, null);
                    var objectWorldOrder = this._space.putAndMark(objectWorldOrder_0);
                    if (objectWorldOrder_0 != objectWorldOrder) {
                        this._space.freeChunk(objectWorldOrder_0);
                    }
                    objectWorldOrder.put(node.world(), node.time());
                    objectWorldOrder.setExtra(codeType);
                    this._space.getAndMark(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG);
                    this._tracker.monitor(node);
                    node.init();
                };
                MWGResolver.prototype.initWorld = function (parentWorld, childWorld) {
                    var worldOrder = this._space.getAndMark(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG);
                    worldOrder.put(childWorld, parentWorld);
                    this._space.unmarkChunk(worldOrder);
                };
                MWGResolver.prototype.freeNode = function (node) {
                    var casted = node;
                    var nodeId = node.id();
                    var previous;
                    do {
                        previous = casted._previousResolveds.get();
                    } while (!casted._previousResolveds.compareAndSet(previous, null));
                    if (previous != null) {
                        this._space.unmark(org.mwg.plugin.ChunkType.STATE_CHUNK, previous[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX], previous[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX], nodeId);
                        this._space.unmark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, previous[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX], org.mwg.Constants.NULL_LONG, nodeId);
                        this._space.unmark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, previous[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX], previous[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX], nodeId);
                        this._space.unmark(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, nodeId);
                        this._space.unmark(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG);
                    }
                };
                MWGResolver.prototype.lookup = function (world, time, id, callback) {
                    this._scheduler.dispatch(this.lookupJob(world, time, id, callback));
                };
                MWGResolver.prototype.lookupJob = function (world, time, id, callback) {
                    var selfPointer = this;
                    return function () {
                        try {
                            selfPointer.getOrLoadAndMark(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, function (theGlobalWorldOrder) {
                                if (theGlobalWorldOrder != null) {
                                    selfPointer.getOrLoadAndMark(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.Constants.NULL_LONG, org.mwg.Constants.NULL_LONG, id, function (theNodeWorldOrder) {
                                        if (theNodeWorldOrder == null) {
                                            selfPointer._space.unmarkChunk(theGlobalWorldOrder);
                                            callback(null);
                                        }
                                        else {
                                            var closestWorld = selfPointer.resolve_world(theGlobalWorldOrder, theNodeWorldOrder, time, world);
                                            selfPointer.getOrLoadAndMark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, closestWorld, org.mwg.Constants.NULL_LONG, id, function (theNodeSuperTimeTree) {
                                                if (theNodeSuperTimeTree == null) {
                                                    selfPointer._space.unmarkChunk(theNodeWorldOrder);
                                                    selfPointer._space.unmarkChunk(theGlobalWorldOrder);
                                                    callback(null);
                                                }
                                                else {
                                                    var closestSuperTime = theNodeSuperTimeTree.previousOrEqual(time);
                                                    if (closestSuperTime == org.mwg.Constants.NULL_LONG) {
                                                        selfPointer._space.unmarkChunk(theNodeSuperTimeTree);
                                                        selfPointer._space.unmarkChunk(theNodeWorldOrder);
                                                        selfPointer._space.unmarkChunk(theGlobalWorldOrder);
                                                        callback(null);
                                                        return;
                                                    }
                                                    selfPointer.getOrLoadAndMark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, closestWorld, closestSuperTime, id, function (theNodeTimeTree) {
                                                        if (theNodeTimeTree == null) {
                                                            selfPointer._space.unmarkChunk(theNodeSuperTimeTree);
                                                            selfPointer._space.unmarkChunk(theNodeWorldOrder);
                                                            selfPointer._space.unmarkChunk(theGlobalWorldOrder);
                                                            callback(null);
                                                        }
                                                        else {
                                                            var closestTime = theNodeTimeTree.previousOrEqual(time);
                                                            if (closestTime == org.mwg.Constants.NULL_LONG) {
                                                                selfPointer._space.unmarkChunk(theNodeTimeTree);
                                                                selfPointer._space.unmarkChunk(theNodeSuperTimeTree);
                                                                selfPointer._space.unmarkChunk(theNodeWorldOrder);
                                                                selfPointer._space.unmarkChunk(theGlobalWorldOrder);
                                                                callback(null);
                                                                return;
                                                            }
                                                            selfPointer.getOrLoadAndMark(org.mwg.plugin.ChunkType.STATE_CHUNK, closestWorld, closestTime, id, function (theObjectChunk) {
                                                                if (theObjectChunk == null) {
                                                                    selfPointer._space.unmarkChunk(theNodeTimeTree);
                                                                    selfPointer._space.unmarkChunk(theNodeSuperTimeTree);
                                                                    selfPointer._space.unmarkChunk(theNodeWorldOrder);
                                                                    selfPointer._space.unmarkChunk(theGlobalWorldOrder);
                                                                    callback(null);
                                                                }
                                                                else {
                                                                    var castedNodeWorldOrder = theNodeWorldOrder;
                                                                    var extraCode = castedNodeWorldOrder.extra();
                                                                    var resolvedFactory = null;
                                                                    if (extraCode != org.mwg.Constants.NULL_LONG) {
                                                                        resolvedFactory = selfPointer._graph.factoryByCode(extraCode);
                                                                    }
                                                                    var initPreviouslyResolved = new Float64Array(6);
                                                                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = closestWorld;
                                                                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = closestSuperTime;
                                                                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = closestTime;
                                                                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = theNodeWorldOrder.magic();
                                                                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = theNodeSuperTimeTree.magic();
                                                                    initPreviouslyResolved[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = theNodeTimeTree.magic();
                                                                    var resolvedNode;
                                                                    if (resolvedFactory == null) {
                                                                        resolvedNode = new org.mwg.core.CoreNode(world, time, id, selfPointer._graph, initPreviouslyResolved);
                                                                    }
                                                                    else {
                                                                        resolvedNode = resolvedFactory(world, time, id, selfPointer._graph, initPreviouslyResolved);
                                                                    }
                                                                    selfPointer._tracker.monitor(resolvedNode);
                                                                    if (callback != null) {
                                                                        callback(resolvedNode);
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                                else {
                                    callback(null);
                                }
                            });
                        }
                        catch ($ex$) {
                            if ($ex$ instanceof Error) {
                                var e = $ex$;
                                console.error(e);
                            }
                            else {
                                throw $ex$;
                            }
                        }
                    };
                };
                MWGResolver.prototype.resolve_world = function (globalWorldOrder, nodeWorldOrder, timeToResolve, originWorld) {
                    if (globalWorldOrder == null || nodeWorldOrder == null) {
                        return originWorld;
                    }
                    var currentUniverse = originWorld;
                    var previousUniverse = org.mwg.Constants.NULL_LONG;
                    var divergenceTime = nodeWorldOrder.get(currentUniverse);
                    while (currentUniverse != previousUniverse) {
                        if (divergenceTime != org.mwg.Constants.NULL_LONG && divergenceTime <= timeToResolve) {
                            return currentUniverse;
                        }
                        previousUniverse = currentUniverse;
                        currentUniverse = globalWorldOrder.get(currentUniverse);
                        divergenceTime = nodeWorldOrder.get(currentUniverse);
                    }
                    return originWorld;
                };
                MWGResolver.prototype.getOrLoadAndMark = function (type, world, time, id, callback) {
                    if (world == org.mwg.core.CoreConstants.NULL_KEY[0] && time == org.mwg.core.CoreConstants.NULL_KEY[1] && id == org.mwg.core.CoreConstants.NULL_KEY[2]) {
                        callback(null);
                        return;
                    }
                    var selfPointer = this;
                    var cached = this._space.getAndMark(type, world, time, id);
                    if (cached != null) {
                        callback(cached);
                    }
                    else {
                        var buffer = selfPointer._graph.newBuffer();
                        org.mwg.core.utility.BufferBuilder.keyToBuffer(buffer, type, world, time, id);
                        this._storage.get(buffer, function (payloads) {
                            buffer.free();
                            var result = null;
                            var it = payloads.iterator();
                            if (it.hasNext()) {
                                var view = it.next();
                                if (view.length() > 0) {
                                    result = selfPointer._space.create(type, world, time, id, view, null);
                                    selfPointer._space.putAndMark(result);
                                }
                            }
                            payloads.free();
                            callback(result);
                        });
                    }
                };
                MWGResolver.prototype.getOrLoadAndMarkAll = function (types, keys, callback) {
                    var nbKeys = keys.length / MWGResolver.KEY_SIZE;
                    var toLoadIndexes = [];
                    var nbElem = 0;
                    var result = new Array(nbKeys);
                    for (var i = 0; i < nbKeys; i++) {
                        if (keys[i * MWGResolver.KEY_SIZE] == org.mwg.core.CoreConstants.NULL_KEY[0] && keys[i * MWGResolver.KEY_SIZE + 1] == org.mwg.core.CoreConstants.NULL_KEY[1] && keys[i * MWGResolver.KEY_SIZE + 2] == org.mwg.core.CoreConstants.NULL_KEY[2]) {
                            toLoadIndexes[i] = false;
                            result[i] = null;
                        }
                        else {
                            result[i] = this._space.getAndMark(types[i], keys[i * MWGResolver.KEY_SIZE], keys[i * MWGResolver.KEY_SIZE + 1], keys[i * MWGResolver.KEY_SIZE + 2]);
                            if (result[i] == null) {
                                toLoadIndexes[i] = true;
                                nbElem++;
                            }
                            else {
                                toLoadIndexes[i] = false;
                            }
                        }
                    }
                    if (nbElem == 0) {
                        callback(result);
                    }
                    else {
                        var keysToLoad = this._graph.newBuffer();
                        var reverseIndex = new Int32Array(nbElem);
                        var lastInsertedIndex = 0;
                        for (var i = 0; i < nbKeys; i++) {
                            if (toLoadIndexes[i]) {
                                reverseIndex[lastInsertedIndex] = i;
                                if (lastInsertedIndex != 0) {
                                    keysToLoad.write(org.mwg.core.CoreConstants.BUFFER_SEP);
                                }
                                org.mwg.core.utility.BufferBuilder.keyToBuffer(keysToLoad, types[i], keys[i * MWGResolver.KEY_SIZE], keys[i * MWGResolver.KEY_SIZE + 1], keys[i * MWGResolver.KEY_SIZE + 2]);
                                lastInsertedIndex = lastInsertedIndex + 1;
                            }
                        }
                        var selfPointer = this;
                        this._storage.get(keysToLoad, function (fromDbBuffers) {
                            keysToLoad.free();
                            var it = fromDbBuffers.iterator();
                            var i = 0;
                            while (it.hasNext()) {
                                var reversedIndex = reverseIndex[i];
                                var view = it.next();
                                if (view.length() > 0) {
                                    result[reversedIndex] = selfPointer._space.create(types[reversedIndex], keys[reversedIndex * org.mwg.core.MWGResolver.KEY_SIZE], keys[reversedIndex * org.mwg.core.MWGResolver.KEY_SIZE + 1], keys[reversedIndex * org.mwg.core.MWGResolver.KEY_SIZE + 2], view, null);
                                }
                                else {
                                    result[reversedIndex] = null;
                                }
                                i++;
                            }
                            fromDbBuffers.free();
                            callback(result);
                        });
                    }
                };
                MWGResolver.prototype.newState = function (node, world, time) {
                    var nodeWorldOrder = this._space.getAndMark(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.core.CoreConstants.NULL_LONG, org.mwg.core.CoreConstants.NULL_LONG, node.id());
                    if (nodeWorldOrder == null) {
                        return null;
                    }
                    nodeWorldOrder.lock();
                    var resultState = null;
                    try {
                        var castedNode = node;
                        var previousResolveds = castedNode._previousResolveds.get();
                        if (previousResolveds == null) {
                            throw new Error(org.mwg.core.CoreConstants.DEAD_NODE_ERROR);
                        }
                        if (time < previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC]) {
                            throw new Error("New state cannot be used to create state before the previously resolved state");
                        }
                        var nodeId = node.id();
                        if (previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] == world && previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] == time) {
                            resultState = this._space.getAndMark(org.mwg.plugin.ChunkType.STATE_CHUNK, world, time, nodeId);
                            this._space.unmarkChunk(resultState);
                            this._space.unmarkChunk(nodeWorldOrder);
                            return resultState;
                        }
                        var resultState_0 = this._space.create(org.mwg.plugin.ChunkType.STATE_CHUNK, world, time, nodeId, null, null);
                        resultState = this._space.putAndMark(resultState_0);
                        if (resultState_0 != resultState) {
                            this._space.freeChunk(resultState_0);
                        }
                        if (previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] == world || nodeWorldOrder.get(world) != org.mwg.core.CoreConstants.NULL_LONG) {
                            var nodeSuperTimeTree = this._space.getAndMark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX], org.mwg.core.CoreConstants.NULL_LONG, nodeId);
                            if (nodeSuperTimeTree == null) {
                                this._space.unmarkChunk(nodeWorldOrder);
                                return null;
                            }
                            var nodeTimeTree = this._space.getAndMark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX], previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX], nodeId);
                            if (nodeTimeTree == null) {
                                this._space.unmarkChunk(nodeSuperTimeTree);
                                this._space.unmarkChunk(nodeWorldOrder);
                                return null;
                            }
                            var superTreeSize = nodeSuperTimeTree.size();
                            var threshold = org.mwg.core.CoreConstants.SCALE_1 * 2;
                            if (superTreeSize > threshold) {
                                threshold = org.mwg.core.CoreConstants.SCALE_2 * 2;
                            }
                            if (superTreeSize > threshold) {
                                threshold = org.mwg.core.CoreConstants.SCALE_3 * 2;
                            }
                            if (superTreeSize > threshold) {
                                threshold = org.mwg.core.CoreConstants.SCALE_4 * 2;
                            }
                            nodeTimeTree.insert(time);
                            if (nodeTimeTree.size() == threshold) {
                                var medianPoint = new Float64Array([-1]);
                                nodeTimeTree.range(org.mwg.Constants.BEGINNING_OF_TIME, org.mwg.Constants.END_OF_TIME, nodeTimeTree.size() / 2, function (t) {
                                    medianPoint[0] = t;
                                });
                                var rightTree_0 = this._space.create(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, world, medianPoint[0], nodeId, null, null);
                                var rightTree = this._space.putAndMark(rightTree_0);
                                if (rightTree_0 != rightTree) {
                                    this._space.freeChunk(rightTree_0);
                                }
                                var finalRightTree = rightTree;
                                nodeTimeTree.range(org.mwg.Constants.BEGINNING_OF_TIME, org.mwg.Constants.END_OF_TIME, nodeTimeTree.size() / 2, function (t) {
                                    finalRightTree.insert(t);
                                });
                                nodeSuperTimeTree.insert(medianPoint[0]);
                                nodeTimeTree.clearAt(medianPoint[0]);
                                if (time < medianPoint[0]) {
                                    this._space.unmarkChunk(rightTree);
                                    this._space.unmarkChunk(nodeSuperTimeTree);
                                    this._space.unmarkChunk(nodeTimeTree);
                                    var newResolveds = new Float64Array(6);
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = world;
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX];
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = time;
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = nodeWorldOrder.magic();
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = nodeSuperTimeTree.magic();
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = nodeTimeTree.magic();
                                    castedNode._previousResolveds.set(newResolveds);
                                }
                                else {
                                    this._space.unmarkChunk(nodeTimeTree);
                                    this._space.unmarkChunk(nodeTimeTree);
                                    this._space.unmarkChunk(nodeSuperTimeTree);
                                    var newResolveds = new Float64Array(6);
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = world;
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = medianPoint[0];
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = time;
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = nodeWorldOrder.magic();
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = rightTree.magic();
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = nodeTimeTree.magic();
                                    castedNode._previousResolveds.set(newResolveds);
                                }
                            }
                            else {
                                var newResolveds = new Float64Array(6);
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = world;
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX];
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = time;
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = nodeWorldOrder.magic();
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = nodeSuperTimeTree.magic();
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = nodeTimeTree.magic();
                                castedNode._previousResolveds.set(newResolveds);
                                this._space.unmarkChunk(nodeSuperTimeTree);
                                this._space.unmarkChunk(nodeTimeTree);
                            }
                        }
                        else {
                            var newSuperTimeTree_0 = this._space.create(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, world, org.mwg.core.CoreConstants.NULL_LONG, nodeId, null, null);
                            var newSuperTimeTree = this._space.putAndMark(newSuperTimeTree_0);
                            if (newSuperTimeTree != newSuperTimeTree_0) {
                                this._space.freeChunk(newSuperTimeTree_0);
                            }
                            newSuperTimeTree.insert(time);
                            var newTimeTree_0 = this._space.create(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, world, time, nodeId, null, null);
                            var newTimeTree = this._space.putAndMark(newTimeTree_0);
                            if (newTimeTree != newTimeTree_0) {
                                this._space.freeChunk(newTimeTree_0);
                            }
                            newTimeTree.insert(time);
                            nodeWorldOrder.put(world, time);
                            var newResolveds = new Float64Array(6);
                            newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = world;
                            newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = time;
                            newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = time;
                            newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = nodeWorldOrder.magic();
                            newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = newSuperTimeTree.magic();
                            newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = newTimeTree.magic();
                            castedNode._previousResolveds.set(newResolveds);
                            this._space.unmark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX], org.mwg.Constants.NULL_LONG, nodeId);
                            this._space.unmark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX], previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX], nodeId);
                        }
                        this._space.unmark(org.mwg.plugin.ChunkType.STATE_CHUNK, previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX], previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX], nodeId);
                        this._space.unmarkChunk(nodeWorldOrder);
                    }
                    catch ($ex$) {
                        if ($ex$ instanceof Error) {
                            var e = $ex$;
                            console.error(e);
                        }
                        else {
                            throw $ex$;
                        }
                    }
                    finally {
                        nodeWorldOrder.unlock();
                    }
                    return resultState;
                };
                MWGResolver.prototype.resolveState = function (node, allowDephasing) {
                    var castedNode = node;
                    var previousResolveds = castedNode._previousResolveds.get();
                    if (previousResolveds == null) {
                        throw new Error(org.mwg.core.CoreConstants.DEAD_NODE_ERROR + " node id: " + node.id());
                    }
                    var nodeWorld = node.world();
                    var nodeTime = node.time();
                    var nodeId = node.id();
                    if (previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] == nodeWorld && previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] == nodeTime) {
                        var currentEntry = this._space.getAndMark(org.mwg.plugin.ChunkType.STATE_CHUNK, nodeWorld, nodeTime, nodeId);
                        if (currentEntry != null) {
                            this._space.unmarkChunk(currentEntry);
                            return currentEntry;
                        }
                    }
                    var nodeWorldOrder = this._space.getAndMark(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.core.CoreConstants.NULL_LONG, org.mwg.core.CoreConstants.NULL_LONG, nodeId);
                    if (nodeWorldOrder == null) {
                        return null;
                    }
                    var nodeSuperTimeTree = this._space.getAndMark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX], org.mwg.core.CoreConstants.NULL_LONG, nodeId);
                    if (nodeSuperTimeTree == null) {
                        this._space.unmarkChunk(nodeWorldOrder);
                        return null;
                    }
                    var nodeTimeTree = this._space.getAndMark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX], previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX], nodeId);
                    if (nodeTimeTree == null) {
                        this._space.unmarkChunk(nodeSuperTimeTree);
                        this._space.unmarkChunk(nodeWorldOrder);
                        return null;
                    }
                    var nodeWorldOrderMagic = nodeWorldOrder.magic();
                    var nodeSuperTimeTreeMagic = nodeSuperTimeTree.magic();
                    var nodeTimeTreeMagic = nodeTimeTree.magic();
                    if (allowDephasing && (previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] == nodeWorldOrderMagic) && (previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] == nodeSuperTimeTreeMagic) && (previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] == nodeTimeTreeMagic)) {
                        var currentNodeState = this._space.getAndMark(org.mwg.plugin.ChunkType.STATE_CHUNK, previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX], previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX], nodeId);
                        this._space.unmarkChunk(nodeWorldOrder);
                        this._space.unmarkChunk(nodeSuperTimeTree);
                        this._space.unmarkChunk(nodeTimeTree);
                        if (currentNodeState != null) {
                            this._space.unmarkChunk(currentNodeState);
                        }
                        return currentNodeState;
                    }
                    var globalWorldOrder = this._space.getAndMark(org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.core.CoreConstants.NULL_LONG, org.mwg.core.CoreConstants.NULL_LONG, org.mwg.core.CoreConstants.NULL_LONG);
                    if (globalWorldOrder == null) {
                        this._space.unmarkChunk(nodeWorldOrder);
                        this._space.unmarkChunk(nodeSuperTimeTree);
                        this._space.unmarkChunk(nodeTimeTree);
                        return null;
                    }
                    nodeWorldOrder.lock();
                    if (previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] == nodeWorld && previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] == nodeTime) {
                        var currentEntry = this._space.getAndMark(org.mwg.plugin.ChunkType.STATE_CHUNK, nodeWorld, nodeTime, nodeId);
                        if (currentEntry != null) {
                            this._space.unmarkChunk(globalWorldOrder);
                            this._space.unmarkChunk(nodeWorldOrder);
                            this._space.unmarkChunk(nodeSuperTimeTree);
                            this._space.unmarkChunk(nodeTimeTree);
                            this._space.unmarkChunk(currentEntry);
                            nodeWorldOrder.unlock();
                            return currentEntry;
                        }
                    }
                    previousResolveds = castedNode._previousResolveds.get();
                    if (previousResolveds == null) {
                        nodeWorldOrder.unlock();
                        throw new Error(org.mwg.core.CoreConstants.DEAD_NODE_ERROR);
                    }
                    nodeWorldOrderMagic = nodeWorldOrder.magic();
                    nodeSuperTimeTreeMagic = nodeSuperTimeTree.magic();
                    nodeTimeTreeMagic = nodeTimeTree.magic();
                    var resultStateChunk = null;
                    var hasToCleanSuperTimeTree = false;
                    var hasToCleanTimeTree = false;
                    try {
                        var resolvedWorld;
                        var resolvedSuperTime;
                        var resolvedTime;
                        if (previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] == nodeWorldOrderMagic && previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] == nodeSuperTimeTreeMagic && previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] == nodeTimeTreeMagic) {
                            resolvedWorld = previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX];
                            resolvedSuperTime = previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX];
                            resolvedTime = previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX];
                            hasToCleanSuperTimeTree = true;
                            hasToCleanTimeTree = true;
                        }
                        else {
                            resolvedWorld = this.resolve_world(globalWorldOrder, nodeWorldOrder, nodeTime, nodeWorld);
                            if (resolvedWorld != previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX]) {
                                var tempNodeSuperTimeTree = this._space.getAndMark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, resolvedWorld, org.mwg.core.CoreConstants.NULL_LONG, nodeId);
                                if (tempNodeSuperTimeTree == null) {
                                    throw new Error("Simultaneous rePhasing leading to cache miss!!!");
                                }
                                this._space.unmarkChunk(nodeSuperTimeTree);
                                this._space.unmarkChunk(nodeSuperTimeTree);
                                nodeSuperTimeTree = tempNodeSuperTimeTree;
                            }
                            resolvedSuperTime = nodeSuperTimeTree.previousOrEqual(nodeTime);
                            if (previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] != resolvedSuperTime) {
                                var tempNodeTimeTree = this._space.getAndMark(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, resolvedWorld, resolvedSuperTime, nodeId);
                                if (tempNodeTimeTree == null) {
                                    throw new Error("Simultaneous rephasing leading to cache miss!!!");
                                }
                                this._space.unmarkChunk(nodeTimeTree);
                                this._space.unmarkChunk(nodeTimeTree);
                                nodeTimeTree = tempNodeTimeTree;
                            }
                            resolvedTime = nodeTimeTree.previousOrEqual(nodeTime);
                            if (resolvedWorld == previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX]) {
                                hasToCleanSuperTimeTree = true;
                            }
                            if (resolvedSuperTime == previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX]) {
                                hasToCleanTimeTree = true;
                            }
                        }
                        var worldMoved = resolvedWorld != previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX];
                        var superTimeTreeMoved = resolvedSuperTime != previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX];
                        var timeTreeMoved = resolvedTime != previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX];
                        if (allowDephasing) {
                            resultStateChunk = this._space.getAndMark(org.mwg.plugin.ChunkType.STATE_CHUNK, resolvedWorld, resolvedTime, nodeId);
                            if (resultStateChunk == null) {
                                throw new Error("Simultaneous rePhasing leading to cache miss!!!");
                            }
                            var refreshNodeCache = false;
                            if (worldMoved || timeTreeMoved) {
                                this._space.unmark(org.mwg.plugin.ChunkType.STATE_CHUNK, previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX], previousResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX], nodeId);
                                refreshNodeCache = true;
                            }
                            else {
                                if (superTimeTreeMoved) {
                                    refreshNodeCache = true;
                                }
                                this._space.unmarkChunk(resultStateChunk);
                            }
                            if (refreshNodeCache) {
                                var newResolveds = new Float64Array(6);
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = resolvedWorld;
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = resolvedSuperTime;
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = resolvedTime;
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = nodeWorldOrderMagic;
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = nodeSuperTimeTreeMagic;
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = nodeTimeTreeMagic;
                                castedNode._previousResolveds.set(newResolveds);
                            }
                        }
                        else {
                            var previousNodeState = this._space.getAndMark(org.mwg.plugin.ChunkType.STATE_CHUNK, resolvedWorld, resolvedTime, nodeId);
                            resultStateChunk = this._space.create(org.mwg.plugin.ChunkType.STATE_CHUNK, nodeWorld, nodeTime, nodeId, null, previousNodeState);
                            this._space.putAndMark(resultStateChunk);
                            this._space.declareDirty(resultStateChunk);
                            this._space.unmarkChunk(previousNodeState);
                            this._space.unmarkChunk(previousNodeState);
                            if (resolvedWorld == nodeWorld || nodeWorldOrder.get(nodeWorld) != org.mwg.core.CoreConstants.NULL_LONG) {
                                var superTreeSize = nodeSuperTimeTree.size();
                                var threshold = org.mwg.core.CoreConstants.SCALE_1 * 2;
                                if (superTreeSize > threshold) {
                                    threshold = org.mwg.core.CoreConstants.SCALE_2 * 2;
                                }
                                if (superTreeSize > threshold) {
                                    threshold = org.mwg.core.CoreConstants.SCALE_3 * 2;
                                }
                                if (superTreeSize > threshold) {
                                    threshold = org.mwg.core.CoreConstants.SCALE_4 * 2;
                                }
                                nodeTimeTree.insert(nodeTime);
                                if (nodeTimeTree.size() == threshold) {
                                    var medianPoint = new Float64Array([-1]);
                                    nodeTimeTree.range(org.mwg.core.CoreConstants.BEGINNING_OF_TIME, org.mwg.core.CoreConstants.END_OF_TIME, nodeTimeTree.size() / 2, function (t) {
                                        medianPoint[0] = t;
                                    });
                                    var rightTree = this._space.create(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, nodeWorld, medianPoint[0], nodeId, null, null);
                                    rightTree = this._space.putAndMark(rightTree);
                                    var finalRightTree = rightTree;
                                    nodeTimeTree.range(org.mwg.core.CoreConstants.BEGINNING_OF_TIME, org.mwg.core.CoreConstants.END_OF_TIME, nodeTimeTree.size() / 2, function (t) {
                                        finalRightTree.unsafe_insert(t);
                                    });
                                    this._space.declareDirty(finalRightTree);
                                    nodeSuperTimeTree.insert(medianPoint[0]);
                                    nodeTimeTree.clearAt(medianPoint[0]);
                                    if (nodeTime < medianPoint[0]) {
                                        this._space.unmarkChunk(rightTree);
                                        var newResolveds = new Float64Array(6);
                                        newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = nodeWorld;
                                        newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = resolvedSuperTime;
                                        newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = nodeTime;
                                        newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = nodeWorldOrderMagic;
                                        newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = nodeSuperTimeTree.magic();
                                        newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = nodeTimeTree.magic();
                                        castedNode._previousResolveds.set(newResolveds);
                                    }
                                    else {
                                        hasToCleanTimeTree = true;
                                        this._space.unmarkChunk(nodeTimeTree);
                                        var newResolveds = new Float64Array(6);
                                        newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = nodeWorld;
                                        newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = medianPoint[0];
                                        newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = nodeTime;
                                        newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = nodeWorldOrderMagic;
                                        newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = rightTree.magic();
                                        newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = nodeTimeTree.magic();
                                        castedNode._previousResolveds.set(newResolveds);
                                    }
                                }
                                else {
                                    var newResolveds = new Float64Array(6);
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = nodeWorld;
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = resolvedSuperTime;
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = nodeTime;
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = nodeWorldOrderMagic;
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = nodeSuperTimeTreeMagic;
                                    newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = nodeTimeTree.magic();
                                    castedNode._previousResolveds.set(newResolveds);
                                }
                            }
                            else {
                                var newSuperTimeTree_0 = this._space.create(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, nodeWorld, org.mwg.core.CoreConstants.NULL_LONG, nodeId, null, null);
                                var newSuperTimeTree = this._space.putAndMark(newSuperTimeTree_0);
                                if (newSuperTimeTree_0 != newSuperTimeTree) {
                                    this._space.freeChunk(newSuperTimeTree_0);
                                }
                                newSuperTimeTree.insert(nodeTime);
                                var newTimeTree_0 = this._space.create(org.mwg.plugin.ChunkType.TIME_TREE_CHUNK, nodeWorld, nodeTime, nodeId, null, null);
                                var newTimeTree = this._space.putAndMark(newTimeTree_0);
                                if (newTimeTree_0 != newTimeTree) {
                                    this._space.freeChunk(newTimeTree_0);
                                }
                                newTimeTree.insert(nodeTime);
                                nodeWorldOrder.put(nodeWorld, nodeTime);
                                var newResolveds = new Float64Array(6);
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_INDEX] = nodeWorld;
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_INDEX] = nodeTime;
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_INDEX] = nodeTime;
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_WORLD_MAGIC] = nodeWorldOrder.magic();
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_SUPER_TIME_MAGIC] = newSuperTimeTree.magic();
                                newResolveds[org.mwg.core.CoreConstants.PREVIOUS_RESOLVED_TIME_MAGIC] = newTimeTree.magic();
                                castedNode._previousResolveds.set(newResolveds);
                                this._space.unmarkChunk(nodeSuperTimeTree);
                                this._space.unmarkChunk(nodeTimeTree);
                            }
                        }
                    }
                    catch ($ex$) {
                        if ($ex$ instanceof Error) {
                            var t = $ex$;
                            console.error(t);
                        }
                        else {
                            throw $ex$;
                        }
                    }
                    finally {
                        nodeWorldOrder.unlock();
                    }
                    if (hasToCleanSuperTimeTree) {
                        this._space.unmarkChunk(nodeSuperTimeTree);
                    }
                    if (hasToCleanTimeTree) {
                        this._space.unmarkChunk(nodeTimeTree);
                    }
                    this._space.unmarkChunk(globalWorldOrder);
                    this._space.unmarkChunk(nodeWorldOrder);
                    return resultStateChunk;
                };
                MWGResolver.prototype.resolveTimepoints = function (node, beginningOfSearch, endOfSearch, callback) {
                    var keys = new Float64Array([org.mwg.core.CoreConstants.NULL_LONG, org.mwg.core.CoreConstants.NULL_LONG, org.mwg.core.CoreConstants.NULL_LONG, org.mwg.core.CoreConstants.NULL_LONG, org.mwg.core.CoreConstants.NULL_LONG, node.id()]);
                    var selfPointer = this;
                    this.getOrLoadAndMarkAll(new Int8Array([org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK, org.mwg.plugin.ChunkType.WORLD_ORDER_CHUNK]), keys, function (orders) {
                        if (orders == null || orders.length != 2) {
                            callback(new Float64Array(0));
                            return;
                        }
                        var globalWorldOrder = orders[0];
                        var objectWorldOrder = orders[1];
                        var collectionSize = new Int32Array([org.mwg.core.CoreConstants.MAP_INITIAL_CAPACITY]);
                        var collectedWorlds = [new Float64Array(collectionSize[0])];
                        var collectedIndex = 0;
                        var currentWorld = node.world();
                        while (currentWorld != org.mwg.core.CoreConstants.NULL_LONG) {
                            var divergenceTimepoint = objectWorldOrder.get(currentWorld);
                            if (divergenceTimepoint != org.mwg.core.CoreConstants.NULL_LONG) {
                                if (divergenceTimepoint <= beginningOfSearch) {
                                    collectedWorlds[0][collectedIndex] = currentWorld;
                                    collectedIndex++;
                                    break;
                                }
                                else {
                                    if (divergenceTimepoint > endOfSearch) {
                                        currentWorld = globalWorldOrder.get(currentWorld);
                                    }
                                    else {
                                        collectedWorlds[0][collectedIndex] = currentWorld;
                                        collectedIndex++;
                                        if (collectedIndex == collectionSize[0]) {
                                            var temp_collectedWorlds = new Float64Array(collectionSize[0] * 2);
                                            java.lang.System.arraycopy(collectedWorlds[0], 0, temp_collectedWorlds, 0, collectionSize[0]);
                                            collectedWorlds[0] = temp_collectedWorlds;
                                            collectionSize[0] = collectionSize[0] * 2;
                                        }
                                        currentWorld = globalWorldOrder.get(currentWorld);
                                    }
                                }
                            }
                            else {
                                currentWorld = globalWorldOrder.get(currentWorld);
                            }
                        }
                        selfPointer.resolveTimepointsFromWorlds(globalWorldOrder, objectWorldOrder, node, beginningOfSearch, endOfSearch, collectedWorlds[0], collectedIndex, callback);
                    });
                };
                MWGResolver.prototype.resolveTimepointsFromWorlds = function (globalWorldOrder, objectWorldOrder, node, beginningOfSearch, endOfSearch, collectedWorlds, collectedWorldsSize, callback) {
                    var selfPointer = this;
                    var timeTreeKeys = new Float64Array(collectedWorldsSize * 3);
                    var types = new Int8Array(collectedWorldsSize);
                    for (var i = 0; i < collectedWorldsSize; i++) {
                        timeTreeKeys[i * 3] = collectedWorlds[i];
                        timeTreeKeys[i * 3 + 1] = org.mwg.core.CoreConstants.NULL_LONG;
                        timeTreeKeys[i * 3 + 2] = node.id();
                        types[i] = org.mwg.plugin.ChunkType.TIME_TREE_CHUNK;
                    }
                    this.getOrLoadAndMarkAll(types, timeTreeKeys, function (superTimeTrees) {
                        if (superTimeTrees == null) {
                            selfPointer._space.unmarkChunk(objectWorldOrder);
                            selfPointer._space.unmarkChunk(globalWorldOrder);
                            callback(new Float64Array(0));
                        }
                        else {
                            var collectedSize = new Int32Array([org.mwg.core.CoreConstants.MAP_INITIAL_CAPACITY]);
                            var collectedSuperTimes = [new Float64Array(collectedSize[0])];
                            var collectedSuperTimesAssociatedWorlds = [new Float64Array(collectedSize[0])];
                            var insert_index = new Int32Array([0]);
                            var previousDivergenceTime = endOfSearch;
                            for (var i = 0; i < collectedWorldsSize; i++) {
                                var timeTree = superTimeTrees[i];
                                if (timeTree != null) {
                                    var currentDivergenceTime = objectWorldOrder.get(collectedWorlds[i]);
                                    var finalPreviousDivergenceTime = previousDivergenceTime;
                                    timeTree.range(currentDivergenceTime, previousDivergenceTime, org.mwg.core.CoreConstants.END_OF_TIME, function (t) {
                                        if (t != finalPreviousDivergenceTime) {
                                            collectedSuperTimes[0][insert_index[0]] = t;
                                            collectedSuperTimesAssociatedWorlds[0][insert_index[0]] = timeTree.world();
                                            insert_index[0]++;
                                            if (collectedSize[0] == insert_index[0]) {
                                                var temp_collectedSuperTimes = new Float64Array(collectedSize[0] * 2);
                                                var temp_collectedSuperTimesAssociatedWorlds = new Float64Array(collectedSize[0] * 2);
                                                java.lang.System.arraycopy(collectedSuperTimes[0], 0, temp_collectedSuperTimes, 0, collectedSize[0]);
                                                java.lang.System.arraycopy(collectedSuperTimesAssociatedWorlds[0], 0, temp_collectedSuperTimesAssociatedWorlds, 0, collectedSize[0]);
                                                collectedSuperTimes[0] = temp_collectedSuperTimes;
                                                collectedSuperTimesAssociatedWorlds[0] = temp_collectedSuperTimesAssociatedWorlds;
                                                collectedSize[0] = collectedSize[0] * 2;
                                            }
                                        }
                                    });
                                    previousDivergenceTime = currentDivergenceTime;
                                }
                                selfPointer._space.unmarkChunk(timeTree);
                            }
                            selfPointer.resolveTimepointsFromSuperTimes(globalWorldOrder, objectWorldOrder, node, beginningOfSearch, endOfSearch, collectedSuperTimesAssociatedWorlds[0], collectedSuperTimes[0], insert_index[0], callback);
                        }
                    });
                };
                MWGResolver.prototype.resolveTimepointsFromSuperTimes = function (globalWorldOrder, objectWorldOrder, node, beginningOfSearch, endOfSearch, collectedWorlds, collectedSuperTimes, collectedSize, callback) {
                    var selfPointer = this;
                    var timeTreeKeys = new Float64Array(collectedSize * 3);
                    var types = new Int8Array(collectedSize);
                    for (var i = 0; i < collectedSize; i++) {
                        timeTreeKeys[i * 3] = collectedWorlds[i];
                        timeTreeKeys[i * 3 + 1] = collectedSuperTimes[i];
                        timeTreeKeys[i * 3 + 2] = node.id();
                        types[i] = org.mwg.plugin.ChunkType.TIME_TREE_CHUNK;
                    }
                    this.getOrLoadAndMarkAll(types, timeTreeKeys, function (timeTrees) {
                        if (timeTrees == null) {
                            selfPointer._space.unmarkChunk(objectWorldOrder);
                            selfPointer._space.unmarkChunk(globalWorldOrder);
                            callback(new Float64Array(0));
                        }
                        else {
                            var collectedTimesSize = new Int32Array([org.mwg.core.CoreConstants.MAP_INITIAL_CAPACITY]);
                            var collectedTimes = [new Float64Array(collectedTimesSize[0])];
                            var insert_index = new Int32Array([0]);
                            var previousDivergenceTime = endOfSearch;
                            for (var i = 0; i < collectedSize; i++) {
                                var timeTree = timeTrees[i];
                                if (timeTree != null) {
                                    var currentDivergenceTime = objectWorldOrder.get(collectedWorlds[i]);
                                    if (currentDivergenceTime < beginningOfSearch) {
                                        currentDivergenceTime = beginningOfSearch;
                                    }
                                    var finalPreviousDivergenceTime = previousDivergenceTime;
                                    timeTree.range(currentDivergenceTime, previousDivergenceTime, org.mwg.core.CoreConstants.END_OF_TIME, function (t) {
                                        if (t != finalPreviousDivergenceTime) {
                                            collectedTimes[0][insert_index[0]] = t;
                                            insert_index[0]++;
                                            if (collectedTimesSize[0] == insert_index[0]) {
                                                var temp_collectedTimes = new Float64Array(collectedTimesSize[0] * 2);
                                                java.lang.System.arraycopy(collectedTimes[0], 0, temp_collectedTimes, 0, collectedTimesSize[0]);
                                                collectedTimes[0] = temp_collectedTimes;
                                                collectedTimesSize[0] = collectedTimesSize[0] * 2;
                                            }
                                        }
                                    });
                                    if (i < collectedSize - 1) {
                                        if (collectedWorlds[i + 1] != collectedWorlds[i]) {
                                            previousDivergenceTime = currentDivergenceTime;
                                        }
                                    }
                                }
                                selfPointer._space.unmarkChunk(timeTree);
                            }
                            if (insert_index[0] != collectedTimesSize[0]) {
                                var tempTimeline = new Float64Array(insert_index[0]);
                                java.lang.System.arraycopy(collectedTimes[0], 0, tempTimeline, 0, insert_index[0]);
                                collectedTimes[0] = tempTimeline;
                            }
                            selfPointer._space.unmarkChunk(objectWorldOrder);
                            selfPointer._space.unmarkChunk(globalWorldOrder);
                            callback(collectedTimes[0]);
                        }
                    });
                };
                MWGResolver.prototype.stringToHash = function (name, insertIfNotExists) {
                    var hash = org.mwg.core.utility.DataHasher.hash(name);
                    if (insertIfNotExists) {
                        var dictionaryIndex = this.dictionary.get(0);
                        if (dictionaryIndex == null) {
                            dictionaryIndex = this.dictionary.getOrCreate(0, org.mwg.Type.STRING_TO_LONG_MAP);
                        }
                        if (!dictionaryIndex.containsHash(hash)) {
                            dictionaryIndex.put(name, hash);
                        }
                    }
                    return hash;
                };
                MWGResolver.prototype.hashToString = function (key) {
                    var dictionaryIndex = this.dictionary.get(0);
                    if (dictionaryIndex != null) {
                        return dictionaryIndex.getByHash(key);
                    }
                    return null;
                };
                MWGResolver.KEY_SIZE = 3;
                return MWGResolver;
            }());
            core.MWGResolver = MWGResolver;
            var NoopNodeTracker = (function () {
                function NoopNodeTracker() {
                }

                NoopNodeTracker.prototype.monitor = function (node) {
                };
                return NoopNodeTracker;
            }());
            core.NoopNodeTracker = NoopNodeTracker;
            var scheduler;
            (function (scheduler) {
                var NoopScheduler = (function () {
                    function NoopScheduler() {
                    }

                    NoopScheduler.prototype.dispatch = function (job) {
                        job();
                    };
                    NoopScheduler.prototype.start = function () {
                    };
                    NoopScheduler.prototype.stop = function () {
                    };
                    return NoopScheduler;
                }());
                scheduler.NoopScheduler = NoopScheduler;
            })(scheduler = core.scheduler || (core.scheduler = {}));
            var task;
            (function (task_1) {
                var ActionAdd = (function () {
                    function ActionAdd(relationName, variableNameToAdd) {
                        this._relationName = relationName;
                        this._variableNameToAdd = variableNameToAdd;
                    }

                    ActionAdd.prototype.eval = function (context) {
                        var previousResult = context.result();
                        var savedVar = context.variable(this._variableNameToAdd);
                        if (savedVar instanceof org.mwg.plugin.AbstractNode) {
                            if (previousResult instanceof org.mwg.plugin.AbstractNode) {
                                previousResult.add(this._relationName, savedVar);
                            }
                            else {
                                if (Array.isArray(previousResult)) {
                                    this.addFromArray(previousResult, this._relationName, savedVar);
                                }
                            }
                        }
                        context.setResult(previousResult);
                        context.next();
                    };
                    ActionAdd.prototype.addFromArray = function (objs, relName, toRemove) {
                        for (var i = 0; i < objs.length; i++) {
                            if (objs[i] instanceof org.mwg.plugin.AbstractNode) {
                                objs[i].add(relName, toRemove);
                            }
                            else {
                                if (Array.isArray(objs[i])) {
                                    this.addFromArray(objs[i], relName, toRemove);
                                }
                            }
                        }
                    };
                    return ActionAdd;
                }());
                task_1.ActionAdd = ActionAdd;
                var ActionAsVar = (function () {
                    function ActionAsVar(p_name) {
                        this._name = p_name;
                    }

                    ActionAsVar.prototype.eval = function (context) {
                        var previousResult = context.result();
                        context.setResult(previousResult);
                        context.setVariable(this._name, previousResult);
                        context.next();
                    };
                    return ActionAsVar;
                }());
                task_1.ActionAsVar = ActionAsVar;
                var ActionForeach = (function () {
                    function ActionForeach(p_subTask) {
                        this._subTask = p_subTask;
                    }

                    ActionForeach.prototype.eval = function (context) {
                        var selfPointer = this;
                        var castedResult = org.mwg.core.task.ActionForeach.convert(context.result());
                        var cursor = new java.util.concurrent.atomic.AtomicInteger(0);
                        var results = new Array(castedResult.length);
                        var recursiveAction = new Array(1);
                        recursiveAction[0] = function (subTaskFinalContext) {
                            var current = cursor.getAndIncrement();
                            results[current] = subTaskFinalContext;
                            var nextCursot = current + 1;
                            if (nextCursot == results.length) {
                                context.setResult(results);
                                context.next();
                            }
                            else {
                                selfPointer._subTask.executeThenAsync(context, castedResult[nextCursot], recursiveAction[0]);
                            }
                        };
                        this._subTask.executeThenAsync(context, castedResult[0], recursiveAction[0]);
                    };
                    ActionForeach.convert = function (elem) {
                        var result = [];
                        for (var p in elem) {
                            result.push(elem[p]);
                        }
                        return result;
                    };
                    return ActionForeach;
                }());
                task_1.ActionForeach = ActionForeach;
                var ActionForeachPar = (function () {
                    function ActionForeachPar(p_subTask) {
                        this._subTask = p_subTask;
                    }

                    ActionForeachPar.prototype.eval = function (context) {
                        var castedResult = org.mwg.core.task.ActionForeach.convert(context.result());
                        var results = new Array(castedResult.length);
                        var counter = context.graph().newCounter(castedResult.length);
                        counter.then(function () {
                            context.setResult(results);
                            context.next();
                        });
                        for (var i = 0; i < castedResult.length; i++) {
                            var finalI = i;
                            this._subTask.executeThenAsync(context, castedResult[finalI], function (subTaskFinalContext) {
                                results[finalI] = subTaskFinalContext;
                                counter.count();
                            });
                        }
                    };
                    return ActionForeachPar;
                }());
                task_1.ActionForeachPar = ActionForeachPar;
                var ActionFrom = (function () {
                    function ActionFrom(value) {
                        this._value = value;
                    }

                    ActionFrom.prototype.eval = function (context) {
                        context.setResult(this._value);
                        context.next();
                    };
                    return ActionFrom;
                }());
                task_1.ActionFrom = ActionFrom;
                var ActionFromIndex = (function () {
                    function ActionFromIndex(p_indexName, p_query) {
                        this._indexName = p_indexName;
                        this._query = p_query;
                    }

                    ActionFromIndex.prototype.eval = function (context) {
                        context.graph().find(context.world(), context.time(), this._indexName, this._query, function (result) {
                            context.setResult(result);
                            context.next();
                        });
                    };
                    return ActionFromIndex;
                }());
                task_1.ActionFromIndex = ActionFromIndex;
                var ActionFromIndexAll = (function () {
                    function ActionFromIndexAll(p_indexName) {
                        this._indexName = p_indexName;
                    }

                    ActionFromIndexAll.prototype.eval = function (context) {
                        context.graph().findAll(context.world(), context.time(), this._indexName, function (result) {
                            context.setResult(result);
                            context.next();
                        });
                    };
                    return ActionFromIndexAll;
                }());
                task_1.ActionFromIndexAll = ActionFromIndexAll;
                var ActionFromVar = (function () {
                    function ActionFromVar(p_name) {
                        this._name = p_name;
                    }

                    ActionFromVar.prototype.eval = function (context) {
                        context.setResult(context.variable(this._name));
                        context.next();
                    };
                    return ActionFromVar;
                }());
                task_1.ActionFromVar = ActionFromVar;
                var ActionGet = (function () {
                    function ActionGet(p_name) {
                        this._name = p_name;
                    }

                    ActionGet.prototype.eval = function (context) {
                        var previousResult = context.result();
                        if (previousResult != null) {
                            var collectedIds = new java.util.HashSet();
                            var collectedProperties = new java.util.ArrayList();
                            if (Array.isArray(previousResult)) {
                                this.collectArray(previousResult, collectedIds, collectedProperties);
                            }
                            else {
                                if (previousResult instanceof org.mwg.plugin.AbstractNode) {
                                    var loop = previousResult;
                                    var propValue = loop.get(this._name);
                                    if (propValue != null) {
                                        var propType = loop.type(this._name);
                                        switch (propType) {
                                            case org.mwg.Type.RELATION:
                                                var propValueRef = propValue;
                                                for (var j = 0; j < propValueRef.length; j++) {
                                                    collectedIds.add(propValueRef[j]);
                                                }
                                                break;
                                            default:
                                                collectedProperties.add(propValue);
                                                break;
                                        }
                                    }
                                }
                            }
                            var deferCounter = context.graph().newCounter(collectedIds.size());
                            var resultNodes = new Array(collectedIds.size());
                            if (collectedIds.size() > 0) {
                                var cursor = new java.util.concurrent.atomic.AtomicInteger(0);
                                collectedIds.forEach(function (idNode) {
                                    context.graph().lookup(context.world(), context.time(), idNode, function (result) {
                                        resultNodes[cursor.getAndIncrement()] = result;
                                        deferCounter.count();
                                    });
                                });
                                var finalCollectedProperties = collectedProperties.toArray(new Array(collectedProperties.size()));
                                deferCounter.then(function () {
                                    if (finalCollectedProperties == null) {
                                        context.setResult(resultNodes);
                                        context.next();
                                    }
                                    else {
                                        var merged = new Array(resultNodes.length + finalCollectedProperties.length);
                                        java.lang.System.arraycopy(resultNodes, 0, merged, 0, resultNodes.length);
                                        java.lang.System.arraycopy(finalCollectedProperties, 0, merged, resultNodes.length, finalCollectedProperties.length);
                                        context.setResult(merged);
                                        context.next();
                                    }
                                });
                            }
                            else {
                                var finalCollectedProperties = collectedProperties.toArray(new Array(collectedProperties.size()));
                                context.setResult(finalCollectedProperties);
                                context.next();
                            }
                        }
                        else {
                            context.next();
                        }
                    };
                    ActionGet.prototype.collectArray = function (current, toLoad, leafs) {
                        for (var i = 0; i < current.length; i++) {
                            if (Array.isArray(current[i])) {
                                this.collectArray(current[i], toLoad, leafs);
                            }
                            else {
                                if (current[i] instanceof org.mwg.plugin.AbstractNode) {
                                    var loop = current[i];
                                    var propValue = loop.get(this._name);
                                    if (propValue != null) {
                                        var propType = loop.type(this._name);
                                        switch (propType) {
                                            case org.mwg.Type.RELATION:
                                                var interResult = propValue;
                                                for (var j = 0; j < interResult.length; j++) {
                                                    toLoad.add(interResult[j]);
                                                }
                                                break;
                                            default:
                                                leafs.add(propValue);
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                    };
                    return ActionGet;
                }());
                task_1.ActionGet = ActionGet;
                var ActionIfThen = (function () {
                    function ActionIfThen(cond, action) {
                        this._condition = cond;
                        this._action = action;
                    }

                    ActionIfThen.prototype.eval = function (context) {
                        if (this._condition(context)) {
                            this._action.executeThenAsync(context, context.result(), function (subTaskFinalContext) {
                                context.setResult(subTaskFinalContext);
                                context.next();
                            });
                        }
                        else {
                            context.setResult(context.result());
                            context.next();
                        }
                    };
                    return ActionIfThen;
                }());
                task_1.ActionIfThen = ActionIfThen;
                var ActionMap = (function () {
                    function ActionMap(p_map) {
                        this._map = p_map;
                    }

                    ActionMap.prototype.eval = function (context) {
                        var previousResult = context.result();
                        if (previousResult != null) {
                            if (Array.isArray(previousResult)) {
                                context.setResult(this.filterArray(previousResult));
                            }
                            else {
                                if (previousResult instanceof org.mwg.plugin.AbstractNode) {
                                    context.setResult(this._map(previousResult));
                                }
                                else {
                                    context.setResult(previousResult);
                                }
                            }
                        }
                        context.next();
                    };
                    ActionMap.prototype.filterArray = function (current) {
                        var onlyContainsNodes = true;
                        var filteredResult = new Array(current.length);
                        var cursor = 0;
                        for (var i = 0; i < current.length; i++) {
                            if (Array.isArray(current[i])) {
                                onlyContainsNodes = false;
                                var filtered = this.filterArray(current[i]);
                                if (filtered != null && filtered.length > 0) {
                                    filteredResult[cursor] = filtered;
                                    cursor++;
                                }
                            }
                            else {
                                if (current[i] != null && current[i] instanceof org.mwg.plugin.AbstractNode) {
                                    filteredResult[cursor] = this._map(current[i]);
                                    if (!(filteredResult[cursor] instanceof org.mwg.plugin.AbstractNode)) {
                                        onlyContainsNodes = false;
                                    }
                                    cursor++;
                                }
                                else {
                                    onlyContainsNodes = false;
                                    filteredResult[cursor] = current[i];
                                    cursor++;
                                }
                            }
                        }
                        if (onlyContainsNodes) {
                            var finalNodes = new Array(cursor);
                            java.lang.System.arraycopy(filteredResult, 0, finalNodes, 0, cursor);
                            return finalNodes;
                        }
                        else {
                            if (cursor == filteredResult.length) {
                                return filteredResult;
                            }
                            else {
                                var shrinkedResult = new Array(cursor);
                                java.lang.System.arraycopy(filteredResult, 0, shrinkedResult, 0, cursor);
                                return shrinkedResult;
                            }
                        }
                    };
                    return ActionMap;
                }());
                task_1.ActionMap = ActionMap;
                var ActionMath = (function () {
                    function ActionMath(mathExpression) {
                        this._engine = org.mwg.core.task.math.CoreMathExpressionEngine.parse(mathExpression);
                    }

                    ActionMath.prototype.eval = function (context) {
                        var previous = context.result();
                        var result = new java.util.ArrayList();
                        if (previous instanceof org.mwg.plugin.AbstractNode) {
                            var variables = new java.util.HashMap();
                            variables.put("PI", Math.PI);
                            variables.put("TRUE", 1.0);
                            variables.put("FALSE", 0.0);
                            result.add(this._engine.eval(previous, variables));
                        }
                        else {
                            if (Array.isArray(previous)) {
                                this.arrayEval(previous, result);
                            }
                        }
                        context.setResult(result.toArray(new Array(result.size())));
                        context.next();
                    };
                    ActionMath.prototype.arrayEval = function (objs, result) {
                        for (var i = 0; i < objs.length; i++) {
                            if (objs[i] instanceof org.mwg.plugin.AbstractNode) {
                                var variables = new java.util.HashMap();
                                variables.put("PI", Math.PI);
                                variables.put("TRUE", 1.0);
                                variables.put("FALSE", 0.0);
                                result.add(this._engine.eval(objs[i], variables));
                            }
                            else {
                                if (Array.isArray(objs[i])) {
                                    this.arrayEval(objs[i], result);
                                }
                            }
                        }
                    };
                    return ActionMath;
                }());
                task_1.ActionMath = ActionMath;
                var ActionNewNode = (function () {
                    function ActionNewNode() {
                    }

                    ActionNewNode.prototype.eval = function (context) {
                        context.setResult(context.graph().newNode(context.world(), context.time()));
                        context.next();
                    };
                    return ActionNewNode;
                }());
                task_1.ActionNewNode = ActionNewNode;
                var ActionNoop = (function () {
                    function ActionNoop() {
                    }

                    ActionNoop.prototype.eval = function (context) {
                        var previousResult = context.result();
                        context.setResult(previousResult);
                        context.next();
                    };
                    return ActionNoop;
                }());
                task_1.ActionNoop = ActionNoop;
                var ActionRemove = (function () {
                    function ActionRemove(relationName, variableNameToRemove) {
                        this._relationName = relationName;
                        this._variableNameToRemove = variableNameToRemove;
                    }

                    ActionRemove.prototype.eval = function (context) {
                        var previousResult = context.result();
                        var savedVar = context.variable(this._variableNameToRemove);
                        if (savedVar instanceof org.mwg.plugin.AbstractNode) {
                            if (previousResult instanceof org.mwg.plugin.AbstractNode) {
                                previousResult.remove(this._relationName, savedVar);
                            }
                            else {
                                if (Array.isArray(previousResult)) {
                                    this.removeFromArray(previousResult, this._relationName, savedVar);
                                }
                            }
                        }
                        context.setResult(previousResult);
                        context.next();
                    };
                    ActionRemove.prototype.removeFromArray = function (objs, relName, toRemove) {
                        for (var i = 0; i < objs.length; i++) {
                            if (objs[i] instanceof org.mwg.plugin.AbstractNode) {
                                objs[i].remove(relName, toRemove);
                            }
                            else {
                                if (Array.isArray(objs[i])) {
                                    this.removeFromArray(objs[i], relName, toRemove);
                                }
                            }
                        }
                    };
                    return ActionRemove;
                }());
                task_1.ActionRemove = ActionRemove;
                var ActionRemoveProperty = (function () {
                    function ActionRemoveProperty(propertyName) {
                        this._propertyName = propertyName;
                    }

                    ActionRemoveProperty.prototype.eval = function (context) {
                        var previousResult = context.result();
                        if (previousResult instanceof org.mwg.plugin.AbstractNode) {
                            previousResult.removeProperty(this._propertyName);
                        }
                        else {
                            if (Array.isArray(previousResult)) {
                                this.removePropertyFromArray(previousResult);
                            }
                        }
                        context.setResult(previousResult);
                        context.next();
                    };
                    ActionRemoveProperty.prototype.removePropertyFromArray = function (objs) {
                        for (var i = 0; i < objs.length; i++) {
                            if (objs[i] instanceof org.mwg.plugin.AbstractNode) {
                                objs[i].removeProperty(this._propertyName);
                            }
                            else {
                                if (Array.isArray(objs[i])) {
                                    this.removePropertyFromArray(objs[i]);
                                }
                            }
                        }
                    };
                    return ActionRemoveProperty;
                }());
                task_1.ActionRemoveProperty = ActionRemoveProperty;
                var ActionSave = (function () {
                    function ActionSave() {
                    }

                    ActionSave.prototype.eval = function (context) {
                        context.graph().save(function (result) {
                            context.next();
                        });
                    };
                    return ActionSave;
                }());
                task_1.ActionSave = ActionSave;
                var ActionSelect = (function () {
                    function ActionSelect(p_filter) {
                        this._filter = p_filter;
                    }

                    ActionSelect.prototype.eval = function (context) {
                        var previousResult = context.result();
                        if (previousResult != null) {
                            if (Array.isArray(previousResult)) {
                                context.setResult(this.filterArray(previousResult));
                            }
                            else {
                                if (previousResult instanceof org.mwg.plugin.AbstractNode) {
                                    if (this._filter(previousResult)) {
                                        context.setResult(previousResult);
                                    }
                                    else {
                                        context.setResult(new Array(0));
                                    }
                                }
                                else {
                                    context.setResult(previousResult);
                                }
                            }
                        }
                        context.next();
                    };
                    ActionSelect.prototype.filterArray = function (current) {
                        var onlyContainsNodes = true;
                        var filteredResult = new Array(current.length);
                        var cursor = 0;
                        for (var i = 0; i < current.length; i++) {
                            if (Array.isArray(current[i])) {
                                onlyContainsNodes = false;
                                var filtered = this.filterArray(current[i]);
                                if (filtered != null && filtered.length > 0) {
                                    filteredResult[cursor] = filtered;
                                    cursor++;
                                }
                            }
                            else {
                                if (current[i] != null && current[i] instanceof org.mwg.plugin.AbstractNode) {
                                    if (this._filter(current[i])) {
                                        filteredResult[cursor] = current[i];
                                        cursor++;
                                    }
                                }
                                else {
                                    onlyContainsNodes = false;
                                    filteredResult[cursor] = current[i];
                                    cursor++;
                                }
                            }
                        }
                        if (onlyContainsNodes) {
                            var finalNodes = new Array(cursor);
                            java.lang.System.arraycopy(filteredResult, 0, finalNodes, 0, cursor);
                            return finalNodes;
                        }
                        else {
                            if (cursor == filteredResult.length) {
                                return filteredResult;
                            }
                            else {
                                var shrinkedResult = new Array(cursor);
                                java.lang.System.arraycopy(filteredResult, 0, shrinkedResult, 0, cursor);
                                return shrinkedResult;
                            }
                        }
                    };
                    return ActionSelect;
                }());
                task_1.ActionSelect = ActionSelect;
                var ActionSet = (function () {
                    function ActionSet(relationName, variableNameToSet) {
                        this._relationName = relationName;
                        this._variableNameToSet = variableNameToSet;
                    }

                    ActionSet.prototype.eval = function (context) {
                        var previousResult = context.result();
                        var savedVar = context.variable(this._variableNameToSet);
                        if (previousResult instanceof org.mwg.plugin.AbstractNode) {
                            previousResult.set(this._relationName, savedVar);
                        }
                        else {
                            if (Array.isArray(previousResult)) {
                                this.setFromArray(previousResult, this._relationName, savedVar);
                            }
                        }
                        context.setResult(previousResult);
                        context.next();
                    };
                    ActionSet.prototype.setFromArray = function (objs, relName, toSet) {
                        for (var i = 0; i < objs.length; i++) {
                            if (objs[i] instanceof org.mwg.plugin.AbstractNode) {
                                objs[i].set(relName, toSet);
                            }
                            else {
                                if (Array.isArray(objs[i])) {
                                    this.setFromArray(objs[i], relName, toSet);
                                }
                            }
                        }
                    };
                    return ActionSet;
                }());
                task_1.ActionSet = ActionSet;
                var ActionSetProperty = (function () {
                    function ActionSetProperty(relationName, propertyType, variableNameToSet) {
                        this._relationName = relationName;
                        this._variableNameToSet = variableNameToSet;
                        this._propertyType = propertyType;
                    }

                    ActionSetProperty.prototype.eval = function (context) {
                        var previousResult = context.result();
                        var savedVar = context.variable(this._variableNameToSet);
                        if (previousResult instanceof org.mwg.plugin.AbstractNode) {
                            previousResult.setProperty(this._relationName, this._propertyType, savedVar);
                        }
                        else {
                            if (Array.isArray(previousResult)) {
                                this.setFromArray(previousResult, this._relationName, savedVar);
                            }
                        }
                        context.setResult(previousResult);
                        context.next();
                    };
                    ActionSetProperty.prototype.setFromArray = function (objs, relName, toSet) {
                        for (var i = 0; i < objs.length; i++) {
                            if (objs[i] instanceof org.mwg.plugin.AbstractNode) {
                                objs[i].setProperty(relName, this._propertyType, toSet);
                            }
                            else {
                                if (Array.isArray(objs[i])) {
                                    this.setFromArray(objs[i], relName, toSet);
                                }
                            }
                        }
                    };
                    return ActionSetProperty;
                }());
                task_1.ActionSetProperty = ActionSetProperty;
                var ActionSetVar = (function () {
                    function ActionSetVar(name, value) {
                        this._name = name;
                        this._value = value;
                    }

                    ActionSetVar.prototype.eval = function (context) {
                        context.setVariable(this._name, this._value);
                        context.setResult(context.result());
                        context.next();
                    };
                    return ActionSetVar;
                }());
                task_1.ActionSetVar = ActionSetVar;
                var ActionTime = (function () {
                    function ActionTime(p_time) {
                        this._time = p_time;
                    }

                    ActionTime.prototype.eval = function (context) {
                        context.setTime(this._time);
                        context.setResult(context.result());
                        context.next();
                    };
                    return ActionTime;
                }());
                task_1.ActionTime = ActionTime;
                var ActionTraverse = (function () {
                    function ActionTraverse(p_name) {
                        this._name = p_name;
                    }

                    ActionTraverse.prototype.eval = function (context) {
                        var previousResult = context.result();
                        if (previousResult != null) {
                            var toLoad = new java.util.HashSet();
                            if (Array.isArray(previousResult)) {
                                this.collectArray(previousResult, toLoad);
                            }
                            else {
                                if (previousResult instanceof org.mwg.plugin.AbstractNode) {
                                    var loop = previousResult;
                                    var rel = loop.get(this._name);
                                    if (rel != null && rel instanceof Float64Array) {
                                        var interResult = rel;
                                        for (var j = 0; j < interResult.length; j++) {
                                            toLoad.add(interResult[j]);
                                        }
                                    }
                                }
                            }
                            var deferCounter = context.graph().newCounter(toLoad.size());
                            var resultNodes = new Array(toLoad.size());
                            var cursor = new java.util.concurrent.atomic.AtomicInteger(0);
                            toLoad.forEach(function (idNode) {
                                context.graph().lookup(context.world(), context.time(), idNode, function (result) {
                                    resultNodes[cursor.getAndIncrement()] = result;
                                    deferCounter.count();
                                });
                            });
                            deferCounter.then(function () {
                                context.setResult(resultNodes);
                                context.next();
                            });
                        }
                        else {
                            context.next();
                        }
                    };
                    ActionTraverse.prototype.collectArray = function (current, toLoad) {
                        for (var i = 0; i < current.length; i++) {
                            if (Array.isArray(current[i])) {
                                this.collectArray(current[i], toLoad);
                            }
                            else {
                                if (current[i] instanceof org.mwg.plugin.AbstractNode) {
                                    var loop = current[i];
                                    var rel = loop.get(this._name);
                                    if (rel != null && rel instanceof Float64Array) {
                                        var interResult = rel;
                                        for (var j = 0; j < interResult.length; j++) {
                                            toLoad.add(interResult[j]);
                                        }
                                    }
                                }
                            }
                        }
                    };
                    return ActionTraverse;
                }());
                task_1.ActionTraverse = ActionTraverse;
                var ActionTraverseIndex = (function () {
                    function ActionTraverseIndex(indexName, query) {
                        this._query = query;
                        this._indexName = indexName;
                    }

                    ActionTraverseIndex.prototype.eval = function (context) {
                        var previousResult = context.result();
                        if (previousResult != null) {
                            var toLoad;
                            if (previousResult instanceof org.mwg.plugin.AbstractNode) {
                                toLoad = [previousResult];
                            }
                            else {
                                if (Array.isArray(previousResult)) {
                                    toLoad = this.getNodes(previousResult);
                                }
                                else {
                                    toLoad = new Array(0);
                                }
                            }
                            var countNbNodeToLoad = this.countNbNodeToLoad(toLoad);
                            var counter = new org.mwg.core.utility.CoreDeferCounter(toLoad.length);
                            var resultNodes = new Array(countNbNodeToLoad);
                            var cursor = new java.util.concurrent.atomic.AtomicInteger(0);
                            for (var i = 0; i < toLoad.length; i++) {
                                var node = toLoad[i];
                                if (this._query != null) {
                                    var queryObj = node.graph().newQuery();
                                    queryObj.setWorld(context.world());
                                    queryObj.setTime(context.time());
                                    queryObj.parse(this._query);
                                    queryObj.setIndexName(this._indexName);
                                    node.findByQuery(queryObj, function (result) {
                                        result.forEach(function (n) {
                                            if (n != null) {
                                                resultNodes[cursor.getAndIncrement()] = n;
                                            }
                                        });
                                        counter.count();
                                    });
                                }
                                else {
                                    node.findAll(this._indexName, function (result) {
                                        result.forEach(function (n) {
                                            if (n != null) {
                                                resultNodes[cursor.getAndIncrement()] = n;
                                            }
                                        });
                                        counter.count();
                                    });
                                }
                            }
                            counter.then(function () {
                                if (cursor.get() == resultNodes.length) {
                                    context.setResult(resultNodes);
                                }
                                else {
                                    var newResult = new Array(cursor.get());
                                    java.lang.System.arraycopy(resultNodes, 0, newResult, 0, cursor.get());
                                    context.setResult(newResult);
                                }
                                context.next();
                            });
                        }
                    };
                    ActionTraverseIndex.prototype.getNodes = function (previousResult) {
                        var result = new Array(0);
                        for (var i = 0; i < previousResult.length; i++) {
                            if (previousResult[i] instanceof org.mwg.plugin.AbstractNode) {
                                var tmp = new Array(result.length + 1);
                                java.lang.System.arraycopy(result, 0, tmp, 0, result.length);
                                tmp[result.length] = previousResult[i];
                                result = tmp;
                            }
                            else {
                                if (Array.isArray(previousResult[i])) {
                                    var nodes = this.getNodes(previousResult[i]);
                                    var tmp = new Array(result.length + nodes.length);
                                    java.lang.System.arraycopy(result, 0, tmp, 0, result.length);
                                    java.lang.System.arraycopy(nodes, 0, tmp, result.length, nodes.length);
                                    result = tmp;
                                }
                            }
                        }
                        return result;
                    };
                    ActionTraverseIndex.prototype.countNbNodeToLoad = function (nodes) {
                        var _this = this;
                        var nbNoadToLoad = 0;
                        nodes.forEach(function (node) {
                            if (node != null) {
                                var indexed = node.get(_this._indexName);
                                if (indexed != null) {
                                    nbNoadToLoad += indexed.size();
                                }
                            }
                        });
                        return nbNoadToLoad;
                    };
                    return ActionTraverseIndex;
                }());
                task_1.ActionTraverseIndex = ActionTraverseIndex;
                var ActionTraverseOrKeep = (function () {
                    function ActionTraverseOrKeep(p_name) {
                        this._name = p_name;
                    }

                    ActionTraverseOrKeep.prototype.eval = function (context) {
                        var previousResult = context.result();
                        if (previousResult != null) {
                            var toLoad = new java.util.HashSet();
                            if (Array.isArray(previousResult)) {
                                this.collectArray(previousResult, toLoad);
                            }
                            else {
                                if (previousResult instanceof org.mwg.plugin.AbstractNode) {
                                    var loop = previousResult;
                                    var rel = loop.get(this._name);
                                    if (rel != null && rel instanceof Float64Array) {
                                        var interResult = rel;
                                        for (var j = 0; j < interResult.length; j++) {
                                            toLoad.add(interResult[j]);
                                        }
                                    }
                                    else {
                                        toLoad.add(loop.id());
                                    }
                                }
                            }
                            var deferCounter = context.graph().newCounter(toLoad.size());
                            var resultNodes = new Array(toLoad.size());
                            var cursor = new java.util.concurrent.atomic.AtomicInteger(0);
                            toLoad.forEach(function (idNode) {
                                context.graph().lookup(context.world(), context.time(), idNode, function (result) {
                                    resultNodes[cursor.getAndIncrement()] = result;
                                    deferCounter.count();
                                });
                            });
                            deferCounter.then(function () {
                                context.setResult(resultNodes);
                                context.next();
                            });
                        }
                        else {
                            context.next();
                        }
                    };
                    ActionTraverseOrKeep.prototype.collectArray = function (current, toLoad) {
                        for (var i = 0; i < current.length; i++) {
                            if (Array.isArray(current[i])) {
                                this.collectArray(current[i], toLoad);
                            }
                            else {
                                if (current[i] instanceof org.mwg.plugin.AbstractNode) {
                                    var loop = current[i];
                                    var rel = loop.get(this._name);
                                    if (rel != null && rel instanceof Float64Array) {
                                        var interResult = rel;
                                        for (var j = 0; j < interResult.length; j++) {
                                            toLoad.add(interResult[j]);
                                        }
                                    }
                                    else {
                                        toLoad.add(loop.id());
                                    }
                                }
                            }
                        }
                    };
                    return ActionTraverseOrKeep;
                }());
                task_1.ActionTraverseOrKeep = ActionTraverseOrKeep;
                var ActionTrigger = (function () {
                    function ActionTrigger(p_subTask) {
                        this._subTask = p_subTask;
                    }

                    ActionTrigger.prototype.eval = function (context) {
                        this._subTask.executeThenAsync(context, context.result(), function (subTaskFinalContext) {
                            context.setResult(subTaskFinalContext);
                            context.next();
                        });
                    };
                    return ActionTrigger;
                }());
                task_1.ActionTrigger = ActionTrigger;
                var ActionWhileDo = (function () {
                    function ActionWhileDo(p_cond, p_then) {
                        this._cond = p_cond;
                        this._then = p_then;
                    }

                    ActionWhileDo.prototype.eval = function (context) {
                    };
                    return ActionWhileDo;
                }());
                task_1.ActionWhileDo = ActionWhileDo;
                var ActionWith = (function (_super) {
                    __extends(ActionWith, _super);
                    function ActionWith(name, pattern) {
                        _super.call(this, function (node) {
                            if (node != null) {
                                var currentName = node.get(name);
                                if (currentName != null && pattern.test(currentName.toString())) {
                                    return true;
                                }
                            }
                            return false;
                        });
                    }

                    return ActionWith;
                }(org.mwg.core.task.ActionSelect));
                task_1.ActionWith = ActionWith;
                var ActionWithout = (function (_super) {
                    __extends(ActionWithout, _super);
                    function ActionWithout(name, pattern) {
                        _super.call(this, function (node) {
                            if (node != null) {
                                var currentName = node.get(name);
                                if (currentName == null || !pattern.test(currentName.toString())) {
                                    return true;
                                }
                            }
                            return false;
                        });
                    }

                    return ActionWithout;
                }(org.mwg.core.task.ActionSelect));
                task_1.ActionWithout = ActionWithout;
                var ActionWorld = (function () {
                    function ActionWorld(p_world) {
                        this._world = p_world;
                    }

                    ActionWorld.prototype.eval = function (context) {
                        context.setWorld(this._world);
                        context.setResult(context.result());
                        context.next();
                    };
                    return ActionWorld;
                }());
                task_1.ActionWorld = ActionWorld;
                var ActionWrapper = (function () {
                    function ActionWrapper(p_wrapped, p_syncProtection) {
                        this._wrapped = p_wrapped;
                        this._syncProtection = p_syncProtection;
                    }

                    ActionWrapper.prototype.eval = function (context) {
                        if (this._syncProtection) {
                            this._wrapped(new org.mwg.core.task.TaskContextWrapper(context));
                            context.next();
                        }
                        else {
                            this._wrapped(context);
                        }
                    };
                    return ActionWrapper;
                }());
                task_1.ActionWrapper = ActionWrapper;
                var CoreTask = (function () {
                    function CoreTask(p_graph) {
                        this._actions = new Array(10);
                        this._actionCursor = 0;
                        this._graph = p_graph;
                    }

                    CoreTask.prototype.addAction = function (task) {
                        if (this._actionCursor == this._actions.length) {
                            var temp_actions = new Array(this._actions.length * 2);
                            java.lang.System.arraycopy(this._actions, 0, temp_actions, 0, this._actions.length);
                            this._actions = temp_actions;
                        }
                        this._actions[this._actionCursor] = task;
                        this._actionCursor++;
                    };
                    CoreTask.prototype.setWorld = function (world) {
                        this.addAction(new org.mwg.core.task.ActionWorld(world));
                        return this;
                    };
                    CoreTask.prototype.setTime = function (time) {
                        this.addAction(new org.mwg.core.task.ActionTime(time));
                        return this;
                    };
                    CoreTask.prototype.fromIndex = function (indexName, query) {
                        if (indexName == null) {
                            throw new Error("indexName should not be null");
                        }
                        if (query == null) {
                            throw new Error("query should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionFromIndex(indexName, query));
                        return this;
                    };
                    CoreTask.prototype.fromIndexAll = function (indexName) {
                        if (indexName == null) {
                            throw new Error("indexName should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionFromIndexAll(indexName));
                        return this;
                    };
                    CoreTask.prototype.selectWith = function (name, pattern) {
                        if (pattern == null) {
                            throw new Error("pattern should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionWith(name, new RegExp(pattern)));
                        return this;
                    };
                    CoreTask.prototype.selectWithout = function (name, pattern) {
                        if (pattern == null) {
                            throw new Error("pattern should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionWithout(name, new RegExp(pattern)));
                        return this;
                    };
                    CoreTask.prototype.asVar = function (variableName) {
                        if (variableName == null) {
                            throw new Error("variableName should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionAsVar(variableName));
                        return this;
                    };
                    CoreTask.prototype.fromVar = function (variableName) {
                        if (variableName == null) {
                            throw new Error("variableName should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionFromVar(variableName));
                        return this;
                    };
                    CoreTask.prototype.setVar = function (variableName, inputValue) {
                        if (variableName == null) {
                            throw new Error("variableName should not be null");
                        }
                        if (inputValue == null) {
                            throw new Error("inputValue should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionSetVar(variableName, inputValue));
                        return this;
                    };
                    CoreTask.prototype.select = function (filter) {
                        if (filter == null) {
                            throw new Error("filter should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionSelect(filter));
                        return this;
                    };
                    CoreTask.prototype.selectWhere = function (subTask) {
                        throw new Error("Not implemented yet");
                    };
                    CoreTask.prototype.get = function (name) {
                        this.addAction(new org.mwg.core.task.ActionGet(name));
                        return this;
                    };
                    CoreTask.prototype.traverse = function (relationName) {
                        this.addAction(new org.mwg.core.task.ActionTraverse(relationName));
                        return this;
                    };
                    CoreTask.prototype.traverseOrKeep = function (relationName) {
                        this.addAction(new org.mwg.core.task.ActionTraverseOrKeep(relationName));
                        return this;
                    };
                    CoreTask.prototype.traverseIndex = function (indexName, query) {
                        if (indexName == null) {
                            throw new Error("indexName should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionTraverseIndex(indexName, query));
                        return this;
                    };
                    CoreTask.prototype.traverseIndexAll = function (indexName) {
                        if (indexName == null) {
                            throw new Error("indexName should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionTraverseIndex(indexName, null));
                        return this;
                    };
                    CoreTask.prototype.map = function (mapFunction) {
                        if (mapFunction == null) {
                            throw new Error("mapFunction should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionMap(mapFunction));
                        return this;
                    };
                    CoreTask.prototype.flatMap = function (flatMapFunction) {
                        throw new Error("Not implemented yet");
                    };
                    CoreTask.prototype.group = function (groupFunction) {
                        throw new Error("Not implemented yet");
                    };
                    CoreTask.prototype.groupWhere = function (groupSubTask) {
                        throw new Error("Not implemented yet");
                    };
                    CoreTask.prototype.from = function (inputValue) {
                        if (inputValue == null) {
                            throw new Error("inputValue should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionFrom(this.protect(inputValue)));
                        return this;
                    };
                    CoreTask.prototype.executeSubTask = function (subTask) {
                        if (subTask == null) {
                            throw new Error("subTask should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionTrigger(subTask));
                        return this;
                    };
                    CoreTask.prototype.ifThen = function (cond, then) {
                        if (cond == null) {
                            throw new Error("condition should not be null");
                        }
                        if (then == null) {
                            throw new Error("subTask should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionIfThen(cond, then));
                        return this;
                    };
                    CoreTask.prototype.whileDo = function (cond, then) {
                        throw new Error("Not implemented yet");
                    };
                    CoreTask.prototype.then = function (p_action) {
                        if (p_action == null) {
                            throw new Error("action should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionWrapper(p_action, true));
                        return this;
                    };
                    CoreTask.prototype.thenAsync = function (p_action) {
                        if (p_action == null) {
                            throw new Error("action should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionWrapper(p_action, false));
                        return this;
                    };
                    CoreTask.prototype.foreachThen = function (action) {
                        if (action == null) {
                            throw new Error("action should not be null");
                        }
                        var task = this._graph.newTask().then(function (context) {
                            var previousResult = context.result();
                            if (previousResult != null) {
                                action(previousResult);
                            }
                        });
                        this.foreach(task);
                        return this;
                    };
                    CoreTask.prototype.foreach = function (subTask) {
                        if (subTask == null) {
                            throw new Error("subTask should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionForeach(subTask));
                        return this;
                    };
                    CoreTask.prototype.foreachPar = function (subTask) {
                        if (subTask == null) {
                            throw new Error("subTask should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionForeachPar(subTask));
                        return this;
                    };
                    CoreTask.prototype.save = function () {
                        this.addAction(new org.mwg.core.task.ActionSave());
                        return this;
                    };
                    CoreTask.prototype.execute = function () {
                        this.executeThenAsync(null, null, null);
                    };
                    CoreTask.prototype.executeWith = function (initialContext) {
                        this.executeThenAsync(initialContext, null, null);
                    };
                    CoreTask.prototype.executeThen = function (p_action) {
                        this.executeThenAsync(null, null, function (context) {
                            p_action(new org.mwg.core.task.TaskContextWrapper(context));
                            context.next();
                        });
                    };
                    CoreTask.prototype.executeThenAsync = function (parent, initialResult, p_finalAction) {
                        var final_actions = new Array(this._actionCursor + 2);
                        java.lang.System.arraycopy(this._actions, 0, final_actions, 0, this._actionCursor);
                        if (p_finalAction != null) {
                            final_actions[this._actionCursor] = new org.mwg.core.task.ActionWrapper(p_finalAction, false);
                        }
                        else {
                            final_actions[this._actionCursor] = new org.mwg.core.task.ActionNoop();
                        }
                        final_actions[this._actionCursor + 1] = {
                            eval: function (context) {
                                context.clean();
                            }
                        };
                        var context = new org.mwg.core.task.CoreTaskContext(parent, this.protect(initialResult), this._graph, final_actions);
                        if (parent != null) {
                            context.setWorld(parent.world());
                            context.setTime(parent.time());
                        }
                        this._graph.scheduler().dispatch(function () {
                            var first = final_actions[0];
                            first.eval(context);
                        });
                    };
                    CoreTask.prototype.action = function (name, flatParams) {
                        if (name == null) {
                            throw new Error("name should not be null");
                        }
                        if (flatParams == null) {
                            throw new Error("flatParams should not be null");
                        }
                        var actionFactory = this._graph.taskAction(name);
                        if (actionFactory == null) {
                            throw new Error("Unknown task action: " + name);
                        }
                        var paramsCapacity = org.mwg.core.CoreConstants.MAP_INITIAL_CAPACITY;
                        var params = new Array(paramsCapacity);
                        var paramsIndex = 0;
                        var cursor = 0;
                        var flatSize = flatParams.length;
                        var previous = 0;
                        while (cursor < flatSize) {
                            var current = flatParams.charAt(cursor);
                            if (current == org.mwg.Constants.QUERY_SEP) {
                                var param = flatParams.substring(previous, cursor);
                                if (param.length > 0) {
                                    if (paramsIndex >= paramsCapacity) {
                                        var newParamsCapacity = paramsCapacity * 2;
                                        var newParams = new Array(newParamsCapacity);
                                        java.lang.System.arraycopy(params, 0, newParams, 0, paramsCapacity);
                                        params = newParams;
                                        paramsCapacity = newParamsCapacity;
                                    }
                                    params[paramsIndex] = param;
                                    paramsIndex++;
                                }
                                previous = cursor + 1;
                            }
                            cursor++;
                        }
                        var param = flatParams.substring(previous, cursor);
                        if (param.length > 0) {
                            if (paramsIndex >= paramsCapacity) {
                                var newParamsCapacity = paramsCapacity * 2;
                                var newParams = new Array(newParamsCapacity);
                                java.lang.System.arraycopy(params, 0, newParams, 0, paramsCapacity);
                                params = newParams;
                                paramsCapacity = newParamsCapacity;
                            }
                            params[paramsIndex] = param;
                            paramsIndex++;
                        }
                        if (paramsIndex < params.length) {
                            var shrinked = new Array(paramsIndex);
                            java.lang.System.arraycopy(params, 0, shrinked, 0, paramsIndex);
                            params = shrinked;
                        }
                        this.addAction(actionFactory(params));
                        return this;
                    };
                    CoreTask.prototype.parse = function (flat) {
                        if (flat == null) {
                            throw new Error("flat should not be null");
                        }
                        var cursor = 0;
                        var flatSize = flat.length;
                        var previous = 0;
                        var actionName = null;
                        var isClosed = false;
                        var isEscaped = false;
                        while (cursor < flatSize) {
                            var current = flat.charAt(cursor);
                            switch (current) {
                                case '\'':
                                    isEscaped = true;
                                    while (cursor < flatSize) {
                                        if (flat.charAt(cursor) == '\'') {
                                            break;
                                        }
                                        cursor++;
                                    }
                                    break;
                                case org.mwg.Constants.TASK_SEP:
                                    if (!isClosed) {
                                        var getName = flat.substring(previous, cursor);
                                        this.action("get", getName);
                                    }
                                    actionName = null;
                                    isEscaped = false;
                                    previous = cursor + 1;
                                    break;
                                case org.mwg.Constants.TASK_PARAM_OPEN:
                                    actionName = flat.substring(previous, cursor);
                                    previous = cursor + 1;
                                    break;
                                case org.mwg.Constants.TASK_PARAM_CLOSE:
                                    var extracted;
                                    if (isEscaped) {
                                        extracted = flat.substring(previous + 1, cursor - 1);
                                    }
                                    else {
                                        extracted = flat.substring(previous, cursor);
                                    }
                                    this.action(actionName, extracted);
                                    actionName = null;
                                    previous = cursor + 1;
                                    isClosed = true;
                                    break;
                            }
                            cursor++;
                        }
                        if (!isClosed) {
                            var getName = flat.substring(previous, cursor);
                            if (getName.length > 0) {
                                this.action("get", getName);
                            }
                        }
                        return this;
                    };
                    CoreTask.prototype.protect = function (input) {
                        if (input instanceof org.mwg.plugin.AbstractNode) {
                            return this._graph.cloneNode(input);
                        }
                        else {
                            if (Array.isArray(input)) {
                                var casted = input;
                                var cloned = new Array(casted.length);
                                var isAllNode = true;
                                for (var i = 0; i < casted.length; i++) {
                                    cloned[i] = this.protect(casted[i]);
                                    isAllNode = isAllNode && (cloned[i] instanceof org.mwg.plugin.AbstractNode);
                                }
                                if (isAllNode) {
                                    var typedResult = new Array(cloned.length);
                                    java.lang.System.arraycopy(cloned, 0, typedResult, 0, cloned.length);
                                    return typedResult;
                                }
                                return cloned;
                            }
                            else {
                                return this.protectIterable(input);
                            }
                        }
                    };
                    CoreTask.prototype.protectIterable = function (input) {
                        if (input != null && input != undefined && input['iterator'] != undefined) {
                            var flat = [];
                            var it = input['iterator']();
                            while (it.hasNext()) {
                                flat.push(it.next());
                            }
                            return flat;
                        }
                        else {
                            return input;
                        }
                    };
                    CoreTask.prototype.newNode = function () {
                        this.addAction(new org.mwg.core.task.ActionNewNode());
                        return this;
                    };
                    CoreTask.prototype.set = function (propertyName, variableNameToSet) {
                        if (propertyName == null) {
                            throw new Error("propertyName should not be null");
                        }
                        if (variableNameToSet == null) {
                            throw new Error("propertyValue should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionSet(propertyName, variableNameToSet));
                        return this;
                    };
                    CoreTask.prototype.setProperty = function (propertyName, propertyType, variableNameToSet) {
                        if (propertyName == null) {
                            throw new Error("propertyName should not be null");
                        }
                        if (variableNameToSet == null) {
                            throw new Error("propertyValue should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionSetProperty(propertyName, propertyType, variableNameToSet));
                        return this;
                    };
                    CoreTask.prototype.removeProperty = function (propertyName) {
                        if (propertyName == null) {
                            throw new Error("propertyName should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionRemoveProperty(propertyName));
                        return this;
                    };
                    CoreTask.prototype.add = function (relationName, variableNameToAdd) {
                        if (relationName == null) {
                            throw new Error("relationName should not be null");
                        }
                        if (variableNameToAdd == null) {
                            throw new Error("relatedNode should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionAdd(relationName, variableNameToAdd));
                        return this;
                    };
                    CoreTask.prototype.remove = function (relationName, variableNameToRemove) {
                        if (relationName == null) {
                            throw new Error("relationName should not be null");
                        }
                        if (variableNameToRemove == null) {
                            throw new Error("variableNameToRemove should not be null");
                        }
                        this.addAction(new org.mwg.core.task.ActionRemove(relationName, variableNameToRemove));
                        return this;
                    };
                    CoreTask.prototype.math = function (expression) {
                        this.addAction(new org.mwg.core.task.ActionMath(expression));
                        return this;
                    };
                    CoreTask.fillDefault = function (registry) {
                        registry.put("get", function (params) {
                            if (params.length != 1) {
                                throw new Error("get action need one parameter");
                            }
                            return new org.mwg.core.task.ActionGet(params[0]);
                        });
                        registry.put("math", function (params) {
                            if (params.length != 1) {
                                throw new Error("math action need one parameter");
                            }
                            return new org.mwg.core.task.ActionMath(params[0]);
                        });
                        registry.put("traverse", function (params) {
                            if (params.length != 1) {
                                throw new Error("traverse action need one parameter");
                            }
                            return new org.mwg.core.task.ActionTraverse(params[0]);
                        });
                        registry.put("traverseOrKeep", function (params) {
                            if (params.length != 1) {
                                throw new Error("traverseOrKeep action need one parameter");
                            }
                            return new org.mwg.core.task.ActionTraverseOrKeep(params[0]);
                        });
                        registry.put("fromIndexAll", function (params) {
                            if (params.length != 1) {
                                throw new Error("fromIndexAll action need one parameter");
                            }
                            return new org.mwg.core.task.ActionFromIndexAll(params[0]);
                        });
                        registry.put("fromIndex", function (params) {
                            if (params.length != 2) {
                                throw new Error("fromIndex action need two parameter");
                            }
                            return new org.mwg.core.task.ActionFromIndex(params[0], params[1]);
                        });
                        registry.put("with", function (params) {
                            if (params.length != 2) {
                                throw new Error("with action need two parameter");
                            }
                            return new org.mwg.core.task.ActionWith(params[0], new RegExp(params[1]));
                        });
                        registry.put("without", function (params) {
                            if (params.length != 2) {
                                throw new Error("without action need two parameter");
                            }
                            return new org.mwg.core.task.ActionWithout(params[0], new RegExp(params[1]));
                        });
                    };
                    return CoreTask;
                }());
                task_1.CoreTask = CoreTask;
                var CoreTaskContext = (function () {
                    function CoreTaskContext(p_parentContext, p_initialResult, p_graph, p_actions) {
                        this._world = 0;
                        this._time = 0;
                        this._graph = p_graph;
                        this._parentContext = p_parentContext;
                        this._initialResult = p_initialResult;
                        this._variables = new java.util.ConcurrentHashMap();
                        this._results = new Array(p_actions.length);
                        this._actions = p_actions;
                        this._currentTaskId = new java.util.concurrent.atomic.AtomicInteger(0);
                    }

                    CoreTaskContext.prototype.graph = function () {
                        return this._graph;
                    };
                    CoreTaskContext.prototype.world = function () {
                        return this._world;
                    };
                    CoreTaskContext.prototype.setWorld = function (p_world) {
                        this._world = p_world;
                    };
                    CoreTaskContext.prototype.time = function () {
                        return this._time;
                    };
                    CoreTaskContext.prototype.setTime = function (p_time) {
                        this._time = p_time;
                    };
                    CoreTaskContext.prototype.variable = function (name) {
                        var result = this._variables.get(name);
                        if (result != null) {
                            return result;
                        }
                        if (this._parentContext != null) {
                            return this._parentContext.variable(name);
                        }
                        return null;
                    };
                    CoreTaskContext.prototype.variablesKeys = function () {
                        var result = new Array(this._variables.size());
                        var index = 0;
                        this._variables.keySet().forEach(function (key) {
                            result[index++] = key;
                        });
                        return result;
                    };
                    CoreTaskContext.prototype.addToVariable = function (name, value) {
                        var result = this._variables.get(name);
                        if (result == null) {
                            var newArr = new Array(1);
                            newArr[0] = value;
                            this._variables.put(name, newArr);
                        }
                        else {
                            if (Array.isArray(result)) {
                                var previous = result;
                                var incArr = new Array(previous.length + 1);
                                java.lang.System.arraycopy(previous, 0, incArr, 0, previous.length);
                                incArr[previous.length] = value;
                                this._variables.put(name, incArr);
                            }
                            else {
                                var newArr = new Array(2);
                                newArr[0] = result;
                                newArr[1] = value;
                                this._variables.put(name, newArr);
                            }
                        }
                    };
                    CoreTaskContext.prototype.setVariable = function (name, value) {
                        if (value != null) {
                            this._variables.put(name, value);
                        }
                        else {
                            this._variables.remove(name);
                        }
                    };
                    CoreTaskContext.prototype.result = function () {
                        var current = this._currentTaskId.get();
                        if (current == 0) {
                            return this._initialResult;
                        }
                        else {
                            var previousResult = this._results[current - 1];
                            if (previousResult != null && previousResult instanceof org.mwg.core.task.CoreTaskContext) {
                                return previousResult.result();
                            }
                            else {
                                if (previousResult != null && arrayInstanceOf(previousResult, org.mwg.core.task.CoreTaskContext)) {
                                    var contexts = previousResult;
                                    var result = new Array(contexts.length);
                                    var result_index = 0;
                                    for (var i = 0; i < contexts.length; i++) {
                                        var currentLoop = contexts[i].result();
                                        if (currentLoop != null) {
                                            result[result_index] = currentLoop;
                                            result_index++;
                                        }
                                    }
                                    if (contexts.length == result_index) {
                                        return result;
                                    }
                                    else {
                                        var shrinked = new Array(result_index);
                                        java.lang.System.arraycopy(result, 0, shrinked, 0, result_index);
                                        return shrinked;
                                    }
                                }
                                else {
                                    return previousResult;
                                }
                            }
                        }
                    };
                    CoreTaskContext.prototype.setResult = function (actionResult) {
                        var _this = this;
                        if (actionResult instanceof org.mwg.core.task.CoreTaskContext || actionResult instanceof org.mwg.core.task.TaskContextWrapper) {
                            this.mergeVariables(actionResult);
                        }
                        else {
                            if (arrayInstanceOf(actionResult, org.mwg.core.task.CoreTaskContext) || arrayInstanceOf(actionResult, org.mwg.core.task.TaskContextWrapper)) {
                                actionResult.forEach(function (taskContext) {
                                    _this.mergeVariables(taskContext);
                                });
                            }
                        }
                        var i = this._currentTaskId.get();
                        this._results[i] = actionResult;
                    };
                    CoreTaskContext.prototype.mergeVariables = function (actionResult) {
                        var _this = this;
                        var variables = actionResult.variablesKeys();
                        variables.forEach(function (variableName) {
                            _this.setVariable(variableName, actionResult.variable(variableName));
                        });
                    };
                    CoreTaskContext.prototype.next = function () {
                        var nextAction = this._actions[this._currentTaskId.incrementAndGet()];
                        nextAction.eval(this);
                    };
                    CoreTaskContext.prototype.clean = function () {
                        if (this._initialResult != null) {
                            this.cleanObj(this._initialResult);
                            this._initialResult = null;
                        }
                        for (var i = 0; i < this._results.length; i++) {
                            this.cleanObj(this._results[i]);
                            this._results[i] = null;
                        }
                    };
                    CoreTaskContext.prototype.cleanObj = function (o) {
                        var selfPoiner = this;
                        if (!org.mwg.core.utility.PrimitiveHelper.iterate(o, function (result) {
                                if (result instanceof org.mwg.plugin.AbstractNode) {
                                    result.free();
                                }
                                else {
                                    if (result instanceof org.mwg.core.task.CoreTaskContext) {
                                        result.clean();
                                    }
                                    else {
                                        selfPoiner.cleanObj(result);
                                    }
                                }
                            })) {
                            if (o instanceof org.mwg.plugin.AbstractNode) {
                                o.free();
                            }
                            else {
                                if (o instanceof org.mwg.core.task.CoreTaskContext) {
                                    o.clean();
                                }
                            }
                        }
                    };
                    return CoreTaskContext;
                }());
                task_1.CoreTaskContext = CoreTaskContext;
                var math;
                (function (math) {
                    var CoreMathExpressionEngine = (function () {
                        function CoreMathExpressionEngine(expression) {
                            this._cacheAST = this.buildAST(this.shuntingYard(expression));
                        }

                        CoreMathExpressionEngine.parse = function (p_expression) {
                            return new org.mwg.core.task.math.CoreMathExpressionEngine(p_expression);
                        };
                        CoreMathExpressionEngine.isNumber = function (st) {
                            return !isNaN(+st);
                        };
                        CoreMathExpressionEngine.isDigit = function (c) {
                            var cc = c.charCodeAt(0);
                            if (cc >= 0x30 && cc <= 0x39) {
                                return true;
                            }
                            return false;
                        };
                        CoreMathExpressionEngine.isLetter = function (c) {
                            var cc = c.charCodeAt(0);
                            if ((cc >= 0x41 && cc <= 0x5A) || (cc >= 0x61 && cc <= 0x7A)) {
                                return true;
                            }
                            return false;
                        };
                        CoreMathExpressionEngine.isWhitespace = function (c) {
                            var cc = c.charCodeAt(0);
                            if ((cc >= 0x0009 && cc <= 0x000D) || (cc == 0x0020) || (cc == 0x0085) || (cc == 0x00A0)) {
                                return true;
                            }
                            return false;
                        };
                        CoreMathExpressionEngine.prototype.shuntingYard = function (expression) {
                            var outputQueue = new java.util.ArrayList();
                            var stack = new java.util.Stack();
                            var tokenizer = new org.mwg.core.task.math.MathExpressionTokenizer(expression);
                            var lastFunction = null;
                            var previousToken = null;
                            while (tokenizer.hasNext()) {
                                var token = tokenizer.next();
                                if (org.mwg.core.task.math.MathEntities.getINSTANCE().functions.keySet().contains(token.toUpperCase())) {
                                    stack.push(token);
                                    lastFunction = token;
                                }
                                else {
                                    if ("," === token) {
                                        while (!stack.isEmpty() && !("(" === stack.peek())) {
                                            outputQueue.add(stack.pop());
                                        }
                                        if (stack.isEmpty()) {
                                            throw new Error("Parse error for function '" + lastFunction + "'");
                                        }
                                    }
                                    else {
                                        if (org.mwg.core.task.math.MathEntities.getINSTANCE().operators.keySet().contains(token)) {
                                            var o1 = org.mwg.core.task.math.MathEntities.getINSTANCE().operators.get(token);
                                            var token2 = stack.isEmpty() ? null : stack.peek();
                                            while (org.mwg.core.task.math.MathEntities.getINSTANCE().operators.keySet().contains(token2) && ((o1.isLeftAssoc() && o1.getPrecedence() <= org.mwg.core.task.math.MathEntities.getINSTANCE().operators.get(token2).getPrecedence()) || (o1.getPrecedence() < org.mwg.core.task.math.MathEntities.getINSTANCE().operators.get(token2).getPrecedence()))) {
                                                outputQueue.add(stack.pop());
                                                token2 = stack.isEmpty() ? null : stack.peek();
                                            }
                                            stack.push(token);
                                        }
                                        else {
                                            if ("(" === token) {
                                                if (previousToken != null) {
                                                    if (org.mwg.core.task.math.CoreMathExpressionEngine.isNumber(previousToken)) {
                                                        throw new Error("Missing operator at character position " + tokenizer.getPos());
                                                    }
                                                }
                                                stack.push(token);
                                            }
                                            else {
                                                if (")" === token) {
                                                    while (!stack.isEmpty() && !("(" === stack.peek())) {
                                                        outputQueue.add(stack.pop());
                                                    }
                                                    if (stack.isEmpty()) {
                                                        throw new Error("Mismatched parentheses");
                                                    }
                                                    stack.pop();
                                                    if (!stack.isEmpty() && org.mwg.core.task.math.MathEntities.getINSTANCE().functions.keySet().contains(stack.peek().toUpperCase())) {
                                                        outputQueue.add(stack.pop());
                                                    }
                                                }
                                                else {
                                                    outputQueue.add(token);
                                                }
                                            }
                                        }
                                    }
                                }
                                previousToken = token;
                            }
                            while (!stack.isEmpty()) {
                                var element = stack.pop();
                                if ("(" === element || ")" === element) {
                                    throw new Error("Mismatched parentheses");
                                }
                                outputQueue.add(element);
                            }
                            return outputQueue;
                        };
                        CoreMathExpressionEngine.prototype.eval = function (context, variables) {
                            if (this._cacheAST == null) {
                                throw new Error("Call parse before");
                            }
                            var stack = new java.util.Stack();
                            for (var ii = 0; ii < this._cacheAST.length; ii++) {
                                var mathToken = this._cacheAST[ii];
                                switch (mathToken.type()) {
                                    case 0:
                                        var v1 = stack.pop();
                                        var v2 = stack.pop();
                                        var castedOp = mathToken;
                                        stack.push(castedOp.eval(v2, v1));
                                        break;
                                    case 1:
                                        var castedFunction = mathToken;
                                        var p = new Float64Array(castedFunction.getNumParams());
                                        for (var i = castedFunction.getNumParams() - 1; i >= 0; i--) {
                                            p[i] = stack.pop();
                                        }
                                        stack.push(castedFunction.eval(p));
                                        break;
                                    case 2:
                                        var castedDouble = mathToken;
                                        stack.push(castedDouble.content());
                                        break;
                                    case 3:
                                        var castedFreeToken = mathToken;
                                        var resolvedVar = null;
                                        if (variables != null) {
                                            resolvedVar = variables.get(castedFreeToken.content());
                                        }
                                        if (resolvedVar != null) {
                                            stack.push(resolvedVar);
                                        }
                                        else {
                                            if (context != null) {
                                                if ("TIME" === castedFreeToken.content()) {
                                                    stack.push(context.time());
                                                }
                                                else {
                                                    var tokenName = castedFreeToken.content().trim();
                                                    var resolved;
                                                    var cleanName;
                                                    if (tokenName.length > 0 && tokenName.charAt(0) == '{' && tokenName.charAt(tokenName.length - 1) == '}') {
                                                        resolved = context.get(castedFreeToken.content().substring(1, tokenName.length - 1));
                                                        cleanName = castedFreeToken.content().substring(1, tokenName.length - 1);
                                                    }
                                                    else {
                                                        resolved = context.get(castedFreeToken.content());
                                                        cleanName = castedFreeToken.content();
                                                    }
                                                    if (cleanName.length > 0 && cleanName.charAt(0) == '$') {
                                                        cleanName = cleanName.substring(1);
                                                    }
                                                    if (resolved != null) {
                                                        var resultAsDouble = this.parseDouble(resolved.toString());
                                                        variables.put(cleanName, resultAsDouble);
                                                        var valueString = resolved.toString();
                                                        if (valueString === "true") {
                                                            stack.push(1.0);
                                                        }
                                                        else {
                                                            if (valueString === "false") {
                                                                stack.push(0.0);
                                                            }
                                                            else {
                                                                try {
                                                                    stack.push(resultAsDouble);
                                                                }
                                                                catch ($ex$) {
                                                                    if ($ex$ instanceof Error) {
                                                                        var e = $ex$;
                                                                    }
                                                                    else {
                                                                        throw $ex$;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        throw new Error("Unknow variable for name " + castedFreeToken.content());
                                                    }
                                                }
                                            }
                                            else {
                                                throw new Error("Unknow variable for name " + castedFreeToken.content());
                                            }
                                        }
                                        break;
                                }
                            }
                            var result = stack.pop();
                            if (result == null) {
                                return 0;
                            }
                            else {
                                return result;
                            }
                        };
                        CoreMathExpressionEngine.prototype.buildAST = function (rpn) {
                            var result = new Array(rpn.size());
                            for (var ii = 0; ii < rpn.size(); ii++) {
                                var token = rpn.get(ii);
                                if (org.mwg.core.task.math.MathEntities.getINSTANCE().operators.keySet().contains(token)) {
                                    result[ii] = org.mwg.core.task.math.MathEntities.getINSTANCE().operators.get(token);
                                }
                                else {
                                    if (org.mwg.core.task.math.MathEntities.getINSTANCE().functions.keySet().contains(token.toUpperCase())) {
                                        result[ii] = org.mwg.core.task.math.MathEntities.getINSTANCE().functions.get(token.toUpperCase());
                                    }
                                    else {
                                        if (token.length > 0 && org.mwg.core.task.math.CoreMathExpressionEngine.isLetter(token.charAt(0))) {
                                            result[ii] = new org.mwg.core.task.math.MathFreeToken(token);
                                        }
                                        else {
                                            try {
                                                var parsed = this.parseDouble(token);
                                                result[ii] = new org.mwg.core.task.math.MathDoubleToken(parsed);
                                            }
                                            catch ($ex$) {
                                                if ($ex$ instanceof Error) {
                                                    var e = $ex$;
                                                    result[ii] = new org.mwg.core.task.math.MathFreeToken(token);
                                                }
                                                else {
                                                    throw $ex$;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return result;
                        };
                        CoreMathExpressionEngine.prototype.parseDouble = function (val) {
                            return parseFloat(val);
                        };
                        CoreMathExpressionEngine.decimalSeparator = '.';
                        CoreMathExpressionEngine.minusSign = '-';
                        return CoreMathExpressionEngine;
                    }());
                    math.CoreMathExpressionEngine = CoreMathExpressionEngine;
                    var MathDoubleToken = (function () {
                        function MathDoubleToken(_content) {
                            this._content = _content;
                        }

                        MathDoubleToken.prototype.type = function () {
                            return 2;
                        };
                        MathDoubleToken.prototype.content = function () {
                            return this._content;
                        };
                        return MathDoubleToken;
                    }());
                    math.MathDoubleToken = MathDoubleToken;
                    var MathEntities = (function () {
                        function MathEntities() {
                            this.operators = new java.util.HashMap();
                            this.operators.put("+", new org.mwg.core.task.math.MathOperation("+", 20, true));
                            this.operators.put("-", new org.mwg.core.task.math.MathOperation("-", 20, true));
                            this.operators.put("*", new org.mwg.core.task.math.MathOperation("*", 30, true));
                            this.operators.put("/", new org.mwg.core.task.math.MathOperation("/", 30, true));
                            this.operators.put("%", new org.mwg.core.task.math.MathOperation("%", 30, true));
                            this.operators.put("^", new org.mwg.core.task.math.MathOperation("^", 40, false));
                            this.operators.put("&&", new org.mwg.core.task.math.MathOperation("&&", 4, false));
                            this.operators.put("||", new org.mwg.core.task.math.MathOperation("||", 2, false));
                            this.operators.put(">", new org.mwg.core.task.math.MathOperation(">", 10, false));
                            this.operators.put(">=", new org.mwg.core.task.math.MathOperation(">=", 10, false));
                            this.operators.put("<", new org.mwg.core.task.math.MathOperation("<", 10, false));
                            this.operators.put("<=", new org.mwg.core.task.math.MathOperation("<=", 10, false));
                            this.operators.put("==", new org.mwg.core.task.math.MathOperation("==", 7, false));
                            this.operators.put("!=", new org.mwg.core.task.math.MathOperation("!=", 7, false));
                            this.functions = new java.util.HashMap();
                            this.functions.put("NOT", new org.mwg.core.task.math.MathFunction("NOT", 1));
                            this.functions.put("IF", new org.mwg.core.task.math.MathFunction("IF", 3));
                            this.functions.put("RAND", new org.mwg.core.task.math.MathFunction("RAND", 0));
                            this.functions.put("SIN", new org.mwg.core.task.math.MathFunction("SIN", 1));
                            this.functions.put("COS", new org.mwg.core.task.math.MathFunction("COS", 1));
                            this.functions.put("TAN", new org.mwg.core.task.math.MathFunction("TAN", 1));
                            this.functions.put("ASIN", new org.mwg.core.task.math.MathFunction("ASIN", 1));
                            this.functions.put("ACOS", new org.mwg.core.task.math.MathFunction("ACOS", 1));
                            this.functions.put("ATAN", new org.mwg.core.task.math.MathFunction("ATAN", 1));
                            this.functions.put("MAX", new org.mwg.core.task.math.MathFunction("MAX", 2));
                            this.functions.put("MIN", new org.mwg.core.task.math.MathFunction("MIN", 2));
                            this.functions.put("ABS", new org.mwg.core.task.math.MathFunction("ABS", 1));
                            this.functions.put("LOG", new org.mwg.core.task.math.MathFunction("LOG", 1));
                            this.functions.put("ROUND", new org.mwg.core.task.math.MathFunction("ROUND", 2));
                            this.functions.put("FLOOR", new org.mwg.core.task.math.MathFunction("FLOOR", 1));
                            this.functions.put("CEILING", new org.mwg.core.task.math.MathFunction("CEILING", 1));
                            this.functions.put("SQRT", new org.mwg.core.task.math.MathFunction("SQRT", 1));
                            this.functions.put("SECONDS", new org.mwg.core.task.math.MathFunction("SECONDS", 1));
                            this.functions.put("MINUTES", new org.mwg.core.task.math.MathFunction("MINUTES", 1));
                            this.functions.put("HOURS", new org.mwg.core.task.math.MathFunction("HOURS", 1));
                            this.functions.put("DAY", new org.mwg.core.task.math.MathFunction("DAY", 1));
                            this.functions.put("MONTH", new org.mwg.core.task.math.MathFunction("MONTH", 1));
                            this.functions.put("YEAR", new org.mwg.core.task.math.MathFunction("YEAR", 1));
                            this.functions.put("DAYOFWEEK", new org.mwg.core.task.math.MathFunction("DAYOFWEEK", 1));
                        }

                        MathEntities.getINSTANCE = function () {
                            if (MathEntities.INSTANCE == null) {
                                MathEntities.INSTANCE = new org.mwg.core.task.math.MathEntities();
                            }
                            return MathEntities.INSTANCE;
                        };
                        MathEntities.INSTANCE = null;
                        return MathEntities;
                    }());
                    math.MathEntities = MathEntities;
                    var MathExpressionTokenizer = (function () {
                        function MathExpressionTokenizer(input) {
                            this.pos = 0;
                            this.input = input.trim();
                        }

                        MathExpressionTokenizer.prototype.hasNext = function () {
                            return (this.pos < this.input.length);
                        };
                        MathExpressionTokenizer.prototype.peekNextChar = function () {
                            if (this.pos < (this.input.length - 1)) {
                                return this.input.charAt(this.pos + 1);
                            }
                            else {
                                return '\0';
                            }
                        };
                        MathExpressionTokenizer.prototype.next = function () {
                            var token = new java.lang.StringBuilder();
                            if (this.pos >= this.input.length) {
                                return this.previousToken = null;
                            }
                            var ch = this.input.charAt(this.pos);
                            while (org.mwg.core.task.math.CoreMathExpressionEngine.isWhitespace(ch) && this.pos < this.input.length) {
                                ch = this.input.charAt(++this.pos);
                            }
                            if (org.mwg.core.task.math.CoreMathExpressionEngine.isDigit(ch)) {
                                while ((org.mwg.core.task.math.CoreMathExpressionEngine.isDigit(ch) || ch == org.mwg.core.task.math.CoreMathExpressionEngine.decimalSeparator) && (this.pos < this.input.length)) {
                                    token.append(this.input.charAt(this.pos++));
                                    ch = this.pos == this.input.length ? '\0' : this.input.charAt(this.pos);
                                }
                            }
                            else {
                                if (ch == org.mwg.core.task.math.CoreMathExpressionEngine.minusSign && org.mwg.core.task.math.CoreMathExpressionEngine.isDigit(this.peekNextChar()) && ("(" === this.previousToken || "," === this.previousToken || this.previousToken == null || org.mwg.core.task.math.MathEntities.getINSTANCE().operators.keySet().contains(this.previousToken))) {
                                    token.append(org.mwg.core.task.math.CoreMathExpressionEngine.minusSign);
                                    this.pos++;
                                    token.append(this.next());
                                }
                                else {
                                    if (org.mwg.core.task.math.CoreMathExpressionEngine.isLetter(ch) || (ch == '_') || (ch == '{') || (ch == '}') || (ch == '$')) {
                                        while ((org.mwg.core.task.math.CoreMathExpressionEngine.isLetter(ch) || org.mwg.core.task.math.CoreMathExpressionEngine.isDigit(ch) || (ch == '_') || (ch == '{') || (ch == '}') || (ch == '$')) && (this.pos < this.input.length)) {
                                            token.append(this.input.charAt(this.pos++));
                                            ch = this.pos == this.input.length ? '\0' : this.input.charAt(this.pos);
                                        }
                                    }
                                    else {
                                        if (ch == '(' || ch == ')' || ch == ',') {
                                            token.append(ch);
                                            this.pos++;
                                        }
                                        else {
                                            while (!org.mwg.core.task.math.CoreMathExpressionEngine.isLetter(ch) && !org.mwg.core.task.math.CoreMathExpressionEngine.isDigit(ch) && ch != '_' && !org.mwg.core.task.math.CoreMathExpressionEngine.isWhitespace(ch) && ch != '(' && ch != ')' && ch != ',' && (ch != '{') && (ch != '}') && (ch != '$') && (this.pos < this.input.length)) {
                                                token.append(this.input.charAt(this.pos));
                                                this.pos++;
                                                ch = this.pos == this.input.length ? '\0' : this.input.charAt(this.pos);
                                                if (ch == org.mwg.core.task.math.CoreMathExpressionEngine.minusSign) {
                                                    break;
                                                }
                                            }
                                            if (!org.mwg.core.task.math.MathEntities.getINSTANCE().operators.keySet().contains(token.toString())) {
                                                throw new Error("Unknown operator '" + token + "' at position " + (this.pos - token.length + 1));
                                            }
                                        }
                                    }
                                }
                            }
                            return this.previousToken = token.toString();
                        };
                        MathExpressionTokenizer.prototype.getPos = function () {
                            return this.pos;
                        };
                        return MathExpressionTokenizer;
                    }());
                    math.MathExpressionTokenizer = MathExpressionTokenizer;
                    var MathFreeToken = (function () {
                        function MathFreeToken(content) {
                            this._content = content;
                        }

                        MathFreeToken.prototype.content = function () {
                            return this._content;
                        };
                        MathFreeToken.prototype.type = function () {
                            return 3;
                        };
                        return MathFreeToken;
                    }());
                    math.MathFreeToken = MathFreeToken;
                    var MathFunction = (function () {
                        function MathFunction(name, numParams) {
                            this.name = name.toUpperCase();
                            this.numParams = numParams;
                        }

                        MathFunction.prototype.getName = function () {
                            return this.name;
                        };
                        MathFunction.prototype.getNumParams = function () {
                            return this.numParams;
                        };
                        MathFunction.prototype.eval = function (p) {
                            if (this.name === "NOT") {
                                return (p[0] == 0) ? 1 : 0;
                            }
                            else {
                                if (this.name === "IF") {
                                    return !(p[0] == 0) ? p[1] : p[2];
                                }
                                else {
                                    if (this.name === "RAND") {
                                        return Math.random();
                                    }
                                    else {
                                        if (this.name === "SIN") {
                                            return Math.sin(p[0]);
                                        }
                                        else {
                                            if (this.name === "COS") {
                                                return Math.cos(p[0]);
                                            }
                                            else {
                                                if (this.name === "TAN") {
                                                    return Math.tan(p[0]);
                                                }
                                                else {
                                                    if (this.name === "ASIN") {
                                                        return Math.asin(p[0]);
                                                    }
                                                    else {
                                                        if (this.name === "ACOS") {
                                                            return Math.acos(p[0]);
                                                        }
                                                        else {
                                                            if (this.name === "ATAN") {
                                                                return Math.atan(p[0]);
                                                            }
                                                            else {
                                                                if (this.name === "MAX") {
                                                                    return p[0] > p[1] ? p[0] : p[1];
                                                                }
                                                                else {
                                                                    if (this.name === "MIN") {
                                                                        return p[0] < p[1] ? p[0] : p[1];
                                                                    }
                                                                    else {
                                                                        if (this.name === "ABS") {
                                                                            return Math.abs(p[0]);
                                                                        }
                                                                        else {
                                                                            if (this.name === "LOG") {
                                                                                return Math.log(p[0]);
                                                                            }
                                                                            else {
                                                                                if (this.name === "ROUND") {
                                                                                    var factor = Math.pow(10, p[1]);
                                                                                    var value = p[0] * factor;
                                                                                    var tmp = Math.round(value);
                                                                                    return tmp / factor;
                                                                                }
                                                                                else {
                                                                                    if (this.name === "FLOOR") {
                                                                                        return Math.floor(p[0]);
                                                                                    }
                                                                                    else {
                                                                                        if (this.name === "CEILING") {
                                                                                            return Math.ceil(p[0]);
                                                                                        }
                                                                                        else {
                                                                                            if (this.name === "SQRT") {
                                                                                                return Math.sqrt(p[0]);
                                                                                            }
                                                                                            else {
                                                                                                if (this.name === "SECONDS") {
                                                                                                    return this.date_to_seconds(p[0]);
                                                                                                }
                                                                                                else {
                                                                                                    if (this.name === "MINUTES") {
                                                                                                        return this.date_to_minutes(p[0]);
                                                                                                    }
                                                                                                    else {
                                                                                                        if (this.name === "HOURS") {
                                                                                                            return this.date_to_hours(p[0]);
                                                                                                        }
                                                                                                        else {
                                                                                                            if (this.name === "DAY") {
                                                                                                                return this.date_to_days(p[0]);
                                                                                                            }
                                                                                                            else {
                                                                                                                if (this.name === "MONTH") {
                                                                                                                    return this.date_to_months(p[0]);
                                                                                                                }
                                                                                                                else {
                                                                                                                    if (this.name === "YEAR") {
                                                                                                                        return this.date_to_year(p[0]);
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        if (this.name === "DAYOFWEEK") {
                                                                                                                            return this.date_to_dayofweek(p[0]);
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return 0;
                        };
                        MathFunction.prototype.date_to_seconds = function (value) {
                            var date = new Date(value);
                            return date.getSeconds();
                        };
                        MathFunction.prototype.date_to_minutes = function (value) {
                            var date = new Date(value);
                            return date.getMinutes();
                        };
                        MathFunction.prototype.date_to_hours = function (value) {
                            var date = new Date(value);
                            return date.getHours();
                        };
                        MathFunction.prototype.date_to_days = function (value) {
                            var date = new Date(value);
                            return date.getDate();
                        };
                        MathFunction.prototype.date_to_months = function (value) {
                            var date = new Date(value);
                            return date.getMonth();
                        };
                        MathFunction.prototype.date_to_year = function (value) {
                            var date = new Date(value);
                            return date.getFullYear();
                        };
                        MathFunction.prototype.date_to_dayofweek = function (value) {
                            var date = new Date(value);
                            return date.getDay();
                        };
                        MathFunction.prototype.type = function () {
                            return 1;
                        };
                        return MathFunction;
                    }());
                    math.MathFunction = MathFunction;
                    var MathOperation = (function () {
                        function MathOperation(oper, precedence, leftAssoc) {
                            this.oper = oper;
                            this.precedence = precedence;
                            this.leftAssoc = leftAssoc;
                        }

                        MathOperation.prototype.getOper = function () {
                            return this.oper;
                        };
                        MathOperation.prototype.getPrecedence = function () {
                            return this.precedence;
                        };
                        MathOperation.prototype.isLeftAssoc = function () {
                            return this.leftAssoc;
                        };
                        MathOperation.prototype.eval = function (v1, v2) {
                            if (this.oper === "+") {
                                return v1 + v2;
                            }
                            else {
                                if (this.oper === "-") {
                                    return v1 - v2;
                                }
                                else {
                                    if (this.oper === "*") {
                                        return v1 * v2;
                                    }
                                    else {
                                        if (this.oper === "/") {
                                            return v1 / v2;
                                        }
                                        else {
                                            if (this.oper === "%") {
                                                return v1 % v2;
                                            }
                                            else {
                                                if (this.oper === "^") {
                                                    return Math.pow(v1, v2);
                                                }
                                                else {
                                                    if (this.oper === "&&") {
                                                        var b1 = !(v1 == 0);
                                                        var b2 = !(v2 == 0);
                                                        return b1 && b2 ? 1 : 0;
                                                    }
                                                    else {
                                                        if (this.oper === "||") {
                                                            var b1 = !(v1 == 0);
                                                            var b2 = !(v2 == 0);
                                                            return b1 || b2 ? 1 : 0;
                                                        }
                                                        else {
                                                            if (this.oper === ">") {
                                                                return v1 > v2 ? 1 : 0;
                                                            }
                                                            else {
                                                                if (this.oper === ">=") {
                                                                    return v1 >= v2 ? 1 : 0;
                                                                }
                                                                else {
                                                                    if (this.oper === "<") {
                                                                        return v1 < v2 ? 1 : 0;
                                                                    }
                                                                    else {
                                                                        if (this.oper === "<=") {
                                                                            return v1 <= v2 ? 1 : 0;
                                                                        }
                                                                        else {
                                                                            if (this.oper === "==") {
                                                                                return v1 == v2 ? 1 : 0;
                                                                            }
                                                                            else {
                                                                                if (this.oper === "!=") {
                                                                                    return v1 != v2 ? 1 : 0;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return 0;
                        };
                        MathOperation.prototype.type = function () {
                            return 0;
                        };
                        return MathOperation;
                    }());
                    math.MathOperation = MathOperation;
                })(math = task_1.math || (task_1.math = {}));
                var TaskContextWrapper = (function () {
                    function TaskContextWrapper(p_wrapped) {
                        this._wrapped = p_wrapped;
                    }

                    TaskContextWrapper.prototype.graph = function () {
                        return this._wrapped.graph();
                    };
                    TaskContextWrapper.prototype.world = function () {
                        return this._wrapped.world();
                    };
                    TaskContextWrapper.prototype.setWorld = function (world) {
                        this._wrapped.setWorld(world);
                    };
                    TaskContextWrapper.prototype.time = function () {
                        return this._wrapped.time();
                    };
                    TaskContextWrapper.prototype.setTime = function (time) {
                        this._wrapped.setTime(time);
                    };
                    TaskContextWrapper.prototype.variable = function (name) {
                        return this._wrapped.variable(name);
                    };
                    TaskContextWrapper.prototype.variablesKeys = function () {
                        return this._wrapped.variablesKeys();
                    };
                    TaskContextWrapper.prototype.setVariable = function (name, value) {
                        this._wrapped.setVariable(name, value);
                    };
                    TaskContextWrapper.prototype.addToVariable = function (name, value) {
                        this._wrapped.addToVariable(name, value);
                    };
                    TaskContextWrapper.prototype.result = function () {
                        return this._wrapped.result();
                    };
                    TaskContextWrapper.prototype.setResult = function (actionResult) {
                        this._wrapped.setResult(actionResult);
                    };
                    TaskContextWrapper.prototype.next = function () {
                    };
                    TaskContextWrapper.prototype.clean = function () {
                        this._wrapped.clean();
                    };
                    TaskContextWrapper.prototype.toString = function () {
                        return this._wrapped.toString();
                    };
                    return TaskContextWrapper;
                }());
                task_1.TaskContextWrapper = TaskContextWrapper;
            })(task = core.task || (core.task = {}));
            var utility;
            (function (utility) {
                var AbstractBuffer = (function () {
                    function AbstractBuffer() {
                    }

                    AbstractBuffer.prototype.iterator = function () {
                        return new org.mwg.core.utility.CoreBufferIterator(this);
                    };
                    return AbstractBuffer;
                }());
                utility.AbstractBuffer = AbstractBuffer;
                var BufferBuilder = (function () {
                    function BufferBuilder() {
                    }

                    BufferBuilder.keyToBuffer = function (buffer, chunkType, world, time, id) {
                        buffer.write(chunkType);
                        buffer.write(org.mwg.core.CoreConstants.KEY_SEP);
                        org.mwg.plugin.Base64.encodeLongToBuffer(world, buffer);
                        buffer.write(org.mwg.core.CoreConstants.KEY_SEP);
                        org.mwg.plugin.Base64.encodeLongToBuffer(time, buffer);
                        buffer.write(org.mwg.core.CoreConstants.KEY_SEP);
                        org.mwg.plugin.Base64.encodeLongToBuffer(id, buffer);
                    };
                    BufferBuilder.getNewSize = function (old, target) {
                        while (old < target) {
                            old = old * 2;
                        }
                        return old;
                    };
                    BufferBuilder.newOffHeapBuffer = function () {
                        return new org.mwg.core.utility.HeapBuffer();
                    };
                    BufferBuilder.newHeapBuffer = function () {
                        return new org.mwg.core.utility.HeapBuffer();
                    };
                    return BufferBuilder;
                }());
                utility.BufferBuilder = BufferBuilder;
                var BufferView = (function () {
                    function BufferView(p_origin, p_initPos, p_endPos) {
                        this._origin = p_origin;
                        this._initPos = p_initPos;
                        this._endPos = p_endPos;
                    }

                    BufferView.prototype.write = function (b) {
                        throw new Error("Write operation forbidden during iteration");
                    };
                    BufferView.prototype.writeAll = function (bytes) {
                        throw new Error("Write operation forbidden during iteration");
                    };
                    BufferView.prototype.read = function (position) {
                        if (this._initPos + position > this._endPos) {
                            throw new Error("" + position);
                        }
                        return this._origin.read(this._initPos + position);
                    };
                    BufferView.prototype.data = function () {
                        return this._origin.slice(this._initPos, this._endPos);
                    };
                    BufferView.prototype.length = function () {
                        return this._endPos - this._initPos + 1;
                    };
                    BufferView.prototype.free = function () {
                        throw new Error("Free operation forbidden during iteration");
                    };
                    BufferView.prototype.iterator = function () {
                        throw new Error("iterator creation forbidden forbidden during iteration");
                    };
                    BufferView.prototype.removeLast = function () {
                        throw new Error("Write operation forbidden during iteration");
                    };
                    return BufferView;
                }());
                utility.BufferView = BufferView;
                var CoreBufferIterator = (function () {
                    function CoreBufferIterator(p_origin) {
                        this._cursor = -1;
                        this._origin = p_origin;
                        this._originSize = p_origin.length();
                    }

                    CoreBufferIterator.prototype.hasNext = function () {
                        return this._originSize > 0 && (this._cursor + 1) < this._originSize;
                    };
                    CoreBufferIterator.prototype.next = function () {
                        var previousCursor = this._cursor;
                        while ((this._cursor + 1) < this._originSize) {
                            this._cursor++;
                            var current = this._origin.read(this._cursor);
                            if (current == org.mwg.core.CoreConstants.BUFFER_SEP) {
                                return new org.mwg.core.utility.BufferView(this._origin, previousCursor + 1, this._cursor - 1);
                            }
                        }
                        if (previousCursor < this._originSize) {
                            return new org.mwg.core.utility.BufferView(this._origin, previousCursor + 1, this._cursor);
                        }
                        return null;
                    };
                    return CoreBufferIterator;
                }());
                utility.CoreBufferIterator = CoreBufferIterator;
                var CoreDeferCounter = (function () {
                    function CoreDeferCounter(nb) {
                        this._counter = nb;
                        this._nb_down = new java.util.concurrent.atomic.AtomicInteger(0);
                    }

                    CoreDeferCounter.prototype.count = function () {
                        var previous;
                        var next;
                        do {
                            previous = this._nb_down.get();
                            next = previous + 1;
                        } while (!this._nb_down.compareAndSet(previous, next));
                        if (next == this._counter) {
                            if (this._end != null) {
                                this._end();
                            }
                        }
                    };
                    CoreDeferCounter.prototype.then = function (p_callback) {
                        this._end = p_callback;
                        if (this._nb_down.get() == this._counter) {
                            if (p_callback != null) {
                                p_callback();
                            }
                        }
                    };
                    return CoreDeferCounter;
                }());
                utility.CoreDeferCounter = CoreDeferCounter;
                var DataHasher = (function () {
                    function DataHasher() {
                    }

                    DataHasher.hash = function (data) {
                        var h = org.mwg.core.utility.DataHasher.HSTART;
                        var dataLength = data.length;
                        for (var i = 0; i < dataLength; i++) {
                            h = h.mul(org.mwg.core.utility.DataHasher.HMULT).xor(org.mwg.core.utility.DataHasher.byteTable[data.charCodeAt(i) & 0xff]);
                        }
                        return h.mod(org.mwg.core.CoreConstants.END_OF_TIME).toNumber();
                    };
                    DataHasher.hashBytes = function (data) {
                        var h = org.mwg.core.utility.DataHasher.HSTART;
                        var dataLength = data.length;
                        for (var i = 0; i < dataLength; i++) {
                            h = h.mul(org.mwg.core.utility.DataHasher.HMULT).xor(org.mwg.core.utility.DataHasher.byteTable[data[i] & 0xff]);
                        }
                        return h.mod(org.mwg.core.CoreConstants.END_OF_TIME).toNumber();
                    };
                    DataHasher.byteTable = function () {
                        var table = [];
                        var h = Long.fromBits(0xCAAF1684, 0x544B2FBA);
                        for (var i = 0; i < 256; i++) {
                            for (var j = 0; j < 31; j++) {
                                h = h.shiftRightUnsigned(7).xor(h);
                                h = h.shiftLeft(11).xor(h);
                                h = h.shiftRightUnsigned(10).xor(h);
                            }
                            table[i] = h.toSigned();
                        }
                        return table;
                    }();
                    DataHasher.HSTART = Long.fromBits(0xA205B064, 0xBB40E64D);
                    DataHasher.HMULT = Long.fromBits(0xE116586D, 0x6A5D39EA);
                    return DataHasher;
                }());
                utility.DataHasher = DataHasher;
                var HeapBuffer = (function (_super) {
                    __extends(HeapBuffer, _super);
                    function HeapBuffer() {
                        _super.apply(this, arguments);
                    }

                    HeapBuffer.prototype.slice = function (initPos, endPos) {
                        var newSize = (endPos - initPos + 1);
                        var newResult = new Int8Array(newSize);
                        java.lang.System.arraycopy(this.buffer, initPos, newResult, 0, newSize);
                        return newResult;
                    };
                    HeapBuffer.prototype.write = function (b) {
                        if (this.buffer == null) {
                            this.buffer = new Int8Array(org.mwg.core.CoreConstants.MAP_INITIAL_CAPACITY);
                            this.buffer[0] = b;
                            this.writeCursor = 1;
                        }
                        else {
                            if (this.writeCursor == this.buffer.length) {
                                var temp = new Int8Array(this.buffer.length * 2);
                                java.lang.System.arraycopy(this.buffer, 0, temp, 0, this.buffer.length);
                                temp[this.writeCursor] = b;
                                this.writeCursor++;
                                this.buffer = temp;
                            }
                            else {
                                this.buffer[this.writeCursor] = b;
                                this.writeCursor++;
                            }
                        }
                    };
                    HeapBuffer.prototype.writeAll = function (bytes) {
                        if (this.buffer == null) {
                            var initSize = org.mwg.core.utility.BufferBuilder.getNewSize(org.mwg.core.CoreConstants.MAP_INITIAL_CAPACITY, bytes.length);
                            this.buffer = new Int8Array(initSize);
                            java.lang.System.arraycopy(bytes, 0, this.buffer, 0, bytes.length);
                            this.writeCursor = bytes.length;
                        }
                        else {
                            if (this.writeCursor + bytes.length > this.buffer.length) {
                                var newSize = org.mwg.core.utility.BufferBuilder.getNewSize(this.buffer.length, this.buffer.length + bytes.length);
                                var tmp = new Int8Array(newSize);
                                java.lang.System.arraycopy(this.buffer, 0, tmp, 0, this.buffer.length);
                                java.lang.System.arraycopy(bytes, 0, tmp, this.writeCursor, bytes.length);
                                this.buffer = tmp;
                                this.writeCursor = this.writeCursor + bytes.length;
                            }
                            else {
                                java.lang.System.arraycopy(bytes, 0, this.buffer, this.writeCursor, bytes.length);
                                this.writeCursor = this.writeCursor + bytes.length;
                            }
                        }
                    };
                    HeapBuffer.prototype.read = function (position) {
                        return this.buffer[position];
                    };
                    HeapBuffer.prototype.data = function () {
                        var copy = new Int8Array(this.writeCursor);
                        java.lang.System.arraycopy(this.buffer, 0, copy, 0, this.writeCursor);
                        return copy;
                    };
                    HeapBuffer.prototype.length = function () {
                        return this.writeCursor;
                    };
                    HeapBuffer.prototype.free = function () {
                        this.buffer = null;
                    };
                    HeapBuffer.prototype.removeLast = function () {
                        this.writeCursor--;
                    };
                    return HeapBuffer;
                }(org.mwg.core.utility.AbstractBuffer));
                utility.HeapBuffer = HeapBuffer;
                var PrimitiveHelper = (function () {
                    function PrimitiveHelper() {
                    }

                    PrimitiveHelper.longHash = function (number, max) {
                        if (max <= 0) {
                            throw new Error("Max must be > 0");
                        }
                        var crc = org.mwg.core.utility.PrimitiveHelper.PRIME5;
                        crc = crc.add(number);
                        crc = crc.add(crc.shiftLeft(17));
                        crc = crc.mul(org.mwg.core.utility.PrimitiveHelper.PRIME4);
                        crc = crc.mul(org.mwg.core.utility.PrimitiveHelper.PRIME1);
                        crc = crc.add(number);
                        crc = crc.add(crc.shiftLeft(17));
                        crc = crc.mul(org.mwg.core.utility.PrimitiveHelper.PRIME4);
                        crc = crc.mul(org.mwg.core.utility.PrimitiveHelper.PRIME1);
                        crc = crc.add(org.mwg.core.utility.PrimitiveHelper.len);
                        crc = crc.xor(crc.shiftRightUnsigned(15));
                        crc = crc.mul(org.mwg.core.utility.PrimitiveHelper.PRIME2);
                        crc = crc.add(number);
                        crc = crc.xor(crc.shiftRightUnsigned(13));
                        crc = crc.mul(org.mwg.core.utility.PrimitiveHelper.PRIME3);
                        crc = crc.xor(crc.shiftRightUnsigned(16));
                        crc = (crc.isNegative() ? crc.mul(-1) : crc);
                        crc = crc.mod(max);
                        return crc.toNumber();
                    };
                    PrimitiveHelper.tripleHash = function (p0, p1, p2, p3, max) {
                        if (max <= 0) {
                            throw new Error("Max must be > 0");
                        }
                        var v1 = org.mwg.core.utility.PrimitiveHelper.PRIME5;
                        var v2 = v1.mul(org.mwg.core.utility.PrimitiveHelper.PRIME2).add(org.mwg.core.utility.PrimitiveHelper.len);
                        var v3 = v2.mul(org.mwg.core.utility.PrimitiveHelper.PRIME3);
                        var v4 = v3.mul(org.mwg.core.utility.PrimitiveHelper.PRIME4);
                        v1 = v1.shiftLeft(13).or(v1.shiftRightUnsigned(51)).add(Long.fromNumber(p1, false));
                        v2 = v2.shiftLeft(11).or(v2.shiftRightUnsigned(53)).add(Long.fromNumber(p2, false));
                        v3 = v3.shiftLeft(17).or(v3.shiftRightUnsigned(47)).add(Long.fromNumber(p3, false));
                        v4 = v4.shiftLeft(19).or(v4.shiftRightUnsigned(45)).add(Long.fromNumber(p0, false));
                        v1 = v1.add(v1.shiftLeft(17).or(v1.shiftRightUnsigned(47)));
                        v2 = v2.add(v2.shiftLeft(19).or(v2.shiftRightUnsigned(45)));
                        v3 = v3.add(v3.shiftLeft(13).or(v3.shiftRightUnsigned(51)));
                        v4 = v4.add(v4.shiftLeft(11).or(v4.shiftRightUnsigned(53)));
                        v1 = v1.mul(org.mwg.core.utility.PrimitiveHelper.PRIME1).add(Long.fromNumber(p1, false));
                        v2 = v2.mul(org.mwg.core.utility.PrimitiveHelper.PRIME1).add(Long.fromNumber(p2, false));
                        v3 = v3.mul(org.mwg.core.utility.PrimitiveHelper.PRIME1).add(Long.fromNumber(p3, false));
                        v4 = v4.mul(org.mwg.core.utility.PrimitiveHelper.PRIME1).add(org.mwg.core.utility.PrimitiveHelper.PRIME5);
                        v1 = v1.mul(org.mwg.core.utility.PrimitiveHelper.PRIME2);
                        v2 = v2.mul(org.mwg.core.utility.PrimitiveHelper.PRIME2);
                        v3 = v3.mul(org.mwg.core.utility.PrimitiveHelper.PRIME2);
                        v4 = v4.mul(org.mwg.core.utility.PrimitiveHelper.PRIME2);
                        v1 = v1.add(v1.shiftLeft(11).or(v1.shiftRightUnsigned(53)));
                        v2 = v2.add(v2.shiftLeft(17).or(v2.shiftRightUnsigned(47)));
                        v3 = v3.add(v3.shiftLeft(19).or(v3.shiftRightUnsigned(45)));
                        v4 = v4.add(v4.shiftLeft(13).or(v4.shiftRightUnsigned(51)));
                        v1 = v1.mul(org.mwg.core.utility.PrimitiveHelper.PRIME3);
                        v2 = v2.mul(org.mwg.core.utility.PrimitiveHelper.PRIME3);
                        v3 = v3.mul(org.mwg.core.utility.PrimitiveHelper.PRIME3);
                        v4 = v4.mul(org.mwg.core.utility.PrimitiveHelper.PRIME3);
                        var crc = v1;
                        crc = crc.add(v2.shiftLeft(3).or(v2.shiftRightUnsigned(61)));
                        crc = crc.add(v3.shiftLeft(6).or(v3.shiftRightUnsigned(58)));
                        crc = crc.add(v4.shiftLeft(9).or(v4.shiftRightUnsigned(55)));
                        crc = crc.xor(crc.shiftRightUnsigned(11));
                        crc = crc.add(org.mwg.core.utility.PrimitiveHelper.PRIME4.add(org.mwg.core.utility.PrimitiveHelper.len).mul(org.mwg.core.utility.PrimitiveHelper.PRIME1));
                        crc = crc.xor(crc.shiftRightUnsigned(15));
                        crc = crc.mul(org.mwg.core.utility.PrimitiveHelper.PRIME2);
                        crc = crc.xor(crc.shiftRightUnsigned(13));
                        crc = (crc.isNegative() ? crc.mul(-1) : crc);
                        crc = crc.mod(max);
                        return crc.toNumber();
                    };
                    PrimitiveHelper.rand = function () {
                        return Math.random() * 1000000;
                    };
                    PrimitiveHelper.equals = function (src, other) {
                        return src === other;
                    };
                    PrimitiveHelper.DOUBLE_MIN_VALUE = function () {
                        return Number.MIN_VALUE;
                    };
                    PrimitiveHelper.DOUBLE_MAX_VALUE = function () {
                        return Number.MAX_VALUE;
                    };
                    PrimitiveHelper.isDefined = function (param) {
                        return param != undefined && param != null;
                    };
                    PrimitiveHelper.iterate = function (elem, callback) {
                        if (Array.isArray(elem)) {
                            for (var p in elem) {
                                callback(elem[p]);
                            }
                            return true;
                        }
                        return false;
                    };
                    PrimitiveHelper.PRIME1 = Long.fromNumber(2654435761, false);
                    PrimitiveHelper.PRIME2 = Long.fromNumber(2246822519, false);
                    PrimitiveHelper.PRIME3 = Long.fromNumber(3266489917, false);
                    PrimitiveHelper.PRIME4 = Long.fromNumber(668265263, false);
                    PrimitiveHelper.PRIME5 = Long.fromNumber(0x165667b1, false);
                    PrimitiveHelper.len = 24;
                    return PrimitiveHelper;
                }());
                utility.PrimitiveHelper = PrimitiveHelper;
                var ReadOnlyStorage = (function () {
                    function ReadOnlyStorage(toWrap) {
                        this.wrapped = toWrap;
                    }

                    ReadOnlyStorage.prototype.get = function (keys, callback) {
                        this.wrapped.get(keys, callback);
                    };
                    ReadOnlyStorage.prototype.put = function (stream, callback) {
                        console.error("WARNING: PUT TO A READ ONLY STORAGE");
                    };
                    ReadOnlyStorage.prototype.remove = function (keys, callback) {
                        console.error("WARNING: REMOVE TO A READ ONLY STORAGE");
                    };
                    ReadOnlyStorage.prototype.connect = function (graph, callback) {
                        this.wrapped.connect(graph, callback);
                    };
                    ReadOnlyStorage.prototype.disconnect = function (callback) {
                        this.wrapped.disconnect(callback);
                    };
                    ReadOnlyStorage.prototype.lock = function (callback) {
                        this.wrapped.lock(callback);
                    };
                    ReadOnlyStorage.prototype.unlock = function (previousLock, callback) {
                        this.wrapped.unlock(previousLock, callback);
                    };
                    return ReadOnlyStorage;
                }());
                utility.ReadOnlyStorage = ReadOnlyStorage;
            })(utility = core.utility || (core.utility = {}));
        })(core = mwg.core || (mwg.core = {}));
    })(mwg = org.mwg || (org.mwg = {}));
})(org || (org = {}));
//# sourceMappingURL=mwg.js.map