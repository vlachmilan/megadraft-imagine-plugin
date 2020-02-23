/*
 * Copyright (c) 2020, Milan Vlach <milan@vlach.io>
 *
 * License: MIT
 */

import React, { useState, useRef, useEffect, Fragment } from "react";

import { MegadraftIcons } from "megadraft";
import Popover from "react-popover";
import TextAreaAutoSize from "react-textarea-autosize";
import Toolbar from "./Toolbar";

const styles = {
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

const Image = ({
  readOnly,
  src,
  focused,
  handleClickOut,
  handleToolbarChangeWidth,
  selectedWidth
}) => {
  if (readOnly) {
    return (
      <Fragment>
        <img src={src} style={styles.image} />
      </Fragment>
    );
  }

  const focusStyle = focused ? styles.focus : null;
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
    <Fragment>
      <img src={src} style={{ ...styles.image, ...focusStyle }} />
    </Fragment>
    // </Popover>
  );
};

export default function Block(props) {
  const { data, container, blockProps } = props;

  const [focused, setFocused] = useState(false);
  const [title, setTitle] = useState(null);
  const blockRef = useRef(null);

  const isReadOnly = blockProps.getReadOnly();

  useEffect(() => {
    if (!isReadOnly) {
      document.addEventListener("mousedown", handleClickOut, false);
      return () => {
        document.removeEventListener("mousedown", handleClickOut, false);
      };
    }
  }, []);

  const handleClick = e => {
    if (!isReadOnly) {
      setFocused(true);
    }
  };

  const handleClickOut = e => {
    if (blockRef && !blockRef.current.contains(e.target)) {
      setFocused(false);
    }
  };

  const handleToolbarChangeWidth = width => {
    container.updateData({ width: width });
  };

  const handleEdit = () => {
    alert(JSON.stringify(this.props.data, null, 4));
  };

  const handleCaptionChange = e => {
    setTitle(e.target.value);
    container.updateData({ caption: title });
  };

  const actions = [
    { key: "edit", icon: MegadraftIcons.EditIcon, action: handleEdit },
    {
      key: "delete",
      icon: MegadraftIcons.DeleteIcon,
      action: container.remove
    }
  ];
  return (
    <div ref={blockRef} onClick={handleClick}>
      <div style={styles.imageDiv}>
        <Image
          src={data.blob}
          handleToolbarChangeWidth={handleToolbarChangeWidth}
          focused={focused}
          readOnly={isReadOnly}
          handleClickOut={handleClickOut}
          selectedWidth={container.width}
        />
      </div>
      <figcaption
        className="imageCaption"
        style={{
          color: "rgba(0, 0, 0, 0.54)",
          fontFamily:
            "medium-content-sans-serif-font, \"Lucida Grande\", \"Lucida Sans Unicode\", \"Lucida Sans\", Geneva, Arial, sans-serif",
          fontSize: "16px",
          textAlign: "center",
          marginTop: "10px"
        }}
      >
        <TextAreaAutoSize
          id="caption"
          rows={1}
          disabled={isReadOnly}
          placeholder={isReadOnly ? title : "type a caption (optional)"}
          style={styles.input}
          onChange={handleCaptionChange}
          value={title}
        />
      </figcaption>
    </div>
  );
}
