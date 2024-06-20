"use client";
import { memo, type FC, type CSSProperties, useEffect } from "react";
import {
  Handle,
  NodeToolbar,
  Position,
  useNodes,
  useNodesState,
  useReactFlow,
  type NodeProps,
} from "@xyflow/react";
import styles from "./CustomNode.module.scss";
import Button from "@components/Atoms/Button/Button";
import classNames from "classnames";
import React from "react";
const sourceHandleStyleA: CSSProperties = { left: 50 };
const sourceHandleStyleB: CSSProperties = {
  right: 0,
  left: "auto",
};

const CustomNode: FC<NodeProps> = ({
  data,
  positionAbsoluteX,
  positionAbsoluteY,
  ...props
}) => {
  const [label, setLabel] = React.useState(data.label);
  const [done, setDone] = React.useState(data.done);
  const reactFlow = useReactFlow();
  const nodes = reactFlow.getNodes();

  const setNewNodes = ({ newLabel, done }) => {
    const newNodes = nodes.flatMap((node) => {
      if (node.id === props.id) {
        return { ...node, data: { label: newLabel, done } };
      }
      return node;
    });

    reactFlow.setNodes(newNodes);
  };

  useEffect(() => {
    setNewNodes({ newLabel: label, done: done });
  }, [label, done]);

  return (
    <div className={classNames(styles.customNode, done && styles.checked)}>
      <Handle type="target" position={Position.Top} />
      <div>
        <div>
          <input
            className={styles.input}
            //@ts-ignore
            value={label}
            onChange={(e) => {
              e.preventDefault();
              setLabel(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        className={classNames(styles.checkButton, done && styles.checked)}
        onClick={() => {
          setDone(!done);
        }}
      >
        <svg viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.5107 0.902161L15.6086 0L5.68506 9.92377L1.17407 5.41284L0.271973 6.315L5.68506 11.7279L16.5107 0.902161Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={sourceHandleStyleA}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={sourceHandleStyleB}
      />
      <Handle type="target" position={Position.Left} id="c" />

      <Button
        className={classNames(styles.button, styles.buttonTopRight)}
        onClick={(e:any) => {
          e.preventDefault();
          const newNode = {
            id: `${Math.ceil(Math.random() * 1230)}_8${label}`,
            data: { label: "" },
            parent: props.id,
            position: {
              x:
                positionAbsoluteX +
                16 +
                nodes.filter((item) => item.id === props.id)?.[0]?.measured
                  ?.width,
              y: positionAbsoluteY,
            },
            type: "custom",
          };
          reactFlow.setNodes([...nodes, newNode]);
        }}
      >
        +
      </Button>
    </div>
  );
};

export default memo(CustomNode);
