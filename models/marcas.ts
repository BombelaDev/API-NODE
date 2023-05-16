
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const MarcasModel = db.define('marcas',
 {
  ID_MARCA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NB_MARCA: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  NB_MODELO: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  NO_ANIO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  DS_ESTILOS: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'marcas',
  timestamps: false
});

export default MarcasModel
