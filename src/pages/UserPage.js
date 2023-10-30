import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from "../config.js";
import useShowToast from '../hooks/useShowToast';
const UserPage = () => {
  const[user,setUser]=useState(null)
  const { username }=useParams()
  const showToast= useShowToast()
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/profile/${username}`);

        const data = await res.json();
        if(data.error){
          showToast("Error",data.error,"error")
          return
        }
       setUser(data)
       showToast("Success", "Data loaded successfully", "success");

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getUser();
  }, [username,showToast]);
  if(!user) return null
  
  return (
    <>
<UserHeader user={user} />
<UserPost likes={1200} replies={481} postImg="/post1.png" postTitle="Lets talk about threads" name="Mark Zuckerberg"/>
<UserPost likes={1400} replies={567} postImg="/post3.png" postTitle="Dont copy Twitter" name="Elon musk"/>
<UserPost likes={1600} replies={1200} postImg="/post2.webp" postTitle="I dont want to play with You anymore @twitter" name="Mr Beast"/>


</>
  )
}
export default UserPage;

