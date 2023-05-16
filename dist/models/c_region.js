"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const RegionModel = config_1.db.define('c_region', {
    ID_REGION: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    NO_CP_DEL: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NO_CP_AL: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'c_region',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_REGION" },
            ]
        },
    ]
});
exports.default = RegionModel;
//# sourceMappingURL=c_region.js.map