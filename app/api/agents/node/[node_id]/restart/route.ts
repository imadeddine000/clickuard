import { NextResponse } from "next/server";

// app/api/agents/node/[node_id]/restart/route.js
export async function PUT(request, { params }) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { node_id } = params;

    const response = await Axios.put(`/agents/node/${node_id}/restart`, {
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