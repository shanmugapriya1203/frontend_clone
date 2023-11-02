import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { API_BASE_URL } from "../config";

const Post = ({post,postedBy} ) => {
	const[liked,setLiked]= useState(false)
	const[user,setUser]=useState(null)
	const showToast=useShowToast()
	const navigate= useNavigate()
    useEffect(()=>{
    const getUser= async()=>{
		const token= localStorage.getItem("token")
		try {
			const headers = {
				"Content-Type": "application/json",
			  };
		
			  if (token) {
				headers.Authorization = token;
			  }
			  const res= await fetch(`${API_BASE_URL}/api/users/profile/`+ postedBy,{
				method: "GET",
				headers,
			  })
			  const data= await res.json()
			setUser(data)
			
			 
		} catch (error) {
			showToast("Error",error.message,"error")
			setUser(null)
		}
	}
	getUser()
	},[postedBy,showToast])
if(!user) return null
	return (
		<Link to= {`${user.username}/post/${post._id}`}>
			<Flex gap={3} mb={4} py={5}>
				<Flex flexDirection={"column"} alignItems={"center"}>
					<Avatar size='md' name='user pic' src={user.profilePic}
					onClick={(e)=>{
						e.preventDefault()
						navigate(`${user.username}`)
					}}/>
					<Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
					<Box position={"relative"} w={"full"}>
						{post.replies.length === 0 && <Text textAlign={"center"}>😒</Text>}
						{
							post.replies[0] && (
								<Avatar
							size='xs'
							name='John doe'
							src={post.replies[0].userProfilePic}
							position={"absolute"}
							top={"0px"}
							left='15px'
							padding={"2px"}
						/>	
							)
						}
						{
							post.replies[1] && (
                            <Avatar
							size='xs'
							name='John doe'
							src={post.replies[1].userProfilePic}
							position={"absolute"}
							top={"0px"}
							left='15px'
							padding={"2px"}
						/>
							)
						}
						{
							post.replies[2] && (
								<Avatar
								size='xs'
								name='John doe'
								src={post.replies[1].userProfilePic}
								position={"absolute"}
								top={"0px"}
								left='15px'
								padding={"2px"}
							/>
							)
						}
						
					
					
					</Box>
				</Flex>
				<Flex flex={1} flexDirection={"column"} gap={2}>
					<Flex justifyContent={"space-between"} w={"full"}>
						<Flex w={"full"} alignItems={"center"}>
							<Text fontSize={"sm"} fontWeight={"bold"} color={"white"}
							onClick={(e)=>{
								e.preventDefault()
								navigate(`${user.username}`)
							}}
								
							>
						{user?.name} 		</Text>
							<Image src='/verified.png' w={4} h={4} ml={1} />
						</Flex>
						<Flex gap={4} alignItems={"center"}>
							<Text fontStyle={"sm"} color={"gray.light"}>
								1d
							</Text>
							<BsThreeDots />
						</Flex>
					</Flex>

					<Text fontSize={"sm"}>{post.text}</Text>
					{
						post.img &&(
							<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
							<Image src={post.img} w={"full"} />
						</Box>
						)
					}
                 
						<Flex  gap={3} my={1}>
							<Actions liked={liked} setLiked={setLiked}/>
						</Flex>

				

					<Flex gap={2} alignItems={"center"}>
						<Text color={"gray.light"} fontSize="sm" >{post.replies.length}replies </Text>
						<Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
						<Text color={"gray.light"} fontSize="sm">{post.likes.length} likes</Text>
					</Flex>
					
				</Flex>
			</Flex>
		</Link>
	);
};

export default Post;