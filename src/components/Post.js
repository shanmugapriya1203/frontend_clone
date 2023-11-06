import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { API_BASE_URL } from "../config";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

const Post = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const currentUser= useRecoilState(userAtom)

  const showToast = useShowToast();
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers.Authorization = token;
        }
        const res = await fetch(
          `${API_BASE_URL}/api/users/profile/` + postedBy,
          {
            method: "GET",
            headers,
          }
        );
        const data = await res.json();
        setUser(data);
     
      
      } catch (error) {
        console.log(error)
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };
    getUser();
  }, [postedBy, showToast]);

  const handleDeletePost=async(e)=>{

    const token = localStorage.getItem("token");
    try {
      e.preventDefault(
      )
      if(!window.confirm("Are you sure you want to delete this post"))return
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = token;
      }
      const res= await fetch(`${API_BASE_URL}/api/posts/${post._id}`,{
        method:"DELETE",
        headers,
      })
      const data= await res.json()
      showToast("Success","Post deleted",'success')

    } catch (error) {
      console.log(error)
      showToast("Error", error.message, "error");
    }
  }
  if (!user) return null;
  return (
    <Link to={`${user.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size="md"
            name="user pic"
            src={user.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`${user.username}`);
            }}
          />
          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>😒</Text>}
            {post.replies[0] && (
              <Avatar
                size="xs"
                name="John doe"
                src={post.replies[0].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left="15px"
                padding={"2px"}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size="xs"
                name="John doe"
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left="15px"
                padding={"2px"}
              />
            )}
            {post.replies[2] && (
              <Avatar
                size="xs"
                name="John doe"
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left="15px"
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                color={"gray.light"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`${user.username}`);
                }}
              >
                {user?.name}{" "}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                width={36}
                textAlign={"right"}
                color={"gray.light"}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
         {
          currentUser[0]._id === user._id && (
            <DeleteIcon size={20}  onClick={handleDeletePost}/>
          )
         }
            
        
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>

       
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
