import Axios from "@/lib/Axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { agents_list, wpk_repo, version, use_http, force } = await request.json();

    const response = await Axios.put("/agents/upgrade", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        agents_list,
        wpk_repo,
        version,
        use_http,
        force
      }
    });

    const result = await response.data;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}