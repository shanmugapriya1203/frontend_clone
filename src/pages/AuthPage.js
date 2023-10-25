import React from 'react'
import SignupCard from '../components/Signup'
import LoginCard from '../components/Login'
import {  useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom'

const AuthPage = () => {
	const authScreenState = useRecoilValue(authScreenAtom);

	return <>
  {authScreenState === "login" ? <LoginCard /> : <SignupCard />}
  </>;
};
export default AuthPage;
