

import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const HLogModel = db.define('h_log',
 {
  TXT_LOG: {
    type: DataTypes.STRING(5000),
    allowNull: true
  },
  TXT_LOG2: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  TXT_LOG3: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
 
  tableName: 'h_log',
  timestamps: false
});

export default HLogModel
