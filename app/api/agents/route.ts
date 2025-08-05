import axios from "axios";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import https from 'https'
export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    
    const response = await axios.get("https://101.44.39.177:55000/agents", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNzU0Mzg5MDA0LCJleHAiOjE3NTQzODk5MDQsInN1YiI6IndhenVoIiwicnVuX2FzIjpmYWxzZSwicmJhY19yb2xlcyI6WzFdLCJyYmFjX21vZGUiOiJ3aGl0ZSJ9.AC4QoBZIDBoMoONb7zqp6T1JMdUWhs6NAuwQ4b958FDwkLX7tZeIbydNoIRntHroodGHgez-I0mavGiO5ibnbFAeAbWt9HcAKyAP-182SLVXmS2NY6ePD2CnTAOhqp5f4K0EcWgs_UcD9bkbgVZeFq4UVy1_KOcbckcxx_7PNWMJDFR5`,
      },
      httpsAgent: new https.Agent(
                { 
                  rejectUnauthorized: false
                }
      ),
    });
    
    const result = await response.data
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(error)
  }
}
