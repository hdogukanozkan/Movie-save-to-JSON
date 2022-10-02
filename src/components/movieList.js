import React from "react";
import { Link } from "react-router-dom";

/* Eğer class yerine function kullansaydık (props) yazardık ve 
   this.props.diziler değil de props.diziler derdik. 

=> Altta ki örnektir.

const movielist2 = (props)=> {
	return (
		{props.diziler.map((dizi) => (
			<div>dizi</div>
		))}
	)
}

*/

class movieList extends React.Component {
  trimmedString = (movieOverviews, lengths) => {
    return movieOverviews.length > lengths
      ? movieOverviews.substring(0, lengths) + "..."
      : movieOverviews;
  };

  render() {
    return (
      <div className="row">
        {/* Kaç tane diziler varsa hepsini tek tek yazmak için map kullandık */}
        {this.props.diziler.map((dizi, i) => (
          <div className="col-lg-3" key={i}>
            <div className="card mb-4 shadow-sm">
              <img
                src={dizi.imageURL}
                className="card-img-top"
                alt="Simple movie"
              />
              <div className="card-body">
                <h5>{dizi.name ? dizi.name : dizi.title}</h5>
                {/* Bu kod kaç adet dizi varsa döner
                her dizi için de ad alır. 1.si x 2.si y gibi
                 */}
                <p className="card-text">
                  {this.trimmedString(dizi.overview, 131)}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  {console.log(dizi)}
                  <button
                    onClick={(e) => this.props.diziDel(dizi)}
                    /* buttona tıkladığımızda tıklanılan dizi'yi göndermesini sağladık
                  ve gönderdiğimiz dizinin id'si ile sildik */
                    type="button"
                    className="btn btn-md btn-outline-danger"
                  >
                    Delete
                  </button>
                  <Link
                    to={"/edit/" + dizi.id}
                    type="button"
                    className="btn btn-outline-secondary"
                  >
                    Edit
                  </Link>
                  <h2>
                    <span className="badge bg-dark">{dizi.rating}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default movieList;
