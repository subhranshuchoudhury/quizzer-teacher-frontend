import { NextResponse } from "next/server";

export const POST = async (req) => {
  const requestBody = await req.json();

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    email: requestBody?.email,
    otp: requestBody?.otp,
  });

  let response = await fetch("http://194.195.118.134/api/teacher/auth/verify", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();

  return NextResponse.json(data, { status: response.status });
};
