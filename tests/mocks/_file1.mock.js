'use strict';

function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex; }

const fs = require('fs');
const fs$1 = require('fs-extra');

const fs$1__default = _interopDefault(fs$1);
const moment = _interopDefault(require('moment'));
const puppeteer = _interopDefault(require('puppeteer'));
const request = _interopDefault(require('requestretry'));
const path = require('path');
const program = _interopDefault(require('commander'));

function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}

const runtime = createCommonjsModule((module) => {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  !(function (global) {
    let Op = Object.prototype;
    let hasOwn = Op.hasOwnProperty;
    let undefined; // More compressible than void 0.
    let $Symbol = typeof Symbol === 'function' ? Symbol : {};
    let iteratorSymbol = $Symbol.iterator || '@@iterator';
    let asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator';
    let toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';
    let runtime = global.regeneratorRuntime;
    if (runtime) {
      {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }

    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = module.exports;

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      let protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      let generator = Object.create(protoGenerator.prototype);
      let context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    runtime.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: 'normal', arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: 'throw', arg: err };
      }
    }

    let GenStateSuspendedStart = 'suspendedStart';
    let GenStateSuspendedYield = 'suspendedYield';
    let GenStateExecuting = 'executing';
    let GenStateCompleted = 'completed';

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    let ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() { }
    function GeneratorFunction() { }
    function GeneratorFunctionPrototype() { }

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    let IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    let getProto = Object.getPrototypeOf;
    let NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    let Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = 'GeneratorFunction';

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ['next', 'throw', 'return'].forEach((method) => {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function (genFun) {
      let ctor = typeof genFun === 'function' && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === 'GeneratorFunction'
        : false;
    };

    runtime.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = 'GeneratorFunction';
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    runtime.awrap = function (arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        let record = tryCatch(generator[method], generator, arg);
        if (record.type === 'throw') {
          reject(record.arg);
        } else {
          let result = record.arg;
          let value = result.value;
          if (value &&
            typeof value === 'object' &&
            hasOwn.call(value, '__await')) {
            return Promise.resolve(value.__await).then((value) => {
              invoke("next", value, resolve, reject);
            }, (err) => {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then((unwrapped) => {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            resolve(result);
          }, reject);
        }
      }

      let previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(((resolve, reject) => {
            invoke(method, arg, resolve, reject);
          }));
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    runtime.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      let iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

      return runtime.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then((result) => {
          return result.done ? result.value : iter.next();
        });
    };

    function makeInvokeMethod(innerFn, self, context) {
      let state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error('Generator is already running');
        }

        if (state === GenStateCompleted) {
          if (method === 'throw') {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          let delegate = context.delegate;
          if (delegate) {
            let delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === 'next') {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === 'throw') {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === 'return') {
            context.abrupt('return', context.arg);
          }

          state = GenStateExecuting;

          let record = tryCatch(innerFn, self, context);
          if (record.type === 'normal') {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === 'throw') {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = 'throw';
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      let method = delegate.iterator[context.method];
      if (method === undefined) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === 'throw') {
          if (delegate.iterator.return) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = 'return';
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);

            if (context.method === 'throw') {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = 'throw';
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      let record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === 'throw') {
        context.method = 'throw';
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      let info = record.arg;

      if (!info) {
        context.method = 'throw';
        context.arg = new TypeError('iterator result is not an object');
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== 'return') {
          context.method = 'next';
          context.arg = undefined;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = 'Generator';

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return '[object Generator]';
    };

    function pushTryEntry(locs) {
      let entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      let record = entry.completion || {};
      record.type = 'normal';
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: 'root' }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function (object) {
      let keys = [];
      for (let key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          let key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        let iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === 'function') {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          let i = -1, 
next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;

    function doneResult() {
      return { value: undefined, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset (skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },

      stop () {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException (exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
          (type === "break" ||
            type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete (record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
          record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      'catch': function (tryLoc) {
        for (let i = this.tryEntries.length - 1; i >= 0; --i) {
          let entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            let record = entry.completion;
            if (record.type === 'throw') {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error('illegal catch attempt');
      },

      delegateYield (iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined;
        }

        return ContinueSentinel;
      }
    };
  }(
    // In sloppy mode, unbound `this` refers to the global object, fallback to
    // Function constructor if we're in global strict mode. That is sadly a form
    // of indirect eval which violates Content Security Policy.
    (function () { return this })() || Function("return this")()
  ));
});

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
const g = (function () { return this; }()) || Function('return this')();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
const hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf('regeneratorRuntime') >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
const oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

const runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch (e) {
    g.regeneratorRuntime = undefined;
  }
}

const regenerator = runtimeModule;

// 7.1.4 ToInteger
const ceil = Math.ceil;
const floor = Math.floor;
const _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.2.1 RequireObjectCoercible(argument)
const _defined = function (it) {
  if (it == undefined) throw TypeError(`Can't call method on  ${ it}`);
  return it;
};

// true  -> String#at
// false -> String#codePointAt
const _stringAt = function (TO_STRING) {
  return function (that, pos) {
    const s = String(_defined(that));
    const i = _toInteger(pos);
    const l = s.length;
    let a,
      b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

const _library = true;

const _global = createCommonjsModule((module) => {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  let global = module.exports = typeof window !== 'undefined' && window.Math == Math
    ? window : typeof self !== 'undefined' && self.Math == Math ? self
      // eslint-disable-next-line no-new-func
      : Function('return this')();
  if (typeof __g === 'number') __g = global; // eslint-disable-line no-undef
});

const _core = createCommonjsModule((module) => {
  let core = module.exports = { version: '2.5.7' };
  if (typeof __e === 'number') __e = core; // eslint-disable-line no-undef
});
const _core_1 = _core.version;

const _aFunction = function (it) {
  if (typeof it !== 'function') throw TypeError(`${it} is not a function!`);
  return it;
};

// optional / simple context binding

const _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

const _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

const _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(`${it} is not an object!`);
  return it;
};

const _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
const _descriptors = !_fails(() => Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7);

const document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
const is = _isObject(document$1) && _isObject(document$1.createElement);
const _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

const _ie8DomDefine = !_descriptors && !_fails(() => Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7);

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
const _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  let fn,
    val;
  if (S && typeof (fn = it.toString) === 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) === 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) === 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

const dP = Object.defineProperty;

const f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) { 
try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ } 
}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

const _objectDp = {
  f
};

const _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value
  };
};

const _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

const hasOwnProperty = {}.hasOwnProperty;
const _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

const PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  const IS_FORCED = type & $export.F;
  const IS_GLOBAL = type & $export.G;
  const IS_STATIC = type & $export.S;
  const IS_PROTO = type & $export.P;
  const IS_BIND = type & $export.B;
  const IS_WRAP = type & $export.W;
  const exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  const expProto = exports[PROTOTYPE];
  const target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  let key,
    own,
    out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] !== 'function' ? source[key]
    // bind timers to global for call from export context
      : IS_BIND && own ? _ctx(out, _global)
      // wrap global constructors for prevent change them in library
        : IS_WRAP && target[key] == out ? (function (C) {
          const F = function (a, b, c) {
            if (this instanceof C) {
              switch (arguments.length) {
                case 0: return new C();
                case 1: return new C(a);
                case 2: return new C(a, b);
              } return new C(a, b, c);
            } return C.apply(this, arguments);
          };
          F[PROTOTYPE] = C[PROTOTYPE];
          return F;
          // make static versions for prototype methods
        }(out)) : IS_PROTO && typeof out === 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
const _export = $export;

const _redefine = _hide;

const _iterators = {};

const toString = {}.toString;

const _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
const _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


const _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.15 ToLength

const min = Math.min;
const _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

const max = Math.max;
const min$1 = Math.min;
const _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes


const _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    const O = _toIobject($this);
    const length = _toLength(O.length);
    let index = _toAbsoluteIndex(fromIndex, length);
    let value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) {
 while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
    }
 } else {
 for (; length > index; index++) {if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    }}
 } return !IS_INCLUDES && -1;
  };
};

const _shared = createCommonjsModule((module) => {
  let SHARED = '__core-js_shared__';
  let store = _global[SHARED] || (_global[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: _core.version,
    mode: 'pure',
    copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
  });
});

let id = 0;
const px = Math.random();
const _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

const shared = _shared('keys');

const _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

const arrayIndexOf = _arrayIncludes(false);
const IE_PROTO = _sharedKey('IE_PROTO');

const _objectKeysInternal = function (object, names) {
  const O = _toIobject(object);
  let i = 0;
  const result = [];
  let key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) {
 if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  } 
}
  return result;
};

// IE 8- don't enum bug keys
const _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)


const _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

const _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  const keys = _objectKeys(Properties);
  const length = keys.length;
  let i = 0;
  let P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

const document$2 = _global.document;
const _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])


const IE_PROTO$1 = _sharedKey('IE_PROTO');
const Empty = function () { /* empty */ };
const PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  const iframe = _domCreate('iframe');
  let i = _enumBugKeys.length;
  const lt = '<';
  const gt = '>';
  let iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(`${lt}script${gt }document.F=Object${lt }/script${gt}`);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

const _objectCreate = Object.create || function create(O, Properties) {
  let result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

const _wks = createCommonjsModule((module) => {
  let store = _shared('wks');

  let Symbol = _global.Symbol;
  let USE_SYMBOL = typeof Symbol === 'function';

  let $exports = module.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)(`Symbol.${  name}`));
  };

  $exports.store = store;
});

const def = _objectDp.f;

const TAG = _wks('toStringTag');

const _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

const IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

const _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, `${NAME } Iterator`);
};

// 7.1.13 ToObject(argument)

const _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


const IE_PROTO$2 = _sharedKey('IE_PROTO');
const ObjectProto = Object.prototype;

const _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor === 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

const ITERATOR = _wks('iterator');
const BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
const FF_ITERATOR = '@@iterator';
const KEYS = 'keys';
const VALUES = 'values';

const returnThis = function () { return this; };

const _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  const getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  const TAG = `${NAME} Iterator`;
  const DEF_VALUES = DEFAULT == VALUES;
  let VALUES_BUG = false;
  var proto = Base.prototype;
  const $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  let $default = $native || getMethod(DEFAULT);
  const $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  const $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  let methods,
    key,
    IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && typeof IteratorPrototype[ITERATOR] !== 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) { 
for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } 
} else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

const $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  const O = this._t;
  const index = this._i;
  let point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

const _iterStep = function (done, value) {
  return { value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
const es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0; // next index
  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  const O = this._t;
  const kind = this._k;
  const index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

const TO_STRING_TAG = _wks('toStringTag');

const DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (let i = 0; i < DOMIterables.length; i++) {
  const NAME = DOMIterables[i];
  const Collection = _global[NAME];
  const proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

// getting tag from 19.1.3.6 Object.prototype.toString()

const TAG$1 = _wks('toStringTag');
// ES3 wrong here
const ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
const tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

const _classof = function (it) {
  let O,
    T,
    B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) === 'string' ? T
    // builtinTag case
      : ARG ? _cof(O)
      // ES3 arguments fallback
        : (B = _cof(O)) == 'Object' && typeof O.callee === 'function' ? 'Arguments' : B;
};

const _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(`${name }: incorrect invocation!`);
  } return it;
};

// call something on iterator step with safe closing on error

const _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    const ret = iterator.return;
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

const ITERATOR$1 = _wks('iterator');
const ArrayProto = Array.prototype;

const _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

const ITERATOR$2 = _wks('iterator');

const core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) { 
return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)]; 
}
};

const _forOf = createCommonjsModule((module) => {
  let BREAK = {};
  let RETURN = {};
  let exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
    let iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
    let f = _ctx(fn, that, entries ? 2 : 1);
    let index = 0;
    let length, 
step, 
iterator, 
result;
    if (typeof iterFn !== 'function') throw TypeError(`${iterable  } is not iterable!`);
    // fast case for arrays with default iterator
    if (_isArrayIter(iterFn)) {for (length = _toLength(iterable.length); length > index; index++) {
      result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
      if (result === BREAK || result === RETURN) return result;
    }} else {for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      result = _iterCall(iterator, f, step.value, entries);
      if (result === BREAK || result === RETURN) return result;
    }}
  };
  exports.BREAK = BREAK;
  exports.RETURN = RETURN;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)


const SPECIES = _wks('species');
const _speciesConstructor = function (O, D) {
  const C = _anObject(O).constructor;
  let S;
  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
};

// fast apply, http://jsperf.lnkit.com/fast-apply/5
const _invoke = function (fn, args, that) {
  const un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
      : fn.call(that);
    case 1: return un ? fn(args[0])
      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

const process$1 = _global.process;
let setTask = _global.setImmediate;
let clearTask = _global.clearImmediate;
const MessageChannel = _global.MessageChannel;
const Dispatch = _global.Dispatch;
let counter = 0;
const queue = {};
const ONREADYSTATECHANGE = 'onreadystatechange';
let defer,
  channel,
  port;
const run = function () {
  const id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    const fn = queue[id];
    delete queue[id];
    fn();
  }
};
const listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    const args = [];
    let i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      _invoke(typeof fn === 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (_cof(process$1) == 'process') {
    defer = function (id) {
      process$1.nextTick(_ctx(run, id, 1));
    };
    // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(_ctx(run, id, 1));
    };
    // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (_global.addEventListener && typeof postMessage === 'function' && !_global.importScripts) {
    defer = function (id) {
      _global.postMessage(`${id }`, '*');
    };
    _global.addEventListener('message', listener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
    defer = function (id) {
      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
        _html.removeChild(this);
        run.call(id);
      };
    };
    // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}
const _task = {
  set: setTask,
  clear: clearTask
};

const macrotask = _task.set;
const Observer = _global.MutationObserver || _global.WebKitMutationObserver;
const process$2 = _global.process;
const Promise$1 = _global.Promise;
const isNode = _cof(process$2) == 'process';

const _microtask = function () {
  let head,
    last,
    notify;

  const flush = function () {
    let parent,
      fn;
    if (isNode && (parent = process$2.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process$2.nextTick(flush);
    };
    // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
    let toggle = true;
    const node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    const promise = Promise$1.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(_global, flush);
    };
  }

  return function (fn) {
    const task = { fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

// 25.4.1.5 NewPromiseCapability(C)


function PromiseCapability(C) {
  let resolve,
    reject;
  this.promise = new C((($$resolve, $$reject) => {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  }));
  this.resolve = _aFunction(resolve);
  this.reject = _aFunction(reject);
}

const f$1 = function (C) {
  return new PromiseCapability(C);
};

const _newPromiseCapability = {
  f: f$1
};

const _perform = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

const navigator = _global.navigator;

const _userAgent = navigator && navigator.userAgent || '';

const _promiseResolve = function (C, x) {
  _anObject(C);
  if (_isObject(x) && x.constructor === C) return x;
  const promiseCapability = _newPromiseCapability.f(C);
  const resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

const _redefineAll = function (target, src, safe) {
  for (const key in src) {
    if (safe && target[key]) target[key] = src[key];
    else _hide(target, key, src[key]);
  } return target;
};

const SPECIES$1 = _wks('species');

const _setSpecies = function (KEY) {
  const C = typeof _core[KEY] === 'function' ? _core[KEY] : _global[KEY];
  if (_descriptors && C && !C[SPECIES$1]) {
 _objectDp.f(C, SPECIES$1, {
    configurable: true,
    get () { return this; }
  }); 
}
};

const ITERATOR$3 = _wks('iterator');
let SAFE_CLOSING = false;

try {
  const riter = [7][ITERATOR$3]();
  riter.return = function () { SAFE_CLOSING = true; };
} catch (e) { /* empty */ }

const _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  let safe = false;
  try {
    const arr = [7];
    const iter = arr[ITERATOR$3]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$3] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

const task = _task.set;
const microtask = _microtask();


const PROMISE = 'Promise';
const TypeError$1 = _global.TypeError;
const process$3 = _global.process;
const versions = process$3 && process$3.versions;
const v8 = versions && versions.v8 || '';
let $Promise = _global[PROMISE];
const isNode$1 = _classof(process$3) == 'process';
const empty = function () { /* empty */ };
let Internal,
  newGenericPromiseCapability,
  OwnPromiseCapability,
  Wrapper;
let newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

const USE_NATIVE = !!(function () {
  try {
    // correct subclassing with @@species support
    let promise = $Promise.resolve(1);
    let FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode$1 || typeof PromiseRejectionEvent === 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && _userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}());

// helpers
const isThenable = function (it) {
  let then;
  return _isObject(it) && typeof (then = it.then) === 'function' ? then : false;
};
const notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  const chain = promise._c;
  microtask(() => {
    let value = promise._v;
    let ok = promise._s == 1;
    let i = 0;
    let run = function (reaction) {
      let handler = ok ? reaction.ok : reaction.fail;
      let resolve = reaction.resolve;
      let reject = reaction.reject;
      let domain = reaction.domain;
      let result, 
then, 
exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(_global, () => {
    let value = promise._v;
    let unhandled = isUnhandled(promise);
    let result, 
handler, 
console;
    if (unhandled) {
      result = _perform(() => {
        if (isNode$1) {
          process$3.emit('unhandledRejection', value, promise);
        } else if (handler = _global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = _global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(_global, () => {
    let handler;
    if (isNode$1) {
      process$3.emit('rejectionHandled', promise);
    } else if (handler = _global.onrejectionhandled) {
      handler({ promise, reason: promise._v });
    }
  });
};
const $reject = function (value) {
  let promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  let promise = this;
  let then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(() => {
        let wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    _anInstance(this, $Promise, PROMISE, '_h');
    _aFunction(executor);
    Internal.call(this);
    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = []; // <- awaiting reactions
    this._a = undefined; // <- checked in isUnhandled reactions
    this._s = 0; // <- state
    this._d = false; // <- done
    this._v = undefined; // <- value
    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false; // <- notify
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      const reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled === 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected === 'function' && onRejected;
      reaction.domain = isNode$1 ? process$3.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    catch (onRejected) {
			return this.then(undefined, onRejected);
		}
  });
  OwnPromiseCapability = function () {
    const promise = new Internal();
    this.promise = promise;
    this.resolve = _ctx($resolve, promise, 1);
    this.reject = _ctx($reject, promise, 1);
  };
  _newPromiseCapability.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    const capability = newPromiseCapability(this);
    const $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * (_library || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
  }
});
_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect((iter) => {
  $Promise.all(iter).catch(empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    const C = this;
    const capability = newPromiseCapability(C);
    const resolve = capability.resolve;
    const reject = capability.reject;
    const result = _perform(() => {
      let values = [];
      let index = 0;
      let remaining = 1;
      _forOf(iterable, false, (promise) => {
          var $index = index++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          C.resolve(promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[$index] = value;
            --remaining || resolve(values);
          }, reject);
        });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    const C = this;
    const capability = newPromiseCapability(C);
    const reject = capability.reject;
    const result = _perform(() => {
      _forOf(iterable, false, (promise) => {
          C.resolve(promise).then(capability.resolve, reject);
        });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

_export(_export.P + _export.R, 'Promise', {
  finally (onFinally) {
		let C = _speciesConstructor(this, _core.Promise || _global.Promise);
		let isFunction = typeof onFinally === 'function';
		return this.then(
			isFunction ? (x) => {
        return _promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
			isFunction ? (e) => {
        return _promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
		);
	}
});

// https://github.com/tc39/proposal-promise-try


_export(_export.S, 'Promise', {
  try (callbackfn) {
		let promiseCapability = _newPromiseCapability.f(this);
		let result = _perform(callbackfn);
		(result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
		return promiseCapability.promise;
	}
});

const promise = _core.Promise;

const promise$1 = createCommonjsModule((module) => {
  module.exports = { default: promise, __esModule: true };
});

unwrapExports(promise$1);

const asyncToGenerator = createCommonjsModule((module, exports) => {
  exports.__esModule = true;


  let _promise2 = _interopRequireDefault(promise$1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = function (fn) {
    return function () {
      let gen = fn.apply(this, arguments);
      return new _promise2.default(((resolve, reject) => {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return _promise2.default.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      }));
    };
  };
});

const _asyncToGenerator = unwrapExports(asyncToGenerator);

moment.locale('pt-br');

function mkdir(newDest) {
  // Make sure the output directory is there.
  fs$1.ensureDirSync(newDest);
}

// TIME & DATE
function getTime() {
  const append = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ':';

  return `${moment().format('DD/MM/YYYY-HH:mm:ss')}${append}`;
}

function log(msg) {
  console.log(getTime(), msg);
}

function extractor() {
  const extractedElements = document.querySelectorAll('img');
  const items = [];
  let _iteratorNormalCompletion = true;
  let _didIteratorError = false;
  let _iteratorError;

  try {
    for (var _iterator = extractedElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      const element = _step.value;

      if (!element.alt.endsWith('profile picture')) {
        const a = element.parentNode.parentNode.parentNode.href.split('/?taken-by')[0];
        items.push({
          id: a.split('/p/')[1],
          a,
          src: element.src
        });
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return items;
}

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
function inArray(arr, comparer) {
  for (let i = 0; i < arr.length; i += 1) {
    if (comparer(arr[i])) return true;
  }
  return false;
}

// adds an element to the array if it does not already exist using a comparer
// function
function pushIfNotExist(arr, element, comparer) {
  if (!inArray(arr, comparer)) {
    arr.push(element);
  }
}

const scroller = (function () {
  let _ref = _asyncToGenerator(/*#__PURE__ */regenerator.mark(function _callee(page, extractr, targetCount) {
    let scrollDelay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;

    let res, 
items, 
previousHeight, 
_loop, 
_iteratorNormalCompletion2, 
_didIteratorError2, 
_iteratorError2, 
_iterator2, 
_step2, 
element;

    return regenerator.wrap((_context) => {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = [];
            items = [];
            _context.prev = 2;
            previousHeight = void 0;

          case 4:
            if (!(res.length < targetCount)) {
              _context.next = 39;
              break;
            }

            _context.next = 7;
            return page.evaluate(extractr);

          case 7:
            items = _context.sent;

            _loop = function _loop(element) {
              pushIfNotExist(res, element, function (e) {
                return e.id === element.id;
              });
            };

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 12;


            for (_iterator2 = items[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              element = _step2.value;

              _loop(element);
            }

            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](12);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 20:
            _context.prev = 20;
            _context.prev = 21;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 23:
            _context.prev = 23;

            if (!_didIteratorError2) {
              _context.next = 26;
              break;
            }

            throw _iteratorError2;

          case 26:
            return _context.finish(23);

          case 27:
            return _context.finish(20);

          case 28:
            _context.next = 30;
            return page.evaluate('document.body.scrollHeight');

          case 30:
            previousHeight = _context.sent;
            _context.next = 33;
            return page.evaluate('window.scrollTo(0, document.body.scrollHeight)');

          case 33:
            _context.next = 35;
            return page.waitForFunction('document.body.scrollHeight > ' + previousHeight);

          case 35:
            _context.next = 37;
            return page.waitFor(scrollDelay);

          case 37:
            _context.next = 4;
            break;

          case 39:
            _context.next = 44;
            break;

          case 41:
            _context.prev = 41;
            _context.t1 = _context['catch'](2);
            throw _context.t1;

          case 44:
            return _context.abrupt('return', res);

          case 45:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 41], [12, 16, 20, 28], [21, , 23, 27]]);
  }));

  return function scroller(_x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());

function scraper(opt) {
  const _this = this;

  let user = opt.user,
    amount = opt.amount,
    dist = opt.dist;


  return _asyncToGenerator(/* #__PURE__ */regenerator.mark(function _callee2() {
    let browser,
      page,
      items,
      stream,
      i,
      item,
      dir,
      url;
    return regenerator.wrap((_context2) => {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return puppeteer.launch({
              timeout: 0,
              headless: false
            });

          case 2:
            browser = _context2.sent;
            _context2.next = 5;
            return browser.newPage();

          case 5:
            page = _context2.sent;


            mkdir(`${dist  }/${  user}`);
            log(`Loading user page of '${  user  }'..`);
            _context2.next = 10;
            return page.goto(`https://www.instagram.com/${  user}`);

          case 10:
            _context2.next = 12;
            return page.setViewport({
              width: 640,
              height: 1080
            });

          case 12:
            log('Page loaded.');

            // Scroll and extract items from the page.
            log('Scrolling through page...');
            _context2.next = 16;
            return scroller(page, extractor, amount, 200);

          case 16:
            items = _context2.sent;

            log('Done it!');

            log(`Creating file with image links for user '${  user  }'.`);
            stream = fs$1__default.createWriteStream(`${dist  }/${  user  }/pending.txt`, { flags: 'a' });

            for (i = 0; i < items.length; i += 1) {
              item = items[i];
              dir = `${dist  }/${  user  }/${  items.length - 1 - i  }.${  item.id  }.jpg`;
              url = `${item.a  }/media/?size=l`;


              if (fs$1__default.existsSync(dir)) {
                console.log(`Skipping ${  item.id}`);
              } else {
                try {
                  stream.write(`${url  }\n`);
                } catch (e) {
                  console.error(e, url);
                }
              }
            }
            stream.end();
            log('File written and closed.');

            // await page.screenshot({ path: `${user}.png`, fullPage: true });

            _context2.next = 25;
            return browser.close();

          case 25:
            return _context2.abrupt('return', items.length);

          case 26:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }))();
}

function delayStrategy() {
  // set delay of retry to a random number between 500 and 3500 ms
  return Math.floor(Math.random() * (3500 - 500 + 1) + 500);
}

/**
 * @param  {string} url
 * @param  {string} filename
 * @return {Promise}
 */
function downloadAndSave(url, filename) {
  // TODO: Guarantee that the file will be downloaded or indicate the error
  // to the user.
  // TODO: only remove successfully download files from pending.txt
  return request({
    url,
    delayStrategy
  }).pipe(fs.createWriteStream(filename)).on('close', () => log('Saved ' + url + ' to ' + filename));
}

function download(user, opt) {
  const dir = `${opt.dist}/${ user}`;

  log(`Downloading images from "${user}..."`);
  fs.readFile(`${dir }/pending.txt`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    data.toString().split('\n').forEach((url, i) => {
      if (url.length > 0) {
        var file = url.split('/p/')[1].split('/media')[0];

        log('[' + i + '] ' + user + ' => downloading ' + url + '.');
        downloadAndSave(url, dir + '/' + i + '.' + file + '.jpg');
      }
    });

    fs.unlinkSync(`${dir  }/pending.txt`);
  });
}

function downloadAllUsers(dir) {
  const dirs = function dirs(p) {
    return fs.readdirSync(p).filter((f) => fs.statSync(path.join(p, f)).isDirectory());
  };
  const users = dirs(dir);

  log(`Downloading images from ${users.length } users.`);
  let _iteratorNormalCompletion = true;
  let _didIteratorError = false;
  let _iteratorError;

  try {
    for (var _iterator = users[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      const user = _step.value;

      download(user);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

const defaultOptions = {
  dist: 'dl',
  user: {
    amount: 10,
    save: false
  },
  download: {
    all: false
  }
};

const pkg = require('../package.json');

program.version(pkg.version).description(pkg.description);

program.command('user <name>').alias('u').description('Get images from user.').option('-A, --amount <number>', `The minimum amount of images expected to download. (default: ${defaultOptions.user.amount })`)
  .option('-D, --destination <path>', `Destination folder. (default: "${defaultOptions.dist }")`)
  .option('-S, --save', `After getting the image links, download the image files. (default: ${defaultOptions.user.save})`)
  .action((user, cmd) => {
    let opt = {
      user,
      amount: cmd.amount || defaultOptions.user.amount,
      dist: cmd.destination || defaultOptions.dist,
      save: cmd.save || defaultOptions.user.save
    };

    scraper(opt).then(() => {
    if (opt.save) {
      download(opt.user, opt);
    }
  });
  });

program.command('download').alias('d').description('Download images already obtained from users.').option('-U, --user <name>', 'Download all pending images from a user.')
  .option('-A, --all', `Download all pending images from all users. (default: ${defaultOptions.download.all })`)
  .option('-D, --destination <path>', `Destination folder. (default: "${defaultOptions.dist}")`)
  .action((cmd) => {
    let opt = {
      dist: cmd.destination || defaultOptions.dist
    };

    if (cmd.all) {
      downloadAllUsers(opt.dist);
    } else if (cmd.user) {
      download(cmd.user, opt);
    } else {
      console.log('"user" or "all" option needs to be defined.');
    }
  });

// error on unknown commands
program.on('command:*', () => {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
