/*
 * Copyright (c) 2020, Milan Vlach <milan@vlach.io>
 *
 * License: MIT
 */

import constants from "../src/constants";

export default {
  entityMap: {},
  blocks: [
    {
      key: "ag6qs",
      text: "megadraft imagine plugin - Megadraft Plugin",
      type: "header-two",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: []
    },
    {
      key: "9vgd",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      text: "",
      data: {
        type: constants.PLUGIN_TYPE,
        caption: "Plugin caption"
      },
      entityRanges: []
    },
    {
      key: "6dge",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      text: "",
      entityRanges: []
    }
  ]
};
