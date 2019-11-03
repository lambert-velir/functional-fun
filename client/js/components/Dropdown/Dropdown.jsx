import React from "react";
import R from "ramda";
import classNames from "classnames";
import { arrayOf, func, node, shape, string } from "prop-types";
import Downshift from "downshift";
import ChevronDown from "../Svg/ChevronDown.jsx";
import ChevronUp from "../Svg/ChevronUp.jsx";
import LinkExternal from "../Svg/LinkExternal.jsx";

export default class Dropdown extends React.Component {
  static propTypes = {
    items: arrayOf(
      shape({
        name: string.isRequired,
        href: string,
      }),
    ).isRequired,
    className: string,
    children: node,
    onChange: func,
    onSelect: func,
  };

  static defaultProps = {
    onChange: () => {},
  };

  render = () => {
    const {
      className = "",
      items,
      children,
      onChange,
      onSelect,
      ...rest
    } = this.props;

    return (
      <Downshift
        itemToString={R.prop("name")}
        onChange={onChange}
        onSelect={onSelect}
        render={downshiftProps => {
          const { isOpen, getItemProps, toggleMenu } = downshiftProps;

          const dropdownClasses = classNames("dropdown", className, {
            "is-open": isOpen,
          });

          return (
            <div className={dropdownClasses} {...rest}>
              <button type="button" onClick={toggleMenu}>
                {children}

                {isOpen ? (
                  <ChevronUp className="button__icon" />
                ) : (
                  <ChevronDown className="button__icon" />
                )}
              </button>

              <div className="dropdown__items">
                {items.map(item =>
                  item.href ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener norefferer"
                      className="dropdown__item dropdown__link"
                      {...getItemProps({ item })}
                    >
                      {item.name}{" "}
                      <LinkExternal className="dropdown__link-icon" />
                    </a>
                  ) : (
                    <div
                      key={item.name}
                      className="dropdown__item"
                      {...getItemProps({ item })}
                    >
                      {item.name}
                    </div>
                  ),
                )}
              </div>
            </div>
          );
        }}
      />
    );
  };
}
