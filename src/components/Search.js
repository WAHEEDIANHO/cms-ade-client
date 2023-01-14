function Search({ handeleSearch }) {
  return (
    <div className="input-group mb-5">
      <input type="text" className="form-control" onChange={handeleSearch} />
      <button disabled className="btn btn-primary">
        Search
      </button>
    </div>
  );
}

export default Search;
