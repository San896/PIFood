const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
      allowNull: true,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stepByStep: {
      type: DataTypes.STRING,
      // type: DataTypes.ARRAY(DataTypes.STRING(65535)), // es un arreglo de strings
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
