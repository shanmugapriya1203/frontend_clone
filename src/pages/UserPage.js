import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'

import { useParams } from 'react-router-dom'
import { API_BASE_URL } from "../config.js";
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner } from '@chakra-ui/react';
import Post from '../components/Post.js';


const UserPage = () => {
  const[user,setUser]=useState(null)
  const[loading,setLoading]=useState(true)
  const[posts,setPosts]=useState([])
  const[fetchingPosts,setFetchingPosts]=useState(true)
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
      finally{
        setLoading(false)
      }
    };
    const getPosts= async()=>{
      setFetchingPosts(true)
      try {
        const res= await fetch(`${API_BASE_URL}/api/posts/user/${username}`)
        const data= await res.json()
        console.log(data)
        setPosts(data)
      } catch (error) {
        showToast("Error",error.message,"error")
        setPosts([])
      }
      finally{
        setFetchingPosts(false)
      }
    }
    getUser();
    getPosts()
  }, [username,showToast]);
  if(!user && loading){
    return(
      <Flex justifyContent={"center"}>
        <Spinner size={'xl'}/>
      </Flex>
    )
  }
  if(!user) return <h1>User Not found</h1>
  
  return (
    <>
<UserHeader user={user} />
{
  !fetchingPosts && posts.length===0 && <h1>User has not posts</h1>
}
{
  fetchingPosts && (
    <Flex justifyContent={"center"} my={12}>
      <Spinner size={"xl"}/>
    </Flex>
  )
}
{
  posts.map((post)=>(
    <Post key={post._id} post={post} postedBy={post.postedBy}/>
  ))
}


</>
  )
}
export default UserPage;

