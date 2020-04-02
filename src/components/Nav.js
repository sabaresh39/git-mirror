import React from "react";
import { navTabs, navMap } from "./config";

const Nav = ({ counts, activeTab, changeTab }) => {
  return (
    <nav>
      {navTabs.length &&
        navTabs.map((tabName, index) => (
          <div
            className={tabName === activeTab ? "tab active" : "tab"}
            key={index}
            onClick={() => changeTab(tabName)}
          >
            {tabName}
            {tabName !== "Overview" && <span>{counts[navMap[tabName]]}</span>}
          </div>
        ))}
    </nav>
  );
};

export default Nav;
