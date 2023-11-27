"use client";
import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const edges = [
  {
    id: "test1-noed2",
    source: "test1",
    target: "noed2",
    label: "to the",
    type: "step",
  },
];

const nodes = [
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
  {
    id: "nopt21",
    data: { label: "World 2" },
    position: { x: 200, y: 150 },
  },
];

const FlowChart = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Controls />

        <Background color="blue" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
