import { useLocation, useParams } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./views/Home";
import AddCriminal from "./views/AddCriminal";
import AddUser from "./views/AddUser";
import Criminals from "./views/Criminals";
import CriminalProfile from "./views/CriminalProfile";
import StaffReport from "./views/StaffReport";
import CriminalReport from "./views/CriminalReport";
import Staff from "./views/Staff";
import UserProfile from "./views/UserProfile";
import Footer from "./components/Footer";
import ChangePassword from "./views/ChangePassword";
import About from "./views/About";

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

  return (
    <>
      <div className="section pb-5">
        <Navbar />
        {render()}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
