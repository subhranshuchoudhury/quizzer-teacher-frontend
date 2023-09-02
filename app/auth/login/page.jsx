"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(props) {
  const [InputForm, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...InputForm, [name]: value });
  };

  const loginEvent = async (e) => {
    try {
      const res = await fetch("/api/auth/login", {
        cache: "no-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(InputForm),
      });

      if (res.status === 200) {
        router.push("/");
      }
      console.log(data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Your official mail</span>
          <span className="label-text-alt">eg. XXX@soa.ac.in</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="email"
          onChange={handleChange}
          value={InputForm.email || ""}
        />

        <label className="label">
          <span className="label-text">Password</span>
          <span className="label-text-alt">min. 6 character</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="password"
          onChange={handleChange}
          value={InputForm.password || ""}
        />
      </div>
      <button
        className="btn btn-primary btn-outline btn-sm"
        onClick={loginEvent}
      >
        Submit
      </button>
    </>
  );
}
