import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";

import { string } from "prop-types";


export default class ConsoleCode extends React.Component {

  static propTypes = {
    message: string.isRequired
  }

  render = () => {

    const { message } = this.props;

    return (
      <CodeMirror
        value={message}
        options={{
          mode: {
            name: "javascript",
            json: true
          },
          readOnly: true,
          foldGutter: true,
          gutters: ["CodeMirror-foldgutter"],
          theme: "github",
          height: "auto",
          width: "auto",
          lineWrapping: true
        }}
      />
    );
  }
}
