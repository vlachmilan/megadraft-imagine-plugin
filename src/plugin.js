/*
 * Copyright (c) 2020, Milan Vlach <milan@vlach.io>
 *
 * License: MIT
 */

import { MegadraftIcons } from "megadraft";

import Button from "./Button";
import Block from "./Block";
import constants from "./constants";

export function createImagePlugin(onFileUpload = null) {
  return {
    title: constants.PLUGIN_NAME,
    type: constants.PLUGIN_TYPE,
    buttonComponent: Button,
    blockComponent: Block,
    onFileUpload: onFileUpload,
    options: {
      defaultDisplay: "medium",
      displayOptions: [
        { key: "small", icon: MegadraftIcons.MediaSmallIcon, label: "SMALL" },
        {
          key: "medium",
          icon: MegadraftIcons.MediaMediumIcon,
          label: "MEDIUM"
        },
        { key: "big", icon: MegadraftIcons.MediaBigIcon, label: "BIG" }
      ]
    }
  };
}
