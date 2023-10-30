import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import { API_BASE_URL } from '../config'
import useShowToast from '../hooks/useShowToast'
import {FiLogOut} from 'react-icons/fi'

const LogoutButton = () => {
    const setUser=useSetRecoilState(userAtom)
    const showToast= useShowToast()
    const handleLogout= async()=>{
    try {
           
            const res= await fetch(`${API_BASE_URL}/api/users/logout`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },

            })
            const data = await res.json();
            
            if(data.error){
               showToast("Error",data.error,"error")
               return;
            }
            localStorage.removeItem("user-threads");
            localStorage.removeItem("token");
            setUser(null)
        } catch (error) {
            console.log(error)
        }
    }
  return (
  <Button
  position={"fixed"}
  top={"30px"}
  right={"30px"}
  size={"sm"}
  onClick={handleLogout}
  >
<FiLogOut size={20}/>
  </Button>
  )
}

export default LogoutButton
