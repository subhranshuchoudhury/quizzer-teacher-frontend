import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req) => {
  const data = await req.json();
  const headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    email: data?.email,
    password: data?.password,
    name: data?.name,
    subject: data?.subject,
    primaryPhone: data?.phone,
    regdNo: data?.regdNo,
  });

  const response = await fetch(
    "http://localhost:5000/api/teacher/auth/register",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  const dataD = await response.json();
  console.log(dataD);

  return NextResponse.json(dataD, { status: response.status });
};
