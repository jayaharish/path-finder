import {
  createContext,
  Dispatch,
  Reducer,
  ReducerAction,
  useMemo,
  useReducer,
} from "react";
import {
  AlgorithmActionType,
  ALGORITH_ACTIONS,
} from "../constants/app.constants";
import { ContextProviderProps } from "../interface/app.interface";

export type AlgorithmActionContextType = {
  startNode: boolean;
  endNode: boolean;
  addWall: boolean;
  addWeight: boolean;
  wallWeight: number;
};
export type AlgorithmActionDispatchContextType = {
  setStartNode: (value: boolean) => void;
  setEndNode: (value: boolean) => void;
  setAddWall: (value: boolean) => void;
  setAddWeight: (value: boolean) => void;
  changeWallWeight: (value: number) => void;
};
type AlgorithmReducerActionType = {
  type: AlgorithmActionType;
  value: boolean | number;
};

const initialState: AlgorithmActionContextType = {
  startNode: false,
  endNode: false,
  addWall: false,
  addWeight: false,
  wallWeight: 0,
};

export const AlgorithmActionContext =
  createContext<AlgorithmActionContextType>(initialState);
export const AlgorithmActionDispatchContext =
  createContext<AlgorithmActionDispatchContextType | null>(null);

type ReducerType = (
  state: AlgorithmActionContextType,
  action: AlgorithmReducerActionType
) => AlgorithmActionContextType;

const reducer = (
  state: AlgorithmActionContextType,
  action: AlgorithmReducerActionType
) => {
  switch (action.type) {
    case "setStartNode":
      return {
        ...initialState,
        startNode: action.value as boolean,
      };
    case "setEndNode":
      return { ...initialState, endNode: action.value as boolean };
    case "setAddWall":
      return { ...initialState, addWall: action.value as boolean };
    case "setAddWeight":
      return { ...initialState, addWeight: action.value as boolean };
    case "changeWallWeight":
      return { ...initialState, wallWeight: action.value as number };
    default:
      return state;
  }
};

export const AlgorithmActionContextProvider = (props: ContextProviderProps) => {
  const [state, dispatch] = useReducer<ReducerType>(reducer, initialState);

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
      changeWallWeight: (value: number) => {
        dispatch({ type: "changeWallWeight", value });
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
