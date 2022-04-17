import "./styles/TableCell.scss";

import { TableCellProps } from "../../interface/table.interface";
import { DefaultTableCellSize } from "../../constants/table.constants";

interface TableCellComponentProps extends TableCellProps {
  size?: number;
  onClick: () => void;
}

export function TableCell(props: TableCellComponentProps) {
  const size = (props.size || DefaultTableCellSize) + "px";
  let classes = "";
  if (props.isEndNode) classes = "end";
  else if (props.isStartNode) classes = "start";
  else if (props.weight === Infinity) classes = "wall";
  else if (props.isPath) classes = "path";
  else if (props.isVisited) classes = "visited";
  if (props.isStartNode) classes;
  return (
    <div
      onClick={() => props.onClick()}
      style={{ width: size, height: size }}
      className={`table-cell ${classes}`}
    >
      {!!props.weight && props.weight}
    </div>
  );
}
