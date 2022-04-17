import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Algorithm } from "../constants/app.constants";
import { ContextProviderProps } from "../interface/app.interface";

type AlgorithmContextType = [Algorithm, Dispatch<SetStateAction<Algorithm>>];

export const AlgorithmContext = createContext<AlgorithmContextType | null>(
  null
);

export const AlgorithmContextProvider = (props: ContextProviderProps) => {
  const [algorithm, setAlgorithm] = useState(Algorithm.DIJKSTRA);

  return (
    <AlgorithmContext.Provider value={[algorithm, setAlgorithm]}>
      {props.children}
    </AlgorithmContext.Provider>
  );
};
