import React from "react";
import R from "ramda";
import { arrayOf, func, node, number } from "prop-types";


const childrenStyles = {
  flex: "auto",
  overflow: "hidden"
};

const NOT_RESIZING = -1;

export default class Splitter extends React.Component {

  static propTypes = {
    children: node,
    sizes: arrayOf(number),
    onResize: func
  }

  static defaultProps = {
    sizes: [],
    onResize: () => {}
  }

  state = {
    resizing: NOT_RESIZING // id of resizer
  }

  componentWillMount = () => {
    this.resizers = [];
    this.children = [];
  }

  componentDidUpdate = () => {
    const { resizing } = this.state;

    if (resizing !== NOT_RESIZING){
      this.attachMouseMove();
    }
    else {
      this.detachMouseMove();
    }
  }

  attachMouseMove = () => {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.detachMouseMove);
  }

  detachMouseMove = () => {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.detachMouseMove);
  }

  handleMouseMove = mouseEvent => {

    // prevent user selecting while dragging
    mouseEvent.preventDefault();

    const { resizing } = this.state;
    const { onResize } = this.props;

    const panelWidth = this.panel.clientWidth;
    const panelX = this.panel.offsetLeft;

    // center where the mouse is inside the resizer
    const mouseX = mouseEvent.pageX - this.resizers[resizing].clientWidth / 2;

    const percent = (mouseX - panelX) / (panelWidth);

    const constrained = R.clamp(0.2, 0.8, percent);

    const data = {
      percent: constrained,
      px: constrained * panelWidth,
      panel: this.children[0]
    };

    onResize(data);
  }

  renderChild = (c, i) => {

    const { sizes } = this.props;

    // if a size was given, remove flex styles and add width
    const styles = sizes[i]
      ? R.merge(childrenStyles, {
        width: `${sizes[i]*100}%`,
        flex: "none"
      })
      : childrenStyles;

    return (
      <div key={`child-${i}`} style={styles} ref={el => this.children[i] = el}>
        {c}
      </div>
    );
  }

  renderResizer = (i) => {

    return (
      <div
        key={`resizer-${i}`}
        ref={el => this.resizers[i] = el}
        className="panel__resizer"
        onMouseDown={e => this.setState({ resizing: i })}
        onMouseUp={e => this.setState({ resizing: NOT_RESIZING })}
      >
        <div className="panel__resizer-inner"></div>
      </div>
    );
  }

  render = () => {

    const children = React.Children.toArray(this.props.children);

    return (
      <div className="panel" ref={el => this.panel = el}>
        {children.map(this.renderChild)
          .reduce((list, c, i) => {
            if (i < children.length-1){
              return list.concat([c, this.renderResizer(i)]);
            }
            else {
              return list.concat([c]);
            }
          }, [])}
      </div>
    );
  }
}
