import React from "react";
import styles from "./AddNodeModal.module.scss";
import classNames from "classnames";
import Button from "../Button/Button";

const AddNodeModal = ({
  open,
  nodes,
  addFn,
  setOpen,
  selectedNode,
  setSelectedNode,
}) => {
  const [label, setLabel] = React.useState("");

  return (
    <div className={classNames(styles.modal, open && styles.open)}>
      <div className={styles.header}>
        <h4>Add a new Node</h4>

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
      <div className={styles.modalContent}>
        <label htmlFor="label">Name</label>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>

      <Button
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
      </Button>
    </div>
  );
};

export default AddNodeModal;
