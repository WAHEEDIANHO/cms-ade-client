import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "../css/login.css";
function Login({ api, setUser }) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [iserror, setIserror] = useState(false);

  useEffect((_) => {
    if (pathname === "/logout" && sessionStorage.getItem("cms_token")) {
      sessionStorage.clear();
      return navigate("/");
    } else if (pathname === "/logout" && !sessionStorage.getItem("cms_token"))
      return navigate("/");

    if (sessionStorage.getItem("cms_token") && pathname === "/")
      return navigate("/dashboard");
  });

  const submit = async (e) => {
    e.preventDefault();

    // validation

    if (login.username === "") {
      document.querySelector("#username").classList.add("error");
      return;
    } else if (login.password === "") {
      document.querySelector("#password").classList.add("error");
      return;
    }

    try {
      let res = await axios.post(`${api}/user/login`, login);
      res = await res.data;
      sessionStorage.setItem("cms_token", res.token);
      sessionStorage.setItem("cms_id", res._id);
      setUser(true, res._id);
    } catch (err) {
      setLogin({ username: "", password: "" });
      setIserror(true);
    }

    if (sessionStorage.getItem("cms_token")) {
      return navigate("/dashboard");
    }
  };

  return (

      <>
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{borderRadius: "1rem"}}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img src="https://images.unsplash.com/photo-1618425978222-3a0490ee522c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                           alt="login form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}}/>
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">

                        <form method="post" onSubmit={submit}>

                          <div className="d-flex align-items-center mb-3 pb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor"
                                 className="bi bi-building-fill-lock" viewBox="0 0 16 16">
                              <path
                                  d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.764a3 3 0 0 0-4.989 2.497 2.01 2.01 0 0 0-.743.739H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1V1Zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Z"/>
                              <path
                                  d="M9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z"/>
                            </svg>
                            <span className="h1 fw-bold mb-0 ml-2">CRMS</span>
                          </div>

                          <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h5>
                          {iserror ? (
                                        <h5 className="fw-normal mb-3 pb-3 text-danger">
                                          Invalid credential
                                        </h5>
                                      ) : null}
                          <div className="form-outline mb-4">
                            <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  id="username"
                                  name="username"
                                  placeholder="Username"
                                  onChange={(e) => {
                                    setLogin({ ...login, username: e.target.value });
                                    e.target.classList.remove("error");
                                  }}
                                  value={login.username ? login.username : ""}
                                />
                          </div>

                          <div className="form-outline mb-4">
                            <input
                                  type="password"
                                  className="form-control form-control-lg"
                                  id="password"
                                  placeholder="Password"
                                  name="password"
                                  onChange={(e) =>
                                    setLogin({ ...login, password: e.target.value })
                                  }
                                  value={login.password ? login.password : ""}
                                />
                          </div>

                          <div className="pt-1 mb-4">
                            <button className="btn btn-dark btn-lg w-100" type="submit">Login</button>
                          </div>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>

  );
}

export default Login;
