import "./styles/Action.scss";

interface ActionItemProps {
  children?: React.ReactNode;
  isActive: boolean;
  classes?: string;
  onClick: Function;
}

export function Action(props: ActionItemProps) {
  const classes = props.classes || "";
  return (
    <div
      onClick={() => props.onClick()}
      className={`action-item px-2 py-1 ${
        props.isActive ? "active" : ""
      } ${classes}`}
    >
      {props.children}
    </div>
  );
}
