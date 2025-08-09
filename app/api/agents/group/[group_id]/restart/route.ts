import Axios from "@/lib/Axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// app/api/agents/group/[group_id]/restart/route.js
export async function PUT(request, { params }) {
  try {
    const cookieStore = await  cookies();
    const token = cookieStore.get("token")?.value;
    const { group_id } = params;

    const response = await Axios.put(`/agents/group/${group_id}/restart`, {
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