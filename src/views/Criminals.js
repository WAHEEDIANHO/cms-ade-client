import React from "react";
import axios from "axios";

import Card from "../components/TemplateCard";
import Loader from "../components/Loader";
import Guide from "../components/Guide";
import Error from "../components/Error";

class Criminals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criminals: [],
      loading: true,
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const fetctCriminal = async () => {
      try {
        const res = await this.getCriminal();
        this.setState({
          criminals: [...this.state.criminals, ...res.data],
          loading: false,
        });
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
    const res = await axios.get(`${this.props.api}/criminal`, config);
    return res.data;
  };

  handleDelete(e) {
    const { id } = e.target.dataset;
    this.setState({ loading: true });
    axios
      .delete(`${this.props.api}/criminal/${id}`, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res.id);
        this.setState({
          criminals: this.state.criminals.filter(
            (criminal) => criminal._id !== res.id
          ),
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  filterCriminals() {
    return this.state.criminals.map((criminal) => (
      <Card
        key={criminal._id}
        data={criminal}
        api={this.props.api}
        pre="criminal"
        handleDelete={this.handleDelete}
      />
    ));
  }

  render() {
    return (
      <>
        {this.state.loading ? <Loader /> : null}
        <Guide>
          <h3>
            Criminals from <strong>CRMS</strong>
          </h3>
          <p className="mb-4">Crime Managemen System</p>
        </Guide>
        <div className="container">
          <div className="row justify-content-center">
            {this.state.criminals.length !== 0 ? (
              this.filterCriminals()
            ) : (
              <Error />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Criminals;
// coochies
