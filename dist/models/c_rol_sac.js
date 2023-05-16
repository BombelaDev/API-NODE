"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const RolSacModel = config_1.db.define('c_rol_sac', {
    ID_ROL_SAC: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_ROL_SAC: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    NO_JERARQUIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'c_rol_sac',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_ROL_SAC" },
            ]
        },
    ]
});
exports.default = RolSacModel;
//# sourceMappingURL=c_rol_sac.js.map