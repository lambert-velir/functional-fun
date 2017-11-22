import React from "react";
import { bool, func, string, node } from "prop-types";
import classNames from "classnames";
import X from "../Svg/X.jsx";

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
              <X width="24" height="24" />
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
