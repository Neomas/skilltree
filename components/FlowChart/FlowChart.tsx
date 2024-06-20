"use client";
import Header from "@components/Header/Header";
import React from "react";
import { ChangeEventHandler, useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  OnConnect,
  useNodesState,
  useEdgesState,
  ColorMode,
  addEdge,
  Panel,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";

import CustomNode from "./CustomNode";
import "@xyflow/react/dist/style.css";
import styles from "./FlowChart.module.scss";
import Button from "@components/Atoms/Button/Button";
import AddNodeModal from "@components/Atoms/AddNodeModal/AddNodeModal";
import NodeModal from "@components/Atoms/NodeModal/NodeModal";

// const initialEdges: Edge[] = [
//   {
//     id: "test1-noed2",
//     source: "test1",
//     target: "noed2",
//     label: "to the",
//     type: "step",
//     animated: true,
//   },
// ];

const initialNodes: Node[] = [
  {
    id: "dfasjkl;fsdjkl;sadjfkl;",
    data: { label: "Hello", done: false },
    position: { x: 0, y: 0 },
    type: "custom",
  },
];

const nodeTypes = {
  custom: CustomNode,
};

const FlowChart = () => {
  const [colorMode, setColorMode] = useState<ColorMode>("system");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [open, setOpen] = useState(false);
  const [openNode, setOpenNode] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null | any>(null);
  const [positionX, setPositionX] = useState(0);

  const addNode = (node) => {
    const newNode = {
      ...node,
      position: { x: positionX, y: 0 },
    };

    // setPositionX(positionX + 200);
    //@ts-ignore
    setNodes([...nodes, newNode]);
  };
  const addSpecificNode = (node) => {
    const newNode = {
      ...node,
      position: { x: positionX + 200, y: 0 },
    };

    setPositionX(positionX + 200);
    //@ts-ignore
    setNodes([...nodes, newNode]);
  };

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onChange: ChangeEventHandler<HTMLSelectElement> = (evt) =>
    setColorMode(evt.target.value as ColorMode);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header
        title={colorMode}
        addNode={() => {
          setOpen(true);
        }}
        edges={edges}
        setEdges={setEdges}
        setNodes={setNodes}
        nodes={nodes}
      />
      <AddNodeModal
        open={open}
        nodes={nodes}
        addFn={addNode}
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        setOpen={setOpen}
      />
      <NodeModal
        open={openNode}
        nodes={nodes}
        addFn={addNode}
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        setOpen={setOpenNode}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={(e) => {
          e.preventDefault();
          // setOpenNode(true);
        }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        colorMode={colorMode}
        fitView
        width={700}
        height={400}
      >
        <Controls />
        {/* <Panel position="bottom-right">
          <div className={styles.itemWrapper}>
            <label className={styles.label}>Color Mode:</label>
            <select onChange={onChange} data-testid="colormode-select">
              <option value="dark">dark</option>
              <option value="light">light</option>
              <option value="system">system</option>
            </select>
          </div>
        </Panel> */}
        <Background color="blue" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
