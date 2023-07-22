"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileImage from '@/assets/rabbit.png'
export default function ProfilePage() {
  const [user, setUser] = useState({
    _id:"",
    username:"",
    email:""
    
  });
  const router = useRouter();
useEffect(()=>{
  getUserData();
},[]);
  const getUserData = async () => {
    try {
      const res = await axios.get('/api/users/me')
      console.log(res.data.message);
      setUser(res.data.user);
      console.log(user)

    }catch(error:any){
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      axios.get("/api/users/logout");
      toast.success("Logout successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex  flex-col min-h-screen justify-center items-center p-4">
      <div className="flex justify-center items-center space-x-28">
      <h1 className=" text-xl p-2 rounded-sm  left-0  bg-orange-400">Profile Page</h1>
      <button
        onClick={logout}
        className=" bg-blue-500 p-3 rounded-2xl  hover:bg-blue-800 m-4"
      >
        Logout
      </button>
      </div>
      <hr />
      <div className="flex shadow-lg rounded-lg justify-center items-center p-6 bg-green-400">
      <Image className=" h-14 m-4 w-auto" src={profileImage} alt="profile" ></Image>
      <div className="p-4 ">
        
      <p className=" text-center my-4 text-xl">current user :</p>
      <p>user_id :</p> <p className="text-xl">{user._id}</p> 
      <p>user_name :</p> <p className="text-xl">{user.username}</p> 
      <p>email :</p><p className="text-xl">{user.email}</p> 


        
       
      </div>
      </div>
      
      
    </div>
  );
}
