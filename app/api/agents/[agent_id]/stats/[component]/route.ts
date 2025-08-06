// app/api/agents/[agent_id]/stats/[component]/route.js
import Axios from "@/lib/Axios";

import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const { agent_id, component } = params;

    const response = await Axios.get(`/agents/${agent_id}/stats/${component}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    const result = await response.data;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}