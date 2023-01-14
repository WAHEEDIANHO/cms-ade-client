import { useLocation } from "react-router-dom";

import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

import "../css/criminal.css";

function Card({ api, data, pre, handleDelete }) {
  const { pathname } = useLocation();
  return (
    <div className="col-md-4 mb-4">
      <div className="card template-card">
        <div className="image">
          <img src={`${api}/${data.imageUrl}`} alt="profile" />
        </div>
        <div className="card-text p-2">
          <div className="h4">{data.sname}</div>
          <div className="meta">
            <span
              className={`badge bg-${
                data.crime
                  ? "info"
                  : data.role === "admin"
                  ? "success"
                  : data.role === "staff"
                  ? "warning"
                  : "danger"
              } rounded-pill d-inline`}
            >
              {data.crime ? data.crime : data.role}
            </span>
          </div>
          <div className="description text-muted text-wrap">{data.address}</div>
        </div>
        {pathname !== "/dashboard" ? (
          <div className="card-footer text-end">
            <EditBtn pre={pre} id={data._id} />
            {sessionStorage.getItem("isAdmin") === "true" ? (
              <DeleteBtn id={data._id} handleDelete={handleDelete} />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Card;
