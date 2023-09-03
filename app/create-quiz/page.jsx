"use client";

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";

export default function page() {
  const [excelData, setExcelData] = useState(null);
  const inputFileRef = useRef(null);
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
          console.log(excelData);
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
        toast.error(`${requiredKeys[i]} column not found.`);
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

  const handleFileSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="bg-white">
        <div>
          <p>UPLOAD FILE SECTION</p>
          <form action="">
            <label htmlFor="">Upload excel file</label>
            <input
              type="file"
              name="excelUploadInput"
              id="excelInput_1"
              required
              onChange={handleFile}
              ref={inputFileRef}
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleFileSubmit}
            >
              Submit
            </button>
          </form>
        </div>

        <div>
          <p>VIEW FILE SECTION</p>
          {excelData &&
            excelData.map((item, index) => {
              return (
                <div className="bg-green-500 p-5 space-y-4 m-5" key={index}>
                  <p>
                    Question {index + 1}. {item.QUESTION}
                  </p>
                  <p>A: {item.OPTION1}</p>
                  <p>B: {item.OPTION2}</p>
                  <p>C: {item.OPTION3}</p>
                  <p>D: {item.OPTION4}</p>
                  <p>ANS: {String.fromCharCode(parseInt(item.CORRECT) + 64)}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
