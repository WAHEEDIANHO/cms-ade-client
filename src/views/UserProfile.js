import React from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Guide from "../components/Guide";
import Error from "../components/Error";

import "../css/profile.css";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      loading: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    const fetctCriminal = async () => {
      try {
        const res = await this.getCriminal();
        this.setState({ user: res.data, loading: false });
      } catch (err) {
        this.setState({ loading: false });
        // console.log(this);
      }
    };
    fetctCriminal();
  }

  // fetch data
  getCriminal = async () => {
    const config = {
      headers: {
        authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
      },
    };
    // "https://crms-api.herokuapp.com/api/v1/user",
    const res = await axios.get(
      `${this.props.api}/user/${this.props.id}`,
      config
    );
    console.log(JSON.stringify(res.data));
    return res.data;
  };

  handleInputChange(e) {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value },
    });
  }

  updateUser(e) {
    console.log(this.state.user);
    this.setState({ loading: true });

    const { id } = e.target.dataset;
    console.log(id);
    axios
      .put(`${this.props.api}/user/${id}`, this.state.user, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
        },
      })
      .then((res) => this.setState({ loading: false }))
      .catch((err) => console.log(err));
  }

  render() {
    const { user, loading } = this.state;
    return (
      <>
        {loading ? <Loader /> : null}
        <Guide>
          <h3>{`${user.sname ? user.sname : ""} ${
            user.othername ? user.othername : ""
          } Profile`}</h3>
          <p className="mb-4">Crime Managemen System</p>
        </Guide>
        <div className="card container rounded bg-white mt-5 mb-5">
          {user.hasOwnProperty("email") ? (
            <div className="row">
              <div className="col-md-4">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    alt="user"
                    className="rounded-circle mt-5"
                    width="150px"
                    src={`${this.props.api}/${user.imageUrl}`}
                  />
                  <span className="h4">{user.sname}</span>
                  <span className="text-muted">{user.email}</span>
                </div>
              </div>
              <div className="col-md-8">
                <div className="p-3 py-5">
                  <h4 className="">Profile Settings</h4>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="labels">Surname</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="first name"
                        name="sname"
                        onChange={this.handleInputChange}
                        value={user.sname ? user.sname : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Othername</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="surname"
                        name="othername"
                        onChange={this.handleInputChange}
                        value={user.othername ? user.othername : ""}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="labels">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={this.handleInputChange}
                        value={user.email ? user.email : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        onChange={this.handleInputChange}
                        value={user.dob ? user.dob.slice(0, 10) : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Nationality</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nationality"
                        onChange={this.handleInputChange}
                        value={user.nationality ? user.nationality : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        onChange={this.handleInputChange}
                        value={user.state ? user.state : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        onChange={this.handleInputChange}
                        value={user.city ? user.city : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Phone NO</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={this.handleInputChange}
                        value={user.phone ? user.phone : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        name="role"
                        onChange={this.handleInputChange}
                        value={user.role ? user.role : ""}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="labels">Heigth</label>
                      <input
                        type="text"
                        className="form-control"
                        name="height"
                        onChange={this.handleInputChange}
                        value={user.height ? user.height : ""}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="labels">Weight</label>
                      <input
                        type="text"
                        className="form-control"
                        name="weight"
                        onChange={this.handleInputChange}
                        value={user.weight ? user.weight : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Gender</label>
                      <select
                        name="gender"
                        className="form-select"
                        onChange={this.handleInputChange}
                        value={user.gender ? user.gender : ""}
                      >
                        <option value="">select gender</option>
                        <option value="male">M</option>
                        <option value="female">F</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Marital Status</label>
                      <select
                        name="marital_status"
                        className="form-select"
                        onChange={this.handleInputChange}
                        value={user.marital_status ? user.marital_status : ""}
                      >
                        <option value="">Marital status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorce">Divorce</option>
                      </select>
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        onChange={this.handleInputChange}
                        value={user.address ? user.address : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3 text-center">
                <button
                  className="btn btn-large btn-success profile-button p-3"
                  type="button"
                  data-id={user._id}
                  onClick={this.updateUser}
                >
                  Save Profile
                </button>

                <button
                  className="btn btn-large btn-warning profile-button p-3 mx-3 text-white"
                  type="button"
                >
                  Reset Profile
                </button>
              </div>
            </div>
          ) : (
            <Error />
          )}
        </div>
      </>
    );
  }
}

export default UserProfile;
