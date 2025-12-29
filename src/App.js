import { Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/loader/Loading.jsx";
import { useState } from "react";
import Home from "./components/home/Home.jsx";

function App() {
  const [isLoading, setsLoading] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" w-full h-screen">
      <Home />

      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default App;
