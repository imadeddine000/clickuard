// pages/api/wazuh-auth.ts
import axios from 'axios';
import https from 'https';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export  async function GET() {
  try {
    const response = await axios.post(
      'https://101.44.39.177:55000/security/user/authenticate?raw=true',
      null,
      {
        auth: {
          username: 'wazuh',
          password: 'A9vuU5U*SZSdSAsNLwU0jZt246dDqsSd',
        },
        httpsAgent: new https.Agent(
          { 
          rejectUnauthorized: false
         }
        ),
      }
    );
    const data= await response.data
    const cookieStore = await cookies()
    console.log(data)
    cookieStore.set('token',data,{
      secure:true,
      httpOnly:true,
      maxAge:60*60,
      sameSite:'strict',
      path:'/'
    })
    return NextResponse.json({ success: true, token: data});
  } catch (error) {
    return NextResponse.json({ error });
  }
}
