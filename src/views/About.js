import "../css/about.css";

function About() {
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-4 mt-5 text-white">
            <div className="card p-4 bg-dark text-white rounded-4">
              <h3>Project Topic</h3>
              <p>
                Design and implementation of a Web based Crime Management
                System Using ReactJS, NodeJs & MongoDB
              </p>
              <div className="img__holder">
                <img src="/img/gbadegesin.jpeg" alt="owner" />
              </div>

              <div className="bio">
                <p>Mudashir Ridwan Ademola</p>
                <p>HC20200206048</p>
                <p>HND II</p>
                <p>COMPUTER SCIENCE</p>

                <h6>Supervised By</h6>
                <p>MR. CHRIS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
