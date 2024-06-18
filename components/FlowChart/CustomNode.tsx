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
  const reactFlow = useReactFlow();
  const nodes = reactFlow.getNodes();

  console.log({ reactFlow });

  const setNewNodes = (newLabel) => {
    const newNodes = nodes.flatMap((node) => {
      if (node.id === props.id) {
        return { ...node, data: { label: newLabel } };
      }
      return node;
    });

    reactFlow.setNodes(newNodes);
  };

  useEffect(() => {
    console.log({ reactFlow });
    console.log({ nodes });
  }, [label]);

  return (
    <div className={styles.customNode}>
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
              setNewNodes(e.target.value);
            }}
          />
        </div>

        {/* <NodeToolbar
          isVisible={data.toolbarVisible}
          position={data.toolbarPosition}
        >
          <Button
            onClick={() => {
              reactFlow.deleteElements({ id: props.id });
            }}
          >
            delete
          </Button>
          <button>copy</button>
          <button>expand</button>
        </NodeToolbar> */}

        {/* <div>
          Position:{" "}
          <strong>
            {positionAbsoluteX.toFixed(2)},{positionAbsoluteY.toFixed(2)}
          </strong>
        </div> */}
      </div>

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
      <Handle type="source" position={Position.Left} id="c" />

      <Button
        className={classNames(styles.button, styles.buttonRight)}
        onClick={() => {
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
      <Button
        className={classNames(styles.button, styles.buttonLeft)}
        onClick={() => {
          const newNode = {
            id: `${Math.ceil(Math.random() * 98)}_${label}`,
            data: { label: "" },
            parent: props.id,
            position: {
              x:
                positionAbsoluteX -
                16 -
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
      <Button
        className={classNames(styles.button, styles.buttonTop)}
        onClick={() => {
          const newNode = {
            id: `${Math.ceil(Math.random() * 567)}_${label}`,
            data: { label: "" },
            parent: props.id,
            position: {
              x: positionAbsoluteX,
              y:
                positionAbsoluteY -
                16 -
                nodes.filter((item) => item.id === props.id)?.[0]?.measured
                  ?.height,
            },
            type: "custom",
          };
          reactFlow.setNodes([...nodes, newNode]);
        }}
      >
        +
      </Button>
      <Button
        className={classNames(styles.button, styles.buttonBottom)}
        onClick={() => {
          const newNode = {
            id: `${Math.ceil(Math.random() * 12323)}_${label}`,
            data: { label: "" },
            parent: props.id,
            position: {
              x: positionAbsoluteX,
              y:
                positionAbsoluteY +
                16 +
                nodes.filter((item) => item.id === props.id)?.[0]?.measured
                  ?.height,
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
