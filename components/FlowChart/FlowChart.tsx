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

const initialEdges: Edge[] = [
  {
    id: "test1-noed2",
    source: "test1",
    target: "noed2",
    label: "to the",
    type: "step",
    animated: true,
  },
];

const initialNodes: Node[] = [
  {
    id: "test1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "noed2",
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
];

const nodeTypes = {
  custom: CustomNode,
};

const FlowChart = () => {
  const [colorMode, setColorMode] = useState<ColorMode>("dark");
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onChange: ChangeEventHandler<HTMLSelectElement> = (evt) =>
    setColorMode(evt.target.value as ColorMode);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header title={colorMode} />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        colorMode={colorMode}
        fitView
        width={700}
        height={400}
      >
        {/* <Controls /> */}
        <Panel position="bottom-right">
          <select onChange={onChange} data-testid="colormode-select">
            <option value="dark">dark</option>
            <option value="light">light</option>
            <option value="system">system</option>
          </select>
        </Panel>
        <Background color="blue" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
