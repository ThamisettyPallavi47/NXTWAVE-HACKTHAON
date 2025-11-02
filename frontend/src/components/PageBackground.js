import React from "react";
import "../styles/PageBackground.css";

export default function PageBackground({ role, children }) {
  return (
    <div className={`page-background ${role}-bg`}>
      {children}
    </div>
  );
}
