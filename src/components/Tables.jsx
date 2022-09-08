import React from "react";
import { Button } from "@mui/material";


const Tables = (props) => {
  return (
    <>
      {props.outerArr.map((outerEle, outerInd) => (
        <div className="table-container" key={outerInd}>
          {props.newArr?.map((ele, ind) => (
            <div className="tabel_data" key={ind}>
              {/* <Button onClick={() => downloadExcel()}>Click Me</Button> */}
              <h2>Circle Number {ind + 1}</h2>
              <Button
                sx={{ margin: "1rem 0rem" }}
                variant="contained"
                onClick={(e) => props.getId(e)}
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
                      <td className="tabel__item">{outerEle.keyArr[rand]}</td>
                      <td className="tabel__item">{outerEle.seoArr[rand]}</td>
                      <td>{el.longitude}</td>
                      <td>{el.latitude}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Tables;
