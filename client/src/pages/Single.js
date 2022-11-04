import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.jpeg'
import Delete from '../img/delete.jpeg'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'
function Single() {
  const [post,setPost] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const {currentUser} = useContext(AuthContext)
  useEffect(()=>{
    
      const fetchData = async ()=>{
        try {
          const res = await axios.get(`/posts/${postId}`);
          setPost(res.data);
        }catch(err){
          console.log(err)
        }
        fetchData()
      }
    fetchData();
  },[postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`) 
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='single'>
      <div className="content">
        <img src={`../upload/${post.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username &&
          <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <img  src={Edit} alt="edit" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="delete" />
          </div>}
        </div>
        <h1>{post.title}</h1>
        {post.description}
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single