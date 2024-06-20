import React from "react";
import styles from "./Header.module.scss";
import Button from "@components/Atoms/Button/Button";

const Header = ({ title, addNode, nodes, setNodes, edges, setEdges }) => {
  const newNode = {
    id: `${Math.ceil(Math.random() * 123)}_node`,
    data: { label: "", done: false },
    type: "custom",
  };

  const exportNodesAndEdges = () => {
    const data = {
      nodes,
      edges,
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nodes.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importNodesAndEdges = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result.toString();
      const parsedData = JSON.parse(contents);
      setNodes(parsedData.nodes);
      setEdges(parsedData.edges);
    };
    reader.readAsText(file);
  };

  return (
    <nav className={styles.nav}>
      <Button
        onClick={() => {
          addNode(newNode);
        }}
        className={styles.addNodeButton}
        >
        Add Node
      </Button>
      <div className={styles.export}>
        <Button
        className={styles.exportButton}
          onClick={() => {
            exportNodesAndEdges();
          }}
        >
          Export
        </Button>
        <label htmlFor="import-button" className={styles.importButton}>
          Import
          <input
            id="import-button"
            type="file"
            className={styles.importInput}
            onChange={(event) => {
              importNodesAndEdges(event);
            }}
          />
        </label>
      </div>
    </nav>
  );
};

export default Header;
