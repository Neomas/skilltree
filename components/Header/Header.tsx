import React from "react";
import styles from "./Header.module.scss";

const Header = ({ title }) => {
  return (
    <nav className={styles.nav}>
      <label>{title}</label>
    </nav>
  );
};

export default Header;
