import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import PptxGenJS from "pptxgenjs";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import {useDispatch, useSelector} from 'react-redux';


// import Work from "../images/work.png";
// import Certification from "../images/certification.png";
// import Training from "../images/training.png";

//css
import "../styles.css";
import Navbar from "../components/Navbar/Navbar";
import Toolbar from "../components/Navbar/Navbar";


// Importing User Image Statically for now.
// import UserImage from "../images/user.png";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [dataSlicer, setDataSlicer] = useState({ start: 0, end: 20 });
  const [pageNumbers, setPageNumbers] = useState([]);
  const [countPerPage, setCountPerPage] = useState(20);
  const [showPagination, setShowPagination] = useState("none");
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(false);
  const final = useSelector((state)=>state.login)
  console.log(final)

  // const [user,setUser] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loadmore, setLoadMore] = useState([]);
  const [loadHight, setLoadHight] = useState(0);
  // Read Excel File to JSON on button Click
  const readExcel = () => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (file === null) {
        alert("please upload excel file");
      } else {
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const workbook = XLSX.read(bufferArray, { type: "buffer" });
          const worksheet = workbook.SheetNames[0];
          const wsdata = workbook.Sheets[worksheet];
          const data = XLSX.utils.sheet_to_json(wsdata);
          resolve(data);
        };

        fileReader.onerror = (err) => {
          reject(err);
        };
      }
    });
    promise.then((json_data) => {
      console.log(json_data);
      let filtered_json = [];
      console.log(filtered_json);

      // Filtered the array based on the Data needed
      json_data.forEach((json) => {
        // console.log(json['Name']);
        filtered_json.push({
          employee_id: json["Employee Number"],
          employee_email: json["Email"],
          employee_name: json["Name"],
          employee_number: json["Employee Number"],
          employee_experience: json["Total Work Experience in (years)"],
          employee_grade: json["Grade"],
          employee_relevant_experience:
            json["Relevant experience in primary skills"],
          employee_primary_experience: json["Primary Skills"],
          employee_secondary_experience:
            json[
              "Secondary Skills and Ratings(Trained, beginner, Intermediate, Expert)"
            ],
          employee_certificates:
            json["Certificates/Badges /challenges earned​ through learnings"],
          employee_trainings: json[`Training’s​ Completed (External/Internal)`],
          employee_htmlcss: json["HTML/CSS"],
          employee_js: json["JavaScript"],
          employee_angular: json["Angular"],
          employee_react: json["ReactJs"],
          employee_reactnative: json["React Native"]
        });
      });

      setData(filtered_json);

      setLoadMore(filtered_json.slice(0, limit));
    });
  };

  useEffect(() => {
    if (data.length > 0 && !searchTerm.length > 0) {
      setPageData(data.slice(dataSlicer.start, dataSlicer.end));
      let k = 0;
      let myArr = [];
      for (let i = 0; i < data.length; i += countPerPage) {
        k += 1;
        myArr.push(k);
      }
      setPageNumbers(myArr);
      setShowPagination("flex");
    }

    if (searchTerm.length > 0) {
      setShowPagination("none");
    }
  }, [data, pageData]);

  function showData(e) {
    let id = e.target.id;
    // console.log(data);
    let filtered = data.find((selected) => selected.employee_id === id);
    //console.log(filtered);

    // Create A pptx
    // 1. Create a new Presentation
    let pres = new PptxGenJS();

    // 2. Add a Slide
    let slide = pres.addSlide();

    // Slide add Shape
    slide.addShape(pres.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      fill: { color: "0000DD" }
    });

    // Add USer Image(static for now)
    slide.addImage({
      x: "2%",
      y: "2%",
      w: "9%",
      h: "15%",
      path: UserImage,
      rounding: true
    });

    // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
    let textboxName = `Name: ${filtered.employee_name}`;
    let textboxID = `ID: ${filtered.employee_id}`;
    let textboxGrade = `Grade: ${filtered.employee_grade}`;
    let textboxExperience = `Experience: ${filtered.employee_experience}`;
    // let textboxOpts = {y: 0.5, color: "ffffff",fontSize: 12};

    // Adding data to the Top Header
    slide.addText(textboxName, {
      x: "20%",
      y: 0.5,
      w: "20%",
      color: "ffffff",
      fontSize: 12
    });
    slide.addText(textboxID, {
      x: "40%",
      y: 0.5,
      w: "20%",
      color: "ffffff",
      fontSize: 12
    });
    slide.addText(textboxGrade, {
      x: "60%",
      y: 0.5,
      w: "20%",
      color: "ffffff",
      fontSize: 12
    });
    slide.addText(textboxExperience, {
      x: "80%",
      y: 0.5,
      w: "20%",
      color: "ffffff",
      fontSize: 12
    });

    // Add Image by Local URI:

    // Relevent Experience
    slide.addImage({ x: "2%", y: "23%", w: "3%", h: "5%", path: Work });
    slide.addText("Relevant Experience:", {
      x: "7%",
      y: "25%",
      w: "40%",
      color: "000000",
      fontSize: 14,
      underline: true
    });
    slide.addText(
      `${
        filtered.employee_primary_experience
          ? filtered.employee_primary_experience
          : "N/A"
      }`,
      { x: "7%", y: "30%", w: "40%", color: "000000", fontSize: 12 }
    );

    // Certifications
    slide.addImage({
      x: "50%",
      y: "23%",
      w: "3%",
      h: "5%",
      path: Certification
    });
    slide.addText("Certification and Badges:", {
      x: "55%",
      y: "25%",
      w: "40%",
      color: "000000",
      fontSize: 14,
      underline: true
    });
    slide.addText(
      `${
        filtered.employee_certificates ? filtered.employee_certificates : "N/A"
      }`,
      { x: "55%", y: "30%", w: "40%", color: "000000", fontSize: 12 }
    );

    // Trainings
    slide.addImage({ x: "50%", y: "53%", w: "3%", h: "5%", path: Training });
    slide.addText("Trainings:", {
      x: "55%",
      y: "55%",
      w: "40%",
      color: "000000",
      fontSize: 14,
      underline: true
    });
    slide.addText(
      `${filtered.employee_trainings ? filtered.employee_trainings : "N/A"}`,
      { x: "55%", y: "60%", w: "40%", color: "000000", fontSize: 12 }
    );

    // 4. Save the Presentation
    pres.writeFile({ fileName: `${filtered.employee_name}` });
  }

  function goBack() {
    let temp = dataSlicer;
    if (temp.start >= countPerPage) {
      temp.start -= countPerPage;
      temp.end -= countPerPage;
    }

    setDataSlicer(temp);
  }

  function goNext() {
    let temp = dataSlicer;
    if (temp.start >= 0) {
      temp.start += countPerPage;
      temp.end += countPerPage;
    }

    setDataSlicer(temp);
    //console.log(temp);
    setPageData(temp.start, temp.end);
  }

  function goToPage(e) {
    setDataSlicer({
      start: e * countPerPage - countPerPage,
      end: e * countPerPage
    });
    setActivePage(e);
  }

  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  function searchHandler(e) {
    setSearchTerm(e.target.value);
    var searchResult;
    if (isNumeric(e.target.value))
      searchResult = data.filter((element) =>
        element.employee_id.includes(parseInt(e.target.value))
      );
    else
      searchResult = data.filter((element) =>
        element.employee_name.includes(e.target.value)
      );

    setDataSlicer({ start: 0, end: countPerPage });
    setLoadMore(searchResult.slice(0, countPerPage));

    if (!e.target.value) setLoadMore(data.slice(0, limit));

    // let myArr = [];
    // let k = 0;
    // for (let i = 0; i < searchResult.length; i += countPerPage) {
    //   k += 1;
    //   myArr.push(k);
    // }
    // setPageNumbers(myArr);
  }
  // const toggleVisible = () => {
  //   const scrolled = document.documentElement.scrollTop;
  //   if (scrolled > 100) {
  //     setVisible(true);
  //   } else if (scrolled <= 300) {
  //     setVisible(false);
  //   }
  // };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // window.addEventListener("scroll", toggleVisible);

  window.onscroll = useCallback(
    debounce(() => {
      // setSaveToDb(val)

      const scrolled = document.documentElement.scrollTop;
      const scree = scrolled + window.innerHeight;
      setLoadHight(scrolled);
      if (scrolled > 100) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
      if (data.length < limit || loadHight > scrolled) {
        return;
      }
      setLimit(limit + 10);
      setLoadMore(data.slice(0, limit));
      //console.log(limit, scree, scrolled);
    }, 100),
    [limit, data]
  );

  function debounce(fn, delay) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  }
  var dates = [];
  for (var i = 0; i <= 5; i++) {
    var tendates = dayjs().add(i, "day").format("DD/MM/YYYY");
    dates.push(tendates);
  }
  var slots = [];
  //var now = dayjs()
  for (var j = 0; j <= 5; j++) {
    var now = dayjs();
    slots.push(now);
  }

  return (
    <>
    <Toolbar/>
      <div className="page-wrapper">
        <div className="container">
          <div className="mt-3 mb-3">
            <input
              type="file"
              name="file"
              className="form-control"
              id="file"
              accept=".xlsx, .xls, .csv"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <div className="mb-3 mid-bar">
            <button
              className="btn btn-primary upload-btn"
              id="uploadFile"
              onClick={readExcel}
            >
              Submit
            </button>
            <div className="input-group rounded search-bar">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={(e) => searchHandler(e)}
                value={searchTerm}
              />
              <span className="input-group-text border-0" id="search-addon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Display Table */}
          <body id="displayData"  className='' style={{zIndex:9999}}>
            <table
              id="dataTable"
              className="table table-bordered table-responsive  "
              backgroundRepeat='no-repeat'
            >
              <thead className="thead-dark" id="">
                <tr className="table-header">
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Employee Employee Email</th>
                  <th>Employee Experience</th>
                
                  {dates.map((val, key) => {
                    return (
                      <th key={key}>
                        <p>{val}</p>
                      </th>
                    );
                  })}
                  <th>Calender View</th>
                </tr>
              </thead>
              <tbody id="tableBody">
                {data.length > 0 &&
                  loadmore.map((list) => {
                    return (
                      <>
                        <tr key={list.employee_id}>
                          <td>{list.employee_id}</td>
                          <td>{list.employee_name}</td>
                          <td>{list.employee_email}</td>
                          <td>{list.employee_experience}</td>
                          
                          {dates.map((val, key) => {
                            return <td key={key}>3pm-5pm</td>;
                          })}
                          <td>
                            <Link to="/calendar">
                              <button className="btn btn-primary btn-sm">
                                Show
                              </button>
                            </Link>
                          </td>
                        </tr>
                      </>
                    );
                  })}

                {/* add Elements Dynamically */}
              </tbody>
            </table>
          </body>

          <div
            style={{ display: showPagination }}
            className="paginationButtons"
          >
            {/* <select
              onChange={(e) => {
                setCountPerPage(parseInt(e.target.value));
                setDataSlicer({ start: 0, end: parseInt(e.target.value) });
              }}
              class="form-select"
              // aria-label="Page Data Count"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20" selected>
                20
              </option>
              <option value="25">25</option>
            </select> */}
            {/* <button onClick={goBack} type="button" className="btn btn-primary">
              Previous
            </button> */}
            {/* <div className="serialNo">
              {pageNumbers.length > 0 &&
                pageNumbers.map((e) => {
                  let rtrn;
                  if (activePage !== e)
                    rtrn = (
                      <button
                        key={e}
                        onClick={() => goToPage(e)}
                        type="button"
                        className="btn pagenumber-btn"
                      >
                        {e}
                      </button>
                    );
                  else
                    rtrn = (
                      <button
                        style={{ backgroundColor: "#0000FF" }}
                        key={e}
                        onClick={() => goToPage(e)}
                        type="button"
                        className="btn pagenumber-btn"
                      >
                        {e}
                      </button>
                    );

                  return rtrn;
                })}
            </div> */}
            {/* <button onClick={goNext} type="button" className="btn btn-primary">
              Show more
            </button> */}
            <div>
              <i
                onClick={scrollToTop}
                style={{
                  display: visible ? "inline" : "none",
                  position: "fixed",
                  width: "40px",
                  height: "40px",
                  left: "95%",
                  bottom: "40px",
                  fontSize: "3rem",
                  // zIndex: "1",
                  cursor: "pointer",
                  color: "green"
                  // overflowY: "scroll"
                }}
                class="fa fa-arrow-circle-up"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
