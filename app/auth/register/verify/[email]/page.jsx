"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function page(props) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);
  const [otp, setOTP] = useState("");
  useEffect(() => {
    try {
      setEmail(decodeURIComponent(props.params.email));
      sendOTP(decodeURIComponent(props.params.email));
    } catch (error) {
      alert("Invalid Link");
    }
  }, []);

  const verifyOTP = async () => {
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
        alert(data?.message);
        router.replace("/auth/login");
      } else {
        alert(data?.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      alert("server error");
    }
  };

  const sendOTP = async (email) => {
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
        alert(data?.message);
      } else {
        alert(data?.message);
        setTimer(300 - Number(data?.duration) * 60);
        console.log(data);
      }
    } catch (error) {
      console.log("ERROR");
    }
  };

  return (
    <>
      {email ? (
        <div>
          <CountdownCircleTimer
            isPlaying
            duration={timer}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>

          <div>Verification for {email}</div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">OTP</span>
              <span className="label-text-alt">enter OTP</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={otp || ""}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
          <button
            onClick={verifyOTP}
            className="btn btn-primary btn-outline btn-sm"
          >
            Submit
          </button>
        </div>
      ) : (
        <div>Decrypting...</div>
      )}
    </>
  );
}
