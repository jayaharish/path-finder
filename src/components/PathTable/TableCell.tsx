import "./styles/TableCell.scss";

import { TableCellProps } from "../../interface/table.interface";
import { DefaultTableCellSize } from "../../constants/table.constants";
import { TableCellEventType } from "../../constants/app.constants";

import _ from "lodash";

interface TableCellComponentProps extends TableCellProps {
  size?: number;
  onTableCellEvent: (eventType: TableCellEventType) => void;
}

export function TableCell(props: TableCellComponentProps) {
  const size = (props.size || DefaultTableCellSize) + "px";
  let classes = "";
  if (props.isEndNode) classes = "end";
  else if (props.isStartNode) classes = "start";
  else if (props.weight === Infinity) classes = "wall";
  else if (props.isPath) classes = "path";
  else if (props.isVisited) classes = "visited";

  const onTableCellEvent = _.debounce((eventType: TableCellEventType) => {
    props.onTableCellEvent(eventType);
  }, 10);

  return (
    <div
      onClick={() => onTableCellEvent(TableCellEventType.CLICK)}
      onMouseOver={() => onTableCellEvent(TableCellEventType.MOUSE_OVER)}
      onMouseDown={() => onTableCellEvent(TableCellEventType.MOUSE_DOWN)}
      style={{ width: size, height: size }}
      className={`table-cell ${classes}`}
    >
      {!!props.weight && props.weight !== Infinity && props.weight}
    </div>
  );
}
