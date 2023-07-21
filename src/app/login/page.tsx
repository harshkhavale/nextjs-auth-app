"use client";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
   email: "",
    password: "",
  });
const [loading,setLoading] = useState(false);
const [buttonDisabled,setButtonDisabled] = useState(false);

  const onLogin = async () => {

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login",user);
      console.log('login success', response.data);
      toast.success("login success");
      router.push("/profile");
         
      
    } catch (error:any) {
      console.log("login failed",error.message);
      toast.error(error.message)
    }
    finally{
      setLoading(false)
    }
    
  };
  useEffect(()=>{
if(user.email.length>0 && user.password.length>0){
    setButtonDisabled(false)
}
else{
  setButtonDisabled(true)
}
  },[user])
  return (
    <div>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl">{loading?"wait a moment":"login"}</h1>
      <hr />
<div className="my-1">
      <label className="my-1 block" htmlFor="email">email</label>
      <input
        className="p-2 focus:border-gray-600 focus:outline-none text-black rounded-lg"
        type="text"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="email"
      />
      </div>

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
      <button onClick={onLogin} className=" bg-green-400 rounded-2xl p-2 text-black hover:bg-green-600 m-8">
        {buttonDisabled?"no log in":"login"}
      </button>
      <Link className=" underline" href="/signup">Don't have any account</Link>
    </div></div>
  );
}
