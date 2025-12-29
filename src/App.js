import { Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/loader/Loading.jsx";
import { useState, useEffect } from "react";
import Home from "./components/home/Home.jsx";
import { trackVisitor } from "./services/visitorTracking";

function App() {
  const [isLoading, setsLoading] = useState(false);

  // Track visitor on app load
  useEffect(() => {
    // Track visitor asynchronously without blocking the app
    trackVisitor().catch((error) => {
      console.error('Visitor tracking failed:', error);
    });
  }, []);

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
