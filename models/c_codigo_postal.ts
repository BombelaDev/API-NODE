
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const CodigoPostalModel = db.define('c_codigo_postal',
 {
  id_cp: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  clave_mpio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cp: {
    type: DataTypes.CHAR(10),
    allowNull: false
  },
  tipo_asentamiento: {
    type: DataTypes.STRING(80),
    allowNull: false
  },
  colonia: {
    type: DataTypes.STRING(180),
    allowNull: false
  }
}, {
  tableName: 'c_codigo_postal',
  timestamps: false
});

export default CodigoPostalModel
