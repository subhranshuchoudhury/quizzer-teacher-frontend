import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req) => {
  const data = await req.json();

  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    email: data?.email,
    password: data?.password,
  });

  const response = await fetch(
    "http://194.195.118.134/api/teacher/auth/login",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let dataResponse = await response.json();
  console.log("dataResponse", dataResponse);

  if (dataResponse?.accessToken) {
    cookies().set("x-access-token", `${dataResponse?.accessToken}`, {
      expires: new Date().getTime() + 10800 * 1000,
    });
  } else {
    cookies().delete("x-access-token");
  }
  return NextResponse.json(dataResponse, { status: response.status });
};
