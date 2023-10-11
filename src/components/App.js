import React, {useEffect, useState} from 'react';
import '../App.css';
import AppRouter from './Router';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //firebase 에 currentUser는 현재 유저의 유무
 
  useEffect(()=>{
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log(user);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);
  //한번만 작동

  
  return (
    <>
      <h2>React BBS - firebase</h2>
      {init ?
      <AppRouter isLoggedIn={isLoggedIn}/>
      : "회원정보 확인중..."
    }
    </>
   
  );
}

export default App;
