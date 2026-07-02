"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && (typeof from === "undefined" ? "undefined" : _type_of(from)) === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/lib.ts
var lib_exports = {};
__export(lib_exports, {
    ThemePicker: function() {
        return themePicker_default;
    },
    ThemeProvider: function() {
        return ThemeProvider;
    },
    WeekdayDateRangePicker: function() {
        return WeekdayDateRangePicker_default;
    },
    colorSchemas: function() {
        return colorSchemas;
    },
    useTheme: function() {
        return useTheme;
    }
});
module.exports = __toCommonJS(lib_exports);
// src/WeekdayDateRangePicker.tsx
var import_react = require("react");
// src/helpers.ts
var isWeekend = function(date) {
    return date ? date.getDay() === 0 || date.getDay() === 6 : false;
};
var calculateWeekdaysAndWeekends = function(start, end) {
    var weekdays = [];
    var weekends = [];
    for(var d = new Date(start); d <= end; d.setDate(d.getDate() + 1)){
        var newDate = new Date(d);
        if (isWeekend(newDate)) {
            weekends.push(newDate);
        } else {
            weekdays.push(newDate);
        }
    }
    return {
        weekdays: weekdays,
        weekends: weekends
    };
};
var generateYearOptions = function(startYear, length) {
    return Array.from({
        length: length
    }, function(_, index) {
        return startYear + index;
    });
};
var generateDays = function(startOfMonth, endOfMonth) {
    var weekStart = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var days = [];
    var firstDay = startOfMonth.getDay();
    var offset = (firstDay - weekStart + 7) % 7;
    var totalDays = endOfMonth.getDate();
    for(var i = 0; i < offset; i++){
        days.push(null);
    }
    for(var day = 1; day <= totalDays; day++){
        days.push(new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), day));
    }
    return days;
};
var getIsoWeekRange = function(date) {
    var current = new Date(date);
    current.setHours(0, 0, 0, 0);
    var isoDay = (current.getDay() + 6) % 7;
    var start = new Date(current);
    start.setDate(current.getDate() - isoDay);
    var end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
        start: start,
        end: end
    };
};
var getWeekRange = function(date, weekStart) {
    var current = new Date(date);
    current.setHours(0, 0, 0, 0);
    var dayIndex = current.getDay();
    var offset = weekStart === 1 ? (dayIndex + 6) % 7 : dayIndex;
    var start = new Date(current);
    start.setDate(current.getDate() - offset);
    var end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
        start: start,
        end: end
    };
};
var getLocaleWeekStart = function(locale) {
    if (!locale || typeof Intl === "undefined") {
        return 0;
    }
    try {
        var _localeObj_weekInfo;
        var localeObj = new Intl.Locale(locale);
        var firstDay = localeObj === null || localeObj === void 0 ? void 0 : (_localeObj_weekInfo = localeObj.weekInfo) === null || _localeObj_weekInfo === void 0 ? void 0 : _localeObj_weekInfo.firstDay;
        if (firstDay === 1) {
            return 1;
        }
        if (firstDay === 7) {
            return 0;
        }
    } catch (unused) {
        return 0;
    }
    return 0;
};
var getFiscalWeekRange = function(date, weekStart, fiscalYearStartMonth, fiscalYearStartDay) {
    var current = new Date(date);
    current.setHours(0, 0, 0, 0);
    var currentYear = current.getFullYear();
    var fiscalStartThisYear = new Date(currentYear, fiscalYearStartMonth, fiscalYearStartDay);
    var fiscalYearStart = current >= fiscalStartThisYear ? fiscalStartThisYear : new Date(currentYear - 1, fiscalYearStartMonth, fiscalYearStartDay);
    var fiscalStartWeek = getWeekRange(fiscalYearStart, weekStart).start;
    var diffMs = current.getTime() - fiscalStartWeek.getTime();
    var diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
    var weekIndex = Math.floor(diffDays / 7);
    var start = new Date(fiscalStartWeek);
    start.setDate(fiscalStartWeek.getDate() + weekIndex * 7);
    var end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
        start: start,
        end: end
    };
};
var predefinedRangesList = [
    {
        label: "Today",
        range: [
            /* @__PURE__ */ new Date(),
            /* @__PURE__ */ new Date()
        ]
    },
    {
        label: "Yesterday",
        range: [
            new Date(/* @__PURE__ */ new Date().setDate(/* @__PURE__ */ new Date().getDate() - 1)),
            new Date(/* @__PURE__ */ new Date().setDate(/* @__PURE__ */ new Date().getDate() - 1))
        ]
    },
    {
        label: "Last 7 Days",
        range: [
            new Date(/* @__PURE__ */ new Date().setDate(/* @__PURE__ */ new Date().getDate() - 7)),
            /* @__PURE__ */ new Date()
        ]
    },
    {
        label: "Last 30 Days",
        range: [
            new Date(/* @__PURE__ */ new Date().setDate(/* @__PURE__ */ new Date().getDate() - 30)),
            /* @__PURE__ */ new Date()
        ]
    },
    {
        label: "This Month",
        range: [
            new Date(/* @__PURE__ */ new Date().getFullYear(), /* @__PURE__ */ new Date().getMonth(), 1),
            // First day of the current month
            new Date(/* @__PURE__ */ new Date().getFullYear(), /* @__PURE__ */ new Date().getMonth() + 1, 0)
        ]
    },
    {
        label: "Last Month",
        range: [
            new Date(/* @__PURE__ */ new Date().getFullYear(), /* @__PURE__ */ new Date().getMonth() - 1, 1),
            new Date(/* @__PURE__ */ new Date().getFullYear(), /* @__PURE__ */ new Date().getMonth(), 0)
        ]
    },
    {
        label: "This Year",
        range: [
            new Date(/* @__PURE__ */ new Date().getFullYear(), 0, 1),
            // January 1st of the current year
            new Date(/* @__PURE__ */ new Date().getFullYear(), 11, 31)
        ]
    },
    {
        label: "Last Year",
        range: [
            new Date(/* @__PURE__ */ new Date().getFullYear() - 1, 0, 1),
            new Date(/* @__PURE__ */ new Date().getFullYear() - 1, 11, 31)
        ]
    },
    {
        label: "All Time",
        range: [
            new Date(1970, 0, 1),
            /* @__PURE__ */ new Date()
        ]
    }
];
var getDayStyles = function(colorSchema) {
    return function(day, today, isInRange, isSelected, startDate, endDate, isWeekend2) {
        var allowWeekendSelection = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : false, isFiscalStartDate = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : false;
        var styles = {};
        var boxShadows = [];
        var isStart = Boolean(startDate && day.getTime() === startDate.getTime());
        var isEnd = Boolean(endDate && day.getTime() === endDate.getTime());
        if (isWeekend2) {
            styles.color = colorSchema.weekend.color;
            styles.backgroundColor = colorSchema.weekend.backgroundColor;
        }
        if (day && today.toDateString() === day.toDateString()) {
            styles.backgroundColor = colorSchema.todayColor;
            styles.color = "#fff";
            if (colorSchema.usePlaceboShadow && !isInRange) {
                boxShadows.push("0 5px 10px 0 ".concat(colorSchema.todayColor));
            }
        }
        if (isInRange) {
            styles.backgroundColor = colorSchema.highlight;
            var rangeShadow = colorSchema.usePlaceboShadow ? "0 5px 10px 0 ".concat(colorSchema.highlight) : "1px 0 0 0 ".concat(colorSchema.highlight);
            boxShadows.push(rangeShadow);
        }
        if (isStart) {
            styles.backgroundColor = colorSchema.primary;
            styles.color = "#fff";
            if (colorSchema.usePlaceboShadow) {
                boxShadows.push("0 5px 10px 0 ".concat(colorSchema.primary));
            }
        }
        if (isEnd) {
            styles.backgroundColor = colorSchema.secondary;
            styles.color = "#fff";
            boxShadows.length = 0;
            boxShadows.push("0 0 0 0 ".concat(colorSchema.highlight));
            if (colorSchema.usePlaceboShadow) {
                boxShadows.push("0 5px 10px 0 ".concat(colorSchema.secondary));
            }
        }
        if (isSelected && (allowWeekendSelection || !isWeekend2) && !(startDate && day.getTime() === startDate.getTime()) && !(endDate && day.getTime() === endDate.getTime())) {
            var dashColor = "lightgray";
            styles.backgroundImage = [
                "repeating-linear-gradient(90deg, ".concat(dashColor, " 0 6px, transparent 6px 10px)"),
                "repeating-linear-gradient(90deg, ".concat(dashColor, " 0 6px, transparent 6px 10px)")
            ].join(", ");
            styles.backgroundSize = "100% 2px, 100% 2px";
            styles.backgroundPosition = "0 0, 0 100%";
            styles.backgroundRepeat = "repeat-x";
            if (!isInRange) {
                var hoverShadow = colorSchema.usePlaceboShadow ? "0 5px 10px 0px ".concat(colorSchema.highlight) : "1px 0 0 0 ".concat(colorSchema.highlight);
                boxShadows.push(hoverShadow);
            }
        }
        if (isFiscalStartDate) {
            boxShadows.push("inset 0 0 0 2px ".concat(colorSchema.hoverHighlight));
        }
        if (boxShadows.length) {
            styles.boxShadow = boxShadows.join(", ");
        }
        return styles;
    };
};
// src/WeekdayDateRangePicker.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var WeekdayDateRangePicker = function(param) {
    var _param_predefinedRanges = param.predefinedRanges, predefinedRanges = _param_predefinedRanges === void 0 ? [] : _param_predefinedRanges, onChange = param.onChange, title = param.title, selectedTheme = param.selectedTheme, _param_selectionMode = param.selectionMode, selectionMode = _param_selectionMode === void 0 ? "date-range" : _param_selectionMode, _param_weekStart = param.weekStart, weekStart = _param_weekStart === void 0 ? 0 : _param_weekStart, _param_fiscalYearStartMonth = param.fiscalYearStartMonth, fiscalYearStartMonth = _param_fiscalYearStartMonth === void 0 ? 0 : _param_fiscalYearStartMonth, _param_fiscalYearStartDay = param.fiscalYearStartDay, fiscalYearStartDay = _param_fiscalYearStartDay === void 0 ? 1 : _param_fiscalYearStartDay, _param_calendars = param.calendars, calendars = _param_calendars === void 0 ? 2 : _param_calendars, _param_disableWeekends = param.disableWeekends, disableWeekends = _param_disableWeekends === void 0 ? false : _param_disableWeekends, _param_disabledDates = param.disabledDates, disabledDates = _param_disabledDates === void 0 ? [] : _param_disabledDates, minRangeDays = param.minRangeDays, maxRangeDays = param.maxRangeDays, isDateDisabled = param.isDateDisabled, validateRange = param.validateRange, _param_locale = param.locale, locale = _param_locale === void 0 ? "en-GB" : _param_locale, dateFormatOptions = param.dateFormatOptions, _param_useLocaleWeekStart = param.useLocaleWeekStart, useLocaleWeekStart = _param_useLocaleWeekStart === void 0 ? false : _param_useLocaleWeekStart, _param_rtl = param.rtl, rtl = _param_rtl === void 0 ? false : _param_rtl, timeZone = param.timeZone, outputTimeZone = param.outputTimeZone, _param_showTimeZoneLabel = param.showTimeZoneLabel, showTimeZoneLabel = _param_showTimeZoneLabel === void 0 ? false : _param_showTimeZoneLabel;
    var _formatToParts_find;
    var _ref = _sliced_to_array((0, import_react.useState)(null), 2), startDate = _ref[0], setStartDate = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react.useState)(null), 2), endDate = _ref1[0], setEndDate = _ref1[1];
    var _ref2 = _sliced_to_array((0, import_react.useState)(/* @__PURE__ */ new Date()), 2), displayedDate = _ref2[0], setDisplayedDate = _ref2[1];
    var _ref3 = _sliced_to_array((0, import_react.useState)(false), 2), isCalendarVisible = _ref3[0], setIsCalendarVisible = _ref3[1];
    var _ref4 = _sliced_to_array((0, import_react.useState)(false), 2), isFadingOut = _ref4[0], setIsFadingOut = _ref4[1];
    var calendarRef = (0, import_react.useRef)(null);
    var _ref5 = _sliced_to_array((0, import_react.useState)([]), 2), weekdays = _ref5[0], setWeekdays = _ref5[1];
    var _ref6 = _sliced_to_array((0, import_react.useState)([]), 2), weekends = _ref6[0], setWeekends = _ref6[1];
    var _ref7 = _sliced_to_array((0, import_react.useState)([]), 2), calendarMonths = _ref7[0], setCalendarMonths = _ref7[1];
    var _ref8 = _sliced_to_array((0, import_react.useState)([]), 2), calendarYears = _ref8[0], setCalendarYears = _ref8[1];
    var _ref9 = _sliced_to_array((0, import_react.useState)(null), 2), hoveredDate = _ref9[0], setHoveredDate = _ref9[1];
    var _ref10 = _sliced_to_array((0, import_react.useState)([]), 2), selectedHoveringDates = _ref10[0], setSelectedHoveringDates = _ref10[1];
    var _ref11 = _sliced_to_array((0, import_react.useState)(null), 2), focusedDate = _ref11[0], setFocusedDate = _ref11[1];
    var instructionsId = (0, import_react.useId)();
    var maxCalendars = Math.min(Math.max(calendars, 1), 3);
    var resolvedWeekStart = useLocaleWeekStart ? getLocaleWeekStart(locale) : weekStart;
    var resolvedTimeZone = timeZone !== null && timeZone !== void 0 ? timeZone : Intl.DateTimeFormat().resolvedOptions().timeZone;
    var outputResolvedTimeZone = outputTimeZone !== null && outputTimeZone !== void 0 ? outputTimeZone : resolvedTimeZone;
    var displayFormatter = new Intl.DateTimeFormat(locale, _object_spread_props(_object_spread({}, dateFormatOptions !== null && dateFormatOptions !== void 0 ? dateFormatOptions : {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    }), {
        timeZone: resolvedTimeZone
    }));
    var outputFormatter = new Intl.DateTimeFormat(locale, _object_spread_props(_object_spread({}, dateFormatOptions !== null && dateFormatOptions !== void 0 ? dateFormatOptions : {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    }), {
        timeZone: outputResolvedTimeZone
    }));
    var numberFormatter = new Intl.NumberFormat(locale);
    var timeZoneOffset = (_formatToParts_find = new Intl.DateTimeFormat(locale, {
        timeZone: resolvedTimeZone,
        timeZoneName: "shortOffset"
    }).formatToParts(/* @__PURE__ */ new Date()).find(function(part) {
        return part.type === "timeZoneName";
    })) === null || _formatToParts_find === void 0 ? void 0 : _formatToParts_find.value;
    var buildCalendarSeeds = function() {
        return Array.from({
            length: maxCalendars
        }, function(_, index) {
            var date = new Date(displayedDate.getFullYear(), displayedDate.getMonth() + index, 1);
            return {
                month: date.getMonth(),
                year: date.getFullYear()
            };
        });
    };
    (0, import_react.useEffect)(function() {
        if (calendarMonths.length === maxCalendars && calendarYears.length === maxCalendars) {
            return;
        }
        var seeds = buildCalendarSeeds();
        setCalendarMonths(seeds.map(function(seed) {
            return seed.month;
        }));
        setCalendarYears(seeds.map(function(seed) {
            return seed.year;
        }));
    }, [
        maxCalendars,
        displayedDate
    ]);
    var changeCalendarMonth = function(index, month) {
        setCalendarMonths(function(prev) {
            var next = _to_consumable_array(prev);
            next[index] = month;
            return next;
        });
    };
    var changeCalendarYear = function(index, year) {
        setCalendarYears(function(prev) {
            var next = _to_consumable_array(prev);
            next[index] = year;
            return next;
        });
    };
    var handleDateRangeChange = function(startDate2, endDate2) {
        var _calculateWeekdaysAndWeekends = calculateWeekdaysAndWeekends(startDate2, endDate2), weekdays2 = _calculateWeekdaysAndWeekends.weekdays, weekends2 = _calculateWeekdaysAndWeekends.weekends;
        setWeekdays(weekdays2);
        setWeekends(weekends2);
        onChange([
            weekdays2.map(function(day) {
                return outputFormatter.format(day);
            }),
            weekends2.map(function(day) {
                return outputFormatter.format(day);
            })
        ]);
    };
    var handleClickOutside = function(event) {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
            setIsFadingOut(true);
            setTimeout(function() {
                setIsCalendarVisible(false);
                setIsFadingOut(false);
                setSelectedHoveringDates([]);
                resetDates();
            }, 300);
        }
    };
    var normalizeDateKey = function(date) {
        return date.toDateString();
    };
    var getDateKey = function(date) {
        var year = date.getFullYear();
        var month = "".concat(date.getMonth() + 1).padStart(2, "0");
        var day = "".concat(date.getDate()).padStart(2, "0");
        return "".concat(year, "-").concat(month, "-").concat(day);
    };
    var disabledDateKeys = new Set(disabledDates.map(normalizeDateKey));
    var isDayDisabled = function(date) {
        if (disableWeekends && isWeekend(date)) {
            return true;
        }
        if (disabledDateKeys.has(normalizeDateKey(date))) {
            return true;
        }
        if (isDateDisabled === null || isDateDisabled === void 0 ? void 0 : isDateDisabled(date)) {
            return true;
        }
        return false;
    };
    var rangeHasDisabledDates = function(start, end) {
        var cursor = new Date(start);
        while(cursor <= end){
            if (isDayDisabled(cursor)) {
                return true;
            }
            cursor.setDate(cursor.getDate() + 1);
        }
        return false;
    };
    var isRangeValid = function(start, end) {
        var diffMs = Math.abs(end.getTime() - start.getTime());
        var rangeDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24)) + 1;
        if (minRangeDays && rangeDays < minRangeDays) {
            return false;
        }
        if (maxRangeDays && rangeDays > maxRangeDays) {
            return false;
        }
        if (rangeHasDisabledDates(start, end)) {
            return false;
        }
        if (validateRange && !validateRange(start, end)) {
            return false;
        }
        return true;
    };
    var handleDateClick = function(selectedDate) {
        if (isDayDisabled(selectedDate)) {
            return;
        }
        if (selectionMode === "iso-week") {
            var _getIsoWeekRange = getIsoWeekRange(selectedDate), start = _getIsoWeekRange.start, end = _getIsoWeekRange.end;
            if (!isRangeValid(start, end)) {
                return;
            }
            setStartDate(start);
            setEndDate(end);
            return;
        }
        if (selectionMode === "week") {
            var _getWeekRange = getWeekRange(selectedDate, resolvedWeekStart), start1 = _getWeekRange.start, end1 = _getWeekRange.end;
            if (!isRangeValid(start1, end1)) {
                return;
            }
            setStartDate(start1);
            setEndDate(end1);
            return;
        }
        if (selectionMode === "fiscal-week") {
            var _getFiscalWeekRange = getFiscalWeekRange(selectedDate, resolvedWeekStart, fiscalYearStartMonth, fiscalYearStartDay), start2 = _getFiscalWeekRange.start, end2 = _getFiscalWeekRange.end;
            if (!isRangeValid(start2, end2)) {
                return;
            }
            setStartDate(start2);
            setEndDate(end2);
            return;
        }
        if (!startDate || endDate) {
            setStartDate(selectedDate);
            setEndDate(null);
        } else {
            if (selectedDate < startDate) {
                if (isRangeValid(selectedDate, startDate)) {
                    setEndDate(startDate);
                    setStartDate(selectedDate);
                }
            } else {
                if (isRangeValid(startDate, selectedDate)) {
                    setEndDate(selectedDate);
                }
            }
        }
    };
    var handleTextFieldClick = function() {
        if (!isCalendarVisible) {
            setIsCalendarVisible(true);
        }
    };
    var handlePickClick = function() {
        if (startDate && endDate) {
            handleDateRangeChange(startDate, endDate);
        }
        setIsCalendarVisible(false);
    };
    (0, import_react.useEffect)(function() {
        console.log("selected theme is .", selectedTheme);
        if (isCalendarVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return function() {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [
        isCalendarVisible
    ]);
    (0, import_react.useEffect)(function() {
        var _calendarRef_current;
        if (!isCalendarVisible) {
            return;
        }
        if (!focusedDate) {
            setFocusedDate(startDate !== null && startDate !== void 0 ? startDate : /* @__PURE__ */ new Date());
            return;
        }
        var key = getDateKey(focusedDate);
        var element = (_calendarRef_current = calendarRef.current) === null || _calendarRef_current === void 0 ? void 0 : _calendarRef_current.querySelector('[data-date="'.concat(key, '"]'));
        element === null || element === void 0 ? void 0 : element.focus();
    }, [
        isCalendarVisible,
        focusedDate,
        startDate
    ]);
    var renderCalendar = function() {
        var _Math, _Math1;
        var monthConfigs = Array.from({
            length: maxCalendars
        }, function(_, index) {
            var _calendarMonths_index, _calendarYears_index;
            var month = (_calendarMonths_index = calendarMonths[index]) !== null && _calendarMonths_index !== void 0 ? _calendarMonths_index : displayedDate.getMonth() + index;
            var year = (_calendarYears_index = calendarYears[index]) !== null && _calendarYears_index !== void 0 ? _calendarYears_index : displayedDate.getFullYear();
            var date = new Date(year, month, 1);
            return {
                month: date.getMonth(),
                year: date.getFullYear(),
                start: new Date(date.getFullYear(), date.getMonth(), 1),
                end: new Date(date.getFullYear(), date.getMonth() + 1, 0)
            };
        });
        var baseDayLabels = Array.from({
            length: 7
        }, function(_, i) {
            var base = new Date(Date.UTC(2021, 7, 1 + i, 12));
            return new Intl.DateTimeFormat(locale, {
                weekday: "short",
                timeZone: resolvedTimeZone
            }).format(base);
        });
        var dayLabels = resolvedWeekStart === 1 ? _to_consumable_array(baseDayLabels.slice(1)).concat([
            baseDayLabels[0]
        ]) : baseDayLabels;
        var today = /* @__PURE__ */ new Date();
        var updateHoveringDates = function(day) {
            if (day && isDayDisabled(day)) {
                return;
            }
            if (selectionMode === "iso-week" && day) {
                var _getIsoWeekRange = getIsoWeekRange(day), start = _getIsoWeekRange.start, end = _getIsoWeekRange.end;
                if (!isRangeValid(start, end)) {
                    return;
                }
                var cursor = new Date(start);
                var newSelectedDates = [];
                while(cursor <= end){
                    newSelectedDates.push(new Date(cursor));
                    cursor.setDate(cursor.getDate() + 1);
                }
                setSelectedHoveringDates(newSelectedDates);
                return;
            }
            if (selectionMode === "week" && day) {
                var _getWeekRange = getWeekRange(day, resolvedWeekStart), start1 = _getWeekRange.start, end1 = _getWeekRange.end;
                if (!isRangeValid(start1, end1)) {
                    return;
                }
                var cursor1 = new Date(start1);
                var newSelectedDates1 = [];
                while(cursor1 <= end1){
                    newSelectedDates1.push(new Date(cursor1));
                    cursor1.setDate(cursor1.getDate() + 1);
                }
                setSelectedHoveringDates(newSelectedDates1);
                return;
            }
            if (selectionMode === "fiscal-week" && day) {
                var _getFiscalWeekRange = getFiscalWeekRange(day, resolvedWeekStart, fiscalYearStartMonth, fiscalYearStartDay), start2 = _getFiscalWeekRange.start, end2 = _getFiscalWeekRange.end;
                if (!isRangeValid(start2, end2)) {
                    return;
                }
                var cursor2 = new Date(start2);
                var newSelectedDates2 = [];
                while(cursor2 <= end2){
                    newSelectedDates2.push(new Date(cursor2));
                    cursor2.setDate(cursor2.getDate() + 1);
                }
                setSelectedHoveringDates(newSelectedDates2);
                return;
            }
            if (startDate && day) {
                var newSelectedDates3 = [];
                var fiveYearsInMs = 5 * 365 * 24 * 60 * 60 * 1e3;
                var startDateMs = startDate.getTime();
                var dayMs = day.getTime();
                if (dayMs < startDateMs - fiveYearsInMs || dayMs > startDateMs + fiveYearsInMs) {
                    return;
                }
                var currentDate = new Date(startDate);
                if (day >= startDate) {
                    while(currentDate <= day){
                        if (!isDayDisabled(currentDate)) {
                            newSelectedDates3.push(new Date(currentDate));
                        }
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                } else {
                    while(currentDate >= day){
                        if (!isDayDisabled(currentDate)) {
                            newSelectedDates3.push(new Date(currentDate));
                        }
                        currentDate.setDate(currentDate.getDate() - 1);
                    }
                }
                setSelectedHoveringDates(newSelectedDates3);
            }
        };
        var getNextFocusableDate = function(base, deltaDays) {
            var candidate = new Date(base);
            candidate.setDate(candidate.getDate() + deltaDays);
            var attempts = 0;
            while(attempts < 370 && isDayDisabled(candidate)){
                candidate.setDate(candidate.getDate() + Math.sign(deltaDays || 1));
                attempts += 1;
            }
            return candidate;
        };
        var handleGridKeyDown = function(event) {
            if (!focusedDate) {
                return;
            }
            switch(event.key){
                case "ArrowLeft":
                    event.preventDefault();
                    setFocusedDate(getNextFocusableDate(focusedDate, -1));
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    setFocusedDate(getNextFocusableDate(focusedDate, 1));
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    setFocusedDate(getNextFocusableDate(focusedDate, -7));
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    setFocusedDate(getNextFocusableDate(focusedDate, 7));
                    break;
                case "Home":
                    event.preventDefault();
                    setFocusedDate(getNextFocusableDate(focusedDate, -((focusedDate.getDay() - resolvedWeekStart + 7) % 7)));
                    break;
                case "End":
                    event.preventDefault();
                    setFocusedDate(getNextFocusableDate(focusedDate, 6 - (focusedDate.getDay() - resolvedWeekStart + 7) % 7));
                    break;
                case "Enter":
                case " ":
                    event.preventDefault();
                    handleDateClick(focusedDate);
                    break;
                case "Escape":
                    event.preventDefault();
                    setIsCalendarVisible(false);
                    break;
                default:
                    break;
            }
        };
        var selectedHoveringMin = selectedHoveringDates.length ? new Date((_Math = Math).min.apply(_Math, _to_consumable_array(selectedHoveringDates.map(function(day) {
            return day.getTime();
        })))) : null;
        var selectedHoveringMax = selectedHoveringDates.length ? new Date((_Math1 = Math).max.apply(_Math1, _to_consumable_array(selectedHoveringDates.map(function(day) {
            return day.getTime();
        })))) : null;
        var getRangeClassName = function(day, isInRange, isSelected) {
            if (!day) {
                return "day";
            }
            var hasStart = Boolean(startDate);
            var hasConfirmedRange = Boolean(startDate && endDate);
            var isRangeStart = hasConfirmedRange ? startDate && day.toDateString() === startDate.toDateString() : hasStart && startDate && day.toDateString() === startDate.toDateString();
            var isRangeEnd = hasConfirmedRange ? endDate && day.toDateString() === endDate.toDateString() : false;
            var isSingleRange = isRangeStart && isRangeEnd;
            var isHoverRangeStart = selectedHoveringMin && day.toDateString() === selectedHoveringMin.toDateString();
            var isHoverRangeEnd = selectedHoveringMax && day.toDateString() === selectedHoveringMax.toDateString();
            var classes = [
                "day"
            ];
            if (isDayDisabled(day)) {
                classes.push("disabled");
            }
            if (isInRange || isSelected) {
                classes.push(isSelected ? "hover-range" : "in-range");
            }
            if (isSingleRange) {
                classes.push("range-single");
            } else {
                if (isRangeStart) {
                    classes.push(rtl ? "range-end" : "range-start");
                }
                if (isRangeEnd) {
                    classes.push(rtl ? "range-start" : "range-end");
                }
            }
            if (isSelected && isHoverRangeStart) {
                classes.push(rtl ? "hover-range-end" : "hover-range-start");
            }
            if (isSelected && isHoverRangeEnd) {
                classes.push(rtl ? "hover-range-start" : "hover-range-end");
            }
            if (isSelected && isHoverRangeStart && isHoverRangeEnd) {
                classes.push("hover-range-single");
            }
            return classes.join(" ");
        };
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "calendar-header",
                    children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                            className: "calendar-grid",
                            children: monthConfigs.map(function(config, calendarIndex) {
                                var days = generateDays(config.start, config.end, resolvedWeekStart);
                                return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                    className: "month-main-wrapper",
                                    id: "calendar-".concat(calendarIndex),
                                    children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                            className: "month-label",
                                            children: [
                                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
                                                    value: config.month,
                                                    onChange: function(e) {
                                                        return changeCalendarMonth(calendarIndex, Number(e.target.value));
                                                    },
                                                    children: monthOptions
                                                }),
                                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
                                                    value: config.year,
                                                    onChange: function(e) {
                                                        return changeCalendarYear(calendarIndex, Number(e.target.value));
                                                    },
                                                    children: generateYearOptions(config.year - 10, 21).map(function(year) {
                                                        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
                                                            value: year,
                                                            children: numberFormatter.format(year)
                                                        }, year);
                                                    })
                                                })
                                            ]
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                            className: "calendar",
                                            role: "grid",
                                            "aria-label": "".concat(new Intl.DateTimeFormat(locale, {
                                                month: "long",
                                                year: "numeric",
                                                timeZone: resolvedTimeZone
                                            }).format(new Date(Date.UTC(config.year, config.month, 1, 12)))),
                                            "aria-describedby": instructionsId,
                                            onMouseLeave: function() {
                                                return setSelectedHoveringDates([]);
                                            },
                                            onKeyDown: handleGridKeyDown,
                                            children: [
                                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                                    className: "day-labels",
                                                    children: dayLabels.map(function(label) {
                                                        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                                            className: "day-label",
                                                            role: "columnheader",
                                                            children: label
                                                        }, label);
                                                    })
                                                }),
                                                days.map(function(day, index) {
                                                    if (!day) {
                                                        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                                            className: "day empty",
                                                            "aria-hidden": "true"
                                                        }, index);
                                                    }
                                                    var isInRange = startDate && endDate && day && day >= startDate && day <= endDate;
                                                    var isSelected = selectedHoveringDates.some(function(selectedDay) {
                                                        return selectedDay.toDateString() === (day === null || day === void 0 ? void 0 : day.toDateString());
                                                    });
                                                    var isFiscalStartDate = selectionMode === "fiscal-week" && day ? day.getMonth() === fiscalYearStartMonth && day.getDate() === fiscalYearStartDay : false;
                                                    var isFocused = (focusedDate === null || focusedDate === void 0 ? void 0 : focusedDate.toDateString()) === day.toDateString();
                                                    var isDisabled = isDayDisabled(day);
                                                    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                                        className: getRangeClassName(day, Boolean(isInRange), isSelected),
                                                        role: "gridcell",
                                                        "aria-selected": Boolean(isInRange),
                                                        "aria-disabled": isDisabled,
                                                        tabIndex: isFocused ? 0 : -1,
                                                        "data-date": getDateKey(day),
                                                        onClick: function() {
                                                            return handleDateClick(day);
                                                        },
                                                        onMouseEnter: function() {
                                                            return updateHoveringDates(day);
                                                        },
                                                        onFocus: function() {
                                                            return setFocusedDate(day);
                                                        },
                                                        style: day ? getDayStyles(selectedTheme)(day, today, isInRange, isSelected, startDate, endDate, isWeekend(day), true, isFiscalStartDate) : {},
                                                        children: numberFormatter.format(day.getDate())
                                                    }, index);
                                                })
                                            ]
                                        })
                                    ]
                                }, "".concat(config.year, "-").concat(config.month));
                            })
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                            className: "predefined-ranges",
                            children: predefinedRangesList.map(function(param, index) {
                                var label = param.label, range = param.range;
                                return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                                    onClick: function() {
                                        return handlePredefinedRange(range);
                                    },
                                    children: label
                                }, index);
                            })
                        })
                    ]
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "calendar-footer",
                    children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                            className: "pick-button",
                            onClick: handlePickClick,
                            children: "Pick"
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                            className: "reset-button",
                            onClick: resetDates,
                            children: "Reset Dates"
                        })
                    ]
                })
            ]
        });
    };
    var handlePredefinedRange = function(range) {
        var _range = _sliced_to_array(range, 2), start = _range[0], end = _range[1];
        setStartDate(start);
        setEndDate(end);
        setDisplayedDate(new Date(start.getFullYear(), start.getMonth(), 1));
        handleDateRangeChange(start, end);
    };
    var monthOptions = Array.from({
        length: 12
    }, function(_, i) {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
            value: i,
            children: new Intl.DateTimeFormat(locale, {
                month: "long",
                timeZone: resolvedTimeZone
            }).format(new Date(Date.UTC(2021, i, 1, 12)))
        }, i);
    });
    var resetDates = function() {
        setStartDate(null);
        setEndDate(null);
        setSelectedHoveringDates([]);
        setDisplayedDate(/* @__PURE__ */ new Date());
        var seeds = buildCalendarSeeds();
        setCalendarMonths(seeds.map(function(seed) {
            return seed.month;
        }));
        setCalendarYears(seeds.map(function(seed) {
            return seed.year;
        }));
    };
    (0, import_react.useEffect)(function() {
        if (isCalendarVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return function() {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [
        isCalendarVisible
    ]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "weekday-date-range-picker date-picker-container".concat(selectedTheme.usePlaceboShadow ? " placebo-theme" : "").concat(rtl ? " rtl" : ""),
        dir: rtl ? "rtl" : "ltr",
        children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "input-wrapper",
                children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        id: instructionsId,
                        className: "sr-only",
                        children: "Use arrow keys to move between dates. Press Enter or Space to select. Press Escape to close."
                    }),
                    showTimeZoneLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "time-zone-label",
                        children: [
                            "Time zone: ",
                            resolvedTimeZone,
                            timeZoneOffset ? " (".concat(timeZoneOffset, ")") : ""
                        ]
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                        className: "card-info",
                        children: "Please select your date range and hit pick to make a selection."
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "input-wrapper-main",
                        children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                className: "input-group",
                                children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
                                        children: "Start Date"
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
                                        type: "text",
                                        readOnly: true,
                                        value: startDate ? displayFormatter.format(startDate) : "",
                                        placeholder: "DD/MM/YY",
                                        onClick: handleTextFieldClick,
                                        className: "date-range-input"
                                    })
                                ]
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                className: "input-group",
                                children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
                                        children: "End Date"
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
                                        type: "text",
                                        readOnly: true,
                                        value: endDate ? displayFormatter.format(endDate) : "",
                                        placeholder: "DD/MM/YY",
                                        onClick: handleTextFieldClick,
                                        className: "date-range-input"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            isCalendarVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                ref: calendarRef,
                className: "calendar-wrapper ".concat(isFadingOut ? "fade-out" : ""),
                children: [
                    renderCalendar(),
                    " "
                ]
            })
        ]
    });
};
var WeekdayDateRangePicker_default = WeekdayDateRangePicker;
// src/themePicker.tsx
var import_react2 = require("react");
// src/theme/colorSchemas.ts
var colorSchemas = {
    Material: {
        primary: "#007bff",
        secondary: "#007bff",
        // Same as primary
        highlight: "rgba(0, 123, 255, 0.25)",
        // 25% opacity of primary
        hoverHighlight: "#ffc107",
        weekend: {
            color: "#999",
            backgroundColor: "#f7f7f7"
        },
        todayColor: "#19e491",
        dayBorderStyle: "2px solid #007bff"
    },
    Pastel: {
        primary: "#D6DDB9",
        secondary: "#D6DDB9",
        // Same as primary
        highlight: "rgba(214, 221, 185, 0.25)",
        // 25% opacity of primary
        hoverHighlight: "#E1DAD3",
        weekend: {
            color: "#999",
            backgroundColor: "#f7f7f7"
        },
        todayColor: "#E4C9B6"
    },
    Ocean: {
        primary: "#0077be",
        secondary: "#0077be",
        // Same as primary
        highlight: "rgba(0, 119, 190, 0.25)",
        // 25% opacity of primary
        hoverHighlight: "#e0f7fa",
        weekend: {
            color: "#999",
            backgroundColor: "#e1f5fe"
        },
        todayColor: "#4dd0e1"
    },
    Sunset: {
        primary: "#ff5733",
        secondary: "#ff5733",
        // Same as primary
        highlight: "rgba(255, 87, 51, 0.25)",
        // 25% opacity of primary
        hoverHighlight: "#ff6f61",
        weekend: {
            color: "#999",
            backgroundColor: "#f5e3e0"
        },
        todayColor: "#ffb6b9"
    },
    Forest: {
        primary: "#2e7d32",
        secondary: "#2e7d32",
        // Same as primary
        highlight: "rgba(46, 125, 50, 0.25)",
        // 25% opacity of primary
        hoverHighlight: "#a5d6a7",
        weekend: {
            color: "#999",
            backgroundColor: "#e8f5e9"
        },
        todayColor: "#4caf50"
    },
    Neon: {
        primary: "#ff3d00",
        secondary: "#ff3d00",
        // Same as primary
        highlight: "rgba(255, 61, 0, 0.25)",
        // 25% opacity of primary
        hoverHighlight: "#00b0ff",
        weekend: {
            color: "#999",
            backgroundColor: "#fafafa"
        },
        todayColor: "#ffea00"
    },
    DarkModeSchema: {
        primary: "#121212",
        secondary: "#121212",
        // Same as primary
        highlight: "rgba(18, 18, 18, 0.25)",
        // 25% opacity of primary
        hoverHighlight: "#3700b3",
        weekend: {
            color: "#999",
            backgroundColor: "#fafafa"
        },
        todayColor: "#03dac6"
    },
    PastelRainbowSchema: {
        primary: "#ff9a9e",
        secondary: "#ff9a9e",
        // Same as primary
        highlight: "rgba(255, 154, 158, 0.25)",
        // 25% opacity of primary
        hoverHighlight: "#a0e7e8",
        weekend: {
            color: "#999",
            backgroundColor: "#f7f7f7"
        },
        todayColor: "#b9fbc0"
    },
    RetroSchema: {
        primary: "#ff4757",
        secondary: "#ff4757",
        // Same as primary
        highlight: "rgba(255, 71, 87, 0.25)",
        // 25% opacity of primary
        hoverHighlight: "#3742fa",
        weekend: {
            color: "#999",
            backgroundColor: "#f7f7f7"
        },
        todayColor: "#2ed573"
    },
    EarthyTonesSchema: {
        primary: "#7d5a2e",
        secondary: "#7d5a2e",
        // Same as primary
        highlight: "rgba(125, 90, 46, 0.25)",
        // 25% opacity of primary
        hoverHighlight: "#ebcba4",
        weekend: {
            color: "#999",
            backgroundColor: "#f7f7f7"
        },
        todayColor: "#f1e6b9"
    },
    Placebo: {
        primary: "#6c5ce7",
        secondary: "#6c5ce7",
        // Same as primary
        highlight: "rgba(108, 92, 231, 0.25)",
        // 25% opacity of primary
        hoverHighlight: "#a29bfe",
        weekend: {
            color: "#999",
            backgroundColor: "#f7f7f7"
        },
        todayColor: "#00b894",
        usePlaceboShadow: true
    }
};
// src/themePicker.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var ThemePicker = function(param) {
    var onChange = param.onChange;
    var _ref = _sliced_to_array((0, import_react2.useState)("Material"), 2), selectedTheme = _ref[0], setSelectedTheme = _ref[1];
    var handleThemeChange = function(event) {
        var theme = event.target.value;
        setSelectedTheme(theme);
        onChange(colorSchemas[theme]);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", {
        children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", {
                htmlFor: "theme-picker",
                children: "Select Theme:"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("br", {}),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("select", {
                id: "theme-picker",
                value: selectedTheme,
                onChange: handleThemeChange,
                children: Object.keys(colorSchemas).map(function(theme) {
                    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", {
                        value: theme,
                        children: theme
                    }, theme);
                })
            })
        ]
    });
};
var themePicker_default = ThemePicker;
// src/themContext.tsx
var import_react3 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var ThemeContext = (0, import_react3.createContext)(void 0);
var ThemeProvider = function(param) {
    var children = param.children;
    var _ref = _sliced_to_array((0, import_react3.useState)(colorSchemas.Material), 2), theme = _ref[0], setTheme = _ref[1];
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ThemeContext.Provider, {
        value: {
            theme: theme,
            setTheme: setTheme
        },
        children: children
    });
};
var useTheme = function() {
    var context = (0, import_react3.useContext)(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    ThemePicker: ThemePicker,
    ThemeProvider: ThemeProvider,
    WeekdayDateRangePicker: WeekdayDateRangePicker,
    colorSchemas: colorSchemas,
    useTheme: useTheme
});
//# sourceMappingURL=lib.js.map