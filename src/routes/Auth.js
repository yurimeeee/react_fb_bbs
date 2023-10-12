import React, { useState } from "react";
import { authService } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";


const Auth = ()=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error,setError] = useState('');
  const auth = getAuth();


  const onSubmit = (e)=>{
    e.preventDefault();
    if(newAccount){
      //create Acount 회원가입
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode,errorMessage );
          setError(errorMessage);
          // ..
        });
    } else{
      //로그인
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode,errorMessage );
        });
    }
  }

  const onChange = (e) =>{
    // let name = e.target.value;
    const {target:{name, value}} = e;
    if(name ==="email"){
      setEmail(value);
    }else{
      setPassword(value);
    }    
  }
  const toggleAccount = (prev)=>setNewAccount((prev)=>!prev)
  //이전 값의 반대로 변경 true or false
  const onSocialClick = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log('user',user)
      console.log('token',token)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode,errorMessage,email,credential)
    });

  }

  return (
    <div>
    <form onSubmit={onSubmit}>
      <input name="email" type="email" placeholder='email' value={email} onChange={onChange}/>
      <input name="password" type="password" placeholder='password' value={password} onChange={onChange}/>
      <button type="submit">{newAccount ? "create Account" : "Login"} </button>
      <button type="button" onClick={onSocialClick}>{newAccount ? "Google Sign up" : "Google Login"} </button>
    </form>
    <hr/>
    {error}
    <div>
      <button type="button" onClick={toggleAccount}>{newAccount ? "Login" : "create Account"} </button>

    </div>
  </div>
  )

}

export default Auth;