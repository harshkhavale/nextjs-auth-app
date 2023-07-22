import { connect } from "@/dbConfig/dbConfig";
import jwt from 'jsonwebtoken';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
connect();

export async function POST(request: NextRequest) {
  try {

    const reqBody = await request.json()
    const {email,password} = reqBody;
    console.log("request body : ",reqBody);


    const user = await User.findOne({email})
    if(!user){
        return NextResponse.json({error:"user not exist,try signup!"},{status:400})
    }
    console.log(user);
    const validPassword = await bcryptjs.compare(password,user.password);
    if(!validPassword){
        return NextResponse.json({error:"Invalid password!"},{status:400})
    }
    const tokenData = {
      id:user._id,
      username:user.username,
      email:user.email

    }
       const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

       const response = NextResponse.json({
        message:"Login Successfully!",
        success:true,
       })
       response.cookies.set("token",token,{
        httpOnly:true
       })
       return response;

  } catch (error: any) {
    NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
    console.log(error.message);
  }
}
