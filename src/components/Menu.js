// import { useState } from "react";
import { Link } from "react-router-dom";

function Menu() {
  // const [token, setToken] = useState(() =>
  // sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ""
  // );

  const menu = [
    { title: "HOME", path: "/dashboard" },
    { title: "ABOUT", path: "/about" },
    {
      title: "OPERATION",
      path: "#",
      role: [
        {
          title: "STAFF",
          path: "#",
          isInnerRole: true,
          inner_role: [
            { title: "ADD STAFF", path: "/dashboard/add-staff" },
            { title: "STAFF", path: "/dashboard/staff" },
          ],
        },
        {
          title: "CRIMINALS",
          path: "#",
          isInnerRole: true,
          inner_role: [
            { title: "ADD CRIMINAL", path: "/dashboard/add_criminal" },
            { title: "CRIMINALS", path: "/dashboard/criminal" },
          ], 
        },
      ],
    },
    {
      title: "REPORT",
      role: [
        { title: "STAFF", path: "/dashboard/staff_report" },
        { title: "CRIMINALS", path: "/dashboard/criminals_report" },
      ],
    },
    {
      title: sessionStorage.getItem("cms_token") ? "LOGOUT" : "LOGIN",
      path: sessionStorage.getItem("cms_token") ? "/logout" : "/",
    },
    { title: "CHANGE PASSWORD", path: "/dashboard/change_password" },
  ];

  const getDisplayMenu = (menuType) => {
    return menuType.map((el, i) => {
      if (el.role) {
        return (
          <li className="nav-item dropdown" key={i}>
            <Link
              className="nav-link dropdown-toggle"
              to={"#"}
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {el.title}
            </Link>
            <ul className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
              {el.role.map((el, i) => (
                <li className="dropdown-item" key={i}>
                  <Link className="nav-link" to={el.path}>
                    {el.title}
                  </Link>
                  {el.isInnerRole ? (
                    <ul
                      className="dropdown-menu dropdown-submenu bg-dark"
                      aria-labelledby="navbarDropdown"
                    >
                      {el.inner_role.map((el, i) => (
                        <li className="dropdown-item" key={i}>
                          <Link to={el.path} className="nav-link">
                            {el.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </li>
        );
      } else {
        return (
          <li className="nav-item" key={i}>
            <Link to={el.path} className="nav-link active" aria-current="page">
              {el.title}
            </Link>
          </li>
        );
      }
    });
  };

  const navigation = (_) => getDisplayMenu(menu);

  return <ul className="navbar-nav me-auto mb-2 mb-lg-0">{navigation()}</ul>;
}

export default Menu;
