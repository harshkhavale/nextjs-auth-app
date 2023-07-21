import { connect } from "@/dbConfig/dbConfig";

import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody;
    console.log("request body : ", reqBody );

    

    const user = await User.findOne({email})
    if(user){
        return NextResponse.json({error:"user already exists!"},{status:400})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);

    

    const savedUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(savedUser);

    await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        return NextResponse.json({
        message:"user crated successfully!",
        success:true,
        savedUser
    })

  } catch (error: any) {
    return NextResponse.json(
       {
        error:error.message,
        title:error.title
       },{
        status:500
       }
    );
  }
}
