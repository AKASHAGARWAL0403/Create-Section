import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import history from "../HistoryContainer/History";

export default function SectionDivisionNotExists() {
  const handleClick = () => {
    history.push("/create-section");
    window.location.reload();
  };
  return (
    <div>
      <div>Section Division Is Not Created</div>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClick}
      >
        Create Section Division
      </Button>
    </div>
  );
}
