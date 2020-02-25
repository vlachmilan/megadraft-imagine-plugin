"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                   * Copyright (c) 2020, Milan Vlach <milan@vlach.io>
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * License: MIT
                                                                                                                                                                                                                                                                   */

exports.default = Block;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _megadraft = require("megadraft");

var _reactPopover = require("react-popover");

var _reactPopover2 = _interopRequireDefault(_reactPopover);

var _reactTextareaAutosize = require("react-textarea-autosize");

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _Toolbar = require("./Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  focus: {
    border: "3px solid #48e79a"
  },
  imageDiv: {
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: "hidden"
  },
  image: {
    height: "auto",
    overflow: "hidden",
    display: "block",
    margin: "0px auto"
  },
  popover: {
    zIndex: "2"
  },
  input: {
    border: "none",
    outline: "none",
    fontSize: "14px",
    color: "rgba(0,0,0,.6)",
    paddingLeft: "15px",
    paddingBottom: "15px",
    width: "100%",
    textAlign: "center",
    resize: "none",
    boxSizing: "border-box",
    backgroundColor: "inherit"
  }
};

var Image = function Image(_ref) {
  var readOnly = _ref.readOnly,
      src = _ref.src,
      focused = _ref.focused,
      handleClickOut = _ref.handleClickOut,
      handleToolbarChangeWidth = _ref.handleToolbarChangeWidth,
      selectedWidth = _ref.selectedWidth;

  if (readOnly) {
    return _react2.default.createElement(
      _react.Fragment,
      null,
      _react2.default.createElement("img", { src: src, style: styles.image })
    );
  }

  var focusStyle = focused ? styles.focus : null;
  return (
    // <Popover
    //   style={styles.popover}
    //   preferPlace="above"
    //   place="column"
    //   body={
    //     <Toolbar changeSize={handleToolbarChangeWidth} size={selectedWidth} />
    //   }
    //   onOuterAction={handleClickOut}
    //   isOpen={focused}
    // >
    _react2.default.createElement(
      _react.Fragment,
      null,
      _react2.default.createElement("img", { src: src, style: _extends({}, styles.image, focusStyle) })
    )
    // </Popover>

  );
};

function Block(props) {
  var data = props.data,
      container = props.container,
      blockProps = props.blockProps;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      focused = _useState2[0],
      setFocused = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      title = _useState4[0],
      setTitle = _useState4[1];

  var blockRef = (0, _react.useRef)(null);

  var isReadOnly = blockProps.getInitialReadOnly();

  /***
   * Upload a file with the passed in upload file function
   * @params file -- file object
   */
  var uploadFile = function uploadFile(file) {
    if (blockProps.plugin.onFileUpload) {
      var imageURL = blockProps.plugin.onFileUpload(file);
      if (typeof imageURL !== "string") {
        throw new Error("onFileUpload callback must return image src string");
      }

      var _data = {
        imageSrc: imageURL,
        file: null
      };

      container.updateData(_data);
      return;
    }

    // We don't have any onFileUpload callback
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      var data = {
        imageSrc: reader.result,
        file: null
      };
      container.updateData(data);
    };
  };

  (0, _react.useEffect)(function () {
    if (!isReadOnly) {
      document.addEventListener("mousedown", handleClickOut, false);

      if (!data.imageSrc && data.file) {
        uploadFile(data.file);
      }

      return function () {
        document.removeEventListener("mousedown", handleClickOut, false);
      };
    }
  }, []);

  var handleClick = function handleClick(e) {
    if (!isReadOnly) {
      setFocused(true);
    }
  };

  var handleClickOut = function handleClickOut(e) {
    if (blockRef && !blockRef.current.contains(e.target)) {
      setFocused(false);
    }
  };

  var handleToolbarChangeWidth = function handleToolbarChangeWidth(width) {
    container.updateData({ width: width });
  };

  var handleCaptionChange = function handleCaptionChange(e) {
    setTitle(e.target.value);
    container.updateData({ caption: title });
  };

  return _react2.default.createElement(
    "div",
    { ref: blockRef, onClick: handleClick },
    _react2.default.createElement(
      "div",
      { style: styles.imageDiv },
      _react2.default.createElement(Image, {
        src: data.imageSrc,
        handleToolbarChangeWidth: handleToolbarChangeWidth,
        focused: focused,
        readOnly: isReadOnly,
        handleClickOut: handleClickOut,
        selectedWidth: container.width
      })
    ),
    _react2.default.createElement(
      "figcaption",
      {
        className: "imageCaption",
        style: {
          color: "rgba(0, 0, 0, 0.54)",
          fontFamily: "medium-content-sans-serif-font, \"Lucida Grande\", \"Lucida Sans Unicode\", \"Lucida Sans\", Geneva, Arial, sans-serif",
          fontSize: "16px",
          textAlign: "center",
          marginTop: "10px"
        }
      },
      _react2.default.createElement(_reactTextareaAutosize2.default, {
        id: "caption",
        rows: 1,
        disabled: isReadOnly,
        placeholder: isReadOnly ? data.title : "type a caption (optional)",
        style: styles.input,
        onChange: handleCaptionChange,
        value: data.title
      })
    )
  );
}