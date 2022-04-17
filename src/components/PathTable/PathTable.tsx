import { useContext, useEffect, useState } from "react";
import { DefaultTableItemProps } from "../../constants/table.constants";
import { AlgorithmActionContext } from "../../context/AlgorithmActionContext";
import { AlgorithmContext } from "../../context/AlgorithmContext";
import { createEmptyTable } from "../../helpers/table.helper";
import { TableCellProps } from "../../interface/table.interface";
import "./styles/PathTable.scss";
import { TableCell } from "./TableCell";

export function PathTable() {
  const rowCount = 30;
  const columnCount = 40;
  const itemSize = 20;

  const { addWall, addWeight, endNode, startNode } = useContext(
    AlgorithmActionContext
  );
  const algorithmContext = useContext(AlgorithmContext);
  const [tableItems, setTableItems] = useState<TableCellProps[][]>([[]]);

  const [algorithm] = algorithmContext || [];

  const onTableCellClick = (rowNumber: number, columnNumber: number) => {
    setTableItems((currentTableCells) => {
      currentTableCells[rowNumber][columnNumber];
      return currentTableCells;
    });
  };

  useEffect(() => {
    setTableItems(createEmptyTable(rowCount, columnCount));
  }, []);
  return (
    <div className="flex flex-column path-table">
      {tableItems.map((row, rowNumber) => {
        return (
          <div key={rowNumber} className="flex path-table-row">
            {row.map((cell, columnNumber) => {
              return (
                <TableCell
                  size={itemSize}
                  onClick={() => onTableCellClick(rowNumber, columnNumber)}
                  key={columnNumber}
                  {...cell}
                ></TableCell>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
