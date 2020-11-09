import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import history from "../HistoryContainer/History";

export default function CreateSectionForm(props) {
  const [sectionDivisionExists, setSectionDivisionExists] = useState(null);
  const [inputSectionCount, setInputSectionCount] = useState(0);
  const [commitedSectionCount, setCommitedSectionCount] = useState(0);
  const [sectionDivision, setSectionDivision] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [sectionDivisionSum, setSectionDivisionSum] = useState(0);

  useEffect(() => {
    var apiUrl = "http://localhost:5000/section-division/check-section-created";
    axios.get(apiUrl).then((repos) => {
      setSectionDivisionExists(repos.data["created"]);
      console.log(repos);
    });
    apiUrl = "http://localhost:5000/section-division/student-count";
    axios.get(apiUrl).then((repos) => {
      setStudentCount(repos.data[0]["no_of_student"]);
    });
  }, [studentCount]);

  const handleCreateSectionClick = (e) => {
    var apiUrl = "http://localhost:5000/section-division/divide-section";
    var data = {
      section_count: commitedSectionCount,
      section_division: sectionDivision,
    };
    axios.post(apiUrl, data).then((repos) => {
      console.log(repos);
      if (repos.data["successful"]) {
        history.push("/view-section");
        window.location.reload();
      }
    });
  };
  return (
    <div>
      <div>Total Student Count is {studentCount}</div>
      <div>Total Student Remaining is {studentCount - sectionDivisionSum}</div>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        onChange={(e) => {
          setInputSectionCount(parseInt(e.currentTarget.value, 10));
        }}
        label="Enter No of Section"
        type="number"
        fullWidth
      />
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={(e) => {
          setCommitedSectionCount(inputSectionCount);
          setSectionDivision(new Array(inputSectionCount));
          setSectionDivisionSum(0);
        }}
      >
        Submit
      </Button>
      {[...Array(commitedSectionCount)].map((value, index) => (
        <TextField
          autoFocus
          margin="dense"
          label="Enter No of Student in Section"
          type="number"
          onChange={(e) => {
            var newSectionDivision = sectionDivision;
            newSectionDivision[index] = parseInt(e.currentTarget.value, 10);
            setSectionDivision(newSectionDivision);
            setSectionDivisionSum(
              newSectionDivision.reduce((a, b) => a + b, 0)
            );
          }}
          fullWidth
        />
      ))}
      {commitedSectionCount > 0 && (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleCreateSectionClick}
          disabled={sectionDivisionSum !== studentCount}
        >
          Create Section Division
        </Button>
      )}
    </div>
  );
}
