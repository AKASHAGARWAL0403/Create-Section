import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SectionTable from "./SectionTable";

export default function ViewSection(props) {
  const [sectionCount, setSectionCount] = useState(0);
  const [sectionData, setSectionData] = useState([]);
  const [startSection, setStartSection] = useState(null);
  const [endSection, setEndSection] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    var apiUrl = "http://localhost:5000/section-division/view-section";
    axios.post(apiUrl, { section: e.target.dataset.id }).then((repos) => {
      setSectionData(repos.data);
    });
  };
  useEffect(() => {
    var apiUrl = "http://localhost:5000/section-division/section-count";
    axios.get(apiUrl).then((repos) => {
      setSectionCount(parseInt(repos.data[0]["no_of_section"], 10));
      setStartSection("A");
      setEndSection(String.fromCharCode("A".charCodeAt(0) + sectionCount - 1));
    });
  }, [sectionCount]);
  return (
    <div>
      <div>Total No Of Section is {sectionCount}</div>
      <div>
        Select a Section From {startSection} to {endSection}
      </div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Section List
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {[...Array(sectionCount)].map((value, index) => (
          <MenuItem
            onClick={handleClose}
            data-id={String.fromCharCode("A".charCodeAt(0) + index)}
          >
            {String.fromCharCode("A".charCodeAt(0) + index)}
          </MenuItem>
        ))}
      </Menu>
      {sectionData.length > 0 && <SectionTable data={sectionData}/>}
    </div>
  );
}
