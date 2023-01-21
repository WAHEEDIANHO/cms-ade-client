import {Link, useLocation, useParams} from "react-router-dom";

// import Navbar from "./components/Navbar";
import Home from "./views/Home";
import AddCriminal from "./views/AddCriminal";
import AddUser from "./views/AddUser";
import Criminals from "./views/Criminals";
import CriminalProfile from "./views/CriminalProfile";
import StaffReport from "./views/StaffReport";
import CriminalReport from "./views/CriminalReport";
import Staff from "./views/Staff";
import UserProfile from "./views/UserProfile";
// import Footer from "./components/Footer";
import ChangePassword from "./views/ChangePassword";
import About from "./views/About";

import "./css/layout.css"

function Layout({ api, email }) {
  const { pathname } = useLocation();
  const { id } = useParams();

  const render = () => {
    let page;
    switch (pathname) {
      case "/dashboard":
        page = <Home api={api} />;
        break;

      case "/dashboard/add-user":
        page = <AddUser title={"User"} api={api} />;
        break;

      // Criminal route
      case "/dashboard/add_criminal":
        page = <AddCriminal api={api} />;
        break;
      case "/dashboard/criminal":
        page = <Criminals api={api} />;
        break;
      case `/dashboard/criminal/${id}`:
        page = <CriminalProfile api={api} id={id} />;
        break;
      case "/dashboard/criminals_report":
        page = <CriminalReport api={api} />;
        break;

      // Staff route
      case "/dashboard/add-staff":
        page = <AddUser title={"Staff"} api={api} />;
        break;
      case "/dashboard/staff":
        page = <Staff api={api} />;
        break;
      case `/dashboard/user/${id}`:
        page = <UserProfile api={api} id={id} />;
        break;

      case "/dashboard/staff_report":
        page = <StaffReport api={api} />;
        break;

      case "/dashboard/change_password":
        page = <ChangePassword api={api} email={email} />;
        break;

      case "/about":
        page = <About api={api} email={email} />;
        break;

      default:
        page = (
          <h2 className="text-danger text-center">
            Oops!!! There is nothing here: 404!
          </h2>
        );
        break;
    }

    return page;
  };

  const showNavbar = (e, toggleId, navId, bodyId, headerId) => {
    // console.log("clicked")
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId);


    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      // console.log(headerpd, "/n", nav, "/n", bodypd, "/n", toggle )

      // show navbar
      nav.classList.toggle('show')
      // change icon
      toggle.classList.toggle('bx-x')
      // add padding to body
      bodypd.classList.toggle('body-pd')
      // add padding to header
      headerpd.classList.toggle('body-pd')
    }
  }

  //Link
  function colorLink(e) {
    // e.preventDefault()
    // e.stopPropagation()
    const linkColor = document.querySelectorAll('.nav_link')
    console.log(linkColor.length)
    if (linkColor) {
      linkColor.forEach(l => l.classList.remove('active'))
      e.currentTarget.classList.add('active')
    }
  }

  return (
    <section>
      <header className="header" id="header">
        <div className="header_toggle">
          <i className='bx bx-menu' id="header-toggle" onClick={(e) =>
              showNavbar(e,'header-toggle', 'nav-bar', 'body-pd', 'header')}>
          </i>
        </div>
        <div className="header_img"><img src="https://i.imgur.com/hczKIze.jpg" alt="" /></div>
      </header>
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <div>
            <Link href="/dashboard" className="nav_logo">
              <i className='bx bx-lock nav_logo-icon'></i>
              <span className="nav_logo-name">CRMS</span>
            </Link>
            <div className="nav_list">
              <Link to="/dashboard" className="nav_link active" onClick={colorLink}>
                <i className='bx bx-grid-alt nav_icon'></i>
                <span className="nav_name">Dashboard</span>
              </Link>
              <Link to="/about" className="nav_link" onClick={colorLink}>
                <i className='bx bx-user nav_icon'></i>
                <span className="nav_name">About</span>
              </Link>
              <Link to="/dashboard/add-staff" className="nav_link" onClick={colorLink}>
                <i className='bx bx-plus nav_icon'></i>
                <span className="nav_name">Add Staff</span>
              </Link>
              <Link to="/dashboard/add_criminal" className="nav_link" onClick={colorLink}>
                <i className='bx bx-plus nav_icon'></i>
                <span className="nav_name">Add criminal</span>
              </Link>
              <Link to="/dashboard/staff_report" className="nav_link" onClick={colorLink}>
                <i className='bx bx-folder nav_icon'></i>
                <span className="nav_name">Staffs</span>
              </Link>
              <Link to="/dashboard/criminals_report" className="nav_link" onClick={colorLink}>
                <i className='bx bx-folder nav_icon'></i>
                <span className="nav_name">Criminals</span>
              </Link>
              <Link to="/dashboard/change_password" className="nav_link" onClick={colorLink}>
                <i className='bx bx-reset nav_icon'></i>
                <span className="nav_name">Change Password</span>
              </Link>
            </div>
          </div>
          <Link to="/logout" className="nav_link" onClick={colorLink}>
            <i className='bx bx-log-out nav_icon'></i>
            <span className="nav_name">SignOut</span>
          </Link>
        </nav>
      </div>
      <div className="height-100 px-2 pt-4">
        {render()}
      </div>
    </section>
  );
}

export default Layout;
