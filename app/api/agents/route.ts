import axios from "axios";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import https from 'https'
import Axios from "@/lib/Axios";
export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    console.log("TOKEN ISJ: ", token);
    
    
    const response = await Axios.get("/agents",{
       headers: {
         Authorization: `Bearer ${token}`,
      },
    })
    
    const result = await response.data
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(error)
  }
}
