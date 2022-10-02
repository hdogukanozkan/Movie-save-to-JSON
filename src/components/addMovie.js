import React from "react";
import serialize from "form-serialize";
import { useNavigate } from "react-router-dom";

function AddMovie(props) {
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const obj = serialize(event.target, { hash: true });
    props.addMovies(obj);
    navigate("/");
  };

  return (
    <div className="container">
      <form className="mt-5" onSubmit={handleFormSubmit}>
        <input
          className="form-control"
          id="disabledInput"
          type="text"
          placeholder="Fill The Form To Add A Movie..."
          disabled
        />
        <div className="form-row">
          <div className="form-group col-md-10">
            <label htmlFor="inputName">Name</label>
            <input type="text" className="form-control" name="name" required />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputRating">Rating</label>
            <input type="text" className="form-control" name="rating" required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="inputImage">Image URL</label>
            <input type="text" className="form-control" name="imageURL" required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="overviewTextarea">Overview</label>
            <textarea className="form-control" name="overview" rows="5" required />
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-danger btn-block"
          value="Add Movie"
        />
      </form>
    </div>
  );
}

export default AddMovie;
