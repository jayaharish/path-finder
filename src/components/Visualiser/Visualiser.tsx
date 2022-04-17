import { PathTable } from "../PathTable";
import "./styles/Visualiser.scss";

export function Visualiser() {
  return (
    <main className="visualiser flex flex-grow-1 align-center justify-center">
      <PathTable></PathTable>
    </main>
  );
}
