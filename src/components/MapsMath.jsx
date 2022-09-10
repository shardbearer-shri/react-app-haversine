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
import Tables from "./Tables";
import JSZip from "jszip";
import FileSaver from "file-saver";
import Promise from "bluebird";
import { Box } from "@mui/system";
const MapsMath = (props) => {
  const [newArr, setNewArr] = useState([]);
  const circleCount = [];
  const [userInput, setUserInput] = useState("");
  const [userInputOuter, setOuterInput] = useState("");
  const [outerSetCount, setOuterSetCount] = useState();
  const [SeoData, setSeoData] = useState();
  const [KeyWord, setKeyWord] = useState();
  const [isLat, setLat] = useState();
  const [isLong, setLong] = useState();
  // const [finalTable, setFinalTable] = useState([]);

  let cordCount = 10;

  const getLat = (e) => {
    setLat(e.target.value);
  };
  const getLong = (e) => {
    setLong(e.target.value);
  };
  // 72.9556716
  // 19.1985743
  let centerLat = props.degToRad(isLat);
  let centerLng = props.degToRad(isLong);

  for (let i = 0.1; i <= userInput; i += 0.1) {
    circleCount.push(parseFloat(i).toFixed(1));
  }
  console.log(circleCount, "circle count");
  // function to get latitude and longitude pure which takes in the diameter value from user input state
  const mathFunc = (diam) => {
    let diameter = diam; // diameter of circle in km
    let dist = diameter / 6371.0;
    let allCord = [];

    for (let x = 0; x < cordCount; x++) {
      let brng = props.degToRad(x);
      let latitude = Math.asin(
        Math.sin(centerLat) * Math.cos(dist) +
          4 * Math.cos(centerLat) * Math.sin(dist) * Math.cos(brng)
      );
      let longitude =
        centerLng +
        Math.atan2(
          Math.sin(brng) * Math.sin(dist) * Math.cos(centerLat),
          Math.cos(dist) - Math.sin(centerLat) * Math.sin(latitude)
        );
      // radians_to_degrees(longitude) radians_to_degrees(latitude)
      allCord.push({
        longitude: props.radToDeg(longitude),
        latitude: props.radToDeg(latitude),
      });
    }
    return allCord;
  };

  const allCircles = () => {
    const alldata = [];
    circleCount.forEach((ele, ind) => {
      const circleCords = mathFunc(ele);
      alldata.push(circleCords);
      // const data = [alldata[ind]];
      // const fileName = "download";
    });
    return alldata;
  };

  // console.log(alldata);
  // console.log(dataArr, "loop array");
  const handleChange = (event) => {
    setUserInput(event.target.value);
    setNewArr(allCircles());
  };
  const handleChangeOuter = (event) => {
    // setOuterInput
    setOuterInput(event.target.value);
    // userInputOuter
  };
  useEffect(() => {
    console.log("this ran");
    setNewArr(allCircles());
    const renderArr = [];
    for (let i = 0; i < 50; i++) {
      renderArr.push(i);
    }
    setOuterSetCount(renderArr);
    // downloadExcel(newArr);
  }, [userInput]);

  console.log(newArr);
  // const exportZip = (blobs) => {
  //   const zip = JSZip();
  //   blobs.forEach((blob, i) => {
  //     zip.file(`file-${i}.csv`, blob);
  //   });
  //   zip.generateAsync({ type: "blob" }).then((zipFile) => {
  //     const currentDate = new Date().getTime();
  //     const fileName = `combined-${currentDate}.zip`;
  //     return FileSaver.saveAs(zipFile, fileName);
  //   });
  // };

  const circleIds = [];
  const getAllIds = (e) => {
    const allCircles = document.querySelectorAll(".table");
    console.log(allCircles);
    for (let i = 0; i < allCircles.length; i++) {
      circleIds.push(allCircles[i].id);
    }
    console.log(circleIds);
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
  const convertToExcel = () => {
    function exportData() {
      /* Get the HTML data using Element by Id */
      const allURLS = [];
      circleIds?.forEach((ele, ind) => {
        var table = document.getElementById(`${ele}`);
        console.log(table);
        /* Declaring array variable */
        var rows = [];

        //iterate through rows of table
        for (var i = 0, row; (row = table.rows[i]); i++) {
          //rows would be accessed using the "row" variable assigned in the for loop
          //Get each cell value/column from the row
          var column1 = row.cells[0].innerText;
          var column2 = row.cells[1].innerText;
          var column3 = row.cells[2].innerText;
          var column4 = row.cells[3].innerText;

          /* add a new records in the array */
          rows.push([column1, column2, column3, column4]);
        }
        let csvContent = "data:text/csv;charset=utf-8,";
        /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
        // rows.forEach(function (rowArray) {
        //   row = rowArray.join(",");
        //   csvContent += row + "\r\n";
        // });
        var csvFile = rows.map((e) => e.join(",")).join("\n");
        var encodedUri = encodeURI(csvContent);

        const fixedEncodedURI = encodedUri.replaceAll("#", "%23");
        allURLS.push(csvFile);

        // main zip code

        // let zip = new JSZip();
        // zip.file(`${i}.csv`, csvFile);
        // zip.generateAsync({ type: "base64" }).then(function (content) {
        //   window.location.href = "data:application/zip;base64," + content;
        // });

        // console.log(fixedEncodedURI, "all the data for csv");
        // return fixedEncodedURI;
      });
      console.log(allURLS);
      saveZip("alCircles", allURLS);
    }
    exportData();
  };
  // if (circleIds) {
  //   circleIds.forEach((ele, ind) => {
  //     convertToExcel(ele);
  //   });
  //   // convertToExcel
  // }
  const getId = (e) => {
    const id = e.target.parentElement.lastChild.id;
    convertToExcel(id);
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
      setSeoData(text);
      // console.log(text);
      alert("file uploaded");
      //   alert(text);
    };
    const finalArr = reader.readAsText(e.target.files[0]);
    console.log(finalArr);
    // ;
  };
  const showKeyword = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result
        .split(/\r?\n/)
        .filter(
          (ele, ind) => ele !== "name" && ele !== "" && ele !== "description"
        );
      console.log(text, "The file reader reads the descriptions");
      setKeyWord(text);
      // console.log(text);
      alert("file uploaded");
      //   alert(text);
    };
    const finalArr = reader.readAsText(e.target.files[0]);
    console.log(finalArr);
    // ;
  };

  const shuffleArr = (array) => {
    let shuffled = array
      ?.map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffled;
  };
  const loopFunc = (uploadedFiles) => {
    const newArr = [];
    for (let i = 0; i < cordCount / uploadedFiles.length; i++) {
      for (let j = 0; j < uploadedFiles.length; j++) {
        newArr.push(uploadedFiles[j]);
      }
    }
    // const shuffedArr = shuffleArr(newArr);
    return newArr;
  };

  let newSeoArr = [];
  let newKeyWordArr = [];

  SeoData &&
    (newSeoArr = loopFunc(SeoData)) &&
    KeyWord &&
    (newKeyWordArr = loopFunc(KeyWord));

  // begin
  const finalTable = [];
  const outerSetCounts = [];
  if (userInputOuter) {
    for (let i = 0; i < userInputOuter; i++) {
      outerSetCounts.push(i);
    }
  }

  console.log(newSeoArr, newKeyWordArr, "VALUES TO RENDER");

  const fillArr = () => {
    for (let i = 0; i < outerSetCounts?.length; i++) {
      let shuffleSeoArr = shuffleArr(newSeoArr);
      let shuffleKeyArr = shuffleArr(newKeyWordArr);
      finalTable.push({
        seoArr: [...shuffleSeoArr],
        keyArr: [...shuffleKeyArr],
        cord: newArr,
      });
    }
  };
  fillArr();
  console.log(finalTable, "finalTabel");

  const getAllZips = (urlsF) => {
    const download = (urlsF) => {
      return fetch(urlsF).then((resp) => resp.blob());
    };
    // console.log(download());
    const downloadViaBrowser = (url) => {
      window.open(url, "_blank");
    };
    downloadViaBrowser(urlsF);
    // download();
    // const downloadMany = (urls) => {
    //   return Promise.all(urls.map((url) => download(url)));
    // };
    const downloadByGroup = (urls, files_per_group = 5) => {
      return Promise.map(
        urls,
        async (url) => {
          return await download(url);
        },
        { concurrency: files_per_group }
      );
    };
    const exportZip = (blobs) => {
      const zip = JSZip();
      blobs.forEach((blob, i) => {
        zip.file(`file-${i}.csv`, blob);
      });
      zip.generateAsync({ type: "blob" }).then((zipFile) => {
        const currentDate = new Date().getTime();
        const fileName = `combined-${currentDate}.zip`;
        return FileSaver.saveAs(zipFile, fileName);
      });
    };
    const downloadAndZip = (allUrls) => {
      return downloadByGroup(allUrls, 5).then(exportZip);
    };
    // downloadAndZip();
  };
  // getAllZips(
  //   "data:text/csv;charset=utf-8,name,description,Latitude,longitude%0D%0ASySpree%20is%20the%20best%20website%20design%20company%20in%20mumbai%20Website:https://syspree.com/,graphic%20designing%20company%20in%20mumbai%20%7C%20SySpree,19.1985743,72.95926923182263%0D%0ASySpree%20is%20the%20best%20Graphic%20Design%20Company%20in%20Mumbai%20Website:https://syspree.com/,logo%20design%20company%20in%20mumbai%20%7C%20SySpree,19.198627858257836,72.95926868382625%0D%0ASySpree%20is%20the%20best%20website%20design%20company%20in%20mumbai%20Website:https://syspree.com/,Web%20design%20company%20in%20Mumbai%20%7C%20SySpree,19.198681400191283,72.95926704000415%0D%0ASySpree%20is%20the%20best%20Graphic%20Design%20Company%20in%20Mumbai%20Website:https://syspree.com/,Web%20design%20company%20in%20Mumbai%20%7C%20SySpree,19.198734909480937,72.95926430085738%0D%0ASySpree%20is%20the%20best%20graphic%20designing%20company%20in%20mumbai%20Website:https://syspree.com/,website%20design%20company%20in%20mumbai%20%7C%20SySpree,19.19878836981737,72.95926046722077%0D%0ASySpree%20is%20the%20best%20graphic%20designing%20company%20in%20mumbai%20Website:https://syspree.com/,Graphic%20Design%20Company%20in%20Mumbai%20%7C%20SySpree,19.198841764906096,72.95925554026286%0D%0ASySpree%20is%20the%20best%20graphic%20designing%20company%20in%20mumbai%20Website:https://syspree.com/,graphic%20designing%20company%20in%20mumbai%20%7C%20SySpree,19.198895078472546,72.95924952148532%0D%0ASySpree%20is%20the%20best%20Web%20design%20company%20in%20Mumbai%20Website:https://syspree.com/,Graphic%20Design%20Company%20in%20Mumbai%20%7C%20SySpree,19.198948294267062,72.95924241272269%0D%0ASySpree%20is%20the%20best%20Web%20design%20company%20in%20Mumbai%20Website:https://syspree.com/,logo%20design%20company%20in%20mumbai%20%7C%20SySpree,19.19900139606982,72.95923421614164%0D%0ASySpree%20is%20the%20best%20Web%20design%20company%20in%20Mumbai%20Website:https://syspree.com/,Web%20design%20company%20in%20Mumbai%20%7C%20SySpree,19.199054367695823,72.95922493424052%0D%0A",
  // );

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
          <DescriptionUpload showKeyword={showKeyword} />
        </div>

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
          <InputLabel
            sx={{ width: 300 }}
            // id="demo-simple-select-label"
          >
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
          <InputLabel
            sx={{ width: 300 }}
            // id="demo-simple-select-label"
          >
            Select Number of Sets
          </InputLabel>
          <Select
            labelId="outer input"
            id="out-select"
            value={userInputOuter}
            label="userinputOuter"
            onChange={handleChangeOuter}
            sx={{ width: 300 }}
          >
            {outerSetCount?.map((ele, ind) => (
              <MenuItem value={ele + 1} key={ind}>
                {ele + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      </div>
      <Tables
        newArr={newArr}
        getId={getId}
        newSeoArr={newSeoArr}
        newKeyWordArr={newKeyWordArr}
        outerArr={finalTable}
        getAllIds={getAllIds}
        convertToExcel={convertToExcel}
      />
    </>
  );
};
export default MapsMath;
