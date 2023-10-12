// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID
// };
const firebaseConfig = {
  apiKey: "AIzaSyDf3DxaCXBP9du3tJ92JaIyqNxwNPOH5c8",
  authDomain: "react-bbs-f0276.firebaseapp.com",
  projectId: "react-bbs-f0276",
  storageBucket: "react-bbs-f0276.appspot.com",
  messagingSenderId: "638202015773",
  appId: "1:638202015773:web:7e304c2bca2b0d72ea96f4"
};
//위 고유의 코드가 노출되는 것을 방지하고자 변수로 설정 필요


// Initialize Firebase
// export const firebase =  initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const authService = getAuth(app);
//authService로 정의된 것에 getAuth 실행결과를 함수에 담음

export const db = getFirestore(app); //Cloud Firestore 초기화


