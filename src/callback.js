import { convertToRaw } from "draft-js";
import constants from "./constants";

export function setImageRemoveCallback(newState, currentState, callback) {
  const currentContent = currentState.getCurrentContent();
  const newContent = newState.getCurrentContent();

  if (currentContent !== newContent) {
    const deletedDifferences = currentContent
      .getBlockMap()
      .filter(element => !newContent.getBlockMap().includes(element));

    deletedDifferences.forEach(element => {
      const blockType = element.data.get("type");
      const file = element.data.get("file");

      if (blockType === constants.PLUGIN_TYPE && !file) {
        callback(element);
      }
    });
  }
}
