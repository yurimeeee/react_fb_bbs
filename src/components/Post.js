import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// await deleteDoc(doc(db, "cities", "DC"));  //문서삭제
// await 가 있으면 그 함수는 비동기 async야야함  


const Post = ({postObj,userConfirm})=> {
  console.log(postObj);
  const deletePost = async ()=> {
    if(window.confirm('정말 삭제할까요?')){
      await deleteDoc(doc(db, "posts", postObj.id)); 
    }
  }

const [edit, setEdit] = useState(false);
const [newPost, setNewPost] = useState(postObj.content);  //기존 값을 초기값으로 지정
const toggleEditMode = ()=> setEdit((prev)=>!prev); //기존 상태의 반대

const onChange = (e)=>{
  //e.target.value  //기존 문법
  const {target:{value}} = e;  //ES6 문법, 여러개 넘길떄 더 좋음. 하나는 비슷하긴함
  setNewPost(value);
}


// const washingtonRef = doc(db, "cities", "DC");

// // Set the "capital" field of the city 'DC'
// await updateDoc(washingtonRef, {
//   capital: true
// });

const onSubmit = async(e) =>{
  e.preventDefault();
  const postRef =  doc(db, "posts", postObj.id);
    await updateDoc(postRef, {
      content: newPost
      });
      setEdit(false);//수정모드 해제
  }
    
 

  return(
 
    <li>
      {
        //참이면 수정모드 거짓이면 기존 글
        edit ? (
          <>
            <form onSubmit={onSubmit}>
              <input value={newPost} onChange={onChange} required/>
              <button>Update Post</button>
            </form>
            <button onClick={toggleEditMode}>cancle</button>
          </>
        ) : (
          <>
            <h4>{postObj.content}</h4>
                { 
              userConfirm && (
                <>
                  <button onClick={deletePost}>Delete</button>  
                  <button onClick={toggleEditMode}>Edit</button>  
                </>
              )
            }
          </>
        )
      }
  </li>
  )
};

export default Post;

