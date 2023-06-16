"use client";
import React, { useState, useEffect } from "react";
import vibro from "../../../public/VibroSonic.svg";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in using local storage
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      // User is already logged in, redirect to the desired page
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://vibrosonic.onrender.com/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        // Login successful
        Swal.fire({
          title: "Login successful!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK!",
        });

        // Set the logged in status in local storage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("LoggedInEmail", email);
        setLoading(false);
        // Redirect to the desired page
        router.push("/");
      } else {
        Swal.fire({
          title: "Looks like something is incorrect!",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK!",
        });
        setLoading(false);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      Swal.fire({
        title: "Looks like something is incorrect!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK!",
      });
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <section className=" ">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative mx-auto  max-w-[525px] overflow-hidden rounded-lg bg-[#ffffff07] py-16 px-10 text-center sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center md:mb-16">
                  <a
                    href="javascript:void(0)"
                    className="mx-auto inline-block max-w-[160px]"
                  >
                    <Image src={vibro} alt="logo" />
                  </a>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Email"
                      className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-black placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      placeholder="Password"
                      className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-black placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {loading ? <div className="loader mx-auto my-6"></div> : ""}
                  <div className="mb-10">
                    <input
                      type="submit"
                      value="Sign In"
                      className="bordder-primary w-full cursor-pointer rounded-md  bg-primary py-3 px-5  text-white transition hover:bg-opacity-50 text-lg font-semibold"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
