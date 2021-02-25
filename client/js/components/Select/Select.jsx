import React from "react";
import { any, arrayOf, bool, func, node, shape, string } from "prop-types";
import { useSelect } from "downshift";
import cx from "classnames";

/**
 * Example usage:
 *
 *   const items = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];
 *
 *   <Select
 *     selectProps={{
 *       items,
 *       itemToString: d => d,
 *       initialSelectedItem: "Red",
 *     }}
 *     style={{ width: 400 }}
 *   />
 *
 *  (also see Select.stories.jsx for example usage)
 */

const propTypes = {
  className: string,
  disabled: bool,
  itemToId: func, // can use this instead of itemToString to identify an item
  label: node,
  // onChange shortcut for selectProps.onSelectedItemChange(item.selectedItem)
  // if this is used, you don't need to provide selectProps.onSelectedItemChange
  onChange: func,
  placeholder: node,
  renderItem: func, // (item, isSelected) => node
  selectProps: shape({
    items: arrayOf(any).isRequired,
    itemToString: func.isRequired,
    // anything else to go in to useSelect, like onSelectedItemChange or selectedItem
    // see https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect
  }).isRequired, // useSelect props
};

const defaultProps = {
  disabled: false,
};

const Select = (props) => {
  const {
    className,
    disabled,
    label,
    onChange,
    placeholder,
    selectProps,
    renderItem,
    ...otherProps
  } = props;

  const { items, itemToString } = selectProps;

  const selectState = useSelect({
    ...selectProps,
    onSelectedItemChange: (changes) => {
      // call both functions, the consumer should only provide one...
      selectProps.onSelectedItemChange &&
        selectProps.onSelectedItemChange(changes);
      onChange && onChange(changes.selectedItem);
    },
  });

  const itemToId = props.itemToId || itemToString;

  const _renderItem =
    renderItem ||
    ((item) => (
      <React.Fragment>
        {itemToId(selectedItem) === itemToId(item) && (
          <div className="select__checkmark"></div>
        )}
        {itemToString(item)}
      </React.Fragment>
    ));

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    toggleMenu,
    closeMenu,
    selectItem,
  } = selectState;

  const hasSelection = selectedItem !== undefined && selectedItem !== null;

  const buttonText = itemToString(selectedItem) || placeholder;

  return (
    <div
      className={cx("select", className, {
        "select--open": isOpen,
        "select--no-selection": !hasSelection,
      })}
      {...otherProps}
    >
      {label && (
        <label className="select__label" {...getLabelProps()}>
          {label}
        </label>
      )}
      <div className="select__dropdown">
        <div className="select__button-holder">
          <button
            type="button"
            className="select__button"
            onClick={toggleMenu}
            {...getToggleButtonProps({
              "aria-label": itemToString(selectedItem),
              disabled: disabled,
              onKeyDown: (event) => {
                if (event.key === "Escape") {
                  // Prevent Downshift's default "Escape" behavior because it
                  // sets the selectedItem to be null
                  event.nativeEvent.preventDownshiftDefault = true;
                  closeMenu();
                }
              },
            })}
          >
            <div className="select__button-text" title={buttonText}>
              {buttonText}
            </div>
          </button>
          {hasSelection && placeholder && (
            <div className="select__clear-holder">
              <button
                className="select__clear"
                title="Clear"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  selectItem(null);
                }}
              ></button>
            </div>
          )}
        </div>
        <ul className="select__menu" {...getMenuProps()}>
          {items.map((item, index) => {
            return (
              <li
                key={itemToString(item) || itemToId(item)}
                className={cx("select__menu-item", {
                  "select__menu-item--highlighted": highlightedIndex === index,
                  "select__menu-item--selected":
                    itemToId(selectedItem) === itemToId(item),
                })}
                {...getItemProps({ index, item })}
              >
                {_renderItem(item, itemToId(selectedItem) === itemToId(item))}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
export default Select;
