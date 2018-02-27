import React from "react";
import { arrayOf, func, shape, string } from "prop-types";
import Modal from "../Modal/Modal.jsx";
import { Controlled as CodeMirror } from "react-codemirror2";

export default class Load extends React.Component {

  static propTypes = {
    examples: arrayOf(shape({
      displayName: string.isRequired,
      slug: string.isRequired,
      code: string.isRequired
    })).isRequired,
    onChange: func.isRequired
  };

  state = {
    isOpen: false
  }

  open = (e) => this.setState({ isOpen: true })

  close = (e) => this.setState({ isOpen: false })

  handleExampleClick = (slug) => (e) => {
    this.props.onChange(slug);
    this.close();
  }

  render = () => {
    const { examples } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="load">
        <button type="button" onClick={this.open}>Load</button>

        <Modal isOpen={isOpen} onClose={this.close} className="modal--examples">
          <div className="examples">
            {examples.map(example => {
              const { displayName, slug, code } = example;
              return (
                <div key={slug} className="example__holder">
                  <div className="example"
                    onClick={this.handleExampleClick(slug)}
                  >
                    <div className="example__name">{displayName}</div>
                    <div className="example__preview">
                      <CodeMirror
                        mode="javascript"
                        value={code}
                        options={{
                          mode: "javascript",
                          readOnly: true,
                          theme: "github",
                          lineWrapping: false
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
      </div>
    );
  };
}
