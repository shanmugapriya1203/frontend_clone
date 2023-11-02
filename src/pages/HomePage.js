import { Button, Flex, Spinner ,Box} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import { API_BASE_URL } from '../config'
import Post from '../components/Post'

const HomePage = () => {
  const[posts,setPosts]=useState([])
  const[loading,setLoading]=useState(true)
  const showToast=useShowToast()
  useEffect(()=>{
      const getFeedPosts= async()=>{
        const token = localStorage.getItem("token");
        try {
          const headers = {
            "Content-Type": "application/json",
          };
    
          if (token) {
            headers.Authorization = token;
          }
          const res= await fetch(`${API_BASE_URL}/api/posts/feed`,{
            method: "GET",
            headers,
          }
          )
          const data= await res.json()
         
        setPosts(data)
        } catch (error) {
          showToast("Error", error, "error");
        }
        finally{
          setLoading(false)
        }
      }
      getFeedPosts()
  },[showToast])
  return (
 <>
 <Flex gap='10' alignItems={"flex-start"}>
			<Box flex={70}>
				{!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

				{loading && (
					<Flex justify='center'>
						<Spinner size='xl' />
					</Flex>
				)}

				{posts.map((post) => (
					<Post key={post._id} post={post} postedBy={post.postedBy} />
				))}
			</Box>
		
		</Flex>


 </>

  )
}

export default HomePage
