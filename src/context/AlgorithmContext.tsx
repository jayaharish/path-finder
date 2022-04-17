import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ALGORITHM } from "../constants/app.constants";
import { ContextProviderProps } from "../interface/app.interface";

type AlgorithmContextType = [ALGORITHM, Dispatch<SetStateAction<ALGORITHM>>];

export const AlgorithmContext = createContext<AlgorithmContextType | null>(
  null
);

export const AlgorithmContextProvider = (props: ContextProviderProps) => {
  const [algorithm, setAlgorithm] = useState(ALGORITHM.DIJKSTRA);

  return (
    <AlgorithmContext.Provider value={[algorithm, setAlgorithm]}>
      {props.children}
    </AlgorithmContext.Provider>
  );
};
