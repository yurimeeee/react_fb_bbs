import React, { useEffect, useState } from "react";
import {  doc, onSnapshot, query, orderBy, collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase";
import Post from "../components/Post";

const Home = ({userObj})=>{
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);//조회된 글을 배열로 만듦

  const onChange = (e)=>{
   //let value = e.target.value; // ECMA script 2012
   const {target:{value}} = e ; //ES6 문법
   setPost(value);
  }

  const onSubmit = async (e)=>{
    e.preventDefault();

    try{  //오류 점검
      const docRef = await addDoc(collection(db, "posts"), { // posts는 컬렉션명
        content: post,
          date: serverTimestamp(),
          uid:userObj
        });
        console.log("Document written with ID: ", docRef.id);
      } catch(e){
      console.log(e);
    }
  }

  console.log(userObj);
  /*
  //getPost는 한번만 실행하는 함수
  const getPost = async ()=> {
    const querySnapshot = await getDocs(collection(db,  "posts"));
    querySnapshot.forEach((doc) => {
      const postObj = {
        ...doc.data(), id:doc.id
      }
      setPosts((prev)=>[postObj,...prev]);
    });
  }

  // const test = { id: 'id', title: 'title1', content:'content' }
  // const testcopy = { ...test, title: 'title2'}
  // console.log(testcopy);
*/

  useEffect(()=>{ //componentDidMount
    // getPost();
    const q = query(collection(db, "posts"), orderBy('date'));
    onSnapshot(q, (querySnapshot) => { 
      //변동되는 내용을 실시간으로 조회
      const postArr = querySnapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
      }));
      setPosts(postArr);
      console.log(postArr);
    });
  },[]) //한번만 작동



  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="post" value={post} placeholder='포스트 쓰기' onChange={onChange}></input>
        <input type="submit" value="입력"></input>
      </form>
      <ul>
      {
        posts.map(item=>
          <Post key={item.id} postObj={item} userConfirm={item.uid === userObj}></Post>
        )
      }
      </ul>
    </div>
  )
}
 

export default Home;