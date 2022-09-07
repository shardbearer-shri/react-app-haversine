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
// import { read, utils, writeFile } from "xlsx";
// import * as XLSX from "xlsx";
// import exportFromJSON from "export-from-json";

const degrees_to_radians = (degrees) => {
  var pi = Math.PI;
  return degrees * (pi / 180);
};
const radians_to_degrees = (radians) => {
  var pi = Math.PI;
  return radians * (180 / pi);
};

const MapsMath = () => {
  const [newArr, setNewArr] = useState([]);
  const circleCount = [];
  const [age, setAge] = useState("");
  const [SeoData, setSeoData] = useState();
  const [KeyWord, setKeyWord] = useState();
  let newSeoArr = [];
  let newKeyWordArr = [];
  const mathFunc = (diam) => {
    let centerLat = degrees_to_radians(72.9556716);
    let centerLng = degrees_to_radians(19.1985743);
    let diameter = diam; // diameter of circle in km
    let dist = diameter / 6371.0;
    let allCord = [];
    for (let x = 0; x <= 720; x++) {
      let brng = degrees_to_radians(x);
      let latitude =
        // centerLat +
        Math.asin(
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
        longitude: radians_to_degrees(longitude),
        latitude: radians_to_degrees(latitude),
      });
    }
    return allCord;
  };
  const allCircles = () => {
    const alldata = [];
    circleCount.forEach((ele, ind) => {
      const circleCords = mathFunc(ele);
      alldata.push(circleCords);
      const data = [alldata[ind]];
      const fileName = "download";
      // const exportType = exportFromJSON.types.csv;
      // exportFromJSON({ data, fileName, exportType });
    });
    // console.log(alldata);
    return alldata;
  };

  // console.log(alldata);
  // console.log(dataArr, "loop array");
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event.target.value);
    setNewArr(allCircles());
  };
  const userCircleCount = age;
  for (let i = 0.1; i <= userCircleCount; i += 0.1) {
    circleCount.push(parseFloat(i).toFixed(1));
  }
  useEffect(() => {
    console.log("this ran");
    setNewArr(allCircles());
    // downloadExcel(newArr);
  }, [age]);

  console.log(newArr);
  const convertToExcel = (id) => {
    function exportData() {
      /* Get the HTML data using Element by Id */
      var table = document.getElementById(`${id}`);

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
      rows.forEach(function (rowArray) {
        row = rowArray.join(",");
        csvContent += row + "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      const fixedEncodedURI = encodedUri.replaceAll("#", "%23");
      var link = document.createElement("a");
      link.setAttribute("href", fixedEncodedURI);
      link.setAttribute("download", "keywords.csv");
      document.body.appendChild(link);
      link.click();
    }
    exportData();
  };

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
      setKeyWord(text);
      // console.log(text);
      alert("file uploaded");
      //   alert(text);
    };
    const finalArr = reader.readAsText(e.target.files[0]);
    console.log(finalArr);
    // ;
  };
  console.log(SeoData);
  if (SeoData) {
    console.log(SeoData.length);
    const loopFunc = (SeoData) => {
      const newArr = [];
      for (let i = 0; i < 180; i++) {
        for (let j = 0; j < SeoData.length; j++) {
          newArr.push(SeoData[j]);
        }
      }
      console.log(newArr);
      console.log(newArr.length);
      return newArr;
    };
    newSeoArr = loopFunc(SeoData);
  } else {
    console.log("upload a seo file ");
  }
  if (KeyWord) {
    console.log(KeyWord.length);
    const loopFunc = (KeyWord) => {
      const newArr = [];
      for (let i = 0; i < 180; i++) {
        for (let j = 0; j < KeyWord.length; j++) {
          newArr.push(KeyWord[j]);
        }
      }
      console.log(newArr);
      console.log(newArr.length);
      return newArr;
    };
    newKeyWordArr = loopFunc(KeyWord);
  } else {
    console.log("upload a seo file ");
  }
  return (
    <>
      <div className="container">
        <KeywordsUpload showFile={showFile} />
        <DescriptionUpload showKeyword={showKeyword} />
        <FormControl fullWidth>
          <InputLabel
            sx={{ width: 300 }}
            // id="demo-simple-select-label"
          >
            Circle Count
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
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
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      </div>
      <div className="table-container">
        {newArr?.map((ele, ind) => (
          <div className="tabel_data" key={ind}>
            {/* <Button onClick={() => downloadExcel()}>Click Me</Button> */}
            <h2>Circle Number {ind + 1}</h2>
            <Button
              sx={{ margin: "1rem 0rem" }}
              variant="contained"
              onClick={(e) => getId(e)}
            >
              Get Circle
            </Button>
            {/* <Button onClick={() => mathFunc()}>Click Me</Button> */}
            <table className="table" id={`circle${ind}`}>
              <thead>
                <tr>
                  {/* <th>Keyword</th> */}
                  <th>name</th>
                  <th>description</th>
                  <th>Latitude</th>
                  <th>longitude</th>
                </tr>
              </thead>
              <tbody className="tabel_body">
                {ele?.map((el, rand) => (
                  <tr className="tabel_row" key={rand + 1}>
                    <td className="tabel__item">{newSeoArr[rand]}</td>
                    <td className="tabel__item">{newKeyWordArr[rand]}</td>
                    <td>{el.longitude}</td>
                    <td>{el.latitude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};
export default MapsMath;
