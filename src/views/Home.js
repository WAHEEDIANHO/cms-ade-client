import React, { Component } from "react";
import axios from "axios";
import Guide from "../components/Guide";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criminals: null,
        staff: null,
        maleCriminal: 0,
        femaleCriminal: 0
    };
  }

  componentDidMount() {
      (async () => {
          try {
              const config = {
                  headers: {
                      authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
                  }
              }
              const criminalsRes = await axios.get(`${this.props.api}/criminal`, config);
              const staffRes  = await axios.get(`${this.props.api}/user`, config);
              const male = criminalsRes.data.data.filter(criminal => criminal.gender === "male");

              this.setState({
                  criminals: criminalsRes.data.data,
                  staff: staffRes.data.data,
                  maleCriminal: male.length,
                  femaleCriminal: criminalsRes.data.data.length - male.length
              })
          }catch (e) {
              console.log(e)
          }
      })();
  }
  render() {
    const { criminals, staff } = this.state;
    return (
        <div className="container-fluid pt-4">
            <Guide>
                <h3>
                    Dashboard <strong>CRMS</strong>
                </h3>
                <p className="mb-4">Crime Management System</p>
            </Guide>
          <div className="row text-white ">
            <div className="col-lg-3 col-md-6 mb-3 summary">
              <div className="rounded-2 d-flex bg-primary pt-4">
                                            <span className="col-4 p-0 ">
                                                <i className="fa fa-users fa-5x "></i>
                                            </span>
                <div className="col-8 text-end pe-3 ">
                  <h6>{ staff ? staff?.length : 0 } <br/> Reg. Users</h6>
                </div>

              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3 summary">
              <div className="rounded-2 d-flex bg-danger pt-4 ">
                                            <span className="col-4 p-0 ">
                                        <i className="fa fa-file-text fa-5x "></i>
                                    </span>
                <div className="col-8 text-end pe-3 ">
                  <h6> { criminals ? criminals?.length : 0 } <br/> Reg. Criminal</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3 summary">
              <div className="rounded-2 d-flex bg-info pt-4 ">
                                            <span className="col-4 p-0 ">
                                    <i className="fa fa-male fa-5x "></i>
                                </span>
                <div className="col-8 text-end pe-3 ">
                  <h6> {this.state.maleCriminal} <br/> Total Male Criminal</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3 summary">
              <div className="rounded-2 d-flex bg-success pt-4 ">
                                            <span className="col-4 p-0 ">
                                    <i className="fa fa-female fa-5x "></i>
                                </span>
                <div className="col-8 text-end pe-3">
                  <h6> {this.state.femaleCriminal}  <br/> Total Female Criminal</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Home;
