import React, { useRef } from "react";
import JoditEditor from "jodit-react";

export const TextEditor = (props) => {
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    height: 450,
    cleanOnPaste: true,
    cleanHTML: {
      denyTags: {
        script: true,
      },
    },
    // placeholder: placeholder || 'Start typings...'
  };
  // [placeholder]

  return (
    <>
      <JoditEditor
        ref={editor}
        value={props.value}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={props.onBlur} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
    </>
  );
};
