import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

function Report({ data, api, pre, handleDelete }) {
  console.log(data.sname);
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={`${api}/${data.imageUrl}`}
            alt=""
            style={{ width: "45px", height: "45px" }}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">
              {data.sname ? `${data.sname} ${data.othername}` : null}
            </p>
            <p className="text-muted mb-0">{data.email}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="text-muted mb-0">{data.phone}</p>
      </td>
      <td>
        <p className="text-muted mb-0">{data.address}</p>
      </td>
      {/* <td>
            <span className="badge bg-success rounded-pill d-inline">
              Active
            </span>
          </td> */}
      <td>{data.hasOwnProperty("role") ? data.role : data.crime}</td>
      <td>
        <EditBtn pre={pre} id={data._id} />
        {sessionStorage.getItem("isAdmin") === "true" ? (
          <DeleteBtn id={data._id} handleDelete={handleDelete} />
        ) : null}
      </td>
    </tr>
  );
}

export default Report;
