"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { ImSpinner } from "react-icons/im";
// import { useCookie } from "next-cookie";

export default function Login(props) {
  const router = useRouter();
  // const cookie = useCookie(props.cookie);
  // console.log("cookie", cookie.get("name"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const loginEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        cache: "no-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 200) {
        router.push("/");
        toast.success("Successfully logged In");
      }
    } catch (error) {
      console.log("ERROR", error);
    }
    setLoading(false);
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
        <p className="text-center ">welcome back,</p>
        <p className="text-center text-white uppercase text-3xl font-[700]">
          Login Now 🚀
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
              className="w-full peer bg-transparent focus:shadow-md border border-[#152d41] px-4 py-3 rounded-md outline-none"
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
              className="w-full peer bg-transparent focus:shadow-md border border-[#152d41] px-4 py-3 rounded-md outline-none"
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
          <div>
            {Loading ? (
              <span className="bg-[#115791] w-full p-3 rounded-md hover:text-white hover:bg-[#39a6ff] transition-all ease-linear inline-block text-center duration-300 mb-2">
                Loading <ImSpinner className="animate-spin inline" />
              </span>
            ) : (
              <button
                onClick={loginEvent}
                className="bg-[#115791] w-full p-3 rounded-md hover:text-white hover:bg-[#39a6ff] transition-all ease-linear duration-300"
              >
                Login
              </button>
            )}
          </div>
          <div className="text-center">
            Don't Have An Account?{" "}
            <Link href={"/auth/register"}>
              <span className="text-[#fff] inline underline"> Create Now</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
