"use client";
import React, { useEffect } from "react";
import vibro from "../../public/VibroSonic.svg";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    // If the user is not logged in, redirect to the login page
    if (!isLoggedIn || isLoggedIn === false) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout actions here (e.g., clear local storage)

        // Clear the logged in status from local storage
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("LoggedInEmail");

        Swal.fire("Logged out!", "You have been logged out.", "success").then(
          () => {
            // Redirect to the login page
            router.push("/login");
          }
        );
      }
    });
  };

  return (
    <div className="mt-6">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <Link href="/">
              <Image src={vibro} alt="" />
            </Link>
          </div>
        </div>

        <div className="navbar-end">
          <button
            className="btn bg-[#B93139] hover:bg-[#b9313ab4] border-none rounded-2xl px-10"
            onClick={handleLogout}
          >
            Logout
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.05882 2H4.82353C3.26409 2 2 3.3431 2 5M9.05882 26H4.82353C3.26409 26 2 24.6569 2 23L2 11M20.3529 20L26 14L9.05882 14M20.3529 8L21.7647 9.5"
                  stroke="white"
                  strokeWidth="3.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
