"use client";

import Image from "next/image";
import Link from "next/link";
import Arrow from "../public/icons/arrow.svg";
import Github from "../public/icons/github-142-svgrepo-com (2).svg";
import Info from "../public/icons/info-svgrepo-com.svg";
import ImageIcon from "../public/icons/upload-minimalistic-svgrepo-com (1).svg";
import Check from "../public/icons/check-circle-svgrepo-com (1).svg";
import Dice from "../public/icons/dice-5-svgrepo-com.svg";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/footer";
import { useState, useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [imageData, setImageData] = useState<FormData>();
  const [imageFileName, setImageFileName] = useState("");
  const [pneumoniaLikely, setPneumoniaLikely] = useState(null);
  const [overallConfidence, setOverallConfidence] = useState("");
  const [pneumoniaType, setPneumoniaType] = useState("");
  const [typeConfidence, setTypeConfidence] = useState("");

  const handleClearValues = async () => {
    window.location.reload();
  };

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("image", file);
    setImageFileName(file.name);
    setImageData(data);
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
          // console.log(result);
          setPneumoniaLikely(result.pneumonia_likely);
          setOverallConfidence(result.overall_confidence);
          setPneumoniaType(result.pneumonia_type);
          setTypeConfidence(result.type_confidence);
          toast.remove();
          toast.success("Success!");
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

  return (
    <div className="min-h-screen bg-slate-50 text-black w-full px-6">
      <Toaster position="top-right"></Toaster>
      <div className="max-w-6xl m-auto">
        <div className="py-6 flex justify-between">
          <div className="">
            <p>Deep Learning</p>
            <h2>Pneumonia Prediction Utility</h2>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <Image src={Github} alt="Github" className="w-6 h-6"></Image>
            <Image src={Info} alt="Information" className="w-6 h-6"></Image>
            {/* <p className="px-2 py-1 bg-black rounded-xl text-slate-50">
              Quick Start
            </p> */}
            <button
              className="bg-black px-3 py-1 rounded-xl text-slate-50 flex justify-center items-center backdrop-blur-lg duration-200"
              onClick={() => router.push("/app")}
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
            </button>
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
        {pneumoniaLikely == null && overallConfidence == "" && (
          <div className="mt-20 p-6 rounded-xl bg-gradient-to-br from-cyan-700/20 to-cyan-700/5">
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
              format and no larger than 5 megabytes. The image should be a chest
              X-ray oriented as shown in the quick start menu.
            </p>
            <label
              className="bg-slate-50 hover:bg-slate-100 duration-100 px-6 py-16 rounded-xl border border-dashed border-slate-300 mt-6 flex flex-col justify-center items-center text-center cursor-pointer"
              htmlFor="fileInput"
            >
              {!imageFileName && !imageData && (
                <div className="flex flex-col justify-center items-center text-center">
                  <Image src={ImageIcon} alt="" className="w-16 h-16"></Image>
                  <div className="flex gap-1 mt-6">
                    <h2 className="font-black">Click to upload</h2> or drag and
                    drop
                  </div>
                  <p className="text-black/30">Supports: JPEG, PNG</p>
                </div>
              )}
              {imageFileName && imageData && (
                <div className="flex flex-col justify-center items-center text-center">
                  <Image src={Check} alt="" className="w-16 h-16"></Image>
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
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageUpload}
              id="fileInput"
              className="hidden"
            />
            <button
              className="mt-6 bg-cyan-700 px-6 py-3 rounded-xl text-slate-50 flex justify-center items-center backdrop-blur-lg duration-200"
              onClick={() => handleSubmitPrediction()}
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
            </button>
          </div>
        )}
        {pneumoniaLikely != null && overallConfidence != "" && (
          <div className="mt-20 p-6 rounded-xl bg-gradient-to-br from-cyan-700/20 to-cyan-700/5">
            <h1>Prediction results:</h1>
            <div className="flex flex-col justify-center items-center text-center">
              {pneumoniaLikely && (
                <h1 className="bg-red-100 py-1 px-2 rounded-xl border border-red-300 text-red-600">
                  Pneumonia likely
                </h1>
              )}
              {!pneumoniaLikely && (
                <h1 className="bg-green-100 py-1 px-2 rounded-xl border border-green-300 text-green-600">
                  Pneumonia unlikely
                </h1>
              )}
              <div className="flex gap-1 mt-3 justify-center items-center">
                <h2>Confidence level:</h2>
                <p className="bg-slate-50 px-1 rounded-lg border border-slate-300">
                  {overallConfidence}%
                </p>
              </div>
              {pneumoniaType != null &&
                pneumoniaType != "" &&
                pneumoniaType != null &&
                typeConfidence != "" && (
                  <div className="bg-slate-50 p-6 mt-3 rounded-xl border border-slate-300">
                    <div className="flex gap-1 mt-3 justify-center items-center">
                      <h2>Classification prediction:</h2>
                      <p className="bg-cyan-700/20 px-1 rounded-lg border border-cyan-700/50">
                        {pneumoniaType}
                      </p>
                    </div>
                    <div className="flex gap-1 mt-3 justify-center items-center">
                      <h2>Confidence level:</h2>
                      <p className="bg-slate-50 px-1 rounded-lg border border-slate-300">
                        {typeConfidence}%
                      </p>
                    </div>
                  </div>
                )}
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
          </div>
        )}
        <Footer></Footer>
      </div>
    </div>
  );
}
