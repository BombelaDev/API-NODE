"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const ConceptoModel = config_1.db.define('s_concepto', {
    ID_CONCEPTO: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_CONCEPTO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    DS_CONCEPTO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    MN_CONCEPTO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    NB_TITULO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 's_concepto',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_CONCEPTO" },
            ]
        },
    ]
});
exports.default = ConceptoModel;
//# sourceMappingURL=s_concepto.js.map