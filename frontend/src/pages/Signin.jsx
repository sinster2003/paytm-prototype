import { useEffect } from 'react'
import { Button, ButtonWarning, Heading, InputBox, SubHeading } from '../components'
import useFormData from '../custom-hooks/useFormData';
import signinObject from '../zod/signin';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const {register, handleSubmit, errors} = useFormData(signinObject);
  const navigate = useNavigate();

  useEffect(() => {
    if(Object.keys(errors).length) {
      const errorMessage = Object.values(errors)[0]?.message;
      toast.error(errorMessage);
    }
  }, [errors]);

  const onSubmit = async (data) => {
    try{
      const response = await axios.post(`/api/v1/user/signin`, data);
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
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-10 py-6 shadow-2xl border-gray-200 border-1">
      <div>
        <Heading heading="Sign in"/>
        <SubHeading subHeading="Enter your information to login" />
      </div>
      <div>
        <InputBox label="User name" text="john.23" zodProperty="username" register={register}/>
        <InputBox label="Password" text="" type="password" zodProperty="password" register={register}/>
      </div>
      <div>
        <Button buttonText="Sign in"/>
        <ButtonWarning text="Do not have an account? " link="/signup" linkText="Signup"/>
      </div>
    </form>
  )
}

export default Signin