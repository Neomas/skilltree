import React from "react";
import "../styles/global.scss";

const RootLayout = ({
  children,
  params,
}: {
  children: React.ReactElement;
  params: { locale: string; slug: string[] };
}) => {
  return <>{children}</>;
};

export default RootLayout;
