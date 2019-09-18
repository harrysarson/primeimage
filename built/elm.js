
const scope = {};
(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



// DECODER

var _File_decoder = _Json_decodePrim(function(value) {
	// NOTE: checks if `File` exists in case this is run on node
	return (typeof File !== 'undefined' && value instanceof File)
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FILE', value);
});


// METADATA

function _File_name(file) { return file.name; }
function _File_mime(file) { return file.type; }
function _File_size(file) { return file.size; }

function _File_lastModified(file)
{
	return elm$time$Time$millisToPosix(file.lastModified);
}


// DOWNLOAD

var _File_downloadNode;

function _File_getDownloadNode()
{
	return _File_downloadNode || (_File_downloadNode = document.createElement('a'));
}

var _File_download = F3(function(name, mime, content)
{
	return _Scheduler_binding(function(callback)
	{
		var blob = new Blob([content], {type: mime});

		// for IE10+
		if (navigator.msSaveOrOpenBlob)
		{
			navigator.msSaveOrOpenBlob(blob, name);
			return;
		}

		// for HTML5
		var node = _File_getDownloadNode();
		var objectUrl = URL.createObjectURL(blob);
		node.href = objectUrl;
		node.download = name;
		_File_click(node);
		URL.revokeObjectURL(objectUrl);
	});
});

function _File_downloadUrl(href)
{
	return _Scheduler_binding(function(callback)
	{
		var node = _File_getDownloadNode();
		node.href = href;
		node.download = '';
		node.origin === location.origin || (node.target = '_blank');
		_File_click(node);
	});
}


// IE COMPATIBILITY

function _File_makeBytesSafeForInternetExplorer(bytes)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
	// all other browsers can just run `new Blob([bytes])` directly with no problem
	//
	return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function _File_click(node)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
	// all other browsers have MouseEvent and do not need this conditional stuff
	//
	if (typeof MouseEvent === 'function')
	{
		node.dispatchEvent(new MouseEvent('click'));
	}
	else
	{
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.body.appendChild(node);
		node.dispatchEvent(event);
		document.body.removeChild(node);
	}
}


// UPLOAD

var _File_node;

function _File_uploadOne(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.accept = A2(elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			callback(_Scheduler_succeed(event.target.files[0]));
		});
		_File_click(_File_node);
	});
}

function _File_uploadOneOrMore(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.multiple = true;
		_File_node.accept = A2(elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			var elmFiles = _List_fromArray(event.target.files);
			callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
		});
		_File_click(_File_node);
	});
}


// CONTENT

function _File_toString(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsText(blob);
		return function() { reader.abort(); };
	});
}

function _File_toBytes(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(new DataView(reader.result)));
		});
		reader.readAsArrayBuffer(blob);
		return function() { reader.abort(); };
	});
}

function _File_toUrl(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsDataURL(blob);
		return function() { reader.abort(); };
	});
}





// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var GlobalWebIndex$cmd_extra$Cmd$Extra$pure = function (model) {
	return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
};
var author$project$State$initialState = GlobalWebIndex$cmd_extra$Cmd$Extra$pure(
	{image: elm$core$Maybe$Nothing, nonPrime: elm$core$Maybe$Nothing, prime: elm$core$Maybe$Nothing, stage: 0, toNumberConfig: elm$core$Maybe$Nothing});
var GlobalWebIndex$cmd_extra$Cmd$Extra$add = F2(
	function (newCmd, _n0) {
		var model = _n0.a;
		var prevCmd = _n0.b;
		return _Utils_Tuple2(
			model,
			elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[newCmd, prevCmd])));
	});
var GlobalWebIndex$cmd_extra$Cmd$Extra$with = F2(
	function (cmd, model) {
		return _Utils_Tuple2(model, cmd);
	});
var author$project$Config$nonPrimeStage = 2;
var author$project$Examples$archer = {contents: 'data:application/octet-stream;base64,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', filename: 'archer'};
var author$project$Examples$corpus = {contents: 'data:image/jpeg;base64,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', filename: 'corpus'};
var author$project$Examples$sunflower = {contents: 'data:image/jpeg;base64,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', filename: 'sunflower'};
var author$project$Examples$getImage = function (opt) {
	switch (opt.$) {
		case 'Archer':
			return author$project$Examples$archer;
		case 'Sunflower':
			return author$project$Examples$sunflower;
		default:
			return author$project$Examples$corpus;
	}
};
var author$project$Config$imageInputStage = 1;
var author$project$Config$maxStage = 3;
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var author$project$Lib$saturateStageChange = F2(
	function (model, change) {
		var maxStage = _Utils_eq(model.image, elm$core$Maybe$Nothing) ? author$project$Config$imageInputStage : author$project$Config$maxStage;
		return (change > 0) ? A2(elm$core$Basics$min, maxStage - model.stage, change) : A2(elm$core$Basics$max, -model.stage, change);
	});
var author$project$NumberString$toString = function (_n0) {
	var string = _n0.a;
	return string;
};
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Ports$logError = _Platform_outgoingPort('logError', elm$json$Json$Encode$string);
var elm$core$Maybe$destruct = F3(
	function (_default, func, maybe) {
		if (maybe.$ === 'Just') {
			var a = maybe.a;
			return func(a);
		} else {
			return _default;
		}
	});
var elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var elm$core$Array$foldl = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldl,
			func,
			A3(elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var elm$json$Json$Encode$array = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$Array$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var elm$json$Json$Encode$int = _Json_wrap;
var elm$json$Json$Encode$null = _Json_encodeNull;
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var author$project$Ports$requestNonPrime = _Platform_outgoingPort(
	'requestNonPrime',
	function ($) {
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'image',
					function ($) {
						return elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'contents',
									elm$json$Json$Encode$string($.contents)),
									_Utils_Tuple2(
									'filename',
									elm$json$Json$Encode$string($.filename))
								]));
					}($.image)),
					_Utils_Tuple2(
					'toNumberConfig',
					function ($) {
						return A3(
							elm$core$Maybe$destruct,
							elm$json$Json$Encode$null,
							function ($) {
								return elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'levels',
											elm$json$Json$Encode$array(
												function ($) {
													return elm$json$Json$Encode$object(
														_List_fromArray(
															[
																_Utils_Tuple2(
																'attemptedValue',
																elm$json$Json$Encode$string($.attemptedValue)),
																_Utils_Tuple2(
																'error',
																function ($) {
																	return A3(elm$core$Maybe$destruct, elm$json$Json$Encode$null, elm$json$Json$Encode$string, $);
																}($.error)),
																_Utils_Tuple2(
																'value',
																elm$json$Json$Encode$int($.value))
															]));
												})($.levels)),
											_Utils_Tuple2(
											'width',
											function ($) {
												return elm$json$Json$Encode$object(
													_List_fromArray(
														[
															_Utils_Tuple2(
															'attemptedValue',
															elm$json$Json$Encode$string($.attemptedValue)),
															_Utils_Tuple2(
															'error',
															function ($) {
																return A3(elm$core$Maybe$destruct, elm$json$Json$Encode$null, elm$json$Json$Encode$string, $);
															}($.error)),
															_Utils_Tuple2(
															'value',
															elm$json$Json$Encode$int($.value))
														]));
											}($.width))
										]));
							},
							$);
					}($.toNumberConfig))
				]));
	});
var elm$core$Basics$identity = function (x) {
	return x;
};
var author$project$Ports$requestPrime = _Platform_outgoingPort('requestPrime', elm$core$Basics$identity);
var author$project$Ports$resizeImageNumber = _Platform_outgoingPort(
	'resizeImageNumber',
	function ($) {
		return elm$json$Json$Encode$null;
	});
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var author$project$Ports$setCssProp = _Platform_outgoingPort(
	'setCssProp',
	function ($) {
		var a = $.a;
		var b = $.b;
		var c = $.c;
		return A2(
			elm$json$Json$Encode$list,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					elm$json$Json$Encode$string(a),
					elm$json$Json$Encode$string(b),
					elm$json$Json$Encode$string(c)
				]));
	});
var author$project$PrimeWorker$Start = function (a) {
	return {$: 'Start', a: a};
};
var author$project$PrimeWorker$encodePrimeRequestData = function (data) {
	switch (data.$) {
		case 'Start':
			var nonPrimeNumber = data.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('Start')),
						_Utils_Tuple2(
						'nonPrimeNumber',
						elm$json$Json$Encode$string(nonPrimeNumber))
					]));
		case 'Stop':
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('Stop'))
					]));
		case 'Pause':
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('Pause'))
					]));
		default:
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('Resume'))
					]));
	}
};
var author$project$NumberString$NumberString = function (a) {
	return {$: 'NumberString', a: a};
};
var author$project$Types$FoundPrime = function (a) {
	return {$: 'FoundPrime', a: a};
};
var author$project$Types$InProgress = function (a) {
	return {$: 'InProgress', a: a};
};
var author$project$Types$PrimeError = function (a) {
	return {$: 'PrimeError', a: a};
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$float = _Json_decodeFloat;
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$map3 = _Json_map3;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$json$Json$Decode$maybe = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder),
				elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
			]));
};
var elm$json$Json$Decode$string = _Json_decodeString;
var ianmackenzie$elm_units$Quantity$Quantity = function (a) {
	return {$: 'Quantity', a: a};
};
var ianmackenzie$elm_units$Duration$seconds = function (numSeconds) {
	return ianmackenzie$elm_units$Quantity$Quantity(numSeconds);
};
var author$project$PrimeWorker$primeResponseDataDecoder = A2(
	elm$json$Json$Decode$andThen,
	function (type_) {
		switch (type_) {
			case 'InProgress':
				return A2(
					elm$json$Json$Decode$map,
					author$project$Types$InProgress,
					A2(
						elm$json$Json$Decode$field,
						'progress',
						elm$json$Json$Decode$list(
							elm$json$Json$Decode$maybe(
								A4(
									elm$json$Json$Decode$map3,
									F3(
										function (c, t, a) {
											return {averageCheckTime: a, combinationsChecked: c, totalCombinations: t};
										}),
									A2(elm$json$Json$Decode$field, 'combinationsChecked', elm$json$Json$Decode$int),
									A2(elm$json$Json$Decode$field, 'totalCombinations', elm$json$Json$Decode$int),
									A2(
										elm$json$Json$Decode$map,
										ianmackenzie$elm_units$Duration$seconds,
										A2(elm$json$Json$Decode$field, 'averageCheckTime', elm$json$Json$Decode$float)))))));
			case 'FoundPrime':
				return A3(
					elm$json$Json$Decode$map2,
					F2(
						function (p, n) {
							return author$project$Types$FoundPrime(
								{log2ProbPrime: p, primeNumber: n});
						}),
					A2(elm$json$Json$Decode$field, 'log2ProbPrime', elm$json$Json$Decode$float),
					A2(
						elm$json$Json$Decode$map,
						author$project$NumberString$NumberString,
						A2(elm$json$Json$Decode$field, 'primeNumber', elm$json$Json$Decode$string)));
			case 'Error':
				return A2(
					elm$json$Json$Decode$map,
					author$project$Types$PrimeError,
					A2(elm$json$Json$Decode$field, 'message', elm$json$Json$Decode$string));
			default:
				var other = type_;
				return elm$json$Json$Decode$fail('Invalid prime response data type: ' + other);
		}
	},
	A2(elm$json$Json$Decode$field, 'type', elm$json$Json$Decode$string));
var author$project$ToNumberConfig$Config$maxLevel = 256;
var author$project$ToNumberConfig$Config$numberOfLevels = 3;
var author$project$ToNumberConfig$Types$makeErrorable = function (value) {
	return {
		attemptedValue: elm$core$String$fromInt(value),
		error: elm$core$Maybe$Nothing,
		value: value
	};
};
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var elm$core$Basics$round = _Basics_round;
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var author$project$ToNumberConfig$State$initialState = {
	levels: elm$core$Array$fromList(
		A2(
			elm$core$List$map,
			author$project$ToNumberConfig$Types$makeErrorable,
			A2(
				elm$core$List$map,
				elm$core$Basics$round,
				A2(
					elm$core$List$map,
					function (x) {
						return (x * author$project$ToNumberConfig$Config$maxLevel) / (author$project$ToNumberConfig$Config$numberOfLevels + 1);
					},
					A2(elm$core$List$range, 1, author$project$ToNumberConfig$Config$numberOfLevels))))),
	width: author$project$ToNumberConfig$Types$makeErrorable(20)
};
var elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return elm$core$Result$Err(msg);
		}
	});
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var author$project$ToNumberConfig$State$updateErrorable = F3(
	function (validate, attemptedValue, errorable) {
		var parsedSize = A2(
			elm$core$Result$andThen,
			validate,
			A2(
				elm$core$Result$mapError,
				function (_n1) {
					return 'Please enter an integer';
				},
				A2(elm$json$Json$Decode$decodeString, elm$json$Json$Decode$int, attemptedValue)));
		if (parsedSize.$ === 'Ok') {
			var size = parsedSize.a;
			return {attemptedValue: attemptedValue, error: elm$core$Maybe$Nothing, value: size};
		} else {
			var err = parsedSize.a;
			return {
				attemptedValue: attemptedValue,
				error: elm$core$Maybe$Just(err),
				value: errorable.value
			};
		}
	});
var elm$core$Basics$ge = _Utils_ge;
var author$project$ToNumberConfig$State$validateLevel = function (level) {
	return ((level >= 0) && (_Utils_cmp(level, author$project$ToNumberConfig$Config$maxLevel) < 1)) ? elm$core$Result$Ok(level) : elm$core$Result$Err(
		'level must be positive integer less than ' + elm$core$String$fromInt(author$project$ToNumberConfig$Config$maxLevel));
};
var author$project$ToNumberConfig$Config$maxImageSize = 1000;
var author$project$ToNumberConfig$State$validateSize = F2(
	function (dimName, width) {
		return ((width > 0) && (_Utils_cmp(width, author$project$ToNumberConfig$Config$maxImageSize) < 1)) ? elm$core$Result$Ok(width) : elm$core$Result$Err(
			dimName + (' must be positive integer less than ' + elm$core$String$fromInt(author$project$ToNumberConfig$Config$maxImageSize)));
	});
var author$project$ToNumberConfig$Types$ReorderLevels = {$: 'ReorderLevels'};
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_n0.$ === 'SubTree') {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = elm$core$Array$bitMask & (index >>> shift);
		var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (_n0.$ === 'SubTree') {
			var subTree = _n0.a;
			var newSub = A4(elm$core$Array$setHelp, shift - elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _n0.a;
			var newLeaf = A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, values);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, tail)) : A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4(elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$core$List$sortBy = _List_sortBy;
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$core$Process$sleep = _Process_sleep;
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var author$project$ToNumberConfig$State$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'SetWidth':
				var widthStr = msg.a;
				return GlobalWebIndex$cmd_extra$Cmd$Extra$pure(
					_Utils_update(
						model,
						{
							width: A3(
								author$project$ToNumberConfig$State$updateErrorable,
								author$project$ToNumberConfig$State$validateSize('width'),
								widthStr,
								model.width)
						}));
			case 'SetLevel':
				var index = msg.a;
				var levelStr = msg.b;
				return GlobalWebIndex$cmd_extra$Cmd$Extra$pure(
					A2(
						elm$core$Maybe$withDefault,
						model,
						A2(
							elm$core$Maybe$map,
							function (newLevel) {
								return _Utils_update(
									model,
									{
										levels: A3(elm$core$Array$set, index, newLevel, model.levels)
									});
							},
							A2(
								elm$core$Maybe$map,
								function (oldLevel) {
									return A3(author$project$ToNumberConfig$State$updateErrorable, author$project$ToNumberConfig$State$validateLevel, levelStr, oldLevel);
								},
								A2(elm$core$Array$get, index, model.levels)))));
			case 'FinishedChanging':
				return A2(
					GlobalWebIndex$cmd_extra$Cmd$Extra$with,
					A2(
						elm$core$Task$perform,
						elm$core$Basics$always(author$project$ToNumberConfig$Types$ReorderLevels),
						elm$core$Process$sleep(500)),
					model);
			default:
				return GlobalWebIndex$cmd_extra$Cmd$Extra$pure(
					_Utils_update(
						model,
						{
							levels: elm$core$Array$fromList(
								A2(
									elm$core$List$sortBy,
									function ($) {
										return $.value;
									},
									elm$core$Array$toList(model.levels)))
						}));
		}
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(xs);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Lib$FilterMaybes$headAndTail = function (list) {
	return A2(
		elm$core$Maybe$map,
		function (head) {
			return A2(
				elm$core$Maybe$withDefault,
				_Utils_Tuple2(head, _List_Nil),
				A2(
					elm$core$Maybe$map,
					function (tail) {
						return _Utils_Tuple2(head, tail);
					},
					elm$core$List$tail(list)));
		},
		elm$core$List$head(list));
};
var author$project$Lib$FilterMaybes$filterMaybes = function (list) {
	filterMaybes:
	while (true) {
		var _n0 = author$project$Lib$FilterMaybes$headAndTail(list);
		if (_n0.$ === 'Just') {
			if (_n0.a.a.$ === 'Just') {
				var _n1 = _n0.a;
				var head = _n1.a.a;
				var tail = _n1.b;
				return A2(
					elm$core$List$cons,
					head,
					author$project$Lib$FilterMaybes$filterMaybes(tail));
			} else {
				var _n2 = _n0.a;
				var _n3 = _n2.a;
				var tail = _n2.b;
				var $temp$list = tail;
				list = $temp$list;
				continue filterMaybes;
			}
		} else {
			return _List_Nil;
		}
	}
};
var elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var elm$core$Array$indexedMap = F2(
	function (func, _n0) {
		var len = _n0.a;
		var tree = _n0.c;
		var tail = _n0.d;
		var initialBuilder = {
			nodeList: _List_Nil,
			nodeListSize: 0,
			tail: A3(
				elm$core$Elm$JsArray$indexedMap,
				func,
				elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.nodeListSize * elm$core$Array$branchFactor;
					var mappedLeaf = elm$core$Array$Leaf(
						A3(elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						nodeList: A2(elm$core$List$cons, mappedLeaf, builder.nodeList),
						nodeListSize: builder.nodeListSize + 1,
						tail: builder.tail
					};
				}
			});
		return A2(
			elm$core$Array$builderToArray,
			true,
			A3(elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var author$project$ToNumberConfig$Types$errorsInModel = function (model) {
	var errorTuple = function (name) {
		return A2(
			elm$core$Basics$composeR,
			function ($) {
				return $.error;
			},
			elm$core$Maybe$map(
				function (error) {
					return _Utils_Tuple2(name, error);
				}));
	};
	return author$project$Lib$FilterMaybes$filterMaybes(
		A2(
			elm$core$List$cons,
			A2(errorTuple, 'width', model.width),
			elm$core$Array$toList(
				A2(
					elm$core$Array$indexedMap,
					F2(
						function (index, level) {
							return A2(
								errorTuple,
								'level ' + elm$core$String$fromInt(index + 1),
								level);
						}),
					model.levels))));
};
var author$project$Types$ImageRead = function (a) {
	return {$: 'ImageRead', a: a};
};
var author$project$Types$UpdateNumberConfig = function (a) {
	return {$: 'UpdateNumberConfig', a: a};
};
var elm$core$Basics$not = _Basics_not;
var elm$core$Debug$log = _Debug_log;
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Platform$Cmd$map = _Platform_map;
var elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm$time$Time$millisToPosix = elm$time$Time$Posix;
var elm$file$File$name = _File_name;
var elm$file$File$toUrl = _File_toUrl;
var elm$json$Json$Decode$decodeValue = _Json_run;
var author$project$State$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Noop':
				return GlobalWebIndex$cmd_extra$Cmd$Extra$pure(model);
			case 'ChangeStage':
				var change = msg.a;
				var newStage = model.stage + A2(author$project$Lib$saturateStageChange, model, change);
				var requestNonPrimeCmd = function () {
					if (_Utils_eq(newStage, author$project$Config$nonPrimeStage)) {
						var _n1 = model.image;
						if (_n1.$ === 'Just') {
							var image = _n1.a;
							return author$project$Ports$requestNonPrime(
								{image: image, toNumberConfig: model.toNumberConfig});
						} else {
							return elm$core$Platform$Cmd$none;
						}
					} else {
						return elm$core$Platform$Cmd$none;
					}
				}();
				return A2(
					GlobalWebIndex$cmd_extra$Cmd$Extra$add,
					requestNonPrimeCmd,
					A2(
						GlobalWebIndex$cmd_extra$Cmd$Extra$with,
						author$project$Ports$setCssProp(
							_Utils_Tuple3(
								'.display-panel',
								'--show-stage',
								elm$core$String$fromInt(newStage))),
						_Utils_update(
							model,
							{stage: newStage})));
			case 'ImageSelected':
				var file = msg.a;
				var task = A2(
					elm$core$Task$map,
					function (url) {
						return {
							contents: url,
							filename: elm$file$File$name(file)
						};
					},
					elm$file$File$toUrl(file));
				return A2(
					GlobalWebIndex$cmd_extra$Cmd$Extra$with,
					A2(elm$core$Task$perform, author$project$Types$ImageRead, task),
					model);
			case 'SelectExampleImage':
				var option = msg.a;
				return A2(
					GlobalWebIndex$cmd_extra$Cmd$Extra$with,
					A2(
						elm$core$Task$perform,
						author$project$Types$ImageRead,
						elm$core$Task$succeed(
							author$project$Examples$getImage(option))),
					model);
			case 'ImageRead':
				var image = msg.a;
				return A2(
					GlobalWebIndex$cmd_extra$Cmd$Extra$with,
					function () {
						var _n2 = model.nonPrime;
						if (_n2.$ === 'Just') {
							return author$project$Ports$requestNonPrime(
								{image: image, toNumberConfig: model.toNumberConfig});
						} else {
							return elm$core$Platform$Cmd$none;
						}
					}(),
					_Utils_update(
						model,
						{
							image: elm$core$Maybe$Just(image)
						}));
			case 'UpdateNumberConfig':
				var updateNumberConfigMsg = msg.a;
				var _n3 = A2(
					author$project$ToNumberConfig$State$update,
					updateNumberConfigMsg,
					A2(elm$core$Maybe$withDefault, author$project$ToNumberConfig$State$initialState, model.toNumberConfig));
				var toNumberConfig = _n3.a;
				var numberConfigCmd = _n3.b;
				var cmd = A2(elm$core$Platform$Cmd$map, author$project$Types$UpdateNumberConfig, numberConfigCmd);
				var isError = !elm$core$List$isEmpty(
					author$project$ToNumberConfig$Types$errorsInModel(toNumberConfig));
				var updatedModel = _Utils_update(
					model,
					{
						toNumberConfig: elm$core$Maybe$Just(toNumberConfig)
					});
				return isError ? A2(
					GlobalWebIndex$cmd_extra$Cmd$Extra$with,
					cmd,
					_Utils_update(
						updatedModel,
						{nonPrime: elm$core$Maybe$Nothing})) : A2(
					GlobalWebIndex$cmd_extra$Cmd$Extra$add,
					cmd,
					A2(
						GlobalWebIndex$cmd_extra$Cmd$Extra$with,
						A2(
							elm$core$Maybe$withDefault,
							elm$core$Platform$Cmd$none,
							A2(
								elm$core$Maybe$map,
								function (i) {
									return author$project$Ports$requestNonPrime(
										{
											image: i,
											toNumberConfig: elm$core$Maybe$Just(toNumberConfig)
										});
								},
								model.image)),
						updatedModel));
			case 'NonPrimeGenerated':
				var nonPrime = msg.a;
				var toNumberConfig = msg.b;
				return A2(
					GlobalWebIndex$cmd_extra$Cmd$Extra$with,
					author$project$Ports$resizeImageNumber(_Utils_Tuple0),
					_Utils_update(
						model,
						{
							nonPrime: elm$core$Maybe$Just(nonPrime),
							toNumberConfig: elm$core$Maybe$Just(
								A2(elm$core$Maybe$withDefault, toNumberConfig, model.toNumberConfig))
						}));
			case 'NonPrimeError':
				var error = msg.a;
				return A2(
					GlobalWebIndex$cmd_extra$Cmd$Extra$with,
					author$project$Ports$logError(error),
					_Utils_update(
						model,
						{nonPrime: elm$core$Maybe$Nothing}));
			case 'RequestPrime':
				return function () {
					var _n4 = model.nonPrime;
					if (_n4.$ === 'Just') {
						var number = _n4.a;
						var payload = author$project$PrimeWorker$encodePrimeRequestData(
							author$project$PrimeWorker$Start(
								author$project$NumberString$toString(number)));
						return GlobalWebIndex$cmd_extra$Cmd$Extra$with(
							author$project$Ports$requestPrime(payload));
					} else {
						return GlobalWebIndex$cmd_extra$Cmd$Extra$pure;
					}
				}()(
					_Utils_update(
						model,
						{
							prime: elm$core$Maybe$Just(
								author$project$Types$InProgress(_List_Nil))
						}));
			default:
				var payload = msg.a;
				var decoded = A2(elm$json$Json$Decode$decodeValue, author$project$PrimeWorker$primeResponseDataDecoder, payload);
				if (decoded.$ === 'Ok') {
					var response = decoded.a;
					return A2(
						GlobalWebIndex$cmd_extra$Cmd$Extra$with,
						function () {
							switch (response.$) {
								case 'InProgress':
									var statusUpdate = response.a;
									var _n7 = A2(elm$core$Debug$log, 'status update', statusUpdate);
									return elm$core$Platform$Cmd$none;
								case 'FoundPrime':
									return author$project$Ports$resizeImageNumber(_Utils_Tuple0);
								default:
									var string = response.a;
									var err = 'Error generating:\n' + string;
									return author$project$Ports$logError(err);
							}
						}(),
						_Utils_update(
							model,
							{
								prime: elm$core$Maybe$Just(response)
							}));
				} else {
					var decodeError = decoded.a;
					var err = 'Error decoding prime response:\n' + elm$json$Json$Decode$errorToString(decodeError);
					return A2(
						GlobalWebIndex$cmd_extra$Cmd$Extra$with,
						author$project$Ports$logError(err),
						_Utils_update(
							model,
							{
								prime: elm$core$Maybe$Just(
									author$project$Types$PrimeError(err))
							}));
				}
		}
	});
var author$project$NumberString$fromString = author$project$NumberString$NumberString;
var author$project$Ports$nonPrimeError = _Platform_incomingPort('nonPrimeError', elm$json$Json$Decode$string);
var author$project$Ports$nonPrimeGenerated = _Platform_incomingPort(
	'nonPrimeGenerated',
	A2(
		elm$json$Json$Decode$andThen,
		function (width) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (nonPrime) {
					return A2(
						elm$json$Json$Decode$andThen,
						function (levels) {
							return elm$json$Json$Decode$succeed(
								{levels: levels, nonPrime: nonPrime, width: width});
						},
						A2(
							elm$json$Json$Decode$field,
							'levels',
							elm$json$Json$Decode$list(elm$json$Json$Decode$int)));
				},
				A2(elm$json$Json$Decode$field, 'nonPrime', elm$json$Json$Decode$string));
		},
		A2(elm$json$Json$Decode$field, 'width', elm$json$Json$Decode$int)));
var elm$json$Json$Decode$value = _Json_decodeValue;
var author$project$Ports$onPrimeResponse = _Platform_incomingPort('onPrimeResponse', elm$json$Json$Decode$value);
var author$project$Types$ChangeStage = function (a) {
	return {$: 'ChangeStage', a: a};
};
var author$project$Types$Noop = {$: 'Noop'};
var author$project$Subscriptions$toDirection = function (string) {
	switch (string) {
		case 'ArrowUp':
			return author$project$Types$ChangeStage(-1);
		case 'ArrowDown':
			return author$project$Types$ChangeStage(1);
		default:
			return author$project$Types$Noop;
	}
};
var author$project$Subscriptions$keyDecoder = A2(
	elm$json$Json$Decode$map,
	author$project$Subscriptions$toDirection,
	A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string));
var author$project$Types$NonPrimeError = function (a) {
	return {$: 'NonPrimeError', a: a};
};
var author$project$Types$NonPrimeGenerated = F2(
	function (a, b) {
		return {$: 'NonPrimeGenerated', a: a, b: b};
	});
var author$project$Types$PrimeResponse = function (a) {
	return {$: 'PrimeResponse', a: a};
};
var elm$browser$Browser$Events$Document = {$: 'Document'};
var elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$browser$Browser$Events$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Events$State, _List_Nil, elm$core$Dict$empty));
var elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Events$spawn = F3(
	function (router, key, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						elm$core$Platform$sendToSelf,
						router,
						A2(elm$browser$Browser$Events$Event, key, event));
				}));
	});
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$core$Process$kill = _Scheduler_kill;
var elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _n6) {
				var deads = _n6.a;
				var lives = _n6.b;
				var news = _n6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						elm$core$List$cons,
						A3(elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_n4, pid, _n5) {
				var deads = _n5.a;
				var lives = _n5.b;
				var news = _n5.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _n2, _n3) {
				var deads = _n3.a;
				var lives = _n3.b;
				var news = _n3.c;
				return _Utils_Tuple3(
					deads,
					A3(elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2(elm$core$List$map, elm$browser$Browser$Events$addKey, subs);
		var _n0 = A6(
			elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, elm$core$Dict$empty, _List_Nil));
		var deadPids = _n0.a;
		var livePids = _n0.b;
		var makeNewPids = _n0.c;
		return A2(
			elm$core$Task$andThen,
			function (pids) {
				return elm$core$Task$succeed(
					A2(
						elm$browser$Browser$Events$State,
						newSubs,
						A2(
							elm$core$Dict$union,
							livePids,
							elm$core$Dict$fromList(pids))));
			},
			A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$sequence(makeNewPids);
				},
				elm$core$Task$sequence(
					A2(elm$core$List$map, elm$core$Process$kill, deadPids))));
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _n0, state) {
		var key = _n0.key;
		var event = _n0.event;
		var toMessage = function (_n2) {
			var subKey = _n2.a;
			var _n3 = _n2.b;
			var node = _n3.a;
			var name = _n3.b;
			var decoder = _n3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : elm$core$Maybe$Nothing;
		};
		var messages = A2(elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Platform$sendToApp(router),
					messages)));
	});
var elm$browser$Browser$Events$subMap = F2(
	function (func, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var decoder = _n0.c;
		return A3(
			elm$browser$Browser$Events$MySub,
			node,
			name,
			A2(elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager(elm$browser$Browser$Events$init, elm$browser$Browser$Events$onEffects, elm$browser$Browser$Events$onSelfMsg, 0, elm$browser$Browser$Events$subMap);
var elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return elm$browser$Browser$Events$subscription(
			A3(elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var elm$browser$Browser$Events$onKeyDown = A2(elm$browser$Browser$Events$on, elm$browser$Browser$Events$Document, 'keydown');
var elm$core$Elm$JsArray$map = _JsArray_map;
var elm$core$Array$map = F2(
	function (func, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = function (node) {
			if (node.$ === 'SubTree') {
				var subTree = node.a;
				return elm$core$Array$SubTree(
					A2(elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return elm$core$Array$Leaf(
					A2(elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2(elm$core$Elm$JsArray$map, helper, tree),
			A2(elm$core$Elm$JsArray$map, func, tail));
	});
var elm$core$Platform$Sub$batch = _Platform_batch;
var author$project$Subscriptions$subscriptions = function (_n0) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				author$project$Ports$nonPrimeGenerated(
				function (_n1) {
					var nonPrime = _n1.nonPrime;
					var width = _n1.width;
					var levels = _n1.levels;
					return A2(
						author$project$Types$NonPrimeGenerated,
						author$project$NumberString$fromString(nonPrime),
						{
							levels: A2(
								elm$core$Array$map,
								function (level) {
									return {
										attemptedValue: elm$core$String$fromInt(level),
										error: elm$core$Maybe$Nothing,
										value: level
									};
								},
								elm$core$Array$fromList(levels)),
							width: {
								attemptedValue: elm$core$String$fromInt(width),
								error: elm$core$Maybe$Nothing,
								value: width
							}
						});
				}),
				author$project$Ports$nonPrimeError(author$project$Types$NonPrimeError),
				author$project$Ports$onPrimeResponse(author$project$Types$PrimeResponse),
				elm$browser$Browser$Events$onKeyDown(author$project$Subscriptions$keyDecoder)
			]));
};
var elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var elm$core$Set$empty = elm$core$Set$Set_elm_builtin(elm$core$Dict$empty);
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return elm$core$Set$Set_elm_builtin(
			A3(elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var elm$core$Set$fromList = function (list) {
	return A3(elm$core$List$foldl, elm$core$Set$insert, elm$core$Set$empty, list);
};
var author$project$Config$copyableStages = elm$core$Set$fromList(
	_List_fromArray(
		[0, 2, 3]));
var author$project$DisplayPanel$imageNumber2rows = function (imageNumber) {
	var _n0 = imageNumber;
	var width = _n0.width;
	var number = _n0.number;
	var string = author$project$NumberString$toString(number);
	return (string === '') ? _List_Nil : A2(
		elm$core$List$cons,
		A2(elm$core$String$left, width, string),
		author$project$DisplayPanel$imageNumber2rows(
			_Utils_update(
				imageNumber,
				{
					number: author$project$NumberString$fromString(
						A2(elm$core$String$dropLeft, width, string))
				})));
};
var author$project$DisplayPanel$imageNumber2displayString = function (imageNumber) {
	return A2(
		elm$core$String$join,
		'\n',
		author$project$DisplayPanel$imageNumber2rows(imageNumber));
};
var author$project$DisplayPanel$maybeSingleton = function (maybe) {
	if (maybe.$ === 'Just') {
		var val = maybe.a;
		return _List_fromArray(
			[val]);
	} else {
		return _List_Nil;
	}
};
var author$project$Resources$corpusImageNumber = {
	number: A2(
		elm$core$Basics$composeR,
		elm$core$String$split(' '),
		A2(
			elm$core$Basics$composeR,
			elm$core$String$join(''),
			A2(
				elm$core$Basics$composeR,
				elm$core$String$split('\n'),
				A2(
					elm$core$Basics$composeR,
					elm$core$String$join(''),
					author$project$NumberString$fromString))))('\n              1001010777777777777770777777777777777777770777777777777777777777\n              1010010777777777777702077777777777777777702077777777777777777777\n              1001000777777777777770777777777777777777770777777777777777777777\n              7777777777777777777705077777777777777777705077777777777777777777\n              7777777777777777777055107777777777777777015507777777777777777777\n              7777777777777777777055507777777777777777055507777777777777777777\n              7777777777777777777000037777777007777777300007777777777777777777\n              7777777777777777770433307777770880777777033340777777777777777777\n              7777777778777777777000007777771001777777000007777777777777777777\n              7778777077777777777099907777710550177777099907777777777707777777\n              7777777017777777777099907777105555017777099907777777777107777777\n              7777777047777777777099907717053003507177100007777777777407777777\n              7777770107777777787000800500511111150050080007777777777010777777\n              7777770107777777777109900051100000011500099907777777777010777777\n              7777777247777777777000001115051111605111001007777777777327777777\n              7777777007777787777099301500115005110051039907777777777007777777\n              7777777077877777771099300011110880111100039901777787777707777777\n              7777777047777777700000001111115005111112000000078777777407778777\n              7000700560110011055059901111111111111111099505501100110650070007\n              0656065555005500555009001111116005111111009005550055005555606560\n              5555555555555555555009001115088988805111009005555555555555555555\n              0000005500000000000090901119088888809111090900000000000055000000\n              1111105501111111111090901110888888880111090901111111111055011111\n              9511105501115995111090901118008008008111090901115995111055011159\n              0851105501168008511030301118888888888111030301159008512065011580\n              0801100001108008011053501118888888889111053501108008011000011080\n              0801105501108008010900001118888888888111000090108018011055011080\n              0802105501108008011055501110000330000111056501108008011055011080\n              0801105501108008011059503400000000099933059501108008011055011080\n              3331105501133333311093305555655555555555033901133333312055011333\n              0000005500000000000095909999999999999999095900000000000055000000\n              1111505505111111111094901111112111111111094901111111115055051111\n              1111105501111111111092901119000100009111092901111111111055011112\n              1111100001111112111095901210888988880111095901111111111000011111\n              8511105501115891111095901110800880080111195901111985111055011158\n              0051106501150008111092901110088888800111092901118000511055011500\n              0831105501138080110055901110188888800111095500110808311055011380\n              0831105501138080110555550110088888800110555550110808311056011390\n              0031105611130000110555550110088888800110555550110000311055011300\n              1111055550111111110555550110088888800110555550111111110555501112\n              1111055550111111110555550110088888800110555550111111110550000000\n              0000055550000000000555550000088888800000555550000000000550120397\n            '),
	width: 64
};
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$path = elm$svg$Svg$trustedNode('path');
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var author$project$Resources$defaultImage = A2(
	elm$svg$Svg$svg,
	_List_fromArray(
		[
			elm$svg$Svg$Attributes$width('196px'),
			elm$svg$Svg$Attributes$height('196px'),
			elm$svg$Svg$Attributes$viewBox('0 0 24 24')
		]),
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$path,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$d('\n        M 4 4 C 2.9069372 4 2 4.9069372 2 6 L 2 18 C 2 19.093063 2.9069372 20 4 20 L 20 20 C 21.093063 20 22 19.093063 22 18 L 22 6 C 22 4.9069372 21.093063 4 20 4 L 4 4 z M 4 6 L 20 6 L 20 18 L 4 18 L 4 6 z M 14.5 11 L 11 15 L 8.5 12.5 L 5.7773438 16 L 18.25 16 L 14.5 11 z\n        ')
				]),
			_List_Nil)
		]));
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$img = _VirtualDom_node('img');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$src = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var elm$html$Html$Attributes$title = elm$html$Html$Attributes$stringProperty('title');
var author$project$DisplayPanel$displays = function (props) {
	var primeImageList = function () {
		var _n0 = props.primeImage;
		switch (_n0.$) {
			case 'Loaded':
				var imageNumber = _n0.a;
				return _List_fromArray(
					[
						elm$html$Html$text(
						author$project$DisplayPanel$imageNumber2displayString(imageNumber))
					]);
			case 'Loading':
				return _List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('lds-spinner')
							]),
						A2(
							elm$core$List$repeat,
							12,
							A2(elm$html$Html$div, _List_Nil, _List_Nil)))
					]);
			default:
				return _List_Nil;
		}
	}();
	var nonPrimeImageList = author$project$DisplayPanel$maybeSingleton(
		A2(
			elm$core$Maybe$map,
			elm$html$Html$text,
			A2(elm$core$Maybe$map, author$project$DisplayPanel$imageNumber2displayString, props.nonPrimeImage)));
	var imagePreview = A2(
		elm$core$Maybe$withDefault,
		author$project$Resources$defaultImage,
		A2(
			elm$core$Maybe$map,
			function (image) {
				return A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$src(image.contents),
							elm$html$Html$Attributes$title(image.filename)
						]),
					_List_Nil);
			},
			props.imagePreview));
	return _List_fromArray(
		[
			_List_fromArray(
			[
				A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('image-number'),
						elm$html$Html$Attributes$class('auto-resize')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(
						author$project$DisplayPanel$imageNumber2displayString(author$project$Resources$corpusImageNumber))
					]))
			]),
			_List_fromArray(
			[imagePreview]),
			_List_fromArray(
			[
				A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('image-number'),
						elm$html$Html$Attributes$class('auto-resize')
					]),
				nonPrimeImageList)
			]),
			_List_fromArray(
			[
				A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('image-number'),
						elm$html$Html$Attributes$class('auto-resize')
					]),
				primeImageList)
			])
		]);
};
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (_n0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return A2(elm$core$Dict$member, key, dict);
	});
var elm$html$Html$button = _VirtualDom_node('button');
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$DisplayPanel$view = function (props) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('display-panel stage-selecting')
					]),
				A2(
					elm$core$List$map,
					elm$html$Html$div(
						_Utils_ap(
							_List_fromArray(
								[
									elm$html$Html$Events$onClick(
									author$project$Types$ChangeStage(1))
								]),
							(!props.canGoNext) ? _List_fromArray(
								[
									elm$html$Html$Attributes$class('disabled')
								]) : _List_Nil)),
					author$project$DisplayPanel$displays(props))),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('menu-bar')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$button,
						_List_fromArray(
							[
								A2(
								elm$html$Html$Attributes$attribute,
								'data-clipboard-target',
								'.display-panel > div:nth-child(' + (elm$core$String$fromInt(props.stage + 1) + ') > *')),
								elm$html$Html$Attributes$class(
								A2(elm$core$Set$member, props.stage, author$project$Config$copyableStages) ? 'copy-me' : 'disabled')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('COPY')
							]))
					]))
			]));
};
var elm$html$Html$h1 = _VirtualDom_node('h1');
var elm$html$Html$p = _VirtualDom_node('p');
var author$project$InteractionPanel$default_instructions = function (stage) {
	return _List_fromArray(
		[
			A2(
			elm$html$Html$h1,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Unknown stage')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text(
					'Stage ' + (elm$core$String$fromInt(stage) + ' could not be found'))
				]))
		]);
};
var author$project$InteractionPanel$stageButton = F2(
	function (change, props) {
		var enabled = (change > 0) ? props.canGoNext : ((change < 0) ? props.canGoBack : false);
		return elm$html$Html$button(
			_List_fromArray(
				[
					A2(
					elm$html$Html$Attributes$attribute,
					'data-stage-change',
					elm$core$String$fromInt(change)),
					elm$html$Html$Events$onClick(
					author$project$Types$ChangeStage(change)),
					elm$html$Html$Attributes$class(
					enabled ? '' : 'disabled')
				]));
	});
var author$project$Types$Archer = {$: 'Archer'};
var author$project$Types$Corpus = {$: 'Corpus'};
var author$project$Types$SelectExampleImage = function (a) {
	return {$: 'SelectExampleImage', a: a};
};
var author$project$Types$Sunflower = {$: 'Sunflower'};
var elm$core$Array$length = function (_n0) {
	var len = _n0.a;
	return len;
};
var elm$html$Html$br = _VirtualDom_node('br');
var elm$html$Html$li = _VirtualDom_node('li');
var elm$html$Html$ul = _VirtualDom_node('ul');
var author$project$InteractionPanel$instructions = function (props) {
	var makeErrorP = function (_n0) {
		var name = _n0.a;
		var errorDescription = _n0.b;
		return A2(
			elm$html$Html$p,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('error-in-field')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Error setting ' + (name + ':')),
					A2(elm$html$Html$br, _List_Nil, _List_Nil),
					elm$html$Html$text('  ' + errorDescription)
				]));
	};
	return elm$core$Array$fromList(
		_List_fromArray(
			[
				_List_fromArray(
				[
					A2(
					elm$html$Html$h1,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Welcome to Prime Image')
						])),
					A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Click '),
							A3(
							author$project$InteractionPanel$stageButton,
							1,
							props,
							_List_fromArray(
								[
									elm$html$Html$text('Next')
								])),
							elm$html$Html$text(' to begin.')
						]))
				]),
				_List_fromArray(
				[
					A2(
					elm$html$Html$h1,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Select Image')
						])),
					A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('First you must select an image to turn into a prime number.')
						])),
					A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Either use the box below to upload an image from your computer or select one of the following examples:'),
							A2(
							elm$html$Html$ul,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$li,
									_List_fromArray(
										[
											elm$html$Html$Events$onClick(
											author$project$Types$SelectExampleImage(author$project$Types$Archer))
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$button,
											_List_Nil,
											_List_fromArray(
												[
													elm$html$Html$text('English cricketer Jofra Archer')
												]))
										])),
									A2(
									elm$html$Html$li,
									_List_fromArray(
										[
											elm$html$Html$Events$onClick(
											author$project$Types$SelectExampleImage(author$project$Types$Sunflower))
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$button,
											_List_Nil,
											_List_fromArray(
												[
													elm$html$Html$text('A sunflower')
												]))
										])),
									A2(
									elm$html$Html$li,
									_List_fromArray(
										[
											elm$html$Html$Events$onClick(
											author$project$Types$SelectExampleImage(author$project$Types$Corpus))
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$button,
											_List_Nil,
											_List_fromArray(
												[
													elm$html$Html$text('Corpus Christi College Cambridge')
												]))
										]))
								]))
						])),
					A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Once you have opened an image, click '),
							A3(
							author$project$InteractionPanel$stageButton,
							1,
							props,
							_List_fromArray(
								[
									elm$html$Html$text('Next')
								])),
							elm$html$Html$text(' to convert the image to a number')
						]))
				]),
				A2(
				elm$core$List$cons,
				A2(
					elm$html$Html$h1,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Convert Image To Number')
						])),
				A2(
					elm$core$List$cons,
					A2(
						elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('\n                Set the number of digits to use for your image using width.\n                Be warned that images with a large number of digits may take a very long time to convert to a prime.\n                ')
							])),
					A2(
						elm$core$List$cons,
						A2(
							elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(
									'The ' + (elm$core$String$fromInt(
										elm$core$Array$length(props.toNumberConfig.levels)) + '\n                levels determine the which pixel values map to each number.\n                Play around with these to get the clearest number image.\n                '))
								])),
						A2(
							elm$core$List$map,
							makeErrorP,
							author$project$ToNumberConfig$Types$errorsInModel(props.toNumberConfig))))),
				_Utils_ap(
				_List_fromArray(
					[
						A2(
						elm$html$Html$h1,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Create a Prime Number')
							])),
						A2(
						elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Click below to find a prime number similar to the current number.')
							])),
						A2(
						elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text('Please be aware that if the width is much more than 20, then this could take a very long time.')
							]))
					]),
				_Utils_ap(
					A2(
						elm$core$Maybe$withDefault,
						_List_Nil,
						A2(
							elm$core$Maybe$map,
							function (error) {
								return _List_fromArray(
									[
										A2(
										elm$html$Html$p,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('error-in-field')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Error finding a prime:'),
												A2(elm$html$Html$br, _List_Nil, _List_Nil),
												elm$html$Html$text(error)
											]))
									]);
							},
							props.primeError)),
					props.fetchingPrime ? _List_fromArray(
						[
							A2(
							elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text('Calculating prime number...')
								]))
						]) : _List_Nil))
			]));
};
var author$project$Config$imageInputId = 'file';
var author$project$Types$ImageSelected = function (a) {
	return {$: 'ImageSelected', a: a};
};
var elm$file$File$decoder = _File_decoder;
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var author$project$InteractionPanel$decodeFile = A2(
	elm$json$Json$Decode$map,
	A2(
		elm$core$Basics$composeR,
		elm$core$List$head,
		A2(
			elm$core$Basics$composeR,
			elm$core$Maybe$map(author$project$Types$ImageSelected),
			elm$core$Maybe$withDefault(author$project$Types$Noop))),
	A2(
		elm$json$Json$Decode$at,
		_List_fromArray(
			['target', 'files']),
		elm$json$Json$Decode$list(elm$file$File$decoder)));
var elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var author$project$Resources$fileUploadIcon = A2(
	elm$svg$Svg$svg,
	_List_fromArray(
		[
			elm$svg$Svg$Attributes$class('icon'),
			elm$svg$Svg$Attributes$width('50'),
			elm$svg$Svg$Attributes$height('43'),
			elm$svg$Svg$Attributes$viewBox('0 0 50 43')
		]),
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$path,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$d('\n        M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0\n        .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5\n        1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4\n        0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4\n        0s-.7 1.7 0 2.4l10 11.6z\n        ')
				]),
			_List_Nil)
		]));
var author$project$ToNumberConfig$Types$SetWidth = function (a) {
	return {$: 'SetWidth', a: a};
};
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$label = _VirtualDom_node('label');
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$html$Html$Attributes$classList = function (classes) {
	return elm$html$Html$Attributes$class(
		A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				elm$core$Tuple$first,
				A2(elm$core$List$filter, elm$core$Tuple$second, classes))));
};
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var author$project$ToNumberConfig$View$dimensionBox = F2(
	function (_n0, errorable) {
		var msg = _n0.msg;
		var name = _n0.name;
		var isError = function () {
			var _n1 = errorable.error;
			if (_n1.$ === 'Just') {
				return true;
			} else {
				return false;
			}
		}();
		return A2(
			elm$html$Html$label,
			_List_fromArray(
				[
					elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('error-in-field', isError)
						]))
				]),
			_List_fromArray(
				[
					elm$html$Html$text(name),
					A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Attributes$type_('text'),
							elm$html$Html$Attributes$class('to-number-config-input'),
							A2(elm$html$Html$Attributes$attribute, 'data-input-name', name),
							elm$html$Html$Attributes$value(errorable.attemptedValue),
							A2(
							elm$html$Html$Events$on,
							'input',
							A2(
								elm$json$Json$Decode$map,
								msg,
								A2(
									elm$json$Json$Decode$at,
									_List_fromArray(
										['target', 'value']),
									elm$json$Json$Decode$string)))
						]),
					_List_Nil)
				]));
	});
var author$project$ToNumberConfig$Types$FinishedChanging = {$: 'FinishedChanging'};
var author$project$ToNumberConfig$Types$SetLevel = F2(
	function (a, b) {
		return {$: 'SetLevel', a: a, b: b};
	});
var elm$html$Html$Events$onMouseUp = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'mouseup',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$ToNumberConfig$View$levelBox = F2(
	function (level, errorable) {
		var name = 'level ' + elm$core$String$fromInt(level + 1);
		var msg = author$project$ToNumberConfig$Types$SetLevel(level);
		var isError = function () {
			var _n0 = errorable.error;
			if (_n0.$ === 'Just') {
				return true;
			} else {
				return false;
			}
		}();
		return A2(
			elm$html$Html$label,
			_List_fromArray(
				[
					elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('error-in-field', isError)
						]))
				]),
			_List_fromArray(
				[
					elm$html$Html$text(name),
					A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Attributes$type_('range'),
							elm$html$Html$Attributes$class('to-number-config-input'),
							A2(elm$html$Html$Attributes$attribute, 'min', '0'),
							A2(elm$html$Html$Attributes$attribute, 'max', '255'),
							A2(elm$html$Html$Attributes$attribute, 'data-input-name', name),
							elm$html$Html$Attributes$value(errorable.attemptedValue),
							elm$html$Html$Events$onMouseUp(author$project$ToNumberConfig$Types$FinishedChanging),
							A2(
							elm$html$Html$Events$on,
							'input',
							A2(
								elm$json$Json$Decode$map,
								msg,
								A2(
									elm$json$Json$Decode$at,
									_List_fromArray(
										['target', 'value']),
									elm$json$Json$Decode$string)))
						]),
					_List_Nil)
				]));
	});
var elm$html$Html$form = _VirtualDom_node('form');
var author$project$ToNumberConfig$View$view = function (model) {
	var levelInputs = A2(
		elm$core$List$indexedMap,
		author$project$ToNumberConfig$View$levelBox,
		elm$core$Array$toList(model.levels));
	var children = A2(
		elm$core$List$cons,
		A2(
			author$project$ToNumberConfig$View$dimensionBox,
			{msg: author$project$ToNumberConfig$Types$SetWidth, name: 'width'},
			model.width),
		levelInputs);
	return A2(
		elm$html$Html$form,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('to-number-config')
			]),
		children);
};
var author$project$Types$RequestPrime = {$: 'RequestPrime'};
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm$html$Html$map = elm$virtual_dom$VirtualDom$map;
var elm$html$Html$strong = _VirtualDom_node('strong');
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var elm$html$Html$Attributes$name = elm$html$Html$Attributes$stringProperty('name');
var author$project$InteractionPanel$interactions = function (props) {
	return elm$core$Array$fromList(
		_List_fromArray(
			[
				_List_Nil,
				_List_fromArray(
				[
					A2(
					elm$html$Html$form,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('image-pick')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$label,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('content')
										]),
									_List_fromArray(
										[
											author$project$Resources$fileUploadIcon,
											A2(
											elm$html$Html$input,
											_List_fromArray(
												[
													elm$html$Html$Attributes$type_('file'),
													elm$html$Html$Attributes$name('files[]'),
													elm$html$Html$Attributes$id(author$project$Config$imageInputId),
													A2(elm$html$Html$Events$on, 'change', author$project$InteractionPanel$decodeFile)
												]),
											_List_Nil),
											A2(
											elm$html$Html$div,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('file-label')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$strong,
													_List_Nil,
													_List_fromArray(
														[
															elm$html$Html$text('Click here to choose a file')
														]))
												]))
										]))
								]))
						]))
				]),
				_List_fromArray(
				[
					A2(
					elm$html$Html$map,
					author$project$Types$UpdateNumberConfig,
					author$project$ToNumberConfig$View$view(props.toNumberConfig))
				]),
				_List_fromArray(
				[
					A2(
					elm$html$Html$label,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('prime-generate')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$button,
							_List_fromArray(
								[
									elm$html$Html$Events$onClick(author$project$Types$RequestPrime)
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Generate Prime')
								]))
						]))
				])
			]));
};
var elm$html$Html$section = _VirtualDom_node('section');
var author$project$InteractionPanel$view = function (props) {
	var interaction = A2(
		elm$core$Maybe$withDefault,
		_List_Nil,
		A2(
			elm$core$Array$get,
			props.stage,
			author$project$InteractionPanel$interactions(props)));
	var instruction = A2(
		elm$core$Maybe$withDefault,
		author$project$InteractionPanel$default_instructions(props.stage),
		A2(
			elm$core$Array$get,
			props.stage,
			author$project$InteractionPanel$instructions(props)));
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('interaction-panel')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$section,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('interaction-instructions stage-selecting')
					]),
				instruction),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('interaction-interface stage-selecting')
					]),
				interaction),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('interaction-control')
					]),
				_List_fromArray(
					[
						A3(
						author$project$InteractionPanel$stageButton,
						-1,
						props,
						_List_fromArray(
							[
								elm$html$Html$text('Back')
							])),
						A3(
						author$project$InteractionPanel$stageButton,
						1,
						props,
						_List_fromArray(
							[
								elm$html$Html$text('Next')
							]))
					]))
			]));
};
var author$project$Types$Loaded = function (a) {
	return {$: 'Loaded', a: a};
};
var author$project$Types$Loading = {$: 'Loading'};
var author$project$Types$NotLoading = {$: 'NotLoading'};
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm$html$Html$node = elm$virtual_dom$VirtualDom$node;
var author$project$View$view = function (model) {
	var toNumberConfig = A2(elm$core$Maybe$withDefault, author$project$ToNumberConfig$State$initialState, model.toNumberConfig);
	var canGoNext = A2(author$project$Lib$saturateStageChange, model, 1) === 1;
	var displayProps = {
		canGoNext: canGoNext,
		imagePreview: model.image,
		nonPrimeImage: A2(
			elm$core$Maybe$map,
			function (number) {
				return {number: number, width: toNumberConfig.width.value};
			},
			model.nonPrime),
		primeImage: function () {
			var _n2 = model.prime;
			if (_n2.$ === 'Just') {
				switch (_n2.a.$) {
					case 'FoundPrime':
						var primeNumber = _n2.a.a.primeNumber;
						return author$project$Types$Loaded(
							{number: primeNumber, width: toNumberConfig.width.value});
					case 'InProgress':
						return author$project$Types$Loading;
					default:
						return author$project$Types$NotLoading;
				}
			} else {
				return author$project$Types$NotLoading;
			}
		}(),
		stage: model.stage
	};
	var interactionProps = {
		canGoBack: _Utils_eq(
			A2(author$project$Lib$saturateStageChange, model, -1),
			-1),
		canGoNext: canGoNext,
		fetchingPrime: function () {
			var _n0 = model.prime;
			if ((_n0.$ === 'Just') && (_n0.a.$ === 'InProgress')) {
				return true;
			} else {
				return false;
			}
		}(),
		primeError: function () {
			var _n1 = model.prime;
			if ((_n1.$ === 'Just') && (_n1.a.$ === 'PrimeError')) {
				var e = _n1.a.a;
				return elm$core$Maybe$Just(e);
			} else {
				return elm$core$Maybe$Nothing;
			}
		}(),
		stage: model.stage,
		toNumberConfig: toNumberConfig
	};
	return A3(
		elm$html$Html$node,
		'main',
		_List_Nil,
		_List_fromArray(
			[
				author$project$InteractionPanel$view(interactionProps),
				author$project$DisplayPanel$view(displayProps)
			]));
};
var elm$browser$Browser$document = _Browser_document;
var author$project$Main$main = elm$browser$Browser$document(
	{
		init: function (_n0) {
			return author$project$State$initialState;
		},
		subscriptions: author$project$Subscriptions$subscriptions,
		update: author$project$State$update,
		view: function (model) {
			return {
				body: _List_fromArray(
					[
						author$project$View$view(model)
					]),
				title: 'Prime Image'
			};
		}
	});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(scope));export const { Elm } = scope;

