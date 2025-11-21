import "./chunk-5WRI5ZAA.js";

// node_modules/gsap/utils/VelocityTracker.js
var gsap;
var _coreInitted;
var _toArray;
var _getUnit;
var _first;
var _ticker;
var _time1;
var _time2;
var _getCache;
var _getGSAP = function _getGSAP2() {
  return gsap || typeof window !== "undefined" && (gsap = window.gsap);
};
var _lookup = {};
var _round = function _round2(value) {
  return Math.round(value * 1e4) / 1e4;
};
var _getID = function _getID2(target) {
  return _getCache(target).id;
};
var _getByTarget = function _getByTarget2(target) {
  return _lookup[_getID(typeof target === "string" ? _toArray(target)[0] : target)];
};
var _onTick = function _onTick2(time) {
  var pt = _first, val;
  if (time - _time1 >= 0.05) {
    _time2 = _time1;
    _time1 = time;
    while (pt) {
      val = pt.g(pt.t, pt.p);
      if (val !== pt.v1 || time - pt.t1 > 0.2) {
        pt.v2 = pt.v1;
        pt.v1 = val;
        pt.t2 = pt.t1;
        pt.t1 = time;
      }
      pt = pt._next;
    }
  }
};
var _types = {
  deg: 360,
  rad: Math.PI * 2
};
var _initCore = function _initCore2() {
  gsap = _getGSAP();
  if (gsap) {
    _toArray = gsap.utils.toArray;
    _getUnit = gsap.utils.getUnit;
    _getCache = gsap.core.getCache;
    _ticker = gsap.ticker;
    _coreInitted = 1;
  }
};
var PropTracker = function PropTracker2(target, property, type, next) {
  this.t = target;
  this.p = property;
  this.g = target._gsap.get;
  this.rCap = _types[type || _getUnit(this.g(target, property))];
  this.v1 = this.v2 = 0;
  this.t1 = this.t2 = _ticker.time;
  if (next) {
    this._next = next;
    next._prev = this;
  }
};
var VelocityTracker = (function() {
  function VelocityTracker2(target, property) {
    if (!_coreInitted) {
      _initCore();
    }
    this.target = _toArray(target)[0];
    _lookup[_getID(this.target)] = this;
    this._props = {};
    property && this.add(property);
  }
  VelocityTracker2.register = function register2(core) {
    gsap = core;
    _initCore();
  };
  var _proto = VelocityTracker2.prototype;
  _proto.get = function get(property, skipRecentTick) {
    var pt = this._props[property] || console.warn("Not tracking " + property + " velocity."), val, dif, rotationCap;
    val = parseFloat(skipRecentTick ? pt.v1 : pt.g(pt.t, pt.p));
    dif = val - parseFloat(pt.v2);
    rotationCap = pt.rCap;
    if (rotationCap) {
      dif = dif % rotationCap;
      if (dif !== dif % (rotationCap / 2)) {
        dif = dif < 0 ? dif + rotationCap : dif - rotationCap;
      }
    }
    return _round(dif / ((skipRecentTick ? pt.t1 : _ticker.time) - pt.t2));
  };
  _proto.getAll = function getAll() {
    var result = {}, props = this._props, p;
    for (p in props) {
      result[p] = this.get(p);
    }
    return result;
  };
  _proto.isTracking = function isTracking(property) {
    return property in this._props;
  };
  _proto.add = function add(property, type) {
    if (!(property in this._props)) {
      if (!_first) {
        _ticker.add(_onTick);
        _time1 = _time2 = _ticker.time;
      }
      _first = this._props[property] = new PropTracker(this.target, property, type, _first);
    }
  };
  _proto.remove = function remove(property) {
    var pt = this._props[property], prev, next;
    if (pt) {
      prev = pt._prev;
      next = pt._next;
      if (prev) {
        prev._next = next;
      }
      if (next) {
        next._prev = prev;
      } else if (_first === pt) {
        _ticker.remove(_onTick);
        _first = 0;
      }
      delete this._props[property];
    }
  };
  _proto.kill = function kill(shallow) {
    for (var p in this._props) {
      this.remove(p);
    }
    if (!shallow) {
      delete _lookup[_getID(this.target)];
    }
  };
  VelocityTracker2.track = function track(targets, properties, types) {
    if (!_coreInitted) {
      _initCore();
    }
    var result = [], targs = _toArray(targets), a = properties.split(","), t = (types || "").split(","), i = targs.length, tracker, j;
    while (i--) {
      tracker = _getByTarget(targs[i]) || new VelocityTracker2(targs[i]);
      j = a.length;
      while (j--) {
        tracker.add(a[j], t[j] || t[0]);
      }
      result.push(tracker);
    }
    return result;
  };
  VelocityTracker2.untrack = function untrack(targets, properties) {
    var props = (properties || "").split(",");
    _toArray(targets).forEach(function(target) {
      var tracker = _getByTarget(target);
      if (tracker) {
        if (!props.length) {
          tracker.kill(1);
        } else {
          props.forEach(function(p) {
            return tracker.remove(p);
          });
        }
      }
    });
  };
  VelocityTracker2.isTracking = function isTracking(target, property) {
    var tracker = _getByTarget(target);
    return tracker && tracker.isTracking(property);
  };
  VelocityTracker2.getVelocity = function getVelocity(target, property) {
    var tracker = _getByTarget(target);
    return !tracker || !tracker.isTracking(property) ? console.warn("Not tracking velocity of " + property) : tracker.get(property);
  };
  return VelocityTracker2;
})();
VelocityTracker.getByTarget = _getByTarget;
_getGSAP() && gsap.registerPlugin(VelocityTracker);

// node_modules/gsap/InertiaPlugin.js
var gsap2;
var _coreInitted2;
var _parseEase;
var _toArray2;
var _power3;
var _config;
var _getUnit2;
var PropTween;
var _getCache2;
var _checkPointRatio;
var _clamp;
var _processingVars;
var _getStyleSaver;
var _reverting;
var _getTracker = VelocityTracker.getByTarget;
var _getGSAP3 = function _getGSAP4() {
  return gsap2 || typeof window !== "undefined" && (gsap2 = window.gsap) && gsap2.registerPlugin && gsap2;
};
var _isString = function _isString2(value) {
  return typeof value === "string";
};
var _isNumber = function _isNumber2(value) {
  return typeof value === "number";
};
var _isObject = function _isObject2(value) {
  return typeof value === "object";
};
var _isFunction = function _isFunction2(value) {
  return typeof value === "function";
};
var _bonusValidated = 1;
var _isArray = Array.isArray;
var _emptyFunc = function _emptyFunc2(p) {
  return p;
};
var _bigNum = 1e10;
var _tinyNum = 1 / _bigNum;
var _checkPoint = 0.05;
var _round3 = function _round4(value) {
  return Math.round(value * 1e4) / 1e4;
};
var _extend = function _extend2(obj, defaults, exclude) {
  for (var p in defaults) {
    if (!(p in obj) && p !== exclude) {
      obj[p] = defaults[p];
    }
  }
  return obj;
};
var _deepClone = function _deepClone2(obj) {
  var copy = {}, p, v;
  for (p in obj) {
    copy[p] = _isObject(v = obj[p]) && !_isArray(v) ? _deepClone2(v) : v;
  }
  return copy;
};
var _getClosest = function _getClosest2(n, values, max, min, radius) {
  var i = values.length, closest = 0, absDif = _bigNum, val, dif, p, dist;
  if (_isObject(n)) {
    while (i--) {
      val = values[i];
      dif = 0;
      for (p in n) {
        dist = val[p] - n[p];
        dif += dist * dist;
      }
      if (dif < absDif) {
        closest = i;
        absDif = dif;
      }
    }
    if ((radius || _bigNum) < _bigNum && radius < Math.sqrt(absDif)) {
      return n;
    }
  } else {
    while (i--) {
      val = values[i];
      dif = val - n;
      if (dif < 0) {
        dif = -dif;
      }
      if (dif < absDif && val >= min && val <= max) {
        closest = i;
        absDif = dif;
      }
    }
  }
  return values[closest];
};
var _parseEnd = function _parseEnd2(curProp, end, max, min, name, radius, velocity) {
  if (curProp.end === "auto") {
    return curProp;
  }
  var endVar = curProp.end, adjustedEnd, p;
  max = isNaN(max) ? _bigNum : max;
  min = isNaN(min) ? -_bigNum : min;
  if (_isObject(end)) {
    adjustedEnd = end.calculated ? end : (_isFunction(endVar) ? endVar(end, velocity) : _getClosest(end, endVar, max, min, radius)) || end;
    if (!end.calculated) {
      for (p in adjustedEnd) {
        end[p] = adjustedEnd[p];
      }
      end.calculated = true;
    }
    adjustedEnd = adjustedEnd[name];
  } else {
    adjustedEnd = _isFunction(endVar) ? endVar(end, velocity) : _isArray(endVar) ? _getClosest(end, endVar, max, min, radius) : parseFloat(endVar);
  }
  if (adjustedEnd > max) {
    adjustedEnd = max;
  } else if (adjustedEnd < min) {
    adjustedEnd = min;
  }
  return {
    max: adjustedEnd,
    min: adjustedEnd,
    unitFactor: curProp.unitFactor
  };
};
var _getNumOrDefault = function _getNumOrDefault2(vars, property, defaultValue) {
  return isNaN(vars[property]) ? defaultValue : +vars[property];
};
var _calculateChange = function _calculateChange2(velocity, duration) {
  return duration * _checkPoint * velocity / _checkPointRatio;
};
var _calculateDuration = function _calculateDuration2(start, end, velocity) {
  return Math.abs((end - start) * _checkPointRatio / velocity / _checkPoint);
};
var _reservedProps = {
  resistance: 1,
  checkpoint: 1,
  preventOvershoot: 1,
  linkedProps: 1,
  radius: 1,
  duration: 1
};
var _processLinkedProps = function _processLinkedProps2(target, vars, getVal, resistance) {
  if (vars.linkedProps) {
    var linkedPropNames = vars.linkedProps.split(","), linkedProps = {}, i, p, curProp, curVelocity, tracker, curDuration;
    for (i = 0; i < linkedPropNames.length; i++) {
      p = linkedPropNames[i];
      curProp = vars[p];
      if (curProp) {
        if (_isNumber(curProp.velocity)) {
          curVelocity = curProp.velocity;
        } else {
          tracker = tracker || _getTracker(target);
          curVelocity = tracker && tracker.isTracking(p) ? tracker.get(p) : 0;
        }
        curDuration = Math.abs(curVelocity / _getNumOrDefault(curProp, "resistance", resistance));
        linkedProps[p] = parseFloat(getVal(target, p)) + _calculateChange(curVelocity, curDuration);
      }
    }
    return linkedProps;
  }
};
var _calculateTweenDuration = function _calculateTweenDuration2(target, vars, maxDuration, minDuration, overshootTolerance, recordEnd) {
  if (maxDuration === void 0) {
    maxDuration = 10;
  }
  if (minDuration === void 0) {
    minDuration = 0.2;
  }
  if (overshootTolerance === void 0) {
    overshootTolerance = 1;
  }
  if (recordEnd === void 0) {
    recordEnd = 0;
  }
  _isString(target) && (target = _toArray2(target)[0]);
  if (!target) {
    return 0;
  }
  var duration = 0, clippedDuration = _bigNum, inertiaVars = vars.inertia || vars, getVal = _getCache2(target).get, resistance = _getNumOrDefault(inertiaVars, "resistance", _config.resistance), p, curProp, curDuration, curVelocity, curVal, end, curClippedDuration, tracker, unitFactor, linkedProps;
  linkedProps = _processLinkedProps(target, inertiaVars, getVal, resistance);
  for (p in inertiaVars) {
    if (!_reservedProps[p]) {
      curProp = inertiaVars[p];
      if (!_isObject(curProp)) {
        tracker = tracker || _getTracker(target);
        if (tracker && tracker.isTracking(p)) {
          curProp = _isNumber(curProp) ? {
            velocity: curProp
          } : {
            velocity: tracker.get(p)
          };
        } else {
          curVelocity = +curProp || 0;
          curDuration = Math.abs(curVelocity / resistance);
        }
      }
      if (_isObject(curProp)) {
        if (_isNumber(curProp.velocity)) {
          curVelocity = curProp.velocity;
        } else {
          tracker = tracker || _getTracker(target);
          curVelocity = tracker && tracker.isTracking(p) ? tracker.get(p) : 0;
        }
        curDuration = _clamp(minDuration, maxDuration, Math.abs(curVelocity / _getNumOrDefault(curProp, "resistance", resistance)));
        curVal = parseFloat(getVal(target, p)) || 0;
        end = curVal + _calculateChange(curVelocity, curDuration);
        if ("end" in curProp) {
          curProp = _parseEnd(curProp, linkedProps && p in linkedProps ? linkedProps : end, curProp.max, curProp.min, p, inertiaVars.radius, curVelocity);
          if (recordEnd) {
            _processingVars === vars && (_processingVars = inertiaVars = _deepClone(vars));
            inertiaVars[p] = _extend(curProp, inertiaVars[p], "end");
          }
        }
        if ("max" in curProp && end > +curProp.max + _tinyNum) {
          unitFactor = curProp.unitFactor || _config.unitFactors[p] || 1;
          curClippedDuration = curVal > curProp.max && curProp.min !== curProp.max || curVelocity * unitFactor > -15 && curVelocity * unitFactor < 45 ? minDuration + (maxDuration - minDuration) * 0.1 : _calculateDuration(curVal, curProp.max, curVelocity);
          if (curClippedDuration + overshootTolerance < clippedDuration) {
            clippedDuration = curClippedDuration + overshootTolerance;
          }
        } else if ("min" in curProp && end < +curProp.min - _tinyNum) {
          unitFactor = curProp.unitFactor || _config.unitFactors[p] || 1;
          curClippedDuration = curVal < curProp.min && curProp.min !== curProp.max || curVelocity * unitFactor > -45 && curVelocity * unitFactor < 15 ? minDuration + (maxDuration - minDuration) * 0.1 : _calculateDuration(curVal, curProp.min, curVelocity);
          if (curClippedDuration + overshootTolerance < clippedDuration) {
            clippedDuration = curClippedDuration + overshootTolerance;
          }
        }
        curClippedDuration > duration && (duration = curClippedDuration);
      }
      curDuration > duration && (duration = curDuration);
    }
  }
  duration > clippedDuration && (duration = clippedDuration);
  return duration > maxDuration ? maxDuration : duration < minDuration ? minDuration : duration;
};
var _initCore3 = function _initCore4() {
  gsap2 = _getGSAP3();
  if (gsap2) {
    _parseEase = gsap2.parseEase;
    _toArray2 = gsap2.utils.toArray;
    _getUnit2 = gsap2.utils.getUnit;
    _getCache2 = gsap2.core.getCache;
    _clamp = gsap2.utils.clamp;
    _getStyleSaver = gsap2.core.getStyleSaver;
    _reverting = gsap2.core.reverting || function() {
    };
    _power3 = _parseEase("power3");
    _checkPointRatio = _power3(0.05);
    PropTween = gsap2.core.PropTween;
    gsap2.config({
      resistance: 100,
      unitFactors: {
        time: 1e3,
        totalTime: 1e3,
        progress: 1e3,
        totalProgress: 1e3
      }
    });
    _config = gsap2.config();
    gsap2.registerPlugin(VelocityTracker);
    _coreInitted2 = 1;
  }
};
var InertiaPlugin = {
  version: "3.13.0",
  name: "inertia",
  register: function register(core) {
    gsap2 = core;
    _initCore3();
  },
  init: function init(target, vars, tween, index, targets) {
    _coreInitted2 || _initCore3();
    var tracker = _getTracker(target);
    if (vars === "auto") {
      if (!tracker) {
        console.warn("No inertia tracking on " + target + ". InertiaPlugin.track(target) first.");
        return;
      }
      vars = tracker.getAll();
    }
    this.styles = _getStyleSaver && typeof target.style === "object" && _getStyleSaver(target);
    this.target = target;
    this.tween = tween;
    _processingVars = vars;
    var cache = target._gsap, getVal = cache.get, dur = vars.duration, durIsObj = _isObject(dur), preventOvershoot = vars.preventOvershoot || durIsObj && dur.overshoot === 0, resistance = _getNumOrDefault(vars, "resistance", _config.resistance), duration = _isNumber(dur) ? dur : _calculateTweenDuration(target, vars, durIsObj && dur.max || 10, durIsObj && dur.min || 0.2, durIsObj && "overshoot" in dur ? +dur.overshoot : preventOvershoot ? 0 : 1, true), p, curProp, curVal, unit, velocity, change1, end, change2, linkedProps;
    vars = _processingVars;
    _processingVars = 0;
    linkedProps = _processLinkedProps(target, vars, getVal, resistance);
    for (p in vars) {
      if (!_reservedProps[p]) {
        curProp = vars[p];
        _isFunction(curProp) && (curProp = curProp(index, target, targets));
        if (_isNumber(curProp)) {
          velocity = curProp;
        } else if (_isObject(curProp) && !isNaN(curProp.velocity)) {
          velocity = +curProp.velocity;
        } else {
          if (tracker && tracker.isTracking(p)) {
            velocity = tracker.get(p);
          } else {
            console.warn("ERROR: No velocity was defined for " + target + " property: " + p);
          }
        }
        change1 = _calculateChange(velocity, duration);
        change2 = 0;
        curVal = getVal(target, p);
        unit = _getUnit2(curVal);
        curVal = parseFloat(curVal);
        if (_isObject(curProp)) {
          end = curVal + change1;
          if ("end" in curProp) {
            curProp = _parseEnd(curProp, linkedProps && p in linkedProps ? linkedProps : end, curProp.max, curProp.min, p, vars.radius, velocity);
          }
          if ("max" in curProp && +curProp.max < end) {
            if (preventOvershoot || curProp.preventOvershoot) {
              change1 = curProp.max - curVal;
            } else {
              change2 = curProp.max - curVal - change1;
            }
          } else if ("min" in curProp && +curProp.min > end) {
            if (preventOvershoot || curProp.preventOvershoot) {
              change1 = curProp.min - curVal;
            } else {
              change2 = curProp.min - curVal - change1;
            }
          }
        }
        this._props.push(p);
        this.styles && this.styles.save(p);
        this._pt = new PropTween(this._pt, target, p, curVal, 0, _emptyFunc, 0, cache.set(target, p, this));
        this._pt.u = unit || 0;
        this._pt.c1 = change1;
        this._pt.c2 = change2;
      }
    }
    tween.duration(duration);
    return _bonusValidated;
  },
  render: function render(ratio, data) {
    var pt = data._pt;
    ratio = _power3(data.tween._time / data.tween._dur);
    if (ratio || !_reverting()) {
      while (pt) {
        pt.set(pt.t, pt.p, _round3(pt.s + pt.c1 * ratio + pt.c2 * ratio * ratio) + pt.u, pt.d, ratio);
        pt = pt._next;
      }
    } else {
      data.styles.revert();
    }
  }
};
"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(name) {
  return InertiaPlugin[name] = VelocityTracker[name];
});
_getGSAP3() && gsap2.registerPlugin(InertiaPlugin);
export {
  InertiaPlugin,
  VelocityTracker,
  InertiaPlugin as default
};
//# sourceMappingURL=gsap_InertiaPlugin.js.map
