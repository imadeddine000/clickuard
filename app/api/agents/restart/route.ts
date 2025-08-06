import Axios from "@/lib/Axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// app/api/agents/restart/route.js
export async function PUT(request) {
  try {
    const cookieStore =await  cookies();
    const token = cookieStore.get("token")?.value;
    const { agents_list } = await request.json();

    const response = await Axios.put("/agents/restart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        agents_list
      }
    });

    const result = await response.data;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}