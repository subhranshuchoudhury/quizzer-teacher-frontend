"use client";

import React, { useEffect } from "react";
import { useCookie } from "next-cookie";

export default function Home(props) {
  const cookie = useCookie(props.cookie);
  useEffect(() => {
    console.log("cookie", cookie.get("name"));
  }, []);

  return <div>Home</div>;
}
