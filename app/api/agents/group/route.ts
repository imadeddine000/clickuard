
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import Axios from "@/lib/Axios";
export async function GET() {
  try {
    const cookieStore =  cookies();
    const token = (await cookieStore).get("token")?.value;
    console.log("TOKEN ISJ: ", token);

    const response = await Axios.get("/groups", {
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

// app/api/agents/group/route.js
export async function PUT(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { agents_list, group_id, force_single_group } = await request.json();

    const response = await Axios.put("/agents/group", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        agents_list,
        group_id,
        force_single_group
      }
    });

    const result = await response.data;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { agents_list, group_id } = await request.json();

    const response = await Axios.delete("/agents/group", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        agents_list,
        group_id
      }
    });

    const result = await response.data;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}