"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

const Drag = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userEmail = localStorage.getItem("LoggedInEmail");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedFile) {
      Swal.fire("Error", "Please select a file to upload", "error");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("email", userEmail); // Add the email here

    try {
      const response = await axios.post(
        "https://vibrosonic.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        Swal.fire("Success", "File uploaded successfully", "success");
        setLoading(false);
        router.push("/login");
      } else {
        Swal.fire("Error", "File upload failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while uploading the file", "error");
      console.error(error);
      setLoading(false);
    }
    setSelectedFile(null);
  };

  return (
    <div className="my-8">
      <input
        type="file"
        name="drop"
        className="hidden"
        id="drop"
        onChange={handleFileChange}
      />
      <label
        htmlFor="drop"
        className="w-full my-8 rounded-[60px] flex items-center justify-center flex-col bg-[#ffffff25] py-12 gap-y-4 cursor-pointer border-dashed border-gray-500 border-2 transition-all hover:bg-[#ffffff35] group"
      >
        <svg
          width="84"
          height="84"
          viewBox="0 0 84 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:scale-110 transition-all scale-75 lg:scale-100"
        >
          <path
            d="M42 2C54.2729 2 64.2222 12.5345 64.2222 25.5294V30.2353C74.0404 30.2353 82 38.6631 82 49.0588C82 56.0264 78.4249 62.2748 73.1111 65.5294M19.7778 30.2353V25.5294C19.7778 20.2324 21.4308 15.3443 24.2206 11.4118M19.7778 30.2353C9.95938 30.2353 2 38.6631 2 49.0588C2 56.0264 5.57511 62.2748 10.8889 65.5294M19.7778 30.2353C21.7016 30.2353 23.554 30.5591 25.2892 31.1572M42 39.6471V82M42 39.6471L55.3333 53.7647M42 39.6471L28.6667 53.7647"
            stroke="white"
            stroke-width="3.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p className="lg:text-4xl text-2xl font-semibold ">
          Select a file to upload
        </p>
        <p className="lg:text-xl text-base text-gray-400 font-semibold ">
          Try to upload smaller files.
        </p>

        {loading ? <div className="loader"></div> : ""}
        {selectedFile ? (
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload The File!
          </button>
        ) : (
          ""
        )}
      </label>
    </div>
  );
};

export default Drag;
