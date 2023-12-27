import React, { useState } from "react";
import { FaBars, FaRegChartBar } from "react-icons/fa";
import { RiEyeLine, RiCursorLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/consultation",
      name: "Consultation",
      icon: <RiEyeLine />,
    },
    {
      path: "/modification",
      name: "Gestion",
      icon: <RiCursorLine />,
    },
    {
      path: "/statistique",
      name: "Statistiques",
      icon: <FaRegChartBar />,
    },
  ];
  return (
    <div
      style={{ marginLeft: "0px", paddingLeft: "0px" }}
      className="container"
    >
      <div style={{ width: isOpen ? "400px" : "50px" }} className="sidebar">
        <div className="top_section">
          <div style={{ marginLeft: "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
