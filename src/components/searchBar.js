import React from "react";
import { Link } from "react-router-dom";

class searchBar extends React.Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        {/* forum onaylandığında sayfa reflesh edilmemesi için yazılır */}
        <div className="form-row mt-3 mb-5 ">
          <div className="row">
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                placeholder="search a movie"
                onChange={this.props.diziAraProps}
              />
              {/* input onChange her veri girişinde diziAraProps çalışır
            searchQuery'e veri girilir, */}
            </div>
            <div className="col-md-2">
              <Link
                to="/add"
                className="btn-danger btn"
                style={{ float: "right" }}
              >
                Add Movie
              </Link>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default searchBar;
