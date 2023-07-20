"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function ProfilePage() {
  const [data, setData] = useState("nothing");
  const router = useRouter();

  const getUserData = async () => {
    try {
      const res = await axios.get('/api/users/me')
      console.log(res.data.message);
      setData(res.data.data._id)
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
      <h1 className=" text-3xl">Profile Page</h1>
      <hr />
      <h2 className="p-4 m-4 bg-green-400">
        current user :
        {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <button
        onClick={logout}
        className=" bg-blue-500 p-2 rounded-2xl  hover:bg-blue-600 m-4"
      >
        Logout
      </button>
      <button
        onClick={getUserData}
        className=" bg-orange-500 p-2 rounded-2xl  hover:bg-orange-600 m-4"
      >
        getUserData
      </button>
    </div>
  );
}
