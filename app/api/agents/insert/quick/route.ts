import Axios from "@/lib/Axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// app/api/agents/insert/quick/route.js
export async function POST(request) {
  try {
    const cookieStore =await  cookies();
    const token = cookieStore.get("token")?.value;
    const { agent_name } = await request.json();

    const response = await Axios.post("/agents/insert/quick", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        agent_name
      }
    });

    const result = await response.data;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}