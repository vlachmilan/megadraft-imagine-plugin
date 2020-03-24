"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setImageRemoveCallback = setImageRemoveCallback;

var _draftJs = require("draft-js");

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function removeImageFromArray(data, value) {
  var index = data.indexOf(value);
  data.splice(index, 1);

  return data;
}

function isImaginePLuginBlock(element) {
  var blockType = element.data.get("type");
  var file = element.data.get("file");

  return blockType === _constants2.default.PLUGIN_TYPE && !file;
}

function isDeletionChange(oldContent, newContent) {
  return oldContent.getBlockMap().length > newContent.getBlockMap().length;
}

function updateImageDeletionState(currentContent, newContent, deletedImages) {
  var newState = [].concat(_toConsumableArray(deletedImages));
  if (isDeletionChange(currentContent, newContent)) {
    var deletedDifferences = currentContent.getBlockMap().filter(function (element) {
      return !newContent.getBlockMap().includes(element);
    });

    deletedDifferences.forEach(function (element) {
      if (isImaginePLuginBlock(element)) {
        var fileSrc = element.data.get("imageSrc");

        if (fileSrc) {
          newState.push(fileSrc);
        }
      }
    });

    return newState;
  }

  newContent.getBlockMap().forEach(function (element) {
    if (isImaginePLuginBlock(element)) {
      var fileSrc = element.data.get("imageSrc");

      if (newState.includes(fileSrc)) {
        newState = removeImageFromArray(newState, fileSrc);
      }
    }
  });

  return newState;
}

function setImageRemoveCallback(newState, currentState, deletedImagesState, callback) {
  var currentContent = currentState.getCurrentContent();
  var newContent = newState.getCurrentContent();

  if (currentContent !== newContent) {
    var updatedDeletedImagesState = updateImageDeletionState(currentContent, newContent, deletedImagesState);

    if (deletedImagesState.length !== updatedDeletedImagesState.length) {
      callback(updatedDeletedImagesState);
    }
  }
}