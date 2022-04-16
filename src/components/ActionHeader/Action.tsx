import "./styles/Action.scss";

interface ActionItemProps {
  children?: React.ReactNode;
  isActive: boolean;
  classes?: string;
  onClick: Function;
  disabled?: boolean;
}

export function Action(props: ActionItemProps) {
  const classes = props.classes || "";
  return (
    <div
      onClick={() => !props.disabled && props.onClick()}
      className={`action-item px-2 py-1 ${
        props.isActive ? "active" : ""
      } ${classes} ${props.disabled ? "disabled" : ""}`}
    >
      {props.children}
    </div>
  );
}
