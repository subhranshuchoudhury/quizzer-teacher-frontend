"use client";

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
import Select from "react-select";
import sections from "@/constants/sections";
import batches from "@/constants/batches";
import Image from "next/image";

export default function page() {
  const [excelData, setExcelData] = useState(null);
  const inputFileRef = useRef(null);
  const [formData, setFormData] = useState({
    name: null,
    start_time: null,
    end_time: null,
    duration: null,
    questions: null,
    allowedSections: null, // * ["45"]
    marksPerQuestion: 1, // * number
    published: true,
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const acceptFileTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    e.preventDefault();
    setExcelData(null);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile && acceptFileTypes.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(sheet);
          const isValid = excelValidation(excelData);
          if (!isValid) {
            inputFileRef.current.value = "";
            setExcelData(null);
            return;
          }
          setExcelData(excelData);
          inputFileRef.current.value = "";
        };
      } else {
        toast.error("Please select a valid excel file");
        inputFileRef.current.value = "";

        setExcelData(null);
      }
    } else {
      toast.error("Please select a file");
    }
  };

  const excelValidation = (excelData) => {
    const requiredKeys = [
      "QUESTION",
      "OPTION1",
      "OPTION2",
      "OPTION3",
      "OPTION4",
      "CORRECT",
    ];

    for (let i = 0; i < excelData.length; i++) {
      const excelKeys = Object.keys(excelData[i]);
      if (requiredKeys.length !== excelKeys.length) {
        toast.error(`Please recheck the question ${i + 1} data`);
        return false;
      }
    }
    for (let i = 0; i < requiredKeys.length; i++) {
      const excelKeys = Object.keys(excelData[0]);

      if (requiredKeys[i] !== excelKeys[i]) {
        toast.error(`${requiredKeys[i]} column not found`);
        return false;
      }
    }

    const correctOptions = [1, 2, 3, 4];
    for (let i = 0; i < excelData.length; i++) {
      if (!correctOptions.includes(parseInt(excelData[i].CORRECT))) {
        toast.error("Please check the correct column of question " + (i + 1));
        return false;
      }
    }

    return true;
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();

    if (!excelData) {
      toast.error("There is no questions added");
    }

    // const finalQuestionsFormat = excelData.map((item) => {
    //   return {
    //     question: item.QUESTION,
    //     options: [
    //       { option: item.OPTION1, is_correct: item.CORRECT === 1 },
    //       { option: item.OPTION2, is_correct: item.CORRECT === 2 },
    //       { option: item.OPTION3, is_correct: item.CORRECT === 3 },
    //       { option: item.OPTION4, is_correct: item.CORRECT === 4 },
    //     ],
    //   };
    // });

    // console.log(...finalQuestionsFormat);

    try {
      const response = await fetch("/api/create-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        toast.success("Quiz created successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full h-[20vh] p-5 ">
        <div className="mx-auto md:w-[80%]">
          <div className="w-full flex items-center justify-center">
            <input
              placeholder="Enter Quiz Name"
              name="name"
              onChange={handleFormChange}
              type="text"
              value={formData.name || ""}
              className=" bg-transparent text-center font-[600] text-2xl outline-none focus:border-b border-[#3a3a3a] text-white"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <form className=" flex items-center">
              <input
                type="file"
                name="excelUploadInput"
                id="excelInput_1"
                required
                onChange={handleFile}
                ref={inputFileRef}
              />
            </form>
            <div className="text-lg flex items-center justify-center">
              <input
                inputMode="numeric"
                name="marksPerQuestion"
                value={formData?.marksPerQuestion || ""}
                onChange={handleFormChange}
                onWheel={(e) => e.target.blur()}
                className="bg-transparent inline-block text-center outline-none w-[30px] text-white focus:border-b border-[#3a3a3a]"
              />
              <span className="text-white capitalize">
                {formData?.marksPerQuestion === 1 ? "mark" : "marks"} per
                question
              </span>
            </div>
          </div>
          {/* {!!!excelData && ( */}
          <div className="my-2 flex space-x-3  items-center justify-between">
            <div className="w-1/2">
              <label htmlFor="">Allow Sections</label>
              <Select
                defaultValue={[sections[0]]}
                isMulti
                name="allowedSections"
                options={sections}
                className="basic-multi-select"
                classNamePrefix="select"
                value={formData?.allowedSections || []}
                onChange={(e) => {
                  if (
                    e?.length > 0 &&
                    e?.length !== 1 &&
                    e[e?.length - 1]?.value === "ALLOW ALL"
                  ) {
                    toast.error("Remove all sections to select allow all");
                    return;
                  } else if (
                    e?.length === 2 &&
                    formData?.allowedSections?.length === 1 &&
                    formData?.allowedSections[0]?.value === "ALLOW ALL"
                  ) {
                    toast.error("Remove allow all to select sections");
                    return;
                  }

                  handleFormChange({
                    target: {
                      name: "allowedSections",
                      value: e,
                    },
                  });
                }}
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="">Select Batch</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                name="color"
                options={batches}
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </div>
          </div>
          {/* )} */}
        </div>
      </div>

      <div className="w-full h-[70vh] overflow-x-hidden overflow-y-auto space-y-2">
        {excelData?.length > 0 ? (
          excelData.map((item, index) => {
            return (
              <div
                className="shadow-md mx-auto shadow-[#000000] bg-[#0c1a26] w-[80%] rounded-xl p-5 space-y-4 text-white font-[600]"
                key={index}
              >
                <p>
                  Question {index + 1}. {item.QUESTION}
                </p>
                <p
                  className={
                    String.fromCharCode(parseInt(item.CORRECT) + 64) === "A" &&
                    "text-green-500"
                  }
                >
                  A: {item.OPTION1}
                </p>
                <p
                  className={
                    String.fromCharCode(parseInt(item.CORRECT) + 64) === "B" &&
                    "text-green-500"
                  }
                >
                  B: {item.OPTION2}
                </p>
                <p
                  className={
                    String.fromCharCode(parseInt(item.CORRECT) + 64) === "C" &&
                    "text-green-500"
                  }
                >
                  C: {item.OPTION3}
                </p>
                <p
                  className={
                    String.fromCharCode(parseInt(item.CORRECT) + 64) === "D" &&
                    "text-green-500"
                  }
                >
                  D: {item.OPTION4}
                </p>
              </div>
            );
          })
        ) : (
          <div className="w-full flex items-center justify-center h-full">
            <Image
              src={"/images/folder.png"}
              width={100}
              height={100}
              className=""
              alt="empty folder"
            />
          </div>
        )}
      </div>
      <div className="mx-auto md:w-[80%] flex items-center justify-center h-[10vh]">
        {/* {excelData && ( */}
        <button
          type="submit"
          className="bg-[#115791] w-full p-3 rounded-md hover:text-white hover:bg-[#39a6ff] transition-all ease-linear duration-300"
          onClick={handleFileSubmit}
        >
          Submit
        </button>
        {/* )} */}
      </div>
    </div>
  );
}
