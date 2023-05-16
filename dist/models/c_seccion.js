"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const CSeccionModel = config_1.db.define('c_seccion', {
    ID_SECCION: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    NB_SECCION: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    PR_PORCENTAJE: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    }
}, {
    tableName: 'c_seccion',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_SECCION" },
            ]
        },
    ]
});
exports.default = CSeccionModel;
//# sourceMappingURL=c_seccion.js.map