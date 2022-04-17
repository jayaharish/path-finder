import "./styles/Header.scss";

import { MdArrowDropDown } from "react-icons/md";
import React, { SetStateAction, useContext, useMemo } from "react";
import { Algorithm } from "../../constants/app.constants";
import { Dropdown } from "../Dropdown";
import { AlgorithmContext } from "../../context/AlgorithmContext";

export function Header() {
  const algorithmContext = useContext(AlgorithmContext);

  const [currentAlgorithm, setAlgorithm] = algorithmContext || [];

  const dropdownItems = useMemo(() => {
    return [Algorithm.DIJKSTRA, Algorithm.A_STAR, Algorithm.BELL_FORD];
  }, []);

  return (
    <header>
      <nav className="flex align-center px-4 primary-bg-400">
        <div className="flex align-center left-nav-items accent-400">
          <h2 className="brand">Path Finder</h2>
          <Dropdown
            classes="ml-4"
            currentValue={currentAlgorithm}
            values={dropdownItems}
            placeholder="Select"
            onValueChange={(item) => {
              (setAlgorithm as React.Dispatch<SetStateAction<Algorithm>>)(
                item as Algorithm
              );
            }}
            activeItemRenderer={(item) => {
              return (
                <div className="flex align-center">
                  <span>{item}</span>
                  <MdArrowDropDown size={18} />
                </div>
              );
            }}
          ></Dropdown>
        </div>
      </nav>
    </header>
  );
}
