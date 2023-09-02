import { NextResponse } from "next/server";

export const POST = async (req) => {
  const data = await req.json();

  console.log("data", data);

  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    email: data?.email,
  });

  let response = await fetch(
    "http://localhost:5000/api/teacher/auth/send-otp",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let responseData = await response.json();

  return NextResponse.json(responseData, { status: response.status }); // * testing
};
