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

export default function HowDoesItWork() {
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
          <h1 className="text-5xl">How Does It Work?</h1>
          <div className="flex flex-col gap-6 mt-6">
            <h2 className="text-2xl">Overview</h2>
            <p>
              Our pneumonia prediction utility utilizes deep learning models to
              analyze chest X-ray images and predict whether pneumonia is
              present and, if so, whether it is bacterial or viral in nature.
            </p>

            <h2 className="text-2xl">Technology Stack</h2>
            <ul className="flex flex-col gap-6">
              <li>
                <h2>Frontend:</h2>
                <ul className="mt-3">
                  <li>Framework: Next.js (React)</li>
                  <li>Styling: Tailwind CSS</li>
                  <li>Language: TypeScript</li>
                </ul>
              </li>
              <li>
                <h2>Backend:</h2>
                <ul className="mt-3">
                  <li>Framework: Django (Python)</li>
                  <li>Deep Learning Library: TensorFlow Keras</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-2xl">Models</h2>
            <ol className="flex flex-col gap-6">
              <li>
                <h2>Chest X-ray Detection Model:</h2>
                <ul className="mt-3">
                  <li>
                    This model determines whether the image is a chest X-ray or
                    not.
                  </li>
                  <li>Trained on nearly 2000 chest X-ray images.</li>
                  <li>
                    Utilizes a convolutional neural network (CNN) architecture.
                  </li>
                </ul>
              </li>
              <li>
                <h2>Pneumonia Classification Model:</h2>
                <ul className="mt-3">
                  <li>
                    This model identifies if pneumonia is present and
                    categorizes it as bacterial or viral.
                  </li>
                  <li>
                    Trained on over 4000 chest X-ray images depicting normal,
                    bacterial pneumonia, and viral pneumonia cases.
                  </li>
                  <li>Utilizes a CNN architecture.</li>
                </ul>
              </li>
            </ol>

            <h2 className="text-2xl">Data Sources</h2>
            <ul className="flex flex-col gap-6">
              <li>
                <h2>Chest X-Ray Images (Pneumonia) Dataset:</h2>
                <ul className="mt-3">
                  <li>
                    Kaggle Dataset:{" "}
                    <a href="https://www.kaggle.com/paultimothymooney/chest-xray-pneumonia">
                      Chest X-Ray Images (Pneumonia)
                    </a>
                  </li>
                  <li>
                    Contains chest X-ray images depicting normal, bacterial
                    pneumonia, and viral pneumonia cases.
                  </li>
                </ul>
              </li>
              <li>
                <h2>Random Images Dataset:</h2>
                <ul className="mt-3">
                  <li>
                    Kaggle Dataset:{" "}
                    <a href="https://www.kaggle.com/lprdosmil/unsplash-random-images-collection">
                      Unsplash Random Images Collection
                    </a>
                  </li>
                  <li>
                    Used for negative samples (i.e., images that are not chest
                    X-rays).
                  </li>
                </ul>
              </li>
            </ul>

            <h2 className="text-2xl">Workflow</h2>
            <ol className="flex flex-col gap-6">
              <li>
                <h2>Image Verification:</h2>
                <ul className="mt-3">
                  <li>
                    The API first verifies if the uploaded image is a chest
                    X-ray using the Chest X-ray Detection Model.
                  </li>
                </ul>
              </li>
              <li>
                <h2>Pneumonia Prediction:</h2>
                <ul className="mt-3">
                  <li>
                    If the image is confirmed to be a chest X-ray, it is sent to
                    the Pneumonia Classification Model.
                  </li>
                  <li>
                    The model predicts whether pneumonia is present and its type
                    (bacterial or viral).
                  </li>
                </ul>
              </li>
              <li>
                <h2>Result Display:</h2>
                <ul className="mt-3">
                  <li>
                    The prediction results are sent back to the frontend for
                    display.
                  </li>
                  <li>
                    Users can then interpret the prediction and act accordingly.
                  </li>
                </ul>
              </li>
            </ol>
            <h2 className="text-2xl">Future Directions</h2>
            <ul className="flex flex-col gap-6">
              <li>
                <h2>Enhanced Model Accuracy: </h2>
                <p className="mt-3">
                  Continuous training and fine-tuning of models to improve
                  accuracy and robustness.
                </p>
              </li>
              <li>
                <h2>Expansion of Dataset: </h2>
                <p className="mt-3">
                  Incorporating more diverse and extensive datasets to capture a
                  wider range of cases and improve generalization.
                </p>
              </li>
            </ul>

            <h2 className="text-2xl">About the Author</h2>
            <p>
              This project was developed by Tyler Haisman, a computer science
              student aspiring to work in bioinformatics. For inquiries or
              collaborations, please contact me by clicking on the "Tyler
              Haisman" hyperlink in the footer.
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