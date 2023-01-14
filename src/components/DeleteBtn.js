function DeleteBtn({ id, handleDelete }) {
  return (
    <button
      className="btn btn-sm btn-danger"
      data-id={id}
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}

export default DeleteBtn;
