import React from "react";
import styles from "./NodeModal.module.scss";
import classNames from "classnames";

const NodeModal = ({
  open,
  nodes,
  addFn,
  setOpen,
  selectedNode,
  setSelectedNode,
}) => {
  const [label, setLabel] = React.useState("test");

  console.log(selectedNode);
  return (
    <div className={classNames(styles.modal, open && styles.open)}>
      <div className={styles.header}>
        <h4>Your node</h4>

        <button
          className={styles.close}
          onClick={() => {
            setOpen(false);
            setSelectedNode(null);
          }}
        >
          X
        </button>
      </div>

      <label htmlFor="label">label</label>
      <input
        className={styles.input}
        type="text"
        onChange={(e) => setLabel(e.target.value)}
      />

      <button
        onClick={() => {
          addFn({
            id: `${Math.ceil(Math.random() * 123)}_${label}`,
            data: { label: label },
            type: "custom",
          });

          setOpen(false);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default NodeModal;
