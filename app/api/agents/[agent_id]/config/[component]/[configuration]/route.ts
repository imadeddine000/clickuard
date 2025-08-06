// app/api/agents/[agent_id]/config/[component]/[configuration]/route.js
import Axios from "@/lib/Axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { agent_id, component, configuration } = params;

    const response = await Axios.get(`/agents/${agent_id}/config/${component}/${configuration}`, {
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