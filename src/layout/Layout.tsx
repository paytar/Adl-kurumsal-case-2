import type { ReactNode } from "react";
import "../styles/layout.scss";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isDesktop = useMediaQuery("(min-width:1366px)");

  return (
    <div className="layout">
      <Sidebar />
      <div
        className="layout-content"
        style={{
          marginLeft: isDesktop ? 240 : 0,
          transition: "margin-left 0.3s",
        }}
      >
        <main className="layout-main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
