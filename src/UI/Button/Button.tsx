import { FC } from "react";
import s from "./Button.module.scss";
interface ButtonI {
  text: string;
  style: { border: number; background: string };
}

const Button: FC<ButtonI> = ({ text, style }) => {
  return (
    <button
      style={{ borderRadius: style.border, background: style.background }}
      className={s.btn}
    >
      {text}
    </button>
  );
};

export default Button;
