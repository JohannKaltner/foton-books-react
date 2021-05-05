import React, { useEffect } from "react";
import "./index.css";
import { useHistory, useLocation } from "react-router-dom";
import { options, routes } from "../../services/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Nav() {
  let history = useHistory();
  let location = useLocation();
  const [active, setActive] = React.useState(1);
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    getNav();
  }, [location.pathname]);

  function handleClick(route) {
    setActive(route.id);
    history.push(route.route);
  }

  function getNav() {
    let route = location.pathname.split("/")[1];

    if (route === "details") {
      setItems(options);
    } else {
      setItems(routes);
    }
  }

  return (
    <footer className="footer">
      <div className="bar-container">
        {items &&
          items.map((menuNav) => {
            return (
              <div
                key={menuNav.id}
                onClick={() => handleClick(menuNav)}
                style={{
                  opacity: active === menuNav.id ? 1.0 : 0.5,
                }}
                className="menuButton"
              >
                <FontAwesomeIcon
                  className="icon"
                  icon={menuNav.icon}
                  key={menuNav.icon}
                />
                <span key={menuNav.routeName} className="link">
                  {menuNav.routeName}
                </span>
              </div>
            );
          })}
      </div>
    </footer>
  );
}

export default Nav;
