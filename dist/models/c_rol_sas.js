"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const RolSasModel = config_1.db.define('c_rol_sas', {
    ID_ROL_SAS: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_ROL_SAS: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    NO_JERARQUIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'c_rol_sas',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_ROL_SAS" },
            ]
        },
    ]
});
exports.default = RolSasModel;
//# sourceMappingURL=c_rol_sas.js.map