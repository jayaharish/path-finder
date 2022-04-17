import { DefaultTableItemProps } from "../constants/table.constants";
import { AlgorithmActionContextType } from "../context/AlgorithmActionContext";
import { TableCellProps } from "../interface/table.interface";

export function createEmptyTable(rowCount: number, columnCount: number) {
    return Array(rowCount)
        .fill(0)
        .map((_) =>
            Array(columnCount)
                .fill(DefaultTableItemProps)
        )
}

export function getNewTableCellProps(cellProps: TableCellProps, currentActions: AlgorithmActionContextType) {
    const result = DefaultTableItemProps;
    if (currentActions.addWall) {
        result.weight = Infinity;
    }
    return result;
}