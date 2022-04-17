import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { TableCellEventType } from "../../constants/app.constants";
import { DefaultTableItemProps } from "../../constants/table.constants";
import { AlgorithmActionContext } from "../../context/AlgorithmActionContext";
import { AlgorithmContext } from "../../context/AlgorithmContext";
import {
  copyTable,
  createEmptyTable,
  getNewTableCellProps,
} from "../../helpers/table.helper";
import { TableCellProps } from "../../interface/table.interface";
import "./styles/PathTable.scss";
import { TableCell } from "./TableCell";

export function PathTable() {
  const rowCount = 30;
  const columnCount = 40;
  const itemSize = 20;

  const algorithmActions = useContext(AlgorithmActionContext);
  const algorithmContext = useContext(AlgorithmContext);
  const [tableItems, setTableItems] = useState<TableCellProps[][]>(
    createEmptyTable(rowCount, columnCount)
  );

  const currentStartNode = useRef<[number, number]>([-1, -1]);
  const currentEndNode = useRef<[number, number]>([-1, -1]);
  const currentMouseDownStatus = useRef<boolean>(false);

  const [algorithm] = algorithmContext || [];

  const canOperateOnTableCell = useMemo(() => {
    return (
      algorithmActions.addWall ||
      algorithmActions.addWeight ||
      algorithmActions.clearNode ||
      algorithmActions.endNode ||
      algorithmActions.startNode
    );
  }, [algorithmActions]);

  const changeMouseDownStatus = (status: boolean) => {
    if (status) {
      if (!canOperateOnTableCell) return;
    }
    currentMouseDownStatus.current = status;
  };

  const onMouseDown = (rowNumber: number, columnNumber: number) => {
    if (algorithmActions.startNode || algorithmActions.endNode) return;
    currentMouseDownStatus.current = true;
    onTableCellClick(rowNumber, columnNumber);
  };
  const onMouseUp = (rowNumber: number, columnNumber: number) => {
    if (algorithmActions.startNode || algorithmActions.endNode) return;
    if (!currentMouseDownStatus.current) return;
    currentMouseDownStatus.current = false;
  };
  const onMouseOver = (rowNumber: number, columnNumber: number) => {
    if (algorithmActions.startNode || algorithmActions.endNode) return;
    if (!currentMouseDownStatus.current) return;
    onTableCellClick(rowNumber, columnNumber);
  };
  const onMouseClick = (rowNumber: number, columnNumber: number) => {
    if (
      algorithmActions.addWall ||
      algorithmActions.addWeight ||
      algorithmActions.clearNode
    )
      return;
    onTableCellClick(rowNumber, columnNumber);
  };

  const onTableCellClick = (rowNumber: number, columnNumber: number) => {
    const focusedCellProps = tableItems[rowNumber][columnNumber];
    const newTableCellProps = getNewTableCellProps(
      focusedCellProps,
      algorithmActions
    );
    const newTableCells = copyTable(tableItems);

    if (algorithmActions.startNode) {
      const [startRowNumber, startColumnNumber] = currentStartNode.current;
      if (startRowNumber !== -1 && startColumnNumber !== -1) {
        newTableCells[startRowNumber][startColumnNumber].isStartNode = false;
      }
      currentStartNode.current = [rowNumber, columnNumber];
    }

    if (algorithmActions.endNode) {
      const [endRowNumber, endColumnNumber] = currentEndNode.current;
      if (endRowNumber !== -1 && endColumnNumber !== -1) {
        newTableCells[endRowNumber][endColumnNumber].isEndNode = false;
      }
      currentEndNode.current = [rowNumber, columnNumber];
    }

    newTableCells[rowNumber][columnNumber] = newTableCellProps;
    setTableItems(newTableCells);
  };

  const onTableCellEvent = (
    eventType: TableCellEventType,
    rowNumber: number,
    columnNumber: number
  ) => {
    if (!canOperateOnTableCell) return;
    switch (eventType) {
      case TableCellEventType.CLICK:
        return onMouseClick(rowNumber, columnNumber);
      case TableCellEventType.MOUSE_DOWN:
        return onMouseDown(rowNumber, columnNumber);
      case TableCellEventType.MOUSE_UP:
        return onMouseUp(rowNumber, columnNumber);
      case TableCellEventType.MOUSE_OVER:
        return onMouseOver(rowNumber, columnNumber);
    }
  };

  return (
    <div
      onMouseUp={() => changeMouseDownStatus(false)}
      className="flex flex-column path-table"
    >
      {tableItems.map((row, rowNumber) => {
        return (
          <div key={rowNumber} className="flex path-table-row">
            {row.map((cell, columnNumber) => {
              return (
                <TableCell
                  size={itemSize}
                  onTableCellEvent={(eventType) =>
                    onTableCellEvent(eventType, rowNumber, columnNumber)
                  }
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
