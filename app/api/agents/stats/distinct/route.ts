// app/api/agents/stats/distinct/route.js
import Axios from "@/lib/Axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const response = await Axios.get("/agents/stats/distinct", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.data;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}