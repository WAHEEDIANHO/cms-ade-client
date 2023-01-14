import React from "react";
import axios from "axios";

import Card from "../components/TemplateCard";
import Loader from "../components/Loader";
import Guide from "../components/Guide";
import Error from "../components/Error";

class Staff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const fetctUser = async () => {
      const res = await this.getUser();
      this.setState({
        users: [...this.state.users, ...res.data],
        loading: false,
      });
    };
    fetctUser();
  }

  // fetch data
  getUser = async () => {
    const config = {
      headers: {
        authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
      },
    };
    // "https://crms-api.herokuapp.com/api/v1/criminal",
    const res = await axios.get(`${this.props.api}/user`, config);
    return res.data;
  };

  filterUser() {
    return this.state.users.map((user) => (
      <Card
        key={user._id}
        data={user}
        api={this.props.api}
        pre="user"
        handleDelete={this.handleDelete}
      />
    ));
  }

  handleDelete(e) {
    const { id } = e.target.dataset;
    this.setState({ loading: true });
    axios
      .delete(`${this.props.api}/user/${id}`, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res.id);
        this.setState({
          users: this.state.users.filter((user) => user._id !== res.id),
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        {this.state.loading ? <Loader /> : null}
        <Guide>
          <h3>
            Staff from <strong>CRMS</strong>
          </h3>
          <p className="mb-4">Crime Managemen System</p>
        </Guide>
        <div className="container">
          <div className="row justify-content-center">
            {this.state.users.length !== 0 ? this.filterUser() : <Error />}
          </div>
        </div>
      </>
    );
  }
}

export default Staff;
// coochies
