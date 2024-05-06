"use client";

import Image from "next/image";
import Link from "next/link";
import Arrow from "../../public/icons/arrow.svg";
import Github from "../../public/icons/github-svgrepo-com.svg";
import Info from "../../public/icons/info-circle-svgrepo-com.svg";
import ImageIcon from "../public/icons/upload-minimalistic-svgrepo-com (1).svg";
import Check from "../public/icons/check-circle-svgrepo-com (1).svg";
import Start from "../public/icons/start-favorite-svgrepo-com.svg";
import Lungs from "../../public/icons/lungs-lung-svgrepo-com.svg";
import Plus from "../../public/icons/plus-large-svgrepo-com (1).svg";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/footer";
import { useState, useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function TermsOfUse() {
  const router = useRouter();
  const [showQuickStart, setShowQuickStart] = useState(true);
  const [showGitHubMenu, setShowGitHubMenu] = useState(false);
  const [showInfoMenu, setShowInfoMenu] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("showQuickStart") == "false") {
      setShowQuickStart(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-black w-full px-6">
      <Toaster position="top-right"></Toaster>
      <AnimatePresence>
        {showQuickStart && (
          <motion.div
            className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center backdrop-blur-sm z-50 flex-col gap-3 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-slate-50 border border-slate-300 rounded-lg p-1 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0, ease: "backOut" }}
              exit={{ opacity: 0, y: 30 }}
              onClick={() => {
                setShowQuickStart(false);
                localStorage.setItem("showQuickStart", "false");
              }}
            >
              <Image
                src={Plus}
                alt="exit quick start"
                className="rotate-45 w-6 h-6"
              ></Image>
            </motion.div>
            <motion.div
              className="max-w-2xl max-h-96 overflow-y-auto bg-slate-50 border border-slate-300 rounded-xl p-6 bg-opacity-80 backdrop-blur-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "backOut" }}
              exit={{ opacity: 0, y: 30 }}
            >
              <h1>Quick Start</h1>
              <p>
                Welcome to the Pneumonia Prediction Utility! This quick guide
                will walk you through what you need to make your predictions.
              </p>
              <div className="mt-6 border border-slate-300 rounded-xl p-6 shadow-lg">
                <h2>1. Prepare your image upload</h2>
                <p>
                  Your image should be a chest X-ray taken in the
                  posteroanterior orientation (as depicted in Figure 01). The
                  file must be a JPEG or PNG.
                </p>
                <div className="w-full flex flex-col justify-center items-center gap-3 text-center">
                  <Image
                    src={Lungs}
                    alt="lungs in the posteroanterior orientation"
                    className="w-40 h-40 mt-6"
                  ></Image>
                  <p>
                    <span style={{ fontFamily: "b" }}>Figure 01: </span>X-ray
                    taken in the posteroanterior orientation
                  </p>
                </div>
              </div>
              <hr className="my-6" />
              <div className="mt-6 border border-slate-300 rounded-xl p-6 shadow-lg">
                <h2>
                  2. Upload your image and initiate the prediction algorithm
                </h2>
                <p>
                  Once you've uploaded your image, click the "Initiate
                  prediction calculation" button (shown in Figure 02).
                </p>
                <div className="w-full flex flex-col justify-center items-center gap-3 text-center">
                  <button className="mt-6 bg-cyan-700 px-6 py-3 rounded-xl text-slate-50 flex justify-center items-center backdrop-blur-lg duration-200 cursor-default">
                    Initiate prediction calculation{" "}
                    <div className=" arrow flex items-center justify-center">
                      <div className="arrowMiddle"></div>
                      <div>
                        <Image
                          src={Arrow}
                          alt=""
                          width={14}
                          height={14}
                          className="arrowSide"
                        ></Image>
                      </div>
                    </div>
                  </button>
                  <p>
                    <span style={{ fontFamily: "b" }}>Figure 02: </span>The
                    "Initiate prediction calculation" button
                  </p>
                </div>
              </div>
              <hr className="my-6" />
              <div className="mt-6 border border-slate-300 rounded-xl p-6 shadow-lg">
                <h2>3. View and interpret your results</h2>
                <p>
                  Once your image is assessed, you will see the model's
                  predictions about the image including:
                </p>
                <div className="bg-slate-50 border-slate-300 border shadow-md p-6 rounded-xl max-w-md mx-auto mt-6">
                  <p>➜ Whether the image may depict pneumonia</p>
                  <p>➜ The prediction's confidence level</p>
                  <h2 className="my-6 text-center max-w-72 mx-auto">
                    If the image is predicted to be pneumonia, you may also see:
                  </h2>
                  <p>➜ What kind of pneumonia the image may depict</p>
                  <p>➜ The prediction's confidence level</p>
                </div>
              </div>
              <hr className="my-6" />
              <p>
                Thank you for using my utility! If you have any questions or
                comments, please reach out to me using the form linked in the
                footer.
              </p>
              <button
                className="mt-6 bg-cyan-700 px-6 py-3 rounded-xl text-slate-50 flex justify-center items-center backdrop-blur-lg duration-200"
                onClick={() => {
                  setShowQuickStart(false);
                  localStorage.setItem("showQuickStart", "false");
                }}
              >
                Continue
                <div className=" arrow flex items-center justify-center">
                  <div className="arrowMiddle"></div>
                  <div>
                    <Image
                      src={Arrow}
                      alt=""
                      width={14}
                      height={14}
                      className="arrowSide"
                    ></Image>
                  </div>
                </div>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-6xl m-auto">
        <div className="py-6 flex justify-between">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <p>Deep Learning</p>
            <h2>Pneumonia Prediction Utility</h2>
          </div>
          <div className="flex gap-1 justify-center items-center relative">
            {showInfoMenu && (
              <motion.div
                className="absolute right-0 top-12 bg-slate-50 border border-slate-300 shadow-sm rounded-xl w-max overflow-hidden"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0, ease: "backOut" }}
                exit={{ opacity: 0, y: -30 }}
              >
                <p
                  className="p-3 hover:bg-slate-200 cursor-pointer"
                  onClick={() => {
                    setShowQuickStart(true);
                    localStorage.setItem("showQuickStart", "true");
                  }}
                >
                  Quick Start
                </p>
                <hr className="bg-slate-50" />
                <p className="p-3 hover:bg-slate-200 cursor-pointer">
                  <Link href={"/howdoesitwork"} target="_blank">
                    How Does It Work?
                  </Link>
                </p>
              </motion.div>
            )}
            {showGitHubMenu && (
              <motion.div
                className="absolute right-0 top-12 bg-slate-50 border border-slate-300 shadow-sm rounded-xl w-max overflow-hidden"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0, ease: "backOut" }}
                exit={{ opacity: 0, y: -30 }}
              >
                <p className="p-3 hover:bg-slate-200 cursor-pointer">
                  <Link
                    href={
                      "https://github.com/tylerhaisman/pneumonia_prediction_frontend"
                    }
                    target="_blank"
                  >
                    Front-end Repository
                  </Link>
                </p>
                <hr className="bg-slate-50" />
                <p className="p-3 hover:bg-slate-200 cursor-pointer">
                  {" "}
                  <Link
                    href={
                      "https://github.com/tylerhaisman/pneumonia_prediction_backend"
                    }
                    target="_blank"
                  >
                    Back-end Repository
                  </Link>
                </p>
              </motion.div>
            )}
            <button
              className="bg-slate-50 border border-slate-300 shadow-sm p-2 rounded-xl flex gap-2 justify-center items-center"
              onClick={() => {
                setShowGitHubMenu(!showGitHubMenu);
                setShowInfoMenu(false);
              }}
            >
              <Image src={Github} alt="Github" className="w-4 h-4"></Image>
            </button>
            <button
              className="bg-slate-50 border border-slate-300 shadow-sm p-2 rounded-xl flex gap-2 justify-center items-center"
              onClick={() => {
                setShowInfoMenu(!showInfoMenu);
                setShowGitHubMenu(false);
              }}
            >
              <Image src={Info} alt="Github" className="w-4 h-4"></Image>
            </button>
            {/* <button
              className="bg-slate-50 border border-slate-300 shadow-sm px-2 py-1 rounded-xl flex gap-2 justify-center items-center"
              onClick={() => {
                setShowQuickStart(true);
                localStorage.setItem("showQuickStart", "true");
              }}
            >
              <Image src={Start} alt="Start" className="w-4 h-4"></Image>
              Quick Start
            </button> */}
            {/* <button
              className="bg-black px-3 py-1 rounded-xl text-slate-50 flex justify-center items-center backdrop-blur-lg duration-200"
              onClick={() => {
                setShowQuickStart(true);
                localStorage.setItem("showQuickStart", "true");
              }}
            >
              Quick Start{" "}
              <div className=" arrow flex items-center justify-center">
                <div className="arrowMiddle"></div>
                <div>
                  <Image
                    src={Arrow}
                    alt=""
                    width={14}
                    height={14}
                    className="arrowSide"
                  ></Image>
                </div>
              </div>
            </button> */}
          </div>
        </div>
        <div className="mt-20">
          <h1>Terms of Use</h1>
          <div className="flex flex-col gap-6 mt-6">
            <p>
              This application ("the App") is provided for educational and
              experimental purposes only. The App is not intended to diagnose,
              treat, cure, or prevent any disease or condition, including but
              not limited to pneumonia or any of its variants. The use of this
              App should not substitute for professional medical advice,
              diagnosis, or treatment. Always seek the advice of your physician
              or other qualified health provider with any questions you may have
              regarding a medical condition.
            </p>
            <h2>Not Medical Advice: </h2>
            <p>
              The predictions made by the App regarding the presence of
              pneumonia, as well as its bacterial or viral nature, are based
              solely on image analysis algorithms and are not reviewed or
              validated by medical professionals. The accuracy of these
              predictions may vary, and they should not be relied upon as a
              definitive diagnosis.
            </p>
            <h2>Experimental Nature: </h2>
            <p>
              This App is an experimental project and may contain errors or
              inaccuracies. Users should understand that the predictions
              provided are not guaranteed to be correct. The developer of this
              App makes no warranties or representations regarding the accuracy,
              reliability, or completeness of the information provided.
            </p>
            <h2>No Liability: </h2>
            <p>
              The developer of this App shall not be liable for any direct,
              indirect, incidental, special, or consequential damages arising
              out of the use or inability to use the App, even if advised of the
              possibility of such damages. This includes, but is not limited to,
              damages for loss of profits, goodwill, use, data, or other
              intangible losses.{" "}
            </p>
            <h2>User Responsibility: </h2>
            <p>
              Users of this App acknowledge and agree that they are solely
              responsible for their use of the App and any decisions made based
              on its predictions. Users should exercise caution and consult with
              a qualified medical professional before making any healthcare
              decisions.{" "}
            </p>
            <h2>No Endorsement: </h2>
            <p>
              The mention of specific medical conditions, treatments, or
              technologies within the App does not constitute an endorsement or
              recommendation by the developer.
            </p>
            <h2>Indemnification: </h2>
            <p>
              By using this App, you agree to indemnify and hold harmless the
              developer, its affiliates, officers, employees, and agents from
              and against any claims, liabilities, damages, losses, and
              expenses, including, without limitation, reasonable legal and
              accounting fees, arising out of or in any way connected with your
              use of the App or your violation of these terms.{" "}
            </p>
            <h2>Acceptance of Terms: </h2>
            <p>
              By using this App, you signify your acceptance of this disclaimer.
              If you do not agree with this disclaimer, please do not use the
              App.
            </p>
          </div>
        </div>
        {/* <Footer></Footer> */}
        <div id="footer">
          <div className="max-w-7xl m-auto relative z-20 py-20 flex justify-between flex-col lg:flex-row gap-12">
            <div className="flex flex-col justify-between items-start gap-6 max-w-sm">
              <div className="cursor-pointer" onClick={() => router.push("/")}>
                <p>Deep Learning</p>
                <h1 className="">Pneumonia Prediction Utility</h1>
              </div>
              <div className="">
                <p>
                  <span className="opacity-30">© 2024 </span>
                  <Link
                    href={"https://tylerhaisman.com"}
                    target="_blank"
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
                  <Link href={"/termsofuse"} target="_blank">
                    Terms of Use
                  </Link>
                </li>
                <li className="cursor-pointer hover:text-cyan-700 duration-100">
                  <Link href={"/privacypolicy"} target="_blank">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <ul className="flex flex-col gap-3">
                <li>
                  <h1 className="text-base">GitHub</h1>
                </li>
                <li className="cursor-pointer hover:text-cyan-700 duration-100">
                  <Link
                    href={
                      "https://github.com/tylerhaisman/pneumonia_prediction_frontend"
                    }
                    target="_blank"
                  >
                    Front-end Repository
                  </Link>
                </li>
                <li className="cursor-pointer hover:text-cyan-700 duration-100">
                  <Link
                    href={
                      "https://github.com/tylerhaisman/pneumonia_prediction_backend"
                    }
                    target="_blank"
                  >
                    Back-end Repository
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <ul className="flex flex-col gap-3">
                <li>
                  <h1 className="text-base">Information</h1>
                </li>
                <li
                  className="cursor-pointer hover:text-cyan-700 duration-100"
                  onClick={() => {
                    setShowQuickStart(true);
                    localStorage.setItem("showQuickStart", "true");
                  }}
                >
                  <p>Quick Start</p>
                </li>
                <li className="cursor-pointer hover:text-cyan-700 duration-100">
                  <Link href={"/howdoesitwork"} target="_blank">
                    How Does It Work?
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
