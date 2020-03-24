import { convertToRaw } from "draft-js";
import constants from "./constants";

function removeImageFromArray(data, value) {
  const index = data.indexOf(value);
  data.splice(index, 1);

  return data;
}

function isImaginePLuginBlock(element) {
  const blockType = element.data.get("type");
  const file = element.data.get("file");

  return blockType === constants.PLUGIN_TYPE && !file;
}

function isDeletionChange(oldContent, newContent) {
  return oldContent.getBlockMap().length > newContent.getBlockMap().length;
}

function updateImageDeletionState(currentContent, newContent, deletedImages) {
  let newState = [...deletedImages];
  if (isDeletionChange(currentContent, newContent)) {
    const deletedDifferences = currentContent
      .getBlockMap()
      .filter(element => !newContent.getBlockMap().includes(element));

    deletedDifferences.forEach(element => {
      if (isImaginePLuginBlock(element)) {
        const fileSrc = element.data.get("imageSrc");

        if (fileSrc) {
          newState.push(fileSrc);
        }
      }
    });

    return newState;
  }

  newContent.getBlockMap().forEach(element => {
    if (isImaginePLuginBlock(element)) {
      const fileSrc = element.data.get("imageSrc");

      if (newState.includes(fileSrc)) {
        newState = removeImageFromArray(newState, fileSrc);
      }
    }
  });

  return newState;
}

export function setImageRemoveCallback(
  newState,
  currentState,
  deletedImagesState,
  callback
) {
  const currentContent = currentState.getCurrentContent();
  const newContent = newState.getCurrentContent();

  if (currentContent !== newContent) {
    const updatedDeletedImagesState = updateImageDeletionState(
      currentContent,
      newContent,
      deletedImagesState
    );

    if (deletedImagesState.length !== updatedDeletedImagesState.length) {
      callback(updatedDeletedImagesState);
    }
  }
}
