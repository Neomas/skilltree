"use client";

import FlowChart from "@components/FlowChart/FlowChart";
import Header from "@components/Header/Header";
import React from "react";
import { ReactFlowProvider, useNodes } from "reactflow";

const page = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <FlowChart />
      </ReactFlowProvider>
    </div>
  );
};

export default page;
