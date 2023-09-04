import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const token = cookies().get("x-access-token").value;

  // const reqBody = await req.json();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  };

  try {
    const response = await fetch(
      "http://194.195.118.134/api/teacher/quiz/create-quiz",
      options
    );

    const responseData = await response.json();
    console.log(responseData);
    return NextResponse.json(responseData, { status: response.status });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
