import { Component } from "react";
import axios from "axios";

import Carousel from "../components/Carousel";
// import Criminals from "./Criminals";
import Card from "../components/TemplateCard";

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
      <header className="w-100" style={{marginTop: "-90px"}}>
        <Carousel />
        {  criminals &&
            <div className="container mt-5">
              <div className="row justify-content-center">
                <h3 className="text-center mb-4">Criminals </h3>
                {criminals
                    ? criminals.map((criminal, i) => {
                      if (i === 4) return null;
                      return <Card data={criminal} api={this.props.api} key={i} />;
                    })
                    : null}
              </div>
            </div>
        }

        {/* <Criminals filter={true} title="Wanted Criminals" /> */}
      </header>
    );
  }
}

export default Home;
