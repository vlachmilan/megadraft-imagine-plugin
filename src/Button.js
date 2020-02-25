/*
 * Copyright (c) 2020, Milan Vlach <milan@vlach.io>
 *
 * License: MIT
 */

import React from "react";

import Icon from "./icon.js";
import constants from "./constants";
import { insertDataBlock } from "megadraft";

/**
 * @return {boolean}
 */

export default function Button(props) {
  const { className, onChange, editorState } = props;

  const saveFiles = files => {
    if (files.length > 0) {
      const data = {
        type: constants.PLUGIN_TYPE,
        caption: "Initial plugin text",
        file: files[0]
      };

      onChange(insertDataBlock(editorState, data));
    }
  };

  return (
    <button className={className} type="button" title={constants.PLUGIN_NAME}>
      <input
        type="file"
        accept="image/*"
        name="file-plugin-button"
        id="file-plugin-button"
        onChange={e => saveFiles(e.target.files)}
        style={{ visibility: "hidden", width: 0 }}
      />
      <label htmlFor="file-plugin-button" style={{ cursor: "pointer" }}>
        <Icon className="sidemenu__button__icon" />
      </label>
    </button>
  );
}
