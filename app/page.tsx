"use client";

import Image from "next/image";
import Link from "next/link";
import Arrow from "../public/icons/arrow.svg";
import Github from "../public/icons/github-svgrepo-com.svg";
import Info from "../public/icons/info-circle-svgrepo-com.svg";
import ImageIcon from "../public/icons/upload-minimalistic-svgrepo-com (1).svg";
import Check from "../public/icons/check-circle-svgrepo-com (1).svg";
import Start from "../public/icons/start-favorite-svgrepo-com.svg";
import Lungs from "../public/icons/lungs-lung-svgrepo-com.svg";
import Plus from "../public/icons/plus-large-svgrepo-com (1).svg";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/footer";
import { useState, useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [imageData, setImageData] = useState<FormData | null>(null);
  const [imageFileName, setImageFileName] = useState("");
  const [pneumoniaLikely, setPneumoniaLikely] = useState(null);
  const [overallConfidence, setOverallConfidence] = useState(NaN);
  const [pneumoniaType, setPneumoniaType] = useState("");
  const [typeConfidence, setTypeConfidence] = useState(NaN);
  const [preview, setPreview] = useState("");
  const [draggedOver, setDraggedOver] = useState(false);
  const [isChestXray, setIsChestXray] = useState(null);
  const [showQuickStart, setShowQuickStart] = useState(true);
  const [showGitHubMenu, setShowGitHubMenu] = useState(false);
  const [showInfoMenu, setShowInfoMenu] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("showQuickStart") == "false") {
      setShowQuickStart(false);
    }
  }, []);

  const handleClearValues = async () => {
    setImageData(null);
    setImageFileName("");
    setPneumoniaLikely(null);
    setOverallConfidence(NaN);
    setPneumoniaType("");
    setTypeConfidence(NaN);
    setPreview("");
    setDraggedOver(false);
    setIsChestXray(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    const data = new FormData();
    data.append("image", file);
    setImageFileName(file.name);
    setImageData(data);
    setDraggedOver(false);
  };

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    const data = new FormData();
    data.append("image", file);
    setImageFileName(file.name);
    setImageData(data);
    setDraggedOver(false);
  };

  const handleSubmitPrediction = async () => {
    if (!imageData) {
      toast.remove();
      toast.error("No image uploaded.");
    } else {
      toast.remove();
      toast.loading("Processing...");
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/prediction/predict",
          {
            method: "POST",
            body: imageData,
          }
        );
        if (response.ok) {
          const result = await response.json();
          if (result.chest_xray == false) {
            setIsChestXray(result.chest_xray);
          } else {
            setIsChestXray(result.chest_xray);
            setPneumoniaLikely(result.pneumonia_likely);
            setOverallConfidence(
              Math.round(parseFloat(result.overall_confidence))
            );
            setPneumoniaType(result.pneumonia_type);
            setTypeConfidence(Math.round(parseFloat(result.type_confidence)));
          }
          toast.remove();
        } else {
          toast.remove();
          toast.error("An error occured.");
          console.error("Error: Response not ok");
        }
      } catch (error) {
        toast.remove();
        toast.error("An error occured.");
        console.error("Error:", error);
      }
    }
  };

  function renderDonut(percentage: number) {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return (
      <div className="relative w-20 h-20">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 140 140"
        >
          <circle
            className="donut-ring"
            cx="70"
            cy="70"
            r={radius}
            strokeWidth="6"
          />
          <circle
            className="donut-segment"
            cx="70"
            cy="70"
            r={radius}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {percentage}%
        </div>
      </div>
    );
  }

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
          <h1>Welcome to the Pneumonia Prediction Utility.</h1>
          <p>
            This application aims to demonstrate how machine learning algorithms
            can be used to make predictions about patient pneumonia diagnosis.
            Before using this utility, please review the{" "}
            <Link
              href={""}
              className="hover:text-cyan-700 cursor-pointer duration-100"
            >
              Intended Purpose Disclaimer.
            </Link>
          </p>
        </div>
        <AnimatePresence>
          {pneumoniaLikely == null &&
            Number.isNaN(overallConfidence) &&
            isChestXray == null && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0, ease: "backOut" }}
                className="mt-20 p-6 rounded-xl bg-gradient-to-br from-cyan-700/20 to-cyan-700/5 border border-cyan-700/20"
              >
                <h1>Upload your image file here:</h1>
                <p>
                  The file must be an image file in{" "}
                  <span className="px-2 py-1 font-normal bg-slate-50 rounded-xl border border-slate-300">
                    JPEG
                  </span>{" "}
                  or{" "}
                  <span className="px-2 py-1 font-normal bg-slate-50 rounded-xl border border-slate-300">
                    PNG
                  </span>{" "}
                  format and no larger than 5 megabytes. The image should be a
                  chest X-ray oriented as shown in the quick start menu.
                </p>
                <motion.label
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "backOut" }}
                  className={
                    draggedOver
                      ? "bg-slate-100 duration-100 px-6 py-16 rounded-xl border border-dashed border-slate-300 mt-6 flex flex-col justify-center items-center text-center cursor-pointer"
                      : "bg-slate-50 hover:bg-slate-100 duration-100 px-6 py-16 rounded-xl border border-dashed border-slate-300 mt-6 flex flex-col justify-center items-center text-center cursor-pointer"
                  }
                  htmlFor="fileInput"
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {!imageFileName && !imageData && (
                    <div className="flex flex-col justify-center items-center text-center">
                      <Image
                        src={ImageIcon}
                        alt=""
                        className={
                          draggedOver
                            ? "w-16 h-16 duration-200 -mt-2 mb-2"
                            : "w-16 h-16 duration-200"
                        }
                      ></Image>
                      <div className="flex gap-1 mt-6">
                        <h2 className="font-black">Click to upload</h2> or drag
                        and drop
                      </div>
                      <p className="text-black/30">Supports: JPEG, PNG</p>
                    </div>
                  )}
                  {imageFileName && imageData && (
                    <div className="flex flex-col justify-center items-center text-center">
                      <div className="relative">
                        <motion.div
                          className=""
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0,
                            ease: "backOut",
                          }}
                        >
                          <Image
                            src={Check}
                            alt=""
                            className="w-10 h-10 absolute bg-slate-50 rounded-full p-1 -right-4 -top-4 shadow-md z-20"
                          ></Image>
                        </motion.div>
                        <motion.div
                          className=""
                          initial={{ opacity: 0, y: 30, z: 1 }}
                          animate={{ opacity: 1, y: 0, z: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: 0,
                            ease: "backOut",
                          }}
                        >
                          <Image
                            src={preview}
                            alt="Preview"
                            width="0"
                            height="0"
                            className="w-24 max-h-24 rounded-xl shadow-md relative z-10"
                          ></Image>
                        </motion.div>
                      </div>
                      <div className="flex gap-1 mt-6">
                        <h2 className="font-black">File uploaded:</h2>
                        {imageFileName}
                      </div>
                      <p className="text-black/30">
                        Press the "Initiate Prediction Calculation" button to
                        continue.
                      </p>
                    </div>
                  )}
                </motion.label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageUpload}
                  id="fileInput"
                  className="hidden"
                />
                {imageData && imageFileName && (
                  <div className="flex gap-3">
                    <motion.button
                      className="mt-6 bg-cyan-700 px-6 py-3 rounded-xl text-slate-50 flex justify-center items-center backdrop-blur-lg duration-200"
                      onClick={() => handleSubmitPrediction()}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0,
                        ease: "backOut",
                      }}
                    >
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
                    </motion.button>
                    <motion.button
                      className="mt-6 bg-slate-50 px-6 py-3 rounded-xl flex justify-center items-center backdrop-blur-lg duration-200 border border-slate-300"
                      onClick={() => handleClearValues()}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: "backOut",
                      }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
        </AnimatePresence>
        <AnimatePresence>
          {pneumoniaLikely != null &&
            !Number.isNaN(overallConfidence) &&
            isChestXray != null && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "backOut" }}
                className="mt-20 p-6 rounded-xl bg-gradient-to-br from-cyan-700/20 to-cyan-700/5 border border-cyan-700/20"
              >
                <h1>Prediction results:</h1>
                <div className="mt-6 flex gap-6 md:flex-row flex-col">
                  <div className="flex flex-col flex-1 justify-center items-center text-center bg-slate-50 rounded-xl border border-slate-300 p-6">
                    {pneumoniaLikely && <h1>Pneumonia likely</h1>}
                    {!pneumoniaLikely && <h1>Pneumonia unlikely</h1>}
                    <div className="flex flex-col mt-3 justify-center items-center w-full">
                      <h2>Confidence level:</h2>
                      {renderDonut(overallConfidence)}
                    </div>
                    {pneumoniaType != null &&
                      pneumoniaType != "" &&
                      pneumoniaType != null &&
                      !Number.isNaN(typeConfidence) && (
                        <div className="w-full">
                          <hr className="w-full mt-6 mb-6" />
                          <div className="flex gap-1 mt-3 justify-center items-center">
                            <h2>Classification:</h2>
                            <p className="bg-cyan-700/20 px-1 rounded-lg border border-cyan-700/50">
                              {pneumoniaType}
                            </p>
                          </div>
                          <div className="flex flex-col mt-3 justify-center items-center">
                            <h2>Confidence level:</h2>
                            {renderDonut(typeConfidence)}
                          </div>
                        </div>
                      )}
                  </div>
                  <div className="flex flex-col flex-1 justify-center items-center text-center bg-slate-50 rounded-xl border border-slate-300 p-6">
                    <Image
                      src={preview}
                      alt="Preview"
                      width="0"
                      height="0"
                      className="w-full rounded-xl mt-3 shadow-md"
                    ></Image>
                    <div className="mt-6">
                      <h2>Reference image: </h2>
                      <p>{imageFileName}</p>
                    </div>
                  </div>
                </div>
                <button
                  className="mt-6 bg-cyan-700 px-6 py-3 rounded-xl text-slate-50 flex justify-center items-center backdrop-blur-lg duration-200"
                  onClick={() => handleClearValues()}
                >
                  Upload another image{" "}
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
            )}
        </AnimatePresence>
        <AnimatePresence>
          {pneumoniaLikely == null &&
            Number.isNaN(overallConfidence) &&
            isChestXray == false && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "backOut" }}
                className="mt-20 p-6 rounded-xl bg-gradient-to-br from-cyan-700/20 to-cyan-700/5 border border-cyan-700/20"
              >
                <h1>Prediction results:</h1>
                <div className="mt-6 flex gap-6 md:flex-row flex-col">
                  <div className="flex flex-col flex-1 justify-center items-center text-center bg-slate-50 rounded-xl border border-slate-300 p-6">
                    <h1>Prediction inconclusive</h1>
                    <p>
                      Your image is likely not a chest X-ray or is not the
                      correct orientation. Please upload a chest X-ray and try
                      again or contact me if the issue persists.
                    </p>
                  </div>
                  <div className="flex flex-col flex-1 justify-center items-center text-center bg-slate-50 rounded-xl border border-slate-300 p-6">
                    <Image
                      src={preview}
                      alt="Preview"
                      width="0"
                      height="0"
                      className="w-full rounded-xl mt-3 shadow-md"
                    ></Image>
                    <div className="mt-6">
                      <h2>Reference image: </h2>
                      <p>{imageFileName}</p>
                    </div>
                  </div>
                </div>
                <button
                  className="mt-6 bg-cyan-700 px-6 py-3 rounded-xl text-slate-50 flex justify-center items-center backdrop-blur-lg duration-200"
                  onClick={() => handleClearValues()}
                >
                  Upload another image{" "}
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
            )}
        </AnimatePresence>
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
