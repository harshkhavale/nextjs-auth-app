"use client";
import Link from "next/link";
import React, { useEffect , useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled,setButtonDisabled] = useState(false);
  const [loading,setLoading] = useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup",user);
      console.log("signup success",response.data);
      router.push("/login");
    } catch (error:any) {
      toast.error(error.message);
      console.log("signup failed",error.message);    }
      finally{
        setLoading(false);
      }
   
    
  };
 
  useEffect(()=>{
      if(user.username.length>0 && user.email.length>0 && user.password.length>0){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
  },[user]);

  return (
    <div>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">{loading ? "wait a moment" : "signup"}</h1>
      <hr />
<div className="my-1">
      <label className="my-1 block" htmlFor="username">username</label>
      <input
        className="p-2 focus:border-gray-600 focus:outline-none text-black rounded-lg"
        type="text"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder="username"
      />
      </div>
<div className="my-1">
<label className="my-1 leading-6 block" htmlFor="email">email</label>
      <input
        className="p-2 focus:border-gray-600 focus:outline-none text-black rounded-lg"
        type="text"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="email"
      /></div>
<div className="my-1">
      <label className="my-1 leading-6 block" htmlFor="password">password</label>
      <input
        className="p-2 focus:border-gray-600 focus:outline-none text-black rounded-lg"
        type="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="password"
      />
</div>
      <button onClick={onSignup} className=" bg-green-400 rounded-2xl p-2 text-black hover:bg-green-600 m-8">
       {buttonDisabled ? "no signup" : "signup"}
      </button>
      <Link className=" underline" href="/login">Already have an account?</Link>
    </div></div>
  );
}
