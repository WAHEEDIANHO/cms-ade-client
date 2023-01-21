import React, { Component } from "react";
import axios from "axios";
import Guide from "../components/Guide";

// import Criminals from "./Criminals";
// import Card from "../components/TemplateCard";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criminals: null,
    };
  }

  componentDidMount() {
    (async () => {
      axios
        .get(`${this.props.api}/criminal?`, {
          headers: {
            authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
          },
        })
        .then((res) => res.data)
        .then(({ data }) => {
          const toNumber = (el) => parseInt(el?.slice(4));
          const criminals = data.sort(
            (a, b) => toNumber(b.criminal_id) - toNumber(a.criminal_id)
          );
          if(criminals.length === 0) return;
          this.setState({ criminals });
        })
        .catch((err) => console.log(err));
    })();
  }
  render() {
    const { criminals } = this.state;
    return (
        <div className="container-fluid pt-4">
            <Guide>
                <h3>
                    Dashboard <strong>CRMS</strong>
                </h3>
                <p className="mb-4">Crime Managemen System</p>
            </Guide>
          <div className="row text-white ">
            <div className="col-lg-3 col-md-6 mb-3 summary">
              <div className="rounded-2 d-flex bg-primary pt-4">
                                            <span className="col-4 p-0 ">
                                                <i className="fa fa-users fa-4x "></i>
                                            </span>
                <div className="col-8 text-end pe-3 ">
                  <h6>1 <br/> Reg. Teacher</h6>
                </div>

              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3 summary">
              <div className="rounded-2 d-flex bg-danger pt-4 ">
                                            <span className="col-4 p-0 ">
                                        <i className="fa fa-file-text fa-4x "></i>
                                    </span>
                <div className="col-8 text-end pe-3 ">
                  <h6> 0 <br/> Subject Register</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3 summary">
              <div className="rounded-2 d-flex bg-info pt-4 ">
                                            <span className="col-4 p-0 ">
                                    <i className="fa fa-home fa-4x "></i>
                                </span>
                <div className="col-8 text-end pe-3 ">
                  <h6>0 <br/> Reg. Student</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3 summary">
              <div className="rounded-2 d-flex bg-success pt-4 ">
                                            <span className="col-4 p-0 ">
                                    <i className="fa fa-print fa-4x "></i>
                                </span>
                <div className="col-8 text-end pe-3">
                  <h6> 0 <br/> Result Declared</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Home;
