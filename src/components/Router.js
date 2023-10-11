import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ()=>{
  const[isLoggedIn, setIsLoggedIn] = useState(false)
  //로그인 유무에 따라 컴포넌트가 다름
  return (
    <Routes>
      {
        isLoggedIn ? (
        <Route path="/" element={<Home/>}></Route>
        ) : (<Route path="/" element={<Auth/>}></Route>)
      }
      
    </Routes>
  )
}

export default AppRouter