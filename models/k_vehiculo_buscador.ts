
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const kVehiculoBuscadorModel = db.define('k_vehiculos_buscador',
 {
  
  ID_VEHICULO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'c_vehiculo',
      key: 'ID_VEHICULO'
    }
  },
  NB_MARCA: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  NB_MODELO: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
});

export default kVehiculoBuscadorModel