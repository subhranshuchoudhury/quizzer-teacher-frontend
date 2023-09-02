"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [registration, setRegistration] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();

  const loginEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        cache: "no-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          registration,
          phone,
          subject,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        toast.success(data?.message);
        router.push(`/auth/register/verify/${email}`);
      } else if (res.status === 301) {
        toast.success(data?.message);
        router.push(`/auth/register/verify/${email}`);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Server failure");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <div className="fixed top-0 left-0 p-10">
        <Link href={"/"}>
          <button className="flex items-center space-x-2">
            <BiArrowBack />
            <span>Home</span>
          </button>
        </Link>
      </div>
      <form className="form-control p-5 shadow-md shadow-[#000000] bg-[#0c1a26] md:w-[400px] w-[90%] rounded-xl">
        <div className="flex items-center space-x-2 pb-7">
          <div className="w-[15px] h-[15px] rounded-full bg-red-500"></div>
          <div className="w-[15px] h-[15px] rounded-full bg-yellow-500"></div>
          <div className="w-[15px] h-[15px] rounded-full bg-green-500"></div>
        </div>
        <p className="text-center ">hi there,</p>
        <p className="text-center text-white uppercase text-3xl font-[700]">
          CREATE ACCOUNT
        </p>
        <div className="py-5 space-y-4">
          <div className="relative w-full flex flex-col justify-center">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
              type="email"
              className="w-full peer bg-transparent focus:shadow-md border border-[#152d41] px-4 py-3 rounded-md outline-none text-white"
              name="from_name"
            />
            <label
              htmlFor="email"
              className={`absolute ${
                email?.trim()?.length > 0
                  ? "translate-y-[-22.5px] text-white "
                  : "  "
              } peer-focus:translate-y-[-22.5px] peer-focus:text-white md:text-base text-sm left-4 transition-transform pointer-events-none bg-[#0c1a26]`}
            >
              Email
            </label>
          </div>
          <div className="relative w-full flex flex-col justify-center">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              autoComplete="new-password"
              required
              type="password"
              className="w-full peer bg-transparent focus:shadow-md border border-[#152d41] px-4 py-3 rounded-md outline-none text-white"
              name="from_name"
            />
            <label
              htmlFor="password"
              className={`absolute ${
                password?.trim()?.length > 0
                  ? "translate-y-[-22.5px] text-white "
                  : "  "
              } peer-focus:translate-y-[-22.5px] peer-focus:text-white md:text-base text-sm left-4 transition-transform pointer-events-none bg-[#0c1a26]`}
            >
              Password
            </label>
          </div>
          <div className="relative w-full flex flex-col justify-center">
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
              type="text"
              className="w-full peer bg-transparent focus:shadow-md border border-[#152d41] px-4 py-3 rounded-md outline-none text-white"
              name="from_name"
            />
            <label
              htmlFor="name"
              className={`absolute ${
                name?.trim()?.length > 0
                  ? "translate-y-[-22.5px] text-white "
                  : "  "
              } peer-focus:translate-y-[-22.5px] peer-focus:text-white md:text-base text-sm left-4 transition-transform pointer-events-none bg-[#0c1a26]`}
            >
              Full Name
            </label>
          </div>
          <div className="relative w-full flex flex-col justify-center">
            <input
              onChange={(e) => {
                setRegistration(e.target.value);
              }}
              value={registration}
              required
              type="text"
              className="w-full peer bg-transparent focus:shadow-md border border-[#152d41] px-4 py-3 rounded-md outline-none text-white"
              name="registration"
            />
            <label
              htmlFor="name"
              className={`absolute ${
                registration?.trim()?.length > 0
                  ? "translate-y-[-22.5px] text-white "
                  : "  "
              } peer-focus:translate-y-[-22.5px] peer-focus:text-white md:text-base text-sm left-4 transition-transform pointer-events-none bg-[#0c1a26]`}
            >
              Registration Id
            </label>
          </div>
          <div className="relative w-full flex flex-col justify-center">
            <input
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              value={subject}
              required
              type="text"
              className="w-full peer bg-transparent focus:shadow-md border border-[#152d41] px-4 py-3 rounded-md outline-none text-white"
              name="subject"
            />
            <label
              htmlFor="subject"
              className={`absolute ${
                subject?.trim()?.length > 0
                  ? "translate-y-[-22.5px] text-white"
                  : "  "
              } peer-focus:translate-y-[-22.5px] peer-focus:text-white md:text-base text-sm left-4 transition-transform pointer-events-none bg-[#0c1a26]`}
            >
              Subject
            </label>
          </div>
          <div className="relative w-full flex flex-col justify-center">
            <input
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              value={phone}
              required
              type="text"
              className="w-full peer bg-transparent focus:shadow-md border border-[#152d41] px-4 py-3 rounded-md outline-none text-white"
              name="phone"
            />
            <label
              htmlFor="phone"
              className={`absolute ${
                phone?.trim()?.length > 0
                  ? "translate-y-[-22.5px] text-white"
                  : "  "
              } peer-focus:translate-y-[-22.5px] peer-focus:text-white md:text-base text-sm left-4 transition-transform pointer-events-none bg-[#0c1a26]`}
            >
              Phone
            </label>
          </div>
          <div>
            <button
              onClick={loginEvent}
              className="bg-[#115791] w-full p-3 rounded-md hover:text-white hover:bg-[#39a6ff] transition-all ease-linear duration-300"
            >
              Register
            </button>
          </div>
          <div className="text-center">
            Already Have An Account?{" "}
            <Link href={"/auth/login"}>
              <span className="text-[#fff] inline underline"> Login Now</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
