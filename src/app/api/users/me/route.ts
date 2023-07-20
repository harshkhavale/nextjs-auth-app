import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
     const user = await User.findOne({_id:userId});
     if(!user){
      console.log("user not found")
     }
     return NextResponse.json({
        message:"User found",
        data: user
     })
     console.log("token successfully sended")


  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
