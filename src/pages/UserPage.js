import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
<UserHeader/>
<UserPost likes={1200} replies={481} postImg="/post1.png" postTitle="Lets talk about threads" name="Mark Zuckerberg"/>
<UserPost likes={1400} replies={567} postImg="/post3.png" postTitle="Dont copy Twitter" name="Elon musk"/>
<UserPost likes={1600} replies={1200} postImg="/post2.webp" postTitle="I dont want to play with You anymore @twitter" name="Mr Beast"/>


</>
  )
}

export default UserPage
