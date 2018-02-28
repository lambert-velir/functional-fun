import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/mode/javascript/javascript.js";

import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/keymap/sublime.js";


import { func, string } from "prop-types";



export default class CodeEditor extends React.Component {

  static propTypes = {
    code: string.isRequired,
    onCodeChange: func.isRequired
  }

  handleChange = (editor, data, code) => {
    this.props.onCodeChange(code);
  }

  // TODO apply these shortcuts to codemirror
  setupAce = (el) => {

    // remove Cmd-L so the browser will select the address bar instead
    commands.bindKey({ win: "Ctrl-L", mac: "Command-L" }, null);

  }

  render = () => {
    const { code, onCodeChange, ...rest } = this.props; // eslint-disable-line no-unused-vars

    return (
      <CodeMirror
        value={code}
        onBeforeChange={this.handleChange}
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
          lineWrapping: true,
          keyMap: "sublime"
        }}
        {...rest}
      />

    );
  }
}
