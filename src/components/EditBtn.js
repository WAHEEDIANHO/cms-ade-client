import { Link } from "react-router-dom";

function EditBtn({ pre, id }) {
  return (
    <Link
      to={`/dashboard/${pre}/${id}`}
      className="btn btn-sm btn-success mx-2"
      data-id={id}
    >
      Edit
    </Link>
  );
}

export default EditBtn;
