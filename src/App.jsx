import React, { useContext, useLayoutEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import axios from "axios";
import BookTable from "./components/BookTable";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Profile from "./components/Profile";
import OrderMenu from "./components/OrderMenu";
import { context } from "./AppState";
import GenretedBill from "./components/GenretedBill";

axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const { appData, Dispatch } = useContext(context);
  const [view, setView] = useState(true);

  useLayoutEffect(() => {
    if (!appData.auth) {
      const id = localStorage.getItem("id");
      console.log(id);
      if (!id) return setView(false);
      (async () => {
        const res = await axios.get("/customer/" + id);
        if (!res?.data) return console.log(res);
        Dispatch({ type: "setAuth", payload: res?.data[0] });
        setView(false);
      })();
    }
  }, []);

  if (view) return <p>Loading</p>;
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booktable" element={<BookTable />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<OrderMenu />} />
        <Route path="/bill/:id" element={<GenretedBill />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
