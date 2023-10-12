import React from 'react';
import { Link, Routes, Route } from "react-router-dom";


// const Nav = ()=>{
//   return(
//     <Navigation/>
//   )
// }

const Nav = ()=> (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </ul>
  </nav>
)

export default Nav