import React from "react";
import { bool, func, node } from "prop-types";
import classNames from "classnames";


export default class Modal extends React.Component {

  static propTypes = {
    isOpen: bool.isRequired,
    onClose: func.isRequired,
    children: node.isRequired
  };

  componentDidMount = () => {
    this.componentDidUpdate({}, {});
  }

  componentDidUpdate = (prevProps, prevState) => {
    // TODO listen for esc
  }

  handleDimClick = (e) => {
    if (e.target === this.dim){
      this.props.onClose();
    }
  }

  render = () => {
    const { isOpen, onClose } = this.props;

    const classes = classNames("modal", {
      "is-open": isOpen
    });

    return (
      <div className={classes}
        onClick={this.handleDimClick}
        ref={el => this.dim = el}
      >
        <div className="modal__box">
          <div className="modal__close" onClick={onClose}>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96 96" enableBackground="new 0 0 96 96" xmlSpace="preserve">
              <polygon points="96,14 82,0 48,34 14,0 0,14 34,48 0,82 14,96 48,62 82,96 96,82 62,48 "/>
            </svg>
          </div>
          <div className="modal__content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  };
}
