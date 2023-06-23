import React from "react";
import Login from "../pages/login";
import Chat from "../pages/chat";
// import useLocalStorage from "./hooks/useLocalStorage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "../pages/register";
import SetAvatar from "../pages/setAvatar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/setAvatar" element={<SetAvatar/>}></Route>
        <Route path="/" element={<Chat/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
