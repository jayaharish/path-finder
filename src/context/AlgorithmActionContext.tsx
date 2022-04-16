import { createContext, useMemo, useReducer } from "react";
import {
  AlgorithmActionType,
  ALGORITH_ACTIONS,
} from "../constants/app.constants";
import { ContextProviderProps } from "../interface/app.interface";

type AlgorithmActionContextType = {
  startNode: boolean;
  endNode: boolean;
  addWall: boolean;
  addWeight: boolean;
};
type AlgorithmActionDispatchContextType = {
  setStartNode: (value: boolean) => void;
  setEndNode: (value: boolean) => void;
  setAddWall: (value: boolean) => void;
  setAddWeight: (value: boolean) => void;
};
type AlgorithmReducerActionType = {
  type: AlgorithmActionType;
  value: boolean;
};

const initialState = {
  startNode: false,
  endNode: false,
  addWall: false,
  addWeight: false,
};

export const AlgorithmActionContext =
  createContext<AlgorithmActionContextType>(initialState);
export const AlgorithmActionDispatchContext =
  createContext<AlgorithmActionDispatchContextType | null>(null);

const reducer = (
  state: AlgorithmActionContextType,
  action: AlgorithmReducerActionType
) => {
  switch (action.type) {
    case "setStartNode":
      return {
        ...initialState,
        startNode: action.value,
      };
    case "setEndNode":
      return { ...initialState, endNode: action.value };
    case "setAddWall":
      return { ...initialState, addWall: action.value };
    case "setAddWeight":
      return { ...initialState, addWeight: action.value };
  }
};

export const AlgorithmActionContextProvider = (props: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => {
    return {
      setStartNode: (value: boolean) => {
        dispatch({ type: "setStartNode", value });
      },
      setEndNode: (value: boolean) => {
        dispatch({ type: "setEndNode", value });
      },
      setAddWall: (value: boolean) => {
        dispatch({ type: "setAddWall", value });
      },
      setAddWeight: (value: boolean) => {
        dispatch({ type: "setAddWeight", value });
      },
    };
  }, [dispatch]);

  return (
    <AlgorithmActionDispatchContext.Provider value={actions}>
      <AlgorithmActionContext.Provider value={state}>
        {props.children}
      </AlgorithmActionContext.Provider>
    </AlgorithmActionDispatchContext.Provider>
  );
};
