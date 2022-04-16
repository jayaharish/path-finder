import "./styles/Header.scss";

import { MdArrowDropDown } from "react-icons/md";
import React, { SetStateAction, useContext, useMemo } from "react";
import { ALGORITHM } from "../../constants/app.constants";
import { Dropdown } from "../Dropdown";
import { AlgorithmContext } from "../../context/AlgorithmContext";

export function Header() {
  const [currentAlgorithm, setAlgorithm] = useContext(AlgorithmContext);
  const dropdownItems = useMemo(() => {
    return [ALGORITHM.DIJKSTRA, ALGORITHM.A_STAR, ALGORITHM.BELL_FORD];
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
              (setAlgorithm as React.Dispatch<SetStateAction<ALGORITHM>>)(
                item as ALGORITHM
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
