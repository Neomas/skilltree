import React from "react";
import styles from "./AddNodeModal.module.scss";
import classNames from "classnames";

const AddNodeModal = ({
  open,
  nodes,
  addFn,
  setOpen,
  selectedNode,
  setSelectedNode,
}) => {
  const [label, setLabel] = React.useState("");

  console.log(selectedNode);
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

      <label htmlFor="label">label</label>
      <input type="text" onChange={(e) => setLabel(e.target.value)} />

      {}
      {/* {selectedNode && <pre>{JSON?.stringify(selectedNode, null, 2)}</pre>} */}
      <button
        onClick={() =>
          addFn({
            id: `${Math.ceil(Math.random() * 123)}_${label}`,
            data: { label: label },
            type: "custom",
          })
        }
      >
        Add
      </button>
    </div>
  );
};

export default AddNodeModal;
