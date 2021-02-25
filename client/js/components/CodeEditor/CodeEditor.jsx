import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/mode/javascript/javascript.js";

import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/keymap/vim.js";

// import "codemirror/keymap/sublime.js";
// import "./attachKeyMap.js"; // this now happens in index.jsx so we have access to the store

import { func, string } from "prop-types";

const propTypes = {
  code: string.isRequired,
  onCodeChange: func.isRequired,
};

const CodeEditor = (props) => {
  const { code, onCodeChange, ...rest } = props;

  return (
    <CodeMirror
      value={code}
      onBeforeChange={(editor, data, code) => {
        onCodeChange(code);
      }}
      options={{
        mode: "javascript",
        readOnly: false,
        foldGutter: true,
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        theme: "github",
        height: "auto",
        width: "auto",
        insertSoftTab: true,
        tabSize: 2,
        lineWrapping: true,
        keyMap: window.location.search.match(/vim/) ? "vim" : "mike",
      }}
      {...rest}
    />
  );
};

CodeEditor.propTypes = propTypes;
export default CodeEditor;
