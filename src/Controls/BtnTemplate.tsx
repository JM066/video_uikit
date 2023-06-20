import React, { useContext } from "react";
import PropsContext from "../PropsContext";
import Icons from "./Icons";
interface BtnTemplateInterface {
  name: string;
  color?: string;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const BtnTemplate = (props: BtnTemplateInterface) => {
  const { onClick, name, disabled, style } = props;

  return (
    <div
      style={{
        ...{
          width: 100,
          height: 100,
        },
      }}
      onClick={onClick}
    >
      <button>{name}</button>
    </div>
  );
};

export default BtnTemplate;
