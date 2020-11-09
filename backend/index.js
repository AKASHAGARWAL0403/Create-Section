import { Connect, getSequelize, syncDatabase } from "./db/ConnectDatabase";
import { initStudentSection } from './models/Student_Section';
import express from "express";
import bodyParser from "body-parser";
import SectionBasicRouter from './api/SectionDivision/router';

import { Database } from "./db/Database";
const cors = require("cors");

import { addRelation } from "./models/Relation";
(async () => {
  await Connect(() => {
    console.log("Connection Has been establshed");
  });

  const sequelize = getSequelize();
  Database.setSequelize(sequelize);

  await initStudentSection(sequelize);
  addRelation();

  await syncDatabase();

  const app = express();

  app.use(bodyParser.json({ extended: false }));

  var corsOptions = {
    origin: "http://localhost:3000",
  };
  
  app.use(cors(corsOptions));

  app.use("/section-division" , SectionBasicRouter);


  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });


  

})();
