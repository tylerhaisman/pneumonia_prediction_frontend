"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  return (
    <div id="footer">
      <div className="max-w-7xl m-auto relative z-20 py-20 flex justify-between flex-col lg:flex-row gap-12">
        <div className="flex flex-col justify-between items-start gap-6 max-w-sm">
          <div className="">
            <p>Deep Learning</p>
            <h1 className="">Pneumonia Prediction Utility</h1>
          </div>
          <div className="">
            <p>
              <span className="opacity-30">© 2024 </span>
              <Link
                href={""}
                className="hover:text-cyan-700 cursor-pointer duration-100 opacity-30 hover:opacity-100"
              >
                Tyler Haisman
              </Link>
            </p>
            {/* <p className="mt-6 opacity-30">
              Permission is hereby granted to use, copy, modify, merge, publish,
              distribute, sublicense, and/or sell copies of the Software,
              subject to the following conditions:
            </p>
            <p className="mt-6 opacity-30">
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY.
            </p> */}
          </div>
        </div>
        <hr className="h-0 w-20 border opacity-10 rounded-full lg:w-0 lg:h-40" />
        <div className="">
          <ul className="flex flex-col gap-3">
            <li>
              <h1 className="text-base">Legal</h1>
            </li>
            <li className="cursor-pointer hover:text-cyan-700 duration-100">
              <p>Intended Purpose Disclaimer</p>
            </li>
            <li className="cursor-pointer hover:text-cyan-700 duration-100">
              <p>Terms of Use</p>
            </li>
            <li className="cursor-pointer hover:text-cyan-700 duration-100">
              <p>Privacy Policy</p>
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="flex flex-col gap-3">
            <li>
              <h1 className="text-base">GitHub</h1>
            </li>
            <li className="cursor-pointer hover:text-cyan-700 duration-100">
              <p>Front-end repository</p>
            </li>
            <li className="cursor-pointer hover:text-cyan-700 duration-100">
              <p>Back-end repository</p>
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="flex flex-col gap-3">
            <li>
              <h1 className="text-base">Information</h1>
            </li>
            <li className="cursor-pointer hover:text-cyan-700 duration-100">
              <p>Quick Start</p>
            </li>
            <li className="cursor-pointer hover:text-cyan-700 duration-100">
              <p>How Does It Work?</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
