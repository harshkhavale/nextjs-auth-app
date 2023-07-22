"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onLogin = async () => {
    if(
      !buttonDisabled
    ){
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("login success", response.data);
        toast.success("login success");
        router.push("/profile");
      } catch (error: any) {
        console.log("login failed", error.message);
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    }else{
      toast("all fields are mandatory!")
    }
   
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center rounded-xl shadow-xl  p-8 py-2">
        <h1 className="text-xl bg-orange-500 rounded-md px-3">{loading ? "wait a moment..." : "login"}</h1>
        <hr />
        <div className="my-1">
          <label className="my-1 block" htmlFor="email">
            email
          </label>
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
