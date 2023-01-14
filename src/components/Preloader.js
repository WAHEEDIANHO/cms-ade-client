import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Preloader() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      setTimeout(() => {
        document.querySelector(".preloader").style.transform =
          "translateY(-100%)";
      }, 10000);
    }
  });

  if (pathname !== "/") return null;
  return (
    <div className="preloader" >
      <div className="overlay"></div>
      <h1 className="text-center mb-4 text-white">
        Design and Implementation of <em>Crime Management System</em>
      </h1>
        <h3 className={"text-white"}>A case study of The Nigeria Police Force, Ede North LG</h3>
      <h4 className="text-center">
        Design By:{" "}
        <strong className="text-muted ">Mudashir Ridwan Ademola</strong>
      </h4>
      <h3 className="mt-3 text-white text-center">HC20200206048</h3>

      <h4 className="mt-3">Supervised By</h4>
      <h3 className="text-white">Mr. Chris</h3>
    </div>
  );
}

export default Preloader;
