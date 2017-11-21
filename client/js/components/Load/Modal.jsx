import React from "react";
import { bool, func, string, node } from "prop-types";
import classNames from "classnames";


export default class Modal extends React.Component {

  static propTypes = {
    title: string,
    isOpen: bool.isRequired,
    onClose: func.isRequired,
    children: node.isRequired
  };

  componentDidMount = () => {
    this.toggleKeydownHandler(this.props.isOpen);
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.keydownHandler);
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.toggleKeydownHandler(this.props.isOpen);
  }

  toggleKeydownHandler = (isOpen) => {
    if (isOpen){
      window.addEventListener("keydown", this.keydownHandler);
    }
    else {
      window.removeEventListener("keydown", this.keydownHandler);
    }
  }

  keydownHandler = (e) => {
    if(e.key === "Escape"){
      this.props.onClose();
    }
  }

  handleDimClick = (e) => {
    if (e.target === this.dim){
      this.props.onClose();
    }
  }

  render = () => {
    const { isOpen, onClose, title } = this.props;

    const classes = classNames("modal", {
      "is-open": isOpen
    });

    return (
      <div className={classes}
        onClick={this.handleDimClick}
        ref={el => this.dim = el}
      >
        <div className="modal__box">
          <div className="modal__title">
            {title}
            <div className="modal__close" onClick={onClose}>
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96 96" enableBackground="new 0 0 96 96" xmlSpace="preserve">
                <polygon points="96,14 82,0 48,34 14,0 0,14 34,48 0,82 14,96 48,62 82,96 96,82 62,48 "/>
              </svg>
            </div>
          </div>
          <div className="modal__content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  };
}
