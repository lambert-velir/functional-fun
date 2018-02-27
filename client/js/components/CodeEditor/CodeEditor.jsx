import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/mode/javascript/javascript.js";

import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/edit/matchbrackets.js";

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
    this.ace = el;

    const commands = this.ace.editor.commands;

    // console.log(commands);

    commands.bindKey(
      { win: "Ctrl-D", mac: "Command-D" },
      (editor) => editor.execCommand("selectMoreAfter")
    );

    commands.bindKey(
      { win: "Ctrl-[", mac: "Command-[" },
      (editor) => editor.execCommand("blockoutdent")
    );

    commands.bindKey(
      { win: "Ctrl-]", mac: "Command-]" },
      (editor) => editor.execCommand("blockindent")
    );

    commands.bindKey(
      { win: "Ctrl-Down", mac: "Ctrl-Command-Down" },
      (editor) => editor.execCommand("movelinesdown")
    );

    commands.bindKey(
      { win: "Ctrl-Up", mac: "Ctrl-Command-Up" },
      (editor) => editor.execCommand("movelinesup")
    );

    // remove Cmd-L so the browser will select the address bar instead
    commands.bindKey({ win: "Ctrl-L", mac: "Command-L" }, null);

    commands.bindKey({ win: "Ctrl-F", mac: "Command-F" }, null);

  }

  render = () => {
    const { code, onCodeChange, ...rest } = this.props; // eslint-disable-line no-unused-vars

    return (
      <CodeMirror
        value={code}
        onBeforeChange={this.handleChange}
        options={{
          // mode: "javascript",
          readOnly: false,
          foldGutter: true,
          lineNumbers: true,
          matchBrackets: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          theme: "github",
          height: "auto",
          width: "auto",
          lineWrapping: true
        }}
        {...rest}
      />

    );
  }
}
