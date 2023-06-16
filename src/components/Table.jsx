"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [pdfData, setPdfData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch PDF data from the API
    setLoading(true);
    axios
      .get("https://vibrosonic.onrender.com/pdfs")
      .then((response) => {
        setPdfData(response.data.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching PDF data:", error);
        setLoading(false);
      });
  }, []);
  console.log(pdfData);
  const handleDownload = (pdfId) => {
    // Make a GET request to the server to download the PDF
    axios({
      url: `https://vibrosonic.onrender.com/download/${pdfId}`,
      method: "GET",
      responseType: "blob", // Set the response type to 'blob' for binary data
    })
      .then((response) => {
        // Create a URL object from the received blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${pdfId}.pdf`); // Set the filename for the downloaded file

        // Simulate a click on the link to trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
        // Handle error here
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = pdfData.filter(
    (item) =>
      item?.pdfname?.toLowerCase()?.includes(searchTerm) ||
      item?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-8">
      <div className="navbar">
        {/* Rest of your navbar code... */}
        <div className="navbar-start">
          <p className="text-xl lg:text-4xl font-semibold">Uploaded Files</p>
        </div>
        <div className="navbar-end">
          <form
            className="relative mb-4 flex w-full lg:w-1/2 flex-wrap items-stretch"
            onSubmit={(event) => event.preventDefault()} // Prevent form submission
          >
            <input
              type="search"
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none rounded-l-2xl -200 text-white font-semibold"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
              value={searchTerm}
              onChange={handleSearch}
              required
            />
            <button
              className="relative z-[2] flex items-center rounded-r-2xl bg-primary hover:bg-opacity-75 px-3 lg:px-6 py-2.5 text-xs uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="submit"
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.55148 0.319516C7.77653 0.114938 8.08175 0 8.40001 0H18C19.9883 0 21.6 1.46525 21.6 3.27273V7.63636C21.6 8.23885 21.0628 8.72727 20.4 8.72727C19.7373 8.72727 19.2 8.23885 19.2 7.63636V3.27273C19.2 2.67024 18.6628 2.18182 18 2.18182H9.60001V7.63636C9.60001 8.23885 9.06277 8.72727 8.40001 8.72727H2.4V20.7273C2.4 21.3298 2.93727 21.8182 3.6 21.8182H8.40001C9.06277 21.8182 9.60001 22.3066 9.60001 22.9091C9.60001 23.5116 9.06277 24 8.40001 24H3.6C1.61178 24 0 22.5348 0 20.7273V7.63636C0 7.34703 0.126432 7.06956 0.351469 6.86497L7.55148 0.319516ZM4.09706 6.54545H7.20001V3.72459L4.09706 6.54545ZM20.6059 19.3717C21.2341 18.5095 21.6 17.4754 21.6 16.3636C21.6 13.3512 18.9137 10.9091 15.6 10.9091C12.2863 10.9091 9.60001 13.3512 9.60001 16.3636C9.60001 19.3761 12.2863 21.8182 15.6 21.8182C16.8229 21.8182 17.9604 21.4856 18.9089 20.9145L21.9515 23.6805C22.4201 24.1065 23.1799 24.1065 23.6485 23.6805C24.1171 23.2545 24.1171 22.5637 23.6485 22.1377L20.6059 19.3717ZM12 16.3636C12 14.5561 13.6117 13.0909 15.6 13.0909C17.5883 13.0909 19.2 14.5561 19.2 16.3636C19.2 18.1712 17.5883 19.6364 15.6 19.6364C13.6117 19.6364 12 18.1712 12 16.3636Z"
                  fill="white"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-lg text-[#BDBDBD]">
                <thead className="border-b">
                  <tr>
                    <th scope="col" className="border-r px-6 py-4">
                      Index
                    </th>
                    <th scope="col" className="border-r px-6 py-4">
                      File Name
                    </th>
                    <th scope="col" className="border-r px-6 py-4">
                      Upload Date
                    </th>
                    <th scope="col" className="px-6 py-4 border-r">
                      Uploaded By
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? <div className="loader mx-auto my-6"></div> : ""}
                  {filteredData.map((item, index) => (
                    <tr
                      className="bg-[#ffffff25] font-lg text-white border-b"
                      key={index}
                    >
                      <td className="whitespace-nowrap border-r px-6 py-4 ">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap border-r px-6 py-4 ">
                        {item?.pdfname?.slice(25)}
                      </td>
                      <td className="whitespace-nowrap border-r px-6 py-4 ">
                        {item?.date?.slice(0, 10)}
                      </td>
                      <td className="whitespace-nowrap border-r px-6 py-4 ">
                        {item?.username}
                      </td>
                      <td className="whitespace-nowrap py-4 ">
                        <a
                          className="btn bg-[#556af2e3] w-11/12 hover:bg-[#556af288] border-none rounded-2xl"
                          href={item?.pdfname}
                          target="_blank"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
