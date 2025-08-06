// app/api/agents/[agent_id]/group/route.js
import axios from "axios";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request, { params }) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { agent_id } = params;
    const { groups_list } = await request.json();

    const response = await Axios.delete(`/agents/${agent_id}/group`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        groups_list
      }
    });

    const result = await response.data;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}