// app/api/agents/[agent_id]/group/[group_id]/route.js
import axios from "axios";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { agent_id, group_id } = params;

    const response = await Axios.delete(`/agents/${agent_id}/group/${group_id}`, {
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

export async function PUT(request, { params }) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { agent_id, group_id } = params;
    const { force_single_group } = await request.json();

    const response = await Axios.put(`/agents/${agent_id}/group/${group_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        force_single_group
      }
    });

    const result = await response.data;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}