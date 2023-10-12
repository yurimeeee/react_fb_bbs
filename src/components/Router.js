import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Nav from './Nav';

const AppRouter = ({isLoggedIn,userObj})=>{
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  //로그인 유무에 따라 컴포넌트가 다름
  return(
    <>
    {isLoggedIn && <Nav/>}
    <Routes>
      {isLoggedIn ? (
        <>       
        <Route path="/" element={<Home userObj={userObj} />}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        </>
        ) : (
        <Route path="/" element={<Auth/>}></Route>
        )
      }
    </Routes>
    </>
  )
}
export default AppRouter