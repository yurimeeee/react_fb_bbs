import React, { useEffect, useState } from "react";
import { onSnapshot, query, orderBy, collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase";
import Post from "../components/Post";
import { getStorage, ref, uploadString, getDownloadURL  } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { Navigate, useNavigate } from "react-router-dom";

const Home = ({userObj})=>{
  const navigate = useNavigate();
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);//조회된 글을 배열로 만듦
  const [attachment, setAttachment] = useState();//첨부 이미지의 정보
  // const [inputFile, setInputFile] = useState(null); //인풋value 비우기 추후 수정
  const storage = getStorage();//스토리지 활성화
  const imagesRef = ref(storage, 'images'); //참조 생성
  // const [attachmentURL, setAttachmentURL] = useState('');


  const onChange = (e)=>{
   //let value = e.target.value; // ECMA script 2012
   const {target:{value}} = e ; //ES6 문법
   setPost(value);
  }

  //form 전송할 때 할일
  const onSubmit = async (e)=>{
    e.preventDefault();
    const storageRef = ref(storage, `${userObj}/${uuidv4()}`); //접속 사용자 id 폴더

    uploadString(storageRef, attachment, 'data_url').then(async (snapshot) => {
      // console.log('Uploaded success!');/
      // setAttachmentURL(await getDownloadURL(storageRef))
      // const attachmentURL = await getDownloadURL(storageRef);
      let attachmentURL = await getDownloadURL(storageRef);

      try{  //오류 점검
        await addDoc(collection(db, "posts"), { // posts는 컬렉션명
          content: post,
            date: serverTimestamp(),
            uid:userObj,
            attachmentURL //값이면서 필드명
          });
          // setAttachmentURL('');
          attachmentURL = '';
          navigate("/");
        } catch(e){
        console.log(e);
      }
    });
  }

  // console.log(userObj);
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

  const onFileChange = (e)=>{
    // console.log(e.target.files[0]);  //기존
    const {target:{files}} = e;  //ES6
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (e)=>{  //로드가 끝나면 할일 (ES6)
      setAttachment(e.target.result);
    }
    reader.readAsDataURL(theFile);
  } 
  //console.log(attachment);

  const onFileClear = ()=>{
    setAttachment('');
    document.getElementById('attachment').value = null;

  }

  return(
    <div>
      <form onSubmit={onSubmit}>
        <p>
          <label htmlFor="content">content: </label>
          <input type="text" id="content" name="post" value={post} placeholder='포스트 쓰기' onChange={onChange}></input>
        </p>
        <p>
          <label htmlFor="attachment">file: </label>
          <input type="file" onChange={onFileChange} id="attachment" accept='images/*'/>
          {attachment && 
          <div> 
            <img src={attachment} alt="" width="50px" height="50px"></img>
            <button type="button" onClick={onFileClear}>image cancel</button>
          </div>}  
        </p>
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