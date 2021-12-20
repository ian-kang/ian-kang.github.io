import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Dashboard from "./Components/Dashboard/Dashboard";
import MenuHomeView from "./Components/MenuHomeView/MenuHomeView";
import FirebaseDatabase from "./Repository/realtimeDatabase";

const fireBaseDatabase = new FirebaseDatabase();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route
          path="/design"
          element={<App fireBaseDatabase={fireBaseDatabase} />}
        ></Route>
        <Route path="/menu" element={<MenuHomeView />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
