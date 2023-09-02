import { NextResponse } from "next/server";

export const POST = async (req) => {
  const data = await req.json();
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    email: data?.email,
    password: data?.password,
    name: data?.name,
    subject: data?.subject,
    primaryPhone: data?.phone,
    regdNo: data?.registration,
  });

  const response = await fetch(
    "http://194.195.118.134/api/teacher/auth/register",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  const parsedResponse = await response.json();

  return NextResponse.json(parsedResponse, { status: response.status });
};
