import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import => bootstrap tanımlaması yapıyoruz.


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
// Burda tüm kodları yazmaktansa app.js içinde yazıp tek satırda hallederiz 