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
      const res = await fetch("/api/auth/register", {
        cache: "no-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(InputForm),
      });

      const data = await res.json();
      if (res.status === 200) {
        alert(data?.message);
      } else if (res.status === 301) {
        // const encryptedEmail = cryptr.encrypt(InputForm?.email);
        router.push(`/auth/register/verify/${InputForm?.email}`);
        console.log(data);
      } else {
        alert(data?.message);
      }
    } catch (error) {
      alert("Server failure");
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

        <label className="label">
          <span className="label-text">Name</span>
          <span className="label-text-alt">name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="name"
          onChange={handleChange}
          value={InputForm.name || ""}
        />

        <label className="label">
          <span className="label-text">Subject</span>
          <span className="label-text-alt">subject</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="subject"
          onChange={handleChange}
          value={InputForm.subject || ""}
        />

        <label className="label">
          <span className="label-text">Registration</span>
          <span className="label-text-alt">Registration</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="regdNo"
          onChange={handleChange}
          value={InputForm.regdNo || ""}
        />

        <label className="label">
          <span className="label-text">Phone</span>
          <span className="label-text-alt">Phone</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="phone"
          onChange={handleChange}
          value={InputForm.phone || ""}
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
