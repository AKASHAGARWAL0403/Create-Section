import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function SectionCreationExists() {
  const handleClick = () => {
    var apiUrl = "http://localhost:5000/section-division/delete-section-creation";
    axios.get(apiUrl).then((repos) => {
      console.log(repos)
      window.location.reload();
    });
  };
  return (
    <div>
      <div>Section Division Already Created</div>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClick}
      >
        Delete Previous Division
      </Button>
    </div>
  );
}
