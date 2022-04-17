export enum Algorithm {
    DIJKSTRA = "Dijkstra",
    A_STAR = "A-Star",
    BELL_FORD = "Bell Ford"
}

export enum AlgorithmActions {
    START_NODE = "Start node",
    END_NODE = "End node",
    ADD_WALL = "Add wall",
    ADD_WEIGHT = "Add Weight"
}

export enum TableCellEventType {
    CLICK, MOUSE_OVER, MOUSE_DOWN, MOUSE_UP
}

export type AlgorithmActionType = 'setStartNode' | 'setEndNode' | 'setAddWall' | 'setAddWeight' | 'changeWallWeight' | 'clearNode';