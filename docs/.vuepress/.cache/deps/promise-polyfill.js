// node_modules/promise-polyfill/src/finally.js
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
}
var finally_default = finallyConstructor;

// node_modules/promise-polyfill/src/allSettled.js
function allSettled(arr) {
  var P = this;
  return new P(function(resolve2, reject2) {
    if (!(arr && typeof arr.length !== "undefined")) {
      return reject2(
        new TypeError(
          typeof arr + " " + arr + " is not iterable(cannot read property Symbol(Symbol.iterator))"
        )
      );
    }
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve2([]);
    var remaining = args.length;
    function res(i2, val) {
      if (val && (typeof val === "object" || typeof val === "function")) {
        var then = val.then;
        if (typeof then === "function") {
          then.call(
            val,
            function(val2) {
              res(i2, val2);
            },
            function(e) {
              args[i2] = { status: "rejected", reason: e };
              if (--remaining === 0) {
                resolve2(args);
              }
            }
          );
          return;
        }
      }
      args[i2] = { status: "fulfilled", value: val };
      if (--remaining === 0) {
        resolve2(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
}
var allSettled_default = allSettled;

// node_modules/promise-polyfill/src/any.js
function AggregateError(errors, message) {
  this.name = "AggregateError", this.errors = errors;
  this.message = message || "";
}
AggregateError.prototype = Error.prototype;
function any(arr) {
  var P = this;
  return new P(function(resolve2, reject2) {
    if (!(arr && typeof arr.length !== "undefined")) {
      return reject2(new TypeError("Promise.any accepts an array"));
    }
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return reject2();
    var rejectionReasons = [];
    for (var i = 0; i < args.length; i++) {
      try {
        P.resolve(args[i]).then(resolve2).catch(function(error) {
          rejectionReasons.push(error);
          if (rejectionReasons.length === args.length) {
            reject2(
              new AggregateError(
                rejectionReasons,
                "All promises were rejected"
              )
            );
          }
        });
      } catch (ex) {
        reject2(ex);
      }
    }
  });
}
var any_default = any;

// node_modules/promise-polyfill/src/index.js
var setTimeoutFunc = setTimeout;
function isArray(x) {
  return Boolean(x && typeof x.length !== "undefined");
}
function noop() {
}
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}
function Promise2(fn) {
  if (!(this instanceof Promise2))
    throw new TypeError("Promises must be constructed via new");
  if (typeof fn !== "function") throw new TypeError("not a function");
  this._state = 0;
  this._handled = false;
  this._value = void 0;
  this._deferreds = [];
  doResolve(fn, this);
}
function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise2._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}
function resolve(self, newValue) {
  try {
    if (newValue === self)
      throw new TypeError("A promise cannot be resolved with itself.");
    if (newValue && (typeof newValue === "object" || typeof newValue === "function")) {
      var then = newValue.then;
      if (newValue instanceof Promise2) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === "function") {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}
function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}
function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise2._immediateFn(function() {
      if (!self._handled) {
        Promise2._unhandledRejectionFn(self._value);
      }
    });
  }
  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
  this.onRejected = typeof onRejected === "function" ? onRejected : null;
  this.promise = promise;
}
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}
Promise2.prototype["catch"] = function(onRejected) {
  return this.then(null, onRejected);
};
Promise2.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);
  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};
Promise2.prototype["finally"] = finally_default;
Promise2.all = function(arr) {
  return new Promise2(function(resolve2, reject2) {
    if (!isArray(arr)) {
      return reject2(new TypeError("Promise.all accepts an array"));
    }
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve2([]);
    var remaining = args.length;
    function res(i2, val) {
      try {
        if (val && (typeof val === "object" || typeof val === "function")) {
          var then = val.then;
          if (typeof then === "function") {
            then.call(
              val,
              function(val2) {
                res(i2, val2);
              },
              reject2
            );
            return;
          }
        }
        args[i2] = val;
        if (--remaining === 0) {
          resolve2(args);
        }
      } catch (ex) {
        reject2(ex);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};
Promise2.any = any_default;
Promise2.allSettled = allSettled_default;
Promise2.resolve = function(value) {
  if (value && typeof value === "object" && value.constructor === Promise2) {
    return value;
  }
  return new Promise2(function(resolve2) {
    resolve2(value);
  });
};
Promise2.reject = function(value) {
  return new Promise2(function(resolve2, reject2) {
    reject2(value);
  });
};
Promise2.race = function(arr) {
  return new Promise2(function(resolve2, reject2) {
    if (!isArray(arr)) {
      return reject2(new TypeError("Promise.race accepts an array"));
    }
    for (var i = 0, len = arr.length; i < len; i++) {
      Promise2.resolve(arr[i]).then(resolve2, reject2);
    }
  });
};
Promise2._immediateFn = // @ts-ignore
typeof setImmediate === "function" && function(fn) {
  setImmediate(fn);
} || function(fn) {
  setTimeoutFunc(fn, 0);
};
Promise2._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== "undefined" && console) {
    console.warn("Possible Unhandled Promise Rejection:", err);
  }
};
var src_default = Promise2;
export {
  src_default as default
};
//# sourceMappingURL=promise-polyfill.js.map
