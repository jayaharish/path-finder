import React, { useMemo, useState } from "react";

import "./index.scss";

type Item = { [key: string]: any };

interface DropdownProps {
  onValueChange: (item: Item | String) => void;
  placeholder?: string;
  currentValue?: string | Item;
  displayKey?: string;
  uniqueKey?: string;
  values: string[] | Item[];
  direction?: "left" | "right" | "bottom" | "top";
  itemRenderer?: (
    item: string | Item,
    closeDropdown: Function
  ) => React.ReactNode;
  activeItemRenderer?: (item: string) => React.ReactNode;
  classes?: String;
}

export function Dropdown(props: DropdownProps) {
  const [isDropdownOpen, setDropdownState] = useState(false);
  const closeDropdown = () => setDropdownState(false);

  const placeholder = props.placeholder || "Select";

  const currentValue = useMemo(() => {
    if (props.currentValue) {
      if (typeof props.currentValue === "string") return props.currentValue;
      if (!props.displayKey) {
        throw Error("Display key is undefined");
      }
      return props.currentValue[props.displayKey];
    }
    return placeholder;
  }, [props.currentValue, props.displayKey]);

  const filteredValues = useMemo(() => {
    if (!props.currentValue) return props.values;
    if (typeof props.currentValue === "string")
      return (props.values as string[]).filter(
        (value) => value !== props.currentValue
      );
    if (!props.uniqueKey) throw Error("Unique key cannot be undefined");
    return (props.values as Item[]).filter((value) => {
      const key = props.uniqueKey as string;
      return value[key] !== (props.currentValue as Item)[key];
    });
  }, [props.values, props.uniqueKey, props.currentValue]);

  const getDropdownElement = (item: Item | String, index: number) => {
    const classes = `btn flat dropdown-item px-4 text-start`;
    const onClick = () => props.onValueChange(item);
    if (props.itemRenderer) {
      let key = index;
      if (props.uniqueKey && typeof item === "object")
        key = (item as Item)[props.uniqueKey];
      return (
        <button onClick={onClick} key={key} className={classes}>
          {props.itemRenderer(item, closeDropdown)}
        </button>
      );
    } else if (typeof item === "string") {
      return (
        <button onClick={onClick} key={index} className={classes}>
          {item}
        </button>
      );
    } else if (typeof item === "object") {
      if (!props.displayKey) throw Error("Display key is undefined");
      if (!props.uniqueKey) throw Error("Unique is undefiend");

      return (
        <button onClick={onClick} key={props.uniqueKey} className={classes}>
          {(item as Item)[props.displayKey]}
        </button>
      );
    }
    return <div></div>;
  };

  return (
    <div
      className={`dropdown-container 
      ${props.direction || "bottom"} 
      ${props.classes || ""}
      `}
      onClick={() => setDropdownState((state) => !state)}
    >
      <button className={`btn px-4 py-2 ${isDropdownOpen ? "flat" : ""}`}>
        {props.activeItemRenderer
          ? props.activeItemRenderer(currentValue)
          : currentValue}
      </button>
      <div className={`dropdown ${isDropdownOpen ? "active" : ""}`}>
        {filteredValues.map((item, index) => {
          return getDropdownElement(item, index);
        })}
      </div>
    </div>
  );
}
