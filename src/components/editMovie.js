import React from "react";
import Axios from "axios";

require("dotenv").config();
const api_key = process.env.REACT_APP_API_MOVIE;

class EditMovie extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      rating: "",
      imageURL: "",
      overview: "",
    };
  }
  async componentDidMount() {
    const id = window.location.pathname.replace("/edit/", "");
    const response = await Axios.get(`${api_key}/${id}`);

    this.setState({
      name: response.data.name,
      rating: response.data.rating,
      imageURL: response.data.imageURL,
      overview: response.data.overview,
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const id = window.location.pathname.replace("/edit/", "");
    const updateMovie = {
      name: this.state.name,
      rating: this.state.rating,
      overview: this.state.overview,
      imageURL: this.state.imageURL,
    };

    this.props.editMovies(id, updateMovie);
    let url = window.location.origin;
    console.log(window.location.origin);
    window.location.replace(url);
  };

  inputChangedHandler = (event) => {
    const updatedKeyword = event.target.value;
    this.setState({ [event.target.name]: updatedKeyword });
  };

  render() {
    return (
      <div className="container">
        <form className="mt-5" onSubmit={this.handleFormSubmit}>
          <input
            className="form-control"
            id="disabledInput"
            type="text"
            placeholder="Fill The Form To EDİT A Movie..."
            disabled
          />
          <div className="form-row">
            <div className="form-group col-md-10">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={(event) => this.inputChangedHandler(event)}
                required
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputRating">Rating</label>
              <input
                type="text"
                className="form-control"
                name="rating"
                value={this.state.rating}
                onChange={(event) => this.inputChangedHandler(event)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputImage">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="imageURL"
                value={this.state.imageURL}
                onChange={(event) => this.inputChangedHandler(event)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="overviewTextarea">Overview</label>
              <textarea
                className="form-control"
                name="overview"
                required
                rows="5"
                value={this.state.overview}
                onChange={(event) => this.inputChangedHandler(event)}
              />
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-danger btn-block"
            value="Edit Movie"
          />
        </form>
      </div>
    );
  }
}

export default EditMovie;
