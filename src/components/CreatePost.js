import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  Textarea,
  Text,
  useColorModeValue,
  useDisclosure,
  Input,
  Flex,
  Image,
  CloseButton,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

import useShowToast from "../hooks/useShowToast";
import { API_BASE_URL } from "../config";
import usePreviewImg from "./../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";

const CreatePost = () => {
    const user = useRecoilState(userAtom);
    console.log(user)
     
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [postText, setPostText] = useState("");

  const showToast = useShowToast();

  const imageRef = useRef(null);

  let Max_char = 500;

  const [remainingChar, setRemainingChar] = useState(Max_char);

  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > Max_char) {
      const truncatedText = inputText.slice(0, Max_char);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(Max_char - inputText.length);
    }
  };
  const handleCreatePost = async () => {
    const token = localStorage.getItem("token");
    try {
      const headers = {
        "Content-Type": "application/json",
      };
  
      if (token) {
        headers.Authorization = token;
      }
  
      const postData = {
        postedBy: user[0]._id, 
        text: postText,
        img: imgUrl,
      };
  
      const res = await fetch(`${API_BASE_URL}/api/posts/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(postData),
      });
  
      const data = await res.json();
  
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
  
      showToast("Success", "Post created successfully", "success");
      onClose();
    } catch (error) {
      showToast("Error", error, "error");
    }
  };
  
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "dark.300")}
        onClick={onOpen}
      >
        Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here"
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontSize="xs"
                fontWeight="bold"
                textAlign={"right"}
                m={"1"}
                color={"gray.800"}
              >
                {remainingChar}/{Max_char}
              </Text>
              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />
              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
                onClick={() => imageRef.current.click()}
              />
              {imgUrl && (
                <Flex mt={5} w={"full"} position={"relative"}>
                  <Image src={imgUrl} alt="Selected Image" />
                  <CloseButton
                    onClick={() => setImgUrl("")}
                    bg={"gray.800"}
                    position={"absolute"}
                    top={2}
                    right={2}
                  />
                </Flex>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
