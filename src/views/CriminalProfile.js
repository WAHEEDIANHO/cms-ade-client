import React from "react";
import axios from "axios";

import Guide from "../components/Guide";
import Loader from "../components/Loader";
import Error from "../components/Error";

import "../css/profile.css";

class CriminalProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criminal: {},
      loading: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateCriminal = this.updateCriminal.bind(this);
  }

  componentDidMount() {
    const fetctCriminal = async () => {
      try {
        const res = await this.getCriminal();
        this.setState({ criminal: res.data, loading: false });
      } catch (err) {
        this.setState({ loading: false });
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
    // "https://crms-api.herokuapp.com/api/v1/criminal",
    const res = await axios.get(
      `${this.props.api}/criminal/${this.props.id}`,
      config
    );
    console.log(res.data);
    return res.data;
  };

  handleInputChange(e) {
    this.setState({
      criminal: { ...this.state.criminal, [e.target.name]: e.target.value },
    });
  }

  updateCriminal(e) {
    console.log(this.state.criminal);
    this.setState({ loading: true });

    const { id } = e.target.dataset;
    console.log(id);
    axios
      .put(`${this.props.api}/criminal/${id}`, this.state.criminal, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
        },
      })
      .then((res) => this.setState({ loading: false }))
      .catch((err) => console.log(err));
  }

  render() {
    const { criminal, loading } = this.state;
    return (
      <>
        {loading ? <Loader /> : null}
        <Guide>
          <h3>{`${criminal.sname ? criminal.sname : ""} ${
            criminal.othername ? criminal.othername : ""
          } Profile`}</h3>
          <p className="mb-4">Crime Managemen System</p>
        </Guide>
        <div className="card container rounded bg-white mt-5 mb-5">
          {criminal.hasOwnProperty("email") ? (
            <div className="row">
              <div className="col-md-3">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    alt="criminal"
                    className="rounded-circle mt-5"
                    width="150px"
                    src={`${this.props.api}/${criminal.imageUrl}`}
                  />
                  <span className="h4">{criminal.sname}</span>
                  <span className="h5">{criminal.criminal_id}</span>
                  <span className="text-muted">{criminal.email}</span>
                </div>
              </div>
              <div className="col-md-5">
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
                        value={criminal.sname ? criminal.sname : ""}
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
                        value={criminal.othername ? criminal.othername : ""}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="labels">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={this.handleInputChange}
                        value={criminal.email ? criminal.email : ""}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        onChange={this.handleInputChange}
                        value={criminal.dob ? criminal.dob.slice(0, 10) : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Nationality</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nationality"
                        onChange={this.handleInputChange}
                        value={criminal.nationality ? criminal.nationality : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        onChange={this.handleInputChange}
                        value={criminal.state ? criminal.state : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        onChange={this.handleInputChange}
                        value={criminal.city ? criminal.city : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Phone NO</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={this.handleInputChange}
                        value={criminal.phone ? criminal.phone : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Crime</label>
                      <input
                        type="text"
                        className="form-control"
                        name="crime"
                        onChange={this.handleInputChange}
                        value={criminal.crime ? criminal.email : ""}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="labels">Heigth</label>
                      <input
                        type="text"
                        className="form-control"
                        name="height"
                        onChange={this.handleInputChange}
                        value={criminal.height ? criminal.height : ""}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="labels">Weight</label>
                      <input
                        type="text"
                        className="form-control"
                        name="weight"
                        onChange={this.handleInputChange}
                        value={criminal.weight ? criminal.weight : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Gender</label>
                      <select
                        name="gender"
                        className="form-select"
                        onChange={this.handleInputChange}
                        value={criminal.gender ? criminal.gender : ""}
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
                        value={
                          criminal.marital_status ? criminal.marital_status : ""
                        }
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
                        value={criminal.address ? criminal.address : ""}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-8">
                      <label className="labels">Officer in Charge</label>
                      <input
                        type="text"
                        className="form-control"
                        name="officer"
                        onChange={this.handleInputChange}
                        value={criminal.officer ? criminal.officer : ""}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="labels" title="Duration of Sentence">
                        DOS
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="sentence_duration"
                        onChange={this.handleInputChange}
                        value={
                          criminal.sentence_duration
                            ? criminal.sentence_duration
                            : ""
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Date of Sentence</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dos"
                        onChange={this.handleInputChange}
                        value={criminal.dos ? criminal.dos.slice(0, 10) : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Date of Discharge</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dod"
                        onChange={this.handleInputChange}
                        value={criminal.dod ? criminal.dod.slice(0, 10) : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 py-5">
                  <h4 className="">Next of Kin Info</h4>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="labels">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nok_name"
                        onChange={this.handleInputChange}
                        value={criminal.nok ? criminal.nok.name : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Relationship</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nok_rel"
                        onChange={this.handleInputChange}
                        value={criminal.nok ? criminal.nok.relationship : ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Phone No</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nok_phone"
                        onChange={this.handleInputChange}
                        value={criminal.nok ? criminal.nok.mobile : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3 text-center">
                <button
                  className="btn btn-large btn-success profile-button p-3"
                  type="button"
                  onClick={this.updateCriminal}
                  data-id={criminal._id}
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

export default CriminalProfile;
