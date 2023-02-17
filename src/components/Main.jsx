import { Button, TextField } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import "./../App.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import KeywordsUpload from "./KeywordsUpload";
import DescriptionUpload from "./DescriptionUpload";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { Box } from "@mui/system";
import { Parser } from "@json2csv/plainjs";

const Main = (props) => {
  const [newArr, setNewArr] = useState([]);
  const circleCount = [];
  const [userInput, setUserInput] = useState("");
  const [userInputOuter, setOuterInput] = useState(1);
  const [outerSetCount, setOuterSetCount] = useState();
  const [SeoData, setSeoData] = useState([]);
  const [KeyWord, setKeyWord] = useState();
  const [isLat, setLat] = useState();
  const [isLong, setLong] = useState();
  // const [finalTable, setFinalTable] = useState([]);

  let cordCount = 2000;

  const getLat = (e) => {
    setLat(e.target.value);
  };
  const getLong = (e) => {
    setLong(e.target.value);
  };
  // 72.9556716
  // 19.1985743

  for (let i = 0.1; i <= userInput; i += 0.1) {
    circleCount.push(parseFloat(i).toFixed(1));
  }

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };
  const saveZip = (filename, urls) => {
    if (!urls) return;

    const zip = new JSZip();
    const folder = zip.folder("files"); // folder name where all files will be placed in

    urls.forEach((url, ind) => {
      folder.file(`Circle${ind}.csv`, url);
    });

    // Generate the zip file asynchronously
    zip.generateAsync({ type: "blob" }).then(function (content) {
      // Force down of the Zip file
      FileSaver.saveAs(content, "archive.zip");
    });
  };
  const shuffleES6 = (array) => {
    const newArray = [...array];

    newArray.reverse().forEach((item, index) => {
      const j = Math.floor(Math.random() * (index + 1));
      [newArray[index], newArray[j]] = [newArray[j], newArray[index]];
    });

    return newArray;
  };

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result
        .split(/\r?\n/)
        .filter(
          (ele, ind) => ele !== "name" && ele !== "" && ele !== "description"
        );
      console.log(text, "THE FILE READER READS KEYWORDS");
      // setSeoData(text);
      setSeoData((prevState) => [...prevState, { value: text }]);
      // // console.log(text);
      alert("file uploaded");
      //   alert(text);
    };
    const finalArr = reader.readAsText(e.target.files[0]);
    // console.log(finalArr);
    // ;
  };
  console.log(SeoData, "SEO DATA");

  const loopFunc = (uploadedFiles) => {
    const newArr = [];
    if (uploadedFiles) {
      for (let i = 0; i < cordCount / uploadedFiles.length; i++) {
        for (let j = 0; j < uploadedFiles.length; j++) {
          newArr.push(uploadedFiles[j]);
        }
      }
      // const shuffedArr = shuffleArr(newArr);
      return newArr;
    } else {
      console.log(
        uploadedFiles,
        "There is an error in the way the variable is passed"
      );
    }
  };

  let newSeoArr = [];
  let newKeyWordArr = [];

  const allCircles = (keywords) => {
    console.log(keywords);
    // console.log(descriptions);
    // 19.198418001986912, 72.9556770938645
    // 25.18528117439559, 55.27562464605748
    const alldata = [];
    let centerLng = props.degToRad(isLong);

    let centerLat = props.degToRad(isLat);
    const mathFunc = (diameter, keywordsArray) => {
      // console.log(keywords)
      // let diameter = diam; // diameter of circle in km
      let dist = diameter / 6371.0;
      let allCord = [];

      for (let x = 0; x < cordCount; x++) {
        const keywords = shuffleES6(keywordsArray);
        let brng = props.degToRad(x);
        let latitude = Math.asin(
          Math.sin(centerLat) * Math.cos(dist) +
            1 * Math.cos(centerLat) * Math.sin(dist) * Math.cos(brng)
        );
        let longitude =
          centerLng +
          Math.atan2(
            Math.sin(brng) * Math.sin(dist) * Math.cos(centerLat),
            Math.cos(dist) - Math.sin(centerLat) * Math.sin(latitude)
          );
        // radians_to_degrees(longitude) radians_to_degrees(latitude)
        // console.log(keywords)
        allCord.push({
          name: keywords?.[x]?.name,
          description: keywords?.[x]?.description,
          longitude: props.radToDeg(longitude),
          latitude: props.radToDeg(latitude),
        });
      }
      // console.log(allCord, "all cordinates");
      return allCord;
    };
    circleCount.forEach((ele, ind) => {
      // const circleCords = mathFunc(ele, );
      const circleCords = mathFunc(ele, keywords);
      alldata.push(circleCords);
      // const data = [alldata[ind]];
      // const fileName = "download";
    });
    // console.log(alldata)
    return alldata;
  };
  let csvVariableData = "";
  useEffect(() => {
    newSeoArr = loopFunc(SeoData?.[0]?.value);
    newKeyWordArr = loopFunc(SeoData?.[1]?.value);
    const seoDataSet = [];
    for (let i = 0; i < cordCount; i++) {
      seoDataSet.push({
        name: newSeoArr?.[i],
        description: newKeyWordArr?.[i],
      });
    }

    const newARRAY = shuffleES6(seoDataSet);
    // console.log(newARRAY);
    csvVariableData = allCircles(newARRAY);
    console.log(csvVariableData, "READY TO DOWNLOAD");
  }, [userInput]);

  const downloadFile = () => {
    const opts = {
      fields: ["name", "description", "longitude", "latitude"],
    };
    const parser = new Parser(opts);
    const csvArr = [];
    for (let i = 0; i < csvVariableData.length; i++) {
      csvArr.push(parser.parse(csvVariableData[i]));
    }
    console.log(csvArr, "array to be sent to the save as");
    // console.log(csvVariableData, "DOWNLOAD DATA");
    saveZip("array", csvArr);
  };
  const outerSetCounts = [];
  if (userInputOuter) {
    for (let i = 0; i < userInputOuter; i++) {
      outerSetCounts.push(i);
    }
  }

  return (
    <>
      <div className="container">
        <div>
          <h1>
            <span style={{ color: "Green", fontSize: "3rem" }}>◯</span> My Maps
            Circles Generator
          </h1>
        </div>
        <div className="flex">
          <KeywordsUpload showFile={showFile} />
          <DescriptionUpload showKeyword={showFile} />
        </div>
        <Box sx={{ display: "flex", gap: "1rem", margin: "1rem 0rem" }}>
          <div>
            <h2>Latitude Test</h2>
            <p>72.9556716</p>
          </div>
          <div>
            <h2>Longitude Test</h2>
            <p>19.1985743</p>
          </div>
        </Box>
        <Box sx={{ display: "flex", gap: "1rem", margin: "1rem 0rem" }}>
          <TextField
            id="outlined-basic"
            label="Latitude"
            variant="outlined"
            onChange={(e) => getLat(e)}
            type="number"
          />
          <TextField
            type="number"
            id="outlined-basic"
            label="Longitude"
            variant="outlined"
            onChange={(e) => getLong(e)}
          />
        </Box>

        <FormControl>
          <InputLabel sx={{ width: 300 }}>
            Select Number of Circle Data
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userInput}
            label="userinput"
            onChange={handleChange}
            sx={{ width: 300 }}
          >
            <MenuItem value={0.1}>1</MenuItem>
            <MenuItem value={0.2}>2</MenuItem>
            <MenuItem value={0.31}>3</MenuItem>
            <MenuItem value={0.4}>4</MenuItem>
            <MenuItem value={0.5}>5</MenuItem>
            <MenuItem value={0.6}>6</MenuItem>
            <MenuItem value={0.7}>7</MenuItem>
            <MenuItem value={0.8}>8</MenuItem>
            <MenuItem value={0.9}>9</MenuItem>
            <MenuItem value={1}>10</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ marginLeft: "1rem" }}>
          <InputLabel sx={{ width: 300 }}>Select Number of Sets</InputLabel>
        </FormControl>
        <Button
          variant="outlined"
          sx={{ marginTop: "1rem" }}
          onClick={(e) => {
            downloadFile();
          }}
        >
          GET ALL CIRCLES
        </Button>
      </div>
    </>
  );
};

export default Main;
