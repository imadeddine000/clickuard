// app/api/agents/upgrade-custom/route.js
import Axios from "@/lib/Axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function PUT(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { agents_list, file_path, installer } = await request.json();

    const response = await Axios.put("/agents/upgrade_custom", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        agents_list,
        file_path,
        installer
      }
    });

    const result = await response.data;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}