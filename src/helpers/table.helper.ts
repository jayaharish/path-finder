import { DefaultTableItemProps } from "../constants/table.constants";
import { AlgorithmActionContextType } from "../context/AlgorithmActionContext";
import { TableCellProps } from "../interface/table.interface";

export function createEmptyTable(rowCount: number, columnCount: number) {
    return Array(rowCount)
        .fill(0)
        .map((_) =>
            Array(columnCount)
                .fill({ ...DefaultTableItemProps })
        )
}

export function getNewTableCellProps(cellProps: TableCellProps, currentActions: AlgorithmActionContextType) {
    const result = { ...DefaultTableItemProps };
    if (currentActions.addWall) {
        result.weight = cellProps.weight === Infinity ? 0 : Infinity;
    } else if (currentActions.addWeight) {
        result.weight = currentActions.wallWeight;
    } else if (currentActions.startNode) {
        result.isStartNode = !cellProps.isStartNode;
    } else if (currentActions.endNode) {
        result.isEndNode = !cellProps.isEndNode;
    }
    return result;
}

export function copyTable(table: TableCellProps[][]): TableCellProps[][] {
    return table.map(row => row.map(cell => ({ ...cell })));
}