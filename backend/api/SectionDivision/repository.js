import { Database } from "../../db/Database";
const { QueryTypes } = require("sequelize");

exports.viewSection = (req, res) => {
  const sequelize = Database.getSequelize();
  var section = req.body.section;
  sequelize
    .query(
      "SELECT * FROM stu_section_data where section=:section order by admn_no",
      {
        replacements: { section: section },
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.viewAllSection = (req, res) => {
  const sequelize = Database.getSequelize();
  var section_count = req.body.section_count;
  var repos = new Array(section_count);
  [...Array(section_count)].map((value, index) => {
  const section = String.fromCharCode("A".charCodeAt(0) + index);
  console.log(section);
    sequelize
      .query(
        "SELECT * FROM stu_section_data where section=:section order by admn_no",
        {
          replacements: { section: section },
          type: QueryTypes.SELECT,
        }
      )
      .then((data) => { 
        repos.push(data);
        
      })
      .catch((err) => {
        res.send(err);
      })
    });
  res.send(repos);
}

exports.getSectionCount = (req, res) => {
  const sequelize = Database.getSequelize();
  sequelize
    .query(
      'SELECT COUNT(DISTINCT section) as "no_of_section" from stu_section_data where section IS NOT NULL',
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getStudentCount = (req, res) => {
  const sequelize = Database.getSequelize();
  sequelize
    .query('SELECT COUNT(*) as "no_of_student" from stu_section_data', {
      type: QueryTypes.SELECT,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.isSectionCreated = (req, res) => {
  const sequelize = Database.getSequelize();
  sequelize
    .query(
      'SELECT COUNT(*) as "no_of_student" from stu_section_data where section IS NOT NULL',
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      var result = {
        created: true,
      };
      if (data[0]["no_of_student"] == 0) {
        result.created = false;
      }
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.deleteSectionCreation = (req, res) => {
  const sequelize = Database.getSequelize();
  sequelize
    .query(
      "UPDATE stu_section_data set section = null where section IS NOT NULL",
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      var result = {
        deleted: true,
      };
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.divideSection = (req, res) => {
  const sectionCount = req.body.section_count;
  const sectionDivision = req.body.section_division;
  const sequelize = Database.getSequelize();

  sequelize
    .query(
      "SELECT * FROM stu_section_data where section IS NULL order by admn_no",
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      var startInd = -1;
      var endInd = -1;
      var secCount = 0;
      sectionDivision.forEach((count) => {
        startInd = endInd + 1;
        endInd = endInd + count;
        const startAdmnNo = data[startInd]["admn_no"];
        const endAdmnNo = data[endInd]["admn_no"];
        const sec = String.fromCharCode("A".charCodeAt(0) + secCount);
        console.log(sec);
        sequelize
          .query(
            "UPDATE stu_section_data set section=:section where admn_no BETWEEN :start AND :end",
            {
              replacements: {
                section: sec,
                start: startAdmnNo,
                end: endAdmnNo,
              },
              type: QueryTypes.UPDATE,
            }
          )
          .catch((err) => {
            res.send(err);
          });
        secCount++;
      });
      var result = {
        successful: true,
      };
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
