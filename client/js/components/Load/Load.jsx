import React from "react";
import { arrayOf, func, shape, string } from "prop-types";
import Modal from "./Modal.jsx";

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

        <Modal isOpen={isOpen} onClose={this.close}>
          {examples.map(example => {
            const { displayName, slug } = example;
            return (
              <div key={slug}
                className="example"
                onClick={this.handleExampleClick(slug)}
              >
                {displayName}
              </div>
            );
          })}
        </Modal>
      </div>
    );
  };
}
