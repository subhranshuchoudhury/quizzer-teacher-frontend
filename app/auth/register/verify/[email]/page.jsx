"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { ImSpinner } from "react-icons/im";

export default function page(props) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);
  const [otp, setOTP] = useState("");
  const [Loading, setLoading] = useState(false);
  const [timingBool, setTimingBool] = useState(true);
  const [showCountDown, setShowCountDown] = useState(false);
  const [isSendingMail, setisSendingMail] = useState(true);
  useEffect(() => {
    if (decodeURIComponent(props.params.email) == "undefined") {
      toast.error("Invalid email");
      router.replace("/");
      return;
    }

    setEmail(decodeURIComponent(props.params.email));
    sendOTP(decodeURIComponent(props.params.email));
  }, []);

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success(data?.message);
        router.replace("/auth/login");
      } else {
        toast.error(data?.message);
        if (data?.message === "Teacher already verified") {
          router.replace("/auth/login");
        }
      }
    } catch (error) {
      toast.error("Server failure");
    }
    setLoading(false);
  };

  const sendOTP = async (email) => {
    setisSendingMail(true);
    setShowCountDown(false);
    try {
      const res = await fetch("/api/auth/otp", {
        cache: "no-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setTimer(300);
        toast.success(data?.message);
      } else {
        setTimer(300 - Number(data?.duration) * 60);
        toast.success(data?.message);
        console.log(data?.message);
      }
      setShowCountDown(true);
      setisSendingMail(false);
    } catch (error) {
      toast.error("Server failure");
      setShowCountDown(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <div className="fixed top-0 left-0 p-10">
        <Link href={"/auth/register"}>
          <button className="flex items-center space-x-2">
            <BiArrowBack />
            <span>Register</span>
          </button>
        </Link>
      </div>
      <div className="fixed top-0 right-0 p-10">
        {showCountDown && (
          <CountdownCircleTimer
            size={50}
            isPlaying
            duration={timer}
            onComplete={() => {
              setTimingBool(false);
              setShowCountDown(false);
            }}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={4}
          >
            {({ remainingTime }) => {
              return remainingTime;
            }}
          </CountdownCircleTimer>
        )}
      </div>
      <form className="form-control p-5 shadow-md shadow-[#000000] bg-[#0c1a26] md:w-[400px] w-[90%] rounded-xl">
        <div className="flex items-center space-x-2 pb-7">
          <div className="w-[15px] h-[15px] rounded-full bg-red-500"></div>
          <div className="w-[15px] h-[15px] rounded-full bg-yellow-500"></div>
          <div className="w-[15px] h-[15px] rounded-full bg-green-500"></div>
        </div>

        <div>
          <p className="text-3xl text-white text-center font-[700]">
            Verification
          </p>

          <div className="py-5 space-y-4">
            <div className="relative w-full flex flex-col justify-center">
              <input
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
                value={otp}
                required
                type="text"
                className="w-full peer bg-transparent focus:shadow-md border border-[#152d41] px-4 py-3 rounded-md outline-none"
                name="registration"
              />
              <label
                htmlFor="tp"
                className={`absolute ${
                  otp?.trim()?.length > 0
                    ? "translate-y-[-22.5px] text-white "
                    : "  "
                } peer-focus:translate-y-[-22.5px] peer-focus:text-white md:text-base text-sm left-4 transition-transform pointer-events-none bg-[#0c1a26]`}
              >
                OTP
              </label>
            </div>
            <div>
              {Loading ? (
                <span className="bg-[#115791] w-full p-3 rounded-md hover:text-white hover:bg-[#39a6ff] transition-all ease-linear inline-block text-center duration-300 mb-2">
                  Loading <ImSpinner className="animate-spin inline" />
                </span>
              ) : (
                <button
                  hidden={!showCountDown}
                  onClick={verifyOTP}
                  className="bg-[#115791] w-full p-3 rounded-md hover:text-white hover:bg-[#39a6ff] transition-all ease-linear duration-300"
                >
                  Verify Email
                </button>
              )}

              {!showCountDown ? (
                <span
                  onClick={() => {
                    if (!isSendingMail) sendOTP(email);
                  }}
                  className={`bg-[#115791] w-full p-3 cursor-pointer inline-block rounded-md hover:text-white hover:bg-[#39a6ff] transition-all ease-linear text-center  duration-300 ${
                    timingBool ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSendingMail ? (
                    <span>
                      Sending OTP <ImSpinner className="animate-spin inline" />
                    </span>
                  ) : (
                    "Resend OTP"
                  )}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
