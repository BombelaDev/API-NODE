"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const KHoraCavSalesModel = config_1.db.define('k_hora_cav_sales', {
    ID_HORA_CAV: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    NO_HORA: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    ID_CAV: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_cav',
            key: 'ID_CAV'
        }
    },
    NO_DIA_SEMANA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'k_hora_cav_sales',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_HORA_CAV" },
            ]
        },
        {
            name: "fk_hora_cav_cav",
            using: "BTREE",
            fields: [
                { name: "ID_CAV" },
            ]
        },
    ]
});
exports.default = KHoraCavSalesModel;
//# sourceMappingURL=k_hora_cav_sales.js.map