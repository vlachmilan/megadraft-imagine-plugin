"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createImagePlugin = createImagePlugin;

var _megadraft = require("megadraft");

var _Button = require("./Button");

var _Button2 = _interopRequireDefault(_Button);

var _Block = require("./Block");

var _Block2 = _interopRequireDefault(_Block);

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2020, Milan Vlach <milan@vlach.io>
 *
 * License: MIT
 */

function createImagePlugin() {
  var onFileUpload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  return {
    title: _constants2.default.PLUGIN_NAME,
    type: _constants2.default.PLUGIN_TYPE,
    buttonComponent: _Button2.default,
    blockComponent: _Block2.default,
    onFileUpload: onFileUpload,
    options: {
      defaultDisplay: "medium",
      displayOptions: [{ key: "small", icon: _megadraft.MegadraftIcons.MediaSmallIcon, label: "SMALL" }, {
        key: "medium",
        icon: _megadraft.MegadraftIcons.MediaMediumIcon,
        label: "MEDIUM"
      }, { key: "big", icon: _megadraft.MegadraftIcons.MediaBigIcon, label: "BIG" }]
    }
  };
}