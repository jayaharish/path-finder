import "./styles/ActionHeader.scss";

import { useContext } from "react";
import {
  AlgorithmActionContext,
  AlgorithmActionDispatchContext,
} from "../../context/AlgorithmActionContext";
import { Action } from "./Action";

export function ActionHeader() {
  const { addWall, addWeight, endNode, startNode } = useContext(
    AlgorithmActionContext
  );
  const dispatchActions = useContext(AlgorithmActionDispatchContext);
  console.log(dispatchActions);
  return (
    <div className="flex align-center action-header px-4 py-2 secondary-bg-400">
      <Action
        disabled
        isActive={startNode}
        onClick={() => dispatchActions?.setStartNode(!startNode)}
      >
        Start node
      </Action>
      <Action
        isActive={endNode}
        onClick={() => dispatchActions?.setEndNode(!endNode)}
      >
        End node
      </Action>
      <Action
        isActive={addWall}
        onClick={() => dispatchActions?.setAddWall(!addWall)}
      >
        Add Wall
      </Action>
      <Action
        isActive={addWeight}
        onClick={() => dispatchActions?.setAddWeight(!addWeight)}
      >
        Add Weight
      </Action>
    </div>
  );
}
