"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
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
// src/index.ts
var index_exports = {};
__export(index_exports, {
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
module.exports = __toCommonJS(index_exports);
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
    var days = [];
    var firstDay = startOfMonth.getDay();
    var totalDays = endOfMonth.getDate();
    for(var i = 0; i < firstDay; i++){
        days.push(null);
    }
    for(var day = 1; day <= totalDays; day++){
        days.push(new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), day));
    }
    return days;
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
        var styles = {};
        if (isWeekend2) {
            styles.color = colorSchema.weekend.color;
            styles.backgroundColor = colorSchema.weekend.backgroundColor;
        }
        if (day && today.toDateString() === day.toDateString()) {
            styles.backgroundColor = colorSchema.todayColor;
            styles.color = "#fff";
        }
        if (isInRange) {
            styles.backgroundColor = colorSchema.highlight;
        }
        if (startDate && day.getTime() === startDate.getTime()) {
            styles.backgroundColor = colorSchema.primary;
            styles.color = "#fff";
        }
        if (endDate && day.getTime() === endDate.getTime()) {
            styles.backgroundColor = colorSchema.secondary;
            styles.color = "#fff";
        }
        if (isSelected && !isWeekend2 && // Prevent selected styling on weekend days
        !(startDate && day.getTime() === startDate.getTime()) && !(endDate && day.getTime() === endDate.getTime())) {
            styles.backgroundColor = colorSchema.highlight;
        }
        return styles;
    };
};
// src/WeekdayDateRangePicker.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var WeekdayDateRangePicker = function(param) {
    var _param_predefinedRanges = param.predefinedRanges, predefinedRanges = _param_predefinedRanges === void 0 ? [] : _param_predefinedRanges, onChange = param.onChange, title = param.title, selectedTheme = param.selectedTheme;
    var _ref = _sliced_to_array((0, import_react.useState)(null), 2), startDate = _ref[0], setStartDate = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react.useState)(null), 2), endDate = _ref1[0], setEndDate = _ref1[1];
    var _ref2 = _sliced_to_array((0, import_react.useState)(/* @__PURE__ */ new Date()), 2), displayedDate = _ref2[0], setDisplayedDate = _ref2[1];
    var _ref3 = _sliced_to_array((0, import_react.useState)(false), 2), isCalendarVisible = _ref3[0], setIsCalendarVisible = _ref3[1];
    var _ref4 = _sliced_to_array((0, import_react.useState)(false), 2), isFadingOut = _ref4[0], setIsFadingOut = _ref4[1];
    var calendarRef = (0, import_react.useRef)(null);
    var _ref5 = _sliced_to_array((0, import_react.useState)([]), 2), weekdays = _ref5[0], setWeekdays = _ref5[1];
    var _ref6 = _sliced_to_array((0, import_react.useState)([]), 2), weekends = _ref6[0], setWeekends = _ref6[1];
    var _ref7 = _sliced_to_array((0, import_react.useState)(displayedDate.getMonth()), 2), currentMonth = _ref7[0], setCurrentMonth = _ref7[1];
    var _ref8 = _sliced_to_array((0, import_react.useState)(displayedDate.getFullYear()), 2), currentYear = _ref8[0], setCurrentYear = _ref8[1];
    var _ref9 = _sliced_to_array((0, import_react.useState)(displayedDate.getMonth() + 1), 2), nextMonth = _ref9[0], setNextMonth = _ref9[1];
    var _ref10 = _sliced_to_array((0, import_react.useState)(displayedDate.getFullYear()), 2), nextYear = _ref10[0], setNextYear = _ref10[1];
    var _ref11 = _sliced_to_array((0, import_react.useState)(null), 2), hoveredDate = _ref11[0], setHoveredDate = _ref11[1];
    var _ref12 = _sliced_to_array((0, import_react.useState)([]), 2), selectedHoveringDates = _ref12[0], setSelectedHoveringDates = _ref12[1];
    var _ref13 = _sliced_to_array((0, import_react.useState)(new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 1)), 2), startOfCurrentMonth = _ref13[0], setStartOfCurrentMonth = _ref13[1];
    var _ref14 = _sliced_to_array((0, import_react.useState)(new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 0)), 2), endOfCurrentMonth = _ref14[0], setEndOfCurrentMonth = _ref14[1];
    var _ref15 = _sliced_to_array((0, import_react.useState)(new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 1)), 2), startOfNextMonth = _ref15[0], setStartOfNextMonth = _ref15[1];
    var _ref16 = _sliced_to_array((0, import_react.useState)(new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 2, 0)), 2), endOfNextMonth = _ref16[0], setEndOfNextMonth = _ref16[1];
    var changeCurrentMonth = function(month) {
        setCurrentMonth(month);
    };
    var tenYearsBack = currentYear - 10;
    var currentMonthYearOptions = generateYearOptions(tenYearsBack, 11);
    var nextMonthYearOptions = generateYearOptions(currentYear, 21);
    var changeCurrentYear = function(year) {
        setCurrentYear(year);
    };
    var changeNextMonth = function(month) {
        setNextMonth(month);
    };
    var changeNextYear = function(year) {
        setNextYear(year);
    };
    var handleDateRangeChange = function(startDate2, endDate2) {
        var _calculateWeekdaysAndWeekends = calculateWeekdaysAndWeekends(startDate2, endDate2), weekdays2 = _calculateWeekdaysAndWeekends.weekdays, weekends2 = _calculateWeekdaysAndWeekends.weekends;
        setWeekdays(weekdays2);
        setWeekends(weekends2);
        onChange([
            weekdays2.map(function(day) {
                return day.toLocaleDateString("en-GB");
            }),
            weekends2.map(function(day) {
                return day.toLocaleDateString("en-GB");
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
    var handleDateClick = function(selectedDate) {
        if (!startDate || endDate) {
            setStartDate(selectedDate);
            setEndDate(null);
        } else {
            if (selectedDate < startDate) {
                setEndDate(startDate);
                setStartDate(selectedDate);
            } else {
                setEndDate(selectedDate);
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
        var updateMonthBoundaries = function() {
            setStartOfCurrentMonth(new Date(currentYear, currentMonth, 1));
            setEndOfCurrentMonth(new Date(currentYear, currentMonth + 1, 0));
            setStartOfNextMonth(new Date(nextYear, nextMonth, 1));
            setEndOfNextMonth(new Date(nextYear, nextMonth + 1, 0));
        };
        updateMonthBoundaries();
    }, [
        currentMonth,
        currentYear,
        nextMonth,
        nextYear,
        displayedDate
    ]);
    var renderCalendar = function() {
        var currentMonthDays = generateDays(startOfCurrentMonth, endOfCurrentMonth);
        var nextMonthDays = generateDays(startOfNextMonth, endOfNextMonth);
        var dayLabels = [
            "Su",
            "Mo",
            "Tu",
            "We",
            "Th",
            "Fr",
            "Sa"
        ];
        var today = /* @__PURE__ */ new Date();
        var updateHoveringDates = function(day) {
            if (startDate && day) {
                var newSelectedDates = [];
                var fiveYearsInMs = 5 * 365 * 24 * 60 * 60 * 1e3;
                var startDateMs = startDate.getTime();
                var dayMs = day.getTime();
                if (dayMs < startDateMs - fiveYearsInMs || dayMs > startDateMs + fiveYearsInMs) {
                    return;
                }
                var currentDate = new Date(startDate);
                if (day >= startDate) {
                    while(currentDate <= day){
                        newSelectedDates.push(new Date(currentDate));
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                } else {
                    while(currentDate >= day){
                        newSelectedDates.push(new Date(currentDate));
                        currentDate.setDate(currentDate.getDate() - 1);
                    }
                }
                setSelectedHoveringDates(newSelectedDates);
            }
        };
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "calendar-header",
                    children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            className: "calendar-grid",
                            children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                    className: "month-main-wrapper",
                                    id: "currentMonthCalendar",
                                    children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                            className: "month-label",
                                            children: [
                                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
                                                    value: currentMonth,
                                                    onChange: function(e) {
                                                        return changeCurrentMonth(Number(e.target.value));
                                                    },
                                                    children: monthOptions
                                                }),
                                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
                                                    value: currentYear,
                                                    onChange: function(e) {
                                                        return changeCurrentYear(Number(e.target.value));
                                                    },
                                                    children: currentMonthYearOptions.map(function(year) {
                                                        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
                                                            value: year,
                                                            children: year
                                                        }, year);
                                                    })
                                                })
                                            ]
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                            className: "calendar",
                                            children: [
                                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                                    className: "day-labels",
                                                    children: dayLabels.map(function(label) {
                                                        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                                            className: "day-label",
                                                            children: label
                                                        }, label);
                                                    })
                                                }),
                                                currentMonthDays.map(function(day, index) {
                                                    var isInRange = startDate && endDate && day && day >= startDate && day <= endDate && !isWeekend(day);
                                                    var isSelected = selectedHoveringDates.some(function(selectedDay) {
                                                        return selectedDay.toDateString() === (day === null || day === void 0 ? void 0 : day.toDateString());
                                                    });
                                                    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                                        className: "day",
                                                        onClick: function() {
                                                            return handleDateClick(day);
                                                        },
                                                        onMouseEnter: function() {
                                                            return updateHoveringDates(day);
                                                        },
                                                        onMouseLeave: function() {
                                                            return setSelectedHoveringDates([]);
                                                        },
                                                        style: day ? getDayStyles(selectedTheme)(day, today, isInRange, isSelected, startDate, endDate, isWeekend(day)) : {},
                                                        children: day ? day.getDate() : ""
                                                    }, index);
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                    className: "month-main-wrapper",
                                    id: "nextMonthCalendar",
                                    children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                            className: "month-label",
                                            children: [
                                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
                                                    value: nextMonth,
                                                    onChange: function(e) {
                                                        return changeNextMonth(Number(e.target.value));
                                                    },
                                                    children: monthOptions
                                                }),
                                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
                                                    value: nextYear,
                                                    onChange: function(e) {
                                                        return changeNextYear(Number(e.target.value));
                                                    },
                                                    children: nextMonthYearOptions.map(function(year) {
                                                        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
                                                            value: year,
                                                            children: year
                                                        }, year);
                                                    })
                                                })
                                            ]
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                            className: "calendar",
                                            children: [
                                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                                    className: "day-labels",
                                                    children: dayLabels.map(function(label) {
                                                        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                                            className: "day-label",
                                                            children: label
                                                        }, label);
                                                    })
                                                }),
                                                nextMonthDays.map(function(day, index) {
                                                    var isInRange = startDate && endDate && day && day >= startDate && day <= endDate && !isWeekend(day);
                                                    var isSelected = selectedHoveringDates.some(function(selectedDay) {
                                                        return selectedDay.toDateString() === (day === null || day === void 0 ? void 0 : day.toDateString());
                                                    });
                                                    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                                        className: "day",
                                                        onClick: function() {
                                                            return day && handleDateClick(day);
                                                        },
                                                        onMouseEnter: function() {
                                                            return updateHoveringDates(day);
                                                        },
                                                        onMouseLeave: function() {
                                                            return setSelectedHoveringDates([]);
                                                        },
                                                        style: day ? getDayStyles(selectedTheme)(day, today, isInRange, isSelected, startDate, endDate, isWeekend(day)) : {},
                                                        children: day ? day.getDate() : ""
                                                    }, index);
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
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
            children: new Date(0, i).toLocaleString("default", {
                month: "long"
            })
        }, i);
    });
    var resetDates = function() {
        setStartDate(null);
        setEndDate(null);
        setSelectedHoveringDates([]);
        setCurrentMonth(displayedDate.getMonth());
        setCurrentYear(displayedDate.getFullYear());
        setNextMonth(displayedDate.getMonth() + 1);
        setNextYear(displayedDate.getFullYear());
        setDisplayedDate(/* @__PURE__ */ new Date());
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
    (0, import_react.useEffect)(function() {
        var updateMonthBoundaries = function() {
            setStartOfCurrentMonth(new Date(currentYear, currentMonth, 1));
            setEndOfCurrentMonth(new Date(currentYear, currentMonth + 1, 0));
            setStartOfNextMonth(new Date(nextYear, nextMonth, 1));
            setEndOfNextMonth(new Date(nextYear, nextMonth + 1, 0));
        };
        updateMonthBoundaries();
    }, [
        currentMonth,
        currentYear,
        nextMonth,
        nextYear,
        displayedDate
    ]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "weekday-date-range-picker date-picker-container",
        children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "input-wrapper",
                children: [
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
                                        value: startDate ? startDate.toLocaleDateString("en-GB") : "",
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
                                        value: endDate ? endDate.toLocaleDateString("en-GB") : "",
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
//# sourceMappingURL=index.js.map