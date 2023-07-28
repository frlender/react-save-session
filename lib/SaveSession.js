"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBStore = exports.ListSessions = exports.SaveSession = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var DBStore_1 = require("./DBStore");
exports.DBStore = DBStore_1.default;
var uuid_1 = require("uuid");
var react_edit_text_1 = require("react-edit-text");
var react_1 = require("react");
require("react-edit-text/dist/index.css");
var _ = require("lodash");
function SaveSession(props) {
    var db = new DBStore_1.default(props.dbName);
    var uid = (0, react_1.useRef)(props.uid ? props.uid : (0, uuid_1.v4)());
    var _a = (0, react_1.useState)(props.sessName ? props.sessName : 'Session'), sessName = _a[0], setSessName = _a[1];
    var editTextStyle = props.editTextStyle ? props.editTextStyle : {};
    var buttonClass = props.buttonClass ? props.buttonClass : '';
    var format = props.format ? props.format : defaultSaveSessFormat;
    var _b = (0, react_1.useState)(false), saved = _b[0], setSaved = _b[1];
    var notificationDelay = props.notificationDelay ? props.notificationDelay : 800;
    var notification = props.notification ? true : false;
    var getRecord = function () {
        var time = new Date();
        return {
            uid: uid.current,
            time: time,
            sessName: sessName,
            data: props.getData()
        };
    };
    var save = function () {
        db.save(uid.current, getRecord()).then(function () {
            setSaved(true);
            setTimeout(function () { return setSaved(false); }, notificationDelay);
        });
    };
    var defaultDownload = function () {
        var strx = JSON.stringify(getRecord());
        var blob = new Blob([strx]);
        var element = document.createElement("a");
        element.download = "".concat(sessName, ".json");
        element.href = window.URL.createObjectURL(blob);
        element.click();
        element.remove();
    };
    var download = undefined;
    if (props.download) {
        if (_.isBoolean(props.download))
            download = defaultDownload;
        else
            download = props.download;
    }
    // console.log(download)
    return format(download, save, saved, notification, sessName, setSessName, buttonClass, editTextStyle);
}
exports.SaveSession = SaveSession;
function defaultSaveSessFormat(download, save, notification, saved, sessName, setSessName, buttonClass, editTextStyle) {
    return (0, jsx_runtime_1.jsxs)("span", __assign({ className: "rss-save-session" }, { children: [download && (0, jsx_runtime_1.jsx)("button", __assign({ className: buttonClass, onClick: function () { return download(); } }, { children: "Download" })), (0, jsx_runtime_1.jsx)("button", __assign({ className: buttonClass, onClick: function () { return save(); } }, { children: "Save" })), (0, jsx_runtime_1.jsx)(react_edit_text_1.EditText, { style: editTextStyle, defaultValue: sessName, inline: true, onSave: function (e) { return setSessName(e.value); } }), notification && saved && (0, jsx_runtime_1.jsx)("span", __assign({ className: "rss-save-session-saved" }, { children: "Saved!" }))] }));
}
function ListSessions(props) {
    var db = new DBStore_1.default(props.dbName);
    var _a = (0, react_1.useState)([]), sessions = _a[0], setSessions = _a[1];
    var _b = (0, react_1.useState)(0), removeCount = _b[0], setRemoveCount = _b[1];
    var format = props.format ? props.format : defaultSessFormat;
    var remove = function (sess_id) {
        db.remove(sess_id).then(function (x) { return setRemoveCount(removeCount + 1); });
    };
    // console.log(sessions)
    (0, react_1.useEffect)(function () {
        db.getList().then(function (x) { setSessions(x); });
    }, [props.gc, removeCount]);
    return (0, jsx_runtime_1.jsx)("div", __assign({ className: 'rss-list-sessions' }, { children: format(sessions, remove, props.enter) }));
}
exports.ListSessions = ListSessions;
function get_date_string(d) {
    // keep only minutes
    return d.toLocaleString().split(':').slice(0, 2).join(':');
}
function defaultSessFormat(sessions, remove, enter) {
    var sortedSessions = _.sortBy(sessions, function (x) { return -x.time; });
    return sortedSessions.map(function (x) { return (0, jsx_runtime_1.jsxs)("div", __assign({ className: "rss-list-sessions-item" }, { children: [(0, jsx_runtime_1.jsxs)("a", __assign({ className: 'rss-list-sessions-item-name-time', onClick: function (e) { return enter(x); } }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: 'rss-list-sessions-item-name' }, { children: x.sessName })), (0, jsx_runtime_1.jsx)("span", __assign({ className: "rss-list-sessions-item-time" }, { children: get_date_string(x.time) }))] })), (0, jsx_runtime_1.jsx)("a", __assign({ className: 'rss-list-sessions-item-remove', onClick: function (e) { return remove(x.uid); } }, { children: "remove" }))] }), x.uid); });
}
