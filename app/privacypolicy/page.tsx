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

export default function PrivacyPolicy() {
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
          </div>
        </div>
        <div className="mt-20">
          <h1>Privacy Policy</h1>
          <div className="flex flex-col gap-6 mt-6">
            This Privacy Policy describes how image data is collected, used, and
            disclosed when you use our application ("the App").
            <h2>Information Collection and Use:</h2>
            <p>
              We do not collect any personally identifiable information from
              users of the App. However, the App does collect image data that is
              uploaded by users for the purpose of predicting pneumonia. This
              image data is processed locally within the user's browser and is
              stored temporarily in browser storage only for the duration of the
              user's session.{" "}
            </p>
            <h2>HIPAA Compliance</h2>
            <p>
              While we take privacy and security seriously, it's important to
              note that the App is not intended for use in connection with
              protected health information (PHI) as defined by the Health
              Insurance Portability and Accountability Act (HIPAA). The App is
              designed for educational and experimental purposes only and should
              not be used to make healthcare decisions or diagnose medical
              conditions.
            </p>
            <h2>Information Sharing and Disclosure: </h2>
            <p>
              We do not share or disclose any image data collected by the App
              with third parties. The image data remains on the user's device
              and is not transmitted to any external servers.{" "}
            </p>
            <h2>Data Security: </h2>
            <p>
              We take reasonable measures to protect the image data collected by
              the App. The data is stored locally within the user's browser and
              is not accessible to anyone other than the user during their
              session.
            </p>
            <h2>Children's Privacy:</h2>
            <p>
              The App is intended for use by individuals aged 18 and older. We
              do not knowingly collect any personally identifiable information
              from children under the age of 18. If you are a parent or guardian
              and you are aware that your child has provided us with image data,
              please contact us so that we can delete this data.{" "}
            </p>
            <h2>Changes to This Privacy Policy:</h2>
            <p>
              We may update our Privacy Policy from time to time. Thus, we
              advise you to review this page periodically for any changes. We
              will notify you of any changes by posting the new Privacy Policy
              on this page.
            </p>
            <h2>Contact Us: </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact us by clicking the "Tyler Haisman" hyperlink in the
              footer.
            </p>
          </div>
        </div>
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
