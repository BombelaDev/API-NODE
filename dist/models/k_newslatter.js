"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const NeslatterModel = config_1.db.define('k_newslatter', {
    ID_NEWSLATTER: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    DS_CORREO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    FG_RECIBE_CORREO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    FE_SUBSCRIPCION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    ID_USUARIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FE_DES_SUBSCRIPCION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'k_newslatter',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_NEWSLATTER" },
            ]
        },
    ]
});
exports.default = NeslatterModel;
//# sourceMappingURL=k_newslatter.js.map