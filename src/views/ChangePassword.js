import { useState } from "react";
import axios from "axios";

import Guide from "../components/Guide";
import Loader from "../components/Loader";

function ChangePassword({ api, email }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const changePassword = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { email, oldPassword, newPassword };

    axios
      .post(`${api}/user/change_password`, data, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
        },
      })
      .then((res) => {
        setOldPassword("");
        setNewPassword("");
        setLoading(false);
      })
      .catch((err) => {
        alert("Error changing password try again!!!");
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? <Loader /> : null}
      <Guide>
        <h3>Reset Password</h3>
        <p className="mb-4">Crime Management System</p>
      </Guide>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card p-5">
              <form method="post" onSubmit={changePassword}>
                <div className="form-group last mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    placeholder="Old Password"
                    name="oldPassword"
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword ? oldPassword : ""}
                  />
                </div>
                <div className="form-group last mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    placeholder="Password"
                    name="newPassword"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword ? newPassword : ""}
                  />
                </div>

                <button
                  type="submit"
                  className="btn text-white btn-block btn-success form-control"
                >Chnage Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
