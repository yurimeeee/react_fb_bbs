import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Profile = ()=>{
  const navigate = useNavigate();
  const onLogoutClick = ()=> {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/"); //메인 페이지로 이동
    }).catch((error) => {
    });
    
   
  } 
  return(
    <>
    <h2>Profile Page</h2>
    <button onClick={onLogoutClick}>Log out</button>
    </>
  )

}

export default Profile;