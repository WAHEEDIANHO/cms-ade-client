import React from "react";
import axios from "axios";

import Report from "../components/Report";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Search from "../components/Search";
import Guide from "../components/Guide";

class StaffReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = { users: [], loading: false, search: "" };

    this.handleDelete = this.handleDelete.bind(this);
    this.handeleSearch = this.handeleSearch.bind(this);
  }

  componentDidMount() {
    const fetctUser = async () => {
      try {
        const res = await this.getUser();
        this.setState({
          users: [...this.state.users, ...res.data],
          loading: false,
        });
        console.log(this.state.users);
      } catch (err) {
        this.setState({ loading: false });
      }
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

  handeleSearch(e) {
    this.setState({ search: e.target.value });
  }

  filterList(search) {
    let result = this.state.users.filter(
      ({ sname, othername }) =>
        sname.toLowerCase().includes(search.toLowerCase()) ||
        othername.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  }

  renderReport = () => (
    <table className="table align-middle mb-0 bg-white">
      <thead className="bg-light">
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {this.state.users.length !== 0 ? (
          this.filterList(this.state.search).map((user, i) => (
            <Report
              data={user}
              key={i}
              pre="user"
              api={this.props.api}
              handleDelete={this.handleDelete}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5}>
              <Error />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  render() {
    return (
      <>
        {this.state.loading ? <Loader /> : null}
        <Guide>
          <h3>
            Staff Report from <strong>CRMS</strong>
          </h3>
          <p className="mb-4">Crime Managemen System</p>
        </Guide>

        <div className="container">
          <Search handeleSearch={this.handeleSearch} />
          {this.renderReport()}
        </div>
      </>
    );
  }
}

export default StaffReport;
// <Report />
