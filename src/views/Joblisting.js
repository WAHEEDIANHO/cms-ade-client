import axios from "axios";
import React from "react";

import Report from "../components/Report";

class JobListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = { criminals: [], loading: false, search: "" };
    }

    componentDidMount() {
        const fetctCriminal = async () => {
            try {
                const res = await this.getCriminal();
                this.setState({ criminals: [...this.state.criminals, ...res.data] });
            } catch (err) {
                this.setState({ loading: false });
            }
        };
        fetctCriminal();
    }

    // fetch data
    getCriminal = async () => {
        // "https://crms-api.herokuapp.com/api/v1/criminal",
        const res = await axios.get(`http://192.168.122.1:8080/joblisting`);
        console.log(res.data.data)
        return res.data.data;
    };





    // filterList(search) {
    //     let result = this.state.criminals.filter(
    //         () =>
    //             // sname.toLowerCase().includes(search.toLowerCase()) ||
    //             // othername.toLowerCase().includes(search.toLowerCase())
    //     );
    //     return result;
    // }

    renderReport = () => (
        <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
                <tr>
                    <th>Job Location</th>
                    <th>Job Title</th>
                    <th>Job Type</th>
                </tr>
            </thead>
            <tbody>
            {this.state.criminals.length !== 0 ? (
                this.getCriminal().map((criminal, i) => (
                   <tr>
                       <td>1</td>
                       <td>2</td>
                       <td>3</td>
                   </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={5}>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );

    render() {
        return (
            <>
                <div className="container">
                    {this.renderReport()}
                </div>
            </>
        );
    }
}

export default JobListing;
// <Report />