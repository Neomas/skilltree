import React from "react";
import "../styles/global.scss";

const RootLayout = ({
  children,
  params,
}: {
  children: React.ReactElement;
  params: { locale: string; slug: string[] };
}) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
