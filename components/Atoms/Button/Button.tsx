import React, { ReactNode } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
const Button = ({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button className={classNames(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
