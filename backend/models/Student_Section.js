const { Model, DataTypes, Deferrable } = require("sequelize");

export class StudentSection extends Model {}

export const initStudentSection = async (sequelize) => {
  StudentSection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      admn_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      section: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      session_year: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      ext: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      }
    },
    {
      sequelize,
      modelName: "stu_section_data",
      timestamps: true,
    }
  );
};
