// app/api/agents/[agent_id]/restart/route.js
import axios from "axios";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { agent_id } = params;

    const response = await Axios.put(`/agents/${agent_id}/restart`, {
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