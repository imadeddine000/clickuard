import axios from "axios";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import https from 'https'
export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    console.log("TOKEN ISJ: ", token);
    
    const response = await axios.get("https://101.44.39.177:55000/agents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent: new https.Agent(
                { 
                  rejectUnauthorized: false
                }
      ),
    });
    
    const result = await response.data
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(error)
  }
}
