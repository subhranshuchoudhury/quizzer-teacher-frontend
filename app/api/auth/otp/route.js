import { NextResponse } from "next/server";

export const POST = async (req) => {
  const data = await req.json();

  console.log("data", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    email: data?.email,
  });

  let response = await fetch(
    "http://194.195.118.134/api/teacher/auth/send-otp",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let responseData = await response.json();

  return NextResponse.json(responseData, { status: response.status }); // * testing
};
