import Axios from "@/lib/Axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// app/api/agents/insert/route.js
export async function POST(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { force_time, id, ip, key, name } = await request.json();

    const response = await Axios.post("/agents/insert", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        force_time,
        id,
        ip,
        key,
        name
      }
    });

    const result = await response.data;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}