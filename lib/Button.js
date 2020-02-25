"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Button;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _icon = require("./icon.js");

var _icon2 = _interopRequireDefault(_icon);

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

var _megadraft = require("megadraft");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {boolean}
 */

/*
 * Copyright (c) 2020, Milan Vlach <milan@vlach.io>
 *
 * License: MIT
 */

function Button(props) {
  var className = props.className,
      onChange = props.onChange,
      editorState = props.editorState;


  var saveFiles = function saveFiles(files) {
    if (files.length > 0) {
      var data = {
        type: _constants2.default.PLUGIN_TYPE,
        caption: "Initial plugin text",
        file: files[0]
      };

      onChange((0, _megadraft.insertDataBlock)(editorState, data));
    }
  };

  return _react2.default.createElement(
    "button",
    { className: className, type: "button", title: _constants2.default.PLUGIN_NAME },
    _react2.default.createElement("input", {
      type: "file",
      accept: "image/*",
      name: "file-plugin-button",
      id: "file-plugin-button",
      onChange: function onChange(e) {
        return saveFiles(e.target.files);
      },
      style: { visibility: "hidden", width: 0 }
    }),
    _react2.default.createElement(
      "label",
      { htmlFor: "file-plugin-button", style: { cursor: "pointer" } },
      _react2.default.createElement(_icon2.default, { className: "sidemenu__button__icon" })
    )
  );
}