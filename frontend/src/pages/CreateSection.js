import React , { useState, useEffect } from "react";
import axios from "axios";
import CreateSectionForm from "./../core/CreateSectionForm";
import SectionCreationExists from "./../core/SectionCreationExists";

export default function CreateSection(props) {
  const [sectionDivisionExists, setSectionDivisionExists] = useState(null);

  useEffect(() => {
    var apiUrl = "http://localhost:5000/section-division/check-section-created";
    axios.get(apiUrl).then((repos) => {
      setSectionDivisionExists(repos.data["created"]);
      console.log(repos);
    });
  });

  return (
    <div>
      {sectionDivisionExists == true ? (
        <SectionCreationExists />
      ) : (
        <CreateSectionForm />
      )}
    </div>
  );
}
