import { useEffect } from 'react';
import { Button, ButtonWarning, Heading, InputBox, SubHeading } from '../components'
import useFormData from '../custom-hooks/useFormData';
import signupObject from '../zod/signup';
import axios from "axios";
import {toast} from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const {register, handleSubmit, errors} = useFormData(signupObject);
  const navigate = useNavigate();

  useEffect(() => {
    if(Object.keys(errors).length) {
      const errorMessage = Object.values(errors)[0]?.message;
      toast.error(errorMessage);
    }
  }, [errors]);

  const onSubmit = async (data) => {
    try{
      const response = await axios.post(`/api/v1/user/signup`, data);
      const result = await response?.data;
      const token = result?.token
      // setting token in headers.authorization
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //navigate to dashboard
      navigate("/dashboard");
      // toast
      toast.success(result?.message);
    }
    catch(error) {
      console.log(error);
      toast.error(result?.response?.data?.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-10 py-6 shadow-2xl border-gray-200 border-1 m-4">
      <div>
        <Heading heading="Sign up"/>
        <SubHeading subHeading="Enter your information to create an account" />
      </div>
      <div>
        <InputBox label="First name" text="John" zodProperty="firstname" register={register}/>
        <InputBox label="Last name" text="Doe" zodProperty="lastname" register={register}/>
        <InputBox label="Email" text="sindhur@gmail.com" zodProperty="email" register={register}/>
        <InputBox label="User name" text="john.23" zodProperty="username" register={register}/>
        <InputBox label="Password" text="" type="password" zodProperty="password" register={register}/>
      </div>
      <div>
        <Button buttonText="Sign up"/>
        <ButtonWarning text="Already an user? " link="/signin" linkText="Login"/>
      </div>
    </form>
  )
}

export default Signup