





import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const KNotificacionVehiculoModel = db.define('k_notificacion_vehiculo',
 {
  ID_NOTIFICACION_VEHICULO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_VEHICULO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FG_ENVIADO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FE_NOTIFICACION: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'k_notificacion_vehiculo',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_NOTIFICACION_VEHICULO" },
      ]
    },
  ]
});

export default KNotificacionVehiculoModel
