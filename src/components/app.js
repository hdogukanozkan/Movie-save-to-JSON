import React from "react";
import SearchBar from "./searchBar";
import MovieList from "./movieList";
import AddMovie from "./addMovie";
import EditMovie from "./editMovie";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* 
require('dotenv').config()
const api_key = process.env.REACT_APP_API_KEY
const session_id = process.env.REACT_APP_SESSION_ID

 */

// remove this after you've confirmed it working
/* 
Önemli!!!
-dotevn içine girilen özel api şifre vb şeyler kullanıcılar tarafından görülmez ve güvenlidir.
-Kullanımı sırasında REACT_APP_... TANIMLAMASI YAPILMALIDIR.


  AXİOS APİ KULLANIMINDA ÇALIŞTIRILIYOR (fetch gibi)
*/

class app extends React.Component {
  constructor() {
    super();

    this.state = {
      diziler: [],
      searchQuery: "",
    };
  }

  /*  FETCH ile;
    async componentDidMount() {
    const baseURL = "http://localhost:3002/diziler";
    const response = await (await fetch(baseURL)).json();
    this.setState({ diziler: response });
  }
 */

  // AXİOS ile açılır açılmaz çalışsın diye;
  async componentDidMount() {
    const response = await Axios.get(
      `https://fake-api-movies-json.herokuapp.com/movies`
    );
    // alma methodunu çalıştırdık obje olduğu için .data ile verilere ulaştık

    this.setState({ diziler: response.data });
    // ulaştığımız verileri setState ile dizilere işledik
  }

  /* FETCH

  deleteMovie = async (dizi) => {
    const baseURL = `http://localhost:3002/diziler/${dizi.id}`;
    await fetch(baseURL, { method: "DELETE" });
    const newMovieList = this.state.diziler.filter((m) => m.id !== dizi.id);

    this.setState({
      diziler: newMovieList,
    });
  };
 */

  // AXİOS ile;
  deleteMovie = async (dizi) => {
    Axios.delete(
      `https://fake-api-movies-json.herokuapp.com/movies/${dizi.id}`
    );
    // LOCAL'de axios ile seçilen diziyi id'sinden bulup sildik

    // Axios.post(`https://api.themoviedb.org/3/list/8218049/remove_item?media_id=${dizi.id}&api_key=${api_key}&session_id=${session_id}`);
    // Burada tmdb sitesinin api mantığı ile film listesinde ki filmi kaldırdık.

    const newMovieList = this.state.diziler.filter((d) => d.id !== dizi.id);
    // Burada silinen diziyi filtreleyerek newMovieList'e yansıttık
    this.setState({ diziler: newMovieList });
    //newMovieList'i dizilere aktardık.
  };

  diziAra = (event) => {
    // girilen veriyi searchQuery statei ile güncelliyoz
    this.setState({ searchQuery: event.target.value });
  };

  addMovieFun = async (event) => {
    await Axios.post(
      "https://fake-api-movies-json.herokuapp.com/movies",
      event
    );

    this.componentDidMount();
  };

  editMovie = async (id, updateMovie) => {
    await Axios.put(
      `https://fake-api-movies-json.herokuapp.com/movies/${id}`,
      updateMovie
    );
    this.componentDidMount();
  };

  render() {
    let filterDiziler = this.state.diziler
      .sort((a, b) => (a.id > b.id ? -1 : b.id < a.id ? 1 : 0))
      .filter((dizi) => {
        return dizi.name
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase());
        /* filter ile dizilerin içinde dizi.Adi searchQuery ile eşleşenlere bakarız,
         includres bu eşleşmeyi sağlıyor, 
         büyük küçük harf sorunu için 2 tarafı da küçük harf yaparız toLowerCase
      */
      });

    return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar diziAraProps={this.diziAra} />
                      {/* klavye girdisi yapınca otomatik diziAra çalışıyor searchQuery'e veri giriliyor */}
                    </div>
                  </div>
                  <MovieList
                    diziDel={this.deleteMovie}
                    diziler={filterDiziler}
                  />
                  {/* diziDel buttonuna basınca bastığımız dizinin verisi deleteMovie'e
         aktarıyoruz böylece seçilen dizi.id ile tüm dizilerin id'sini kıyaslayıp filtreliyoz
         
        diziler=> kaç tane dizi varsa ekrana yazmak için filterDiziler'e gönderioz,
        Filterdiziler state içinde ki diziler listesini return ile gönderiyor, 
        Gönderilen diziler map metodu ile kaç adet dizi varsa ekrana yazdırılıyor
          */}
                </React.Fragment>
              }
            ></Route>

            <Route
              path="/add"
              element={<AddMovie addMovies={this.addMovieFun} />}
            />

            <Route
              path="/edit/:id"
              element={<EditMovie editMovies={this.editMovie} />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default app;
