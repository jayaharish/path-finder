export enum ALGORITHM {
    DIJKSTRA = "Dijkstra",
    A_STAR = "A-Star",
    BELL_FORD = "Bell Ford"
}

export enum ALGORITH_ACTIONS {
    START_NODE = "Start node",
    END_NODE = "End node",
    ADD_WALL = "Add wall",
    ADD_WEIGHT = "Add Weight"
}

export type AlgorithmActionType = 'setStartNode' | 'setEndNode' | 'setAddWall' | 'setAddWeight'