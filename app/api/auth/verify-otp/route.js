import { NextResponse } from "next/server";

export const POST = async (req) => {
  const requestBody = await req.json();

  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    email: requestBody?.email,
    otp: requestBody?.otp,
  });

  console.log(requestBody);

  let response = await fetch("http://localhost:5000/api/teacher/auth/verify", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  console.log(data);

  return NextResponse.json(data, { status: response.status });
};
