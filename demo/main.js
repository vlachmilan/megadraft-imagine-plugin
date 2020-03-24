/*
 * Copyright (c) 2020, Milan Vlach <milan@vlach.io>
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import { MegadraftEditor } from "megadraft";
import { editorStateFromRaw } from "megadraft/lib/utils";
import { convertToRaw } from "draft-js";

import { createImagePlugin } from "../src/plugin";
import { setImageRemoveCallback } from "../src/callback";

import "regenerator-runtime/runtime";

import INITIAL_CONTENT from "./content";

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: editorStateFromRaw(INITIAL_CONTENT),
      deletedImages: []
    };
    this.onChange = ::this.onChange;
  }

  onChange(newContent) {
    const { content, deletedImages } = this.state;

    setImageRemoveCallback(
      newContent,
      content,
      deletedImages,
      deletedImages => {
        console.log(deletedImages);
        this.setState({ deletedImages: deletedImages });
      }
    );

    this.setState({ content: newContent });
  }

  render() {
    const pluginName = "megadraft imagine plugin";
    const imagePlugin = createImagePlugin();
    return (
      <div className="content">
        <header>
          <h1>{pluginName} - Megadraft Plugin</h1>
        </header>

        <div className="editor">
          <MegadraftEditor
            plugins={[imagePlugin]}
            editorState={this.state.content}
            onChange={this.onChange}
            onFileUpload={file => console.log(file)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("container"));
