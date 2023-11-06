import React, { useState } from "react";
import {
  VStack,
  Box,
  Flex,
  Avatar,
  Text,
  Link,
  MenuButton,
  Menu,
  Portal,
  MenuList,
  MenuItem,
  Button
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link  as RouterLink} from "react-router-dom";
import useShowToast from '../hooks/useShowToast';
import { API_BASE_URL } from "../config";
const UserHeader = ({ user }) => {
  const toast = useToast();
  const showToast= useShowToast()
  const currentUser= useRecoilValue(userAtom) //get current user 
  const[following,setFollowing]=useState(user.followers.includes(currentUser?._id))
  const [updating,setUpdating]=useState(false)
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        description: "Profile Link Copied",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };
  const handleFollowUnfollow= async(req,res)=>{
    if(!currentUser){
      showToast('Error',"Please login to follow","error")
      return
    }
    if(updating) return
    setUpdating(true)
    const token = localStorage.getItem("token");
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = token;
      }
      const res= await fetch(`${API_BASE_URL}/api/users/follow/${user._id}`,{
        method:"POST",
        headers,
      })
      const data= await res.json()
      if(data.error){
        showToast("Error",data.error,"error")
        return
      }
      if (following) {
        showToast("Success", `Unfollowed ${user.name}`, "success"); 
        user.followers.pop();
      } else {
        showToast("Success", `Followed ${user.name}`, "success"); 
        user.followers.push(currentUser?._id);
      }
      
    setFollowing(!following)
    } catch (error) {
   console.log(error)
    }
    finally{
      setUpdating(false)
    }
  }
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              src="https://bit.ly/broken-link"
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {
        currentUser?._id === user._id && (
          <Link  as={RouterLink}to="/update">
          <Button size="sm">Update Profile</Button>
          </Link>
        )
      }
         {
        currentUser?._id !== user._id && (
         
          <Button size="sm" onClick={handleFollowUnfollow} isLoading={updating}>{
            following ? "Unfollow":"Follow"
}</Button>
       
        )
      }
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid white"}
          justifyContent={"center"}
          color={"gray.light"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
